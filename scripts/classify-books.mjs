/**
 * classify-books.mjs
 *
 * Uses Claude Haiku to auto-classify darkness_level (1-5) and heat_level
 * for books that have NULL values in the Supabase DB.
 *
 * Usage:
 *   node scripts/classify-books.mjs
 *   node scripts/classify-books.mjs --dry-run   (preview without writing to DB)
 *   node scripts/classify-books.mjs --limit 50  (process only 50 books)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const BATCH_SIZE = 10;
const DELAY_MS = 800;

const VALID_HEAT = ['Sweet Romance', 'Closed Door', 'Open Door', 'Explicit', 'Fiery'];

// ── Clients ──────────────────────────────────────────────────────────────────

if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env');
  process.exit(1);
}
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: 'gemini-2.5-flash' });
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, Math.round(n)));
}

// ── Classify one batch via Claude Haiku ──────────────────────────────────────

async function classifyBatch(books) {
  const bookList = books
    .map(
      (b, i) => `[${i + 1}] ID: ${b.id}
Title: "${b.title}" by ${b.authors?.join(', ') || 'Unknown'}
Genres: ${b.subgenres?.join(', ') || 'Fantasy'}
Synopsis: ${(b.synopsis || '').slice(0, 300) || 'N/A'}
Needs: ${[b.darkness_level === null && 'darkness_level', b.heat_level === null && 'heat_level'].filter(Boolean).join(' + ')}`,
    )
    .join('\n\n');

  const prompt = `You are a fantasy/sci-fi book content classifier. For each book, classify ONLY the field(s) listed under "Needs". Use your knowledge of the book; if truly unknown, make a reasonable inference from genres and synopsis.

DARKNESS LEVEL (integer 1–5):
1 = Lighthearted / cozy — fun, low stakes, minimal harm
2 = Mild — some peril or conflict, generally upbeat tone
3 = Serious — real stakes, meaningful deaths possible, heavier themes
4 = Dark — trauma, significant loss, heavy/disturbing content
5 = Brutal — grimdark, extreme violence/suffering, bleak tone

HEAT LEVEL (exact string, one of):
"Sweet Romance" — Sweet / Clean: kisses only, focus on emotional connection
"Closed Door"   — Fade to Black: tension present but we leave before intimate scenes
"Open Door"     — Open Door: explicit scenes present but don't dominate the book
"Explicit"      — Explicit / Spicy: graphic detail and high frequency
"Fiery"         — Fiery / Primal: extreme heat, often including kink or darker themes

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown fences:
[{"id":"<uuid>","darkness_level":<int or null>,"heat_level":"<string or null>"},...]

Rules:
- Include every book in the response.
- For a field NOT listed under "Needs", set it to null in your response.
- darkness_level must be an integer 1–5 or null.
- heat_level must be exactly one of the 5 strings above, or null.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in Gemini response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📚 Fantasy Obscura — Book Classifier${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  // Fetch books with at least one NULL field
  let query = supabase
    .from('books')
    .select('id, title, authors, synopsis, subgenres, darkness_level, heat_level')
    .or('darkness_level.is.null,heat_level.is.null')
    .order('title');

  if (LIMIT) query = query.limit(LIMIT);

  const { data: books, error } = await query;
  if (error) {
    console.error('Supabase error:', error.message);
    process.exit(1);
  }

  if (!books.length) {
    console.log('✅ All books already classified — nothing to do.');
    return;
  }

  const needDark = books.filter((b) => b.darkness_level === null).length;
  const needHeat = books.filter((b) => b.heat_level === null).length;
  console.log(`Found ${books.length} books to classify`);
  console.log(`  darkness_level missing: ${needDark}`);
  console.log(`  heat_level missing:     ${needHeat}`);
  console.log(`  Batch size: ${BATCH_SIZE}  ·  Batches: ${Math.ceil(books.length / BATCH_SIZE)}\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < books.length; i += BATCH_SIZE) {
    const batch = books.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
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

      const updates = {};

      if (book.darkness_level === null && result.darkness_level !== null) {
        const d = clamp(result.darkness_level, 1, 5);
        updates.darkness_level = d;
      }

      if (book.heat_level === null && result.heat_level !== null) {
        if (!VALID_HEAT.includes(result.heat_level)) {
          console.warn(`  ⚠️  "${book.title}": invalid heat value "${result.heat_level}" — skipped`);
          skipped++;
          continue;
        }
        updates.heat_level = result.heat_level;
      }

      if (Object.keys(updates).length === 0) {
        skipped++;
        continue;
      }

      const parts = [];
      if (updates.darkness_level !== undefined) parts.push(`darkness=${updates.darkness_level}`);
      if (updates.heat_level !== undefined) parts.push(`heat="${updates.heat_level}"`);
      const line = `  ${book.title.slice(0, 50).padEnd(50)} → ${parts.join('  ')}`;

      if (DRY_RUN) {
        console.log(`[dry] ${line}`);
        updated++;
        continue;
      }

      const { error: updateError } = await supabase
        .from('books')
        .update(updates)
        .eq('id', result.id);

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
  if (skipped) console.log(`⏭️  Skipped:  ${skipped}`);
  if (failed)  console.log(`✗  Failed:   ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
