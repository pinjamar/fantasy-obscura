/**
 * replace-book.mjs
 *
 * Looks up a book by slug in your DB, fetches the best matching edition from
 * Google Books API (showing you all candidates), and lets you pick which one
 * to use. Updates cover_url and optionally other fields (title, authors,
 * publication_year, page_count, isbn, synopsis).
 *
 * Usage:
 *   node scripts/replace-book.mjs <slug>
 *   node scripts/replace-book.mjs harry-potter-philosophers-stone
 *   node scripts/replace-book.mjs harry-potter-philosophers-stone --dry-run
 *   node scripts/replace-book.mjs harry-potter-philosophers-stone --cover-only
 *
 * Flags:
 *   --dry-run      Show what would be updated, don't write to DB
 *   --cover-only   Only update cover_url, skip all other fields
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import readline from 'readline';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

config();

const slug = process.argv[2];
const DRY_RUN = process.argv.includes('--dry-run');
const COVER_ONLY = process.argv.includes('--cover-only');

if (!slug) {
  console.error('Usage: node scripts/replace-book.mjs <slug> [--dry-run] [--cover-only]');
  process.exit(1);
}

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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function upgradeCoverUrl(url) {
  if (!url) return null;
  const m = url.match(/[?&]id=([^&]+)/);
  if (m) return `https://books.google.com/books/publisher/content/images/frontcover/${m[1]}?fife=w400-h600`;
  return url.replace(/^http:/, 'https:').replace('&edge=curl', '');
}

function openPreview(currentBook, candidates) {
  const currentCard = `
    <div class="card current">
      <div class="badge">CURRENT</div>
      <img src="${currentBook.cover_url ?? ''}" onerror="this.style.background='#ddd';this.removeAttribute('src')" />
      <div class="info">
        <div class="num">—</div>
        <div class="title">${currentBook.title}</div>
        <div class="meta">${(currentBook.authors ?? []).join(', ')}</div>
        <div class="meta">${currentBook.publication_year ?? '—'} · ${currentBook.page_count ?? '—'} pp · ISBN: ${currentBook.isbn ?? '—'}</div>
      </div>
    </div>`;

  const cards = candidates.map((c, i) => `
    <div class="card" onclick="pick(${i + 1})">
      <div class="badge">${i + 1}</div>
      <img src="${c.cover_url}" onerror="this.style.background='#ddd';this.removeAttribute('src')" />
      <div class="info">
        <div class="num">[${i + 1}]</div>
        <div class="title">${c.title}</div>
        <div class="meta">${c.authors.join(', ')}</div>
        <div class="meta">${c.year ?? '—'} · ${c.pages ?? '—'} pp · ISBN: ${c.isbn ?? '—'}</div>
      </div>
    </div>`).join('');

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>replace-book — ${currentBook.title}</title>
<style>
  body { font-family: sans-serif; background: #f4f4f4; padding: 24px; }
  h2 { margin-bottom: 4px; }
  p { color: #666; margin: 0 0 20px; }
  .grid { display: flex; flex-wrap: wrap; gap: 16px; }
  .card { background: white; border-radius: 10px; padding: 12px; width: 160px; box-shadow: 0 2px 8px rgba(0,0,0,.1); position: relative; cursor: pointer; transition: box-shadow .15s; }
  .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.2); }
  .card.current { border: 3px solid #888; cursor: default; }
  .card img { width: 100%; aspect-ratio: 2/3; object-fit: cover; border-radius: 6px; background: #eee; display: block; }
  .badge { position: absolute; top: -8px; left: -8px; background: #1a1a1a; color: white; border-radius: 999px; font-size: 11px; font-weight: bold; padding: 2px 8px; }
  .card.current .badge { background: #888; }
  .info { margin-top: 8px; }
  .num { font-size: 20px; font-weight: bold; color: #111; }
  .title { font-size: 12px; font-weight: 600; margin: 2px 0; line-height: 1.3; }
  .meta { font-size: 11px; color: #888; line-height: 1.4; }
</style>
</head>
<body>
<h2>replace-book: ${currentBook.title}</h2>
<p>Click a card to copy its number, then type it in the terminal. Close this tab when done.</p>
<div class="grid">
  ${currentCard}
  ${cards}
</div>
<script>
function pick(n) {
  const el = document.getElementById('picked');
  el.textContent = 'Type ' + n + ' in the terminal';
  el.style.display = 'block';
}
</script>
<div id="picked" style="display:none;margin-top:20px;font-size:18px;font-weight:bold;color:#2563eb;"></div>
</body>
</html>`;

  const tmpFile = path.join(os.tmpdir(), `replace-book-preview-${Date.now()}.html`);
  fs.writeFileSync(tmpFile, html);

  // Open in default browser cross-platform
  try {
    const cmd = process.platform === 'win32' ? `start "" "${tmpFile}"`
              : process.platform === 'darwin' ? `open "${tmpFile}"`
              : `xdg-open "${tmpFile}"`;
    execSync(cmd, { stdio: 'ignore' });
    console.log(`\n🌐 Preview opened in browser — pick a number and type it below.\n`);
  } catch {
    console.log(`\nCould not auto-open browser. Open this file manually:\n  ${tmpFile}\n`);
  }
}

/**
 * Returns true if any of the OL author_name strings match the expected author.
 * Matches on last name to handle "J.K. Rowling" vs "Rowling, Joanne" etc.
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

function olTitleMatches(olTitle, queryTitle) {
  if (!olTitle || !queryTitle) return false;
  const STOP = new Set(['the','a','an','and','or','of','in','to','for','its','is','by']);
  const sig = (s) => s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  const olWords    = new Set(sig(olTitle));
  const queryWords = sig(queryTitle);
  if (queryWords.length === 0) return true;
  const overlap = queryWords.filter((w) => olWords.has(w)).length;
  return overlap / queryWords.length >= 0.6;
}

/**
 * Fetches the first publication year from Open Library using two-step validation:
 * 1. Search top 5 results, require BOTH title and author to match — author-only check
 *    caused series books to match book 1 (same author, book 1 has more OL relevance).
 * 2. Work editions endpoint gives all known publish dates — compute min ourselves.
 * Returns null if no matched result is found, rather than a wrong year.
 */
async function fetchFirstPublishYear(title, authors) {
  const author = Array.isArray(authors) ? authors[0] : (authors ?? '');
  const q = encodeURIComponent(`${title} ${author}`);
  const currentYear = new Date().getFullYear();

  try {
    // Step 1 — search, get top 5 results with title + author_name for validation
    const searchRes = await fetch(
      `https://openlibrary.org/search.json?q=${q}&fields=key,first_publish_year,author_name,title&limit=5`,
    );
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();

    // Require both title AND author to match
    const doc = (searchData.docs ?? []).find((d) =>
      olTitleMatches(d.title, title) && (!author || olAuthorMatches(d.author_name, author))
    ) ?? null;
    if (!doc) return null;

    const searchIndexYear = doc.first_publish_year ? parseInt(doc.first_publish_year) : null;

    // Step 2 — fetch Work editions and compute actual minimum publish year
    if (doc.key) {
      try {
        const editionsRes = await fetch(
          `https://openlibrary.org${doc.key}/editions.json?limit=100`,
        );
        if (editionsRes.ok) {
          const editionsData = await editionsRes.json();
          const years = (editionsData.entries ?? [])
            .map((e) => {
              const raw = e.publish_date;
              if (!raw) return null;
              const m = String(raw).match(/\b(1[89]\d{2}|20[012]\d)\b/);
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

async function fetchCandidates(title, authors) {
  const author = Array.isArray(authors) ? authors[0] : (authors ?? '');
  const queries = [
    `intitle:"${title}" inauthor:"${author}"`,
    `intitle:"${title}" inauthor:${author}`,
    `${title} ${author}`,
    title,
  ];

  const seen = new Set();
  const candidates = [];

  for (const query of queries) {
    const q = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=en&maxResults=10&printType=books&key=${GOOGLE_BOOKS_KEY}`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      for (const item of data.items ?? []) {
        const id = item.id;
        if (seen.has(id)) continue;
        seen.add(id);
        const info = item.volumeInfo ?? {};
        const thumb =
          info.imageLinks?.extraLarge ??
          info.imageLinks?.large ??
          info.imageLinks?.medium ??
          info.imageLinks?.thumbnail ??
          null;
        if (!thumb) continue;
        const isbn =
          (info.industryIdentifiers ?? []).find((x) => x.type === 'ISBN_13')?.identifier ??
          (info.industryIdentifiers ?? []).find((x) => x.type === 'ISBN_10')?.identifier ??
          null;
        candidates.push({
          googleId: id,
          title: info.title ?? '',
          authors: info.authors ?? [],
          year: info.publishedDate?.slice(0, 4) ?? null,
          pages: info.pageCount ?? null,
          isbn,
          cover_url: upgradeCoverUrl(thumb),
          synopsis: info.description ?? null,
        });
      }
    } catch {
      continue;
    }
    await sleep(300);
    if (candidates.length >= 15) break;
  }

  return candidates;
}

async function main() {
  console.log(`\n📖 replace-book — slug: ${slug}${DRY_RUN ? ' [DRY RUN]' : ''}${COVER_ONLY ? ' [COVER ONLY]' : ''}\n`);

  // 1. Fetch current book from DB
  const { data: book, error } = await supabase
    .from('books')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !book) {
    console.error(`Book not found in DB with slug: "${slug}"`);
    process.exit(1);
  }

  console.log('Current DB record:');
  console.log(`  Title:   ${book.title}`);
  console.log(`  Authors: ${(book.authors ?? []).join(', ')}`);
  console.log(`  Year:    ${book.publication_year ?? '—'}`);
  console.log(`  Pages:   ${book.page_count ?? '—'}`);
  console.log(`  ISBN:    ${book.isbn ?? '—'}`);
  console.log(`  Cover:   ${book.cover_url ?? '—'}\n`);

  // 2. Fetch candidates from Google Books
  console.log('Searching Google Books…\n');
  const candidates = await fetchCandidates(book.title, book.authors);

  if (candidates.length === 0) {
    console.log('No candidates with covers found on Google Books.');
    process.exit(0);
  }

  console.log(`Found ${candidates.length} candidates:\n`);
  candidates.forEach((c, i) => {
    console.log(`  [${i + 1}] ${c.title}`);
    console.log(`      Authors: ${c.authors.join(', ')}`);
    console.log(`      Year: ${c.year ?? '—'}  |  Pages: ${c.pages ?? '—'}  |  ISBN: ${c.isbn ?? '—'}`);
  });

  openPreview(book, candidates);

  // 3. Ask user to pick
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const pick = await ask(rl, `Pick a candidate [1-${candidates.length}] or press Enter to cancel: `);
  const idx = parseInt(pick) - 1;

  if (isNaN(idx) || idx < 0 || idx >= candidates.length) {
    console.log('\nCancelled — no changes made.');
    rl.close();
    process.exit(0);
  }

  const chosen = candidates[idx];
  console.log(`\nYou picked: [${idx + 1}] ${chosen.title}\n`);

  // Fetch first publication year from Open Library (edition-agnostic)
  process.stdout.write('Fetching first publication year from Open Library… ');
  const firstPublishYear = await fetchFirstPublishYear(chosen.title, chosen.authors);
  const yearSource = firstPublishYear ? 'Open Library first_publish_year' : 'Google Books edition date';
  const resolvedYear = firstPublishYear ?? (chosen.year ? parseInt(chosen.year) : null);
  console.log(resolvedYear ? `${resolvedYear} (${yearSource})` : 'not found');

  // 4. Build update payload
  const updates = { cover_url: chosen.cover_url };

  if (!COVER_ONLY) {
    // Offer each field individually if it differs
    const fields = [
      { key: 'title',            label: 'Title',        current: book.title,              next: chosen.title },
      { key: 'authors',          label: 'Authors',      current: (book.authors ?? []).join(', '), next: chosen.authors.join(', ') },
      { key: 'publication_year', label: 'Year',         current: book.publication_year,   next: resolvedYear },
      { key: 'page_count',       label: 'Page count',   current: book.page_count,         next: chosen.pages },
      { key: 'isbn',             label: 'ISBN',         current: book.isbn,               next: chosen.isbn },
    ];

    console.log('Field comparison (cover will always be updated):\n');
    for (const f of fields) {
      const currentStr = f.current ?? '—';
      const nextStr    = f.next ?? '—';
      if (String(currentStr) === String(nextStr)) {
        console.log(`  ${f.label.padEnd(12)} unchanged (${currentStr})`);
        continue;
      }
      console.log(`  ${f.label.padEnd(12)} ${currentStr} → ${nextStr}`);
      const yn = await ask(rl, `  Update ${f.label}? [y/N] `);
      if (yn.toLowerCase() === 'y') {
        updates[f.key] = f.key === 'authors' ? chosen.authors : f.next;
      }
    }

    // Synopsis separately — it's long
    if (chosen.synopsis && chosen.synopsis !== book.synopsis) {
      console.log('\n  Synopsis differs.');
      const yn = await ask(rl, '  Update synopsis? [y/N] ');
      if (yn.toLowerCase() === 'y') updates.synopsis = chosen.synopsis;
    }
  }

  console.log('\nChanges to apply:');
  for (const [k, v] of Object.entries(updates)) {
    const display = Array.isArray(v) ? v.join(', ') : String(v ?? '—');
    console.log(`  ${k}: ${display}`);
  }

  if (DRY_RUN) {
    console.log('\n[dry-run] No changes written.\n');
    rl.close();
    return;
  }

  const confirm = await ask(rl, '\nApply these changes? [y/N] ');
  rl.close();

  if (confirm.toLowerCase() !== 'y') {
    console.log('Cancelled — no changes made.\n');
    process.exit(0);
  }

  const { error: updateErr } = await supabase
    .from('books')
    .update(updates)
    .eq('id', book.id);

  if (updateErr) {
    console.error(`\n✗ DB error: ${updateErr.message}\n`);
    process.exit(1);
  }

  console.log(`\n✅ "${book.title}" updated successfully.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
