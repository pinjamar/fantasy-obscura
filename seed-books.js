#!/usr/bin/env node

/**
 * Fantasy Book Database Seeder
 * Imports popular fantasy books from Open Library API into Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach((line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

// Get environment variables
const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Popular fantasy books to seed
const BOOKS_TO_IMPORT = [
  { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
  { title: 'A Game of Thrones', author: 'George R.R. Martin' },
  { title: 'The Name of the Wind', author: 'Patrick Rothfuss' },
  { title: 'Mistborn', author: 'Brandon Sanderson' },
  { title: 'The Way of Kings', author: 'Brandon Sanderson' },
  { title: 'Dune', author: 'Frank Herbert' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  { title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling' },
  { title: 'Good Omens', author: 'Neil Gaiman' },
  { title: 'American Gods', author: 'Neil Gaiman' },
  { title: 'The Earthsea Cycle', author: 'Ursula K. Le Guin' },
  { title: 'The Chronicles of Narnia', author: 'C.S. Lewis' },
  { title: 'Elantris', author: 'Brandon Sanderson' },
  { title: 'The Lies of Locke Lamora', author: 'Scott Lynch' },
  { title: 'Graceling', author: 'Kristin Cashore' },
  { title: 'Throne of Glass', author: 'Sarah J. Maas' },
  { title: 'Six of Crows', author: 'Leigh Bardugo' },
  { title: 'The Priory of the Orange Tree', author: 'Samantha Shannon' },
  { title: 'Ash', author: 'Malinda Lo' },
  { title: 'The Ten Thousand Doors of January', author: 'Alix Harmon' },
];

/**
 * Fetch book data from Open Library API
 */
async function fetchFromOpenLibrary(title, author) {
  try {
    const query = `${title} ${author}`;
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1`,
    );
    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      return null;
    }

    const doc = data.docs[0];
    return {
      title: doc.title || title,
      authors: doc.author_name || [author],
      isbn: doc.isbn?.[0] || null,
      cover_url: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
      publication_year: doc.first_publish_year || null,
      page_count: doc.number_of_pages_median || null,
      avg_rating: doc.ratings_average || null,
      synopsis: doc.synopsis || null,
    };
  } catch (error) {
    console.warn(`⚠️  Error fetching ${title}:`, error.message);
    return null;
  }
}

/**
 * Map books to subgenres based on title/author
 */
function mapSubgenres(title, author) {
  const lowerTitle = title.toLowerCase();
  const genres = [];

  // Map popular books to their genres
  if (
    ['lord of the rings', 'hobbit', 'dune', 'way of kings', 'mistborn'].some(
      (b) => lowerTitle.includes(b),
    )
  ) {
    genres.push('Epic Fantasy', 'High Fantasy');
  }
  if (
    ['game of thrones', 'song of ice and fire'].some((b) =>
      lowerTitle.includes(b),
    )
  ) {
    genres.push('Dark Fantasy', 'Epic Fantasy');
  }
  if (
    ['harry potter', 'name of the wind', 'priory'].some((b) =>
      lowerTitle.includes(b),
    )
  ) {
    genres.push('Magic Academy', 'Coming of Age');
  }
  if (['good omens', 'american gods'].some((b) => lowerTitle.includes(b))) {
    genres.push('Urban Fantasy', 'Contemporary Fantasy');
  }
  if (['earthsea', 'narnia'].some((b) => lowerTitle.includes(b))) {
    genres.push('Classic Fantasy', 'Magical World');
  }
  if (['lies of locke', 'six of crows'].some((b) => lowerTitle.includes(b))) {
    genres.push('Heist Fantasy', 'Adventure');
  }
  if (
    ['graceling', 'ash', 'throne of glass'].some((b) => lowerTitle.includes(b))
  ) {
    genres.push('Romantasy', 'YA Fantasy');
  }

  // Default genres
  if (genres.length === 0) {
    genres.push('Fantasy', 'Adventure');
  }

  return genres;
}

/**
 * Create book in Supabase
 */
async function createBook(bookData) {
  try {
    const { data, error } = await supabase
      .from('books')
      .insert([bookData])
      .select();

    if (error) {
      throw error;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error(`❌ Failed to insert ${bookData.title}:`, error.message);
    return null;
  }
}

/**
 * Main seed function
 */
async function seedBooks() {
  console.log('🌱 Starting book database seeding...\n');

  let imported = 0;
  let failed = 0;

  for (const book of BOOKS_TO_IMPORT) {
    process.stdout.write(`📖 Importing "${book.title}"... `);

    // Fetch from Open Library
    const bookData = await fetchFromOpenLibrary(book.title, book.author);

    if (!bookData) {
      console.log('⚠️  Skipped (not found)');
      failed++;
      continue;
    }

    // Add genres
    bookData.subgenres = mapSubgenres(book.title, book.author);
    bookData.tropes = [];
    bookData.tone = [];
    bookData.diversity_rep = [];

    // Create in Supabase
    const created = await createBook(bookData);

    if (created) {
      console.log('✅');
      imported++;
    } else {
      console.log('❌');
      failed++;
    }

    // Rate limit: 100ms between requests
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('\n✨ Seeding complete!');
  console.log(`   ✅ Successfully imported: ${imported} books`);
  console.log(`   ❌ Failed: ${failed} books`);
  console.log(`   📊 Total: ${imported + failed} books processed`);
  console.log('\n🎉 Visit http://localhost:4323/test-books to see your books!');
}

// Run seeder
seedBooks().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
