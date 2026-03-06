/**
 * fill-audiobooks.mjs
 *
 * Uses Gemini 2.5 Flash to classify audiobook data for books where audiobook_available IS NULL.
 *
 *   - audiobook_available:       boolean
 *   - audiobook_narrator:        string | null
 *   - audiobook_narrator_rating: 'excellent' | 'good' | 'mixed' | 'avoid' | null
 *   - audiobook_hours:           integer | null
 *   - audiobook_audible_url:     auto-generated search URL (no AI needed)
 *
 * Usage:
 *   node scripts/fill-audiobooks.mjs
 *   node scripts/fill-audiobooks.mjs --dry-run
 *   node scripts/fill-audiobooks.mjs --limit 50
 *   node scripts/fill-audiobooks.mjs --all     (re-process all books, not just NULL ones)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN   = process.argv.includes('--dry-run');
const ALL       = process.argv.includes('--all');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT     = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const BATCH_SIZE = 8;
const DELAY_MS   = 900;

if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env');
  process.exit(1);
}
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model   = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: 'gemini-2.5-flash' });
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
  const keywords = `${title} ${author}`.trim().replace(/\s+/g, '+');
  return `https://www.audible.com/search?keywords=${encodeURIComponent(keywords).replace(/%2B/g, '+')}`;
}

async function classifyBatch(books) {
  const bookList = books.map((b, i) => `[${i + 1}] ID: ${b.id}
Title: "${b.title}" by ${b.authors?.join(', ') || 'Unknown'}
Year: ${b.publication_year ?? 'Unknown'}
Genres: ${b.subgenres?.join(', ') || 'Fantasy'}`).join('\n\n');

  const prompt = `You are a fantasy audiobook expert with detailed knowledge of the audiobook market.
For each book below, provide audiobook information based on your knowledge.

Fields to classify:

audiobook_available (boolean):
  true  — a professional audiobook edition exists (not just text-to-speech)
  false — no professional audiobook exists

audiobook_narrator (string or null):
  The name(s) of the narrator(s). Use "Full Cast" for full-cast productions.
  null if no audiobook available.

audiobook_narrator_rating (string or null — community reception of the narrator):
  "excellent" — widely praised, fans consider it the definitive way to experience the book
  "good"      — well received, minor complaints at most
  "mixed"     — divided opinions, some love it some don't
  "avoid"     — commonly disliked or considered a poor match for the material
  null if no audiobook available.

audiobook_hours (integer or null):
  Approximate runtime in hours, rounded to nearest whole number.
  null if no audiobook available or runtime unknown.

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown:
[{"id":"<uuid>","audiobook_available":true,"audiobook_narrator":"Name","audiobook_narrator_rating":"excellent","audiobook_hours":12},...]

Rules:
- Include every book in the response.
- If no audiobook exists, set audiobook_available to false and all other fields to null.
- audiobook_narrator_rating must be exactly one of: "excellent", "good", "mixed", "avoid", or null.
- audiobook_hours must be an integer or null.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  console.log(`\n🎧 Audiobook Classifier${DRY_RUN ? ' [DRY RUN]' : ''}${ALL ? ' [ALL]' : ''}\n`);

  let query = supabase
    .from('books')
    .select('id, title, authors, subgenres, publication_year')
    .order('title');

  if (!ALL) query = query.is('audiobook_available', null);
  if (LIMIT) query = query.limit(LIMIT);

  const { data: books, error } = await query;
  if (error) { console.error('Supabase error:', error.message); process.exit(1); }

  if (!books.length) {
    console.log('✅ All books already have audiobook data — nothing to do.');
    return;
  }

  console.log(`Found ${books.length} books to process`);
  console.log(`  Batch size: ${BATCH_SIZE}  ·  Batches: ${Math.ceil(books.length / BATCH_SIZE)}\n`);

  let updated = 0;
  let failed  = 0;

  for (let i = 0; i < books.length; i += BATCH_SIZE) {
    const batch        = books.slice(i, i + BATCH_SIZE);
    const batchNum     = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(books.length / BATCH_SIZE);

    process.stdout.write(`Batch ${batchNum}/${totalBatches}  `);

    let results;
    try {
      results = await classifyBatch(batch);
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

      const updates = {
        audiobook_available: result.audiobook_available === true,
      };

      if (result.audiobook_available) {
        updates.audiobook_narrator = result.audiobook_narrator ?? null;
        updates.audiobook_hours    = result.audiobook_hours ?? null;
        updates.audiobook_audible_url = buildAudibleUrl(book.title, book.authors);

        if (result.audiobook_narrator_rating) {
          if (VALID_NARRATOR_RATING.includes(result.audiobook_narrator_rating)) {
            updates.audiobook_narrator_rating = result.audiobook_narrator_rating;
          } else {
            console.warn(`  ⚠️  "${book.title}": invalid narrator_rating "${result.audiobook_narrator_rating}"`);
          }
        }
      } else {
        updates.audiobook_narrator        = null;
        updates.audiobook_narrator_rating = null;
        updates.audiobook_hours           = null;
        updates.audiobook_audible_url     = null;
      }

      const available = updates.audiobook_available;
      const line = available
        ? `  ${book.title.slice(0, 40).padEnd(40)} → ✓ ${updates.audiobook_narrator ?? 'Unknown'} (${updates.audiobook_hours ?? '?'}h) [${updates.audiobook_narrator_rating ?? '?'}]`
        : `  ${book.title.slice(0, 40).padEnd(40)} → no audiobook`;

      if (DRY_RUN) {
        console.log(`[dry] ${line}`);
        updated++;
        continue;
      }

      const { error: updateError } = await supabase
        .from('books')
        .update(updates)
        .eq('id', book.id);

      if (updateError) {
        console.log(`  ✗ ${book.title}: ${updateError.message}`);
        failed++;
      } else {
        console.log(`  ✓ ${line}`);
        updated++;
      }
    }

    if (i + BATCH_SIZE < books.length) await sleep(DELAY_MS);
  }

  console.log(`\n──────────────────────────────`);
  console.log(`✅ Updated:  ${updated}`);
  if (failed) console.log(`✗  Failed:   ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
