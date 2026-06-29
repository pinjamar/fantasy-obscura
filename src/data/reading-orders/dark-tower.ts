import type { ReadingOrderEntry } from '../reading-orders';

export const darkTower: ReadingOrderEntry = {
  slug: 'dark-tower',
  name: 'The Dark Tower',
  author: 'Stephen King',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 8 books (1982-2012)',
  description:
    "The Dark Tower follows Roland Deschain, the last Gunslinger in a world that has moved on, chasing the Man in Black across a dying landscape toward the Tower itself: the axis holding all realities together. King began writing it at nineteen as a student at the University of Maine and released the final book forty-two years later. The series crosses Weird Western, post-apocalyptic science fiction, and high fantasy into a single structure built across five decades. Almost every Stephen King novel connects to it in some way.",
  darknessDisplay:
    '🕯️🕯️🕯️🕯️ Dark - violence, horror, and grief throughout; books 5-7 escalate significantly',
  warning:
    'The Gunslinger (book 1) was written when King was 19 and reads differently from the rest of the series: shorter, more literary, and more ambiguous. Do not judge the Dark Tower by its first book. Push to The Drawing of the Three before deciding whether the series is for you.',
  orderNote:
    'Read in order, starting with The Gunslinger. The Wind Through the Keyhole (2012) is an interlude set between books 4 and 5. It is listed there in this guide. You do not need to have read other Stephen King novels first; the series stands alone.',
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Stephen King',
      body: "King began writing it as a student at the University of Maine, after rereading Tolkien and deciding to attempt his own long fantasy on an epic scale. He published the first book in 1982, spent eleven years between books 4 and 5, and wrote the final three books after his near-fatal accident in 1999. The accident changed his sense of urgency about finishing, and it shows in the pacing of books 5 through 7.",
      color: 'blue',
    },
    {
      title: '🌀 What The Dark Tower Actually Is',
      body: 'The Tower is the axis of all existence. Every universe, every reality, and most Stephen King stories connect to it in some way. The books are a Weird Western: Roland wanders through the ruins of a world that looks like ours after some catastrophic event. "Ka" (fate, destiny, the will of the universe) rules everything. "Ka is a wheel" is the central governing idea. The books are philosophical about fate and unsentimental about the cost of following it.',
      color: 'purple',
    },
    {
      title: '📖 Push Past Book 1',
      body: "The Gunslinger was written when King was nineteen. It is short, literary, and deliberately ambiguous in a way that is unlike anything in the rest of the series. The Gunslinger is the most common dropout point for new readers. The Drawing of the Three is where the series opens up: three companions from our world are pulled in, the pace accelerates, and the found-family structure begins. Books 2 through 4 are the strongest in the series. If book 1 feels off, continue regardless.",
      color: 'amber',
    },
    {
      title: '🔗 The King Universe',
      body: "Almost every King book is connected to the Tower in some way. Essential ties: Salem's Lot (Father Callahan becomes a major character), The Stand (Randall Flagg is the Man in Black), Insomnia and Black House (direct companions). Others like It, The Shining, and Pet Sematary add resonance. None of them are required reading before you start.",
      color: 'green',
    },
    {
      title: '💔 The Ka-Tet',
      body: "Roland's companions are the structural heart of the series. Eddie Dean (recovering addict from 1980s New York), Susannah Dean (fractured mind from 1960s New York), Jake Chambers (the kid whose death opens the series), and Oy (the billy-bumbler who can almost talk). The series kills some of them. The weight of each loss depends entirely on how much time you have spent with them before it happens.",
      color: 'red',
    },
    {
      title: '⚠️ The Ending',
      body: "King includes an author's note before the final chapter warning that the ending may disappoint and explicitly giving permission to stop before reading it. The ending is the most divisive in his career. Read it regardless. The journey, the ka-tet, and the Tower itself are what the series is building toward.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'The Dark Tower',
      sublabel: 'read in this order',
      books: [
        {
          title: 'The Gunslinger',
          slug: 'the-gunslinger',
          status: 'mandatory',
          note: 'Start here. The world has moved on. Roland pursues the Man in Black across a dying desert. Sparse, elliptical, and deliberately withholding: King at his most literary. The series opens into something very different in book 2.',
          page_count: 256,
          publication_year: 1982,
        },
        {
          title: 'The Drawing of the Three',
          slug: 'the-drawing-of-the-three',
          status: 'mandatory',
          note: 'Roland pulls three companions from our world through doors on a beach. Eddie and Susannah are introduced here. The series opens up immediately and the scale, tone, and found-family structure that define the rest of the books all begin here. The best entry point for anyone who did not connect with book 1.',
          page_count: 455,
          publication_year: 1987,
        },
        {
          title: 'The Waste Lands',
          slug: 'the-waste-lands',
          status: 'mandatory',
          note: 'Jake returns. The ka-tet is complete. Roland and his companions travel toward the city of Lud on Blaine the Mono (a psychotic, riddling train) that ends the book on a cliffhanger King left unresolved for five years. The series at its most propulsive.',
          page_count: 563,
          publication_year: 1991,
        },
        {
          title: 'Wizard and Glass',
          slug: 'wizard-and-glass',
          status: 'mandatory',
          note: 'The riddle contest ends on the first pages, then the book pivots entirely: Roland tells the story of his first love, Susan Delgado, and the tragedy that made him who he is. The longest book in the series and the most divisive. The backstory is the point. It is not optional.',
          page_count: 718,
          publication_year: 1997,
        },
        {
          title: 'The Wind Through the Keyhole',
          slug: 'the-wind-through-the-keyhole',
          status: 'supplementary',
          seriesLabel: 'Interlude - between #4 and #5',
          note: 'Published in 2012, eight years after the series concluded. Set between Wizard and Glass and Wolves of the Calla: Roland tells two nested stories while the ka-tet shelters from a storm. A warm return to the world rather than essential plot. Listed here in its chronological position.',
          page_count: 352,
          publication_year: 2012,
        },
        {
          title: 'Wolves of the Calla',
          slug: 'wolves-of-the-calla',
          status: 'mandatory',
          note: "The ka-tet arrives at a farming village terrorised by the Wolves: robotic raiders from Thunderclap who steal children. Father Callahan from Salem's Lot appears as a major character. Book 5 opens the final arc and deepens the connections across the King universe. Slower than books 2–4, but essential.",
          page_count: 714,
          publication_year: 2003,
        },
        {
          title: 'Song of Susannah',
          slug: 'song-of-susannah',
          status: 'mandatory',
          note: "The ka-tet fractures across time as Susannah is taken to New York. King himself appears as a character: the most audacious structural move in the series and the most divisive. The shortest of the final three books and primarily a bridge to the finale.",
          page_count: 463,
          publication_year: 2004,
        },
        {
          title: 'The Dark Tower',
          slug: 'the-dark-tower',
          status: 'mandatory',
          note: 'The end. All threads converge. The losses are real and the ending is what it is. King includes a warning before the final chapter and means it. At 908 pages, it is the longest and most emotionally demanding book in the series. Read it in one sustained push if you can. Do not stop before the last chapter.',
          page_count: 908,
          publication_year: 2004,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Roland Deschain',
      role: 'The last Gunslinger; the obsessive protagonist',
      color: 'zinc',
      why_they_work:
        'He is not a hero in the conventional sense: he is methodical, ruthless, and willing to sacrifice anything and anyone for the Tower. The series is structured so that his purpose is always clearer than his ethics.',
    },
    {
      name: 'Eddie Dean',
      role: 'Recovering addict from 1980s New York; heart of the ka-tet',
      color: 'blue',
      why_they_work:
        "His addiction and withdrawal are depicted with real texture in book 2. The rehabilitation is earned within the plot rather than announced. He functions as the group's emotional anchor throughout.",
    },
    {
      name: 'Susannah Dean',
      role: 'From 1960s New York; multiple personalities as plot structure',
      color: 'red',
      why_they_work:
        'Her fractured identity is not background trauma: it is externalized into the plot and drives major events in the final arc. The series uses her condition as structural mechanics rather than characterization texture.',
    },
    {
      name: 'Jake Chambers',
      role: 'The boy whose death Roland chooses at the end of book 1',
      color: 'amber',
      why_they_work:
        'He is sacrificed by Roland at the end of book 1 and returns in book 3. The ka-tet is built on that unresolved fact. He never stops knowing Roland made that choice.',
    },
  ],
  sections: [
    {
      heading: 'The King Universe - what to read and when',
      type: 'bullets',
      bullets: [
        "Essential reading that directly affects the Dark Tower plot: Salem's Lot (Father Callahan's backstory is told in Wolves of the Calla; his chapters work without prior knowledge, but Salem's Lot adds significant weight) and Insomnia (directly tied to the events of the final books; the essential companion novel).",
        "The Stand: Randall Flagg, the primary villain of The Stand, is Walter O'Dim, the Man in Black, Roland's nemesis. You do not need to read The Stand to understand the Dark Tower; knowing Flagg's other appearances adds another layer to his menace.",
        'Black House (by King and Peter Straub) is a direct companion to Wolves of the Calla and shares characters. Read it after book 4 or alongside book 5. Not required, but closer to essential than anything else on this list.',
        'The broader connections (It, The Shining, Firestarter, Pet Sematary) are cosmetic in terms of plot but add texture to the shared universe. Prior reading of any of these is a bonus, not a prerequisite.',
        "The series stands alone. Prior King reading adds resonance but is not required to follow the plot.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Violence is frequent and sometimes graphic. King does not flinch from injury, death, or body horror. Books 5–7 are the most intense. The ka-tet's losses in the final arc are the emotional low point of the series.",
        'Horror elements throughout: monsters, psychological dread, and disturbing imagery. Books 1 and 3 have the most traditional horror sequences. The later books shift toward grief and inevitability as their primary register.',
        'Explicit content: moderate. There are sexual passages in several books, none especially graphic by adult fiction standards. The series is not erotica but it is not sanitised.',
        "Roland's companion Eddie Dean is introduced as an active heroin addict. His addiction and withdrawal are depicted in detail in book 2.",
        'The series is not built for continuous-pace reading: book 1 is deliberately slow, book 4 is almost entirely backstory, and the connections between books accumulate over eight volumes.',
        'Right for: readers willing to commit to a long, structurally uneven series that builds across every book. Not right for: readers who need consistent forward momentum or a single-genre experience.',
      ],
    },
    {
      heading: 'The van incident and the shift in books 5-7',
      type: 'prose',
      prose:
        "In June 1999, King was struck by a distracted driver's van while walking near his home. He suffered multiple fractures, a punctured lung, and a shattered leg. During his recovery, certain that he might die before finishing the series, he wrote the final three books in a sustained burst. There is a noticeable tonal shift: books 5–7 are more urgent, less polished, and more willing to kill characters without ceremony. King has said the accident changed how he thought about mortality and how he wanted the series to end. He also used the experience directly in the narrative. He includes himself as a character in books 6 and 7, and the fiction explicitly acknowledges that the author's survival determines Roland's fate.",
    },
  ],
  darkness: [
    {
      label: 'Books 1-4',
      level: 3,
      desc: 'Dark fantasy at the intersection of Western and horror - violence throughout, occasional body horror, moral ambiguity in every character',
    },
    {
      label: 'Books 5-7',
      level: 4,
      desc: 'Escalating intensity - major character deaths, grief as a structural theme, sequences of genuine horror; the final book is the most emotionally demanding',
    },
  ],
  metaDescription:
    'The complete Dark Tower reading order - all 8 books in sequence, the King universe connections explained, and when to read The Wind Through the Keyhole.',
  shortName: 'The Dark Tower',
  booksLikeSlug: 'the-dark-tower',
  finishedLabel: 'Finished the Tower?',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: [
    'black-company',
    'malazan',
    'first-law',
    'mark-lawrence',
    'asoiaf',
    'witcher',
  ],
  lastUpdated: '2026-06-26',
};
