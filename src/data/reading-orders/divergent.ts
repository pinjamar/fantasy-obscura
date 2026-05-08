import type { ReadingOrderEntry } from '../reading-orders';

export const divergent: ReadingOrderEntry = {
  slug: 'divergent',
  name: 'Divergent',
  author: 'Veronica Roth',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ Series Complete',
  description:
    "A YA dystopian trilogy set in a future Chicago divided into five factions — Dauntless, Erudite, Abnegation, Candor, Amity — each representing a single virtue taken to extremes. Sixteen-year-old Tris Prior chooses to leave her family's faction and discovers she is Divergent, a threat to the system. Fast-paced and addictive, with one of YA's most debated endings. Divergent is where to start — the series is read in order: Divergent → Insurgent → Allegiant, with no required side reads. Go in knowing that Allegiant's ending is one of the most controversial in YA fiction.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  warning:
    'Allegiant (book 3) has a controversial ending that divided the fanbase strongly. Go in prepared.',
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
          status: 'supplementary',
          note: "Short story (~30 pages). Four's POV during the aptitude test and Choosing Ceremony. A good teaser for his perspective.",
          page_count: 36,
          publication_year: 2012,
        },
        {
          title: 'The Transfer',
          slug: 'the-transfer',
          status: 'supplementary',
          note: "Four's Choosing Day and first weeks in Dauntless. His origin — why he left Abnegation.",
          page_count: 68,
          publication_year: 2013,
        },
        {
          title: 'The Initiate',
          slug: 'the-initiate',
          status: 'supplementary',
          note: "Four's second year as a Dauntless initiate. Covers events before Divergent begins.",
          page_count: 58,
          publication_year: 2014,
        },
        {
          title: 'The Son',
          slug: 'the-son',
          status: 'supplementary',
          note: 'Four confronts his father Marcus. Short and dark — the most emotionally intense of the four novellas.',
          page_count: 51,
          publication_year: 2014,
        },
        {
          title: 'The Traitor',
          slug: 'the-traitor',
          status: 'supplementary',
          note: "Four's POV during the events of Divergent. Fills in what he was doing while Tris was in initiation.",
          page_count: 61,
          publication_year: 2014,
        },
      ],
    },
    {
      label: 'After the Trilogy',
      sublabel: 'Epilogue & companion',
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
      title: '⚡ The Hook',
      body: 'The faction system is an instantly compelling premise — which virtue would you choose? The initiation sequences in Dauntless are some of the most gripping in YA dystopian fiction.',
      color: 'blue',
    },
    {
      title: '💔 The Ending',
      body: "Allegiant's ending is one of the most discussed in YA fiction. It is intentional and consistent with Tris's character. Prepare yourself — then decide for yourself if it works.",
      color: 'amber',
    },
    {
      title: '🎬 The Adaptations',
      body: 'The film series (2014–2016) covers Divergent and Insurgent well. Allegiant was split into two films and the second was never made — the story is unresolved on screen. Read the books.',
      color: 'purple',
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        "Start with Divergent — no prior reading needed. The world is explained through Tris's eyes.",
        'Read all three back-to-back if possible — the story benefits from momentum and the wait between Insurgent and Allegiant is brutal.',
        'The Four novellas and We Can Be Mended are optional — best after Allegiant. We Can Be Mended is free online and worth reading if the ending hit hard.',
      ],
    },
    {
      heading: 'What to know',
      type: 'bullets',
      bullets: [
        'The series gets progressively darker. Divergent is action-focused; Allegiant deals with loss, identity, and sacrifice.',
        'Allegiant uses dual POV (Tris and Four alternating chapters) — a change from the first two books.',
        'The faction concept is intentionally reductive — the books are aware of this and deconstruct it over the trilogy.',
        "The film adaptations cover books 1 and 2 well. Allegiant's film split the story and was never finished.",
      ],
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
  finishedLabel: 'Finished the trilogy?',
  categoryHref: '/fantasy/academy',
  categoryLabel: 'Browse Academy Fantasy',
  related: ['throne-of-glass', 'empyrean'],
};
