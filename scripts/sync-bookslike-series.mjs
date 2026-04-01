/**
 * sync-bookslike-series.mjs
 *
 * Reads all recommended books from books-like.ts that have a series + series_number,
 * then updates the DB to match.
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';

config();

const sb = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const src = readFileSync('./src/data/books-like.ts', 'utf-8');

// Extract all rec/source objects as raw text blocks between { }
// We'll use a line-by-line state machine to pick up title, series, series_number
const lines = src.split('\n');
const books = new Map(); // slug -> {title, series, series_number}

let currentTitle = null;
let currentSeries = null;
let currentSeriesNumber = null;

for (const line of lines) {
  // Detect title: '...'
  const titleM = line.match(/^\s*title:\s*'((?:[^'\\]|\\.)*)'/);
  if (titleM) {
    // Flush previous if complete
    if (currentTitle && currentSeries && currentSeriesNumber !== null) {
      const slug = slugify(currentTitle);
      if (!books.has(slug)) {
        books.set(slug, { title: currentTitle, series: currentSeries, series_number: currentSeriesNumber });
      }
    }
    currentTitle = titleM[1].replace(/\\'/g, "'").trim();
    currentSeries = null;
    currentSeriesNumber = null;
    continue;
  }

  // Detect series: '...' (but NOT series_label or series_number)
  const seriesM = line.match(/^\s*series:\s*'((?:[^'\\]|\\.)*)'/);
  if (seriesM) {
    currentSeries = seriesM[1].replace(/\\'/g, "'").trim();
    continue;
  }

  // Detect series_number: N
  const snM = line.match(/^\s*series_number:\s*(\d+)/);
  if (snM) {
    currentSeriesNumber = parseInt(snM[1]);
    continue;
  }

  // Closing brace — flush
  if (line.match(/^\s*\},?\s*$/) && currentTitle && currentSeries && currentSeriesNumber !== null) {
    const slug = slugify(currentTitle);
    if (!books.has(slug) && !currentTitle.startsWith('Books Like')) {
      books.set(slug, { title: currentTitle, series: currentSeries, series_number: currentSeriesNumber });
    }
    currentTitle = null;
    currentSeries = null;
    currentSeriesNumber = null;
  }
}

console.log(`📚 Found ${books.size} books with series info in books-like.ts\n`);

// Query DB for all these slugs
const allSlugs = [...books.keys()];
const chunkSize = 200;
const dbMap = new Map();

for (let i = 0; i < allSlugs.length; i += chunkSize) {
  const chunk = allSlugs.slice(i, i + chunkSize);
  const { data } = await sb.from('books').select('slug, series, series_number').in('slug', chunk);
  (data ?? []).forEach(b => dbMap.set(b.slug, b));
}

// Find books needing update
const toUpdate = [];
const notInDb = [];

for (const [slug, info] of books) {
  if (!dbMap.has(slug)) {
    notInDb.push(slug);
    continue;
  }
  const db = dbMap.get(slug);
  if (db.series !== info.series || db.series_number !== info.series_number) {
    toUpdate.push({ slug, ...info, db_series: db.series, db_sn: db.series_number });
  }
}

console.log(`✅ Already correct: ${books.size - toUpdate.length - notInDb.length}`);
console.log(`🔄 Need update: ${toUpdate.length}`);
console.log(`⚠️  Not in DB: ${notInDb.length}`);

if (notInDb.length) {
  console.log('\nNot in DB:', notInDb.join(', '));
}

if (toUpdate.length === 0) {
  console.log('\nNothing to update!');
  process.exit(0);
}

console.log('\nUpdating...');
let updated = 0;
for (const { slug, series, series_number, title } of toUpdate) {
  const { error } = await sb.from('books').update({ series, series_number }).eq('slug', slug);
  if (error) {
    console.log(`  ❌ ${slug}: ${error.message}`);
  } else {
    console.log(`  ✅ ${title} → ${series} #${series_number}`);
    updated++;
  }
}

console.log(`\n✅ Updated ${updated} books`);
