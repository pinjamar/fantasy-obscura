import type { ReadingOrderEntry } from '../reading-orders';

export const empyrean: ReadingOrderEntry = {
  slug: 'empyrean',
  name: 'The Empyrean',
  author: 'Rebecca Yarros',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '⏳ Ongoing - 3 of 5 books published',
  description:
    "Military fantasy academy meets dragon-rider romance: fast-paced, explicitly romantic, and increasingly dark across its five planned books. Violet Sorrengail enters Basgiath War College as someone who was never supposed to be there. The world is built around dragon bonds, a brutal training system, and a war whose true shape is not what anyone is told. Start with Fourth Wing. Three of five planned books are published.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark · 🔥🔥🔥🔥 Explicit',
  cardsPosition: 'above',
  groups: [
    {
      label: 'The Empyrean',
      sublabel: 'books 1-3 published · books 4-5 upcoming',
      noteType: 'required',
      books: [
        {
          title: 'Fourth Wing',
          slug: 'fourth-wing',
          status: 'mandatory',
          note: 'Start here. Violet Sorrengail enters Basgiath War College to become a rider. Fast pacing, strong voice, explicit romance begins immediately.',
          page_count: 517,
          publication_year: 2023,
        },
        {
          title: 'Iron Flame',
          slug: 'iron-flame',
          status: 'mandatory',
          note: 'Raises the stakes considerably: the war plot becomes the focus and the world expands. Longer and denser than book 1.',
          page_count: 623,
          publication_year: 2023,
        },
        {
          title: 'Onyx Storm',
          slug: 'onyx-storm',
          status: 'mandatory',
          note: 'The series shifts into full epic fantasy territory. Higher body count, bigger consequences, a lot of threads in motion.',
          page_count: 608,
          publication_year: 2025,
        },
        {
          title: 'Empyrean Book 4',
          slug: null,
          status: 'upcoming',
          note: 'Title not yet announced. No release date confirmed.',
          page_count: null,
          publication_year: null,
        },
        {
          title: 'Empyrean Book 5',
          slug: null,
          status: 'upcoming',
          note: 'The planned series finale. No details announced.',
          page_count: null,
          publication_year: null,
        },
      ],
    },
  ],
  orderNote:
    'All three published books are essential and must be read in order. The series ends on a cliffhanger. No companion novels or prequels currently exist.',
  cards: [
    {
      title: '🐉 The Dragon Bond',
      body: "The bond is the series' central mechanic: riders bond with a dragon through a high-stakes encounter that can kill them if rejected. The dragons choose, not the riders. The bond gives enhanced combat abilities and a mental link between rider and dragon. It is also the emotional core of the series.",
      color: 'blue',
    },
    {
      title: '📈 The Escalation',
      body: 'Fourth Wing reads as romantasy: fast, romantic, fun. Iron Flame is heavier and war-focused. Onyx Storm is full epic fantasy with a meaningful body count. The romance stays central throughout, but the war plot increasingly drives the narrative and the tone gets darker with each book.',
      color: 'green',
    },
    {
      title: '⏳ The Wait',
      body: 'Three books are published; the series is planned for five. Book 3 ends on a significant cliffhanger. No title or release date has been announced for book 4.',
      color: 'amber',
    },
    {
      title: '💕 The Romance',
      body: "Enemies-to-lovers is the engine of book 1. The relationship between Violet and Xaden is the emotional throughline across all three books: what starts as hostile attraction becomes complicated by secrets Xaden is keeping, war politics that put them on different sides of the same conflict, and the question of what loyalty means when both of them are hiding things. The romance does not fade as the series darkens; it gets harder.",
      color: 'red',
    },
    {
      title: '🏫 The Academy',
      body: "Basgiath War College is where riders train: a significant percentage of first-years die before graduation. The college structure gives book 1 its shape. By Iron Flame the war front takes over and the academy recedes.",
      color: 'purple',
    },
    {
      title: '🔥 Content Note',
      body: 'Explicit sexual content is present from early in book 1 and continues across all three books. War violence and character death escalate significantly by book 3. This is not a series that softens either element.',
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Violet Sorrengail',
      role: 'Scribe-turned-rider; protagonist; bonded to Tairn and Andarna',
      color: 'blue',
      why_they_work:
        "She was never supposed to be in the Rider Quadrant. Her chronic connective tissue disorder makes her physically fragile by rider standards, and her mother placed her in the Scribe Quadrant specifically because of it. The series is built on the gap between what everyone expects of her and what she is actually capable of. Her condition is never cured and never treated as something to overcome: it is a permanent constraint she works around.",
    },
    {
      name: 'Xaden Riorson',
      role: "Wingleader; Violet's enemy-to-lover; son of an executed rebel leader",
      color: 'red',
      why_they_work:
        "He is responsible for Violet's safety in the Rider Quadrant by his own choice, for political reasons, while being the person most likely to be her enemy by political logic. He knows things Violet does not and cannot tell her. The tension in their relationship is not enemies-to-lovers in the conventional sense: it is the question of what loyalty means when you are protecting someone from the truth they need most.",
    },
    {
      name: 'Tairn',
      role: "Violet's primary bonded dragon; the most powerful dragon in Navarre",
      color: 'green',
      why_they_work:
        "He bonded to Violet when no one expected him to bond to anyone. He is immense, old, and contemptuous of most of the humans around him. His bond to Violet is what gives her the combat capability and status her physical condition would otherwise deny her. He communicates in complete sentences and has opinions. The dragon POV he provides is one of the series' most distinctive tonal elements.",
    },
    {
      name: 'Rhiannon Matthias',
      role: "Violet's closest friend at Basgiath; grounding presence across all three books",
      color: 'amber',
      why_they_work:
        "She is the most consistently competent person in Violet's immediate circle and the character Yarros uses to show what a normal rider's experience of Basgiath looks like. Her friendship with Violet is unconditional in a series where almost all relationships have conditions attached. She functions as the emotional anchor the later books need when everything else is in motion.",
    },
  ],
  sections: [
    {
      heading: 'Before you start',
      type: 'bullets',
      bullets: [
        'Start with Fourth Wing: no prior reading required. The series is strictly sequential.',
        'Iron Flame is the heaviest of the three books: more war plot, more setup, and less of the romantic momentum that drives book 1. Onyx Storm is where the accumulated threads land.',
        "Violet has a chronic connective tissue condition (EDS-coded). It affects her training and combat throughout all three books and is never resolved. This is deliberate, not an oversight.",
        'The opening chapters introduce a lot of lore: bonding rules, quadrant structure, magic basics. It settles quickly after the first act.',
      ],
    },
    {
      heading: 'The world',
      type: 'bullets',
      bullets: [
        "Navarre is defended by dragon riders: the kingdom's military elite. The Rider Quadrant trains at Basgiath War College alongside scribes, healers, and infantry.",
        "Violet was assigned to the Scribe Quadrant by her mother (the general of the rider corps) and chose the Rider Quadrant against her wishes. This choice drives book 1.",
        "The war Navarre is fighting is against venin: wielders who drain the land itself of magical power. The true nature of the threat is concealed from the rider corps at the start of the series.",
        "Gryphon fliers: a neighbouring territory fields riders bonded to gryphons rather than dragons. Their role in the conflict becomes significant from book 2 onward.",
      ],
    },
    {
      heading: 'The magic system',
      type: 'bullets',
      bullets: [
        "Wielding: riders channel an elemental or unique affinity (lightning, fire, wind, and rarer types). The affinity is determined by the dragon bond, not chosen by the rider.",
        "Sigils: runes that riders carve to channel and direct power. Learning sigil-craft is central to first-year training and becomes more important as the series progresses.",
        "The dragon bond is permanent and ends only with death. A rider whose dragon dies is left severely diminished, and vice versa. The strength of the bond determines the rider's power ceiling.",
        "Venin corrupt the source (the magical substrate of the world) by drawing power without a bonded dragon. Their use of magic degrades the land around them and them alongside it.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Explicit sexual content: on-page rather than fade-to-black, begins in book 1, present in all three books.',
        'Named character deaths begin in Iron Flame and accelerate. Onyx Storm has the highest body count: losses include characters with significant page time.',
        "Chronic illness representation: Violet's connective tissue disorder affects every aspect of her combat and training. Depicted without being cured or minimised.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Fourth Wing',
      level: 3,
      desc: 'Moderate: danger and death, but romantic and exciting',
    },
    {
      label: 'Iron Flame',
      level: 4,
      desc: 'Dark: war becomes real, character losses hurt',
    },
    {
      label: 'Onyx Storm',
      level: 4,
      desc: 'Dark: higher stakes, more brutal consequences',
    },
  ],
  metaDescription:
    'The Empyrean reading order: Fourth Wing, Iron Flame, and Onyx Storm in sequence, with context on the dragon bond, the magic system, and the series arc.',
  lastUpdated: '2026-06-26',
  shortName: 'Empyrean',
  finishedLabel: "Finished what's published?",
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  booksLikeSlug: 'fourth-wing',
  related: ['acotar', 'blood-and-ash', 'sarah-j-maas', 'throne-of-glass', 'grishaverse', 'divergent'],
};
