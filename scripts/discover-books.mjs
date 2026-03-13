/**
 * discover-books.mjs
 *
 * Automatically discovers and imports fantasy books from Google Books API.
 * Cycles through subgenre search queries, paginates results, skips duplicates.
 * Progress is saved between runs so each execution continues where it left off.
 *
 * Usage:
 *   node scripts/discover-books.mjs                 (import up to 100 new books)
 *   node scripts/discover-books.mjs --limit 50      (import up to 50 new books)
 *   node scripts/discover-books.mjs --dry-run       (preview without writing)
 *   node scripts/discover-books.mjs --reset         (clear saved progress, start fresh)
 *
 * After running, fill in metadata:
 *   node scripts/classify-metadata.mjs
 *   node scripts/classify-vibes.mjs
 *   node scripts/classify-tropes.mjs
 *   node scripts/classify-creatures.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROGRESS_FILE = path.join(__dirname, '.discover-progress.json');

const DRY_RUN  = process.argv.includes('--dry-run');
const RESET    = process.argv.includes('--reset');
const limitArg = process.argv.find((a) => a.startsWith('--limit=')) ?? process.argv[process.argv.indexOf('--limit') + 1];
const LIMIT    = parseInt(limitArg) || 100;
const DELAY_MS = 400;
const PAGE_SIZE = 40; // Google Books max per request

// ── Search queries ─────────────────────────────────────────────────────────────
// Ordered by expected quality/relevance. Script cycles through these.

const QUERIES = [
  // Author-first queries — best quality, Google Books has full data for these
  'inauthor:sanderson fantasy',
  'inauthor:abercrombie fantasy',
  'inauthor:rothfuss fantasy',
  'inauthor:"robin hobb" fantasy',
  'inauthor:"robert jordan" fantasy',
  'inauthor:"brent weeks" fantasy',
  'inauthor:"scott lynch" fantasy',
  'inauthor:erikson fantasy',
  'inauthor:"george r.r. martin" fantasy',
  'inauthor:"r.f. kuang" fantasy',
  'inauthor:"sarah j. maas" fantasy',
  'inauthor:"leigh bardugo" fantasy',
  'inauthor:"naomi novik" fantasy',
  'inauthor:pratchett fantasy',
  'inauthor:"jim butcher" fantasy',
  'inauthor:"mark lawrence" fantasy',
  'inauthor:"will wight" fantasy',
  'inauthor:"brian mcclellan" fantasy',
  'inauthor:"nicholas eames" fantasy',
  'inauthor:"evan winter" fantasy',
  'inauthor:"john gwynne" fantasy',
  'inauthor:"travis baldree" fantasy',
  'inauthor:"holly black" fantasy',
  'inauthor:"peter v. brett" fantasy',
  'inauthor:"patrick weekes" fantasy',
  'inauthor:"kate elliott" fantasy',
  'inauthor:"ken liu" fantasy',
  'inauthor:"tad williams" fantasy',
  'inauthor:"terry brooks" fantasy',
  'inauthor:"raymond feist" fantasy',
  'inauthor:"david eddings" fantasy',
  'inauthor:"robert salvatore" fantasy',
  'inauthor:"michael j. sullivan" fantasy',
  'inauthor:"miles cameron" fantasy',
  'inauthor:"anna stephens" fantasy',
  'inauthor:"ed mcdonald" fantasy',
  'inauthor:"pierre cornuel" fantasy',
  'inauthor:"andrzej sapkowski" fantasy',
  'inauthor:"peter orullian" fantasy',
  'inauthor:"elspeth cooper" fantasy',
  'inauthor:"peter newman" fantasy',
  'inauthor:"anna smith spark" fantasy',
  'inauthor:"sam sykes" fantasy',
  'inauthor:"peter orullian" fantasy',
  'inauthor:"ian c. esslemont" fantasy',
  'inauthor:"michael moorcock" fantasy',
  'inauthor:"fritz leiber" fantasy',
  'inauthor:"glen cook" fantasy',
  'inauthor:"david gemmell" fantasy',
  'inauthor:"terry goodkind" fantasy',
  'inauthor:"robert jordan" fantasy',
  'inauthor:"guy gavriel kay" fantasy',
  'inauthor:"ursula k. le guin" fantasy',
  'inauthor:"patricia mckillip" fantasy',
  'inauthor:"peter s. beagle" fantasy',
  'inauthor:"brandon mull" fantasy',
  'inauthor:"christopher paolini" fantasy',
  'inauthor:"tamora pierce" fantasy',
  'inauthor:"mercedes lackey" fantasy',
  'inauthor:"anne mccaffrey" fantasy',
  'inauthor:"katherine arden" fantasy',
  'inauthor:"samantha shannon" fantasy',
  'inauthor:"v.e. schwab" fantasy',
  'inauthor:"josiah bancroft" fantasy',
  'inauthor:"helen lowe" fantasy',
  'inauthor:"james islington" fantasy',
  'inauthor:"richard swan" fantasy',
  'inauthor:"anna stephens" fantasy',
  'inauthor:"rob hayes" fantasy',
  'inauthor:"phil tucker" fantasy',
  'inauthor:"shirtaloon" fantasy',
  'inauthor:"travis baldree" fantasy',
  'inauthor:"andrew rowe" fantasy',
  'inauthor:"jason cheyne" fantasy',
  'inauthor:"luke chmilenko" fantasy',
  'inauthor:"jason m. cheyne" fantasy',
  'inauthor:"tao wong" fantasy',
  'inauthor:"dakota krout" fantasy',
  'inauthor:"m.h. johnson" fantasy',
  'inauthor:"thomas k. carpenter" fantasy',
  // High-priority missing authors
  'inauthor:"matt dinniman" fantasy',
  'inauthor:"aleron kong" fantasy',
  'inauthor:"harmon cooper" fantasy',
  'inauthor:"michael chatfield" fantasy',
  'inauthor:"seth ring" fantasy',
  'inauthor:"cale plamann" fantasy',
  'inauthor:"john bierce" fantasy',
  'inauthor:"DB jackson" fantasy',
  'inauthor:"dennis e. taylor" fantasy',
  'inauthor:"jonathan dunne" fantasy',
  'inauthor:"k.m. shea" fantasy',
  'inauthor:"elise kova" fantasy',
  'inauthor:"ilona andrews" fantasy',
  'inauthor:"patricia briggs" fantasy',
  'inauthor:"kevin hearne" fantasy',
  'inauthor:"ben aaronovitch" fantasy',
  'inauthor:"seanan mcguire" fantasy',
  'inauthor:"charles stross" fantasy',
  'inauthor:"larry correia" fantasy',
  'inauthor:"jason anspach" fantasy',
  'inauthor:"nick cole" fantasy',
  'inauthor:"matthew mather" fantasy',
  'inauthor:"kel kade" fantasy',
  'inauthor:"craig alanson" fantasy',
  'inauthor:"christopher nuttall" fantasy',
  'inauthor:"rr virdi" fantasy',
  'inauthor:"john hartness" fantasy',
  'inauthor:"jim c. hines" fantasy',
  'inauthor:"marie brennan" fantasy',
  'inauthor:"django wexler" fantasy',
  'inauthor:"miles cameron" grimdark',
  'inauthor:"victor milan" fantasy',
  'inauthor:"scott hawkins" fantasy',
  'inauthor:"peter mclean" fantasy',
  'inauthor:"anna stephens" grimdark',
  // Broad keyword sweeps — each yields up to 1000 results, paginated over time
  '"epic fantasy" novel',
  '"dark fantasy" novel',
  '"urban fantasy" novel',
  '"romantic fantasy" novel',
  '"historical fantasy" novel',
  '"sword and sorcery" fantasy',
  '"high fantasy" novel',
  'grimdark fantasy novel',
  'LitRPG fantasy novel',
  'progression fantasy novel',
  'cozy fantasy novel',
  'portal fantasy novel',
  'mythology fantasy novel',
  'academy fantasy novel',
  'heist fantasy novel',
  // Subgenre + tone combos
  '"secondary world fantasy" novel',
  '"flintlock fantasy" novel',
  '"gaslamp fantasy" novel',
  '"solarpunk fantasy" novel',
  '"biopunk fantasy" novel',
  '"dungeon fantasy" novel',
  '"military fantasy" novel',
  '"political fantasy" novel',
  '"assassin fantasy" novel',
  '"dragon fantasy" novel',
  '"vampire fantasy" novel',
  '"werewolf fantasy" novel',
  '"fae fantasy" novel',
  '"witch fantasy" novel',
  '"necromancer fantasy" novel',
  '"pirate fantasy" novel',
  '"steampunk fantasy" novel',
  '"dieselpunk fantasy" novel',
  '"silkpunk fantasy" novel',
  '"wuxia fantasy" novel',
  '"xianxia fantasy" novel',
  '"cultivation fantasy" novel',
  '"gamelit fantasy" novel',
  '"isekai fantasy" novel',
  '"reverse harem fantasy" novel',
  '"slow burn fantasy romance" novel',
  '"enemies to lovers fantasy" novel',
  '"found family fantasy" novel',
  '"chosen one fantasy" novel',
  '"magic school fantasy" novel',
  '"thieves guild fantasy" novel',
  '"gladiator fantasy" novel',
  '"arena fantasy" novel',
  '"tournament fantasy" novel',
  '"spy fantasy" novel',
  '"detective fantasy" novel',
  '"mystery fantasy" novel',
  '"horror fantasy" novel',
  // Setting-based sweeps
  'fantasy "ancient rome" novel',
  'fantasy "ancient egypt" novel',
  'fantasy "ancient china" novel',
  'fantasy "ancient japan" novel',
  'fantasy "ancient greece" novel',
  'fantasy "medieval" novel',
  'fantasy "renaissance" novel',
  'fantasy "victorian" novel',
  'fantasy "norse mythology" novel',
  'fantasy "celtic mythology" novel',
  'fantasy "african mythology" novel',
  'fantasy "slavic mythology" novel',
  'fantasy "aztec mythology" novel',
  'fantasy "persian mythology" novel',
  'fantasy "indian mythology" novel',
  // Award + list signals
  'fantasy "hugo award" novel',
  'fantasy "nebula award" novel',
  'fantasy "world fantasy award" novel',
  'fantasy "locus award" novel',
  'fantasy "british fantasy award" novel',
  'fantasy "booker prize" novel',
  'fantasy bestseller novel',
  'fantasy "new york times bestseller" novel',
  'fantasy "sunday times bestseller" novel',
  // Audience sweeps
  'young adult fantasy novel',
  'adult fantasy novel',
  'new adult fantasy novel',
  // Pacing / tone sweeps
  'fast paced fantasy novel',
  'epic fantasy series novel',
  'standalone fantasy novel',
  'fantasy trilogy novel',
  'dark magic fantasy novel',
  'light fantasy novel',
  'humorous fantasy novel',
  'satirical fantasy novel',
  'literary fantasy novel',
  'feminist fantasy novel',
  'diverse fantasy novel',
  'LGBTQ fantasy novel',
  // Additional author sweeps
  'inauthor:"matthew ward" fantasy',
  'inauthor:"robert v.s. redick" fantasy',
  'inauthor:"michael j. fletcher" fantasy',
  'inauthor:"edward w. robertson" fantasy',
  'inauthor:"michael g. manning" fantasy',
  'inauthor:"michael j. martine" fantasy',
  'inauthor:"m.r. carey" fantasy',
  'inauthor:"peter f. hamilton" fantasy',
  'inauthor:"ian mcdonald" fantasy',
  'inauthor:"paul kearney" fantasy',
  'inauthor:"peter brett" fantasy',
  'inauthor:"karen miller" fantasy',
  'inauthor:"kate forsyth" fantasy',
  'inauthor:"trudi canavan" fantasy',
  'inauthor:"glenda larke" fantasy',
  'inauthor:"jennifer fallon" fantasy',
  'inauthor:"sara douglass" fantasy',
  'inauthor:"russell kirkpatrick" fantasy',
  'inauthor:"fiona mcintosh" fantasy',
  'inauthor:"jason letts" fantasy',
  'inauthor:"michael j. sullivan" fantasy',
  'inauthor:"kel kade" fantasy',
  'inauthor:"dyrk ashton" fantasy',
  'inauthor:"seth dickinson" fantasy',
  'inauthor:"anna smith spark" fantasy',
  'inauthor:"ed mcdonald" fantasy',
  'inauthor:"miles cameron" fantasy',
  'inauthor:"james e. wisher" fantasy',
  'inauthor:"dj mcdonald" fantasy',
  'inauthor:"sever bronny" fantasy',
  'inauthor:"michael j. scott" fantasy',
  // More subgenre sweeps
  '"sword and sorcery" adventure fantasy',
  '"dark lord" fantasy novel',
  '"quest fantasy" epic novel',
  '"coming of age" fantasy novel',
  '"magic system" fantasy novel',
  '"lost heir" fantasy novel',
  '"resistance fantasy" novel',
  '"rebellion fantasy" novel',
  '"empire fantasy" novel',
  '"dragon rider" fantasy novel',
  '"elemental magic" fantasy novel',
  '"blood magic" fantasy novel',
  '"rune magic" fantasy novel',
  '"rogue fantasy" novel',
  '"ranger fantasy" novel',
  '"paladin fantasy" novel',
  '"bard fantasy" novel',
  '"druid fantasy" novel',
  '"shapeshifter fantasy" novel',
  '"time travel fantasy" novel',
  '"alternate history fantasy" novel',
  '"weird fantasy" novel',
  '"noblebright fantasy" novel',
  '"hopepunk fantasy" novel',
  '"mythic fantasy" novel',
  '"folklore fantasy" novel',
  '"fairy tale retelling" novel',
  '"mythology retelling" fantasy novel',
  '"arthurian fantasy" novel',
  '"robin hood fantasy" novel',
  // Award and list sweeps (extended)
  '"david gemmell award" fantasy',
  '"spfbo" fantasy novel',
  '"self published fantasy" novel',
  'indie fantasy novel bestseller',
  '"fantasy series" complete novel',
  // Reading experience sweeps
  // Specific high-value titles that broad queries miss
  '"dungeon crawler carl" fantasy',
  '"he who fights with monsters" fantasy',
  '"everyone loves large chests" fantasy',
  '"defiance of the fall" fantasy',
  '"stone burners" fantasy',
  '"salvos" fantasy novel',
  '"primal hunter" fantasy',
  '"mage errant" fantasy',
  '"he who fights with monsters" litrpg',
  '"a practical guide to sorcery" fantasy',
  '"cradle series" fantasy',
  '"wandering inn" fantasy',
  '"mother of learning" fantasy',
  '"beware of chicken" fantasy',
  '"forge of destiny" fantasy',
  '"beneath the dragoneye moons" fantasy',
  '"he who fights" litrpg novel',
  // Broad keyword sweeps cont.
  '"slow burn" fantasy romance novel',
  '"action packed" fantasy novel',
  '"character driven" fantasy novel',
  '"plot twist" fantasy novel',
  '"unreliable narrator" fantasy novel',
  '"multiple POV" fantasy novel',
  '"non linear" fantasy novel',
];

// Require averageRating to exist — primary quality gate
const MIN_AVG_RATING = 3.5;

// ── Env checks ────────────────────────────────────────────────────────────────

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing Supabase env vars');
  process.exit(1);
}
if (!process.env.GOOGLE_BOOKS_API_KEY) {
  console.error('❌  Missing GOOGLE_BOOKS_API_KEY');
  process.exit(1);
}

const GOOGLE_BOOKS_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

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

// ── Open Library fallback ─────────────────────────────────────────────────────

async function fetchOpenLibraryYear(title, authors) {
  try {
    const q = encodeURIComponent(title);
    const a = encodeURIComponent((authors ?? [])[0] ?? '');
    const url = `https://openlibrary.org/search.json?title=${q}&author=${a}&fields=first_publish_year&limit=1`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const year = data.docs?.[0]?.first_publish_year;
    const currentYear = new Date().getFullYear();
    return (year && year >= 1800 && year <= currentYear) ? year : null;
  } catch {
    return null;
  }
}

// ── Progress persistence ──────────────────────────────────────────────────────

function loadProgress() {
  if (RESET && fs.existsSync(PROGRESS_FILE)) {
    fs.unlinkSync(PROGRESS_FILE);
    console.log('🔄  Progress reset.\n');
  }
  if (!fs.existsSync(PROGRESS_FILE)) return {};
  try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
  catch { return {}; }
}

function saveProgress(progress) {
  if (!DRY_RUN) fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ── Google Books ──────────────────────────────────────────────────────────────

async function fetchPage(query, startIndex) {
  const q = encodeURIComponent(query);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=en&maxResults=${PAGE_SIZE}&startIndex=${startIndex}&printType=books&orderBy=relevance&key=${GOOGLE_BOOKS_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      console.log(`    ⚠️  API ${res.status}: ${text.slice(0, 200)}`);
      return [];
    }
    const data = await res.json();
    if (!data.items && data.totalItems !== undefined) {
      console.log(`    ℹ️  API ok, totalItems=${data.totalItems}, 0 items returned`);
    }
    return data.items ?? [];
  } catch (e) {
    console.log(`    ⚠️  Fetch error: ${e.message}`);
    return [];
  }
}

function extractBookData(item) {
  const info = item.volumeInfo ?? {};

  // Must be English
  if (info.language && info.language !== 'en') return null;

  // Must have a title and at least one author; skip multi-author compilations
  if (!info.title || !info.authors?.length) return null;
  if (info.authors.length > 2) return null;

  // Must have at least a description or page count — skip completely bare records
  if (!info.description && !info.pageCount) return null;

  // Skip if description looks non-English
  if (isLikelyNonEnglish(info.description)) return null;

  // Only reject books with explicitly bad ratings — unrated books are fine
  if (info.averageRating != null && info.averageRating < MIN_AVG_RATING) return null;

  // Skip non-novel categories
  const cats = (info.categories ?? []).join(' ').toLowerCase();
  const title = info.title.toLowerCase();
  const skipKeywords = [
    // Multi-book bundles
    'anthology', 'omnibus', 'omnibus edition', 'boxed set', 'box set',
    'complete trilogy', 'complete series', 'complete collection',
    '3-book', '4-book', '5-book', '6-book', '7-book', '8-book',
    'books 1-', 'volumes 1-', 'the complete ',
    // Short fiction
    'short stories', 'short story', 'novelette', 'collected works',
    // Non-fiction / meta
    'guide to', 'companion to', 'art of', 'making of', 'the world of',
    'cookbook', 'workbook', 'coloring book', 'activity book',
    'journal', 'notebook', 'planner', 'calendar', 'diary',
    // Critical / academic
    'study guide', "reader's guide", "readers' guide", 'reading group',
    'book club guide', 'critical essay', 'analysis of', 'criticism',
    'annotated edition', 'annotated ', 'with annotations',
    'interview with', 'biography of',
    // Editions to skip
    'large print', 'large-print', 'abridged', 'unabridged edition',
    'illustrated edition', 'graphic novel', 'graphic adaptation',
    'manga', 'comic book', 'comics',
    // Review / summary products
    'summary of', 'review of', 'synopsis of', 'chapter by chapter',
    'book review', 'plot summary',
  ];
  if (skipKeywords.some((k) => title.includes(k) || cats.includes(k))) return null;

  // Skip very short works — likely novellas, short stories, or pamphlets
  if (info.pageCount && info.pageCount < 120) return null;

  const rawYear = info.publishedDate;
  const year = rawYear ? parseInt(rawYear.slice(0, 4), 10) : null;
  const validYear = year && year >= 1950 && year <= new Date().getFullYear() ? year : null;

  const thumb =
    info.imageLinks?.extraLarge ??
    info.imageLinks?.large ??
    info.imageLinks?.medium ??
    info.imageLinks?.thumbnail ??
    null;
  const cover_url = thumb
    ? thumb.replace(/^http:/, 'https:').replace('&edge=curl', '')
    : null;

  return {
    title: info.title,
    slug: slugify(info.title),
    authors: info.authors,
    cover_url,
    synopsis: info.description ? info.description.slice(0, 2000) : null,
    publication_year: validYear,
    page_count: info.pageCount ?? null,
    darkness_level: null,
    heat_level: null,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍  Fantasy Obscura — Book Discovery${DRY_RUN ? ' [DRY RUN]' : ''}`);
  console.log(`    Target: ${LIMIT} new books\n`);

  // Load all existing slugs + titles for fast dedup
  const { data: existing, error: existErr } = await supabase
    .from('books')
    .select('slug, title');
  if (existErr) { console.error(existErr.message); process.exit(1); }

  const existingSlugs  = new Set(existing.map((b) => b.slug).filter(Boolean));
  const existingTitles = new Set(existing.map((b) => b.title.toLowerCase().trim()));

  const progress = loadProgress();

  let imported = 0;
  let queryIdx = progress._queryIdx ?? 0;
  // If progress left off past the end, wrap around
  if (queryIdx >= QUERIES.length) queryIdx = 0;

  // Only count a "full cycle" as a cycle that started from query 0
  let fullCycleCompleted = false;
  let importedThisCycle = 0;
  // If starting mid-list, treat it as already past zero so first wrap is just continuation
  let startedMidCycle = queryIdx > 0;

  outer: while (imported < LIMIT) {
    if (queryIdx >= QUERIES.length) {
      // Wrap around to beginning
      queryIdx = 0;
      progress._queryIdx = 0;
      saveProgress(progress);
      if (fullCycleCompleted && importedThisCycle === 0) {
        // Completed a full cycle from 0 with nothing new — truly exhausted
        console.log('\n⚠️  Completed a full cycle with no new books found. Database may be up to date for current queries.');
        break;
      }
      if (!startedMidCycle) fullCycleCompleted = true;
      startedMidCycle = false;
      importedThisCycle = 0;
      console.log('\n🔄  Wrapped around to start of query list — skipping already-imported books automatically.');
    }

    const query = QUERIES[queryIdx];
    const startIndex = progress[query] ?? 0;

    console.log(`\n📖  Query ${queryIdx + 1}/${QUERIES.length}: "${query}" (from index ${startIndex})`);

    let pageStart = startIndex;
    let pageImported = 0;
    let exhausted = false;
    let consecutiveEmptyPages = 0;
    const MAX_EMPTY_PAGES = 2; // skip query after 2 pages with no new books

    while (imported < LIMIT) {
      const items = await fetchPage(query, pageStart);
      await sleep(DELAY_MS);

      if (!items.length) { exhausted = true; break; }

      const importedBefore = imported;
      let dbg_total = 0, dbg_filtered = 0, dbg_duped = 0;

      for (const item of items) {
        if (imported >= LIMIT) break;
        dbg_total++;

        const book = extractBookData(item);
        if (!book) { dbg_filtered++; continue; }

        // Dedup
        if (existingSlugs.has(book.slug) || existingTitles.has(book.title.toLowerCase().trim())) { dbg_duped++; continue; }

        // Mark as seen immediately to avoid dupes within the same run
        existingSlugs.add(book.slug);
        existingTitles.add(book.title.toLowerCase().trim());

        // Open Library fallback for missing publication year
        if (!book.publication_year) {
          book.publication_year = await fetchOpenLibraryYear(book.title, book.authors);
          await sleep(200);
        }

        process.stdout.write(`  [${imported + 1}/${LIMIT}] "${book.title.slice(0, 50)}" … `);

        if (DRY_RUN) {
          console.log(`[dry] cover:${book.cover_url ? '✓' : '✗'}`);
          imported++;
          continue;
        }

        const { error } = await supabase.from('books').insert(book);
        if (error) {
          console.log(`✗ ${error.message.slice(0, 60)}`);
        } else {
          console.log(`✓ cover:${book.cover_url ? '✓' : '✗'} · ${book.publication_year ?? '?'}`);
          imported++;
          pageImported++;
          importedThisCycle++;
        }
      }

      console.log(`    page@${pageStart}: ${dbg_total} items → ${dbg_total - dbg_filtered} passed filter → ${dbg_duped} duped → ${imported - importedBefore} new`);

      // Track consecutive pages with no new books — skip query early if stuck
      if (imported === importedBefore) {
        consecutiveEmptyPages++;
        if (consecutiveEmptyPages >= MAX_EMPTY_PAGES) {
          console.log(`  ↳ ${MAX_EMPTY_PAGES} pages with no new books — skipping to next query`);
          exhausted = true;
          break;
        }
      } else {
        consecutiveEmptyPages = 0;
      }

      pageStart += PAGE_SIZE;

      // Save progress after each page
      progress[query] = pageStart;
      progress._queryIdx = queryIdx;
      saveProgress(progress);

      // Google Books caps at 1000 results per query
      if (pageStart >= 1000) { exhausted = true; break; }
    }

    if (exhausted) {
      console.log(`  ↳ Query exhausted — moving to next`);
      progress[query] = 0; // reset this query for future cycles
      queryIdx++;
      progress._queryIdx = queryIdx;
      saveProgress(progress);
    }
  }

  console.log(`\n──────────────────────────────────────────────`);
  console.log(`✅  Imported: ${imported} new books`);

  if (imported > 0 && !DRY_RUN) {
    console.log(`
Next — fill in metadata (run in order):
  node scripts/classify-metadata.mjs
  node scripts/classify-vibes.mjs
  node scripts/classify-tropes.mjs
  node scripts/classify-creatures.mjs
`);
  }
}

main().catch((err) => { console.error('Fatal:', err.message); process.exit(1); });
