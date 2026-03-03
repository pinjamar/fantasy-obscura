/**
 * classify-descriptors.mjs
 *
 * Uses Claude Haiku to classify 7 descriptor fields for books where they're NULL:
 *   - accessibility:      'beginner' | 'intermediate' | 'advanced'
 *   - awards:             text[] — e.g. ['hugo-winner', 'nebula-nominee', 'goodreads-winner']
 *   - stakes:             'personal' | 'kingdom' | 'world'
 *   - series_status:      'completed' | 'ongoing'  (only for series books; standalones stay NULL)
 *   - pov_style:          'First Person' | 'Third Limited' | 'Omniscient'
 *   - pov_count:          'Single' | 'Dual' | 'Multiple'
 *   - protagonist_gender: 'Male' | 'Female' | 'Ensemble'
 *
 * Uses your general knowledge of the books — synopsis is supplementary.
 *
 * Usage:
 *   node scripts/classify-descriptors.mjs                   (fill all NULL fields)
 *   node scripts/classify-descriptors.mjs --dry-run          (preview without writing)
 *   node scripts/classify-descriptors.mjs --limit 50         (process only 50 books)
 *   node scripts/classify-descriptors.mjs --refresh-series   (re-evaluate series_status even if already set)
 *
 * When to use --refresh-series:
 *   Run this periodically (e.g. once a year) as ongoing series get completed.
 *   It re-asks Claude whether each series is 'completed' or 'ongoing' for ALL
 *   series books, not just ones with a NULL series_status.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN        = process.argv.includes('--dry-run');
const REFRESH_SERIES = process.argv.includes('--refresh-series');
const LIMIT_ARG      = process.argv.indexOf('--limit');
const LIMIT          = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const BATCH_SIZE     = 8;
const DELAY_MS       = 900;

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY in .env');
  process.exit(1);
}
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase  = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

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
const VALID_POV_STYLE     = ['First Person', 'Third Limited', 'Omniscient'];
const VALID_POV_COUNT     = ['Single', 'Dual', 'Multiple'];
const VALID_PROTAGONIST   = ['Male', 'Female', 'Ensemble'];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Build list of books that need classification ──────────────────────────────

async function fetchBooks() {
  const SELECT = 'id, title, authors, synopsis, subgenres, series, series_number, publication_year, accessibility, awards, stakes, series_status, pov_style, pov_count, protagonist_gender';

  // Books missing any of the 6 non-series fields
  const { data: d1, error: e1 } = await supabase
    .from('books')
    .select(SELECT)
    .or('accessibility.is.null,awards.is.null,stakes.is.null,pov_style.is.null,pov_count.is.null,protagonist_gender.is.null')
    .order('title');

  if (e1) { console.error('Supabase error:', e1.message); process.exit(1); }

  // Books in a series missing series_status — or ALL series books if --refresh-series
  const seriesQuery = supabase
    .from('books')
    .select(SELECT)
    .not('series', 'is', null)
    .order('title');

  const { data: d2, error: e2 } = REFRESH_SERIES
    ? await seriesQuery
    : await seriesQuery.is('series_status', null);

  if (e2) { console.error('Supabase error:', e2.message); process.exit(1); }

  // Merge and dedup
  const seen = new Set();
  const all  = [];
  for (const b of [...(d1 || []), ...(d2 || [])]) {
    if (!seen.has(b.id)) { seen.add(b.id); all.push(b); }
  }

  return all;
}

// ── Classify one batch via Claude Haiku ──────────────────────────────────────

async function classifyBatch(books) {
  const bookList = books.map((b, i) => {
    const needs = [
      b.accessibility      === null && 'accessibility',
      b.awards             === null && 'awards',
      b.stakes             === null && 'stakes',
      b.series !== null && (REFRESH_SERIES || b.series_status === null) && 'series_status',
      b.pov_style          === null && 'pov_style',
      b.pov_count          === null && 'pov_count',
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
For each book, classify ONLY the fields listed under "Needs". Use your real-world knowledge of the book first; use synopsis/genres only as a fallback.

FIELD DEFINITIONS — use EXACT values listed:

accessibility (how complex/challenging the book is for new readers):
  "beginner"     — simple prose, linear plot, easy entry for genre newcomers
  "intermediate" — moderate complexity, some world-building investment required
  "advanced"     — dense prose, complex structure, significant reader investment

awards (include BOTH wins and nominations for major genre awards — return [] if none):
  Valid values:
    "hugo-winner"             "hugo-nominee"
    "nebula-winner"           "nebula-nominee"
    "goodreads-winner"
    "world-fantasy-winner"    "world-fantasy-nominee"
    "locus-winner"            "locus-nominee"
    "british-fantasy-winner"  "british-fantasy-nominee"
  Return only values from this exact list. Return [] if no major award associations.

stakes (primary scope of conflict/threat):
  "personal"  — stakes are about the protagonist's personal life/survival
  "kingdom"   — stakes affect a kingdom, city, or regional group
  "world"     — stakes are global, civilisation-ending, or cosmic in scale

series_status (only for books in a series — always null for standalones):
  "completed" — the full series has been published and is complete as of 2025
  "ongoing"   — the series is still being written / not all books released yet

pov_style (narrative perspective):
  "First Person"   — "I did this" narrator
  "Third Limited"  — "She/he did this" following one or a few characters closely
  "Omniscient"     — narrator knows all characters' thoughts freely

pov_count (how many POV characters):
  "Single"   — one POV character throughout
  "Dual"     — two alternating POV characters
  "Multiple" — three or more POV characters

protagonist_gender (primary protagonist(s)):
  "Male"     — single male lead or male-dominated ensemble
  "Female"   — single female lead or female-dominated ensemble
  "Ensemble" — balanced group cast with no single clear lead

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown:
[{"id":"<uuid>","accessibility":"...","awards":[...],"stakes":"...","series_status":"..." or null,"pov_style":"...","pov_count":"...","protagonist_gender":"..."},...]

Rules:
- Include every book in the response.
- For a field NOT listed in "Needs", return null for that field.
- series_status must always be null for standalone books.
- awards must be an array ([] if none).
- All other fields must be exactly one of the valid strings listed, or null.`;

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = message.content[0]?.type === 'text' ? message.content[0].text.trim() : '';
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔬 Descriptor Classifier${DRY_RUN ? ' [DRY RUN]' : ''}${REFRESH_SERIES ? ' [REFRESH SERIES]' : ''}\n`);

  let books = await fetchBooks();

  if (!books.length) {
    console.log('✅ All books already classified — nothing to do.');
    return;
  }

  if (LIMIT) books = books.slice(0, LIMIT);

  const counts = {
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
    const batch       = books.slice(i, i + BATCH_SIZE);
    const batchNum    = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(books.length / BATCH_SIZE);

    process.stdout.write(`Batch ${batchNum}/${totalBatches}  `);

    let results;
    try {
      results = await classifyBatch(batch);
    } catch (err) {
      console.log(`✗ Claude error: ${err.message}`);
      failed += batch.length;
      await sleep(DELAY_MS);
      continue;
    }

    console.log('');

    for (const result of results) {
      const book = batch.find((b) => b.id === result.id);
      if (!book) continue;

      const updates = {};

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

      // series_status: update if null, or update if --refresh-series and book is in a series
      const needsSeriesUpdate = book.series !== null &&
        (book.series_status === null || REFRESH_SERIES);
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
