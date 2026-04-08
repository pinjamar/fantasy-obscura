/**
 * generate-author-bio.mjs
 *
 * Uses Gemini 2.5 Flash to generate two structured fields for prolific authors:
 *   - writing_style: 2-3 sentences on prose style, pacing, atmosphere
 *   - best_starting_point: which book to read first and why
 *
 * Only targets authors with 7+ books in the DB (configurable via --threshold).
 *
 * Prerequisites — run this SQL in Supabase dashboard first:
 *   ALTER TABLE authors ADD COLUMN IF NOT EXISTS writing_style text;
 *   ALTER TABLE authors ADD COLUMN IF NOT EXISTS best_starting_point text;
 *
 * Usage:
 *   node scripts/generate-author-bio.mjs
 *   node scripts/generate-author-bio.mjs --dry-run
 *   node scripts/generate-author-bio.mjs --limit 10
 *   node scripts/generate-author-bio.mjs --slug brandon-sanderson
 *   node scripts/generate-author-bio.mjs --all   (overwrite existing too)
 *   node scripts/generate-author-bio.mjs --threshold 5
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN    = process.argv.includes('--dry-run');
const ALL        = process.argv.includes('--all');
const LIMIT_ARG  = process.argv.indexOf('--limit');
const LIMIT      = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const SLUG_ARG   = process.argv.indexOf('--slug');
const SLUG       = SLUG_ARG !== -1 ? process.argv[SLUG_ARG + 1] : null;
const THRESH_ARG = process.argv.indexOf('--threshold');
const THRESHOLD  = THRESH_ARG !== -1 ? parseInt(process.argv[THRESH_ARG + 1], 10) : 5;
const DELAY_MS   = 1200;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model = getGeminiModel('gemini-2.5-pro');
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isLikelyNonEnglish(text) {
  if (!text) return false;
  const letters = [...text].filter((c) => /\p{L}/u.test(c));
  if (letters.length < 20) return false;
  const nonAscii = letters.filter((c) => c.charCodeAt(0) > 127);
  return nonAscii.length / letters.length > 0.05;
}

async function generate(author, books) {
  // Build a summary of the author's catalogue for context
  const topBooks = books
    .sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0))
    .slice(0, 12);

  const bookList = topBooks
    .map((b) => `- ${b.title}${b.series ? ` (${b.series} #${b.series_number ?? '?'})` : ''}${b.avg_rating ? ` [${b.avg_rating.toFixed(2)}★]` : ''}`)
    .join('\n');

  const subgenres = [...new Set(books.flatMap((b) => b.subgenres ?? []))].slice(0, 6).join(', ');
  const tropes    = [...new Set(books.flatMap((b) => b.tropes ?? []))].slice(0, 8).join(', ');

  const needsBio = !author.bio || author.bio.trim().length < 80 || isLikelyNonEnglish(author.bio);

  const prompt = `You are an editorial writer for a fantasy book discovery website.
Write sections for the author page of ${author.name}.

AUTHOR: ${author.name}
KNOWN FOR: ${subgenres || 'Fantasy'}
RECURRING THEMES/TROPES: ${tropes || 'Fantasy'}
TOP-RATED BOOKS:
${bookList}

Write exactly ${needsBio ? 'three' : 'two'} sections:
${needsBio ? `
BIO (2-3 sentences):
A short factual biography — who this author is, what genre(s) they write, and what they are best known for. Factual and neutral, not promotional.
` : ''}
WRITING STYLE (2-3 sentences):
Describe what makes this author's prose and storytelling distinctive. Focus on: sentence rhythm, atmosphere, emotional register, pacing, and what the reading experience actually feels like. Be specific — not "vivid world-building" but what makes THEIR world-building distinctive. Start directly with the observation, not the author's name.

BEST STARTING POINT (2-3 sentences):
Name the single best book for a first-time reader of this author and explain why — what it offers, why it's a good entry point, and what kind of reader will respond to it most. If the author has a clear series to start, say so. If they're better entered via a standalone, say so.

OUTPUT FORMAT — respond with JSON only, no markdown:
{
  ${needsBio ? '"bio": "...",\n  ' : ''}"writing_style": "...",
  "best_starting_point": "..."
}`;

  const result = await Promise.race([
    model.generateContent(prompt),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Gemini timeout')), 30_000)),
  ]);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return null;
  }

  if (
    typeof parsed?.writing_style !== 'string' || !parsed.writing_style.trim() ||
    typeof parsed?.best_starting_point !== 'string' || !parsed.best_starting_point.trim()
  ) {
    return null;
  }

  return {
    bio: (needsBio && typeof parsed?.bio === 'string' && parsed.bio.trim()) ? parsed.bio.trim() : null,
    writing_style: parsed.writing_style.trim(),
    best_starting_point: parsed.best_starting_point.trim(),
  };
}

async function main() {
  console.log(`\n✍️  Author Bio Generator${DRY_RUN ? ' [DRY RUN]' : ''}${ALL ? ' [ALL]' : ''}`);
  console.log(`   Threshold: ${THRESHOLD}+ books\n`);

  // Fetch all books with author + metadata
  const PAGE = 1000;
  const allBooks = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('books')
      .select('title, authors, series, series_number, subgenres, tropes, avg_rating')
      .range(from, from + PAGE - 1);
    if (error) { console.error('Supabase error:', error.message); process.exit(1); }
    allBooks.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }

  // Count books per primary author
  const authorBookMap = new Map();
  for (const book of allBooks) {
    const primary = (book.authors?.[0] ?? '').trim();
    if (!primary) continue;
    const key = primary.toLowerCase();
    if (!authorBookMap.has(key)) authorBookMap.set(key, { name: primary, books: [] });
    authorBookMap.get(key).books.push(book);
  }

  // Fetch author rows
  let authorsQuery = supabase
    .from('authors')
    .select('id, name, slug, bio, writing_style, best_starting_point');

  if (SLUG) {
    authorsQuery = authorsQuery.eq('slug', SLUG);
  }

  const { data: authorRows, error: authErr } = await authorsQuery;
  if (authErr) { console.error('Supabase error:', authErr.message); process.exit(1); }

  // Needs update if writing_style or bio is null, too short, or non-English
  function needsUpdate(a) {
    if (ALL) return true;
    if (!a.writing_style || a.writing_style.trim().length < 80 || isLikelyNonEnglish(a.writing_style)) return true;
    if (!a.bio || a.bio.trim().length < 80 || isLikelyNonEnglish(a.bio)) return true;
    return false;
  }

  // Filter to authors with enough books and missing/short fields, then apply limit
  let targets = authorRows.filter((a) => {
    const key = a.name.toLowerCase();
    const count = authorBookMap.get(key)?.books.length ?? 0;
    return count >= THRESHOLD && needsUpdate(a);
  });
  if (LIMIT) targets = targets.slice(0, LIMIT);

  if (!targets.length) {
    console.log(`✅ No authors to process (need ${THRESHOLD}+ books in DB).`);
    return;
  }

  console.log(`Found ${targets.length} author(s) to process\n`);

  let updated = 0;
  let failed  = 0;

  for (let i = 0; i < targets.length; i++) {
    const author = targets[i];
    const key = author.name.toLowerCase();
    const books = authorBookMap.get(key)?.books ?? [];

    process.stdout.write(`[${i + 1}/${targets.length}] ${author.name.slice(0, 40).padEnd(40)} (${books.length} books) `);

    let result;
    try {
      result = await generate(author, books);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (!result) {
      console.log('✗ invalid response');
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (DRY_RUN) {
      console.log(`✓ [dry]`);
      console.log(`   Style: ${result.writing_style.slice(0, 100)}...`);
      console.log(`   Start: ${result.best_starting_point.slice(0, 100)}...`);
      updated++;
      continue;
    }

    const updates = { writing_style: result.writing_style, best_starting_point: result.best_starting_point };
    if (result.bio) updates.bio = result.bio;

    const { error: upErr } = await supabase
      .from('authors')
      .update(updates)
      .eq('id', author.id);

    if (upErr) {
      console.log(`✗ ${upErr.message}`);
      failed++;
    } else {
      console.log('✓');
      updated++;
    }

    if (i + 1 < targets.length) await sleep(DELAY_MS);
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
