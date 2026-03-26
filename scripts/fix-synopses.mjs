/**
 * fix-synopses.mjs
 *
 * Detects books with bad/scraped synopses (markdown links, URLs, meta phrases,
 * Wikipedia-style intros) and rewrites them using Gemini 2.5 Flash.
 *
 * Usage:
 *   node scripts/fix-synopses.mjs --dry-run          preview detected bad synopses
 *   node scripts/fix-synopses.mjs                    fix all bad synopses
 *   node scripts/fix-synopses.mjs --slug crooked-kingdom   fix one book
 *   node scripts/fix-synopses.mjs --all              rewrite ALL synopses (not just bad)
 *   node scripts/fix-synopses.mjs --limit 20         cap to 20 books
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN  = process.argv.includes('--dry-run');
const ALL      = process.argv.includes('--all');
const SLUG_ARG = process.argv.indexOf('--slug');
const SLUG     = SLUG_ARG !== -1 ? process.argv[SLUG_ARG + 1] : null;
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT    = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const DELAY_MS = 800;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model = getGeminiModel();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Patterns that indicate a scraped/garbage synopsis
const BAD_PATTERNS = [
  /https?:\/\//i,                        // any URL
  /\[.+?\]\(.+?\)/,                      // markdown links
  /preceded by/i,
  /followed by/i,
  /BOOK (ONE|TWO|THREE|FOUR|FIVE|SIX|\d)/i,
  /published by .{3,40} in \d{4}/i,
  /\d{4} (fantasy |science fiction )?novel by/i,
  /american author/i,
  /british author/i,
  /set in a world (loosely )?inspired by/i,
  /told from the (third|first)-person (viewpoints?|perspective)/i,
  /openlibrary\.org/i,
  /wikipedia/i,
  /isbn/i,
];

function isBadSynopsis(synopsis) {
  if (!synopsis || synopsis.trim().length < 30) return true;
  return BAD_PATTERNS.some((re) => re.test(synopsis));
}

async function generate(book) {
  const prompt = `You are writing synopses for a fantasy book discovery website.
Write a clean, engaging synopsis for the book below.

RULES:
- 3–5 sentences, 60–150 words
- Describe the actual story: protagonist, conflict, world, what's at stake
- No spoilers for major plot twists or endings
- No meta information (author name, publisher, series number, publication year)
- No markdown links, URLs, or Wikipedia-style phrases
- Engaging but factual — reads like back-cover copy
- Do not start with the book title or "In this book"

BOOK: ${book.title}
AUTHOR: ${book.authors?.join(', ') || 'Unknown'}
SUBGENRES: ${book.subgenres?.join(', ') || ''}
TROPES: ${book.tropes?.slice(0, 5).join(', ') || ''}
EXISTING SYNOPSIS (may be bad — use only for factual reference, rewrite completely):
${(book.synopsis || 'none').slice(0, 500)}

Respond with the synopsis only. No title, no author, no quotes.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim().replace(/^["']|["']$/g, '');
  if (text.length < 40 || text.length > 1200) return null;
  // Reject if Gemini still produced bad output
  if (isBadSynopsis(text)) return null;
  return text;
}

async function main() {
  console.log(`\n📖 Synopsis Fixer${DRY_RUN ? ' [DRY RUN]' : ''}${ALL ? ' [ALL]' : ''}\n`);

  // Fetch books — paginate to get all
  const PAGE = 1000;
  let allBooks = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('books')
      .select('id, title, slug, authors, synopsis, subgenres, tropes')
      .range(from, from + PAGE - 1);
    if (error) { console.error('Supabase error:', error.message); process.exit(1); }
    if (!data?.length) break;
    allBooks = allBooks.concat(data);
    if (data.length < PAGE) break;
    from += PAGE;
  }

  console.log(`Fetched ${allBooks.length} total books`);

  let books;
  if (SLUG) {
    books = allBooks.filter((b) => b.slug === SLUG);
  } else if (ALL) {
    books = allBooks;
  } else {
    books = allBooks.filter((b) => isBadSynopsis(b.synopsis));
  }

  if (LIMIT) books = books.slice(0, LIMIT);

  if (!books.length) {
    console.log('✅ No bad synopses found.');
    return;
  }

  console.log(`Found ${books.length} book(s) to fix\n`);

  if (DRY_RUN) {
    for (const b of books) {
      console.log(`  • ${b.title} (${b.slug})`);
      const snip = (b.synopsis || 'NO SYNOPSIS').slice(0, 100).replace(/\n/g, ' ');
      console.log(`    ${snip}…\n`);
    }
    console.log(`\nRun without --dry-run to fix these.`);
    return;
  }

  let updated = 0;
  let failed  = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    process.stdout.write(`[${i + 1}/${books.length}] ${book.title.slice(0, 52).padEnd(52)} `);

    let synopsis;
    try {
      synopsis = await generate(book);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (!synopsis) {
      console.log('✗ invalid response');
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    const { error: upErr } = await supabase
      .from('books')
      .update({ synopsis })
      .eq('id', book.id);

    if (upErr) {
      console.log(`✗ ${upErr.message}`);
      failed++;
    } else {
      console.log('✓');
      updated++;
    }

    if (i + 1 < books.length) await sleep(DELAY_MS);
  }

  console.log(`\n──────────────────────────────`);
  console.log(`✅ Fixed:  ${updated}`);
  if (failed) console.log(`✗  Failed: ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
