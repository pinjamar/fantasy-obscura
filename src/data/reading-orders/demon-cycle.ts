import type { ReadingOrderEntry } from '../reading-orders';

export const demonCycle: ReadingOrderEntry = {
  slug: 'demon-cycle',
  name: 'The Demon Cycle',
  author: 'Peter V. Brett',
  seriesStatus: 'ongoing',
  seriesStatusLabel:
    '📖 Ongoing - Demon Cycle complete (5 books); Nightfall Chronicles ongoing',
  description:
    "Every night, without exception, demons rise from the ground. Sand demons. Wood demons. Rock demons the size of buildings. Humanity survives behind magical wards scratched into walls and stakes in the earth, and those wards are slowly failing as knowledge is lost generation by generation. The Demon Cycle follows three people who refuse to accept this: Arlen, who goes so far into the fight he stops being entirely human; Leesha, a healer who builds community resilience where Arlen builds individual power; and Rojer, a musician who discovers his fiddle does something to demons that no ward ever could. Brett built the coreling threat around specific mechanical failures rather than vague supernatural dread. That specificity is what distinguishes it.",
  darknessDisplay:
    '🕯️🕯️🕯️🕯️ Dark - violence, sexual violence (book 1), and horror throughout',
  orderNote:
    "Read the main series in order. The Great Bazaar and Brayan's Gold are best read after book 1. Messenger's Legacy is best read after book 3. Briar appears in The Skull Throne. Barren is a Leesha novella best read after The Core. The Nightfall Chronicles is a separate continuation set a generation later.",
  cardsPosition: 'above',
  cards: [
    {
      title: '🌑 Corelings Every Night',
      body: 'The demons rise at dusk and dissolve at dawn. No exceptions. No negotiations. Humanity has been losing ground for centuries. Villages shrink, knowledge fragments, isolated communities are cut off from each other by the dark. Brett builds the threat slowly: the wards wear down, people make mistakes, and the corelings always come back. The series never establishes a safe baseline.',
      color: 'zinc',
    },
    {
      title: '🛡️ The Ward Magic',
      body: "Wards are symbols drawn on surfaces (walls, floors, skin) that repel or harm specific types of demon. Humanity has defensive wards. Combat wards, the ones that could actually push the corelings back, were lost generations ago. Rediscovering them is Arlen's obsession and the engine of the whole series. The magic system is visual and specific: where a ward works, where it has worn away, and what breaks when it fails are all legible and exact.",
      color: 'blue',
    },
    {
      title: '👥 Three POVs, Three Approaches',
      body: 'Arlen goes out into the dark and fights. Leesha stays in her village and makes it strong enough to survive. Rojer finds that his music does something to demons no one can explain. All three storylines run concurrently and converge across the series. Brett uses the three protagonists to ask the same question (what does it actually take to push back?) and gives three genuinely different answers. None of the three approaches is sufficient alone.',
      color: 'purple',
    },
    {
      title: '⚠️ Read the Desert Spear Note First',
      body: "The Desert Spear (book 2) opens with a long section that retells the events of book 1 from Jardir's perspective (the antagonist of the first book). This is one of the series' strongest structural moves, but readers going in blind find it jarring. The Jardir section is not a detour. His POV does not exonerate him; it makes the conflict comprehensible from both sides.",
      color: 'amber',
    },
    {
      title: '📈 Where It Peaks',
      body: 'Books 1-3 are the high point: The Warded Man establishes the world, The Desert Spear expands it, The Daylight War brings the threads together. Books 4 and 5 are a step down. The scope gets unwieldy, the pacing loosens, and the series loses the tight survival-horror focus that made the first three work. The ending delivers, but the series changes register after book 3.',
      color: 'green',
    },
    {
      title: '🌙 The Nightfall Chronicles',
      body: "A generation-later continuation set in the same world. The Desert Prince follows a new cast navigating a world where the original series' heroes are legends. It is a separate story and not required to complete the original Demon Cycle. The continuation is ongoing as of 2026.",
      color: 'red',
    },
  ],
  groups: [
    {
      label: 'The Demon Cycle',
      sublabel: '5 books + short fiction - read in order',
      noteType: 'required',
      note: 'One continuous story. The short fiction novellas are supplementary. They add backstory but nothing essential to the main plot is lost by skipping them.',
      books: [
        {
          title: 'The Warded Man',
          slug: 'the-warded-man',
          status: 'mandatory',
          seriesLabel: 'Demon Cycle #1',
          note: 'Arlen is a farm boy who watches his father fail to defend his mother from corelings. He leaves everything behind to find the lost combat wards. Leesha becomes the village healer. Rojer becomes a jongleur. Three origin stories that run parallel before converging.',
          page_count: 416,
          publication_year: 2009,
        },
        {
          title: 'The Great Bazaar',
          slug: 'the-great-bazaar',
          status: 'supplementary',
          seriesLabel: 'Novella - after #1',
          note: 'A short story following Arlen as a Messenger, navigating the dangers of travel between warded towns. Shows the world between the settled communities, the most dangerous part of the Demon Cycle landscape. Best read immediately after The Warded Man.',
          page_count: 130,
          publication_year: 2010,
        },
        {
          title: "Brayan's Gold",
          slug: 'brayans-gold',
          status: 'supplementary',
          seriesLabel: 'Novella - after #1',
          note: 'Arlen takes on a dangerous delivery to a remote mining community, a job no other Messenger will touch. Expands his backstory during the Messenger years and shows how his obsession with fighting corelings hardens into something irreversible.',
          page_count: 130,
          publication_year: 2011,
        },
        {
          title: 'The Desert Spear',
          slug: 'the-desert-spear',
          status: 'mandatory',
          seriesLabel: 'Demon Cycle #2',
          note: "Opens with an extended retelling of book 1 from Jardir's perspective, the man Arlen considered a betrayer. The scope expands significantly beyond the first book's three-town world.",
          page_count: 624,
          publication_year: 2010,
        },
        {
          title: 'The Daylight War',
          slug: 'the-daylight-war',
          status: 'mandatory',
          seriesLabel: 'Demon Cycle #3',
          note: "The Painted Man and the Deliverer are on a collision course. Inevera (Jardir's wife and the most powerful Damajah) gets her own extended origin arc. Books 1–3 are the peak of the series: the survival-horror focus is still tight and the convergence of storylines lands.",
          page_count: 632,
          publication_year: 2013,
        },
        {
          title: "Messenger's Legacy",
          slug: 'messengers-legacy',
          status: 'supplementary',
          seriesLabel: 'Novella - after #3',
          note: 'Follows Briar, a boy living outside the warded towns who has found his own way to survive the night. Briar appears in The Skull Throne. Read this before book 4 for his full context.',
          page_count: 148,
          publication_year: 2014,
        },
        {
          title: 'The Skull Throne',
          slug: 'the-skull-throne',
          status: 'mandatory',
          seriesLabel: 'Demon Cycle #4',
          note: 'The political and military fallout from the end of book 3 plays out across multiple POVs. The scope is at its widest here: more characters, more locations, more threads. The pacing is looser than the first three books. Still essential to reach the conclusion.',
          page_count: 760,
          publication_year: 2015,
        },
        {
          title: 'The Core',
          slug: 'the-core',
          status: 'mandatory',
          seriesLabel: 'Demon Cycle #5',
          note: "The conclusion. Arlen goes where no one has gone before. The corelings' source is confronted directly. Brett delivers the conclusion the series has been building toward.",
          page_count: 832,
          publication_year: 2017,
        },
        {
          title: 'Barren',
          slug: 'barren',
          status: 'supplementary',
          seriesLabel: 'Novella - after #5',
          note: 'A Leesha novella set after The Core, dealing with her story in the aftermath of the main series. Best read after completing the Demon Cycle.',
          page_count: 126,
          publication_year: 2018,
        },
      ],
    },
    {
      label: 'The Nightfall Chronicles',
      sublabel: 'continuation - set a generation later',
      noteType: 'optional',
      note: 'A new series set in the same world, following the next generation of characters. The Demon Cycle is complete before you start these. No cliffhangers carry over. Existing fans will get more from the character connections.',
      books: [
        {
          title: 'The Desert Prince',
          slug: 'the-desert-prince',
          status: 'optional',
          seriesLabel: 'Nightfall #1',
          note: "A new generation inheriting a transformed world. The children of the main series' central characters are the twin protagonists. The corelings still rise but humanity now has a fighting chance.",
          page_count: 752,
          publication_year: 2021,
        },
        {
          title: 'The Hidden Queen',
          slug: 'the-hidden-queen',
          status: 'optional',
          seriesLabel: 'Nightfall #2',
          note: "Olive's storyline takes centre stage as political and magical threats converge. The continuation of the next-generation arc.",
          page_count: 609,
          publication_year: 2024,
        },
        {
          title: 'The Demon King',
          slug: 'the-demon-king-brett',
          status: 'optional',
          seriesLabel: 'Nightfall #3',
          note: 'The third Nightfall Chronicles book, continuing the next-generation storyline. Published 2026.',
          page_count: 481,
          publication_year: 2026,
        },
        {
          title: 'Butter Cookies and Demon Claws',
          slug: 'butter-cookies-and-demon-claws',
          status: 'supplementary',
          seriesLabel: 'Novella - after Nightfall #3',
          note: 'A short story set in the Demon Cycle world, read after The Demon King.',
          page_count: 149,
          publication_year: 2026,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Arlen Bales',
      role: 'The Painted Man; the Warded Man; series protagonist',
      color: 'blue',
      why_they_work:
        "His arc starts at a single specific failure: his father chose safety over defending Arlen's mother. The series tracks what that decision does to a person across decades of travel and combat. By book 3 he has changed in ways that are physical and irreversible.",
    },
    {
      name: 'Leesha Paper',
      role: "Herb gatherer and healer of Cutter's Hollow",
      color: 'amber',
      why_they_work:
        'She is solving the same problem as Arlen through entirely opposite means. Her arc is about making a community strong enough to survive; his is about making one person strong enough to fight. The series treats both approaches as necessary and neither as sufficient alone.',
    },
    {
      name: 'Rojer Inn',
      role: 'Jongleur whose music affects corelings',
      color: 'green',
      why_they_work:
        "His ability is never fully explained within the series' magical system. Brett builds his storyline around something no one in the world understands, including Rojer himself, and the series leaves that ambiguity intact throughout.",
    },
    {
      name: 'Jardir',
      role: 'Deliverer of the Krasian people; antagonist of book 1',
      color: 'zinc',
      why_they_work:
        'He is the antagonist of book 1 and a POV character for a substantial section of book 2. The perspective shift does not soften him: it makes the conflict comprehensible from his side without resolving who is right. He and Arlen cannot win without each other, and neither is willing to accept that.',
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Book 1 contains a sexual assault scene that is graphic and not softened. It is the most commonly cited reason readers stop. This is not a one-off. The series handles sexual violence as a recurring theme throughout, particularly around Leesha.',
        'Violence is graphic and frequent throughout the series. Coreling attacks, battlefield sequences, and personal confrontations are all written with full physical detail.',
        'Darkness escalates through the first three books and then levels off in books 4 and 5, which are more political and less viscerally horrifying than the opening arc.',
        'Right for: readers who want grimdark survival horror with a systematic monster threat. Not right for: readers sensitive to sexual violence, which is recurring and explicit throughout the first three books.',
      ],
    },
    {
      heading: 'The UK title situation',
      type: 'prose',
      prose:
        'Book 1 was published in the UK as The Painted Man before the US edition was released as The Warded Man. They are the same book with the same text (different covers, different titles, one story). If you own a copy called The Painted Man, you are starting in the right place.',
    },
  ],
  darkness: [
    {
      label: 'Books 1-3',
      level: 4,
      desc: 'Survival horror embedded in epic fantasy - graphic violence, sexual violence (book 1 especially), and genuine monster-threat dread',
    },
    {
      label: 'Books 4-5',
      level: 3,
      desc: 'More political, less visceral - still dark but the horror-adjacent atmosphere of the early books gives way to epic fantasy warfare and intrigue',
    },
    {
      label: 'Nightfall Chronicles',
      level: 3,
      desc: 'Continuation with similar tone to books 4-5 - dark epic fantasy without the survival-horror intensity of the original trilogy',
    },
  ],
  booksLikeSlug: 'the-warded-man',
  shortName: 'Demon Cycle',
  finishedLabel: 'Finished the Cycle?',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: [
    'first-law',
    'malazan',
    'black-company',
    'brent-weeks',
    'stormlight',
    'wheel-of-time',
  ],
  lastUpdated: '2026-06-26',
};
