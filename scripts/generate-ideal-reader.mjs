/**
 * generate-ideal-reader.mjs
 *
 * Uses Claude Haiku to write the "ideal_reader" field for books where it's NULL.
 * Three focused paragraphs:
 *   1. Positive fit — specific reader types who will love this
 *   2. Comparison fit — similar books/styles they might know
 *   3. Who might not enjoy it — builds trust by being honest
 *
 * Targets books with subgenres (already classified) first, ordered by rating.
 *
 * Usage:
 *   node scripts/generate-ideal-reader.mjs
 *   node scripts/generate-ideal-reader.mjs --dry-run
 *   node scripts/generate-ideal-reader.mjs --limit 10
 *   node scripts/generate-ideal-reader.mjs --slug six-of-crows
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN   = process.argv.includes('--dry-run');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT     = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const SLUG_ARG  = process.argv.indexOf('--slug');
const SLUG      = SLUG_ARG !== -1 ? process.argv[SLUG_ARG + 1] : null;
const DELAY_MS  = 1200;

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY in .env');
  process.exit(1);
}
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase  = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generate(book) {
  const prompt = `You are an editorial writer for a fantasy book discovery website.
Write the "Who This Is For" section for the book below.

Book:
Title: "${book.title}" by ${book.authors?.join(', ') || 'Unknown'}
Genres: ${book.subgenres?.join(', ') || 'Fantasy'}
Series: ${book.series ? `${book.series} #${book.series_number}` : 'Standalone'}
Synopsis: ${(book.synopsis || '').slice(0, 500) || 'Not available'}

Write exactly 3 short paragraphs in this order:

Paragraph 1 — Positive Fit
Start with "[Title] is an excellent choice for readers who enjoy..." then list 3–5 very specific, concrete reader types. Be precise — not "readers who like fantasy" but "readers who enjoy ensemble casts with morally grey characters" or "readers who love heist mechanics combined with magic".

Paragraph 2 — Comparison Fit
Name 1–2 specific comparable books or authors the reader might already know. Explain briefly what connects them to this book. Keep it to 2–3 sentences.

Paragraph 3 — Who Might Not Enjoy It
Be honest about who this book is NOT for. This builds trust. One clear, specific caveat — a type of reader who would likely be disappointed and why. Start with "However," or "Readers who prefer..."

Rules:
- Each paragraph is 2–4 sentences
- Total length: 120–180 words
- Third-person editorial voice — no "you" or "I"
- No markdown, no headers, no bullet points
- Do not use phrases like "this book" or "this novel"
- Use the actual book title when referring to it`;

  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  });

  if (msg.content[0]?.type !== 'text') return null;
  return msg.content[0].text
    .replace(/^#+\s+.*\n+/m, '')
    .trim() || null;
}

async function main() {
  console.log(`\n🎯 Ideal Reader Generator${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  let query = supabase
    .from('books')
    .select('id, title, slug, authors, synopsis, subgenres, series, series_number, avg_rating');

  if (SLUG) {
    query = query.eq('slug', SLUG);
  } else {
    query = query
      .is('ideal_reader', null)
      .not('subgenres', 'is', null)
      .not('synopsis', 'is', null)
      .order('avg_rating', { ascending: false, nullsLast: true });
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

    let text;
    try {
      text = await generate(book);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (!text) {
      console.log('✗ empty response');
      failed++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`\n[dry]\n${text}\n`);
      updated++;
      continue;
    }

    const { error: upErr } = await supabase
      .from('books')
      .update({ ideal_reader: text })
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
