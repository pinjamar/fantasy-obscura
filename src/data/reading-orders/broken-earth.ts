import type { ReadingOrderEntry } from '../reading-orders';

export const brokenEarth: ReadingOrderEntry = {
  slug: 'broken-earth',
  name: 'The Broken Earth',
  author: 'N.K. Jemisin',
  seriesStatus: 'complete',
  seriesStatusLabel:
    '✅ Complete - 3 books (2015-2017), all Hugo Award winners',
  description:
    "Three books. That's it. Short, brutal, and absolutely devastating. All three won the Hugo Award for Best Novel in consecutive years. She is the only author who's ever pulled that off. N.K. Jemisin's The Broken Earth trilogy is set on a supercontinent called the Stillness, a place where massive geological apocalypses (called Fifth Seasons) regularly wipe out civilization. Orogenes (people who can control seismic forces) are both feared and exploited by the societies that desperately need them. The series kicks off with a Fifth Season already in full swing, and it uses second-person narration right from the start. That's not a gimmick. It's deliberate. Start with The Fifth Season.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  groups: [
    {
      label: 'The Broken Earth',
      sublabel: 'read in publication order',
      note: 'Three books, complete. Read consecutively. The structure builds across all three and the conclusion only works if you reach it without gaps.',
      noteType: 'required',
      books: [
        {
          title: 'The Fifth Season',
          slug: 'the-fifth-season',
          status: 'mandatory',
          note: "The world ends. Narrated in second person - 'you' are Essun, an orogene searching for her daughter during an extinction-level catastrophe. Multiple timelines run in parallel. The second-person narration is intentional and the structure is deliberate; both become clear.",
          page_count: 468,
          publication_year: 2015,
        },
        {
          title: 'The Obelisk Gate',
          slug: 'the-obelisk-gate',
          status: 'mandatory',
          note: 'The scope of the catastrophe (and what caused it) begins to emerge. Widely considered the strongest book in the trilogy. Won the 2017 Hugo Award for Best Novel.',
          page_count: 410,
          publication_year: 2016,
        },
        {
          title: 'The Stone Sky',
          slug: 'the-stone-sky',
          status: 'mandatory',
          note: 'The conclusion. Do not read reviews before finishing - the ending is widely discussed. Won the 2018 Hugo Award.',
          page_count: 416,
          publication_year: 2017,
        },
      ],
    },
    {
      label: 'Inheritance Trilogy',
      sublabel: "separate world - Jemisin's debut series",
      note: 'No connection to the Broken Earth - different world, different magic, different everything. A secondary world where gods are enslaved and their children rule an empire. Read in order. Jemisin has described this as the series that taught her to write; it is more conventional in structure than Broken Earth but shares the same interest in power and oppression.',
      noteType: 'optional',
      books: [
        {
          title: 'The Hundred Thousand Kingdoms',
          slug: 'the-hundred-thousand-kingdoms',
          status: 'supplementary',
          note: 'A young woman from a conquered people is summoned to the palace of the ruling family and named heir - entangled with enslaved gods. Strong debut, complete story.',
          page_count: 427,
          publication_year: 2010,
        },
        {
          title: 'The Broken Kingdoms',
          slug: 'the-broken-kingdoms',
          status: 'supplementary',
          note: 'Set ten years after book one, different protagonist. A blind artist living in the shadow of the World Tree.',
          page_count: 397,
          publication_year: 2010,
        },
        {
          title: 'The Kingdom of Gods',
          slug: 'the-kingdom-of-gods',
          status: 'supplementary',
          note: "Narrated by Sieh, the god of childhood - the trilogy's most ambitious and structurally unusual entry.",
          page_count: 397,
          publication_year: 2011,
        },
      ],
    },
    {
      label: 'The Dreamblood Duology',
      sublabel: 'separate world - Egyptian-inspired fantasy',
      note: 'No connection to the Broken Earth or the Inheritance Trilogy. Set in an ancient Egyptian-inspired city where priests harvest the dreams of the dying. Complete two-book story.',
      noteType: 'optional',
      books: [
        {
          title: 'The Killing Moon',
          slug: 'the-killing-moon',
          status: 'supplementary',
          note: 'Priests who harvest dream-essence from the dying to heal or kill. A meditation on faith, duty, and what we do in the name of religion.',
          page_count: 289,
          publication_year: 2012,
        },
        {
          title: 'The Shadowed Sun',
          slug: 'the-shadowed-sun',
          status: 'supplementary',
          note: "Set ten years after The Killing Moon. Can be read after book one or as a standalone. Quieter and more atmospheric than the trilogy — worth seeking out.",
          page_count: 353,
          publication_year: 2012,
        },
      ],
    },
    {
      label: 'The Great Cities Series',
      sublabel: 'separate world — contemporary urban fantasy',
      note: 'No connection to the Broken Earth. Contemporary urban fantasy in which the spirits of great cities — New York, London, Paris — are embodied as people. Ongoing; two books published.',
      noteType: 'optional',
      books: [
        {
          title: 'The City We Became',
          slug: 'the-city-we-became',
          status: 'supplementary',
          note: "New York City is being born as a living entity — six boroughs, six avatars, under attack from a cosmic force. Faster and more accessible than Broken Earth. Contemporary setting, lower darkness level, still unmistakably Jemisin.",
          page_count: 437,
          publication_year: 2021,
        },
        {
          title: 'The World We Make',
          slug: 'the-world-we-make',
          status: 'supplementary',
          note: 'Concludes the Great Cities duology. Read directly after The City We Became.',
          page_count: 357,
          publication_year: 2022,
        },
      ],
    },
  ],
  orderNote:
    'Read in publication order: The Fifth Season → The Obelisk Gate → The Stone Sky. The structure is deliberate and requires nothing from the reader except patience.',
  cardsPosition: 'above',
  cards: [
    {
      title: "👁️ The 'You'",
      body: "Yeah, The Fifth Season is written in second person - 'you do this, you feel that, you watch your world fall apart.' A lot of readers get thrown off by the first chapter or two. It feels weird as hell at first. But most people stop noticing it pretty quickly, and by the end of the trilogy that choice becomes one of the most powerful and discussed things in the whole series. Don't let the unusual POV scare you off in the opening pages. Push through it. It pays off.",
      color: 'purple',
    },
    {
      title: '🌀 Three Timelines',
      body: "The first book runs three different narrative threads in parallel, all from different points in the same character's life. If you go in knowing that, the structure clicks much faster. They do converge, and the way Jemisin weaves them together is masterful. It's a puzzle she's already solved — your job is just to hang on and follow the threads. The payoff when things start lining up is insane.",
      color: 'blue',
    },
    {
      title: '🏆 Three Hugo Awards',
      body: "Straight facts: N.K. Jemisin won the Hugo for Best Novel three years in a row (2016, 2017, 2018), one for each book in this trilogy. No one had ever done that before. This is the only trilogy where every single book individually took home the biggest prize in the genre. That's not hype — it's a legit reflection of how much this series shook up modern sci-fi/fantasy.",
      color: 'amber',
    },
    {
      title: '🌍 The World',
      body: "The Stillness is a single massive supercontinent on a geologically unstable planet that gets regularly wrecked by apocalyptic 'seasons.' Civilization keeps getting knocked back to the Stone Age and rebuilding. Orogenes (folks who can sense and manipulate geological energy) are essential for survival but treated like monsters. They get enslaved, hunted, and abused by the very people who depend on them. The world feels post-apocalyptic and cyclically apocalyptic at the same time. The magic system is raw, physical, biological, and deeply tied to politics and oppression. It's brilliant.",
      color: 'green',
    },
    {
      title: '📚 What to Read Next',
      body: 'Jemisin has three other main series, none connected to Broken Earth. The City We Became (Great Cities trilogy) is probably the most accessible if you want modern urban fantasy with attitude. The Hundred Thousand Kingdoms (Inheritance Trilogy) was her debut - more traditional structure but still obsessed with power and oppression. The Dreamblood Duology is her most slept-on work: Egyptian-inspired, quieter, atmospheric, and really damn good.',
      color: 'zinc',
    },
    {
      title: '🔥 How Dark Is It?',
      body: "This series does not hold back. At all. It deals head-on with slavery, genocide, systemic racial oppression, parental trauma, and violence. The Fifth Season literally opens with the death of a child. These aren't just edgy shock elements - they're central to what the books are about: a raw meditation on what generational oppression does to people and societies. If you need emotionally safe or comforting fantasy, this probably isn't the place to start. But if you want fantasy that tackles heavy shit with intelligence and zero sugarcoating, this one hits like a seismic event.",
      color: 'red',
    },
  ],
  sections: [
    {
      heading: 'Reading order notes',
      type: 'bullets',
      bullets: [
        'Read all three consecutively if you can — the series rewards forward momentum and the conclusion only lands if the trilogy is still fresh.',
        "The second-person narration feels strange for the first chapter or two. Push through it — most readers stop noticing within 20 pages and it pays off significantly by the end.",
        "Avoid reviews of The Stone Sky before finishing — the ending is widely discussed and the resolution is a significant part of what makes the series memorable.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Slavery, genocide, and systemic racial oppression are central themes throughout all three books — not background, not metaphor-at-a-distance.',
        'Violence is present throughout, including violence against children and orogenes. The series does not look away.',
        'No explicit sexual content. Romance is present but minimal.',
      ],
    },
  ],
  darkness: [
    {
      label: 'The Fifth Season',
      level: 4,
      desc: 'Opens with child death. Slavery, oppression, and apocalypse are the setting, not the climax.',
    },
    {
      label: 'The Obelisk Gate',
      level: 4,
      desc: 'Escalates in scope and thematic weight. The systems of oppression are examined more directly.',
    },
    {
      label: 'The Stone Sky',
      level: 4,
      desc: 'Heaviest emotional weight. The conclusions drawn about civilisation and violence are unflinching.',
    },
  ],
  metaDescription:
    'The Broken Earth reading order: all three N.K. Jemisin books in sequence — the only trilogy where every book won the Hugo Award for Best Novel.',
  lastUpdated: '2026-05-28',
  finishedLabel: 'Finished the trilogy?',
  booksLikeSlug: 'the-fifth-season',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: [
    'locked-tomb',
    'earthsea',
    'malazan',
    'robin-hobb',
    'gene-wolfe',
    'asoiaf',
  ],
};
