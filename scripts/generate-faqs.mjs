/**
 * generate-faqs.mjs
 *
 * Uses Gemini 2.5 Flash to generate FAQ sections for books that already have
 * editorial content (ideal_reader IS NOT NULL). Targets the same priority
 * books as the other generate-* scripts.
 *
 * Output is stored as a jsonb array in books.faqs:
 *   [{ "question": "...", "answer": "..." }, ...]
 *
 * Usage:
 *   node scripts/generate-faqs.mjs
 *   node scripts/generate-faqs.mjs --dry-run
 *   node scripts/generate-faqs.mjs --limit 10
 *   node scripts/generate-faqs.mjs --slug the-way-of-kings
 *   node scripts/generate-faqs.mjs --all   (overwrite existing faqs too)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { TIER_1 } from './priority-slugs.mjs';

config();

const DRY_RUN  = process.argv.includes('--dry-run');
const ALL      = process.argv.includes('--all');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT    = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const SLUG_ARG = process.argv.indexOf('--slug');
const SLUG     = SLUG_ARG !== -1 ? process.argv[SLUG_ARG + 1] : null;
const DELAY_MS = 1200;


if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env');
  process.exit(1);
}
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: 'gemini-2.5-flash' });
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generate(book) {
  const seriesInfo = book.series
    ? `${book.series} (book ${book.series_number ?? '?'} of ${book.series_total ?? '?'})`
    : 'Standalone';

  const prompt = `You are helping create FAQ sections for a fantasy book discovery website.
Generate 4-6 frequently asked questions and short answers for the given book.

RULES:
- Questions should be things real readers actually ask (think Reddit/Goodreads patterns)
- Answers must be 2-3 sentences MAX. Be direct — lead with yes/no when applicable.
- Be honest. Include caveats and warnings, don't just sell the book.
- Use casual, direct language. No "readers will find" or "it caters to those who."
- Include at least one question about a potential dealbreaker (slow start, darkness, length, unfinished series)
- If the book is part of a series, include a question about whether it can be read standalone or what to read first
- If the book is 400+ pages, include a reading time question

OUTPUT FORMAT — respond with a JSON array only, no markdown, no extra text:
[
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." }
]

BOOK: ${book.title} by ${book.authors?.join(', ') || 'Unknown'}
SERIES: ${seriesInfo}
PAGE COUNT: ${book.page_count ?? 'Unknown'}
DARKNESS RATING: ${book.darkness_level ?? 'Unknown'}/5
SUBGENRES: ${book.subgenres?.join(', ') || 'Fantasy'}
SYNOPSIS: ${(book.synopsis || '').slice(0, 400) || 'Not available'}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Strip markdown code fences if Gemini wraps the JSON
  const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed) || parsed.length === 0) return null;

  // Validate each item has question + answer strings
  const valid = parsed.filter(
    (item) => typeof item?.question === 'string' && typeof item?.answer === 'string' &&
              item.question.trim() && item.answer.trim()
  );

  return valid.length >= 2 ? valid : null;
}

async function main() {
  console.log(`\n❓ FAQ Generator${DRY_RUN ? ' [DRY RUN]' : ''}${ALL ? ' [ALL]' : ''}\n`);

  let query = supabase
    .from('books')
    .select('id, title, slug, authors, synopsis, subgenres, series, series_number, page_count, darkness_level, avg_rating');

  if (SLUG) {
    query = query.eq('slug', SLUG);
  } else {
    // Only run on the 50 priority books
    query = query.in('slug', TIER_1);
    if (!ALL) query = query.is('faqs', null);
    query = query.order('avg_rating', { ascending: false, nullsLast: true });
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

    let faqs;
    try {
      faqs = await generate(book);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (!faqs) {
      console.log('✗ invalid response');
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (DRY_RUN) {
      console.log(`✓ (${faqs.length} FAQs)`);
      faqs.forEach((f) => console.log(`   Q: ${f.question}`));
      console.log('');
      updated++;
      continue;
    }

    const { error: upErr } = await supabase
      .from('books')
      .update({ faqs })
      .eq('id', book.id);

    if (upErr) {
      console.log(`✗ ${upErr.message}`);
      failed++;
    } else {
      console.log(`✓ (${faqs.length} FAQs)`);
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
