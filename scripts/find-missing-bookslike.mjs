/**
 * find-missing-bookslike.mjs
 *
 * Extracts all unique title+author pairs from src/data/books-like.ts,
 * checks which slugs are missing from the DB, and writes a file
 * ready for: node scripts/add-books.mjs --file scripts/missing-bookslike.txt
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';

config();

const supabase = createClient(
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

// Read the TS file as plain text
const src = readFileSync('./src/data/books-like.ts', 'utf-8');

// Extract all title: '...' / author: '...' pairs
// Both single-quoted with possible escaped quotes, and template literals
const pairs = new Map(); // slug -> {title, author}

// Match objects that have title + author fields (handles escaped quotes)
const blockRe = /title:\s*'((?:[^'\\]|\\.)*)'\s*,[\s\S]{0,400}?author:\s*'((?:[^'\\]|\\.)*?)'/g;
let m;
while ((m = blockRe.exec(src)) !== null) {
  const title = m[1].replace(/\\'/g, "'").trim();
  const author = m[2].replace(/\\'/g, "'").trim();
  if (!title || !author) continue;
  // Skip metadata-only entries (answer_line etc embed titles in sentences)
  if (title.length > 80) continue;
  const slug = slugify(title);
  if (!pairs.has(slug)) {
    pairs.set(slug, { title, author });
  }
}

console.log(`📚 Extracted ${pairs.size} unique books from books-like.ts`);

// Batch-check DB in chunks of 500
const allSlugs = [...pairs.keys()];
const existing = new Set();
const chunkSize = 500;
for (let i = 0; i < allSlugs.length; i += chunkSize) {
  const chunk = allSlugs.slice(i, i + chunkSize);
  const { data } = await supabase.from('books').select('slug').in('slug', chunk);
  (data ?? []).forEach((b) => existing.add(b.slug));
}

const missing = allSlugs
  .filter((slug) => !existing.has(slug))
  .map((slug) => pairs.get(slug));

console.log(`✅ In DB: ${existing.size}`);
console.log(`❌ Missing: ${missing.length}`);

if (missing.length === 0) {
  console.log('Nothing to add!');
  process.exit(0);
}

// Write file for add-books.mjs
const lines = missing.map((b) => `${b.title} | ${b.author}`);
writeFileSync('./scripts/missing-bookslike.txt', lines.join('\n') + '\n');
console.log('\nMissing books:');
lines.forEach((l) => console.log(' ', l));
console.log(`\n✏️  Written to scripts/missing-bookslike.txt`);
console.log('Run: node scripts/add-books.mjs --file scripts/missing-bookslike.txt');
