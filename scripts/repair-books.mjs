/**
 * repair-books.mjs
 *
 * Fixes books in the DB that have:
 *   - Non-English synopsis (detected by non-ASCII character ratio)
 *   - Missing synopsis (null)
 *   - Missing publication_year
 *
 * Synopsis source: Google Books API (reliable English descriptions)
 * Publication year source: Open Library editions (first pub year, not edition date)
 *
 * Usage:
 *   node scripts/repair-books.mjs               # fix all bad records
 *   node scripts/repair-books.mjs --dry-run      # preview without writing
 *   node scripts/repair-books.mjs --all          # re-fetch every book (force refresh)
 *   node scripts/repair-books.mjs --year-only    # recheck publication years only (no Google Books calls)
 *   node scripts/repair-books.mjs --limit 20     # cap how many are processed this run
 *   node scripts/repair-books.mjs --offset 200   # skip the first N books (resume after interruption)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN    = process.argv.includes('--dry-run');
const FORCE_ALL  = process.argv.includes('--all');
const YEAR_ONLY  = process.argv.includes('--year-only');
const LIMIT_ARG  = process.argv.indexOf('--limit');
const LIMIT      = LIMIT_ARG  !== -1 ? parseInt(process.argv[LIMIT_ARG  + 1], 10) : null;
const OFFSET_ARG = process.argv.indexOf('--offset');
const OFFSET     = OFFSET_ARG !== -1 ? parseInt(process.argv[OFFSET_ARG + 1], 10) : 0;
const DELAY_MS   = 600;

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Returns true if the text is likely non-English based on the ratio of
 * non-ASCII characters in the alphabetic content.
 */
function isLikelyNonEnglish(text) {
  if (!text) return false;
  // Count letters only (ignore digits, punctuation, spaces)
  const letters = [...text].filter((c) => /\p{L}/u.test(c));
  if (letters.length < 20) return false; // too short to judge
  const nonAsciiLetters = letters.filter((c) => c.charCodeAt(0) > 127);
  return nonAsciiLetters.length / letters.length > 0.05; // >5% non-ASCII letters
}

/**
 * Fetch synopsis from Google Books API (English descriptions only).
 * Does NOT use Google Books for publication_year — it returns edition dates, not first pub year.
 */
async function fetchGoogleBooksSynopsis(title, author) {
  const queries = [
    `intitle:${title} inauthor:${author}`,
    `${title} ${author}`,
    title,
  ];

  for (const query of queries) {
    const q = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=en&maxResults=1&printType=books&key=${GOOGLE_BOOKS_KEY}`;
    try {
      const res = await fetch(url);
      if (res.status === 429) throw new Error('QUOTA_EXCEEDED');
      if (!res.ok) continue;
      const data = await res.json();
      const item = data.items?.[0]?.volumeInfo;
      if (!item) continue;
      const synopsis = item.description?.trim() ?? null;
      return synopsis ? synopsis.slice(0, 2000) : null;
    } catch (e) {
      if (e.message === 'QUOTA_EXCEEDED') throw e;
      continue;
    }
  }
  return null;
}

function olAuthorMatches(olAuthorNames, expectedAuthor) {
  if (!expectedAuthor || !olAuthorNames?.length) return false;
  const norm = (s) => s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  const expParts = norm(expectedAuthor).split(/\s+/);
  const expLast  = expParts[expParts.length - 1];
  return olAuthorNames.some((name) => {
    const n = norm(name);
    const nParts = n.split(/\s+/);
    return n.includes(expLast) || expParts.some((p) => nParts.includes(p));
  });
}

// Requires ≥60% of significant query words to appear in the OL title.
// Prevents "Harry Potter and the Philosopher's Stone" matching a search for
// "Harry Potter and the Chamber of Secrets" (they share harry/potter but not the unique words).
function olTitleMatches(olTitle, queryTitle) {
  if (!olTitle || !queryTitle) return false;
  const STOP = new Set(['the','a','an','and','or','of','in','to','for','its','is','by']);
  const sig = (s) => s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  const olWords   = new Set(sig(olTitle));
  const queryWords = sig(queryTitle);
  if (queryWords.length === 0) return true;
  const overlap = queryWords.filter((w) => olWords.has(w)).length;
  return overlap / queryWords.length >= 0.6;
}

/**
 * Fetch the first publication year from Open Library.
 * Validates the result against the expected author to prevent "merge pollution"
 * (OL returning an old unrelated book that happens to match the title search).
 * Returns null rather than a wrong year if no author-matched result is found.
 */
async function fetchOLFirstPublishYear(title, author) {
  const q = encodeURIComponent(`${title} ${author ?? ''}`);
  const currentYear = new Date().getFullYear();
  try {
    const searchRes = await fetch(
      `https://openlibrary.org/search.json?q=${q}&fields=key,first_publish_year,author_name,title&limit=5`,
    );
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();

    // Require both title AND author to match — author-only check caused series books
    // (e.g. HP 2-5) to match HP book 1 since the author (Rowling) is the same
    const doc = (searchData.docs ?? []).find((d) =>
      olTitleMatches(d.title, title) && (!author || olAuthorMatches(d.author_name, author))
    ) ?? null;
    if (!doc) return null;

    const searchIndexYear = doc.first_publish_year ? parseInt(doc.first_publish_year) : null;

    if (doc.key) {
      try {
        const editionsRes = await fetch(
          `https://openlibrary.org${doc.key}/editions.json?limit=100`,
        );
        if (editionsRes.ok) {
          const editionsData = await editionsRes.json();
          const years = (editionsData.entries ?? [])
            .map((e) => {
              const m = String(e.publish_date ?? '').match(/\b(1[89]\d{2}|20[012]\d)\b/);
              return m ? parseInt(m[1]) : null;
            })
            .filter((y) => y && y >= 1800 && y <= currentYear);
          if (years.length > 0) return Math.min(...years);
        }
      } catch {}
    }

    return searchIndexYear;
  } catch {
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}
if (!process.env.GOOGLE_BOOKS_API_KEY) {
  console.error('Missing GOOGLE_BOOKS_API_KEY in .env');
  process.exit(1);
}

const GOOGLE_BOOKS_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function main() {
  console.log(`\n🔧 Fantasy Obscura — Book Repair${DRY_RUN ? ' [DRY RUN]' : ''}${FORCE_ALL ? ' [FORCE ALL]' : ''}${YEAR_ONLY ? ' [YEAR ONLY]' : ''}\n`);

  // Paginate to bypass Supabase's 1000-row default cap
  const PAGE = 1000;
  const allBooks = [];
  let pageOffset = 0;
  while (true) {
    const { data, error } = await supabase
      .from('books')
      .select('id, title, authors, synopsis, publication_year')
      .order('title')
      .range(pageOffset, pageOffset + PAGE - 1);
    if (error) { console.error('Supabase error:', error.message); process.exit(1); }
    if (!data || data.length === 0) break;
    allBooks.push(...data);
    if (data.length < PAGE) break;
    pageOffset += PAGE;
  }

  console.log(`Total books in DB: ${allBooks.length}`);

  const needsRepair = (FORCE_ALL || YEAR_ONLY
    ? allBooks
    : allBooks.filter((b) => {
        if (!b.synopsis) return true;                       // missing
        if (isLikelyNonEnglish(b.synopsis)) return true;   // non-English
        if (!b.publication_year) return true;               // missing year
        return false;
      })
  ).slice(OFFSET);  // --offset: skip books already processed in a previous run

  // All books get year rechecked under --all or --year-only; otherwise only missing ones
  const needsYearRepair = new Set(
    needsRepair
      .filter((b) => !b.publication_year || FORCE_ALL || YEAR_ONLY)
      .map((b) => b.id),
  );

  const toProcess = LIMIT ? needsRepair.slice(0, LIMIT) : needsRepair;
  if (OFFSET) console.log(`Skipping first:    ${OFFSET} (--offset)`);
  console.log(`Needs repair:      ${needsRepair.length}`);
  console.log(`Processing:        ${toProcess.length}\n`);

  if (toProcess.length === 0) {
    console.log('✅ Nothing to repair.');
    return;
  }

  let fixed = 0;
  let noData = 0;

  for (const book of toProcess) {
    const author = book.authors?.[0] ?? '';
    const label = `${book.title.slice(0, 50).padEnd(50)}`;
    const issue = YEAR_ONLY ? 'year recheck' : !book.synopsis ? 'no synopsis' : isLikelyNonEnglish(book.synopsis) ? 'non-English' : 'no year';
    process.stdout.write(`  ${label} [${issue}] … `);

    // Fetch synopsis from Google Books — skipped under --year-only to avoid quota usage
    let synopsis = null;
    if (!YEAR_ONLY) {
      try {
        synopsis = await fetchGoogleBooksSynopsis(book.title, author);
      } catch (e) {
        if (e.message === 'QUOTA_EXCEEDED') {
          console.log('\n❌ Google Books daily quota exceeded. Try again tomorrow.');
          break;
        }
      }
      await sleep(DELAY_MS);
    }

    // Fetch first publication year from Open Library (Google Books returns edition dates only)
    let firstPublishYear = null;
    if (needsYearRepair.has(book.id)) {
      firstPublishYear = await fetchOLFirstPublishYear(book.title, author);
      await sleep(DELAY_MS);
    }

    if (!synopsis && !firstPublishYear) {
      console.log('⚠️  no data found');
      noData++;
      continue;
    }

    const updates = {};
    if (synopsis && (isLikelyNonEnglish(book.synopsis) || !book.synopsis)) {
      updates.synopsis = synopsis;
    }
    if (firstPublishYear && !book.publication_year) {
      updates.publication_year = firstPublishYear;
    }
    // Force-update year if --all or --year-only (uses OL, not Google Books)
    if ((FORCE_ALL || YEAR_ONLY) && firstPublishYear) {
      updates.publication_year = firstPublishYear;
    }

    if (Object.keys(updates).length === 0) {
      console.log('– nothing to update');
      continue;
    }

    if (DRY_RUN) {
      const preview = updates.synopsis
        ? `synopsis: "${updates.synopsis.slice(0, 60)}…"`
        : `year: ${updates.publication_year}`;
      console.log(`[dry] ${preview}`);
      fixed++;
      continue;
    }

    const { error: updateErr } = await supabase
      .from('books')
      .update(updates)
      .eq('id', book.id);

    if (updateErr) {
      console.log(`✗ ${updateErr.message}`);
    } else {
      const parts = [];
      if (updates.synopsis) parts.push('synopsis ✓');
      if (updates.publication_year) parts.push(`year → ${updates.publication_year}`);
      console.log(parts.join(', '));
      fixed++;
    }
  }

  console.log(`\n──────────────────────────────`);
  console.log(`✅ Fixed:   ${fixed}`);
  if (noData) console.log(`⚠️  No data: ${noData} (Google Books returned nothing)`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
