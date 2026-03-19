/**
 * fix-missing-series.mjs
 *
 * Cross-references reading order guides against the DB.
 * Finds books that are in a reading order but have series = null in the DB,
 * then patches them using the Google Books API to get the correct series name.
 *
 * Usage:
 *   node scripts/fix-missing-series.mjs           (patch all missing series)
 *   node scripts/fix-missing-series.mjs --dry-run (preview only, no writes)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN = process.argv.includes('--dry-run');
const DELAY_MS = 300;

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── All reading order books with their expected series names ──────────────────
// Format: { slug, series } — series is what we expect in the DB
const READING_ORDER_SERIES = [
  // ACOTAR
  { slug: 'a-court-of-thorns-and-roses',    series: 'A Court of Thorns and Roses' },
  { slug: 'a-court-of-mist-and-fury',       series: 'A Court of Thorns and Roses' },
  { slug: 'a-court-of-wings-and-ruin',      series: 'A Court of Thorns and Roses' },
  { slug: 'a-court-of-frost-and-starlight', series: 'A Court of Thorns and Roses' },
  { slug: 'a-court-of-silver-flames',       series: 'A Court of Thorns and Roses' },
  // Stormlight / Cosmere
  { slug: 'the-way-of-kings',    series: 'The Stormlight Archive' },
  { slug: 'words-of-radiance',   series: 'The Stormlight Archive' },
  { slug: 'edgedancer',          series: 'The Stormlight Archive' },
  { slug: 'oathbringer',         series: 'The Stormlight Archive' },
  { slug: 'dawnshard',           series: 'The Stormlight Archive' },
  { slug: 'rhythm-of-war',       series: 'The Stormlight Archive' },
  { slug: 'wind-and-truth',      series: 'The Stormlight Archive' },
  // Mistborn Era 1
  { slug: 'the-final-empire',       series: 'Mistborn' },
  { slug: 'the-well-of-ascension',  series: 'Mistborn' },
  { slug: 'the-hero-of-ages',       series: 'Mistborn' },
  // Mistborn Era 2
  { slug: 'the-alloy-of-law',       series: 'Mistborn Era Two' },
  { slug: 'shadows-of-self',        series: 'Mistborn Era Two' },
  { slug: 'the-bands-of-mourning',  series: 'Mistborn Era Two' },
  { slug: 'the-lost-metal',         series: 'Mistborn Era Two' },
  // First Law
  { slug: 'the-blade-itself',        series: 'The First Law' },
  { slug: 'before-they-are-hanged',  series: 'The First Law' },
  { slug: 'last-argument-of-kings',  series: 'The First Law' },
  { slug: 'best-served-cold',        series: 'First Law World' },
  { slug: 'the-heroes',              series: 'First Law World' },
  { slug: 'red-country',             series: 'First Law World' },
  { slug: 'a-little-hatred',         series: 'The Age of Madness' },
  { slug: 'the-trouble-with-peace',  series: 'The Age of Madness' },
  { slug: 'the-wisdom-of-crowds',    series: 'The Age of Madness' },
  // Malazan
  { slug: 'gardens-of-the-moon',  series: 'Malazan Book of the Fallen' },
  { slug: 'deadhouse-gates',      series: 'Malazan Book of the Fallen' },
  { slug: 'memories-of-ice',      series: 'Malazan Book of the Fallen' },
  { slug: 'house-of-chains',      series: 'Malazan Book of the Fallen' },
  { slug: 'midnight-tides',       series: 'Malazan Book of the Fallen' },
  { slug: 'the-bonehunters',      series: 'Malazan Book of the Fallen' },
  { slug: 'reapers-gale',         series: 'Malazan Book of the Fallen' },
  { slug: 'toll-the-hounds',      series: 'Malazan Book of the Fallen' },
  { slug: 'dust-of-dreams',       series: 'Malazan Book of the Fallen' },
  { slug: 'the-crippled-god',     series: 'Malazan Book of the Fallen' },
  // Wheel of Time
  { slug: 'the-eye-of-the-world',    series: 'The Wheel of Time' },
  { slug: 'the-great-hunt',          series: 'The Wheel of Time' },
  { slug: 'the-dragon-reborn',       series: 'The Wheel of Time' },
  { slug: 'the-shadow-rising',       series: 'The Wheel of Time' },
  { slug: 'the-fires-of-heaven',     series: 'The Wheel of Time' },
  { slug: 'lord-of-chaos',           series: 'The Wheel of Time' },
  { slug: 'a-crown-of-swords',       series: 'The Wheel of Time' },
  { slug: 'the-path-of-daggers',     series: 'The Wheel of Time' },
  { slug: 'winters-heart',           series: 'The Wheel of Time' },
  { slug: 'crossroads-of-twilight',  series: 'The Wheel of Time' },
  { slug: 'knife-of-dreams',         series: 'The Wheel of Time' },
  { slug: 'the-gathering-storm',     series: 'The Wheel of Time' },
  { slug: 'towers-of-midnight',      series: 'The Wheel of Time' },
  { slug: 'a-memory-of-light',       series: 'The Wheel of Time' },
  // Kingkiller
  { slug: 'the-name-of-the-wind',              series: 'The Kingkiller Chronicle' },
  { slug: 'the-wise-mans-fear',                series: 'The Kingkiller Chronicle' },
  { slug: 'the-slow-regard-of-silent-things',  series: 'The Kingkiller Chronicle' },
  // Throne of Glass
  { slug: 'throne-of-glass',    series: 'Throne of Glass' },
  { slug: 'the-assassins-blade', series: 'Throne of Glass' },
  { slug: 'crown-of-midnight',   series: 'Throne of Glass' },
  { slug: 'heir-of-fire',        series: 'Throne of Glass' },
  { slug: 'queen-of-shadows',    series: 'Throne of Glass' },
  { slug: 'empire-of-storms',    series: 'Throne of Glass' },
  { slug: 'tower-of-dawn',       series: 'Throne of Glass' },
  { slug: 'kingdom-of-ash',      series: 'Throne of Glass' },
  // Blood and Ash
  { slug: 'from-blood-and-ash',          series: 'Blood and Ash' },
  { slug: 'a-kingdom-of-flesh-and-fire', series: 'Blood and Ash' },
  { slug: 'the-crown-of-gilded-bones',   series: 'Blood and Ash' },
  { slug: 'the-war-of-two-queens',       series: 'Blood and Ash' },
  { slug: 'a-soul-of-ash-and-blood',     series: 'Blood and Ash' },
  { slug: 'a-light-in-the-flame',        series: 'Flesh and Fire' },
  { slug: 'a-fire-in-the-flesh',         series: 'Flesh and Fire' },
  { slug: 'a-veil-of-gods-and-skin',     series: 'Flesh and Fire' },
  // Empyrean
  { slug: 'fourth-wing',   series: 'The Empyrean' },
  { slug: 'iron-flame',    series: 'The Empyrean' },
  { slug: 'onyx-storm',    series: 'The Empyrean' },
  // Drizzt
  { slug: 'homeland',              series: 'The Dark Elf Trilogy' },
  { slug: 'exile',                 series: 'The Dark Elf Trilogy' },
  { slug: 'sojourn',               series: 'The Dark Elf Trilogy' },
  { slug: 'the-crystal-shard',     series: 'Icewind Dale Trilogy' },
  { slug: 'streams-of-silver',     series: 'Icewind Dale Trilogy' },
  { slug: 'the-halflings-gem',     series: 'Icewind Dale Trilogy' },
  { slug: 'the-legacy',            series: 'Legacy of the Drow' },
  { slug: 'starless-night',        series: 'Legacy of the Drow' },
  { slug: 'siege-of-darkness',     series: 'Legacy of the Drow' },
  { slug: 'passage-to-dawn',       series: 'Legacy of the Drow' },
  { slug: 'the-silent-blade',      series: 'Paths of Darkness' },
  { slug: 'the-spine-of-the-world', series: 'Paths of Darkness' },
  { slug: 'servant-of-the-shard',  series: 'Paths of Darkness' },
  { slug: 'sea-of-swords',         series: 'Paths of Darkness' },
  { slug: 'the-thousand-orcs',     series: 'The Hunter\'s Blades Trilogy' },
  { slug: 'gauntlgrym',            series: 'Neverwinter Saga' },
  { slug: 'timeless',              series: 'Generations' },
  // Dragonlance
  { slug: 'dragons-of-autumn-twilight',  series: 'Dragonlance Chronicles' },
  { slug: 'dragons-of-winter-night',     series: 'Dragonlance Chronicles' },
  { slug: 'dragons-of-spring-dawning',   series: 'Dragonlance Chronicles' },
  { slug: 'time-of-the-twins',           series: 'Dragonlance Legends' },
  { slug: 'war-of-the-twins',            series: 'Dragonlance Legends' },
  { slug: 'test-of-the-twins',           series: 'Dragonlance Legends' },
  { slug: 'the-second-generation',       series: 'Dragonlance' },
  { slug: 'dragons-of-summer-flame',     series: 'Dragonlance' },
  // Divergent
  { slug: 'divergent',   series: 'Divergent' },
  { slug: 'insurgent',   series: 'Divergent' },
  { slug: 'allegiant',   series: 'Divergent' },
  // Memory Sorrow and Thorn
  { slug: 'the-dragonbone-chair',   series: 'Memory, Sorrow, and Thorn' },
  { slug: 'stone-of-farewell',      series: 'Memory, Sorrow, and Thorn' },
  { slug: 'to-green-angel-tower',   series: 'Memory, Sorrow, and Thorn' },
  { slug: 'the-witchwood-crown',    series: 'The Last King of Osten Ard' },
  { slug: 'empire-of-grass',        series: 'The Last King of Osten Ard' },
  { slug: 'into-the-narrowdark',    series: 'The Last King of Osten Ard' },
  // Witcher
  { slug: 'the-last-wish',          series: 'The Witcher' },
  { slug: 'sword-of-destiny',       series: 'The Witcher' },
  { slug: 'blood-of-elves',         series: 'The Witcher' },
  { slug: 'time-of-contempt',       series: 'The Witcher' },
  { slug: 'baptism-of-fire',        series: 'The Witcher' },
  { slug: 'the-tower-of-swallows',  series: 'The Witcher' },
  { slug: 'lady-of-the-lake',       series: 'The Witcher' },
  { slug: 'season-of-storms',       series: 'The Witcher' },
  // Dresden Files
  { slug: 'storm-front',    series: 'The Dresden Files' },
  { slug: 'fool-moon',      series: 'The Dresden Files' },
  { slug: 'grave-peril',    series: 'The Dresden Files' },
  { slug: 'summer-knight',  series: 'The Dresden Files' },
  { slug: 'death-masks',    series: 'The Dresden Files' },
  { slug: 'blood-rites',    series: 'The Dresden Files' },
  { slug: 'dead-beat',      series: 'The Dresden Files' },
  { slug: 'proven-guilty',  series: 'The Dresden Files' },
  { slug: 'white-night',    series: 'The Dresden Files' },
  { slug: 'small-favor',    series: 'The Dresden Files' },
  { slug: 'turn-coat',      series: 'The Dresden Files' },
  { slug: 'changes',        series: 'The Dresden Files' },
  { slug: 'ghost-story',    series: 'The Dresden Files' },
  { slug: 'cold-days',      series: 'The Dresden Files' },
  { slug: 'skin-game',      series: 'The Dresden Files' },
  { slug: 'peace-talks',    series: 'The Dresden Files' },
  { slug: 'battle-ground',  series: 'The Dresden Files' },
  { slug: 'side-jobs',      series: 'The Dresden Files' },
  { slug: 'brief-cases',    series: 'The Dresden Files' },
  // Robin Hobb
  { slug: 'assassins-apprentice', series: 'Farseer Trilogy' },
  { slug: 'royal-assassin',       series: 'Farseer Trilogy' },
  { slug: 'assassins-quest',      series: 'Farseer Trilogy' },
  { slug: 'ship-of-magic',        series: 'Liveship Traders' },
  { slug: 'the-mad-ship',         series: 'Liveship Traders' },
  { slug: 'ship-of-destiny',      series: 'Liveship Traders' },
  { slug: 'fools-errand',         series: 'Tawny Man' },
  { slug: 'the-golden-fool',      series: 'Tawny Man' },
  { slug: 'fools-fate',           series: 'Tawny Man' },
  { slug: 'dragon-keeper',        series: 'Rain Wild Chronicles' },
  { slug: 'dragon-haven',         series: 'Rain Wild Chronicles' },
  { slug: 'city-of-dragons',      series: 'Rain Wild Chronicles' },
  { slug: 'blood-of-dragons',     series: 'Rain Wild Chronicles' },
  { slug: 'fools-assassin',       series: 'Fitz and the Fool' },
  { slug: 'fools-quest',          series: 'Fitz and the Fool' },
  { slug: 'assassins-fate',       series: 'Fitz and the Fool' },
  // Kate Daniels
  { slug: 'magic-bites',    series: 'Kate Daniels' },
  { slug: 'magic-burns',    series: 'Kate Daniels' },
  { slug: 'magic-strikes',  series: 'Kate Daniels' },
  { slug: 'magic-bleeds',   series: 'Kate Daniels' },
  { slug: 'magic-slays',    series: 'Kate Daniels' },
  { slug: 'magic-rises',    series: 'Kate Daniels' },
  { slug: 'magic-breaks',   series: 'Kate Daniels' },
  { slug: 'magic-shifts',   series: 'Kate Daniels' },
  { slug: 'magic-binds',    series: 'Kate Daniels' },
  { slug: 'magic-triumphs', series: 'Kate Daniels' },
  { slug: 'gunmetal-magic', series: 'Kate Daniels' },
  { slug: 'iron-and-magic', series: 'The Iron Covenant' },
  { slug: 'blood-heir',     series: 'Kate Daniels World' },
  { slug: 'magic-tides',    series: 'Kate Daniels World' },
  { slug: 'magic-claims',   series: 'Kate Daniels World' },
  // Black Company
  { slug: 'the-black-company',   series: 'The Black Company' },
  { slug: 'shadows-linger',      series: 'The Black Company' },
  { slug: 'the-white-rose',      series: 'The Black Company' },
  { slug: 'shadow-games',        series: 'The Black Company' },
  { slug: 'dreams-of-steel',     series: 'The Black Company' },
  { slug: 'bleak-seasons',       series: 'The Black Company' },
  { slug: 'she-is-the-darkness', series: 'The Black Company' },
  { slug: 'water-sleeps',        series: 'The Black Company' },
  { slug: 'soldiers-live',       series: 'The Black Company' },
  // Pern
  { slug: 'dragonflight',   series: 'Dragonriders of Pern' },
  { slug: 'dragonquest',    series: 'Dragonriders of Pern' },
  { slug: 'the-white-dragon', series: 'Dragonriders of Pern' },
  { slug: 'dragonsong',     series: 'Harper Hall' },
  { slug: 'dragonsinger',   series: 'Harper Hall' },
  { slug: 'dragondrums',    series: 'Harper Hall' },
  { slug: 'dragonsdawn',    series: 'Dragonriders of Pern' },
  // Inheritance Cycle
  { slug: 'eragon',       series: 'The Inheritance Cycle' },
  { slug: 'eldest',       series: 'The Inheritance Cycle' },
  { slug: 'brisingr',     series: 'The Inheritance Cycle' },
  { slug: 'inheritance',  series: 'The Inheritance Cycle' },
  { slug: 'murtagh',      series: 'The Inheritance Cycle' },
  // Grishaverse
  { slug: 'shadow-and-bone',   series: 'Shadow and Bone' },
  { slug: 'siege-and-storm',   series: 'Shadow and Bone' },
  { slug: 'ruin-and-rising',   series: 'Shadow and Bone' },
  { slug: 'six-of-crows',      series: 'Six of Crows' },
  { slug: 'crooked-kingdom',   series: 'Six of Crows' },
  { slug: 'king-of-scars',     series: 'King of Scars' },
  { slug: 'rule-of-wolves',    series: 'King of Scars' },
  // Shannara
  { slug: 'the-sword-of-shannara',    series: 'The Original Shannara Trilogy' },
  { slug: 'the-elfstones-of-shannara', series: 'The Original Shannara Trilogy' },
  { slug: 'the-wishsong-of-shannara', series: 'The Original Shannara Trilogy' },
  { slug: 'the-scions-of-shannara',   series: 'The Heritage of Shannara' },
  { slug: 'the-druid-of-shannara',    series: 'The Heritage of Shannara' },
  { slug: 'the-elf-queen-of-shannara', series: 'The Heritage of Shannara' },
  { slug: 'the-talismans-of-shannara', series: 'The Heritage of Shannara' },
  { slug: 'running-with-the-demon',   series: 'Word & Void' },
  { slug: 'a-knight-of-the-word',     series: 'Word & Void' },
  { slug: 'angel-fire-east',          series: 'Word & Void' },
  { slug: 'ilse-witch',               series: 'Voyage of the Jerle Shannara' },
  { slug: 'jarka-ruus',               series: 'High Druid of Shannara' },
  { slug: 'the-black-elfstone',       series: 'The Fall of Shannara' },
  { slug: 'the-last-druid',           series: 'The Fall of Shannara' },
  // Valdemar
  { slug: 'arrows-of-the-queen', series: 'Heralds of Valdemar' },
  { slug: 'arrows-flight',       series: 'Heralds of Valdemar' },
  { slug: 'arrows-fall',         series: 'Heralds of Valdemar' },
  { slug: 'magics-pawn',         series: 'The Last Herald-Mage' },
  { slug: 'magics-promise',      series: 'The Last Herald-Mage' },
  { slug: 'magics-price',        series: 'The Last Herald-Mage' },
  { slug: 'winds-of-fate',       series: 'Mage Winds' },
  { slug: 'winds-of-change',     series: 'Mage Winds' },
  { slug: 'winds-of-fury',       series: 'Mage Winds' },
  { slug: 'storm-warning',       series: 'Mage Storms' },
  { slug: 'storm-rising',        series: 'Mage Storms' },
  { slug: 'storm-breaking',      series: 'Mage Storms' },
  // ASOIAF
  { slug: 'a-game-of-thrones',   series: 'A Song of Ice and Fire' },
  { slug: 'a-clash-of-kings',    series: 'A Song of Ice and Fire' },
  { slug: 'a-storm-of-swords',   series: 'A Song of Ice and Fire' },
  { slug: 'a-feast-for-crows',   series: 'A Song of Ice and Fire' },
  { slug: 'a-dance-with-dragons', series: 'A Song of Ice and Fire' },
];

// ── Main ──────────────────────────────────────────────────────────────────────

const slugs = READING_ORDER_SERIES.map(b => b.slug);
const { data: dbBooks, error } = await supabase
  .from('books')
  .select('slug, title, series')
  .in('slug', slugs);

if (error) { console.error('DB error:', error.message); process.exit(1); }

const dbMap = new Map((dbBooks ?? []).map(b => [b.slug, b]));

const toFix = READING_ORDER_SERIES.filter(entry => {
  const db = dbMap.get(entry.slug);
  return db && !db.series;
});

console.log(`\n📚 Books with missing series: ${toFix.length}`);
if (toFix.length === 0) { console.log('✅  All series names are set.'); process.exit(0); }

console.log('');
let fixed = 0, failed = 0;

for (const entry of toFix) {
  const db = dbMap.get(entry.slug);
  process.stdout.write(`  "${db.title}" → "${entry.series}" … `);
  if (DRY_RUN) { console.log('(dry run)'); continue; }
  const { error: updateErr } = await supabase
    .from('books')
    .update({ series: entry.series })
    .eq('slug', entry.slug);
  if (updateErr) { console.log(`✗ ${updateErr.message}`); failed++; }
  else { console.log('✓'); fixed++; }
  await sleep(DELAY_MS);
}

if (!DRY_RUN) {
  console.log(`\n✅ Fixed: ${fixed} | ✗ Failed: ${failed}`);
}
