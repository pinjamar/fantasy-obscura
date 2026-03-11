/**
 * generate-what-makes-it-different.mjs
 *
 * Uses Claude Sonnet to write unique_angle snippets for books where it's NULL.
 * 2–3 short paragraphs explaining what makes the book structurally or thematically
 * distinct — written as unique editorial content for SEO and discovery.
 *
 * Usage:
 *   node scripts/generate-what-makes-it-different.mjs
 *   node scripts/generate-what-makes-it-different.mjs --dry-run
 *   node scripts/generate-what-makes-it-different.mjs --limit 20
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN   = process.argv.includes('--dry-run');
const PRIORITY  = process.argv.includes('--priority');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT     = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const SLUG_ARG  = process.argv.indexOf('--slug');
const SLUG      = SLUG_ARG !== -1 ? process.argv[SLUG_ARG + 1] : null;
const DELAY_MS  = 1200;

// 50 priority book slugs (from import-books.mjs)
const PRIORITY_SLUGS = [
  'mistborn-the-final-empire', 'the-way-of-kings', 'the-name-of-the-wind',
  'a-game-of-thrones', 'the-fellowship-of-the-ring', 'the-hobbit',
  'the-blade-itself', 'the-lies-of-locke-lamora', 'assassins-apprentice',
  'the-eye-of-the-world', 'fourth-wing', 'a-court-of-thorns-and-roses',
  'the-priory-of-the-orange-tree', 'the-poppy-war', 'the-shadow-of-the-gods',
  'red-sister', 'malice', 'the-black-prism', 'empire-of-the-vampire',
  'kings-of-the-wyld', 'jonathan-strange-mr-norrell', 'the-dragonbone-chair',
  'elantris', 'the-darkness-that-comes-before', 'the-colour-of-magic',
  'circe', 'uprooted', 'spinning-silver', 'legends-lattes', 'cradle-unsouled',
  'the-cruel-prince', 'the-will-of-the-many', 'the-justice-of-kings',
  'prince-of-thorns', 'gardens-of-the-moon', 'the-bone-ships',
  'the-bear-and-the-nightingale', 'the-ember-blade', 'the-rage-of-dragons',
  'daughter-of-the-empire', 'the-traitor-baru-cormorant', 'the-sword-of-kaigen',
  'senlin-ascends', 'the-goblin-emperor', 'the-atlas-six',
  'emily-wildes-encyclopaedia-of-faeries', 'the-spear-cuts-through-water',
  'the-tainted-cup', 'the-book-of-the-new-sun', 'tigana',
];

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

async function generateSnippet(book) {
  const prompt = `You are an editorial writer for a fantasy book discovery website. Write a unique_angle snippet for the book below.

Book:
Title: "${book.title}" by ${book.authors?.join(', ') || 'Unknown'}
Genres: ${book.subgenres?.join(', ') || 'Fantasy'}
Series: ${book.series ? `${book.series} #${book.series_number}` : 'Standalone'}
Synopsis: ${(book.synopsis || '').slice(0, 600) || 'Not available'}

Write 2–3 short paragraphs (total ~120–180 words) explaining:
- What makes this book structurally or thematically distinct from other fantasy
- What kind of reader experience it delivers (pacing, tone, surprises)
- Why someone who has never heard of it should pick it up

Rules:
- Write in third person, editorial voice — no "I" or "you"
- Do not start with the book title
- Do not use phrases like "this book", "this novel", "this story" more than once
- Make it feel like it was written by a knowledgeable book editor, not marketing copy
- Plain text only — no markdown, no bullet points`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim() || null;
}

async function main() {
  console.log(`\n✍️  What Makes It Different — Generator${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  let query = supabase
    .from('books')
    .select('id, title, authors, synopsis, subgenres, series, series_number');

  if (SLUG) {
    query = query.eq('slug', SLUG);
  } else {
    query = query
      .is('unique_angle', null)
      .not('synopsis', 'is', null)
      .order('title');
    if (PRIORITY) query = query.in('slug', PRIORITY_SLUGS);
    if (LIMIT) query = query.limit(LIMIT);
  }

  const { data: books, error } = await query;
  if (error) {
    console.error('Supabase error:', error.message);
    process.exit(1);
  }

  if (!books.length) {
    console.log('✅ All books already have snippets — nothing to do.');
    return;
  }

  console.log(`Found ${books.length} books needing snippets\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    process.stdout.write(`[${i + 1}/${books.length}] ${book.title.slice(0, 55).padEnd(55)}`);

    let snippet;
    try {
      snippet = await generateSnippet(book);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (!snippet) {
      console.log('✗ empty response');
      failed++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`\n[dry]\n${snippet}\n`);
      updated++;
      continue;
    }

    const { error: updateError } = await supabase
      .from('books')
      .update({ unique_angle: snippet })
      .eq('id', book.id);

    if (updateError) {
      console.log(`✗ ${updateError.message}`);
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
