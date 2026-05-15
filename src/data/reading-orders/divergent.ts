import type { ReadingOrderEntry } from '../reading-orders';

export const divergent: ReadingOrderEntry = {
  slug: 'divergent',
  name: 'Divergent',
  author: 'Veronica Roth',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    "A YA dystopian trilogy set in a future Chicago divided into five factions — Dauntless, Erudite, Abnegation, Candor, Amity — each built around a single virtue taken to its extreme. At sixteen, you choose your faction. You leave your family. You become someone new. Sixteen-year-old Tris Prior chooses Dauntless and discovers she is Divergent — someone who doesn't fit the system, and a threat to everyone who controls it. Fast-paced and immediately addictive, read in order: Divergent → Insurgent → Allegiant. No required side reads.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  groups: [
    {
      label: 'The Main Trilogy',
      sublabel: 'read in order',
      books: [
        {
          title: 'Divergent',
          slug: 'divergent',
          status: 'mandatory',
          note: 'Tris transfers to Dauntless and endures brutal initiation. World-building through immersion — fast, tense, immediately addictive.',
          page_count: 487,
          publication_year: 2011,
        },
        {
          title: 'Insurgent',
          slug: 'insurgent',
          status: 'mandatory',
          note: "The faction system cracks. Tris deals with survivor's guilt while uncovering the truth about her world. Darker and more emotionally demanding.",
          page_count: 525,
          publication_year: 2012,
        },
        {
          title: 'Allegiant',
          slug: 'allegiant',
          status: 'mandatory',
          note: 'Tris and Four leave Chicago. Dual POV. The most ambitious and most divisive book — the ending is polarising but intentional.',
          page_count: 526,
          publication_year: 2013,
        },
      ],
    },
    {
      label: "Four's Novellas",
      sublabel:
        "Tobias's POV — collected in Four: A Divergent Collection (2014)",
      note: "All five pieces retell key events from Four's perspective. Read after the main trilogy, in any order. Published individually then collected in one volume.",
      noteType: 'optional',
      books: [
        {
          title: 'Free Four',
          slug: 'free-four',
          status: 'optional',
          note: "Short story (~30 pages). Four's POV during the aptitude test and Choosing Ceremony. A good teaser for his perspective.",
          page_count: 36,
          publication_year: 2012,
        },
        {
          title: 'The Transfer',
          slug: 'the-transfer',
          status: 'optional',
          note: "Four's Choosing Day and first weeks in Dauntless. His origin — why he left Abnegation.",
          page_count: 68,
          publication_year: 2013,
        },
        {
          title: 'The Initiate',
          slug: 'the-initiate',
          status: 'optional',
          note: "Four's second year as a Dauntless initiate. Covers events before Divergent begins.",
          page_count: 58,
          publication_year: 2014,
        },
        {
          title: 'The Son',
          slug: 'the-son',
          status: 'optional',
          note: 'Four confronts his father Marcus. Short and dark — the most emotionally intense of the four novellas.',
          page_count: 51,
          publication_year: 2014,
        },
        {
          title: 'The Traitor',
          slug: 'the-traitor',
          status: 'optional',
          note: "Four's POV during the events of Divergent. Fills in what he was doing while Tris was in initiation.",
          page_count: 61,
          publication_year: 2014,
        },
      ],
    },
    {
      label: 'After the Trilogy',
      sublabel: 'Epilogue & companion',
      note: "We Can Be Mended is a short epilogue Roth released free online in 2018 — written for readers who needed closure after Allegiant. The World of Divergent is a behind-the-scenes companion with faction manifestos, author notes, and a reader quiz.",
      noteType: 'optional',
      books: [
        {
          title: 'We Can Be Mended',
          slug: 'we-can-be-mended',
          status: 'optional',
          note: 'Short epilogue story (~40 pages) set five years after Allegiant. Written for fans who needed closure after the ending. Available free online.',
          page_count: 40,
          publication_year: 2018,
        },
        {
          title: 'The World of Divergent',
          slug: 'the-world-of-divergent-the-path-to-allegiant',
          status: 'supplementary',
          note: "Behind-the-scenes companion — Roth's path to Allegiant, faction manifestos, quiz. Non-fiction. For fans only.",
          page_count: 100,
          publication_year: 2013,
        },
      ],
    },
  ],
  orderNote:
    'Read the main trilogy first. The Four novellas cover the same timeline from his POV — best after Allegiant so you already know the full story. We Can Be Mended is the emotional coda if you need it.',
  cardsPosition: 'above',
  cards: [
    {
      title: '🏙️ The Factions',
      body: "Future Chicago is split into five factions — Dauntless (brave), Erudite (intelligent), Abnegation (selfless), Candor (honest), Amity (peaceful). At sixteen you choose which faction to join, possibly leaving your family forever. The system is elegant, instantly seductive, and built to crack. Tris is Divergent — her aptitude fits more than one faction, which makes her dangerous to everyone who runs the city.",
      color: 'blue',
    },
    {
      title: '⚡ The Hook',
      body: "The initiation sequences in Dauntless are some of the most gripping in YA dystopian fiction — fear simulations, physical trials, social warfare, and the constant threat of being cut and left factionless. Roth builds worldbuilding through experience rather than exposition. By the time the larger conspiracy emerges, you're already committed.",
      color: 'green',
    },
    {
      title: '💔 The Ending',
      body: "Allegiant's ending is one of the most debated in YA fiction. It is intentional, consistent with Tris's character arc from book one, and has never been changed despite significant fan pressure. Go in prepared. Whether it works is something readers disagree on — but it is not a mistake.",
      color: 'amber',
    },
    {
      title: '📖 The Four Novellas',
      body: "Five short stories (collected as Four: A Divergent Collection, 2014) told from Tobias 'Four' Eaton's POV — his Choosing Day, initiation, confrontation with his father Marcus, and the events of Divergent from his side. Best read after the trilogy, so the reframing has something to work with. The Transfer and The Son are the strongest.",
      color: 'purple',
    },
    {
      title: '🎬 The Adaptations',
      body: 'The film series (2014–2016) covers Divergent and Insurgent reasonably well. Allegiant was split into two films — Allegiant (2016) and Ascendant — but Ascendant was never made after poor box office performance. The story is unresolved on screen. Read the books for the actual ending.',
      color: 'red',
    },
    {
      title: '✍️ Veronica Roth',
      body: "Roth wrote Divergent as a creative writing student at Northwestern University and sold it before she graduated. The series was one of the defining YA dystopian trilogies of the early 2010s alongside The Hunger Games and The Maze Runner. She has since moved into adult science fiction — Chosen Ones (2020) and The Frilled Shark (2025).",
      color: 'zinc',
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        "Start with Divergent — no prior reading needed. The world is explained through Tris's eyes from the first chapter.",
        'Read all three back-to-back if possible — the story benefits from momentum and the cliffhangers between books are intentionally brutal.',
        'Save the Four novellas for after Allegiant — reading them first spoils key reveals in the main series. We Can Be Mended is free online and worth reading if the ending hit hard.',
      ],
    },
    {
      heading: 'What to know',
      type: 'bullets',
      bullets: [
        'The series escalates in scope and darkness across three books. Divergent is action-focused with clear immediate stakes; Allegiant opens the world up and deals with loss, identity, and systemic power on a much larger scale.',
        'Allegiant switches to dual POV — Tris and Four chapters alternate. This is a deliberate structural shift and not everyone welcomes it at first. Stay with it.',
        'The faction system is intentionally reductive. The series deconstructs this as it progresses — the point is that reducing people to one virtue is a form of control, not a solution.',
        "Allegiant's ending is permanent and has never been revised. It is consistent with everything the series builds toward. Prepare for it before you start book three.",
        'Right for: readers who enjoy fast-paced YA dystopian fiction with a strong female lead, sharp political ideas, and escalating stakes.',
        'Not right for: readers who need a traditional redemptive arc or an unambiguously hopeful ending.',
      ],
    },
    {
      heading: 'A note on Allegiant',
      type: 'warning',
      prose: "Allegiant's ending is one of the most controversial in YA fiction. It is permanent, intentional, and has never been changed despite significant fan pressure. Go in prepared.",
    },
  ],
  darkness: [
    {
      label: 'Divergent',
      level: 3,
      desc: 'Moderate — action and training, some violence',
    },
    {
      label: 'Insurgent',
      level: 3,
      desc: 'Darker — trauma, guilt, heavier losses',
    },
    {
      label: 'Allegiant',
      level: 4,
      desc: 'Dark — significant sacrifice, controversial conclusion',
    },
  ],
  booksLikeSlug: 'divergent',
  metaDescription:
    'The Divergent reading order: Divergent → Insurgent → Allegiant, plus the Four novellas and epilogue — in the right sequence.',
  shortName: 'Divergent',
  lastUpdated: '2026-05-15',
  finishedLabel: 'Finished the trilogy?',
  categoryHref: '/fantasy/academia',
  categoryLabel: 'Browse Academy Fantasy',
  related: ['throne-of-glass', 'empyrean', 'grishaverse', 'acotar', 'blood-and-ash', 'inheritance-cycle'],
};
