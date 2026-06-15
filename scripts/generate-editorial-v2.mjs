/**
 * generate-editorial-v2.mjs
 *
 * Rewrites reading_experience + ideal_reader + faqs for priority books that
 * do NOT have a books-like guide (books with a guide show why_people_love on
 * the book page instead, so the DB fields are never rendered for them).
 *
 * All three sections generated in ONE API call per book.
 * Uses Gemini 2.5 Pro and feeds every unique field we have — tropes, heat,
 * darkness, content warnings, tone, pacing, magic system — so the output is
 * book-specific rather than generic.
 *
 * Usage:
 *   node scripts/generate-editorial-v2.mjs --tier1
 *   node scripts/generate-editorial-v2.mjs --tier2
 *   node scripts/generate-editorial-v2.mjs --tier1 --tier2
 *   node scripts/generate-editorial-v2.mjs --slug six-of-crows
 *   node scripts/generate-editorial-v2.mjs --tier1 --dry-run
 *   node scripts/generate-editorial-v2.mjs --tier1 --limit 5
 *   node scripts/generate-editorial-v2.mjs --include-bookslike   (also run for books-like source books)
 *
 * By default skips books that have a books-like guide (their content comes
 * from the books-like file, not the DB). Add --include-bookslike to override.
 * By default only processes books where all three fields are NULL.
 * Add --force to overwrite existing content.
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { TIER_1, TIER_2, TIER_3, TIER_4 } from './priority-slugs.mjs';

// Build set of books-like source slugs (these use why_people_love on the book
// page, so ideal_reader/reading_experience in the DB are never shown for them)
function getBooksLikeSourceSlugs() {
  const dir = join(import.meta.dirname, '../src/data/books-like');
  const slugs = new Set();
  for (const file of readdirSync(dir).filter(f => f.endsWith('.ts'))) {
    const content = readFileSync(join(dir, file), 'utf8');
    const dbSlug = content.match(/\bdb_slug:\s*'([^']+)'/);
    const title  = content.match(/\btitle:\s*'([^']+)'/);
    if (dbSlug) {
      slugs.add(dbSlug[1]);
    } else if (title) {
      slugs.add(title[1].replace(/\s*\([^)]*\)/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  }
  return slugs;
}

config();

const DRY_RUN          = process.argv.includes('--dry-run');
const FORCE            = process.argv.includes('--force');
const INCLUDE_BOOKSLIKE = process.argv.includes('--include-bookslike');
const TIER1_ONLY       = process.argv.includes('--tier1');
const TIER2_ONLY       = process.argv.includes('--tier2');
const TIER3_ONLY       = process.argv.includes('--tier3');
const TIER4_ONLY       = process.argv.includes('--tier4');
const LIMIT_ARG        = process.argv.indexOf('--limit');
const LIMIT            = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const SLUG_ARG         = process.argv.indexOf('--slug');
const SLUG             = SLUG_ARG !== -1 ? process.argv[SLUG_ARG + 1] : null;

// Build target slug list from flags
let TARGET_SLUGS;
if (SLUG) {
  TARGET_SLUGS = [SLUG];
} else if (TIER1_ONLY || TIER2_ONLY || TIER3_ONLY || TIER4_ONLY) {
  TARGET_SLUGS = [
    ...(TIER1_ONLY ? TIER_1 : []),
    ...(TIER2_ONLY ? TIER_2 : []),
    ...(TIER3_ONLY ? TIER_3 : []),
    ...(TIER4_ONLY ? TIER_4 : []),
  ];
} else {
  console.error('❌  Specify at least one of --tier1, --tier2, --tier3, --tier4, or --slug <slug>');
  process.exit(1);
}

// By default exclude books that have a books-like guide — those show
// why_people_love on the book page, so ideal_reader/reading_experience
// in the DB are never rendered for them.
if (!INCLUDE_BOOKSLIKE && !SLUG) {
  const blSlugs = getBooksLikeSourceSlugs();
  const before = TARGET_SLUGS.length;
  TARGET_SLUGS = TARGET_SLUGS.filter(s => !blSlugs.has(s));
  console.log(`Skipping ${before - TARGET_SLUGS.length} books-like source books (pass --include-bookslike to override)`);
}

const DELAY_MS = 2000; // Vertex AI is generous but let's be polite

const DARKNESS_LABELS = {
  1: 'Lighthearted — cozy, low stakes, emotionally safe. No deaths, no grimdark.',
  2: 'Mild — some tension or loss, but overall hopeful. Light conflict, safe ending likely.',
  3: 'Serious — morally complex, character deaths possible, emotionally weighty.',
  4: 'Dark — graphic content, bleak themes, significant suffering. Trauma is explored.',
  5: 'Brutal — extreme violence, nihilism, relentless darkness. Not for sensitive readers.',
};

const HEAT_LABELS = {
  'Closed Door': 'No on-page romance or intimacy. Any romance is entirely off-page.',
  'Sweet Romance': 'Light romantic tension, kissing at most. Clean and wholesome.',
  'Open Door': 'Romantic and sexual tension present, some intimacy shown but not explicit.',
  'Explicit': 'On-page sexual content, detailed but not the dominant focus.',
  'Fiery': 'Frequent, graphic sexual content — a core part of the reading experience.',
};

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing Supabase env vars in .env');
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

function buildPrompt(book) {
  const lines = [
    `Title: "${book.title}"`,
    `Author(s): ${(book.authors ?? []).join(', ') || 'Unknown'}`,
    `Genres: ${(book.subgenres ?? []).join(', ') || 'Fantasy'}`,
    book.series
      ? `Series: ${book.series}${book.series_number != null ? ` #${book.series_number}` : ''}`
      : 'Series: Standalone',
    book.tropes?.length
      ? `Tropes: ${book.tropes.join(', ')}`
      : null,
    book.tone?.length
      ? `Tone: ${book.tone.join(', ')}`
      : null,
    book.pacing
      ? `Pacing: ${book.pacing}`
      : null,
    book.magic_system
      ? `Magic System: ${book.magic_system}`
      : null,
    book.audience
      ? `Audience: ${book.audience}`
      : null,
    book.darkness_level
      ? `Darkness: ${book.darkness_level}/5 — ${DARKNESS_LABELS[book.darkness_level]}`
      : null,
    book.heat_level
      ? `Heat: ${book.heat_level} — ${HEAT_LABELS[book.heat_level] ?? ''}`
      : null,
    book.content_warnings?.length
      ? `Content Warnings: ${book.content_warnings.join(', ')}`
      : null,
    book.synopsis
      ? `Synopsis: ${book.synopsis.slice(0, 700)}`
      : null,
  ].filter(Boolean).join('\n');

  return `You are a senior editorial writer for The Grimoire, a fantasy book discovery site.
Your writing is authoritative and slightly opinionated — like a well-read friend who has strong
opinions about fantasy, not a marketing copywriter.

Write editorial content for the following book. Return ONLY a valid JSON object
with exactly three keys: reading_experience, ideal_reader, faqs.
No markdown, no code blocks, no explanations outside the JSON.

${lines}

---

JSON format:
{
  "reading_experience": "<paragraphs separated by \\n\\n, 80-120 words total>",
  "ideal_reader": "<paragraphs separated by \\n\\n, 120-160 words total>",
  "faqs": [
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ]
}

Content rules for each section:

reading_experience:
- Paragraph 1: The emotional feel of reading THIS specific book — the mood, atmosphere, what it actually feels like to sit with it. Be concrete, not generic.
- Paragraph 2: What the darkness (${book.darkness_level ?? '?'}/5) and heat (${book.heat_level ?? 'unrated'}) mean IN PRACTICE for this book. Name the specific tone, themes, or content that earns those ratings — not just "it's dark" but what KIND of dark.
- Paragraph 3: Pacing and emotional rhythm. How does tension build, where does it release? Slow-burn or propulsive?

ideal_reader:
- Paragraph 1: Start with "${book.title} is ideal for readers who want..." then name 3-4 SPECIFIC preferences drawn directly from the tropes, tone, and genre above. Be precise — not "readers who like magic" but "readers who want intricate magic systems with hard rules and real consequences."
- Paragraph 2: Compare to 1-2 known books. Name them. Explain what specifically connects them to this book AND what's different.
- Paragraph 3: Start with "However," — be honest about who this is NOT for. One specific, concrete caveat tied to this book's actual characteristics (pacing, content, style), not a generic warning.

faqs (4-6 items):
- Questions real readers ask — search patterns from Reddit/Goodreads (is it a standalone? does it have a cliffhanger? how dark/spicy is it really? is the series finished? how long does it take to read?)
- Answers: 2-3 sentences MAX, direct, lead with yes/no where applicable
- Include at least one question about a potential dealbreaker (slow start, darkness, length, unfinished series)
- ${book.series ? `Include a question about reading order — is book ${book.series_number ?? 1} a good entry point?` : 'Include a question about whether it works as a standalone.'}
- ${book.page_count && book.page_count >= 400 ? `Include a reading time question (${book.page_count} pages).` : ''}

Style rules (apply to reading_experience and ideal_reader):
- Third-person editorial voice only — no "you" or "I"
- Vary sentence length: mix short punchy sentences with longer analytical ones
- NEVER USE: delve, tapestry, testament, vibrant, masterpiece, must-read, journey (as metaphor), realm, shimmering, captivating, spellbinding, thrilling, fans will love
- Plain prose only — no markdown formatting whatsoever. Book titles are plain text, not wrapped in asterisks or underscores. No bold, no italics, no headers.`;
}

async function generate(book) {
  const prompt = buildPrompt(book);
  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();

  // Try multiple extraction strategies in order of reliability
  const candidates = [
    // 1. Strip markdown fences then parse
    raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim(),
    // 2. Extract first {...} block (handles surrounding text)
    (raw.match(/\{[\s\S]*\}/) ?? [])[0] ?? '',
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const parsed = JSON.parse(candidate);
      if (parsed.reading_experience && parsed.ideal_reader && Array.isArray(parsed.faqs) && parsed.faqs.length >= 2) {
        return parsed;
      }
    } catch { /* try next */ }
  }

  console.warn('\n  ⚠ Could not parse JSON response. Raw output:');
  console.warn('  ' + raw.slice(0, 500) + (raw.length > 500 ? '…' : ''));
  return null;
}

async function main() {
  const tierLabel = SLUG ? SLUG : [TIER1_ONLY && 'Tier 1', TIER2_ONLY && 'Tier 2', TIER3_ONLY && 'Tier 3', TIER4_ONLY && 'Tier 4'].filter(Boolean).join('+') || 'custom';
  console.log(`\n✍️  Editorial V2 — ${tierLabel}${FORCE ? ' [FORCE]' : ''}${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  let query = supabase
    .from('books')
    .select('id, slug, title, authors, synopsis, subgenres, series, series_number, tropes, tone, pacing, magic_system, audience, darkness_level, heat_level, content_warnings, reading_experience, unique_angle, ideal_reader')
    .in('slug', TARGET_SLUGS)
    .not('synopsis', 'is', null);

  // Without --force, skip books that already have all three fields
  if (!FORCE && !SLUG) {
    query = query.or('reading_experience.is.null,ideal_reader.is.null,faqs.is.null');
  }

  if (LIMIT) query = query.limit(LIMIT);

  const { data: books, error } = await query;
  if (error) { console.error('Supabase error:', error.message); process.exit(1); }

  if (!books?.length) {
    console.log('✅  All target books already have editorial content. Use --force to regenerate.');
    return;
  }

  console.log(`Found ${books.length} books to process\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const label = `[${i + 1}/${books.length}] ${book.title.slice(0, 48).padEnd(48)}`;
    process.stdout.write(label + ' ');

    let sections;
    try {
      sections = await generate(book);
    } catch (err) {
      console.log(`✗  ${err.message}`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (!sections) {
      console.log('✗  parse error');
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (DRY_RUN) {
      console.log('\n[reading_experience]\n' + sections.reading_experience);
      console.log('\n[unique_angle]\n' + sections.unique_angle);
      console.log('\n[ideal_reader]\n' + sections.ideal_reader + '\n');
      updated++;
      continue;
    }

    const { error: upErr } = await supabase
      .from('books')
      .update({
        reading_experience: sections.reading_experience,
        ideal_reader: sections.ideal_reader,
        faqs: sections.faqs,
      })
      .eq('id', book.id);

    if (upErr) {
      console.log(`✗  ${upErr.message}`);
      failed++;
    } else {
      console.log('✓');
      updated++;
    }

    if (i + 1 < books.length) await sleep(DELAY_MS);
  }

  console.log('\n──────────────────────────────────');
  console.log(`✅  Updated : ${updated}`);
  if (failed) console.log(`✗   Failed  : ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
