/**
 * insert-failed-books.mjs
 * Directly inserts books that failed due to ISBN conflicts.
 * Run: node scripts/insert-failed-books.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const BOOKS = [
  {
    slug: 'war-of-the-twins',
    title: 'War of the Twins',
    authors: ['Margaret Weis', 'Tracy Hickman'],
    series: 'Dragonlance Legends',
    page_count: 384,
    publication_year: 1986,
    synopsis: 'Raistlin and Caramon are hurled back in time to witness the Cataclysm. As Raistlin\'s power grows, Caramon must choose between stopping his twin and saving the world.',
    cover_url: null,
  },
  {
    slug: 'test-of-the-twins',
    title: 'Test of the Twins',
    authors: ['Margaret Weis', 'Tracy Hickman'],
    series: 'Dragonlance Legends',
    page_count: 310,
    publication_year: 1986,
    synopsis: 'The conclusion of the Legends trilogy. Caramon must find a way to stop Raistlin from destroying the world — even if it means his brother\'s death.',
    cover_url: null,
  },
  {
    slug: 'the-initiate',
    title: 'The Initiate',
    authors: ['Veronica Roth'],
    series: 'Divergent',
    page_count: 58,
    publication_year: 2014,
    synopsis: 'Four\'s initiation story told from his perspective, showing his experience during the brutal Dauntless initiation process.',
    cover_url: null,
  },
  {
    slug: 'the-son',
    title: 'The Son',
    authors: ['Veronica Roth'],
    series: 'Divergent',
    page_count: 52,
    publication_year: 2014,
    synopsis: 'Four\'s story continues as he discovers the truth about his father and the faction system, told from his perspective.',
    cover_url: null,
  },
  {
    slug: 'the-traitor',
    title: 'The Traitor',
    authors: ['Veronica Roth'],
    series: 'Divergent',
    page_count: 66,
    publication_year: 2014,
    synopsis: 'The final story in the Four series, where Four must confront betrayal and decide where his loyalties truly lie.',
    cover_url: null,
  },
  {
    slug: 'lady-of-the-lake',
    title: 'Lady of the Lake',
    authors: ['Andrzej Sapkowski'],
    series: 'The Witcher',
    page_count: 544,
    publication_year: 1999,
    synopsis: 'The stunning conclusion to the Witcher saga. Ciri travels through time and worlds, while Geralt leads his companions in a desperate search for her.',
    cover_url: 'https://books.google.com/books/content?id=2QSAEAAAQBAJ&printsec=frontcover&img=1&zoom=1',
  },
  {
    slug: 'iron-and-magic',
    title: 'Iron and Magic',
    authors: ['Ilona Andrews'],
    series: 'The Iron Covenant',
    page_count: 342,
    publication_year: 2018,
    synopsis: 'A Kate Daniels world novel. Hugh d\'Ambray, former warlord of the immortal Roland, must forge an unlikely alliance with a clan of witches to survive.',
    cover_url: null,
  },
];

let inserted = 0;
let failed = 0;

for (const book of BOOKS) {
  process.stdout.write(`  "${book.title}" … `);
  const { error } = await supabase.from('books').insert({
    ...book,
    isbn: null,
  });
  if (error) {
    console.log(`✗ ${error.message}`);
    failed++;
  } else {
    console.log(`✓`);
    inserted++;
  }
}

console.log(`\n✅ Inserted: ${inserted} | ✗ Failed: ${failed}`);
