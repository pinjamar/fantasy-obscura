import type { ReadingOrderEntry } from '../reading-orders';

export const divergent: ReadingOrderEntry = {
  slug: 'divergent',
  name: 'Divergent',
  author: 'Veronica Roth',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    "A YA dystopian trilogy set in a future Chicago divided into five factions (Dauntless, Erudite, Abnegation, Candor, Amity), each built around a single virtue taken to its extreme. At sixteen, you choose your faction. You leave your family. You become someone new. Sixteen-year-old Tris Prior chooses Dauntless and discovers she is Divergent: someone who does not fit the system, and a threat to everyone who controls it. The world-building is done through immersion; Tris experiences factions, initiation, and the system's contradictions from inside them. The trilogy escalates in scope across all three books.",
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
          note: 'Tris transfers to Dauntless and endures brutal initiation. World-building through immersion. Fast, tense, action-driven.',
          page_count: 487,
          publication_year: 2011,
        },
        {
          title: 'Insurgent',
          slug: 'insurgent',
          status: 'mandatory',
          note: "The faction system cracks. Tris deals with survivor's guilt while uncovering the truth about her world. Darker and more emotionally demanding than book 1.",
          page_count: 525,
          publication_year: 2012,
        },
        {
          title: 'Allegiant',
          slug: 'allegiant',
          status: 'mandatory',
          note: 'Tris and Four leave Chicago. Dual POV. The most structurally ambitious book in the trilogy. The ending is permanent and intentional.',
          page_count: 526,
          publication_year: 2013,
        },
      ],
    },
    {
      label: "Four's Novellas",
      sublabel:
        "Tobias's POV - collected in Four: A Divergent Collection (2014)",
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
          note: "Four's Choosing Day and first weeks in Dauntless. His origin and why he left Abnegation.",
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
          note: 'Four confronts his father Marcus. Short and dark. The most emotionally intense of the four novellas.',
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
      note: 'We Can Be Mended is a short epilogue Roth released free online in 2018. The World of Divergent is a behind-the-scenes companion with faction manifestos, author notes, and a reader quiz.',
      noteType: 'optional',
      books: [
        {
          title: 'We Can Be Mended',
          slug: 'we-can-be-mended',
          status: 'optional',
          note: 'Short epilogue story (~40 pages) set five years after Allegiant, released free online in 2018.',
          page_count: 40,
          publication_year: 2018,
        },
        {
          title: 'The World of Divergent',
          slug: 'the-world-of-divergent-the-path-to-allegiant',
          status: 'supplementary',
          note: "Behind-the-scenes companion. Roth's path to Allegiant, faction manifestos, quiz. Non-fiction. For fans only.",
          page_count: 100,
          publication_year: 2013,
        },
      ],
    },
  ],
  orderNote:
    'Read the main trilogy first. The Four novellas cover the same timeline from his POV and are best read after Allegiant so the reframing has something to work with. We Can Be Mended is the emotional coda, available free online.',
  cardsPosition: 'above',
  cards: [
    {
      title: '🏙️ The Factions',
      body: 'Future Chicago is split into five factions: Dauntless (brave), Erudite (intelligent), Abnegation (selfless), Candor (honest), Amity (peaceful). At sixteen you choose which faction to join, possibly leaving your family forever. The system is deliberately reductive. The series uses that reductiveness as its central argument: reducing a person to one virtue is a form of control, not a solution. Tris is Divergent. Her aptitude fits more than one faction, which makes her a threat to everyone who runs the city.',
      color: 'blue',
    },
    {
      title: '⚡ The Hook',
      body: "The Dauntless initiation sequences are the engine of book 1. Fear simulations, physical trials, social warfare, and the constant threat of being cut and left factionless. Roth builds the world through what Tris experiences rather than what she is told. The faction system, its logic, and its contradictions all become clear through action. The larger conspiracy emerges from inside a story that already has momentum of its own.",
      color: 'green',
    },
    {
      title: '💔 The Ending',
      body: "Allegiant's ending is permanent, intentional, and has never been changed despite significant fan pressure. It is consistent with Tris's character arc from the first book: her values were defined from the start, and the ending follows from them. That does not make it easy. Go in knowing it is coming.",
      color: 'amber',
    },
    {
      title: '📖 The Four Novellas',
      body: "Five short stories (collected as Four: A Divergent Collection, 2014) told from Tobias 'Four' Eaton's POV: his Choosing Day, initiation, confrontation with his father Marcus, and the events of Divergent from his side. Best read after the trilogy, so the reframing has something to work with. The Transfer and The Son are the strongest.",
      color: 'purple',
    },
    {
      title: '🎬 The Adaptations',
      body: 'The film series (2014-2016) covers Divergent and Insurgent reasonably well. Allegiant was split into two films (Allegiant (2016) and Ascendant) but Ascendant was never made after poor box office performance. The story is unresolved on screen. Read the books for the actual ending.',
      color: 'red',
    },
    {
      title: '✍️ Veronica Roth',
      body: 'Roth wrote Divergent as a creative writing student at Northwestern University and sold it before she graduated. The series arrived at the peak of YA dystopian fiction in the early 2010s alongside The Hunger Games and The Maze Runner and sold over 35 million copies worldwide. She has since moved into adult science fiction with Chosen Ones (2020) and The Frilled Shark (2025).',
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Tris Prior',
      role: 'Divergent; former Abnegation, Dauntless initiate',
      color: 'blue',
      why_they_work:
        "She is not a chosen one in the conventional sense. She is a person the system cannot categorise and therefore cannot control. Her arc is defined by what she inherits from her parents (selflessness, courage) and what it actually costs to live those values in a system designed to weaponize them.",
    },
    {
      name: 'Four (Tobias Eaton)',
      role: "Dauntless instructor; Tris's partner",
      color: 'zinc',
      why_they_work:
        "His backstory is revealed across both the main trilogy and the POV novellas. The novellas retell events the reader already knows from Tris's perspective, and the reframing reveals how much she missed. He is not a foil for Tris but a separate person with a distinct relationship to fear, family, and loyalty.",
    },
    {
      name: 'Caleb Prior',
      role: "Tris's brother; Erudite transfer",
      color: 'amber',
      why_they_work:
        "His choices in Allegiant represent the failure mode of Erudite's ideal: the person who chooses information and institutional loyalty over family. His arc forces the series' central question: what do you actually value when the cost is real.",
    },
  ],
  sections: [
    {
      heading: 'What to know',
      type: 'bullets',
      bullets: [
        'The series escalates in scope and darkness across three books. Divergent is action-focused with clear immediate stakes. Allegiant opens the world up and deals with loss, identity, and systemic power on a much larger scale.',
        'Allegiant switches to dual POV; Tris and Four chapters alternate. This is a deliberate structural shift that begins from the first chapter of book 3.',
        'The faction system is intentionally reductive. The series deconstructs this as it progresses. The point is that reducing people to one virtue is a form of control, not a solution.',
        "Allegiant's ending is permanent and has never been revised. It is consistent with everything the series builds toward.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Violence is present throughout. Dauntless initiation involves physical combat, near-death situations, and psychological fear trials. Allegiant contains the series's most significant death.",
        'Romance is central to the series. The Tris and Four relationship drives significant plot and emotional weight across all three books.',
        'No explicit content. This is YA.',
        'Right for: readers who want fast-paced YA dystopian fiction with a strong female protagonist and escalating political stakes. Not right for: readers who need an unambiguously hopeful ending or a conventional redemptive arc.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Divergent',
      level: 3,
      desc: 'Moderate - action and training, some violence',
    },
    {
      label: 'Insurgent',
      level: 3,
      desc: 'Darker - trauma, guilt, heavier losses',
    },
    {
      label: 'Allegiant',
      level: 4,
      desc: 'Dark - significant sacrifice, controversial conclusion',
    },
  ],
  booksLikeSlug: 'divergent',
  metaDescription:
    'The Divergent reading order: Divergent, Insurgent, Allegiant, plus the Four novellas and epilogue in the right sequence.',
  shortName: 'Divergent',
  lastUpdated: '2026-06-26',
  finishedLabel: 'Finished the trilogy?',
  categoryHref: '/fantasy/academia',
  categoryLabel: 'Browse Academy Fantasy',
  related: [
    'throne-of-glass',
    'empyrean',
    'grishaverse',
    'acotar',
    'blood-and-ash',
    'inheritance-cycle',
  ],
};
