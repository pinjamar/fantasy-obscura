/**
 * fill-audiobooks.mjs
 *
 * Two-source audiobook detection:
 *   1. Google Books API — live lookup across all editions for audiobook signals,
 *      narrator name, and runtime. Most reliable for popular titles.
 *   2. Gemini — knowledge-base fallback for books Google Books misses, plus
 *      narrator rating (community reception) for every confirmed audiobook.
 *
 * If EITHER source confirms an audiobook exists → audiobook_available = true.
 * Google Books narrator/hours take priority; Gemini fills gaps.
 *
 *   - audiobook_available:       boolean
 *   - audiobook_narrator:        string | null
 *   - audiobook_narrator_rating: 'excellent'|'good'|'mixed'|'avoid' — always Gemini
 *   - audiobook_hours:           integer | null
 *   - audiobook_audible_url:     auto-generated search URL
 *
 * Usage:
 *   node scripts/fill-audiobooks.mjs               # NULL + false (new or unconfirmed)
 *   node scripts/fill-audiobooks.mjs --recheck     # same as default (kept for compat)
 *   node scripts/fill-audiobooks.mjs --all         # everything including confirmed true
 *   node scripts/fill-audiobooks.mjs --dry-run
 *   node scripts/fill-audiobooks.mjs --limit 50
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN   = process.argv.includes('--dry-run');
const ALL       = process.argv.includes('--all');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT     = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;

const DELAY_MS   = 350;
const BATCH_SIZE = 8; // Gemini batch size

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
if (!process.env.GOOGLE_BOOKS_API_KEY) {
  console.error('Missing GOOGLE_BOOKS_API_KEY in .env');
  process.exit(1);
}
  process.exit(1);
}

const GB_KEY   = process.env.GOOGLE_BOOKS_API_KEY;
const model    = getGeminiModel();
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const VALID_NARRATOR_RATING = ['excellent', 'good', 'mixed', 'avoid'];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function buildAudibleUrl(title, authors) {
  const author = authors?.[0] ?? '';
  return `https://www.audible.com/search?keywords=${encodeURIComponent(`${title} ${author}`.trim())}`;
}

// ── Source 1: Google Books API ────────────────────────────────────────────────
// Searches multiple query strategies and inspects each edition for audiobook
// signals (categories, title keywords, description keywords).

async function lookupGoogleBooks(title, authors) {
  const author = Array.isArray(authors) ? authors[0] : (authors ?? '');

  const queries = [
    `intitle:"${title}" inauthor:"${author}" audiobook`,
    `"${title}" "${author}" unabridged`,
    `intitle:"${title}" inauthor:"${author}"`,
  ];

  for (const query of queries) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&printType=books&key=${GB_KEY}`;
    let data;
    try {
      const res = await fetch(url);
      if (!res.ok) { await sleep(DELAY_MS); continue; }
      data = await res.json();
    } catch {
      await sleep(DELAY_MS);
      continue;
    }

    for (const item of data.items ?? []) {
      const info  = item.volumeInfo ?? {};
      const cats  = (info.categories ?? []).join(' ').toLowerCase();
      const desc  = info.description ?? '';
      const descL = desc.toLowerCase();
      const t     = (info.title ?? '').toLowerCase();

      const isAudio =
        cats.includes('audiobook') ||
        t.includes('unabridged') ||
        t.includes('audiobook') ||
        descL.includes('narrated by') ||
        descL.includes('read by ') ||
        descL.includes('narrator:') ||
        descL.includes('audio edition') ||
        descL.includes('audio version');

      if (!isAudio) continue;

      // Extract narrator
      let narrator = null;
      const narratorPatterns = [
        /narrated by ([A-Z][^.,\n(]{2,40})/i,
        /read by ([A-Z][^.,\n(]{2,40})/i,
        /narrator[:\s]+([A-Z][^.,\n(]{2,40})/i,
      ];
      for (const p of narratorPatterns) {
        const m = desc.match(p);
        if (m) { narrator = m[1].trim(); break; }
      }

      // Extract hours
      let hours = null;
      const hoursMatch = desc.match(/(\d+)\s*(?:hours?|hrs?)/i);
      if (hoursMatch) {
        hours = parseInt(hoursMatch[1]);
      } else if (info.pageCount >= 60 && info.pageCount <= 2400) {
        const asHours = Math.round(info.pageCount / 60);
        if (asHours >= 1 && asHours <= 40) hours = asHours;
      }

      await sleep(DELAY_MS);
      return { available: true, narrator, hours, source: 'Google Books' };
    }

    await sleep(DELAY_MS);
  }

  return { available: false, narrator: null, hours: null, source: null };
}

// ── Source 2: Gemini batch ────────────────────────────────────────────────────
// Used as fallback for availability + to fill narrator/hours when Google Books
// didn't find them. Batched to reduce API calls.

async function classifyBatch(books) {
  const bookList = books.map((b, i) => `[${i + 1}] ID: ${b.id}
Title: "${b.title}" by ${(b.authors ?? []).join(', ')}
Year: ${b.publication_year ?? 'Unknown'}`).join('\n\n');

  const prompt = `You are a fantasy audiobook expert.
For each book, confirm whether a professional human-narrated audiobook exists.

audiobook_available: true ONLY if you are CERTAIN it exists on Audible or similar.
When in doubt → false.

audiobook_narrator: exact narrator name if known, null otherwise. Do NOT fabricate.
audiobook_hours: integer runtime in hours if known, null otherwise.

Books:
${bookList}

Respond with ONLY a valid JSON array, no explanation:
[{"id":"<uuid>","audiobook_available":true,"audiobook_narrator":"Name","audiobook_hours":12},...]

Rules:
- Include every book.
- Default to false if any uncertainty.
- If false, narrator and hours must be null.
- Do NOT fabricate narrator names.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

// ── Narrator rating (always Gemini) ──────────────────────────────────────────
// Single targeted call per confirmed audiobook.

async function getNarratorRating(title, author, narrator) {
  if (!narrator) return null;

  const prompt = `Fantasy audiobook: "${title}" by ${author}, narrated by ${narrator}.

Community reception of this narrator's performance?
Answer with exactly one word: excellent / good / mixed / avoid
- excellent: widely praised, considered the definitive experience
- good: well received, minor complaints
- mixed: divided opinions
- avoid: commonly disliked

If not confident → good

One word only.`;

  try {
    const result = await model.generateContent(prompt);
    const rating = result.response.text().trim().toLowerCase().replace(/[^a-z]/g, '');
    return VALID_NARRATOR_RATING.includes(rating) ? rating : null;
  } catch {
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const modeLabel = ALL ? '[ALL]' : '[DEFAULT: null + false]';
  console.log(`\n🎧 Audiobook Lookup (Google Books + Gemini) ${DRY_RUN ? '[DRY RUN] ' : ''}${modeLabel}\n`);

  // Paginate to bypass Supabase 1000-row cap
  const PAGE = 1000;
  const allBooks = [];
  let pageOffset = 0;

  while (true) {
    let q = supabase
      .from('books')
      .select('id, title, authors, publication_year')
      .order('title')
      .range(pageOffset, pageOffset + PAGE - 1);

    if (!ALL) {
      // null audible_url = never checked; 'none' = checked, no audiobook; 'https://...' = confirmed true
      q = q.is('audiobook_audible_url', null);
    }

    const { data: pageData, error: pageErr } = await q;
    if (pageErr) { console.error('Supabase error:', pageErr.message); process.exit(1); }
    if (!pageData || pageData.length === 0) break;
    allBooks.push(...pageData);
    if (pageData.length < PAGE) break;
    pageOffset += PAGE;
  }

  const books = LIMIT ? allBooks.slice(0, LIMIT) : allBooks;

  if (!books.length) {
    console.log('✅ Nothing to process.');
    if (!ALL) console.log('   Tip: use --all to re-verify already confirmed true entries.');
    return;
  }

  console.log(`Processing ${books.length} books\n`);

  // ── Step 1: Google Books lookup for all books ──────────────────────────────
  console.log('── Step 1: Google Books live lookup ──\n');

  const gbResults = new Map(); // id → { available, narrator, hours, source }

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    process.stdout.write(`[${i + 1}/${books.length}] ${book.title.slice(0, 45).padEnd(45)} `);

    try {
      const result = await lookupGoogleBooks(book.title, book.authors);
      gbResults.set(book.id, result);
      console.log(result.available
        ? `✓ GB: ${result.narrator ?? 'narrator?'} · ${result.hours ?? '?'}h`
        : `— not found`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      gbResults.set(book.id, { available: false, narrator: null, hours: null, source: null });
    }
  }

  // ── Step 2: Gemini batch for books Google Books didn't confirm ─────────────
  const needsGemini = books.filter((b) => !gbResults.get(b.id)?.available);

  console.log(`\n── Step 2: Gemini fallback (${needsGemini.length} books not confirmed by Google Books) ──\n`);

  const geminiResults = new Map(); // id → { available, narrator, hours }

  for (let i = 0; i < needsGemini.length; i += BATCH_SIZE) {
    const batch = needsGemini.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(needsGemini.length / BATCH_SIZE);
    process.stdout.write(`Batch ${batchNum}/${totalBatches} … `);

    try {
      const results = await classifyBatch(batch);
      for (const r of results) {
        geminiResults.set(r.id, {
          available: r.audiobook_available === true,
          narrator: r.audiobook_narrator ?? null,
          hours: r.audiobook_hours ?? null,
          source: r.audiobook_available ? 'Gemini' : null,
        });
      }
      const confirmed = results.filter((r) => r.audiobook_available).length;
      console.log(`✓ (${confirmed}/${batch.length} confirmed)`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      for (const b of batch) {
        geminiResults.set(b.id, { available: false, narrator: null, hours: null, source: null });
      }
    }

    await sleep(900);
  }

  // ── Step 3: Merge results + get narrator ratings for confirmed audiobooks ──
  console.log('\n── Step 3: Narrator ratings + DB write ──\n');

  let found    = 0;
  let notFound = 0;
  let failed   = 0;

  for (const book of books) {
    const gb     = gbResults.get(book.id) ?? { available: false, narrator: null, hours: null };
    const gemini = geminiResults.get(book.id) ?? { available: false, narrator: null, hours: null };

    // Either source confirming = available
    const available = gb.available || gemini.available;
    // Prefer Google Books for narrator/hours, fall back to Gemini
    const narrator  = gb.narrator ?? gemini.narrator ?? null;
    const hours     = gb.hours ?? gemini.hours ?? null;
    const source    = gb.available ? 'GB' : (gemini.available ? 'Gemini' : null);

    let narratorRating = null;
    if (available && narrator && !DRY_RUN) {
      narratorRating = await getNarratorRating(book.title, book.authors?.[0] ?? '', narrator);
      await sleep(DELAY_MS);
    }

    const updates = {
      audiobook_available:       available,
      audiobook_narrator:        available ? narrator : null,
      audiobook_narrator_rating: available ? narratorRating : null,
      audiobook_hours:           available ? hours : null,
      // Use 'none' sentinel (not null) when false so re-runs can skip already-checked books
      audiobook_audible_url:     available ? buildAudibleUrl(book.title, book.authors) : 'none',
    };

    const line = available
      ? `✓ [${source}] ${narrator ?? 'narrator?'} · ${hours ?? '?'}h · rating: ${narratorRating ?? '?'}`
      : `— no audiobook`;

    process.stdout.write(`${book.title.slice(0, 45).padEnd(45)} `);

    if (DRY_RUN) {
      console.log(`[dry] ${line}`);
      available ? found++ : notFound++;
      continue;
    }

    const { error: updateErr } = await supabase
      .from('books')
      .update(updates)
      .eq('id', book.id);

    if (updateErr) {
      console.log(`✗ DB: ${updateErr.message}`);
      failed++;
    } else {
      console.log(line);
      available ? found++ : notFound++;
    }
  }

  console.log(`\n──────────────────────────────────`);
  console.log(`✅ Audiobooks found:  ${found}`);
  console.log(`   No audiobook:      ${notFound}`);
  if (failed) console.log(`✗  Errors:           ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
