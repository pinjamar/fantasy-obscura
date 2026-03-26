/**
 * classify-vibes.mjs
 *
 * Uses Gemini 2.5 Flash to classify 4 vibe fields for books where they're NULL:
 *   - tone:         text[] — e.g. ['Adventurous', 'Dark & Serious']
 *   - pacing:       'Fast-paced' | 'Slow-burn' | 'Mixed'
 *   - magic_system: 'Soft Magic' | 'Hard Magic' | 'No Magic'
 *   - audience:     'Adult' | 'Young Adult (YA)' | "Children's"
 *
 * Usage:
 *   node scripts/classify-vibes.mjs                    # fill NULL fields only
 *   node scripts/classify-vibes.mjs --dry-run
 *   node scripts/classify-vibes.mjs --limit 50
 *   node scripts/classify-vibes.mjs --reclassify       # overwrite all books
 *   node scripts/classify-vibes.mjs --slug the-way-of-kings
 *   node scripts/classify-vibes.mjs --repair           # fix pacing/tone contradictions
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN     = process.argv.includes('--dry-run');
const RECLASSIFY  = process.argv.includes('--reclassify');
const REPAIR      = process.argv.includes('--repair');
const LIMIT_ARG   = process.argv.indexOf('--limit');
const LIMIT       = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const SLUG_ARG    = process.argv.indexOf('--slug');
const SLUG        = SLUG_ARG !== -1 ? process.argv[SLUG_ARG + 1] : null;
const BATCH_SIZE  = 8;
const DELAY_MS    = 900;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model   = getGeminiModel();
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const VALID_TONE = [
  'Whimsical', 'Light-hearted', 'Humorous',
  'Grimdark', 'Dark & Serious', 'Adventurous',
  'Romantic', 'Mysterious', 'Epic', 'Hopeful',
];
const VALID_PACING   = ['Fast-paced', 'Slow-burn', 'Mixed'];
const VALID_MAGIC    = ['Soft Magic', 'Hard Magic', 'No Magic'];
const VALID_AUDIENCE = ['Adult', 'Young Adult (YA)', "Children's"];

function hasContradiction(book) {
  if (!book.tone?.length) return false;
  // Stale data — tone contains values not in the canonical list
  if (book.tone.some(t => !VALID_TONE.includes(t))) return true;
  // Slow-burn pacing + any action-implying tone
  if (book.pacing === 'Slow-burn' && book.tone.some(t => ['Adventurous'].includes(t))) return true;
  // Fast-paced + only quiet/cosy tones, no active ones
  const activeTonesPresent = book.tone.some(t => ['Adventurous', 'Epic', 'Grimdark', 'Dark & Serious', 'Mysterious'].includes(t));
  if (book.pacing === 'Fast-paced' && !activeTonesPresent) return true;
  return false;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function classifyBatch(books, forceFields = []) {
  const bookList = books.map((b, i) => {
    const needs = [
      (b.tone         === null || forceFields.includes('tone'))         && 'tone',
      (b.pacing       === null || forceFields.includes('pacing'))       && 'pacing',
      (b.magic_system === null || forceFields.includes('magic_system')) && 'magic_system',
      (b.audience     === null || forceFields.includes('audience'))     && 'audience',
    ].filter(Boolean).join(', ');

    return `[${i + 1}] ID: ${b.id}
Title: "${b.title}" by ${b.authors?.join(', ') || 'Unknown'}
Series: ${b.series ? `${b.series} — book ${b.series_number ?? '?'}` : 'Standalone'}
Year: ${b.publication_year ?? 'Unknown'}
Genres: ${b.subgenres?.join(', ') || 'Fantasy'}
Synopsis: ${(b.synopsis || '').slice(0, 250) || 'N/A'}
Needs: ${needs}`;
  }).join('\n\n');

  const prompt = `You are a fantasy book database curator with expert knowledge of the genre.
For each book, classify ONLY the fields listed under "Needs". Use your real-world knowledge first; use synopsis/genres as fallback.

FIELD DEFINITIONS — use EXACT values listed:

tone (overall emotional atmosphere — return an ARRAY of 1–3 values that best describe the book):
  Valid values: "Whimsical", "Light-hearted", "Humorous", "Grimdark", "Dark & Serious",
                "Adventurous", "Romantic", "Mysterious", "Epic", "Hopeful"

pacing (how fast the narrative moves):
  "Fast-paced" — action-driven, short chapters, constant momentum
  "Slow-burn"  — deliberate, atmospheric, character or world focused
  "Mixed"      — alternates between fast and slow sections

magic_system (how magic is structured in the world):
  "Hard Magic" — clearly defined rules, costs, and limits (e.g. Sanderson's Mistborn)
  "Soft Magic" — mysterious, undefined, mythic in feel (e.g. Tolkien)
  "No Magic"   — no meaningful magic system present

audience (intended readership):
  "Adult"             — written for adult readers, adult themes
  "Young Adult (YA)"  — teen protagonists, coming-of-age, YA publisher imprint
  "Children's"        — middle grade or younger

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown:
[{"id":"<uuid>","tone":["..."],"pacing":"...","magic_system":"...","audience":"..."},...]

Rules:
- Include every book in the response.
- For a field NOT listed in "Needs", return null for that field.
- tone must be an array of 1–3 values from the valid list, or null.
- All other fields must be exactly one valid string or null.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  const modeLabel = REPAIR ? ' [REPAIR]' : RECLASSIFY ? ' [RECLASSIFY]' : SLUG ? ` [${SLUG}]` : '';
  console.log(`\n🎨 Vibe Classifier${DRY_RUN ? ' [DRY RUN]' : ''}${modeLabel}\n`);

  let query = supabase
    .from('books')
    .select('id, title, authors, synopsis, subgenres, series, series_number, publication_year, tone, pacing, magic_system, audience');

  if (SLUG) {
    query = query.eq('slug', SLUG);
  } else if (REPAIR) {
    // Fetch all classified books — filter contradictions in JS
    query = query.not('pacing', 'is', null).not('tone', 'is', null);
  } else if (RECLASSIFY) {
    query = query.order('title');
  } else {
    query = query.or('tone.is.null,pacing.is.null,magic_system.is.null,audience.is.null').order('title');
  }

  if (LIMIT) query = query.limit(LIMIT);

  const { data: allBooks, error } = await query;
  if (error) { console.error('Supabase error:', error.message); process.exit(1); }

  const books = REPAIR ? allBooks.filter(hasContradiction) : allBooks;
  const forceFields = (REPAIR || RECLASSIFY || SLUG) ? ['tone', 'pacing', 'magic_system', 'audience'] : [];

  if (!books.length) {
    console.log(REPAIR ? '✅ No pacing/tone contradictions found.' : '✅ All books already classified — nothing to do.');
    return;
  }

  if (REPAIR) {
    console.log(`Found ${books.length} book(s) with pacing/tone contradictions:\n`);
    for (const b of books) console.log(`  · ${b.title} — pacing: ${b.pacing}, tone: ${b.tone?.join(', ')}`);
    console.log('');
  } else {
    const counts = {
      tone:         books.filter((b) => b.tone === null).length,
      pacing:       books.filter((b) => b.pacing === null).length,
      magic_system: books.filter((b) => b.magic_system === null).length,
      audience:     books.filter((b) => b.audience === null).length,
    };
    console.log(`Found ${books.length} books to process`);
    for (const [field, count] of Object.entries(counts)) {
      if (count) console.log(`  ${field.padEnd(20)} missing: ${count}`);
    }
  }
  console.log(`  Batch size: ${BATCH_SIZE}  ·  Batches: ${Math.ceil(books.length / BATCH_SIZE)}\n`);

  let updated = 0;
  let skipped = 0;
  let failed  = 0;

  for (let i = 0; i < books.length; i += BATCH_SIZE) {
    const batch        = books.slice(i, i + BATCH_SIZE);
    const batchNum     = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(books.length / BATCH_SIZE);

    process.stdout.write(`Batch ${batchNum}/${totalBatches}  `);

    let results;
    try {
      results = await classifyBatch(batch, forceFields);
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
      const overwrite = RECLASSIFY || REPAIR || !!SLUG;

      if ((book.tone === null || overwrite) && result.tone !== null) {
        const validTones = (result.tone || []).filter((t) => VALID_TONE.includes(t));
        if (validTones.length) updates.tone = validTones;
      }

      if ((book.pacing === null || overwrite) && result.pacing !== null) {
        if (VALID_PACING.includes(result.pacing)) {
          updates.pacing = result.pacing;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid pacing "${result.pacing}"`);
        }
      }

      if ((book.magic_system === null || overwrite) && result.magic_system !== null) {
        if (VALID_MAGIC.includes(result.magic_system)) {
          updates.magic_system = result.magic_system;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid magic_system "${result.magic_system}"`);
        }
      }

      if ((book.audience === null || overwrite) && result.audience !== null) {
        if (VALID_AUDIENCE.includes(result.audience)) {
          updates.audience = result.audience;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid audience "${result.audience}"`);
        }
      }

      if (Object.keys(updates).length === 0) {
        skipped++;
        continue;
      }

      const summary = Object.entries(updates)
        .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
        .join('  ');
      const line = `  ${book.title.slice(0, 45).padEnd(45)} → ${summary}`;

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
  if (skipped) console.log(`⏭️  Skipped:  ${skipped}`);
  if (failed)  console.log(`✗  Failed:   ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
