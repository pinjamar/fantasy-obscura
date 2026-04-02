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
import { regexDetect }         from './lib/series/regex-pass.mjs';
import { openLibraryDetect }   from './lib/series/openlibrary-pass.mjs';
import { googleDetect }        from './lib/series/google-pass.mjs';
import { llmDetect }           from './lib/series/llm-pass.mjs';
import { getGeminiModel }      from './lib/gemini.mjs';
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

const PASS_OL_ONLY       = process.argv.includes('--pass-ol');
const CONFIRM_PENDING    = process.argv.includes('--confirm-pending');

const RUN_ALL  = !PASS_1_ONLY && !PASS_2_ONLY && !PASS_OL_ONLY && !PASS_25_ONLY && !PASS_3_ONLY && !CONFIRM_PENDING;
const RUN_P1   = RUN_ALL || PASS_1_ONLY;
const RUN_POL  = RUN_ALL || PASS_OL_ONLY;
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

// ── Pass OL: Open Library (no quota) ─────────────────────────────────────────
let olResolved = new Set();

if (RUN_POL) {
  const input = RUN_ALL ? pass2Input : allBooks;
  console.log('── Pass OL: Open Library (ISBN, no quota) ───────────────────────────────\n');
  const withIsbn = input.filter(b => b.isbn);
  console.log(`   Books with ISBN: ${withIsbn.length} / ${input.length}\n`);

  const detections = await openLibraryDetect(input, {
    limit: LIMIT,
    onProgress: (d, total) => process.stdout.write(`\r   Fetched ${d}/${total}…`),
  });
  process.stdout.write('\n');

  const bookMap = new Map(input.map(b => [b.slug, b]));
  for (const det of detections) {
    const book = bookMap.get(det.slug);
    if (book) { await applyDetection(book, det); olResolved.add(det.slug); }
  }

  pass2Input = input.filter(b => !olResolved.has(b.slug));
  console.log(`\n   Pass OL done — ${olResolved.size} matched, ${pass2Input.length} remaining\n`);
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
    const hc = fetchHardcoverBook(book.title, book.authors);
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

// ── Confirm Pending ───────────────────────────────────────────────────────────
if (CONFIRM_PENDING) {
  console.log('── Confirm Pending: Gemini 2.5 Pro re-evaluation ────────────────────────\n');

  // Fetch books that are pending review (they already have series set)
  let pendingBooks = [];
  let pfrom = 0;
  while (true) {
    let q = supabase
      .from('books')
      .select('slug,title,authors,isbn,synopsis,series,series_number,series_review,series_source')
      .eq('series_review', 'pending');
    if (LIMIT) q = q.limit(LIMIT);
    const { data, error } = await q.range(pfrom, pfrom + PAGE - 1);
    if (error) { console.error('DB error:', error.message); break; }
    if (!data?.length) break;
    pendingBooks = pendingBooks.concat(data);
    if (data.length < PAGE || LIMIT) break;
    pfrom += PAGE;
  }

  console.log(`   Pending books: ${pendingBooks.length}\n`);

  if (pendingBooks.length) {
    const model = getGeminiModel('gemini-2.5-pro');
    const BATCH = 20;
    const CONFIRM_DELAY = 1200;
    let autoConfirmed = 0;
    let rejected = 0;
    let uncertain = 0;

    // Group by author same as llm pass
    const groups = new Map();
    for (const book of pendingBooks) {
      for (const author of (book.authors ?? [])) {
        const key = author.toLowerCase().trim();
        if (!groups.has(key)) groups.set(key, { author, books: [] });
        groups.get(key).books.push(book);
      }
    }

    for (const { author, books: authorBooks } of groups.values()) {
      const chunks = [];
      for (let i = 0; i < authorBooks.length; i += BATCH) chunks.push(authorBooks.slice(i, i + BATCH));

      for (const chunk of chunks) {
        const bookList = chunk.map(b =>
          `- ${b.slug} → title: "${b.title}" | proposed series: "${b.series}"${b.series_number != null ? ` #${b.series_number}` : ''}`
        ).join('\n');

        const prompt = `You are a fantasy book series expert.

The following books by ${author} were tentatively assigned to a series by an automated system.
Your job is to CONFIRM or REJECT each assignment. You may also CORRECT the series name or number if wrong.

Priority rules:
1. Accuracy over completeness — prefer null over guessing
2. Do NOT hallucinate — only confirm what you are certain about
3. Parentheses/brackets in titles are the strongest signal
4. If the proposed series looks right but the number is wrong, correct the number
5. If uncertain, mark as "uncertain" — do not confirm or reject

Books:
${bookList}

Return ONLY a JSON array. No other text.
[
  { "slug": "...", "verdict": "confirm" | "reject" | "uncertain", "series_name": "...", "series_number": 1 }
]

- verdict "confirm": you are certain this is correct
- verdict "reject": clearly wrong series assignment
- verdict "uncertain": not enough signal to decide
- series_name and series_number: use the corrected values (or the proposed values if confirming)
- Return [] if all are uncertain`.trim();

        if (DRY_RUN) {
          console.log(`   [dry-run] Would confirm ${chunk.length} books by ${author}`);
          continue;
        }

        try {
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          const cleaned = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();
          let verdicts = [];
          try { verdicts = JSON.parse(cleaned); } catch { }

          const chunkMap = new Map(chunk.map(b => [b.slug, b]));
          for (const v of (Array.isArray(verdicts) ? verdicts : [])) {
            if (!v.slug || !chunkMap.has(v.slug)) continue;
            const book = chunkMap.get(v.slug);

            if (v.verdict === 'confirm') {
              const { error } = await supabase.from('books').update({
                series: (v.series_name ?? book.series).trim(),
                series_number: v.series_number ?? book.series_number ?? null,
                series_review: 'confirmed',
                series_confidence: 0.95,
                series_source: `${book.series_source ?? 'unknown'}+llm_confirm`,
              }).eq('slug', v.slug);
              if (!error) {
                console.log(`  ✅ confirmed  "${book.title}" → "${v.series_name ?? book.series}"${v.series_number != null ? ` #${v.series_number}` : ''}`);
                autoConfirmed++;
              }
            } else if (v.verdict === 'reject') {
              const { error } = await supabase.from('books').update({
                series: null,
                series_number: null,
                series_review: 'rejected',
                series_confidence: null,
              }).eq('slug', v.slug);
              if (!error) {
                console.log(`  ❌ rejected   "${book.title}" (was "${book.series}")`);
                rejected++;
              }
            } else {
              uncertain++;
            }
          }
        } catch (err) {
          console.warn(`   ⚠️  LLM error for ${author}: ${err.message}`);
        }

        await sleep(CONFIRM_DELAY);
      }
    }

    console.log(`\n   ✅ Auto-confirmed : ${autoConfirmed}`);
    console.log(`   ❌ Rejected       : ${rejected}`);
    console.log(`   ❓ Still uncertain: ${uncertain + (pendingBooks.length - autoConfirmed - rejected - uncertain)} → remain in review queue\n`);
    stats.auto += autoConfirmed;
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('─────────────────────────────────────────────────────────────────────────');
console.log(`✅ Auto-applied : ${stats.auto}`);
console.log(`⏳ Pending review: ${stats.pending} — visit /admin/series-review`);
console.log(`⏭  Skipped      : ${stats.skipped}`);
if (stats.errors) console.log(`✗  Errors       : ${stats.errors}`);
