import type { ReadingOrderEntry } from '../reading-orders';

export const markLawrence: ReadingOrderEntry = {
  slug: 'mark-lawrence',
  name: 'Mark Lawrence Universe',
  shortName: 'Mark Lawrence',
  author: 'Mark Lawrence',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ All four trilogies complete',
  description:
    "Four trilogies, two connected worlds, one deeply cohesive author vision. The Broken Empire and Red Queen's War share the same post-apocalyptic world, told concurrently from two very different protagonists. The Book of the Ancestor and Book of the Ice share the ice-bound world of Abeth. Lawrence writes morally complex antiheroes with dark precision, and places hidden structural layers inside his world-building that only become legible in retrospect.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark - grimdark violence and moral complexity; varies significantly by series',
  groups: [
    {
      label: 'The Broken Empire',
      sublabel:
        'Start here - or with Prince of Fools for a lighter entry',
      noteType: 'required',
      note: "Read before or after Red Queen's War: both work. See the Jorg Problem card before you start.",
      books: [
        {
          title: 'Prince of Thorns',
          slug: 'prince-of-thorns',
          status: 'mandatory',
          note: 'Jorg is 14, leads a band of outlaws, and is deeply unsettling from page one. The darkness is structural, not decoration.',
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
      sublabel: 'Same world, concurrent timeline - lighter tone',
      noteType: 'optional',
      note: "Set in the same world as The Broken Empire, running concurrently. Prince Jalan Kendeth is a coward and a liar: a deliberate tonal contrast to Jorg. The two series briefly intersect (Jalan and Jorg share a scene). Can be read before or after Broken Empire.",
      books: [
        {
          title: 'Prince of Fools',
          slug: 'prince-of-fools',
          status: 'mandatory',
          note: 'Jalan Kendeth and the viking Snorri set off on an unwilling quest. Funnier and more accessible than Broken Empire. The lighter entry point into this world.',
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
          note: "The finale. Stakes rise to world-ending levels. Cross-series references to Broken Empire are only fully legible after reading both trilogies.",
          page_count: 393,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'Book of the Ancestor',
      sublabel: 'New world - start fresh',
      noteType: 'required',
      note: "Set on the ice-bound world of Abeth: a different world from the Broken Empire but connected in ways Lawrence reveals slowly. A convent of warrior nuns, a magic rooted in light and darkness, and a dying sun. Darker than Red Queen's War, with a very different kind of protagonist.",
      books: [
        {
          title: 'Red Sister',
          slug: 'red-sister',
          status: 'mandatory',
          note: 'Nona Grey is sold to a convent after nearly killing a boy. Learns to fight, kill, and wield the Path. Strong magic system and character foundation.',
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
          note: 'The conclusion. War comes to the convent. The full scope of what Lawrence built across three books becomes clear.',
          page_count: 330,
          publication_year: 2019,
        },
      ],
    },
    {
      label: 'Book of the Ice',
      sublabel: 'Read after Book of the Ancestor',
      noteType: 'warning',
      note: 'Do not read before completing Book of the Ancestor: Book of the Ice contains significant spoilers for the Ancestor trilogy. Set in the same world (Abeth) but among the ice tribes far from the convent. Callbacks to Ancestor characters appear from book 2 onward.',
      books: [
        {
          title: 'The Girl and the Stars',
          slug: 'the-girl-and-the-stars',
          status: 'mandatory',
          note: 'Yaz is cast into the ice: literally. A different culture, a different magic, the same dying world.',
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
    "Broken Empire and Red Queen's War can be read in either order: they are concurrent stories in the same world. Book of the Ancestor can be started independently. Book of the Ice must come after Book of the Ancestor.",
  cardsPosition: 'above',
  cards: [
    {
      title: '🗺️ Two Worlds',
      body: "Post-apocalyptic setting: Broken Empire and Red Queen's War (concurrent). Ice-bound Abeth: Book of the Ancestor and Book of the Ice. The two worlds have a deep connection Lawrence reveals gradually across all four trilogies.",
      color: 'blue',
    },
    {
      title: '⚔️ Two Entry Points',
      body: "Prince of Thorns is the intended entry point: the darkest and most controlled of the four series. Prince of Fools is the lighter alternative: same world, comedic protagonist instead of psychopathic one, and a quest structure that works independently. Either order works. The two series run concurrently and intersect once. Reading both gives the complete picture of the first world.",
      color: 'amber',
    },
    {
      title: '✍️ The Prose',
      body: "Lawrence writes with more literary precision than most grimdark authors. The darkness is controlled, not gratuitous. The humour in Red Queen's War is genuinely funny, not just grimly ironic. First-person narration is the series' defining formal choice: each Lawrence protagonist narrates from so deeply inside their own worldview that the reader inherits their biases without being told to.",
      color: 'purple',
    },
    {
      title: '⚡ The Jorg Problem',
      body: 'Prince of Thorns opens with Jorg Ancrath at 14 committing atrocities. This is not edgy marketing, it is the premise. Lawrence is asking whether a compelling character can exist without redemption being guaranteed. Jorg is the most divisive protagonist in modern grimdark. The opening pages will tell you which camp you are in.',
      color: 'red',
    },
    {
      title: '🏛️ Not Just Grimdark',
      body: "Book of the Ancestor is Lawrence doing something completely different from the Broken Empire. A convent of warrior nuns on a dying ice-bound world, a female protagonist, and a magic system that works with light. The tonal shift is complete: the protagonist is moral and young, the darkness operates through loss rather than atrocity, and the first book functions as a near-complete standalone. It is the least divisive entry in the Lawrence catalogue.",
      color: 'green',
    },
    {
      title: '🔍 The Hidden Layer',
      body: 'The Broken Empire is set somewhere that feels like a distorted, mythologised past, but Lawrence does not tell you where. He plants clues and lets the reader piece it together. Discovering this while reading is one of the best experiences in the genre. Do not look it up before you get there.',
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Jorg Ancrath',
      role: 'Prince; protagonist of The Broken Empire',
      color: 'red',
      why_they_work:
        "The most divisive protagonist in contemporary grimdark. He commits atrocities in the opening pages and narrates them without remorse. Lawrence is asking whether fiction can demand that the reader track and even understand a character who does inexcusable things, without offering redemption as justification. The trilogy's answer is not comfortable, and that is the point.",
    },
    {
      name: 'Jalan Kendeth',
      role: "Prince; coward; protagonist of Red Queen's War",
      color: 'amber',
      why_they_work:
        "The deliberate tonal inversion of Jorg. Jalan is a liar, a coward, and a prince who has done nothing brave or honourable in his life, and he is entirely self-aware about it. The comedy in Red Queen's War works because his self-knowledge about his own cowardice is absolute and unashamed. Set against Jorg, he is almost charming. The contrast is the point of reading both trilogies.",
    },
    {
      name: 'Nona Grey',
      role: 'Warrior nun; protagonist of Book of the Ancestor',
      color: 'blue',
      why_they_work:
        "The most straightforwardly compelling protagonist Lawrence has written, which is itself a structural choice. After Jorg's deliberate alienation and Jalan's deliberate cowardice, Nona is simply someone to root for. Her abilities come from practice, training, and loyalty rather than birthright. Book of the Ancestor is where Lawrence demonstrates that the grimdark mode was a choice, not a constraint.",
    },
    {
      name: 'Yaz',
      role: 'Ice-tribe girl; protagonist of Book of the Ice',
      color: 'green',
      why_they_work:
        "The protagonist who starts furthest from the power structures of the Lawrence universe. No school, no convent, no royal blood: she is cast literally into the underworld of the ice and has to find her way out. Book of the Ice is where the connections between the two Abeth series become fully legible, and Yaz is the character whose arc closes them. Her story intersects with Ancestor characters in ways that only work because of what Lawrence set up across six earlier books.",
    },
  ],
  sections: [
    {
      heading: 'The world-building secret',
      type: 'spoiler',
      bullets: [
        "The Broken Empire is set on Earth: our Earth, roughly 1,000 years after a global nuclear war called 'the Thousand Suns.' The Builders are us. The ruins of our civilisation are everywhere.",
        'Magic in the Broken Empire world comes from the remnants of pre-war technology. What characters call "the old power" is something more familiar than it appears.',
        'Abeth (Book of the Ancestor / Book of the Ice) is the same Earth in a far more distant future: the sun is dying, the world freezing. The connection to the Broken Empire era is subtle but real.',
        'Lawrence plants clues across all four trilogies. Second reads reveal layers that were invisible the first time.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Prince of Thorns opens with very dark content involving Jorg as a child. This is not gratuitous: it is the foundation of his character arc.',
        'The Broken Empire is grimdark. Violence, moral ambiguity, and an unreliable narrator are defining features.',
        "Red Queen's War is significantly lighter: dark fantasy with genuine comedy. Jalan is a deliberate foil to Jorg.",
        'Book of the Ancestor has violence but is less grimdark. The first book reads closer to dark YA in tone; it escalates considerably across books 2 and 3.',
        'No explicit sexual content across any of the four series.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "Prince of Thorns (2011) extended the grimdark wave that Abercrombie had established, adding literary precision and a protagonist more deliberately alienating than anything in the genre before it.",
        "The hidden layer in Broken Empire is the most distinctive world-building conceit in contemporary grimdark. Prince of Thorns established Lawrence's reputation for fiction that reveals more on reread.",
        "The connection between the two settings is the most structurally ambitious long-form world-building project in contemporary fantasy: four trilogies, two apparent settings, one underlying structure revealed gradually across the full sequence.",
        "Lawrence completed four trilogies in 12 years (2011–2023): 12 books, each trilogy complete with no abandoned arcs. That is unusual in commercial fantasy.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Broken Empire',
      level: 5,
      desc: 'Brutal grimdark; violent, morally black antihero, unflinching from page one.',
    },
    {
      label: "Red Queen's War",
      level: 3,
      desc: 'Dark fantasy with genuine comedy. Danger and loss beneath a lighter tone.',
    },
    {
      label: 'Red Sister',
      level: 3,
      desc: 'Violence with purpose; strong character foundation. Darker than it first appears.',
    },
    {
      label: 'Book of the Ancestor 2-3',
      level: 4,
      desc: 'Escalates significantly. War, sacrifice, and a dying world closing in.',
    },
    {
      label: 'Book of the Ice',
      level: 4,
      desc: 'Bleak and relentless: survival on a freezing world with high personal and civilisational stakes.',
    },
  ],
  metaDescription:
    "Mark Lawrence reading order: all four trilogies in sequence - Broken Empire, Red Queen's War, Book of the Ancestor, and Book of the Ice.",
  booksLikeSlug: 'prince-of-thorns',
  lastUpdated: '2026-07-01',
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
