/**
 * fill-series.mjs
 *
 * Adds all missing books for every series already present in the DB.
 * Fetches metadata from OpenLibrary. Skips books that already exist.
 *
 * Usage:
 *   node scripts/fill-series.mjs
 *   node scripts/fill-series.mjs --dry-run
 *   node scripts/fill-series.mjs --limit 20
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const DRY_RUN  = process.argv.includes('--dry-run');
const LIMIT_ARG = process.argv.indexOf('--limit');
const LIMIT    = LIMIT_ARG !== -1 ? parseInt(process.argv[LIMIT_ARG + 1], 10) : null;
const DELAY_MS = 500;

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

  // ── The Bloodsworn Saga (John Gwynne) ────────────────────────────────────
  { title: 'The Hunger of the Gods',            author: 'John Gwynne',            series: 'The Bloodsworn Saga',            series_number: 2 },
  { title: 'The War of the Gods',               author: 'John Gwynne',            series: 'The Bloodsworn Saga',            series_number: 3 },

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
  if (letters.length < 20) return false;
  const nonAscii = letters.filter((c) => c.charCodeAt(0) > 127);
  return nonAscii.length / letters.length > 0.05;
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
      return {
        synopsis: synopsis ? synopsis.slice(0, 2000) : null,
        publication_year: validYear,
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

  return {
    cover_url: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null,
    isbn: doc.isbn?.[0] ?? null,
    publication_year,
    page_count: doc.number_of_pages_median ?? null,
    synopsis,
  };
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

async function main() {
  console.log(`\n📚 Fantasy Obscura — Series Filler${DRY_RUN ? ' [DRY RUN]' : ''}\n`);

  const { data: existing, error: existErr } = await supabase
    .from('books')
    .select('slug, title');
  if (existErr) {
    console.error('Supabase error:', existErr.message);
    process.exit(1);
  }

  const existingSlugs  = new Set(existing.map((b) => b.slug).filter(Boolean));
  const existingTitles = new Set(existing.map((b) => b.title.toLowerCase().trim()));

  const allToImport = BOOKS.filter((b) => {
    if (existingSlugs.has(slugify(b.title)))              return false;
    if (existingTitles.has(b.title.toLowerCase().trim())) return false;
    return true;
  });

  const skipped   = BOOKS.length - allToImport.length;
  const toImport  = LIMIT ? allToImport.slice(0, LIMIT) : allToImport;
  console.log(`Total in list:  ${BOOKS.length}`);
  console.log(`Already in DB:  ${skipped}`);
  console.log(`To import:      ${toImport.length}\n`);

  if (toImport.length === 0) {
    console.log('✅ Nothing to import.');
    return;
  }

  let imported = 0;
  let failed   = 0;

  for (const book of toImport) {
    const slug = slugify(book.title);
    process.stdout.write(`  ${book.title.slice(0, 52).padEnd(52)} `);

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
      imported++;
      continue;
    }

    const { error } = await supabase.from('books').insert(record);
    if (error) {
      console.log(`✗ ${error.message}`);
      failed++;
    } else {
      console.log(`✓`);
      imported++;
    }
  }

  console.log(`\n──────────────────────────────────────`);
  console.log(`✅ Imported: ${imported}`);
  if (skipped) console.log(`⏭️  Skipped:  ${skipped} (already in DB)`);
  if (failed)  console.log(`✗  Failed:   ${failed}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
