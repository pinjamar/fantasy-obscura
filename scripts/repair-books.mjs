/**
 * repair-books.mjs
 *
 * Fixes books in the DB that have:
 *   - Non-English synopsis (detected by non-ASCII character ratio)
 *   - Missing synopsis (null)
 *   - Clearly wrong publication_year (null, or suspiciously old for modern titles)
 *
 * Uses Google Books API (no key required, rate-limited) as the data source,
 * which reliably returns English descriptions and edition-specific dates.
 *
 * Usage:
 *   node scripts/repair-books.mjs               # fix all bad records
 *   node scripts/repair-books.mjs --dry-run      # preview without writing
 *   node scripts/repair-books.mjs --all          # re-fetch every book (force refresh)
 *   node scripts/repair-books.mjs --limit 20     # cap how many are updated
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN   = process.argv.includes('--dry-run');
const FORCE_ALL = process.argv.includes('--all');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT     = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const DELAY_MS  = 600; // Google Books is generous but don't hammer it

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
 * Fetch synopsis and publication year from Google Books API.
 * Returns English descriptions reliably for English-language books.
 */
async function fetchGoogleBooks(title, author) {
  // Try strict field operators first, fall back to plain text search
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

      const rawYear = item.publishedDate;
      const year = rawYear ? parseInt(rawYear.slice(0, 4), 10) : null;
      const validYear = year && year >= 1800 && year <= new Date().getFullYear() ? year : null;
      const synopsis = item.description?.trim() ?? null;
      return {
        synopsis: synopsis ? synopsis.slice(0, 2000) : null,
        publication_year: validYear,
      };
    } catch (e) {
      if (e.message === 'QUOTA_EXCEEDED') throw e;
      continue;
    }
  }
  return null;
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
  console.log(`\n🔧 Fantasy Obscura — Book Repair${DRY_RUN ? ' [DRY RUN]' : ''}${FORCE_ALL ? ' [FORCE ALL]' : ''}\n`);

  const { data: books, error } = await supabase
    .from('books')
    .select('id, title, authors, synopsis, publication_year')
    .order('title');

  if (error) {
    console.error('Supabase error:', error.message);
    process.exit(1);
  }

  console.log(`Total books in DB: ${books.length}`);

  const needsRepair = FORCE_ALL
    ? books
    : books.filter((b) => {
        if (!b.synopsis) return true;                       // missing
        if (isLikelyNonEnglish(b.synopsis)) return true;   // non-English
        if (!b.publication_year) return true;               // missing year
        return false;
      });

  const toProcess = LIMIT ? needsRepair.slice(0, LIMIT) : needsRepair;
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
    const issue = !book.synopsis ? 'no synopsis' : isLikelyNonEnglish(book.synopsis) ? 'non-English' : 'no year';
    process.stdout.write(`  ${label} [${issue}] … `);

    let meta;
    try {
      meta = await fetchGoogleBooks(book.title, author);
    } catch (e) {
      if (e.message === 'QUOTA_EXCEEDED') {
        console.log('\n❌ Google Books daily quota exceeded. Try again tomorrow.');
        break;
      }
      meta = null;
    }
    await sleep(DELAY_MS);

    if (!meta || (!meta.synopsis && !meta.publication_year)) {
      console.log('⚠️  no data from Google Books');
      noData++;
      continue;
    }

    const updates = {};
    if (meta.synopsis && (isLikelyNonEnglish(book.synopsis) || !book.synopsis)) {
      updates.synopsis = meta.synopsis;
    }
    if (meta.publication_year && !book.publication_year) {
      updates.publication_year = meta.publication_year;
    }
    // Force-update year if --all flag is set
    if (FORCE_ALL && meta.publication_year) {
      updates.publication_year = meta.publication_year;
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
