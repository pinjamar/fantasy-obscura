#!/usr/bin/env node

/**
 * Fantasy Book Database Seeder
 * Inserts curated fantasy books with full metadata into Supabase.
 *
 * BEFORE RUNNING: make sure the audience column exists in Supabase:
 *   ALTER TABLE books ADD COLUMN IF NOT EXISTS audience text;
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

// Cover URLs via Open Library ISBN covers (free, no API key needed)
const cover = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const BOOKS = [
  {
    title: 'The Name of the Wind',
    slug: 'the-name-of-the-wind',
    authors: ['Patrick Rothfuss'],
    isbn: '9780756404079',
    cover_url: cover('9780756404079'),
    publication_year: 2007,
    page_count: 662,
    avg_rating: 4.55,
    synopsis:
      'A young man grows up to become the most notorious wizard his world has ever seen. Told in his own words, this is the story of Kvothe—from his childhood in a troupe of traveling players, to years spent as a near-feral orphan in a crime-ridden city, to his daringly brazen yet successful bid to enter a legendary school of magic.',
    audience: 'Adult',
    subgenres: ['Epic Fantasy', 'High Fantasy'],
    tropes: ['Magic Academy', 'Chosen One', 'Coming of Age', 'Reluctant Hero'],
    magic_system: 'Soft Magic',
    tone: ['Atmospheric', 'Character-driven'],
    pacing: 'Mixed',
    heat_level: 'Fade to Black',
    diversity_rep: [],
  },
  {
    title: 'The Way of Kings',
    slug: 'the-way-of-kings',
    authors: ['Brandon Sanderson'],
    isbn: '9780765326355',
    cover_url: cover('9780765326355'),
    publication_year: 2010,
    page_count: 1007,
    avg_rating: 4.65,
    synopsis:
      'Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter.',
    audience: 'Adult',
    subgenres: ['Epic Fantasy', 'High Fantasy'],
    tropes: ['Chosen One', 'Quest', 'Political Intrigue', 'Mentor Dies'],
    magic_system: 'Hard Magic',
    tone: ['Philosophical', 'Dark & Serious', 'Action-packed'],
    pacing: 'Slow-burn',
    heat_level: 'Clean',
    diversity_rep: [],
  },
  {
    title: 'A Court of Thorns and Roses',
    slug: 'a-court-of-thorns-and-roses',
    authors: ['Sarah J. Maas'],
    isbn: '9781619634169',
    cover_url: cover('9781619634169'),
    publication_year: 2015,
    page_count: 419,
    avg_rating: 4.15,
    synopsis:
      'A young huntress is taken to the faerie lands after killing a wolf in the woods. There she discovers that her captor is not what he seems, and the world beyond the wall is more beautiful and more deadly than she ever imagined.',
    audience: 'Young Adult (YA)',
    subgenres: ['Romantic Fantasy', 'High Fantasy'],
    tropes: ['Fae Court Drama', 'Enemies to Lovers', 'Forbidden Romance', 'Curse Breaking'],
    magic_system: 'Soft Magic',
    tone: ['Dark & Serious', 'Action-packed'],
    pacing: 'Fast-paced',
    heat_level: 'Spicy',
    diversity_rep: [],
  },
  {
    title: 'The Lies of Locke Lamora',
    slug: 'the-lies-of-locke-lamora',
    authors: ['Scott Lynch'],
    isbn: '9780553588941',
    cover_url: cover('9780553588941'),
    publication_year: 2006,
    page_count: 499,
    avg_rating: 4.30,
    synopsis:
      "An orphan's life is harsh and that's if he's lucky. Lucky Locke Lamora dodged the fates of most street kids: conscription, death, or slavery. Instead, he became a member of a thieving crew—the Gentlemen Bastards—who con the nobility of Camorr while the city's crime lord believes he's just running small-time scams.",
    audience: 'Adult',
    subgenres: ['Low Fantasy', 'Grimdark'],
    tropes: ['Heist', 'Found Family', 'Political Intrigue', 'Betrayal'],
    magic_system: 'No Magic',
    tone: ['Dark & Serious', 'Humorous', 'Action-packed'],
    pacing: 'Fast-paced',
    heat_level: 'Fade to Black',
    diversity_rep: [],
  },
  {
    title: 'Mistborn: The Final Empire',
    slug: 'mistborn-the-final-empire',
    authors: ['Brandon Sanderson'],
    isbn: '9780765350381',
    cover_url: cover('9780765350381'),
    publication_year: 2006,
    page_count: 541,
    avg_rating: 4.45,
    synopsis:
      'For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler reigned with absolute power and ultimate terror. The Skaa now plan a rebellion. Their only hope is the criminal Kelsier—and a young girl who might just be the most powerful Mistborn in history.',
    audience: 'Adult',
    subgenres: ['Epic Fantasy', 'High Fantasy'],
    tropes: ['Chosen One', 'Heist', 'Political Intrigue', 'Betrayal', 'Mentor Dies'],
    magic_system: 'Hard Magic',
    tone: ['Dark & Serious', 'Action-packed', 'Hopeful'],
    pacing: 'Mixed',
    heat_level: 'Clean',
    diversity_rep: [],
  },
  {
    title: 'Six of Crows',
    slug: 'six-of-crows',
    authors: ['Leigh Bardugo'],
    isbn: '9781627792127',
    cover_url: cover('9781627792127'),
    publication_year: 2015,
    page_count: 465,
    avg_rating: 4.46,
    synopsis:
      'Ketterdam: a bustling hub of international trade where anything can be had for the right price—and no one knows that better than criminal prodigy Kaz Brekker. Six misfits with nothing to lose and everything to gain—their mission: to break into the most secure facility in the world.',
    audience: 'Young Adult (YA)',
    subgenres: ['Epic Fantasy', 'Low Fantasy'],
    tropes: ['Heist', 'Found Family', 'Enemies to Lovers', 'Political Intrigue'],
    magic_system: 'Hard Magic',
    tone: ['Dark & Serious', 'Action-packed'],
    pacing: 'Fast-paced',
    heat_level: 'Fade to Black',
    diversity_rep: ['POC Protagonist', 'Disability Rep'],
  },
  {
    title: 'The Hobbit',
    slug: 'the-hobbit',
    authors: ['J.R.R. Tolkien'],
    isbn: '9780547928227',
    cover_url: cover('9780547928227'),
    publication_year: 1937,
    page_count: 310,
    avg_rating: 4.28,
    synopsis:
      'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely venturing further than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.',
    audience: "Children's",
    subgenres: ['Epic Fantasy', 'High Fantasy'],
    tropes: ['Quest', 'Dragon Riders', 'Reluctant Hero', 'Found Family', 'Dark Lord'],
    magic_system: 'Soft Magic',
    tone: ['Whimsical', 'Light-hearted', 'Action-packed'],
    pacing: 'Mixed',
    heat_level: 'Clean',
    diversity_rep: [],
  },
  {
    title: 'Good Omens',
    slug: 'good-omens',
    authors: ['Terry Pratchett', 'Neil Gaiman'],
    isbn: '9780060853976',
    cover_url: cover('9780060853976'),
    publication_year: 1990,
    page_count: 288,
    avg_rating: 4.25,
    synopsis:
      'According to the Nice and Accurate Prophecies of Agnes Nutter, the world will end on a Saturday. An angel and a demon who have been on Earth since The Beginning must work together to avert Armageddon—but they rather like the world as it is.',
    audience: 'Adult',
    subgenres: ['Contemporary Fantasy', 'Urban Fantasy'],
    tropes: ['Found Family', 'Prophecy'],
    magic_system: 'Soft Magic',
    tone: ['Humorous', 'Whimsical', 'Light-hearted'],
    pacing: 'Fast-paced',
    heat_level: 'Clean',
    diversity_rep: [],
  },
  {
    title: 'The House in the Cerulean Sea',
    slug: 'the-house-in-the-cerulean-sea',
    authors: ['TJ Klune'],
    isbn: '9781250217318',
    cover_url: cover('9781250217318'),
    publication_year: 2020,
    page_count: 394,
    avg_rating: 4.40,
    synopsis:
      "Linus Baker is a by-the-book case worker at the Department in Charge of Magical Youth. He's sent on a secret assignment to a magical orphanage on a mysterious island, home to the most dangerous magical children ever seen—and their charming, enigmatic master.",
    audience: 'Adult',
    subgenres: ['Cozy Fantasy', 'Contemporary Fantasy'],
    tropes: ['Found Family', 'Enemies to Lovers', 'Slow Burn'],
    magic_system: 'Soft Magic',
    tone: ['Whimsical', 'Light-hearted', 'Humorous'],
    pacing: 'Slow-burn',
    heat_level: 'Fade to Black',
    diversity_rep: ['LGBTQ+ Protagonist'],
  },
  {
    title: 'Piranesi',
    slug: 'piranesi',
    authors: ['Susanna Clarke'],
    isbn: '9781635575644',
    cover_url: cover('9781635575644'),
    publication_year: 2020,
    page_count: 272,
    avg_rating: 4.20,
    synopsis:
      'Piranesi lives in the House. Perhaps he always has. In his notebooks, he makes careful observations: the House is beautiful, its rooms full of marvels. He is not afraid—though sometimes he wonders if he should be.',
    audience: 'Adult',
    subgenres: ['Contemporary Fantasy', 'Low Fantasy'],
    tropes: ['Secret Identity', 'Slow Burn'],
    magic_system: 'Soft Magic',
    tone: ['Atmospheric', 'Philosophical', 'Whimsical'],
    pacing: 'Slow-burn',
    heat_level: 'Clean',
    diversity_rep: [],
  },
  {
    title: 'Legends & Lattes',
    slug: 'legends-and-lattes',
    authors: ['Travis Baldree'],
    isbn: '9781250882981',
    cover_url: cover('9781250882981'),
    publication_year: 2022,
    page_count: 299,
    avg_rating: 4.10,
    synopsis:
      'After decades of adventuring, Viv the orc barbarian hangs up her sword and buys a plot of land in the city of Thune, where she plans to open the first coffee shop in a world that has never seen the drink.',
    audience: 'Adult',
    subgenres: ['Cozy Fantasy', 'Low Fantasy'],
    tropes: ['Found Family', 'Slow Burn', 'Enemies to Lovers'],
    magic_system: 'No Magic',
    tone: ['Whimsical', 'Light-hearted', 'Character-driven'],
    pacing: 'Slow-burn',
    heat_level: 'Fade to Black',
    diversity_rep: ['LGBTQ+ Protagonist', 'POC Side Characters'],
  },
  {
    title: 'Circe',
    slug: 'circe',
    authors: ['Madeline Miller'],
    isbn: '9780316556347',
    cover_url: cover('9780316556347'),
    publication_year: 2018,
    page_count: 393,
    avg_rating: 4.15,
    synopsis:
      'In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—neither powerful like her father nor viciously alluring like her mother. When she discovers she possesses the power of witchcraft, she is exiled to a deserted island.',
    audience: 'Adult',
    subgenres: ['Mythic Fantasy', 'Historical Fantasy'],
    tropes: ['Coming of Age', 'Curse Breaking', 'Slow Burn', 'Revenge Plot'],
    magic_system: 'Soft Magic',
    tone: ['Atmospheric', 'Philosophical', 'Character-driven'],
    pacing: 'Slow-burn',
    heat_level: 'Steamy',
    diversity_rep: [],
  },
  {
    title: 'The Blade Itself',
    slug: 'the-blade-itself',
    authors: ['Joe Abercrombie'],
    isbn: '9781591025948',
    cover_url: cover('9781591025948'),
    publication_year: 2006,
    page_count: 515,
    avg_rating: 4.15,
    synopsis:
      'Logen Ninefingers, infamous barbarian, has finally run out of luck. Nobleman Captain Jezal dan Luthar trains for glory. Inquisitor Glokta, a cripple turned torturer, hopes to discover a conspiracy. Their fates are intertwined as an ancient evil stirs in the North.',
    audience: 'Adult',
    subgenres: ['Grimdark', 'Epic Fantasy'],
    tropes: ['Political Intrigue', 'Quest', 'Reluctant Hero', 'Betrayal'],
    magic_system: 'Soft Magic',
    tone: ['Grimdark', 'Dark & Serious', 'Humorous'],
    pacing: 'Mixed',
    heat_level: 'Fade to Black',
    diversity_rep: ['Disability Rep'],
  },
  {
    title: 'American Gods',
    slug: 'american-gods',
    authors: ['Neil Gaiman'],
    isbn: '9780380789030',
    cover_url: cover('9780380789030'),
    publication_year: 2001,
    page_count: 465,
    avg_rating: 4.10,
    synopsis:
      'Shadow is a man who serves his prison time by picking up work where he can find it. After his release, he meets a mysterious man who calls himself Wednesday, and a storm is coming—one that will battle for the very soul of America.',
    audience: 'Adult',
    subgenres: ['Urban Fantasy', 'Mythic Fantasy', 'Contemporary Fantasy'],
    tropes: ['Quest', 'Secret Identity'],
    magic_system: 'Soft Magic',
    tone: ['Atmospheric', 'Dark & Serious', 'Philosophical'],
    pacing: 'Slow-burn',
    heat_level: 'Steamy',
    diversity_rep: [],
  },
  {
    title: 'The Night Circus',
    slug: 'the-night-circus',
    authors: ['Erin Morgenstern'],
    isbn: '9780385534635',
    cover_url: cover('9780385534635'),
    publication_year: 2011,
    page_count: 387,
    avg_rating: 4.05,
    synopsis:
      'The circus arrives without warning. No announcements precede it. It is simply there, when yesterday it was not. Two young magicians are trained from childhood to compete against each other in an arena they cannot choose to leave—a mysterious black-and-white circus that becomes an obsession for all who encounter it.',
    audience: 'Adult',
    subgenres: ['Historical Fantasy', 'Romantic Fantasy'],
    tropes: ['Forbidden Romance', 'Slow Burn'],
    magic_system: 'Soft Magic',
    tone: ['Whimsical', 'Atmospheric', 'Philosophical'],
    pacing: 'Slow-burn',
    heat_level: 'Fade to Black',
    diversity_rep: [],
  },
  {
    title: 'The Poppy War',
    slug: 'the-poppy-war',
    authors: ['R.F. Kuang'],
    isbn: '9780062662583',
    cover_url: cover('9780062662583'),
    publication_year: 2018,
    page_count: 530,
    avg_rating: 4.10,
    synopsis:
      "When Rin aced the Keju—the Empire's test to identify the most talented young people—she was taken from her poor village to the prestigious Sinegard military academy. She discovers she has a power that could save her country—or destroy it.",
    audience: 'Adult',
    subgenres: ['Historical Fantasy', 'Grimdark', 'Dark Fantasy'],
    tropes: ['Magic Academy', 'Coming of Age', 'Chosen One', 'Revenge Plot'],
    magic_system: 'Soft Magic',
    tone: ['Grimdark', 'Dark & Serious', 'Action-packed'],
    pacing: 'Mixed',
    heat_level: 'Clean',
    diversity_rep: ['POC Protagonist'],
  },
  {
    title: 'The Priory of the Orange Tree',
    slug: 'the-priory-of-the-orange-tree',
    authors: ['Samantha Shannon'],
    isbn: '9781620409435',
    cover_url: cover('9781620409435'),
    publication_year: 2019,
    page_count: 827,
    avg_rating: 4.10,
    synopsis:
      'A world divided. A dragon rising. Three women will determine the fate of everything. An epic standalone fantasy about three women on opposite sides of a religious war who must each make the choice between duty and the truth that could shatter their world.',
    audience: 'Adult',
    subgenres: ['Epic Fantasy', 'High Fantasy'],
    tropes: ['Dragon Riders', 'Political Intrigue', 'Quest', 'Forbidden Romance'],
    magic_system: 'Soft Magic',
    tone: ['Dark & Serious', 'Atmospheric', 'Hopeful'],
    pacing: 'Slow-burn',
    heat_level: 'Fade to Black',
    diversity_rep: ['LGBTQ+ Protagonist', 'POC Protagonist'],
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    slug: 'harry-potter-philosophers-stone',
    authors: ['J.K. Rowling'],
    isbn: '9780590353427',
    cover_url: cover('9780590353427'),
    publication_year: 1997,
    page_count: 223,
    avg_rating: 4.47,
    synopsis:
      'Harry Potter has never even heard of Hogwarts when the letters start arriving on his doormat. A giant of a man breaks down the door to give Harry his invitation to the most wonderful place in the world. Boarding the Hogwarts Express is the beginning of a magical adventure.',
    audience: "Children's",
    subgenres: ['High Fantasy', 'Portal Fantasy'],
    tropes: ['Magic Academy', 'Chosen One', 'Coming of Age', 'Dark Lord', 'Found Family'],
    magic_system: 'Soft Magic',
    tone: ['Whimsical', 'Light-hearted', 'Hopeful'],
    pacing: 'Mixed',
    heat_level: 'Clean',
    diversity_rep: [],
  },
  {
    title: 'A Deadly Education',
    slug: 'a-deadly-education',
    authors: ['Naomi Novik'],
    isbn: '9780593128480',
    cover_url: cover('9780593128480'),
    publication_year: 2020,
    page_count: 313,
    avg_rating: 4.10,
    synopsis:
      'El Higgins is at a school full of monsters—and she\'s not talking about the students. The Scholomance has no teachers, no library, and no dining hall. It just has students, trying to learn enough magic to survive before monsters kill them. El has been assigned to the most dangerous room, and the only student willing to help her is the one she hates most.',
    audience: 'Young Adult (YA)',
    subgenres: ['Dark Fantasy', 'High Fantasy'],
    tropes: ['Magic Academy', 'Enemies to Lovers', 'Slow Burn', 'Chosen One'],
    magic_system: 'Hard Magic',
    tone: ['Dark & Serious', 'Humorous', 'Character-driven'],
    pacing: 'Mixed',
    heat_level: 'Fade to Black',
    diversity_rep: ['POC Protagonist'],
  },
  {
    title: 'An Ember in the Ashes',
    slug: 'an-ember-in-the-ashes',
    authors: ['Sabaa Tahir'],
    isbn: '9781595148049',
    cover_url: cover('9781595148049'),
    publication_year: 2015,
    page_count: 446,
    avg_rating: 4.05,
    synopsis:
      'Laia is a slave. Elias is a soldier. Neither is free. Under the Martial Empire, defiance is met with death. When Laia\'s brother is arrested for treason, she must make an unimaginable choice. In a city of mirrors and shadows, two people discover that their fates are entwined.',
    audience: 'Young Adult (YA)',
    subgenres: ['Historical Fantasy', 'Epic Fantasy', 'Romantic Fantasy'],
    tropes: ['Enemies to Lovers', 'Forbidden Romance', 'Chosen One', 'Tournament Arc', 'Political Intrigue'],
    magic_system: 'Soft Magic',
    tone: ['Dark & Serious', 'Action-packed'],
    pacing: 'Fast-paced',
    heat_level: 'Fade to Black',
    diversity_rep: ['POC Protagonist'],
  },
];

async function seed() {
  console.log('🌱 Seeding fantasy books with full metadata...\n');

  let inserted = 0;
  let failed = 0;

  for (const book of BOOKS) {
    process.stdout.write(`📖 "${book.title}"... `);

    const { error } = await supabase.from('books').upsert(book, { onConflict: 'slug' });

    if (error) {
      console.log(`❌ ${error.message}`);
      failed++;
    } else {
      console.log('✅');
      inserted++;
    }
  }

  console.log(`\n✨ Done! ${inserted} inserted, ${failed} failed.`);
}

seed().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
