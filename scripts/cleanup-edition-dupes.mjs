/**
 * cleanup-edition-dupes.mjs
 *
 * Finds and removes duplicate books caused by edition variants imported by fill-series.
 * Examples of duplicates this catches:
 *   "The Fury of the Gods" + "The Fury of the Gods (Deluxe Limited Hardcover Edition)"
 *   "Mistborn" + "Mistborn: 10th Anniversary Edition"
 *
 * Logic:
 *   - Normalizes every title by stripping common edition suffixes/parentheticals
 *   - Groups books by (normalized title + first author)
 *   - In each duplicate group, keeps the "best" record:
 *       1. Has ISBN           (most reliable identifier)
 *       2. Has cover_url
 *       3. Has synopsis
 *       4. Shorter/simpler title (original > edition variant)
 *   - Deletes the rest
 *
 * Usage:
 *   node scripts/cleanup-edition-dupes.mjs --dry-run   ← preview only (default safe mode)
 *   node scripts/cleanup-edition-dupes.mjs             ← delete dupes after confirmation
 */

import { createClient }  from '@supabase/supabase-js';
import { createInterface } from 'readline';
import { config }         from 'dotenv';
config();

const DRY_RUN = !process.argv.includes('--confirm');

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ── title normalisation ───────────────────────────────────────────────────────

const EDITION_PATTERNS = [
  // Parenthetical edition/format notes: (Deluxe Edition), (Mass Market), (2022 Edition), etc.
  /\s*\([^)]*\b(edition|printing|format|hardcover|paperback|mass\s*market|trade|audiobook|audio|ebook|e-book|kindle|deluxe|limited|special|collector'?s?|anniversary|illustrated|expanded|revised|definitive|omnibus|box\s*set|complete|signed|gift|large\s*print|reprint|updated|\d{4})\b[^)]*\)/gi,
  // Colon subtitle containing series name: ": The Kingkiller Chronicle Book 1", ": Book One of The Wheel of Time"
  /\s*:\s*(?:book\s*\w+\s+of\s+.+|(?:the\s+)?\w[\w\s]+(?:chronicle|saga|series|trilogy|cycle|sequence|archives?)\b.*)/gi,
  // Parenthetical with BOTH a series name AND book number: (The Raven Cycle, Book 2), (Toby Daye Book 9)
  // Must contain a word followed by book/vol — NOT just "(Book One)" alone which distinguishes series entries
  /\s*\([^)]+\b(?:series|saga|cycle|chronicle|trilogy|sequence)\b[^)]*\)/gi,
  /\s*\([^)]+,\s*(?:book|vol(?:ume)?)\s*[\d\w]+\)/gi,
  // Colon + "Book N of Series" appended to title
  /\s*:\s*Book\s+\w+\s+of\s+.+$/gi,
  // Suffix like ": The Morganville Vampires Book Fourteen"
  /\s*:\s*(?:the\s+)?\w[\w\s]+book\s+\w+\s*$/gi,
  // Dash + edition at end: "- Special Edition", "- Deluxe Hardcover"
  /\s*[-–]\s*(deluxe|limited|special|collector'?s?|anniversary|illustrated|expanded|revised|definitive|signed|gift)\s+\w*\s*$/gi,
];

function normalizeTitle(title) {
  let t = title.trim();
  for (const re of EDITION_PATTERNS) t = t.replace(re, '');
  return t.replace(/[\s:,\-–]+$/, '').toLowerCase().trim();
}

// ── scoring — higher = keep this one ─────────────────────────────────────────

function score(book) {
  let s = 0;
  // Strongly prefer simpler titles — no parentheses, no colons after first word
  if (!/[(:)]/.test(book.title))                   s += 20;
  if (!/:\s/.test(book.title))                      s += 5;
  // Data completeness
  if (book.isbn)                                    s += 8;
  if (book.cover_url)                               s += 4;
  if (book.synopsis)                                s += 2;
  if (book.series)                                  s += 1;
  // Shorter title wins on ties
  s -= book.title.length * 0.05;
  return s;
}

// ── main ──────────────────────────────────────────────────────────────────────

async function fetchAll() {
  const PAGE = 1000;
  const rows = [];
  let offset = 0;
  while (true) {
    const { data, error } = await supabase
      .from('books')
      .select('id, title, authors, isbn, cover_url, synopsis, series, slug')
      .order('title')
      .range(offset, offset + PAGE - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return rows;
}

async function main() {
  console.log('\n🔍  Scanning for edition duplicates…\n');

  const books = await fetchAll();
  console.log(`   ${books.length} books loaded.\n`);

  // Group by normalised title + first author
  const groups = new Map();
  for (const book of books) {
    const norm   = normalizeTitle(book.title);
    const author = (book.authors?.[0] ?? '').toLowerCase().trim();
    const key    = `${norm}||${author}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(book);
  }

  // Find groups with more than one book
  const dupeGroups = [...groups.values()].filter((g) => g.length > 1);

  if (!dupeGroups.length) {
    console.log('✅  No edition duplicates found.\n');
    return;
  }

  console.log(`Found ${dupeGroups.length} duplicate group(s):\n`);

  const toDelete = [];

  for (const group of dupeGroups) {
    group.sort((a, b) => score(b) - score(a));
    const [keep, ...remove] = group;

    console.log(`  KEEP   → "${keep.title}"`);
    for (const r of remove) {
      console.log(`  DELETE → "${r.title}"  [isbn:${r.isbn ?? 'none'} cover:${r.cover_url ? '✓' : '✗'}]`);
      toDelete.push(r);
    }
    console.log();
  }

  console.log(`─────────────────────────────────────────`);
  console.log(`  ${toDelete.length} book(s) to delete across ${dupeGroups.length} group(s).`);

  if (DRY_RUN) {
    console.log('\n  ℹ️   Dry-run mode — no changes made.');
    console.log('  Re-run with --confirm to actually delete.\n');
    return;
  }

  // Confirm
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  await new Promise((resolve) => {
    rl.question(`\n  Delete ${toDelete.length} records? Type YES to confirm: `, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  }).then(async (ans) => {
    if (ans !== 'YES') { console.log('  Aborted.\n'); return; }

    const ids = toDelete.map((b) => b.id);
    const { error } = await supabase.from('books').delete().in('id', ids);
    if (error) {
      console.error('  ✗ Delete failed:', error.message);
    } else {
      console.log(`\n  ✅  Deleted ${toDelete.length} duplicate(s).\n`);
    }
  });
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
