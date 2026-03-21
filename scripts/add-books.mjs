/**
 * add-books.mjs
 *
 * Add one or more books to the DB by searching Google Books API.
 * Skips books that already exist (matched by slug or title).
 *
 * Usage (single book):
 *   node scripts/add-books.mjs "The Name of the Wind" "Patrick Rothfuss"
 *   node scripts/add-books.mjs "Dune"
 *
 * Usage (batch — one title per line, optionally "Title | Author"):
 *   node scripts/add-books.mjs --file books-to-add.txt
 *
 * After importing, run the classify pipeline to fill in metadata:
 *   node scripts/classify-metadata.mjs
 *   node scripts/classify-vibes.mjs
 *   node scripts/classify-tropes.mjs
 *   node scripts/classify-creatures.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import fs from 'fs';

config();

const DELAY_MS = 350;

// ── Env checks ────────────────────────────────────────────────────────────────

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing Supabase env vars in .env');
  process.exit(1);
}
if (!process.env.GOOGLE_BOOKS_API_KEY) {
  console.error('❌  Missing GOOGLE_BOOKS_API_KEY in .env');
  process.exit(1);
}

const GOOGLE_BOOKS_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isLikelyNonEnglish(text) {
  if (!text) return false;
  const letters = [...text].filter((c) => /\p{L}/u.test(c));
  if (letters.length < 20) return false;
  const nonAscii = letters.filter((c) => c.charCodeAt(0) > 127);
  return nonAscii.length / letters.length > 0.05;
}

/**
 * Search Google Books and return the best matching volume's full info.
 */
async function searchGoogleBooks(title, author) {
  const queries = author
    ? [`intitle:${title} inauthor:${author}`, `${title} ${author}`, title]
    : [title];

  for (const query of queries) {
    const q = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=en&maxResults=5&printType=books&key=${GOOGLE_BOOKS_KEY}`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.items?.length) continue;

      // Pick the best match: prefer exact title match, then take first result
      const item =
        data.items.find((i) =>
          i.volumeInfo.title?.toLowerCase() === title.toLowerCase(),
        ) ?? data.items[0];

      const info = item.volumeInfo;
      const rawYear = info.publishedDate;
      const year = rawYear ? parseInt(rawYear.slice(0, 4), 10) : null;
      const validYear = year && year >= 1800 && year <= new Date().getFullYear() ? year : null;
      const synopsis = info.description?.trim() ?? null;
      const thumb =
        info.imageLinks?.extraLarge ??
        info.imageLinks?.large ??
        info.imageLinks?.medium ??
        info.imageLinks?.thumbnail ??
        null;
      const cover_url = thumb
        ? thumb.replace(/^http:/, 'https:').replace('&edge=curl', '')
        : null;
      const detectedAuthors = info.authors ?? (author ? [author] : null);
      const series = info.series ?? null;

      return {
        title: info.title ?? title,
        authors: detectedAuthors,
        cover_url,
        synopsis: synopsis ? synopsis.slice(0, 2000) : null,
        publication_year: validYear,
        page_count: info.pageCount ?? null,
        series,
      };
    } catch {
      continue;
    }
  }
  return null;
}

/**
 * Open Library metadata: cover, isbn, page count, AND first publication year.
 * The `first_publish_year` field is cross-validated against actual edition records
 * so we get the original publication year, not a reprint/edition date.
 * Google Books `publishedDate` returns edition dates only — never use it for pub year.
 */
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

async function fetchOpenLibraryMeta(title, author) {
  const q = encodeURIComponent(`${title} ${author ?? ''}`);
  const url = `https://openlibrary.org/search.json?q=${q}&limit=3&fields=cover_i,isbn,number_of_pages_median,key,first_publish_year,author_name`;
  const currentYear = new Date().getFullYear();
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    // Pick the first result whose author matches — prevents old unrelated books
    // from polluting the publication year (e.g. returning 1872 for a 2025 book)
    const doc = author
      ? (data.docs ?? []).find((d) => olAuthorMatches(d.author_name, author)) ?? null
      : data.docs?.[0] ?? null;
    if (!doc) return null;

    let synopsis = null;
    let firstPublishYear = doc.first_publish_year ? parseInt(doc.first_publish_year) : null;

    if (doc.key) {
      // Fetch Work record for synopsis
      try {
        const workRes = await fetch(`https://openlibrary.org${doc.key}.json`);
        if (workRes.ok) {
          const work = await workRes.json();
          const desc = work.description;
          const raw = typeof desc === 'string' ? desc : (desc?.value ?? null);
          if (raw && !isLikelyNonEnglish(raw)) synopsis = raw.slice(0, 2000);
        }
      } catch {}

      // Cross-validate publication year via actual editions (search index can be stale)
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
          if (years.length > 0) firstPublishYear = Math.min(...years);
        }
      } catch {}
    }

    return {
      cover_url: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : null,
      isbn: doc.isbn?.[0] ?? null,
      page_count: doc.number_of_pages_median ?? null,
      publication_year: firstPublishYear,
      synopsis,
    };
  } catch {
    return null;
  }
}

// ── Parse input ───────────────────────────────────────────────────────────────

/**
 * Returns array of { title, author } objects.
 * Supports:
 *   CLI args:  "Title" "Author"  or  "Title"
 *   File:      --file path.txt  (one "Title | Author" per line)
 */
function parseInput() {
  const args = process.argv.slice(2);

  const fileIdx = args.indexOf('--file');
  if (fileIdx !== -1) {
    const filePath = args[fileIdx + 1];
    if (!filePath || !fs.existsSync(filePath)) {
      console.error(`❌  File not found: ${filePath}`);
      process.exit(1);
    }
    return fs
      .readFileSync(filePath, 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
      .map((l) => {
        const [title, author] = l.split('|').map((s) => s.trim());
        return { title, author: author ?? null };
      });
  }

  // Single book from CLI args
  const title = args[0];
  const author = args[1] ?? null;
  if (!title) {
    console.error('Usage: node scripts/add-books.mjs "Title" "Author"');
    console.error('       node scripts/add-books.mjs --file books.txt');
    process.exit(1);
  }
  return [{ title, author }];
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const books = parseInput();
  console.log(`\n📚 Fantasy Obscura — Add Books (${books.length} to process)\n`);

  // Fetch existing books for dedup
  const { data: existing, error: existErr } = await supabase
    .from('books')
    .select('slug, title');
  if (existErr) {
    console.error('Supabase error:', existErr.message);
    process.exit(1);
  }
  const existingSlugs  = new Set(existing.map((b) => b.slug).filter(Boolean));
  const existingTitles = new Set(existing.map((b) => b.title.toLowerCase().trim()));

  let imported = 0;
  let skipped  = 0;
  let failed   = 0;

  for (const { title, author } of books) {
    const slug = slugify(title);
    process.stdout.write(`  "${title}"${author ? ` — ${author}` : ''} … `);

    // Dedup check
    if (existingSlugs.has(slug) || existingTitles.has(title.toLowerCase().trim())) {
      console.log('⏭  already in DB');
      skipped++;
      continue;
    }

    // Fetch from Google Books
    const gb = await searchGoogleBooks(title, author);
    await sleep(DELAY_MS);

    let record = {
      title,
      slug,
      authors: author ? [author] : null,
      cover_url: null,
      isbn: null,
      synopsis: null,
      publication_year: null,
      page_count: null,
      series: null,
      series_number: null,
      darkness_level: null,
      heat_level: null,
    };

    if (gb) {
      record.title      = gb.title;
      record.authors    = gb.authors ?? record.authors;
      record.cover_url  = gb.cover_url;
      record.synopsis   = gb.synopsis;
      record.page_count = gb.page_count;
      // NOTE: do NOT use gb.publication_year — Google Books returns edition dates,
      // not first publication year. Open Library is fetched below for this field.
    }

    // Open Library — always fetch for publication_year (first pub, not edition date)
    // Also fills cover, isbn, page_count, synopsis if still missing from Google Books
    const ol = await fetchOpenLibraryMeta(title, author);
    await sleep(DELAY_MS);
    if (ol) {
      record.cover_url        = record.cover_url  ?? ol.cover_url;
      record.isbn             = record.isbn       ?? ol.isbn;
      record.page_count       = record.page_count ?? ol.page_count;
      record.synopsis         = record.synopsis   ?? ol.synopsis;
      // OL first_publish_year always wins — fall back to GB edition year only if OL has nothing
      record.publication_year = ol.publication_year ?? gb?.publication_year ?? null;
    } else {
      record.publication_year = gb?.publication_year ?? null;
    }

    const { error } = await supabase.from('books').insert(record);
    if (error) {
      console.log(`✗ ${error.message}`);
      failed++;
    } else {
      const sources = [
        gb?.cover_url       ? 'cover ✓' : 'cover ✗',
        record.synopsis     ? 'synopsis ✓' : 'synopsis ✗',
        record.publication_year ? `${record.publication_year}` : 'year ?',
      ].join(' · ');
      console.log(`✓  ${sources}`);
      imported++;
      existingSlugs.add(slug);
      existingTitles.add(title.toLowerCase().trim());
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n──────────────────────────────────────`);
  console.log(`✅ Imported: ${imported} | ⏭  Skipped: ${skipped} | ✗ Failed: ${failed}`);

  if (imported > 0) {
    console.log(`
Next steps — run the classify pipeline to fill in metadata:
  node scripts/classify-metadata.mjs
  node scripts/classify-vibes.mjs
  node scripts/classify-tropes.mjs
  node scripts/classify-creatures.mjs
`);
  }
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
