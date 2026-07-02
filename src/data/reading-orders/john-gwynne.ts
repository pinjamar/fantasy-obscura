import type { ReadingOrderEntry } from '../reading-orders';

export const johnGwynne: ReadingOrderEntry = {
  slug: 'john-gwynne',
  name: 'John Gwynne',
  author: 'John Gwynne',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - 3 complete series; The Wolves of War due Nov 2026',
  description:
    "John Gwynne writes traditional epic fantasy built around visceral, tactically detailed battle scenes and found-family ensemble casts. He has three complete series: The Faithful and the Fallen is a four-book good-vs-evil war epic set in the Banished Lands, one of the most satisfying complete epics in recent genre fiction. Of Blood and Bone continues in the same world 130 years later with a new cast. The Bloodsworn Saga is an entirely separate Norse-mythology world and his best work to date. A fourth series (The Wolfheart Chronicles, a Slavic-mythology duology) begins November 2026. The two Banished Lands series share a world and history; the Bloodsworn Saga and Wolfheart Chronicles are each independent worlds.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark - high death toll, visceral battle violence',
  orderNote:
    'Four series across three worlds. Two share a world, two do not. The Faithful and the Fallen and Of Blood and Bone are both set in the Banished Lands but 130 years apart; either can be read first. The Bloodsworn Saga is a complete Norse-world trilogy (independent, no prior Gwynne reading required). The Wolfheart Chronicles is a new Slavic-world duology beginning November 2026, also independent. Start with either The Shadow of the Gods or Malice. There is no wrong choice.',
  groups: [
    {
      label: 'The Faithful and the Fallen',
      sublabel: 'Banished Lands - 4 books, complete',
      noteType: 'required',
      note: "A traditional good-vs-evil war epic following multiple POVs across a continent at war. The Ben-Elim (angels) and Kadoshim (demons) are fighting an ancient conflict called the God-War across the mortal world of the Banished Lands. One of the most satisfying complete multi-book epics written in the last decade: starts broad and converges into one of the genre's best final volumes.",
      books: [
        {
          title: 'Malice',
          slug: 'malice',
          status: 'mandatory',
          note: "The world of the Banished Lands is introduced across multiple POVs: Corban, a young man in the kingdom of Ardan who begins to suspect the world around him is not what it seems; Veradis, a warrior pledging himself to a prince; and others across several nations. The God-War's shadow falls across everything. Gwynne establishes the ensemble fast and the battle sequences set the register for the whole series.",
          page_count: 641,
          publication_year: 2012,
        },
        {
          title: 'Valour',
          slug: 'valour',
          status: 'mandatory',
          note: 'The war spreads. The POVs expand and the stakes escalate as multiple factions converge. Gwynne begins delivering on character threads established in Malice. The tactical battle writing is at its most sustained.',
          page_count: null,
          publication_year: 2014,
        },
        {
          title: 'Ruin',
          slug: 'ruin',
          status: 'mandatory',
          note: 'The conflict reaches across the entire continent. The death toll rises significantly: Gwynne does not protect his cast. The scope of the God-War comes fully into focus and the threads built across two books begin their final convergence.',
          page_count: null,
          publication_year: 2015,
        },
        {
          title: 'Wrath',
          slug: 'wrath',
          status: 'mandatory',
          note: 'The conclusion. Everything built across three books converges into a final battle sequence that spans much of the book. One of the better endings in multi-book epic fantasy: the scale is justified by what Gwynne has built. The found-family arcs close satisfyingly.',
          page_count: 713,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'Of Blood and Bone',
      sublabel: 'Banished Lands - 130 years later, 3 books, complete',
      noteType: 'optional',
      note: "Set in the same world as The Faithful and the Fallen but 130 years after its events, with an entirely new cast. The God-War's aftermath has reshaped the Banished Lands: the Ben-Elim now rule as a theocracy, and a new threat is rising. References TFatF events but functions as a soft continuation rather than a direct sequel. Can be read before or after TFatF, though reading TFatF first gives the historical references weight.",
      books: [
        {
          title: 'A Time of Dread',
          slug: 'a-time-of-dread',
          status: 'optional',
          note: "The Banished Lands 130 years on: the Ben-Elim rule as angels over a changed world, and the Kadoshim are stirring again. New protagonists (Drem, a young trapper; Riv, a Ben-Elim warrior; and others) enter a world that has calcified around the God-War's legacy. Gwynne's ensemble instincts carry over immediately.",
          page_count: 537,
          publication_year: 2018,
        },
        {
          title: 'A Time of Blood',
          slug: 'a-time-of-blood',
          status: 'optional',
          note: 'The new conflict escalates. The cast expands and the stakes lift toward TFatF scale. The theocratic Ben-Elim come under increasing pressure from within and without.',
          page_count: 534,
          publication_year: 2019,
        },
        {
          title: 'A Time of Courage',
          slug: 'a-time-of-courage',
          status: 'optional',
          note: "The conclusion of the Of Blood and Bone arc. Closes the new cast's story while resolving what the God-War ultimately left behind in the world.",
          page_count: 766,
          publication_year: 2020,
        },
      ],
    },
    {
      label: 'The Bloodsworn Saga',
      sublabel: 'separate Norse world - 3 books, complete',
      noteType: 'optional',
      note: "A completely separate world from the Banished Lands: no shared characters, history, or mythology. Norse-inspired: the gods fought a great battle (Gudfalla) and their remains now corrupt the land; their offspring are hunted or worshipped. Three POV characters: Orka (a mother tracking those who murdered her family), Varg (a former slave seeking his sister's killer), and Elvar (a young warrior with an oath-sworn warband). Gwynne's best writing. A complete trilogy and an independent entry point.",
      books: [
        {
          title: 'The Shadow of the Gods',
          slug: 'the-shadow-of-the-gods',
          status: 'mandatory',
          note: "Introduces the Norse world through three converging storylines. Orka's domestic life is shattered in the opening chapters; Varg has escaped slavery and is looking for answers; Elvar fights and schemes with the Battle-Grim warband. The world's mythology (gods as dead or sleeping giants whose blood still warps reality) is established fast. The best single entry point for new Gwynne readers.",
          page_count: 496,
          publication_year: 2021,
        },
        {
          title: 'The Hunger of the Gods',
          slug: 'the-hunger-of-the-gods',
          status: 'mandatory',
          note: 'The three storylines begin to converge as the consequences of the first book land. The scope widens: the gods are waking, and the power dynamics of the Norse world shift. The found-family bonds from book one are tested under sustained pressure.',
          page_count: 329,
          publication_year: 2022,
        },
        {
          title: 'The Fury of the Gods',
          slug: 'the-fury-of-the-gods',
          status: 'mandatory',
          note: 'The conclusion. The three POV threads converge fully. What began as three personal stories of revenge and survival becomes a war for the shape of the world, and Gwynne delivers on every thread he has built.',
          page_count: 560,
          publication_year: 2024,
        },
      ],
    },
    {
      label: 'The Wolfheart Chronicles',
      sublabel: 'new Slavic world - duology, upcoming',
      noteType: 'optional',
      note: "A completely new world: no connection to the Banished Lands or the Norse world of Vigrið. Slavic mythology inspired: ancient magic, brutal high-stakes combat, heroic sacrifice. Same ensemble instincts and warband register as Gwynne's previous series. A planned duology.",
      books: [
        {
          title: 'The Wolves of War',
          slug: null,
          status: 'upcoming',
          note: 'First book of the Wolfheart Chronicles duology. Set in a Slavic-mythology inspired world. Due November 2026.',
          page_count: null,
          publication_year: 2026,
        },
        {
          title: 'Book 2',
          slug: null,
          status: 'upcoming',
          note: 'Title and release date unannounced.',
          page_count: null,
          publication_year: null,
        },
      ],
    },
  ],
  booksLikeSlug: 'the-shadow-of-the-gods',
  cardsPosition: 'above',
  cards: [
    {
      title: '⚔️ The Battle Writing',
      body: "Gwynne's battle sequences are the genre benchmark for tactical, ground-level combat: he writes individual fights, shield-wall mechanics, and large-scale engagements with the same clarity. The violence is visceral and purposeful. It has weight because the characters have weight. Readers who find fantasy battles vague or consequence-free usually find his approach a significant improvement.",
      color: 'red',
    },
    {
      title: '👥 Warbands and Found Family',
      body: "Every Gwynne series is built around a group of people who choose each other: Corban's warband in TFatF, the Battle-Grim in Bloodsworn, the various oath-sworn bands across all three series. The emotional core is always the same: people who have lost everything or never had anything, forging loyalty through shared survival. The found-family dynamic is the primary reason readers continue through Gwynne's multiple series.",
      color: 'green',
    },
    {
      title: '🗺️ Three Worlds, Four Series',
      body: "The Faithful and the Fallen and Of Blood and Bone share the Banished Lands: reading TFatF first gives historical weight to OBoB, but it is not required. The Bloodsworn Saga is a complete Norse-world trilogy with no connection to the Banished Lands. The Wolfheart Chronicles (Nov 2026) is a third entirely separate world, Slavic-mythology inspired. Every series is an independent entry point. There is no wrong order.",
      color: 'blue',
    },
    {
      title: '😇 The God-War',
      body: "The Faithful and the Fallen is built around the Ben-Elim (angelic beings) and Kadoshim (demonic beings) fighting an ancient war across the mortal world of the Banished Lands. Mortals are drawn into a conflict that predates them and will outlast most of them. Gwynne uses the mythology carefully: the divine factions have internal politics and individual characters, not just allegiances. Of Blood and Bone deals with the God-War's aftermath 130 years on.",
      color: 'amber',
    },
    {
      title: '🐺 The Norse World',
      body: "The Bloodsworn Saga draws from Norse mythology with genuine specificity: Gudfalla (the gods' great battle), the dead gods' remains corrupting the land, thralls and oath-bonds and the social codes of a warrior culture. The three POV characters are defined by their relationships to the oath system: Orka has walked away from it, Varg is learning what it means, Elvar is bound by it. The mythology shapes character rather than decorating it.",
      color: 'purple',
    },
    {
      title: '📖 Of Blood and Bone: Where It Fits',
      body: "Of Blood and Bone is not a direct sequel to The Faithful and the Fallen: it is set 130 years later with no overlapping cast. It can be read before, after, or instead of TFatF. Reading TFatF first gives the historical references in OBoB weight; reading OBoB first means encountering references whose full significance only becomes clear later. The two series are designed to stand independently while sharing a world.",
      color: 'zinc',
    },
  ],
  characters: [
    {
      name: 'Corban',
      role: 'Protagonist of The Faithful and the Fallen',
      color: 'blue',
      why_they_work:
        "The chosen-one archetype, deployed earnestly rather than subverted. Readers who want the trope treated seriously rather than deconstructed find Corban satisfying; readers who need ironic distance will not. His animal companions (Storm the wolf, Buddai the hound) are not decorative. The warband register extends to the animals, and readers consistently name them among the emotional stakes of the series.",
    },
    {
      name: 'Veradis',
      role: 'POV protagonist of TFatF; warrior on the antagonist side',
      color: 'red',
      why_they_work:
        "He fights for the wrong faction and never fully understands it. His chapters are structurally unusual for epic fantasy: the reader follows someone doing harmful things for comprehensible, even admirable reasons. The loyalty he has sworn is the kind the series asks you to respect in every other character. Gwynne never lets Veradis off the hook, but he never makes him villainous either.",
    },
    {
      name: 'Riv',
      role: 'POV protagonist of Of Blood and Bone; half Ben-Elim warrior',
      color: 'amber',
      why_they_work:
        "Half-divine in a world where divinity is the basis of political authority. Her arc is the most direct interrogation of what the God-War's legacy actually costs the people who live under Ben-Elim rule: claimed by both sides, trusted fully by neither. She does what Corban does in the first series but in a world that has calcified around the outcome of his story.",
    },
    {
      name: 'Orka',
      role: 'POV protagonist of The Bloodsworn Saga; hunter and former warrior',
      color: 'green',
      why_they_work:
        "Gwynne opens the Bloodsworn Saga with several chapters of Orka's domestic life before destroying it: the specificity of what she loses is what makes the violence that follows land differently from generic revenge plots. She is also the character who knows the most about the Norse world and conceals it most deliberately. What she chooses not to say in the early chapters matters as much as what she does.",
    },
    {
      name: 'Varg',
      role: 'POV protagonist of The Bloodsworn Saga; former slave',
      color: 'zinc',
      why_they_work:
        "The least experienced of the three Bloodsworn POVs, which makes him the reader's orientation point for the oath-system and the mythology. His arc is about earning belonging in a culture where belonging is legally and socially defined by oaths he has never had the chance to swear. The warband theme runs through all three POVs; his version of it is the most literal.",
    },
    {
      name: 'Elvar',
      role: 'POV protagonist of The Bloodsworn Saga; warrior of the Battle-Grim',
      color: 'purple',
      why_they_work:
        "The most internally conflicted of the three: she is motivated by proving herself to a father who underestimates her, which means she is the POV character most likely to make choices the reader can see are mistakes. Her chapters track the oath-system from inside a professional warband, showing how the social codes of the Norse world function at the level of daily life rather than mythological consequence.",
    },
  ],
  sections: [
    {
      heading: 'What the series is',
      type: 'bullets',
      bullets: [
        'Gwynne writes good-vs-evil war epic with genuine heroism at the centre. The moral frame is not ambiguous: there is an enemy and there are people fighting it. If moral ambiguity is the primary thing you want from fantasy, this is not that.',
        'The combat is the main event. Every series is built around battles: shield-wall, naval, siege, wilderness ambush, written with tactical specificity and individual character consequence. The violence is purposeful.',
        'Every series is built around a found family: people who choose each other through shared survival. The emotional core is the warband, not the romance or the political intrigue.',
        'All three published series have fully resolved endings. The Bloodsworn Saga completed in 2024; The Faithful and the Fallen completed in 2016; Of Blood and Bone in 2020. Starting Gwynne now means having three complete arcs available immediately.',
        'The pacing is propulsive and the ensemble casts are large. Intimate character study in the early pages is not the register: the investment is built across volumes.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness type: war violence, character death, grief. Named characters die, including central ones. The losses are not softened or reversed.',
        'No explicit sexual content across any series. Romance is present but secondary to the warband and battle narrative.',
        'The Bloodsworn Saga has a slightly grimmer register than the Banished Lands series: the Norse world is harsher in tone and the personal stakes of the three POVs involve trauma from before the story begins.',
        'No on-page torture or sexual violence.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Three complete series published between 2012 and 2024: The Faithful and the Fallen (4 books), Of Blood and Bone (3 books), The Bloodsworn Saga (3 books). Ten books, three fully resolved stories, across twelve years of consistent quality.',
        "The Shadow of the Gods (2021) is one of the most successful fantasy debuts of the 2020s and is credited with reinvigorating Norse-mythology epic fantasy as a distinct subgenre. Gwynne's background (he played professional rugby) brings physical specificity to combat writing that distinguishes his battle scenes from the field.",
        "The Faithful and the Fallen is frequently cited as the most satisfying complete good-vs-evil epic in the post-Tolkien tradition: all four books published, clean ending, no filler. It occupies the space readers mean when they say they want 'proper epic fantasy' without the decade-plus wait.",
        'The Bloodsworn Saga won the Goodreads Choice Award for Fantasy in 2021 (The Shadow of the Gods) and has sustained readership across all three volumes. It is the current benchmark for Norse-inspired fantasy at novel length.',
      ],
    },
  ],
  darkness: [
    {
      label: 'The Faithful and the Fallen',
      level: 4,
      desc: 'High death toll including significant characters. The violence is purposeful and the war is brutal.',
    },
    {
      label: 'Of Blood and Bone',
      level: 4,
      desc: 'Comparable to TFatF. The theocratic world has its own darkness and the battles carry the same weight.',
    },
    {
      label: 'The Bloodsworn Saga',
      level: 4,
      desc: 'Norse-level brutality. Violence is constant and character losses are real; slightly grimmer register than TFatF.',
    },
  ],
  metaDescription:
    'The complete John Gwynne reading order: The Faithful and the Fallen, Of Blood and Bone, the Bloodsworn Saga, and The Wolfheart Chronicles - which to start with and how they connect.',
  shortName: 'John Gwynne',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished a Gwynne series?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['first-law', 'malazan', 'asoiaf', 'black-company', 'horus-heresy', 'wheel-of-time'],
};
