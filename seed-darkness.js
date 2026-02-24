#!/usr/bin/env node

/**
 * Darkness Level Seeder
 * Sets darkness_level (1–5) on all 100 books in the database.
 *
 * BEFORE RUNNING — add the column in Supabase SQL editor:
 *   ALTER TABLE books ADD COLUMN IF NOT EXISTS darkness_level smallint;
 *
 * Then run:
 *   node seed-darkness.js
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envContent = readFileSync(path.join(__dirname, '.env'), 'utf-8');
const env = {};
envContent.split('\n').forEach((line) => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 1 — Lighthearted: cozy, low stakes, no real darkness
// 2 — Mild: some tension but ultimately safe
// 3 — Moderate: death, moral complexity, some disturbing content
// 4 — Dark: violence, trauma, morally grey characters throughout
// 5 — Brutal: grimdark, no redemption guaranteed

const DARKNESS = {
  // ── 1 Lighthearted ──────────────────────────────────────────
  'the-hobbit': 1,
  'good-omens': 1,
  'the-house-in-the-cerulean-sea': 1,
  'legends-and-lattes': 1,
  'harry-potter-philosophers-stone': 1,
  'stardust': 1,
  'the-princess-bride': 1,
  'guards-guards': 1,
  'the-hitchhikers-guide-to-the-galaxy': 1,

  // ── 2 Mild ──────────────────────────────────────────────────
  'piranesi': 2,
  'the-night-circus': 2,
  'the-fellowship-of-the-ring': 2,
  'a-wizard-of-earthsea': 2,
  'sabriel': 2,
  'neverwhere': 2,
  'the-starless-sea': 2,
  'strange-the-dreamer': 2,
  'eragon': 2,
  'caraval': 2,
  'the-ten-thousand-doors-of-january': 2,
  'the-graveyard-book': 2,
  'the-ocean-at-the-end-of-the-lane': 2,
  'the-silmarillion': 2,
  'the-once-and-future-king': 2,
  'daughter-of-the-moon-goddess': 2,
  'the-witchs-heart': 2,
  'ink-and-bone': 2,
  'the-goblin-emperor': 2,
  'a-long-way-to-a-small-angry-planet': 2,
  'elantris': 2,
  'warbreaker': 2,
  'skyward': 2,

  // ── 3 Moderate ──────────────────────────────────────────────
  'the-name-of-the-wind': 3,
  'a-court-of-thorns-and-roses': 3,
  'fourth-wing': 3,
  'iron-flame': 3,
  'the-cruel-prince': 3,
  'shadow-and-bone': 3,
  'the-bear-and-the-nightingale': 3,
  'throne-of-glass': 3,
  'a-darker-shade-of-magic': 3,
  'the-invisible-life-of-addie-larue': 3,
  'spinning-silver': 3,
  'the-atlas-six': 3,
  'the-magicians': 3,
  'the-black-prism': 3,
  'foundryside': 3,
  'empire-of-sand': 3,
  'storm-front': 3,
  'tigana': 3,
  'jade-city': 3,
  'the-once-and-future-witches': 3,
  'daughter-of-the-forest': 3,
  'from-blood-and-ash': 3,
  'city-of-bones': 3,
  'the-song-of-achilles': 3,
  'the-jasmine-throne': 3,
  'a-memory-called-empire': 3,
  'the-bone-shard-daughter': 3,
  'the-hundred-thousand-kingdoms': 3,
  'jonathan-strange-and-mr-norrell': 3,
  'the-eye-of-the-world': 3,
  'uprooted': 3,
  'american-gods': 3,
  'circe': 3,
  'the-priory-of-the-orange-tree': 3,
  'words-of-radiance': 3,
  'the-way-of-kings': 3,
  'graceling': 3,
  'enders-game': 3,
  'the-last-wish': 3,

  // ── 4 Dark ──────────────────────────────────────────────────
  'mistborn-the-final-empire': 4,
  'six-of-crows': 4,
  'an-ember-in-the-ashes': 4,
  'a-deadly-education': 4,
  'dune': 4,
  'children-of-blood-and-bone': 4,
  'babel': 4,
  'the-fifth-season': 4,
  'red-rising': 4,
  'nevernight': 4,
  'the-dragon-republic': 4,
  'half-a-king': 4,
  'the-traitor-baru-cormorant': 4,
  'the-way-of-shadows': 4,
  'a-desolation-called-peace': 4,
  'a-master-of-djinn': 4,
  'the-rage-of-dragons': 4,
  'best-served-cold': 4,
  'kingdom-of-the-wicked': 4,
  'the-lions-of-al-rassan': 4,
  'she-who-became-the-sun': 4,
  'senlin-ascends': 4,
  'assassins-apprentice': 4,
  'the-blade-itself': 4,

  // ── 5 Brutal ────────────────────────────────────────────────
  'the-lies-of-locke-lamora': 5,
  'gardens-of-the-moon': 5,
  'prince-of-thorns': 5,
  'a-game-of-thrones': 5,
  'the-poppy-war': 5,
};

async function run() {
  console.log('🕯️  Starting darkness level updates...\n');

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const [slug, level] of Object.entries(DARKNESS)) {
    const { error } = await supabase
      .from('books')
      .update({ darkness_level: level })
      .eq('slug', slug);

    if (error) {
      console.error(`  ❌ ${slug}: ${error.message}`);
      errors++;
    } else {
      console.log(`  ✅ ${slug} → level ${level}`);
      updated++;
    }
  }

  console.log(`\n🏁 Done — ${updated} updated, ${skipped} skipped, ${errors} errors`);
}

run().catch(console.error);
