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

const DRY_RUN = process.argv.includes('--dry-run');
const RESET = process.argv.includes('--reset');
const limitArg =
  process.argv.find((a) => a.startsWith('--limit=')) ??
  process.argv[process.argv.indexOf('--limit') + 1];
const LIMIT = parseInt(limitArg) || 100;
const DELAY_MS = 400;
const PAGE_SIZE = 40; // Google Books max per request

// ── Search queries ─────────────────────────────────────────────────────────────
// Ordered by expected quality/relevance. Script cycles through these.

const QUERIES = [
  // ── Tier 1: major name authors — best data quality ─────────────────────────
  'inauthor:"brandon sanderson" fantasy',
  'inauthor:"george r.r. martin" fantasy',
  'inauthor:"sarah j. maas" fantasy',
  'inauthor:"naomi novik" fantasy',
  'inauthor:"jim butcher" fantasy',
  'inauthor:"neil gaiman" fantasy',
  'inauthor:"n.k. jemisin" fantasy',
  'inauthor:"ursula k. le guin" fantasy',
  'inauthor:"andrzej sapkowski" fantasy',
  'inauthor:"patricia mckillip" fantasy',
  'inauthor:"peter s. beagle" fantasy',
  'inauthor:"katherine arden" fantasy',
  'inauthor:"ken liu" fantasy',
  'inauthor:"leigh bardugo" fantasy',
  'inauthor:"cassandra clare" fantasy',
  'inauthor:"robin hobb" fantasy',
  'inauthor:rothfuss fantasy',
  'inauthor:"robert jordan" fantasy',
  'inauthor:"v.e. schwab" fantasy',
  'inauthor:"r.f. kuang" fantasy',
  'inauthor:"china mieville" fantasy',
  'inauthor:"becky chambers" fantasy',
  'inauthor:"t. kingfisher" fantasy',
  'inauthor:"samantha shannon" fantasy',
  'inauthor:"laini taylor" fantasy',
  'inauthor:"maggie stiefvater" fantasy',
  'inauthor:"fonda lee" fantasy',
  'inauthor:"adrian tchaikovsky" fantasy',
  'inauthor:"martha wells" fantasy',
  'inauthor:"max gladstone" fantasy',
  'inauthor:"arkady martine" fantasy',
  'inauthor:"alix e. harrow" fantasy',
  'inauthor:"s.a. chakraborty" fantasy',
  'inauthor:"gene wolfe" fantasy',
  'inauthor:"garth nix" fantasy',
  'inauthor:"tad williams" fantasy',
  'inauthor:"terry brooks" fantasy',
  'inauthor:"raymond feist" fantasy',
  'inauthor:"david eddings" fantasy',
  'inauthor:"brandon mull" fantasy',
  'inauthor:"patricia briggs" fantasy',
  'inauthor:"jo walton" fantasy',
  'inauthor:"katherine addison" fantasy',
  'inauthor:"rachel hartman" fantasy',
  'inauthor:"anthony ryan" fantasy',
  'inauthor:"brian staveley" fantasy',
  'inauthor:"robert jackson bennett" fantasy',
  'inauthor:"r. scott bakker" fantasy',
  'inauthor:"rick riordan" fantasy',
  'inauthor:"erin morgenstern" fantasy',
  'inauthor:"pierce brown" fantasy',
  'inauthor:"evan winter" fantasy',
  'inauthor:"john gwynne" fantasy',
  // ── Classic / seminal authors ───────────────────────────────────────────────
  'inauthor:"j.r.r. tolkien" fantasy',
  'inauthor:"c.s. lewis" fantasy',
  'inauthor:"susanna clarke" fantasy',
  'inauthor:"lois mcmaster bujold" fantasy',
  'inauthor:"stephen donaldson" fantasy',
  'inauthor:"jack vance" fantasy',
  'inauthor:"roger zelazny" fantasy',
  'inauthor:"c.j. cherryh" fantasy',
  'inauthor:"margaret weis" fantasy',
  'inauthor:"tracy hickman" fantasy',
  `inauthor:"madeleine l'engle" fantasy`,
  'inauthor:"robin mckinley" fantasy',
  'inauthor:"jacqueline carey" fantasy',
  'inauthor:"orson scott card" fantasy',
  'inauthor:"marion zimmer bradley" fantasy',
  'inauthor:"tim powers" fantasy',
  'inauthor:"dave duncan" fantasy',
  'inauthor:"david farland" fantasy',
  'inauthor:"ian irvine" fantasy',
  'inauthor:"greg keyes" fantasy',
  'inauthor:"kevin j. anderson" fantasy',
  'inauthor:"ed greenwood" fantasy',
  'inauthor:"catherine valente" fantasy',
  // ── Urban fantasy ───────────────────────────────────────────────────────────
  'inauthor:"kim harrison" fantasy',
  'inauthor:"charlaine harris" fantasy',
  'inauthor:"rob thurman" fantasy',
  'inauthor:"carrie vaughn" fantasy',
  'inauthor:"mike carey" fantasy',
  'inauthor:"chloe neill" fantasy',
  'inauthor:"jaye wells" fantasy',
  'inauthor:"christopher golden" fantasy',
  'inauthor:"thomas e. sniegoski" fantasy',
  // ── Romantasy / fantasy romance ─────────────────────────────────────────────
  'inauthor:"jennifer l. armentrout" fantasy',
  'inauthor:"rebecca yarros" fantasy',
  'inauthor:"kresley cole" fantasy',
  'inauthor:"ilona andrews" fantasy',
  'inauthor:"richelle mead" fantasy',
  'inauthor:"nalini singh" fantasy',
  'inauthor:"kelley armstrong" fantasy',
  'inauthor:"holly black" fantasy',
  'inauthor:"renee ahdieh" fantasy',
  'inauthor:"stephanie garber" fantasy',
  'inauthor:"kiersten white" fantasy',
  'inauthor:"caroline peckham" fantasy',
  'inauthor:"stacia stark" fantasy',
  'inauthor:"aurora ascher" fantasy',
  'inauthor:"sherrilyn kenyon" fantasy',
  'inauthor:"thea harrison" fantasy',
  'inauthor:"grace draven" fantasy',
  'inauthor:"bec mcmaster" fantasy',
  'inauthor:"gena showalter" fantasy',
  'inauthor:"sylvia day" fantasy',
  'inauthor:"deborah harkness" fantasy',
  'inauthor:"carissa broadbent" fantasy',
  'inauthor:"callie hart" fantasy',
  'inauthor:"lauren roberts" fantasy',
  'inauthor:"danielle l. jensen" fantasy',
  'inauthor:"sarah a. parker" fantasy',
  'inauthor:"raven kennedy" fantasy',
  'inauthor:"penn cole" fantasy',
  'inauthor:"rachel gillig" fantasy',
  'inauthor:"harley laroux" fantasy',
  'inauthor:"kristen ciccarelli" fantasy',
  'inauthor:"amber v. nicole" fantasy',
  'inauthor:"hannah nicole maehrer" fantasy',
  'inauthor:"rebecca ross" fantasy',
  'inauthor:"brigitte knightley" fantasy',
  'inauthor:"kayley smith" fantasy',
  'inauthor:"freya marske" fantasy',
  'inauthor:"p.c. cast" fantasy',
  'inauthor:"lisa shearin" fantasy',
  'inauthor:"darynda jones" fantasy',
  'inauthor:"j.r. ward" fantasy',
  'inauthor:"jeaniene frost" fantasy',
  'inauthor:"lara adrian" fantasy',
  'inauthor:"christine feehan" fantasy',
  'inauthor:"suzanne wright" fantasy',
  'inauthor:"ali hazelwood" fantasy',
  'inauthor:"devney perry" fantasy',
  'inauthor:"kerri maniscalco" fantasy',
  'inauthor:"sangu mandanna" fantasy',
  'inauthor:"olivia atwater" fantasy',
  // ── YA Fantasy ──────────────────────────────────────────────────────────────
  'inauthor:"j.k. rowling" fantasy',
  'inauthor:"suzanne collins" fantasy',
  'inauthor:"veronica roth" fantasy',
  'inauthor:"anne mccaffrey" fantasy',
  'inauthor:"tamora pierce" fantasy',
  'inauthor:"diana wynne jones" fantasy',
  'inauthor:"tomi adeyemi" fantasy',
  'inauthor:"sabaa tahir" fantasy',
  'inauthor:"kristin cashore" fantasy',
  'inauthor:"jonathan stroud" fantasy',
  'inauthor:"nnedi okorafor" fantasy',
  'inauthor:"marie lu" fantasy',
  'inauthor:"victoria aveyard" fantasy',
  'inauthor:"shannon hale" fantasy',
  'inauthor:"scott westerfeld" fantasy',
  'inauthor:"tracy wolff" fantasy',
  'inauthor:"stephenie meyer" fantasy',
  'inauthor:"becca fitzpatrick" fantasy',
  'inauthor:"roshani chokshi" fantasy',
  'inauthor:"marissa meyer" fantasy',
  'inauthor:"eoin colfer" fantasy',
  'inauthor:"lauren kate" fantasy',
  'inauthor:"melissa marr" fantasy',
  'inauthor:"libba bray" fantasy',
  'inauthor:"adrienne young" fantasy',
  'inauthor:"alexandra bracken" fantasy',
  'inauthor:"joseph delaney" fantasy',
  'inauthor:"michael scott" fantasy',
  'inauthor:"margaret rogerson" fantasy',
  // ── Tier 2: popular series & grimdark authors ───────────────────────────────
  'inauthor:"mark lawrence" fantasy',
  'inauthor:"brent weeks" fantasy',
  'inauthor:"scott lynch" fantasy',
  'inauthor:erikson fantasy',
  'inauthor:"ian c. esslemont" fantasy',
  'inauthor:"nicholas eames" fantasy',
  'inauthor:"brian mcclellan" fantasy',
  'inauthor:"will wight" fantasy',
  'inauthor:"james islington" fantasy',
  'inauthor:"django wexler" fantasy',
  'inauthor:"seth dickinson" fantasy',
  'inauthor:"paul kearney" fantasy',
  'inauthor:"peter v. brett" fantasy',
  'inauthor:"michael moorcock" fantasy',
  'inauthor:"fritz leiber" fantasy',
  'inauthor:"glen cook" fantasy',
  'inauthor:"tom lloyd" fantasy',
  'inauthor:"peter mclean" fantasy',
  'inauthor:"anna stephens" fantasy',
  'inauthor:"robert v.s. redick" fantasy',
  'inauthor:"matthew ward" fantasy',
  'inauthor:"dyrk ashton" fantasy',
  'inauthor:"kel kade" fantasy',
  'inauthor:"jeff vandermeer" fantasy',
  'inauthor:"charles stross" fantasy',
  'inauthor:"larry correia" fantasy',
  'inauthor:"benedict jacka" fantasy',
  'inauthor:"sara douglass" fantasy',
  'inauthor:"fiona mcintosh" fantasy',
  'inauthor:"glenda larke" fantasy',
  'inauthor:"jennifer fallon" fantasy',
  'inauthor:"rae carson" fantasy',
  'inauthor:"k.m. shea" fantasy',
  'inauthor:"janny wurts" fantasy',
  'inauthor:"julian may" fantasy',
  'inauthor:"gareth hanrahan" fantasy',
  'inauthor:"jen williams" fantasy',
  'inauthor:"daniel abraham" fantasy',
  // ── Historical fantasy ───────────────────────────────────────────────────────
  'inauthor:"harry turtledove" fantasy',
  'inauthor:"mary robinette kowal" fantasy',
  // ── Mythology / folklore retelling ──────────────────────────────────────────
  'inauthor:"madeline miller" fantasy',
  'inauthor:"pat barker" fantasy',
  'inauthor:"claire north" fantasy',
  'inauthor:"jennifer saint" fantasy',
  'inauthor:"kosoko jackson" fantasy',
  'inauthor:"emily hauser" fantasy',
  'inauthor:"silvia moreno-garcia" fantasy',
  'inauthor:"gail carriger" fantasy',
  'inauthor:"vaishnavi patel" fantasy',
  // ── Cozy fantasy ────────────────────────────────────────────────────────────
  'inauthor:"heather fawcett" fantasy',
  'inauthor:"tj klune" fantasy',
  'inauthor:"sarah hogle" fantasy',
  'inauthor:"annie bellet" fantasy',
  'inauthor:"molly harper" fantasy',
  'inauthor:"nghi vo" fantasy',
  'inauthor:"alexandra rowland" fantasy',
  'inauthor:"rebecca thorne" fantasy',
  'inauthor:"delemhach" fantasy',
  // ── Academy fantasy ─────────────────────────────────────────────────────────
  // ── Tier 3: LitRPG / progression / web serial ───────────────────────────────
  'inauthor:"shirtaloon" fantasy',
  'inauthor:"andrew rowe" fantasy',
  'inauthor:"luke chmilenko" fantasy',
  'inauthor:"tao wong" fantasy',
  'inauthor:"dakota krout" fantasy',
  'inauthor:"thomas k. carpenter" fantasy',
  'inauthor:"matt dinniman" fantasy',
  'inauthor:"harmon cooper" fantasy',
  'inauthor:"michael chatfield" fantasy',
  'inauthor:"seth ring" fantasy',
  'inauthor:"cale plamann" fantasy',
  'inauthor:"jason anspach" fantasy',
  'inauthor:"nick cole" fantasy',
  'inauthor:"m.h. johnson" litrpg',
  'inauthor:"william d. arand" fantasy',
  'inauthor:"sever bronny" fantasy',
  'inauthor:"edward w. robertson" fantasy',
  'inauthor:"timothy mcgowen" litrpg',
  'inauthor:"DB jackson" fantasy',
  'inauthor:"pirateaba" fantasy',
  'inauthor:"ryan cahill" fantasy',
  'inauthor:"zac argyle" fantasy',
  'inauthor:"c. mantis" fantasy',
  'inauthor:"brian j. nordon" fantasy',
  'inauthor:"m.l. wang" fantasy',
  // ── Broad subgenre sweeps ───────────────────────────────────────────────────
  '"dark fantasy" novel',
  '"urban fantasy" novel',
  '"romantic fantasy" novel',
  '"historical fantasy" novel',
  '"sword and sorcery" fantasy',
  '"high fantasy" novel',
  'grimdark fantasy novel',
  'progression fantasy novel',
  'portal fantasy novel',
  'academy fantasy novel',
  'heist fantasy novel',
  '"flintlock fantasy" novel',
  '"gaslamp fantasy" novel',
  '"military fantasy" novel',
  '"political fantasy" novel',
  '"dragon rider" fantasy novel',
  '"dungeon fantasy" novel',
  '"vampire fantasy" novel',
  '"fae fantasy" novel',
  '"pirate fantasy" novel',
  '"found family fantasy" novel',
  '"chosen one fantasy" novel',
  '"slow burn fantasy romance" novel',
  '"reverse harem fantasy" novel',
  '"spy fantasy" novel',
  '"detective fantasy" novel',
  '"coming of age" fantasy novel',
  '"blood magic" fantasy novel',
  '"elemental magic" fantasy novel',
  '"time travel fantasy" fiction novel',
  '"alternate history fantasy" fiction novel',
  '"fairy tale retelling" novel',
  '"mythology retelling" fantasy novel',
  '"arthurian fantasy" novel',
  '"folklore fantasy" novel',
  '"mythic fantasy" novel',
  '"noblebright fantasy" novel',
  // ── Setting-based sweeps ────────────────────────────────────────────────────
  'fantasy "ancient china" novel',
  'fantasy "ancient greece" novel',
  'fantasy "ancient egypt" novel',
  'fantasy "ancient rome" novel',
  'fantasy "slavic mythology" novel',
  'fantasy "african mythology" novel',
  'fantasy "persian mythology" novel',
  'fantasy "medieval setting" novel',
  // ── Award + list signals ────────────────────────────────────────────────────
  'fantasy "hugo award" novel',
  'fantasy "nebula award" novel',
  'fantasy "world fantasy award" novel',
  'fantasy "locus award" novel',
  'fantasy "british fantasy award" novel',
  'fantasy "david gemmell award"',
  'fantasy bestseller novel',
  // ── Audience / pacing sweeps ────────────────────────────────────────────────
  'young adult fantasy novel',
  'adult fantasy novel',
  'epic fantasy series novel',
  // ── High-value title queries (web serials & hard-to-find) ──────────────────
  '"defiance of the fall" fantasy',
  '"mage errant" fantasy',
  '"cradle series" fantasy',
  '"mother of learning" fantasy',
  '"beware of chicken" fantasy',
];

// Require averageRating to exist — primary quality gate
const MIN_AVG_RATING = 3.0;

// ── Env checks ────────────────────────────────────────────────────────────────

if (
  !process.env.PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY
) {
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

/**
 * Extract ISBN-13 (preferred) or ISBN-10 from a Google Books item.
 * Used to deduplicate books that appear under different titles/slugs.
 */
function extractISBN(item) {
  const ids = item.volumeInfo?.industryIdentifiers ?? [];
  const isbn13 = ids.find((id) => id.type === 'ISBN_13');
  const isbn10 = ids.find((id) => id.type === 'ISBN_10');
  return isbn13?.identifier ?? isbn10?.identifier ?? null;
}

/**
 * Normalize a title for fuzzy deduplication.
 * "Mistborn: The Final Empire" and "The Final Empire" both → "final empire"
 * "The Name of the Wind (Kingkiller Chronicle, Book 1)" → "name of the wind"
 */
function normalizeTitle(title) {
  let t = title.toLowerCase().trim();
  // Strip parenthetical series info: "Title (Series, Book 1)" → "Title"
  t = t.replace(/\s*\(.*?\)\s*$/, '').trim();
  // Strip series prefix (everything up to and including the first colon)
  const colonIdx = t.indexOf(':');
  if (colonIdx > 1) t = t.slice(colonIdx + 1).trim();
  // Remove leading article
  t = t.replace(/^(the|a|an)\s+/, '');
  return t.replace(/\s+/g, ' ').trim();
}

/**
 * Clean a synopsis by stripping common marketing preamble sentences.
 * Google Books often prepends "#1 NYT Bestseller" or "From the author of…" blurbs
 * that make lousy synopses. Strip them, keeping the actual plot description.
 */
function cleanSynopsis(raw) {
  if (!raw) return null;
  // Split into sentences and drop leading ones that are pure marketing
  const PROMO_PATTERNS = [
    /^#\d/, // "#1 New York Times…"
    /^a #\d/i,
    /^new york times best/i,
    /^instant new york times/i,
    /^national book award/i,
    /^hugo award/i,
    /^nebula award/i,
    /^\*{1,3}[^*]/, // ***Starred review***
    /^from the (author|creator|bestselling)/i, // "From the author of…"
    /^the (author|creator) of/i,
    /^by the (author|creator)/i,
    /^a (new york times|usa today|wall street)/i,
    /^soon to be (a|an) (major|netflix|hbo|amazon)/i,
    /^now (a|an) (major|netflix|hbo|amazon)/i,
    /^(a|an) (instant|major) bestseller/i,
    /^(a|an) (stunning|breathtaking|gripping|thrilling|dazzling|spellbinding|unforgettable) (new novel|debut|fantasy)/i,
  ];

  // Split on sentence boundaries (period/exclamation followed by space or end)
  const sentences = raw.split(/(?<=[.!?])\s+/);
  let start = 0;
  for (let i = 0; i < Math.min(sentences.length, 5); i++) {
    const s = sentences[i].trim();
    if (PROMO_PATTERNS.some((p) => p.test(s))) {
      start = i + 1;
    } else {
      break; // stop at first non-promo sentence
    }
  }

  const cleaned = sentences.slice(start).join(' ').trim();
  // If we stripped too much and are left with nothing meaningful, use original
  return cleaned.length >= 80 ? cleaned.slice(0, 2000) : raw.slice(0, 2000);
}

/**
 * Extract the author name from an inauthor: query string.
 * 'inauthor:"robin hobb" fantasy' → 'robin hobb'
 * 'inauthor:sanderson fantasy'    → 'sanderson'
 */
function extractAuthorFromQuery(q) {
  const m = q.match(/^inauthor:"?([^"]+?)"?\s/);
  return m ? m[1].toLowerCase() : null;
}

/**
 * Count how many books in existingBooks have an author matching the given name.
 * Uses substring match so 'sanderson' hits 'Brandon Sanderson'.
 */
function countBooksForAuthor(authorName, existingBooks) {
  const name = authorName.toLowerCase();
  return existingBooks.filter((b) =>
    (b.authors ?? []).some((a) => a.toLowerCase().includes(name)),
  ).length;
}

function normalizeAuthor(author) {
  return (author || '')
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeAuthorTitleKey(title, authors) {
  return `${normalizeTitle(title)}__${normalizeAuthor(authors?.[0] ?? '')}`;
}

function looksLikeJunkTitle(title) {
  const t = (title || '').toLowerCase();
  const patterns = [
    /\bantho?logy\b/,
    /\bomnibus\b/,
    /\bbox(ed)?\s+set\b/,
    /\bcomplete\s+(trilogy|series|collection)\b/,
    /\bcollected\b/,
    /\band other stories\b/,
    /\bshort stor(y|ies)\b/,
    /\bnovelette\b/,
    /\bguide\b/,
    /\bcompanion\b/,
    /\bart of\b/,
    /\bmaking of\b/,
    /\bcookbook\b/,
    /\bworkbook\b/,
    /\bcoloring book\b/,
    /\bactivity book\b/,
    /\bjournal\b/,
    /\bnotebook\b/,
    /\bplanner\b/,
    /\bcalendar\b/,
    /\bdiary\b/,
    /\bstudy guide\b/,
    /\breader'?s guide\b/,
    /\breading group\b/,
    /\bbook club guide\b/,
    /\bcritical essay\b/,
    /\banalysis of\b/,
    /\bcriticism\b/,
    /\bannotated\b/,
    /\bbiography of\b/,
    /\bdeluxe edition\b/,
    /\bspecial edition\b/,
    /\bcollector'?s edition\b/,
    /\billustrated edition\b/,
    /\blarge[\s-]print\b/,
    /\babridged\b/,
    /\bgraphic (novel|adaptation)\b/,
    /\bmanga\b/,
    /\bcomic book\b/,
    /\bcomics\b/,
    /\bsummary of\b/,
    /\breview of\b/,
    /\bsynopsis of\b/,
    /\bplot summary\b/,
    /\bbooks?\s+\d+\s*(to|-)\s*\d+\b/,
    /\bvolumes?\s+\d+\s*(to|-)\s*\d+\b/,
    /\b\d+-book\b/,
    // Reference & academic works
    /\bencyclopedia\b/,
    /\bbibliograph/,
    /\bcatalogue?\b/,
    /\btransactions\b/,
    /\bproceedings\b/,
    /\bindex\s+of\b/,
    /\bhandbook\b/,
    /\balmanac\b/,
    /\bdictionary\b/,
    /\blexicon\b/,
    /\bwho'?s\s+who\b/,
    /\byearbook\b/,
    /\bannual\s+report\b/,
    // "Fiction writers", "science fiction stories" (academic/reference titles)
    /\bfiction\s+writers?\b/,
    /\bauthors?\s+autobiograph/,
    /\bscience\s+fiction\s+stories\b/,
    // Multi-volume reference sets e.g. "[2 Volumes]"
    /\[\d+\s*volumes?\]/,
    /\b\d+\s*volumes?\b/,
    // Library & bibliographic entries
    /\blibrary\s+collection\b/,
    /\bbooks\s+on\s+\w/,
    /\bnational\s+bibliography\b/,
    /\btitle[\s-]entries\b/,
    /\bcatalogue\s+of\s+additions\b/,
    // Children's literature studies
    /\bchildren'?s\s+literature\s+(remembered|review|criticism)\b/,
    /\bliterature\s+for\s+(children|young)\b/,
    /\bschool\s+library\s+collection\b/,
    // Library catalogs & finding lists
    /\bfinding\s+list\b/,
    /\bsubject\s+catalog\b/,
    /\bunion\s+catalog\b/,
    /\bstandard\s+catalog\b/,
    /\bpublic\s+library\b/,
    /\blibrary\s+of\s+congress\b/,
    /\bcumulative\s+book\s+index\b/,
    /\bnational\s+union\s+catalog\b/,
    // "What Do I/Young Adults Read Next?" reference series
    /\bwhat\s+do\s+\w+\s+(read|need)\b/,
    /\bwhat\s+to\s+read\s+next\b/,
    // Academic literary criticism patterns
    /\b(victorian|edwardian|elizabethan)\s+(fiction|novel|literature|prose)\b/,
    /\bin\s+(victorian|edwardian|medieval)\s+fiction\b/,
    /\bof\s+(english|american|british)\s+(fiction|literature|novel)\b/,
    /\b(english|american|british)\s+(prose|fiction)\s+(between|from|in)\b/,
    /\bhistory\s+of\s+(english|american|british)\s+literature\b/,
    /\bintroduction\s+to\s+(english|american)\s+literature\b/,
    /\blecture\s+on\b/,
    /\bseries\s+of\s+lectures\b/,
    /\boutspoken\s+essays\b/,
    /\bcurrent\s+literature\b/,
    /\b(masters?|mistresses?)\s+of\s+(victorian|english|american)\b/,
    // Sports/non-genre noise
    /\bsymposium\s+on\b/,
    /\bbaseball\b/,
    /\bsoccer\b/,
    /\bfootball\b/,
    // Romance non-fantasy patterns (billionaire/contemporary)
    /\bbillionaire'?s?\b/,
    /\bsecond\s+chance\s+(romance|love|kiss|secret|destiny)\b/,
    /\baccidentally\s+married\b/,
    /\bmeet\s+me\s+in\s+\d{4}\b/,
    // "Sneak peek" / preview editions
    /\bsneak\s+peek\b/,
    /\buntitled\b/,
    /\ben\s+espa[ñn]ol\b/,
    // Collected/bundle editions not caught above
    /\bcomplete\s+ink\s+trilogy\b/,
    /\bquartet\s+digital\s+collection\b/,
    /\bvolume\s+one\s*$/,
    /\bseries\s+volume\b/,
  ];
  return patterns.some((r) => r.test(t));
}

function hasBadCategories(categories) {
  const joined = (categories ?? []).join(' ').toLowerCase();
  return [
    'study aids',
    'juvenile nonfiction',
    'literary criticism',
    'comics & graphic novels',
    'games & activities',
    'reference',
    'body, mind & spirit',
    'performing arts',
    'language arts & disciplines',
    'biography & autobiography',
    'social science',
    'history',
    'education',
    'language arts',
    'library science',
  ].some((k) => joined.includes(k));
}

function scoreCandidate(item, book) {
  const info = item.volumeInfo ?? {};
  let score = 0;
  if (book.cover_url) score += 2;
  if (book.synopsis) score += 2;
  if (book.isbn) score += 2;
  if (book.publication_year) score += 1;
  if (book.page_count >= 180 && book.page_count <= 1200) score += 1;
  if ((info.ratingsCount ?? 0) > 20) score += 1;
  return score;
}

/**
 * From a raw page of Google Books items, extract valid books, then keep only
 * the best-scoring edition per author-title pair. This prevents importing
 * paperback + hardcover + anniversary edition of the same book.
 */
function pickBestCandidates(items) {
  const best = new Map();
  for (const item of items) {
    const book = extractBookData(item);
    if (!book) continue;
    const key = book.authorTitleKey;
    const score = scoreCandidate(item, book);
    const current = best.get(key);
    if (!current || score > current.score) {
      best.set(key, { book, score });
    }
  }
  return [...best.values()].map((x) => x.book);
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
    return year && year >= 1800 && year <= currentYear ? year : null;
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
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  if (!DRY_RUN)
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
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
      console.log(
        `    ℹ️  API ok, totalItems=${data.totalItems}, 0 items returned`,
      );
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

  // Must have a title and at least one author
  if (!info.title || !info.authors?.length) return null;
  // Skip multi-author compilations (anthologies disguised as single books)
  if (info.authors.length > 2) return null;

  // Must have at least a description or page count — skip completely bare records
  if (!info.description && !info.pageCount) return null;

  // Skip if description looks non-English
  if (isLikelyNonEnglish(info.description)) return null;

  // Only reject books with explicitly bad ratings — unrated books are fine
  if (info.averageRating != null && info.averageRating < MIN_AVG_RATING)
    return null;

  // Skip junk titles and bad categories
  if (looksLikeJunkTitle(info.title)) return null;
  if (hasBadCategories(info.categories)) return null;

  // Skip very short works — likely novellas, short stories, or pamphlets
  if (info.pageCount && info.pageCount < 120) return null;

  const rawYear = info.publishedDate;
  const year = rawYear ? parseInt(rawYear.slice(0, 4), 10) : null;
  const validYear =
    year && year >= 1950 && year <= new Date().getFullYear() ? year : null;

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
    // DB columns
    title: info.title,
    slug: slugify(info.title),
    authors: info.authors,
    cover_url,
    synopsis: cleanSynopsis(info.description),
    publication_year: validYear,
    page_count: info.pageCount ?? null,
    isbn: extractISBN(item),
    darkness_level: null,
    heat_level: null,
    // Dedup helper — NOT written to DB
    authorTitleKey: makeAuthorTitleKey(info.title, info.authors),
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🔍  Fantasy Obscura — Book Discovery${DRY_RUN ? ' [DRY RUN]' : ''}`,
  );
  console.log(`    Target: ${LIMIT} new books\n`);

  // Load all existing slugs + titles + authors for fast dedup
  const existing = [];
  {
    const PAGE = 1000;
    let offset = 0;
    while (true) {
      const { data, error: existErr } = await supabase
        .from('books')
        .select('slug, title, authors')
        .range(offset, offset + PAGE - 1);
      if (existErr) { console.error(existErr.message); process.exit(1); }
      if (!data?.length) break;
      existing.push(...data);
      if (data.length < PAGE) break;
      offset += PAGE;
    }
  }

  const existingSlugs = new Set(existing.map((b) => b.slug).filter(Boolean));
  const existingTitles = new Set(
    existing.map((b) => b.title.toLowerCase().trim()),
  );
  const normalizedTitles = new Set(
    existing.map((b) => normalizeTitle(b.title)),
  );
  const existingAuthorTitleKeys = new Set(
    existing.map((b) => makeAuthorTitleKey(b.title, b.authors)),
  );

  const progress = loadProgress();

  // ISBN tracking — persisted across runs to catch the same book under different titles
  const seenISBNs = new Set(progress._seenISBNs ?? []);
  // Keys of books that failed to insert — skip on future runs
  const rejectedKeys = new Set(progress._rejectedKeys ?? []);

  // Queries exhausted in previous runs — skip them, start fresh when all done
  const completedQueries = new Set(progress._completedQueries ?? []);
  let remaining = QUERIES.filter((q) => !completedQueries.has(q));
  if (remaining.length === 0) {
    console.log('🔄  All queries exhausted — starting a fresh cycle.\n');
    completedQueries.clear();
    remaining = [...QUERIES];
  }

  // Major authors = Tier 1 block only (everything before the classics section)
  const tier1Boundary = QUERIES.indexOf('inauthor:"j.r.r. tolkien" fantasy');
  const majorAuthorQueries = new Set(
    tier1Boundary > 0 ? QUERIES.slice(0, tier1Boundary) : [],
  );

  // Prioritise Tier 1 inauthor: queries where the author has ≤ 3 books in DB
  const thinAuthorQueries = remaining.filter((q) => {
    if (!majorAuthorQueries.has(q)) return false;
    const author = extractAuthorFromQuery(q);
    if (!author) return false;
    return countBooksForAuthor(author, existing) <= 3;
  });
  const otherQueries = remaining.filter((q) => !thinAuthorQueries.includes(q));

  // Shuffle the non-priority queries; thin-author queries run first, unshuffled
  for (let i = otherQueries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [otherQueries[i], otherQueries[j]] = [otherQueries[j], otherQueries[i]];
  }
  remaining = [...thinAuthorQueries, ...otherQueries];

  if (thinAuthorQueries.length > 0) {
    console.log(
      `    ⭐ ${thinAuthorQueries.length} thin-coverage author(s) prioritised\n`,
    );
  }
  console.log(
    `    ${remaining.length} queries available this run (${QUERIES.length - remaining.length} already exhausted)\n`,
  );

  let imported = 0;

  for (const query of remaining) {
    if (imported >= LIMIT) break;

    const startIndex = progress[query] ?? 0;

    console.log(`\n📖  Query "${query}" (from index ${startIndex})`);

    let pageStart = startIndex;
    let exhausted = false;
    let consecutiveEmptyPages = 0;
    const MAX_EMPTY_PAGES = 2;
    const importedAtQueryStart = imported;

    while (imported < LIMIT) {
      const items = await fetchPage(query, pageStart);
      await sleep(DELAY_MS);

      if (!items.length) {
        exhausted = true;
        break;
      }

      const importedBefore = imported;

      // Pick best edition per author-title pair from this page
      const candidates = pickBestCandidates(items);
      let dbg_duped = 0;

      for (const book of candidates) {
        if (imported >= LIMIT) break;

        const { isbn, authorTitleKey } = book;

        // Author-title dedup — catches cross-edition duplicates
        if (
          rejectedKeys.has(authorTitleKey) ||
          existingAuthorTitleKeys.has(authorTitleKey)
        ) {
          dbg_duped++;
          continue;
        }

        // ISBN dedup — catches same book under different titles
        if (isbn && seenISBNs.has(isbn)) {
          dbg_duped++;
          continue;
        }

        // Exact slug / title dedup
        if (
          existingSlugs.has(book.slug) ||
          existingTitles.has(book.title.toLowerCase().trim())
        ) {
          dbg_duped++;
          continue;
        }

        // Normalized title dedup
        const normTitle = normalizeTitle(book.title);
        if (normalizedTitles.has(normTitle)) {
          dbg_duped++;
          continue;
        }

        // Mark as seen immediately to avoid dupes within the same run
        existingSlugs.add(book.slug);
        existingTitles.add(book.title.toLowerCase().trim());
        normalizedTitles.add(normTitle);
        existingAuthorTitleKeys.add(authorTitleKey);
        if (isbn) seenISBNs.add(isbn);

        // Open Library fallback for missing publication year
        if (!book.publication_year) {
          book.publication_year = await fetchOpenLibraryYear(
            book.title,
            book.authors,
          );
          await sleep(200);
        }

        process.stdout.write(
          `  [${imported + 1}/${LIMIT}] "${book.title.slice(0, 50)}" … `,
        );

        if (DRY_RUN) {
          console.log(`[dry] cover:${book.cover_url ? '✓' : '✗'}`);
          imported++;
          continue;
        }

        // Strip internal dedup fields before inserting
        const { authorTitleKey: _k, ...dbBook } = book;
        const { error } = await supabase.from('books').insert(dbBook);
        if (error) {
          console.log(`✗ ${error.message.slice(0, 60)}`);
          rejectedKeys.add(authorTitleKey);
        } else {
          console.log(
            `✓ cover:${book.cover_url ? '✓' : '✗'} · ${book.publication_year ?? '?'}`,
          );
          imported++;

          // Ensure a minimal author row exists so the author page works immediately.
          // seed-authors.js will enrich it with bio/photo later.
          for (const authorName of (dbBook.authors ?? [])) {
            const authorSlug = slugify(authorName);
            await supabase.from('authors')
              .upsert({ name: authorName, slug: authorSlug }, { onConflict: 'slug', ignoreDuplicates: true });
          }
        }
      }

      // Persist dedup state after every page
      progress._seenISBNs = [...seenISBNs];
      progress._rejectedKeys = [...rejectedKeys];

      console.log(
        `    page@${pageStart}: ${items.length} raw → ${candidates.length} candidates → ${dbg_duped} duped → ${imported - importedBefore} new`,
      );

      if (imported === importedBefore) {
        consecutiveEmptyPages++;
        if (consecutiveEmptyPages >= MAX_EMPTY_PAGES) {
          console.log(
            `  ↳ ${MAX_EMPTY_PAGES} pages with no new books — skipping to next query`,
          );
          exhausted = true;
          break;
        }
      } else {
        consecutiveEmptyPages = 0;
      }

      pageStart += PAGE_SIZE;

      // Save page offset and completed set after each page
      progress[query] = pageStart;
      progress._completedQueries = [...completedQueries];
      saveProgress(progress);

      // Google Books caps at 1000 results per query
      if (pageStart >= 1000) {
        exhausted = true;
        break;
      }
    }

    if (exhausted) {
      const addedThisQuery = imported - importedAtQueryStart;
      if (addedThisQuery > 0) {
        console.log(`  ↳ Query exhausted — moving to next`);
        completedQueries.add(query);
        delete progress[query];
        progress._completedQueries = [...completedQueries];
        saveProgress(progress);
      } else {
        console.log(`  ↳ Query exhausted with 0 new books — will retry next cycle`);
        delete progress[query];
        saveProgress(progress);
      }
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

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
