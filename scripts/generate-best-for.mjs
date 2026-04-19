/**
 * generate-best-for.mjs
 *
 * Uses Gemini 2.5 Flash to generate a one-line "best_for" descriptor per book.
 * Shows on book cards and book pages: "Perfect for readers who want X."
 *
 * Targets ALL_PRIORITY (TIER_1 + TIER_2 + TIER_3) by default.
 *
 * Prerequisites — run this SQL in Supabase dashboard first:
 *   ALTER TABLE books ADD COLUMN IF NOT EXISTS best_for text;
 *
 * Usage:
 *   node scripts/generate-best-for.mjs
 *   node scripts/generate-best-for.mjs --dry-run
 *   node scripts/generate-best-for.mjs --limit 20
 *   node scripts/generate-best-for.mjs --slug the-final-empire
 *   node scripts/generate-best-for.mjs --all     (overwrite existing)
 *   node scripts/generate-best-for.mjs --tier1   (only TIER_1 — ~53 books)
 *   node scripts/generate-best-for.mjs --tier2   (only TIER_2 — ~71 books)
 *   node scripts/generate-best-for.mjs --tier3   (only TIER_3 — ~187 books)
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { TIER_1, TIER_2, TIER_3, TIER_4, ALL_PRIORITY } from './priority-slugs.mjs';

config();

const DRY_RUN    = process.argv.includes('--dry-run');
const ALL        = process.argv.includes('--all');
const TIER1_ONLY = process.argv.includes('--tier1');
const TIER2_ONLY = process.argv.includes('--tier2');
const TIER3_ONLY = process.argv.includes('--tier3');
const TIER4_ONLY = process.argv.includes('--tier4');
const LIMIT_ARG  = process.argv.indexOf('--limit');
const LIMIT      = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const SLUG_ARG   = process.argv.indexOf('--slug');
const SLUG       = SLUG_ARG !== -1 ? process.argv[SLUG_ARG + 1] : null;
const SLUGS_ARG  = process.argv.indexOf('--slugs');
const SLUGS      = SLUGS_ARG !== -1 ? process.argv[SLUGS_ARG + 1].split(',').map(s => s.trim()) : null;
const DELAY_MS   = 800;

const TARGET_SLUGS = TIER1_ONLY ? TIER_1 : TIER2_ONLY ? TIER_2 : TIER3_ONLY ? TIER_3 : TIER4_ONLY ? TIER_4 : ALL_PRIORITY;

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

async function generate(book) {
  const seriesInfo = book.series
    ? `${book.series} #${book.series_number ?? '?'}`
    : 'Standalone';

  const prompt = `You are writing microcopy for a fantasy book discovery website.
Write a single "best for" line for the book below — used on book cards to help readers quickly decide if it's for them.

RULES:
- Exactly one sentence, 12–20 words
- Start with "Perfect for" or "Best for" or "Ideal for"
- Name 2-3 SPECIFIC reader types or desires (not generic like "fantasy fans")
- Focus on what makes this book distinctive — the feeling, the hook, the unusual combination
- Be honest — if it's slow-burn, dark, long, or complex, say so implicitly through the audience
- No spoilers, no "this book", no author name

EXAMPLES OF GOOD output:
- "Perfect for readers who want heist-style fantasy with a morally grey found family."
- "Ideal for those who loved Sanderson's magic systems but want something darker and more personal."
- "Best for readers craving slow-burn romance in a cozy, low-stakes fantasy world."
- "Perfect for fans of intricate political scheming who don't mind waiting for payoff."

BOOK: ${book.title} by ${book.authors?.join(', ') || 'Unknown'}
SERIES: ${seriesInfo}
SUBGENRES: ${book.subgenres?.join(', ') || 'Fantasy'}
TROPES: ${book.tropes?.slice(0, 6).join(', ') || 'none listed'}
DARKNESS: ${book.darkness_level ?? '?'}/5
SYNOPSIS: ${(book.synopsis || '').slice(0, 300)}
${book.ideal_reader ? `WHO IT'S FOR: ${book.ideal_reader.slice(0, 200)}` : ''}

Respond with the single sentence only. No quotes, no punctuation beyond the period.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim().replace(/^["']|["']$/g, '');
  return text.length >= 15 && text.length <= 200 ? text : null;
}

async function main() {
  const tierLabel = TIER1_ONLY ? ' [TIER_1]' : TIER2_ONLY ? ' [TIER_2]' : TIER3_ONLY ? ' [TIER_3]' : ' [ALL_PRIORITY]';
  console.log(`\n⭐ Best For Generator${DRY_RUN ? ' [DRY RUN]' : ''}${ALL ? ' [ALL]' : ''}${tierLabel}\n`);

  let query = supabase
    .from('books')
    .select('id, title, slug, authors, synopsis, subgenres, tropes, series, series_number, darkness_level, ideal_reader');

  if (SLUG) {
    query = query.eq('slug', SLUG);
  } else if (SLUGS) {
    query = query.in('slug', SLUGS);
    if (!ALL) query = query.is('best_for', null);
  } else {
    query = query.in('slug', TARGET_SLUGS);
    if (!ALL) query = query.is('best_for', null);
    if (LIMIT) query = query.limit(LIMIT);
  }

  const { data: books, error } = await query;
  if (error) { console.error('Supabase error:', error.message); process.exit(1); }

  if (!books?.length) {
    console.log('✅ No books to process.');
    return;
  }

  console.log(`Found ${books.length} book(s) to process\n`);

  let updated = 0;
  let failed  = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    process.stdout.write(`[${i + 1}/${books.length}] ${book.title.slice(0, 52).padEnd(52)} `);

    let bestFor;
    try {
      bestFor = await generate(book);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (!bestFor) {
      console.log('✗ invalid response');
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (DRY_RUN) {
      console.log(`✓\n   → ${bestFor}\n`);
      updated++;
      continue;
    }

    const { error: upErr } = await supabase
      .from('books')
      .update({ best_for: bestFor })
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
  console.log(`✅ Generated: ${updated}`);
  if (failed) console.log(`✗  Failed:   ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
