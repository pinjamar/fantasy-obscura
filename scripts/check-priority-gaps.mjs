/**
 * check-priority-gaps.mjs
 *
 * Fetches all books from the DB with avg_rating >= 3.8 (reasonably popular),
 * then reports which slugs are NOT in any priority tier.
 *
 * Usage: node scripts/check-priority-gaps.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { ALL_PRIORITY } from './priority-slugs.mjs';

config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const prioritySet = new Set(ALL_PRIORITY);

// Fetch all books with decent ratings in pages
const PAGE = 1000;
let from = 0;
const allBooks = [];
while (true) {
  const { data, error } = await supabase
    .from('books')
    .select('slug, title, authors, avg_rating, series')
    .not('avg_rating', 'is', null)
    .gte('avg_rating', 3.8)
    .order('avg_rating', { ascending: false })
    .range(from, from + PAGE - 1);
  if (error) { console.error(error); process.exit(1); }
  if (!data?.length) break;
  allBooks.push(...data);
  if (data.length < PAGE) break;
  from += PAGE;
}

console.log(`\nTotal DB books with avg_rating >= 3.8: ${allBooks.length}`);
console.log(`Total priority slugs: ${prioritySet.size}\n`);

const missing = allBooks.filter(b => b.slug && !prioritySet.has(b.slug));

console.log(`Books in DB but NOT in any priority tier: ${missing.length}\n`);
console.log('─'.repeat(80));

// Group by rating buckets for easier triage
const top = missing.filter(b => b.avg_rating >= 4.1);
const mid  = missing.filter(b => b.avg_rating >= 3.9 && b.avg_rating < 4.1);
const rest = missing.filter(b => b.avg_rating < 3.9);

function fmt(b) {
  const author = Array.isArray(b.authors) ? b.authors[0] : (b.authors ?? '');
  const series = b.series ? ` [${b.series}]` : '';
  return `  ${b.avg_rating?.toFixed(2)}  ${b.slug.padEnd(55)} ${b.title} — ${author}${series}`;
}

console.log(`\n⭐  RATING >= 4.1  (${top.length} books — strong TIER_2/TIER_1 candidates)\n`);
top.forEach(b => console.log(fmt(b)));

console.log(`\n📖  RATING 3.9–4.1  (${mid.length} books — TIER_3 candidates)\n`);
mid.forEach(b => console.log(fmt(b)));

console.log(`\n📚  RATING 3.8–3.9  (${rest.length} books — lower priority)\n`);
rest.forEach(b => console.log(fmt(b)));
