import type { ReadingOrderEntry } from '../reading-orders';

export const grishaverse: ReadingOrderEntry = {
  slug: 'grishaverse',
  name: 'The Grishaverse',
  author: 'Leigh Bardugo',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ Completed Series',
  description:
    "Leigh Bardugo's Grishaverse is one of the most successful fantasy universes of the last decade — a Russian-inspired world of Grisha magic users, criminal heist crews, and morally complex power politics. The series spans three sub-series, but Six of Crows is the peak: a tight heist novel with one of the best ensemble casts in modern fantasy. Start with Shadow and Bone to understand the world, then Six of Crows to fall in love with it. This guide covers the full Grishaverse reading order across the Shadow and Bone trilogy, Six of Crows duology, and King of Scars duology.",
  darknessDisplay: '🕯️🕯️🕯️ Serious',
  orderNote:
    'Read the Shadow and Bone trilogy first — it establishes the world, the Grisha, and the Fold. Six of Crows is set in the same world but with a new cast, and assumes you understand the setting. King of Scars picks up threads from both trilogies.',
  warning:
    'Six of Crows is widely considered the stronger entry point for adult readers, but it spoils major Shadow and Bone trilogy events. Read Shadow and Bone first if you want the full experience unspoiled.',
  groups: [
    {
      label: 'Shadow and Bone Trilogy',
      sublabel: 'start here — sets up the world and the Fold',
      books: [
        {
          title: 'Shadow and Bone',
          slug: 'shadow-and-bone',
          status: 'mandatory',
          seriesLabel: 'Shadow and Bone #1',
          note: 'Alina Starkov discovers she is a Sun Summoner — possibly the only person who can destroy the Fold, a swathe of living darkness that splits Ravka. Introduces the Grisha system, the Darkling, and the Russian-inspired world. The most YA-feeling of the trilogy.',
          page_count: 358,
          publication_year: 2012,
        },
        {
          title: 'Siege and Storm',
          slug: 'siege-and-storm',
          status: 'mandatory',
          seriesLabel: 'Shadow and Bone #2',
          note: "Alina and Mal are hunted. A privateer captain and a sea monster complicate everything. The political stakes of Ravka come into focus. Bardugo's plotting gets noticeably tighter.",
          page_count: 435,
          publication_year: 2013,
        },
        {
          title: 'Ruin and Rising',
          slug: 'ruin-and-rising',
          status: 'mandatory',
          seriesLabel: 'Shadow and Bone #3',
          note: "The trilogy concludes. Underground rebellion, the Darkling's true endgame, and an ending that divided fans. The conclusion is honest even if it is not the one most readers wanted.",
          page_count: 422,
          publication_year: 2014,
        },
      ],
    },
    {
      label: 'Six of Crows Duology',
      sublabel: 'the best of the Grishaverse — read after Shadow and Bone',
      books: [
        {
          title: 'Six of Crows',
          slug: 'six-of-crows',
          status: 'mandatory',
          seriesLabel: 'Six of Crows #1',
          note: 'Six criminals. An impossible heist. One of the tightest ensemble casts in modern fantasy. Kaz Brekker plans an infiltration of an impenetrable prison-fortress for the score of the century. Each POV character is fully realised. The best book in the Grishaverse.',
          page_count: 465,
          publication_year: 2015,
        },
        {
          title: 'Crooked Kingdom',
          slug: 'crooked-kingdom',
          status: 'mandatory',
          seriesLabel: 'Six of Crows #2',
          note: 'The heist becomes a war for survival in Ketterdam. The crew gets their revenge. Character payoffs are deeply satisfying — this duology is one of the better-concluded two-book series in fantasy.',
          page_count: 536,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'King of Scars Duology',
      sublabel: 'sequel series — draws from both previous trilogies',
      note: 'Heavily spoils both Shadow and Bone and Six of Crows. Read both duologies first.',
      noteType: 'warning',
      books: [
        {
          title: 'King of Scars',
          slug: 'king-of-scars',
          status: 'optional',
          seriesLabel: 'King of Scars #1',
          note: "Nikolai Lantsov — everyone's favourite side character from the first trilogy — takes centre stage as King of Ravka. Juggles multiple POVs and a new supernatural threat. More satisfying if you loved Nikolai in the first trilogy.",
          page_count: 512,
          publication_year: 2019,
        },
        {
          title: 'Rule of Wolves',
          slug: 'rule-of-wolves',
          status: 'optional',
          seriesLabel: 'King of Scars #2',
          note: "War arrives in Ravka. Brings Six of Crows characters back into the fold alongside Nikolai's storyline. A crowd-pleasing conclusion to this duology — fan service in the best sense.",
          page_count: 512,
          publication_year: 2021,
        },
      ],
    },
    {
      label: 'Companion Works',
      sublabel: 'world-building extras — read anytime after Shadow and Bone',
      books: [
        {
          title: 'The Language of Thorns',
          slug: 'the-language-of-thorns',
          status: 'supplementary',
          seriesLabel: 'Grishaverse companion',
          note: 'Six original fairy tales set in the Grishaverse world. Dark, beautiful, and illustrated. Works as a standalone — read between any of the main series entries or after.',
          page_count: 274,
          publication_year: 2017,
        },
        {
          title: 'The Lives of Saints',
          slug: 'the-lives-of-saints',
          status: 'supplementary',
          seriesLabel: 'Grishaverse companion',
          note: 'Illustrated companion of Ravkan saints referenced throughout the series. Background enrichment rather than plot. Best appreciated mid-series once you know the mythology.',
          page_count: 176,
          publication_year: 2020,
        },
      ],
    },
  ],
  cardsPosition: 'above',
  cards: [
    {
      title: '🌑 Shadow and Bone (3 books)',
      body: 'The foundation trilogy. Introduces Ravka, Grisha magic, and the Fold. Required reading before anything else — establishes the world every other series depends on.',
      color: 'blue',
    },
    {
      title: '🃏 Six of Crows (2 books)',
      body: 'The best of the Grishaverse — a heist duology with one of the finest ensemble casts in modern fantasy. The reason most people stay.',
      color: 'purple',
    },
    {
      title: '👑 King of Scars (2 books)',
      body: "Nikolai's duology. Optional but rewarding — draws characters from both previous series and gives the world a proper conclusion.",
      color: 'green',
    },
    {
      title: '📖 Companion works (2 books)',
      body: 'The Language of Thorns and The Lives of Saints. World-building extras — beautiful but not essential to the main story.',
      color: 'amber',
    },
  ],
  sections: [
    {
      heading: 'Six of Crows first?',
      type: 'prose',
      prose:
        "Many readers and online guides recommend starting with Six of Crows because it's the stronger book and works as a standalone. The problem: it casually spoils major Shadow and Bone trilogy events as background context. If you don't mind spoilers, Six of Crows first is a legitimate choice. If you want the full experience in order, start with Shadow and Bone — the trilogy is shorter and faster than it looks.",
    },
    {
      heading: 'What makes it work',
      type: 'bullets',
      bullets: [
        'The Grisha system — magic users who manipulate matter at the molecular level, divided into Orders — is one of the better-constructed soft magic systems in YA fantasy.',
        'Ketterdam, the setting of Six of Crows, is one of the most fully realised fantasy cities of the last decade: a Dutch East India Company analogue built on gang politics and financial crime.',
        'Kaz Brekker is one of the most written-about characters in modern fantasy fandom for a reason: he is a strategist, not a fighter, and his emotional arc is handled with unusual restraint.',
        'Shadow and Bone was adapted by Netflix (2 seasons, cancelled 2023). A Six of Crows spinoff was in development but scrapped at the same time. The TV series combines the Shadow and Bone and Six of Crows timelines.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Shadow and Bone trilogy',
      level: 2,
      desc: 'YA-adjacent — threat, loss, and moral complexity but relatively light',
    },
    {
      label: 'Six of Crows duology',
      level: 3,
      desc: 'Trauma, violence, slavery, and addiction handled directly — darker than the first trilogy',
    },
    {
      label: 'King of Scars duology',
      level: 3,
      desc: 'War and political violence — sits between the two earlier series in tone',
    },
  ],
  finishedLabel: 'Finished the Grishaverse?',
  categoryHref: '/fantasy/romantasy/',
  categoryLabel: 'Browse Romantasy',
  related: ['acotar', 'throne-of-glass', 'empyrean'],
};
