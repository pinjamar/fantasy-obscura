/**
 * classify-creatures.mjs
 *
 * Uses Gemini Flash to classify which creatures / races prominently feature
 * in each book where `creatures IS NULL`. Uses real-world knowledge of the
 * published book first; synopsis and genres are supplementary.
 *
 * Valid creature slugs stored as text[] in the DB:
 *   dragon       — Dragons, Wyverns
 *   dragonkin    — Dragon-blooded humanoids, half-dragons, draconic races (e.g. Dragonborn)
 *   fae          — Fae, Faeries, Fair Folk, Sidhe, Unseelie/Seelie courts
 *   elf          — Elves: wood elf, dark elf, drow, high elf, Tolkien-style elves
 *   dwarf        — Dwarves
 *   halfling     — Halflings, Hobbits, Small folk
 *   orc          — Orcs
 *   goblin       — Goblins
 *   troll        — Trolls
 *   ogre         — Ogres
 *   giant        — Giants, Titans, Frost Giants, Colossi
 *   vampire      — Vampires, Dhampirs
 *   werewolf     — Werewolves, Lycanthropes (wolf-form shifters)
 *   demon        — Demons, Hellish entities
 *   devil        — Devils, Infernal beings (distinct from demons — lawful evil, e.g. D&D Devils)
 *   angel        — Angels, Celestials, Seraphim
 *   ghost        — Ghosts, Apparitions, non-corporeal haunting entities
 *   zombie       — Zombies, Revenants, animated corpses
 *   lich         — Liches, undead spellcasters who retain intelligence
 *   shapeshifter — Shapeshifters, Kitsune, Skinwalkers, Were-creatures (non-wolf)
 *   mermaid      — Mermaids, Merfolk, Selkies, Sirens, Kelpies
 *   catfolk      — Catfolk, Tabaxi, feline humanoids
 *   minotaur     — Minotaurs, bull-headed humanoids
 *   centaur      — Centaurs, horse-human hybrids
 *   satyr        — Satyrs, Fauns, goat-human hybrids
 *   dryad        — Dryads, tree spirits / plant-bonded fae
 *   nymph        — Nymphs, nature spirits in humanoid form
 *   beastfolk    — General beastfolk / animal-human hybrids not covered by a specific slug
 *
 * Books with no notable creatures get creatures = [] (empty array, never NULL after classification).
 *
 * Usage:
 *   node scripts/classify-creatures.mjs               (fill all NULL)
 *   node scripts/classify-creatures.mjs --dry-run     (preview without writing)
 *   node scripts/classify-creatures.mjs --limit 50    (process only 50 books)
 *   node scripts/classify-creatures.mjs --reclassify  (redo all books, including already classified)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN     = process.argv.includes('--dry-run');
const RECLASSIFY  = process.argv.includes('--reclassify');
const LIMIT_ARG   = process.argv.indexOf('--limit');
const LIMIT       = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const BATCH_SIZE  = 8;
const DELAY_MS    = 900;

if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env');
  process.exit(1);
}
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: 'gemini-2.5-flash' });
const supabase  = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const VALID_CREATURES = [
  'dragon',
  'dragonkin',
  'fae',
  'elf',
  'dwarf',
  'halfling',
  'orc',
  'goblin',
  'troll',
  'ogre',
  'giant',
  'vampire',
  'werewolf',
  'demon',
  'devil',
  'angel',
  'ghost',
  'zombie',
  'lich',
  'shapeshifter',
  'mermaid',
  'catfolk',
  'minotaur',
  'centaur',
  'satyr',
  'dryad',
  'nymph',
  'beastfolk',
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchBooks() {
  let query = supabase
    .from('books')
    .select('id, title, authors, synopsis, subgenres, tropes, publication_year')
    .order('title');

  if (!RECLASSIFY) {
    query = query.is('creatures', null);
  }

  if (LIMIT) query = query.limit(LIMIT);

  const { data, error } = await query;
  if (error) { console.error('Supabase error:', error.message); process.exit(1); }
  return data || [];
}

async function classifyBatch(books) {
  const bookList = books.map((b, i) => `[${i + 1}] ID: ${b.id}
Title: "${b.title}" by ${b.authors?.join(', ') || 'Unknown'}
Year: ${b.publication_year ?? 'Unknown'}
Genres: ${b.subgenres?.join(', ') || 'Fantasy'}
Tropes: ${b.tropes?.join(', ') || 'N/A'}
Synopsis: ${(b.synopsis || '').slice(0, 250) || 'N/A'}`).join('\n\n');

  const prompt = `You are a fantasy book creature/race classifier with expert knowledge of the genre.
For each book, list which creature or race types prominently feature in the story — as major characters, antagonists, or central elements of the world.

Only tag creatures that play a meaningful role. Do NOT tag a creature just because it is briefly mentioned, appears as a background element, or is only part of the setting's lore without story presence.

VALID CREATURE SLUGS — only use these exact values:
  "dragon"       — Dragons, Wyverns
  "dragonkin"    — Dragon-blooded humanoids, half-dragons, draconic races (e.g. Dragonborn)
  "fae"          — Fae, Faeries, Fair Folk, Sidhe, Unseelie/Seelie courts
  "elf"          — Elves: wood elf, dark elf, drow, high elf, Tolkien-style elves
  "dwarf"        — Dwarves
  "halfling"     — Halflings, Hobbits, Small folk
  "orc"          — Orcs
  "goblin"       — Goblins
  "troll"        — Trolls
  "ogre"         — Ogres
  "giant"        — Giants, Titans, Frost Giants, Colossi
  "vampire"      — Vampires, Dhampirs
  "werewolf"     — Werewolves, Lycanthropes (wolf-form shifters)
  "demon"        — Demons, Hellish entities
  "devil"        — Devils, Infernal lawful-evil beings (distinct from chaotic demons)
  "angel"        — Angels, Celestials, Seraphim
  "ghost"        — Ghosts, Apparitions, non-corporeal haunting entities
  "zombie"       — Zombies, Revenants, animated corpses
  "lich"         — Liches, undead spellcasters who retain intelligence
  "shapeshifter" — Shapeshifters, Kitsune, Skinwalkers, Were-creatures (non-wolf)
  "mermaid"      — Mermaids, Merfolk, Selkies, Sirens, Kelpies
  "catfolk"      — Catfolk, Tabaxi, feline humanoids
  "minotaur"     — Minotaurs, bull-headed humanoids
  "centaur"      — Centaurs, horse-human hybrids
  "satyr"        — Satyrs, Fauns, goat-human hybrids
  "dryad"        — Dryads, tree spirits or plant-bonded fae
  "nymph"        — Nymphs, nature spirits in humanoid form
  "beastfolk"    — General beastfolk / animal-human hybrids not covered by a specific slug above

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown:
[{"id":"<uuid>","creatures":["slug1","slug2"]},...]

Rules:
- Include every book in the response.
- Return [] for books with no notable creatures (e.g. a human-only political fantasy).
- Only use slugs from the exact list above.
- A book where elves are a minor background race should NOT get ["elf"] — they must play a meaningful role.
- Use "beastfolk" only for animal-humanoids not covered by catfolk, minotaur, centaur, satyr, or werewolf.
- Orcs and goblins are separate slugs — tag both if both are meaningfully present.
- If humans are the only meaningful characters, return [].`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  console.log(`\n🐉  Creature Classifier${DRY_RUN ? ' [DRY RUN]' : ''}${RECLASSIFY ? ' [RECLASSIFY ALL]' : ''}\n`);

  const books = await fetchBooks();

  if (!books.length) {
    console.log('✅ All books already classified — nothing to do.');
    return;
  }

  console.log(`Found ${books.length} books to classify`);
  console.log(`  Batch size: ${BATCH_SIZE}  ·  Batches: ${Math.ceil(books.length / BATCH_SIZE)}\n`);

  let updated = 0;
  let failed  = 0;

  for (let i = 0; i < books.length; i += BATCH_SIZE) {
    const batch        = books.slice(i, i + BATCH_SIZE);
    const batchNum     = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(books.length / BATCH_SIZE);

    process.stdout.write(`Batch ${batchNum}/${totalBatches}  `);

    let results;
    try {
      results = await classifyBatch(batch);
    } catch (err) {
      console.log(`✗ Gemini error: ${err.message}`);
      failed += batch.length;
      await sleep(DELAY_MS);
      continue;
    }

    console.log('');

    for (const result of results) {
      const book = batch.find((b) => b.id === result.id);
      if (!book) continue;

      const creatures = (result.creatures || []).filter((c) => VALID_CREATURES.includes(c));
      const invalid   = (result.creatures || []).filter((c) => !VALID_CREATURES.includes(c));

      if (invalid.length) {
        console.warn(`  ⚠️  "${book.title}": unknown slugs ignored: ${invalid.join(', ')}`);
      }

      const display = creatures.length ? creatures.join(', ') : '(none)';
      const line = `  ${book.title.slice(0, 45).padEnd(45)} → [${display}]`;

      if (DRY_RUN) {
        console.log(`[dry] ${line}`);
        updated++;
        continue;
      }

      const { error: updateError } = await supabase
        .from('books')
        .update({ creatures })
        .eq('id', book.id);

      if (updateError) {
        console.log(`  ✗ ${book.title}: ${updateError.message}`);
        failed++;
      } else {
        console.log(`  ✓ ${line}`);
        updated++;
      }
    }

    if (i + BATCH_SIZE < books.length) await sleep(DELAY_MS);
  }

  console.log(`\n──────────────────────────────`);
  console.log(`✅ Updated:  ${updated}`);
  if (failed) console.log(`✗  Failed:   ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
