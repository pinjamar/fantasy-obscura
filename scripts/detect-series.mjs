/**
 * detect-series.mjs
 *
 * Three-pass series detection pipeline for books with no series_name set.
 *
 * Pass 1 — Regex on title/synopsis     (free, ~0.1s, precision ≈ 95%)
 * Pass 2 — Google Books by ISBN        (free quota, ~500ms/batch, precision ≈ 88%)
 * Pass 3 — Gemini LLM per author group (cheap, ~$0.01 total, precision ≈ 78%)
 *
 * Confidence thresholds:
 *   >= 0.90  → auto-apply (series_review = 'auto')
 *   0.60–0.89 → queue for manual review (series_review = 'pending')
 *   < 0.60   → skip
 *
 * Usage:
 *   node scripts/detect-series.mjs                  (all three passes)
 *   node scripts/detect-series.mjs --pass-1         (regex only)
 *   node scripts/detect-series.mjs --pass-2         (Google Books only)
 *   node scripts/detect-series.mjs --pass-3         (LLM only)
 *   node scripts/detect-series.mjs --dry-run        (preview writes, no DB changes)
 *   node scripts/detect-series.mjs --limit 200      (cap Pass 2 ISBN lookups)
 *   node scripts/detect-series.mjs --include-pending (also re-run on pending books)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { regexDetect }      from './lib/series/regex-pass.mjs';
import { googleDetect }     from './lib/series/google-pass.mjs';
import { llmDetect }        from './lib/series/llm-pass.mjs';
import { fetchHardcoverBook } from './lib/hardcover.mjs';

config();

// ── CLI flags ─────────────────────────────────────────────────────────────────
const DRY_RUN         = process.argv.includes('--dry-run');
const PASS_1_ONLY     = process.argv.includes('--pass-1');
const PASS_2_ONLY     = process.argv.includes('--pass-2');
const PASS_25_ONLY    = process.argv.includes('--pass-2.5');
const PASS_3_ONLY     = process.argv.includes('--pass-3');
const INCL_PENDING    = process.argv.includes('--include-pending');
const limitIdx        = process.argv.indexOf('--limit');
const LIMIT           = limitIdx !== -1 ? parseInt(process.argv[limitIdx + 1], 10) : null;

const RUN_ALL  = !PASS_1_ONLY && !PASS_2_ONLY && !PASS_25_ONLY && !PASS_3_ONLY;
const RUN_P1   = RUN_ALL || PASS_1_ONLY;
const RUN_P2   = RUN_ALL || PASS_2_ONLY;
const RUN_P25  = RUN_ALL || PASS_25_ONLY;
const RUN_P3   = RUN_ALL || PASS_3_ONLY;

// ── Confidence thresholds ─────────────────────────────────────────────────────
const AUTO_THRESHOLD   = 0.90; // write directly to series column
const REVIEW_THRESHOLD = 0.60; // queue for admin review

// ── DB setup ──────────────────────────────────────────────────────────────────
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing Supabase env vars'); process.exit(1);
}
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Fetch unresolved books ────────────────────────────────────────────────────
console.log('📖 Fetching unresolved books from DB…\n');

let allBooks = [];
let from = 0;
const PAGE = 1000;
while (true) {
  // series_review uses nullable text — must use .or() to include NULL rows alongside
  // specific values, because PostgREST .neq() follows SQL semantics (NULL != x is NULL).
  let reviewFilter;
  if (INCL_PENDING) {
    // include null + auto + pending, exclude only rejected
    reviewFilter = 'series_review.is.null,series_review.eq.auto,series_review.eq.pending';
  } else {
    // default: only process books that haven't been touched yet
    reviewFilter = 'series_review.is.null';
  }

  let query = supabase
    .from('books')
    .select('slug,title,authors,isbn,synopsis,series,series_number,series_review')
    .is('series', null)
    .or(reviewFilter);

  const { data, error } = await query.range(from, from + PAGE - 1);
  if (error) { console.error('DB error:', error.message); process.exit(1); }
  if (!data?.length) break;
  allBooks = allBooks.concat(data);
  if (data.length < PAGE) break;
  from += PAGE;
}

console.log(`   Unresolved books: ${allBooks.length}`);
if (DRY_RUN) console.log('   ⚠️  DRY RUN — no DB writes\n');

// ── Write helper ──────────────────────────────────────────────────────────────
const stats = { auto: 0, pending: 0, skipped: 0, errors: 0 };

async function applyDetection(book, detection) {
  const { series_name, series_number, confidence, source } = detection;
  const isAuto   = confidence >= AUTO_THRESHOLD;
  const isPending = confidence >= REVIEW_THRESHOLD && !isAuto;

  if (!isAuto && !isPending) { stats.skipped++; return; }

  const reviewStatus = isAuto ? 'auto' : 'pending';
  const update = {
    series_confidence: confidence,
    series_review: reviewStatus,
    series_source: source,
  };

  // Auto-apply: write series name directly
  if (isAuto) {
    update.series = series_name;
    if (series_number !== null && series_number !== undefined) {
      update.series_number = series_number;
    }
  } else {
    // Pending: still write series so the review page can show it, admin confirms
    update.series = series_name;
    if (series_number !== null && series_number !== undefined) {
      update.series_number = series_number;
    }
  }

  const label = isAuto ? '✓ auto  ' : '⏳ pending';
  process.stdout.write(`  [${source}] ${label} "${book.title}" → "${series_name}"${series_number ? ` #${series_number}` : ''} (${confidence.toFixed(2)}) … `);

  if (DRY_RUN) {
    console.log('(dry run)');
    isAuto ? stats.auto++ : stats.pending++;
    return;
  }

  const { error } = await supabase.from('books').update(update).eq('slug', book.slug);
  if (error) {
    console.log(`✗ ${error.message}`);
    stats.errors++;
  } else {
    console.log('✓');
    isAuto ? stats.auto++ : stats.pending++;
  }
  await sleep(100);
}

// ── Pass 1: Regex ─────────────────────────────────────────────────────────────
let pass2Input = allBooks;
let pass3Input = [];

if (RUN_P1) {
  console.log('── Pass 1: Regex (title + synopsis) ────────────────────────────────────\n');
  const unresolved = [];
  for (const book of allBooks) {
    const det = regexDetect(book);
    if (det) {
      await applyDetection(book, det);
    } else {
      unresolved.push(book);
    }
  }
  pass2Input = unresolved;
  console.log(`\n   Pass 1 done — ${allBooks.length - unresolved.length} matched, ${unresolved.length} remaining\n`);
}

// ── Pass 2: Google Books ──────────────────────────────────────────────────────
let googleResolved = new Set();

if (RUN_P2) {
  console.log('── Pass 2: Google Books (ISBN lookup) ───────────────────────────────────\n');
  const withIsbn = pass2Input.filter(b => b.isbn);
  console.log(`   Books with ISBN: ${withIsbn.length}`);
  console.log(`   Skipping (no ISBN): ${pass2Input.length - withIsbn.length}\n`);

  const onProgress = (d, total) => {
    process.stdout.write(`\r   Fetched ${d}/${total} ISBNs…`);
  };

  const detections = await googleDetect(pass2Input, { limit: LIMIT, onProgress });
  process.stdout.write('\n');

  const bookMap = new Map(pass2Input.map(b => [b.slug, b]));
  for (const det of detections) {
    const book = bookMap.get(det.slug);
    if (book) {
      await applyDetection(book, det);
      googleResolved.add(det.slug);
    }
  }

  pass3Input = pass2Input.filter(b => !googleResolved.has(b.slug));
  console.log(`\n   Pass 2 done — ${detections.length} matched, ${pass3Input.length} remaining\n`);
}

// ── Pass 2.5: Hardcover ───────────────────────────────────────────────────────
let hcResolved = new Set();

if (RUN_P25 && process.env.HARDCOVER_API_KEY) {
  const input = RUN_ALL ? pass3Input : allBooks;
  console.log('── Pass 2.5: Hardcover (title lookup) ───────────────────────────────────\n');
  console.log(`   Books to check: ${input.length}\n`);

  for (const book of input) {
    const hc = await fetchHardcoverBook(book.title, book.authors);
    await sleep(300);
    if (!hc?.series_name) continue;

    // Hardcover series data is high confidence when from a known database
    const confidence = hc.series_number != null ? 0.92 : 0.80;
    await applyDetection(book, {
      series_name:   hc.series_name,
      series_number: hc.series_number,
      confidence,
      source: 'hardcover',
    });
    hcResolved.add(book.slug);
  }

  pass3Input = input.filter(b => !hcResolved.has(b.slug));
  console.log(`\n   Pass 2.5 done — ${hcResolved.size} matched, ${pass3Input.length} remaining\n`);
}

// ── Pass 3: LLM ──────────────────────────────────────────────────────────────
if (RUN_P3) {
  const input = RUN_ALL ? pass3Input : allBooks;
  console.log('── Pass 3: LLM (Gemini per author group) ────────────────────────────────\n');

  const detections = await llmDetect(input, {
    dryRun: DRY_RUN,
    onProgress: (done, total) => {
      process.stdout.write(`\r   Processed ${done}/${total} books…`);
    },
  });
  process.stdout.write('\n\n');

  const bookMap = new Map(input.map(b => [b.slug, b]));
  for (const det of detections) {
    const book = bookMap.get(det.slug);
    if (book) await applyDetection(book, det);
  }

  console.log(`\n   Pass 3 done — ${detections.length} matched\n`);
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('─────────────────────────────────────────────────────────────────────────');
console.log(`✅ Auto-applied : ${stats.auto}`);
console.log(`⏳ Pending review: ${stats.pending} — visit /admin/series-review`);
console.log(`⏭  Skipped      : ${stats.skipped}`);
if (stats.errors) console.log(`✗  Errors       : ${stats.errors}`);
