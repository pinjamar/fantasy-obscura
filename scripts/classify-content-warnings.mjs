/**
 * classify-content-warnings.mjs
 *
 * Uses Gemini Flash to classify content warnings for books where
 * content_warnings IS NULL. Uses real-world knowledge of the book first;
 * synopsis/genres are supplementary.
 *
 * Valid warning slugs stored as text[] in the DB:
 *   sexual-content     — explicit or detailed sexual activity
 *   graphic-violence   — detailed gore, brutal combat, torture
 *   child-death        — death of a child depicted
 *   animal-death       — death of a pet or significant animal
 *   abuse              — physical, emotional, or psychological abuse / manipulation
 *   sexual-assault     — rape or sexual assault (on-page or referenced)
 *   torture            — scenes of deliberate prolonged suffering
 *   suicide            — suicide attempt or death by suicide
 *   addiction          — substance abuse or addiction as a meaningful theme
 *   war                — large-scale warfare with significant casualties depicted
 *   slavery            — enslavement as a meaningful narrative element
 *   psychological-trauma — significant PTSD, dissociation, or mental health trauma
 *
 * Books with NO warnings get content_warnings = [] (empty array, never NULL after classification).
 *
 * Usage:
 *   node scripts/classify-content-warnings.mjs               (fill all NULL)
 *   node scripts/classify-content-warnings.mjs --dry-run     (preview without writing)
 *   node scripts/classify-content-warnings.mjs --limit 50    (process only 50 books)
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN    = process.argv.includes('--dry-run');
const LIMIT_ARG  = process.argv.indexOf('--limit');
const LIMIT      = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const BATCH_SIZE = 8;
const DELAY_MS   = 900;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model = getGeminiModel();
const supabase  = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const VALID_WARNINGS = [
  'sexual-content',
  'graphic-violence',
  'child-death',
  'animal-death',
  'abuse',
  'sexual-assault',
  'torture',
  'suicide',
  'addiction',
  'war',
  'slavery',
  'psychological-trauma',
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchBooks() {
  let query = supabase
    .from('books')
    .select('id, title, authors, synopsis, subgenres, darkness_level, publication_year')
    .is('content_warnings', null)
    .order('title');

  if (LIMIT) query = query.limit(LIMIT);

  const { data, error } = await query;
  if (error) { console.error('Supabase error:', error.message); process.exit(1); }
  return data || [];
}

async function classifyBatch(books) {
  const bookList = books.map((b, i) => `[${i + 1}] ID: ${b.id}
Title: "${b.title}" by ${b.authors?.join(', ') || 'Unknown'}
Year: ${b.publication_year ?? 'Unknown'}
Darkness: ${b.darkness_level ?? 'Unknown'}/5
Genres: ${b.subgenres?.join(', ') || 'Fantasy'}
Synopsis: ${(b.synopsis || '').slice(0, 250) || 'N/A'}`).join('\n\n');

  const prompt = `You are a fantasy book content safety classifier with expert knowledge of the genre.
For each book, list which content warnings apply based on your knowledge of the actual published book.
Only flag warnings for content that is meaningfully present — not just briefly mentioned or implied.

VALID WARNING SLUGS — only use these exact values:
  "sexual-content"       — explicit or detailed sexual activity
  "graphic-violence"     — detailed gore, brutal combat, or extreme physical violence
  "child-death"          — death of a child depicted on or off page significantly
  "animal-death"         — death of a pet or significant animal depicted meaningfully
  "abuse"                — physical, emotional, or psychological abuse / manipulation
  "sexual-assault"       — rape or sexual assault (on-page or clearly referenced)
  "torture"              — deliberate prolonged physical or psychological suffering
  "suicide"              — suicide attempt or death by suicide as a notable element
  "addiction"            — substance abuse or addiction as a meaningful theme
  "war"                  — large-scale warfare with significant casualties depicted
  "slavery"              — enslavement as a meaningful narrative element
  "psychological-trauma" — significant PTSD, dissociation, or mental health trauma

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown:
[{"id":"<uuid>","content_warnings":["slug1","slug2"]},...]

Rules:
- Include every book in the response.
- Return [] for books with no notable content warnings.
- Only use slugs from the exact list above.
- When in doubt, include the warning (reader safety > false positives).`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  console.log(`\n⚠️  Content Warning Classifier${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  const books = await fetchBooks();

  if (!books.length) {
    console.log('✅ All books already classified — nothing to do.');
    return;
  }

  console.log(`Found ${books.length} books to classify`);
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

      // Validate and filter to known slugs only
      const warnings = (result.content_warnings || []).filter((w) => VALID_WARNINGS.includes(w));
      const invalid  = (result.content_warnings || []).filter((w) => !VALID_WARNINGS.includes(w));

      if (invalid.length) {
        console.warn(`  ⚠️  "${book.title}": unknown slugs ignored: ${invalid.join(', ')}`);
      }

      const warningDisplay = warnings.length ? warnings.join(', ') : '(none)';
      const line = `  ${book.title.slice(0, 45).padEnd(45)} → [${warningDisplay}]`;

      if (DRY_RUN) {
        console.log(`[dry] ${line}`);
        updated++;
        continue;
      }

      const { error: updateError } = await supabase
        .from('books')
        .update({ content_warnings: warnings })
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
