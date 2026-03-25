/**
 * auto-fill-series.mjs
 *
 * Fills missing series/series_number for books in the DB using three strategies:
 *
 * --series "Name"  — Targeted series fill (no API):
 *   Finds all books already tagged with that series, collects their authors,
 *   then assigns the same series to any other books by those authors that
 *   currently have series = null. Use --dry-run to preview before writing.
 *   Example: --series "The Dresden Files"
 *
 * Phase A — Same-author inference (no API):
 *   For authors with 3+ books already tagged to one series, auto-assigns
 *   that series to their untagged books using title-keyword matching.
 *
 * Phase B — Google Books subtitle/description parsing:
 *   For books still missing series, looks them up by ISBN and parses
 *   human-readable series info from subtitle/description fields.
 *   Respects daily quota — stops if 429 received.
 *
 * Usage:
 *   node scripts/auto-fill-series.mjs                          (run Phase A + B)
 *   node scripts/auto-fill-series.mjs --series "Dresden Files" (targeted fill)
 *   node scripts/auto-fill-series.mjs --phase-a                (inference only)
 *   node scripts/auto-fill-series.mjs --phase-b                (ISBN lookup only)
 *   node scripts/auto-fill-series.mjs --dry-run                (preview, no writes)
 *   node scripts/auto-fill-series.mjs --limit 100              (cap Phase B calls)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN    = process.argv.includes('--dry-run');
const PHASE_A    = process.argv.includes('--phase-a');
const PHASE_B    = process.argv.includes('--phase-b');
const seriesIdx  = process.argv.indexOf('--series');
const TARGET_SERIES = seriesIdx !== -1 ? process.argv[seriesIdx + 1] : null;
const RUN_ALL    = !PHASE_A && !PHASE_B && !TARGET_SERIES;
const limitIdx   = process.argv.indexOf('--limit');
const LIMIT      = limitIdx !== -1 ? parseInt(process.argv[limitIdx + 1], 10) : null;
const DELAY_MS   = 400;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing Supabase env vars'); process.exit(1);
}

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Fetch all books ───────────────────────────────────────────────────────────

console.log('📖 Fetching all books from DB…');

let allBooks = [];
let from = 0;
const PAGE = 1000;
while (true) {
  const { data, error } = await supabase
    .from('books')
    .select('slug, title, authors, series, series_number, isbn')
    .range(from, from + PAGE - 1);
  if (error) { console.error('DB error:', error.message); process.exit(1); }
  if (!data || data.length === 0) break;
  allBooks = allBooks.concat(data);
  if (data.length < PAGE) break;
  from += PAGE;
}

console.log(`   Total books: ${allBooks.length}`);

const missing = allBooks.filter(b => !b.series);
const hasSeries = allBooks.filter(b => b.series);

console.log(`   Missing series: ${missing.length}`);
console.log(`   Have series: ${hasSeries.length}\n`);

// ── Targeted series fill (--series "Name") ────────────────────────────────────

if (TARGET_SERIES) {
  const normalised = TARGET_SERIES.toLowerCase();

  // Find all authors who have at least one book in this series
  const seriesAuthors = new Set(
    hasSeries
      .filter(b => b.series.toLowerCase().includes(normalised) || normalised.includes(b.series.toLowerCase()))
      .flatMap(b => b.authors ?? [])
  );

  if (seriesAuthors.size === 0) {
    console.error(`❌  No books found with series matching "${TARGET_SERIES}". Check the series name.`);
    process.exit(1);
  }

  console.log(`── Targeted fill: "${TARGET_SERIES}" ────────────────────────────────────\n`);
  console.log(`   Authors in this series: ${[...seriesAuthors].join(', ')}\n`);

  const candidates = missing.filter(b =>
    (b.authors ?? []).some(a => seriesAuthors.has(a))
  );

  if (candidates.length === 0) {
    console.log('✅  No untagged books found for these authors.');
    process.exit(0);
  }

  console.log(`   Untagged books by these authors: ${candidates.length}\n`);

  let fixed = 0;
  for (const book of candidates) {
    process.stdout.write(`  "${book.title}" (${(book.authors ?? []).join(', ')}) → "${TARGET_SERIES}" … `);
    if (DRY_RUN) { console.log('(dry run)'); fixed++; continue; }
    const { error } = await supabase
      .from('books')
      .update({ series: TARGET_SERIES })
      .eq('slug', book.slug);
    if (error) { console.log(`✗ ${error.message}`); }
    else { console.log('✓'); fixed++; }
    await sleep(DELAY_MS);
  }

  console.log(`\n${DRY_RUN ? '(dry run) Would fix' : '✅ Fixed'}: ${fixed} books`);
  process.exit(0);
}

// ── Phase A — Same-author inference ──────────────────────────────────────────

let phaseAFixed = 0;
const phaseBQueue = [];

if (RUN_ALL || PHASE_A) {
  console.log('── Phase A: same-author inference ──────────────────────────────────────\n');

  // Build author → [books with series] map
  const authorSeriesMap = new Map(); // author → Map<series, [title patterns]>

  for (const book of hasSeries) {
    for (const author of (book.authors ?? [])) {
      if (!authorSeriesMap.has(author)) authorSeriesMap.set(author, new Map());
      const seriesMap = authorSeriesMap.get(author);
      if (!seriesMap.has(book.series)) seriesMap.set(book.series, []);
      seriesMap.get(book.series).push(book.title.toLowerCase());
    }
  }

  for (const book of missing) {
    const authors = book.authors ?? [];
    let matched = null;

    for (const author of authors) {
      const seriesMap = authorSeriesMap.get(author);
      if (!seriesMap) continue;

      // If author has exactly one series → strong signal
      if (seriesMap.size === 1) {
        const [[seriesName, titles]] = [...seriesMap.entries()];
        // Only auto-assign if the author has 3+ books in this series (high confidence)
        if (titles.length >= 3) {
          matched = { series: seriesName };
          break;
        }
      }

      // If author has multiple series, try title-keyword matching
      for (const [seriesName, titles] of seriesMap.entries()) {
        // Extract significant words from series titles (skip stop words)
        const stopWords = new Set(['the','a','an','of','and','in','to','for','on','at','by','with']);
        const keywords = titles
          .flatMap(t => t.split(/\s+/))
          .filter(w => w.length > 3 && !stopWords.has(w));
        const bookTitleLower = book.title.toLowerCase();
        const matchCount = keywords.filter(kw => bookTitleLower.includes(kw)).length;
        if (matchCount >= 2) {
          matched = { series: seriesName };
          break;
        }
      }
      if (matched) break;
    }

    if (matched) {
      process.stdout.write(`  [A] "${book.title}" → "${matched.series}" … `);
      if (DRY_RUN) { console.log('(dry run)'); phaseAFixed++; continue; }
      const { error } = await supabase
        .from('books')
        .update({ series: matched.series })
        .eq('slug', book.slug);
      if (error) { console.log(`✗ ${error.message}`); }
      else { console.log('✓'); phaseAFixed++; }
      await sleep(DELAY_MS);
    } else {
      phaseBQueue.push(book);
    }
  }

  console.log(`\n   Phase A: fixed ${phaseAFixed} books`);
  console.log(`   Remaining for Phase B: ${phaseBQueue.length}\n`);
}

// ── Phase B — Google Books subtitle/description parsing ───────────────────────
//
// Google Books seriesInfo.seriesId is an opaque internal ID, not a name.
// Instead we parse the subtitle and description fields which often contain
// human-readable series info like:
//   subtitle: "Book One of the Stormlight Archive"
//   subtitle: "A Novel of the Black Company"
//   description: "(The Dresden Files, #3)"
//   subtitle: "Mistborn, Book Two"

const SERIES_PATTERNS = [
  // "Book N of/in The Series Name"
  /\bbook\s+(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(?:of|in)\s+(?:the\s+)?([A-Z][^,()\n]{3,50})/i,
  // "The Series Name, Book N"
  /^([A-Z][^,()\n]{3,50}),\s+book\s+(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)/i,
  // "(Series Name, #N)" or "(Series Name #N)"
  /\(([A-Z][^,()]{3,50}),?\s*#\d/,
  // "A Novel of the Series Name"
  /\ba\s+novel\s+of\s+(?:the\s+)?([A-Z][^,()\n]{3,50})/i,
  // "Series Name, Volume N"
  /^([A-Z][^,()\n]{3,50}),\s+vol(?:ume)?\.?\s+\d/i,
  // "Series Name Series"  e.g. "The Dresden Files Series"
  /^([A-Z][^,()\n]{3,50})\s+[Ss]eries$/,
];

const NUMBER_WORDS = { one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10 };

function extractSeriesFromText(text) {
  if (!text) return null;
  for (const pattern of SERIES_PATTERNS) {
    const m = text.match(pattern);
    if (m) {
      const name = m[1].trim().replace(/\s+/g, ' ');
      // Sanity: skip if it looks like a sentence fragment
      if (name.split(' ').length > 8) continue;
      return name;
    }
  }
  return null;
}

function extractNumberFromText(text) {
  if (!text) return null;
  // "#N" pattern
  const hashMatch = text.match(/#(\d+(?:\.\d+)?)/);
  if (hashMatch) return parseFloat(hashMatch[1]);
  // "Book N" pattern
  const bookMatch = text.match(/\bbook\s+(\w+)/i);
  if (bookMatch) {
    const word = bookMatch[1].toLowerCase();
    if (NUMBER_WORDS[word]) return NUMBER_WORDS[word];
    const n = parseInt(word, 10);
    if (!isNaN(n)) return n;
  }
  return null;
}

if (RUN_ALL || PHASE_B) {
  const queue = PHASE_B ? missing : phaseBQueue;
  const withISBN = queue.filter(b => b.isbn);
  const toProcess = LIMIT ? withISBN.slice(0, LIMIT) : withISBN;

  console.log('── Phase B: Google Books subtitle/description parsing ───────────────────\n');
  console.log(`   Books with ISBN to check: ${toProcess.length}`);
  if (queue.length - withISBN.length > 0) {
    console.log(`   Skipped (no ISBN): ${queue.length - withISBN.length}`);
  }
  console.log('');

  let phaseBFixed = 0;
  let quotaHit = false;

  for (const book of toProcess) {
    if (quotaHit) break;

    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}&fields=items(volumeInfo(title,subtitle,description))`;

    let data;
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        console.log('\n⚠️  Google Books quota exceeded — stopping Phase B. Run again tomorrow.');
        quotaHit = true;
        break;
      }
      if (!res.ok) { await sleep(DELAY_MS); continue; }
      data = await res.json();
    } catch {
      await sleep(DELAY_MS);
      continue;
    }

    const vol = data?.items?.[0]?.volumeInfo;
    if (!vol) { await sleep(DELAY_MS); continue; }

    // Try subtitle first (most reliable), then first sentence of description
    const descSnippet = vol.description
      ? vol.description.split(/[.!?]/)[0].trim()
      : null;

    const seriesName =
      extractSeriesFromText(vol.subtitle) ||
      extractSeriesFromText(descSnippet);

    if (!seriesName) { await sleep(DELAY_MS); continue; }

    const seriesNumber =
      extractNumberFromText(vol.subtitle) ||
      extractNumberFromText(descSnippet);

    const update = { series: seriesName };
    if (seriesNumber !== null && !book.series_number) update.series_number = seriesNumber;

    process.stdout.write(
      `  [B] "${book.title}" → "${seriesName}"${seriesNumber ? ` #${seriesNumber}` : ''} … `
    );
    if (DRY_RUN) { console.log('(dry run)'); phaseBFixed++; await sleep(DELAY_MS); continue; }

    const { error } = await supabase
      .from('books')
      .update(update)
      .eq('slug', book.slug);

    if (error) { console.log(`✗ ${error.message}`); }
    else { console.log('✓'); phaseBFixed++; }

    await sleep(DELAY_MS);
  }

  console.log(`\n   Phase B: fixed ${phaseBFixed} books`);
}

console.log('\n✅ Done.');
