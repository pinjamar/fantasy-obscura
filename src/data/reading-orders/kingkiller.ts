import type { ReadingOrderEntry } from '../reading-orders';

export const kingkiller: ReadingOrderEntry = {
  slug: 'kingkiller',
  name: 'The Kingkiller Chronicle',
  author: 'Patrick Rothfuss',
  seriesStatus: 'incomplete',
  seriesStatusLabel: '⚠️ Incomplete - 2 of 3 books published',
  description:
    'A legendary hero sits in a country inn and tells a scribe his life story over three days. The Kingkiller Chronicle is built around a structural tension: the Kvothe in the story is brilliant, rising, and apparently unstoppable. The Kvothe doing the telling is broken, hiding under a false name, and refuses to explain why. Rothfuss writes with more precision and beauty than almost anyone working in the genre. The Name of the Wind is the most technically accomplished debut in modern fantasy; the prose alone is reason enough to read it. Two books are published. A third has been in development since 2011 with no confirmed release date. Go in knowing the series ends mid-story. Many readers choose to wait until The Doors of Stone is announced before starting, and that is a completely valid choice. The two novellas (The Slow Regard of Silent Things and The Narrow Road Between Desires) are supplementary; Rothfuss himself warns in the foreword of Silent Things that it is not for everyone. Skip both unless those specific characters pulled you in. You will miss nothing essential to the main story.',
  darknessDisplay: '🕯️🕯️🕯️ Moderate darkness',
  cardsPosition: 'above',
  books: [
    {
      title: 'The Name of the Wind',
      slug: 'the-name-of-the-wind',
      status: 'mandatory',
      note: 'Day one of Kvothe telling his story. Lyrical, slow-burn, unforgettable prose.',
      page_count: 662,
      publication_year: 2007,
    },
    {
      title: "The Wise Man's Fear",
      slug: 'the-wise-mans-fear',
      status: 'mandatory',
      note: 'Day two. Longer and more divisive, but essential. The Adem sequences split readers; the second half recovers.',
      page_count: 994,
      publication_year: 2011,
    },
    {
      title: 'The Slow Regard of Silent Things',
      slug: 'the-slow-regard-of-silent-things',
      status: 'supplementary',
      note: 'Novella about Auri alone in the Underthing. No plot, pure atmosphere. Skip unless Auri specifically pulled you in.',
      page_count: 159,
      publication_year: 2014,
    },
    {
      title: 'The Narrow Road Between Desires',
      slug: 'the-narrow-road-between-desires',
      status: 'supplementary',
      note: "Bast novella, an expansion of the short story 'The Lightning Tree.' Reveals what Bast actually wants and what he is willing to do for it. Optional. Read after The Wise Man's Fear.",
      page_count: 159,
      publication_year: 2023,
    },
    {
      title: 'The Doors of Stone',
      slug: null,
      status: 'upcoming',
      note: 'Book 3 and the trilogy finale. No release date as of 2026. In development since 2011.',
      page_count: null,
      publication_year: null,
    },
  ],
  orderNote: 'Start with The Name of the Wind. No other order is possible.',
  cards: [
    {
      title: '⏳ The Wait',
      body: "Book 3 (The Doors of Stone) has been in development since 2011 with no publisher announcement as of 2026. The longest publicly acknowledged wait for a series finale in commercial fantasy. Two choices: read now knowing the series ends mid-story with no resolution, or wait for an announcement before starting. The two existing books stand on their own terms. That does not change where they stop.",
      color: 'red',
    },
    {
      title: '🎭 The Frame Narrative',
      body: "The series opens with an older, quieter Kvothe running a roadside inn under a false name. He is a living legend who has chosen to disappear. The story he tells the Chronicler is his own past, told by someone who already knows how it ends. That structural irony runs through every page. He is also telling his own legend. Take the heroics with appropriate scepticism.",
      color: 'purple',
    },
    {
      title: '💔 The Tragedy',
      body: "The present-day Kvothe is deliberately diminished: something recent broke him, and the world outside the inn is also falling apart. The catastrophe is not just personal history. Strangers connect the state of the world to Kvothe's name. That gap between the story and the telling is one of the most quietly devastating structural choices in recent fantasy.",
      color: 'amber',
    },
    {
      title: '🧙 The Magic',
      body: "Three systems: sympathy (a physics-based discipline using mental links between objects, requiring equations and concentration), naming (knowing the true name of a thing gives power over it: rare, extraordinary, and dangerous to the practitioner), and sygaldry (sympathy principles applied to written runes, used for lamps, clocks, tools). The University teaches all three as formal academic disciplines alongside alchemy and artificing. The systems are rigorously defined and central to the plot.",
      color: 'green',
    },
    {
      title: '📝 The Prose',
      body: "The Name of the Wind is the most technically accomplished prose debut in modern fantasy: the sentences have rhythm, the metaphors are built rather than grabbed, the description is specific where other writers are generic. Rothfuss controls the transition between summary and scene better than almost any other writer working at this length. The University chapters move slowly because the student life they depict moves slowly. That is a structural choice, not a failure.",
      color: 'blue',
    },
    {
      title: '💃 Denna',
      body: "Kvothe's great obsession and the book's most divisive character. Her apparent inconsistency is Kvothe's limited view, not a writing failure: the entire Denna thread is filtered through his POV, which means the reader sees her the way an infatuated nineteen-year-old sees her, not how she sees herself. Her patron and her movements remain unexplained across two books. Whether book 3 has answers that change this is the central unanswered question about the series.",
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Kvothe',
      role: 'Protagonist and narrator; legendary figure hiding in a country inn',
      color: 'red',
      why_they_work:
        "Two versions of him run simultaneously: the brilliant, rising student in the story and the broken, hiding man telling it. What he says about himself is unreliable in ways he may not fully understand: he is narrating his own legend to a Chronicler, which means every act of heroism carries the weight of self-mythology. The gap between the two Kvothes is the book's actual subject.",
    },
    {
      name: 'Denna',
      role: "Kvothe's great obsession; musician and the series' central mystery",
      color: 'purple',
      why_they_work:
        "The most structurally interesting character in the series and the most complained-about. She is written entirely through Kvothe's perspective, which is a perspective that cannot see her clearly. Her patron, her movements, and her choices are withheld not because Rothfuss is hiding them from the reader but because Kvothe doesn't know them. The reader and Kvothe are equally in the dark, for the same reason.",
    },
    {
      name: 'Bast',
      role: 'Student and companion to Kvothe in the frame narrative',
      color: 'blue',
      why_they_work:
        "The most important character in the frame narrative after Kvothe himself. He is not human, he cares about Kvothe's recovery from whatever broke him, and his reasons for wanting Kvothe to tell his story are not what they appear to be on first read. The Narrow Road Between Desires makes his motives explicit: what he is prepared to do for Kvothe is the most unsettling element of the frame.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'The pacing is deliberate: book 1 covers roughly one year at the University, book 2 a second year. This is a character study built inside a larger mystery. Plot advancement is not the primary draw.',
        'Poverty and hardship in early chapters are unflinching: the years on the streets of Tarbean are detailed and not softened.',
        "The Wise Man's Fear contains explicit sexual content, particularly the Felurian chapters.",
        "The Adem sequences in The Wise Man's Fear are the most divisive section in the series: a significant tonal departure from the University setting. The second half of book 2 returns to a more familiar register.",
        'Violence is present but not the primary register. The series is more interested in consequence than action.',
        'The series is unfinished. Book 3 has no release date. Starting now means stopping at the end of book 2 with no resolution.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'The Name of the Wind demonstrated that epic fantasy prose could be as precise and controlled as literary fiction, and found a large readership doing it. It raised expectations for prose craft across the genre.',
        'The University sequences established a template for magical academia that influenced a wave of subsequent fantasy in the 2010s.',
        "The series is one of the few in the genre where the prose itself is the primary draw rather than the plot or world. Readers return to reread passages from book 1 in isolation. That is not normal for epic fantasy.",
        "Despite the long wait for book 3, the first two books hold up as reading experiences independently of what comes next.",
      ],
    },
    {
      heading: 'What you find out',
      type: 'spoiler',
      bullets: [
        "The Chandrian killed Kvothe's family. His entire arc from book 1 is building toward understanding and confronting them. As of book 2 he has made almost no direct progress: the mystery is deliberately slow.",
        "The frame narrative implies the catastrophe is recent: the world outside the inn is also falling apart, and strangers connect both to Kvothe. Whatever he did (or failed to do) has consequences beyond his own story.",
        "Denna's patron is composing a song about the Chandrian that reframes them as heroes. Given what the Chandrian did to Kvothe's family, this is either deeply significant or a deliberate misdirection. Unresolved as of book 2.",
      ],
    },
  ],
  darkness: [
    {
      label: 'The Name of the Wind',
      level: 3,
      desc: 'Poverty, loss, abuse. Youthful energy dominates despite the hardship.',
    },
    {
      label: "The Wise Man's Fear",
      level: 3,
      desc: 'War, assassins, fae. Darker and more complex than book 1; explicit sexual content in the Felurian chapters.',
    },
  ],
  metaDescription:
    "The Kingkiller Chronicle reading order: The Name of the Wind, The Wise Man's Fear, and The Slow Regard of Silent Things - with context on the wait for book 3.",
  lastUpdated: '2026-07-01',
  shortName: 'Kingkiller',
  finishedLabel: 'Want more literary fantasy?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'the-name-of-the-wind',
  related: [
    'first-law',
    'stormlight',
    'wheel-of-time',
    'malazan',
    'earthsea',
    'mistborn',
  ],
};
