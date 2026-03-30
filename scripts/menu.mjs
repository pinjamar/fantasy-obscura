#!/usr/bin/env node
/**
 * menu.mjs — interactive script runner
 * Usage:  node scripts/menu.mjs   OR   npm run menu
 */

import { createInterface } from 'readline';
import { spawnSync }       from 'child_process';

const GROUPS = [
  {
    label: '📥  Import & Discover',
    items: [
      { label: 'Add book(s)',        cmd: 'add-books.mjs',          hint: '"Title" "Author"',
        desc: 'Import a single book by title/author. Fetches cover, synopsis, year from Google Books + Open Library.' },
      { label: 'Discover books',     cmd: 'discover-books.mjs',
        desc: 'Bulk-discover books by genre/subgenre using Google Books API. Good for finding gaps in a category.' },
      { label: 'Fill series',        cmd: 'fill-series.mjs',
        desc: 'Imports books that are MISSING from the DB — fills gaps in known series (e.g. you have #1 & #3 but not #2) and pulls in remaining books by prolific authors.' },
      { label: 'Fill series (series-only, limit 100)', cmd: 'fill-series.mjs', args: '--series-only --limit 100',
        desc: 'Imports up to 100 missing series books (Phase 1 only, no author sweep). Good for slow batching — review via /admin/fill-review, then repeat.' },
      { label: 'Fill series (authors-only, limit 100)', cmd: 'fill-series.mjs', args: '--authors-only --limit 100',
        desc: 'Imports up to 100 books via author back-catalogue sweep (Phase 2 only). Review via /admin/fill-review after each run.' },
      { label: 'Fill series (authors-only, limit 200)', cmd: 'fill-series.mjs', args: '--authors-only --limit 200',
        desc: 'Imports up to 200 books via author back-catalogue sweep (Phase 2 only). Larger batch — review via /admin/fill-review after each run.' },
      { label: 'Auto-fill series',   cmd: 'auto-fill-series.mjs',
        desc: 'Tags existing DB books that have series = null. Uses sibling-author inference (free) + ISBN lookup. Run after fill-series to propagate series tags to newly imported books.' },
      { label: 'Detect series (AI)', cmd: 'detect-series.mjs',
        desc: 'Detects series for books with no series set via regex → Google Books → Gemini LLM. High-confidence results auto-apply; lower go to admin review queue. Run on fresh imports.' },
      { label: 'Insert failed books',cmd: 'insert-failed-books.mjs',
        desc: 'One-off escape hatch — hardcoded list of books that failed normal import (e.g. ISBN conflicts). Edit the BOOKS array in the script before running.' },
      { label: 'Replace book',       cmd: 'replace-book.mjs',
        desc: 'Replaces a book record in the DB with a fresh fetch from the API. Use when metadata is badly wrong.' },
    ],
  },
  {
    label: '🏷️  Classify & Enrich  (run all with: npm run classify)',
    items: [
      { label: 'Classify metadata',         cmd: 'classify-metadata.mjs',
        desc: 'Fills subgenres, pacing, POV, setting, magic type, heat level, darkness. Run first after import.' },
      { label: 'Classify vibes',            cmd: 'classify-vibes.mjs',
        desc: 'Assigns vibe tags (e.g. "Cozy", "Gritty", "Hopeful"). Run after classify-metadata.' },
      { label: 'Classify tropes',           cmd: 'classify-tropes.mjs',
        desc: 'Assigns trope tags (e.g. "Chosen One", "Enemies to Lovers"). Run after classify-metadata.' },
      { label: 'Classify creatures',        cmd: 'classify-creatures.mjs',
        desc: 'Assigns creature tags (e.g. "Dragons", "Fae", "Vampires").' },
      { label: 'Classify content warnings', cmd: 'classify-content-warnings.mjs',
        desc: 'Assigns content warnings (e.g. "Violence", "SA", "Grief"). Uses Gemini.' },
    ],
  },
  {
    label: '✍️  Generate (AI)',
    items: [
      { label: 'Generate author bios',         cmd: 'generate-author-bio.mjs',
        desc: 'Writes author bio blurbs for the author pages. Run after seed-authors.' },
      { label: 'Generate best-for',            cmd: 'generate-best-for.mjs',
        desc: 'Generates "Best for readers who..." blurb for each book.' },
      { label: 'Generate FAQs',                cmd: 'generate-faqs.mjs',
        desc: 'Generates FAQ section for book pages (series order, age range, etc.).' },
      { label: 'Generate ideal reader',        cmd: 'generate-ideal-reader.mjs',
        desc: 'Generates the "Ideal reader" profile blurb for book pages.' },
      { label: 'Generate reading experience',  cmd: 'generate-reading-experience.mjs',
        desc: 'Generates the reading experience description (tone, pacing feel).' },
      { label: 'Generate what makes it diff',  cmd: 'generate-what-makes-it-different.mjs',
        desc: 'Generates "What makes it stand out" blurb for book pages.' },
    ],
  },
  {
    label: '🔄  Backfill & Fix',
    items: [
      { label: 'Fill ratings',       cmd: 'fill-ratings.mjs',
        desc: 'Fills NULL avg_rating — Phase 1 uses Hardcover (real community ratings, ≥50 reviews), Phase 2 falls back to Gemini for obscure books.' },
      { label: 'Backfill covers',    cmd: 'backfill-covers.mjs',
        desc: 'Fills missing cover_url — tries Open Library, Google Books, then Hardcover.' },
      { label: 'Backfill metadata',  cmd: 'backfill-metadata.mjs',
        desc: 'Fills missing page_count and/or publication_year from Hardcover. Flags: --pages-only, --year-only.' },
      { label: 'Backfill ISBNs',     cmd: 'backfill-isbn.mjs',
        desc: 'Fills missing ISBN fields by querying Open Library.' },
      { label: 'Fill audiobooks',    cmd: 'fill-audiobooks.mjs',
        desc: 'Detects and flags books that have an audiobook edition available.' },
      { label: 'Fix synopses',       cmd: 'fix-synopses.mjs',
        desc: 'Rewrites bad/short/API-boilerplate synopses using Gemini.' },
      { label: 'Fix missing series', cmd: 'fix-missing-series.mjs',
        desc: 'Cross-checks reading order guides against the DB and patches books that are in a reading order but still have series = null.' },
      { label: 'Repair books',       cmd: 'repair-books.mjs',
        desc: 'General-purpose repair pass — re-fetches and corrects malformed records.' },
      { label: 'Update covers',      cmd: 'update-covers.mjs',
        desc: 'Re-fetches and updates existing cover URLs (use when covers are broken/low-res).' },
    ],
  },
  {
    label: '👤  Authors',
    items: [
      { label: 'Seed authors',        cmd: 'seed-authors.js',
        desc: 'Fetches author bio, photo, links from Open Library → Wikipedia → Google KG → Hardcover. Run after importing new books.' },
      { label: 'Update author stats', cmd: 'update-author-stats.mjs',
        desc: 'Recalculates book_count, top_genres, avg_rating for every author from the books table. Run after any bulk import.' },
      { label: 'Fix merged authors',  cmd: 'fix-merged-authors.mjs',
        desc: 'Detects and splits author records that were accidentally merged (e.g. two authors sharing one slug).' },
      { label: 'Cleanup authors',     cmd: 'cleanup-authors.js',
        desc: 'Removes author records with no books and fixes orphaned slugs.' },
    ],
  },
  {
    label: '🔍  Check & Cleanup',
    items: [
      { label: 'Cleanup edition dupes',     cmd: 'cleanup-edition-dupes.mjs',
        desc: 'Finds books imported as edition variants (e.g. "Deluxe Hardcover") that duplicate an existing title. Run with --confirm to delete.' },
      { label: 'Cleanup recent',           cmd: 'cleanup-recent.mjs',
        desc: 'Removes or flags recently imported books that failed classification or have bad data.' },
      { label: 'Check assets',             cmd: 'check-assets.mjs',
        desc: 'Scans for broken image URLs, missing covers, and other asset issues.' },
      { label: 'Check reading order books',cmd: 'check-reading-order-books.mjs',
        desc: 'Verifies every book referenced in reading order guides exists in the DB.' },
      { label: 'Priority slugs',           cmd: 'priority-slugs.mjs',
        desc: 'Lists books flagged as high-priority for content generation.' },
      { label: 'Optimize images',          cmd: 'optimize-images.mjs',
        desc: 'Converts new images in public/images/ to .avif and resized .webp variants.' },
    ],
  },
];

// ── build flat numbered list ──────────────────────────────────────────────────

const flat = [];
let _n = 1;
for (const group of GROUPS) {
  for (const item of group.items) {
    flat.push({ ...item, group: group.label, _n: _n++ });
  }
}

// ── render menu ───────────────────────────────────────────────────────────────

const DIM    = '\x1b[2m';
const RESET  = '\x1b[0m';
const CYAN   = '\x1b[36m';
const BOLD   = '\x1b[1m';
const YELLOW = '\x1b[33m';

function render() {
  console.clear();
  console.log('\n  ✨  Fantasy Obscura — Script Menu\n');

  for (const group of GROUPS) {
    console.log(`  ${BOLD}${YELLOW}${group.label}${RESET}`);
    for (const item of flat.filter((i) => i.group === group.label)) {
      const num   = String(item._n).padStart(2, ' ');
      const label = item.label.padEnd(32, ' ');
      const hintText = item.hint ?? item.args ?? null;
      const hint  = hintText ? `${DIM}  (${hintText})${RESET}` : '';
      const desc  = item.desc ? `\n         ${DIM}↳  ${item.desc}${RESET}` : '';
      console.log(`    ${CYAN}${num}.${RESET}  ${label}${hint}${desc}`);
    }
    console.log();
  }

  console.log(`  ${DIM}Type a number (optionally followed by args), or q to quit.`);
  console.log(`  Example:  1  "The Name of the Wind" "Patrick Rothfuss"${RESET}\n`);
}

// ── prompt loop ───────────────────────────────────────────────────────────────

function ask(question, cb) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  rl.question(question, (ans) => { rl.close(); cb(ans); });
}

function prompt() {
  render();
  ask('  > ', (line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === 'q') return;

    const [numStr] = trimmed.split(/\s+/);
    const n    = parseInt(numStr, 10);
    const item = flat.find((i) => i._n === n);

    if (!item) {
      console.log('\n  ❌  Invalid choice. Press Enter to retry.');
      ask('', () => prompt());
      return;
    }

    const rawArgs    = trimmed.slice(numStr.length).trim();
    const typedArgs  = rawArgs ? rawArgs.match(/(?:[^\s"']+|"[^"]*"|'[^']*')/g) ?? [] : [];
    const presetArgs = item.args ? item.args.split(/\s+/) : [];
    const cleaned    = [...presetArgs, ...typedArgs.map((a) => a.replace(/^['"]|['"]$/g, ''))];
    const script     = `scripts/${item.cmd}`;

    console.log(`\n  ▶  node ${script} ${cleaned.join(' ')}\n${'─'.repeat(60)}\n`);
    spawnSync('node', [script, ...cleaned], { stdio: 'inherit', cwd: process.cwd() });
    console.log(`\n${'─'.repeat(60)}\n  Done. Press Enter to return to menu.`);

    ask('', () => prompt());
  });
}

prompt();
