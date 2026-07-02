import type { ReadingOrderEntry } from '../reading-orders';

export const stormlight: ReadingOrderEntry = {
  slug: 'stormlight',
  name: 'The Stormlight Archive',
  author: 'Brandon Sanderson',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '⏳ Ongoing - Arc 1 complete (5 books), Arc 2 unwritten',
  description:
    "The Stormlight Archive is the most ambitious epic fantasy currently being written: a ten-book series set on Roshar, a world of perpetual highstorms where ancient stone cities are built to withstand the weather and where something older than civilisation stirs beneath every ruin. The first five-book arc is complete. Each book is between 1,000 and 1,330 pages. Three storylines run in parallel from the first chapter: Kaladin, a soldier-turned-slave trying to survive and protect those around him; Shallan, a scholar's ward concealing a desperate secret; and Dalinar, a highprince haunted by visions of the world's ancient past. Each has their own arc, their own magic, and their own reason the series works.",
  darknessDisplay:
    '🕯️🕯️🕯️ Moderate - war, loss, and depression throughout; Wind and Truth reaches level 4',
  orderNote:
    "Start with The Way of Kings. Read in publication order and position the novellas as listed: each is short and adds meaningful context.",
  cardsPosition: 'above',
  cards: [
    {
      title: '📏 The Commitment',
      body: 'Five books. Each one is 1,000-1,330 pages. This is not a casual read: it is a multi-year undertaking for most people. The Way of Kings also has a slow opening (~200 pages before the series finds its stride). Go in knowing what you are signing up for.',
      color: 'blue',
    },
    {
      title: '💙 Kaladin',
      body: 'Kaladin Stormblessed is one of the finest protagonists in modern fantasy. His arc is about depression, hopelessness, and finding a reason to protect people when you have every reason not to. Sanderson handles it with unusual care and honesty. His chapters are why most readers keep going through the slower stretches.',
      color: 'purple',
    },
    {
      title: '🎭 Shallan',
      body: "Shallan Davar is the series' other essential POV: a scholar, spy, and Lightweaver whose arc runs parallel to Kaladin's across all five books. Her chapters are more cerebral, more playful, and deal more with identity and self-deception than survival. The contrast between the two is one of the series' greatest structural strengths.",
      color: 'red',
    },
    {
      title: '⚔️ Dalinar',
      body: 'Dalinar Kholin begins the series as a war-hardened highprince haunted by visions he cannot explain. He is the slowest of the three major arcs to build. Oathbringer (book 3) is his book, and by the end of the first arc he is carrying the weight of everything the series has been building toward.',
      color: 'amber',
    },
    {
      title: '🌩️ Roshar',
      body: 'The world of Roshar is one of the most originally conceived settings in the genre. Highstorms (catastrophic storms that cross the continent regularly) have shaped every aspect of life, ecology, and architecture. The Shattered Plains, the crab-like wildlife, the polyp-growing stone, and the ruins of the Knights Radiant are part of a fully realised world, not backdrop.',
      color: 'green',
    },
    {
      title: '🌌 The Cosmere',
      body: "Stormlight is part of Sanderson's Cosmere: a shared universe where multiple series (Mistborn, Elantris, Warbreaker, and others) share a cosmological framework. The Stormlight books stand alone, but connections accumulate. By Wind and Truth (book 5) the Cosmere context becomes load-bearing. First-time readers will understand the ending; readers who have finished Mistborn Era 2 will understand more.",
      color: 'zinc',
    },
  ],
  books: [
    {
      title: 'The Way of Kings',
      slug: 'the-way-of-kings',
      status: 'mandatory',
      note: 'Start here. Kaladin, Shallan, Dalinar. Worldbuilding unlike anything else in fantasy.',
      page_count: 1007,
      publication_year: 2010,
    },
    {
      title: 'Words of Radiance',
      slug: 'words-of-radiance',
      status: 'mandatory',
      note: 'Raises the bar on every level. Best fight scenes Sanderson has written.',
      page_count: 1088,
      publication_year: 2014,
    },
    {
      title: 'Warbreaker',
      slug: 'warbreaker',
      status: 'optional',
      note: "Standalone Cosmere novel. Free on Sanderson's site. Read here, before Oathbringer: a character from it appears in book 3 and the connection is significant.",
      page_count: 592,
      publication_year: 2009,
    },
    {
      title: 'Edgedancer',
      slug: 'edgedancer',
      status: 'supplementary',
      note: 'Novella about Lift (~40k words). Short but adds important context: read before Oathbringer.',
      page_count: 226,
      publication_year: 2016,
    },
    {
      title: 'Oathbringer',
      slug: 'oathbringer',
      status: 'mandatory',
      note: "Dalinar's history revealed. Largest worldbuilding expansion in the series.",
      page_count: 1248,
      publication_year: 2017,
    },
    {
      title: 'Dawnshard',
      slug: 'dawnshard',
      status: 'supplementary',
      note: 'Novella with Rysn (~26k words). Sets up important elements for Rhythm of War.',
      page_count: 176,
      publication_year: 2020,
    },
    {
      title: 'Rhythm of War',
      slug: 'rhythm-of-war',
      status: 'mandatory',
      note: 'Politics, science, and mental health. More divisive than earlier books but crucial for book 5.',
      page_count: 1232,
      publication_year: 2020,
    },
    {
      title: 'Horneater',
      slug: 'horneater',
      status: 'upcoming',
      note: 'Upcoming novella following Rock. Set in the Horneater Peaks. No confirmed release date.',
      page_count: null,
      publication_year: null,
    },
    {
      title: 'Wind and Truth',
      slug: 'wind-and-truth',
      status: 'mandatory',
      note: 'Closes the first 5-book arc. Massive Cosmere convergence.',
      page_count: 1330,
      publication_year: 2024,
    },
    {
      title: 'Stormlight Archive Book 6',
      slug: 'stormlight-6',
      status: 'upcoming',
      note: 'First book of Arc 2. Expected around 2031.',
      page_count: null,
      publication_year: 2031,
    },
  ],
  characters: [
    {
      name: 'Kaladin Stormblessed',
      role: 'Soldier-turned-slave; Windrunner; protagonist of The Way of Kings',
      color: 'blue',
      why_they_work:
        "Kaladin is built around a single-sentence arc that takes five thousand pages to complete: he wants to protect people, and the series systematically questions whether that's possible, wise, or coherent as a life goal. What makes him exceptional is not his power (though he has it) but the consistency of that drive: how it keeps reasserting itself even when the series has given him every reason to abandon it. His depression is the series' way of testing whether 'protect everyone' survives contact with a world that kills everyone eventually.",
    },
    {
      name: 'Shallan Davar',
      role: "Scholar; spy; Lightweaver; parallel POV to Kaladin across all five books",
      color: 'red',
      why_they_work:
        "Shallan's Lightweaver power (creating illusions) is tied directly to her psychological condition: she uses other identities to avoid being herself, and the magic works by the same mechanism. This is the most elegant character/magic integration in the series. Her arc is about which version of herself is real, and the answer keeps changing. The card describes the contrast with Kaladin; the arc itself is about whether she can stop the illusions from replacing her entirely.",
    },
    {
      name: 'Dalinar Kholin',
      role: 'Highprince of Alethkar; the Blackthorn; protagonist of Oathbringer',
      color: 'amber',
      why_they_work:
        "Dalinar is a war criminal who genuinely cannot remember what he did, trying to build something better than the violence that made him. Oathbringer reveals what happened at the Rift, and the book is structured so the reader learns it as Dalinar does: three books of attachment to a character before finding out what he actually is. Sanderson uses that attachment as the material the book is built from.",
    },
    {
      name: 'Szeth-son-son-Vallano',
      role: 'Assassin in White; Truthless of Shinovar; antagonist turned POV character',
      color: 'purple',
      why_they_work:
        "Szeth appears on page one of The Way of Kings killing a king whose death sets the political events of the series in motion. His abilities are the reader's first encounter with Surgebinding, and his motivation remains deliberately mysterious for most of book 1. His full arc resolves in Wind and Truth and uses every piece of his history laid across books 1-4. He is the series' way of establishing stakes before the main POVs have had time to develop.",
    },
    {
      name: 'Navani Kholin',
      role: "Scholar-queen; fabrial engineer; Dalinar's wife",
      color: 'green',
      why_they_work:
        "Navani begins the series as Dalinar's love interest and a background scholarly figure. By Rhythm of War she is the primary POV and the character most responsible for the series' industrial revolution subplot: the development of fabrials, the nature of the Sibling, and the scientific underpinning of magic. She is the character whose importance is most underestimated on a first read of books 1-2 and most obvious in retrospect.",
    },
    {
      name: 'Lift',
      role: 'Edgedancer; protagonist of the Edgedancer novella; recurring presence through Wind and Truth',
      color: 'zinc',
      why_they_work:
        "Lift appears as a minor character in The Way of Kings and has her own novella (Edgedancer) set between books 2 and 3. Her power (Abrasion, allowing frictionless motion) comes from consuming food; her characterisation is comic in a way almost nothing else in the series is. Edgedancer is the best of the Stormlight-adjacent novellas and establishes Lift as a character the series returns to with increasing importance through Wind and Truth.",
    },
  ],
  sections: [
    {
      heading: 'Before you start',
      type: 'bullets',
      bullets: [
        'Each book is 1,000-1,330 pages. Most readers take 2-4 years to finish the arc. Prepare for the long game.',
        'Part of the broader Cosmere universe: connections deepen as you read more Sanderson, but each book stands alone.',
        'Rhythm of War (book 4) is the most divisive entry: slower and more focused on politics and mental health. It is also essential. Push through even if it feels like a detour.',
        'Arc 2 (books 6-10) is planned but has not been written. You will finish this and wait.',
      ],
    },
    {
      heading: 'The magic system',
      type: 'bullets',
      bullets: [
        'Stormlight: raw magical energy harvested from highstorms. It heals wounds, enhances strength, and fuels the powers of the Knights Radiant.',
        "Surgebinding: the Knights Radiant's magic. Ten orders, each bonded to a spren and capable of manipulating two natural Surges (forces like gravity, adhesion, and transformation). The system has discoverable rules.",
        'Shardblades and Shardplate: massive ancient weapons and armour of unknown origin, coveted by every army on Roshar. Every king wants one.',
        'Fabrials: mechanical devices powered by trapped spren. Magical technology that Sanderson uses to build out an industrial revolution by book 4.',
        'Spren: sentient manifestations of ideas and natural forces (winds, fire, emotions, concepts). The magic is inseparable from them.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Depression and suicidal ideation: Kaladin's arc deals directly with this. Handled with unusual care for the genre.",
        'War, slavery, and genocide are present throughout; they are purposeful and not gratuitous.',
        'Addiction is a significant subplot in Rhythm of War.',
        'Political occupation and ethnic tension, primarily in books 3-4.',
        'No explicit sexual content across the series.',
        'Right for: readers who want a fully realised world, characters with real psychological depth, and a magic system they can reason through.',
        'Not right for: readers who need momentum from page one: the opening requires patience.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "Kaladin's depression arc is the most discussed mental health portrayal in contemporary epic fantasy.",
        'The Words of Radiance climax is one of the finest action sequences in the genre.',
        "Oathbringer is the most emotionally complex book in the series: the full weight of Dalinar's arc lands in the final act, and what it reveals about him changes how book 1 reads.",
        'Roshar is one of the most fully realised secondary worlds in the genre: ecology, linguistics, history, and cosmology all present and internally consistent.',
        'Wind and Truth closes an arc that took 14 years to write. Few living authors have sustained a project at this scale.',
      ],
    },
    {
      heading: 'What you find out',
      type: 'spoiler',
      bullets: [
        'Shardblades (the most coveted weapons on Roshar) are the remnants of broken bonds between Knights Radiant and their spren. They are the corpses of dead spren and living Radiants can hear them scream. This is revealed gradually across books 1-3 and changes every prior scene involving them.',
        "Dalinar's visions connect to a history the world has deliberately forgotten. His personal past (what he did during the Rift) is revealed in Oathbringer and changes how you read his entire arc from the beginning.",
        'Wind and Truth closes the arc with consequences that extend beyond Roshar into the wider Cosmere. Readers following the full Cosmere will find the final chapters hit harder with context from Mistborn Era 2.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Books 1-2',
      level: 3,
      desc: 'War, loss, slavery: fundamentally hopeful despite the darkness',
    },
    { label: 'Books 3-4', level: 3, desc: 'Genocide, addiction, occupation: higher personal and political cost' },
    {
      label: 'Wind and Truth',
      level: 4,
      desc: 'Civilisational stakes: the consequences of five books converge',
    },
  ],
  metaDescription:
    'The Stormlight Archive reading order: all 5 books plus novellas in sequence - Warbreaker, Edgedancer and Dawnshard positioned where they belong.',
  lastUpdated: '2026-07-01',
  shortName: 'Stormlight Archive',
  finishedLabel: 'Finished the arc?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'the-way-of-kings',
  related: [
    'cosmere',
    'mistborn',
    'wheel-of-time',
    'malazan',
    'kingkiller',
    'first-law',
  ],
};
