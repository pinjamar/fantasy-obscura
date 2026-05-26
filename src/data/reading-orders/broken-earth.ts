import type { ReadingOrderEntry } from '../reading-orders';

export const brokenEarth: ReadingOrderEntry = {
  slug: 'broken-earth',
  name: 'The Broken Earth',
  author: 'N.K. Jemisin',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete — 3 books (2015–2017), all Hugo Award winners',
  description:
    "Three books. All three won the Hugo Award for Best Novel in consecutive years — the only author to achieve this. The Broken Earth is set on a supercontinent called the Stillness, where catastrophic geological events periodically end civilisation. Orogenes — people who can manipulate seismic forces — are feared, enslaved, and hunted by the societies that depend on them. The series opens with a fifth season already underway and a narrator addressing you in second person. That's deliberate. Start with The Fifth Season.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  groups: [
    {
      label: 'The Broken Earth',
      sublabel: 'read in publication order',
      note: 'Three books, complete. Read consecutively — the structure builds across all three and the conclusion only works if you reach it without gaps.',
      noteType: 'required',
      books: [
        {
          title: 'The Fifth Season',
          slug: 'the-fifth-season',
          status: 'mandatory',
          note: "The world ends. Narrated in second person — 'you' are Essun, an orogene searching for her daughter during an extinction-level catastrophe. Multiple timelines run in parallel. The second-person narration is intentional and the structure is deliberate; both become clear.",
          page_count: 468,
          publication_year: 2015,
        },
        {
          title: 'The Obelisk Gate',
          slug: 'the-obelisk-gate',
          status: 'mandatory',
          note: 'The scope of the catastrophe — and what caused it — begins to emerge. Widely considered the strongest book in the trilogy. Won the 2017 Hugo Award for Best Novel.',
          page_count: 410,
          publication_year: 2016,
        },
        {
          title: 'The Stone Sky',
          slug: 'the-stone-sky',
          status: 'mandatory',
          note: 'The conclusion. Do not read reviews before finishing — the ending is widely discussed. Won the 2018 Hugo Award.',
          page_count: 416,
          publication_year: 2017,
        },
      ],
    },
    {
      label: 'Inheritance Trilogy',
      sublabel: "separate world — Jemisin's debut series",
      note: 'No connection to the Broken Earth — different world, different magic, different everything. A secondary world where gods are enslaved and their children rule an empire. Read in order. Jemisin has described this as the series that taught her to write; it is more conventional in structure than Broken Earth but shares the same interest in power and oppression.',
      noteType: 'optional',
      books: [
        {
          title: 'The Hundred Thousand Kingdoms',
          slug: 'the-hundred-thousand-kingdoms',
          status: 'supplementary',
          note: 'A young woman from a conquered people is summoned to the palace of the ruling family and named heir — entangled with enslaved gods. Strong debut, complete story.',
          page_count: 427,
          publication_year: 2010,
        },
        {
          title: 'The Broken Kingdoms',
          slug: 'the-broken-kingdoms',
          status: 'supplementary',
          note: 'Set ten years after book one, different protagonist. A blind artist living in the shadow of the World Tree.',
          page_count: 397,
          publication_year: 2010,
        },
        {
          title: 'The Kingdom of Gods',
          slug: 'the-kingdom-of-gods',
          status: 'supplementary',
          note: "Narrated by Sieh, the god of childhood — the trilogy's most ambitious and structurally unusual entry.",
          page_count: 397,
          publication_year: 2011,
        },
      ],
    },
    {
      label: 'The Dreamblood Duology',
      sublabel: 'separate world — Egyptian-inspired fantasy',
      note: 'No connection to the Broken Earth or the Inheritance Trilogy. Set in an ancient Egyptian-inspired city where priests harvest the dreams of the dying. Complete two-book story.',
      noteType: 'optional',
      books: [
        {
          title: 'The Killing Moon',
          slug: 'the-killing-moon',
          status: 'supplementary',
          note: 'Priests who harvest dream-essence from the dying to heal or kill. A meditation on faith, duty, and what we do in the name of religion.',
          page_count: 289,
          publication_year: 2012,
        },
        {
          title: 'The Shadowed Sun',
          slug: 'the-shadowed-sun',
          status: 'supplementary',
          note: "Set ten years after The Killing Moon. Can be read after book one or as a standalone. Jemisin's most overlooked series.",
          page_count: 353,
          publication_year: 2012,
        },
      ],
    },
    {
      label: 'The Great Cities Series',
      sublabel: 'separate world — contemporary urban fantasy',
      note: 'No connection to the Broken Earth. Contemporary urban fantasy in which the spirits of great cities — New York, London, Paris — are embodied as people. Ongoing; two books published.',
      noteType: 'optional',
      books: [
        {
          title: 'The City We Became',
          slug: 'the-city-we-became',
          status: 'supplementary',
          note: "New York City is being born as a living entity — six boroughs, six avatars, under attack from a cosmic force. Faster and more accessible than Broken Earth. Good entry point into Jemisin's work for readers who want contemporary settings.",
          page_count: 437,
          publication_year: 2021,
        },
        {
          title: 'The World We Make',
          slug: 'the-world-we-make',
          status: 'supplementary',
          note: 'Concludes the Great Cities duology. Read directly after The City We Became.',
          page_count: 357,
          publication_year: 2022,
        },
      ],
    },
  ],
  orderNote:
    'Read in publication order: The Fifth Season → The Obelisk Gate → The Stone Sky. The structure is deliberate and requires nothing from the reader except patience.',
  cardsPosition: 'above',
  cards: [
    {
      title: "👁️ The 'You'",
      body: "The Fifth Season is narrated in second person — 'you do this, you feel that.' Most readers find it disorienting for the first chapter and then stop noticing it entirely. It is intentional, it is structural, and by the end of the trilogy the reason for it is one of the most discussed elements of the series. Do not let the unusual POV put you off in the opening pages.",
      color: 'purple',
    },
    {
      title: '🌀 Three Timelines',
      body: "The Fifth Season runs three narrative threads in parallel, set at different points in the same character's life. Readers who go in knowing this find the structure immediately readable. The timelines converge — that's not a spoiler, it's reassurance. The structure is a puzzle Jemisin has already solved; your job is to follow it.",
      color: 'blue',
    },
    {
      title: '🏆 Three Hugo Awards',
      body: "N.K. Jemisin won the Hugo Award for Best Novel three consecutive years — one for each book in the trilogy (2016, 2017, 2018). No author had done this before. The Broken Earth is the only trilogy in which every book individually won the field's top prize. This is not marketing copy; it is an accurate description of the series' standing in contemporary science fiction and fantasy.",
      color: 'amber',
    },
    {
      title: '🌍 The World',
      body: "The Stillness is a single supercontinent on a geologically unstable world, shaped by repeated catastrophes called fifth seasons. Orogenes — people with the ability to sense and control geological energy — are vital to civilisation and violently oppressed by it. The world is post-apocalyptic but also cyclically apocalyptic: the Stillness has ended and rebuilt civilisation many times. The magic system is physical, biological, and deeply political.",
      color: 'green',
    },
    {
      title: '📚 What to Read Next',
      body: "Jemisin has three other series, all listed below — none connected to the Broken Earth. The City We Became (Great Cities) is the most accessible entry if you want contemporary urban fantasy. The Hundred Thousand Kingdoms (Inheritance Trilogy) is her debut — more conventional in structure but shares the same preoccupation with power and oppression. The Dreamblood Duology is her most overlooked work: Egyptian-inspired, quieter, and very good.",
      color: 'zinc',
    },
    {
      title: '🔥 How Dark Is It?',
      body: 'The Broken Earth does not soften its subject matter. The series deals directly with slavery, genocide, racial oppression, and parental violence. The Fifth Season opens with the death of a child. These elements are thematically central — the series is in part a sustained meditation on what structural oppression does to people across generations. Readers who need emotionally safe fantasy should not start here. Readers who want fantasy that treats serious themes seriously should.',
      color: 'red',
    },
  ],
  sections: [
    {
      heading: 'Reading order notes',
      type: 'bullets',
      bullets: [
        'Publication order is the only order — The Fifth Season → The Obelisk Gate → The Stone Sky.',
        'Three timelines run in parallel through book one. The structure requires no effort to follow — just read forward.',
        "Avoid reviews of The Stone Sky before finishing — the ending is widely discussed and the series' resolution is a significant part of what people respond to.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Slavery, genocide, and systemic racial oppression are central themes throughout all three books — not background, not metaphor-at-a-distance.',
        'Violence is present throughout, including violence against children and orogenes. The series does not look away.',
        'No explicit sexual content. Romance is present but minimal.',
      ],
    },
  ],
  darkness: [
    {
      label: 'The Fifth Season',
      level: 4,
      desc: 'Opens with child death. Slavery, oppression, and apocalypse are the setting, not the climax.',
    },
    {
      label: 'The Obelisk Gate',
      level: 4,
      desc: 'Escalates in scope and thematic weight. The systems of oppression are examined more directly.',
    },
    {
      label: 'The Stone Sky',
      level: 4,
      desc: 'Heaviest emotional weight. The conclusions drawn about civilisation and violence are unflinching.',
    },
  ],
  metaDescription:
    'The Broken Earth reading order: all three N.K. Jemisin books in sequence — the only trilogy where every book won the Hugo Award for Best Novel.',
  lastUpdated: '2026-05-26',
  finishedLabel: 'Finished the trilogy?',
  booksLikeSlug: 'the-fifth-season',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: ['locked-tomb', 'earthsea', 'malazan', 'robin-hobb', 'gene-wolfe', 'asoiaf'],
};
