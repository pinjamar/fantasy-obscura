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
  /** Overall position in the parent series (e.g. Discworld #8). Shown below title. */
  position?: number
  /** Sub-series label override (e.g. "Witches #2"). Shown when DB has no series_label. */
  seriesLabel?: string
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
  /** Where to render the quick cards relative to the timeline. Defaults to 'below'. */
  cardsPosition?: 'above' | 'below'
  sections?: InfoSection[]
  darkness?: DarknessRow[]
  finishedLabel: string
  categoryHref: string
  categoryLabel: string
  related: string[]
  /** Slug for a matching /books-like/ guide, if one exists */
  booksLikeSlug?: string
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
      { label: 'ACOTAR',  level: 3, desc: 'Dark fairy tale — captivity, monster threats, sacrifice' },
      { label: 'ACMAF',   level: 4, desc: 'Trauma, war build-up, political intrigue' },
      { label: 'ACWAR',   level: 3, desc: 'Full war, loss, and convergence' },
      { label: 'ACFAS',   level: 2, desc: 'Recovery and aftermath — the lightest entry' },
      { label: 'ACSF',    level: 3, desc: "Nesta's arc — darker and more intense than the trilogy" },
    ],
    finishedLabel: 'Finished the series?',
    categoryHref: '/fantasy/romance-fantasy',
    categoryLabel: 'Browse Romance Fantasy',
    booksLikeSlug: 'acotar',
    related: ['throne-of-glass', 'empyrean'],
  },

  // ─── The Cosmere ───────────────────────────────────────────────────────────
  {
    slug: 'cosmere',
    name: "Sanderson's Cosmere",
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
        sublabel: 'with Warbreaker & Edgedancer before Oathbringer',
        noteType: 'optional',
        note: "Warbreaker (optional, free on Sanderson's site) and Edgedancer (novella) are both positioned right before Oathbringer — that's where their connections pay off most.",
        books: [
          { title: 'The Way of Kings',   slug: 'the-way-of-kings',   status: 'mandatory',     note: 'Epic scope, multiple POVs, world unlike anything else. Long but worth it.',                                                                        page_count: 1007, publication_year: 2010 },
          { title: 'Words of Radiance',  slug: 'words-of-radiance',  status: 'mandatory',     note: 'Raises every bar set by book 1.',                                                                                                                   page_count: 1088, publication_year: 2014 },
          { title: 'Warbreaker',         slug: 'warbreaker',         status: 'optional',      note: 'Standalone Cosmere novel. Free on Sanderson\'s site. Read here — before Oathbringer — for a meaningful payoff in book 3.',                        page_count: 592,  publication_year: 2009 },
          { title: 'Edgedancer',         slug: 'edgedancer',         status: 'supplementary', note: 'Novella, ~40k words. Follows Lift. Read before Oathbringer for important context.',                                                               page_count: 226,  publication_year: 2016 },
          { title: 'Oathbringer',        slug: 'oathbringer',        status: 'mandatory',     note: "Dalinar's past revealed. Biggest worldbuilding drop in the series.",                                                                               page_count: 1248, publication_year: 2017 },
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
          { title: 'The Lost Metal',        slug: 'the-lost-metal',        status: 'mandatory', note: 'Era 2 finale. Massive Cosmere crossover payoff.',                                    page_count: 528, publication_year: 2022 },
        ],
      },
      {
        label: 'Stormlight Archive — Books 4–5',
        sublabel: 'with Dawnshard novella',
        books: [
          { title: 'Dawnshard',       slug: 'dawnshard',       status: 'supplementary', note: 'Novella, ~26k words. Read before Rhythm of War.',                                             page_count: 176, publication_year: 2020 },
          { title: 'Rhythm of War',   slug: 'rhythm-of-war',   status: 'mandatory',     note: 'Shifts from battlefield to politics and science. Divisive but essential.',                  page_count: 1232, publication_year: 2020 },
          { title: 'Wind and Truth',  slug: 'wind-and-truth',  status: 'mandatory',     note: 'Stormlight 5. Closes the first arc of the series.',                                         page_count: 1330, publication_year: 2024 },
        ],
      },
      {
        label: 'The Secret Projects',
        sublabel: 'standalone Cosmere novellas',
        noteType: 'optional',
        note: 'Three standalone Cosmere stories written during the pandemic and originally funded via Kickstarter. Best read after Rhythm of War or Wind and Truth — all are self-contained but reward readers who know the broader Cosmere.',
        books: [
          { title: 'Tress of the Emerald Sea',       slug: 'tress-of-the-emerald-sea',       status: 'optional', note: 'A fairy-tale adventure on a sea of spores. Charming, standalone, and surprisingly moving.',                                          page_count: 363, publication_year: 2023 },
          { title: 'Yumi and the Nightmare Painter',  slug: 'yumi-and-the-nightmare-painter',  status: 'optional', note: 'Two protagonists on two worlds who can\'t interact — until they can. Emotionally the strongest of the three.',                       page_count: 480, publication_year: 2023 },
          { title: 'The Sunlit Man',                  slug: 'the-sunlit-man',                  status: 'optional', note: 'High-action adventure on a world perpetually fleeing its own sun. Best read after Wind and Truth for full Cosmere impact.',          page_count: 368, publication_year: 2023 },
        ],
      },
    ],
    orderNote: 'Optimised for maximum Cosmere payoff — not pure publication order. Each series works standalone; connections build over time.',
    cards: [
      { title: '⚡ Essential (12 books)', body: 'Both Mistborn trilogies + full Stormlight Archive. These carry the main Cosmere narrative.',                                                                                    color: 'blue'  },
      { title: '📖 Optional (4 books)',  body: "Warbreaker (free on Sanderson's site, adds Stormlight depth) + the three Secret Project novellas — all standalone, all rewarding after Era 2.",                                 color: 'green' },
      { title: '🔀 Novellas (2 books)',  body: 'Edgedancer and Dawnshard — short, best read in the positions listed above.',                                                                                                    color: 'amber' },
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
      { label: 'Secret Projects',        level: 2, desc: 'Mild — generally lighter and more whimsical than the main series' },
    ],
    finishedLabel: 'Finished a Cosmere series?',
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    booksLikeSlug: 'mistborn-the-final-empire',
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
      { title: 'Warbreaker',        slug: 'warbreaker',         status: 'optional',      note: 'Standalone Cosmere novel. Free on Sanderson\'s site. Read here — before Oathbringer — for a meaningful payoff in book 3.',           page_count: 592,  publication_year: 2009 },
      { title: 'Edgedancer',        slug: 'edgedancer',         status: 'supplementary', note: 'Novella about Lift (~40k words). Short but adds important context — read before Oathbringer.',                                       page_count: 226,  publication_year: 2016 },
      { title: 'Oathbringer',       slug: 'oathbringer',        status: 'mandatory',     note: "Dalinar's history revealed. Largest worldbuilding expansion in the series.",                                                        page_count: 1248, publication_year: 2017 },
      { title: 'Dawnshard',         slug: 'dawnshard',          status: 'supplementary', note: 'Novella with Rysn (~26k words). Sets up important elements for Rhythm of War.',                                                    page_count: 176,  publication_year: 2020 },
      { title: 'Rhythm of War',     slug: 'rhythm-of-war',      status: 'mandatory',     note: 'Politics, science, and mental health. More divisive than earlier books but crucial for book 5.',                                   page_count: 1232, publication_year: 2020 },
      { title: 'Wind and Truth',    slug: 'wind-and-truth',     status: 'mandatory',     note: 'Closes the first 5-book arc. Massive Cosmere convergence.',                                                                        page_count: 1330, publication_year: 2024 },
    ],
    orderNote: 'Read in publication order. Position the novellas as listed — they\'re short but add meaningful context.',
    cards: [
      { title: '⚡ Main novels (5 books)',   body: 'Way of Kings → Words of Radiance → Oathbringer → Rhythm of War → Wind and Truth. All essential, all massive.',                                    color: 'blue'  },
      { title: '📖 Optional (1 book)',      body: "Warbreaker — standalone, free on Sanderson's site. Positioned before Oathbringer where its Stormlight connections pay off.",                          color: 'green' },
      { title: '🔀 Novellas (2 books)',      body: 'Edgedancer before Oathbringer, Dawnshard before Rhythm of War — short reads, best in position.',                                                      color: 'amber' },
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
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    booksLikeSlug: 'the-way-of-kings',
    related: ['cosmere', 'wheel-of-time'],
  },

  // ─── Earthsea ──────────────────────────────────────────────────────────────
  {
    slug: 'earthsea',
    name: 'Earthsea Cycle',
    author: 'Ursula K. Le Guin',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Completed Series',
    description:
      'Six books set across an archipelago world where magic is rooted in the true names of things, and power always comes with a cost. Le Guin wrote the original trilogy between 1968 and 1972, then returned to Earthsea eighteen years later with a fundamentally different perspective — the second half of the series is quieter, more philosophical, and concerned with questions the first half never thought to ask.',
    darknessDisplay: '🕯️🕯️ Mild to Moderate',
    groups: [
      {
        label: 'The Original Trilogy',
        sublabel: 'books 1–3 — start here',
        noteType: 'required',
        note: 'Read in publication order. Each book shifts focus — different protagonist in book 2, different generation in book 3. All three are short. The trilogy follows Ged from student to Archmage.',
        books: [
          { title: 'A Wizard of Earthsea', slug: 'a-wizard-of-earthsea', status: 'mandatory',     note: 'Start here. Ged, a gifted boy from a poor island, enters wizard school and unleashes something dangerous. The original magic school fantasy.',           page_count: 183, publication_year: 1968 },
          { title: 'The Tombs of Atuan',   slug: 'the-tombs-of-atuan',   status: 'mandatory',     note: 'Shifts to a new protagonist — Tenar, a girl raised as a high priestess in a labyrinthine tomb. Claustrophobic and beautifully strange.',              page_count: 173, publication_year: 1971 },
          { title: 'The Farthest Shore',   slug: 'the-farthest-shore',   status: 'mandatory',     note: 'Ged as Archmage, travelling with a young prince to the edge of the world. Explores death and what it costs to cheat it.',                            page_count: 223, publication_year: 1972 },
        ],
      },
      {
        label: 'The Second Trilogy',
        sublabel: 'books 4–6 — written 18 years later',
        noteType: 'required',
        note: 'Le Guin returned to Earthsea in 1990 with different questions. The tone is slower and more interior — less adventure, more reckoning. Tehanu picks up directly after The Farthest Shore with Tenar as the focus. The Other Wind is the true conclusion to the whole series.',
        books: [
          { title: 'Tehanu',            slug: 'tehanu',            status: 'mandatory',     note: 'Tenar, now middle-aged, takes in a badly burned child. Ged returns changed. Le Guin revisits the world through a feminist lens — quieter and more unsettling than the original trilogy.',  page_count: 260, publication_year: 1990 },
          { title: 'Tales from Earthsea', slug: 'tales-from-earthsea', status: 'supplementary', note: 'Five stories set across different eras of Earthsea history. Read between Tehanu and The Other Wind — the story "Dragonfly" directly sets up The Other Wind.',                           page_count: 328, publication_year: 2001 },
          { title: 'The Other Wind',       slug: 'the-other-wind',       status: 'mandatory',     note: 'The true finale. Resolves threads from across the entire series. Le Guin considered this the conclusion she needed to write after Tehanu left things unfinished.',    page_count: 271, publication_year: 2001 },
          { title: 'The Daughter of Odren', slug: 'the-daughter-of-odren', status: 'supplementary', note: 'A short story set in Earthsea, published in 2014 as an ebook original. Standalone — read after The Other Wind.',                                                       page_count: 48,  publication_year: 2014 },
        ],
      },
    ],
    orderNote: 'Publication order is the right order. Le Guin designed the books to be read sequentially. Tales from Earthsea is best read between Tehanu and The Other Wind — the story "Dragonfly" bridges them directly.',
    cards: [
      { title: '📚 Short Books',         body: 'All six books are short — 170 to 330 pages each. The entire series is under 1,500 pages combined. One of the most complete and efficient fantasy universes ever written.',    color: 'blue'   },
      { title: '🌊 Two Different Tones', body: 'Books 1–3 are adventure-focused and accessible. Books 4–6 are slower, more philosophical, and concerned with age, power, and what the first trilogy left unexamined.',         color: 'amber'  },
      { title: '🐉 The Dragon Lore',    body: 'Dragons in Earthsea are not creatures — they are something closer to truth itself. They cannot lie (they speak only in the Old Speech). Their role deepens significantly in the second trilogy.', color: 'purple' },
    ],
    sections: [
      {
        heading: 'What to expect',
        type: 'bullets',
        bullets: [
          'The original trilogy (1968–72) is foundational fantasy — elegant, swift, and deceptively simple. Perfect for readers who want the genre\'s roots.',
          'The second trilogy (1990–2001) is different in register — slower, introverted, and feminist. Le Guin was in her 60s when she wrote Tehanu and was asking different questions than she was at 39.',
          'The magic system is built around true names: every person, place, and thing has a true name in the Old Speech, and knowing it gives you power over it. Simple premise with enormous implications.',
          'The world is an archipelago of islands. There is no continent, no map-sprawl — just sea, islands, and the spaces between.',
        ],
      },
      {
        heading: 'On Tales from Earthsea',
        type: 'bullets',
        bullets: [
          'Tales from Earthsea is a short story collection — five stories spanning different eras of Earthsea history.',
          'The story "Dragonfly" is the most important — it directly sets up characters and events in The Other Wind. Read it before The Other Wind.',
          'The other four stories are optional enrichment. Skip the collection and just read "Dragonfly" if you\'re impatient to reach the finale.',
          'All five stories are available in the collected editions (The Books of Earthsea: The Complete Illustrated Edition, 2018).',
        ],
      },
      {
        heading: 'Why it matters',
        type: 'bullets',
        bullets: [
          'Earthsea (1968) was one of the first fantasy series to centre characters of colour as the default — Ged is brown-skinned, most Earthsea islanders are dark-complexioned. Le Guin did this four years after the Civil Rights Act.',
          'A Wizard of Earthsea predates Hogwarts by almost 30 years — it established the wizard school template.',
          'Le Guin influenced N.K. Jemisin, Brandon Sanderson, Patrick Rothfuss, and China Miéville, among many others.',
          'The series is short enough to read in a week but dense enough to reward re-reading for decades.',
        ],
      },
    ],
    darkness: [
      { label: 'Books 1–3', level: 2, desc: 'Adventure and consequence — death present but not dwelt upon' },
      { label: 'Books 4–6', level: 3, desc: 'More interior — trauma, loss, and questions without easy answers' },
    ],
    finishedLabel: 'Finished Earthsea?',
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['wheel-of-time', 'kingkiller', 'malazan'],
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
    categoryHref: '/fantasy/grimdark',
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
    categoryHref: '/fantasy/grimdark',
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
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    booksLikeSlug: 'the-wheel-of-time',
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
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    booksLikeSlug: 'the-name-of-the-wind',
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
    categoryHref: '/fantasy/dark',
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
    categoryHref: '/fantasy/urban-fantasy',
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
          { title: 'Guards! Guards!',        slug: 'guards-guards',       status: 'mandatory',     note: 'Best starting point. Night Watch is introduced. Dragons invade Ankh-Morpork.',                   page_count: 288, publication_year: 1989, position: 8  },
          { title: 'Men at Arms',            slug: 'men-at-arms',         status: 'mandatory',     note: 'The Watch grows. Carrot, Angua, diversity politics — Pratchett at his social best.',             page_count: 300, publication_year: 1993, position: 15 },
          { title: 'Feet of Clay',           slug: 'feet-of-clay',        status: 'mandatory',     note: 'Murder mystery involving golems. One of the sharpest Watch books.',                             page_count: 288, publication_year: 1996, position: 19 },
          { title: 'Jingo',                  slug: 'jingo',               status: 'mandatory',     note: 'War satire. Vimes at his most furious and politically brilliant.',                               page_count: 288, publication_year: 1997, position: 21 },
          { title: 'The Fifth Elephant',     slug: 'the-fifth-elephant',  status: 'mandatory',     note: 'Vimes on a diplomatic mission. Dwarves, werewolves, and a murder.',                             page_count: 321, publication_year: 1999, position: 24 },
          { title: 'Night Watch',            slug: 'night-watch',         status: 'mandatory',     note: 'Time travel, revolution, and Vimes at his absolute best. One of the great Discworld novels.',   page_count: 338, publication_year: 2002, position: 29 },
          { title: 'Thud!',                  slug: 'thud',                status: 'optional',      note: 'Trolls vs. dwarves in Ankh-Morpork. Vimes dealing with prejudice and fatherhood.',             page_count: 384, publication_year: 2005, position: 34 },
          { title: 'Snuff',                  slug: 'snuff',               status: 'optional',      note: "Vimes on a country holiday that turns into a case. The Watch's final novel.",                   page_count: 398, publication_year: 2011, position: 39 },
        ],
      },
      {
        label: 'Witches',
        sublabel: 'books 3, 6, 12, 14, 18, 23',
        noteType: 'optional',
        note: 'Start with Wyrd Sisters, not Equal Rites. The Witches trilogy (Wyrd Sisters, Witches Abroad, Lords and Ladies) is feminist, sharp, and very funny. Granny Weatherwax is one of the great characters in all of fantasy.',
        books: [
          { title: 'Equal Rites',      slug: 'equal-rites',      status: 'supplementary', note: 'Early Pratchett, still finding the voice. First Granny Weatherwax — readable but the weakest Witches entry.',   page_count: 212, publication_year: 1987, position: 3,  seriesLabel: 'Witches #1' },
          { title: 'Wyrd Sisters',     slug: 'wyrd-sisters',     status: 'mandatory',     note: 'The Witches subseries proper starts here. Shakespeare satire, three-way witch dynamic, magnificent.',           page_count: 265, publication_year: 1988, position: 6,  seriesLabel: 'Witches #2' },
          { title: 'Witches Abroad',   slug: 'witches-abroad',   status: 'mandatory',     note: 'Fairy tale deconstruction. Granny and Nanny travel abroad — one of the funniest Discworld books.',             page_count: 284, publication_year: 1991, position: 12, seriesLabel: 'Witches #3' },
          { title: 'Lords and Ladies', slug: 'lords-and-ladies', status: 'optional',      note: 'The elves return. Darker in tone. Excellent but harder to appreciate without the prior books.',               page_count: 281, publication_year: 1992, position: 14, seriesLabel: 'Witches #4' },
          { title: 'Maskerade',        slug: 'maskerade',        status: 'optional',      note: 'Phantom of the Opera parody with Agnes Nitt. Sharp opera satire.',                                             page_count: 288, publication_year: 1995, position: 18, seriesLabel: 'Witches #5' },
          { title: 'Carpe Jugulum',    slug: 'carpe-jugulum',    status: 'optional',      note: 'Vampires take over Lancre. Granny Weatherwax at her most complex. The Witches finale.',                       page_count: 368, publication_year: 1998, position: 23, seriesLabel: 'Witches #6' },
        ],
      },
      {
        label: 'Death',
        sublabel: 'books 4, 11, 16, 20, 26',
        noteType: 'optional',
        note: 'Mort is the best entry after Guards! Guards!. The Death subseries is warmer and more philosophical than the Watch. Hogfather (book 4 of the arc) is a December read.',
        books: [
          { title: 'Mort',           slug: 'mort',           status: 'mandatory',     note: 'Death takes an apprentice. The Death subseries — darkly funny and surprisingly moving.',                      page_count: 243, publication_year: 1987, position: 4,  seriesLabel: 'Death #1' },
          { title: 'Reaper Man',     slug: 'reaper-man',     status: 'mandatory',     note: 'Death gets fired and has to find a job. Surprisingly tender and funny.',                                      page_count: 252, publication_year: 1991, position: 11, seriesLabel: 'Death #2' },
          { title: 'Soul Music',     slug: 'soul-music',     status: 'optional',      note: "Rock'n'roll comes to Discworld. Susan Sto Helit's debut. Slightly overlong but charming.",                   page_count: 388, publication_year: 1994, position: 16, seriesLabel: 'Death #3' },
          { title: 'Hogfather',      slug: 'hogfather',      status: 'mandatory',     note: 'Death plays Father Christmas. Pratchett on belief, gods, and the value of stories. A masterpiece.',          page_count: 336, publication_year: 1996, position: 20, seriesLabel: 'Death #4' },
          { title: 'Thief of Time',  slug: 'thief-of-time',  status: 'optional',      note: "Susan and the History Monks. The Death arc's most philosophical entry.",                                      page_count: 324, publication_year: 2001, position: 26, seriesLabel: 'Death #5' },
        ],
      },
      {
        label: 'Rincewind & Wizards',
        sublabel: 'books 1, 2, 5, 9, 17, 22, 27, 37',
        noteType: 'optional',
        note: "The original Discworld arc — and the weakest. Colour of Magic and Light Fantastic are historically interesting but not representative of what the series becomes. Sourcery or Interesting Times are the better Rincewind entry points.",
        books: [
          { title: 'The Colour of Magic',   slug: 'the-colour-of-magic',   status: 'supplementary', note: 'Book 1 — Pratchett finding his feet. Start here only if you want to read in full publication order.',  page_count: 206, publication_year: 1983, position: 1  },
          { title: 'The Light Fantastic',   slug: 'the-light-fantastic',   status: 'supplementary', note: 'Direct sequel to Colour of Magic. Stronger, but still early-era Pratchett.',                           page_count: 186, publication_year: 1986, position: 2  },
          { title: 'Sourcery',              slug: 'sourcery',              status: 'optional',      note: 'A sourcerer threatens to destroy magic. Good standalone Rincewind entry.',                              page_count: 245, publication_year: 1988, position: 5  },
          { title: 'Eric',                  slug: 'eric',                  status: 'supplementary', note: 'Short illustrated novel — Rincewind as a demon summoner. More novella than novel.',                    page_count: 200, publication_year: 1990, position: 9  },
          { title: 'Interesting Times',     slug: 'interesting-times',     status: 'optional',      note: 'Rincewind sent to the Agatean Empire. Broad satire of Chinese culture.',                              page_count: 280, publication_year: 1994, position: 17 },
          { title: 'The Last Continent',    slug: 'the-last-continent',    status: 'optional',      note: 'Rincewind stranded in XXXX (Australia). Absurdist comedy.',                                           page_count: 290, publication_year: 1998, position: 22 },
          { title: 'The Last Hero',         slug: 'the-last-hero',         status: 'supplementary', note: 'Illustrated novella — Cohen the Barbarian tries to return fire to the gods. Beautiful but brief.',    page_count: 176, publication_year: 2001, position: 27 },
          { title: 'Unseen Academicals',    slug: 'unseen-academicals',    status: 'optional',      note: 'The Unseen University wizards discover football. Slow start but rewarding.',                           page_count: 514, publication_year: 2009, position: 37 },
        ],
      },
      {
        label: 'Standalones',
        sublabel: 'books 7, 10, 13, 25, 28, 31',
        noteType: 'optional',
        note: 'Small Gods is the only mandatory read here — widely considered a top-3 Discworld book and a perfect standalone. The rest can be read in any order or skipped entirely.',
        books: [
          { title: 'Pyramids',          slug: 'pyramids',          status: 'optional',  note: 'A young man trained as an assassin returns to his kingdom. Ancient Egypt satire.',      page_count: 267, publication_year: 1989, position: 7  },
          { title: 'Moving Pictures',   slug: 'moving-pictures',   status: 'optional',  note: 'Holy Wood (Hollywood) comes to Discworld. The movies satire.',                         page_count: 354, publication_year: 1990, position: 10 },
          { title: 'Small Gods',        slug: 'small-gods',        status: 'mandatory', note: 'Standalone masterpiece about religion, faith, and institutional power. Read this regardless of where you are in the series.', page_count: 284, publication_year: 1992, position: 13 },
          { title: 'The Truth',         slug: 'the-truth',         status: 'optional',  note: 'The first newspaper in Ankh-Morpork. Satire of media and truth. Excellent standalone.', page_count: 304, publication_year: 2000, position: 25 },
          { title: 'The Amazing Maurice and His Educated Rodents', slug: 'the-amazing-maurice-and-his-educated-rodents', status: 'supplementary', note: "YA Pied Piper retelling. Carnegie Medal winner. Charming but clearly YA — not a main-series entry.", page_count: 272, publication_year: 2001, position: 28 },
          { title: 'Monstrous Regiment',slug: 'monstrous-regiment', status: 'optional', note: 'A girl disguises herself as a soldier. War and gender satire. One of the sharpest late Pratchetts.', page_count: 384, publication_year: 2003, position: 31 },
        ],
      },
      {
        label: 'Tiffany Aching',
        sublabel: 'YA arc — books 30, 32, 35, 38, 41',
        noteType: 'optional',
        note: "Pratchett's YA series is the best introduction to Discworld for younger readers — and excellent for adults. Start with The Wee Free Men. The Shepherd's Crown is Pratchett's final novel, written as he was dying.",
        books: [
          { title: 'The Wee Free Men',      slug: 'the-wee-free-men',      status: 'mandatory', note: 'Best YA entry point to Discworld. Young Tiffany Aching becomes a witch. Brilliant.',                   page_count: 268, publication_year: 2003, position: 30 },
          { title: 'A Hat Full of Sky',     slug: 'a-hat-full-of-sky',     status: 'optional',  note: "Tiffany's first apprenticeship. A possessing spirit called a hiver.",                                  page_count: 275, publication_year: 2004, position: 32 },
          { title: 'Wintersmith',           slug: 'wintersmith',           status: 'optional',  note: 'Tiffany accidentally attracts the Wintersmith. The series at its most mythic.',                        page_count: 336, publication_year: 2006, position: 35 },
          { title: 'I Shall Wear Midnight', slug: 'i-shall-wear-midnight', status: 'optional',  note: 'Tiffany fully trained. Tackles witch-hunting and prejudice. The darkest Tiffany book.',               page_count: 322, publication_year: 2010, position: 38 },
          { title: "The Shepherd's Crown",  slug: 'the-shepherds-crown',   status: 'optional',  note: "Pratchett's final novel. Unpolished but deeply moving as a farewell.",                                page_count: 276, publication_year: 2015, position: 41 },
        ],
      },
      {
        label: 'Industrial Revolution',
        sublabel: 'Moist von Lipwig — books 33, 36, 40',
        noteType: 'optional',
        note: "Going Postal is the best standalone entry into Discworld after the Watch books. The Moist arc covers postal service, banking, and railways — progressively weaker as Pratchett's health declined.",
        books: [
          { title: 'Going Postal',   slug: 'going-postal',   status: 'mandatory', note: 'A con artist is forced to run the Ankh-Morpork post office. Perfect standalone entry — the best place to start if Watch feels too long.', page_count: 471, publication_year: 2004, position: 33 },
          { title: 'Making Money',   slug: 'making-money',   status: 'optional',  note: 'Moist von Lipwig takes over the Royal Mint. Slightly weaker than Going Postal but still excellent.',                                      page_count: 400, publication_year: 2007, position: 36 },
          { title: 'Raising Steam',  slug: 'raising-steam',  status: 'optional',  note: "Railways arrive on Discworld. Pratchett's Alzheimer's beginning to show — a weaker late entry.",                                          page_count: 385, publication_year: 2013, position: 40 },
        ],
      },
    ],
    orderNote: 'Organized by subseries — each arc is self-contained. Start with City Watch or Death. Book numbers in the sublabels refer to publication order.',
    cardsPosition: 'above',
    cards: [
      { title: '⚡ Where to start',    body: 'Guards! Guards! for the full Watch experience. Mort or Hogfather for Death. Going Postal for a quick, funny standalone. Small Gods if you want Pratchett at his most serious.', color: 'blue'  },
      { title: '⚠️ Skip books 1–2',   body: 'The Colour of Magic and The Light Fantastic are Pratchett finding his voice — they\'re fine but very different from the rest. Most fans recommend starting from book 3 or later.',  color: 'amber' },
      { title: '📚 41 Books, No Pressure', body: 'You don\'t need to read all 41. Each subseries is self-contained — pick the arcs that interest you and ignore the rest. Most fans never finish the full series and don\'t feel they missed anything.', color: 'green' },
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
    darkness: [
      { label: 'Most of the series',   level: 1, desc: 'Light — satire and comedy with warmth at its core' },
      { label: 'Lords and Ladies',      level: 3, desc: 'The darkest Discworld — elves as genuine terror, real menace' },
      { label: "The Shepherd's Crown", level: 2, desc: "Bittersweet — Pratchett's farewell, tinged with grief" },
    ],
    finishedLabel: 'Want more like Discworld?',
    categoryHref: '/fantasy/cozy',
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
      { title: 'A Dance with Dragons',slug: 'a-dance-with-dragons',status: 'mandatory',   note: 'Runs parallel to Feast for the first half, then moves forward. The series is unfinished here — book 6 has no release date.',         page_count: 1016, publication_year: 2011 },
      { title: 'The Winds of Winter',  slug: null,                  status: 'incomplete', note: 'In progress since 2011. No confirmed release date.',                                                                                      page_count: null, publication_year: null },
      { title: 'A Dream of Spring',    slug: null,                  status: 'incomplete', note: 'Final book in the series. Unwritten.',                                                                                                     page_count: null, publication_year: null },
    ],
    orderNote: 'Publication order is the only order. There are no prequels or companion novels required for the main series.',
    cardsPosition: 'above',
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
      { label: 'A Game of Thrones',    level: 5, desc: 'Brutal from the start — political violence, executions, moral ambiguity' },
      { label: 'A Clash of Kings',     level: 4, desc: 'Dark — war begins in earnest, atrocities multiply' },
      { label: 'A Storm of Swords',    level: 5, desc: "Brutal — the series' most devastating events back to back" },
      { label: 'A Feast for Crows',    level: 4, desc: 'Dark — aftermath, political decay, diminishing hope' },
      { label: 'A Dance with Dragons', level: 4, desc: 'Dark — isolation, survival, and hard choices' },
    ],
    finishedLabel: 'Finished the published books?',
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    booksLikeSlug: 'a-game-of-thrones',
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
    categoryHref: '/fantasy/epic',
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
        sublabel: 'books 1–5 + optional prequel',
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
      { label: 'Books 6–7', level: 4, desc: 'Full-scale war, sacrifice, world-ending stakes' },
    ],
    finishedLabel: 'Finished the series?',
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['acotar', 'blood-and-ash'],
  },

  // ─── Sarah J. Maas ─────────────────────────────────────────────────────────
  {
    slug: 'sarah-j-maas',
    name: 'Sarah J. Maas Universe',
    author: 'Sarah J. Maas',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '⏳ All three series ongoing',
    description:
      'The complete SJM reading order across all three series: Throne of Glass, A Court of Thorns and Roses, and Crescent City. The three worlds form a shared multiverse — connections are subtle at first, then explicit by the time you reach Crescent City. The recommended order maximises every crossover payoff.',
    darknessDisplay: '🕯️🕯️🕯️–🕯️🕯️🕯️🕯️ Moderate to Dark · 🔥🔥–🔥🔥🔥 Explicit from ACMAF onward',
    warning: 'Do not start with Crescent City. House of Sky and Breath and House of Flame and Shadow contain major crossover content from ACOTAR — reading CC first will spoil both series. Throne of Glass and ACOTAR can be read in either order.',
    groups: [
      {
        label: 'Throne of Glass',
        sublabel: 'books 1–7 + optional prequel — start here or with ACOTAR',
        noteType: 'required',
        note: 'Read TOG before or after ACOTAR — either order works. The series must be finished before starting Crescent City. Kingdom of Ash ends with a multiverse moment that gains meaning once you know the wider SJM world.',
        books: [
          { title: 'Throne of Glass',       slug: 'throne-of-glass',       status: 'mandatory',     note: 'Start here. Celaena Sardothien enters a deadly competition. YA-adjacent in tone — the series grows from here.',                          page_count: 404, publication_year: 2012 },
          { title: "The Assassin's Blade",  slug: 'the-assassins-blade',   status: 'optional',      note: 'Five prequel novellas collected in one volume. Read after book 1 or skip — adds emotional depth, not plot.',                            page_count: 432, publication_year: 2014 },
          { title: 'Crown of Midnight',     slug: 'crown-of-midnight',     status: 'mandatory',     note: 'The series finds its footing. Darker and faster, with a reveal that reframes everything.',                                             page_count: 418, publication_year: 2013 },
          { title: 'Heir of Fire',          slug: 'heir-of-fire',          status: 'mandatory',     note: 'World expands into Fae and ancient magic. The true threat arrives.',                                                                   page_count: 565, publication_year: 2014 },
          { title: 'Queen of Shadows',      slug: 'queen-of-shadows',      status: 'mandatory',     note: 'Aelin returns to Rifthold. Cast converges, alliances shift.',                                                                          page_count: 648, publication_year: 2015 },
          { title: 'Empire of Storms',      slug: 'empire-of-storms',      status: 'mandatory',     note: 'War begins. Read before Tower of Dawn or alternate chapters — both cover the same timeline.',                                          page_count: 689, publication_year: 2016 },
          { title: 'Tower of Dawn',         slug: 'tower-of-dawn',         status: 'mandatory',     note: "Chaol's story runs parallel to Empire of Storms. Do not skip — its events are essential for the finale.",                             page_count: 660, publication_year: 2017 },
          { title: 'Kingdom of Ash',        slug: 'kingdom-of-ash',        status: 'mandatory',     note: 'The finale. All storylines converge. The closing chapters pierce the veil between worlds — the first hint of the SJM multiverse.',    page_count: 992, publication_year: 2018 },
        ],
      },
      {
        label: 'A Court of Thorns and Roses',
        sublabel: 'books 1–5 — start here or after TOG',
        noteType: 'required',
        note: 'Complete the full ACOTAR series before starting Crescent City. A Court of Silver Flames must be read before House of Flame and Shadow — Nesta and Azriel appear in CC book 3.',
        books: [
          { title: 'A Court of Thorns and Roses',    slug: 'a-court-of-thorns-and-roses',    status: 'mandatory',     note: 'Beauty and the Beast retelling. Feyre is pulled into the Fae world. Slower start — the series takes off at book 2.',            page_count: 419, publication_year: 2015 },
          { title: 'A Court of Mist and Fury',       slug: 'a-court-of-mist-and-fury',       status: 'mandatory',     note: 'The best book in the series by wide consensus. Everything expands — world, stakes, romance. Where most readers fall hard for the series.', page_count: 624, publication_year: 2016 },
          { title: 'A Court of Wings and Ruin',      slug: 'a-court-of-wings-and-ruin',      status: 'mandatory',     note: 'War arrives. Closes the main trilogy with full cast convergence.',                                                              page_count: 699, publication_year: 2017 },
          { title: 'A Court of Frost and Starlight', slug: 'a-court-of-frost-and-starlight', status: 'supplementary', note: 'Short bridge novella (~230 pages). War aftermath. Read before A Court of Silver Flames.',                                          page_count: 232, publication_year: 2018 },
          { title: 'A Court of Silver Flames',       slug: 'a-court-of-silver-flames',       status: 'mandatory',     note: "Nesta and Cassian's book. READ THIS before Crescent City book 3 — Nesta and Azriel play major roles in House of Flame and Shadow.", page_count: 757, publication_year: 2021 },
        ],
      },
      {
        label: 'Crescent City',
        sublabel: 'books 1–3 — read last',
        noteType: 'warning',
        note: 'Do not start Crescent City until you have finished both TOG and ACOTAR. House of Sky and Breath ends with Bryce accidentally crossing into Prythian (the ACOTAR world). House of Flame and Shadow spends roughly a third of its pages there — with Nesta and Azriel. Reading CC first will spoil both previous series.',
        books: [
          { title: 'House of Earth and Blood',   slug: 'house-of-earth-and-blood',   status: 'mandatory', note: 'Bryce Quinlan investigates her best friend\'s murder in a modern city of humans, Fae, angels, and wolves. Urban fantasy foundation before the worlds collide.', page_count: 803, publication_year: 2020 },
          { title: 'House of Sky and Breath',    slug: 'house-of-sky-and-breath',    status: 'mandatory', note: 'The SJM multiverse begins. The final pages send Bryce to Prythian — the ACOTAR world. The crossover starts here.',                                        page_count: 804, publication_year: 2022 },
          { title: 'House of Flame and Shadow',  slug: 'house-of-flame-and-shadow',  status: 'mandatory', note: '~1/3 of this book is set in Prythian with Nesta and Azriel. Requires ACOTAR to be fully read. The multiverse payoff is here.',                           page_count: 896, publication_year: 2024 },
        ],
      },
    ],
    orderNote: 'TOG and ACOTAR can be read in either order. Crescent City must always come last — it pays off both previous series.',
    cards: [
      { title: '🗺️ The Multiverse',      body: "All three series exist in the same multiverse. Throne of Glass hints at it in Kingdom of Ash. ACOTAR and Crescent City collide directly starting in House of Sky and Breath.",                         color: 'blue'   },
      { title: '⚠️ Order Matters for CC', body: 'Finish all of ACOTAR (including A Court of Silver Flames) before starting Crescent City. Nesta and Azriel appear as major characters in House of Flame and Shadow.',                               color: 'amber'  },
      { title: '🔗 The Crossover Key',   body: 'The eight-pointed star appears across all three series. Rhysand (ACOTAR) and Bryce (CC) share Starborn Fae ancestry through Queen Theia. The TOG/Prythian connection is confirmed in Kingdom of Ash.', color: 'purple' },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'New to SJM? Start with either Throne of Glass or ACOTAR — both work as entry points. Most readers recommend ACOTAR first because it\'s slightly more accessible.',
          'Already read TOG or ACOTAR? Add the other series before starting Crescent City — the CC crossovers hit much harder with both under your belt.',
          'Already read all of ACOTAR? You can start Crescent City — but finish ACSF first so you know Nesta and Azriel before House of Flame and Shadow.',
          'Never start with Crescent City — the payoff requires knowing the other worlds.',
        ],
      },
      {
        heading: 'The crossover moments explained (minor spoilers)',
        type: 'bullets',
        bullets: [
          'Kingdom of Ash (TOG #7, end): Aelin pierces the veil between worlds — the first confirmation that the SJM worlds are connected.',
          'House of Sky and Breath (CC #2, end): Bryce is transported to Prythian instead of Hel. The ACOTAR crossover begins here.',
          'House of Flame and Shadow (CC #3): Bryce spends ~1/3 of the book in Prythian with Nesta and Azriel. Bryce learns the Fae of Midgard descended from Prythian. The multiverse becomes explicit.',
          'Connecting lore: the eight-pointed star, Starborn Fae lineage, and Queen Theia link ACOTAR and Crescent City through shared bloodlines.',
        ],
      },
      {
        heading: 'Content notes',
        type: 'bullets',
        bullets: [
          'Throne of Glass: YA-adjacent at first, grows into dark epic fantasy. Explicit content from later books onward.',
          'ACOTAR: Explicit from A Court of Mist and Fury onward. War, trauma, and recovery arcs.',
          'Crescent City: The most mature of the three — explicit throughout, with urban fantasy violence and higher darkness level.',
        ],
      },
    ],
    darkness: [
      { label: 'TOG books 1–2',  level: 2, desc: 'Competition, intrigue — relatively contained' },
      { label: 'TOG books 3–7',  level: 4, desc: 'Full-scale war, sacrifice, world-ending stakes' },
      { label: 'ACOTAR 1–3',     level: 3, desc: 'Dark fairy tale, trauma, war' },
      { label: 'ACSF',           level: 3, desc: 'Intense recovery arc, darker tone' },
      { label: 'Crescent City',  level: 4, desc: 'Most mature — explicit, violent, high stakes throughout' },
    ],
    finishedLabel: 'Finished the SJM universe?',
    categoryHref: '/fantasy/romantasy',
    categoryLabel: 'Browse Romantasy',
    related: ['acotar', 'throne-of-glass', 'empyrean'],
  },

  // ─── The Broken Empire ─────────────────────────────────────────────────────
  {
    slug: 'mark-lawrence',
    name: 'The Broken Empire',
    author: 'Mark Lawrence',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ All four trilogies complete',
    description:
      'Four trilogies, two connected worlds, one deeply cohesive author vision. The Broken Empire and Red Queen\'s War share the same post-apocalyptic Earth — told concurrently from two very different protagonists. The Book of the Ancestor and Book of the Ice share the ice-bound world of Abeth. Lawrence writes morally complex antiheroes, dark humour, and reveals that reframe everything you thought you knew.',
    darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
    warning: 'The Broken Empire opens with an extremely dark and violent prologue — this is intentional. Jorg is one of the most divisive protagonists in modern fantasy. If the opening repels you, try Prince of Fools (Red Queen\'s War) first — same world, much lighter tone with a comedic coward as the hero.',
    groups: [
      {
        label: 'The Broken Empire',
        sublabel: 'start here — or with Prince of Fools if you prefer lighter tone',
        noteType: 'required',
        note: 'The recommended starting point. Jorg Ancrath is one of fantasy\'s most notorious antiheroes — cruel, intelligent, and compelling. The trilogy is set in post-apocalyptic Europe a thousand years after nuclear war. Read before or after Red Queen\'s War — both work.',
        books: [
          { title: 'Prince of Thorns',  slug: 'prince-of-thorns',  status: 'mandatory', note: 'Start here. Jorg is 14, leads a band of outlaws, and is deeply unsettling from page one. Lawrence earns the darkness.',          page_count: 338, publication_year: 2011 },
          { title: 'King of Thorns',    slug: 'king-of-thorns',    status: 'mandatory', note: 'Jorg at 18. Non-linear structure adds layers. The world opens up considerably.',                                                  page_count: 442, publication_year: 2012 },
          { title: 'Emperor of Thorns', slug: 'emperor-of-thorns', status: 'mandatory', note: 'The conclusion. Everything about the world and its hidden history comes together.',                                             page_count: 418, publication_year: 2013 },
        ],
      },
      {
        label: 'The Red Queen\'s War',
        sublabel: 'same world, concurrent timeline — lighter tone',
        noteType: 'optional',
        note: 'Set in the same world as The Broken Empire, running concurrently. Prince Jalan Kendeth is a coward and a liar — a deliberate tonal contrast to Jorg. The two series briefly intersect (Jalan and Jorg share a scene). Can be read before or after Broken Empire.',
        books: [
          { title: 'Prince of Fools',     slug: 'prince-of-fools',     status: 'mandatory', note: 'Jalan Kendeth and the viking Snorri set off on an unwilling quest. Funnier and more accessible than Broken Empire — a good entry point if you want lighter fare first.', page_count: 337, publication_year: 2014 },
          { title: 'The Liar\'s Key',     slug: 'the-liars-key',       status: 'mandatory', note: 'The quest deepens. Lawrence\'s dark humour is at its best here.',                                                                                                     page_count: 375, publication_year: 2015 },
          { title: 'The Wheel of Osheim', slug: 'the-wheel-of-osheim', status: 'mandatory', note: 'The finale. Stakes rise to world-ending levels. Callbacks to Broken Empire land hardest if you\'ve read both.',                                                        page_count: 393, publication_year: 2016 },
        ],
      },
      {
        label: 'Book of the Ancestor',
        sublabel: 'new world — start fresh',
        noteType: 'required',
        note: 'Set on the ice-bound world of Abeth — a different world from the Broken Empire but connected in ways Lawrence reveals slowly. A convent of warrior nuns, a magic rooted in light and darkness, and a dying sun. Darker than Red Queen\'s War, with a very different kind of protagonist.',
        books: [
          { title: 'Red Sister',  slug: 'red-sister',  status: 'mandatory', note: 'Nona Grey is sold to a convent after nearly killing a boy. Learns to fight, kill, and wield the Path. Excellent magic system and character work.', page_count: 469, publication_year: 2017 },
          { title: 'Grey Sister', slug: 'grey-sister', status: 'mandatory', note: 'Nona faces internal politics and external threats to the convent. The magic deepens.',                                                           page_count: 400, publication_year: 2018 },
          { title: 'Holy Sister', slug: 'holy-sister', status: 'mandatory', note: 'The conclusion. War comes to the convent. Everything Lawrence built across three books pays off.',                                               page_count: 330, publication_year: 2019 },
        ],
      },
      {
        label: 'Book of the Ice',
        sublabel: 'read after Book of the Ancestor',
        noteType: 'warning',
        note: 'Do not read before completing Book of the Ancestor — Book of the Ice contains significant spoilers for the Ancestor trilogy. Set in the same world (Abeth) but among the ice tribes far from the convent. Callbacks to Ancestor characters appear from book 2 onward.',
        books: [
          { title: 'The Girl and the Stars',    slug: 'the-girl-and-the-stars',    status: 'mandatory', note: 'Yaz is cast into the ice — literally. A different culture, a different magic, the same dying world.',       page_count: 368, publication_year: 2020 },
          { title: 'The Girl and the Mountain', slug: 'the-girl-and-the-mountain', status: 'mandatory', note: 'Yaz climbs out of the ice world. Ancestor trilogy characters begin to appear.',                            page_count: 371, publication_year: 2021 },
          { title: 'The Girl and the Moon',     slug: 'the-girl-and-the-moon',     status: 'mandatory', note: 'The finale. Both Abeth trilogies converge. The full picture of this dying world snaps into focus.',         page_count: 373, publication_year: 2023 },
        ],
      },
    ],
    orderNote: 'Broken Empire and Red Queen\'s War can be read in either order — they are concurrent stories in the same world. Book of the Ancestor can be started independently. Book of the Ice must come after Book of the Ancestor.',
    cardsPosition: 'above',
    cards: [
      { title: '🗺️ Two Worlds',           body: 'Post-apocalyptic Earth: Broken Empire + Red Queen\'s War (concurrent). Ice-bound Abeth: Book of the Ancestor + Book of the Ice. The worlds have a deep connection Lawrence reveals across all four trilogies.',  color: 'blue'   },
      { title: '⚔️ Two Entry Points',     body: 'Start with Prince of Thorns for the darkest, most celebrated entry. Start with Prince of Fools if you want a lighter tone — same world, comedic antihero, equally rewarding.',                                color: 'amber'  },
      { title: '⚠️ Book of the Ice Last', body: 'Do not read Book of the Ice before finishing Book of the Ancestor. It spoils the Ancestor trilogy and its payoffs require knowing those characters.',                                                          color: 'purple' },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'New to Lawrence? Start with Prince of Thorns if grimdark antiheroes appeal to you. Start with Prince of Fools if you want the same world with a much lighter, funnier tone.',
          'The two Earth-set trilogies (Broken Empire + Red Queen\'s War) share the same world and timeline — Jorg and Jalan briefly share a scene. Reading both gives you the full picture.',
          'Book of the Ancestor is a clean entry point regardless of whether you\'ve read the Earth trilogies — it stands alone well.',
          'Book of the Ice requires Book of the Ancestor first. Don\'t skip that order.',
        ],
      },
      {
        heading: 'The world-building secret',
        type: 'bullets',
        bullets: [
          'The Broken Empire is set on Earth — roughly 1,000 years after a global nuclear war called "the Thousand Suns." The ruins of our civilisation (called "the Builders") are everywhere.',
          'Magic in the Broken Empire world comes from the remnants of pre-war technology — what characters call "the old power" is often something more familiar.',
          'Abeth (Book of the Ancestor / Book of the Ice) is the same Earth in a far more distant future — the sun is dying, the world freezing. The connection to the Broken Empire era is subtle but real.',
          'Lawrence plants clues across all four trilogies. Second reads reveal layers that were invisible the first time.',
        ],
      },
      {
        heading: 'Content notes',
        type: 'bullets',
        bullets: [
          'Prince of Thorns opens with very dark content involving Jorg as a child — this is not gratuitous; it is the foundation of his character arc.',
          'The Broken Empire is grimdark. Violence, moral ambiguity, and an unreliable narrator are features, not bugs.',
          'Red Queen\'s War is much lighter — dark fantasy with genuine comedy. Jalan is a deliberate foil to Jorg.',
          'Book of the Ancestor has violence but is less grimdark — closer to dark YA in tone for the first book, though it deepens considerably.',
        ],
      },
    ],
    darkness: [
      { label: 'Broken Empire',           level: 5, desc: 'Brutal grimdark — violent, morally black antihero, unflinching from page one' },
      { label: "Red Queen's War",         level: 5, desc: 'Dark fantasy — genuine danger and loss beneath the comedic tone' },
      { label: 'Red Sister',              level: 3, desc: 'Darker than expected YA — violence with purpose, strong character foundation' },
      { label: 'Book of the Ancestor 2–3', level: 4, desc: 'Escalates significantly — war, sacrifice, and a dying world closing in' },
      { label: 'Book of the Ice',         level: 4, desc: 'Bleak and relentless — survival on a freezing world with high stakes' },
    ],
    finishedLabel: 'Finished the Lawrence universe?',
    categoryHref: '/fantasy/grimdark',
    categoryLabel: 'Browse Grimdark',
    related: ['first-law', 'black-company', 'malazan'],
  },

  // ─── Blood and Ash ─────────────────────────────────────────────────────────
  {
    slug: 'blood-and-ash',
    name: 'From Blood and Ash',
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
    categoryHref: '/fantasy/romantasy',
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
    groups: [
      {
        label: 'Published',
        sublabel: 'books 1–3',
        noteType: 'required',
        note: 'All three books are essential and must be read in order. The series ends on a cliffhanger — you will be waiting for book 4.',
        books: [
          { title: 'Fourth Wing', slug: 'fourth-wing', status: 'mandatory', note: 'Start here. Violet Sorrengail enters Basgiath War College to become a rider. Fast pacing, strong voice, explicit romance begins immediately.', page_count: 517, publication_year: 2023 },
          { title: 'Iron Flame',  slug: 'iron-flame',  status: 'mandatory', note: 'Raises the stakes considerably — the war plot becomes the focus and the world expands. Longer and denser than book one.',                    page_count: 623, publication_year: 2023 },
          { title: 'Onyx Storm', slug: 'onyx-storm',   status: 'mandatory', note: 'The series shifts into full epic fantasy territory. Higher body count, bigger consequences, a lot of threads in motion.',                   page_count: 608, publication_year: 2025 },
        ],
      },
      {
        label: 'Coming Soon',
        sublabel: 'books 4–5 — no release dates yet',
        noteType: 'optional',
        note: 'Yarros confirmed in March 2026 that she is actively writing book 4. No title or release date announced. The series is planned for 5 books total.',
        books: [
          { title: 'Empyrean Book 4', slug: null, status: 'upcoming', note: 'Title not yet revealed. Yarros began writing in early 2026. Expected POVs include Violet, Xaden, Dain, and Ridoc.', page_count: null, publication_year: null },
          { title: 'Empyrean Book 5', slug: null, status: 'upcoming', note: 'The planned series finale. No details announced.', page_count: null, publication_year: null },
        ],
      },
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
    categoryHref: '/fantasy/romantasy',
    categoryLabel: 'Browse Romantasy',
    related: ['acotar', 'throne-of-glass'],
  },
  // ─── Forgotten Realms — The Legend of Drizzt ──────────────────────────────
  {
    slug: 'drizzt',
    name: 'Legend of Drizzt',
    author: 'R.A. Salvatore',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '⏳ Ongoing Series',
    description:
      "The longest-running fantasy saga in D&D fiction — 30+ novels following Drizzt Do'Urden, a dark elf who abandons the brutal society of the Underdark to forge his own path on the surface world. At its core it's a story about identity, loyalty, and chosen family. The Companions of the Hall (Bruenor, Catti-brie, Regis, Wulfgar) are some of the most beloved characters in fantasy. Start with the Dark Elf Trilogy for the origin, or jump straight into Icewind Dale for the classic adventure.",
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    warning: 'The series spans 30+ novels across 10+ arcs. This guide covers the essential reading — the first four arcs are the heart of the series. Later arcs vary in quality but remain popular with fans of the characters.',
    groups: [
      {
        label: 'The Dark Elf Trilogy',
        sublabel: 'Chronological start — Drizzt\'s origin',
        note: 'Written as a prequel after Icewind Dale. Start here for chronological order, or skip to Icewind Dale and return later.',
        noteType: 'optional',
        books: [
          { title: 'Homeland',  slug: 'homeland',  status: 'mandatory',     note: "Drizzt's birth into drow society in the Underdark. Brutal, political, and fascinating as a portrait of a world built on cruelty.",            page_count: 343, publication_year: 1990 },
          { title: 'Exile',     slug: 'exile',     status: 'mandatory',     note: 'Drizzt survives the Underdark after fleeing his city. Tense and claustrophobic — the world trying to kill him at every turn.',               page_count: 314, publication_year: 1990 },
          { title: 'Sojourn',   slug: 'sojourn',   status: 'mandatory',     note: 'Drizzt reaches the surface world. The prejudice he faces gives the series its emotional core.',                                                 page_count: 311, publication_year: 1991 },
        ],
      },
      {
        label: 'The Icewind Dale Trilogy',
        sublabel: 'The original trilogy — written first, most beloved',
        note: 'This is where R.A. Salvatore introduced Drizzt to the world. Many fans consider this the best entry point.',
        noteType: 'required',
        books: [
          { title: 'The Crystal Shard',   slug: 'the-crystal-shard',   status: 'mandatory', note: "The Companions of the Hall assemble. Wulfgar, Bruenor, Catti-brie, Regis — fantasy's greatest found family.",                    page_count: 336, publication_year: 1988 },
          { title: 'Streams of Silver',   slug: 'streams-of-silver',   status: 'mandatory', note: 'The Companions travel to Mithral Hall to reclaim Bruenor\'s ancestral dwarven kingdom.',                                          page_count: 352, publication_year: 1989 },
          { title: "The Halfling's Gem",  slug: 'the-halflings-gem',   status: 'mandatory', note: 'High-stakes conclusion. Regis is taken and the Companions give chase across the continent.',                                      page_count: 352, publication_year: 1990 },
        ],
      },
      {
        label: 'Legacy of the Drow',
        sublabel: 'The drow return — the stakes become personal',
        books: [
          { title: 'The Legacy',       slug: 'the-legacy',       status: 'mandatory',     note: "Drizzt's past hunts him. The drow come to Mithral Hall. Best arc in the series by many fans.",        page_count: 309, publication_year: 1992 },
          { title: 'Starless Night',   slug: 'starless-night',   status: 'mandatory',     note: 'Drizzt returns to the Underdark alone. One of the darkest and most personal books.',                   page_count: 303, publication_year: 1993 },
          { title: 'Siege of Darkness', slug: 'siege-of-darkness', status: 'mandatory',   note: 'Full-scale drow invasion. The war that the series has been building toward.',                           page_count: 314, publication_year: 1994 },
          { title: 'Passage to Dawn',  slug: 'passage-to-dawn',  status: 'mandatory',     note: 'The aftermath. Drizzt and Catti-brie at sea. Closes the Legacy of the Drow era.',                      page_count: 310, publication_year: 1996 },
        ],
      },
      {
        label: 'Paths of Darkness',
        sublabel: 'The Companions scattered — a darker chapter',
        books: [
          { title: 'The Silent Blade',       slug: 'the-silent-blade',       status: 'optional',     note: 'Artemis Entreri returns. Drizzt vs. Entreri rivalry reaches a major turning point.',               page_count: 315, publication_year: 1998 },
          { title: 'The Spine of the World', slug: 'the-spine-of-the-world', status: 'optional',     note: 'Wulfgar-focused departure. Deals with trauma and recovery — divisive but emotionally honest.',      page_count: 345, publication_year: 1999 },
          { title: 'Servant of the Shard',   slug: 'servant-of-the-shard',   status: 'optional',     note: 'Follows Jarlaxle and Entreri more than Drizzt. Best book in the arc for fans of the villains.',   page_count: 315, publication_year: 2000 },
          { title: 'Sea of Swords',          slug: 'sea-of-swords',          status: 'optional',     note: 'The Companions reunite. Wraps up the Paths of Darkness arc cleanly.',                              page_count: 312, publication_year: 2001 },
        ],
      },
      {
        label: 'The Hunter\'s Blades & Beyond',
        sublabel: 'Continuing the saga (15+ more novels)',
        note: 'The series continues with The Hunter\'s Blades Trilogy, Transitions, The Neverwinter Saga, and multiple subsequent arcs through 2024. Quality is consistent for fans of the characters — each arc has a self-contained conflict within the ongoing saga.',
        noteType: 'optional',
        books: [
          { title: 'The Thousand Orcs',  slug: 'the-thousand-orcs',  status: 'supplementary', note: 'Start of Hunter\'s Blades Trilogy. Large orc invasion threatens the North.',  page_count: 343, publication_year: 2002 },
          { title: 'Gauntlgrym',         slug: 'gauntlgrym',         status: 'supplementary', note: 'Start of Neverwinter Saga. 100 years later — a new chapter for Drizzt.',       page_count: 358, publication_year: 2010 },
          { title: 'Timeless',           slug: 'timeless',           status: 'supplementary', note: 'Start of Generations arc. Introduces a new generation alongside Drizzt.',      page_count: 384, publication_year: 2018 },
        ],
      },
    ],
    orderNote: 'Two valid starting points: Homeland (Dark Elf Trilogy) for chronological order, or The Crystal Shard (Icewind Dale) for publication order. Both work — publication order is the more common recommendation.',
    cards: [
      { title: '⚔️ The Hook',         body: 'Drizzt is one of fantasy\'s most iconic characters — a dark elf who rejects his people\'s evil and builds a life on the surface through sheer will and skill. The found-family dynamic of the Companions of the Hall is the emotional core of the entire series.',   color: 'blue'   },
      { title: '📚 Where to Start',   body: 'Most readers recommend The Crystal Shard as the entry point — it\'s shorter, faster, and introduces the Companions. The Dark Elf Trilogy is deeper but works better once you already love the character.',                                                            color: 'green'  },
      { title: '🗺️ The Long Game',   body: 'The series spans 30+ novels. The first two arcs (Icewind Dale + Legacy of the Drow) are universally loved. After that, quality varies but remains solid for fans of the cast. You don\'t have to read all of it — stop when you\'re satisfied.',                  color: 'amber'  },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'New reader: Start with The Crystal Shard (Icewind Dale #1) — shorter, faster-paced, and introduces the full cast immediately.',
          'Want the full origin: Start with Homeland (Dark Elf Trilogy #1) for Drizzt\'s backstory in the Underdark.',
          'Just want the best arc: Read the Dark Elf Trilogy, then jump to Legacy of the Drow — this is the emotional peak of the series.',
          'D&D fan: All books are set in the Forgotten Realms setting. No D&D knowledge required, but it adds flavor.',
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          'The early books (1988–1996) are the strongest. The series gets more variable in quality after Paths of Darkness.',
          'Artemis Entreri — Drizzt\'s rival assassin — is a fan favourite who grows into a surprisingly complex character across multiple arcs.',
          'Later arcs (Neverwinter Saga onwards) reboot the cast and tone. Some fans stop at Legacy of the Drow and consider that the complete experience.',
          'All books are fast reads — 300–360 pages, action-focused, with short chapters.',
        ],
      },
    ],
    darkness: [
      { label: 'Dark Elf Trilogy',      level: 3, desc: 'Moderate — Underdark society is brutal and political' },
      { label: 'Icewind Dale Trilogy',  level: 2, desc: 'Light — adventure-focused with low stakes death' },
      { label: 'Legacy of the Drow',    level: 3, desc: 'Moderate — personal stakes, drow warfare' },
      { label: 'Paths of Darkness',     level: 3, desc: 'Moderate — trauma explored, darker character arcs' },
    ],
    finishedLabel: 'Finished the core arcs?',
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['cosmere', 'wheel-of-time', 'dragonlance'],
  },

  // ─── Dragonlance ───────────────────────────────────────────────────────────
  {
    slug: 'dragonlance',
    name: 'Dragonlance',
    author: 'Margaret Weis & Tracy Hickman',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Core Series Complete',
    description:
      'The defining D&D fantasy series of the 1980s. Dragonlance introduced a generation to epic fantasy — a world of dragons, knights, and gods, with a cast of companions whose dynamics defined the genre. The Chronicles trilogy is required reading for fantasy history; the Legends trilogy, following the mage Raistlin, is widely considered the better work. Between them, they represent the peak of TSR-era fantasy fiction.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    groups: [
      {
        label: 'The Chronicles Trilogy',
        sublabel: 'Start here — the original Dragonlance',
        books: [
          { title: 'Dragons of Autumn Twilight', slug: 'dragons-of-autumn-twilight', status: 'mandatory',     note: 'The Companions reunite in a world at war with dragons. Classic fantasy adventure — the template for the genre.', page_count: 447, publication_year: 1984 },
          { title: 'Dragons of Winter Night',    slug: 'dragons-of-winter-night',    status: 'mandatory',     note: 'The war spreads. Raistlin\'s ambitions take a darker turn. The best book in the Chronicles.',               page_count: 399, publication_year: 1985 },
          { title: 'Dragons of Spring Dawning',  slug: 'dragons-of-spring-dawning',  status: 'mandatory',     note: 'The war ends. The Companions are broken and changed. A bittersweet conclusion.',                            page_count: 399, publication_year: 1985 },
        ],
      },
      {
        label: 'The Legends Trilogy',
        sublabel: 'Raistlin\'s story — widely considered the better trilogy',
        note: 'Read Chronicles first. Legends is darker, more ambitious, and centres entirely on Raistlin — one of fantasy\'s greatest antiheroes.',
        noteType: 'required',
        books: [
          { title: 'Time of the Twins',  slug: 'time-of-the-twins',  status: 'mandatory',     note: 'Raistlin travels back in time with his twin Caramon. His bid for godhood begins. Darker and more focused than Chronicles.',    page_count: 373, publication_year: 1986 },
          { title: 'War of the Twins',   slug: 'war-of-the-twins',   status: 'mandatory',     note: 'The consequences of time travel ripple outward. Raistlin\'s plan comes into focus — brilliant and terrifying.',             page_count: 372, publication_year: 1986 },
          { title: 'Test of the Twins',  slug: 'test-of-the-twins',  status: 'mandatory',     note: 'The conclusion of Raistlin\'s arc. One of the most memorable endings in fantasy — haunting and earned.',                    page_count: 308, publication_year: 1986 },
        ],
      },
      {
        label: 'Optional — Extended Universe',
        sublabel: 'Hundreds of Dragonlance novels exist beyond these six',
        note: 'The core experience is the six books above. Everything below is optional — interesting for fans but not required.',
        noteType: 'optional',
        books: [
          { title: 'The Second Generation',      slug: 'the-second-generation',      status: 'optional',     note: 'Short stories featuring the children of the original Companions. Bridge to Dragons of Summer Flame.',          page_count: 389, publication_year: 1994 },
          { title: 'Dragons of Summer Flame',    slug: 'dragons-of-summer-flame',    status: 'optional',     note: 'Weis & Hickman return. A new war, a new dragon invasion. Leads into the Fifth Age era.',                      page_count: 506, publication_year: 1995 },
        ],
      },
    ],
    orderNote: 'Read Chronicles first, then Legends. The two trilogies are deeply intertwined — Legends only works if you know the Chronicles cast.',
    cards: [
      { title: '🐉 The Setting',      body: 'Krynn is a world of knights, gods, and dragon armies — high fantasy in the truest sense. The magic system (White/Red/Black robes) and the god-given magic of clerics shaped the D&D ruleset for decades.',         color: 'blue'   },
      { title: '🧙 Raistlin',         body: 'The mage Raistlin Majere is the reason Dragonlance endures. A frail, bitter genius consumed by ambition — morally grey before that was common in fantasy. The Legends trilogy is fundamentally his story.',        color: 'purple' },
      { title: '📖 Historical note',  body: 'Dragonlance was designed alongside the D&D game modules in 1984. It feels that way — structured, episodic, occasionally clunky. The Legends trilogy transcends its origins; Chronicles is more nostalgic than great.', color: 'amber'  },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'Start with Dragons of Autumn Twilight. It\'s episodic and occasionally slow but establishes the world and cast.',
          'If Chronicles feels dated, push through — the Legends trilogy is the payoff and it\'s significantly better.',
          'Already read Chronicles? Go straight to Legends. It\'s the reason Dragonlance is still read today.',
          'Only want to read one trilogy? Read Legends. You\'ll miss some context but it stands on its own better than Chronicles.',
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          'Chronicles was written to accompany D&D adventure modules — the pacing reflects this. Some chapters feel like game sessions.',
          'Raistlin is one of the first major antiheroes in fantasy. His arc in Legends is one of the genre\'s finest.',
          'The world has been expanded by over 190 novels by dozens of authors. Only the Weis & Hickman books are essential.',
          'A film adaptation (Dragons of Autumn Twilight, 2008) exists but is widely considered poor — ignore it.',
        ],
      },
    ],
    darkness: [
      { label: 'Chronicles Trilogy', level: 3, desc: 'Moderate — war, loss, and sacrifice throughout' },
      { label: 'Legends Trilogy',    level: 3, desc: 'Moderate — moral complexity, darker ambition, sacrifice' },
    ],
    finishedLabel: 'Finished Weis & Hickman?',
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['drizzt', 'wheel-of-time', 'cosmere'],
  },

  // ─── Divergent ─────────────────────────────────────────────────────────────
  {
    slug: 'divergent',
    name: 'Divergent',
    author: 'Veronica Roth',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Series Complete',
    description:
      'A YA dystopian trilogy set in a future Chicago divided into five factions — Dauntless, Erudite, Abnegation, Candor, Amity — each representing a single virtue taken to extremes. Sixteen-year-old Tris Prior chooses to leave her family\'s faction and discovers she is Divergent, a threat to the system. Fast-paced and addictive, with one of YA\'s most debated endings.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    warning: 'Allegiant (book 3) has a controversial ending that divided the fanbase strongly. Go in prepared.',
    groups: [
      {
        label: 'The Main Trilogy',
        sublabel: 'read in order',
        books: [
          { title: 'Divergent',  slug: 'divergent',  status: 'mandatory', note: 'Tris transfers to Dauntless and endures brutal initiation. World-building through immersion — fast, tense, immediately addictive.',               page_count: 487, publication_year: 2011 },
          { title: 'Insurgent',  slug: 'insurgent',  status: 'mandatory', note: 'The faction system cracks. Tris deals with survivor\'s guilt while uncovering the truth about her world. Darker and more emotionally demanding.',  page_count: 525, publication_year: 2012 },
          { title: 'Allegiant',  slug: 'allegiant',  status: 'mandatory', note: 'Tris and Four leave Chicago. Dual POV. The most ambitious and most divisive book — the ending is polarising but intentional.',                    page_count: 526, publication_year: 2013 },
        ],
      },
      {
        label: "Four's Novellas",
        sublabel: "Tobias's POV — collected in Four: A Divergent Collection (2014)",
        note: 'All five pieces retell key events from Four\'s perspective. Read after the main trilogy, in any order. Published individually then collected in one volume.',
        noteType: 'optional',
        books: [
          { title: 'Free Four',    slug: 'free-four',    status: 'supplementary', note: 'Short story (~30 pages). Four\'s POV during the aptitude test and Choosing Ceremony. A good teaser for his perspective.',                  page_count: 36,  publication_year: 2012 },
          { title: 'The Transfer', slug: 'the-transfer', status: 'supplementary', note: 'Four\'s Choosing Day and first weeks in Dauntless. His origin — why he left Abnegation.',                                                  page_count: 68,  publication_year: 2013 },
          { title: 'The Initiate', slug: 'the-initiate', status: 'supplementary', note: 'Four\'s second year as a Dauntless initiate. Covers events before Divergent begins.',                                                       page_count: 58,  publication_year: 2014 },
          { title: 'The Son',      slug: 'the-son',      status: 'supplementary', note: 'Four confronts his father Marcus. Short and dark — the most emotionally intense of the four novellas.',                                     page_count: 51,  publication_year: 2014 },
          { title: 'The Traitor',  slug: 'the-traitor',  status: 'supplementary', note: 'Four\'s POV during the events of Divergent. Fills in what he was doing while Tris was in initiation.',                                     page_count: 61,  publication_year: 2014 },
        ],
      },
      {
        label: 'After the Trilogy',
        sublabel: 'Epilogue & companion',
        books: [
          { title: 'We Can Be Mended',              slug: 'we-can-be-mended',              status: 'optional',     note: 'Short epilogue story (~40 pages) set five years after Allegiant. Written for fans who needed closure after the ending. Available free online.',     page_count: 40,  publication_year: 2018 },
          { title: 'The World of Divergent',        slug: 'the-world-of-divergent',        status: 'supplementary', note: 'Behind-the-scenes companion — Roth\'s path to Allegiant, faction manifestos, quiz. Non-fiction. For fans only.',                                  page_count: 100, publication_year: 2013 },
        ],
      },
    ],
    orderNote: 'Read the main trilogy first. The Four novellas cover the same timeline from his POV — best after Allegiant so you already know the full story. We Can Be Mended is the emotional coda if you need it.',
    cards: [
      { title: '⚡ The Hook',         body: 'The faction system is an instantly compelling premise — which virtue would you choose? The initiation sequences in Dauntless are some of the most gripping in YA dystopian fiction.',                              color: 'blue'   },
      { title: '💔 The Ending',       body: 'Allegiant\'s ending is one of the most discussed in YA fiction. It is intentional and consistent with Tris\'s character. Prepare yourself — then decide for yourself if it works.',                              color: 'amber'  },
      { title: '🎬 The Adaptations', body: 'The film series (2014–2016) covers Divergent and Insurgent well. Allegiant was split into two films and the second was never made — the story is unresolved on screen. Read the books.',                         color: 'purple' },
    ],
    sections: [
      {
        heading: 'Where to start',
        type: 'bullets',
        bullets: [
          'Start with Divergent — no prior reading needed. The world is explained through Tris\'s eyes.',
          'Read all three back-to-back if possible — the story benefits from momentum and the wait between Insurgent and Allegiant is brutal.',
          "The Four novellas and We Can Be Mended are optional — best after Allegiant. We Can Be Mended is free online and worth reading if the ending hit hard.",
        ],
      },
      {
        heading: 'What to know',
        type: 'bullets',
        bullets: [
          'The series gets progressively darker. Divergent is action-focused; Allegiant deals with loss, identity, and sacrifice.',
          'Allegiant uses dual POV (Tris and Four alternating chapters) — a change from the first two books.',
          'The faction concept is intentionally reductive — the books are aware of this and deconstruct it over the trilogy.',
          'The film adaptations cover books 1 and 2 well. Allegiant\'s film split the story and was never finished.',
        ],
      },
    ],
    darkness: [
      { label: 'Divergent',  level: 3, desc: 'Moderate — action and training, some violence' },
      { label: 'Insurgent',  level: 3, desc: 'Darker — trauma, guilt, heavier losses' },
      { label: 'Allegiant',  level: 4, desc: 'Dark — significant sacrifice, controversial conclusion' },
    ],
    finishedLabel: 'Finished the trilogy?',
    categoryHref: '/fantasy/academy',
    categoryLabel: 'Browse Academy Fantasy',
    related: ['throne-of-glass', 'empyrean'],
  },

  // ─── Memory, Sorrow and Thorn ──────────────────────────────────────────────
  {
    slug: 'memory-sorrow-thorn',
    name: 'Memory, Sorrow and Thorn',
    author: 'Tad Williams',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Series Complete',
    description:
      'The epic fantasy series that shaped a generation of writers — George R.R. Martin and Patrick Rothfuss have both cited it as a direct influence. A young kitchen scullion is pulled into an ancient war between human kingdoms and the immortal Sithi as a long-buried prophecy stirs. Williams writes with rare patience and emotional depth — this is the series that proved epic fantasy could be literature.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    groups: [
      {
        label: 'The Main Trilogy',
        sublabel: 'read in order',
        books: [
          { title: 'Brothers of the Wind',  slug: 'brothers-of-the-wind',  status: 'supplementary', note: 'Prequel novella (~256 pages) set long before the trilogy, during the original war with the Norns. Deep lore for Sithi fans — read before the trilogy or save it for after.',                                    page_count: 256,  publication_year: 2021 },
          { title: 'The Dragonbone Chair',  slug: 'the-dragonbone-chair',  status: 'mandatory',     note: 'Start here. Simon, a kitchen boy, is thrust into a war he barely understands. Slow, immersive opening — trust the build.',                                                                                      page_count: 672,  publication_year: 1988 },
          { title: 'Stone of Farewell',     slug: 'stone-of-farewell',     status: 'mandatory',     note: 'The war deepens across multiple POVs. Williams broadens the world and the mythology. The middle volume at its best.',                                                                                            page_count: 588,  publication_year: 1990 },
          { title: 'To Green Angel Tower',       slug: 'to-green-angel-tower',       status: 'mandatory',     note: 'The conclusion. Originally published as a single ~1080-page hardcover; most paperback editions split it into two volumes (Storm and Siege). One of the most satisfying endings in epic fantasy.',                                                                                                        page_count: 1083, publication_year: 1993 },
          { title: 'The Heart of What Was Lost', slug: 'the-heart-of-what-was-lost', status: 'supplementary', note: 'Short novel (~240 pages) set immediately after the trilogy\'s end. Follows the Norns retreating north. Bridges the original series and the tetralogy — not required, but highly recommended before starting The Witchwood Crown.', page_count: 240,  publication_year: 2017 },
        ],
      },
      {
        label: 'The Last King of Osten Ard',
        sublabel: 'tetralogy — set 30 years after the trilogy',
        books: [
          { title: 'The Witchwood Crown',      slug: 'the-witchwood-crown',      status: 'optional', note: 'Simon and Miriamele are now king and queen. A new generation faces an ancient threat returning. Slower burn than the original — give it time.',       page_count: 800, publication_year: 2017 },
          { title: 'Empire of Grass',          slug: 'empire-of-grass',          status: 'optional', note: 'The threat grows across a fractured kingdom. Multiple POVs. Best read back-to-back with The Witchwood Crown.',                                         page_count: 752, publication_year: 2019 },
          { title: 'Into the Narrowdark',      slug: 'into-the-narrowdark',      status: 'optional', note: 'The penultimate volume. Things unravel. Sets up the finale with brutal efficiency.',                                                                   page_count: 736, publication_year: 2023 },
          { title: "The Navigator's Children", slug: 'the-navigators-children',  status: 'optional', note: 'The conclusion of the tetralogy. Closes the entire Osten Ard saga.',                                                                                   page_count: 736, publication_year: 2024 },
        ],
      },
    ],
    orderNote: 'Start with the main trilogy. To Green Angel Tower may arrive as one hardcover or two paperback volumes (Storm and Siege) — both contain the same text. The Heart of What Was Lost is the ideal bridge before the tetralogy.',
    warning: 'To Green Angel Tower was published as a single ~1080-page hardcover but split into two paperback volumes in most markets. Make sure you have both parts (Storm and Siege) before you begin the conclusion.',
    sections: [
      {
        heading: 'Why it matters',
        type: 'bullets',
        bullets: [
          'Published 1988–1993, it predates A Song of Ice and Fire and is a direct influence on Martin — the political complexity, the grey morality, the willingness to let characters suffer.',
          'Rothfuss has described it as one of the works that made him want to write fantasy.',
          "Williams' Sithi are among the most alien and convincing immortal races in fantasy — not Tolkien elves, but something stranger.",
          'Simon Snowlock is one of the genre\'s great coming-of-age protagonists — he starts as a foolish boy and earns every inch of his growth.',
          'The pacing is deliberately novelistic — this is not a plot-delivery machine. Give it space.',
        ],
      },
      {
        heading: 'One book or two?',
        type: 'prose',
        prose: "To Green Angel Tower was written as a single novel. The hardcover is one volume (~1080 pages). Most paperback editions split it into Storm (Part 1) and Siege (Part 2) — both contain the same text. Either edition is fine, just make sure you have both halves before you begin the conclusion.",
      },
    ],
    darkness: [
      { label: 'The Dragonbone Chair', level: 2, desc: 'Epic in scope but accessible — war seen through a young man\'s eyes' },
      { label: 'Stone of Farewell',    level: 3, desc: 'Darker, more political — loss and sacrifice increase' },
      { label: 'To Green Angel Tower', level: 3, desc: 'War, grief, and hard-earned resolution — earned emotional weight' },
    ],
    finishedLabel: 'Finished the trilogy?',
    categoryHref: '/fantasy/epic',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['wheel-of-time', 'malazan', 'robin-hobb'],
  },

  // ─── Kate Daniels ──────────────────────────────────────────────────────────
  {
    slug: 'kate-daniels',
    name: 'World of Kate Daniels',
    author: 'Ilona Andrews',
    seriesStatus: 'complete',
    seriesStatusLabel: '✓ Series Complete',
    description:
      'Post-apocalyptic Atlanta where magic and technology take turns failing. When magic is up, cars stop and spells work. When technology is up, guns fire and WiFi returns. Kate Daniels is a mercenary hiding a dangerous bloodline, navigating a city full of shapeshifters, vampires, and ancient gods. Fast, funny, and brutally efficient — one of urban fantasy\'s best series, and one that gets dramatically better as it goes.',
    darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
    groups: [
      {
        label: 'The Main Series',
        sublabel: 'novellas interleaved at the point they should be read',
        books: [
          { title: 'A Questionable Client', slug: 'a-questionable-client', status: 'supplementary', note: 'Prequel short story (~50 pages). Kate takes a bodyguard job. Good introduction to the world — collected in the anthology Magic: An Anthology of the Fantastic.',                    page_count: 50,  publication_year: 2013 },
          { title: 'Magic Bites',           slug: 'magic-bites',           status: 'mandatory',     note: 'Start here. Short and fast (~260 pages). Kate as a lone mercenary. Sets up the world, the magic/tech alternation, and the Pack. Not the best book — stick with it.',               page_count: 261, publication_year: 2007 },
          { title: 'Magic Burns',           slug: 'magic-burns',           status: 'mandatory',     note: 'Better than book 1. Introduces Julie. The mythology deepens and the pacing tightens.',                                                                                               page_count: 260, publication_year: 2008 },
          { title: 'Magic Strikes',         slug: 'magic-strikes',         status: 'mandatory',     note: 'The series finds its stride. Underground fighting tournament. Curran and Kate\'s dynamic shifts significantly.',                                                                     page_count: 291, publication_year: 2009 },
          { title: 'Magic Mourns',          slug: 'magic-mourns',          status: 'supplementary', note: 'Andrea\'s story (~90 pages). Read after Magic Strikes (#3). Collected in Must Love Hellhounds.',                                                                                    page_count: 90,  publication_year: 2009 },
          { title: 'Magic Bleeds',          slug: 'magic-bleeds',          status: 'mandatory',     note: 'The emotional centrepiece of the series. Everything about the Kate/Curran relationship lands here. Many fans consider this the best book.',                                          page_count: 308, publication_year: 2010 },
          { title: 'Magic Dreams',          slug: 'magic-dreams',          status: 'supplementary', note: 'Jim and Dali\'s story (~110 pages). Read after Magic Bleeds (#4). Collected in Hex Appeal.',                                                                                        page_count: 110, publication_year: 2012 },
          { title: 'Magic Slays',           slug: 'magic-slays',           status: 'mandatory',     note: 'Kate and Curran deal with running the Pack. Stakes escalate. Kate\'s hidden heritage moves to the foreground.',                                                                     page_count: 305, publication_year: 2011 },
          { title: 'Magic Tests',           slug: 'magic-tests',           status: 'supplementary', note: 'Julie\'s short story (~32 pages). Kate recruits her ward to investigate a missing student at a magical academy. Read after Magic Slays (#5). Collected in An Apple for the Creature and Small Magics.', page_count: 32, publication_year: 2012 },
          { title: 'Magic Rises',           slug: 'magic-rises',           status: 'mandatory',     note: 'Europe. Darker than previous entries. A brutal mid-series gut-punch that forces major change.',                                                                                     page_count: 339, publication_year: 2013 },
          { title: 'Magic Gifts',           slug: 'magic-gifts',           status: 'supplementary', note: 'Kate and Curran novella (~60 pages). Read after Magic Rises (#6). Originally a free online release.',                                                                               page_count: 60,  publication_year: 2011 },
          { title: 'Magic Breaks',          slug: 'magic-breaks',          status: 'mandatory',     note: 'War with Roland begins in earnest. The political and personal collide.',                                                                                                            page_count: 353, publication_year: 2014 },
          { title: 'Magic Steals',          slug: 'magic-steals',          status: 'supplementary', note: 'Jim and Dali novella (~100 pages). Read after Magic Breaks (#7). Collected in An Apple for the Creature.',                                                                         page_count: 100, publication_year: 2014 },
          { title: 'Magic Shifts',          slug: 'magic-shifts',          status: 'mandatory',     note: 'New chapter for Kate and Curran. Egyptian mythology threat. One of the strongest entries in the back half.',                                                                        page_count: 353, publication_year: 2015 },
          { title: 'Magic Binds',           slug: 'magic-binds',           status: 'mandatory',     note: 'Everything converges. Roland\'s full menace revealed. High stakes on every personal front.',                                                                                        page_count: 320, publication_year: 2016 },
          { title: 'Magic Stars',           slug: 'magic-stars',           status: 'supplementary', note: 'Derek\'s story (~170 pages). Read after Magic Binds (#9). Grey Wolf spinoff #1.',                                                                                                  page_count: 170, publication_year: 2015 },
          { title: 'Magic Triumphs',        slug: 'magic-triumphs',        status: 'mandatory',     note: 'The finale. Emotionally earned conclusion to a 10-book arc. Does not disappoint.',                                                                                                 page_count: 369, publication_year: 2018 },
        ],
      },
      {
        label: 'Spinoffs & World Expansion',
        sublabel: 'set in the same world — read after the main series',
        books: [
          { title: 'Gunmetal Magic', slug: 'gunmetal-magic', status: 'optional', note: 'Andrea\'s full novel. Best read after Magic Slays (#5) or after the main series. Same world, different protagonist — just as good.',                                        page_count: 353, publication_year: 2012 },
          { title: 'Iron and Magic', slug: 'iron-and-magic', status: 'optional', note: 'Hugh d\'Ambray\'s redemption story. Read after Magic Triumphs — his arc only lands with full context from the main series.',                                               page_count: 341, publication_year: 2018 },
          { title: 'Blood Heir',     slug: 'blood-heir',     status: 'optional', note: 'Julie\'s story — direct sequel to the main series. Read after Magic Triumphs.',                                                                                            page_count: 323, publication_year: 2021 },
          { title: 'Magic Tides',    slug: 'magic-tides',    status: 'optional', note: 'Novella continuing the world post-Kate Daniels. Part of the expanding Wilmington Years arc.',                                                                              page_count: 160, publication_year: 2023 },
          { title: 'Magic Claims',   slug: 'magic-claims',   status: 'optional', note: 'Continues the Wilmington Years storyline.',                                                                                                                                page_count: 200, publication_year: 2023 },
          { title: 'Sanctuary',      slug: 'sanctuary',      status: 'optional', note: 'Latest Kate Daniels world expansion (2024). The world keeps growing post-Magic Triumphs.',                                                                          page_count: 300, publication_year: 2024 },
        ],
      },
    ],
    orderNote: 'The first two books are the weakest — short, rough around the edges, and setting the table. By Magic Strikes the series has found itself. By Magic Bleeds it is exceptional. Push through the opening if it feels slow.',
    cards: [
      { title: '📖 Core (10 books)',    body: 'The main series. Read in order — each book builds directly on the last and the arc pays off properly only at the end.',                                                             color: 'blue'  },
      { title: '📝 Novellas (7)',       body: 'Short companion stories interleaved at the right points. All supplementary — skip freely, or read them in place for extra depth on side characters.',                               color: 'green' },
      { title: '🌍 Spinoffs (6 books)', body: 'Same world, different protagonists. Gunmetal Magic and Blood Heir are the most essential. Best read after finishing the main 10.',                                                  color: 'amber' },
    ],
    sections: [
      {
        heading: 'The magic/tech alternation',
        type: 'prose',
        prose: "The world runs on a Shift — waves of magic and technology alternate unpredictably. When magic is up, cars won't start, guns sometimes misfire, and spells work. When technology is up, the magic fades and the modern world briefly reasserts itself. This mechanic drives both plot and character — the Pack, vampires, and gods all operate on magic; the mercenary guild and Order of Knights run on tech and politics. It's one of urban fantasy's most original world-building conceits.",
      },
      {
        heading: 'The romance',
        type: 'bullets',
        bullets: [
          'Kate and Curran (the Beast Lord, a werelion) have one of urban fantasy\'s best slow-burn central romances.',
          'It is present from book 1 but doesn\'t dominate — this is action-first, romance second.',
          'Magic Bleeds (book 4) is where the relationship resolves. The payoff is earned.',
          'Later books explore what happens after the romance is established — refreshingly rare in the genre.',
        ],
      },
      {
        heading: 'Why the first books feel different',
        type: 'bullets',
        bullets: [
          'Magic Bites and Magic Burns were written early in Ilona Andrews\' career and are noticeably shorter (~260 pages) and rougher.',
          'The prose tightens, the humour sharpens, and the world deepens from book 3 onward.',
          'Many readers consider Magic Strikes (#3) the true starting point for the series\' quality.',
          'The opening books are still worth reading for context — they are just not representative of what the series becomes.',
        ],
      },
    ],
    darkness: [
      { label: 'Books 1–3',  level: 2, desc: 'Action-heavy urban fantasy — violence, monsters, light stakes' },
      { label: 'Books 4–7',  level: 3, desc: 'Personal losses, political menace, higher emotional cost' },
      { label: 'Books 8–10', level: 3, desc: 'War-level stakes — deaths, sacrifice, series-wide consequences' },
    ],
    finishedLabel: 'Finished Kate Daniels?',
    categoryHref: '/fantasy/urban',
    categoryLabel: 'Browse Urban Fantasy',
    related: ['dresden-files', 'witcher'],
  },

  // ─── Chronicles of the Black Company ───────────────────────────────────────
  {
    slug: 'black-company',
    name: 'Chronicles of the Black Company',
    author: 'Glen Cook',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '📖 Ongoing — new book expected 2026',
    description:
      'One of the founding texts of grimdark fantasy — written years before the term existed. The Black Company is a mercenary band that has served under a succession of employers for centuries, keeping its Annals as it goes. The books are narrated by the Company\'s physician and historian, Croaker, in a clipped, unsentimental military voice unlike anything else in the genre. No chosen ones. No prophecy. Just soldiers doing terrible things in service of worse masters, and somehow finding loyalty worth dying for.',
    darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
    groups: [
      {
        label: 'The Books of the North',
        sublabel: 'the original trilogy — start here',
        books: [
          { title: 'The Black Company', slug: 'the-black-company', status: 'mandatory',     seriesLabel: 'The Black Company #1',   note: 'Start here. The Company takes service under the Lady, one of the most powerful — and evil — magic users alive. Cook\'s terse military voice is unlike anything in the genre. The first 50 pages are deliberately disorienting; this is intentional.',  page_count: 319, publication_year: 1984 },
          { title: 'Port of Shadows',   slug: 'port-of-shadows',   status: 'supplementary', seriesLabel: 'The Black Company #1.5', note: 'Written 33 years after the original trilogy, set between books 1 and 2 — the Company in garrison during a quiet period. More atmospheric than plot-driven. Rewards familiarity with Croaker and the Lady.',                                           page_count: 337, publication_year: 2018 },
          { title: 'Shadows Linger',    slug: 'shadows-linger',    status: 'mandatory',     seriesLabel: 'The Black Company #2',   note: 'Darker and tighter than book 1. The Black Castle at Juniper. Dual POV adds a civilian perspective on what the Company leaves in its wake.',                                                                                                            page_count: 296, publication_year: 1984 },
          { title: 'The White Rose',    slug: 'the-white-rose',    status: 'mandatory',     seriesLabel: 'The Black Company #3',   note: 'The original trilogy concludes. The Lady, the Dominator, the White Rose — everything from books 1–2 resolves. One of the most surprising endings in grimdark.',                                                                                        page_count: 319, publication_year: 1985 },
        ],
      },
      {
        label: 'The Books of the South',
        sublabel: 'the Company moves south — new continent, new enemies',
        books: [
          { title: 'The Silver Spike', slug: 'the-silver-spike', status: 'optional',  seriesLabel: 'The Black Company #3.5', note: 'Parallel story set during the march south — follows characters left behind in the north after The White Rose. Read before Shadow Games for chronological order.',    page_count: 296, publication_year: 1989 },
          { title: 'Shadow Games',     slug: 'shadow-games',     status: 'mandatory', seriesLabel: 'The Black Company #4', note: 'The Company marches south toward Khatovar, their mythical origin. New landscape, new tone — more mythological and strange than the original trilogy.',  page_count: 300, publication_year: 1989 },
          { title: 'Dreams of Steel',  slug: 'dreams-of-steel',  status: 'mandatory', seriesLabel: 'The Black Company #5', note: 'The aftermath of catastrophe. Lady takes centre stage. The series reinvents itself mid-run without losing momentum.',                                   page_count: 305, publication_year: 1990 },
        ],
      },
      {
        label: 'Glittering Stone',
        sublabel: 'the final arc — the long march to Khatovar',
        books: [
          { title: 'Bleak Seasons',       slug: 'bleak-seasons',       status: 'mandatory', seriesLabel: 'The Black Company #6',  note: 'Non-linear narrative — Murgen\'s fractured memories. Disorienting by design. The Company is trapped and things are very bad.',                                                                                                                                          page_count: 304, publication_year: 1996 },
          { title: 'She Is the Darkness', slug: 'she-is-the-darkness', status: 'mandatory', seriesLabel: 'The Black Company #7',  note: 'The longest and most ambitious book in the series. Converging armies, converging secrets. The full scope of what the Company has been marching toward begins to emerge.',                                                                              page_count: 494, publication_year: 1997 },
          { title: 'Water Sleeps',        slug: 'water-sleeps',        status: 'mandatory', seriesLabel: 'The Black Company #8',  note: 'The Company is shattered, scattered, and hunted. Driven by Sleepy, one of the series\' best protagonists. Guerrilla warfare and slow-burn revenge.',                                                                                                  page_count: 351, publication_year: 1999 },
          { title: 'Soldiers Live',       slug: 'soldiers-live',       status: 'mandatory', seriesLabel: 'The Black Company #9',  note: 'The conclusion of the Glittering Stone arc. Everything the Annals have been building toward. Croaker returns as narrator. One of the most honest endings in fantasy — not triumphant, not tragic, just true.',                                        page_count: 448, publication_year: 2000 },
          { title: 'They Cry',            slug: 'they-cry',            status: 'upcoming',  seriesLabel: 'The Black Company #11', note: 'Upcoming — November 2026. Arkana and Shukrat return to An Abode of Raven with new powers; the Steadfast Guardian (Croaker) struggles to hold his humanity while dark forces mobilise against the Company on Hsien.',                                 page_count: 400, publication_year: 2026 },
        ],
      },
    ],
    orderNote: 'Read The Chronicles first (books 1–3) — they stand alone and are the best entry point. Port of Shadows is an optional interquel between books 1 and 2. The Books of the South and Glittering Stone follow directly. The Silver Spike sits before Shadow Games in chronological order.',
    warning: 'Bleak Seasons (book 6) opens with a deliberately fractured, non-linear narrative. This is Cook\'s intentional choice — push through. The timeline becomes clear and the payoff is worth the initial confusion.',
    cardsPosition: 'above',
    cards: [
      { title: '📖 Start with the North',    body: 'The Black Company, Shadows Linger, The White Rose — the original trilogy is self-contained and the best entry point. Many readers stop here and feel satisfied. The rest of the series rewards those who continue.',            color: 'blue'   },
      { title: '⚠️ Brace for Bleak Seasons', body: 'Book 6 opens with a deliberately fractured, non-linear narrative. Push through — the disorientation is intentional and the timeline resolves. Every book after it is stronger for the confusion.',                         color: 'amber'  },
      { title: '🏁 Soldiers Live Is Worth It', body: 'The Glittering Stone arc is slower and stranger than the North trilogy, but Soldiers Live delivers one of the most honest endings in fantasy. No triumphalism — just soldiers, and what it cost.',                      color: 'purple' },
    ],
    sections: [
      {
        heading: 'Why it matters',
        type: 'bullets',
        bullets: [
          'Published in 1984 — The Black Company predates A Song of Ice and Fire, The First Law, and every modern grimdark series. It invented the template.',
          'George R.R. Martin, Joe Abercrombie, and Steven Erikson have all cited it as a direct influence. Malazan Book of the Fallen would not exist without it.',
          'Cook\'s prose is deliberately unadorned — clipped, military, journalistic. The Annals are written by a soldier, not a storyteller. This is a feature, not a bug.',
          'The moral ambiguity is structural. The Company serves evil employers. The characters know this and keep serving. The books are about what loyalty costs.',
          'Women in the series — Lady, Soulcatcher, the White Rose — are among the most genuinely powerful and dangerous characters in fantasy.',
        ],
      },
      {
        heading: 'The Annals voice',
        type: 'prose',
        prose: "Every book is narrated by the Company's Annalist — their physician-historian, responsible for keeping the official record. The voice is Croaker's for most of the series: dry, self-deprecating, occasionally sardonic. He records what he sees and admits what he doesn't know. This unreliable, limited perspective is central to the series' appeal — you piece together the larger picture from the ground level, just like the soldiers do.",
      },
      {
        heading: 'Reading Bleak Seasons',
        type: 'prose',
        prose: "Bleak Seasons opens with Murgen narrating from fractured, non-linear memory — he is haunted and displaced in time. Many readers bounce off this. Stick with it: the disorientation is deliberate and the timeline resolves. If you've made it through the first five books, Cook has earned your trust here.",
      },
    ],
    darkness: [
      { label: 'The Chronicles (1–3)',     level: 5, desc: 'War, atrocity, and complicity — morally compromised from page one' },
      { label: 'Books of the South (4–5)', level: 5, desc: 'Darker mythology, higher body count, catastrophic defeats' },
      { label: 'Glittering Stone (6–9)',   level: 5, desc: 'Brutally honest about cost — no heroism left, only endurance' },
    ],
    finishedLabel: 'Finished the Annals?',
    categoryHref: '/fantasy/grimdark',
    categoryLabel: 'Browse Grimdark Fantasy',
    related: ['first-law', 'malazan'],
  },

  // ─── Dragonriders of Pern ──────────────────────────────────────────────────
  {
    slug: 'pern',
    name: 'Dragonriders of Pern',
    author: 'Anne McCaffrey',
    seriesStatus: 'complete',
    seriesStatusLabel: '✅ Complete — 24 novels',
    description:
      'One of the most beloved science fantasy series ever written — set on a planet where dragonriders bond with telepathic dragons to fight the deadly spore known as Thread. Pern reads like pure fantasy but is technically science fiction: the dragons are bioengineered, the world is a lost colony. McCaffrey never lets the science get in the way of the story. At its heart this is a series about the bond between rider and dragon, class and tradition versus change, and what it costs to protect a world that doesn\'t always appreciate the protection.',
    darknessDisplay: '🕯️🕯️ Mild',
    orderNote: 'Start with the original Dragonriders trilogy. The Harper Hall trilogy is YA but essential — read it alongside or immediately after Dragonquest. Dragonsdawn is the chronological origin story but works best once you love the world, not as an entry point.',
    warning: 'Some early Pern books contain dated attitudes toward gender and consent that reflect their 1960s–70s publication era. The Harper Hall trilogy and later books are notably better in this regard.',
    groups: [
      {
        label: 'Dragonriders Trilogy',
        sublabel: 'start here — the foundation of Pern',
        books: [
          { title: 'Dragonflight',    slug: 'dragonflight',    status: 'mandatory', seriesLabel: 'Pern #1', note: 'Start here. Lessa impresses queen dragon Ramoth and becomes Weyrwoman as the deadly Thread returns after 400 years. Groundbreaking when published — still a page-turner.',          page_count: 309, publication_year: 1968 },
          { title: 'Dragonquest',     slug: 'dragonquest',     status: 'mandatory', seriesLabel: 'Pern #2', note: 'F\'nor and bronze Canth take centre stage. The conflict between tradition and necessity deepens. Read the Harper Hall trilogy alongside or immediately after this.',               page_count: 331, publication_year: 1971 },
          { title: 'The White Dragon', slug: 'the-white-dragon', status: 'mandatory', seriesLabel: 'Pern #5', note: 'Jaxom and the unique white dragon Ruth. A coming-of-age story woven into a larger mystery about Pern\'s past. Best book in the series by consensus — read after Harper Hall.',  page_count: 497, publication_year: 1978 },
        ],
      },
      {
        label: 'Harper Hall Trilogy',
        sublabel: 'YA — read alongside the main trilogy',
        note: 'Set concurrently with the main trilogy. Menolly\'s story is among the best in the series. Do not skip.',
        noteType: 'optional',
        books: [
          { title: 'Dragonsong',   slug: 'dragonsong',   status: 'mandatory', seriesLabel: 'Harper Hall #1', note: 'Menolly, a girl forbidden from music, finds fire lizards — the tiny ancestors of dragons. One of McCaffrey\'s finest books. Works as a standalone entry point, especially for younger readers.',           page_count: 202, publication_year: 1976 },
          { title: 'Dragonsinger', slug: 'dragonsinger', status: 'mandatory', seriesLabel: 'Harper Hall #2', note: 'Menolly arrives at Harper Hall. The politics of craft mastery and the cost of talent. Reads fast — you\'ll finish it the same day.',                                                                      page_count: 264, publication_year: 1977 },
          { title: 'Dragondrums',  slug: 'dragondrums',  status: 'optional',  seriesLabel: 'Harper Hall #3', note: 'Switches protagonist to Piemur. Less essential than the first two but rounds out the Harper Hall world nicely. Read before The White Dragon.',                                                              page_count: 243, publication_year: 1979 },
        ],
      },
      {
        label: 'Pern History & Expansion',
        sublabel: 'deeper Pern — best after the core books',
        books: [
          { title: 'Dragonsdawn',               slug: 'dragonsdawn',               status: 'optional',      seriesLabel: 'Pern #8',  note: 'The origin story — the colonists arrive on Pern and the first dragons are created. Spoils some mysteries if read first. Rewards readers who already love the world.',                                               page_count: 384, publication_year: 1988 },
          { title: 'Moreta: Dragonlady of Pern', slug: 'moreta-dragonlady-of-pern', status: 'optional',      seriesLabel: 'Pern #6',  note: 'Set 1,500 turns before Dragonflight during a deadly plague. A standalone tragedy — bittersweet and beautifully written. Best read after the main trilogy.',                                                         page_count: 302, publication_year: 1983 },
          { title: 'Nerilka\'s Story',           slug: 'nerilkas-story',            status: 'supplementary', seriesLabel: 'Pern #7',  note: 'Short companion novella to Moreta — same plague, different perspective. Only meaningful if you loved Moreta.',                                                                                                      page_count: 224, publication_year: 1986 },
          { title: 'The Renegades of Pern',      slug: 'the-renegades-of-pern',     status: 'optional',      seriesLabel: 'Pern #9',  note: 'Parallel events to the main trilogy from the perspective of holdless outcasts. Fills in background and resolves loose threads. Best for committed fans.',                                                           page_count: 384, publication_year: 1989 },
          { title: 'All the Weyrs of Pern',      slug: 'all-the-weyrs-of-pern',     status: 'optional',      seriesLabel: 'Pern #10', note: 'AIVAS — the ancient computer awakens. Pern\'s science fiction roots become explicit here. Divisive but important for the overall arc.',                                                                               page_count: 384, publication_year: 1991 },
          { title: 'The Masterharper of Pern',   slug: 'the-masterharper-of-pern',  status: 'optional',      seriesLabel: 'Pern #15', note: 'Robinton\'s life from childhood to his role in the main trilogy. A love letter to the Harper Hall. Essential for anyone who fell for Robinton in the earlier books.',                                                  page_count: 432, publication_year: 1998 },
          { title: 'The Skies of Pern',          slug: 'the-skies-of-pern',         status: 'optional',      seriesLabel: 'Pern #16', note: 'Final Anne McCaffrey solo Pern novel. Deals with the aftermath of Thread\'s end and a new source of conflict. A gentle farewell from McCaffrey to the world she built.',                                              page_count: 368, publication_year: 2001 },
        ],
      },
      {
        label: 'Extra & Short Fiction',
        sublabel: 'completionists only',
        books: [
          { title: 'The Chronicles of Pern: First Fall', slug: 'the-chronicles-of-pern-first-fall', status: 'supplementary', seriesLabel: 'Pern #11', note: 'Five short stories covering the earliest days of the colony and the first Thread falls. Interesting background but not essential.',           page_count: 245, publication_year: 1993 },
          { title: 'The Dolphins of Pern',               slug: 'the-dolphins-of-pern',               status: 'supplementary', seriesLabel: 'Pern #12', note: 'T\'lion and his dolphin partner. A gentle, low-stakes side story. More for younger readers or completionists.',                                page_count: 340, publication_year: 1994 },
          { title: 'A Gift of Dragons',                  slug: 'a-gift-of-dragons',                  status: 'supplementary', seriesLabel: 'Pern #17', note: 'Four short stories, one previously unpublished. Light reading — a treat for fans rather than essential Pern.',                                 page_count: 160, publication_year: 2002 },
        ],
      },
    ],
    cardsPosition: 'above',
    cards: [
      { title: '🐉 Two Entry Points',      body: 'Start with Dragonflight if you want the full epic sweep — Lessa impressing a queen dragon as Thread returns after 400 years. Or start with Dragonsong if you prefer a quieter, character-driven opening. Both lead you to the same world.', color: 'blue'  },
      { title: '🎵 Don\'t Skip Harper Hall', body: 'The Harper Hall trilogy runs parallel to the main series and is among McCaffrey\'s best writing. Dragonsong and Dragonsinger are essential, not optional extras. Read them alongside or immediately after Dragonquest — before The White Dragon.', color: 'blue'  },
      { title: '📖 Stop After the Core',   body: 'The first six books (Dragonriders trilogy + Harper Hall) are Pern at its best. The expansion novels are for readers who love the world and want more — Dragonsdawn and Moreta are the highlights. The short fiction is completionist territory only.', color: 'green' },
    ],
    sections: [
      {
        heading: 'What makes Pern special',
        type: 'bullets',
        bullets: [
          'The dragon-rider bond is one of the most emotionally resonant relationships in all of fantasy — telepathic, lifelong, and ended only by death. When a dragon dies, the rider often does not survive the grief.',
          'Pern is technically science fiction — the planet is a lost colony, the dragons are bioengineered from native fire lizards. McCaffrey won the Hugo and Nebula for it. The SF roots never overwhelm the fantasy feel.',
          'The Harper Hall trilogy is YA before YA was a marketing category. Dragonsong works as a standalone for readers who prefer a quieter, character-driven entry point.',
          'The series spans thousands of years of in-world history across its 24 novels — from the first colony landing (Dragonsdawn) to the end of Thread (The Skies of Pern).',
        ],
      },
      {
        heading: 'On the reading order',
        type: 'prose',
        prose: "Publication order is not chronological. Dragonsdawn, published in 1988, is set thousands of years before Dragonflight. Reading it first spoils the mystery of Pern's origins that the earlier books slowly reveal. Start with Dragonflight and the Harper Hall trilogy — let the world enchant you before you learn how it was built.",
      },
    ],
    darkness: [
      { label: 'Main trilogy',       level: 2, desc: 'Some violence and threat — Thread is genuinely dangerous — but light overall' },
      { label: 'Harper Hall',        level: 1, desc: 'YA — the darkest element is social cruelty and parental neglect' },
      { label: 'Expansion novels',   level: 3, desc: 'Moreta is the darkest — plague, sacrifice, and tragedy' },
    ],
    finishedLabel: 'Finished Pern?',
    categoryHref: '/fantasy/epic/',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['wheel-of-time', 'memory-sorrow-thorn', 'robin-hobb'],
  },

  // ─── Inheritance Cycle ────────────────────────────────────────────────────
  {
    slug: 'inheritance-cycle',
    name: 'The Inheritance Cycle',
    author: 'Christopher Paolini',
    seriesStatus: 'complete',
    seriesStatusLabel: '✅ Complete — 4 novels + companion works',
    description:
      'One of the most remarkable debut achievements in fantasy — Christopher Paolini began writing Eragon at fifteen and published it at seventeen. The Inheritance Cycle follows Eragon, a farm boy who discovers a dragon egg and is pulled into a war against the tyrant king Galbatorix. The Star Wars and Lord of the Rings influences in the first book are impossible to miss, but Paolini genuinely grows as a writer across four volumes. By Brisingr and Inheritance the world has real depth, the magic system has genuine teeth, and the stakes feel earned. This is the series that made a generation of readers fall in love with dragons.',
    darknessDisplay: '🕯️🕯️ Mild',
    orderNote: 'Read the four main books in order — they form one continuous story. The Fork, the Witch, and the Worm and Murtagh are best read after finishing Inheritance.',
    groups: [
      {
        label: 'The Inheritance Cycle',
        sublabel: 'the complete tetralogy — read in order',
        books: [
          { title: 'Eragon',      slug: 'eragon',      status: 'mandatory', seriesLabel: 'Inheritance Cycle #1', note: 'Start here. A farm boy, a dragon egg, and a world under a tyrant king. The Lord of the Rings and Star Wars bones are visible but the enthusiasm is infectious. Paolini was fifteen when he wrote this — the ambition alone is remarkable.',  page_count: 503, publication_year: 2003 },
          { title: 'Eldest',      slug: 'eldest',      status: 'mandatory', seriesLabel: 'Inheritance Cycle #2', note: 'Eragon trains with the elves while Roran fights back home in Carvahall. The dual storyline expands the world significantly. Paolini is visibly maturing — the elf culture and magic theory are more developed than anything in book 1.',              page_count: 668, publication_year: 2005 },
          { title: 'Brisingr',    slug: 'brisingr',    status: 'mandatory', seriesLabel: 'Inheritance Cycle #3', note: 'Originally planned as the trilogy finale, the story grew too large. The Ancient Language magic system gets its deepest exploration. Long but rewarding — the Paolini who wrote this is a different writer to the fifteen-year-old who started Eragon.',  page_count: 748, publication_year: 2008 },
          { title: 'Inheritance', slug: 'inheritance', status: 'mandatory', seriesLabel: 'Inheritance Cycle #4', note: 'The conclusion. The final confrontation with Galbatorix is one of the most creative boss fights in fantasy. The ending is divisive — not triumphant in the way readers expected — but it is honest and earned.',                                            page_count: 849, publication_year: 2011 },
        ],
      },
      {
        label: 'Return to Alagaësia',
        sublabel: 'after the main cycle — read in publication order',
        books: [
          { title: 'The Fork, the Witch, and the Worm', slug: 'the-fork-the-witch-and-the-worm', status: 'optional',      seriesLabel: 'Tales from Alagaësia #1', note: 'Three short stories set after Inheritance, framed by a new narrator. A gentle return to Alagaësia — light on plot, heavy on world texture. For fans who aren\'t ready to leave.',  page_count: 272, publication_year: 2018 },
          { title: 'Murtagh',                          slug: 'murtagh',                          status: 'optional',      seriesLabel: 'Alagaësia #5',            note: 'The full novel follow-up, focused on the series\' most complex character. Far more psychologically nuanced than the main cycle. If Murtagh was your favourite, this is essential.',                                                                               page_count: 672, publication_year: 2023 },
        ],
      },
    ],
    cards: [
      { title: '🐉 The Tetralogy (4)',       body: 'Eragon through Inheritance — one continuous story. All four are core. The series gets stronger with each book.',                                   color: 'blue'  },
      { title: '📖 Return to Alagaësia (2)', body: 'The Fork, the Witch, and the Worm and Murtagh. Optional but rewarding for fans — especially Murtagh if you loved the character.',               color: 'green' },
    ],
    sections: [
      {
        heading: 'The Paolini factor',
        type: 'bullets',
        bullets: [
          'Paolini started writing Eragon at 15 and self-published it at 17 before Knopf picked it up. The debut-at-fifteen story is real, not marketing.',
          'The first book wears its influences openly — Eragon is structurally very close to A New Hope, and the fantasy DNA is Tolkien and Tolkien adjacent. Later books shake this off as Paolini finds his own voice.',
          'The Ancient Language magic system — where magic is bound by the true names of things — is one of the more philosophically interesting systems in epic fantasy.',
          'Murtagh (2023) is a genuine surprise: psychologically complex, slower-paced, and far more mature than anything in the main cycle.',
          'The map of Alagaësia is worth studying before you start — the geography matters and the journey covers most of the continent.',
        ],
      },
      {
        heading: 'On the ending',
        type: 'prose',
        prose: "Inheritance's ending split readers when it came out in 2011. Without spoiling it: Paolini makes a choice that prioritises thematic honesty over wish fulfilment. Some readers found it deeply moving. Others felt cheated. Either way it is a deliberate authorial choice, not a failure of craft — and Murtagh (2023) adds significant context that reframes the finale.",
      },
    ],
    darkness: [
      { label: 'Eragon / Eldest',       level: 2, desc: 'Violence in battle, some death — standard epic fantasy stakes' },
      { label: 'Brisingr / Inheritance', level: 3, desc: 'War atrocities, psychological cost, the ending carries real weight' },
    ],
    finishedLabel: 'Finished Alagaësia?',
    categoryHref: '/fantasy/epic/',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['pern', 'dragonlance', 'stormlight'],
  },

  // ─── Grishaverse ──────────────────────────────────────────────────────────
  {
    slug: 'grishaverse',
    name: 'The Grishaverse',
    author: 'Leigh Bardugo',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '📖 Ongoing — new entries expected',
    description:
      'Leigh Bardugo\'s Grishaverse is one of the most successful fantasy universes of the last decade — a Russian-inspired world of Grisha magic users, criminal heist crews, and morally complex power politics. The series has three distinct entry points across three duologies, but Six of Crows is the peak: a tight heist novel with one of the best ensemble casts in modern fantasy. Start with Shadow and Bone to understand the world, then Six of Crows to fall in love with it.',
    darknessDisplay: '🕯️🕯️🕯️ Serious',
    orderNote: 'Read the Shadow and Bone trilogy first — it establishes the world, the Grisha, and the Fold. Six of Crows is set in the same world but with a new cast, and assumes you understand the setting. King of Scars picks up threads from both trilogies.',
    warning: 'Six of Crows is widely considered the stronger entry point for adult readers, but it spoils major Shadow and Bone trilogy events. Read Shadow and Bone first if you want the full experience unspoiled.',
    groups: [
      {
        label: 'Shadow and Bone Trilogy',
        sublabel: 'start here — sets up the world and the Fold',
        books: [
          { title: 'Shadow and Bone', slug: 'shadow-and-bone', status: 'mandatory', seriesLabel: 'Shadow and Bone #1', note: 'Alina Starkov discovers she is a Sun Summoner — possibly the only person who can destroy the Fold, a swathe of living darkness that splits Ravka. Introduces the Grisha system, the Darkling, and the Russian-inspired world. The most YA-feeling of the trilogy.',  page_count: 358, publication_year: 2012 },
          { title: 'Siege and Storm',  slug: 'siege-and-storm',  status: 'mandatory', seriesLabel: 'Shadow and Bone #2', note: 'Alina and Mal are hunted. A privateer captain and a sea monster complicate everything. The political stakes of Ravka come into focus. Bardugo\'s plotting gets noticeably tighter.',                                                                                                   page_count: 435, publication_year: 2013 },
          { title: 'Ruin and Rising',  slug: 'ruin-and-rising',  status: 'mandatory', seriesLabel: 'Shadow and Bone #3', note: 'The trilogy concludes. Underground rebellion, the Darkling\'s true endgame, and an ending that divided fans. The conclusion is honest even if it is not the one most readers wanted.',                                                                                       page_count: 422, publication_year: 2014 },
        ],
      },
      {
        label: 'Six of Crows Duology',
        sublabel: 'the best of the Grishaverse — read after Shadow and Bone',
        books: [
          { title: 'Six of Crows',      slug: 'six-of-crows',      status: 'mandatory', seriesLabel: 'Six of Crows #1', note: 'Six criminals. An impossible heist. One of the tightest ensemble casts in modern fantasy. Kaz Brekker plans an infiltration of an impenetrable prison-fortress for the score of the century. Each POV character is fully realised. The best book in the Grishaverse.',  page_count: 465, publication_year: 2015 },
          { title: 'Crooked Kingdom', slug: 'crooked-kingdom', status: 'mandatory', seriesLabel: 'Six of Crows #2', note: 'The heist becomes a war for survival in Ketterdam. The crew gets their revenge. Character payoffs are deeply satisfying — this duology is one of the better-concluded two-book series in fantasy.',                                                                             page_count: 536, publication_year: 2016 },
        ],
      },
      {
        label: 'King of Scars Duology',
        sublabel: 'sequel series — draws from both previous trilogies',
        note: 'Heavily spoils both Shadow and Bone and Six of Crows. Read both duologies first.',
        noteType: 'warning',
        books: [
          { title: 'King of Scars', slug: 'king-of-scars', status: 'optional', seriesLabel: 'King of Scars #1', note: 'Nikolai Lantsov — everyone\'s favourite side character from the first trilogy — takes centre stage as King of Ravka. Juggles multiple POVs and a new supernatural threat. More satisfying if you loved Nikolai in the first trilogy.',  page_count: 512, publication_year: 2019 },
          { title: 'Rule of Wolves', slug: 'rule-of-wolves', status: 'optional', seriesLabel: 'King of Scars #2', note: 'War arrives in Ravka. Brings Six of Crows characters back into the fold alongside Nikolai\'s storyline. A crowd-pleasing conclusion to this duology — fan service in the best sense.',                                              page_count: 512, publication_year: 2021 },
        ],
      },
      {
        label: 'Companion Works',
        sublabel: 'world-building extras — read anytime after Shadow and Bone',
        books: [
          { title: 'The Language of Thorns', slug: 'the-language-of-thorns', status: 'supplementary', seriesLabel: 'Grishaverse companion', note: 'Six original fairy tales set in the Grishaverse world. Dark, beautiful, and illustrated. Works as a standalone — read between any of the main series entries or after.',                                              page_count: 274, publication_year: 2017 },
          { title: 'The Lives of Saints',    slug: 'the-lives-of-saints',    status: 'supplementary', seriesLabel: 'Grishaverse companion', note: 'Illustrated companion of Ravkan saints referenced throughout the series. Background enrichment rather than plot. Best appreciated mid-series once you know the mythology.',                                     page_count: 176, publication_year: 2020 },
        ],
      },
    ],
    cards: [
      { title: '🌑 Shadow and Bone (3)', body: 'The foundation trilogy. Introduces Ravka, Grisha magic, and the Fold. Required reading before anything else.',                                        color: 'blue'  },
      { title: '🃏 Six of Crows (2)',    body: 'The best of the Grishaverse — a heist duology with one of the finest ensemble casts in modern fantasy. The reason most people stay.',               color: 'blue'  },
      { title: '👑 King of Scars (2)',   body: 'Nikolai\'s duology. Optional but rewarding — especially for readers who want more after Six of Crows.',                                             color: 'green' },
      { title: '📖 Companion works (2)', body: 'The Language of Thorns and The Lives of Saints. World-building extras — not essential to the main story.',                                          color: 'amber' },
    ],
    sections: [
      {
        heading: 'Six of Crows first?',
        type: 'prose',
        prose: "Many readers and online guides recommend starting with Six of Crows because it's the stronger book and works as a standalone. The problem: it casually spoils major Shadow and Bone trilogy events as background context. If you don't mind spoilers, Six of Crows first is a legitimate choice. If you want the full experience in order, start with Shadow and Bone — the trilogy is shorter and faster than it looks.",
      },
      {
        heading: 'What makes it work',
        type: 'bullets',
        bullets: [
          'The Grisha system — magic users who manipulate matter at the molecular level, divided into Orders — is one of the better-constructed soft magic systems in YA fantasy.',
          'Ketterdam, the setting of Six of Crows, is one of the most fully realised fantasy cities of the last decade: a Dutch East India Company analogue built on gang politics and financial crime.',
          'Kaz Brekker is one of the most written-about characters in modern fantasy fandom for a reason: he is a strategist, not a fighter, and his emotional arc is handled with unusual restraint.',
          'The Grishaverse has been adapted twice by Netflix — Shadow and Bone as a TV series, Six of Crows in development. The TV series combines timelines and casts.',
        ],
      },
    ],
    darkness: [
      { label: 'Shadow and Bone trilogy', level: 2, desc: 'YA-adjacent — threat, loss, and moral complexity but relatively light' },
      { label: 'Six of Crows duology',    level: 3, desc: 'Trauma, violence, slavery, and addiction handled directly — darker than the first trilogy' },
      { label: 'King of Scars duology',   level: 3, desc: 'War and political violence — sits between the two earlier series in tone' },
    ],
    finishedLabel: 'Finished the Grishaverse?',
    categoryHref: '/fantasy/romantasy/',
    categoryLabel: 'Browse Romantasy',
    related: ['acotar', 'throne-of-glass', 'empyrean'],
  },

  // ─── Shannara ─────────────────────────────────────────────────────────────
  {
    slug: 'shannara',
    name: 'The Shannara Chronicles',
    author: 'Terry Brooks',
    seriesStatus: 'complete',
    seriesStatusLabel: '✅ Complete — 30+ novels across 10 story arcs',
    description:
      'One of the longest-running fantasy series ever written — Terry Brooks began publishing Shannara in 1977 and concluded the main arc in 2020. The world\'s best-kept secret: Shannara is set on a post-apocalyptic Earth, thousands of years after civilisation collapsed and magic returned. The series spans multiple interconnected trilogies across thousands of years of in-world history. The Sword of Shannara is famously derivative of Tolkien, but Elfstones of Shannara — the second book — is where Brooks found his own voice, and it is genuinely excellent. Start there.',
    darknessDisplay: '🕯️🕯️ Mild',
    orderNote: 'Do not start with The Sword of Shannara. Start with The Elfstones of Shannara — it is a better book, works as a standalone entry point, and will tell you if the series is for you. The Sword can be read after if curiosity strikes.',
    warning: 'The Sword of Shannara (1977) is a close structural retelling of The Lord of the Rings. Many first-time readers bounce off it. Skip it or save it for after Elfstones — you won\'t miss any essential context.',
    groups: [
      {
        label: 'The Original Shannara Trilogy',
        sublabel: 'start with Elfstones — skip Sword or read it last',
        books: [
          { title: 'The Sword of Shannara',    slug: 'the-sword-of-shannara',    status: 'supplementary', seriesLabel: 'Shannara #1', note: 'Skip or read last. Structurally mirrors The Lord of the Rings so closely that critics called it out on publication. Brooks has acknowledged the influence. Of historical interest once you love the world, but a poor entry point.',                                            page_count: 726, publication_year: 1977 },
          { title: 'The Elfstones of Shannara', slug: 'the-elfstones-of-shannara', status: 'mandatory',     seriesLabel: 'Shannara #2', note: 'Start here. Wil Ohmsford and the druid Allanon must escort the last Chosen of the Ellcrys as the Forbidding fails and demons pour through. Brooks found his own voice here — the pacing is tight, the stakes are real, and the ending lands hard.',  page_count: 564, publication_year: 1982 },
          { title: 'The Wishsong of Shannara',  slug: 'the-wishsong-of-shannara',  status: 'mandatory',     seriesLabel: 'Shannara #3', note: 'Brin and Jair Ohmsford — descendants of Wil — face a corrupted forest and a dark magic that threatens to consume Brin herself. Darker and more psychologically interesting than the first two books.',                                                  page_count: 501, publication_year: 1985 },
        ],
      },
      {
        label: 'The Heritage of Shannara',
        sublabel: 'set 300 years later — the series finds its stride',
        books: [
          { title: 'The Scions of Shannara',    slug: 'the-scions-of-shannara',    status: 'mandatory', seriesLabel: 'Heritage #1', note: 'Par and Coll Ohmsford are called by the shade of Allanon to save the Four Lands. The world has changed: magic is outlawed, the Druids are gone. A strong start to the best arc of the early series.',  page_count: 403, publication_year: 1990 },
          { title: 'The Druid of Shannara',     slug: 'the-druid-of-shannara',     status: 'mandatory', seriesLabel: 'Heritage #2', note: 'Walker Boh\'s arc takes centre stage. The quest to restore the Druids begins. Parallel storylines across the Four Lands — each advancing one piece of the larger puzzle.',                            page_count: 338, publication_year: 1991 },
          { title: 'The Elf Queen of Shannara', slug: 'the-elf-queen-of-shannara', status: 'mandatory', seriesLabel: 'Heritage #3', note: 'Wren Ohmsford journeys to Morrowindl to find the missing Elves. One of the most self-contained and propulsive entries in the entire series — Wren is an excellent protagonist.',                         page_count: 323, publication_year: 1992 },
          { title: 'The Talismans of Shannara', slug: 'the-talismans-of-shannara', status: 'mandatory', seriesLabel: 'Heritage #4', note: 'All threads converge. Par, Walker, and Wren each reach their destinations. A satisfying multi-arc conclusion — the best of early Shannara.',                                                              page_count: 453, publication_year: 1993 },
        ],
      },
      {
        label: 'Word & Void',
        sublabel: 'modern-day prequel trilogy — set in our world',
        note: 'Set in contemporary America, thousands of years before Shannara. Bridges our world to the Shannara future. Can be read independently — but reading it after Heritage of Shannara enriches the mythology.',
        noteType: 'optional',
        books: [
          { title: 'Running with the Demon', slug: 'running-with-the-demon', status: 'optional', seriesLabel: 'Word & Void #1', note: 'A Knight of the Word protects a small Illinois town from a Demon seeking to corrupt it. Urban fantasy set in the real world — feels completely different from Shannara. Quietly excellent.',    page_count: 420, publication_year: 1997 },
          { title: 'A Knight of the Word',   slug: 'a-knight-of-the-word',   status: 'optional', seriesLabel: 'Word & Void #2', note: 'John Ross doubts his purpose and faces the consequence of abandoning his role as Knight. The darkest of the three — deals with guilt, addiction, and faith.',                                page_count: 352, publication_year: 1998 },
          { title: 'Angel Fire East',        slug: 'angel-fire-east',        status: 'optional', seriesLabel: 'Word & Void #3', note: 'A gypsy morph appears — a being of pure magic that could tip the balance in the war between Word and Void. Concludes the modern-day arc and sets up the distant Shannara future.',                page_count: 368, publication_year: 1999 },
        ],
      },
      {
        label: 'Later Shannara Arcs',
        sublabel: 'for committed fans — multiple further trilogies',
        note: 'The series continues through Voyage of the Jerle Shannara, High Druid of Shannara, Dark Legacy of Shannara, and concludes with The Fall of Shannara tetralogy (2017–2020). All are optional for casual readers.',
        noteType: 'optional',
        books: [
          { title: 'Ilse Witch',         slug: 'ilse-witch',         status: 'optional', seriesLabel: 'Voyage of the Jerle Shannara #1', note: 'A new generation of Ohmsfords. An airship crew chases an ancient map. Brooks embraces adventure-quest plotting with a faster pace than Heritage.', page_count: 387, publication_year: 2000 },
          { title: 'Jarka Ruus',         slug: 'jarka-ruus',         status: 'optional', seriesLabel: 'High Druid of Shannara #1',       note: 'Twenty years after Voyage. Grianne Ohmsford as Ard Rhys of the Druid order. Political intrigue at Paranor. More interested in character psychology than quest plotting.',     page_count: 320, publication_year: 2003 },
          { title: 'The Black Elfstone', slug: 'the-black-elfstone', status: 'optional', seriesLabel: 'The Fall of Shannara #1',         note: 'Start of the concluding tetralogy. A new threat from beyond the known Four Lands. Brooks ties together threads from across the entire series. The beginning of the end.',                    page_count: 333, publication_year: 2017 },
          { title: 'The Last Druid',     slug: 'the-last-druid',     status: 'optional', seriesLabel: 'The Fall of Shannara #4',         note: 'The conclusion of the entire Shannara saga. More than four decades of story reaches its end. Rewarding for readers who have followed the series across its full run.',                            page_count: 320, publication_year: 2020 },
        ],
      },
    ],
    cards: [
      { title: '⚔️ Original Trilogy (3)',   body: 'Skip Sword of Shannara or read it last. Elfstones is the real starting point — one of the best standalone portal-fantasy novels of the 1980s.',        color: 'blue'  },
      { title: '🌿 Heritage (4)',            body: 'The best arc of early Shannara. Three parallel quests converge in one of Brooks\'s most satisfying conclusions.',                                        color: 'blue'  },
      { title: '🌆 Word & Void (3)',         body: 'A standalone trilogy set in modern America. Completely different tone — urban fantasy. Rewards readers who want to understand Shannara\'s origins.',    color: 'green' },
      { title: '📚 Later Arcs (20+ books)', body: 'Multiple further trilogies through 2020. Optional for casual readers — essential for those who fall in love with the Four Lands.',                       color: 'amber' },
    ],
    sections: [
      {
        heading: 'The secret of Shannara',
        type: 'prose',
        prose: "Shannara is set on Earth. This is revealed gradually — the ruins of skyscrapers are ancient rubble, the races of Elves and Gnomes and Trolls evolved from humans after civilisation collapsed thousands of years ago. The Word & Void trilogy, set in our present day, shows the beginning of the cataclysm. Brooks treats this as mythology rather than science fiction — but knowing it going in changes how you read the world-building.",
      },
      {
        heading: 'Where the series stands',
        type: 'bullets',
        bullets: [
          'The Sword of Shannara (1977) was the first fantasy novel published by a major publisher after Tolkien — Del Rey bet its entire genre list on it. It sold over a million copies.',
          'Elfstones of Shannara was adapted as The Shannara Chronicles on MTV (2016–2017). The show is set during the Heritage era and uses Elfstones as its source material.',
          'The Fall of Shannara (2017–2020) concludes the main saga after 43 years of publication — one of the longest continuous fantasy series ever completed by a single author.',
          'The Heritage of Shannara is the consensus favourite arc among long-term fans — four books, three simultaneous quests, and a world that has genuinely evolved from the original trilogy.',
        ],
      },
    ],
    darkness: [
      { label: 'Original trilogy',       level: 2, desc: 'Classic adventure — peril and loss but nothing heavy' },
      { label: 'Heritage of Shannara',   level: 2, desc: 'Higher stakes, some character deaths — still family-friendly epic fantasy' },
      { label: 'Word & Void',            level: 3, desc: 'Darker urban fantasy tone — deals with corruption, addiction, and despair' },
      { label: 'Later arcs',             level: 2, desc: 'Varies by arc — generally consistent with the original tone' },
    ],
    finishedLabel: 'Finished the Four Lands?',
    categoryHref: '/fantasy/epic/',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['wheel-of-time', 'dragonlance', 'memory-sorrow-thorn'],
  },

  // ─── Mistborn ─────────────────────────────────────────────────────────────
  {
    slug: 'mistborn',
    name: 'Mistborn',
    author: 'Brandon Sanderson',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '📖 Ongoing — Era 3 in progress',
    description:
      'Brandon Sanderson\'s Mistborn is one of the most ingeniously constructed fantasy series ever written — set on a world where the prophesied hero failed a thousand years ago and a dark lord has ruled ever since. The original trilogy is a complete story of revolution, consequence, and cosmic revelation. Era 2 jumps 300 years forward into a Western-flavoured world of guns, trains, and new Allomancers. Era 3 — currently in progress — will advance to a near-modern spy-thriller setting. Each era can be read largely standalone, but the rewards for reading all of them in order are enormous.',
    darknessDisplay: '🕯️🕯️🕯️ Serious',
    orderNote: 'Extras are placed where they should actually be read, not just by series number. Secret History is #3.5 but positioned after Bands of Mourning — its note explains why. Era 3 has not yet been published.',
    warning: 'Mistborn is part of the wider Cosmere universe. Era 2\'s The Lost Metal contains significant Cosmere crossover content. Reading the Cosmere guide alongside this one is recommended for the full experience.',
    groups: [
      {
        label: 'Era 1 — The Original Trilogy',
        sublabel: 'start here — a complete story in three books',
        books: [
          { title: 'The Final Empire',      slug: 'the-final-empire',         status: 'mandatory',     seriesLabel: 'Mistborn #1',   note: 'Start here. A crew of thieves and Mistborn plan a heist to overthrow a god-emperor who has ruled for a thousand years. One of the best first novels in epic fantasy — the magic system, the world, and the twist all land perfectly.',              page_count: 541, publication_year: 2006 },
          { title: 'The Eleventh Metal',    slug: 'the-eleventh-metal',        status: 'supplementary', seriesLabel: 'Mistborn #1.5', note: '~6k words. Kelsier\'s training before The Final Empire. Free on Sanderson\'s site. Best read right after The Final Empire.',                                                                                                                   page_count: 30,  publication_year: 2012 },
          { title: 'The Well of Ascension', slug: 'the-well-of-ascension',     status: 'mandatory',     seriesLabel: 'Mistborn #2',   note: 'The revolution succeeded — now the harder work begins. A political siege novel that tests your patience before delivering one of the best final acts in the trilogy. The slowest of the three but essential.',                                   page_count: 590, publication_year: 2007 },
          { title: 'The Hero of Ages',      slug: 'the-hero-of-ages',          status: 'mandatory',     seriesLabel: 'Mistborn #3',   note: 'Everything converges. The full cosmological scope of what Sanderson has been building is revealed. The climax answers questions you didn\'t know you were asking. One of the best trilogy conclusions in the genre.',                           page_count: 572, publication_year: 2008 },
        ],
      },
      {
        label: 'Era 2 — Wax and Wayne',
        sublabel: '300 years later — Western-flavoured Scadrial',
        books: [
          { title: 'The Alloy of Law',                       slug: 'the-alloy-of-law',                      status: 'mandatory',     seriesLabel: 'Mistborn #4',   note: 'A lighter, faster Mistborn — half the length of Era 1 books. Waxillium Ladrian is a lawman dragged back to the city. An excellent palate cleanser after the weight of Era 1.',         page_count: 332, publication_year: 2011 },
          { title: 'Shadows of Self',                        slug: 'shadows-of-self',                       status: 'mandatory',     seriesLabel: 'Mistborn #5',   note: 'Darker and more personal than Alloy. A murderer is killing city leaders and Wax must uncover why. Important Cosmere lore drops and a gut-punch of an ending.',                     page_count: 383, publication_year: 2015 },
          { title: 'Allomancer Jak and the Pits of Eltania', slug: 'allomancer-jak-and-the-pits-of-eltania', status: 'supplementary', seriesLabel: 'Mistborn #5.5', note: 'Comedic pulp-adventure short set in the Era 2 world. Light, fun, self-contained. Part of the Arcanum Unbounded collection.',                                                              page_count: 35,  publication_year: 2014 },
          { title: 'The Bands of Mourning',                  slug: 'the-bands-of-mourning',                 status: 'mandatory',     seriesLabel: 'Mistborn #6',   note: 'Adventure-quest plotting — Wax and the crew travel far from Elendel. Big reveals connecting to the broader Cosmere. The most fun of the Era 2 books.',                                  page_count: 448, publication_year: 2016 },
          { title: 'Secret History',                         slug: 'mistborn-secret-history',               status: 'supplementary', seriesLabel: 'Mistborn #3.5', note: 'Novella. Chronologically Era 1 — but must be read here, after Bands of Mourning, as it spoils Era 2 plot points. Shows what happened behind the scenes of Era 1. Essential for Cosmere readers.', page_count: 175, publication_year: 2016 },
          { title: 'The Lost Metal',                         slug: 'the-lost-metal',                        status: 'mandatory',     seriesLabel: 'Mistborn #7',   note: 'Era 2 finale. Massive Cosmere crossover payoff — characters and concepts from across the Cosmere converge on Scadrial. The most ambitious Mistborn book since Hero of Ages.',          page_count: 528, publication_year: 2022 },
        ],
      },
      {
        label: 'Era 3 — The Ghostbloods',
        sublabel: 'announced trilogy — not yet published',
        note: 'Era 3 will advance Scadrial to a near-modern, spy-thriller setting roughly equivalent to the 1980s. All three books are planned but none have been published as of 2025.',
        noteType: 'optional',
        books: [
          { title: 'Era 3, Book 1', slug: 'mistborn-era-3-book-1', status: 'mandatory', seriesLabel: 'Mistborn #8', note: 'First book of the announced Era 3 spy-thriller trilogy. Set on a more technologically advanced Scadrial — cars, electricity, Cold War-era politics. Publication date TBA.',         page_count: 0, publication_year: 2026 },
          { title: 'Era 3, Book 2', slug: 'mistborn-era-3-book-2', status: 'mandatory', seriesLabel: 'Mistborn #9', note: 'Second book of the Era 3 trilogy. Not yet published.',                                                                                                                             page_count: 0, publication_year: 2027 },
          { title: 'Era 3, Book 3', slug: 'mistborn-era-3-book-3', status: 'mandatory', seriesLabel: 'Mistborn #10', note: 'Third and final book of the Era 3 trilogy. Will conclude the Wax-and-Wayne-era story threads and connect to the wider Cosmere endgame. Not yet published.',                      page_count: 0, publication_year: 2028 },
        ],
      },
    ],
    cards: [
      { title: '⚗️ Era 1 (3)',        body: 'The complete original trilogy. The best entry point and one of the finest fantasy trilogies ever written. Read all three before moving on.',                               color: 'blue'  },
      { title: '🔫 Era 2 (4)',        body: 'Wax and Wayne — Western-flavoured Mistborn set 300 years later. Faster and lighter than Era 1. The Lost Metal is the best Cosmere payoff yet published.',               color: 'blue'  },
      { title: '🕵️ Era 3 (3)',        body: 'Announced spy-thriller trilogy set on a near-modern Scadrial. Not yet published as of 2025.',                                                                             color: 'amber' },
      { title: '📄 Extras (3)',       body: 'The Eleventh Metal (#1.5), Allomancer Jak (#5.5), Secret History (#3.5 novella). Placed in series number order — see each book\'s note for the ideal read point.',     color: 'green' },
    ],
    sections: [
      {
        heading: 'The magic system',
        type: 'bullets',
        bullets: [
          'Allomancy: swallowing and burning metals to gain powers — each of the 16 metals does something different. Mistborn can burn all metals; Mistings only one.',
          'Feruchemy: storing attributes (strength, speed, memory, health) in metal minds for later use. Feruchemists are rarer than Allomancers.',
          'Hemalurgy: a darker third magic system introduced gradually — steals powers and attributes by driving metal spikes through living things at precise moments.',
          'Era 2 introduces new alloys and hybrid powers as Scadrial\'s technology advances — the magic system evolves alongside the world.',
        ],
      },
      {
        heading: 'Era 1 vs Era 2',
        type: 'prose',
        prose: "Era 1 is epic fantasy — long books, cosmic stakes, slow-burn revelation. Era 2 is closer to a Western-flavoured adventure serial — faster pacing, lighter tone, shorter books. Some readers prefer Era 2 for this reason. Both are set on the same world with the same magic, but the feel is genuinely different. If you bounced off Era 1's length, try The Alloy of Law — it was written as a palate cleanser and shows a very different side of Sanderson's range.",
      },
      {
        heading: 'Cosmere placement',
        type: 'prose',
        prose: "Mistborn is the most important series in the Cosmere after Stormlight. Era 1 can be read in isolation with no Cosmere knowledge. Era 2 starts dropping Cosmere threads. The Lost Metal (Era 2 finale) has the most explicit Cosmere crossover in any Sanderson novel to date — it assumes familiarity with Stormlight and Warbreaker. If you're reading the Cosmere in full, read The Lost Metal after Rhythm of War.",
      },
    ],
    darkness: [
      { label: 'Era 1',      level: 3, desc: 'Revolution, genocide, and cosmic horror — the darkness is purposeful and earns its weight' },
      { label: 'Era 2',      level: 2, desc: 'Lighter tone overall — violence and personal loss but less cosmically heavy than Era 1' },
      { label: 'Era 3',      level: 3, desc: 'Expected to match Era 2 — spy thriller tone with moral complexity' },
    ],
    finishedLabel: 'Finished Scadrial?',
    categoryHref: '/fantasy/epic/',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['cosmere', 'stormlight', 'kingkiller'],
    booksLikeSlug: 'mistborn-the-final-empire',
  },

  // ─── Valdemar ─────────────────────────────────────────────────────────────
  {
    slug: 'valdemar',
    name: 'The World of Valdemar',
    author: 'Mercedes Lackey',
    seriesStatus: 'ongoing',
    seriesStatusLabel: '📖 Ongoing — 40+ novels since 1987',
    description:
      'One of the most expansive and enduring worlds in fantasy — Mercedes Lackey has been writing Valdemar since 1987 and shows no signs of stopping. The kingdom of Valdemar is protected by Heralds: individuals Chosen by magical white horses called Companions, bound for life in a telepathic partnership. The series spans thousands of years of in-world history across more than a dozen sub-series. It is warm, character-driven fantasy that takes trauma seriously without wallowing in it. The Vanyel trilogy — one of fantasy\'s first major LGBTQ+ storylines — remains among the most emotionally devastating things Lackey has written.',
    darknessDisplay: '🕯️🕯️ Mild',
    orderNote: 'Two equally valid entry points: Arrows of the Queen (publication order, Talia\'s story) or Magic\'s Pawn (Vanyel\'s story, set 500 years earlier). Most readers start with Arrows. The Mage Wars and Founding of Valdemar prequels work best after you already love the world.',
    warning: 'Magic\'s Pawn deals directly with homophobia, emotional abuse, and grief. It is not as light as the Talia books. The ending will hurt. This is by design.',
    groups: [
      {
        label: 'Heralds of Valdemar',
        sublabel: 'start here — the original trilogy',
        books: [
          { title: 'Arrows of the Queen', slug: 'arrows-of-the-queen', status: 'mandatory', seriesLabel: 'Heralds of Valdemar #1', note: 'Talia is rescued from an abusive household by a Companion and brought to Haven to train as a Herald. A gentle, warm introduction to the world. Reads fast — you\'ll finish it in a day.',                               page_count: 320, publication_year: 1987 },
          { title: 'Arrow\'s Flight',     slug: 'arrows-flight',      status: 'mandatory', seriesLabel: 'Heralds of Valdemar #2', note: 'Talia\'s internship on the Valdemar border. Cut off, snowed in, and dealing with powers that are spiralling out of control. The darkest of the trilogy and the most psychologically interesting.',                         page_count: 337, publication_year: 1987 },
          { title: 'Arrow\'s Fall',       slug: 'arrows-fall',        status: 'mandatory', seriesLabel: 'Heralds of Valdemar #3', note: 'Political intrigue, war threats, and the cost of being a Herald. A satisfying conclusion to Talia\'s arc — earned, not easy.',                                                                                           page_count: 324, publication_year: 1988 },
        ],
      },
      {
        label: 'The Last Herald-Mage',
        sublabel: 'set 500 years before Talia — Vanyel\'s story',
        note: 'One of fantasy\'s first and most important LGBTQ+ storylines. Devastating and beautiful. Read after the Heralds trilogy or as a standalone entry point.',
        noteType: 'optional',
        books: [
          { title: 'Magic\'s Pawn',    slug: 'magics-pawn',    status: 'mandatory', seriesLabel: 'Last Herald-Mage #1', note: 'Vanyel — a nobleman\'s son sent away to train — discovers he is a Herald-Mage and falls in love for the first time. Lackey does not protect the reader. The ending of this book is one of the most painful in fantasy.',      page_count: 350, publication_year: 1989 },
          { title: 'Magic\'s Promise',  slug: 'magics-promise',  status: 'mandatory', seriesLabel: 'Last Herald-Mage #2', note: 'Vanyel on furlough, dealing with isolation, grief, and a supernatural threat in a neighbouring kingdom. Quieter than book 1 but essential — this is where Vanyel becomes fully himself.',                                   page_count: 287, publication_year: 1990 },
          { title: 'Magic\'s Price',    slug: 'magics-price',    status: 'mandatory', seriesLabel: 'Last Herald-Mage #3', note: 'The final reckoning. Vanyel is the last Herald-Mage and the darkness closing in cannot be stopped by one person alone. The conclusion is heartbreaking and perfect. Bring tissues.',                                      page_count: 318, publication_year: 1991 },
        ],
      },
      {
        label: 'Mage Winds & Mage Storms',
        sublabel: 'direct sequel era — set after the Heralds trilogy',
        books: [
          { title: 'Winds of Fate',     slug: 'winds-of-fate',     status: 'mandatory', seriesLabel: 'Mage Winds #1',  note: 'Elspeth, Talia\'s ward, rides out to find a Mage-teacher. A new generation of Heralds faces a magical threat the kingdom hasn\'t seen in centuries. Picks up the political threads of the Talia books.',  page_count: 387, publication_year: 1991 },
          { title: 'Winds of Change',   slug: 'winds-of-change',   status: 'mandatory', seriesLabel: 'Mage Winds #2',  note: 'Elspeth trains among the Tayledras. Magic returns to Valdemar. The world expands significantly — new peoples, new powers, new threats.',                                                                   page_count: 400, publication_year: 1992 },
          { title: 'Winds of Fury',     slug: 'winds-of-fury',     status: 'mandatory', seriesLabel: 'Mage Winds #3',  note: 'The Mage Winds arc concludes. Ancar of Hardorn, the threat that has loomed since Arrow\'s Fall, finally reaches its crisis point.',                                                                          page_count: 401, publication_year: 1993 },
          { title: 'Storm Warning',     slug: 'storm-warning',     status: 'mandatory', seriesLabel: 'Mage Storms #1', note: 'A new threat — magical storms that wipe out Gifts and powers — descends on the entire continent. Shifts from Valdemar-only politics to a continent-wide coalition.',                                         page_count: 400, publication_year: 1994 },
          { title: 'Storm Rising',      slug: 'storm-rising',      status: 'mandatory', seriesLabel: 'Mage Storms #2', note: 'The storms worsen. Uncomfortable alliances form. Lackey\'s political plotting at its most complex.',                                                                                                             page_count: 377, publication_year: 1995 },
          { title: 'Storm Breaking',    slug: 'storm-breaking',    status: 'mandatory', seriesLabel: 'Mage Storms #3', note: 'Conclusion of the Mage Storms arc and effectively the conclusion of the original Valdemar saga. A satisfying endpoint for readers who want a natural stopping place.',                                         page_count: 403, publication_year: 1996 },
        ],
      },
      {
        label: 'Prequels & Further Series',
        sublabel: 'for committed Valdemar fans',
        books: [
          { title: 'By the Sword',          slug: 'by-the-sword',          status: 'optional',      seriesLabel: 'Valdemar standalone',   note: 'Kerowyn — mercenary granddaughter of Lackey\'s earlier character Tarma. Bridges the Vows & Honor world with the Heralds universe. Works as a standalone.',                                                    page_count: 512, publication_year: 1991 },
          { title: 'The Black Gryphon',     slug: 'the-black-gryphon',     status: 'optional',      seriesLabel: 'Mage Wars #1',          note: 'Set 3,000 years before Arrows of the Queen, during the Mage Wars that shaped Valdemar\'s world. Gryphons as POV characters. Best read after the main two arcs.',                                              page_count: 400, publication_year: 1994 },
          { title: 'Brightly Burning',      slug: 'brightly-burning',      status: 'optional',      seriesLabel: 'Valdemar standalone',   note: 'Set between the Last Herald-Mage and Heralds eras. Lavan Firestorm — a Herald with devastating and uncontrollable fire gifts. A tragic standalone. Best for readers who want more of Vanyel\'s era.',        page_count: 384, publication_year: 2000 },
          { title: 'Foundation',            slug: 'foundation',            status: 'optional',      seriesLabel: 'Collegium Chronicles #1', note: 'Mags — a mine slave discovered to be a Herald-trainee. Written as a new entry point to Valdemar. More deliberate pacing than the original trilogy. Good for younger readers.',                               page_count: 337, publication_year: 2008 },
          { title: 'Beyond',                slug: 'beyond',                status: 'supplementary', seriesLabel: 'Founding of Valdemar #1', note: 'The newest sub-series — how Valdemar was founded. Best read after you know and love the kingdom. Works backwards from the world you already know.',                                                          page_count: 352, publication_year: 2021 },
        ],
      },
    ],
    cards: [
      { title: '🐴 Heralds of Valdemar (3)',   body: 'The original Talia trilogy. The warmest and most accessible entry point — start here if you\'re new to Valdemar.',                                   color: 'blue'  },
      { title: '💙 Last Herald-Mage (3)',       body: 'Vanyel\'s story — one of fantasy\'s most emotionally devastating trilogies. Essential reading. Have tissues ready for book 3.',                     color: 'blue'  },
      { title: '⚡ Mage Winds & Storms (6)',    body: 'The direct sequel arcs. Six books covering the return of magic and continent-wide catastrophe. For readers who want to continue after Talia.',       color: 'blue'  },
      { title: '📚 Prequels & More (5+)',       body: 'By the Sword, Mage Wars, Collegium Chronicles, and more. Valdemar has 40+ novels — this is where the rabbit hole goes.',                           color: 'green' },
    ],
    sections: [
      {
        heading: 'The Companions',
        type: 'prose',
        prose: "Companions are not horses. They are white, blue-eyed beings who Choose their Heralds — a lifelong telepathic bond that ends only with death. When a Companion dies, the Herald usually follows. When a Herald dies, the Companion always does. This bond is the emotional core of every Valdemar book, and Lackey never lets you forget what it costs.",
      },
      {
        heading: 'Why it matters',
        type: 'bullets',
        bullets: [
          'The Last Herald-Mage trilogy (1989–1991) was one of the first mainstream fantasy series to feature a gay protagonist whose sexuality was treated as normal and central to his story — not a subplot, not a tragedy to be fixed.',
          'Lackey\'s Valdemar takes trauma seriously. Talia, Vanyel, and many others carry histories of abuse and neglect — and the books deal with recovery, not just survival.',
          'The series is still being written. Lackey published the first Founding of Valdemar book in 2021 and continues to expand the world at the rate of roughly one book a year.',
          'Storm Breaking (1996) is a natural endpoint if you want a complete arc — the original saga concludes there. Everything after is expansion rather than continuation.',
        ],
      },
    ],
    darkness: [
      { label: 'Heralds of Valdemar',    level: 2, desc: 'Emotional difficulty — trauma and abuse — but warm in tone overall' },
      { label: 'Last Herald-Mage',       level: 3, desc: 'Grief, homophobia, isolation, and devastating loss — Lackey\'s darkest work' },
      { label: 'Mage Winds / Storms',    level: 2, desc: 'Political violence and war — lighter than the Vanyel books' },
    ],
    finishedLabel: 'Finished Valdemar?',
    categoryHref: '/fantasy/epic/',
    categoryLabel: 'Browse Epic Fantasy',
    related: ['pern', 'wheel-of-time', 'memory-sorrow-thorn'],
  },
]

export const getReadingOrderEntry = (slug: string): ReadingOrderEntry | null =>
  READING_ORDERS.find((e) => e.slug === slug) ?? null
