/**
 * classify-tropes.mjs
 *
 * Uses Claude Haiku to classify which tropes prominently feature in each book
 * where `tropes IS NULL`. Uses real-world knowledge of the published book first;
 * synopsis and genres are supplementary.
 *
 * Valid trope names stored as text[] in the DB (69 canonical tropes):
 *
 * CHARACTER
 *   Anti-Hero, Assassin Protagonist, Chosen One, Cursed Character, Dark Lord,
 *   Dragon Rider, Immortal Character, Last Of Their Kind, Lost Heir, Mentor Figure,
 *   Morally Grey Hero, Outcast Hero, Prophecy Child, Reluctant Hero, Secret Royalty,
 *   Villain Protagonist
 *
 * RELATIONSHIP
 *   Betrayal, Bodyguard Romance, Enemies to Lovers, Fated Mates, Forbidden Romance,
 *   Forced Proximity, Found Family, Grumpy x Sunshine, Love Triangle, Mentor and Student,
 *   Political Marriage, Redemption Arc, Rivals to Allies, Second Chance Romance, Slow Burn
 *
 * PLOT
 *   Ancient Evil Awakens, Coming of Age, End of the World Stakes, Heist, Hero Becomes Villain,
 *   Hidden Society, Magical Plague, Political Intrigue, Power at a Cost, Prophecy,
 *   Pyrrhic Victory, Quest, Rebellion, Revenge Story, Secret Identity, Succession Crisis,
 *   Survival Journey, Tournament Arc, Trial by Combat, War Between Kingdoms
 *
 * WORLD & MAGIC
 *   Blood Magic, Curse Breaking, Desert Kingdom, Divine Magic, Dying Empire,
 *   Elemental Magic, Fae Court Drama, Floating Islands, Forbidden Magic, Frozen Wasteland,
 *   Gothic Castle, Magic Tournament, Magical Artifacts, Necromancy, Pirate Fantasy,
 *   Sentient Weapon, Underground City, Viking-Inspired World
 *
 * Books with no notable tropes get tropes = [] (empty array, never NULL after classification).
 *
 * Usage:
 *   node scripts/classify-tropes.mjs               (fill all NULL)
 *   node scripts/classify-tropes.mjs --dry-run     (preview without writing)
 *   node scripts/classify-tropes.mjs --limit 50    (process only 50 books)
 *   node scripts/classify-tropes.mjs --reclassify  (redo all books, including already classified)
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN    = process.argv.includes('--dry-run');
const RECLASSIFY = process.argv.includes('--reclassify');
const LIMIT_ARG  = process.argv.indexOf('--limit');
const LIMIT      = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const BATCH_SIZE = 6;
const DELAY_MS   = 900;

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY in .env');
  process.exit(1);
}
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars in .env');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase  = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const VALID_TROPES = [
  // Character
  'Anti-Hero', 'Assassin Protagonist', 'Chosen One', 'Cursed Character', 'Dark Lord',
  'Dragon Rider', 'Immortal Character', 'Last Of Their Kind', 'Lost Heir', 'Mentor Figure',
  'Morally Grey Hero', 'Outcast Hero', 'Prophecy Child', 'Reluctant Hero', 'Secret Royalty',
  'Villain Protagonist',
  // Relationship
  'Betrayal', 'Bodyguard Romance', 'Enemies to Lovers', 'Fated Mates', 'Forbidden Romance',
  'Forced Proximity', 'Found Family', 'Grumpy x Sunshine', 'Love Triangle', 'Mentor and Student',
  'Political Marriage', 'Redemption Arc', 'Rivals to Allies', 'Second Chance Romance', 'Slow Burn',
  // Plot
  'Ancient Evil Awakens', 'Coming of Age', 'End of the World Stakes', 'Heist', 'Hero Becomes Villain',
  'Hidden Society', 'Magical Plague', 'Political Intrigue', 'Power at a Cost', 'Prophecy',
  'Pyrrhic Victory', 'Quest', 'Rebellion', 'Revenge Story', 'Secret Identity', 'Succession Crisis',
  'Survival Journey', 'Tournament Arc', 'Trial by Combat', 'War Between Kingdoms',
  // World & Magic
  'Blood Magic', 'Curse Breaking', 'Desert Kingdom', 'Divine Magic', 'Dying Empire',
  'Elemental Magic', 'Fae Court Drama', 'Floating Islands', 'Forbidden Magic', 'Frozen Wasteland',
  'Gothic Castle', 'Magic Tournament', 'Magical Artifacts', 'Necromancy', 'Pirate Fantasy',
  'Sentient Weapon', 'Underground City', 'Viking-Inspired World',
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchBooks() {
  let query = supabase
    .from('books')
    .select('id, title, authors, synopsis, subgenres, publication_year')
    .order('title');

  if (!RECLASSIFY) {
    query = query.is('tropes', null);
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
Synopsis: ${(b.synopsis || '').slice(0, 300) || 'N/A'}`).join('\n\n');

  const prompt = `You are a fantasy book trope classifier with expert knowledge of the genre.
For each book, list which tropes are meaningfully present — as central plot drivers, defining character archetypes, or prominent story dynamics.

Only tag tropes that play a real role. Do NOT tag a trope because it is faintly implied or peripherally present.

VALID TROPE NAMES — use these exact strings only:

CHARACTER TROPES:
  "Anti-Hero"            — Morally complex or flawed main character
  "Assassin Protagonist" — The main character is a trained killer
  "Chosen One"           — Protagonist marked by destiny or prophecy
  "Cursed Character"     — A character bound by magical curse
  "Dark Lord"            — A powerful evil ruler threatening the world
  "Dragon Rider"         — A character bonded to or riding dragons
  "Immortal Character"   — A character who cannot die naturally
  "Last Of Their Kind"   — Sole survivor of their race, people, or lineage
  "Lost Heir"            — A hidden heir to a throne or power
  "Mentor Figure"        — A wise guide who shapes the protagonist (and may not survive)
  "Morally Grey Hero"    — Hero operating outside clear moral lines
  "Outcast Hero"         — Protagonist rejected by society
  "Prophecy Child"       — Character born into or shaped by prophecy
  "Reluctant Hero"       — Hero who does not initially seek their role
  "Secret Royalty"       — Protagonist unaware of their royal lineage
  "Villain Protagonist"  — The main character is or becomes the antagonist

RELATIONSHIP TROPES:
  "Betrayal"              — A trusted ally betrays the protagonist
  "Bodyguard Romance"     — A protector falls for the protected
  "Enemies to Lovers"     — Rivals develop romantic feelings
  "Fated Mates"           — Two characters bound by destiny
  "Forbidden Romance"     — A romance forbidden by society or duty
  "Forced Proximity"      — Characters must stay physically close
  "Found Family"          — Unrelated characters form deep familial bonds
  "Grumpy x Sunshine"     — Opposite personalities clash and attract
  "Love Triangle"         — Three characters entangled romantically
  "Mentor and Student"    — A guiding teacher and protégé bond
  "Political Marriage"    — Marriage arranged for power or alliance
  "Redemption Arc"        — A character seeks redemption for past sins
  "Rivals to Allies"      — Competitors unite for a common cause
  "Second Chance Romance" — Former lovers reunite
  "Slow Burn"             — Romantic/emotional tension builds gradually over the story

PLOT TROPES:
  "Ancient Evil Awakens"      — A long-dormant evil returns
  "Coming of Age"             — Young protagonist matures through trials
  "End of the World Stakes"   — Apocalyptic or civilisation-ending threat
  "Heist"                     — A daring robbery or impossible infiltration
  "Hero Becomes Villain"      — Protagonist descends into darkness
  "Hidden Society"            — A secret magical world exists alongside ours
  "Magical Plague"            — A supernatural disease spreads
  "Political Intrigue"        — Schemes, court politics, and power plays
  "Power at a Cost"           — Magic or power requires sacrifice
  "Prophecy"                  — Events driven by foretold destiny
  "Pyrrhic Victory"           — Victory comes at terrible cost
  "Quest"                     — A journey to achieve a specific goal
  "Rebellion"                 — A fight against oppressive rule
  "Revenge Story"             — A protagonist seeks vengeance
  "Secret Identity"           — A character hides who they truly are
  "Succession Crisis"         — Conflict over who inherits power
  "Survival Journey"          — Characters struggle to survive harsh conditions
  "Tournament Arc"            — Competition determining strength or fate
  "Trial by Combat"           — Justice determined through combat
  "War Between Kingdoms"      — Large-scale war between nations

WORLD & MAGIC TROPES:
  "Blood Magic"          — Magic powered by blood sacrifice
  "Curse Breaking"       — A curse must be understood and broken, often at great cost
  "Desert Kingdom"       — Fantasy set in arid lands
  "Divine Magic"         — Power granted by gods
  "Dying Empire"         — An empire in decline
  "Elemental Magic"      — Magic tied to natural elements
  "Fae Court Drama"      — Story set in or around Fae courts with intrigue and deals
  "Floating Islands"     — Sky-bound landmasses and skyships
  "Forbidden Magic"      — Outlawed or dangerous magic
  "Frozen Wasteland"     — Story in icy, unforgiving landscapes
  "Gothic Castle"        — Dark castle-centered narrative
  "Magic Tournament"     — Competitive magical event where participants duel
  "Magical Artifacts"    — Powerful enchanted objects central to the story
  "Necromancy"           — Raising or controlling the dead
  "Pirate Fantasy"       — Seafaring adventures and sea raiders
  "Sentient Weapon"      — A weapon with its own consciousness
  "Underground City"     — Civilisation beneath the surface
  "Viking-Inspired World"— Norse-inspired fantasy setting

Books:
${bookList}

Respond with ONLY a valid JSON array — no explanation, no markdown:
[{"id":"<uuid>","tropes":["Trope Name","Trope Name"]},...]

Rules:
- Include every book in the response.
- Return [] for books with no notable tropes from this list.
- Only use names from the exact list above (case-sensitive).
- Tag 3–8 tropes per book on average. More than 10 is rarely correct.
- A trope must be a meaningful part of the story, not a passing mention.
- "Slow Burn" only if romantic/emotional tension is a sustained story thread.
- "Coming of Age" only if growth and maturation are central themes.
- "Quest" only if a journey toward a specific goal structures the plot.`;

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = message.content[0]?.type === 'text' ? message.content[0].text.trim() : '';
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error(`No JSON array in response:\n${raw}`);
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  console.log(`\n🏷️  Trope Classifier${DRY_RUN ? ' [DRY RUN]' : ''}${RECLASSIFY ? ' [RECLASSIFY ALL]' : ''}\n`);

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
      console.log(`✗ Claude error: ${err.message}`);
      failed += batch.length;
      await sleep(DELAY_MS);
      continue;
    }

    console.log('');

    for (const result of results) {
      const book = batch.find((b) => b.id === result.id);
      if (!book) continue;

      const tropes  = (result.tropes || []).filter((t) => VALID_TROPES.includes(t));
      const invalid = (result.tropes || []).filter((t) => !VALID_TROPES.includes(t));

      if (invalid.length) {
        console.warn(`  ⚠️  "${book.title}": unknown tropes ignored: ${invalid.join(', ')}`);
      }

      const display = tropes.length ? tropes.join(', ') : '(none)';
      const line = `  ${book.title.slice(0, 45).padEnd(45)} → [${display}]`;

      if (DRY_RUN) {
        console.log(`[dry] ${line}`);
        updated++;
        continue;
      }

      const { error: updateError } = await supabase
        .from('books')
        .update({ tropes })
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
