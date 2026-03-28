/**
 * llm-pass.mjs — Pass 3
 *
 * Groups unresolved books by author, sends each author's batch to Gemini
 * in a single API call, and extracts series assignments.
 *
 * Cost estimate: ~200 author batches × ~700 tokens = ~140k tokens ≈ $0.01
 * Precision is enforced via the prompt ("when in doubt, omit").
 */

import { getGeminiModel } from '../gemini.mjs';
import { normalizeAuthor } from './normalize.mjs';

const DELAY_MS = 800;
const BATCH_SIZE = 20;      // max books per LLM call per author
const MIN_BOOKS = 2;        // skip authors with only 1 unresolved book
const LLM_CONFIDENCE = 0.78; // confidence assigned to all LLM detections

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const PROMPT_TEMPLATE = (author, books) => `
You are a fantasy book series expert with encyclopedic knowledge of published series.

Given these books by ${author}, identify which belong to a named series.
Return ONLY a JSON array. No other text. If you are not certain, omit the book.
Precision matters more than recall — wrong series assignments cause real problems.

Books (slug → title):
${books.map(b => `- ${b.slug} → "${b.title}"`).join('\n')}

Return format:
[
  { "slug": "...", "series_name": "exact series name", "series_number": 1 },
  { "slug": "...", "series_name": "exact series name", "series_number": 2 }
]

Rules:
- series_number is an integer or decimal (e.g. 1, 2, 3.5). Use null if unknown.
- series_name must be the canonical published series name, not a description.
- Only include books you are highly confident about.
- If an author writes multiple series, group correctly.
- Standalone books should NOT appear in the array.
`.trim();

/**
 * Group books by normalized author name.
 * Returns Map<normalizedAuthor → [books]>
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
    // Strip markdown code fences if present
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
  const model = getGeminiModel('gemini-2.5-flash');
  const groups = groupByAuthor(books);

  // Filter to authors with enough books to be worth an LLM call
  const eligible = [...groups.values()].filter(g => g.books.length >= MIN_BOOKS);

  console.log(`   LLM pass: ${eligible.length} author groups (${books.length} books total)`);

  const results = [];
  let done = 0;

  for (const { author, books: authorBooks } of eligible) {
    // Chunk large catalogs into batches of BATCH_SIZE
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
          // Validate the slug actually belongs to this batch
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
