import type { ReadingOrderEntry } from '../reading-orders';

export const grishaverse: ReadingOrderEntry = {
  slug: 'grishaverse',
  name: 'The Grishaverse',
  author: 'Leigh Bardugo',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 SOB & King of Scars complete · Six of Crows ongoing',
  description:
    "Leigh Bardugo's Grishaverse is one of the most successful fantasy universes of the last decade — a Russian-inspired world of Grisha magic users, criminal heist crews, and morally complex power politics. The series spans three sub-series, but Six of Crows is the peak: a tight heist novel with one of the best ensemble casts in modern fantasy. Start with Shadow and Bone to understand the world, then Six of Crows to fall in love with it. This guide covers the full Grishaverse reading order across the Shadow and Bone trilogy, Six of Crows duology, and King of Scars duology.",
  darknessDisplay: '🕯️🕯️🕯️ Serious',
  orderNote:
    'Read the Shadow and Bone trilogy first — it establishes the world, the Grisha, and the Fold. Six of Crows is set in the same world but with a new cast, and assumes you understand the setting. King of Scars picks up threads from both trilogies.',
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
      label: 'Six of Crows Series',
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
          note: 'The heist becomes a war for survival in Ketterdam. The crew gets their revenge. Character payoffs are deeply satisfying.',
          page_count: 536,
          publication_year: 2016,
        },
        {
          title: 'A Darker Shore: Letters from Ketterdam',
          slug: 'a-darker-shore',
          status: 'upcoming',
          seriesLabel: 'Six of Crows #3',
          note: 'Upcoming June 30, 2026. Returns to Ketterdam and the Six of Crows cast.',
          page_count: null,
          publication_year: 2026,
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
      title: '🗝️ The Two Entry Points',
      body: 'Shadow and Bone builds the world. Six of Crows is the better book. Reading in order gives you the full experience — but Six of Crows references Shadow and Bone events as background, so starting there means encountering spoilers for the first trilogy as casual context. Start with Shadow and Bone for the complete experience. Start with Six of Crows if you want the best of the series first and can handle filling in backstory as you go.',
      color: 'amber',
    },
    {
      title: '🌑 The Darkling',
      body: 'The central antagonist of Shadow and Bone and one of the most debated characters in contemporary fantasy. He begins as a mentor figure and his true nature emerges slowly. Charismatic, ancient, and morally complex in ways the first book is careful to reveal gradually. He is not a simple villain. The fandom has argued about him since 2012. Let the arc unfold.',
      color: 'blue',
    },
    {
      title: '🃏 Kaz Brekker',
      body: 'Kaz is the reason Six of Crows works. A criminal strategist who plans impossible heists three moves ahead and never shows his hand. His emotional arc is handled with unusual restraint for the genre — trauma acknowledged, not wallowed in. The ensemble around him (Inej, Jesper, Wylan, Nina, Matthias) is equally fully realised. One of the best casts in modern fantasy.',
      color: 'purple',
    },
    {
      title: '🏙️ Ketterdam',
      body: "Six of Crows is set not in Ravka but in Ketterdam — a Dutch East India Company analogue built on gang politics, financial crime, and the trade in a magic-enhancing drug. The shift from Shadow and Bone's Russian-inspired court politics to Ketterdam's street-level heist is jarring at first and then exactly right. One of the most fully realised fantasy cities of the last decade.",
      color: 'green',
    },
    {
      title: '✨ Grisha Magic',
      body: 'Grisha are magic users who manipulate matter at the molecular level — dividing, combining, shaping it. They are divided into Orders: Corporalki (healers and Heartrenders), Etherealki (Summoners), and Materialki (craftsmen). The system is consistent but not rigidly quantified. The series explores what it means to be born with power that others fear and want to control.',
      color: 'zinc',
    },
    {
      title: '📺 The Netflix Adaptation',
      body: 'Shadow and Bone was adapted by Netflix (2 seasons, 2021–2023, cancelled before season 3). The show merged the Shadow and Bone and Six of Crows timelines — running them simultaneously, which differs from the books where Six of Crows happens later. A Six of Crows spinoff was in development but cancelled at the same time. If you are coming from the show, the books diverge in timeline and some character details.',
      color: 'red',
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
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Shadow and Bone trilogy is YA-adjacent — threat, loss, and moral complexity, but relatively accessible in tone.',
        'Six of Crows is meaningfully darker: trauma, slavery, addiction, and gang violence handled directly.',
        'Right for: readers who want ensemble fantasy with heist elements, morally complex characters, and a well-constructed setting.',
        'Not right for: readers who want hard magic systems or traditional epic fantasy scope.',
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
  metaDescription:
    'The Grishaverse reading order: Shadow and Bone trilogy, Six of Crows duology, and King of Scars duology — with guidance on whether to start with Shadow and Bone or Six of Crows first.',
  lastUpdated: '2026-05-15',
  shortName: 'Grishaverse',
  finishedLabel: 'Finished the Grishaverse?',
  booksLikeSlug: 'six-of-crows',
  categoryHref: '/fantasy/romantasy/',
  categoryLabel: 'Browse Romantasy',
  related: ['acotar', 'sarah-j-maas', 'empyrean', 'blood-and-ash', 'mistborn', 'throne-of-glass'],
};
