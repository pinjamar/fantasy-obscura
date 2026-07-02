import type { ReadingOrderEntry } from '../reading-orders';

export const oldKingdom: ReadingOrderEntry = {
  slug: 'old-kingdom',
  name: 'The Old Kingdom',
  author: 'Garth Nix',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete Series',
  description:
    "A world split by a Wall: south of it, technology works and magic does not; north, the reverse. Beyond the Wall is the Old Kingdom, where Death is a location with nine precincts and an Abhorsen walks between life and death to bind the Dead before they return. Garth Nix published Sabriel in 1995; the world has since expanded across six novels and companion fiction spanning 26 years. The main trilogy (Sabriel → Lirael → Abhorsen) is a complete story; everything beyond it is optional.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate - death is thematically central; consequence-driven rather than graphic',
  orderNote:
    'Read the main trilogy first (Sabriel → Lirael → Abhorsen). After that: The Creature in the Case bridges to Goldenhand; read them in that order. Clariel is a prequel best read after Abhorsen, not before: its protagonist becomes a trilogy villain and the irony only lands once you know the outcome.',
  groups: [
    {
      label: 'The Main Trilogy',
      sublabel: 'books 1-3 - the complete story, fully satisfying',
      noteType: 'required',
      note: 'Sabriel is a standalone and the natural entry point. Lirael introduces a new protagonist and runs directly into Abhorsen: read them as a pair. The trilogy closes cleanly and is the essential Old Kingdom experience.',
      books: [
        {
          title: 'Sabriel',
          slug: 'sabriel',
          status: 'mandatory',
          note: "Start here. Sabriel crosses the Wall into the Old Kingdom to find her father: the Abhorsen, a necromancer who binds the Dead rather than raising them. The world, the bells, and the magic establish themselves fast. Nix wastes no pages.",
          page_count: 292,
          publication_year: 1995,
        },
        {
          title: 'Lirael',
          slug: 'lirael',
          status: 'mandatory',
          note: "New protagonist: Lirael, a Daughter of the Clayr who lacks her people's Sight. Her story begins separately from Sabriel's world and converges into the central threat. Ends mid-story and flows directly into Abhorsen.",
          page_count: 519,
          publication_year: 2001,
        },
        {
          title: 'Abhorsen',
          slug: 'abhorsen',
          status: 'mandatory',
          note: "Concludes the Lirael arc. The threat that has been building since book two reaches its resolution. Reading Lirael commits you to Abhorsen: the two books are one story across two volumes.",
          page_count: 394,
          publication_year: 2003,
        },
      ],
    },
    {
      label: 'Beyond the Trilogy',
      sublabel: 'sequels, prequels, and companion fiction - all optional',
      noteType: 'optional',
      note: "Goldenhand is the most essential addition: a direct sequel to Abhorsen. The Creature in the Case is a short bridge novella best read just before it. Clariel is a prequel set 600 years before Sabriel, best read after Abhorsen since its protagonist becomes a trilogy villain. Terciel & Elinor and To Hold the Bridge round out the world for dedicated fans.",
      books: [
        {
          title: 'The Creature in the Case',
          slug: 'the-creature-in-the-case-an-old-kingdom-novella',
          status: 'supplementary',
          note: "A short novella featuring Nicholas Sayre: a character from Lirael and Abhorsen in a story set just after the trilogy. Bridges Abhorsen and Goldenhand; read before Goldenhand for best effect.",
          page_count: null,
          publication_year: 2006,
        },
        {
          title: 'Goldenhand',
          slug: 'goldenhand',
          status: 'optional',
          note: "Direct sequel to Abhorsen. Picks up threads left unresolved and gives Lirael's arc further development. The most natural next read after the trilogy.",
          page_count: 408,
          publication_year: 2016,
        },
        {
          title: 'Clariel',
          slug: 'clariel',
          status: 'supplementary',
          note: "Prequel set 600 years before Sabriel. Clariel is a young woman who wants nothing to do with the family legacy thrust upon her: the story of how she becomes someone the trilogy treats as a recurring villain. Read after Abhorsen for the full irony.",
          page_count: 416,
          publication_year: 2014,
        },
        {
          title: 'Terciel and Elinor',
          slug: 'terciel-and-elinor',
          status: 'supplementary',
          note: "The story of Sabriel's parents: Terciel, the Abhorsen, and Elinor, a girl from south of the Wall drawn into the Old Kingdom. Read any time after Sabriel. Fills in the backstory but not required.",
          page_count: null,
          publication_year: 2021,
        },
        {
          title: 'To Hold the Bridge',
          slug: 'to-hold-the-bridge',
          status: 'supplementary',
          note: "A short story anthology collecting Old Kingdom stories alongside other Garth Nix fiction. The title story is an Old Kingdom prequel. For completionists: read after finishing the main series.",
          page_count: null,
          publication_year: 2015,
        },
      ],
    },
  ],
  cardsPosition: 'above',
  cards: [
    {
      title: '🔔 The Bells',
      body: "The Abhorsen carries seven bells, each with a distinct power over the Dead. Ranna sends them to sleep; Kibeth forces them to walk; Astarael, the Weeper, sends all who hear it into Death, including the ringer. The magic system is specific, memorable, and tied directly to consequence. Nix created it from first principles: there is nothing quite like it elsewhere in the genre.",
      color: 'blue',
    },
    {
      title: '🧱 The Wall',
      body: "The Old Kingdom is divided from the modern world (Ancelstierre, a stand-in for early 20th-century England) by a physical Wall. South of the Wall: technology works, magic does not. North of it: the reverse. The tension between these two worlds, and what happens at the border, drives the central premise of Sabriel.",
      color: 'green',
    },
    {
      title: '🚪 Death as a Place',
      body: "Death in the Old Kingdom is not an event: it is a location. There are nine precincts, each deeper and colder, with currents that pull the dead further from life. The Abhorsen walks in Death to bind or destroy the Dead before they return to Life. Nix handles this mythology with the same consistency he gives the bell magic.",
      color: 'purple',
    },
    {
      title: '📚 Clariel: Read After Abhorsen',
      body: "Clariel is a prequel, but reading it first would be a mistake: its protagonist becomes a significant villain in the trilogy, and the tragedy of her fall is only felt if you already know where she ends up. Publication order exists for a reason here.",
      color: 'amber',
    },
    {
      title: '🎯 Sabriel Stands Alone',
      body: "Sabriel works as a complete standalone. The story opens, develops, and closes: there is no cliffhanger. Reading one book from the series and stopping is a legitimate choice. Lirael and Abhorsen are a duology that works best read together.",
      color: 'blue',
    },
    {
      title: '🌍 Where It Fits',
      body: "The Old Kingdom was YA before YA was a marketing category: Garth Nix wrote adult readers equally. The tone is closer to Ursula K. Le Guin than to contemporary YA. If you dismissed it as a children's series, reconsider.",
      color: 'green',
    },
  ],
  characters: [
    {
      name: 'Sabriel',
      role: 'Abhorsen-in-Waiting; protagonist of Sabriel',
      color: 'blue',
      why_they_work:
        "She is trained for a specific magical role (the bells, the precincts of Death) without having been called to use it. The magic Nix built around her function is specific because she is specific: the Abhorsen is not a generic magical hero but a defined role with a precise description of what it does and why it matters. Her capabilities fit her circumstances exactly, which makes the world feel built around her rather than around a plot.",
    },
    {
      name: 'Lirael',
      role: "Daughter of the Clayr; Second Assistant Librarian; protagonist of Lirael and Abhorsen",
      color: 'green',
      why_they_work:
        "She lacks the defining power of her people (the Sight) and builds a life around that absence. Her early arc is the most domestic in the series: she works in a library, constructs a magical companion, and is entirely absent from the political crisis the rest of the series will concern itself with. The contrast between her isolated beginning and the role she eventually fills is where her arc gets its force.",
    },
    {
      name: 'Mogget',
      role: 'Free magic construct; bound companion to the Abhorsen; appears as a cat',
      color: 'amber',
      why_they_work:
        "The character who delivers information without ever losing menace. He is ancient, sarcastic, and constrained by a binding collar; he consistently implies that what he would do if that collar came off is something the series declines to show. Nix never fully deploys the threat, which is what keeps it active across the entire trilogy.",
    },
    {
      name: 'The Disreputable Dog',
      role: "Free magic creature; Lirael's companion",
      color: 'purple',
      why_they_work:
        "The counterpoint to Mogget: warmth rather than restrained menace, forthcoming rather than oblique. Her nature is left deliberately unexplained for most of the series. The relationship between her and Lirael carries most of the emotional weight of the Lirael-Abhorsen duology: the series is finally about what this particular friendship costs and what it means.",
    },
    {
      name: 'Touchstone',
      role: "Former King's Guard; Sabriel's companion; King of the Old Kingdom",
      color: 'red',
      why_they_work:
        "The character who has to discover who he is in a world he no longer recognises. His function in Sabriel is to give her a companion who does not know the answers she needs, which forces the world-building to emerge through shared discovery rather than exposition. His arc is about recovering a self across centuries of absence and deciding what to do with it.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Death is thematically central throughout: the series takes death seriously as a subject without being gratuitously grim.',
        'Violence is present but consequence-driven. Sabriel operates at an adventurous register; Abhorsen is darker with real losses. Clariel is the heaviest book in the series.',
        'No explicit sexual content.',
        "Nix's prose is clean and slightly formal: deliberate craft from the 1990s, closer to Le Guin in register than to contemporary fantasy. It suits the world but reads differently from recent epic fantasy.",
        'The series is intimate in scope: small casts, personal stakes, one central threat at a time. It is not political intrigue and does not expand into a large ensemble.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "Sabriel (1995) appeared before the modern YA fantasy category existed commercially, and before Harry Potter established what a young-adult fantasy novel could achieve. It demonstrated that secondary-world fantasy with a female protagonist, a rules-based magic system, and genuine literary ambition could reach and hold a broad readership.",
        "The seven bells and the precincts of Death are one of the earliest examples of hard magic (rules-based, with real costs) in fiction marketed toward younger readers. The system is self-consistent across all six novels and has not required retconning.",
        "The dual-world structure (Old Kingdom / Ancelstierre, magic world / technology world, Wall as hard boundary) predates similar devices in later fantasy and remains one of the clearest executions of the concept: the contrast between the two worlds is thematic, not just geographic.",
        "Nix built and maintained the Old Kingdom across 26 years of publication (1995-2021) without handing the world to estate continuations or co-authors. The series has a single consistent creative voice from first book to last.",
      ],
    },
  ],
  darkness: [
    { label: 'Sabriel', level: 2, desc: 'Danger and death, held at an adventurous register throughout.' },
    { label: 'Lirael & Abhorsen', level: 3, desc: 'Stakes escalate. Loss is real and the threat is existential.' },
    { label: 'Clariel', level: 3, desc: 'A tragedy of small decisions. Darker in retrospect than in the moment.' },
    { label: 'Goldenhand', level: 3, desc: 'Comparable to the main trilogy in tone.' },
  ],
  metaDescription:
    'The complete Old Kingdom reading order: Sabriel, Lirael, Abhorsen, Goldenhand, Clariel, Terciel & Elinor, and all companion fiction by Garth Nix, including where to start and where Clariel fits.',
  booksLikeSlug: 'sabriel',
  shortName: 'Old Kingdom',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished the trilogy?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['earthsea', 'memory-sorrow-thorn', 'grishaverse', 'mistborn', 'inheritance-cycle', 'robin-hobb'],
};
