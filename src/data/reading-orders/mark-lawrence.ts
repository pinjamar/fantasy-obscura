import type { ReadingOrderEntry } from '../reading-orders';

export const markLawrence: ReadingOrderEntry = {
  slug: 'mark-lawrence',
  name: 'Mark Lawrence Universe',
  shortName: 'Mark Lawrence',
  author: 'Mark Lawrence',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ All four trilogies complete',
  description:
    "Four trilogies, two connected worlds, one deeply cohesive author vision. The Broken Empire and Red Queen's War share the same post-apocalyptic world, told concurrently from two very different protagonists. The Book of the Ancestor and Book of the Ice share the ice-bound world of Abeth. Lawrence writes morally complex antiheroes, dark humour and reveals that reframe everything you thought you knew. Start with Prince of Thorns (darker, divisive) or Prince of Fools (lighter entry point), both work. This guide covers the full Mark Lawrence reading order across all four series.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  groups: [
    {
      label: 'The Broken Empire',
      sublabel:
        'start here — or with Prince of Fools if you prefer lighter tone',
      noteType: 'required',
      note: "Read before or after Red Queen's War — both work. See the Jorg Problem card before you start.",
      books: [
        {
          title: 'Prince of Thorns',
          slug: 'prince-of-thorns',
          status: 'mandatory',
          note: 'Jorg is 14, leads a band of outlaws, and is deeply unsettling from page one. Lawrence earns the darkness.',
          page_count: 338,
          publication_year: 2011,
        },
        {
          title: 'King of Thorns',
          slug: 'king-of-thorns',
          status: 'mandatory',
          note: 'Jorg at 18. Non-linear structure adds layers. The world opens up considerably.',
          page_count: 442,
          publication_year: 2012,
        },
        {
          title: 'Emperor of Thorns',
          slug: 'emperor-of-thorns',
          status: 'mandatory',
          note: 'The conclusion. Everything about the world and its hidden history comes together.',
          page_count: 418,
          publication_year: 2013,
        },
      ],
    },
    {
      label: "The Red Queen's War",
      sublabel: 'same world, concurrent timeline — lighter tone',
      noteType: 'optional',
      note: 'Set in the same world as The Broken Empire, running concurrently. Prince Jalan Kendeth is a coward and a liar. He is a deliberate tonal contrast to Jorg. The two series briefly intersect (Jalan and Jorg share a scene). Can be read before or after Broken Empire.',
      books: [
        {
          title: 'Prince of Fools',
          slug: 'prince-of-fools',
          status: 'mandatory',
          note: 'Jalan Kendeth and the viking Snorri set off on an unwilling quest. Funnier and more accessible than Broken Empire. A good entry point if you want lighter fare first.',
          page_count: 337,
          publication_year: 2014,
        },
        {
          title: "The Liar's Key",
          slug: 'the-liars-key',
          status: 'mandatory',
          note: "The quest deepens. Lawrence's dark humour is at its best here.",
          page_count: 375,
          publication_year: 2015,
        },
        {
          title: 'The Wheel of Osheim',
          slug: 'the-wheel-of-osheim',
          status: 'mandatory',
          note: "The finale. Stakes rise to world-ending levels. Callbacks to Broken Empire land hardest if you've read both.",
          page_count: 393,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'Book of the Ancestor',
      sublabel: 'new world — start fresh',
      noteType: 'required',
      note: "Set on the ice-bound world of Abeth — a different world from the Broken Empire but connected in ways Lawrence reveals slowly. A convent of warrior nuns, a magic rooted in light and darkness, and a dying sun. Darker than Red Queen's War, with a very different kind of protagonist.",
      books: [
        {
          title: 'Red Sister',
          slug: 'red-sister',
          status: 'mandatory',
          note: 'Nona Grey is sold to a convent after nearly killing a boy. Learns to fight, kill, and wield the Path. Excellent magic system and character work.',
          page_count: 469,
          publication_year: 2017,
        },
        {
          title: 'Grey Sister',
          slug: 'grey-sister',
          status: 'mandatory',
          note: 'Nona faces internal politics and external threats to the convent. The magic deepens.',
          page_count: 400,
          publication_year: 2018,
        },
        {
          title: 'Holy Sister',
          slug: 'holy-sister',
          status: 'mandatory',
          note: 'The conclusion. War comes to the convent. Everything Lawrence built across three books pays off.',
          page_count: 330,
          publication_year: 2019,
        },
      ],
    },
    {
      label: 'Book of the Ice',
      sublabel: 'read after Book of the Ancestor',
      noteType: 'warning',
      note: 'Do not read before completing Book of the Ancestor — Book of the Ice contains significant spoilers for the Ancestor trilogy. Set in the same world (Abeth) but among the ice tribes far from the convent. Callbacks to Ancestor characters appear from book 2 onward.',
      books: [
        {
          title: 'The Girl and the Stars',
          slug: 'the-girl-and-the-stars',
          status: 'mandatory',
          note: 'Yaz is cast into the ice — literally. A different culture, a different magic, the same dying world.',
          page_count: 368,
          publication_year: 2020,
        },
        {
          title: 'The Girl and the Mountain',
          slug: 'the-girl-and-the-mountain',
          status: 'mandatory',
          note: 'Yaz climbs out of the ice world. Ancestor trilogy characters begin to appear.',
          page_count: 371,
          publication_year: 2021,
        },
        {
          title: 'The Girl and the Moon',
          slug: 'the-girl-and-the-moon',
          status: 'mandatory',
          note: 'The finale. Both Abeth trilogies converge. The full picture of this dying world snaps into focus.',
          page_count: 373,
          publication_year: 2023,
        },
      ],
    },
  ],
  orderNote:
    "Broken Empire and Red Queen's War can be read in either order — they are concurrent stories in the same world. Book of the Ancestor can be started independently. Book of the Ice must come after Book of the Ancestor.",
  cardsPosition: 'above',
  cards: [
    {
      title: '🗺️ Two Worlds',
      body: "Post-apocalyptic setting: Broken Empire + Red Queen's War (concurrent). Ice-bound Abeth: Book of the Ancestor + Book of the Ice. The worlds have a deep connection Lawrence reveals across all four trilogies.",
      color: 'blue',
    },
    {
      title: '⚔️ Two Entry Points',
      body: 'Start with Prince of Thorns for the darkest, most celebrated entry. If it gets to be too brutal for you, just start with Prince of Fools if you want a lighter tone (same world, comedic antihero, equally rewarding).',
      color: 'amber',
    },
    {
      title: '✍️ The Prose',
      body: "Lawrence writes with more literary precision than most grimdark authors. The darkness is never indulgent, it's controlled. The humour in Red Queen's War is genuinely funny, not just grimly ironic. First-person voice is his biggest strength: inhabiting a single character's worldview from inside with no distance.",
      color: 'purple',
    },
    {
      title: '⚡ The Jorg Problem',
      body: 'Prince of Thorns opens with Jorg Ancrath at 14 committing atrocities. This is not edgy marketing, it is the premise. Lawrence is asking whether a compelling character can exist without redemption being guaranteed. Jorg is the most divisive protagonist in modern grimdark. The opening pages will tell you which camp you are in.',
      color: 'red',
    },
    {
      title: '⚔️ Not Just Grimdark',
      body: "Book of the Ancestor is Lawrence doing something completely different. A convent of warrior nuns on a dying world, female protagonist, a magic system rooted in light rather than technology. Readers who bounced off Jorg often find it's their favourite of his series. The tonal shift from Broken Empire is intentional and striking.",
      color: 'green',
    },
    {
      title: '🔍 The Hidden Layer',
      body: 'The Broken Empire is set somewhere that feels like a distorted, mythologised past, but Lawrence does not tell you where. He plants clues and lets the reader piece it together. Discovering this while reading is one of the best experiences in the genre. Do not look it up before you get there.',
      color: 'zinc',
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        "The two Earth-set trilogies (Broken Empire + Red Queen's War) share the same world and timeline (Jorg and Jalan briefly share a scene). Reading both gives you the full picture.",
        "Book of the Ancestor is a clean entry point regardless of whether you've read the Broken Earth trilogies; it stands alone well.",
      ],
    },
    {
      heading: 'The world-building secret',
      type: 'spoiler',
      bullets: [
        'The Broken Empire is set on Earth — our Earth, roughly 1,000 years after a global nuclear war called "the Thousand Suns." The Builders are us. The ruins of our civilisation are everywhere.',
        'Magic in the Broken Empire world comes from the remnants of pre-war technology — what characters call "the old power" is something more familiar than it appears.',
        'Abeth (Book of the Ancestor / Book of the Ice) is the same Earth in a far more distant future — the sun is dying, the world freezing. The connection to the Broken Empire era is subtle but real.',
        'Lawrence plants clues across all four trilogies. Second reads reveal layers that were invisible the first time.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Prince of Thorns opens with very dark content involving Jorg as a child. This is not gratuitous, it is the foundation of his character arc.',
        'The Broken Empire is grimdark. Violence, moral ambiguity, and an unreliable narrator are features, not bugs.',
        "Red Queen's War is much lighter, dark fantasy with genuine comedy. Jalan is a deliberate foil to Jorg.",
        'Book of the Ancestor has violence but is less grimdark. Closer to dark YA in tone for the first book, though it deepens considerably.',
        'No explicit sexual content across any of the four series.',
        'Right for: readers who want literary grimdark with antiheroes, clever world-building, and precise prose.',
        'Not right for: readers who need protagonists to be moral or likeable.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Prince of Thorns (2011) arrived alongside Abercrombie and helped define the grimdark wave; literary ambition combined with an antihero who asked hard questions about what fiction owes its readers.',
        'The hidden layer in Broken Empire is one of the most celebrated pieces of world-building in modern fantasy. Lawrence earned a reputation for layered, re-readable fiction with it.',
        'The connection between the Earth trilogies and Abeth is quietly one of the most ambitious long-form world-building projects in contemporary fantasy. It is one planet written across four trilogies and millennia of time.',
        "Lawrence writes with more precision and control than most grimdark authors. The humour in Red Queen's War is genuinely funny, not just grimly ironic (a rarer skill than it sounds).",
      ],
    },
  ],
  darkness: [
    {
      label: 'Broken Empire',
      level: 5,
      desc: 'Brutal grimdark; violent, morally black antihero, unflinching from page one',
    },
    {
      label: "Red Queen's War",
      level: 3,
      desc: 'Dark fantasy with genuine comedy. Danger and loss beneath a lighter tone',
    },
    {
      label: 'Red Sister',
      level: 3,
      desc: 'Darker than expected YA. Violence with purpose, strong character foundation',
    },
    {
      label: 'Book of the Ancestor 2-3',
      level: 4,
      desc: 'Escalates significantly. War, sacrifice and a dying world closing in',
    },
    {
      label: 'Book of the Ice',
      level: 4,
      desc: 'Bleak and relentless, survival on a freezing world with high stakes',
    },
  ],
  metaDescription:
    'Mark Lawrence reading order: all four trilogies in sequence — Broken Empire, Red Queens War, Book of the Ancestor, and Book of the Ice.',
  booksLikeSlug: 'prince-of-thorns',
  lastUpdated: '2026-05-13',
  finishedLabel: 'Finished the Lawrence universe?',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse Grimdark',
  related: [
    'first-law',
    'black-company',
    'malazan',
    'asoiaf',
    'witcher',
    'robin-hobb',
  ],
};
