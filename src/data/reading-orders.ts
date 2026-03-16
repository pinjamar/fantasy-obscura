export type BookStatus = 'mandatory' | 'optional' | 'supplementary'
export type SeriesStatus = 'complete' | 'ongoing' | 'incomplete'
export type CardColor = 'blue' | 'green' | 'amber' | 'red' | 'purple'

export interface ReadingOrderBook {
  title: string
  slug: string
  status: BookStatus
  note: string
  page_count: number
  publication_year: number
}

export interface ReadingOrderGroup {
  label: string
  sublabel?: string
  note?: string
  noteType?: 'required' | 'optional' | 'warning'
  books: ReadingOrderBook[]
}

export interface DarknessRow {
  label: string
  level: number // 1–5
  desc: string
}

export interface InfoSection {
  heading: string
  type?: 'bullets' | 'prose' | 'warning'
  bullets?: string[]
  prose?: string
}

export interface QuickCard {
  title: string
  body: string
  color: CardColor
}

export interface ReadingOrderEntry {
  slug: string
  name: string
  author: string
  seriesStatus: SeriesStatus
  seriesStatusLabel: string
  description: string
  darknessDisplay: string
  /** Flat book list — used when there are no named groups */
  books?: ReadingOrderBook[]
  /** Named arc groups — takes priority over `books` */
  groups?: ReadingOrderGroup[]
  /** Subtitle below the "Reading Order" heading */
  orderNote?: string
  /** Amber warning block displayed before the reading order list */
  warning?: string
  cards?: QuickCard[]
  sections?: InfoSection[]
  darkness?: DarknessRow[]
  finishedLabel: string
  categoryHref: string
  categoryLabel: string
  related: string[]
}

export const READING_ORDERS: ReadingOrderEntry[] = [
  // ─── A Court of Thorns and Roses ───────────────────────────────────────────
  {
    slug: 'acotar',
    name: 'A Court of Thorns and Roses',
    author: 'Sarah J. Maas',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Main Series Complete',
    description:
      'A dark fairy tale retelling that becomes a full epic fantasy by book two. Feyre is pulled into a world of immortal fae, political power, and war — with romance woven through every layer. ACMAF is the breakout book that defines the series.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    groups: [
      {
        label: 'A Court of Thorns and Roses',
        sublabel: 'read in order',
        noteType: 'required',
        note: 'All five books — read in order. ACFAS is a short bridge novella (~230 pages); read it before A Court of Silver Flames. ACMAF is frequently cited as one of the best romance-fantasy novels of the decade.',
        books: [
          { title: 'A Court of Thorns and Roses',   slug: 'a-court-of-thorns-and-roses',   status: 'mandatory',     note: 'Start here. Feyre is dragged into Prythian. Dark fairy tale retelling with slow-burn romance.',                                                    page_count: 419, publication_year: 2015 },
          { title: 'A Court of Mist and Fury',      slug: 'a-court-of-mist-and-fury',      status: 'mandatory',     note: 'The best book in the series by consensus. Everything opens up — the world, the stakes, the romance.',                                        page_count: 624, publication_year: 2016 },
          { title: 'A Court of Wings and Ruin',     slug: 'a-court-of-wings-and-ruin',     status: 'mandatory',     note: 'War arrives. Closes the main trilogy with a large-scale battle and full cast convergence.',                                                  page_count: 699, publication_year: 2017 },
          { title: 'A Court of Frost and Starlight', slug: 'a-court-of-frost-and-starlight', status: 'supplementary', note: 'Short bridge novella (~230 pages). Aftermath of the war. Sets up the companion novels — read before ACSF.',                                page_count: 232, publication_year: 2018 },
          { title: 'A Court of Silver Flames',      slug: 'a-court-of-silver-flames',      status: 'mandatory',     note: "Nesta and Cassian's book. Divisive but beloved — read it as its own thing, not a sequel to the trilogy.",                                   page_count: 757, publication_year: 2021 },
        ],
      },
    ],
    orderNote: "Read the trilogy first. The companion books are best read after — they assume you've finished ACWAR.",
    cards: [
      { title: '⚡ Essential (4 books)',         body: 'ACOTAR → ACMAF → ACWAR → ACSF. The first book is the slowest — ACMAF is where the series truly begins.',                                          color: 'blue'  },
      { title: '🔀 Bridge Novella (1 book)',     body: 'A Court of Frost and Starlight — short (~230 pages), covers the aftermath of ACWAR. Read before A Court of Silver Flames.',                      color: 'amber' },
    ],
    sections: [
      {
        heading: 'What to expect from each book',
        type: 'bullets',
        bullets: [
          'ACOTAR: Beauty and the Beast retelling. Slower pacing, establishing tone. The romance is understated.',
          'ACMAF: The series expands completely. New court, new POV, the world triples in scale. Most consider this the best in the series.',
          'ACWAR: War arc. Wraps all main threads. More political than the previous two.',
          "ACFAS: Short recovery story. Skip if you only want the main plot — read if you want emotional closure after ACWAR.",
          "ACSF: Nesta's book. Darker and more intense than the trilogy. Works best if you appreciated her character arc.",
        ],
      },
      {
        heading: 'Spoiler-free notes',
        type: 'bullets',
        bullets: [
          "The first ~100 pages of ACOTAR are the slowest in the series. Don't judge it until you've finished the book.",
          'ACMAF is where most readers fall for the series — the tone, setting, and characters shift significantly.',
          'The fae world has internal politics that reward paying attention — courts, powers, and allegiances matter.',
          'The series has explicit content from ACMAF onward.',
        ],
      },
    ],
    darkness: [
      { label: 'ACOTAR',        level: 2, desc: 'Dark fairy tale — captivity, monster threats, sacrifice' },
      { label: 'ACMAF',         level: 3, desc: 'Trauma, war build-up, political intrigue' },
      { label: 'ACWAR + ACSF',  level: 3, desc: 'Full war, loss, recovery arcs' },
    ],
    finishedLabel: 'Finished the series?',
    categoryHref: '/categories/romance-fantasy',
    categoryLabel: 'Browse Romance Fantasy',
    related: ['throne-of-glass', 'witcher'],
  },

  // ─── The Cosmere ───────────────────────────────────────────────────────────
  {
    slug: 'cosmere',
    name: "Brandon Sanderson's Cosmere",
    author: 'Brandon Sanderson',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '⏳ Ongoing Series',
    description:
      'A shared universe spanning multiple worlds, where every magic system follows hard rules and every book connects in ways you won\'t see coming. The most ambitious construction project in modern fantasy.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    groups: [
      {
        label: 'Mistborn Era 1',
        sublabel: 'start here',
        noteType: 'required',
        note: 'All three are essential. The original trilogy — heist fantasy with one of the best magic systems in the genre.',
        books: [
          { title: 'The Final Empire',       slug: 'the-final-empire',       status: 'mandatory',     note: 'Best entry point. Heist fantasy, magic tied to metals, incredible twist.',              page_count: 541, publication_year: 2006 },
          { title: 'The Well of Ascension',  slug: 'the-well-of-ascension',  status: 'mandatory',     note: 'Political siege. Tests your patience before rewarding it.',                            page_count: 590, publication_year: 2007 },
          { title: 'The Hero of Ages',       slug: 'the-hero-of-ages',       status: 'mandatory',     note: 'Everything converges. One of the best trilogy conclusions in epic fantasy.',           page_count: 572, publication_year: 2008 },
        ],
      },
      {
        label: 'Stormlight Archive — Books 1–3',
        sublabel: 'with Warbreaker & Edgedancer novella',
        noteType: 'optional',
        note: "Warbreaker is optional but free on Sanderson's website — read it before Oathbringer for a meaningful payoff. Edgedancer (novella) is best read just before Oathbringer too.",
        books: [
          { title: 'Warbreaker',         slug: 'warbreaker',         status: 'optional',      note: 'Standalone. Connects to Stormlight. Read before Way of Kings or after Era 1.',                       page_count: 592, publication_year: 2009 },
          { title: 'The Way of Kings',   slug: 'the-way-of-kings',   status: 'mandatory',     note: 'Epic scope, multiple POVs, world unlike anything else. Long but worth it.',                         page_count: 1007, publication_year: 2010 },
          { title: 'Words of Radiance',  slug: 'words-of-radiance',  status: 'mandatory',     note: 'Raises every bar set by book 1.',                                                                   page_count: 1088, publication_year: 2014 },
          { title: 'Edgedancer',         slug: 'edgedancer',         status: 'supplementary', note: 'Novella, ~40k words. Read before Oathbringer for context on Lift.',                               page_count: 226, publication_year: 2016 },
          { title: 'Oathbringer',        slug: 'oathbringer',        status: 'mandatory',     note: "Dalinar's past revealed. Biggest worldbuilding drop in the series.",                               page_count: 1248, publication_year: 2017 },
        ],
      },
      {
        label: 'Mistborn Era 2',
        sublabel: 'western-flavoured sequel',
        noteType: 'required',
        note: 'Read Era 2 before continuing to Stormlight 4 — the interleaving pays off in Rhythm of War and The Lost Metal.',
        books: [
          { title: 'The Alloy of Law',      slug: 'the-alloy-of-law',      status: 'mandatory', note: 'Western-flavoured Mistborn, 300 years later. Fast, breezy entry into Era 2.',          page_count: 332, publication_year: 2011 },
          { title: 'Shadows of Self',       slug: 'shadows-of-self',       status: 'mandatory', note: 'Darker Era 2. Important Cosmere lore drops.',                                          page_count: 383, publication_year: 2015 },
          { title: 'The Bands of Mourning', slug: 'the-bands-of-mourning', status: 'mandatory', note: 'Era 2 penultimate. Big reveals connecting to the broader Cosmere.',                   page_count: 448, publication_year: 2016 },
        ],
      },
      {
        label: 'Stormlight Archive — Books 4–5',
        sublabel: 'with Dawnshard novella and Mistborn Era 2 finale',
        books: [
          { title: 'Dawnshard',       slug: 'dawnshard',       status: 'supplementary', note: 'Novella, ~26k words. Read before Rhythm of War.',                                             page_count: 176, publication_year: 2020 },
          { title: 'Rhythm of War',   slug: 'rhythm-of-war',   status: 'mandatory',     note: 'Shifts from battlefield to politics and science. Divisive but essential.',                  page_count: 1232, publication_year: 2020 },
          { title: 'The Lost Metal',  slug: 'the-lost-metal',  status: 'mandatory',     note: 'Mistborn Era 2 finale. Massive Cosmere crossover payoff.',                                  page_count: 528, publication_year: 2022 },
          { title: 'Wind and Truth',  slug: 'wind-and-truth',  status: 'mandatory',     note: 'Stormlight 5. Closes the first arc of the series.',                                         page_count: 1330, publication_year: 2024 },
        ],
      },
    ],
    orderNote: 'Optimised for maximum Cosmere payoff — not pure publication order. Each series works standalone; connections build over time.',
    cards: [
      { title: '⚡ Essential (12 books)', body: 'Both Mistborn trilogies + full Stormlight Archive. These carry the main Cosmere narrative.',                                          color: 'blue'  },
      { title: '📖 Optional (1 book)',   body: "Warbreaker — standalone, free on Sanderson's site. Adds depth to Stormlight but not required.",                                       color: 'green' },
      { title: '🔀 Novellas (2 books)',  body: 'Edgedancer and Dawnshard — short, best read in the positions listed above.',                                                         color: 'amber' },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'New to Sanderson? Start with The Final Empire. Self-contained, best magic system intro, fastest payoff.',
          'Want epic scale immediately? Start with The Way of Kings. Longer investment but the most ambitious book in the Cosmere.',
          "Want a quick taste first? Warbreaker is free on his website, standalone, and a good test of whether you like the style.",
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          "Each series is fully readable standalone — you don't need to read everything to enjoy individual books.",
          'Connections become richer as you read more, especially by Stormlight book 3+.',
          "Mistborn: Secret History is a novella with massive spoilers — only after completing Era 1.",
          "Era 2 Mistborn can be read anytime after finishing Era 1 — even before starting Stormlight.",
          "Warbreaker's connection to Stormlight is a genuine treat — reading it before Way of Kings pays off in book 3+.",
        ],
      },
    ],
    darkness: [
      { label: 'Mistborn Era 1',         level: 3, desc: 'Moderate — oppression, sacrifice, hope' },
      { label: 'Stormlight Archive',     level: 3, desc: 'Moderate — war, depression, trauma handled with care' },
      { label: 'Mistborn Era 2',         level: 2, desc: 'Mild — lighter tone, detective/western flavour' },
    ],
    finishedLabel: 'Finished a Cosmere series?',
    categoryHref: '/categories/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['stormlight', 'wheel-of-time'],
  },

  // ─── The Stormlight Archive ────────────────────────────────────────────────
  {
    slug: 'stormlight',
    name: 'The Stormlight Archive',
    author: 'Brandon Sanderson',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '✓ First Arc Complete (5 books)',
    description:
      'The most ambitious epic fantasy currently being written. A world of perpetual storms, ancient knights, and a cosmology that rewards every re-read. Each book raises the stakes. The payoff across the arc is extraordinary.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    books: [
      { title: 'The Way of Kings',  slug: 'the-way-of-kings',  status: 'mandatory',     note: 'Start here. Kaladin, Shallan, Dalinar. Worldbuilding unlike anything else in fantasy.',                                               page_count: 1007, publication_year: 2010 },
      { title: 'Words of Radiance', slug: 'words-of-radiance',  status: 'mandatory',     note: 'Raises the bar on every level. Best fight scenes Sanderson has written.',                                                           page_count: 1088, publication_year: 2014 },
      { title: 'Edgedancer',        slug: 'edgedancer',         status: 'supplementary', note: 'Novella about Lift (~40k words). Short but adds important context — read before Oathbringer.',                                       page_count: 226,  publication_year: 2016 },
      { title: 'Oathbringer',       slug: 'oathbringer',        status: 'mandatory',     note: "Dalinar's history revealed. Largest worldbuilding expansion in the series.",                                                        page_count: 1248, publication_year: 2017 },
      { title: 'Dawnshard',         slug: 'dawnshard',          status: 'supplementary', note: 'Novella with Rysn (~26k words). Sets up important elements for Rhythm of War.',                                                    page_count: 176,  publication_year: 2020 },
      { title: 'Rhythm of War',     slug: 'rhythm-of-war',      status: 'mandatory',     note: 'Politics, science, and mental health. More divisive than earlier books but crucial for book 5.',                                   page_count: 1232, publication_year: 2020 },
      { title: 'Wind and Truth',    slug: 'wind-and-truth',     status: 'mandatory',     note: 'Closes the first 5-book arc. Massive Cosmere convergence.',                                                                        page_count: 1330, publication_year: 2024 },
    ],
    orderNote: 'Read in publication order. Position the novellas as listed — they\'re short but add meaningful context.',
    cards: [
      { title: '⚡ Main novels (5 books)',   body: 'Way of Kings → Words of Radiance → Oathbringer → Rhythm of War → Wind and Truth. All essential, all massive.',                        color: 'blue'  },
      { title: '🔀 Novellas (2 books)',      body: 'Edgedancer before Oathbringer, Dawnshard before Rhythm of War — short reads, best in position.',                                      color: 'amber' },
    ],
    sections: [
      {
        heading: 'Before you start',
        type: 'bullets',
        bullets: [
          'Each book is 1,000–1,330 pages. Prepare for the long game.',
          'Reading Warbreaker (a standalone Cosmere novel) before book 3 adds a significant reward. Not required.',
          'Part of the broader Cosmere universe — connections become clearer as you read more Sanderson.',
          'The Way of Kings has a slow opening (~200 pages of setup). The payoff begins in part 3.',
        ],
      },
      {
        heading: 'Spoiler-free notes',
        type: 'bullets',
        bullets: [
          "Kaladin's arc is about depression and finding a reason to live. Handled with unusual care for genre fiction.",
          'Each main book focuses on a different primary POV while continuing all storylines.',
          'Rhythm of War is the most divisive book — the setup it creates is essential for Wind and Truth.',
          'Wind and Truth closes the first arc. A second arc of five books is planned but unwritten.',
        ],
      },
    ],
    darkness: [
      { label: 'Books 1–2',      level: 3, desc: 'War, loss, slavery — fundamentally hopeful' },
      { label: 'Books 3–4',      level: 3, desc: 'Genocide, addiction, occupation' },
      { label: 'Wind and Truth', level: 4, desc: 'The stakes have never been higher' },
    ],
    finishedLabel: 'Finished the arc?',
    categoryHref: '/categories/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['cosmere', 'wheel-of-time'],
  },

  // ─── The First Law World ───────────────────────────────────────────────────
  {
    slug: 'first-law',
    name: 'The First Law World',
    author: 'Joe Abercrombie',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Completed Series',
    description:
      'A grimdark masterclass where the heroes are as broken as the villains — and the world keeps punishing both. Abercrombie dismantles every fantasy trope with wit, cruelty, and genuine craft.',
    darknessDisplay: '🕯️🕯️🕯️🕯️ Dark → Brutal',
    groups: [
      {
        label: 'The Original Trilogy',
        sublabel: 'start here',
        noteType: 'required',
        note: 'All three essential. Read in order — nothing should be skipped.',
        books: [
          { title: 'The Blade Itself',       slug: 'the-blade-itself',       status: 'mandatory', note: 'Start here. Introduces the full cast across three storylines.',               page_count: 531, publication_year: 2006 },
          { title: 'Before They Are Hanged', slug: 'before-they-are-hanged', status: 'mandatory', note: 'The quest, the siege, the politics — all accelerate.',                       page_count: 543, publication_year: 2007 },
          { title: 'Last Argument of Kings', slug: 'last-argument-of-kings', status: 'mandatory', note: 'Brutal conclusion. Nothing lands the way you expect.',                       page_count: 639, publication_year: 2008 },
        ],
      },
      {
        label: 'Standalones & Extras',
        sublabel: 'set in the same world, any order after the trilogy',
        noteType: 'optional',
        note: "Each standalone hits harder after the trilogy. Best Served Cold is the fan favourite. Sharp Ends (short stories) fills gaps between books — read after Red Country or skip without losing anything essential. Read all three standalones before starting Age of Madness.",
        books: [
          { title: 'Best Served Cold', slug: 'best-served-cold', status: 'mandatory', note: 'Revenge thriller set in Styria, 7 years later. Monza Murcatto assembles a crew.',  page_count: 531, publication_year: 2009 },
          { title: 'The Heroes',       slug: 'the-heroes',       status: 'mandatory', note: 'Three days of battle in the North. War dissected from every angle.',                page_count: 544, publication_year: 2011 },
          { title: 'Red Country',      slug: 'red-country',      status: 'mandatory', note: 'Western frontier fantasy. Shy South and a familiar stranger.',                      page_count: 473, publication_year: 2012 },
          { title: 'Sharp Ends',       slug: 'sharp-ends',       status: 'optional',  note: 'Short story collection. Fills gaps between main books — best read after Red Country.', page_count: 352, publication_year: 2016 },
        ],
      },
      {
        label: 'The Age of Madness',
        sublabel: 'sequel trilogy',
        noteType: 'warning',
        note: 'Read the original trilogy plus at least two standalones first. Characters and payoffs depend heavily on what came before.',
        books: [
          { title: 'A Little Hatred',        slug: 'a-little-hatred',        status: 'mandatory', note: 'Age of Madness begins. Industrial revolution, new generation, same rotten world.',         page_count: 373, publication_year: 2019 },
          { title: 'The Trouble With Peace', slug: 'the-trouble-with-peace', status: 'mandatory', note: 'Political tension escalates toward inevitable conflict.',                                  page_count: 483, publication_year: 2020 },
          { title: 'The Wisdom of Crowds',   slug: 'the-wisdom-of-crowds',   status: 'mandatory', note: 'Revolution, consequence, and the full weight of the series paying off.',                  page_count: 448, publication_year: 2021 },
        ],
      },
    ],
    orderNote: 'Publication order = best reading order. Do not skip the standalones before Age of Madness.',
    cards: [
      { title: '⚡ Essential reads (9 books)', body: 'The Blade Itself → Last Argument of Kings → Best Served Cold → The Heroes → Red Country → Age of Madness trilogy. Skip none of these.',  color: 'blue'  },
      { title: '📖 Optional (1 book)',         body: 'Sharp Ends — short story collection. Adds flavour and backstory but nothing you\'ll miss if you skip it. Read after Red Country.',         color: 'green' },
    ],
    sections: [
      {
        heading: 'Publication order vs Chronological order',
        type: 'prose',
        prose: 'These are the same. Abercrombie wrote the world in the order you should read it. The standalones (Best Served Cold, The Heroes, Red Country) happen between the trilogies but were published between them too — that\'s intentional. Reading them out of order spoils the payoff of both trilogies. Timeline at a glance: Y0–Y3 Original Trilogy → Y10 Best Served Cold (Styrian civil war) → Y12 The Heroes (Battle of Osrung) → Y14 Red Country (Far Country frontier) → Y40 Age of Madness trilogy (next generation).',
      },
      {
        heading: 'Safe starting point',
        type: 'warning',
        prose: 'Start with The Blade Itself — no exceptions. The standalones and Age of Madness trilogy carry heavy spoilers for the original trilogy and reward readers who\'ve grown attached to the characters. Jumping in at Best Served Cold or A Little Hatred is technically possible but significantly reduces the impact. Do not start with Age of Madness — it spoils the original trilogy ending.',
      },
      {
        heading: 'Spoiler-free notes',
        type: 'bullets',
        bullets: [
          'The Blade Itself starts slowly — the payoff is in book 2 and 3. Trust the setup.',
          'Each standalone follows different protagonists, but familiar faces appear throughout.',
          'The standalones are not filler — events in them directly shape the Age of Madness world.',
          'Sharp Ends short stories are best read scattered throughout or all at the end — not before the standalones.',
          'Age of Madness is darker than the original trilogy. The world has changed, and not for the better.',
        ],
      },
    ],
    darkness: [
      { label: 'Original Trilogy', level: 4, desc: 'Dark — moral rot, betrayal, broken heroes' },
      { label: 'Standalones',      level: 4, desc: 'Dark — revenge, war, frontier brutality' },
      { label: 'Age of Madness',   level: 5, desc: 'Brutal — revolution, mass violence, no clean hands' },
    ],
    finishedLabel: 'Finished the series?',
    categoryHref: '/categories/grimdark',
    categoryLabel: 'Browse more Grimdark',
    related: ['malazan', 'kingkiller'],
  },

  // ─── Malazan Book of the Fallen ────────────────────────────────────────────
  {
    slug: 'malazan',
    name: 'Malazan Book of the Fallen',
    author: 'Steven Erikson',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Completed Series',
    description:
      'The most vast and uncompromising epic fantasy ever written. No other series trusts its readers this completely — or rewards them as deeply. You will be lost. Then you will be changed.',
    darknessDisplay: '🕯️🕯️🕯️🕯️🕯️ Brutal',
    books: [
      { title: 'Gardens of the Moon', slug: 'gardens-of-the-moon', status: 'mandatory', note: 'Brutal opening. No hand-holding. Push through the first 200 pages — it rewards patience.',               page_count: 666,  publication_year: 1999 },
      { title: 'Deadhouse Gates',     slug: 'deadhouse-gates',     status: 'mandatory', note: 'New continent, mostly new cast. The Chain of Dogs. Many call this the best book in the series.',       page_count: 604,  publication_year: 2000 },
      { title: 'Memories of Ice',     slug: 'memories-of-ice',     status: 'mandatory', note: 'Returns to Genabackis. Epic siege of Capustan. One of the emotional peaks of the series.',             page_count: 905,  publication_year: 2001 },
      { title: 'House of Chains',     slug: 'house-of-chains',     status: 'mandatory', note: 'Karsa Orlong. One of the most memorable character introductions in fantasy.',                          page_count: 1040, publication_year: 2002 },
      { title: 'Midnight Tides',      slug: 'midnight-tides',      status: 'mandatory', note: 'Completely new continent, cast, and tone. Tehol and Bugg are a comedy duo in a tragedy. Trust this book.', page_count: 944, publication_year: 2004 },
      { title: 'The Bonehunters',     slug: 'the-bonehunters',     status: 'mandatory', note: 'All storylines begin converging. Some of the most devastating set-pieces in the series.',             page_count: 1184, publication_year: 2006 },
      { title: "Reaper's Gale",       slug: 'reapers-gale',        status: 'mandatory', note: 'Midnight Tides arc reaches its apex. Brutal even by Malazan standards.',                              page_count: 1280, publication_year: 2007 },
      { title: 'Toll the Hounds',     slug: 'toll-the-hounds',     status: 'mandatory', note: 'Returns to Darujhistan. Meditative, philosophical, heartbreaking.',                                   page_count: 1232, publication_year: 2008 },
      { title: 'Dust of Dreams',      slug: 'dust-of-dreams',      status: 'mandatory', note: 'First half of the finale. Published alongside The Crippled God — read back-to-back.',                 page_count: 912,  publication_year: 2009 },
      { title: 'The Crippled God',    slug: 'the-crippled-god',    status: 'mandatory', note: 'The conclusion. One of the most emotionally overwhelming endings in fantasy.',                         page_count: 912,  publication_year: 2011 },
    ],
    warning: 'Malazan opens in the middle of a war with no introduction. This is deliberate. Hundreds of characters, multiple continents, gods walking among soldiers. Context comes later. Gardens of the Moon is the hardest book. If you survive it, you\'ll finish the series. Every unanswered question from books 1–3 gets resolved. Trust the author.',
    orderNote: 'Publication order = only order. All 10 books are essential.',
    sections: [
      {
        heading: 'Publication order vs Chronological order',
        type: 'prose',
        prose: 'These diverge significantly, but publication order is the only recommended path. Erikson intentionally withholds context — reading chronologically destroys the mystery. The Ian C. Esslemont companion novels (Novels of the Malazan Empire) can be interspersed but are not required.',
      },
      {
        heading: 'Spoiler-free notes',
        type: 'bullets',
        bullets: [
          'Books 1 and 4 are the hardest. Books 2, 3, 5, and 8 are where most people fall in love with the series.',
          'Midnight Tides (book 5) switches to an entirely new cast — don\'t panic, this is intentional and excellent.',
          'Dust of Dreams and The Crippled God are one novel split in two — read them back-to-back.',
          'The series does not have a villain. It has consequences.',
          'Plan for months, not weeks. This is the highest page count of any fantasy series.',
        ],
      },
      {
        heading: 'Content & darkness',
        type: 'prose',
        prose: 'Consistently 🕯️🕯️🕯️🕯️🕯️ (Brutal) throughout. Mass death, genocide, torture, moral ambiguity, and compassion in equal measure. Erikson is not gratuitous — the darkness is purposeful — but this is not a comfortable read.',
      },
    ],
    finishedLabel: 'Finished Malazan?',
    categoryHref: '/categories/grimdark',
    categoryLabel: 'Browse Grimdark',
    related: ['first-law', 'wheel-of-time'],
  },

  // ─── The Wheel of Time ─────────────────────────────────────────────────────
  {
    slug: 'wheel-of-time',
    name: 'The Wheel of Time',
    author: 'Robert Jordan & Brandon Sanderson',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Completed Series',
    description:
      'The defining epic fantasy of the 1990s and still one of the most ambitious — 14 books, ~11,000 pages, hundreds of characters, a prophecy 3,000 years in the making. You will laugh, you will despair through the slog, and the ending will earn it all.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    books: [
      { title: 'The Eye of the World',    slug: 'the-eye-of-the-world',    status: 'mandatory', note: 'Start here. Very Tolkien-flavoured at first — it evolves. Pay attention to the women.',                                             page_count: 782,  publication_year: 1990 },
      { title: 'The Great Hunt',          slug: 'the-great-hunt',          status: 'mandatory', note: 'The Horn of Valere. The world expands significantly.',                                                                              page_count: 681,  publication_year: 1990 },
      { title: 'The Dragon Reborn',       slug: 'the-dragon-reborn',       status: 'mandatory', note: "Rand accepts his fate. Egwene, Nynaeve, and Elayne step up.",                                                                      page_count: 675,  publication_year: 1991 },
      { title: 'The Shadow Rising',       slug: 'the-shadow-rising',       status: 'mandatory', note: 'Many call this the best book. Tear, the Aiel Waste, the Two Rivers — all at once.',                                                page_count: 981,  publication_year: 1992 },
      { title: 'The Fires of Heaven',     slug: 'the-fires-of-heaven',     status: 'mandatory', note: 'Rand and Mat in the south. Nynaeve and Elayne on the run. Tension everywhere.',                                                    page_count: 963,  publication_year: 1993 },
      { title: 'Lord of Chaos',           slug: 'lord-of-chaos',           status: 'mandatory', note: "Dumai's Wells. One of the most explosive sequences in the series.",                                                                page_count: 1011, publication_year: 1994 },
      { title: 'A Crown of Swords',       slug: 'a-crown-of-swords',       status: 'mandatory', note: 'Political intrigue and the Bowl of the Winds. The beginning of the "slog."',                                                       page_count: 856,  publication_year: 1996 },
      { title: 'The Path of Daggers',     slug: 'the-path-of-daggers',     status: 'mandatory', note: 'Shorter but slower. Rand reaches a breaking point.',                                                                               page_count: 591,  publication_year: 1998 },
      { title: "Winter's Heart",          slug: 'winters-heart',           status: 'mandatory', note: 'A massive event at the end. The slog breaks for a few chapters.',                                                                  page_count: 766,  publication_year: 2000 },
      { title: 'Crossroads of Twilight',  slug: 'crossroads-of-twilight',  status: 'mandatory', note: "The slowest book in the series. Covers the same timeline as Winter's Heart. Stay strong.",                                        page_count: 822,  publication_year: 2003 },
      { title: 'Knife of Dreams',         slug: 'knife-of-dreams',         status: 'mandatory', note: "Jordan's last solo book. Picks up pace dramatically. The end of the slog.",                                                       page_count: 837,  publication_year: 2005 },
      { title: 'The Gathering Storm',     slug: 'the-gathering-storm',     status: 'mandatory', note: 'Sanderson takes over after Jordan died. Excellent. Egwene is magnificent.',                                                        page_count: 766,  publication_year: 2009 },
      { title: 'Towers of Midnight',      slug: 'towers-of-midnight',      status: 'mandatory', note: "Runs parallel to The Gathering Storm. Mat and Perrin's arcs resolved.",                                                           page_count: 843,  publication_year: 2010 },
      { title: 'A Memory of Light',       slug: 'a-memory-of-light',       status: 'mandatory', note: "Tarmon Gai'don. The Last Battle. Epic, overwhelming, earned.",                                                                     page_count: 912,  publication_year: 2013 },
    ],
    warning: '"The Slog" — books 7–10: Books 7–10 (A Crown of Swords through Crossroads of Twilight) are the most divisive in the series. Pacing slows dramatically, storylines stall, and Crossroads of Twilight in particular covers almost no ground. This is real — but it ends. Knife of Dreams (book 11) brings the pace back, and the Sanderson trilogy is some of the best fantasy writing in the series. Push through.',
    orderNote: 'All 14 books in publication order. All are essential. There are no optional reads.',
    sections: [
      {
        heading: 'Publication order vs Chronological order',
        type: 'prose',
        prose: "These are mostly the same. New Spring (a prequel novella) can technically be read anytime after book 10 but adds nothing essential for the main story. The only ordering question is whether to read The Gathering Storm and Towers of Midnight interleaved (they share a timeline) — but most readers read them sequentially in publication order, which works fine.",
      },
      {
        heading: 'Spoiler-free notes',
        type: 'bullets',
        bullets: [
          'Books 1–6 are the golden era. Excellent pacing, constant revelations, the world expanding.',
          'The women characters are excellent — many consider them more interesting than the male leads.',
          'Jordan died in 2007. Brandon Sanderson finished the series from Jordan\'s notes. The transition is seamless.',
          'The audiobook narration (Michael Kramer and Kate Reading) is considered one of the best in fantasy.',
          'The Amazon Prime show significantly diverges from the books after season 1.',
        ],
      },
    ],
    darkness: [
      { label: 'Books 1–3',  level: 2, desc: 'Adventure, wonder, classic quest energy' },
      { label: 'Books 4–6',  level: 3, desc: 'War, politics, psychological strain on the Dragon' },
      { label: 'Books 7–14', level: 4, desc: 'Rand\'s mental collapse, apocalypse approaching, mass casualties' },
    ],
    finishedLabel: 'Finished the series?',
    categoryHref: '/categories/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['cosmere', 'malazan'],
  },

  // ─── The Kingkiller Chronicle ──────────────────────────────────────────────
  {
    slug: 'kingkiller',
    name: 'The Kingkiller Chronicle',
    author: 'Patrick Rothfuss',
    seriesStatus: 'incomplete',
    seriesStatusLabel: '⚠️ Incomplete — Book 3 unreleased',
    description:
      'A legendary hero sits in a country inn and tells a scribe his life story over three days. Rothfuss writes with more craft and precision than almost anyone in the genre — and book 3 has been in development since 2011 with no release date.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    books: [
      { title: 'The Name of the Wind',              slug: 'the-name-of-the-wind',              status: 'mandatory',     note: 'Day one of Kvothe telling his story. Lyrical, slow-burn, unforgettable prose.',                                          page_count: 662, publication_year: 2007 },
      { title: "The Wise Man's Fear",               slug: 'the-wise-mans-fear',                status: 'mandatory',     note: 'Day two. Longer, more divisive, but essential. The Adem sequences are polarising.',                                       page_count: 994, publication_year: 2011 },
      { title: 'The Slow Regard of Silent Things',  slug: 'the-slow-regard-of-silent-things',  status: 'supplementary', note: 'Novella about Auri alone in the Underthing. No plot — pure atmosphere. Read only if you loved Auri.',                    page_count: 159, publication_year: 2014 },
    ],
    warning: "The Doors of Stone (book 3) has been announced since 2011 with no publication date as of 2026. Many readers prefer to wait before starting. The two published books end on open threads that may never resolve.",
    orderNote: 'Start with The Name of the Wind. No other order is possible.',
    sections: [
      {
        heading: 'The Slow Regard of Silent Things',
        type: 'prose',
        prose: "Rothfuss himself warns in the foreword that this novella is \"not for everyone.\" It follows Auri — a side character from the main books — over seven days in the Underthing. There is almost no plot. It is a meditation. Only read it if you found Auri fascinating; otherwise skip it entirely without loss.",
      },
      {
        heading: 'What to expect',
        type: 'bullets',
        bullets: [
          'Lyrical, carefully crafted prose — the most technically accomplished writing in mainstream fantasy.',
          'Frame narrative — Kvothe is recounting his life, so there is dramatic irony built in from page one.',
          'Magic system based on "sympathy" (physics-based) and "naming" (true language) — rigorously defined.',
          "Slow-burn pacing. Book 1 covers Kvothe's first year at the University. Book 2, his second. This is intentional.",
          'Kvothe is an unreliable narrator — he is telling his own legend and may be embellishing.',
        ],
      },
    ],
    darkness: [
      { label: 'The Name of the Wind', level: 3, desc: 'Poverty, loss, abuse — but youthful energy dominates' },
      { label: "The Wise Man's Fear",  level: 3, desc: 'War, assassins, fae — darker and more complex' },
    ],
    finishedLabel: 'Want more literary fantasy?',
    categoryHref: '/categories/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['first-law', 'stormlight'],
  },

  // ─── The Witcher ───────────────────────────────────────────────────────────
  {
    slug: 'witcher',
    name: 'The Witcher',
    author: 'Andrzej Sapkowski',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Completed Series',
    description:
      'A monster hunter in a morally grey world who is far more interesting than the monsters. Sapkowski takes fairy tales apart and rebuilds them as tragedy. The books behind the games, the show, and a generation of dark fantasy.',
    darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
    books: [
      { title: 'The Last Wish',        slug: 'the-last-wish',        status: 'mandatory', note: 'Start here. Short stories introducing Geralt and the world. Brilliant fairy tale deconstructions.',            page_count: 288, publication_year: 1993 },
      { title: 'Sword of Destiny',     slug: 'sword-of-destiny',     status: 'mandatory', note: 'More short stories — Ciri appears. These two collections are the foundation of everything.',                  page_count: 384, publication_year: 1992 },
      { title: 'Blood of Elves',       slug: 'blood-of-elves',       status: 'mandatory', note: 'First novel. The war begins and Geralt must protect Ciri.',                                                   page_count: 288, publication_year: 1994 },
      { title: 'Time of Contempt',     slug: 'time-of-contempt',     status: 'mandatory', note: 'Political intrigue, mage politics, and everything accelerates.',                                              page_count: 352, publication_year: 1995 },
      { title: 'Baptism of Fire',      slug: 'baptism-of-fire',      status: 'mandatory', note: 'War-torn journey. Geralt travels through a world at war.',                                                   page_count: 352, publication_year: 1996 },
      { title: 'The Tower of Swallows',slug: 'the-tower-of-swallows',status: 'mandatory', note: 'The penultimate novel. Ciri on her own. Dark and relentless.',                                               page_count: 400, publication_year: 1997 },
      { title: 'Lady of the Lake',     slug: 'lady-of-the-lake',     status: 'mandatory', note: 'Epic conclusion to the saga. Everything converges.',                                                         page_count: 544, publication_year: 1999 },
      { title: 'Season of Storms',     slug: 'season-of-storms',     status: 'optional',  note: 'Standalone prequel/interquel. Set between the short stories. Read after the main saga.',                     page_count: 368, publication_year: 2013 },
    ],
    orderNote: 'Start with the short story collections — they are not prologues, they are essential. The saga novels follow.',
    cards: [
      { title: '⚡ Essential (7 books)',  body: 'Both short story collections + the 5 saga novels. The short stories are not optional — they introduce Ciri and set up the entire saga.',     color: 'blue'  },
      { title: '📖 Optional (1 book)',   body: 'Season of Storms — a standalone set between the short stories. Contains spoilers for the saga, so read it last.',                           color: 'green' },
    ],
    sections: [
      {
        heading: 'Why start with the short stories?',
        type: 'bullets',
        bullets: [
          'The short stories were written first and establish the world, tone, and moral framework.',
          'Key characters — including Ciri, who becomes central to the saga — are introduced in Sword of Destiny.',
          'The saga novels assume knowledge of the short story characters. Starting at Blood of Elves causes confusion.',
        ],
      },
      {
        heading: 'If you know the games or show',
        type: 'bullets',
        bullets: [
          'The books are darker and more morally complex than either adaptation.',
          "The games are set after the books — they're sequels, not adaptations. They assume the book endings.",
          'The Netflix show takes significant liberties with the story and timeline.',
          'Geralt in the books is more cynical, more tired, and more interesting than either adaptation.',
        ],
      },
    ],
    darkness: [
      { label: 'Short Stories',   level: 3, desc: 'Dark fairy tales — violence, moral ambiguity, dark humour' },
      { label: 'The Saga (5 novels)', level: 4, desc: 'War, genocide, betrayal, child soldiers' },
    ],
    finishedLabel: 'Finished the saga?',
    categoryHref: '/categories/dark',
    categoryLabel: 'Browse Dark Fantasy',
    related: ['first-law', 'kingkiller'],
  },

  // ─── The Dresden Files ─────────────────────────────────────────────────────
  {
    slug: 'dresden-files',
    name: 'The Dresden Files',
    author: 'Jim Butcher',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '⏳ Ongoing Series',
    description:
      "Urban fantasy noir — Harry Dresden is Chicago's only professional wizard, listed in the Yellow Pages. What starts as hardboiled detective fiction with magic escalates across 17 books into a cosmic war with genuine consequences. The first two books are the weakest; by book four the series is exceptional.",
    darknessDisplay: '🕯️🕯️🕯️ → 🕯️🕯️🕯️🕯️🕯️ Serious → Brutal',
    groups: [
      {
        label: 'The Early Cases',
        sublabel: 'books 1–6 — start here',
        noteType: 'required',
        note: 'The first two books (Storm Front, Fool Moon) are lighter in tone. Push through — the series hits its stride with Grave Peril and never looks back.',
        books: [
          { title: 'Storm Front',   slug: 'storm-front',   status: 'mandatory', note: 'Start here. Harry Dresden, Chicago wizard-for-hire. Sets the tone — fast, funny, and darker than it looks.',           page_count: 322, publication_year: 2000 },
          { title: 'Fool Moon',     slug: 'fool-moon',     status: 'mandatory', note: 'Werewolves. The weakest early book but essential — introduces key characters and the White Council.',                  page_count: 384, publication_year: 2001 },
          { title: 'Grave Peril',   slug: 'grave-peril',   status: 'mandatory', note: 'The series finds its voice. The Red Court appears. An ending that changes everything going forward.',                  page_count: 378, publication_year: 2001 },
          { title: 'Summer Knight', slug: 'summer-knight', status: 'mandatory', note: 'Faeries and a political war between Courts. Many consider this where the series truly becomes great.',                 page_count: 371, publication_year: 2002 },
          { title: 'Death Masks',   slug: 'death-masks',   status: 'mandatory', note: 'The Denarians and the Knights of the Cross. One of the best standalone plots in the series.',                         page_count: 374, publication_year: 2003 },
          { title: 'Blood Rites',   slug: 'blood-rites',   status: 'mandatory', note: 'The White Court of vampires. Thomas steps into focus. A turning point for Harry personally.',                         page_count: 372, publication_year: 2004 },
        ],
      },
      {
        label: 'The Escalation Arc',
        sublabel: 'books 7–11 — the series hits full stride',
        noteType: 'required',
        note: 'Dead Beat through Turn Coat is where the series becomes unmissable. Each book raises the stakes and adds pieces to a much larger board.',
        books: [
          { title: 'Dead Beat',     slug: 'dead-beat',     status: 'mandatory', note: 'Necromancers, a zombie T-Rex, and a major power shift for Harry. The fan favourite entry point for many.',            page_count: 432, publication_year: 2005 },
          { title: 'Proven Guilty', slug: 'proven-guilty', status: 'mandatory', note: 'Harry vs. the White Council vs. fear entities. The magic system deepens significantly.',                              page_count: 496, publication_year: 2006 },
          { title: 'White Night',   slug: 'white-night',   status: 'mandatory', note: 'Marcone, the White Court, and a conspiracy targeting minor talents. Sets up the series-wide chess board.',            page_count: 450, publication_year: 2007 },
          { title: 'Small Favor',   slug: 'small-favor',   status: 'mandatory', note: 'The Denarians return. Gruff. The Archive. One of the best-plotted books in the series.',                             page_count: 436, publication_year: 2008 },
          { title: 'Turn Coat',     slug: 'turn-coat',     status: 'mandatory', note: 'Morgan and the Wardens. The White Council at war with itself. The conspiracy arc reaches a peak.',                    page_count: 418, publication_year: 2009 },
        ],
      },
      {
        label: 'The Crisis Arc',
        sublabel: 'books 12–15 — everything changes',
        noteType: 'warning',
        note: 'Changes (book 12) is a point of no return. The series gets significantly darker and more consequential. Do not read spoilers.',
        books: [
          { title: 'Changes',      slug: 'changes',      status: 'mandatory', note: 'The series-defining book. Harry burns every bridge. Nothing is the same after this. Do not spoil yourself.',           page_count: 448, publication_year: 2010 },
          { title: 'Ghost Story',  slug: 'ghost-story',  status: 'mandatory', note: 'The aftermath of Changes, told from a radically different perspective. Divisive but essential for what follows.',      page_count: 481, publication_year: 2011 },
          { title: 'Cold Days',    slug: 'cold-days',    status: 'mandatory', note: "Harry's new position explained. The scope of the overarching plot reveals itself. Outstanding.",                       page_count: 516, publication_year: 2012 },
          { title: 'Skin Game',    slug: 'skin-game',    status: 'mandatory', note: 'Heist against Hades. The most accessible book post-Changes and arguably the best single volume in the series.',        page_count: 464, publication_year: 2014 },
        ],
      },
      {
        label: 'The Aftermath',
        sublabel: 'books 16–17 — read back-to-back',
        noteType: 'warning',
        note: 'Peace Talks and Battle Ground were written as one book and split at publication. Read them together — Peace Talks ends mid-story.',
        books: [
          { title: 'Peace Talks',   slug: 'peace-talks',   status: 'mandatory', note: 'A supernatural summit in Chicago. Structurally a first half — read back-to-back with Battle Ground.',               page_count: 328, publication_year: 2020 },
          { title: 'Battle Ground', slug: 'battle-ground', status: 'mandatory', note: 'One real-time night of war in Chicago. The most brutal book in the series. Devastating consequences.',               page_count: 364, publication_year: 2020 },
        ],
      },
      {
        label: 'Short Story Collections',
        sublabel: 'optional',
        noteType: 'optional',
        note: 'Best read scattered alongside the main series rather than all at once. Side Jobs fits books 1–12; Brief Cases fits books 10–17.',
        books: [
          { title: 'Side Jobs',   slug: 'side-jobs',   status: 'optional', note: 'Short story anthology covering the gaps between books 1–12. Best read as you finish each main book rather than all at once.', page_count: 416, publication_year: 2011 },
          { title: 'Brief Cases', slug: 'brief-cases', status: 'optional', note: 'Second anthology covering books 10–17. The novella "Ghoul Goblin" and a long post-Skin Game story are the highlights.',      page_count: 512, publication_year: 2018 },
        ],
      },
    ],
    orderNote: 'Strictly publication order — the series is sequential and almost every book builds on the last.',
    cards: [
      { title: '⚡ The best entry point',   body: 'Start with Storm Front — no exceptions. The series is deeply sequential and spoilers compound fast. The slow start (books 1–2) is worth it.',                                                                    color: 'blue'   },
      { title: '⚠️ The Changes problem',   body: 'Changes (book 12) is where the series permanently shifts gear. If you\'re struggling with the early books, know that the series becomes something different — and much darker — after this point.',              color: 'amber'  },
      { title: '📖 Short stories',         body: 'Side Jobs and Brief Cases are best read scattered alongside the series, not all at once. Each story notes which main book it follows.',                                                                          color: 'purple' },
    ],
    sections: [
      {
        heading: 'What to know before you start',
        type: 'bullets',
        bullets: [
          "Storm Front and Fool Moon are the weakest books. Butcher has said he'd rewrite them given the chance. Push through.",
          "The series rewards patience — payoffs from book 3 appear in book 15. There is a long game being played.",
          'The audiobooks narrated by James Marsters are widely considered among the best in the genre.',
          "Peace Talks and Battle Ground were written as one book — buy both before starting Peace Talks.",
          "The series is unfinished. Book 18 (Mirror Mirror) and a capstone trilogy are planned but unwritten.",
        ],
      },
    ],
    darkness: [
      { label: 'Books 1–3 (Storm Front–Grave Peril)',        level: 3, desc: 'Serious — noir tone, violence present but filtered' },
      { label: 'Books 4–11 (Summer Knight–Turn Coat)',       level: 4, desc: 'Dark — war, loss, real consequences' },
      { label: 'Books 12–17 (Changes–Battle Ground)',        level: 5, desc: 'Brutal — major deaths, no safety net' },
    ],
    finishedLabel: "Finished what's published?",
    categoryHref: '/categories/urban-fantasy',
    categoryLabel: 'Browse Urban Fantasy',
    related: ['kingkiller', 'first-law'],
  },

  // ─── Discworld ─────────────────────────────────────────────────────────────
  {
    slug: 'discworld',
    name: 'Discworld',
    author: 'Terry Pratchett',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Completed Series (41 books)',
    description:
      'Forty-one novels of razor-sharp satire dressed as comedy fantasy — organized into seven subseries you can read in any order. Pratchett used a flat world on the back of a turtle to say more about humanity than most literary fiction manages. Every book is a standalone. Start anywhere.',
    darknessDisplay: '🕯️🕯️ Mild darkness',
    groups: [
      {
        label: 'City Watch',
        sublabel: 'recommended start — books 8, 15, 19, 21, 24, 29, 34, 39',
        noteType: 'required',
        note: 'The most popular entry into Discworld. Start with Guards! Guards! — the Watch arc tracks a corrupt city over 20+ years of stories. Night Watch is considered one of the finest books in the series.',
        books: [
          { title: 'Guards! Guards!',        slug: 'guards-guards',       status: 'mandatory',     note: 'Best starting point. Night Watch is introduced. Dragons invade Ankh-Morpork.',                   page_count: 288, publication_year: 1989 },
          { title: 'Men at Arms',            slug: 'men-at-arms',         status: 'mandatory',     note: 'The Watch grows. Carrot, Angua, diversity politics — Pratchett at his social best.',             page_count: 300, publication_year: 1993 },
          { title: 'Feet of Clay',           slug: 'feet-of-clay',        status: 'mandatory',     note: 'Murder mystery involving golems. One of the sharpest Watch books.',                             page_count: 288, publication_year: 1996 },
          { title: 'Jingo',                  slug: 'jingo',               status: 'mandatory',     note: 'War satire. Vimes at his most furious and politically brilliant.',                               page_count: 288, publication_year: 1997 },
          { title: 'The Fifth Elephant',     slug: 'the-fifth-elephant',  status: 'mandatory',     note: 'Vimes on a diplomatic mission. Dwarves, werewolves, and a murder.',                             page_count: 321, publication_year: 1999 },
          { title: 'Night Watch',            slug: 'night-watch',         status: 'mandatory',     note: 'Time travel, revolution, and Vimes at his absolute best. One of the great Discworld novels.',   page_count: 338, publication_year: 2002 },
          { title: 'Thud!',                  slug: 'thud',                status: 'optional',      note: 'Trolls vs. dwarves in Ankh-Morpork. Vimes dealing with prejudice and fatherhood.',             page_count: 384, publication_year: 2005 },
          { title: 'Snuff',                  slug: 'snuff',               status: 'optional',      note: "Vimes on a country holiday that turns into a case. The Watch's final novel.",                   page_count: 398, publication_year: 2011 },
        ],
      },
      {
        label: 'Witches',
        sublabel: 'books 3, 6, 12, 14, 18, 23',
        noteType: 'optional',
        note: 'Start with Wyrd Sisters, not Equal Rites. The Witches trilogy (Wyrd Sisters, Witches Abroad, Lords and Ladies) is feminist, sharp, and very funny. Granny Weatherwax is one of the great characters in all of fantasy.',
        books: [
          { title: 'Equal Rites',    slug: 'equal-rites',    status: 'supplementary', note: 'Early Pratchett, still finding the voice. First Granny Weatherwax — readable but the weakest Witches entry.',   page_count: 212, publication_year: 1987 },
          { title: 'Wyrd Sisters',   slug: 'wyrd-sisters',   status: 'mandatory',     note: 'The Witches subseries proper starts here. Shakespeare satire, three-way witch dynamic, magnificent.',           page_count: 265, publication_year: 1988 },
          { title: 'Witches Abroad', slug: 'witches-abroad', status: 'mandatory',     note: 'Fairy tale deconstruction. Granny and Nanny travel abroad — one of the funniest Discworld books.',             page_count: 284, publication_year: 1991 },
          { title: 'Lords and Ladies', slug: 'lords-and-ladies', status: 'optional',  note: 'The elves return. Darker in tone. Excellent but harder to appreciate without the prior books.',               page_count: 281, publication_year: 1992 },
          { title: 'Maskerade',      slug: 'maskerade',      status: 'optional',      note: 'Phantom of the Opera parody with Agnes Nitt. Sharp opera satire.',                                             page_count: 288, publication_year: 1995 },
          { title: 'Carpe Jugulum', slug: 'carpe-jugulum',   status: 'optional',      note: 'Vampires take over Lancre. Granny Weatherwax at her most complex. The Witches finale.',                       page_count: 368, publication_year: 1998 },
        ],
      },
      {
        label: 'Death',
        sublabel: 'books 4, 11, 16, 20, 26',
        noteType: 'optional',
        note: 'Mort is the best entry after Guards! Guards!. The Death subseries is warmer and more philosophical than the Watch. Hogfather (book 4 of the arc) is a December read.',
        books: [
          { title: 'Mort',           slug: 'mort',           status: 'mandatory',     note: 'Death takes an apprentice. The Death subseries — darkly funny and surprisingly moving.',                      page_count: 243, publication_year: 1987 },
          { title: 'Reaper Man',     slug: 'reaper-man',     status: 'mandatory',     note: 'Death gets fired and has to find a job. Surprisingly tender and funny.',                                      page_count: 252, publication_year: 1991 },
          { title: 'Soul Music',     slug: 'soul-music',     status: 'optional',      note: "Rock'n'roll comes to Discworld. Susan Sto Helit's debut. Slightly overlong but charming.",                   page_count: 388, publication_year: 1994 },
          { title: 'Hogfather',      slug: 'hogfather',      status: 'mandatory',     note: 'Death plays Father Christmas. Pratchett on belief, gods, and the value of stories. A masterpiece.',          page_count: 336, publication_year: 1996 },
          { title: 'Thief of Time',  slug: 'thief-of-time',  status: 'optional',      note: "Susan and the History Monks. The Death arc's most philosophical entry.",                                      page_count: 324, publication_year: 2001 },
        ],
      },
      {
        label: 'Rincewind & Wizards',
        sublabel: 'books 1, 2, 5, 9, 17, 22, 27, 37',
        noteType: 'optional',
        note: "The original Discworld arc — and the weakest. Colour of Magic and Light Fantastic are historically interesting but not representative of what the series becomes. Sourcery or Interesting Times are the better Rincewind entry points.",
        books: [
          { title: 'The Colour of Magic',   slug: 'the-colour-of-magic',   status: 'supplementary', note: 'Book 1 — Pratchett finding his feet. Start here only if you want to read in full publication order.',  page_count: 206, publication_year: 1983 },
          { title: 'The Light Fantastic',   slug: 'the-light-fantastic',   status: 'supplementary', note: 'Direct sequel to Colour of Magic. Stronger, but still early-era Pratchett.',                           page_count: 186, publication_year: 1986 },
          { title: 'Sourcery',              slug: 'sourcery',              status: 'optional',      note: 'A sourcerer threatens to destroy magic. Good standalone Rincewind entry.',                              page_count: 245, publication_year: 1988 },
          { title: 'Eric',                  slug: 'eric',                  status: 'supplementary', note: 'Short illustrated novel — Rincewind as a demon summoner. More novella than novel.',                    page_count: 200, publication_year: 1990 },
          { title: 'Interesting Times',     slug: 'interesting-times',     status: 'optional',      note: 'Rincewind sent to the Agatean Empire. Broad satire of Chinese culture.',                              page_count: 280, publication_year: 1994 },
          { title: 'The Last Continent',    slug: 'the-last-continent',    status: 'optional',      note: 'Rincewind stranded in XXXX (Australia). Absurdist comedy.',                                           page_count: 290, publication_year: 1998 },
          { title: 'The Last Hero',         slug: 'the-last-hero',         status: 'supplementary', note: 'Illustrated novella — Cohen the Barbarian tries to return fire to the gods. Beautiful but brief.',    page_count: 176, publication_year: 2001 },
          { title: 'Unseen Academicals',    slug: 'unseen-academicals',    status: 'optional',      note: 'The Unseen University wizards discover football. Slow start but rewarding.',                           page_count: 514, publication_year: 2009 },
        ],
      },
      {
        label: 'Standalones',
        sublabel: 'books 7, 10, 13, 25, 28, 31',
        noteType: 'optional',
        note: 'Small Gods is the only mandatory read here — widely considered a top-3 Discworld book and a perfect standalone. The rest can be read in any order or skipped entirely.',
        books: [
          { title: 'Pyramids',          slug: 'pyramids',          status: 'optional',  note: 'A young man trained as an assassin returns to his kingdom. Ancient Egypt satire.',      page_count: 267, publication_year: 1989 },
          { title: 'Moving Pictures',   slug: 'moving-pictures',   status: 'optional',  note: 'Holy Wood (Hollywood) comes to Discworld. The movies satire.',                         page_count: 354, publication_year: 1990 },
          { title: 'Small Gods',        slug: 'small-gods',        status: 'mandatory', note: 'Standalone masterpiece about religion, faith, and institutional power. Read this regardless of where you are in the series.', page_count: 284, publication_year: 1992 },
          { title: 'The Truth',         slug: 'the-truth',         status: 'optional',  note: 'The first newspaper in Ankh-Morpork. Satire of media and truth. Excellent standalone.', page_count: 304, publication_year: 2000 },
          { title: 'The Amazing Maurice and His Educated Rodents', slug: 'the-amazing-maurice-and-his-educated-rodents', status: 'supplementary', note: "YA Pied Piper retelling. Carnegie Medal winner. Charming but clearly YA — not a main-series entry.", page_count: 272, publication_year: 2001 },
          { title: 'Monstrous Regiment',slug: 'monstrous-regiment', status: 'optional', note: 'A girl disguises herself as a soldier. War and gender satire. One of the sharpest late Pratchetts.', page_count: 384, publication_year: 2003 },
        ],
      },
      {
        label: 'Tiffany Aching',
        sublabel: 'YA arc — books 30, 32, 35, 38, 41',
        noteType: 'optional',
        note: "Pratchett's YA series is the best introduction to Discworld for younger readers — and excellent for adults. Start with The Wee Free Men. The Shepherd's Crown is Pratchett's final novel, written as he was dying.",
        books: [
          { title: 'The Wee Free Men',      slug: 'the-wee-free-men',      status: 'mandatory', note: 'Best YA entry point to Discworld. Young Tiffany Aching becomes a witch. Brilliant.',                   page_count: 268, publication_year: 2003 },
          { title: 'A Hat Full of Sky',     slug: 'a-hat-full-of-sky',     status: 'optional',  note: "Tiffany's first apprenticeship. A possessing spirit called a hiver.",                                  page_count: 275, publication_year: 2004 },
          { title: 'Wintersmith',           slug: 'wintersmith',           status: 'optional',  note: 'Tiffany accidentally attracts the Wintersmith. The series at its most mythic.',                        page_count: 336, publication_year: 2006 },
          { title: 'I Shall Wear Midnight', slug: 'i-shall-wear-midnight', status: 'optional',  note: 'Tiffany fully trained. Tackles witch-hunting and prejudice. The darkest Tiffany book.',               page_count: 322, publication_year: 2010 },
          { title: "The Shepherd's Crown",  slug: 'the-shepherds-crown',   status: 'optional',  note: "Pratchett's final novel. Unpolished but deeply moving as a farewell.",                                page_count: 276, publication_year: 2015 },
        ],
      },
      {
        label: 'Industrial Revolution',
        sublabel: 'Moist von Lipwig — books 33, 36, 40',
        noteType: 'optional',
        note: "Going Postal is the best standalone entry into Discworld after the Watch books. The Moist arc covers postal service, banking, and railways — progressively weaker as Pratchett's health declined.",
        books: [
          { title: 'Going Postal',   slug: 'going-postal',   status: 'mandatory', note: 'A con artist is forced to run the Ankh-Morpork post office. Perfect standalone entry — the best place to start if Watch feels too long.', page_count: 471, publication_year: 2004 },
          { title: 'Making Money',   slug: 'making-money',   status: 'optional',  note: 'Moist von Lipwig takes over the Royal Mint. Slightly weaker than Going Postal but still excellent.',                                      page_count: 400, publication_year: 2007 },
          { title: 'Raising Steam',  slug: 'raising-steam',  status: 'optional',  note: "Railways arrive on Discworld. Pratchett's Alzheimer's beginning to show — a weaker late entry.",                                          page_count: 385, publication_year: 2013 },
        ],
      },
    ],
    orderNote: 'Organized by subseries — each arc is self-contained. Start with City Watch or Death. Book numbers in the sublabels refer to publication order.',
    cards: [
      { title: '⚡ Where to start',  body: 'Guards! Guards! for the full Watch experience. Mort or Hogfather for Death. Going Postal for a quick, funny standalone. Small Gods if you want Pratchett at his most serious.', color: 'blue'  },
      { title: '⚠️ Skip books 1–2', body: 'The Colour of Magic and The Light Fantastic are Pratchett finding his voice — they\'re fine but very different from the rest. Most fans recommend starting from book 3 or later.',  color: 'amber' },
    ],
    sections: [
      {
        heading: 'Reading within each subseries',
        type: 'bullets',
        bullets: [
          'City Watch: Read in order — character arcs build significantly over 8 books',
          'Witches: Start with Wyrd Sisters; skip Equal Rites as a first entry',
          'Death: Start with Mort; each book works standalone after that',
          'Rincewind: Optional arc — start with Sourcery if curious',
          'Tiffany Aching: Read in order — a complete coming-of-age arc across 5 books',
          'Industrial Revolution: Going Postal first; the arc weakens toward Raising Steam',
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          'Every book is a standalone. You can start any subseries without reading the others.',
          "Pratchett's satire gets sharper as the series progresses — the later Watch books are darker and angrier.",
          'Night Watch is widely considered one of the best books in the series. Save it for when you love Vimes.',
          "The Shepherd's Crown was written while Pratchett had Alzheimer's and is visibly unfinished — it's still worth reading as a farewell.",
          'Pratchett wrote 41 Discworld novels before his death in 2015. The quality stays remarkably high for 30+ years.',
        ],
      },
    ],
    finishedLabel: 'Want more like Discworld?',
    categoryHref: '/categories/cozy',
    categoryLabel: 'Browse Cozy Fantasy',
    related: ['kingkiller', 'first-law'],
  },

  // ─── A Song of Ice and Fire ────────────────────────────────────────────────
  {
    slug: 'asoiaf',
    name: 'A Song of Ice and Fire',
    author: 'George R.R. Martin',
    seriesStatus: 'incomplete',
    seriesStatusLabel: '⚠️ Unfinished Series',
    description:
      'The series that redefined epic fantasy for a generation. Five books of political chess, moral complexity, and the systematic destruction of the idea that protagonists are safe. No character is guaranteed survival; no storyline is guaranteed resolution. Read the books — they are significantly richer than the show.',
    darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
    books: [
      { title: 'A Game of Thrones',   slug: 'a-game-of-thrones',   status: 'mandatory', note: 'The foundation. Introduces the major houses, the political web, and the first major shock that signals what kind of series this is.', page_count: 694,  publication_year: 1996 },
      { title: 'A Clash of Kings',    slug: 'a-clash-of-kings',    status: 'mandatory', note: "Five kings claim the throne. The political complexity doubles and the world expands beyond King's Landing.",                          page_count: 768,  publication_year: 1998 },
      { title: 'A Storm of Swords',   slug: 'a-storm-of-swords',   status: 'mandatory', note: 'The peak of the series. Contains the most devastating and celebrated chapters Martin has written. Do not look anything up.',          page_count: 973,  publication_year: 2000 },
      { title: 'A Feast for Crows',   slug: 'a-feast-for-crows',   status: 'mandatory', note: 'Slower, more political. Many fan-favourite characters are absent — Martin split books 4 and 5 by POV, not timeline.',                page_count: 753,  publication_year: 2005 },
      { title: 'A Dance with Dragons',slug: 'a-dance-with-dragons',status: 'mandatory', note: 'Runs parallel to Feast for the first half, then moves forward. The series is unfinished here — book 6 has no release date.',         page_count: 1016, publication_year: 2011 },
    ],
    orderNote: 'Publication order is the only order. There are no prequels or companion novels required for the main series.',
    cards: [
      { title: '⚡ The Peak',      body: 'A Storm of Swords is the series at its best — dense, brutal, and with some of the most discussed chapters in modern fantasy. Do not look anything up before reading it.',                                    color: 'blue'  },
      { title: '📖 Books 4 & 5',  body: 'Martin split the story by POV character across two books covering the same timeline. A Feast for Crows and A Dance with Dragons are best read back-to-back.',                                              color: 'amber' },
      { title: '⚠️ The Wait',     body: 'The Winds of Winter has been in progress since 2011 with no confirmed release date. Read the published books knowing this.',                                                                               color: 'red'   },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'New to the series? Start with A Game of Thrones — there is no other entry point. The series requires sequential reading.',
          'Watched the show? Still start from book one. The books diverge significantly from season 5 onwards and have substantially richer plotting throughout.',
          'Should you read the prequels? Fire & Blood and The World of Ice and Fire are supplementary lore — not required, best read after completing the main series.',
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          'No character is plot-armoured. Major POV characters die. Do not get attached to narrative convention.',
          "The first 100 pages of A Game of Thrones are slow world-building. The series earns its reputation from chapter 6 onwards.",
          "A Feast for Crows is the most divisive book — slower pace, unfamiliar POVs. Push through; Dance rewards it.",
          "The Dunk & Egg novellas (Tales of Dunk and Egg) are standalone prequels set 90 years earlier. Good but non-essential.",
          'Avoid the wiki. Seriously. This series is best experienced blind.',
        ],
      },
    ],
    darkness: [
      { label: 'A Game of Thrones',    level: 3, desc: 'Serious — political violence, moral complexity' },
      { label: 'A Clash of Kings',     level: 4, desc: 'Dark — war begins in earnest' },
      { label: 'A Storm of Swords',    level: 5, desc: "Brutal — the series' most devastating events" },
      { label: 'A Feast for Crows',    level: 4, desc: 'Dark — aftermath and political decay' },
      { label: 'A Dance with Dragons', level: 4, desc: 'Dark — isolation, survival, and hard choices' },
    ],
    finishedLabel: 'Finished the published books?',
    categoryHref: '/categories/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['first-law', 'malazan', 'wheel-of-time'],
  },

  // ─── Realm of the Elderlings (Robin Hobb) ──────────────────────────────────
  {
    slug: 'robin-hobb',
    name: 'Realm of the Elderlings',
    author: 'Robin Hobb',
    seriesStatus: 'complete',
    seriesStatusLabel: '✅ Complete Series',
    description:
      'Sixteen books across four interconnected series, all set in the same world, all building toward a conclusion that has been in progress since 1995. Robin Hobb writes character-driven fantasy with a particular genius for emotional devastation — her protagonists make choices that hurt, and she never lets them off easily. This is the most complete emotional journey in epic fantasy.',
    darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
    groups: [
      {
        label: 'The Farseer Trilogy',
        sublabel: 'start here',
        noteType: 'required',
        note: 'All three essential. Each book ends on a devastating note — have the next ready.',
        books: [
          { title: "Assassin's Apprentice", slug: 'assassins-apprentice', status: 'mandatory', note: 'Start here. FitzChivalry Farseer, royal bastard and assassin-in-training. Quiet, character-driven, devastating by the end.', page_count: 356, publication_year: 1995 },
          { title: 'Royal Assassin',        slug: 'royal-assassin',       status: 'mandatory', note: "The stakes rise sharply. Court politics, the Wit bond with Nighteyes, and Hobb's gift for slow emotional devastation at full strength.", page_count: 675, publication_year: 1996 },
          { title: "Assassin's Quest",      slug: 'assassins-quest',      status: 'mandatory', note: 'Long quest structure, deeply interior. Divisive — some find it too slow. The emotional payoff of the trilogy hinges entirely on it.', page_count: 757, publication_year: 1997 },
        ],
      },
      {
        label: 'Liveship Traders',
        sublabel: 'new POVs, same world — do not skip',
        noteType: 'required',
        note: "New characters and merchant ships, but the world-building here is load-bearing for everything that follows, especially the Fool trilogy.",
        books: [
          { title: 'Ship of Magic',    slug: 'ship-of-magic',    status: 'mandatory', note: "Different characters, same world. Sentient ships, a merchant family in crisis, and pirates. Essential for the later Fitz books.", page_count: 880, publication_year: 1998 },
          { title: 'The Mad Ship',     slug: 'the-mad-ship',     status: 'mandatory', note: "The Liveship Traders hits its stride. Althea, Brashen, and the Paragon — one of Hobb's most compelling relationship triangles.", page_count: 906, publication_year: 1999 },
          { title: 'Ship of Destiny',  slug: 'ship-of-destiny',  status: 'mandatory', note: 'Closes the Liveship arc and quietly sets up the mythology that underpins the entire Elderlings world. Do not skip this.',        page_count: 789, publication_year: 2000 },
        ],
      },
      {
        label: 'The Tawny Man Trilogy',
        sublabel: 'Fitz returns',
        noteType: 'required',
        note: 'Directly continues the Farseer Trilogy 15 years later. The Fitz/Fool relationship becomes the emotional core of the entire sequence.',
        books: [
          { title: "Fool's Errand",   slug: 'fools-errand',   status: 'mandatory', note: 'Fitz returns, fifteen years later. The Fitz/Fool relationship is now the emotional core of the entire sequence.',                   page_count: 661, publication_year: 2001 },
          { title: 'The Golden Fool', slug: 'the-golden-fool', status: 'mandatory', note: "Court intrigue, the Wit persecutions, and the Fool's identity pulled into sharp focus.",                                           page_count: 688, publication_year: 2002 },
          { title: "Fool's Fate",     slug: 'fools-fate',     status: 'mandatory', note: "The conclusion of the Tawny Man — and arguably of the Fitz arc as a whole. Hobb goes further emotionally than most readers expect.", page_count: 896, publication_year: 2003 },
        ],
      },
      {
        label: 'The Rain Wild Chronicles',
        sublabel: 'optional — same world, new characters',
        noteType: 'optional',
        note: "Returns to the Liveship world. Enriches Fitz and the Fool but not required to follow it. Read if you loved Liveship Traders.",
        books: [
          { title: 'Dragon Keeper',    slug: 'dragon-keeper',    status: 'optional', note: 'Returns to the Liveship world with new characters and the damaged dragons of the Rain Wilds.',                                   page_count: 404, publication_year: 2009 },
          { title: 'Dragon Haven',     slug: 'dragon-haven',     status: 'optional', note: 'Continues directly from Dragon Keeper. The dragon migration provides mythology that enriches Fitz & the Fool.',                  page_count: 429, publication_year: 2010 },
          { title: 'City of Dragons',  slug: 'city-of-dragons',  status: 'optional', note: 'The lost Elderling city revealed. More world-building than plot.',                                                               page_count: 368, publication_year: 2012 },
          { title: 'Blood of Dragons', slug: 'blood-of-dragons', status: 'optional', note: 'Closes the Rain Wild Chronicles. Recommended if you want the full Elderlings picture before reading the final Fitz trilogy.',    page_count: 418, publication_year: 2013 },
        ],
      },
      {
        label: 'Fitz and the Fool',
        sublabel: 'the finale — read everything above first',
        noteType: 'required',
        note: 'All sixteen books converge here. Hobb closes arcs open since 1995.',
        books: [
          { title: "Fool's Assassin", slug: 'fools-assassin', status: 'mandatory', note: 'Fitz in his sixties, settled — and then everything changes. The ending of book one is not safe.',                                   page_count: 752, publication_year: 2014 },
          { title: "Fool's Quest",    slug: 'fools-quest',    status: 'mandatory', note: 'The middle book of the final trilogy — urgent, desperate, and building toward a conclusion decades in the making.',                 page_count: 752, publication_year: 2015 },
          { title: "Assassin's Fate", slug: 'assassins-fate', status: 'mandatory', note: 'The end of everything. All sixteen books converge here. Read with tissues nearby.',                                                 page_count: 944, publication_year: 2017 },
        ],
      },
    ],
    orderNote: 'Publication order. The Rain Wild Chronicles (books 10–13) can be read after completing the Tawny Man or after the full sequence — both work.',
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          "New to Robin Hobb? Start with Assassin's Apprentice. It is the only entry point. The world and character foundations must be laid here.",
          "Can you skip the Liveship Traders? Technically yes — Fitz & the Fool works without them. But the world of the Elderlings will feel incomplete, and some revelations in Assassin's Fate hit harder with Liveship context.",
          "Can you skip the Rain Wild Chronicles? Yes, without losing the main thread. Read them if you want the full world — best between Tawny Man and Fitz & the Fool.",
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          "Hobb's pacing is slow and deliberate. These are character-first novels — if you need constant plot momentum, recalibrate.",
          "Fitz is a frustrating protagonist on purpose. His self-sabotage and passivity are features, not flaws. Hobb is doing something specific with it.",
          "The Fool is one of fantasy's most original and moving secondary characters. The Fitz/Fool relationship is the emotional spine of the entire sequence.",
          'Emotional content: grief, trauma, self-sacrifice, loneliness, and chosen family done with unusual honesty. Not a comfortable read. Deeply rewarding.',
          "Assassin's Fate is 944 pages and earns every one of them. It is the conclusion to a 22-year story and should be read last.",
        ],
      },
    ],
    darkness: [
      { label: 'The Farseer Trilogy',  level: 3, desc: 'Serious — loss, sacrifice, identity' },
      { label: 'The Liveship Traders', level: 3, desc: 'Serious — slavery, family collapse, survival' },
      { label: 'The Tawny Man',        level: 4, desc: 'Dark — cumulative grief, persecution, devastating choices' },
      { label: 'Rain Wild Chronicles', level: 2, desc: 'Mild — lighter tone, character-driven discovery' },
      { label: 'Fitz and the Fool',    level: 4, desc: 'Dark — loss compounding over 22 years, no easy resolutions' },
    ],
    finishedLabel: 'Finished the Elderlings?',
    categoryHref: '/categories/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['first-law', 'wheel-of-time', 'asoiaf'],
  },

  // ─── Throne of Glass ───────────────────────────────────────────────────────
  {
    slug: 'throne-of-glass',
    name: 'Throne of Glass',
    author: 'Sarah J. Maas',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Completed Series',
    description:
      'An assassin forced to compete for her freedom becomes the fulcrum of a war against an immortal darkness. Starts as a YA competition novel and grows into a full-scale epic fantasy with Fae, ancient magic, and a world-ending threat. The series earns its scope.',
    darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
    groups: [
      {
        label: 'The Main Series',
        sublabel: 'books 1–6 + optional prequel',
        noteType: 'required',
        note: "All main books are essential and must be read in order. The Assassin's Blade (prequel) is optional — read it after Throne of Glass or skip it. The series takes off at Crown of Midnight.",
        books: [
          { title: 'Throne of Glass',       slug: 'throne-of-glass',       status: 'mandatory', note: 'Start here. Celaena Sardothien, assassin, enters a deadly competition in a corrupt kingdom.',                              page_count: 404, publication_year: 2012 },
          { title: "The Assassin's Blade",  slug: 'the-assassins-blade',   status: 'optional',  note: 'Five prequel novellas in one volume. Best read after Throne of Glass — contains spoilers for book 1.',                    page_count: 432, publication_year: 2014 },
          { title: 'Crown of Midnight',     slug: 'crown-of-midnight',     status: 'mandatory', note: 'The series finds its footing. Darker, faster, with a reveal that reframes everything.',                                   page_count: 418, publication_year: 2013 },
          { title: 'Heir of Fire',          slug: 'heir-of-fire',          status: 'mandatory', note: 'The world expands massively. Magic, Fae, and the true threat are introduced. A turning point.',                          page_count: 565, publication_year: 2014 },
          { title: 'Queen of Shadows',      slug: 'queen-of-shadows',      status: 'mandatory', note: 'Aelin returns to Rifthold. High stakes, new alliances, and a cast that finally converges.',                              page_count: 648, publication_year: 2015 },
          { title: 'Empire of Storms',      slug: 'empire-of-storms',      status: 'mandatory', note: 'The war begins in earnest. Read alongside Tower of Dawn or before it — both cover the same timeline.',                   page_count: 689, publication_year: 2016 },
        ],
      },
      {
        label: 'The Finale',
        sublabel: 'Tower of Dawn + Kingdom of Ash — read back-to-back',
        noteType: 'warning',
        note: "Tower of Dawn runs parallel to Empire of Storms from Chaol's POV. Option A: read EoS then ToD in full. Option B: alternate chapters using an online reading guide. Do not skip ToD — its events are essential for Kingdom of Ash.",
        books: [
          { title: 'Tower of Dawn',  slug: 'tower-of-dawn',  status: 'mandatory', note: "Chaol's story, running parallel to Empire of Storms. Read EoS first or alternate chapters using a reading guide.", page_count: 660, publication_year: 2017 },
          { title: 'Kingdom of Ash', slug: 'kingdom-of-ash', status: 'mandatory', note: 'The finale. All characters and storylines converge for the last battle. Massive in scope.',                        page_count: 992, publication_year: 2018 },
        ],
      },
    ],
    orderNote: 'Publication order is the correct order. The Empire of Storms / Tower of Dawn overlap is the one structural complication — see the note below.',
    cards: [
      { title: '⚡ Essential (7 books)', body: 'All main books — ToG through Kingdom of Ash. Tower of Dawn is mandatory despite being a "companion" novel.',                    color: 'blue'  },
      { title: '📖 Optional (1 book)',  body: "The Assassin's Blade — prequel novellas. Adds emotional depth but nothing you'll lose without. Read after book 1.",             color: 'green' },
    ],
    sections: [
      {
        heading: '⚠️ The Empire of Storms / Tower of Dawn problem',
        type: 'warning',
        prose: "These two books cover the same timeline from different POVs. Option A (recommended): Read Empire of Storms in full, then Tower of Dawn. Slightly less immersive but easier to follow. Option B: Use the chapter-interleave guide (search \"ToG EoS ToD reading guide\"). More work, better payoff. Do not skip Tower of Dawn — its events directly affect the finale.",
      },
      {
        heading: 'Before you start',
        type: 'bullets',
        bullets: [
          'The first book is the weakest. The series takes off at Crown of Midnight. Don\'t judge it on book 1 alone.',
          'Heir of Fire is when the magic system, the Fae, and the true antagonist arrive. This is where it becomes epic fantasy.',
          'The protagonist goes by Celaena in early books — her name and identity evolve over the series. This is intentional.',
          'The series grows significantly darker from book 3 onward. Book 1 is YA-adjacent. Book 7 is not.',
        ],
      },
    ],
    darkness: [
      { label: 'Books 1–2', level: 2, desc: 'Competition, intrigue, assassination — relatively contained' },
      { label: 'Books 3–5', level: 3, desc: 'War builds, magic escalates, loss becomes real' },
      { label: 'Books 6–8', level: 4, desc: 'Full-scale war, sacrifice, world-ending stakes' },
    ],
    finishedLabel: 'Finished the series?',
    categoryHref: '/categories/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['acotar', 'first-law'],
  },

  // ─── Blood and Ash ─────────────────────────────────────────────────────────
  {
    slug: 'blood-and-ash',
    name: 'Blood and Ash',
    author: 'Jennifer L. Armentrout',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '⏳ Ongoing Series',
    description:
      'Romantasy with slow-burn enemies-to-lovers at its core — From Blood and Ash starts as a sheltered Maiden meets her mysterious guard and spirals into a full-scale fantasy epic. The first book reads like pure romantasy; by book three it\'s a proper political fantasy with war, gods, and a sprawling world. Explicit throughout.',
    darknessDisplay: '🕯️🕯️🕯️ Serious · 🔥🔥🔥 Explicit',
    groups: [
      {
        label: 'Blood and Ash',
        sublabel: 'main series — start here',
        noteType: 'required',
        note: "The core story. All four main books are essential. A Soul of Ash and Blood (book 5) is optional — it retells book 1 from Hawke's POV with no new plot. Read it after book 4 or skip it.",
        books: [
          { title: 'From Blood and Ash',          slug: 'from-blood-and-ash',          status: 'mandatory', note: "Start here. Poppy is a sheltered Maiden whose world unravels when she meets her guard Hawke. Slow-burn enemies-to-lovers with high tension and a twist ending.", page_count: 622, publication_year: 2020 },
          { title: 'A Kingdom of Flesh and Fire', slug: 'a-kingdom-of-flesh-and-fire', status: 'mandatory', note: 'The slow burn ignites. Answers start coming and the world expands significantly. Darker tone than book one.',                                               page_count: 651, publication_year: 2020 },
          { title: 'The Crown of Gilded Bones',   slug: 'the-crown-of-gilded-bones',   status: 'mandatory', note: "Poppy's identity is fully revealed and the political scope broadens. The series shifts from romance-first to fantasy-first.",                             page_count: 728, publication_year: 2021 },
          { title: 'The War of Two Queens',        slug: 'the-war-of-two-queens',       status: 'mandatory', note: 'War arc begins. Longer and more brutal — the romance takes a back seat to plot.',                                                                       page_count: 726, publication_year: 2022 },
          { title: 'A Soul of Ash and Blood',     slug: 'a-soul-of-ash-and-blood',     status: 'optional',  note: "Retells book one from Hawke's POV. Not required — adds depth and context but contains no new plot. Best after book 4 or 5.",                          page_count: 829, publication_year: 2023 },
        ],
      },
      {
        label: 'Rites of the Realms',
        sublabel: 'companion trilogy — read after book 4',
        noteType: 'warning',
        note: 'A Light in the Flame begins a companion trilogy set in the same world but earlier in its history. The storylines converge — read these after The War of Two Queens, not alongside it.',
        books: [
          { title: 'A Light in the Flame', slug: 'a-light-in-the-flame', status: 'mandatory', note: 'Companion novel following Nyktos and Sera — set in a different era of the same world. Read after book 4.', page_count: 638, publication_year: 2023 },
          { title: 'A Fire in the Flesh',  slug: 'a-fire-in-the-flesh',  status: 'mandatory', note: 'Continuation of the Rites of the Realms arc. The two storylines begin to converge.',                        page_count: 569, publication_year: 2023 },
          { title: 'A Veil of Gods and Skin', slug: 'a-veil-of-gods-and-skin', status: 'mandatory', note: 'The Rites of the Realms trilogy concludes. Connects directly to the main Blood and Ash storyline.',  page_count: 560, publication_year: 2024 },
        ],
      },
    ],
    orderNote: 'The main series (books 1–4) comes first. The companion trilogy slots in after book 4 — the two stories converge by the end.',
    cards: [
      { title: '💘 The Hook',      body: 'From Blood and Ash is slow-burn enemies-to-lovers with a sharp plot twist at the end. The tension between Poppy and Hawke carries the whole first book — and then the reveal reframes everything.', color: 'blue'   },
      { title: '⚔️ The Shift',    body: 'By The Crown of Gilded Bones, romance takes a back seat to world-building and war. Books 3–4 are significantly more plot-heavy and darker than the first two.',                                     color: 'amber'  },
      { title: '🔥 Content Note', body: 'All books contain explicit sexual content. The series also includes war violence, torture, and character death. Not suitable for younger readers.',                                                  color: 'purple' },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'New to the series? Start with From Blood and Ash — no exceptions. The series is strictly sequential.',
          "Finished book 4 — read the companion trilogy or continue the main story? The Rites of the Realms trilogy (starting with A Light in the Flame) is set in the same world but follows different characters. Read it after book 4 before book 5 comes out, or save it for later — both work.",
          "Should you read A Soul of Ash and Blood? Only if you loved the slow-burn tension of book 1 and want to relive it from Hawke's perspective. It adds nothing to the plot — skip it if you want to keep moving forward.",
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          "The first book ends on a major twist that reframes everything. Go in without spoilers.",
          'Books 1–2 are romance-heavy; books 3–4 shift toward epic fantasy. If you came for the romance, know the balance changes.',
          "The world-building is gradually revealed — there's a lot of lore underneath the romance that only becomes clear in book 2 and 3.",
          "Armentrout publishes quickly — books 1–4 released in under two years, and the companion trilogy followed closely.",
          "The series shares its world with the Flesh and Fire series (also by Armentrout) — same universe, earlier timeline.",
        ],
      },
    ],
    darkness: [
      { label: 'From Blood and Ash',          level: 3, desc: 'Serious — sheltered world, danger present but filtered' },
      { label: 'A Kingdom of Flesh and Fire', level: 3, desc: 'Serious — darker tone, more violence, higher stakes' },
      { label: 'The Crown of Gilded Bones',   level: 4, desc: 'Dark — war begins, real consequences' },
      { label: 'The War of Two Queens',        level: 4, desc: 'Dark — war, torture, heavy losses' },
    ],
    finishedLabel: "Finished what's published?",
    categoryHref: '/categories/romantasy',
    categoryLabel: 'Browse Romantasy',
    related: ['empyrean', 'acotar'],
  },

  // ─── The Empyrean ──────────────────────────────────────────────────────────
  {
    slug: 'empyrean',
    name: 'The Empyrean',
    author: 'Rebecca Yarros',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '⏳ Ongoing Series',
    description:
      'Military fantasy academy meets dragon-rider romance — fast-paced, explicitly romantic, and increasingly dark as the series progresses. Fourth Wing reads like romantasy; by Onyx Storm it\'s leaning hard into epic fantasy. If you\'re here for the romance and action combo, all three books deliver. If explicit content isn\'t for you, this series isn\'t for you.',
    darknessDisplay: '🕯️🕯️🕯️ Serious · 🔥🔥🔥 Explicit',
    books: [
      { title: 'Fourth Wing', slug: 'fourth-wing', status: 'mandatory', note: 'Start here. Violet Sorrengail enters Basgiath War College to become a rider. Fast pacing, strong voice, explicit romance begins immediately.', page_count: 517, publication_year: 2023 },
      { title: 'Iron Flame',  slug: 'iron-flame',  status: 'mandatory', note: 'Raises the stakes considerably — the war plot becomes the focus and the world expands. Longer and denser than book one.',                    page_count: 623, publication_year: 2023 },
      { title: 'Onyx Storm', slug: 'onyx-storm',   status: 'mandatory', note: 'The series shifts into full epic fantasy territory. Higher body count, bigger consequences, a lot of threads in motion.',                   page_count: 608, publication_year: 2025 },
    ],
    orderNote: 'Publication order is the only order. No companion novels or prequels currently exist.',
    cards: [
      { title: '🐉 The Hook',      body: 'Fourth Wing is the entry drug — fast, romantic, and addictive. The dragon bond and the enemies-to-lovers tension carry the first book almost entirely on their own.',                    color: 'blue'   },
      { title: '⚔️ The Shift',    body: 'Iron Flame is heavier. The war stakes become real and Yarros starts killing characters. Romance is still central but the fantasy plot takes over by the end.',                         color: 'amber'  },
      { title: '🔥 Content Note', body: 'All three books contain explicit sexual content. The series also involves war violence, character death, and trauma. Not suitable for younger readers.',                                color: 'purple' },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'New to the series? Start with Fourth Wing — the only entry point. The series is strictly sequential.',
          'Loved Fourth Wing, unsure about continuing? Iron Flame is the weaker book of the two — more setup than payoff — but Onyx Storm rewards the patience. If you made it to the end of Iron Flame, keep going.',
          "Not into explicit romance? This series is not a good fit. The romance is central to every book and the explicit content is not toned down.",
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          'The series is planned for 5 books. Books 1–3 form a clear arc but end on a cliffhanger — you will be waiting for book 4.',
          "The magic system (sigils, riders, dragon bonds) is explained gradually — don't worry if the first 50 pages feel like a lot of lore.",
          "Violet has a chronic illness/connective tissue disorder — this is handled with care and is central to her character.",
          'The series gets darker with each book. If you found Fourth Wing light, expect that to change.',
        ],
      },
    ],
    darkness: [
      { label: 'Fourth Wing', level: 3, desc: 'Serious — danger and death, but romantic and exciting' },
      { label: 'Iron Flame',  level: 4, desc: 'Dark — war becomes real, character losses hurt' },
      { label: 'Onyx Storm', level: 4, desc: 'Dark — higher stakes, more brutal consequences' },
    ],
    finishedLabel: "Finished what's published?",
    categoryHref: '/categories/romantasy',
    categoryLabel: 'Browse Romantasy',
    related: ['acotar', 'throne-of-glass'],
  },
]

export const getReadingOrderEntry = (slug: string): ReadingOrderEntry | null =>
  READING_ORDERS.find((e) => e.slug === slug) ?? null
