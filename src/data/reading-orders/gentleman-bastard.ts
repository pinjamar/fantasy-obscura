import type { ReadingOrderEntry } from '../reading-orders';

export const gentlemanBastard: ReadingOrderEntry = {
  slug: 'gentleman-bastard',
  name: 'Gentleman Bastard',
  author: 'Scott Lynch',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - 3 books published, book 4 due June 2026',
  description:
    "The Gentleman Bastard Sequence is heist fiction: elaborate cons, genuine reversals, and a character partnership between Locke Lamora and Jean Tannen that carries all three published books. They run grifts in Camorr, a city of canals and criminal guilds built on alien glass ruins whose builders vanished without explanation. The first book is nearly self-contained; the setup, escalation, and resolution all happen within its pages. Each subsequent book relocates to a new city with its own criminal ecosystem and political logic. Book four is due June 2026 after a decade of delays. The three published books stand on their own; the first especially.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  orderNote:
    'Start with The Lies of Locke Lamora. The first book resolves fully and works as a standalone. Red Seas Under Red Skies and The Republic of Thieves build on the same characters but move to new cities with new plots. The Thorn of Emberlain (book four) is expected June 2026.',
  books: [
    {
      title: 'The Lies of Locke Lamora',
      slug: 'the-lies-of-locke-lamora',
      status: 'mandatory',
      note: "Camorr, the Gentlemen Bastards, the con, and its unravelling. Lynch alternates between Locke's childhood training and the present-day heist, withholding just enough to keep the reversals landing. Functional as a standalone if the series status puts you off committing to the full sequence.",
      page_count: 487,
      publication_year: 2006,
    },
    {
      title: 'Red Seas Under Red Skies',
      slug: 'red-seas-under-red-skies',
      status: 'mandatory',
      note: "Locke and Jean relocate to Tal Verrar (a casino republic) and run a new con while being simultaneously blackmailed into becoming pirates. The two-track plot takes longer to converge than book one, but Jean is substantially more central here and the back half lands. The ending is deliberately frustrating.",
      page_count: 558,
      publication_year: 2007,
    },
    {
      title: 'The Republic of Thieves',
      slug: 'the-republic-of-thieves',
      status: 'mandatory',
      note: "Finally introduces Sabetha (the long-referenced love interest who has been absent for two books) and sets her against Locke as an opponent. The Bondsmagi's internal politics come into focus for the first time. Extended flashbacks trace the Gentlemen Bastards' early years; the present-day plot is slower than books one or two.",
      page_count: 640,
      publication_year: 2013,
    },
    {
      title: 'The Thorn of Emberlain',
      slug: 'the-thorn-of-emberlain',
      status: 'upcoming',
      note: 'Expected June 2026 after a long delay. The first new entry in the sequence since The Republic of Thieves in 2013.',
      page_count: null,
      publication_year: 2026,
    },
    {
      title: 'The Ministry of Necessity',
      slug: null,
      status: 'upcoming',
      note: 'Title announced, no release date.',
      page_count: null,
      publication_year: null,
    },
    {
      title: 'The Mage and the Master Spy',
      slug: null,
      status: 'upcoming',
      note: 'Title announced, no release date.',
      page_count: null,
      publication_year: null,
    },
    {
      title: 'Inherit the Night',
      slug: null,
      status: 'upcoming',
      note: 'Planned finale of the sequence. Title announced, no release date.',
      page_count: null,
      publication_year: null,
    },
  ],
  cardsPosition: 'above',
  cards: [
    {
      title: '🏙️ Camorr',
      body: "Camorr draws heavily on Venice: canals, a brutal class divide, criminal guilds operating beneath an elaborate noble surface. But it sits on top of something older: massive towers and structures of alien glass built by a civilisation called the Eldren, who vanished without explanation. The glass cannot be cut, carved, or damaged by any known means. The Eldren are never explained. Lynch never uses the glass as a plot device either. Its only function is to make Camorr feel like it grew around something real rather than was built for the story.",
      color: 'blue',
    },
    {
      title: '🎭 The Con Is the Plot',
      body: "Lynch doesn't use heists as backdrop: the planning, execution, and collapse of elaborate cons is the actual narrative structure. The reader is often deliberately kept out of the full picture while the characters work, then shown what was actually happening. Book one pulls this off several times across a long, complex narrative. Locke Lamora rewards close reading.",
      color: 'green',
    },
    {
      title: '🌍 A New City Every Book',
      body: "Locke and Jean never return to Camorr after book one. Each subsequent book relocates the story: Tal Verrar (casino republic), Karthain (Bondsmagi territory). Lynch builds each setting as carefully as Camorr, with different politics, different criminal ecosystems, different architecture and social logic. Camorr is largely a book-one setting. The sequels are as dense and specific, but different.",
      color: 'purple',
    },
    {
      title: '✨ The Bondsmagi',
      body: "The Bondsmagi are a closed guild of sorcerers who sell their abilities as mercenaries and answer to no political authority. They are rare and enormously powerful: a single one changes every tactical calculation in any scene they enter. Lynch uses them carefully. They're not everywhere, but when one appears the threat level resets completely. Their internal politics, hinted at in books one and two, become a central story in book three.",
      color: 'amber',
    },
    {
      title: '⏳ The Long Wait',
      body: "The Thorn of Emberlain (book four) has been in progress since The Republic of Thieves in 2013. Scott Lynch has been candid about the personal struggles (illness, a difficult divorce) that delayed the work. It is now expected June 2026. Books five through seven have announced titles but no release timelines. Starting the series means the wait for the full sequence remains substantial.",
      color: 'red',
    },
    {
      title: '❤️ Sabetha',
      body: "Locke's love interest is referenced throughout books one and two without ever appearing in the present-day timeline. She arrives in book three as an opponent rather than an ally. Lynch deliberately withholds her for two books. When she arrives in person, she's more complicated than the idealised version Locke carried. Lynch is more interested in what she thinks of him than in giving the relationship a clean arc. The result divides readers more than anything else in the series.",
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Locke Lamora',
      role: 'Con artist; leader of the Gentlemen Bastards',
      color: 'blue',
      why_they_work:
        "The gap between his reputation (master deceiver, feared by criminal guilds) and his actual position (permanently overextended, running schemes that depend on nothing going wrong) is what makes him interesting. He's not the smartest man in the room. He's the one who acts as if he is, and mostly gets away with it.",
    },
    {
      name: 'Jean Tannen',
      role: "Locke's partner; enforcer and counterweight",
      color: 'amber',
      why_they_work:
        "Not a sidekick. He's what makes the partnership functional: Locke provides the schemes, Jean provides the physical capability and the emotional steadiness that stops Locke from collapsing them both. Book two is where Lynch makes clear that the series is equally his story.",
    },
    {
      name: 'Sabetha',
      role: "Locke's long-absent love interest; antagonist in book three",
      color: 'red',
      why_they_work:
        "Locke's longing for her is the emotional undercurrent of books one and two. She exists in his history but not in the story. Her arrival in book three as an opponent with full knowledge of his methods is the structural payoff of that absence. Lynch is less interested in resolving the relationship than in what it reveals about both of them.",
    },
    {
      name: 'The Bondsmagi',
      role: 'Guild of mercenary sorcerers; recurring threat',
      color: 'purple',
      why_they_work:
        "Serve as a power-reset mechanism: whenever the Gentlemen Bastards have worked themselves into a position of relative control, a Bondsmage's arrival makes everything they've built meaningless. Lynch is careful not to overuse them. Their scarcity is what makes each appearance alarming rather than routine.",
    },
  ],
  sections: [
    {
      heading: 'What the series is',
      type: 'bullets',
      bullets: [
        'Not quest fantasy. Not magic-heavy. Locke has no magic whatsoever. The Bondsmagi exist but are used sparingly and deliberately. The focus is almost entirely on people, schemes, and the criminal underworld.',
        'The Locke-Jean partnership is the emotional core. The plot mechanics (schemes, reversals, escape plans) run on their dynamic and on what they will do for each other when a plan breaks down.',
        'The three published books are noticeably uneven. Lies of Locke Lamora is tight and propulsive. Red Seas Under Red Skies is more diffuse; two plot threads take time to converge. The Republic of Thieves slows the present-day story for extended flashback sequences.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness type: graphic violence, torture, and real loss when the cons go wrong. Lynch follows through on consequences. The series earns its darkness by making what it costs specific.',
        'Romance: minimal. The Locke-Sabetha dynamic is a complicated history, not a present-day romance. Jean has a relationship in book two.',
        'No explicit sexual content.',
      ],
    },
  ],
  darkness: [
    {
      label: 'The Lies of Locke Lamora',
      level: 4,
      desc: 'Graphic violence, torture, and real loss. The con has consequences that reach past the con itself.',
    },
    {
      label: 'Red Seas Under Red Skies',
      level: 3,
      desc: 'Comparable in tone to book one, slightly less brutal.',
    },
    {
      label: 'The Republic of Thieves',
      level: 3,
      desc: 'Less violent than book one: the darkness is emotional and political.',
    },
  ],
  metaDescription:
    'The complete Gentleman Bastard reading order: The Lies of Locke Lamora, Red Seas Under Red Skies, The Republic of Thieves - series status, hiatus explained, and whether to start.',
  booksLikeSlug: 'the-lies-of-locke-lamora',
  shortName: 'Gentleman Bastard',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Read the trilogy?',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse Grimdark',
  related: ['first-law', 'kingkiller', 'mistborn', 'malazan', 'mark-lawrence', 'robin-hobb'],
};
