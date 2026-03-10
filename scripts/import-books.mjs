/**
 * import-books.mjs
 *
 * Imports the 50 priority SEO books from OpenLibrary.
 * Skips books that already exist in the DB (matched by slug).
 *
 * Usage:
 *   node scripts/import-books.mjs
 *   node scripts/import-books.mjs --dry-run   (preview without writing to DB)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN = process.argv.includes('--dry-run');
const DELAY_MS = 400;

// ── Priority books ────────────────────────────────────────────────────────────

const BOOKS = [
  // Tier 1
  { title: 'Mistborn: The Final Empire',       author: 'Brandon Sanderson',    series: 'Mistborn',          series_number: 1 },
  { title: 'The Way of Kings',                 author: 'Brandon Sanderson',    series: 'The Stormlight Archive', series_number: 1 },
  { title: 'The Name of the Wind',             author: 'Patrick Rothfuss',     series: 'The Kingkiller Chronicle', series_number: 1 },
  { title: 'A Game of Thrones',                author: 'George R.R. Martin',   series: 'A Song of Ice and Fire',   series_number: 1 },
  { title: 'The Fellowship of the Ring',       author: 'J.R.R. Tolkien',       series: 'The Lord of the Rings',    series_number: 1 },
  { title: 'The Hobbit',                       author: 'J.R.R. Tolkien',       series: null,                series_number: null },
  { title: 'The Blade Itself',                 author: 'Joe Abercrombie',      series: 'The First Law',     series_number: 1 },
  { title: 'The Lies of Locke Lamora',         author: 'Scott Lynch',          series: "Gentleman Bastard", series_number: 1 },
  { title: "Assassin's Apprentice",            author: 'Robin Hobb',           series: 'Farseer Trilogy',   series_number: 1 },
  { title: 'The Eye of the World',             author: 'Robert Jordan',        series: 'The Wheel of Time', series_number: 1 },
  // Tier 2
  { title: 'Fourth Wing',                      author: 'Rebecca Yarros',       series: 'The Empyrean',      series_number: 1 },
  { title: 'A Court of Thorns and Roses',      author: 'Sarah J. Maas',        series: 'A Court of Thorns and Roses', series_number: 1 },
  { title: 'The Priory of the Orange Tree',    author: 'Samantha Shannon',     series: null,                series_number: null },
  { title: 'The Poppy War',                    author: 'R.F. Kuang',           series: 'The Poppy War',     series_number: 1 },
  { title: 'The Shadow of the Gods',           author: 'John Gwynne',          series: 'The Bloodsworn Saga', series_number: 1 },
  { title: 'Red Sister',                       author: 'Mark Lawrence',        series: 'Book of the Ancestor', series_number: 1 },
  { title: 'Malice',                           author: 'John Gwynne',          series: 'The Faithful and the Fallen', series_number: 1 },
  { title: 'The Black Prism',                  author: 'Brent Weeks',          series: 'Lightbringer',      series_number: 1 },
  { title: 'Empire of the Vampire',            author: 'Jay Kristoff',         series: 'Empire of the Vampire', series_number: 1 },
  { title: 'Kings of the Wyld',               author: 'Nicholas Eames',       series: 'The Band',          series_number: 1 },
  // Tier 3
  { title: 'Jonathan Strange & Mr Norrell',    author: 'Susanna Clarke',       series: null,                series_number: null },
  { title: 'The Dragonbone Chair',             author: 'Tad Williams',         series: 'Memory, Sorrow and Thorn', series_number: 1 },
  { title: 'Elantris',                         author: 'Brandon Sanderson',    series: null,                series_number: null },
  { title: 'The Darkness That Comes Before',   author: 'R. Scott Bakker',      series: 'The Prince of Nothing', series_number: 1 },
  { title: 'The Colour of Magic',              author: 'Terry Pratchett',      series: 'Discworld',         series_number: 1 },
  { title: 'Circe',                            author: 'Madeline Miller',      series: null,                series_number: null },
  { title: 'Uprooted',                         author: 'Naomi Novik',          series: null,                series_number: null },
  { title: 'Spinning Silver',                  author: 'Naomi Novik',          series: null,                series_number: null },
  { title: 'Legends & Lattes',                 author: 'Travis Baldree',       series: 'Legends & Lattes',  series_number: 1 },
  { title: 'Cradle: Unsouled',                 author: 'Will Wight',           series: 'Cradle',            series_number: 1 },
  // Tier 4
  { title: 'The Cruel Prince',                 author: 'Holly Black',          series: 'The Folk of the Air', series_number: 1 },
  { title: 'The Will of the Many',             author: 'James Islington',      series: 'Hierarchy',         series_number: 1 },
  { title: 'The Justice of Kings',             author: 'Richard Swan',         series: 'The Empire of the Wolf', series_number: 1 },
  { title: 'Prince of Thorns',                 author: 'Mark Lawrence',        series: 'The Broken Empire', series_number: 1 },
  { title: 'Gardens of the Moon',              author: 'Steven Erikson',       series: 'Malazan Book of the Fallen', series_number: 1 },
  { title: 'The Bone Ships',                   author: 'RJ Barker',            series: 'The Tide Child',    series_number: 1 },
  { title: 'The Bear and the Nightingale',     author: 'Katherine Arden',      series: 'Winternight Trilogy', series_number: 1 },
  { title: 'The Ember Blade',                  author: 'Chris Wooding',        series: 'The Darkwater Legacy', series_number: 1 },
  { title: 'The Rage of Dragons',              author: 'Evan Winter',          series: 'The Burning',       series_number: 1 },
  { title: 'Daughter of the Empire',           author: 'Raymond E. Feist',     series: 'The Empire Trilogy', series_number: 1 },
  { title: 'The Traitor Baru Cormorant',       author: 'Seth Dickinson',       series: 'The Masquerade',    series_number: 1 },
  { title: 'The Sword of Kaigen',              author: 'M.L. Wang',            series: null,                series_number: null },
  { title: 'Senlin Ascends',                   author: 'Josiah Bancroft',      series: 'Books of Babel',    series_number: 1 },
  { title: 'The Goblin Emperor',               author: 'Katherine Addison',    series: null,                series_number: null },
  { title: 'The Atlas Six',                    author: 'Olivie Blake',         series: 'The Atlas',         series_number: 1 },
  { title: "Emily Wilde's Encyclopaedia of Faeries", author: 'Heather Fawcett', series: "Emily Wilde",     series_number: 1 },
  { title: 'The Spear Cuts Through Water',     author: 'Simon Jimenez',        series: null,                series_number: null },
  { title: 'The Tainted Cup',                  author: 'Robert Jackson Bennett', series: 'Shadow of the Leviathan', series_number: 1 },
  { title: 'The Book of the New Sun',          author: 'Gene Wolfe',           series: 'The Book of the New Sun', series_number: 1 },
  { title: 'Tigana',                           author: 'Guy Gavriel Kay',      series: null,                series_number: null },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isLikelyNonEnglish(text) {
  if (!text) return false;
  const letters = [...text].filter((c) => /\p{L}/u.test(c));
  if (letters.length < 20) return false;
  const nonAscii = letters.filter((c) => c.charCodeAt(0) > 127);
  return nonAscii.length / letters.length > 0.05;
}

async function fetchGoogleBooks(title, author) {
  const queries = [
    `intitle:${title} inauthor:${author}`,
    `${title} ${author}`,
    title,
  ];
  for (const query of queries) {
    const q = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=en&maxResults=1&printType=books&key=${GOOGLE_BOOKS_KEY}`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const item = data.items?.[0]?.volumeInfo;
      if (!item) continue;
      const rawYear = item.publishedDate;
      const year = rawYear ? parseInt(rawYear.slice(0, 4), 10) : null;
      const validYear = year && year >= 1800 && year <= new Date().getFullYear() ? year : null;
      const synopsis = item.description?.trim() ?? null;
      const thumb = item.imageLinks?.extraLarge ?? item.imageLinks?.large ?? item.imageLinks?.medium ?? item.imageLinks?.thumbnail ?? null;
      const cover_url = thumb ? thumb.replace(/^http:/, 'https:').replace('&edge=curl', '') : null;
      return {
        synopsis: synopsis ? synopsis.slice(0, 2000) : null,
        publication_year: validYear,
        cover_url,
      };
    } catch {
      continue;
    }
  }
  return null;
}

async function fetchOpenLibrary(title, author) {
  const q = encodeURIComponent(`${title} ${author}`);
  const url = `https://openlibrary.org/search.json?q=${q}&limit=1&fields=key,title,author_name,first_publish_year,number_of_pages_median,isbn,cover_i,subject`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const doc = data.docs?.[0];
  if (!doc) return null;

  // Try Google Books first for synopsis + year (reliable English content)
  const gb = await fetchGoogleBooks(title, author);

  // OpenLibrary synopsis as fallback only if Google Books has nothing
  let synopsis = gb?.synopsis ?? null;
  if (!synopsis && doc.key) {
    try {
      const workRes = await fetch(`https://openlibrary.org${doc.key}.json`);
      if (workRes.ok) {
        const work = await workRes.json();
        const desc = work.description;
        const raw = typeof desc === 'string' ? desc : (desc?.value ?? null);
        // Only use if it looks like English
        if (raw && !isLikelyNonEnglish(raw)) {
          synopsis = raw.slice(0, 2000);
        }
      }
    } catch {}
  }

  // Prefer Google Books year; fall back to OpenLibrary only if it looks reasonable
  let publication_year = gb?.publication_year ?? null;
  if (!publication_year) {
    const olYear = doc.first_publish_year ?? null;
    if (olYear && olYear >= 1800 && olYear <= new Date().getFullYear()) {
      publication_year = olYear;
    }
  }

  const olCover = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null;
  return {
    cover_url: gb?.cover_url ?? olCover,
    isbn: doc.isbn?.[0] ?? null,
    publication_year,
    page_count: doc.number_of_pages_median ?? null,
    synopsis,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}
if (!process.env.GOOGLE_BOOKS_API_KEY) {
  console.error('Missing GOOGLE_BOOKS_API_KEY in .env');
  process.exit(1);
}

const GOOGLE_BOOKS_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function main() {
  console.log(`\n📚 Fantasy Obscura — Book Importer${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  // Fetch existing slugs
  const { data: existing, error: existErr } = await supabase
    .from('books')
    .select('slug, title');
  if (existErr) {
    console.error('Supabase error:', existErr.message);
    process.exit(1);
  }

  const existingSlugs = new Set(existing.map((b) => b.slug).filter(Boolean));
  const existingTitles = new Set(existing.map((b) => b.title.toLowerCase().trim()));

  const toImport = BOOKS.filter((b) => {
    const slug = slugify(b.title);
    if (existingSlugs.has(slug)) return false;
    if (existingTitles.has(b.title.toLowerCase().trim())) return false;
    return true;
  });

  const skipped = BOOKS.length - toImport.length;
  console.log(`Total in list:  ${BOOKS.length}`);
  console.log(`Already in DB:  ${skipped}`);
  console.log(`To import:      ${toImport.length}\n`);

  if (toImport.length === 0) {
    console.log('✅ Nothing to import.');
    return;
  }

  let imported = 0;
  let failed = 0;

  for (const book of toImport) {
    const slug = slugify(book.title);
    process.stdout.write(`  ${book.title.slice(0, 55).padEnd(55)}`);

    let meta = {};
    try {
      meta = (await fetchOpenLibrary(book.title, book.author)) ?? {};
      await sleep(DELAY_MS);
    } catch {
      meta = {};
    }

    const record = {
      title: book.title,
      slug,
      authors: [book.author],
      series: book.series ?? null,
      series_number: book.series_number ?? null,
      cover_url: meta.cover_url ?? null,
      isbn: meta.isbn ?? null,
      publication_year: meta.publication_year ?? null,
      page_count: meta.page_count ?? null,
      synopsis: meta.synopsis ?? null,
      // These will be filled by classify-books.mjs
      darkness_level: null,
      heat_level: null,
    };

    if (DRY_RUN) {
      console.log(`→ [dry] ${slug}`);
      imported++;
      continue;
    }

    const { error } = await supabase.from('books').insert(record);
    if (error) {
      console.log(`✗ ${error.message}`);
      failed++;
    } else {
      console.log(`✓ ${slug}`);
      imported++;
    }
  }

  console.log(`\n──────────────────────────────`);
  console.log(`✅ Imported: ${imported}`);
  if (skipped) console.log(`⏭️  Skipped:  ${skipped} (already in DB)`);
  if (failed)  console.log(`✗  Failed:   ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
