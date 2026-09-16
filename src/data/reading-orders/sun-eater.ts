import type { ReadingOrderEntry } from '../reading-orders';

export const sunEater: ReadingOrderEntry = {
  slug: 'sun-eater',
  name: 'The Sun Eater',
  author: 'Christopher Ruocchio',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 7 books + 3 novellas (finished 2025)',
  description:
    "Christopher Ruocchio builds The Sun Eater around a single audacious premise: its narrator already knows exactly what he becomes, and tells you anyway. A feudal interstellar empire outlaws the faster-than-light travel its own ships depend on, a centuries-old war rages against the genuinely alien Cielcin, and Hadrian Marlowe's classical education and Stoic philosophy never quite explain the man his own history remembers him as.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Serious - wartime violence and psychological cost, escalating through the series',
  orderNote:
    "Read the seven main novels in publication order. The three side novellas are placed at their exact points in the timeline rather than at the end of the list; each one's note says exactly where it fits. All three are optional and skippable. (Spoiler-Free.)",
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Christopher Ruocchio',
      body: "Ruocchio has said directly, in an interview around Ashes of Man, that \"the Frank Herbert influence remains, and the Gene Wolfe is strong as ever\", his own acknowledged influence, not just a critical comparison other people made. He finished the seven-book main sequence with Shadows Upon Time in 2025.",
      color: 'blue',
    },
    {
      title: '⏳ Hadrian Already Knows How This Ends',
      body: "Hadrian narrates his own life from decades in the future, and he opens by telling you plainly that he becomes the most important, and most terrible, man in human history. Every choice he makes gets read against a fate he's already confirmed and never fully explains.",
      color: 'purple',
    },
    {
      title: '👑 An Empire That Outlawed Its Own Ships',
      body: "The Sollan Empire is feudal (lords, serfs, inherited power) despite spanning the galaxy, and its ships use faster-than-light travel that the ruling chantry officially classifies as heresy. Ruocchio builds the setting's contradictions directly into the plot rather than leaving them as background world-building.",
      color: 'amber',
    },
    {
      title: '👽 The Cielcin',
      body: "Humanity has fought the alien Cielcin for centuries by the time Hadrian's story starts, and the series treats them as genuinely alien rather than humans in makeup: unfamiliar motives, an unfamiliar sense of time, and a war whose actual causes only get revealed gradually across multiple books.",
      color: 'red',
    },
    {
      title: '📖 Long, Dense, and Not in a Hurry',
      body: "Every book runs 500 to 900-plus pages, and Ruocchio isn't writing for pace: long philosophical digressions, classical allusions, and a narrator who circles back to reconsider his own memories rather than plowing straight through the plot. The payoff builds across the whole series rather than resolving book by book.",
      color: 'green',
    },
    {
      title: '🌌 A Complete Story',
      body: "Shadows Upon Time (2025) is the seventh and final novel; Ruocchio has since moved on to a new, unconnected series called The Doomsong Saga. A hardcover story anthology, Songs of the Sun Eater, arrives in November 2026 with one new story set after the finale, but it adds context rather than continuing the plot.",
      color: 'zinc',
    },
  ],
  books: [
    {
      title: 'Empire of Silence',
      slug: 'empire-of-silence',
      status: 'mandatory',
      note: "Hadrian Marlowe flees the future his father has planned for him, training as a torturer-priest of the Chantry, and ends up stranded on the frontier world Emesh instead. Sold into an arena as a fighting slave, he eventually becomes a soldier in the war against the alien Cielcin, the first step on a path that ends with him remembered as history's greatest monster.",
      page_count: 612,
      publication_year: 2018,
    },
    {
      title: 'The Lesser Devil',
      slug: 'the-lesser-devil',
      status: 'optional',
      seriesLabel: 'The Sun Eater #1.5',
      note: "A self-contained story following Hadrian's younger brother Crispin Marlowe, decades after Hadrian's disappearance from the family he left behind. Read anytime after Empire of Silence; nothing here is required for Howling Dark.",
      page_count: 204,
      publication_year: 2020,
    },
    {
      title: 'Howling Dark',
      slug: 'howling-dark',
      status: 'mandatory',
      note: "Now a mercenary captain searching for the lost world Vorgossos, Hadrian defies his own commander to smuggle a captured Cielcin priest to a peace parley with Prince Aranata Otiolo, in the domain of the immortal cyborg-lord Kharn Sagara. The talks are a trap, and the fallout reshapes the war.",
      page_count: 679,
      publication_year: 2019,
    },
    {
      title: 'Queen Amid Ashes',
      slug: 'queen-amid-ashes',
      status: 'optional',
      seriesLabel: 'The Sun Eater #2.5',
      note: "Freshly knighted, Hadrian is sent to liberate the desert world Thagura from a Cielcin incursion and finds cruelty on his own side that rivals the alien threat he was sent to fight. Set between Howling Dark and Demon in White.",
      page_count: 190,
      publication_year: 2021,
    },
    {
      title: 'Demon in White',
      slug: 'demon-in-white',
      status: 'mandatory',
      note: "Nicknamed \"Halfmortal\" by soldiers who half-worship him, Hadrian sits constrained by court protocol at the right hand of the Sollan Emperor, the same man he's fated to kill, while chasing coordinates to the homeworld of an ancient precursor race called the Quiet.",
      page_count: 776,
      publication_year: 2020,
    },
    {
      title: 'Kingdoms of Death',
      slug: 'kingdoms-of-death',
      status: 'mandatory',
      note: "Decades after a battlefield \"miracle\" at Berenike earns him nearly a century of house arrest, Hadrian is recalled as the Cielcin war intensifies under a new warlord uniting their clans, and is captured deep in hostile territory, where the book's real stakes turn psychological rather than tactical.",
      page_count: 535,
      publication_year: 2021,
    },
    {
      title: 'Ashes of Man',
      slug: 'ashes-of-man',
      status: 'mandatory',
      note: "Grieving the destruction of his own command, Hadrian returns to the Empire visibly changed by what the war has cost him, and has to rebuild the Emperor's trust through court intrigue before the book turns into a large-scale siege.",
      page_count: 537,
      publication_year: 2022,
    },
    {
      title: 'The Dregs of Empire',
      slug: 'the-dregs-of-empire',
      status: 'optional',
      seriesLabel: 'The Sun Eater #5.5',
      note: "Told from the perspective of Lorian Aristedes, Hadrian's former second-in-command, now condemned as a traitor and imprisoned on the ice-world penal colony Belusha. Set between Ashes of Man and Disquiet Gods.",
      page_count: 330,
      publication_year: 2023,
    },
    {
      title: 'Disquiet Gods',
      slug: 'disquiet-gods',
      status: 'mandatory',
      note: "Nearly two centuries after Hadrian struck the Emperor and walked away from the war, a plague grips human space and the Cielcin have overrun huge stretches of it. Pardoned and recalled alongside his own daughter, Hadrian investigates a dead scientific expedition before a mission to kill one of the god-like beings the Cielcin actually worship.",
      page_count: 690,
      publication_year: 2024,
    },
    {
      title: 'Shadows Upon Time',
      slug: 'shadows-upon-time',
      status: 'mandatory',
      note: "A fugitive from both his own Empire and the enemies he's made along the way, Hadrian knows the Cielcin's century of silence is ending and a final extermination campaign is coming. The series closes by confronting what Hadrian's own fate actually costs him to fulfill.",
      page_count: 919,
      publication_year: 2025,
    },
    {
      title: 'Songs of the Sun Eater',
      slug: 'songs-of-the-sun-eater',
      status: 'upcoming',
      note: "A hardcover anthology gathering thirteen short stories from across the Sun Eater universe, most previously available only as ebooks, plus one new story set after the events of Shadows Upon Time.",
      publication_year: 2026,
    },
  ],
  characters: [
    {
      name: 'Hadrian Marlowe',
      role: 'Protagonist and narrator, all seven books',
      faction: 'Sollan Empire, later a fugitive from it',
      color: 'blue',
      why_they_work:
        "Where Gene Wolfe's Severian is famous for being an unreliable narrator who may be lying to the reader, Hadrian's narration is reliable but selectively incomplete: he tells the truth about what happened and still won't tell you why he let it happen, a harder trick to sustain convincingly across seven books.",
    },
    {
      name: 'Valka Onderra',
      role: "Hadrian's scholiast and partner",
      faction: 'The Tavros Demarchy, later independent',
      color: 'green',
      why_they_work:
        "As a scholar who studies the Quiet and the deep history the Empire would rather not examine too closely, she gives the series its clearest voice of skepticism toward Hadrian's own mythology, including the version of it he's telling the reader.",
    },
    {
      name: 'Cassandra Marlowe',
      role: "Hadrian's daughter, Disquiet Gods onward",
      faction: 'Sollan Empire',
      color: 'purple',
      why_they_work:
        "Introduced generations into the story, she gives the series a second generation's perspective on a war, and a father, whose legend has already calcified before she's old enough to question it.",
    },
    {
      name: 'Prince Syriani Dorayaica',
      role: 'Cielcin warlord, primary antagonist',
      faction: 'The Cielcin',
      color: 'red',
      why_they_work:
        "Ruocchio resists making him a human villain in an alien suit: his motives, timescale, and sense of what winning even means stay genuinely foreign, which keeps the war from ever collapsing into a simple good-versus-evil framing.",
    },
    {
      name: 'Kharn Sagara',
      role: 'Immortal cyborg-lord of Vorgossos',
      faction: 'Independent, outside Imperial law',
      color: 'amber',
      why_they_work:
        "Centuries of body-hopping immortality have made him nearly unreadable by ordinary human motives, and his brief but pivotal role in Howling Dark sets the tone for how the series treats power that's simply operated on a different timescale than everyone around it for too long.",
    },
    {
      name: 'Lorian Aristedes',
      role: "Hadrian's former second-in-command, POV of The Dregs of Empire",
      faction: 'The Red Company, later condemned as a traitor',
      color: 'zinc',
      why_they_work:
        "Giving him his own novella as a convicted traitor on a prison world lets the series show what happens to the people around a legend once the legend's story has moved past them and left them holding the consequences.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        "Philosophical space opera that borrows fantasy's trappings (feudal titles, chosen-one framing, a chivalric knight-narrator) for a far-future war against an incomprehensible alien enemy; classical Greco-Roman and Stoic philosophy run through Hadrian's own narration, not just the setting's dressing.",
        "The closest comparisons on this list are Gene Wolfe's Book of the New Sun, an influence Ruocchio has confirmed directly rather than just accepted as a comparison, and Dune for a feudal interstellar empire built on suppressed technology and prophecy.",
        "Told entirely in Hadrian's first-person retrospective voice across all seven books; there's no multi-POV rotation the way most epic-scale series use to cover a war this large.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness is real but mostly wartime and political rather than gratuitous: battlefield violence, imprisonment, and psychological toll on Hadrian escalate as the series goes on, peaking in the final stretch of the war.',
        'Explicit content: minimal. Romance appears but the series is far more interested in war, empire, and philosophy than in relationships for their own sake.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "The series completed its originally planned seven-book run in 2025, a rare thing in ongoing genre space opera: an ending Ruocchio built toward from the start, not one forced by cancellation or reader fatigue.",
        "Ruocchio edited the 2021 Baen anthology Sword & Planet, positioning himself as an active voice in reviving old-school planetary romance SF rather than just a writer working in its shadow.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Empire of Silence through Demon in White',
      level: 3,
      desc: 'Slavery, arena combat, and early wartime violence, with court intrigue carrying most of the tension rather than open warfare',
    },
    {
      label: 'Kingdoms of Death through Shadows Upon Time',
      level: 4,
      desc: 'Imprisonment, psychological torture, plague, and the full cost of a decades-long war catch up with Hadrian personally as the stakes turn existential',
    },
  ],
  metaDescription:
    "The complete Sun Eater reading order: all seven main novels plus where the three side novellas fit into Hadrian Marlowe's timeline.",
  shortName: 'The Sun Eater',
  booksLikeSlug: 'empire-of-silence',
  lastUpdated: '2026-09-16',
  finishedLabel: 'Finished The Sun Eater?',
  categoryHref: '/fantasy/science-fantasy',
  categoryLabel: 'Browse Science Fantasy',
  related: ['gene-wolfe', 'dune', 'foundation', 'horus-heresy', 'malazan', 'first-law'],
};
