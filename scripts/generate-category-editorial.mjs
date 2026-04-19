/**
 * generate-category-editorial.mjs
 *
 * Generates intro + howToUse editorial copy for each category × list type
 * and writes it directly into src/data/categories-meta.ts.
 *
 * Usage:
 *   node scripts/generate-category-editorial.mjs               — all categories, all list types
 *   node scripts/generate-category-editorial.mjs --cat epic    — single category
 *   node scripts/generate-category-editorial.mjs --list allTimeGreats
 *   node scripts/generate-category-editorial.mjs --dry-run
 *   node scripts/generate-category-editorial.mjs --force       — overwrite existing
 */

import { getGeminiModel } from './lib/gemini.mjs';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATEGORIES_META_PATH = path.join(__dirname, '../src/data/categories-meta.ts');

const DRY_RUN  = process.argv.includes('--dry-run');
const FORCE    = process.argv.includes('--force');
const CAT_ARG  = process.argv.indexOf('--cat');
const CAT      = CAT_ARG !== -1 ? process.argv[CAT_ARG + 1] : null;
const LIST_ARG = process.argv.indexOf('--list');
const LIST     = LIST_ARG !== -1 ? process.argv[LIST_ARG + 1] : null;

const DELAY_MS = 1500;

const model = getGeminiModel('gemini-2.5-pro');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Category metadata (mirrors categories-meta.ts) ────────────────────────���───

const CATEGORIES = {
  epic: {
    name: 'Epic & High Fantasy',
    description: 'large-scale world-building, magic systems, war and politics, long series, often 500+ page books. The genre of Tolkien, Jordan, and Sanderson.',
    examplesAll: ['The Way of Kings', 'Gardens of the Moon', 'The Name of the Wind', 'The Lies of Locke Lamora'],
    examplesStart: ['The Hobbit', 'Warbreaker', 'The Goblin Emperor', 'Blood Song'],
    examplesGems: ['The Traitor Baru Cormorant', 'The Tainted Cup', 'The Bone Ships', 'Tigana'],
  },
  romantasy: {
    name: 'Romantasy',
    description: 'romantic plots at the center of a fantasy world, slow-burn or steamy, fae courts, dragon riders, enemies-to-lovers. Dominated by SJM and BookTok. Heat ratings matter here.',
    examplesAll: ['A Court of Thorns and Roses', 'Fourth Wing', 'The Cruel Prince', 'From Blood and Ash'],
    examplesStart: ['Shadow and Bone', 'Divine Rivals', 'An Ember in the Ashes', 'Strange the Dreamer'],
    examplesGems: ['The Shadows Between Us', 'The Midnight Bargain', 'A Marvellous Light', 'Thornhedge'],
  },
  swords: {
    name: 'Sword & Sorcery',
    description: 'action-driven, morally grey protagonists, thieves and assassins, gritty adventure, magic is rare and dangerous. The genre of Leiber, Howard, and Abercrombie.',
    examplesAll: ['The Lies of Locke Lamora', 'The Blade Itself', 'Nevernight', 'The Black Company'],
    examplesStart: ['Blood Song', 'The Blacktongue Thief', 'Half a King', 'A Deadly Education'],
    examplesGems: ['The Gutter Prayer', 'The Court of Broken Knives', 'The Vagrant', 'The Ember Blade'],
  },
  dark: {
    name: 'Dark Fantasy',
    description: 'horror-adjacent fantasy, morally complex characters, death has weight, atmosphere of dread or nihilism. Broader than grimdark — includes gothic, folk horror, dark academia.',
    examplesAll: ['The Poppy War', 'Prince of Thorns', 'The Fifth Season', 'Gardens of the Moon'],
    examplesStart: ['The Bear and the Nightingale', 'Mexican Gothic', 'Spinning Silver', 'Piranesi'],
    examplesGems: ['The Vagrant', 'Beyond Redemption', 'The Ember Blade', 'The Tainted Cup'],
  },
  urban: {
    name: 'Urban & Contemporary Fantasy',
    description: 'magic exists in the real (modern) world — cities, detectives, bookshops, mundane life disrupted by the supernatural. From cosy to noir.',
    examplesAll: ['Storm Front', 'American Gods', 'The Night Circus', 'Good Omens'],
    examplesStart: ['Neverwhere', 'Piranesi', 'The Invisible Life of Addie LaRue', 'Coraline'],
    examplesGems: ['Sandman Slim', 'Witch King', 'The Library at Mount Char', 'Libriomancer'],
  },
  grimdark: {
    name: 'Grimdark',
    description: 'war is brutal, heroes die, morality is absent, the world grinds people down. High darkness ratings (4-5). Not for every reader — but the best books in the genre earn every dark moment.',
    examplesAll: ['The Blade Itself', 'The Black Company', 'Prince of Thorns', 'The Poppy War'],
    examplesStart: ['Best Served Cold', 'Half a King', 'Kings of the Wyld', 'The Poppy War'],
    examplesGems: ['Beyond Redemption', 'The Court of Broken Knives', 'The Traitor Baru Cormorant', 'The Ember Blade'],
  },
  historical: {
    name: 'Historical Fantasy',
    description: 'real historical settings (or close analogues) with magic layered on top — from Regency England with magicians to ancient Greece retold through myth.',
    examplesAll: ['Jonathan Strange & Mr Norrell', 'Circe', 'The Bear and the Nightingale', 'The Song of Achilles'],
    examplesStart: ['Uprooted', 'Spinning Silver', 'Norse Mythology', 'Circe'],
    examplesGems: ['The Glamourist Histories', 'The Watchmaker of Filigree Street', 'A Dead Djinn in Cairo', 'The Night Tiger'],
  },
  academy: {
    name: 'Academy Fantasy',
    description: 'magic schools, training academies, chosen students learning to master power. From the cosy (Harry Potter) to the brutal (Nevernight) to the deconstructive (A Deadly Education).',
    examplesAll: ["Harry Potter and the Sorcerer's Stone", 'Fourth Wing', 'The Name of the Wind', 'Nevernight'],
    examplesStart: ['Eragon', 'An Ember in the Ashes', 'A Deadly Education', 'Shadow and Bone'],
    examplesGems: ['Ninth House', 'Gifted', 'The Last Magician', 'In Other Lands'],
  },
  mythology: {
    name: 'Mythic & Folklore Fantasy',
    description: 'direct engagement with mythology — retellings, living gods, folk horror, fairy tales. Circe, Norse myths, Greek epics, Slavic folklore.',
    examplesAll: ['Circe', 'The Song of Achilles', 'American Gods', 'Norse Mythology'],
    examplesStart: ['The Penelopiad', 'Norse Mythology', 'Anansi Boys', 'Stardust'],
    examplesGems: ['Lavinia', 'The King Must Die', "The Witch's Heart", 'The Silence of the Girls'],
  },
  cozy: {
    name: 'Cozy Fantasy',
    description: 'low stakes, warm atmosphere, found family, bookshops and coffee. No graphic violence, often closed-door romance. Darkness ratings 1-2 only.',
    examplesAll: ['Legends & Lattes', 'The House in the Cerulean Sea', "Howl's Moving Castle", 'A Psalm for the Wild-Built'],
    examplesStart: ['A Psalm for the Wild-Built', 'The Goblin Emperor', 'Piranesi', 'Nettle & Bone'],
    examplesGems: ['The Very Secret Society of Irregular Witches', "A Wizard's Guide to Defensive Baking", 'In Other Lands', 'Thornhedge'],
  },
  litrpg: {
    name: 'LitRPG / Progression Fantasy',
    description: 'game mechanics in fantasy worlds, characters levelling up, status screens, skill trees. Mostly web serial or self-published. Cradle, Dungeon Crawler Carl, He Who Fights with Monsters.',
    examplesAll: ['Dungeon Crawler Carl', 'He Who Fights With Monsters', 'Cradle', 'The Wandering Inn'],
    examplesStart: ['Cradle', 'He Who Fights With Monsters', 'Dungeon Crawler Carl', 'Beware of Chicken'],
    examplesGems: ['The Legend of Randidly Ghosthound', 'Forge of Destiny', 'All the Skills', 'Heretical Fishing'],
  },
  'science-fantasy': {
    name: 'Science Fantasy',
    description: 'the border between SF and fantasy — space opera with magic, far-future mythology, dying-earth. Dune, Gideon the Ninth, The Book of the New Sun.',
    examplesAll: ['Dune', 'Red Rising', 'Gideon the Ninth', 'Hyperion'],
    examplesStart: ['Dune', 'Red Rising', 'All Systems Red', 'Project Hail Mary'],
    examplesGems: ['The Book of the New Sun', 'Dying Earth', 'The Stars My Destination', 'Light from Uncommon Stars'],
  },
};

const LIST_TYPES = {
  allTimeGreats: {
    label: 'All-Time Greats',
    purpose: 'the canonical greats — books that defined the genre, won awards, or shaped what came after. Not necessarily the most accessible or popular, but the most important.',
  },
  startWith: {
    label: 'Best to Start With',
    purpose: 'entry points for new readers — lower darkness, cleaner structure, not overwhelming. Books that hook readers on the genre without punishing them for being new.',
  },
  hiddenGems: {
    label: 'Hidden Gems',
    purpose: 'overlooked, underrated, or niche picks that serious fans love but most readers haven\'t heard of. Lower Goodreads ratings often because smaller audiences — not because they\'re worse.',
  },
};

function buildPrompt(catSlug, listType) {
  const cat = CATEGORIES[catSlug];
  const list = LIST_TYPES[listType];
  const examplesKey = listType === 'allTimeGreats' ? 'examplesAll'
    : listType === 'startWith' ? 'examplesStart'
    : 'examplesGems';
  const examples = cat[examplesKey].join(', ');

  return `You are the editorial voice of The Grimoire, a fantasy book discovery site.
Write editorial copy for the "${list.label}" list on the "${cat.name}" category page.

Category: ${cat.name}
What this category covers: ${cat.description}
List purpose: ${list.purpose}
Example books in this list: ${examples}

Return ONLY a JSON object with exactly two keys. No markdown, no code blocks.

{
  "intro": "<3-4 sentences introducing this specific list for this specific genre. Be concrete about what qualifies a book for this list and what makes the Grimoire's list different from a generic 'best of' list. Mention that every book has a darkness rating (🕯️ 1-5) and heat rating (🔥) so readers know what they're getting into. Third-person editorial voice, no 'you', direct and opinionated.>",
  "howToUse": "<2-3 sentences giving different readers a navigation guide. Tell a specific type of reader where to start based on what they want — reference actual subgenre preferences, darkness tolerance, or series length. Be specific, not generic — name preferences not types of reader.>"
}

Style rules:
- Authoritative, slightly opinionated — like a well-read friend, not a marketing copywriter
- Vary sentence length: mix short punchy sentences with longer analytical ones
- NEVER USE: delve, tapestry, testament, vibrant, masterpiece, must-read, journey (as metaphor), realm, captivating, spellbinding, thrilling, fans will love
- No markdown in the output strings — plain prose only
- Third-person editorial throughout — no "you" or "I"`;
}

async function generateEditorial(catSlug, listType) {
  const prompt = buildPrompt(catSlug, listType);
  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();

  const candidates = [
    raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim(),
    (raw.match(/\{[\s\S]*\}/) ?? [])[0] ?? '',
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const parsed = JSON.parse(candidate);
      if (parsed.intro && parsed.howToUse) return parsed;
    } catch { /* try next */ }
  }

  console.warn('  ⚠ Could not parse JSON. Raw:', raw.slice(0, 200));
  return null;
}

// ── Patch categories-meta.ts in-place ─────────────────────────────────────────

function escapeForTs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function buildEditorialBlock(catSlug, allEditorial) {
  const parts = [];
  for (const [listType, content] of Object.entries(allEditorial)) {
    if (!content) continue;
    parts.push(`      ${listType}: {
        intro: \`${escapeForTs(content.intro)}\`,
        howToUse: \`${escapeForTs(content.howToUse)}\`,
      }`);
  }
  if (!parts.length) return null;
  return `    editorial: {\n${parts.join(',\n')},\n    },`;
}

function patchCategoriesMeta(catSlug, editorialBlock) {
  let source = fs.readFileSync(CATEGORIES_META_PATH, 'utf8');

  // Pattern: find the category block and either replace existing editorial or insert before closing brace
  const escapedSlug = catSlug.replace(/-/g, '[-]');
  const catPattern = new RegExp(
    `(  (?:'${escapedSlug}'|${escapedSlug}): \\{[\\s\\S]*?)(\\n  \\},)`,
    'g'
  );

  let patched = false;
  source = source.replace(catPattern, (match, body, closing) => {
    patched = true;
    // Remove existing editorial block if present
    const cleanBody = body.replace(/\n    editorial: \{[\s\S]*?\n    \},/, '');
    return `${cleanBody}\n${editorialBlock}${closing}`;
  });

  if (!patched) {
    console.warn(`  ⚠ Could not find category "${catSlug}" in categories-meta.ts`);
    return false;
  }

  fs.writeFileSync(CATEGORIES_META_PATH, source, 'utf8');
  return true;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const catSlugs = CAT ? [CAT] : Object.keys(CATEGORIES);
  const listTypes = LIST ? [LIST] : Object.keys(LIST_TYPES);

  console.log(`\n✍️  Category Editorial Generator`);
  console.log(`   Categories: ${catSlugs.join(', ')}`);
  console.log(`   List types: ${listTypes.join(', ')}`);
  if (DRY_RUN) console.log('   [DRY RUN — no file writes]\n');
  else console.log('');

  let updated = 0;
  let failed = 0;

  for (const catSlug of catSlugs) {
    if (!(catSlug in CATEGORIES)) {
      console.warn(`⚠  Unknown category: ${catSlug}`);
      continue;
    }

    console.log(`\n${CATEGORIES[catSlug].name} (${catSlug})`);
    const catEditorial = {};

    for (const listType of listTypes) {
      process.stdout.write(`  ${LIST_TYPES[listType].label.padEnd(20)} `);

      let content;
      try {
        content = await generateEditorial(catSlug, listType);
      } catch (err) {
        console.log(`✗ ${err.message}`);
        failed++;
        await sleep(DELAY_MS);
        continue;
      }

      if (!content) {
        console.log('✗ parse error');
        failed++;
        await sleep(DELAY_MS);
        continue;
      }

      catEditorial[listType] = content;

      if (DRY_RUN) {
        console.log('✓ [dry run]');
        console.log(`    intro: ${content.intro.slice(0, 80)}…`);
        console.log(`    howToUse: ${content.howToUse.slice(0, 80)}…`);
      } else {
        console.log('✓');
      }

      await sleep(DELAY_MS);
    }

    if (!DRY_RUN && Object.keys(catEditorial).length > 0) {
      const block = buildEditorialBlock(catSlug, catEditorial);
      if (block && patchCategoriesMeta(catSlug, block)) {
        updated++;
      } else {
        failed++;
      }
    }
  }

  console.log('\n──────────────────────────────────');
  console.log(`✅  Categories updated: ${updated}`);
  if (failed) console.log(`✗   Failed: ${failed}`);
  console.log('');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
