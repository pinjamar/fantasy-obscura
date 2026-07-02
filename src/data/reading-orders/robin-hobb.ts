import type { ReadingOrderEntry } from '../reading-orders';

export const robinHobb: ReadingOrderEntry = {
  slug: 'robin-hobb',
  name: 'Realm of the Elderlings',
  author: 'Robin Hobb',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - sixteen books across five series (1995-2017)',
  description:
    "Sixteen books across five interconnected series, all set in the same world, all building toward a conclusion that has been in progress since 1995. Robin Hobb writes character-driven fantasy with a genius for emotional devastation; her protagonists make choices that hurt, and she never lets them off easily. The Fool (Fitz's closest companion through all three of his trilogies) and the Fitz/Fool relationship are the emotional spine of the entire sequence. Follow the Robin Hobb reading order exactly: the reveals across series depend on it.",
  darknessDisplay:
    '🕯️🕯️🕯️🕯️ Dark - grief and trauma throughout; emotionally devastating rather than graphically violent',
  orderNote:
    'Publication order. The Rain Wild Chronicles (books 10-13) can be read after completing the Tawny Man or after the full sequence; both work.',
  cardsPosition: 'above',
  cards: [
    {
      title: "🗡️ Fitz's Arc (9 books)",
      body: 'FitzChivalry Farseer is the protagonist of three separate trilogies spanning his entire life (from orphaned bastard to old man). The Farseer Trilogy, The Tawny Man, and Fitz and the Fool form one complete emotional arc. Read them in order, no exceptions.',
      color: 'blue',
    },
    {
      title: '🚢 The Liveship Question',
      body: "Can you skip Liveship Traders? Technically yes; Fitz's story continues without it. But the mythology of the Elderlings, the liveships, and the Servants underpins Assassin's Fate in ways that only make full sense with Liveship context.",
      color: 'green',
    },
    {
      title: '💔 Emotional Warning',
      body: "Robin Hobb writes with an unusual commitment to emotional consequence: her characters make choices that hurt, and those choices stay with them. Fitz is a frustrating protagonist by design; his passivity and self-sabotage are deliberate and specific. Do not get attached to anyone. Come prepared.",
      color: 'red',
    },
    {
      title: '🐉 Rain Wild Chronicles',
      body: 'Optional but enriching. Set in the same world with new characters: damaged dragons and the lost Elderling cities. Best read between Tawny Man and Fitz & the Fool. Skip it if you want to stay with Fitz; read it if you want the full world.',
      color: 'amber',
    },
    {
      title: '🎭 The Fool',
      body: "The Fool is Fitz's closest companion across all three of his trilogies: a prophet, a mystery, and the character most readers find hardest to leave behind. Their relationship develops across three separate trilogies and twenty years in the text; it is the axis around which the entire sequence turns. His identity and what he truly wants from Fitz are revealed gradually. Do not look anything up. Let it unfold.",
      color: 'purple',
    },
    {
      title: '⚡ Wit and Skill',
      body: "Fitz uses two magic systems. The Skill is a telepathic royal magic: coveted, formally trained, and dangerous to use alone. The Wit is a deep bond with animals: powerful, intimate, and culturally despised as bestial. Both shape his identity. The tension between one legitimised magic and one persecuted one runs through all nine of his books. Neither is simply a tool; both carry cost.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'The Farseer Trilogy',
      sublabel: 'start here',
      noteType: 'required',
      note: 'All three essential. Each book ends on a devastating note; have the next ready.',
      books: [
        {
          title: "Assassin's Apprentice",
          slug: 'assassins-apprentice',
          status: 'mandatory',
          note: 'Start here. FitzChivalry Farseer, royal bastard and assassin-in-training. Quiet, character-driven, devastating by the end.',
          page_count: 356,
          publication_year: 1995,
        },
        {
          title: 'Royal Assassin',
          slug: 'royal-assassin',
          status: 'mandatory',
          note: "The stakes rise sharply. Court politics, the Wit bond with Nighteyes, and Hobb's gift for slow emotional devastation at full strength.",
          page_count: 675,
          publication_year: 1996,
        },
        {
          title: "Assassin's Quest",
          slug: 'assassins-quest',
          status: 'mandatory',
          note: 'Long quest structure, deeply interior. Divisive; some find it too slow. The emotional resolution of the trilogy depends entirely on it.',
          page_count: 757,
          publication_year: 1997,
        },
      ],
    },
    {
      label: 'Liveship Traders',
      sublabel: 'new POVs, same world - do not skip',
      noteType: 'required',
      note: "New characters and merchant ships, but the world-building here is load-bearing for everything that follows, especially the Fool trilogy. There is also a short prequel story 'Homecoming' (~50 pages, in the Legends II anthology) covering the first liveship voyage; read it before Ship of Magic if you can find it, but it's not essential.",
      books: [
        {
          title: 'Ship of Magic',
          slug: 'ship-of-magic',
          status: 'mandatory',
          note: 'Different characters, same world. Sentient ships, a merchant family in crisis, and pirates. Essential for the later Fitz books.',
          page_count: 880,
          publication_year: 1998,
        },
        {
          title: 'The Mad Ship',
          slug: 'the-mad-ship',
          status: 'mandatory',
          note: "The Liveship Traders hits its stride. Althea, Brashen, and the Paragon form the central relationship triangle: complicated, damaged, and essential.",
          page_count: 906,
          publication_year: 1999,
        },
        {
          title: 'Ship of Destiny',
          slug: 'ship-of-destiny',
          status: 'mandatory',
          note: 'Closes the Liveship arc and quietly sets up the mythology that underpins the entire Elderlings world. Do not skip this.',
          page_count: 789,
          publication_year: 2000,
        },
      ],
    },
    {
      label: 'The Tawny Man Trilogy',
      sublabel: 'Fitz returns',
      noteType: 'required',
      note: 'Directly continues the Farseer Trilogy 15 years later. The Fitz/Fool relationship becomes the emotional core of the entire sequence.',
      books: [
        {
          title: 'The Wilful Princess and the Piebald Prince',
          slug: 'the-wilful-princess-and-the-piebald-prince',
          status: 'supplementary',
          note: "Novella (~64 pages) telling the history of how the Wit became a persecuted magic in the Six Duchies: the backstory the Tawny Man trilogy references but never fully explains. Best read before Fool's Errand.",
          page_count: 64,
          publication_year: 2013,
        },
        {
          title: "Fool's Errand",
          slug: 'fools-errand',
          status: 'mandatory',
          note: 'Fitz returns, fifteen years later. Both he and the Fool are changed by the interval; the dynamic that opens here is quieter and more weighted than the Farseer years.',
          page_count: 661,
          publication_year: 2001,
        },
        {
          title: 'Golden Fool',
          slug: 'golden-fool',
          status: 'mandatory',
          note: "Court intrigue, the Wit persecutions, and the Fool's identity pulled into sharp focus.",
          page_count: 688,
          publication_year: 2002,
        },
        {
          title: "Fool's Fate",
          slug: 'fools-fate',
          status: 'mandatory',
          note: 'The conclusion of the Tawny Man, and in many ways of the Fitz arc as a whole. Hobb goes further emotionally than most readers expect.',
          page_count: 896,
          publication_year: 2003,
        },
      ],
    },
    {
      label: 'The Rain Wild Chronicles',
      sublabel: 'optional - same world, new characters',
      noteType: 'optional',
      note: 'Returns to the Liveship world. Enriches Fitz and the Fool but not required to follow it. Read if you loved Liveship Traders.',
      books: [
        {
          title: 'Dragon Keeper',
          slug: 'dragon-keeper',
          status: 'optional',
          note: 'Returns to the Liveship world with new characters and the damaged dragons of the Rain Wilds.',
          page_count: 404,
          publication_year: 2009,
        },
        {
          title: 'Dragon Haven',
          slug: 'dragon-haven',
          status: 'optional',
          note: 'Continues directly from Dragon Keeper. The dragon migration provides mythology that enriches Fitz & the Fool.',
          page_count: 429,
          publication_year: 2010,
        },
        {
          title: 'City of Dragons',
          slug: 'city-of-dragons',
          status: 'optional',
          note: 'The lost Elderling city revealed. More world-building than plot.',
          page_count: 368,
          publication_year: 2012,
        },
        {
          title: 'Blood of Dragons',
          slug: 'blood-of-dragons',
          status: 'optional',
          note: 'Closes the Rain Wild Chronicles. Recommended if you want the full Elderlings picture before reading the final Fitz trilogy.',
          page_count: 418,
          publication_year: 2013,
        },
      ],
    },
    {
      label: 'Fitz and the Fool',
      sublabel: 'the finale - read everything above first',
      noteType: 'required',
      note: 'All sixteen books converge here. Hobb closes arcs open since 1995.',
      books: [
        {
          title: "Fool's Assassin",
          slug: 'fools-assassin',
          status: 'mandatory',
          note: 'Fitz in his sixties, settled; and then everything changes. The ending of book one is not safe.',
          page_count: 752,
          publication_year: 2014,
        },
        {
          title: "Fool's Quest",
          slug: 'fools-quest',
          status: 'mandatory',
          note: 'The middle book of the final trilogy: urgent, desperate, and building toward a conclusion decades in the making.',
          page_count: 752,
          publication_year: 2015,
        },
        {
          title: "Assassin's Fate",
          slug: 'assassins-fate',
          status: 'mandatory',
          note: 'The end of everything. All sixteen books converge here. Read with tissues nearby.',
          page_count: 944,
          publication_year: 2017,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'FitzChivalry Farseer',
      role: "Royal bastard; assassin-in-training; protagonist across all three Fitz trilogies",
      color: 'blue',
      why_they_work:
        "Fitz is unusual because his limitations are structural rather than a plot device. His self-defeating patterns come from trauma and loyalty, not authorial convenience, and Hobb never resolves them cleanly. The reader comes to understand across nine books that his passivity and self-sabotage are the books' argument about what damage done early does to a person over a lifetime. His frustration IS the emotion Hobb is studying.",
    },
    {
      name: 'The Fool',
      role: "Prophet; mystery; Fitz's closest companion and the emotional spine of the sequence",
      color: 'purple',
      why_they_work:
        "The Fool works because Hobb systematically withholds what he actually is and what he actually wants for the entire first and second trilogies. The reader's relationship with him develops alongside Fitz's, which means the reveals in the third trilogy land with the weight of 20 years of accumulated trust. His card covers his role; the structural point is that the mystery is the mechanism: understanding him too early would collapse the sequence.",
    },
    {
      name: 'Nighteyes',
      role: "Wild wolf; Fitz's Wit-bonded companion through the Farseer and Tawny Man trilogies",
      color: 'green',
      why_they_work:
        "Nighteyes is the version of Fitz that chooses presence over obligation. His perspective (rendered through the Wit bond) provides a clean contrast to Fitz's complicated human loyalties: where Fitz agonizes and second-guesses, Nighteyes simply wants to run, eat, and be beside his companion. That contrast runs through the Farseer and Tawny Man trilogies as a sustained argument about what kind of life Fitz is sacrificing.",
    },
    {
      name: 'Althea Vestrit',
      role: "Merchant's daughter; protagonist of the Liveship Traders; sailor",
      color: 'amber',
      why_they_work:
        "Althea's arc is about claiming ownership of what is rightfully hers in a world that doesn't recognize her right to it. The Liveship Traders works as a parallel sequence because she has a completely different relationship to power and inheritance than Fitz does, and her determination gives the trilogy its own emotional register rather than functioning as a sidetrack from the main sequence.",
    },
    {
      name: 'Paragon',
      role: "The 'mad' liveship; oldest and most damaged of the sentient vessels",
      color: 'red',
      why_they_work:
        "Paragon is genuinely dangerous, genuinely damaged, and simultaneously the Liveship trilogy's clearest argument about the ethics of ownership. He has been locked in place for decades, literally blinded, and his eventual transformation is among the most complete arcs in the trilogy. He also carries more of the world-mythology that the Fitz/Fool finale requires than any other character outside the main sequence.",
    },
  ],
  sections: [
    {
      heading: 'What to know',
      type: 'bullets',
      bullets: [
        "Hobb's pacing is slow and deliberate; these are character-first novels where plot momentum is secondary to emotional development.",
        "Assassin's Fate is 944 pages and needs every one of them. It is the conclusion to a 22-year story and should be read last.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Grief, trauma, self-sacrifice, and loneliness are present throughout all sixteen books. This is not escapist fantasy.',
        'The Farseer Trilogy and Tawny Man include depictions of torture and forced psychological violation (the Skill used coercively). The damage is treated as permanent rather than healed.',
        'The Wit is depicted as culturally despised throughout the Tawny Man trilogy; the persecution of Wit-users is sustained and specific.',
        'No explicit sexual content. Violence is present but not graphic; the damage in these books is almost entirely psychological and cumulative.',
        'The Rain Wild Chronicles has a noticeably lighter tone than the Fitz trilogies: a genuine change of register for readers who need a break from the emotional weight.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "Assassin's Apprentice (1995) established a model for the first-person interior fantasy narrator where the narrator's limitation is structural: Fitz's compromised perspective comes from trauma and loyalty, not authorial convenience. That model shaped character-driven fantasy across the following two decades.",
        "The Liveship Traders (1998-2000) ran a separate female-protagonist cast in the same world with no crossover contamination, demonstrating that a shared world could sustain genuinely independent emotional registers. The Elderlings mythology it introduces underpins Assassin's Fate seventeen years later.",
        'The sixteen-book sequence (1995-2017) is one of the longest completed single-author epic fantasy sequences in English without estate continuation, collaborative writing, or abandoned arcs. Hobb finished what she started.',
        "The Fitz/Fool relationship across nine books is the most sustained two-character emotional arc in commercial epic fantasy, built across three separate trilogies and twenty years in the text, with the resolution in Assassin's Fate carrying the weight of every book that preceded it.",
      ],
    },
  ],
  darkness: [
    {
      label: 'The Farseer Trilogy',
      level: 3,
      desc: 'Moderate - loss, sacrifice, identity',
    },
    {
      label: 'The Liveship Traders',
      level: 3,
      desc: 'Moderate - slavery, family collapse, survival',
    },
    {
      label: 'The Tawny Man',
      level: 4,
      desc: 'Dark - cumulative grief, persecution, devastating choices',
    },
    {
      label: 'Rain Wild Chronicles',
      level: 2,
      desc: 'Mild - lighter tone, character-driven discovery',
    },
    {
      label: 'Fitz and the Fool',
      level: 4,
      desc: 'Dark - loss compounding over 22 years, no easy resolutions',
    },
  ],
  metaDescription:
    "The Robin Hobb reading order: all 16 books across five series in the Realm of the Elderlings, from Assassin's Apprentice to Assassin's Fate, with guidance on what to read and what to skip.",
  lastUpdated: '2026-07-01',
  shortName: 'Robin Hobb',
  finishedLabel: 'Finished the Elderlings?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'assassins-apprentice',
  related: ['first-law', 'wheel-of-time', 'asoiaf', 'kingkiller', 'malazan', 'earthsea'],
};
