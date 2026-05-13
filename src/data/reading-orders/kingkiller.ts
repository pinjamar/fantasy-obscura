import type { ReadingOrderEntry } from '../reading-orders';

export const kingkiller: ReadingOrderEntry = {
  slug: 'kingkiller',
  name: 'The Kingkiller Chronicle',
  author: 'Patrick Rothfuss',
  seriesStatus: 'incomplete',
  seriesStatusLabel: '⚠️ Incomplete — 2 of 3 books published',
  description:
    'A legendary hero sits in a country inn and tells a scribe his life story over three days. The Kingkiller Chronicle is built around a structural tension: the Kvothe narrating is broken and hiding, while the Kvothe in the story is brilliant and rising. Rothfuss writes with more craft and precision than almost anyone working in the genre — The Name of the Wind remains one of the most technically accomplished debuts in modern fantasy. Be aware before you begin: book 3 has been in development since 2011 with no confirmed release date. The two published books end on open threads.',
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
      note: 'Day two. Longer and more divisive, but essential. The Adem sequences split readers.',
      page_count: 994,
      publication_year: 2011,
    },
    {
      title: 'The Slow Regard of Silent Things',
      slug: 'the-slow-regard-of-silent-things',
      status: 'supplementary',
      note: 'Novella about Auri alone in the Underthing. No plot, pure atmosphere. Read only if you loved Auri.',
      page_count: 159,
      publication_year: 2014,
    },
    {
      title: 'The Narrow Road Between Desires',
      slug: 'the-narrow-road-between-desires',
      status: 'supplementary',
      note: 'Bast novella, an expansion of the short story "The Lightning Tree." Reveals more about who Bast is and what he wants. Optional, but rewards readers who found him interesting.',
      page_count: 159,
      publication_year: 2023,
    },
    {
      title: 'The Doors of Stone',
      slug: null,
      status: 'upcoming',
      note: 'Book 3 and the trilogy finale. No release date as of 2026 - in development since 2011 - biggest wait in all fantasy.',
      page_count: null,
      publication_year: null,
    },
  ],
  orderNote: 'Start with The Name of the Wind. No other order is possible.',
  cards: [
    {
      title: '✍️ The Prose',
      body: 'Rothfuss writes with more precision and beauty than almost anyone in the genre. The Name of the Wind is the most technically accomplished debut in modern fantasy. The prose alone is reason enough to read it.',
      color: 'blue',
    },
    {
      title: '⏳ The Wait',
      body: 'Book 3 has had no release date since 2011. Go in knowing the series ends mid-story and may wait years more. Many readers choose to wait until The Doors of Stone is announced before starting. Neither choice is wrong.',
      color: 'amber',
    },
    {
      title: '📖 The Novella',
      body: 'The Slow Regard of Silent Things is optional. Rothfuss himself warns in the foreword that it is not for everyone. It follows Auri with almost no plot. Skip it unless you found her fascinating. You will miss nothing essential.',
      color: 'zinc',
    },
    {
      title: '🎭 The Frame Narrative',
      body: 'The series opens with an older, quieter Kvothe running a roadside inn under a false name. He is a living legend who has chosen to disappear. The story he tells to the Chronicler is his own past. It is told by someone who already knows how it all ends. That structural irony runs through every page.',
      color: 'purple',
    },
    {
      title: '🧙 The Magic',
      body: 'Two systems: sympathy (a physics-based discipline using mental links between objects that requires equations and concentration) and naming (knowing the true name of a thing gives power over it which is rare, extraordinary, unpredictable). The University teaches both alongside alchemy and sygaldry. The systems are rigorously defined and central to the plot.',
      color: 'green',
    },
    {
      title: '💔 The Tragedy',
      body: 'Kvothe is telling his story to a Chronicler in three days. The present-day version of him is deliberately diminished. Something happened between the brilliant student in the story and the quiet innkeeper telling it. That gap is one of the most quietly devastating structural choices in the genre.',
      color: 'red',
    },
  ],
  sections: [
    {
      heading: 'Before you start',
      type: 'bullets',
      bullets: [
        'Decide before you start: wait for The Doors of Stone to be announced, or read now knowing the series ends mid-story. Both are valid choices.',
        'Slow-burn pacing is intentional - book 1 covers roughly one year at University, book 2 a second year. This is a character study as much as a plot.',
        "The Wise Man's Fear is longer and more divisive than book 1. The Adem sequences in particular split readers. The second half recovers.",
        'Kvothe is an unreliable narrator - he is telling his own legend and may be embellishing. Take the heroics with appropriate scepticism.',
      ],
    },
    {
      heading: 'The magic system',
      type: 'bullets',
      bullets: [
        'Sympathy: a physics-based discipline. Practitioners form mental links between objects, then use concentration and precise equations to move energy between them. The stronger the mental discipline, the more effective the working.',
        'Naming: the true language - knowing the true name of a thing (wind, fire, stone) gives power over it. Rare and extraordinary. Kvothe has a talent for it that frightens his teachers.',
        'Sygaldry: sympathy principles applied to written runes — a form of magical engineering used for lamps, clocks, and tools.',
        'The University teaches all of these as formal disciplines alongside alchemy and artificing. The academic setting grounds the magic in a rigorous, school-based logic.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Poverty and hardship in early chapters are unflinching — the years on the streets of Tarbean are not softened.',
        "The Wise Man's Fear contains explicit sexual content, particularly the Felurian chapters.",
        'Violence is present but not the focus. The series is more interested in consequence than action.',
        'Right for: readers who want literary precision, unreliable narrators, and prose that rewards close reading.',
        'Not right for: readers who need plot closure or who struggle to commit to an unfinished series.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'The Name of the Wind raised the floor for prose quality in epic fantasy — it proved the genre could sustain the same craft demands as literary fiction.',
        'The University sequences established a template for magical academia that influenced a wave of subsequent fantasy.',
        'The series is one of the few in the genre where the writing itself (not the plot, not the world) is the primary draw. Readers return to reread passages.',
        'Despite the long wait for book 3, the first two books repay rereading independently of what comes next.',
      ],
    },
    {
      heading: 'What you find out',
      type: 'spoiler',
      bullets: [
        "The Chandrian killed Kvothe's family. His entire arc from book 1 is building toward understanding and confronting them. As of book 2 he has made almost no direct progress — the mystery is deliberately slow.",
        'The frame narrative implies the catastrophe is recent - the world outside the inn is also falling apart, and people connect both to Kvothe. Whatever he did (or failed to do) has consequences beyond his own story.',
        "Denna's patron is composing a song about the Chandrian that reframes them as heroes. Given what the Chandrian did to Kvothe's family, this is either deeply significant or a deliberate misdirection. Unresolved as of book 2.",
      ],
    },
  ],
  darkness: [
    {
      label: 'The Name of the Wind',
      level: 3,
      desc: 'Poverty, loss, abuse — but youthful energy dominates',
    },
    {
      label: "The Wise Man's Fear",
      level: 3,
      desc: 'War, assassins, fae — darker and more complex',
    },
  ],
  metaDescription:
    "The Kingkiller Chronicle reading order: The Name of the Wind, The Wise Man's Fear, and The Slow Regard of Silent Things — with context on the wait for book 3.",
  lastUpdated: '2026-05-13',
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
