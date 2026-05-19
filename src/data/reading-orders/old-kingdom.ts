import type { ReadingOrderEntry } from '../reading-orders';

export const oldKingdom: ReadingOrderEntry = {
  slug: 'old-kingdom',
  name: 'The Old Kingdom',
  author: 'Garth Nix',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    "One of the great fantasies of the 1990s and still one of the best — a world split by a Wall, beyond which magic and death work by entirely different rules. Sabriel, the first book, is close to perfect: a female protagonist navigating a dying kingdom, a magic system built around seven bells and the precincts of Death, and a plot that moves without wasting a page. The trilogy that follows (Sabriel → Lirael → Abhorsen) is the essential read. Clariel and Goldenhand extend it; Terciel & Elinor fills in the history. Start with Sabriel and trust the world — it earns the investment quickly.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate',
  orderNote:
    'Read the main trilogy first (Sabriel → Lirael → Abhorsen). Goldenhand follows directly from Abhorsen. Clariel is a prequel best read after Abhorsen — its main character appears as a villain in the trilogy, and reading in publication order makes that payoff land correctly.',
  groups: [
    {
      label: 'The Main Trilogy',
      sublabel: 'books 1–3 — the complete story, fully satisfying',
      noteType: 'required',
      note: 'Sabriel is a standalone and the natural entry point. Lirael introduces a new protagonist and runs directly into Abhorsen — read them as a pair. The trilogy closes cleanly and is the essential Old Kingdom experience.',
      books: [
        {
          title: 'Sabriel',
          slug: 'sabriel',
          status: 'mandatory',
          note: "Start here. Sabriel crosses the Wall into the Old Kingdom to find her father — the Abhorsen, a necromancer who binds the Dead rather than raising them. The world, the bells, and the magic establish themselves fast. One of the best opening novels in the genre.",
          page_count: 292,
          publication_year: 1995,
        },
        {
          title: 'Lirael',
          slug: 'lirael',
          status: 'mandatory',
          note: "New protagonist — Lirael, a Daughter of the Clayr who lacks her people's Sight. Her story begins separately from Sabriel's world and converges into the central threat. Ends on a cliffhanger that flows directly into Abhorsen.",
          page_count: 519,
          publication_year: 2001,
        },
        {
          title: 'Abhorsen',
          slug: 'abhorsen',
          status: 'mandatory',
          note: "Concludes the Lirael arc. The threat that has been building since book two reaches its resolution. If you read Sabriel and want to stop, you can — but reading Lirael commits you to Abhorsen.",
          page_count: 394,
          publication_year: 2003,
        },
      ],
    },
    {
      label: 'Beyond the Trilogy',
      sublabel: 'sequels and prequels — all optional, all worthwhile',
      noteType: 'optional',
      note: 'Goldenhand is a direct sequel to Abhorsen and the most essential addition. Clariel is a prequel set 600 years before Sabriel — best read after Abhorsen, since its protagonist becomes a villain in the trilogy and the reversal lands harder once you know the outcome. Terciel & Elinor tells the story of Sabriel\'s parents and can be read any time after Sabriel.',
      books: [
        {
          title: 'Goldenhand',
          slug: 'goldenhand',
          status: 'optional',
          note: "Direct sequel to Abhorsen — picks up threads left unresolved and gives Lirael's arc further development. The most natural next read after the trilogy.",
          page_count: 408,
          publication_year: 2016,
        },
        {
          title: 'Clariel',
          slug: 'clariel',
          status: 'supplementary',
          note: "Prequel set 600 years before Sabriel. Clariel is a young woman who wants nothing to do with the family legacy thrust upon her — the story of how she becomes someone the trilogy treats as a recurring villain. Read after Abhorsen for the full irony.",
          page_count: 416,
          publication_year: 2014,
        },
        {
          title: 'Terciel and Elinor',
          slug: 'terciel-and-elinor',
          status: 'supplementary',
          note: "The story of Sabriel's parents — Terciel, the Abhorsen, and Elinor, a girl from south of the Wall drawn into the Old Kingdom. Read any time after Sabriel. Fills in the backstory but not required.",
          page_count: null,
          publication_year: 2021,
        },
      ],
    },
  ],
  cardsPosition: 'above',
  cards: [
    {
      title: '🔔 The Bells',
      body: "The Abhorsen carries seven bells — each with a distinct power over the Dead. Ranna sends them to sleep; Kibeth forces them to walk; Astarael, the Weeper, sends all who hear it into Death, including the ringer. The magic system is specific, memorable, and tied directly to consequence. It remains one of the most original magic systems in the genre.",
      color: 'blue',
    },
    {
      title: '🧱 The Wall',
      body: "The Old Kingdom is divided from the modern world (Ancelstierre, a stand-in for early 20th-century England) by a physical Wall. South of the Wall: technology works, magic does not. North of it: the reverse. The tension between these two worlds — and what happens at the border — drives the central premise of Sabriel.",
      color: 'green',
    },
    {
      title: '🚪 Death as a Place',
      body: "Death in the Old Kingdom is not an event — it is a location. There are nine precincts, each deeper and colder, with currents that pull the dead further from life. The Abhorsen walks in Death to bind or destroy the Dead before they return to Life. Nix handles this mythology with the same consistency he gives the bell magic.",
      color: 'purple',
    },
    {
      title: '📚 Clariel — Read After Abhorsen',
      body: "Clariel is a prequel, but reading it first would be a mistake — its protagonist becomes a significant villain in the trilogy, and the tragedy of her fall is only felt if you already know where she ends up. Publication order exists for a reason here.",
      color: 'amber',
    },
    {
      title: '🎯 Sabriel Stands Alone',
      body: "Sabriel works as a complete standalone. The story opens, develops, and closes — there is no cliffhanger. If you want to read one book from the series and stop, that is a legitimate choice. Lirael and Abhorsen are a duology that works best read together.",
      color: 'blue',
    },
    {
      title: '🌍 Where It Fits',
      body: "The Old Kingdom was YA before YA was a marketing category — Garth Nix wrote adult readers equally. The tone is closer to Ursula K. Le Guin than to contemporary YA. If you dismissed it as a children's series, reconsider.",
      color: 'green',
    },
  ],
  sections: [
    {
      heading: 'Is the Old Kingdom right for you?',
      type: 'bullets',
      bullets: [
        "Read it if: you want a magic system that is genuinely original. The bells, the precincts of Death, and the rules around what can and cannot be returned to life are specific and consistent throughout.",
        "Read it if: you want a complete trilogy with a standalone entry point. Sabriel is enough on its own. The rest is worthwhile addition, not required investment.",
        "Read it if: you value atmospheric world-building over political complexity. The Old Kingdom is a world of ruins, wards, and ancient magic — felt more than explained.",
        "It may not be for you if: you want a large cast and political intrigue. The series is intimate — small groups of characters, personal stakes, one main threat at a time.",
        "It may not be for you if: you need contemporary prose. Nix writes with deliberate craft from the 1990s — clean, precise, slightly formal. It suits the world but reads differently from modern epic fantasy.",
      ],
    },
    {
      heading: 'Reading order notes',
      type: 'bullets',
      bullets: [
        "Sabriel (1995) → Lirael (2001) → Abhorsen (2003) is the essential path. Read Lirael and Abhorsen together — stopping between them is difficult and they function as a single story.",
        "Clariel (2014) is best read after Abhorsen. It is a prequel chronologically, but it contains a character the trilogy uses as a villain — that dramatic irony only works if you already know the outcome.",
        "Goldenhand (2016) follows directly from Abhorsen. If you want more after the trilogy, this is the natural next read.",
        "Terciel & Elinor (2021) is the most optional entry — a prequel about Sabriel's parents that fleshes out the mythology but does not affect the main story. Read after Sabriel or save it for last.",
      ],
    },
  ],
  darkness: [
    { label: 'Sabriel', level: 2, desc: 'Danger and death, but held at an adventurous register' },
    { label: 'Lirael & Abhorsen', level: 3, desc: 'Stakes escalate — loss is real, the threat is existential' },
    { label: 'Clariel', level: 3, desc: 'A tragedy of small decisions — darker in retrospect than in the moment' },
    { label: 'Goldenhand', level: 3, desc: 'Comparable to the main trilogy in tone' },
  ],
  metaDescription:
    'The complete Old Kingdom reading order: Sabriel, Lirael, Abhorsen, Goldenhand, Clariel, and Terciel & Elinor by Garth Nix — where to start and where Clariel fits.',
  shortName: 'Old Kingdom',
  lastUpdated: '2026-05-19',
  finishedLabel: 'Finished the trilogy?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['earthsea', 'memory-sorrow-thorn', 'grishaverse', 'mistborn', 'inheritance-cycle', 'robin-hobb'],
};
