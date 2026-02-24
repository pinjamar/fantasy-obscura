#!/usr/bin/env node

/**
 * Series metadata updater
 * Adds series name + number to existing books in Supabase.
 *
 * BEFORE RUNNING: add columns in Supabase SQL editor:
 *   ALTER TABLE books ADD COLUMN IF NOT EXISTS series text;
 *   ALTER TABLE books ADD COLUMN IF NOT EXISTS series_number integer;
 *
 * Then run: node update-series.js
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

const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);

// slug → { series, series_number }
// Books not listed here are standalones (series stays null).
const SERIES_DATA = {
  'the-name-of-the-wind':                { series: 'The Kingkiller Chronicle',       series_number: 1 },
  'the-way-of-kings':                    { series: 'The Stormlight Archive',         series_number: 1 },
  'words-of-radiance':                   { series: 'The Stormlight Archive',         series_number: 2 },
  'a-court-of-thorns-and-roses':         { series: 'A Court of Thorns and Roses',    series_number: 1 },
  'the-lies-of-locke-lamora':            { series: 'Gentleman Bastard',              series_number: 1 },
  'mistborn-the-final-empire':           { series: 'Mistborn: The Original Trilogy', series_number: 1 },
  'six-of-crows':                        { series: 'Six of Crows',                   series_number: 1 },
  'legends-and-lattes':                  { series: 'Legends & Lattes',               series_number: 1 },
  'the-blade-itself':                    { series: 'The First Law',                  series_number: 1 },
  'the-poppy-war':                       { series: 'The Poppy War',                  series_number: 1 },
  'the-dragon-republic':                 { series: 'The Poppy War',                  series_number: 2 },
  'harry-potter-philosophers-stone':     { series: 'Harry Potter',                   series_number: 1 },
  'a-deadly-education':                  { series: 'The Scholomance',                series_number: 1 },
  'an-ember-in-the-ashes':               { series: 'An Ember in the Ashes',          series_number: 1 },
  'a-game-of-thrones':                   { series: 'A Song of Ice and Fire',         series_number: 1 },
  'the-fellowship-of-the-ring':          { series: 'The Lord of the Rings',          series_number: 1 },
  'a-wizard-of-earthsea':                { series: 'Earthsea',                       series_number: 1 },
  'dune':                                { series: 'Dune',                           series_number: 1 },
  'fourth-wing':                         { series: 'The Empyrean',                   series_number: 1 },
  'iron-flame':                          { series: 'The Empyrean',                   series_number: 2 },
  'the-cruel-prince':                    { series: 'The Folk of the Air',            series_number: 1 },
  'children-of-blood-and-bone':          { series: 'Legacy of Orïsha',              series_number: 1 },
  'throne-of-glass':                     { series: 'Throne of Glass',               series_number: 1 },
  'shadow-and-bone':                     { series: 'Shadow and Bone',               series_number: 1 },
  'the-bear-and-the-nightingale':        { series: 'Winternight Trilogy',            series_number: 1 },
  'assassins-apprentice':                { series: 'Farseer Trilogy',                series_number: 1 },
  'the-fifth-season':                    { series: 'The Broken Earth',               series_number: 1 },
  'a-darker-shade-of-magic':             { series: 'Shades of Magic',                series_number: 1 },
  'guards-guards':                       { series: 'Discworld – City Watch',         series_number: 1 },
  'the-hitchhikers-guide-to-the-galaxy': { series: "Hitchhiker's Guide",            series_number: 1 },
  'enders-game':                         { series: "Ender's Game",                   series_number: 1 },
  'prince-of-thorns':                    { series: 'The Broken Empire',              series_number: 1 },
  'the-hundred-thousand-kingdoms':       { series: 'Inheritance Trilogy',            series_number: 1 },
  'gardens-of-the-moon':                 { series: 'Malazan Book of the Fallen',     series_number: 1 },
  'the-eye-of-the-world':                { series: 'The Wheel of Time',              series_number: 1 },
  'red-rising':                          { series: 'Red Rising',                     series_number: 1 },
  'sabriel':                             { series: 'The Old Kingdom',                series_number: 1 },
  'strange-the-dreamer':                 { series: 'Strange the Dreamer',            series_number: 1 },
  'from-blood-and-ash':                  { series: 'Blood and Ash',                  series_number: 1 },
  'eragon':                              { series: 'The Inheritance Cycle',          series_number: 1 },
  'city-of-bones':                       { series: 'The Mortal Instruments',         series_number: 1 },
  'the-last-wish':                       { series: 'The Witcher',                    series_number: 1 },
  'graceling':                           { series: 'Graceling Realm',                series_number: 1 },
  'a-memory-called-empire':              { series: 'Teixcalaan',                     series_number: 1 },
  'a-desolation-called-peace':           { series: 'Teixcalaan',                     series_number: 2 },
  'the-bone-shard-daughter':             { series: 'The Drowning Empire',            series_number: 1 },
  'the-atlas-six':                       { series: 'The Atlas',                      series_number: 1 },
  'the-magicians':                       { series: 'The Magicians',                  series_number: 1 },
  'nevernight':                          { series: 'The Nevernight Chronicle',       series_number: 1 },
  'the-black-prism':                     { series: 'Lightbringer',                   series_number: 1 },
  'foundryside':                         { series: 'Founders',                       series_number: 1 },
  'a-long-way-to-a-small-angry-planet':  { series: 'Wayfarers',                      series_number: 1 },
  'the-rage-of-dragons':                 { series: 'The Burning',                    series_number: 1 },
  'empire-of-sand':                      { series: 'Books of Ambha',                 series_number: 1 },
  'the-jasmine-throne':                  { series: 'The Burning Kingdoms',           series_number: 1 },
  'storm-front':                         { series: 'The Dresden Files',              series_number: 1 },
  'caraval':                             { series: 'Caraval',                        series_number: 1 },
  'half-a-king':                         { series: 'Shattered Sea',                  series_number: 1 },
  'jade-city':                           { series: 'The Green Bone Saga',            series_number: 1 },
  'she-who-became-the-sun':              { series: 'The Radiant Emperor',            series_number: 1 },
  'senlin-ascends':                      { series: 'The Books of Babel',             series_number: 1 },
  'daughter-of-the-moon-goddess':        { series: 'The Celestial Kingdom',          series_number: 1 },
  'the-traitor-baru-cormorant':          { series: 'The Masquerade',                 series_number: 1 },
  'the-way-of-shadows':                  { series: 'Night Angel',                    series_number: 1 },
  'skyward':                             { series: 'Skyward',                        series_number: 1 },
  'daughter-of-the-forest':             { series: 'Sevenwaters',                    series_number: 1 },
  'kingdom-of-the-wicked':              { series: 'Kingdom of the Wicked',          series_number: 1 },
  'ink-and-bone':                        { series: 'The Great Library',              series_number: 1 },
};

async function updateSeries() {
  console.log('📚 Updating series metadata...\n');

  let updated = 0;
  let failed = 0;

  for (const [slug, data] of Object.entries(SERIES_DATA)) {
    process.stdout.write(`🔖 "${slug}"... `);

    const { error } = await supabase
      .from('books')
      .update(data)
      .eq('slug', slug);

    if (error) {
      console.log(`❌ ${error.message}`);
      failed++;
    } else {
      console.log('✅');
      updated++;
    }
  }

  console.log(`\n✨ Done! ${updated} updated, ${failed} failed.`);
}

updateSeries().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
