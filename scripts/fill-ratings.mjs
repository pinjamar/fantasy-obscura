/**
 * fill-ratings.mjs
 *
 * Uses Gemini 2.5 Flash to recall approximate Goodreads ratings for books.
 * Gemini was trained on web data including Goodreads pages, so ratings for
 * popular fantasy books are accurate. Obscure books get null.
 *
 * Stored as a float with 2 decimal places (e.g. 4.19).
 *
 * Usage:
 *   node scripts/fill-ratings.mjs               (fill all NULL avg_rating)
 *   node scripts/fill-ratings.mjs --dry-run
 *   node scripts/fill-ratings.mjs --limit 50
 *   node scripts/fill-ratings.mjs --all          (overwrite existing ratings too)
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fetchHardcoverBook } from './lib/hardcover.mjs';

config();

const DRY_RUN   = process.argv.includes('--dry-run');
const ALL       = process.argv.includes('--all');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT     = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const BATCH_SIZE = 15;
const DELAY_MS   = 900;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model   = getGeminiModel('gemini-2.5-pro');
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchRatingsBatch(books) {
  const bookList = books.map((b, i) =>
    `[${i + 1}] ID: ${b.id}\nTitle: "${b.title}" by ${b.authors?.join(', ') || 'Unknown'}\nYear: ${b.publication_year ?? 'Unknown'}`
  ).join('\n\n');

  const prompt = `You are a book data expert with knowledge of Goodreads ratings.
For each book below, recall the approximate Goodreads community rating (1.00–5.00 scale, 2 decimal places).

Only provide a rating if you are confident it reflects the real Goodreads community score.
If you are unsure or the book is too obscure to have reliable rating data, return null.

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown:
[{"id":"<uuid>","avg_rating":4.19},...]

Rules:
- Include every book in the response.
- avg_rating must be a float with exactly 2 decimal places between 1.00 and 5.00, or null.
- Do NOT fabricate ratings — return null if genuinely unsure.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  console.log(`\n⭐ Rating Fetcher — Gemini/Goodreads${DRY_RUN ? ' [DRY RUN]' : ''}${ALL ? ' [ALL]' : ''}\n`);

  // Paginate to bypass PostgREST's 1000-row default cap
  const PAGE = 1000;
  const books = [];
  if (LIMIT) {
    let q = supabase
      .from('books')
      .select('id, title, authors, publication_year, avg_rating')
      .order('title')
      .limit(LIMIT);
    if (!ALL) q = q.is('avg_rating', null);
    const { data, error } = await q;
    if (error) { console.error('Supabase error:', error.message); process.exit(1); }
    books.push(...(data ?? []));
  } else {
    let offset = 0;
    while (true) {
      let q = supabase
        .from('books')
        .select('id, title, authors, publication_year, avg_rating')
        .order('title')
        .range(offset, offset + PAGE - 1);
      if (!ALL) q = q.is('avg_rating', null);
      const { data, error } = await q;
      if (error) { console.error('Supabase error:', error.message); process.exit(1); }
      if (!data?.length) break;
      books.push(...data);
      if (data.length < PAGE) break;
      offset += PAGE;
    }
  }

  if (!books.length) {
    console.log('✅ All books already have ratings — nothing to do.');
    return;
  }

  console.log(`Found ${books.length} books to process`);

  // ── Phase 1: Hardcover (real community ratings) ───────────────────────────
  const hcKey = process.env.HARDCOVER_API_KEY;
  const geminiInput = [];
  let hcUpdated = 0;

  if (hcKey) {
    console.log(`\n── Phase 1: Hardcover ratings ───────────────────────────────────────────\n`);
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      process.stdout.write(`\r   ${i + 1}/${books.length} — ${book.title.slice(0, 50)}`);
      const hc = await fetchHardcoverBook(book.title, book.authors);
      await sleep(300);

      if (hc?.rating != null && (hc.ratings_count ?? 0) >= 50) {
        if (!DRY_RUN) {
          const { error } = await supabase.from('books').update({ avg_rating: hc.rating }).eq('id', book.id);
          if (!error) hcUpdated++;
        } else {
          hcUpdated++;
        }
      } else {
        geminiInput.push(book);
      }
    }
    console.log(`\n\n   Hardcover: ${hcUpdated} rated, ${geminiInput.length} sent to Gemini\n`);
  } else {
    geminiInput.push(...books);
  }

  // ── Phase 2: Gemini fallback ───────────────────────────────────────────────
  if (!geminiInput.length) {
    console.log('✅ All ratings filled by Hardcover.\n');
    return;
  }

  console.log(`── Phase 2: Gemini fallback (${geminiInput.length} books) ───────────────────────────\n`);
  console.log(`  Batch size: ${BATCH_SIZE}  ·  Batches: ${Math.ceil(geminiInput.length / BATCH_SIZE)}\n`);

  let updated = hcUpdated;
  let noData  = 0;
  let failed  = 0;

  for (let i = 0; i < geminiInput.length; i += BATCH_SIZE) {
    const batch        = geminiInput.slice(i, i + BATCH_SIZE);
    const batchNum     = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(geminiInput.length / BATCH_SIZE);

    process.stdout.write(`Batch ${batchNum}/${totalBatches}  `);

    let results;
    try {
      results = await fetchRatingsBatch(batch);
    } catch (err) {
      console.log(`✗ Gemini error: ${err.message}`);
      failed += batch.length;
      await sleep(DELAY_MS);
      continue;
    }

    console.log('');

    for (const result of results) {
      const book = batch.find((b) => b.id === result.id);
      if (!book) continue;

      if (result.avg_rating === null || result.avg_rating === undefined) {
        console.log(`  ⚠️  ${book.title.slice(0, 52).padEnd(52)} → no data`);
        noData++;
        continue;
      }

      const rating = parseFloat(parseFloat(result.avg_rating).toFixed(2));
      if (isNaN(rating) || rating < 1 || rating > 5) {
        console.log(`  ⚠️  ${book.title.slice(0, 52).padEnd(52)} → invalid rating ${result.avg_rating}`);
        noData++;
        continue;
      }

      const line = `  ${book.title.slice(0, 52).padEnd(52)} → ${rating.toFixed(2)}`;

      if (DRY_RUN) {
        console.log(`[dry] ${line}`);
        updated++;
        continue;
      }

      const { error: updateError } = await supabase
        .from('books')
        .update({ avg_rating: rating })
        .eq('id', book.id);

      if (updateError) {
        console.log(`  ✗ ${book.title}: ${updateError.message}`);
        failed++;
      } else {
        console.log(`  ✓ ${line}`);
        updated++;
      }
    }

    if (i + BATCH_SIZE < geminiInput.length) await sleep(DELAY_MS);
  }

  console.log(`\n──────────────────────────────`);
  console.log(`✅ Updated:  ${updated}`);
  if (noData)  console.log(`⚠️  No data:  ${noData}`);
  if (failed)  console.log(`✗  Failed:   ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
