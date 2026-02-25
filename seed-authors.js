// seed-authors.js
// Upserts author profiles into the `authors` Supabase table.
// Run after creating the table and enabling RLS:
//   node seed-authors.js

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function authorToSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const authors = [
  {
    name: 'Brandon Sanderson',
    bio: 'Brandon Sanderson is an American epic fantasy author known for the Stormlight Archive and Mistborn series, as well as completing Robert Jordan\'s Wheel of Time. One of the most prolific writers in the genre, he publishes multiple novels and novellas each year and is renowned for his intricate, internally consistent magic systems.',
    website: 'https://www.brandonsanderson.com',
    twitter: 'BrandSanderson',
    goodreads: 'https://www.goodreads.com/author/show/38550.Brandon_Sanderson',
  },
  {
    name: 'Patrick Rothfuss',
    bio: 'Patrick Rothfuss is an American author celebrated for The Kingkiller Chronicle, beginning with The Name of the Wind. Praised for its lyrical prose, deeply realized world-building, and unreliable narrator, the series is among the most beloved — and anticipated — in modern fantasy.',
    website: 'https://www.patrickrothfuss.com',
    twitter: 'patrickrothfuss',
    goodreads: 'https://www.goodreads.com/author/show/108424.Patrick_Rothfuss',
  },
  {
    name: 'George R.R. Martin',
    bio: 'George R.R. Martin is an American novelist and screenwriter best known for A Song of Ice and Fire, adapted into HBO\'s Game of Thrones. His sprawling saga of medieval political intrigue in the fictional continent of Westeros is celebrated for its moral complexity, vast cast, and willingness to subvert genre expectations.',
    website: 'https://www.georgerrmartin.com',
    twitter: 'GRRMspeaking',
    goodreads: 'https://www.goodreads.com/author/show/346732.George_R_R_Martin',
  },
  {
    name: 'Robin Hobb',
    bio: 'Robin Hobb is the pen name of Margaret Astrid Lindholm Ogden, best known for the Realm of the Elderlings series beginning with the Farseer Trilogy. Her work is celebrated for its deeply emotional character studies, slow-burn plotting, and a willingness to inflict real psychological suffering on her protagonists.',
    website: 'https://www.robinhobb.com',
    twitter: null,
    goodreads: 'https://www.goodreads.com/author/show/25307.Robin_Hobb',
  },
  {
    name: 'Joe Abercrombie',
    bio: 'Joe Abercrombie is a British author who helped define the grimdark subgenre with the First Law trilogy. His work subverts classic fantasy tropes through morally compromised characters, cynical politics, and unflinching violence. He has continued expanding the First Law world with standalones and a second trilogy.',
    website: 'https://www.joeabercrombie.com',
    twitter: 'LordGrimdark',
    goodreads: 'https://www.goodreads.com/author/show/276660.Joe_Abercrombie',
  },
  {
    name: 'Sarah J. Maas',
    bio: 'Sarah J. Maas is an American fantasy author who first rose to fame with the Throne of Glass series. Her subsequent Crescent City and A Court of Thorns and Roses series have become global bestsellers, making her one of the most commercially successful authors in fantasy with a massive crossover romantasy readership.',
    website: 'https://sarahjmaas.com',
    twitter: 'therealsjmaas',
    goodreads: 'https://www.goodreads.com/author/show/3433047.Sarah_J_Maas',
  },
  {
    name: 'Rebecca Yarros',
    bio: 'Rebecca Yarros is an American author who became a publishing phenomenon with Fourth Wing, set in a dragon-rider military academy. The book and its sequel Iron Flame broke numerous sales records and introduced millions of romance readers to fantasy, establishing her as a defining voice in romantasy.',
    website: 'https://rebeccayarros.com',
    twitter: 'RebeccaYarros',
    goodreads: 'https://www.goodreads.com/author/show/7144679.Rebecca_Yarros',
  },
  {
    name: 'Leigh Bardugo',
    bio: 'Leigh Bardugo is an American author known for the Grishaverse, a universe of interconnected fantasy series beginning with Shadow and Bone. Her Six of Crows duology — a high-stakes heist story with a diverse, morally complex cast — is considered one of the best young adult fantasy series of the decade.',
    website: 'https://www.leighbardugo.com',
    twitter: 'LBardugo',
    goodreads: 'https://www.goodreads.com/author/show/4575289.Leigh_Bardugo',
  },
  {
    name: 'Robert Jordan',
    bio: 'Robert Jordan (pen name of James Oliver Rigney Jr., 1948–2007) was an American author known for The Wheel of Time, one of the longest and most influential epic fantasy series ever written. Jordan built an extraordinarily detailed world over 11 novels before his death; Brandon Sanderson completed the series from his notes.',
    website: 'https://www.dragonmount.com',
    twitter: null,
    goodreads: 'https://www.goodreads.com/author/show/6252.Robert_Jordan',
  },
  {
    name: 'Terry Pratchett',
    bio: 'Sir Terry Pratchett (1948–2015) was a British author celebrated for the Discworld series — 41 satirical fantasy novels set on a flat world carried through space on the backs of elephants and a turtle. He combined razor-sharp social commentary, deep humanity, and unmatched comic writing to create one of the most beloved fantasy universes ever written.',
    website: 'https://www.terrypratchettbooks.com',
    twitter: null,
    goodreads: 'https://www.goodreads.com/author/show/1654.Terry_Pratchett',
  },
  {
    name: 'Neil Gaiman',
    bio: 'Neil Gaiman is a British author known for weaving mythology, dark fantasy, and literary fiction into novels, comics, and screenplays. His works include American Gods, Good Omens (with Terry Pratchett), the Sandman graphic novel series, and Neverwhere, establishing him as one of the most versatile and influential voices in speculative fiction.',
    website: 'https://www.neilgaiman.com',
    twitter: 'neilhimself',
    goodreads: 'https://www.goodreads.com/author/show/1221698.Neil_Gaiman',
  },
  {
    name: 'N.K. Jemisin',
    bio: 'N.K. Jemisin is an American author who made history by winning three consecutive Hugo Awards for Best Novel — an unprecedented achievement — with her Broken Earth trilogy. Her work challenges conventional fantasy by addressing themes of colonialism, systemic oppression, and radical survival through technically innovative narrative structures.',
    website: 'https://nkjemisin.com',
    twitter: 'nkjemisin',
    goodreads: 'https://www.goodreads.com/author/show/2917917.N_K_Jemisin',
  },
  {
    name: 'Andy Weir',
    bio: 'Andy Weir is an American author who self-published The Martian on his website chapter by chapter before it became a New York Times bestseller and a major film. His fiction prioritizes scientific accuracy and engineering problem-solving, wrapped in fast-paced, humor-laced storytelling that has brought hard science fiction to a wide mainstream audience.',
    website: 'https://andyweirauthor.com',
    twitter: 'andyweirauthor',
    goodreads: 'https://www.goodreads.com/author/show/6540057.Andy_Weir',
  },
  {
    name: 'J.R.R. Tolkien',
    bio: 'J.R.R. Tolkien (1892–1973) was an English author, poet, and Oxford academic who created the foundational works of modern high fantasy with The Hobbit and The Lord of the Rings. His invention of the world of Middle-earth — including its languages, history, cosmology, and mythology — set the template for nearly all epic fantasy that followed.',
    website: 'https://www.tolkiensociety.org',
    twitter: null,
    goodreads: 'https://www.goodreads.com/author/show/656983.J_R_R_Tolkien',
  },
  {
    name: 'Ursula K. Le Guin',
    bio: 'Ursula K. Le Guin (1929–2018) was an American author widely considered one of the greatest writers of science fiction and fantasy. Her Earthsea series and Hainish Cycle explored anthropology, gender, anarchism, and Taoist philosophy through carefully crafted speculative worlds, earning her multiple Hugo, Nebula, and National Book Awards.',
    website: 'https://www.ursulakleguin.com',
    twitter: null,
    goodreads: 'https://www.goodreads.com/author/show/874602.Ursula_K_Le_Guin',
  },
  {
    name: 'Scott Lynch',
    bio: 'Scott Lynch is an American author best known for the Gentleman Bastard sequence, beginning with The Lies of Locke Lamora. The series follows a gang of con artists in a Renaissance Italian-inspired fantasy city and is celebrated for its witty dialogue, intricate heist plotting, and morally layered characters.',
    website: 'https://scottlynch.us',
    twitter: 'scottlynch78',
    goodreads: 'https://www.goodreads.com/author/show/73149.Scott_Lynch',
  },
  {
    name: 'Mark Lawrence',
    bio: 'Mark Lawrence is a British-American author known for dark, character-driven fantasy beginning with Prince of Thorns. His work often features morally compromised protagonists navigating post-apocalyptic or grimdark settings, and his self-published works have made him a prominent figure in independent fantasy publishing.',
    website: 'https://marklawrence.buzz',
    twitter: 'mark__lawrence',
    goodreads: 'https://www.goodreads.com/author/show/4721725.Mark_Lawrence',
  },
  {
    name: 'Steven Erikson',
    bio: 'Steven Erikson is a Canadian author best known for the Malazan Book of the Fallen, a 10-volume epic fantasy series regarded as one of the most complex and ambitious in the genre. The series spans continents and millennia, featuring an enormous cast, elaborate military campaigns, and serious engagement with philosophy and the nature of empire.',
    website: 'https://www.stevenerikson.com',
    twitter: null,
    goodreads: 'https://www.goodreads.com/author/show/31232.Steven_Erikson',
  },
  {
    name: 'V.E. Schwab',
    bio: 'V.E. Schwab (Victoria Schwab) is an American author known for the Shades of Magic trilogy and the Villains series. Writing across multiple age categories, she is known for morally complex antiheroes, vividly inventive parallel-world building, and a prolific output that has made her one of the most prominent authors in contemporary fantasy.',
    website: 'https://veschwab.com',
    twitter: 'veschwab',
    goodreads: 'https://www.goodreads.com/author/show/7168230.V_E_Schwab',
  },
  {
    name: 'Madeline Miller',
    bio: 'Madeline Miller is an American author and classicist known for her lyrical literary retellings of ancient Greek mythology. Her debut The Song of Achilles won the Orange Prize for Fiction, and Circe — a retelling of the witch from the Odyssey — became a global bestseller, bringing mythological fantasy to mainstream literary audiences.',
    website: 'https://madelinemiller.com',
    twitter: 'MillerMadeline',
    goodreads: 'https://www.goodreads.com/author/show/4617935.Madeline_Miller',
  },
  {
    name: 'Pierce Brown',
    bio: 'Pierce Brown is an American author known for the Red Rising saga, a dystopian science fiction series set in a solar system where society is divided by a rigid color-coded caste system. The series combines Shakespearean political drama, brutal action, and an expansive cast across novels that blend epic fantasy structure with hard sci-fi setting.',
    website: 'https://piercebrownbooks.com',
    twitter: 'Pierce_Brown',
    goodreads: 'https://www.goodreads.com/author/show/5803198.Pierce_Brown',
  },
  {
    name: 'Brent Weeks',
    bio: 'Brent Weeks is an American author known for the Night Angel trilogy and the Lightbringer series. His work features intricate magic systems grounded in moral philosophy, complex political structures, and characters who undergo profound transformation. The Lightbringer series is particularly acclaimed for its light-based magic system.',
    website: 'https://www.brentweeks.com',
    twitter: 'brentweeks',
    goodreads: 'https://www.goodreads.com/author/show/1970241.Brent_Weeks',
  },
  {
    name: 'Brian McClellan',
    bio: 'Brian McClellan is an American author and former student of Brandon Sanderson, best known for the Powder Mage trilogy — a flintlock fantasy set in the same cosmere-adjacent world as Mistborn. His work combines Sanderson-style magic system design with a focus on revolutionary politics and underdog heroes.',
    website: 'https://www.brianmcclellan.com',
    twitter: 'BTMcClellan',
    goodreads: 'https://www.goodreads.com/author/show/5145022.Brian_McClellan',
  },
  {
    name: 'Travis Baldree',
    bio: 'Travis Baldree is an American author and audiobook narrator who became a beloved figure in cozy fantasy with his debut Legends & Lattes — a heartwarming story of an orc barbarian who retires to open a coffee shop. The book helped crystallize the cozy fantasy subgenre and demonstrated that fantasy readers had enormous appetite for low-stakes, warmth-first storytelling.',
    website: 'https://www.travisbaldree.com',
    twitter: 'travisbaldree',
    goodreads: 'https://www.goodreads.com/author/show/21487016.Travis_Baldree',
  },
  {
    name: 'T.J. Klune',
    bio: 'T.J. Klune is an American author known for heartfelt, LGBTQ+-inclusive fantasy. The House in the Cerulean Sea — a whimsical story about a caseworker for magical children — became a defining comfort read and helped popularize the cozy fantasy subgenre. His work is characterized by found family themes and generous emotional warmth.',
    website: 'https://www.tjklunebooks.com',
    twitter: 'tjklune',
    goodreads: 'https://www.goodreads.com/author/show/7038516.T_J_Klune',
  },
];

async function seed() {
  console.log(`Seeding ${authors.length} authors...`);

  for (const author of authors) {
    const slug = authorToSlug(author.name);
    const { error } = await supabase
      .from('authors')
      .upsert(
        { ...author, slug },
        { onConflict: 'slug' },
      );

    if (error) {
      console.error(`✗ ${author.name}:`, error.message);
    } else {
      console.log(`✓ ${author.name} (${slug})`);
    }
  }

  console.log('Done.');
}

seed();
