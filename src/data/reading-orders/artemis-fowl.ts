import type { ReadingOrderEntry } from '../reading-orders';

export const artemisFowl: ReadingOrderEntry = {
  slug: 'artemis-fowl',
  name: 'Artemis Fowl',
  author: 'Eoin Colfer',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 12 books across two series (finished 2021)',
  description:
    "Artemis Fowl II is twelve years old, worth more than most Fortune 500 companies, and has just proven that fairies are real by tracking down and kidnapping one. Eoin Colfer spends eight books turning that opening crime, a genuinely villainous act by a genuinely brilliant kid, into the slow story of how becoming less of a monster doesn't happen because a book decides it should, but because the people around him refuse to let him stay one.",
  darknessDisplay: '🕯️🕯️ Mild, escalating - starts as a caper, ends with real loss and grief',
  orderNote:
    "Read the eight main-series books in strict order; each one builds directly on established relationships, fairy technology, and consequences from the last, including a memory-wipe plot point in book three you need to have seen happen to understand what book four is actually doing. The Fowl Twins trilogy is a separate, optional spinoff. (Spoiler-Free.)",
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Eoin Colfer',
      body: "Colfer, an Irish primary school teacher before he wrote full-time, published Artemis Fowl in 2001 and finished the eight-book main series in 2012. He returned to the world in 2019 with The Fowl Twins, closing out the wider universe in 2021, and served as Ireland's Laureate na nÓg (children's literature laureate) from 2014 to 2016.",
      color: 'blue',
    },
    {
      title: '😈 A Genuine Villain to Start',
      body: "Unlike most middle-grade heroes, Artemis opens the series by kidnapping a police officer and ransoming her for gold. Colfer doesn't soften this or explain it away; the entire series is built around whether someone who starts here can actually change, and the answer isn't given to you early.",
      color: 'red',
    },
    {
      title: '⚖️ Holly Short Is Not a Supporting Character',
      body: "Holly Short, the LEPrecon officer Artemis kidnaps in book one, is the series' other lead from page one, not a hostage who shows up later to be thanked. The tension between her (institutional, procedural, increasingly exhausted by his methods) and Artemis (unbound by any rule he hasn't personally decided is worth keeping) drives most of the plot.",
      color: 'amber',
    },
    {
      title: '🧝 A Fully-Built Fairy Civilization',
      body: "Beneath Ireland sits the LEPrecon police, tech-genius centaur Foaly, dwarves who tunnel by eating and expelling dirt, and a rigid Fairy Council bureaucracy Holly answers to even when Artemis doesn't. None of it reads as decoration; the rules of this world are what the plots actually run on.",
      color: 'green',
    },
    {
      title: '📈 The Tone Gets Heavier on Purpose',
      body: "The first three books read as increasingly clever heist-and-counter-heist capers, reversible by the next smart trick. Starting with The Opal Deception, the plots stop working that way: choices carry consequences that don't get undone, and the finale asks what Artemis is actually willing to lose to fix what he's broken.",
      color: 'purple',
    },
    {
      title: '🎬 The 2020 Film Isn\'t the Book',
      body: "Kenneth Branagh's 2020 Disney film departs significantly from the books' plot and characters and was criticized on release; it moved from a planned theatrical run to a Disney+ debut because of COVID-19, and no sequel followed. If you're coming from the movie, expect the books to feel like a different story wearing the same names.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'Main Series',
      sublabel: 'read in this order - required',
      noteType: 'required',
      books: [
        {
          title: 'Artemis Fowl',
          slug: 'artemis-fowl',
          status: 'mandatory',
          note: "Twelve-year-old criminal mastermind Artemis Fowl tracks down and kidnaps LEPrecon officer Holly Short, holding her for a ransom of fairy gold, only to find the fairies willing to fight back with technology and firepower he didn't account for.",
          page_count: 280,
          publication_year: 2001,
        },
        {
          title: 'The Arctic Incident',
          slug: 'the-arctic-incident',
          status: 'mandatory',
          note: "Artemis learns his long-missing father is alive and held by the Russian Mafiya, and strikes an uneasy alliance with Holly and Commander Root: fairy help rescuing his father, in exchange for his help stopping a goblin gang's rebellion secretly engineered by a disgraced ex-LEP commander and a tech-genius pixie named Opal Koboi.",
          page_count: 277,
          publication_year: 2002,
        },
        {
          title: 'The Eternity Code',
          slug: 'the-eternity-code',
          status: 'mandatory',
          note: "Artemis tries to sell a supercomputer he built from stolen fairy technology to a ruthless businessman, who double-crosses him and shoots Butler; recovering it, and keeping fairies a secret from the human world, comes at a cost that includes Artemis's own memory.",
          page_count: 352,
          publication_year: 2003,
        },
        {
          title: 'The Artemis Fowl Files',
          slug: 'the-artemis-fowl-files',
          status: 'supplementary',
          seriesLabel: 'Interlude - between #3 and #4',
          note: "Two original short stories, \"LEPrecon\" (Holly's transfer into the LEP's elite unit) and \"The Seventh Dwarf\" (featuring Mulch Diggums, Butler, and Artemis), plus character interviews and a fairy-code cipher guide.",
          page_count: 194,
          publication_year: 2004,
        },
        {
          title: 'The Opal Deception',
          slug: 'the-opal-deception',
          status: 'mandatory',
          note: "Having had his memory of the fairy world wiped, Artemis has reverted to full-time crime with no idea any of book one happened, right as Opal Koboi, having faked her own coma for years, escapes and begins a revenge campaign against everyone who imprisoned her. Restoring Artemis's memory is the only way to stop her, and the fight doesn't end without real loss.",
          page_count: 384,
          publication_year: 2005,
        },
        {
          title: 'The Lost Colony',
          slug: 'artemis-fowl-and-the-lost-colony',
          status: 'mandatory',
          note: "A decaying magical spell is about to fling an entire island of demons through time to their deaths, and Artemis works to save them just as a rival child genius kidnaps one of the demons for scientific fame, hiring an unstable mercenary whose trigger-happy pursuit turns the rescue genuinely dangerous.",
          page_count: 331,
          publication_year: 2006,
        },
        {
          title: 'The Time Paradox',
          slug: 'the-time-paradox',
          status: 'mandatory',
          note: "Artemis's mother contracts an incurable magical disease curable only by something Artemis himself destroyed years earlier, forcing him and Holly to travel back in time eight years to undo his own past mistake, while aging in opposite directions during the trip.",
          page_count: 480,
          publication_year: 2008,
        },
        {
          title: 'The Atlantis Complex',
          slug: 'the-atlantis-complex',
          status: 'mandatory',
          note: "A fairy-magic side effect gives Artemis a genuine mental health disorder, complete with an alternate personality that periodically takes over his mind, right as Commander Root's estranged criminal brother breaks out of an underwater prison to save his dying wife by any means necessary.",
          page_count: 432,
          publication_year: 2010,
        },
        {
          title: 'The Last Guardian',
          slug: 'the-last-guardian',
          status: 'mandatory',
          note: "Opal Koboi makes her final move to exterminate humanity and crown herself fairy queen, unleashing the vengeful spirits of an ancient fairy army on the Fowl estate, including through Artemis's own young twin brothers. What it costs Artemis personally to stop her is the note the whole series ends on.",
          page_count: 336,
          publication_year: 2012,
        },
      ],
    },
    {
      label: 'The Fowl Twins',
      sublabel: 'read in this order - optional spinoff',
      noteType: 'optional',
      note: "Set several years after The Last Guardian, following Artemis's younger twin brothers Myles and Beckett alongside fairy officer Lazuli Heitz. A different tone and cast from the original eight; not required to understand the main series, and vice versa.",
      books: [
        {
          title: 'The Fowl Twins',
          slug: 'the-fowl-twins',
          status: 'optional',
          note: "One week after their eleventh birthday, hyper-intelligent Myles and wild, force-of-nature Beckett Fowl befriend a troll that's clawed up through the earth's crust, and go on the run to protect him from a scheming nobleman and an interrogating nun who both want the creature for their own gain.",
          page_count: 279,
          publication_year: 2019,
        },
        {
          title: 'Deny All Charges',
          slug: 'deny-all-charges',
          status: 'optional',
          note: "Under house arrest after wrecking the family jet, with Lazuli Heitz as their supervisor, the twins are separated when Myles is abducted, and Beckett has to track down his captor while Myles works out who took him and why.",
          page_count: 336,
          publication_year: 2020,
        },
        {
          title: 'Get What They Deserve',
          slug: 'get-what-they-deserve',
          status: 'optional',
          note: "The nobleman humiliated in book one spends two years plotting revenge and attacks Myles with a weaponized aircraft mid-lecture, and stopping him spirals into a finale involving ghosts, clones, and a missing mother.",
          page_count: 276,
          publication_year: 2021,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Artemis Fowl II',
      role: 'Protagonist, all eight books',
      faction: 'Fowl family, independent',
      color: 'blue',
      why_they_work:
        "Most reformed-villain arcs in kids' fiction happen because the plot needs them to; Colfer makes Artemis's slow change genuinely contingent on the specific people who refuse to give up on him, which means the arc could plausibly have gone the other way.",
    },
    {
      name: 'Holly Short',
      role: 'Co-protagonist, LEPrecon officer',
      faction: 'Lower Elements Police',
      color: 'amber',
      why_they_work:
        "She's the one who actually executes the plans Artemis designs, at real physical risk each time, which keeps the series from turning into a pure-strategy exercise where cleverness alone solves everything.",
    },
    {
      name: 'Butler',
      role: "Artemis's bodyguard and de facto guardian",
      faction: 'Fowl family, professional bodyguard',
      color: 'zinc',
      why_they_work:
        "His loyalty to Artemis is never treated as automatic hired-muscle devotion; the books repeatedly show what the job actually costs him physically, which grounds Artemis's genius-kid schemes in a real adult who could die because of them.",
    },
    {
      name: 'Commander Julius Root',
      role: 'LEPrecon commander',
      faction: 'Lower Elements Police',
      color: 'green',
      why_they_work:
        "As the fairy establishment's most reasonable, competent voice, he gives the early books real institutional stakes: this isn't a cartoon bureaucracy for Artemis to outsmart, it's people doing a genuinely hard job under a smart kid's constant pressure.",
    },
    {
      name: 'Opal Koboi',
      role: 'Recurring antagonist, books 2 and 4 through 8',
      faction: 'Independent, formerly Koboi Laboratories',
      color: 'red',
      why_they_work:
        "She's a tech genius the same way Artemis is, which makes her less a monster-of-the-week villain and more a mirror for what Artemis could have become if nobody around him had bothered to push back.",
    },
    {
      name: 'Foaly',
      role: 'LEP technical consultant, centaur',
      faction: 'Lower Elements Police',
      color: 'purple',
      why_they_work:
        "His paranoid, conspiracy-minded personality is played for comedy, but he's also the one character whose tech genius keeps pace with Artemis's, which stops the series' smartest-person-in-the-room dynamic from being one-sided.",
    },
    {
      name: 'Myles and Beckett Fowl',
      role: 'Protagonists, The Fowl Twins trilogy',
      faction: 'Fowl family',
      color: 'blue',
      why_they_work:
        "Splitting Artemis's own genius-and-chaos combination into two separate people, a disciplined young scientist and an untethered wild card, lets the spinoff explore what either half looks like without the other one keeping it in check.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        "Middle-grade caper fiction with real teeth: clever heists and counter-heists escalate into genuine stakes, genuine loss, and a mental-health plotline in book seven played with more seriousness than the genre usually attempts.",
        "The closest comparisons on this list are Rick Riordan's Percy Jackson for a similar blend of myth-adjacent world-building and irreverent humor aimed at a similar age range, and the Inheritance Cycle for a young protagonist thrust into a fully-built secondary world.",
        "Reads younger in vocabulary than most fantasy on this list, but the plotting and character work don't condescend, which is why it holds up for adult readers who pick it up for a kid in their life and keep going.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness escalates from a caper tone in book one to real character death and grief by book four, and stays serious through the finale; nothing is graphic, but the losses are treated as real.',
        'Explicit content: no. This is a kids\' series throughout, with nothing beyond mild, age-appropriate crushes.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "Colfer became the only writer other than Douglas Adams to write an official Hitchhiker's Guide to the Galaxy novel, And Another Thing... (2009), handpicked by Adams's estate to continue the series after his death.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Artemis Fowl through The Eternity Code',
      level: 1,
      desc: 'Kidnapping-plot capers and corporate espionage played mostly for cleverness and humor, with real danger kept relatively contained',
    },
    {
      label: 'The Opal Deception through The Last Guardian',
      level: 3,
      desc: "Character death, war-scale stakes, and Artemis's own mental health crisis push the later books into genuinely serious territory for the age range, without turning graphic",
    },
    {
      label: 'The Fowl Twins',
      level: 1,
      desc: "A lighter, more comedic register than the main series ends on; real danger appears throughout, but the tone stays adventure-caper rather than turning genuinely dark",
    },
  ],
  metaDescription:
    "The complete Artemis Fowl reading order: the eight-book main series, the companion collection, and the separate Fowl Twins spinoff trilogy.",
  shortName: 'Artemis Fowl',
  booksLikeSlug: 'artemis-fowl',
  lastUpdated: '2026-09-16',
  finishedLabel: 'Finished the Artemis Fowl series?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['rick-riordan', 'inheritance-cycle', 'narnia', 'gentleman-bastard', 'tortall', 'earthsea'],
};
