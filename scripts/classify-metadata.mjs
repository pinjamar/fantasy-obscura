/**
 * classify-metadata.mjs
 *
 * Uses Gemini 2.5 Flash to classify 10 metadata fields for books where they're NULL.
 * Merges the former classify-books.mjs and classify-descriptors.mjs into one pass.
 *
 *   - subgenres:          text[] — e.g. ['Epic Fantasy', 'High Fantasy']
 *   - darkness_level:     integer 1–5
 *   - heat_level:         'Sweet Romance' | 'Closed Door' | 'Open Door' | 'Explicit' | 'Fiery'
 *   - accessibility:      'beginner' | 'intermediate' | 'advanced'
 *   - awards:             text[] — e.g. ['hugo-winner', 'nebula-nominee']
 *   - stakes:             'personal' | 'kingdom' | 'world'
 *   - series_status:      'completed' | 'ongoing'  (series books only; standalones stay NULL)
 *   - pov_style:          'First Person' | 'Second Person' | 'Third Person Limited' | 'Third Person Omniscient'
 *   - pov_count:          'Single POV' | 'Dual POV' | 'Multiple POV'
 *   - protagonist_gender: 'Male' | 'Female' | 'Ensemble'
 *
 * Usage:
 *   node scripts/classify-metadata.mjs
 *   node scripts/classify-metadata.mjs --dry-run
 *   node scripts/classify-metadata.mjs --limit 50
 *   node scripts/classify-metadata.mjs --refresh-series   (re-evaluate series_status for all series books)
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN        = process.argv.includes('--dry-run');
const REFRESH_SERIES = process.argv.includes('--refresh-series');
const LIMIT_ARG      = process.argv.indexOf('--limit');
const LIMIT          = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const BATCH_SIZE     = 6;
const DELAY_MS       = 900;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model   = getGeminiModel();
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const VALID_SUBGENRES    = [
  'Epic Fantasy', 'High Fantasy', 'Dark Fantasy', 'Horror Fantasy', 'Grimdark',
  'Urban Fantasy', 'Contemporary Fantasy', 'Historical Fantasy', 'Mythic Fantasy',
  'Romantic Fantasy', 'Cozy Fantasy', 'War Fantasy',
  'Folklore Fantasy', 'LitRPG',
  'Humorous Fantasy', 'Sword & Sorcery', 'Academy Fantasy', 'Science Fantasy', 'Steampunk Fantasy', 'Progression Fantasy',
];
const VALID_HEAT         = ['Sweet Romance', 'Closed Door', 'Open Door', 'Explicit', 'Fiery'];
const VALID_ACCESSIBILITY = ['beginner', 'intermediate', 'advanced'];
const VALID_AWARDS        = [
  'hugo-winner',    'hugo-nominee',
  'nebula-winner',  'nebula-nominee',
  'goodreads-winner',
  'world-fantasy-winner', 'world-fantasy-nominee',
  'locus-winner',   'locus-nominee',
  'british-fantasy-winner', 'british-fantasy-nominee',
];
const VALID_STAKES        = ['personal', 'kingdom', 'world'];
const VALID_SERIES_STATUS = ['completed', 'ongoing'];
const VALID_POV_STYLE     = ['First Person', 'Second Person', 'Third Person Limited', 'Third Person Omniscient'];
const VALID_POV_COUNT     = ['Single POV', 'Dual POV', 'Multiple POV'];
const VALID_PROTAGONIST   = ['Male', 'Female', 'Ensemble'];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, Math.round(n)));
}

async function fetchBooks() {
  const SELECT = 'id, title, authors, synopsis, subgenres, series, series_number, publication_year, darkness_level, heat_level, accessibility, awards, stakes, series_status, pov_style, pov_count, protagonist_gender';

  const { data: d1, error: e1 } = await supabase
    .from('books')
    .select(SELECT)
    .or('subgenres.is.null,darkness_level.is.null,heat_level.is.null,accessibility.is.null,awards.is.null,stakes.is.null,pov_style.is.null,pov_count.is.null,protagonist_gender.is.null')
    .order('title');

  if (e1) { console.error('Supabase error:', e1.message); process.exit(1); }

  const seriesQuery = supabase
    .from('books')
    .select(SELECT)
    .not('series', 'is', null)
    .order('title');

  const { data: d2, error: e2 } = REFRESH_SERIES
    ? await seriesQuery
    : await seriesQuery.is('series_status', null);

  if (e2) { console.error('Supabase error:', e2.message); process.exit(1); }

  const seen = new Set();
  const all  = [];
  for (const b of [...(d1 || []), ...(d2 || [])]) {
    if (!seen.has(b.id)) { seen.add(b.id); all.push(b); }
  }
  return all;
}

async function classifyBatch(books) {
  const bookList = books.map((b, i) => {
    const needs = [
      b.subgenres         === null && 'subgenres',
      b.darkness_level    === null && 'darkness_level',
      b.heat_level        === null && 'heat_level',
      b.accessibility     === null && 'accessibility',
      b.awards            === null && 'awards',
      b.stakes            === null && 'stakes',
      b.series !== null && (REFRESH_SERIES || b.series_status === null) && 'series_status',
      b.pov_style         === null && 'pov_style',
      b.pov_count         === null && 'pov_count',
      b.protagonist_gender === null && 'protagonist_gender',
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

subgenres (array of 1–3 values that best describe the book's fantasy subgenre):
  Valid values: "Epic Fantasy", "High Fantasy", "Dark Fantasy", "Horror Fantasy", "Grimdark",
                "Urban Fantasy", "Contemporary Fantasy", "Historical Fantasy", "Mythic Fantasy",
                "Romantic Fantasy", "Cozy Fantasy", "War Fantasy",
                "Folklore Fantasy", "LitRPG",
                "Humorous Fantasy", "Sword & Sorcery", "Academy Fantasy", "Science Fantasy", "Steampunk Fantasy", "Progression Fantasy"

darkness_level (integer 1–5):
  1 = Lighthearted / cozy — fun, low stakes, minimal harm
  2 = Mild — some peril or conflict, generally upbeat tone
  3 = Serious — real stakes, meaningful deaths possible, heavier themes
  4 = Dark — trauma, significant loss, heavy/disturbing content
  5 = Brutal — grimdark, extreme violence/suffering, bleak tone

heat_level (romantic/sexual content):
  "Sweet Romance" — kisses only, focus on emotional connection
  "Closed Door"   — tension present but intimate scenes fade to black
  "Open Door"     — explicit scenes present but don't dominate
  "Explicit"      — graphic detail and high frequency
  "Fiery"         — extreme heat, often including kink or darker themes

accessibility (complexity for new readers):
  "beginner"     — simple prose, linear plot, easy entry
  "intermediate" — moderate complexity, some world-building investment
  "advanced"     — dense prose, complex structure, significant investment

awards (include wins AND nominations — return [] if none):
  Valid: "hugo-winner" "hugo-nominee" "nebula-winner" "nebula-nominee"
         "goodreads-winner" "world-fantasy-winner" "world-fantasy-nominee"
         "locus-winner" "locus-nominee" "british-fantasy-winner" "british-fantasy-nominee"

stakes (primary scope of conflict):
  "personal"  — protagonist's personal life/survival
  "kingdom"   — affects a kingdom, city, or regional group
  "world"     — global, civilisation-ending, or cosmic scale

series_status (series books only — always null for standalones):
  "completed" — full series published and complete as of 2025
  "ongoing"   — series still being written

pov_style (narrative perspective):
  "First Person"           — "I did this" narrator
  "Second Person"          — "You did this" narrator (rare)
  "Third Person Limited"   — "She/he did this" following one or few characters closely
  "Third Person Omniscient" — narrator knows all characters' thoughts freely

pov_count (number of POV characters):
  "Single POV"   — one POV character throughout
  "Dual POV"     — two alternating POV characters
  "Multiple POV" — three or more POV characters

protagonist_gender (primary protagonist):
  "Male"     — single male lead or male-dominated ensemble
  "Female"   — single female lead or female-dominated ensemble
  "Ensemble" — balanced group cast with no single clear lead

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown:
[{"id":"<uuid>","subgenres":["..."],"darkness_level":<int|null>,"heat_level":"<str|null>","accessibility":"<str|null>","awards":[...],"stakes":"<str|null>","series_status":"<str|null>","pov_style":"<str|null>","pov_count":"<str|null>","protagonist_gender":"<str|null>"},...]

Rules:
- Include every book in the response.
- For a field NOT listed in "Needs", return null.
- subgenres must be an array of 1–3 values from the valid list, or null.
- series_status must always be null for standalone books.
- awards must be an array ([] if none).
- All other fields must be exactly one valid string or null.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  console.log(`\n🔬 Metadata Classifier${DRY_RUN ? ' [DRY RUN]' : ''}${REFRESH_SERIES ? ' [REFRESH SERIES]' : ''}\n`);

  let books = await fetchBooks();

  if (!books.length) {
    console.log('✅ All books already classified — nothing to do.');
    return;
  }

  if (LIMIT) books = books.slice(0, LIMIT);

  const counts = {
    subgenres:          books.filter((b) => b.subgenres === null).length,
    darkness_level:     books.filter((b) => b.darkness_level === null).length,
    heat_level:         books.filter((b) => b.heat_level === null).length,
    accessibility:      books.filter((b) => b.accessibility === null).length,
    awards:             books.filter((b) => b.awards === null).length,
    stakes:             books.filter((b) => b.stakes === null).length,
    series_status:      books.filter((b) => b.series !== null && (REFRESH_SERIES || b.series_status === null)).length,
    pov_style:          books.filter((b) => b.pov_style === null).length,
    pov_count:          books.filter((b) => b.pov_count === null).length,
    protagonist_gender: books.filter((b) => b.protagonist_gender === null).length,
  };

  console.log(`Found ${books.length} books to process`);
  for (const [field, count] of Object.entries(counts)) {
    if (count) console.log(`  ${field.padEnd(20)} missing/refresh: ${count}`);
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

      if (book.subgenres === null && result.subgenres !== null) {
        const valid = (result.subgenres || []).filter((s) => VALID_SUBGENRES.includes(s));
        if (valid.length) updates.subgenres = valid;
      }

      if (book.darkness_level === null && result.darkness_level !== null) {
        updates.darkness_level = clamp(result.darkness_level, 1, 5);
      }

      if (book.heat_level === null && result.heat_level !== null) {
        if (VALID_HEAT.includes(result.heat_level)) {
          updates.heat_level = result.heat_level;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid heat_level "${result.heat_level}"`);
        }
      }

      if (book.accessibility === null && result.accessibility !== null) {
        if (VALID_ACCESSIBILITY.includes(result.accessibility)) {
          updates.accessibility = result.accessibility;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid accessibility "${result.accessibility}"`);
        }
      }

      if (book.awards === null && result.awards !== null) {
        updates.awards = (result.awards || []).filter((a) => VALID_AWARDS.includes(a));
      }

      if (book.stakes === null && result.stakes !== null) {
        if (VALID_STAKES.includes(result.stakes)) {
          updates.stakes = result.stakes;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid stakes "${result.stakes}"`);
        }
      }

      const needsSeriesUpdate = book.series !== null && (book.series_status === null || REFRESH_SERIES);
      if (needsSeriesUpdate && result.series_status !== null) {
        if (VALID_SERIES_STATUS.includes(result.series_status)) {
          updates.series_status = result.series_status;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid series_status "${result.series_status}"`);
        }
      }

      if (book.pov_style === null && result.pov_style !== null) {
        if (VALID_POV_STYLE.includes(result.pov_style)) {
          updates.pov_style = result.pov_style;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid pov_style "${result.pov_style}"`);
        }
      }

      if (book.pov_count === null && result.pov_count !== null) {
        if (VALID_POV_COUNT.includes(result.pov_count)) {
          updates.pov_count = result.pov_count;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid pov_count "${result.pov_count}"`);
        }
      }

      if (book.protagonist_gender === null && result.protagonist_gender !== null) {
        if (VALID_PROTAGONIST.includes(result.protagonist_gender)) {
          updates.protagonist_gender = result.protagonist_gender;
        } else {
          console.warn(`  ⚠️  "${book.title}": invalid protagonist_gender "${result.protagonist_gender}"`);
        }
      }

      if (Object.keys(updates).length === 0) {
        skipped++;
        continue;
      }

      const summary = Object.entries(updates)
        .map(([k, v]) => `${k.replace(/_/g, ' ')}=${JSON.stringify(v)}`)
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
