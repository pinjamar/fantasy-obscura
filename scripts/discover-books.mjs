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
  'inauthor:sanderson fantasy',
  'inauthor:abercrombie fantasy',
  'inauthor:rothfuss fantasy',
  'inauthor:"robin hobb" fantasy',
  'inauthor:"robert jordan" fantasy',
  'inauthor:"george r.r. martin" fantasy',
  'inauthor:"r.f. kuang" fantasy',
  'inauthor:"sarah j. maas" fantasy',
  'inauthor:"leigh bardugo" fantasy',
  'inauthor:"naomi novik" fantasy',
  'inauthor:pratchett fantasy',
  'inauthor:"jim butcher" fantasy',
  'inauthor:"neil gaiman" fantasy',
  'inauthor:"n.k. jemisin" fantasy',
  'inauthor:"ursula k. le guin" fantasy',
  'inauthor:"china mieville" fantasy',
  'inauthor:"v.e. schwab" fantasy',
  'inauthor:"tamsin muir" fantasy',
  'inauthor:"becky chambers" fantasy',
  'inauthor:"t. kingfisher" fantasy',
  'inauthor:"garth nix" fantasy',
  'inauthor:"andrzej sapkowski" fantasy',
  'inauthor:"guy gavriel kay" fantasy',
  'inauthor:"patricia mckillip" fantasy',
  'inauthor:"peter s. beagle" fantasy',
  'inauthor:"katherine arden" fantasy',
  'inauthor:"samantha shannon" fantasy',
  'inauthor:"cassandra clare" fantasy',
  'inauthor:"laini taylor" fantasy',
  'inauthor:"maggie stiefvater" fantasy',
  'inauthor:"holly black" fantasy',
  'inauthor:"ken liu" fantasy',
  'inauthor:"fonda lee" fantasy',
  'inauthor:"shelley parker-chan" fantasy',
  'inauthor:"tad williams" fantasy',
  'inauthor:"terry goodkind" fantasy',
  'inauthor:"terry brooks" fantasy',
  'inauthor:"raymond feist" fantasy',
  'inauthor:"david eddings" fantasy',
  'inauthor:"robert salvatore" fantasy',
  'inauthor:"anne mccaffrey" fantasy',
  'inauthor:"tamora pierce" fantasy',
  'inauthor:"mercedes lackey" fantasy',
  'inauthor:"diana wynne jones" fantasy',
  'inauthor:"diane duane" fantasy',
  'inauthor:"patricia c. wrede" fantasy',
  'inauthor:"brandon mull" fantasy',
  'inauthor:"christopher paolini" fantasy',
  'inauthor:"richelle mead" fantasy',
  'inauthor:"rachel caine" fantasy',
  'inauthor:"ilona andrews" fantasy',
  'inauthor:"patricia briggs" fantasy',
  'inauthor:"kevin hearne" fantasy',
  'inauthor:"ben aaronovitch" fantasy',
  'inauthor:"seanan mcguire" fantasy',
  'inauthor:"jo walton" fantasy',
  'inauthor:"katherine addison" fantasy',
  'inauthor:"k.j. parker" fantasy',
  'inauthor:"carol berg" fantasy',
  'inauthor:"rachel hartman" fantasy',
  'inauthor:"melissa caruso" fantasy',
  'inauthor:"jenn lyons" fantasy',
  'inauthor:"anthony ryan" fantasy',
  'inauthor:"brian staveley" fantasy',
  'inauthor:"robert jackson bennett" fantasy',
  'inauthor:"r. scott bakker" fantasy',
  'inauthor:"sebastien de castell" fantasy',
  'inauthor:"lev grossman" fantasy',
  'inauthor:"max gladstone" fantasy',
  'inauthor:"megan whalen turner" fantasy',
  'inauthor:"arkady martine" fantasy',
  'inauthor:"j.k. rowling" fantasy',
  'inauthor:"suzanne collins" fantasy',
  'inauthor:"rick riordan" fantasy',
  'inauthor:"stephenie meyer" fantasy',
  'inauthor:"rebecca yarros" fantasy',
  'inauthor:"erin morgenstern" fantasy',
  'inauthor:"martha wells" fantasy',
  'inauthor:"adrian tchaikovsky" fantasy',
  'inauthor:"alix e. harrow" fantasy',
  'inauthor:"juliet marillier" fantasy',
  'inauthor:"s.a. chakraborty" fantasy',
  'inauthor:"shannon chakraborty" fantasy',
  // ── Classic / seminal authors ───────────────────────────────────────────────
  'inauthor:"j.r.r. tolkien" fantasy',
  'inauthor:"c.s. lewis" fantasy',
  'inauthor:"susanna clarke" fantasy',
  'inauthor:"philip pullman" fantasy',
  'inauthor:"lois mcmaster bujold" fantasy',
  'inauthor:"l.e. modesitt jr" fantasy',
  'inauthor:"stephen donaldson" fantasy',
  'inauthor:"gene wolfe" fantasy',
  'inauthor:"jack vance" fantasy',
  'inauthor:"roger zelazny" fantasy',
  'inauthor:"poul anderson" fantasy',
  'inauthor:"c.j. cherryh" fantasy',
  'inauthor:"katherine kurtz" fantasy',
  'inauthor:"margaret weis" fantasy',
  'inauthor:"tracy hickman" fantasy',
  'inauthor:"lloyd alexander" fantasy',
  `inauthor:"madeleine l'engle" fantasy`,
  'inauthor:"robin mckinley" fantasy',
  'inauthor:"dave duncan" fantasy',
  'inauthor:"david farland" fantasy',
  'inauthor:"michael a. stackpole" fantasy',
  'inauthor:"ian irvine" fantasy',
  'inauthor:"greg keyes" fantasy',
  'inauthor:"kevin j. anderson" fantasy',
  'inauthor:"ed greenwood" fantasy',
  'inauthor:"catherine valente" fantasy',
  'inauthor:"marlon james" fantasy',
  'inauthor:"helen oyeyemi" fantasy',
  'inauthor:"kij johnson" fantasy',
  // ── Urban fantasy ───────────────────────────────────────────────────────────
  'inauthor:"kim harrison" fantasy',
  'inauthor:"laurell k. hamilton" fantasy',
  'inauthor:"charlaine harris" fantasy',
  'inauthor:"kelley armstrong" fantasy',
  'inauthor:"faith hunter" fantasy',
  'inauthor:"rob thurman" fantasy',
  'inauthor:"carrie vaughn" fantasy',
  'inauthor:"kat richardson" fantasy',
  'inauthor:"mike carey" fantasy',
  'inauthor:"chloe neill" fantasy',
  'inauthor:"jaye wells" fantasy',
  'inauthor:"christopher golden" fantasy',
  'inauthor:"thomas e. sniegoski" fantasy',
  'inauthor:"anton strout" fantasy',
  'inauthor:"mark del franco" fantasy',
  // ── Romantasy / fantasy romance ─────────────────────────────────────────────
  'inauthor:"anne bishop" fantasy',
  'inauthor:"nalini singh" fantasy',
  'inauthor:"sherrilyn kenyon" fantasy',
  'inauthor:"thea harrison" fantasy',
  'inauthor:"grace draven" fantasy',
  'inauthor:"jennifer l. armentrout" fantasy',
  'inauthor:"kresley cole" fantasy',
  'inauthor:"bec mcmaster" fantasy',
  'inauthor:"lynsay sands" fantasy',
  'inauthor:"gena showalter" fantasy',
  'inauthor:"sylvia day" fantasy',
  'inauthor:"deborah harkness" fantasy',
  'inauthor:"carissa broadbent" fantasy',
  'inauthor:"callie hart" fantasy',
  'inauthor:"lauren roberts" fantasy',
  'inauthor:"danielle l. jensen" fantasy',
  'inauthor:"sarah a. parker" fantasy',
  'inauthor:"raven kennedy" fantasy',
  'inauthor:"caroline peckham" fantasy',
  'inauthor:"susanne valenti" fantasy',
  'inauthor:"penn cole" fantasy',
  'inauthor:"rachel gillig" fantasy',
  'inauthor:"kristen ciccarelli" fantasy',
  'inauthor:"amber v. nicole" fantasy',
  'inauthor:"hannah nicole maehrer" fantasy',
  'inauthor:"rebecca ross" fantasy',
  'inauthor:"adalyn grace" fantasy',
  'inauthor:"ava reid" fantasy',
  'inauthor:"analeigh sbrana" fantasy',
  'inauthor:"sasha peyton smith" fantasy',
  'inauthor:"patrice caldwell" fantasy',
  'inauthor:"aurora ascher" fantasy',
  'inauthor:"brigitte knightley" fantasy',
  'inauthor:"kayley smith" fantasy',
  'inauthor:"freya marske" fantasy',
  'inauthor:"tasha suri" fantasy',
  'inauthor:"emily mcintire" fantasy',
  'inauthor:"p.c. cast" fantasy',
  'inauthor:"jennifer estep" fantasy',
  'inauthor:"lisa shearin" fantasy',
  'inauthor:"stacia kane" fantasy',
  'inauthor:"darynda jones" fantasy',
  'inauthor:"j.r. ward" fantasy',
  'inauthor:"jeaniene frost" fantasy',
  'inauthor:"lara adrian" fantasy',
  'inauthor:"kerrelyn sparks" fantasy',
  'inauthor:"christine feehan" fantasy',
  'inauthor:"suzanne wright" fantasy',
  'inauthor:"ali hazelwood" fantasy',
  'inauthor:"stacia stark" fantasy',
  'inauthor:"briar boleyn" fantasy',
  'inauthor:"devney perry" fantasy',
  'inauthor:"kerri maniscalco" fantasy',
  'inauthor:"sangu mandanna" fantasy',
  'inauthor:"olivia atwater" fantasy',
  'inauthor:"rachel gillig" fantasy',
  'inauthor:"senlinyu" fantasy',
  'inauthor:"rachel gillig" fantasy',
  // ── YA Fantasy ──────────────────────────────────────────────────────────────
  'inauthor:"veronica roth" fantasy',
  'inauthor:"marie lu" fantasy',
  'inauthor:"victoria aveyard" fantasy',
  'inauthor:"shannon hale" fantasy',
  'inauthor:"sarah beth durst" fantasy',
  'inauthor:"jessica cluess" fantasy',
  'inauthor:"jessica day george" fantasy',
  'inauthor:"sarah rees brennan" fantasy',
  'inauthor:"scott westerfeld" fantasy',
  'inauthor:"rachel smythe" fantasy',
  'inauthor:"rainbow rowell" fantasy',
  'inauthor:"tracy wolff" fantasy',
  'inauthor:"becca fitzpatrick" fantasy',
  'inauthor:"sabaa tahir" fantasy',
  'inauthor:"tomi adeyemi" fantasy',
  'inauthor:"chloe gong" fantasy',
  'inauthor:"roshani chokshi" fantasy',
  'inauthor:"jordan ifueko" fantasy',
  'inauthor:"namina forna" fantasy',
  'inauthor:"marissa meyer" fantasy',
  'inauthor:"eoin colfer" fantasy',
  'inauthor:"cornelia funke" fantasy',
  'inauthor:"julie kagawa" fantasy',
  'inauthor:"lauren kate" fantasy',
  'inauthor:"melissa marr" fantasy',
  'inauthor:"kiersten white" fantasy',
  'inauthor:"libba bray" fantasy',
  'inauthor:"morgan rhodes" fantasy',
  'inauthor:"adrienne young" fantasy',
  'inauthor:"renee ahdieh" fantasy',
  'inauthor:"alexandra bracken" fantasy',
  'inauthor:"mary e. pearson" fantasy',
  'inauthor:"l.j. smith" fantasy',
  'inauthor:"joseph delaney" fantasy',
  'inauthor:"michael scott" fantasy',
  'inauthor:"christelle dabos" fantasy',
  'inauthor:"stephanie garber" fantasy',
  'inauthor:"margaret rogerson" fantasy',
  'inauthor:"beth revis" fantasy',
  // ── Tier 2: popular series & grimdark authors ───────────────────────────────
  'inauthor:"mark lawrence" fantasy',
  'inauthor:"brent weeks" fantasy',
  'inauthor:"scott lynch" fantasy',
  'inauthor:erikson fantasy',
  'inauthor:"ian c. esslemont" fantasy',
  'inauthor:"john gwynne" fantasy',
  'inauthor:"evan winter" fantasy',
  'inauthor:"nicholas eames" fantasy',
  'inauthor:"brian mcclellan" fantasy',
  'inauthor:"michael j. sullivan" fantasy',
  'inauthor:"will wight" fantasy',
  'inauthor:"travis baldree" fantasy',
  'inauthor:"josiah bancroft" fantasy',
  'inauthor:"james islington" fantasy',
  'inauthor:"richard swan" fantasy',
  'inauthor:"django wexler" fantasy',
  'inauthor:"seth dickinson" fantasy',
  'inauthor:"anna smith spark" fantasy',
  'inauthor:"ed mcdonald" fantasy',
  'inauthor:"miles cameron" fantasy',
  'inauthor:"paul kearney" fantasy',
  'inauthor:"peter v. brett" fantasy',
  'inauthor:"kate elliott" fantasy',
  'inauthor:"michael moorcock" fantasy',
  'inauthor:"fritz leiber" fantasy',
  'inauthor:"glen cook" fantasy',
  'inauthor:"david gemmell" fantasy',
  'inauthor:"tom lloyd" fantasy',
  'inauthor:"j.v. jones" fantasy',
  'inauthor:"peter mclean" fantasy',
  'inauthor:"rob hayes" fantasy',
  'inauthor:"anna stephens" fantasy',
  'inauthor:"victor milan" fantasy',
  'inauthor:"sam sykes" fantasy',
  'inauthor:"robert v.s. redick" fantasy',
  'inauthor:"matthew ward" fantasy',
  'inauthor:"dyrk ashton" fantasy',
  'inauthor:"kel kade" fantasy',
  'inauthor:"jeff vandermeer" fantasy',
  'inauthor:"charles stross" fantasy',
  'inauthor:"larry correia" fantasy',
  'inauthor:"marie brennan" fantasy',
  'inauthor:"genevieve cogman" fantasy',
  'inauthor:"benedict jacka" fantasy',
  'inauthor:"simon r. green" fantasy',
  'inauthor:"charles de lint" fantasy',
  'inauthor:"jim c. hines" fantasy',
  'inauthor:"karen miller" fantasy',
  'inauthor:"trudi canavan" fantasy',
  'inauthor:"sara douglass" fantasy',
  'inauthor:"fiona mcintosh" fantasy',
  'inauthor:"glenda larke" fantasy',
  'inauthor:"jennifer fallon" fantasy',
  'inauthor:"kate forsyth" fantasy',
  'inauthor:"helen lowe" fantasy',
  'inauthor:"dj mcdonald" fantasy',
  'inauthor:"charlie n. holmberg" fantasy',
  'inauthor:"rae carson" fantasy',
  'inauthor:"k.m. shea" fantasy',
  'inauthor:"elise kova" fantasy',
  'inauthor:"melanie rawn" fantasy',
  'inauthor:"elizabeth haydon" fantasy',
  'inauthor:"janny wurts" fantasy',
  'inauthor:"katherine kerr" fantasy',
  'inauthor:"mickey zucker reichert" fantasy',
  'inauthor:"julian may" fantasy',
  'inauthor:"david dalglish" fantasy',
  'inauthor:"gareth hanrahan" fantasy',
  'inauthor:"jen williams" fantasy',
  'inauthor:"daniel abraham" fantasy',
  // ── Mythology / folklore retelling ──────────────────────────────────────────
  'inauthor:"madeline miller" fantasy',
  'inauthor:"pat barker" fantasy',
  'inauthor:"claire north" fantasy',
  'inauthor:"jennifer saint" fantasy',
  'inauthor:"natalie haynes" fantasy',
  'inauthor:"kosoko jackson" fantasy',
  'inauthor:"emily hauser" fantasy',
  'inauthor:"stephen fry" mythology',
  'inauthor:"silvia moreno-garcia" fantasy',
  'inauthor:"zen cho" fantasy',
  'inauthor:"isabel ibanez" fantasy',
  'inauthor:"gail carriger" fantasy',
  'inauthor:"genevieve gornichec" fantasy',
  'inauthor:"vaishnavi patel" fantasy',
  'inauthor:"sue lynn tan" fantasy',
  'inauthor:"h.m. long" fantasy',
  // ── Cozy fantasy ────────────────────────────────────────────────────────────
  'inauthor:"heather fawcett" fantasy',
  'inauthor:"tj klune" fantasy',
  'inauthor:"shelby mahurin" fantasy',
  'inauthor:"sarah hogle" fantasy',
  'inauthor:"annie bellet" fantasy',
  'inauthor:"molly harper" fantasy',
  'inauthor:"nghi vo" fantasy',
  'inauthor:"alexandra rowland" fantasy',
  // ── Academy fantasy ─────────────────────────────────────────────────────────
  'inauthor:"cc hunter" fantasy',
  // ── Tier 3: LitRPG / progression / web serial ───────────────────────────────
  'inauthor:"phil tucker" fantasy',
  'inauthor:"shirtaloon" fantasy',
  'inauthor:"andrew rowe" fantasy',
  'inauthor:"luke chmilenko" fantasy',
  'inauthor:"tao wong" fantasy',
  'inauthor:"dakota krout" fantasy',
  'inauthor:"thomas k. carpenter" fantasy',
  'inauthor:"matt dinniman" fantasy',
  'inauthor:"aleron kong" fantasy',
  'inauthor:"harmon cooper" fantasy',
  'inauthor:"michael chatfield" fantasy',
  'inauthor:"seth ring" fantasy',
  'inauthor:"cale plamann" fantasy',
  'inauthor:"john bierce" fantasy',
  'inauthor:"dennis e. taylor" fantasy',
  'inauthor:"jason anspach" fantasy',
  'inauthor:"nick cole" fantasy',
  'inauthor:"kel kade" litrpg',
  'inauthor:"craig alanson" fantasy',
  'inauthor:"christopher nuttall" fantasy',
  'inauthor:"m.h. johnson" litrpg',
  'inauthor:"william d. arand" fantasy',
  'inauthor:"james a. hunter" litrpg',
  'inauthor:"sever bronny" fantasy',
  'inauthor:"eden hudson" fantasy',
  'inauthor:"edward w. robertson" fantasy',
  'inauthor:"james e. wisher" fantasy',
  'inauthor:"timothy mcgowen" litrpg',
  'inauthor:"travis bagwell" fantasy',
  'inauthor:"DB jackson" fantasy',
  'inauthor:"jonathan dunne" fantasy',
  'inauthor:"rr virdi" fantasy',
  'inauthor:"pirateaba" fantasy',
  'inauthor:"ryan cahill" fantasy',
  'inauthor:"zac argyle" fantasy',
  'inauthor:"j.m. clarke" fantasy',
  'inauthor:"m.l. wang" fantasy',
  // ── Broad subgenre sweeps ───────────────────────────────────────────────────
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
  '"secondary world fantasy" novel',
  '"flintlock fantasy" novel',
  '"gaslamp fantasy" novel',
  '"military fantasy" novel',
  '"political fantasy" novel',
  '"assassin fantasy" novel',
  '"dragon rider" fantasy novel',
  '"cultivation fantasy" novel',
  '"xianxia fantasy" novel',
  '"wuxia fantasy" novel',
  '"gamelit fantasy" novel',
  '"isekai fantasy" novel',
  '"dungeon fantasy" novel',
  '"magic school fantasy" novel',
  '"steampunk fantasy" novel',
  '"silkpunk fantasy" novel',
  '"vampire fantasy" novel',
  '"werewolf fantasy" novel',
  '"fae fantasy" novel',
  '"witch fantasy" novel',
  '"necromancer fantasy" novel',
  '"pirate fantasy" novel',
  '"found family fantasy" novel',
  '"chosen one fantasy" novel',
  '"enemies to lovers fantasy" novel',
  '"slow burn fantasy romance" novel',
  '"reverse harem fantasy" novel',
  '"thieves guild fantasy" novel',
  '"spy fantasy" novel',
  '"detective fantasy" novel',
  '"coming of age" fantasy novel',
  '"blood magic" fantasy novel',
  '"elemental magic" fantasy novel',
  '"time travel fantasy" novel',
  '"alternate history fantasy" novel',
  '"fairy tale retelling" novel',
  '"mythology retelling" fantasy novel',
  '"arthurian fantasy" novel',
  '"folklore fantasy" novel',
  '"mythic fantasy" novel',
  '"noblebright fantasy" novel',
  '"hopepunk fantasy" novel',
  // ── Setting-based sweeps ────────────────────────────────────────────────────
  'fantasy "ancient china" novel',
  'fantasy "ancient japan" novel',
  'fantasy "ancient greece" novel',
  'fantasy "ancient egypt" novel',
  'fantasy "ancient rome" novel',
  'fantasy "norse mythology" novel',
  'fantasy "slavic mythology" novel',
  'fantasy "celtic mythology" novel',
  'fantasy "african mythology" novel',
  'fantasy "aztec mythology" novel',
  'fantasy "persian mythology" novel',
  'fantasy "indian mythology" novel',
  'fantasy "medieval" novel',
  'fantasy "victorian" novel',
  // ── Award + list signals ────────────────────────────────────────────────────
  'fantasy "hugo award" novel',
  'fantasy "nebula award" novel',
  'fantasy "world fantasy award" novel',
  'fantasy "locus award" novel',
  'fantasy "british fantasy award" novel',
  'fantasy "david gemmell award"',
  'fantasy "spfbo" novel',
  'fantasy bestseller novel',
  'fantasy "new york times bestseller" novel',
  // ── Audience / pacing sweeps ────────────────────────────────────────────────
  'young adult fantasy novel',
  'adult fantasy novel',
  'new adult fantasy novel',
  'standalone fantasy novel',
  'epic fantasy series novel',
  'literary fantasy novel',
  'feminist fantasy novel',
  'diverse fantasy novel',
  'LGBTQ fantasy novel',
  // ── High-value title queries (web serials & hard-to-find) ──────────────────
  '"dungeon crawler carl" fantasy',
  '"he who fights with monsters" litrpg',
  '"defiance of the fall" fantasy',
  '"primal hunter" fantasy',
  '"mage errant" fantasy',
  '"a practical guide to sorcery" fantasy',
  '"cradle series" fantasy',
  '"wandering inn" fantasy',
  '"mother of learning" fantasy',
  '"beware of chicken" fantasy',
  '"forge of destiny" fantasy',
  '"beneath the dragoneye moons" fantasy',
];

// Require averageRating to exist — primary quality gate
const MIN_AVG_RATING = 3.5;

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
 * so we won't import them as two separate books.
 */
function normalizeTitle(title) {
  let t = title.toLowerCase().trim();
  // Strip series prefix (everything up to and including the first colon)
  const colonIdx = t.indexOf(':');
  if (colonIdx > 1) t = t.slice(colonIdx + 1).trim();
  // Remove leading article
  t = t.replace(/^(the|a|an)\s+/, '');
  return t.replace(/\s+/g, ' ').trim();
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

  // Skip non-novel categories / junk
  const cats = (info.categories ?? []).join(' ').toLowerCase();
  const title = info.title.toLowerCase();
  const skipKeywords = [
    // Multi-book bundles & collections
    'anthology',
    'omnibus',
    'boxed set',
    'box set',
    'complete trilogy',
    'complete series',
    'complete collection',
    '3-book',
    '4-book',
    '5-book',
    '6-book',
    '7-book',
    '8-book',
    'books 1-',
    'volumes 1-',
    'the complete ',
    'collected works',
    'and other stories',
    'tales of',
    'tales from',
    'stories from',
    'selected works',
    'collected stories',
    'the best of',
    // Short fiction
    'short stories',
    'short story',
    'novelette',
    // Non-fiction / tie-in
    'guide to',
    'companion to',
    'art of',
    'making of',
    'the world of',
    'cookbook',
    'workbook',
    'coloring book',
    'activity book',
    'journal',
    'notebook',
    'planner',
    'calendar',
    'diary',
    // Critical / academic
    'study guide',
    "reader's guide",
    "readers' guide",
    'reading group',
    'book club guide',
    'critical essay',
    'analysis of',
    'criticism',
    'annotated edition',
    'annotated ',
    'with annotations',
    'interview with',
    'biography of',
    // Special editions that are the same content
    'deluxe edition',
    'special edition',
    "collector's edition",
    'illustrated edition',
    'large print',
    'large-print',
    'abridged',
    // Graphic adaptations
    'graphic novel',
    'graphic adaptation',
    'manga',
    'comic book',
    'comics',
    // Review / summary products
    'summary of',
    'review of',
    'synopsis of',
    'chapter by chapter',
    'book review',
    'plot summary',
  ];
  if (skipKeywords.some((k) => title.includes(k) || cats.includes(k)))
    return null;

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
  console.log(
    `\n🔍  Fantasy Obscura — Book Discovery${DRY_RUN ? ' [DRY RUN]' : ''}`,
  );
  console.log(`    Target: ${LIMIT} new books\n`);

  // Load all existing slugs + titles for fast dedup
  const { data: existing, error: existErr } = await supabase
    .from('books')
    .select('slug, title');
  if (existErr) {
    console.error(existErr.message);
    process.exit(1);
  }

  const existingSlugs = new Set(existing.map((b) => b.slug).filter(Boolean));
  const existingTitles = new Set(
    existing.map((b) => b.title.toLowerCase().trim()),
  );
  const normalizedTitles = new Set(
    existing.map((b) => normalizeTitle(b.title)),
  );

  const progress = loadProgress();

  // ISBN tracking — persisted across runs to catch the same book under different titles
  const seenISBNs = new Set(progress._seenISBNs ?? []);

  let imported = 0;
  let queryIdx = progress._queryIdx ?? 0;
  // If progress left off past the end, wrap around
  if (queryIdx >= QUERIES.length) queryIdx = 0;

  let fullCycleCompleted = false;
  let importedThisCycle = 0;
  let startedMidCycle = queryIdx > 0;

  while (imported < LIMIT) {
    if (queryIdx >= QUERIES.length) {
      // Wrap around to beginning
      queryIdx = 0;
      progress._queryIdx = 0;
      saveProgress(progress);
      if (fullCycleCompleted && importedThisCycle === 0) {
        console.log(
          '\n⚠️  Completed a full cycle with no new books found. Database may be up to date for current queries.',
        );
        break;
      }
      if (!startedMidCycle) fullCycleCompleted = true;
      startedMidCycle = false;
      importedThisCycle = 0;
      console.log(
        '\n🔄  Wrapped around to start of query list — skipping already-imported books automatically.',
      );
    }

    const query = QUERIES[queryIdx];
    const startIndex = progress[query] ?? 0;

    console.log(
      `\n📖  Query ${queryIdx + 1}/${QUERIES.length}: "${query}" (from index ${startIndex})`,
    );

    let pageStart = startIndex;
    let pageImported = 0;
    let exhausted = false;
    let consecutiveEmptyPages = 0;
    const MAX_EMPTY_PAGES = 2;

    while (imported < LIMIT) {
      const items = await fetchPage(query, pageStart);
      await sleep(DELAY_MS);

      if (!items.length) {
        exhausted = true;
        break;
      }

      const importedBefore = imported;
      let dbg_total = 0,
        dbg_filtered = 0,
        dbg_duped = 0;

      for (const item of items) {
        if (imported >= LIMIT) break;
        dbg_total++;

        const book = extractBookData(item);
        if (!book) {
          dbg_filtered++;
          continue;
        }

        // ISBN dedup — catches same book under different titles/editions
        const isbn = extractISBN(item);
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

        // Normalized title dedup — catches "Mistborn: The Final Empire" vs "The Final Empire"
        const normTitle = normalizeTitle(book.title);
        if (normalizedTitles.has(normTitle)) {
          dbg_duped++;
          continue;
        }

        // Mark as seen immediately to avoid dupes within the same run
        existingSlugs.add(book.slug);
        existingTitles.add(book.title.toLowerCase().trim());
        normalizedTitles.add(normTitle);
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

        const { error } = await supabase.from('books').insert(book);
        if (error) {
          console.log(`✗ ${error.message.slice(0, 60)}`);
        } else {
          console.log(
            `✓ cover:${book.cover_url ? '✓' : '✗'} · ${book.publication_year ?? '?'}`,
          );
          imported++;
          pageImported++;
          importedThisCycle++;
        }
      }

      // Persist seen ISBNs after every page
      progress._seenISBNs = [...seenISBNs];

      console.log(
        `    page@${pageStart}: ${dbg_total} items → ${dbg_total - dbg_filtered} passed filter → ${dbg_duped} duped → ${imported - importedBefore} new`,
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

      // Save progress after each page
      progress[query] = pageStart;
      progress._queryIdx = queryIdx;
      saveProgress(progress);

      // Google Books caps at 1000 results per query
      if (pageStart >= 1000) {
        exhausted = true;
        break;
      }
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

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
