/**
 * generate-reading-experience.mjs
 *
 * Uses Gemini Flash to write the "reading_experience" field for books where it's NULL.
 * Three focused paragraphs:
 *   1. Emotional feel — how the book feels to read
 *   2. Darkness clarification — anchored to the darkness_level (1–5 scale)
 *   3. Pacing + emotional rhythm — helps readers visualise the experience
 *
 * Targets books with subgenres (already classified) first, ordered by rating.
 *
 * Usage:
 *   node scripts/generate-reading-experience.mjs
 *   node scripts/generate-reading-experience.mjs --dry-run
 *   node scripts/generate-reading-experience.mjs --limit 10
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

const DARKNESS_LABELS = {
  1: 'Lighthearted — cozy, low stakes, emotionally safe',
  2: 'Mild — some tension or loss, but overall hopeful',
  3: 'Serious — morally complex, character deaths possible, emotionally weighty',
  4: 'Dark — graphic content, bleak themes, significant suffering',
  5: 'Brutal — extreme violence, nihilism, relentless darkness',
};

const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: 'gemini-2.5-flash' });
const supabase  = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generate(book) {
  const darknessLine = book.darkness_level
    ? `Darkness Level: ${book.darkness_level}/5 — ${DARKNESS_LABELS[book.darkness_level]}`
    : 'Darkness Level: not yet classified';

  const prompt = `You are an editorial writer for a fantasy book discovery website.
Write the "Tone & Reading Experience" section for the book below.

Book:
Title: "${book.title}" by ${book.authors?.join(', ') || 'Unknown'}
Genres: ${book.subgenres?.join(', ') || 'Fantasy'}
${darknessLine}
Synopsis: ${(book.synopsis || '').slice(0, 500) || 'Not available'}

Write exactly 3 short paragraphs in this order:

Paragraph 1 — Emotional Feel
Exactly 2 sentences. Example: "The tone balances [X] with [Y]. Readers will encounter [mood/emotion]."

Paragraph 2 — Darkness Clarification
Exactly 2 sentences. Anchor to the darkness level. Example: "At a [level] intensity, [what is present]. [What is NOT present or how it is handled]."

Paragraph 3 — Pacing & Emotional Rhythm
Exactly 2 sentences. Example: "[Slow-burn / Propulsive] in structure, [X]. [How tension releases or rhythm shapes experience]."

Rules:
- EXACTLY 2 sentences per paragraph — no more
- Total length: 80–120 words
- Third-person editorial voice — no "you" or "I"
- No markdown, no headers, no bullet points
- Do not start with the book title
- Do not use the phrase "this book" or "this novel"`;

  const result = await model.generateContent(prompt);
  return result.response.text()
    .replace(/^(\*\*.*\*\*|#+\s+.*)\n+/m, '')
    .trim() || null;
}

async function main() {
  console.log(`\n📖 Reading Experience Generator${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  let query = supabase
    .from('books')
    .select('id, title, authors, synopsis, subgenres, darkness_level, avg_rating');

  if (SLUG) {
    query = query.eq('slug', SLUG);
  } else {
    query = query
      .is('reading_experience', null)
      .not('subgenres', 'is', null)
      .not('synopsis', 'is', null)
      .order('avg_rating', { ascending: false, nullsLast: true });
    if (PRIORITY) query = query.in('slug', PRIORITY_SLUGS);
    if (LIMIT) query = query.limit(LIMIT);
  }

  const { data: books, error } = await query;
  if (error) { console.error('Supabase error:', error.message); process.exit(1); }

  if (!books.length) {
    console.log('✅ All books already have reading_experience — nothing to do.');
    return;
  }

  console.log(`Found ${books.length} books to process\n`);

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
      .update({ reading_experience: text })
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
