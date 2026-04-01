/**
 * fill-series.mjs
 *
 * Phase 1a — fills missing books from the hardcoded BOOKS list (tracks completed series).
 * Phase 1b — detects integer gaps in series already in the DB but NOT in BOOKS list.
 * Phase 2  — for every author who already has 7+ books in the DB, discovers and
 *             imports any of their remaining books found on Google Books.
 *
 * Progress is persisted to .fill-series-progress.json so completed series / authors
 * are skipped on subsequent runs. Use --reset to clear all progress and re-scan everything.
 *
 * Usage:
 *   node scripts/fill-series.mjs                   (run all phases)
 *   node scripts/fill-series.mjs --series-only      (phases 1a + 1b only)
 *   node scripts/fill-series.mjs --authors-only     (phase 2 only)
 *   node scripts/fill-series.mjs --dry-run
 *   node scripts/fill-series.mjs --limit 50         (cap imports at 50 — applies to phase 1a+1b when --series-only, phase 2 otherwise)
 *   node scripts/fill-series.mjs --threshold 5      (lower author book threshold, default 7)
 *   node scripts/fill-series.mjs --reset            (clear all progress and re-scan everything)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';

config();

const DRY_RUN      = process.argv.includes('--dry-run');
const SERIES_ONLY  = process.argv.includes('--series-only');
const AUTHORS_ONLY = process.argv.includes('--authors-only');
const _limitFlag   = process.argv.find((a) => a === '--limit' || a.startsWith('--limit='));
const LIMIT        = _limitFlag
  ? parseInt(_limitFlag.includes('=') ? _limitFlag.split('=')[1] : process.argv[process.argv.indexOf('--limit') + 1], 10)
  : null;
const THRESH_ARG   = process.argv.indexOf('--threshold');
const THRESHOLD    = THRESH_ARG !== -1 ? parseInt(process.argv[THRESH_ARG + 1], 10) : 7;
const RESET        = process.argv.includes('--reset');
const DELAY_MS     = 500;

// ── Phase 2 progress file ─────────────────────────────────────────────────────
const PROGRESS_FILE = new URL('../.fill-series-progress.json', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

function loadProgress() {
  if (RESET) return { completedAuthors: [], completedSeries: [], completedGapSeries: [] };
  try {
    const data = JSON.parse(readFileSync(PROGRESS_FILE, 'utf8'));
    data.completedAuthors  ??= [];
    data.completedSeries   ??= [];
    data.completedGapSeries ??= [];
    return data;
  } catch {
    return { completedAuthors: [], completedSeries: [], completedGapSeries: [] };
  }
}

function saveProgress(data) {
  writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
}
const PAGE_SIZE    = 40;
const MIN_RATING   = 3.5;

// ── All missing series books ───────────────────────────────────────────────────
// series name must match EXACTLY what is stored in the DB

const BOOKS = [

  // ── A Court of Thorns and Roses (Sarah J. Maas) ──────────────────────────
  { title: 'A Court of Mist and Fury',         author: 'Sarah J. Maas',          series: 'A Court of Thorns and Roses',    series_number: 2 },
  { title: 'A Court of Wings and Ruin',         author: 'Sarah J. Maas',          series: 'A Court of Thorns and Roses',    series_number: 3 },
  { title: 'A Court of Frost and Starlight',    author: 'Sarah J. Maas',          series: 'A Court of Thorns and Roses',    series_number: 4 },
  { title: 'A Court of Silver Flames',          author: 'Sarah J. Maas',          series: 'A Court of Thorns and Roses',    series_number: 5 },

  // ── A Song of Ice and Fire (George R.R. Martin) ──────────────────────────
  { title: 'A Clash of Kings',                  author: 'George R.R. Martin',     series: 'A Song of Ice and Fire',         series_number: 2 },
  { title: 'A Storm of Swords',                 author: 'George R.R. Martin',     series: 'A Song of Ice and Fire',         series_number: 3 },
  { title: 'A Feast for Crows',                 author: 'George R.R. Martin',     series: 'A Song of Ice and Fire',         series_number: 4 },
  { title: 'A Dance with Dragons',              author: 'George R.R. Martin',     series: 'A Song of Ice and Fire',         series_number: 5 },

  // ── An Ember in the Ashes (Sabaa Tahir) ──────────────────────────────────
  { title: 'A Torch Against the Night',         author: 'Sabaa Tahir',            series: 'An Ember in the Ashes',          series_number: 2 },
  { title: 'A Reaper at the Gates',             author: 'Sabaa Tahir',            series: 'An Ember in the Ashes',          series_number: 3 },
  { title: 'A Sky Beyond the Storm',            author: 'Sabaa Tahir',            series: 'An Ember in the Ashes',          series_number: 4 },

  // ── Blood and Ash (Jennifer L. Armentrout) ───────────────────────────────
  { title: 'A Kingdom of Flesh and Fire',       author: 'Jennifer L. Armentrout', series: 'Blood and Ash',                  series_number: 2 },
  { title: 'The Crown of Gilded Bones',         author: 'Jennifer L. Armentrout', series: 'Blood and Ash',                  series_number: 3 },
  { title: 'The War of Two Queens',             author: 'Jennifer L. Armentrout', series: 'Blood and Ash',                  series_number: 4 },
  { title: 'A Soul of Ash and Blood',           author: 'Jennifer L. Armentrout', series: 'Blood and Ash',                  series_number: 5 },
  { title: 'A Light in the Flame',              author: 'Jennifer L. Armentrout', series: 'Blood and Ash',                  series_number: 6 },

  // ── Book of the Ancestor (Mark Lawrence) ─────────────────────────────────
  { title: 'Grey Sister',                       author: 'Mark Lawrence',          series: 'Book of the Ancestor',           series_number: 2 },
  { title: 'Holy Sister',                       author: 'Mark Lawrence',          series: 'Book of the Ancestor',           series_number: 3 },

  // ── Books of Ambha (Tasha Suri) ──────────────────────────────────────────
  { title: 'Realm of Ash',                      author: 'Tasha Suri',             series: 'Books of Ambha',                 series_number: 2 },

  // ── Caraval (Stephanie Garber) ───────────────────────────────────────────
  { title: 'Legendary',                         author: 'Stephanie Garber',       series: 'Caraval',                        series_number: 2 },
  { title: 'Finale',                            author: 'Stephanie Garber',       series: 'Caraval',                        series_number: 3 },

  // ── Cradle (Will Wight) ───────────────────────────────────────────────────
  { title: 'Soulsmith',                         author: 'Will Wight',             series: 'Cradle',                         series_number: 2 },
  { title: 'Blackflame',                        author: 'Will Wight',             series: 'Cradle',                         series_number: 3 },
  { title: 'Skysworn',                          author: 'Will Wight',             series: 'Cradle',                         series_number: 4 },
  { title: 'Ghostwater',                        author: 'Will Wight',             series: 'Cradle',                         series_number: 5 },
  { title: 'Underlord',                         author: 'Will Wight',             series: 'Cradle',                         series_number: 6 },
  { title: 'Uncrowned',                         author: 'Will Wight',             series: 'Cradle',                         series_number: 7 },
  { title: 'Wintersteel',                       author: 'Will Wight',             series: 'Cradle',                         series_number: 8 },
  { title: 'Bloodline',                         author: 'Will Wight',             series: 'Cradle',                         series_number: 9 },
  { title: 'Reaper',                            author: 'Will Wight',             series: 'Cradle',                         series_number: 10 },
  { title: 'Dreadgod',                          author: 'Will Wight',             series: 'Cradle',                         series_number: 11 },
  { title: 'Waybound',                          author: 'Will Wight',             series: 'Cradle',                         series_number: 12 },

  // ── Discworld – City Watch (Terry Pratchett) ──────────────────────────────
  { title: 'Men at Arms',                       author: 'Terry Pratchett',        series: 'Discworld – City Watch',         series_number: 2 },
  { title: 'Feet of Clay',                      author: 'Terry Pratchett',        series: 'Discworld – City Watch',         series_number: 3 },
  { title: 'Jingo',                             author: 'Terry Pratchett',        series: 'Discworld – City Watch',         series_number: 4 },
  { title: 'The Fifth Elephant',                author: 'Terry Pratchett',        series: 'Discworld – City Watch',         series_number: 5 },
  { title: 'Night Watch',                       author: 'Terry Pratchett',        series: 'Discworld – City Watch',         series_number: 6 },
  { title: 'Thud!',                             author: 'Terry Pratchett',        series: 'Discworld – City Watch',         series_number: 7 },
  { title: 'Snuff',                             author: 'Terry Pratchett',        series: 'Discworld – City Watch',         series_number: 8 },

  // ── Dune (Frank Herbert) ──────────────────────────────────────────────────
  { title: 'Dune Messiah',                      author: 'Frank Herbert',          series: 'Dune',                           series_number: 2 },
  { title: 'Children of Dune',                  author: 'Frank Herbert',          series: 'Dune',                           series_number: 3 },
  { title: 'God Emperor of Dune',               author: 'Frank Herbert',          series: 'Dune',                           series_number: 4 },
  { title: 'Heretics of Dune',                  author: 'Frank Herbert',          series: 'Dune',                           series_number: 5 },
  { title: 'Chapterhouse: Dune',                author: 'Frank Herbert',          series: 'Dune',                           series_number: 6 },

  // ── Earthsea (Ursula K. Le Guin) ─────────────────────────────────────────
  { title: 'The Tombs of Atuan',                author: 'Ursula K. Le Guin',      series: 'Earthsea',                       series_number: 2 },
  { title: 'The Farthest Shore',                author: 'Ursula K. Le Guin',      series: 'Earthsea',                       series_number: 3 },
  { title: 'Tehanu',                            author: 'Ursula K. Le Guin',      series: 'Earthsea',                       series_number: 4 },
  { title: 'Tales from Earthsea',              author: 'Ursula K. Le Guin',      series: 'Earthsea',                       series_number: 5 },
  { title: 'The Other Wind',                    author: 'Ursula K. Le Guin',      series: 'Earthsea',                       series_number: 6 },

  // ── Emily Wilde (Heather Fawcett) ─────────────────────────────────────────
  { title: "Emily Wilde's Map of the Otherlands", author: 'Heather Fawcett',     series: 'Emily Wilde',                    series_number: 2 },

  // ── Empire of the Vampire (Jay Kristoff) ─────────────────────────────────
  { title: 'Empire of the Damned',              author: 'Jay Kristoff',           series: 'Empire of the Vampire',          series_number: 2 },

  // ── Ender's Game (Orson Scott Card) ──────────────────────────────────────
  { title: 'Speaker for the Dead',              author: 'Orson Scott Card',       series: "Ender's Game",                   series_number: 2 },
  { title: 'Xenocide',                          author: 'Orson Scott Card',       series: "Ender's Game",                   series_number: 3 },
  { title: 'Children of the Mind',              author: 'Orson Scott Card',       series: "Ender's Game",                   series_number: 4 },

  // ── Farseer Trilogy (Robin Hobb) ─────────────────────────────────────────
  { title: 'Royal Assassin',                    author: 'Robin Hobb',             series: 'Farseer Trilogy',                series_number: 2 },
  { title: "Assassin's Quest",                  author: 'Robin Hobb',             series: 'Farseer Trilogy',                series_number: 3 },

  // ── Founders (Robert Jackson Bennett) ────────────────────────────────────
  { title: 'Shorefall',                         author: 'Robert Jackson Bennett', series: 'Founders',                       series_number: 2 },
  { title: 'Locklands',                         author: 'Robert Jackson Bennett', series: 'Founders',                       series_number: 3 },

  // ── Gentleman Bastard (Scott Lynch) ──────────────────────────────────────
  { title: 'Red Seas Under Red Skies',          author: 'Scott Lynch',            series: 'Gentleman Bastard',              series_number: 2 },
  { title: 'The Republic of Thieves',           author: 'Scott Lynch',            series: 'Gentleman Bastard',              series_number: 3 },

  // ── Graceling Realm (Kristin Cashore) ────────────────────────────────────
  { title: 'Fire',                              author: 'Kristin Cashore',        series: 'Graceling Realm',                series_number: 2 },
  { title: 'Bitterblue',                        author: 'Kristin Cashore',        series: 'Graceling Realm',                series_number: 3 },

  // ── Harry Potter (J.K. Rowling) ───────────────────────────────────────────
  { title: 'Harry Potter and the Chamber of Secrets',    author: 'J.K. Rowling', series: 'Harry Potter',                   series_number: 2 },
  { title: 'Harry Potter and the Prisoner of Azkaban',   author: 'J.K. Rowling', series: 'Harry Potter',                   series_number: 3 },
  { title: 'Harry Potter and the Goblet of Fire',        author: 'J.K. Rowling', series: 'Harry Potter',                   series_number: 4 },
  { title: 'Harry Potter and the Order of the Phoenix',  author: 'J.K. Rowling', series: 'Harry Potter',                   series_number: 5 },
  { title: 'Harry Potter and the Half-Blood Prince',     author: 'J.K. Rowling', series: 'Harry Potter',                   series_number: 6 },
  { title: 'Harry Potter and the Deathly Hallows',       author: 'J.K. Rowling', series: 'Harry Potter',                   series_number: 7 },

  // ── Hitchhiker's Guide (Douglas Adams) ───────────────────────────────────
  { title: 'The Restaurant at the End of the Universe',  author: 'Douglas Adams', series: "Hitchhiker's Guide",             series_number: 2 },
  { title: 'Life, the Universe and Everything',          author: 'Douglas Adams', series: "Hitchhiker's Guide",             series_number: 3 },
  { title: 'So Long, and Thanks for All the Fish',       author: 'Douglas Adams', series: "Hitchhiker's Guide",             series_number: 4 },
  { title: 'Mostly Harmless',                            author: 'Douglas Adams', series: "Hitchhiker's Guide",             series_number: 5 },

  // ── Inheritance Trilogy (N.K. Jemisin) ───────────────────────────────────
  { title: 'The Broken Kingdoms',               author: 'N.K. Jemisin',           series: 'Inheritance Trilogy',            series_number: 2 },
  { title: 'The Kingdom of Gods',               author: 'N.K. Jemisin',           series: 'Inheritance Trilogy',            series_number: 3 },

  // ── Kingdom of the Wicked (Kerri Maniscalco) ─────────────────────────────
  { title: 'Kingdom of the Cursed',             author: 'Kerri Maniscalco',       series: 'Kingdom of the Wicked',          series_number: 2 },
  { title: 'Kingdom of the Feared',             author: 'Kerri Maniscalco',       series: 'Kingdom of the Wicked',          series_number: 3 },

  // ── Legacy of Orïsha (Tomi Adeyemi) ─────────────────────────────────────
  { title: 'Children of Virtue and Vengeance',  author: 'Tomi Adeyemi',           series: 'Legacy of Orïsha',               series_number: 2 },
  { title: 'Children of Anguish and Anarchy',   author: 'Tomi Adeyemi',           series: 'Legacy of Orïsha',               series_number: 3 },

  // ── Legends & Lattes (Travis Baldree) ────────────────────────────────────
  { title: 'Bookshops & Bonedust',              author: 'Travis Baldree',         series: 'Legends & Lattes',               series_number: 2 },

  // ── Lightbringer (Brent Weeks) ────────────────────────────────────────────
  { title: 'The Blinding Knife',                author: 'Brent Weeks',            series: 'Lightbringer',                   series_number: 2 },
  { title: 'The Broken Eye',                    author: 'Brent Weeks',            series: 'Lightbringer',                   series_number: 3 },
  { title: 'The Blood Mirror',                  author: 'Brent Weeks',            series: 'Lightbringer',                   series_number: 4 },
  { title: 'The Burning White',                 author: 'Brent Weeks',            series: 'Lightbringer',                   series_number: 5 },

  // ── Malazan Book of the Fallen (Steven Erikson) ───────────────────────────
  { title: 'Deadhouse Gates',                   author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 2 },
  { title: 'Memories of Ice',                   author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 3 },
  { title: 'House of Chains',                   author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 4 },
  { title: 'Midnight Tides',                    author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 5 },
  { title: 'The Bonehunters',                   author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 6 },
  { title: "Reaper's Gale",                     author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 7 },
  { title: 'Toll the Hounds',                   author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 8 },
  { title: 'Dust of Dreams',                    author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 9 },
  { title: 'The Crippled God',                  author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 10 },

  // ── Memory, Sorrow and Thorn (Tad Williams) ───────────────────────────────
  { title: 'Stone of Farewell',                 author: 'Tad Williams',           series: 'Memory, Sorrow and Thorn',       series_number: 2 },
  { title: 'To Green Angel Tower',              author: 'Tad Williams',           series: 'Memory, Sorrow and Thorn',       series_number: 3 },

  // ── Mistborn: The Original Trilogy (Brandon Sanderson) ────────────────────
  { title: 'The Well of Ascension',             author: 'Brandon Sanderson',      series: 'Mistborn: The Original Trilogy', series_number: 2 },
  { title: 'The Hero of Ages',                  author: 'Brandon Sanderson',      series: 'Mistborn: The Original Trilogy', series_number: 3 },

  // ── Night Angel (Brent Weeks) ─────────────────────────────────────────────
  { title: "Shadow's Edge",                     author: 'Brent Weeks',            series: 'Night Angel',                    series_number: 2 },
  { title: 'Beyond the Shadows',                author: 'Brent Weeks',            series: 'Night Angel',                    series_number: 3 },

  // ── Red Rising (Pierce Brown) ─────────────────────────────────────────────
  { title: 'Golden Son',                        author: 'Pierce Brown',           series: 'Red Rising',                     series_number: 2 },
  { title: 'Morning Star',                      author: 'Pierce Brown',           series: 'Red Rising',                     series_number: 3 },
  { title: 'Iron Gold',                         author: 'Pierce Brown',           series: 'Red Rising',                     series_number: 4 },
  { title: 'Dark Age',                          author: 'Pierce Brown',           series: 'Red Rising',                     series_number: 5 },
  { title: 'Light Bringer',                     author: 'Pierce Brown',           series: 'Red Rising',                     series_number: 6 },

  // ── Sevenwaters (Juliet Marillier) ────────────────────────────────────────
  { title: 'Son of the Shadows',                author: 'Juliet Marillier',       series: 'Sevenwaters',                    series_number: 2 },
  { title: 'Child of the Prophecy',             author: 'Juliet Marillier',       series: 'Sevenwaters',                    series_number: 3 },
  { title: 'Heir to Sevenwaters',               author: 'Juliet Marillier',       series: 'Sevenwaters',                    series_number: 4 },
  { title: 'Seer of Sevenwaters',               author: 'Juliet Marillier',       series: 'Sevenwaters',                    series_number: 5 },
  { title: 'Flame of Sevenwaters',              author: 'Juliet Marillier',       series: 'Sevenwaters',                    series_number: 6 },

  // ── Shades of Magic (V.E. Schwab) ─────────────────────────────────────────
  { title: 'A Gathering of Shadows',            author: 'V.E. Schwab',            series: 'Shades of Magic',                series_number: 2 },
  { title: 'A Conjuring of Light',              author: 'V.E. Schwab',            series: 'Shades of Magic',                series_number: 3 },

  // ── Shadow and Bone (Leigh Bardugo) ──────────────────────────────────────
  { title: 'Siege and Storm',                   author: 'Leigh Bardugo',          series: 'Shadow and Bone',                series_number: 2 },
  { title: 'Ruin and Rising',                   author: 'Leigh Bardugo',          series: 'Shadow and Bone',                series_number: 3 },

  // ── Shattered Sea (Joe Abercrombie) ──────────────────────────────────────
  { title: 'Half the World',                    author: 'Joe Abercrombie',        series: 'Shattered Sea',                  series_number: 2 },
  { title: 'Half a War',                        author: 'Joe Abercrombie',        series: 'Shattered Sea',                  series_number: 3 },

  // ── Six of Crows (Leigh Bardugo) ─────────────────────────────────────────
  { title: 'Crooked Kingdom',                   author: 'Leigh Bardugo',          series: 'Six of Crows',                   series_number: 2 },

  // ── Skyward (Brandon Sanderson) ───────────────────────────────────────────
  { title: 'Starsight',                         author: 'Brandon Sanderson',      series: 'Skyward',                        series_number: 2 },
  { title: 'Cytonic',                           author: 'Brandon Sanderson',      series: 'Skyward',                        series_number: 3 },
  { title: 'Defiant',                           author: 'Brandon Sanderson',      series: 'Skyward',                        series_number: 4 },

  // ── Strange the Dreamer (Laini Taylor) ───────────────────────────────────
  { title: 'Muse of Nightmares',                author: 'Laini Taylor',           series: 'Strange the Dreamer',            series_number: 2 },

  // ── The Atlas (Olivie Blake) ──────────────────────────────────────────────
  { title: 'The Atlas Paradox',                 author: 'Olivie Blake',           series: 'The Atlas',                      series_number: 2 },
  { title: 'The Atlas Complex',                 author: 'Olivie Blake',           series: 'The Atlas',                      series_number: 3 },

  // ── Of Blood and Bone (John Gwynne) ──────────────────────────────────────
  { title: 'A Time of Dread',                   author: 'John Gwynne',            series: 'Of Blood and Bone',              series_number: 1 },
  { title: 'A Time of Blood',                   author: 'John Gwynne',            series: 'Of Blood and Bone',              series_number: 2 },
  { title: 'A Time of Courage',                 author: 'John Gwynne',            series: 'Of Blood and Bone',              series_number: 3 },

  // ── The Bloodsworn Saga (John Gwynne) ────────────────────────────────────
  { title: 'The Shadow of the Gods',            author: 'John Gwynne',            series: 'The Bloodsworn Saga',            series_number: 1 },
  { title: 'The Hunger of the Gods',            author: 'John Gwynne',            series: 'The Bloodsworn Saga',            series_number: 2 },
  { title: 'The Fury of the Gods',              author: 'John Gwynne',            series: 'The Bloodsworn Saga',            series_number: 3 },

  // ── The Book of the New Sun (Gene Wolfe) ─────────────────────────────────
  { title: 'The Claw of the Conciliator',       author: 'Gene Wolfe',             series: 'The Book of the New Sun',        series_number: 2 },
  { title: 'The Sword of the Lictor',           author: 'Gene Wolfe',             series: 'The Book of the New Sun',        series_number: 3 },
  { title: 'The Citadel of the Autarch',        author: 'Gene Wolfe',             series: 'The Book of the New Sun',        series_number: 4 },

  // ── The Books of Babel (Josiah Bancroft) ─────────────────────────────────
  { title: 'Arm of the Sphinx',                 author: 'Josiah Bancroft',        series: 'The Books of Babel',             series_number: 2 },
  { title: 'The Hod King',                      author: 'Josiah Bancroft',        series: 'The Books of Babel',             series_number: 3 },
  { title: 'The Fall of Babel',                 author: 'Josiah Bancroft',        series: 'The Books of Babel',             series_number: 4 },

  // ── The Broken Earth (N.K. Jemisin) ─────────────────────────────────────
  { title: 'The Obelisk Gate',                  author: 'N.K. Jemisin',           series: 'The Broken Earth',               series_number: 2 },
  { title: 'The Stone Sky',                     author: 'N.K. Jemisin',           series: 'The Broken Earth',               series_number: 3 },

  // ── The Broken Empire (Mark Lawrence) ────────────────────────────────────
  { title: 'King of Thorns',                    author: 'Mark Lawrence',          series: 'The Broken Empire',              series_number: 2 },
  { title: 'Emperor of Thorns',                 author: 'Mark Lawrence',          series: 'The Broken Empire',              series_number: 3 },

  // ── The Burning (Evan Winter) ─────────────────────────────────────────────
  { title: 'The Fires of Vengeance',            author: 'Evan Winter',            series: 'The Burning',                    series_number: 2 },

  // ── The Burning Kingdoms (Tasha Suri) ────────────────────────────────────
  { title: 'The Oleander Sword',                author: 'Tasha Suri',             series: 'The Burning Kingdoms',           series_number: 2 },
  { title: 'The Lotus Empire',                  author: 'Tasha Suri',             series: 'The Burning Kingdoms',           series_number: 3 },

  // ── The Celestial Kingdom (Sue Lynn Tan) ─────────────────────────────────
  { title: 'Heart of the Sun Warrior',          author: 'Sue Lynn Tan',           series: 'The Celestial Kingdom',          series_number: 2 },

  // ── The Dresden Files (Jim Butcher) ───────────────────────────────────────
  { title: 'Fool Moon',                         author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 2 },
  { title: 'Grave Peril',                       author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 3 },
  { title: 'Summer Knight',                     author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 4 },
  { title: 'Death Masks',                       author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 5 },
  { title: 'Blood Rites',                       author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 6 },
  { title: 'Dead Beat',                         author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 7 },
  { title: 'Proven Guilty',                     author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 8 },
  { title: 'White Night',                       author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 9 },
  { title: 'Small Favor',                       author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 10 },
  { title: 'Turn Coat',                         author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 11 },
  { title: 'Changes',                           author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 12 },
  { title: 'Ghost Story',                       author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 13 },
  { title: 'Cold Days',                         author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 14 },
  { title: 'Skin Game',                         author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 15 },
  { title: 'Peace Talks',                       author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 16 },
  { title: 'Battle Ground',                     author: 'Jim Butcher',            series: 'The Dresden Files',              series_number: 17 },

  // ── The Drowning Empire (Andrea Stewart) ─────────────────────────────────
  { title: 'The Bone Shard Emperor',            author: 'Andrea Stewart',         series: 'The Drowning Empire',            series_number: 2 },
  { title: 'The Bone Shard War',                author: 'Andrea Stewart',         series: 'The Drowning Empire',            series_number: 3 },

  // ── The Empire of the Wolf (Richard Swan) ────────────────────────────────
  { title: 'The Tyranny of Faith',              author: 'Richard Swan',           series: 'The Empire of the Wolf',         series_number: 2 },
  { title: 'The Trials of Empire',              author: 'Richard Swan',           series: 'The Empire of the Wolf',         series_number: 3 },

  // ── The Empire Trilogy (Raymond E. Feist) ────────────────────────────────
  { title: 'Servant of the Empire',             author: 'Raymond E. Feist',       series: 'The Empire Trilogy',             series_number: 2 },
  { title: 'Mistress of the Empire',            author: 'Raymond E. Feist',       series: 'The Empire Trilogy',             series_number: 3 },

  // ── The Empyrean (Rebecca Yarros) ────────────────────────────────────────
  { title: 'Iron Flame',                        author: 'Rebecca Yarros',         series: 'The Empyrean',                   series_number: 2 },
  { title: 'Onyx Storm',                        author: 'Rebecca Yarros',         series: 'The Empyrean',                   series_number: 3 },

  // ── The Faithful and the Fallen (John Gwynne) ────────────────────────────
  { title: 'Valour',                            author: 'John Gwynne',            series: 'The Faithful and the Fallen',    series_number: 2 },
  { title: 'Ruin',                              author: 'John Gwynne',            series: 'The Faithful and the Fallen',    series_number: 3 },
  { title: 'Wrath',                             author: 'John Gwynne',            series: 'The Faithful and the Fallen',    series_number: 4 },

  // ── The First Law (Joe Abercrombie) ──────────────────────────────────────
  { title: 'Before They Are Hanged',            author: 'Joe Abercrombie',        series: 'The First Law',                  series_number: 2 },
  { title: 'Last Argument of Kings',            author: 'Joe Abercrombie',        series: 'The First Law',                  series_number: 3 },

  // ── The Folk of the Air (Holly Black) ────────────────────────────────────
  { title: 'The Wicked King',                   author: 'Holly Black',            series: 'The Folk of the Air',            series_number: 2 },
  { title: 'The Queen of Nothing',              author: 'Holly Black',            series: 'The Folk of the Air',            series_number: 3 },

  // ── The Great Library (Rachel Caine) ─────────────────────────────────────
  { title: 'Paper and Fire',                    author: 'Rachel Caine',           series: 'The Great Library',              series_number: 2 },
  { title: 'Ash and Quill',                     author: 'Rachel Caine',           series: 'The Great Library',              series_number: 3 },
  { title: 'Smoke and Iron',                    author: 'Rachel Caine',           series: 'The Great Library',              series_number: 4 },
  { title: 'Sword and Pen',                     author: 'Rachel Caine',           series: 'The Great Library',              series_number: 5 },

  // ── The Green Bone Saga (Fonda Lee) ──────────────────────────────────────
  { title: 'Jade War',                          author: 'Fonda Lee',              series: 'The Green Bone Saga',            series_number: 2 },
  { title: 'Jade Legacy',                       author: 'Fonda Lee',              series: 'The Green Bone Saga',            series_number: 3 },

  // ── The Inheritance Cycle (Christopher Paolini) ───────────────────────────
  { title: 'Eldest',                            author: 'Christopher Paolini',    series: 'The Inheritance Cycle',          series_number: 2 },
  { title: 'Brisingr',                          author: 'Christopher Paolini',    series: 'The Inheritance Cycle',          series_number: 3 },
  { title: 'Inheritance',                       author: 'Christopher Paolini',    series: 'The Inheritance Cycle',          series_number: 4 },

  // ── The Kingkiller Chronicle (Patrick Rothfuss) ───────────────────────────
  { title: "The Wise Man's Fear",               author: 'Patrick Rothfuss',       series: 'The Kingkiller Chronicle',       series_number: 2 },

  // ── The Lord of the Rings (J.R.R. Tolkien) ───────────────────────────────
  { title: 'The Two Towers',                    author: 'J.R.R. Tolkien',         series: 'The Lord of the Rings',          series_number: 2 },
  { title: 'The Return of the King',            author: 'J.R.R. Tolkien',         series: 'The Lord of the Rings',          series_number: 3 },

  // ── The Magicians (Lev Grossman) ─────────────────────────────────────────
  { title: 'The Magician King',                 author: 'Lev Grossman',           series: 'The Magicians',                  series_number: 2 },
  { title: "The Magician's Land",               author: 'Lev Grossman',           series: 'The Magicians',                  series_number: 3 },

  // ── The Masquerade (Seth Dickinson) ──────────────────────────────────────
  { title: 'The Monster Baru Cormorant',        author: 'Seth Dickinson',         series: 'The Masquerade',                 series_number: 2 },
  { title: 'The Tyrant Baru Cormorant',         author: 'Seth Dickinson',         series: 'The Masquerade',                 series_number: 3 },

  // ── The Mortal Instruments (Cassandra Clare) ─────────────────────────────
  { title: 'City of Ashes',                     author: 'Cassandra Clare',        series: 'The Mortal Instruments',         series_number: 2 },
  { title: 'City of Glass',                     author: 'Cassandra Clare',        series: 'The Mortal Instruments',         series_number: 3 },
  { title: 'City of Fallen Angels',             author: 'Cassandra Clare',        series: 'The Mortal Instruments',         series_number: 4 },
  { title: 'City of Lost Souls',                author: 'Cassandra Clare',        series: 'The Mortal Instruments',         series_number: 5 },
  { title: 'City of Heavenly Fire',             author: 'Cassandra Clare',        series: 'The Mortal Instruments',         series_number: 6 },

  // ── The Nevernight Chronicle (Jay Kristoff) ───────────────────────────────
  { title: 'Godsgrave',                         author: 'Jay Kristoff',           series: 'The Nevernight Chronicle',       series_number: 2 },
  { title: 'Darkdawn',                          author: 'Jay Kristoff',           series: 'The Nevernight Chronicle',       series_number: 3 },

  // ── The Old Kingdom (Garth Nix) ───────────────────────────────────────────
  { title: 'Lirael',                            author: 'Garth Nix',              series: 'The Old Kingdom',                series_number: 2 },
  { title: 'Abhorsen',                          author: 'Garth Nix',              series: 'The Old Kingdom',                series_number: 3 },
  { title: 'Clariel',                           author: 'Garth Nix',              series: 'The Old Kingdom',                series_number: 4 },
  { title: 'Goldenhand',                        author: 'Garth Nix',              series: 'The Old Kingdom',                series_number: 5 },

  // ── The Poppy War (R.F. Kuang) ────────────────────────────────────────────
  { title: 'The Dragon Republic',               author: 'R.F. Kuang',             series: 'The Poppy War',                  series_number: 2 },
  { title: 'The Burning God',                   author: 'R.F. Kuang',             series: 'The Poppy War',                  series_number: 3 },

  // ── The Prince of Nothing (R. Scott Bakker) ──────────────────────────────
  { title: 'The Warrior-Prophet',               author: 'R. Scott Bakker',        series: 'The Prince of Nothing',          series_number: 2 },
  { title: 'The Thousandfold Thought',          author: 'R. Scott Bakker',        series: 'The Prince of Nothing',          series_number: 3 },

  // ── The Radiant Emperor (Shelley Parker-Chan) ────────────────────────────
  { title: 'He Who Drowned the World',          author: 'Shelley Parker-Chan',    series: 'The Radiant Emperor',            series_number: 2 },

  // ── The Scholomance (Naomi Novik) ────────────────────────────────────────
  { title: 'The Last Graduate',                 author: 'Naomi Novik',            series: 'The Scholomance',                series_number: 2 },
  { title: 'The Golden Enclaves',               author: 'Naomi Novik',            series: 'The Scholomance',                series_number: 3 },

  // ── The Stormlight Archive (Brandon Sanderson) ───────────────────────────
  { title: 'Oathbringer',                       author: 'Brandon Sanderson',      series: 'The Stormlight Archive',         series_number: 3 },
  { title: 'Rhythm of War',                     author: 'Brandon Sanderson',      series: 'The Stormlight Archive',         series_number: 4 },
  { title: 'Wind and Truth',                    author: 'Brandon Sanderson',      series: 'The Stormlight Archive',         series_number: 5 },

  // ── The Tide Child (RJ Barker) ────────────────────────────────────────────
  { title: 'Call of the Bone Ships',            author: 'RJ Barker',              series: 'The Tide Child',                 series_number: 2 },
  { title: "The Bone Ship's Wake",              author: 'RJ Barker',              series: 'The Tide Child',                 series_number: 3 },

  // ── The Wheel of Time (Robert Jordan / Brandon Sanderson) ────────────────
  { title: 'The Great Hunt',                    author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 2 },
  { title: 'The Dragon Reborn',                 author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 3 },
  { title: 'The Shadow Rising',                 author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 4 },
  { title: 'The Fires of Heaven',               author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 5 },
  { title: 'Lord of Chaos',                     author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 6 },
  { title: 'A Crown of Swords',                 author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 7 },
  { title: 'The Path of Daggers',               author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 8 },
  { title: "Winter's Heart",                    author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 9 },
  { title: 'Crossroads of Twilight',            author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 10 },
  { title: 'Knife of Dreams',                   author: 'Robert Jordan',          series: 'The Wheel of Time',              series_number: 11 },
  { title: 'The Gathering Storm',               author: 'Brandon Sanderson',      series: 'The Wheel of Time',              series_number: 12 },
  { title: 'Towers of Midnight',                author: 'Brandon Sanderson',      series: 'The Wheel of Time',              series_number: 13 },
  { title: 'A Memory of Light',                 author: 'Brandon Sanderson',      series: 'The Wheel of Time',              series_number: 14 },

  // ── The Witcher (Andrzej Sapkowski) ──────────────────────────────────────
  { title: 'Sword of Destiny',                  author: 'Andrzej Sapkowski',      series: 'The Witcher',                    series_number: 2 },
  { title: 'Blood of Elves',                    author: 'Andrzej Sapkowski',      series: 'The Witcher',                    series_number: 3 },
  { title: 'Time of Contempt',                  author: 'Andrzej Sapkowski',      series: 'The Witcher',                    series_number: 4 },
  { title: 'Baptism of Fire',                   author: 'Andrzej Sapkowski',      series: 'The Witcher',                    series_number: 5 },
  { title: 'The Tower of the Swallow',          author: 'Andrzej Sapkowski',      series: 'The Witcher',                    series_number: 6 },
  { title: 'The Lady of the Lake',              author: 'Andrzej Sapkowski',      series: 'The Witcher',                    series_number: 7 },
  { title: 'Season of Storms',                  author: 'Andrzej Sapkowski',      series: 'The Witcher',                    series_number: 8 },

  // ── Throne of Glass (Sarah J. Maas) ──────────────────────────────────────
  { title: 'The Assassin\'s Blade',             author: 'Sarah J. Maas',          series: 'Throne of Glass',                series_number: 0 },
  { title: 'Crown of Midnight',                 author: 'Sarah J. Maas',          series: 'Throne of Glass',                series_number: 2 },
  { title: 'Heir of Fire',                      author: 'Sarah J. Maas',          series: 'Throne of Glass',                series_number: 3 },
  { title: 'Queen of Shadows',                  author: 'Sarah J. Maas',          series: 'Throne of Glass',                series_number: 4 },
  { title: 'Empire of Storms',                  author: 'Sarah J. Maas',          series: 'Throne of Glass',                series_number: 5 },
  { title: 'Tower of Dawn',                     author: 'Sarah J. Maas',          series: 'Throne of Glass',                series_number: 6 },
  { title: 'Kingdom of Ash',                    author: 'Sarah J. Maas',          series: 'Throne of Glass',                series_number: 7 },

  // ── Wayfarers (Becky Chambers) ────────────────────────────────────────────
  { title: 'A Closed and Common Orbit',         author: 'Becky Chambers',         series: 'Wayfarers',                      series_number: 2 },
  { title: 'Record of a Spaceborn Few',         author: 'Becky Chambers',         series: 'Wayfarers',                      series_number: 3 },
  { title: 'The Galaxy, and the Ground Within', author: 'Becky Chambers',         series: 'Wayfarers',                      series_number: 4 },

  // ── Winternight Trilogy (Katherine Arden) ────────────────────────────────
  { title: 'The Girl in the Tower',             author: 'Katherine Arden',        series: 'Winternight Trilogy',            series_number: 2 },
  { title: 'The Winter of the Witch',           author: 'Katherine Arden',        series: 'Winternight Trilogy',            series_number: 3 },

  // ── Malazan Book of the Fallen (Steven Erikson) — missing starter ─────────
  { title: 'Gardens of the Moon',               author: 'Steven Erikson',         series: 'Malazan Book of the Fallen',     series_number: 1 },

  // ── The Licanius Trilogy (James Islington) ───────────────────────────────
  { title: 'The Shadow of What Was Lost',       author: 'James Islington',        series: 'The Licanius Trilogy',           series_number: 1 },
  { title: 'An Echo of Things to Come',         author: 'James Islington',        series: 'The Licanius Trilogy',           series_number: 2 },
  { title: 'The Light of All That Falls',       author: 'James Islington',        series: 'The Licanius Trilogy',           series_number: 3 },

  // ── The Hierarchy (James Islington) ──────────────────────────────────────
  { title: 'The Will of the Many',              author: 'James Islington',        series: 'The Hierarchy',                  series_number: 1 },
  { title: 'The Strength of the Few',           author: 'James Islington',        series: 'The Hierarchy',                  series_number: 2 },
  { title: 'The Justice of One',                author: 'James Islington',        series: 'The Hierarchy',                  series_number: 3 },

  // ── Robin Hobb — sub-series within Realm of the Elderlings ──────────────
  // The Farseer Trilogy (#2 & #3 already in array above)
  { title: "Assassin's Apprentice",             author: 'Robin Hobb',             series: 'The Farseer Trilogy',            series_number: 1 },

  // Liveship Traders
  { title: 'Ship of Magic',                     author: 'Robin Hobb',             series: 'Liveship Traders',               series_number: 1 },
  { title: 'The Mad Ship',                      author: 'Robin Hobb',             series: 'Liveship Traders',               series_number: 2 },
  { title: 'Ship of Destiny',                   author: 'Robin Hobb',             series: 'Liveship Traders',               series_number: 3 },

  // Tawny Man Trilogy
  { title: "Fool's Errand",                     author: 'Robin Hobb',             series: 'Tawny Man Trilogy',              series_number: 1 },
  { title: 'The Golden Fool',                   author: 'Robin Hobb',             series: 'Tawny Man Trilogy',              series_number: 2 },
  { title: "Fool's Fate",                       author: 'Robin Hobb',             series: 'Tawny Man Trilogy',              series_number: 3 },

  // Rain Wild Chronicles
  { title: 'Dragon Keeper',                     author: 'Robin Hobb',             series: 'Rain Wild Chronicles',           series_number: 1 },
  { title: 'Dragon Haven',                      author: 'Robin Hobb',             series: 'Rain Wild Chronicles',           series_number: 2 },
  { title: 'City of Dragons',                   author: 'Robin Hobb',             series: 'Rain Wild Chronicles',           series_number: 3 },
  { title: 'Blood of Dragons',                  author: 'Robin Hobb',             series: 'Rain Wild Chronicles',           series_number: 4 },

  // Fitz and the Fool
  { title: "Fool's Assassin",                   author: 'Robin Hobb',             series: 'Fitz and the Fool',              series_number: 1 },
  { title: "Fool's Quest",                      author: 'Robin Hobb',             series: 'Fitz and the Fool',              series_number: 2 },
  { title: "Assassin's Fate",                   author: 'Robin Hobb',             series: 'Fitz and the Fool',              series_number: 3 },

  // ── The Faithful and the Fallen (John Gwynne) — missing starter ───────────
  { title: 'Malice',                            author: 'John Gwynne',            series: 'The Faithful and the Fallen',    series_number: 1 },

  // ── The First Law (Joe Abercrombie) — missing starter ────────────────────
  { title: 'The Blade Itself',                  author: 'Joe Abercrombie',        series: 'The First Law',                  series_number: 1 },

  // ── Red Rising (Pierce Brown) — missing starter + final book ─────────────
  { title: 'Red Rising',                        author: 'Pierce Brown',           series: 'Red Rising',                     series_number: 1 },
  { title: 'Red God',                           author: 'Pierce Brown',           series: 'Red Rising',                     series_number: 7 },

  // ── The Kingkiller Chronicle (Patrick Rothfuss) — missing starter ─────────
  { title: 'The Name of the Wind',              author: 'Patrick Rothfuss',       series: 'The Kingkiller Chronicle',       series_number: 1 },

  // ── The Stormlight Archive (Brandon Sanderson) — missing first two ────────
  { title: 'The Way of Kings',                  author: 'Brandon Sanderson',      series: 'The Stormlight Archive',         series_number: 1 },
  { title: 'Words of Radiance',                 author: 'Brandon Sanderson',      series: 'The Stormlight Archive',         series_number: 2 },

  // ── A Song of Ice and Fire (George R.R. Martin) — missing starter ─────────
  { title: 'A Game of Thrones',                 author: 'George R.R. Martin',     series: 'A Song of Ice and Fire',         series_number: 1 },

  // ── The Wheel of Time — missing starter ──────────────────────────────────
  { title: 'The Eye of the World',              author: 'Robert Jordan',           series: 'The Wheel of Time',              series_number: 1 },

  // ── The Poppy War — missing starter ──────────────────────────────────────
  { title: 'The Poppy War',                     author: 'R.F. Kuang',              series: 'The Poppy War',                  series_number: 1 },

  // ── The Green Bone Saga — missing starter ────────────────────────────────
  { title: 'Jade City',                         author: 'Fonda Lee',               series: 'The Green Bone Saga',            series_number: 1 },

  // ── The Locked Tomb (Tamsyn Muir) ────────────────────────────────────────
  { title: 'Gideon the Ninth',                  author: 'Tamsyn Muir',             series: 'The Locked Tomb',                series_number: 1 },
  { title: 'Harrow the Ninth',                  author: 'Tamsyn Muir',             series: 'The Locked Tomb',                series_number: 2 },
  { title: 'Nona the Ninth',                    author: 'Tamsyn Muir',             series: 'The Locked Tomb',                series_number: 3 },

  // ── The Chronicles of Narnia (C.S. Lewis) ────────────────────────────────
  { title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis',          series: 'The Chronicles of Narnia',       series_number: 1 },
  { title: 'Prince Caspian',                    author: 'C.S. Lewis',              series: 'The Chronicles of Narnia',       series_number: 2 },
  { title: 'The Voyage of the Dawn Treader',    author: 'C.S. Lewis',              series: 'The Chronicles of Narnia',       series_number: 3 },
  { title: 'The Silver Chair',                  author: 'C.S. Lewis',              series: 'The Chronicles of Narnia',       series_number: 4 },
  { title: 'The Horse and His Boy',             author: 'C.S. Lewis',              series: 'The Chronicles of Narnia',       series_number: 5 },
  { title: "The Magician's Nephew",             author: 'C.S. Lewis',              series: 'The Chronicles of Narnia',       series_number: 6 },
  { title: 'The Last Battle',                   author: 'C.S. Lewis',              series: 'The Chronicles of Narnia',       series_number: 7 },

  // ── Missing starters for series already in script ─────────────────────────

  { title: 'The Fellowship of the Ring',        author: 'J.R.R. Tolkien',         series: 'The Lord of the Rings',          series_number: 1 },
  { title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling',    series: 'Harry Potter',                   series_number: 1 },
  { title: 'The Final Empire',                  author: 'Brandon Sanderson',       series: 'Mistborn: The Original Trilogy', series_number: 1 },
  { title: 'A Wizard of Earthsea',              author: 'Ursula K. Le Guin',       series: 'Earthsea',                       series_number: 1 },
  { title: 'Guards! Guards!',                   author: 'Terry Pratchett',         series: 'Discworld – City Watch',         series_number: 1 },
  { title: 'The Lies of Locke Lamora',          author: 'Scott Lynch',             series: 'Gentleman Bastard',              series_number: 1 },
  { title: 'The Fifth Season',                  author: 'N.K. Jemisin',            series: 'The Broken Earth',               series_number: 1 },
  { title: 'The Dragonbone Chair',              author: 'Tad Williams',            series: 'Memory, Sorrow and Thorn',       series_number: 1 },
  { title: 'Six of Crows',                      author: 'Leigh Bardugo',           series: 'Six of Crows',                   series_number: 1 },
  { title: 'Shadow and Bone',                   author: 'Leigh Bardugo',           series: 'Shadow and Bone',                series_number: 1 },
  { title: 'Fourth Wing',                       author: 'Rebecca Yarros',          series: 'The Empyrean',                   series_number: 1 },
  { title: 'Eragon',                            author: 'Christopher Paolini',     series: 'The Inheritance Cycle',          series_number: 1 },
  { title: 'The Magicians',                     author: 'Lev Grossman',            series: 'The Magicians',                  series_number: 1 },
  { title: 'The Bear and the Nightingale',      author: 'Katherine Arden',         series: 'Winternight Trilogy',            series_number: 1 },
  { title: 'A Deadly Education',                author: 'Naomi Novik',             series: 'The Scholomance',                series_number: 1 },
  { title: 'Storm Front',                       author: 'Jim Butcher',             series: 'The Dresden Files',              series_number: 1 },
  { title: 'Sabriel',                           author: 'Garth Nix',               series: 'The Old Kingdom',                series_number: 1 },
  { title: 'The Black Prism',                   author: 'Brent Weeks',             series: 'Lightbringer',                   series_number: 1 },
  { title: 'The Way of Shadows',                author: 'Brent Weeks',             series: 'Night Angel',                    series_number: 1 },
  { title: 'The Darkness That Comes Before',    author: 'R. Scott Bakker',         series: 'The Prince of Nothing',          series_number: 1 },
  { title: 'The Traitor Baru Cormorant',        author: 'Seth Dickinson',          series: 'The Masquerade',                 series_number: 1 },
  { title: 'Ink and Bone',                      author: 'Rachel Caine',            series: 'The Great Library',              series_number: 1 },
  { title: 'Senlin Ascends',                    author: 'Josiah Bancroft',         series: 'The Books of Babel',             series_number: 1 },
  { title: 'The Rage of Dragons',               author: 'Evan Winter',             series: 'The Burning',                    series_number: 1 },
  { title: 'City of Bones',                     author: 'Cassandra Clare',         series: 'The Mortal Instruments',         series_number: 1 },
  { title: 'The Cruel Prince',                  author: 'Holly Black',             series: 'The Folk of the Air',            series_number: 1 },
  { title: 'An Ember in the Ashes',             author: 'Sabaa Tahir',             series: 'An Ember in the Ashes',          series_number: 1 },
  { title: 'Children of Blood and Bone',        author: 'Tomi Adeyemi',            series: 'Legacy of Orïsha',               series_number: 1 },
  { title: 'A Darker Shade of Magic',           author: 'V.E. Schwab',             series: 'Shades of Magic',                series_number: 1 },
  { title: 'The Last Wish',                     author: 'Andrzej Sapkowski',       series: 'The Witcher',                    series_number: 1 },
  { title: 'The Shadow of the Torturer',        author: 'Gene Wolfe',              series: 'The Book of the New Sun',        series_number: 1 },
  { title: 'Foundryside',                       author: 'Robert Jackson Bennett',  series: 'Founders',                       series_number: 1 },

  // ── Percy Jackson & The Olympians (Rick Riordan) ─────────────────────────
  { title: 'The Lightning Thief',               author: 'Rick Riordan',            series: 'Percy Jackson & The Olympians',  series_number: 1 },
  { title: 'The Sea of Monsters',               author: 'Rick Riordan',            series: 'Percy Jackson & The Olympians',  series_number: 2 },
  { title: "The Titan's Curse",                 author: 'Rick Riordan',            series: 'Percy Jackson & The Olympians',  series_number: 3 },
  { title: 'The Battle of the Labyrinth',       author: 'Rick Riordan',            series: 'Percy Jackson & The Olympians',  series_number: 4 },
  { title: 'The Last Olympian',                 author: 'Rick Riordan',            series: 'Percy Jackson & The Olympians',  series_number: 5 },

  // ── His Dark Materials (Philip Pullman) ──────────────────────────────────
  { title: 'The Golden Compass',                author: 'Philip Pullman',          series: 'His Dark Materials',             series_number: 1 },
  { title: 'The Subtle Knife',                  author: 'Philip Pullman',          series: 'His Dark Materials',             series_number: 2 },
  { title: 'The Amber Spyglass',                author: 'Philip Pullman',          series: 'His Dark Materials',             series_number: 3 },

  // ── The Dark Tower (Stephen King) ────────────────────────────────────────
  { title: 'The Gunslinger',                    author: 'Stephen King',            series: 'The Dark Tower',                 series_number: 1 },
  { title: 'The Drawing of the Three',          author: 'Stephen King',            series: 'The Dark Tower',                 series_number: 2 },
  { title: 'The Waste Lands',                   author: 'Stephen King',            series: 'The Dark Tower',                 series_number: 3 },
  { title: 'Wizard and Glass',                  author: 'Stephen King',            series: 'The Dark Tower',                 series_number: 4 },
  { title: 'Wolves of the Calla',               author: 'Stephen King',            series: 'The Dark Tower',                 series_number: 5 },
  { title: 'Song of Susannah',                  author: 'Stephen King',            series: 'The Dark Tower',                 series_number: 6 },
  { title: 'The Dark Tower',                    author: 'Stephen King',            series: 'The Dark Tower',                 series_number: 7 },
  { title: 'The Wind Through the Keyhole',      author: 'Stephen King',            series: 'The Dark Tower',                 series_number: 8 },

  // ── The Bound and the Broken (Ryan Cahill) ────────────────────────────────
  { title: 'Of Blood and Fire',                 author: 'Ryan Cahill',             series: 'The Bound and the Broken',       series_number: 1 },
  { title: 'Of Darkness and Light',             author: 'Ryan Cahill',             series: 'The Bound and the Broken',       series_number: 2 },
  { title: 'Of War and Ruin',                   author: 'Ryan Cahill',             series: 'The Bound and the Broken',       series_number: 3 },

  // ── The Chronicles of Amber (Roger Zelazny) ──────────────────────────────
  { title: 'Nine Princes in Amber',             author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 1 },
  { title: 'The Guns of Avalon',                author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 2 },
  { title: 'Sign of the Unicorn',               author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 3 },
  { title: 'The Hand of Oberon',                author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 4 },
  { title: 'The Courts of Chaos',               author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 5 },
  { title: 'Trumps of Doom',                    author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 6 },
  { title: 'Blood of Amber',                    author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 7 },
  { title: 'Sign of Chaos',                     author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 8 },
  { title: 'Knight of Shadows',                 author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 9 },
  { title: 'Prince of Chaos',                   author: 'Roger Zelazny',           series: 'The Chronicles of Amber',        series_number: 10 },

  // ── The Belgariad (David Eddings) ─────────────────────────────────────────
  { title: 'Pawn of Prophecy',                  author: 'David Eddings',           series: 'The Belgariad',                  series_number: 1 },
  { title: 'Queen of Sorcery',                  author: 'David Eddings',           series: 'The Belgariad',                  series_number: 2 },
  { title: "Magician's Gambit",                 author: 'David Eddings',           series: 'The Belgariad',                  series_number: 3 },
  { title: 'Castle of Wizardry',                author: 'David Eddings',           series: 'The Belgariad',                  series_number: 4 },
  { title: "Enchanters' End Game",              author: 'David Eddings',           series: 'The Belgariad',                  series_number: 5 },

  // ── The Riftwar Saga (Raymond E. Feist) ──────────────────────────────────
  { title: 'Magician',                          author: 'Raymond E. Feist',        series: 'The Riftwar Saga',               series_number: 1 },
  { title: 'Silverthorn',                       author: 'Raymond E. Feist',        series: 'The Riftwar Saga',               series_number: 2 },
  { title: 'A Darkness at Sethanon',            author: 'Raymond E. Feist',        series: 'The Riftwar Saga',               series_number: 3 },

  // ── The Black Company (Glen Cook) ─────────────────────────────────────────
  { title: 'The Black Company',                 author: 'Glen Cook',               series: 'The Black Company',              series_number: 1 },
  { title: 'Shadows Linger',                    author: 'Glen Cook',               series: 'The Black Company',              series_number: 2 },
  { title: 'The White Rose',                    author: 'Glen Cook',               series: 'The Black Company',              series_number: 3 },
  { title: 'The Silver Spike',                  author: 'Glen Cook',               series: 'The Black Company',              series_number: 4 },
  { title: 'Shadow Games',                      author: 'Glen Cook',               series: 'The Black Company',              series_number: 5 },
  { title: 'Dreams of Steel',                   author: 'Glen Cook',               series: 'The Black Company',              series_number: 6 },
  { title: 'Bleak Seasons',                     author: 'Glen Cook',               series: 'The Black Company',              series_number: 7 },
  { title: 'She Is the Darkness',               author: 'Glen Cook',               series: 'The Black Company',              series_number: 8 },
  { title: 'Water Sleeps',                      author: 'Glen Cook',               series: 'The Black Company',              series_number: 9 },
  { title: 'Soldiers Live',                     author: 'Glen Cook',               series: 'The Black Company',              series_number: 10 },

  // ── Outlander (Diana Gabaldon) ────────────────────────────────────────────
  { title: 'Outlander',                         author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 1 },
  { title: 'Dragonfly in Amber',                author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 2 },
  { title: 'Voyager',                           author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 3 },
  { title: 'Drums of Autumn',                   author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 4 },
  { title: 'The Fiery Cross',                   author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 5 },
  { title: 'A Breath of Snow and Ashes',        author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 6 },
  { title: 'An Echo in the Bone',               author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 7 },
  { title: "Written in My Own Heart's Blood",   author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 8 },
  { title: 'Go Tell the Bees That I Am Gone',   author: 'Diana Gabaldon',          series: 'Outlander',                      series_number: 9 },

  // ── Dragonriders of Pern (Anne McCaffrey) ────────────────────────────────
  { title: 'Dragonflight',                      author: 'Anne McCaffrey',          series: 'Dragonriders of Pern',           series_number: 1 },
  { title: 'Dragonquest',                       author: 'Anne McCaffrey',          series: 'Dragonriders of Pern',           series_number: 2 },
  { title: 'The White Dragon',                  author: 'Anne McCaffrey',          series: 'Dragonriders of Pern',           series_number: 3 },

  // ── The Shannara Chronicles (Terry Brooks) ────────────────────────────────
  { title: 'The Sword of Shannara',             author: 'Terry Brooks',            series: 'The Shannara Chronicles',        series_number: 1 },
  { title: 'The Elfstones of Shannara',         author: 'Terry Brooks',            series: 'The Shannara Chronicles',        series_number: 2 },
  { title: 'The Wishsong of Shannara',          author: 'Terry Brooks',            series: 'The Shannara Chronicles',        series_number: 3 },

  // ── The Legend of Drizzt (R.A. Salvatore) ────────────────────────────────
  { title: 'Homeland',                          author: 'R.A. Salvatore',          series: 'The Legend of Drizzt',           series_number: 1 },
  { title: 'Exile',                             author: 'R.A. Salvatore',          series: 'The Legend of Drizzt',           series_number: 2 },
  { title: 'Sojourn',                           author: 'R.A. Salvatore',          series: 'The Legend of Drizzt',           series_number: 3 },
  { title: 'The Crystal Shard',                 author: 'R.A. Salvatore',          series: 'The Legend of Drizzt',           series_number: 4 },
  { title: 'Streams of Silver',                 author: 'R.A. Salvatore',          series: 'The Legend of Drizzt',           series_number: 5 },
  { title: "The Halfling's Gem",                author: 'R.A. Salvatore',          series: 'The Legend of Drizzt',           series_number: 6 },

  // ── Redwall (Brian Jacques) ───────────────────────────────────────────────
  { title: 'Redwall',                           author: 'Brian Jacques',           series: 'Redwall',                        series_number: 1 },
  { title: 'Mossflower',                        author: 'Brian Jacques',           series: 'Redwall',                        series_number: 2 },
  { title: 'Mattimeo',                          author: 'Brian Jacques',           series: 'Redwall',                        series_number: 3 },
  { title: 'Mariel of Redwall',                 author: 'Brian Jacques',           series: 'Redwall',                        series_number: 4 },
  { title: 'Salamandastron',                    author: 'Brian Jacques',           series: 'Redwall',                        series_number: 5 },

  // ── The Bartimaeus Sequence (Jonathan Stroud) ─────────────────────────────
  { title: 'The Amulet of Samarkand',           author: 'Jonathan Stroud',         series: 'The Bartimaeus Sequence',        series_number: 1 },
  { title: "The Golem's Eye",                   author: 'Jonathan Stroud',         series: 'The Bartimaeus Sequence',        series_number: 2 },
  { title: "Ptolemy's Gate",                    author: 'Jonathan Stroud',         series: 'The Bartimaeus Sequence',        series_number: 3 },

  // ── The Daevabad Trilogy (S.A. Chakraborty) ──────────────────────────────
  { title: 'The City of Brass',                 author: 'S.A. Chakraborty',        series: 'The Daevabad Trilogy',           series_number: 1 },
  { title: 'The Kingdom of Copper',             author: 'S.A. Chakraborty',        series: 'The Daevabad Trilogy',           series_number: 2 },
  { title: 'The Empire of Gold',                author: 'S.A. Chakraborty',        series: 'The Daevabad Trilogy',           series_number: 3 },

  // ── Temeraire (Naomi Novik) ───────────────────────────────────────────────
  { title: "His Majesty's Dragon",              author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 1 },
  { title: 'Throne of Jade',                    author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 2 },
  { title: 'Black Powder War',                  author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 3 },
  { title: 'Empire of Ivory',                   author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 4 },
  { title: 'Victory of Eagles',                 author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 5 },
  { title: 'Tongues of Serpents',               author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 6 },
  { title: 'Crucible of Gold',                  author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 7 },
  { title: 'Blood of Tyrants',                  author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 8 },
  { title: 'League of Dragons',                 author: 'Naomi Novik',             series: 'Temeraire',                      series_number: 9 },

  // ── The Riyria Revelations (Michael J. Sullivan) ──────────────────────────
  { title: 'Theft of Swords',                   author: 'Michael J. Sullivan',     series: 'The Riyria Revelations',         series_number: 1 },
  { title: 'Rise of Empire',                    author: 'Michael J. Sullivan',     series: 'The Riyria Revelations',         series_number: 2 },
  { title: 'Heir of Novron',                    author: 'Michael J. Sullivan',     series: 'The Riyria Revelations',         series_number: 3 },

  // ── The Powder Mage Trilogy (Brian McClellan) ─────────────────────────────
  { title: 'Promise of Blood',                  author: 'Brian McClellan',         series: 'The Powder Mage Trilogy',        series_number: 1 },
  { title: 'The Crimson Campaign',              author: 'Brian McClellan',         series: 'The Powder Mage Trilogy',        series_number: 2 },
  { title: 'The Autumn Republic',               author: 'Brian McClellan',         series: 'The Powder Mage Trilogy',        series_number: 3 },

  // ── The Demon Cycle (Peter V. Brett) ─────────────────────────────────────
  { title: 'The Warded Man',                    author: 'Peter V. Brett',          series: 'The Demon Cycle',                series_number: 1 },
  { title: 'The Desert Spear',                  author: 'Peter V. Brett',          series: 'The Demon Cycle',                series_number: 2 },
  { title: 'The Daylight War',                  author: 'Peter V. Brett',          series: 'The Demon Cycle',                series_number: 3 },
  { title: 'The Skull Throne',                  author: 'Peter V. Brett',          series: 'The Demon Cycle',                series_number: 4 },
  { title: 'The Core',                          author: 'Peter V. Brett',          series: 'The Demon Cycle',                series_number: 5 },

  // ── The Gormenghast Trilogy (Mervyn Peake) ───────────────────────────────
  { title: 'Titus Groan',                       author: 'Mervyn Peake',            series: 'The Gormenghast Trilogy',        series_number: 1 },
  { title: 'Gormenghast',                       author: 'Mervyn Peake',            series: 'The Gormenghast Trilogy',        series_number: 2 },
  { title: 'Titus Alone',                       author: 'Mervyn Peake',            series: 'The Gormenghast Trilogy',        series_number: 3 },

  // ── The Elric Saga (Michael Moorcock) ────────────────────────────────────
  { title: 'Elric of Melniboné',                author: 'Michael Moorcock',        series: 'The Elric Saga',                 series_number: 1 },
  { title: 'The Sailor on the Seas of Fate',    author: 'Michael Moorcock',        series: 'The Elric Saga',                 series_number: 2 },
  { title: 'The Weird of the White Wolf',       author: 'Michael Moorcock',        series: 'The Elric Saga',                 series_number: 3 },
  { title: 'The Vanishing Tower',               author: 'Michael Moorcock',        series: 'The Elric Saga',                 series_number: 4 },
  { title: 'The Bane of the Black Sword',       author: 'Michael Moorcock',        series: 'The Elric Saga',                 series_number: 5 },
  { title: 'Stormbringer',                      author: 'Michael Moorcock',        series: 'The Elric Saga',                 series_number: 6 },

  // ── The Acts of Caine (Matthew Stover) ───────────────────────────────────
  { title: 'Heroes Die',                        author: 'Matthew Stover',          series: 'The Acts of Caine',              series_number: 1 },
  { title: 'Blade of Tyshalle',                 author: 'Matthew Stover',          series: 'The Acts of Caine',              series_number: 2 },
  { title: 'Caine Black Knife',                 author: 'Matthew Stover',          series: 'The Acts of Caine',              series_number: 3 },
  { title: "Caine's Law",                       author: 'Matthew Stover',          series: 'The Acts of Caine',              series_number: 4 },

  // ── The Dagger and the Coin (Daniel Abraham) ─────────────────────────────
  { title: "The Dragon's Path",                 author: 'Daniel Abraham',          series: 'The Dagger and the Coin',        series_number: 1 },
  { title: "The King's Blood",                  author: 'Daniel Abraham',          series: 'The Dagger and the Coin',        series_number: 2 },
  { title: "The Tyrant's Law",                  author: 'Daniel Abraham',          series: 'The Dagger and the Coin',        series_number: 3 },
  { title: "The Widow's House",                 author: 'Daniel Abraham',          series: 'The Dagger and the Coin',        series_number: 4 },
  { title: "The Spider's War",                  author: 'Daniel Abraham',          series: 'The Dagger and the Coin',        series_number: 5 },

  // ── The Long Price Quartet (Daniel Abraham) ───────────────────────────────
  { title: 'A Shadow in Summer',                author: 'Daniel Abraham',          series: 'The Long Price Quartet',         series_number: 1 },
  { title: 'A Betrayal in Winter',              author: 'Daniel Abraham',          series: 'The Long Price Quartet',         series_number: 2 },
  { title: 'An Autumn War',                     author: 'Daniel Abraham',          series: 'The Long Price Quartet',         series_number: 3 },
  { title: 'The Price of Spring',               author: 'Daniel Abraham',          series: 'The Long Price Quartet',         series_number: 4 },

  // ── Kushiel's Legacy (Jacqueline Carey) ──────────────────────────────────
  { title: "Kushiel's Dart",                    author: 'Jacqueline Carey',        series: "Kushiel's Legacy",               series_number: 1 },
  { title: "Kushiel's Chosen",                  author: 'Jacqueline Carey',        series: "Kushiel's Legacy",               series_number: 2 },
  { title: "Kushiel's Avatar",                  author: 'Jacqueline Carey',        series: "Kushiel's Legacy",               series_number: 3 },
  { title: "Kushiel's Scion",                   author: 'Jacqueline Carey',        series: "Kushiel's Legacy",               series_number: 4 },
  { title: "Kushiel's Justice",                 author: 'Jacqueline Carey',        series: "Kushiel's Legacy",               series_number: 5 },
  { title: "Kushiel's Mercy",                   author: 'Jacqueline Carey',        series: "Kushiel's Legacy",               series_number: 6 },

  // ── The Chronicles of Thomas Covenant (Stephen R. Donaldson) ─────────────
  { title: "Lord Foul's Bane",                  author: 'Stephen R. Donaldson',    series: 'The Chronicles of Thomas Covenant', series_number: 1 },
  { title: 'The Illearth War',                  author: 'Stephen R. Donaldson',    series: 'The Chronicles of Thomas Covenant', series_number: 2 },
  { title: 'The Power That Preserves',          author: 'Stephen R. Donaldson',    series: 'The Chronicles of Thomas Covenant', series_number: 3 },

  // ── The Last Herald-Mage (Mercedes Lackey) ───────────────────────────────
  { title: "Magic's Pawn",                      author: 'Mercedes Lackey',         series: 'The Last Herald-Mage',           series_number: 1 },
  { title: "Magic's Promise",                   author: 'Mercedes Lackey',         series: 'The Last Herald-Mage',           series_number: 2 },
  { title: "Magic's Price",                     author: 'Mercedes Lackey',         series: 'The Last Herald-Mage',           series_number: 3 },

  // ── The Dying Earth (Jack Vance) ─────────────────────────────────────────
  { title: 'The Dying Earth',                   author: 'Jack Vance',              series: 'The Dying Earth',                series_number: 1 },
  { title: 'The Eyes of the Overworld',         author: 'Jack Vance',              series: 'The Dying Earth',                series_number: 2 },
  { title: "Cugel's Saga",                      author: 'Jack Vance',              series: 'The Dying Earth',                series_number: 3 },
  { title: 'Rhialto the Marvellous',            author: 'Jack Vance',              series: 'The Dying Earth',                series_number: 4 },

  // ── The Fionavar Tapestry (Guy Gavriel Kay) ───────────────────────────────
  { title: 'The Summer Tree',                   author: 'Guy Gavriel Kay',         series: 'The Fionavar Tapestry',          series_number: 1 },
  { title: 'The Wandering Fire',                author: 'Guy Gavriel Kay',         series: 'The Fionavar Tapestry',          series_number: 2 },
  { title: 'The Darkest Road',                  author: 'Guy Gavriel Kay',         series: 'The Fionavar Tapestry',          series_number: 3 },

  // ── The Sarantine Mosaic (Guy Gavriel Kay) ────────────────────────────────
  { title: 'Sailing to Sarantium',              author: 'Guy Gavriel Kay',         series: 'The Sarantine Mosaic',           series_number: 1 },
  { title: 'Lord of Emperors',                  author: 'Guy Gavriel Kay',         series: 'The Sarantine Mosaic',           series_number: 2 },

  // ── The Divine Cities (Robert Jackson Bennett) ────────────────────────────
  { title: 'City of Stairs',                    author: 'Robert Jackson Bennett',  series: 'The Divine Cities',              series_number: 1 },
  { title: 'City of Blades',                    author: 'Robert Jackson Bennett',  series: 'The Divine Cities',              series_number: 2 },
  { title: 'City of Miracles',                  author: 'Robert Jackson Bennett',  series: 'The Divine Cities',              series_number: 3 },

  // ── The Shadow Campaigns (Django Wexler) ─────────────────────────────────
  { title: 'The Thousand Names',                author: 'Django Wexler',           series: 'The Shadow Campaigns',           series_number: 1 },
  { title: 'The Shadow Throne',                 author: 'Django Wexler',           series: 'The Shadow Campaigns',           series_number: 2 },
  { title: 'The Price of Valor',                author: 'Django Wexler',           series: 'The Shadow Campaigns',           series_number: 3 },
  { title: 'The Guns of Empire',                author: 'Django Wexler',           series: 'The Shadow Campaigns',           series_number: 4 },
  { title: 'The Infernal Battalion',            author: 'Django Wexler',           series: 'The Shadow Campaigns',           series_number: 5 },

  // ── Kings of the Wyld (Nicholas Eames) ───────────────────────────────────
  { title: 'Kings of the Wyld',                 author: 'Nicholas Eames',          series: 'Kings of the Wyld',              series_number: 1 },
  { title: 'Bloody Rose',                       author: 'Nicholas Eames',          series: 'Kings of the Wyld',              series_number: 2 },

  // ── The Lunar Chronicles (Marissa Meyer) ─────────────────────────────────
  { title: 'Cinder',                            author: 'Marissa Meyer',           series: 'The Lunar Chronicles',           series_number: 1 },
  { title: 'Scarlet',                           author: 'Marissa Meyer',           series: 'The Lunar Chronicles',           series_number: 2 },
  { title: 'Cress',                             author: 'Marissa Meyer',           series: 'The Lunar Chronicles',           series_number: 3 },
  { title: 'Winter',                            author: 'Marissa Meyer',           series: 'The Lunar Chronicles',           series_number: 4 },

  // ── Daughter of Smoke and Bone (Laini Taylor) ─────────────────────────────
  { title: 'Daughter of Smoke and Bone',        author: 'Laini Taylor',            series: 'Daughter of Smoke and Bone',     series_number: 1 },
  { title: 'Days of Blood and Starlight',       author: 'Laini Taylor',            series: 'Daughter of Smoke and Bone',     series_number: 2 },
  { title: 'Dreams of Gods and Monsters',       author: 'Laini Taylor',            series: 'Daughter of Smoke and Bone',     series_number: 3 },

  // ── Crescent City (Sarah J. Maas) ────────────────────────────────────────
  { title: 'House of Earth and Blood',          author: 'Sarah J. Maas',           series: 'Crescent City',                  series_number: 1 },
  { title: 'House of Sky and Breath',           author: 'Sarah J. Maas',           series: 'Crescent City',                  series_number: 2 },
  { title: 'House of Flame and Shadow',         author: 'Sarah J. Maas',           series: 'Crescent City',                  series_number: 3 },

  // ── Serpent & Dove (Shelby Mahurin) ──────────────────────────────────────
  { title: 'Serpent & Dove',                    author: 'Shelby Mahurin',          series: 'Serpent & Dove',                 series_number: 1 },
  { title: 'Blood & Honey',                     author: 'Shelby Mahurin',          series: 'Serpent & Dove',                 series_number: 2 },
  { title: 'Gods & Monsters',                   author: 'Shelby Mahurin',          series: 'Serpent & Dove',                 series_number: 3 },

  // ── The Seven Realms (Cinda Williams Chima) ───────────────────────────────
  { title: 'The Demon King',                    author: 'Cinda Williams Chima',    series: 'The Seven Realms',               series_number: 1 },
  { title: 'The Exiled Queen',                  author: 'Cinda Williams Chima',    series: 'The Seven Realms',               series_number: 2 },
  { title: 'The Gray Wolf Throne',              author: 'Cinda Williams Chima',    series: 'The Seven Realms',               series_number: 3 },
  { title: 'The Crimson Crown',                 author: 'Cinda Williams Chima',    series: 'The Seven Realms',               series_number: 4 },

  // ── The Winner's Trilogy (Marie Rutkoski) ────────────────────────────────
  { title: "The Winner's Curse",                author: 'Marie Rutkoski',          series: "The Winner's Trilogy",           series_number: 1 },
  { title: "The Winner's Crime",                author: 'Marie Rutkoski',          series: "The Winner's Trilogy",           series_number: 2 },
  { title: "The Winner's Kiss",                 author: 'Marie Rutkoski',          series: "The Winner's Trilogy",           series_number: 3 },

  // ── The Raven Cycle (Maggie Stiefvater) ──────────────────────────────────
  { title: 'The Raven Boys',                    author: 'Maggie Stiefvater',       series: 'The Raven Cycle',                series_number: 1 },
  { title: 'The Dream Thieves',                 author: 'Maggie Stiefvater',       series: 'The Raven Cycle',                series_number: 2 },
  { title: 'Blue Lily, Lily Blue',              author: 'Maggie Stiefvater',       series: 'The Raven Cycle',                series_number: 3 },
  { title: 'The Raven King',                    author: 'Maggie Stiefvater',       series: 'The Raven Cycle',                series_number: 4 },

  // ── Wayward Children (Seanan McGuire) ────────────────────────────────────
  { title: 'Every Heart a Doorway',             author: 'Seanan McGuire',          series: 'Wayward Children',               series_number: 1 },
  { title: 'Down Among the Sticks and Bones',   author: 'Seanan McGuire',          series: 'Wayward Children',               series_number: 2 },
  { title: 'Beneath the Sugar Sky',             author: 'Seanan McGuire',          series: 'Wayward Children',               series_number: 3 },
  { title: 'In an Absent Dream',                author: 'Seanan McGuire',          series: 'Wayward Children',               series_number: 4 },
  { title: 'Where the Drowned Girls Go',        author: 'Seanan McGuire',          series: 'Wayward Children',               series_number: 5 },

  // ── The Singing Hills Cycle (Nghi Vo) ────────────────────────────────────
  { title: 'The Empress of Salt and Fortune',   author: 'Nghi Vo',                 series: 'The Singing Hills Cycle',        series_number: 1 },
  { title: 'When the Tiger Came Down the Mountain', author: 'Nghi Vo',             series: 'The Singing Hills Cycle',        series_number: 2 },
  { title: 'Into the Riverlands',               author: 'Nghi Vo',                 series: 'The Singing Hills Cycle',        series_number: 3 },
  { title: 'Mammoths at the Gates',             author: 'Nghi Vo',                 series: 'The Singing Hills Cycle',        series_number: 4 },
  { title: 'The Brides of High Hill',           author: 'Nghi Vo',                 series: 'The Singing Hills Cycle',        series_number: 5 },

  // ── The Spellmonger (Terry Mancour) ──────────────────────────────────────
  { title: 'Spellmonger',                       author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 1 },
  { title: 'Warmage',                           author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 2 },
  { title: 'Magelord',                          author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 3 },
  { title: 'Knights Magi',                      author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 4 },
  { title: 'High Mage',                         author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 5 },
  { title: 'Journeymage',                       author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 6 },
  { title: 'Enchanter',                         author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 7 },
  { title: 'Court Wizard',                      author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 8 },
  { title: 'Shadowmage',                        author: 'Terry Mancour',           series: 'The Spellmonger',                series_number: 9 },

  // ── Dungeon Crawler Carl (Matt Dinniman) ─────────────────────────────────
  { title: "Carl's Doomsday Scenario",          author: 'Matt Dinniman',           series: 'Dungeon Crawler Carl',           series_number: 2 },
  { title: "The Dungeon Anarchist's Cookbook",  author: 'Matt Dinniman',           series: 'Dungeon Crawler Carl',           series_number: 3 },
  { title: 'The Mountain Was Supposed to Be Safe', author: 'Matt Dinniman',        series: 'Dungeon Crawler Carl',           series_number: 4 },
  { title: 'The Eye of the Bedlam Bride',       author: 'Matt Dinniman',           series: 'Dungeon Crawler Carl',           series_number: 6 },

  // ── Remembrance of Earth's Past (Cixin Liu) ───────────────────────────────
  { title: 'The Three-Body Problem',            author: 'Cixin Liu',               series: "Remembrance of Earth's Past",    series_number: 1 },
  { title: 'The Dark Forest',                   author: 'Cixin Liu',               series: "Remembrance of Earth's Past",    series_number: 2 },

  // ── He Who Fights With Monsters (Travis Deverell) ────────────────────────
  { title: 'He Who Fights With Monsters 2',     author: 'Jason Cheyne',            series: 'He Who Fights With Monsters',    series_number: 2 },
  { title: 'He Who Fights With Monsters 3',     author: 'Jason Cheyne',            series: 'He Who Fights With Monsters',    series_number: 4 },
  { title: 'He Who Fights With Monsters 6',     author: 'Jason Cheyne',            series: 'He Who Fights With Monsters',    series_number: 6 },
  { title: 'He Who Fights With Monsters 8',     author: 'Jason Cheyne',            series: 'He Who Fights With Monsters',    series_number: 8 },

  // ── The Murderbot Diaries (Martha Wells) ─────────────────────────────────
  { title: 'All Systems Red',                   author: 'Martha Wells',            series: 'The Murderbot Diaries',          series_number: 1 },
  { title: 'Rogue Protocol',                    author: 'Martha Wells',            series: 'The Murderbot Diaries',          series_number: 3 },
  { title: 'Exit Strategy',                     author: 'Martha Wells',            series: 'The Murderbot Diaries',          series_number: 4 },

  // ── Vampire Academy (Richelle Mead) ──────────────────────────────────────
  { title: 'Frostbite',                         author: 'Richelle Mead',           series: 'Vampire Academy',                series_number: 2 },

  // ── The Book of Dust (Philip Pullman) ────────────────────────────────────
  { title: 'La Belle Sauvage',                  author: 'Philip Pullman',          series: 'The Book of Dust',               series_number: 1 },

  // ── The Goblin Emperor (Katherine Addison) ───────────────────────────────
  { title: 'The Witness for the Dead',          author: 'Katherine Addison',       series: 'The Goblin Emperor',             series_number: 2 },

  // ── Rivers of London (Ben Aaronovitch) ────────────────────────────────────
  { title: 'Lies Sleeping',                     author: 'Ben Aaronovitch',         series: 'Rivers of London',               series_number: 7 },

  // ── The Laundry Files (Charles Stross) ───────────────────────────────────
  { title: 'The Rhesus Chart',                  author: 'Charles Stross',          series: 'The Laundry Files',              series_number: 5 },
  { title: 'Dead Lies Dreaming',                author: 'Charles Stross',          series: 'The Laundry Files',              series_number: 9 },

  // ── Shadows of the Apt (Adrian Tchaikovsky) ───────────────────────────────
  { title: 'The Scarab Path',                   author: 'Adrian Tchaikovsky',      series: 'Shadows of the Apt',             series_number: 5 },
  { title: 'The Sea Watch',                     author: 'Adrian Tchaikovsky',      series: 'Shadows of the Apt',             series_number: 6 },
  { title: 'Heirs of the Blade',                author: 'Adrian Tchaikovsky',      series: 'Shadows of the Apt',             series_number: 7 },
  { title: 'The Air War',                       author: 'Adrian Tchaikovsky',      series: 'Shadows of the Apt',             series_number: 8 },

  // ── Codex Alera (Jim Butcher) ─────────────────────────────────────────────
  { title: "Academ's Fury",                     author: 'Jim Butcher',             series: 'Codex Alera',                    series_number: 2 },
  { title: "Captain's Fury",                    author: 'Jim Butcher',             series: 'Codex Alera',                    series_number: 4 },

  // ── Falling Kingdoms (Morgan Rhodes) ─────────────────────────────────────
  { title: 'Rebel Spring',                      author: 'Morgan Rhodes',           series: 'Falling Kingdoms',               series_number: 2 },

  // ── Hush, Hush (Becca Fitzpatrick) ───────────────────────────────────────
  { title: 'Crescendo',                         author: 'Becca Fitzpatrick',       series: 'Hush, Hush',                     series_number: 2 },

  // ── Alex Verus (Benedict Jacka) ──────────────────────────────────────────
  { title: 'Cursed',                            author: 'Benedict Jacka',          series: 'Alex Verus',                     series_number: 2 },

  // ── A Chorus of Dragons (Jenn Lyons) ─────────────────────────────────────
  { title: 'The Name of All Things',            author: 'Jenn Lyons',              series: 'A Chorus of Dragons',            series_number: 2 },

  // ── The Craft Sequence (Max Gladstone) ───────────────────────────────────
  { title: 'Full Fathom Five',                  author: 'Max Gladstone',           series: 'The Craft Sequence',             series_number: 3 },

  // ── Green Creek (TJ Klune) ────────────────────────────────────────────────
  { title: 'Ravensong',                         author: 'TJ Klune',                series: 'Green Creek',                    series_number: 2 },

  // ── Grimnoir Chronicles (Larry Correia) ──────────────────────────────────
  { title: 'Spellbound',                        author: 'Larry Correia',           series: 'Grimnoir Chronicles',            series_number: 2 },

  // ── Women of the Otherworld (Kelley Armstrong) ───────────────────────────
  { title: 'Haunted',                           author: 'Kelley Armstrong',        series: 'Women of the Otherworld',        series_number: 5 },
  { title: 'Personal Demon',                    author: 'Kelley Armstrong',        series: 'Women of the Otherworld',        series_number: 8 },

  // ── October Daye (Seanan McGuire) ────────────────────────────────────────
  { title: 'Late Eclipses',                     author: 'Seanan McGuire',          series: 'October Daye',                   series_number: 4 },
  { title: 'Chimes at Midnight',                author: 'Seanan McGuire',          series: 'October Daye',                   series_number: 7 },
  { title: 'A Red-Rose Chain',                  author: 'Seanan McGuire',          series: 'October Daye',                   series_number: 9 },
  { title: 'Night and Silence',                 author: 'Seanan McGuire',          series: 'October Daye',                   series_number: 12 },
  { title: 'The Unkindest Tide',                author: 'Seanan McGuire',          series: 'October Daye',                   series_number: 13 },

  // ── Monster Hunter International (Larry Correia) ──────────────────────────
  { title: 'Monster Hunter Legion',             author: 'Larry Correia',           series: 'Monster Hunter International',   series_number: 3 },

  // ── Wells of Sorcery (Django Wexler) ─────────────────────────────────────
  { title: 'City of Stone and Silence',         author: 'Django Wexler',           series: 'Wells of Sorcery',               series_number: 2 },

  // ── Blackthorn & Grim (Juliet Marillier) ─────────────────────────────────
  { title: 'Tower of Thorns',                   author: 'Juliet Marillier',        series: 'Blackthorn & Grim',              series_number: 2 },

  // ── The Bridge Kingdom (Danielle L. Jensen) ──────────────────────────────
  { title: 'The Traitor Queen',                 author: 'Danielle L. Jensen',      series: 'The Bridge Kingdom',             series_number: 2 },

  // ── Legend (Marie Lu) ─────────────────────────────────────────────────────
  { title: 'Legend',                            author: 'Marie Lu',                series: 'Legend',                         series_number: 1 },

  // ── Ghost Roads (Seanan McGuire) ─────────────────────────────────────────
  { title: 'The Girl in the Green Silk Gown',   author: 'Seanan McGuire',          series: 'Ghost Roads',                    series_number: 2 },

  // ── The Wars of Light and Shadow (Janny Wurts) ───────────────────────────
  { title: 'Stormed Fortress',                  author: 'Janny Wurts',             series: 'The Wars of Light and Shadow',   series_number: 7 },

  // ── The Symphony of Ages (Elizabeth Haydon) ──────────────────────────────
  { title: 'Destiny',                           author: 'Elizabeth Haydon',        series: 'The Symphony of Ages',           series_number: 3 },

  // ── The Nicci Chronicles (Terry Goodkind) ────────────────────────────────
  { title: 'Siege of Stone',                    author: 'Terry Goodkind',          series: 'The Nicci Chronicles',           series_number: 3 },

  // ── The Sword of Truth (Terry Goodkind) — gaps ───────────────────────────
  { title: 'Blood of the Fold',                 author: 'Terry Goodkind',          series: 'The Sword of Truth',             series_number: 3 },
  { title: 'The Pillars of Creation',           author: 'Terry Goodkind',          series: 'The Sword of Truth',             series_number: 7 },

  // ── Cainsville (Kelley Armstrong) ────────────────────────────────────────
  { title: 'Vision',                            author: 'Kelley Armstrong',        series: 'Cainsville',                     series_number: 2 },
  { title: 'Deceptions',                        author: 'Kelley Armstrong',        series: 'Cainsville',                     series_number: 3 },

  // ── Mythos Trilogy (Stephen Fry) ─────────────────────────────────────────
  { title: 'Heroes',                            author: 'Stephen Fry',             series: 'Mythos Trilogy',                 series_number: 2 },

  // ── Ithaca (Claire North) ─────────────────────────────────────────────────
  { title: 'House of Odysseus',                 author: 'Claire North',            series: 'Ithaca',                         series_number: 2 },

  // ── Incryptid (Seanan McGuire) ────────────────────────────────────────────
  { title: 'Midnight Blue-Light Special',       author: 'Seanan McGuire',          series: 'Incryptid',                      series_number: 4 },

  // ── Psy-Changeling Trinity (Nalini Singh) ─────────────────────────────────
  { title: 'Last Guard',                        author: 'Nalini Singh',            series: 'Psy-Changeling Trinity',         series_number: 4 },

  // ── The Goblin Emperor series — The Cemeteries of Amalo ──────────────────
  // (series_number 2 handled above; series name in DB is 'The Goblin Emperor')

  // ── Chaos Seeds (Aleron Kong) ─────────────────────────────────────────────
  { title: 'The Land: Alliances',               author: 'Aleron Kong',             series: 'Chaos Seeds',                    series_number: 3 },
  { title: 'The Land: Swarm',                   author: 'Aleron Kong',             series: 'Chaos Seeds',                    series_number: 5 },
  { title: 'The Land: Monsters',                author: 'Aleron Kong',             series: 'Chaos Seeds',                    series_number: 6 },

  // ── Emerilia (Michael Chatfield) ─────────────────────────────────────────
  { title: 'A Touch of Farmhand',               author: 'Michael Chatfield',       series: 'Emerilia',                       series_number: 1 },
  { title: 'Rocky Shores',                      author: 'Michael Chatfield',       series: 'Emerilia',                       series_number: 2 },

  // ── The System Apocalypse (Tao Wong) — gaps ──────────────────────────────
  { title: 'A Healer\'s Gift',                  author: 'Tao Wong',                series: 'The System Apocalypse',          series_number: 3 },
  { title: 'Redeemer of the Dead',              author: 'Tao Wong',                series: 'The System Apocalypse',          series_number: 9 },
  { title: 'The Calm Before',                   author: 'Tao Wong',                series: 'The System Apocalypse',          series_number: 10 },
  { title: 'Cities in Chains',                  author: 'Tao Wong',                series: 'The System Apocalypse',          series_number: 11 },
  { title: 'Broken Council',                    author: 'Tao Wong',                series: 'The System Apocalypse',          series_number: 12 },
  { title: 'Stars Awoken',                      author: 'Tao Wong',                series: 'The System Apocalypse',          series_number: 13 },
  { title: 'Eternal Night',                     author: 'Tao Wong',                series: 'The System Apocalypse',          series_number: 14 },

  // ── Adventures on Brad (Tao Wong) ────────────────────────────────────────
  { title: "A Farmer's Life",                   author: 'Tao Wong',                series: 'Adventures on Brad',             series_number: 1 },
  { title: "A Gamer's Life",                    author: 'Tao Wong',                series: 'Adventures on Brad',             series_number: 2 },
  { title: 'Quests',                            author: 'Tao Wong',                series: 'Adventures on Brad',             series_number: 3 },
  { title: 'The Farm',                          author: 'Tao Wong',                series: 'Adventures on Brad',             series_number: 4 },

  // ── Zodiac Academy (Caroline Peckham) ────────────────────────────────────
  { title: 'Ruthless Fae',                      author: 'Caroline Peckham',        series: 'Zodiac Academy',                 series_number: 2 },
  { title: 'The Reckoning',                     author: 'Caroline Peckham',        series: 'Zodiac Academy',                 series_number: 3 },
  { title: 'Shadow Princess',                   author: 'Caroline Peckham',        series: 'Zodiac Academy',                 series_number: 4 },

  // ── Nova Terra (Seth Ring) ────────────────────────────────────────────────
  { title: 'Titan',                             author: 'Seth Ring',               series: 'Nova Terra',                     series_number: 2 },
  { title: 'Shattered',                         author: 'Seth Ring',               series: 'Nova Terra',                     series_number: 3 },
  { title: 'Castles',                           author: 'Seth Ring',               series: 'Nova Terra',                     series_number: 4 },
  { title: 'Siege',                             author: 'Seth Ring',               series: 'Nova Terra',                     series_number: 5 },

  // ── The Ten Realms (Michael Chatfield) ───────────────────────────────────
  { title: 'The Two Week Curse',                author: 'Michael Chatfield',       series: 'The Ten Realms',                 series_number: 2 },
  { title: 'The Seventh Realm, Part 1',         author: 'Michael Chatfield',       series: 'The Ten Realms',                 series_number: 4 },
  { title: 'The Seventh Realm, Part 2',         author: 'Michael Chatfield',       series: 'The Ten Realms',                 series_number: 7 },

  // ── Viridian Gate Online (James Hunter) ──────────────────────────────────
  { title: 'Ruins of Dust',                     author: 'James Hunter',            series: 'Viridian Gate Online',           series_number: 3 },
  { title: 'Crimson Alliance',                  author: 'James Hunter',            series: 'Viridian Gate Online',           series_number: 4 },
  { title: 'The Jade Lord',                     author: 'James Hunter',            series: 'Viridian Gate Online',           series_number: 5 },

  // ── The Death Gate Cycle (Margaret Weis) ─────────────────────────────────
  { title: 'Elven Star',                        author: 'Margaret Weis',           series: 'The Death Gate Cycle',           series_number: 2 },
  { title: 'Fire Sea',                          author: 'Margaret Weis',           series: 'The Death Gate Cycle',           series_number: 3 },
  { title: 'The Hand of Chaos',                 author: 'Margaret Weis',           series: 'The Death Gate Cycle',           series_number: 5 },
  { title: 'Into the Labyrinth',                author: 'Margaret Weis',           series: 'The Death Gate Cycle',           series_number: 6 },

  // ── The Riyria Revelations gaps (Michael J. Sullivan) ─────────────────────
  // books 4-6 are likely The Riyria Chronicles prequels numbered sequentially in DB
  { title: 'The Crown Conspiracy',              author: 'Michael J. Sullivan',     series: 'The Riyria Revelations',         series_number: 4 },
  { title: 'Avempartha',                        author: 'Michael J. Sullivan',     series: 'The Riyria Revelations',         series_number: 5 },

  // ── The Riyria Chronicles (Michael J. Sullivan) ───────────────────────────
  { title: 'The Rose and the Thorn',            author: 'Michael J. Sullivan',     series: 'The Riyria Chronicles',          series_number: 2 },

  // ── Drenai Saga (David Gemmell) ──────────────────────────────────────────
  { title: 'Legend',                            author: 'David Gemmell',           series: 'Drenai Saga',                    series_number: 1 },
  { title: 'The King Beyond the Gate',          author: 'David Gemmell',           series: 'Drenai Saga',                    series_number: 2 },
  { title: 'Waylander',                         author: 'David Gemmell',           series: 'Drenai Saga',                    series_number: 3 },
  { title: 'Quest for Lost Heroes',             author: 'David Gemmell',           series: 'Drenai Saga',                    series_number: 4 },
  { title: 'In the Realm of the Wolf',          author: 'David Gemmell',           series: 'Drenai Saga',                    series_number: 6 },
  { title: 'The First Chronicles of Druss the Legend', author: 'David Gemmell',   series: 'Drenai Saga',                    series_number: 9 },

  // ── Deathstalker (Simon R. Green) ────────────────────────────────────────
  { title: 'Deathstalker',                      author: 'Simon R. Green',          series: 'Deathstalker',                   series_number: 1 },

  // ── The Hollows (Kim Harrison) ────────────────────────────────────────────
  { title: 'Dead Witch Walking',                author: 'Kim Harrison',            series: 'The Hollows',                    series_number: 1 },
  { title: 'The Good, the Bad, and the Undead', author: 'Kim Harrison',            series: 'The Hollows',                    series_number: 2 },
  { title: 'A Fistful of Charms',               author: 'Kim Harrison',            series: 'The Hollows',                    series_number: 6 },
  { title: 'The Outlaw Demon Wails',            author: 'Kim Harrison',            series: 'The Hollows',                    series_number: 7 },
  { title: 'Pale Demon',                        author: 'Kim Harrison',            series: 'The Hollows',                    series_number: 13 },

  // ── Meredith Gentry (Laurell K. Hamilton) ────────────────────────────────
  { title: 'A Caress of Twilight',              author: 'Laurell K. Hamilton',     series: 'Meredith Gentry',                series_number: 3 },
  { title: 'Mistral\'s Kiss',                   author: 'Laurell K. Hamilton',     series: 'Meredith Gentry',                series_number: 6 },

  // ── The Singing Hills Cycle (Nghi Vo) — starter already in list above ─────
  // DB shows series "Singing Hills Cycle" (without "The") have [5], missing [1-4]
  { title: 'The Empress of Salt and Fortune',   author: 'Nghi Vo',                 series: 'Singing Hills Cycle',            series_number: 1 },
  { title: 'When the Tiger Came Down the Mountain', author: 'Nghi Vo',             series: 'Singing Hills Cycle',            series_number: 2 },
  { title: 'Into the Riverlands',               author: 'Nghi Vo',                 series: 'Singing Hills Cycle',            series_number: 3 },
  { title: 'Mammoths at the Gates',             author: 'Nghi Vo',                 series: 'Singing Hills Cycle',            series_number: 4 },

  // ── Discworld sub-series: Death, Witches, Rincewind, Moist von Lipwig ─────
  // "Death" series (Pratchett) have [1,5], missing [2,3,4]
  { title: 'Reaper Man',                        author: 'Terry Pratchett',         series: 'Death',                          series_number: 2 },
  { title: 'Soul Music',                        author: 'Terry Pratchett',         series: 'Death',                          series_number: 3 },
  { title: 'Hogfather',                         author: 'Terry Pratchett',         series: 'Death',                          series_number: 4 },
  // "Witches" series have [3,4,6], missing [1,2,5]
  { title: 'Equal Rites',                       author: 'Terry Pratchett',         series: 'Witches',                        series_number: 1 },
  { title: 'Wyrd Sisters',                      author: 'Terry Pratchett',         series: 'Witches',                        series_number: 2 },
  { title: 'Carpe Jugulum',                     author: 'Terry Pratchett',         series: 'Witches',                        series_number: 5 },
  // "Rincewind" have [3], missing [1,2]
  { title: 'The Colour of Magic',               author: 'Terry Pratchett',         series: 'Rincewind',                      series_number: 1 },
  { title: 'The Light Fantastic',               author: 'Terry Pratchett',         series: 'Rincewind',                      series_number: 2 },
  // "Moist von Lipwig" have [2], missing [1]
  { title: 'Going Postal',                      author: 'Terry Pratchett',         series: 'Moist von Lipwig',               series_number: 1 },

  // ── Artemis Fowl (Eoin Colfer) ────────────────────────────────────────────
  { title: 'The Arctic Incident',               author: 'Eoin Colfer',             series: 'Artemis Fowl',                   series_number: 2 },
  { title: 'The Eternity Code',                 author: 'Eoin Colfer',             series: 'Artemis Fowl',                   series_number: 3 },

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
  if (letters.length < 10) return false;
  const nonAscii = letters.filter((c) => c.charCodeAt(0) > 127);
  return nonAscii.length / letters.length > 0.03;
}

/** Strip series prefix and leading article for fuzzy title dedup. */
function normalizeTitle(title) {
  let t = title.toLowerCase().trim();
  const colon = t.indexOf(':');
  if (colon > 1) t = t.slice(colon + 1).trim();
  return t.replace(/^(the|a|an)\s+/, '').replace(/\s+/g, ' ').trim();
}

/** Extract ISBN-13 (preferred) or ISBN-10 from a Google Books item. */
function extractISBN(item) {
  const ids = item.volumeInfo?.industryIdentifiers ?? [];
  const i13 = ids.find((i) => i.type === 'ISBN_13');
  const i10 = ids.find((i) => i.type === 'ISBN_10');
  return i13?.identifier ?? i10?.identifier ?? null;
}

const SKIP_KEYWORDS = [
  'anthology', 'omnibus', 'boxed set', 'box set',
  'complete trilogy', 'complete series', 'complete collection',
  '3-book', '4-book', '5-book', '6-book', '7-book', '8-book',
  'books 1-', 'volumes 1-', 'the complete ', 'collected works',
  'and other stories', 'tales of', 'tales from', 'stories from',
  'selected works', 'collected stories', 'the best of',
  'short stories', 'short story', 'novelette',
  ' trilogy', 'duology', ' collection',
  'guide to', 'companion to', 'art of', 'making of', 'the world of',
  'cookbook', 'workbook', 'coloring book', 'activity book',
  'journal', 'notebook', 'planner', 'calendar', 'diary',
  'study guide', "reader's guide", 'reading group', 'book club guide',
  'critical essay', 'analysis of', 'annotated edition', 'annotated ',
  'deluxe edition', 'special edition', "collector's edition",
  'limited edition', 'anniversary edition', 'expanded edition',
  'revised edition', 'signed edition', 'leatherbound', 'leather-bound',
  'slipcase', 'slip case', 'hardcover collector', 'folio society',
  'illustrated edition', 'large print', 'large-print', 'abridged',
  'graphic novel', 'graphic adaptation', 'manga', 'comic book',
  'audiobook', 'audio book', 'audio edition', 'unabridged audio',
  'summary of', 'review of', 'synopsis of', 'book review', 'plot summary',
  // House/themed/illustrated editions (e.g. HP Ravenclaw Edition, MinaLima)
  'gryffindor edition', 'ravenclaw edition', 'slytherin edition', 'hufflepuff edition',
  'minalima', 'illustrated by', ' - illustrated', 'full-color edition',
  // Anything ending in generic "edition" variants not already caught
  'house edition', 'movie tie-in', 'film tie-in', 'tv tie-in',
  'movie companion', 'official companion', 'illustrated companion',
  'official guide', 'official movie', 'official illustrated',
  'behind the scenes', 'the making of', 'the world of', 'exploring the',
  'three novels', 'four novels', 'complete novels', 'two novels',
];

/** Check that a Google Books result actually belongs to the searched author. */
function authorMatches(item, searchedAuthor) {
  const bookAuthors = (item.volumeInfo?.authors ?? []).map((a) => a.toLowerCase().trim());
  if (!bookAuthors.length) return false;
  const searched = searchedAuthor.toLowerCase().trim();
  // Accept if any returned author contains the searched surname or vice-versa
  const searchedParts = searched.split(/\s+/);
  const searchedSurname = searchedParts[searchedParts.length - 1];
  return bookAuthors.some((a) =>
    a === searched ||
    a.includes(searched) ||
    searched.includes(a) ||
    a.includes(searchedSurname)
  );
}

/** Filter a raw Google Books item — same rules as discover-books.mjs. */
function extractBookData(item) {
  const info = item.volumeInfo ?? {};
  // Reject non-English: trust explicit language field, but ALWAYS check title for
  // non-ASCII characters — Google Books sometimes sets language:'en' on foreign editions.
  if (info.language && info.language !== 'en') return null;
  if (isLikelyNonEnglish(info.title)) return null;
  if (!info.title || !info.authors?.length) return null;
  if (info.authors.length > 2) return null;
  if (!info.description && !info.pageCount) return null;
  if (isLikelyNonEnglish(info.description)) return null;
  if (info.averageRating != null && info.averageRating < MIN_RATING) return null;

  const catList = info.categories ?? [];
  const cats    = catList.join(' ').toLowerCase();
  const title   = info.title.toLowerCase();
  if (SKIP_KEYWORDS.some((k) => title.includes(k) || cats.includes(k))) return null;
  if (info.pageCount && info.pageCount < 120) return null;

  const FICTION_CATS = ['fantasy', 'fiction', 'science fiction', 'horror', 'fairy tale', 'fable'];
  const NON_FICTION_CATS = ['biography', 'history', 'true crime', 'self-help', 'business',
    'cooking', 'travel', 'art', 'photography', 'religion', 'philosophy', 'political',
    'psychology', 'science', 'technology', 'medical', 'education', 'reference'];

  if (catList.length > 0) {
    // If Google Books provided categories, require fiction and reject non-fiction
    const hasFiction    = FICTION_CATS.some((c) => cats.includes(c));
    const hasNonFiction = NON_FICTION_CATS.some((c) => cats.includes(c));
    if (!hasFiction || hasNonFiction) return null;
  } else if (info.description) {
    // No categories — require fiction/fantasy keywords in description to filter
    // out non-fantasy works by authors who write across genres (e.g. romance, thriller)
    const FICTION_KEYWORDS = [
      'fantasy', 'magic', 'wizard', 'witch', 'dragon', 'vampire', 'werewolf',
      'fae', 'faerie', 'fairy', 'demon', 'supernatural', 'paranormal', 'enchant',
      'sorcerer', 'sorcery', 'prophecy', 'kingdom', 'realm', 'quest', 'spell',
      'science fiction', 'sci-fi', 'dystopia', 'spaceship', 'alien', 'futuristic',
      'horror', 'undead', 'zombie', 'mythical', 'legend', 'gods', 'elves', 'dwarves',
    ];
    const desc = info.description.toLowerCase();
    if (!FICTION_KEYWORDS.some((k) => desc.includes(k))) return null;
  } else {
    // No categories and no description — too risky to import
    return null;
  }

  const rawYear  = info.publishedDate;
  const year     = rawYear ? parseInt(rawYear.slice(0, 4), 10) : null;
  const validYear = year && year >= 1950 && year <= new Date().getFullYear() ? year : null;

  const thumb = info.imageLinks?.extraLarge ?? info.imageLinks?.large ?? info.imageLinks?.medium ?? info.imageLinks?.thumbnail ?? null;
  const cover_url = thumb ? thumb.replace(/^http:/, 'https:').replace('&edge=curl', '') : null;

  return {
    title:            info.title,
    slug:             slugify(info.title),
    authors:          info.authors,
    cover_url,
    synopsis:         info.description ? info.description.slice(0, 2000) : null,
    publication_year: validYear,
    page_count:       info.pageCount ?? null,
    darkness_level:   null,
    heat_level:       null,
  };
}

/** Paginated Google Books fetch (returns raw items array). */
async function fetchGoogleBooksPage(query, startIndex) {
  const q = encodeURIComponent(query);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=en&maxResults=${PAGE_SIZE}&startIndex=${startIndex}&printType=books&orderBy=relevance&key=${GOOGLE_BOOKS_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.items ?? [];
  } catch {
    return [];
  }
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
  const url = `https://openlibrary.org/search.json?q=${q}&limit=1&fields=key,title,author_name,first_publish_year,number_of_pages_median,isbn,cover_i`;
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

// ── Phase 1b: fill gaps in DB series not covered by BOOKS list ───────────────

async function fillSeriesGapsInDB(existing, existingSlugs, existingTitles, normalizedTitles, existingSeriesKeys, progressData, remaining = Infinity) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📖  Phase 1b — DB Series Gap Fill\n`);

  // Group DB books by series → detect integer gaps
  const seriesGroups = new Map();
  for (const b of existing) {
    if (!b.series || b.series_number == null) continue;
    const num = Number(b.series_number);
    if (!Number.isInteger(num) || num < 1) continue;
    const key = b.series.toLowerCase().trim();
    if (!seriesGroups.has(key)) {
      seriesGroups.set(key, { series: b.series, author: b.authors?.[0] ?? '', numbers: new Set() });
    }
    seriesGroups.get(key).numbers.add(num);
  }

  // Series covered by the hardcoded BOOKS list (Phase 1a handles those)
  const booksSeriesSet = new Set(BOOKS.map((b) => (b.series ?? '').toLowerCase().trim()).filter(Boolean));

  const completedGapSeries = new Set((progressData.completedGapSeries ?? []).map((s) => s.toLowerCase()));

  // Find series with gaps not covered by BOOKS and not yet swept
  const toSweep = [];
  for (const [key, info] of seriesGroups) {
    if (booksSeriesSet.has(key))      continue; // covered by Phase 1a
    if (completedGapSeries.has(key))  continue; // already swept with 0 results

    const nums = [...info.numbers].sort((a, b) => a - b);
    if (nums.length < 2) continue; // need at least 2 books to detect a gap

    const gaps = [];
    for (let i = nums[0]; i <= nums[nums.length - 1]; i++) {
      if (!info.numbers.has(i)) gaps.push(i);
    }
    if (gaps.length > 0) toSweep.push({ ...info, gaps, nums });
  }

  if (toSweep.length === 0) {
    console.log('  No uncovered series gaps found in DB.\n');
    return 0;
  }

  console.log(`  Found ${toSweep.length} series with gaps:\n`);
  for (const s of toSweep) {
    console.log(`    • ${s.series} (${s.author}): missing #${s.gaps.join(', ')}`);
  }
  console.log('');

  let imported = 0;

  for (const seriesInfo of toSweep) {
    if (imported >= remaining) break;

    const query = `inauthor:"${seriesInfo.author}" "${seriesInfo.series}"`;
    console.log(`  🔍  ${seriesInfo.series} — ${seriesInfo.author}`);

    let importedForSeries = 0;
    let pageStart = 0;
    let consecutiveEmpty = 0;

    while (true) {
      if (imported >= remaining) break;

      const items = await fetchGoogleBooksPage(query, pageStart);
      await sleep(DELAY_MS);

      if (!items.length) break;

      let validThisPage = 0;
      for (const item of items) {
        if (imported >= remaining) break;

        const book = extractBookData(item);
        if (!book) continue;
        if (!authorMatches(item, seriesInfo.author)) continue;

        if (existingSlugs.has(book.slug))                        continue;
        if (existingTitles.has(book.title.toLowerCase().trim())) continue;
        const norm = normalizeTitle(book.title);
        if (normalizedTitles.has(norm))                          continue;

        validThisPage++;
        existingSlugs.add(book.slug);
        existingTitles.add(book.title.toLowerCase().trim());
        normalizedTitles.add(norm);

        // Attach series name; series_number left null (can't reliably determine from Google Books)
        const record = { ...book, series: seriesInfo.series, series_number: null };

        process.stdout.write(`    "${book.title.slice(0, 48)}" … `);

        if (DRY_RUN) {
          console.log(`[dry]`);
          imported++;
          importedForSeries++;
          continue;
        }

        const { error: insErr } = await supabase
          .from('books')
          .upsert(record, { onConflict: 'slug', ignoreDuplicates: true });

        if (insErr && insErr.code !== '23505') {
          console.log(`✗ ${insErr.message.slice(0, 60)}`);
        } else if (insErr?.code === '23505') {
          console.log(`⏭ skip`);
        } else {
          console.log(`✓`);
          imported++;
          importedForSeries++;
        }
      }

      if (validThisPage === 0) {
        consecutiveEmpty++;
        if (consecutiveEmpty >= 2) break;
      } else {
        consecutiveEmpty = 0;
      }

      pageStart += PAGE_SIZE;
      if (pageStart >= 400) break; // keep focused; deeper results unlikely to be relevant
    }

    if (importedForSeries === 0) {
      console.log(`    (no new books found)`);
      completedGapSeries.add(seriesInfo.series.toLowerCase());
      progressData.completedGapSeries = [...completedGapSeries];
      saveProgress(progressData);
    }
    console.log('');
  }

  console.log(`  ✅  Phase 1b imported: ${imported} new books`);
  return imported;
}

// ── Phase 2: fill prolific authors ────────────────────────────────────────────

async function fillProlificAuthors(existingSlugs, existingTitles, normalizedTitles) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📖  Phase 2 — Prolific Author Fill`);
  const p2Limit = LIMIT ?? Infinity;
  if (RESET) console.log(`    ⚠️  --reset: clearing author progress`);
  console.log(`    Threshold: ${THRESHOLD}+ books · Import cap: ${LIMIT ?? 'unlimited'}\n`);

  const progress = loadProgress();
  const completedAuthors = new Set((progress.completedAuthors ?? []).map((a) => a.toLowerCase()));

  // Load all books with their authors to count per-author (paginated — DB may exceed 1000 rows)
  let allBooks;
  try {
    allBooks = await fetchAllBooks('authors');
  } catch (error) {
    console.error('Supabase error:', error.message);
    return;
  }

  // Count books per primary author (first element of authors array)
  const authorCount = new Map();
  for (const book of allBooks) {
    const primary = (book.authors?.[0] ?? '').trim();
    if (!primary) continue;
    const key = primary.toLowerCase();
    authorCount.set(key, (authorCount.get(key) ?? 0) + 1);
  }

  // Collect prolific authors (meet threshold), keep original casing
  const prolificMap = new Map(); // normalized → original casing
  for (const book of allBooks) {
    const primary = (book.authors?.[0] ?? '').trim();
    if (!primary) continue;
    const key = primary.toLowerCase();
    if ((authorCount.get(key) ?? 0) >= THRESHOLD && !prolificMap.has(key)) {
      prolificMap.set(key, primary);
    }
  }

  const prolific = [...prolificMap.values()].sort();
  console.log(`  Found ${prolific.length} authors with ${THRESHOLD}+ books:\n`);
  for (const a of prolific) console.log(`    • ${a} (${authorCount.get(a.toLowerCase())} books)`);
  console.log('');

  const seenISBNs = new Set();
  let imported = 0;
  let skippedAuthors = 0;

  for (const author of prolific) {
    if (imported >= p2Limit) break;

    if (completedAuthors.has(author.toLowerCase())) {
      skippedAuthors++;
      console.log(`  ⏭  ${author} (already swept — no new books last time)`);
      continue;
    }

    const query = `inauthor:"${author}"`;
    console.log(`\n  🔍  ${author}`);

    let pageStart = 0;
    let consecutiveEmpty = 0;
    let importedForAuthor = 0;

    while (imported < p2Limit) {
      const items = await fetchGoogleBooksPage(query, pageStart);
      await sleep(DELAY_MS);

      if (!items.length) break;

      let newThisPage = 0;
      let validThisPage = 0; // passed extractBookData filter (not yet a dupe)
      for (const item of items) {
        if (imported >= p2Limit) break;

        const book = extractBookData(item);
        if (!book) continue;
        if (!authorMatches(item, author)) continue;

        const isbn = extractISBN(item);
        if (isbn && seenISBNs.has(isbn)) continue;

        if (existingSlugs.has(book.slug))                        continue;
        if (existingTitles.has(book.title.toLowerCase().trim())) continue;
        const norm = normalizeTitle(book.title);
        if (normalizedTitles.has(norm))                          continue;

        validThisPage++;

        // Mark seen immediately to avoid intra-run dupes
        existingSlugs.add(book.slug);
        existingTitles.add(book.title.toLowerCase().trim());
        normalizedTitles.add(norm);
        if (isbn) seenISBNs.add(isbn);

        process.stdout.write(`    [${imported + 1}/${p2Limit === Infinity ? '∞' : p2Limit}] "${book.title.slice(0, 48)}" … `);

        if (DRY_RUN) {
          console.log(`[dry]`);
          imported++;
          importedForAuthor++;
          newThisPage++;
          continue;
        }

        const { error: insErr } = await supabase
          .from('books')
          .upsert(book, { onConflict: 'slug', ignoreDuplicates: true });

        if (insErr && insErr.code !== '23505') {
          console.log(`✗ ${insErr.message.slice(0, 60)}`);
        } else if (insErr?.code === '23505') {
          console.log(`⏭ skip`);
        } else {
          console.log(`✓`);
          imported++;
          importedForAuthor++;
          newThisPage++;
        }
      }

      // Only stop scanning when Google Books genuinely has no valid new candidates
      // (duplicates are expected for authors already in DB — keep paginating)
      if (validThisPage === 0) {
        consecutiveEmpty++;
        if (consecutiveEmpty >= 2) break;
      } else {
        consecutiveEmpty = 0;
      }

      pageStart += PAGE_SIZE;
      if (pageStart >= 1000) break;
    }

    // If this author produced nothing new, mark them as exhausted so future runs skip them
    if (importedForAuthor === 0) {
      completedAuthors.add(author.toLowerCase());
      progress.completedAuthors = [...completedAuthors];
      saveProgress(progress);
    }
  }

  if (skippedAuthors > 0) {
    console.log(`\n  ⏭  Skipped ${skippedAuthors} already-swept author(s) (run with --reset to re-scan)`);
  }
  console.log(`\n  ✅  Phase 2 imported: ${imported} new books`);
  return imported;
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

/** Fetch ALL rows from the books table, paginating past Supabase's 1000-row default. */
async function fetchAllBooks(fields) {
  const PAGE = 1000;
  const rows = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('books')
      .select(fields)
      .range(from, from + PAGE - 1);
    if (error) throw error;
    rows.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return rows;
}

async function main() {
  const modeLabel = SERIES_ONLY ? ' [series only]' : AUTHORS_ONLY ? ' [authors only]' : '';
  console.log(`\n📚 Fantasy Obscura — Series + Author Filler${DRY_RUN ? ' [DRY RUN]' : ''}${modeLabel}\n`);

  let existing;
  try {
    existing = await fetchAllBooks('id, slug, title, authors, series, series_number');
  } catch (existErr) {
    console.error('Supabase error:', existErr.message);
    process.exit(1);
  }

  const existingSlugs    = new Set(existing.map((b) => b.slug).filter(Boolean));
  const existingTitles   = new Set(existing.map((b) => b.title.toLowerCase().trim()));
  const normalizedTitles = new Set(existing.map((b) => normalizeTitle(b.title)));
  // series+number key catches books already in DB under a different title/slug variant
  const existingSeriesKeys = new Set(
    existing
      .filter((b) => b.series && b.series_number != null)
      .map((b) => `${b.series.toLowerCase().trim()}::${b.series_number}`)
  );

  // Load rejected slugs (books deleted via /admin/fill-review) so we never re-import them
  const { data: rejectedRows } = await supabase.from('rejected_books').select('slug');
  const rejectedCount = rejectedRows?.length ?? 0;
  for (const r of rejectedRows ?? []) existingSlugs.add(r.slug);
  if (rejectedCount > 0) console.log(`  ⛔  Skipping ${rejectedCount} previously rejected book(s)\n`);

  if (AUTHORS_ONLY) {
    await fillProlificAuthors(existingSlugs, existingTitles, normalizedTitles);
    return;
  }

  // ── Phase 1a: series list (with per-series progress tracking) ──────────────
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📖  Phase 1a — Series Fill\n');

  const p1progress = loadProgress();
  const completedSeries = new Set((p1progress.completedSeries ?? []).map((s) => s.toLowerCase()));

  // Books in DB but missing series metadata — patch them
  const existingBySlug  = new Map(existing.map((b) => [b.slug, b]));
  const existingByTitle = new Map(existing.map((b) => [b.title.toLowerCase().trim(), b]));
  const toPath = BOOKS.filter((b) => {
    const dbBook =
      existingBySlug.get(slugify(b.title)) ||
      existingByTitle.get(b.title.toLowerCase().trim());
    return dbBook && (!dbBook.series || dbBook.series_number == null);
  });

  if (toPath.length > 0) {
    console.log(`🔧  Patching series metadata on ${toPath.length} existing book(s)…\n`);
    for (const b of toPath) {
      const dbBook =
        existingBySlug.get(slugify(b.title)) ||
        existingByTitle.get(b.title.toLowerCase().trim());
      process.stdout.write(`  ${b.title.slice(0, 52).padEnd(52)} `);
      if (DRY_RUN) { console.log(`[dry] → ${b.series} #${b.series_number}`); continue; }
      const { error } = await supabase
        .from('books')
        .update({ series: b.series, series_number: b.series_number })
        .eq('id', dbBook.id);
      console.log(error ? `✗ ${error.message.slice(0, 60)}` : `✓ → ${b.series} #${b.series_number}`);
    }
    console.log('');
  }

  // Group BOOKS by series for per-series progress tracking
  const seriesByName = new Map(); // seriesKey → { displayName, books: [] }
  for (const b of BOOKS) {
    const key = (b.series ?? '__standalone__').toLowerCase().trim();
    if (!seriesByName.has(key)) {
      seriesByName.set(key, { displayName: b.series ?? '(standalone)', books: [] });
    }
    seriesByName.get(key).books.push(b);
  }

  let p1imported = 0, p1failed = 0, p1seriesComplete = 0;
  const p1Limit = LIMIT ?? Infinity;
  if (LIMIT) console.log(`    Import cap: ${LIMIT} books across Phase 1a + 1b\n`);

  for (const [seriesKey, { displayName, books }] of seriesByName) {
    if (p1imported >= p1Limit) break;

    // Skip series already marked as fully imported
    if (completedSeries.has(seriesKey)) {
      p1seriesComplete++;
      continue;
    }

    // Find which books in this series are missing from DB
    const missing = books.filter((b) => {
      if (existingSlugs.has(slugify(b.title)))              return false;
      if (existingTitles.has(b.title.toLowerCase().trim())) return false;
      if (normalizedTitles.has(normalizeTitle(b.title)))    return false;
      if (b.series && b.series_number != null) {
        if (existingSeriesKeys.has(`${b.series.toLowerCase().trim()}::${b.series_number}`)) return false;
      }
      return true;
    });

    if (missing.length === 0) {
      // All books for this series are in DB — mark as complete
      completedSeries.add(seriesKey);
      p1progress.completedSeries = [...completedSeries];
      saveProgress(p1progress);
      p1seriesComplete++;
      continue;
    }

    console.log(`  📗  ${displayName} — ${missing.length} missing:`);

    for (const book of missing) {
      if (p1imported >= p1Limit) break;

      const slug = slugify(book.title);
      process.stdout.write(`    ${book.title.slice(0, 50).padEnd(50)} `);

      let meta = {};
      try {
        meta = (await fetchOpenLibrary(book.title, book.author)) ?? {};
        await sleep(DELAY_MS);
      } catch {
        meta = {};
      }

      const record = {
        title:            book.title,
        slug,
        authors:          [book.author],
        series:           book.series ?? null,
        series_number:    book.series_number ?? null,
        cover_url:        meta.cover_url ?? null,
        isbn:             meta.isbn ?? null,
        publication_year: meta.publication_year ?? null,
        page_count:       meta.page_count ?? null,
        synopsis:         meta.synopsis ?? null,
        darkness_level:   null,
        heat_level:       null,
      };

      if (DRY_RUN) {
        console.log(`[dry] ${slug}`);
        p1imported++;
        existingSlugs.add(slug);
        existingTitles.add(book.title.toLowerCase().trim());
        normalizedTitles.add(normalizeTitle(book.title));
        if (book.series && book.series_number != null) {
          existingSeriesKeys.add(`${book.series.toLowerCase().trim()}::${book.series_number}`);
        }
        continue;
      }

      const { error } = await supabase.from('books').upsert(record, { onConflict: 'slug', ignoreDuplicates: true });
      if (error && error.code !== '23505') {
        console.log(`✗ ${error.message}`);
        p1failed++;
      } else if (error?.code === '23505') {
        console.log(`⏭ already exists`);
      } else {
        console.log(`✓`);
        p1imported++;
        existingSlugs.add(slug);
        existingTitles.add(book.title.toLowerCase().trim());
        normalizedTitles.add(normalizeTitle(book.title));
        if (book.series && book.series_number != null) {
          existingSeriesKeys.add(`${book.series.toLowerCase().trim()}::${book.series_number}`);
        }
      }
    }
    console.log('');
  }

  console.log(`──────────────────────────────────────`);
  console.log(`  Phase 1a imported:        ${p1imported}`);
  console.log(`  Complete series (skipped): ${p1seriesComplete} of ${seriesByName.size}`);
  if (p1failed) console.log(`  Failed:                   ${p1failed}`);

  // ── Phase 1b: dynamic gap detection for series in DB not in BOOKS list ──────
  await fillSeriesGapsInDB(existing, existingSlugs, existingTitles, normalizedTitles, existingSeriesKeys, p1progress, p1Limit - p1imported);

  // ── Phase 2: prolific author sweep ─────────────────────────────────────────
  if (!SERIES_ONLY) {
    await fillProlificAuthors(existingSlugs, existingTitles, normalizedTitles);
  }

  console.log('\n✅  Done.\n');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
