import type { ReadingOrderEntry } from '../reading-orders';

export const brokenEarth: ReadingOrderEntry = {
  slug: 'broken-earth',
  name: 'The Broken Earth',
  author: 'N.K. Jemisin',
  seriesStatus: 'complete',
  seriesStatusLabel:
    '✅ Complete - 3 books (2015-2017), all Hugo Award winners',
  description:
    "Three books. All three won the Hugo Award for Best Novel in consecutive years. No author had done that before. N.K. Jemisin's The Broken Earth is set on a supercontinent called the Stillness, a place where massive geological apocalypses (called Fifth Seasons) periodically reset civilization. Orogenes (people who can control seismic forces) are both essential to survival and systematically enslaved by the societies that need them. The series begins with a Fifth Season already in progress and opens in second person. That is not a gimmick. It is structural.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  groups: [
    {
      label: 'The Broken Earth',
      sublabel: 'read in publication order',
      note: 'Three books, complete. Read consecutively: the structure builds across all three and the conclusion requires the full trilogy.',
      noteType: 'required',
      books: [
        {
          title: 'The Fifth Season',
          slug: 'the-fifth-season',
          status: 'mandatory',
          note: "The world ends. Narrated in second person: 'you' are Essun, an orogene searching for her daughter during an extinction-level catastrophe. Three timelines run in parallel. The second-person narration and the structure are both deliberate. Both become clear.",
          page_count: 468,
          publication_year: 2015,
        },
        {
          title: 'The Obelisk Gate',
          slug: 'the-obelisk-gate',
          status: 'mandatory',
          note: 'The scope of the catastrophe and what caused it begins to emerge. The systems of oppression are examined more directly. Won the 2017 Hugo Award for Best Novel.',
          page_count: 410,
          publication_year: 2016,
        },
        {
          title: 'The Stone Sky',
          slug: 'the-stone-sky',
          status: 'mandatory',
          note: 'The conclusion. Do not read reviews before finishing: the ending is widely discussed and the resolution is a significant part of what makes the series what it is. Won the 2018 Hugo Award.',
          page_count: 416,
          publication_year: 2017,
        },
      ],
    },
    {
      label: 'Inheritance Trilogy',
      sublabel: "separate world - Jemisin's debut series",
      note: 'No connection to the Broken Earth: different world, different magic, different everything. A secondary world where gods are enslaved and their children rule an empire. Read in order. Jemisin has described this as the series that taught her to write; it is more conventional in structure than Broken Earth but shares the same interest in power and oppression.',
      noteType: 'optional',
      books: [
        {
          title: 'The Hundred Thousand Kingdoms',
          slug: 'the-hundred-thousand-kingdoms',
          status: 'supplementary',
          note: 'A young woman from a conquered people is summoned to the palace of the ruling family and named heir, entangled with enslaved gods. Strong debut, complete story.',
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
          note: "Narrated by Sieh, the god of childhood. The trilogy's most ambitious and structurally unusual entry.",
          page_count: 397,
          publication_year: 2011,
        },
      ],
    },
    {
      label: 'The Dreamblood Duology',
      sublabel: 'separate world - Egyptian-inspired fantasy',
      note: 'No connection to the Broken Earth or the Inheritance Trilogy. Set in an ancient Egyptian-inspired city where priests harvest the dreams of the dying. Complete two-book story.',
      noteType: 'optional',
      books: [
        {
          title: 'The Killing Moon',
          slug: 'the-killing-moon',
          status: 'supplementary',
          note: 'Priests who harvest dream-essence from the dying to heal or kill. A meditation on faith, duty, and what institutions do in the name of religion.',
          page_count: 289,
          publication_year: 2012,
        },
        {
          title: 'The Shadowed Sun',
          slug: 'the-shadowed-sun',
          status: 'supplementary',
          note: 'Set ten years after The Killing Moon. Can be read after book one or as a standalone. Quieter and more atmospheric than the Inheritance Trilogy. Worth seeking out.',
          page_count: 353,
          publication_year: 2012,
        },
      ],
    },
    {
      label: 'The Great Cities Series',
      sublabel: 'separate world - contemporary urban fantasy',
      note: 'No connection to the Broken Earth. Contemporary urban fantasy in which the spirits of great cities (New York, London, Paris) are embodied as people. Ongoing; two books published.',
      noteType: 'optional',
      books: [
        {
          title: 'The City We Became',
          slug: 'the-city-we-became',
          status: 'supplementary',
          note: 'New York City is being born as a living entity: six boroughs, six avatars, under attack from a cosmic force. Faster and more accessible than Broken Earth. Contemporary setting, lower darkness level, still unmistakably Jemisin.',
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
    'Read in publication order: The Fifth Season, The Obelisk Gate, The Stone Sky. All three books are needed to understand what the first one is doing. The structure is deliberate and builds across the full trilogy.',
  cardsPosition: 'above',
  cards: [
    {
      title: "👁️ The Second Person",
      body: "The Fifth Season is narrated in second person: 'you do this, you feel that, you watch your world fall apart.' The choice is structural, not experimental. It takes roughly 20 pages to stop noticing. By the end of the trilogy the reason for it is explicit and recontextualizes everything the narration has been doing from the first page. The 'you' has a name. What that name means changes how you read the earlier chapters.",
      color: 'purple',
    },
    {
      title: '🌀 Three Timelines',
      body: "The first book runs three narrative threads in parallel, all following different points in the same character's life. The structure is not explained upfront. Going in knowing this makes the early chapters easier to navigate. The three threads converge, and the point at which they snap together is when the book's full architecture becomes clear.",
      color: 'blue',
    },
    {
      title: '🏆 Three Hugo Awards',
      body: "N.K. Jemisin won the Hugo for Best Novel three years in a row: 2016, 2017, 2018, one for each book in this trilogy. No author had done that before. No author has done it since. Each book was judged individually and each won independently.",
      color: 'amber',
    },
    {
      title: '🌍 The World',
      body: "The Stillness is a single supercontinent on a geologically unstable planet periodically reset by extinction-level events called Fifth Seasons. Civilizations build up and get knocked back to the Stone Age on a cycle running for tens of thousands of years. Orogenes (people who can sense and control geological energy) are essential to survival and treated accordingly: enslaved, controlled, and deployed as tools by the societies that cannot survive without them. The magic is physical and biological, rooted in geology, and inseparable from the politics of oppression.",
      color: 'green',
    },
    {
      title: '📚 Jemisin\'s Other Series',
      body: "Jemisin has three other series, none connected to Broken Earth. The City We Became (Great Cities) is the most accessible: contemporary urban fantasy where the boroughs of New York become human avatars. The Hundred Thousand Kingdoms (Inheritance Trilogy) was her debut: more conventional in structure, same interest in power and oppression. The Dreamblood Duology is Egyptian-inspired, quieter and more atmospheric, and the least read of her series.",
      color: 'zinc',
    },
    {
      title: '🔥 How Dark Is It?',
      body: "The Fifth Season opens with the death of a child. Slavery, genocide, and systemic racial oppression are not metaphors used at a safe distance: they are the central subject of all three books. Violence against orogenes is depicted directly. The darkness is inseparable from what the series argues about power, survival, and what civilizations do to the people they need but refuse to treat as people. There is no buffer between the reader and these themes.",
      color: 'red',
    },
  ],
  characters: [
    {
      name: 'Essun',
      role: "The 'you' of The Fifth Season",
      color: 'blue',
      why_they_work:
        "Jemisin's argument is that second-person narration is not a stylistic choice: it is the only form that makes dissociation from yourself legible when survival requires it. The 'you' has a name by the end of book 1, and what that name means changes how you read everything that came before it.",
    },
    {
      name: 'Alabaster',
      role: 'Orogene, Essun\'s former partner',
      color: 'amber',
      why_they_work:
        "The orogene who cracked the continent open and started the Fifth Season the series begins during. He is not a villain. His reasons are explicit and defensible: the existing system was not reformable. Whether the reader agrees is the question the series builds toward.",
    },
    {
      name: 'Nassun',
      role: "Essun's daughter, POV character in The Stone Sky",
      color: 'green',
      why_they_work:
        "Her parallel journey arrives at the opposite conclusion from her mother's about what to do with the world. The argument between their two choices is what the trilogy is actually about.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Slavery, genocide, and systemic racial oppression are central themes throughout all three books: not background, not metaphor at a distance.',
        'Violence is present throughout, including violence against children and orogenes. The series does not look away.',
        'No explicit sexual content. Romance is present but minimal.',
        'Right for: readers who want SFF that engages directly with systemic oppression and racial power as its explicit subject. Not right for: readers who need emotional distance from their fiction\'s political content.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Jemisin is the first African American author to win the Hugo for Best Novel, and the first author of any background to win it three consecutive times.',
        'The trilogy is taught in universities as speculative fiction that engages directly with race, oppression, and systemic power rather than using fantasy as displacement.',
        'The second-person narration is studied in writing programs as a structural choice with a specific political argument embedded in it.',
        'Published 2015-2017, the series arrived at a moment when discussions of systemic racism in the United States were intensifying and was received as directly engaged with that context.',
        'Influenced a wave of secondary-world fantasy that treats systemic oppression as its explicit subject rather than its backdrop.',
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
    'The Broken Earth reading order: all three N.K. Jemisin books in sequence - the only trilogy where every book won the Hugo Award for Best Novel.',
  lastUpdated: '2026-06-26',
  finishedLabel: 'Finished the trilogy?',
  booksLikeSlug: 'the-fifth-season',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: [
    'locked-tomb',
    'earthsea',
    'malazan',
    'robin-hobb',
    'gene-wolfe',
    'asoiaf',
  ],
};
