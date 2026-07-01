import type { ReadingOrderEntry } from '../reading-orders';

export const greenBoneSaga: ReadingOrderEntry = {
  slug: 'green-bone-saga',
  name: 'The Green Bone Saga',
  author: 'Fonda Lee',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 3 books',
  description:
    "A crime epic in fantasy clothing: The Godfather transplanted to a fictional Pacific island where jade grants martial arts powers and rival clans fight for control of everything. Three novels, one family, thirty years of history. Fonda Lee builds Kekon with the same care Jordan gave the Wheel of Time world, but the story moves at a crime thriller's pace: political, intimate, and unsparing. The violence is real, the losses are permanent, and the ending is exactly what the trilogy required.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  orderNote:
    'Read in publication order. The short stories (The Jade Setter of Janloon and Jade Shards) are best read after the full trilogy. They are prequels in setting. The emotional resonance depends on knowing who these characters become.',
  books: [
    {
      title: 'Jade City',
      slug: 'jade-city',
      status: 'mandatory',
      note: 'Start here. The Kaul family and the No Peak clan: two brothers, a sister, and a grandfather running Janloon while a rival clan moves against their territory.',
      page_count: 560,
      publication_year: 2017,
    },
    {
      title: 'Jade War',
      slug: 'jade-war',
      status: 'mandatory',
      note: 'The conflict expands beyond Kekon: immigration, diaspora, and colonial pressure from larger nations become central. The Kaul family operates across multiple countries for the first time.',
      page_count: 616,
      publication_year: 2019,
    },
    {
      title: 'Jade Legacy',
      slug: 'jade-legacy',
      status: 'mandatory',
      note: 'The arc closes across thirty years of time jumps. Characters age, new ones carry the story forward. The series reckons with what jade-clan rule does to the Kaul family across three decades: not just in deaths, but in who each of them becomes.',
      page_count: 688,
      publication_year: 2021,
    },
    {
      title: 'The Jade Setter of Janloon',
      slug: 'the-jade-setter-of-janloon',
      status: 'supplementary',
      note: "A standalone short story exploring life in Kekon outside the main clan leadership: the craftspeople who implant jade into Green Bone warriors, and the world they inhabit in the clans' shadow. Published in Uncanny Magazine (2022). Read after the trilogy.",
      page_count: null,
      publication_year: 2022,
    },
    {
      title: 'Jade Shards',
      slug: 'jade-shards',
      status: 'supplementary',
      note: "Four prequel short stories on the Kaul and Ayt families before Jade City: Ayt Mada's youth, Kaul Lan challenging his grandfather, Hilo and Maik Wen's early relationship, and Kaul Shae as a foreign informer. Read after the full trilogy.",
      page_count: null,
      publication_year: 2023,
    },
  ],
  cardsPosition: 'above',
  cards: [
    {
      title: '🪨 What Jade Does',
      body: "Jade is a mineral that grants bioenergetic abilities to those trained to use it: enhanced speed, strength, perception, and channelling of energy. Untrained exposure causes madness and death. It is simultaneously a drug, a weapon, a status symbol, and the resource everything in Kekon is built around. The magic system is physical, grounded, and the combat is visceral.",
      color: 'blue',
    },
    {
      title: '🎬 The Godfather Comparison',
      body: "The comparison holds. Rival clans, a patriarch's succession, loyalty tested against ambition, and the long cost of building an empire through violence. The Green Bone Saga occupies the same emotional register as the best crime fiction. It uses those conventions to tell a story about jade-powered martial arts clans, Pacific colonial history, and cultural identity under external pressure. None of which The Godfather can access.",
      color: 'green',
    },
    {
      title: '🌏 Kekon and the World',
      body: "Kekon is modelled loosely on post-WWII Taiwan and Hong Kong: a small island nation with a martial culture sitting in the crossfire of larger imperial powers. Colonialism, the diaspora experience, and what it means to preserve cultural identity under external pressure are woven into the politics without being didactic.",
      color: 'amber',
    },
    {
      title: '📈 The Scope',
      body: "Jade Legacy covers thirty years. Characters age, die, and pass legacies to the next generation. The series begins as a street-level clan story and ends as a geopolitical saga. The Kaul family remains the centre throughout. The scope expands because the story requires it, not because the series needed to feel bigger.",
      color: 'purple',
    },
    {
      title: '⚠️ The Losses',
      body: "Characters the reader is attached to die, sometimes abruptly and without heroic framing. The final book is emotionally demanding. Lee builds the cast over three books so the losses hit without warning and without softening. This is not a series that protects its cast.",
      color: 'red',
    },
    {
      title: '🏆 The Recognition',
      body: "Jade Legacy won the 2022 World Fantasy Award for Best Novel. Jade City won the Aurora Award for Best Novel in 2018. The full trilogy collected major award recognition across all three volumes. It is the defining work demonstrating that epic fantasy does not require European cosmology, geography, or cultural foundations to operate at the genre's highest ambition.",
      color: 'green',
    },
  ],
  characters: [
    {
      name: 'Kaul Lan',
      role: 'Pillar of No Peak; eldest Kaul sibling',
      color: 'blue',
      why_they_work:
        "The closest comparison is Ned Stark: a principled leader trying to run a criminal empire by a code the enterprise does not support. His presence in book one defines what the clan believes about itself. The rest of the trilogy is measured against the gap between that belief and what the clan actually does.",
    },
    {
      name: 'Kaul Hilo',
      role: 'Horn then Pillar of No Peak; youngest Kaul brother',
      color: 'red',
      why_they_work:
        "The most dangerous member of the clan and the one least suited to what leading it ultimately requires. The gap between what he is (a fighter, a specialist in violence) and what the Pillar's position demands (strategist, diplomat, builder of institutions) is the core tension of books two and three.",
    },
    {
      name: 'Kaul Shae',
      role: 'Weather Man of No Peak; Kaul sister',
      color: 'amber',
      why_they_work:
        "Spent years abroad deliberately separating herself from everything the clan represents, then comes back and ends up running it. Her arc is the clearest statement the trilogy makes about whether you can choose to leave your family, or whether the family chooses you regardless.",
    },
    {
      name: 'Ayt Mada',
      role: 'Pillar of the Mountain clan; primary antagonist',
      color: 'purple',
      why_they_work:
        "Not wrong about most things. She understands what jade-clan politics require and acts accordingly without scruple. What separates her from the Kauls is not superior morality on their part. It is that she has eliminated every constraint that would slow her down. The series is careful to make this distinction explicit.",
    },
  ],
  sections: [
    {
      heading: 'What the series is',
      type: 'bullets',
      bullets: [
        "Political family drama first, martial arts fantasy second. The Kaul siblings carry the full trilogy; plot is subordinate to character and consequence.",
        "The world-building is built from the inside out, not from aesthetics. The jade economy, the clan hierarchy, the immigration law, and what a Kekon marriage contract looks like all derive from the same cultural logic.",
        "Morally grey throughout. Clan leaders do terrible things for reasons the series asks you to understand without endorsing. There is no clean hero.",
        "Jade City opens without an orientation chapter. The terminology and clan dynamics become clear through context within the first fifty pages.",
        "The magic requires years of rigorous training and has real physical costs. There is no chosen one with innate power.",
        "Three books, definitive ending. Jade Legacy closes the full arc. No open threads, no waiting.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness type: political violence, assassination, and permanent loss. Lee follows through on consequences without heroic framing or softening.',
        'Romance: present across multiple characters throughout the trilogy, but subordinate to political and family drama.',
        'No explicit sexual content.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Jade Legacy won the 2022 World Fantasy Award for Best Novel. Jade City won the Aurora Award for Best Novel in 2018. The trilogy collected major award recognition across all three volumes.',
        'Published 2017–2021, it made the case that epic fantasy built on non-European foundations can sustain the scope and commercial ambition of the genre\'s most ambitious works. Not as a niche exception, but as its defining example.',
        'The jade system grounds magic in economics, training, and biological cost rather than bloodline or mystical inheritance. It changed how the field thinks about magic as an economic and geopolitical driver.',
        'The Green Bone Saga stands alongside N.K. Jemisin\'s Broken Earth as the defining achievement of the 2010s push toward epic fantasy not built on European cosmology.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Jade City',
      level: 3,
      desc: 'Real violence with permanent consequences. The deaths are purposeful, not decorative.',
    },
    {
      label: 'Jade War',
      level: 4,
      desc: 'War, loss, and the personal consequences of political decisions made at scale.',
    },
    {
      label: 'Jade Legacy',
      level: 4,
      desc: 'Grief, succession, and a final act that is emotionally demanding throughout.',
    },
  ],
  metaDescription:
    'The complete Green Bone Saga reading order: Jade City, Jade War, Jade Legacy, and all companion fiction by Fonda Lee.',
  shortName: 'Green Bone Saga',
  booksLikeSlug: 'jade-city',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished the trilogy?',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse Grimdark Fantasy',
  related: ['first-law', 'malazan', 'black-company', 'asoiaf', 'dune', 'wheel-of-time'],
};
