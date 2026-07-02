import type { ReadingOrderEntry } from '../reading-orders';

export const mistborn: ReadingOrderEntry = {
  slug: 'mistborn',
  name: 'Mistborn',
  shortName: 'Mistborn',
  author: 'Brandon Sanderson',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '⏳ Ongoing - Ghostbloods 1 expected Dec 2028',
  description:
    "Brandon Sanderson's Mistborn is set on a world where the prophesied hero failed a thousand years ago and a dark lord has ruled ever since. The original trilogy is a complete story of revolution, consequence, and cosmic revelation. Era 2 jumps 300 years forward into a Western-flavoured world of guns, trains, and new Allomancers. Era 3 (in progress) will advance to a near-modern spy-thriller setting. Each era is sequential: later eras build directly on the events and revelations of earlier ones. Mistborn is also part of the broader Cosmere universe. Era 2's The Lost Metal in particular has significant crossover with Stormlight and Warbreaker: the Cosmere guide covers how the series interleave.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate - purposeful darkness; Era 1 is the heaviest',
  orderNote:
    'Extras are placed where they should actually be read, not just by series number. Secret History is #3.5 but positioned after Bands of Mourning: its note explains why. Era 3 (The Ghostbloods) is in progress; first book expected December 2028.',
  groups: [
    {
      label: 'Era 1 - The Original Trilogy',
      sublabel: 'start here - a complete story in three books',
      books: [
        {
          title: 'The Final Empire',
          slug: 'the-final-empire',
          status: 'mandatory',
          seriesLabel: 'Mistborn #1',
          note: 'Start here. A crew of thieves and Mistborn plan a heist to overthrow a god-emperor who has ruled for a thousand years. The magic system, the world-building, and the structural twist work in precise coordination: each element exists to make the others possible.',
          page_count: 541,
          publication_year: 2006,
        },
        {
          title: 'The Eleventh Metal',
          slug: 'the-eleventh-metal',
          status: 'supplementary',
          seriesLabel: 'Mistborn #1.5',
          note: "~6k words. Kelsier's training before The Final Empire. Free on Sanderson's site. Best read right after The Final Empire.",
          page_count: 30,
          publication_year: 2011,
        },
        {
          title: 'The Well of Ascension',
          slug: 'the-well-of-ascension',
          status: 'mandatory',
          seriesLabel: 'Mistborn #2',
          note: 'The revolution succeeded; now the harder work begins. A political siege novel: longer, slower, and more focused on Elend and governance than Vin and action. The final act resolves what the first two-thirds sets up. The slowest of the three and essential.',
          page_count: 590,
          publication_year: 2007,
        },
        {
          title: 'The Hero of Ages',
          slug: 'the-hero-of-ages',
          status: 'mandatory',
          seriesLabel: 'Mistborn #3',
          note: "Everything converges. The full cosmological scope of what Sanderson has been building across three books is revealed. The climax is the answer to the mystery the trilogy has been building toward from the first chapter of The Final Empire.",
          page_count: 572,
          publication_year: 2008,
        },
      ],
    },
    {
      label: 'Era 2 - Wax and Wayne',
      sublabel: '300 years later - Western-flavoured Scadrial',
      books: [
        {
          title: 'The Alloy of Law',
          slug: 'the-alloy-of-law',
          status: 'mandatory',
          seriesLabel: 'Mistborn #4',
          note: 'A lighter, faster Mistborn: half the length of Era 1 books. Waxillium Ladrian is a frontier lawman dragged back to the city against his will. The tone is adventure serial rather than epic: faster plotting, lighter stakes, the same magic.',
          page_count: 332,
          publication_year: 2011,
        },
        {
          title: 'Shadows of Self',
          slug: 'shadows-of-self',
          status: 'mandatory',
          seriesLabel: 'Mistborn #5',
          note: 'Darker and more personal than Alloy. A murderer is killing city leaders and Wax must uncover why. Important Cosmere lore drops and a gut-punch of an ending.',
          page_count: 383,
          publication_year: 2015,
        },
        {
          title: 'Allomancer Jak and the Pits of Eltania',
          slug: 'allomancer-jak-and-the-pits-of-eltania',
          status: 'supplementary',
          seriesLabel: 'Mistborn #5.5',
          note: 'Comedic pulp-adventure short set in the Era 2 world. Light, fun, self-contained. Part of the Arcanum Unbounded collection.',
          page_count: 35,
          publication_year: 2014,
        },
        {
          title: 'The Bands of Mourning',
          slug: 'the-bands-of-mourning',
          status: 'mandatory',
          seriesLabel: 'Mistborn #6',
          note: 'Adventure-quest plotting: Wax and the crew travel far from Elendel. Big reveals connecting to the broader Cosmere. The most fun of the Era 2 books.',
          page_count: 448,
          publication_year: 2016,
        },
        {
          title: 'Secret History',
          slug: 'mistborn-secret-history',
          status: 'supplementary',
          seriesLabel: 'Mistborn #3.5',
          note: 'Novella. Chronologically Era 1, but must be read here, after Bands of Mourning: it spoils Era 2 plot points and lands significantly harder with Era 2 context. Shows what happened behind the scenes of Era 1. Essential for Cosmere readers.',
          page_count: 175,
          publication_year: 2016,
        },
        {
          title: 'The Lost Metal',
          slug: 'the-lost-metal',
          status: 'mandatory',
          seriesLabel: 'Mistborn #7',
          note: 'Era 2 finale. Massive Cosmere crossover: characters and concepts from across the Cosmere converge on Scadrial. The most ambitious Mistborn book since Hero of Ages.',
          page_count: 528,
          publication_year: 2022,
        },
      ],
    },
    {
      label: 'Era 3 - The Ghostbloods',
      sublabel: 'coming 2028-2030 - not yet published',
      note: 'Officially titled The Ghostbloods. Era 3 advances Scadrial to a near-modern spy-thriller setting: cars, electricity, Cold War-era politics. Sanderson began writing after finishing Wind and Truth (2024) and gave the first public reading in late 2025. Three books planned; first expected December 2028.',
      noteType: 'optional',
      books: [
        {
          title: 'Ghostbloods 1',
          slug: 'ghostbloods-1',
          status: 'upcoming',
          seriesLabel: 'Mistborn #8',
          note: 'Upcoming December 2028. First novel of the Ghostbloods trilogy.',
          page_count: null,
          publication_year: 2028,
        },
        {
          title: 'Ghostbloods 2',
          slug: 'ghostbloods-2',
          status: 'upcoming',
          seriesLabel: 'Mistborn #9',
          note: 'Upcoming 2029. Second novel of the Ghostbloods trilogy.',
          page_count: null,
          publication_year: 2029,
        },
        {
          title: 'Ghostbloods 3',
          slug: 'ghostbloods-3',
          status: 'upcoming',
          seriesLabel: 'Mistborn #10',
          note: 'Upcoming December 2030. Final novel of the Ghostbloods trilogy.',
          page_count: null,
          publication_year: 2030,
        },
      ],
    },
  ],
  cardsPosition: 'above',
  cards: [
    {
      title: '🌑 The Dark Lord Won',
      body: "A thousand years ago, the prophesied hero failed. Ash falls from the sky, mists come at night, and the Lord Ruler (a god-emperor who claims to have saved the world) has ruled unopposed ever since. Mistborn opens not with a chosen hero arriving to fix things, but with a world that already lost and a crew of thieves who've decided to rob it anyway.",
      color: 'zinc',
    },
    {
      title: '🎭 Kelsier',
      body: "The driving force of Era 1 is not the obvious protagonist. Kelsier is a Mistborn who survived the Lord Ruler's death camps and came back brilliant, charismatic, and comfortable with violence. He shapes every character around him and his presence is felt across the entire trilogy even when he is not on the page. He is the character through whom Sanderson asks whether a genuinely compelling man with a genuinely good cause can also be wrong in ways that matter.",
      color: 'red',
    },
    {
      title: '⚗️ Allomancy',
      body: "Mistborn's defining magic: swallow a metal and burn it to gain a power. Iron pulls metal toward you; steel pushes it away; tin sharpens your senses; pewter enhances your body. There are 16 metals, each doing something different. Mistborn can burn all of them; Mistings burn only one. The system has discoverable rules and real costs. Understanding how it works is part of reading Era 1.",
      color: 'purple',
    },
    {
      title: '🔫 Era 2 Is a Different Beast',
      body: "Era 2 books average 380 pages: less than half the length of Era 1. The tone shifts to a Western-flavoured adventure serial with guns, trains, a lawman protagonist, and faster plotting. The Alloy of Law was deliberately written as a tonal reset after Era 1. The magic system is the same; the scale and register are different.",
      color: 'blue',
    },
    {
      title: '🌌 The Lost Metal',
      body: 'The Lost Metal (Era 2 finale) is the most Cosmere-dense book Sanderson has published. Characters, forces, and plot threads from Stormlight and Warbreaker converge on Scadrial. If you are reading the full Cosmere and not just Mistborn, read it after Rhythm of War: the cross-series resonance is significantly larger with that context.',
      color: 'amber',
    },
    {
      title: '📍 Secret History',
      body: 'Secret History is numbered #3.5 but placed in this guide after The Bands of Mourning (#6). This is intentional: it is set during Era 1 events but contains spoilers for Era 2 plot points and lands significantly harder with Era 2 context. Its note explains the placement in full.',
      color: 'green',
    },
  ],
  characters: [
    {
      name: 'Vin',
      role: 'Skaa street thief; Mistborn; protagonist of Era 1',
      color: 'blue',
      why_they_work:
        "The protagonist through whom the reader encounters Allomancy for the first time, which means her learning is the reader's learning. Her starting condition is the point: she is skaa (lower class), trained by circumstance to trust no one and take nothing for herself. The trilogy tracks what happens when someone conditioned entirely by survival gives that up for something larger, and why it costs her differently than it costs anyone else in the crew.",
    },
    {
      name: 'Kelsier',
      role: "Mistborn; leader of the crew planning to overthrow the Lord Ruler",
      color: 'red',
      why_they_work:
        "He holds the argument that violence is a legitimate tool of liberation, and Sanderson does not let the trilogy dismiss that argument cheaply. Kelsier is right about the cause and complicated about the methods. The series is in large part about what it means to follow someone like that: what you accept, what you refuse, and what follows from both choices.",
    },
    {
      name: 'Elend Venture',
      role: 'Noble scholar; becomes king of Luthadel after the revolution',
      color: 'green',
      why_they_work:
        "The man who theorised about revolution from inside the nobility and then had to govern the consequence of one. His arc across three books is the most understated in the trilogy: he does not become a different person, but the same values applied to circumstances that require more than philosophy reveal what those values actually amount to. The transformation from book 1 to book 3 is visible mostly in what he stops saying.",
    },
    {
      name: 'Sazed',
      role: 'Terrisman Keeper; Feruchemist; scholar of suppressed religions',
      color: 'amber',
      why_they_work:
        "The character whose thematic weight is not apparent until The Hero of Ages. He spends most of Era 1 as the knowledgeable mentor and keeper of religious traditions the Lord Ruler destroyed: his function is to preserve memory across centuries of suppression. What Sanderson does with that function in book 3 is the culmination of everything the series has set up about faith, knowledge, and what it means to hold all the world's destroyed beliefs simultaneously without being able to affirm any of them.",
    },
    {
      name: 'Waxillium Ladrian',
      role: 'Twinborn lawman (Allomancer and Feruchemist); protagonist of Era 2',
      color: 'purple',
      why_they_work:
        "He is a Coinshot-Feruchemist Twinborn who spent years as a frontier lawman and returned to the city as a lord with two identities that fit badly together. Era 2's tonal shift from revolution to urban crime works because of his specific position: attached to both worlds, comfortable in neither, and operating in a Scadrial where the magic he uses has been categorised, regulated, and partially domesticated since the events of Era 1.",
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        'The Final Empire is the only entry point. Not The Alloy of Law, not Secret History: Era 1 comes first, and the series is sequential.',
        'The Final Empire is 541 pages: shorter than a Stormlight book and structured for faster reading. The pacing accelerates considerably once the heist begins.',
      ],
    },
    {
      heading: 'The magic system',
      type: 'bullets',
      bullets: [
        'Allomancy: swallowing and burning metals to gain powers. Each of the 16 metals does something different. Mistborn can burn all metals; Mistings only one.',
        'Feruchemy: storing attributes (strength, speed, memory, health) in metal minds for later use. Feruchemists are rarer than Allomancers.',
        'Hemalurgy: a darker third magic system introduced gradually. It steals powers and attributes by driving metal spikes through living things at precise moments.',
        "Era 2 introduces new alloys and hybrid powers as Scadrial's technology advances. The magic system evolves alongside the world.",
      ],
    },
    {
      heading: 'Era 1 vs Era 2',
      type: 'prose',
      prose:
        'Era 1 and Era 2 are set on the same world with the same magic, but 300 years apart. Scadrial is transformed: trains, electricity, and firearms. Allomancy has diversified into new metals, hybrid Twinborn (Allomancer and Feruchemist in one), and new social structures built around powers that were once underground. The political stakes shift from revolution to urban crime and political corruption. The scope is smaller; the mysteries run deeper.',
    },
    {
      heading: 'What changed between Era 1 and Era 2',
      type: 'spoiler',
      bullets: [
        "The ash falls and mists that defined Era 1's world are gone by Era 2. Scadrial has blue skies and restored ecology. It is a direct result of the events of The Hero of Ages.",
        "The resolution of the Lord Ruler's 'saving the world' claim (the central mystery of Era 1) is answered in book 3 and reshapes everything about what came before.",
      ],
    },
    {
      heading: 'Cosmere placement',
      type: 'prose',
      prose:
        'Era 1 can be read in complete isolation, no prior Cosmere knowledge needed. Era 2 begins introducing threads. If you are reading the full Cosmere, slot Era 2 between Stormlight books 3 and 4: the guide explains why. Era 3 (The Ghostbloods) assumes familiarity with both Mistborn eras and Stormlight.',
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Violence throughout: revolution, executions, and war. Purposeful and not gratuitous.',
        'Era 1 deals seriously with oppression, slavery, and genocide as systemic forces, not just backdrop.',
        'No explicit sexual content across any era.',
        'The politics of resistance and complicity in Era 1 are not cleanly resolved. The narrative does not categorise its actors as morally right or wrong.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "The Final Empire contains a mid-book structural twist that reframes the preceding 200 pages without invalidating them. It is the moment that established Sanderson's reputation for plot construction.",
        "Sanderson's concept of hard magic (magic with internal rules and costs) is now standard vocabulary in fantasy discourse. Mistborn is its clearest demonstration.",
        'The Cosmere (of which Mistborn is the recommended on-ramp) is the most ambitious shared-universe project in the history of the genre.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Era 1',
      level: 3,
      desc: 'Revolution, genocide, and cosmic horror. The darkness is purposeful; the scale is enormous.',
    },
    {
      label: 'Era 2',
      level: 2,
      desc: 'Lighter tone overall. Violence and personal loss but less cosmically heavy than Era 1.',
    },
    {
      label: 'Era 3',
      level: 3,
      desc: 'Expected to match Era 2. Spy thriller tone with moral complexity.',
    },
  ],
  metaDescription:
    'Mistborn reading order: all three eras in sequence - Era 1 original trilogy, Era 2 Wax and Wayne, and Era 3 The Ghostbloods by Brandon Sanderson.',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished Scadrial?',
  categoryHref: '/fantasy/epic/',
  categoryLabel: 'Browse Epic Fantasy',
  related: [
    'cosmere',
    'stormlight',
    'wheel-of-time',
    'malazan',
    'kingkiller',
    'first-law',
  ],
  booksLikeSlug: 'mistborn-the-final-empire',
};
