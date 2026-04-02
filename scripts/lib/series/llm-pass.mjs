/**
 * llm-pass.mjs — Pass 3
 *
 * Groups unresolved books by author, sends each author's batch to Gemini 2.5 Pro
 * (Vertex AI) in a single API call, and extracts series assignments.
 *
 * Model: gemini-2.5-pro (Vertex AI, covered by GCP credit)
 * Cost estimate: ~3400 books / 20 per call = ~170 calls × ~1k tokens ≈ negligible
 *
 * Priority:
 *   1. Accuracy over completeness — prefer null over guessing
 *   2. Do not hallucinate — only emit what the record strongly supports
 *   3. Parentheses / bracketed metadata are the strongest series signal
 */

import { getGeminiModel } from '../gemini.mjs';
import { normalizeAuthor } from './normalize.mjs';

const DELAY_MS = 1000;
const BATCH_SIZE = 20;       // max books per LLM call per author
const LLM_CONFIDENCE = 0.78; // confidence assigned to all LLM detections

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const PROMPT_TEMPLATE = (author, books) => `
You are a fantasy book series expert with encyclopedic knowledge of published series.

Given these books by ${author}, identify which belong to a named series.
Return ONLY a valid JSON array. No other text, no markdown, no explanations.

Books (slug → title):
${books.map(b => `- ${b.slug} → "${b.title}"`).join('\n')}

Return format:
[
  { "slug": "...", "series_name": "exact canonical series name", "series_number": 1 },
  { "slug": "...", "series_name": "exact canonical series name", "series_number": null }
]

Rules — read carefully:
- ACCURACY OVER COMPLETENESS. Prefer omitting a book over guessing wrong.
- Do NOT hallucinate. If you are not certain, omit the book entirely.
- series_number is an integer or decimal (e.g. 1, 2, 3.5). Use null if you don't know the exact position.
- series_name must be the canonical published series name (e.g. "The Expanse", not "Expanse Series").
- Interpretation guide:
    - "The Expanse Book 2" → series_name "The Expanse", series_number 2
    - "Leviathan Wakes: Book One of The Expanse" → series_name "The Expanse", series_number 1
    - "A Jack Reacher Novel" alone does NOT confirm the series title is exactly that phrase
    - Parentheses and brackets often contain the strongest series signal
    - If the title and the series name would be identical or ambiguous, omit it
- If an author writes multiple unrelated series, group books correctly into each series.
- Standalone novels must NOT appear in the output array.
- Return [] if nothing is certain.
`.trim();

/**
 * Group books by normalized author name.
 * Returns Map<normalizedAuthor → { author, books[] }>
 */
function groupByAuthor(books) {
  const groups = new Map();
  for (const book of books) {
    for (const author of (book.authors ?? [])) {
      const key = normalizeAuthor(author);
      if (!groups.has(key)) groups.set(key, { author, books: [] });
      groups.get(key).books.push(book);
    }
  }
  return groups;
}

/**
 * Parse LLM JSON response. Returns [] on any parse error.
 */
function parseResponse(text) {
  try {
    const cleaned = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(r =>
      typeof r.slug === 'string' &&
      typeof r.series_name === 'string' &&
      r.series_name.length > 1
    );
  } catch {
    return [];
  }
}

/**
 * Run Pass 3 on a list of books that have no series yet.
 *
 * @param {Array<{ slug: string, title: string, authors: string[] }>} books
 * @param {{ dryRun?: boolean, onProgress?: (done: number, total: number) => void }} opts
 * @returns {Promise<Array<{ slug, series_name, series_number, confidence, source }>>}
 */
export async function llmDetect(books, opts = {}) {
  const { dryRun, onProgress } = opts;
  const model = getGeminiModel('gemini-2.5-pro');
  const groups = groupByAuthor(books);

  // All author groups are eligible — no minimum book threshold
  const eligible = [...groups.values()];

  console.log(`   LLM pass: ${eligible.length} author groups (${books.length} books total)`);

  const results = [];
  let done = 0;

  for (const { author, books: authorBooks } of eligible) {
    const chunks = [];
    for (let i = 0; i < authorBooks.length; i += BATCH_SIZE) {
      chunks.push(authorBooks.slice(i, i + BATCH_SIZE));
    }

    for (const chunk of chunks) {
      const prompt = PROMPT_TEMPLATE(author, chunk);

      if (dryRun) {
        console.log(`   [dry-run] Would call LLM for ${author} (${chunk.length} books)`);
        done += chunk.length;
        onProgress?.(done, books.length);
        continue;
      }

      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const detections = parseResponse(text);

        for (const d of detections) {
          if (!chunk.find(b => b.slug === d.slug)) continue;
          results.push({
            slug: d.slug,
            series_name: d.series_name.trim(),
            series_number: d.series_number ?? null,
            confidence: LLM_CONFIDENCE,
            source: 'llm',
          });
        }

        if (detections.length > 0) {
          console.log(`   ${author}: ${detections.length} series matched`);
        }
      } catch (err) {
        console.warn(`   ⚠️  LLM error for ${author}: ${err.message}`);
      }

      done += chunk.length;
      onProgress?.(done, books.length);
      await sleep(DELAY_MS);
    }
  }

  return results;
}
