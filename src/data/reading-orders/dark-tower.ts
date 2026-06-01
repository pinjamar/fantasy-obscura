import type { ReadingOrderEntry } from '../reading-orders';

export const darkTower: ReadingOrderEntry = {
  slug: 'dark-tower',
  name: 'The Dark Tower',
  author: 'Stephen King',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 8 books (1982-2012)',
  description:
    "Stephen King's magnum opus - a batshit Weird Western that smashes high fantasy, post-apocalyptic sci-fi, and horror into one glorious mess. The Dark Tower follows Roland Deschain, the last Gunslinger in a world that's \"moved on,\" chasing the Man in Black across a dying landscape toward the Dark Tower itself - the thing holding all realities together. King started writing it at 19 and took over forty years to finish. Reading the whole thing front to back is one of the most unique experiences in American fiction. It's weird, ambitious, deeply personal, and completely unlike anything else he's written.",
  darknessDisplay:
    '🕯️🕯️🕯️🕯️ Dark - violence, horror, and grief throughout; books 5-7 escalate significantly',
  warning:
    'The Gunslinger (book 1) was written when King was 19 and reads differently from the rest of the series - shorter, more literary, and more ambiguous. Do not judge the Dark Tower by its first book. Push to The Drawing of the Three before deciding whether the series is for you.',
  orderNote:
    'Read in order, starting with The Gunslinger. The Wind Through the Keyhole (2012) is an interlude set between books 4 and 5 - it is listed there in this guide. You do not need to have read other Stephen King novels first; the series stands alone.',
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Stephen King',
      body: "King started this thing as a college kid at the University of Maine. He worked on it off and on for decades - publishing the first book in 1982, then taking eleven years between books 4 and 5. After his near-fatal accident in 1999, he rushed out the final three books. He even writes himself into the story in books 6 and 7. This was his attempt at writing his own version of The Lord of the Rings. The whole series is basically his life's work.",
      color: 'blue',
    },
    {
      title: '🌀 What The Dark Tower Actually Is',
      body: 'The Tower is the axis of all existence. Every universe, every reality, and pretty much every Stephen King story spins around it in some way. The books feel like a Weird Western: Roland wanders through the ruins of a world that looks suspiciously like ours after some apocalyptic event. "Ka" — fate, destiny, the will of the universe - rules everything. "Ka is a wheel" is the central idea. It\'s trippy, philosophical, and full of gunslinging.',
      color: 'purple',
    },
    {
      title: '📖 Push Past Book 1',
      body: "The Gunslinger was written when King was just 19. It's short, super literary, weirdly ambiguous, and feels nothing like the rest of the series. A ton of people drop the series here. Don't. The Drawing of the Three is where it clicks for most readers - modern characters get pulled in, the pace picks up, and the found-family dynamics start. Books 2 through 4 are widely considered the peak. If book 1 feels off, keep going. Most readers are glad they did.",
      color: 'amber',
    },
    {
      title: '🔗 The King Universe',
      body: "Almost every King book is connected to the Tower in some way. Must-read ties: Salem's Lot (Father Callahan becomes a major character), The Stand (Randall Flagg is the Man in Black), Insomnia and Black House (direct companions). Others like It, The Shining, and Pet Sematary add extra resonance. You don't need to read them first, but it makes things hit harder.",
      color: 'green',
    },
    {
      title: '💔 The Ka-Tet',
      body: "Roland's companions are the real heart of the series. Eddie Dean (recovering addict from 1980s New York), Susannah Dean (badass with a fractured mind from 1960s New York), Jake Chambers (the kid whose death opens the whole saga), and Oy (the loyal billy-bumbler who can almost talk). Their friendships, sacrifices, and tragedies are what make this series matter. You'll get attached. It'll hurt.",
      color: 'red',
    },
    {
      title: '⚠️ The Ending',
      body: "King literally puts an author's note right before the final chapter warning you the ending might piss you off and giving you permission to stop. He's not kidding — the ending is extremely divisive, probably the most controversial in his career. Read it anyway. The journey, the ka-tet, and the Tower itself are the point. This was never really about a clean, happy destination.",
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
          note: 'The world has moved on. Roland pursues the Man in Black across a dying desert. Sparse, elliptical, and deliberately withholding — this is King at his most literary. Push through. Everything clicks into place in book 2.',
          page_count: 256,
          publication_year: 1982,
        },
        {
          title: 'The Drawing of the Three',
          slug: 'the-drawing-of-the-three',
          status: 'mandatory',
          note: 'Roland pulls three companions from our world through doors on a beach. Eddie and Susannah are introduced here — the series opens up immediately and never closes back down. Most readers consider this where the Dark Tower truly begins. The best entry point for anyone who bounced off book 1.',
          page_count: 455,
          publication_year: 1987,
        },
        {
          title: 'The Waste Lands',
          slug: 'the-waste-lands',
          status: 'mandatory',
          note: 'Jake returns. The ka-tet is complete. Roland and his companions travel toward the city of Lud on Blaine the Mono — a psychotic, riddling train that ends the book on a cliffhanger King left unresolved for five years. The series at its most propulsive.',
          page_count: 563,
          publication_year: 1991,
        },
        {
          title: 'Wizard and Glass',
          slug: 'wizard-and-glass',
          status: 'mandatory',
          note: 'The riddle contest ends on the first pages, then the book pivots entirely: Roland tells the story of his first love, Susan Delgado, and the tragedy that made him who he is. The longest book in the series and the most divisive — some readers consider it the emotional peak; others find it a detour. It is not optional.',
          page_count: 718,
          publication_year: 1997,
        },
        {
          title: 'The Wind Through the Keyhole',
          slug: 'the-wind-through-the-keyhole',
          status: 'supplementary',
          seriesLabel: 'Interlude — between #4 and #5',
          note: 'Published in 2012, eight years after the series concluded. Set in the timeline between Wizard and Glass and Wolves of the Calla — Roland tells two nested stories while the ka-tet shelters from a deadly storm. It reads as a warm return to the world rather than essential plot. Read it here if you want the full experience in order.',
          page_count: 352,
          publication_year: 2012,
        },
        {
          title: 'Wolves of the Calla',
          slug: 'wolves-of-the-calla',
          status: 'mandatory',
          note: "The ka-tet arrives at a farming village terrorised by the Wolves - robotic raiders from Thunderclap who steal children. Father Callahan from Salem's Lot appears as a major character. Book 5 opens the final arc and deepens the connections to the wider King universe. Slower than books 2–4, but essential.",
          page_count: 714,
          publication_year: 2003,
        },
        {
          title: 'Song of Susannah',
          slug: 'song-of-susannah',
          status: 'mandatory',
          note: "The ka-tet fractures across time as Susannah is taken to New York. King himself appears as a character - a self-insertion that is either the series' most audacious move or its most indulgent, depending on your tolerance. The shortest of the final three books and essentially a bridge to the finale.",
          page_count: 463,
          publication_year: 2004,
        },
        {
          title: 'The Dark Tower',
          slug: 'the-dark-tower',
          status: 'mandatory',
          note: 'The end. All threads converge. The losses are real and the ending is what it is - King includes a warning before the final chapter and means it. At 908 pages, it is the longest and most emotionally demanding book in the series. Read it in one sustained push if you can. Do not stop before the last chapter.',
          page_count: 908,
          publication_year: 2004,
        },
      ],
    },
  ],
  sections: [
    {
      heading: 'The King Universe - what to read and when',
      type: 'bullets',
      bullets: [
        "Essential reading that directly affects the Dark Tower plot: Salem's Lot - Father Callahan's backstory is told in Wolves of the Calla; you can read his chapters without prior knowledge, but Salem's Lot makes them hit much harder. Insomnia — directly tied to the events of the final books; if you want to read one companion novel, this is it.",
        "The Stand - Randall Flagg, the primary villain of The Stand, is Walter O'Dim, the Man in Black, Roland's nemesis. You do not need to read The Stand to understand the Dark Tower; knowing Flagg's other appearances adds another layer to his menace.",
        'Black House (by King and Peter Straub) is a direct companion to Wolves of the Calla and shares characters. Read it after book 4 or alongside book 5. Not required, but closer to essential than anything else on this list.',
        'The broader connections — It, The Shining, Firestarter, Pet Sematary - are cosmetic in terms of plot but add texture to the shared universe. Prior reading of any of these is a bonus, not a prerequisite.',
        "If you have read none of King's other work, start with The Gunslinger. The Dark Tower was written to stand alone, and it does.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Violence is frequent and sometimes graphic - King does not flinch from injury, death, or body horror. Books 5–7 are the most intense. The ka-tet's losses in the final arc are among the most emotionally brutal passages in the series.",
        'Horror content throughout - the series is Stephen King. Expect monsters, psychological dread, disturbing imagery. Books 1 and 3 have the most traditional horror sequences; the later books shift toward grief and inevitability as their primary darkness.',
        'Explicit content: moderate. There are sexual passages in several books, none especially graphic by adult fiction standards. The series is not erotica but it is not sanitised.',
        "Roland's companion Eddie Dean is introduced as an active heroin addict - his addiction and withdrawal are depicted in detail in book 2.",
        'Reader fit: The Dark Tower rewards patience and investment. It is not a binge series - book 1 is deliberately slow, book 4 is almost entirely backstory, and the connections between books compound over time. Readers who want propulsive plot from the first page should start with book 2.',
      ],
    },
    {
      heading: 'The van incident and the shift in books 5-7',
      type: 'prose',
      prose:
        "In June 1999, King was struck by a distracted driver's van while walking near his home. He suffered multiple fractures, a punctured lung, and a shattered leg. During his recovery, certain that he might die before finishing the series, he wrote the final three books in a sustained burst. There is a noticeable tonal shift: books 5–7 are more urgent, less polished, and more willing to kill characters without ceremony. King has said the accident changed how he thought about mortality and how he wanted the series to end. He also used the experience directly in the narrative — he includes himself as a character in books 6 and 7, and the fiction explicitly acknowledges that the author's survival determines Roland's fate.",
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
  lastUpdated: '2026-06-01',
};
