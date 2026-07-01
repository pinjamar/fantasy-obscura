import type { ReadingOrderEntry } from '../reading-orders';

export const folkOfTheAir: ReadingOrderEntry = {
  slug: 'folk-of-the-air',
  name: 'The Folk of the Air',
  author: 'Holly Black',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Main trilogy complete - Stolen Heir duology complete',
  description:
    "Jude Duarte is mortal in a world where magic equals power, raised in Faerie after her parents were murdered and surrounded by fae who see her as lesser by nature. The Folk of the Air is about what she does with that. The enemies-to-lovers dynamic is structural, not cosmetic: Jude and Cardan are genuinely dangerous to each other throughout all three books. One of the fastest-reading YA trilogies in current fantasy.",
  darknessDisplay: '🕯️🕯️ Mild to Moderate',
  groups: [
    {
      label: 'The Folk of the Air',
      sublabel: 'main trilogy - read in publication order',
      note: 'Read in order. The Wicked King ends on a hard cliffhanger and The Queen of Nothing resolves it directly.',
      noteType: 'required',
      books: [
        {
          title: 'The Cruel Prince',
          slug: 'the-cruel-prince',
          status: 'mandatory',
          note: 'Start here. Jude navigates Faerie court politics with no magic and considerable ambition. Faster and sharper than the opening suggests.',
          page_count: 370,
          publication_year: 2018,
        },
        {
          title: 'The Wicked King',
          slug: 'the-wicked-king',
          status: 'mandatory',
          note: 'The best book in the trilogy. Higher stakes, more complex maneuvering. Ends on a hard cliffhanger.',
          page_count: 308,
          publication_year: 2019,
        },
        {
          title: 'The Queen of Nothing',
          slug: 'the-queen-of-nothing',
          status: 'mandatory',
          note: 'Resolves the cliffhanger directly. Read immediately after The Wicked King.',
          page_count: 336,
          publication_year: 2019,
        },
      ],
    },
    {
      label: 'Companion Novellas',
      sublabel: 'optional - short companion pieces for the main trilogy',
      note: 'Both are brief and optional. The Lost Sisters is best read after book 1. How the King of Elfhame is best read between books 2 and 3, or after the trilogy.',
      noteType: 'optional',
      books: [
        {
          title: 'The Lost Sisters',
          slug: 'the-lost-sisters',
          status: 'supplementary',
          note: "Taryn's perspective on the events of The Cruel Prince. 52 pages. Best read after book 1.",
          page_count: 52,
          publication_year: 2018,
        },
        {
          title: 'How the King of Elfhame Learned to Hate Stories',
          slug: 'how-the-king-of-elfhame-learned-to-hate-stories',
          status: 'supplementary',
          note: "Cardan's backstory: illustrated novella. Recontextualizes his behaviour in book 1. Best read between books 2 and 3 or after the trilogy.",
          page_count: 200,
          publication_year: 2020,
        },
      ],
    },
    {
      label: 'The Stolen Heir Duology',
      sublabel: "sequel series - Oak's story, set after the main trilogy",
      note: 'Follows Oak in a self-contained new story. Assumes you have finished the main trilogy. Jude and Cardan appear.',
      noteType: 'optional',
      books: [
        {
          title: 'The Stolen Heir',
          slug: 'the-stolen-heir',
          status: 'optional',
          note: 'Oak goes undercover among exiled fae in the north and gets captured by Wren, a faerie with a brutal past and power over cold. Enemies-to-lovers with a harsher edge than the main trilogy.',
          page_count: 292,
          publication_year: 2023,
        },
        {
          title: "The Prisoner's Throne",
          slug: 'the-prisoners-throne',
          status: 'optional',
          note: 'The tables turn: Oak is the prisoner and Wren holds the power. Dual POV. Jude and Cardan play a larger role here than in book 1.',
          page_count: 359,
          publication_year: 2024,
        },
      ],
    },
    {
      label: "Holly Black's Other Faerie World",
      sublabel: 'companion works - same world, different casts',
      note: 'Set in the same Faerie mythology with different characters. Not prerequisites. Read as companions after the main trilogy.',
      noteType: 'optional',
      books: [
        {
          title: 'Tithe',
          slug: 'tithe',
          status: 'supplementary',
          note: "Holly Black's debut. Kaye has always been able to see faeries and assumes they are harmless. The same mythology as Folk of the Air, written earlier and rougher.",
          page_count: 267,
          publication_year: 2002,
        },
        {
          title: 'Valiant',
          slug: 'valiant',
          status: 'supplementary',
          note: 'A teenage runaway falls in with homeless kids serving a troll beneath New York City. Entirely separate cast from Tithe. The faerie dust subplot is an addiction narrative.',
          page_count: 256,
          publication_year: 2005,
        },
        {
          title: 'Ironside',
          slug: 'ironside',
          status: 'supplementary',
          note: "Returns to Kaye and Roiben after Tithe. A poorly-timed declaration of love puts Roiben under a faerie oath and sends Kaye on a quest into the Unseelie court.",
          page_count: 323,
          publication_year: 2007,
        },
        {
          title: 'The Darkest Part of the Forest',
          slug: 'the-darkest-part-of-the-forest',
          status: 'supplementary',
          note: 'Standalone YA set in a small town bordering Faerie. Same mythological rules, entirely separate story.',
          page_count: 287,
          publication_year: 2015,
        },
      ],
    },
  ],
  orderNote:
    'Read the main trilogy in publication order. The Wicked King ends on a hard cliffhanger. Have The Queen of Nothing ready before you start book 2. Everything else is optional.',
  cardsPosition: 'above',
  cards: [
    {
      title: '⚔️ The Power Dynamic',
      body: 'The Cruel Prince is frequently described as enemies-to-lovers. The label is accurate but does not cover it: Jude and Cardan are genuinely dangerous to each other. Jude has no magic in a world where magic equals power; her intelligence, ambition, and willingness to out-manoeuvre everyone are her only tools. The power balance inverts, reverses, and inverts again across three books. The tension holds because neither character is safe from the other.',
      color: 'purple',
    },
    {
      title: '👑 Cardan',
      body: "Cardan is introduced as a villain and remains genuinely unpleasant for most of book 1. The series then changes what you understand about him without changing who he is. He is the reason the trilogy works. Going in knowing he is the love interest does not spoil anything. The mystery is why he was that way in book 1.",
      color: 'zinc',
    },
    {
      title: '🗡️ Jude',
      body: "Jude is mortal in a world of immortal fae who consider her lesser by nature. She does not accept this. The series is driven by her refusal to be powerless: through intelligence, political maneuvering, and a willingness to do things the fae will not. She is not a passive protagonist. The court politics work because she plays them better than people who have centuries of experience.",
      color: 'amber',
    },
    {
      title: '⚡ Read All Three First',
      body: 'Folk of the Air is one of the fastest-reading YA trilogies in current fantasy. The books are short (270–370 pages), the pacing is relentless, and The Wicked King ends on a cliffhanger that makes stopping physically difficult. Have all three before you start. You will finish them in a week.',
      color: 'blue',
    },
    {
      title: '📚 YA, But',
      body: 'Folk of the Air is published as YA and reads fast and clean: no explicit content, no graphic violence. But the themes are not soft: manipulation, power, identity, and moral compromise run through all three books. Jude is not a typical YA heroine and Cardan is not a typical YA love interest. Folk of the Air is the series that converts readers who have written off YA.',
      color: 'green',
    },
    {
      title: "🌿 Holly Black's Faerie",
      body: "Holly Black has been building the same Faerie mythology since 2002. Folk of the Air, the Modern Faerie Tales trilogy (Tithe, Valiant, Ironside), and The Darkest Part of the Forest all share the same world: same courts, same rules, occasional overlapping characters. Folk of the Air is the most refined version. The earlier books are written for a younger audience. Read them after the main trilogy, not before.",
      color: 'red',
    },
  ],
  characters: [
    {
      name: 'Jude Duarte',
      role: 'Mortal protagonist; POV narrator',
      color: 'amber',
      why_they_work:
        "Her specific psychology: she was raised in a world that called her lesser and decided to become something the fae have to respect. That is the driver for every major decision she makes. The series is a power grab told from the inside by someone who starts with nothing.",
    },
    {
      name: 'Cardan',
      role: 'High King of Faerie; love interest',
      color: 'zinc',
      why_they_work:
        "Functions as Jude's structural foil: she has no power and wants all of it; he has all the power and no interest in using it. His cruelty in book 1 has a specific cause the series reveals slowly. His arc is about what happens when someone who refuses power is forced to hold it.",
    },
    {
      name: 'Oak',
      role: "Jude's younger brother; protagonist of the Stolen Heir duology",
      color: 'green',
      why_they_work:
        "A child throughout the main trilogy, central to its stakes as the future king. The Stolen Heir duology picks him up as an adult. What the trilogy used him for becomes his origin story in the sequel.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'The Cruel Prince opens with the murder of two adults in front of children. Not graphic, but it sets the tone immediately.',
        'Court scenes involve deliberate cruelty targeting Jude throughout the series. The violence is social and psychological more than physical.',
        'No explicit content. Romance is central but the heat level is low throughout the trilogy.',
        'Moral complexity on all sides: Jude manipulates, deceives, and plays dangerous games. She is not always right.',
        'Right for: readers who want sharp YA fantasy with a morally complex protagonist and a slow-burn enemies dynamic. Not right for: readers who need clearly heroic protagonists or explicit romance content.',
      ],
    },
  ],
  darkness: [
    {
      label: 'The Cruel Prince',
      level: 2,
      desc: 'Murder in the opening pages. Court cruelty and social violence throughout: psychological more than physical.',
    },
    {
      label: 'The Wicked King',
      level: 3,
      desc: 'Higher stakes, genuine danger, political manipulation. The darkest entry in the trilogy.',
    },
    {
      label: 'The Queen of Nothing',
      level: 2,
      desc: 'Resolution-focused. The court manipulation of the earlier books gives way to direct confrontation.',
    },
    {
      label: 'The Stolen Heir Duology',
      level: 3,
      desc: 'Harsher setting: exiled fae in a dangerous northern land. Slightly darker in tone than the main trilogy.',
    },
  ],
  metaDescription:
    "The Folk of the Air reading order: main trilogy, companion novellas, the Stolen Heir duology, and Holly Black's other Faerie books.",
  lastUpdated: '2026-07-01',
  shortName: 'Folk of the Air',
  finishedLabel: 'Finished the trilogy?',
  booksLikeSlug: 'the-cruel-prince',
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  related: [
    'acotar',
    'throne-of-glass',
    'grishaverse',
    'caraval',
    'blood-and-ash',
    'empyrean',
  ],
};
