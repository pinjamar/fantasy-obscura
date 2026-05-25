import type { ReadingOrderEntry } from '../reading-orders';

export const darkTower: ReadingOrderEntry = {
  slug: 'dark-tower',
  name: 'The Dark Tower',
  author: 'Stephen King',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete — 8 books (1982–2012)',
  description:
    "Stephen King's magnum opus — a Weird Western that fuses high fantasy, post-apocalyptic science fiction, and horror into something with no real precedent in the genre. Roland Deschain is the last Gunslinger in a world that has moved on, pursuing the Man in Black across a dying landscape toward the Dark Tower: the linchpin holding all realities together. King began writing the series at 19, influenced by Tolkien and Robert Browning's poem \"Childe Roland to the Dark Tower Came.\" He finished it four decades later, having nearly died in the middle. Reading the Dark Tower from first page to last is one of the most singular experiences in American fiction.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark — violence, horror, and grief throughout; books 5–7 escalate significantly',
  warning:
    "The Gunslinger (book 1) was written when King was 19 and reads differently from the rest of the series — shorter, more literary, and more ambiguous. Do not judge the Dark Tower by its first book. Push to The Drawing of the Three before deciding whether the series is for you.",
  orderNote:
    'Read in order, starting with The Gunslinger. The Wind Through the Keyhole (2012) is an interlude set between books 4 and 5 — it is listed there in this guide. You do not need to have read other Stephen King novels first; the series stands alone.',
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Stephen King',
      body: "King started writing the Dark Tower at age 19 at the University of Maine. He worked on it intermittently across four decades — publishing book 1 in 1982, going eleven years between books 4 and 5, and completing the final three books in a rush after his near-fatal accident in 1999. He includes himself as a character in books 6 and 7. The series is explicitly his attempt to write his version of The Lord of the Rings.",
      color: 'blue',
    },
    {
      title: '🌀 What Is the Dark Tower',
      body: "The Dark Tower is the axis of all existence — every universe, every reality, every Stephen King story exists in its shadow. The series is a Weird Western: Roland travels through landscapes that are our world after some unspecified apocalyptic event, accompanied by companions pulled from different times and places. Ka is the series' governing force — fate, destiny, the will of the universe. \"Ka is a wheel\" is its central metaphor.",
      color: 'purple',
    },
    {
      title: '📖 Push Past Book 1',
      body: "The Gunslinger is the most common drop-off point for new readers. It was written before King knew what the series would become — it is lean, elliptical, and refuses easy entry. The Drawing of the Three (book 2) is where the series establishes its rhythm and introduces the modern characters who become Roland's companions. If book 1 is not working for you, keep going. Most readers consider books 2–4 the peak of the series.",
      color: 'amber',
    },
    {
      title: '🔗 The King Universe',
      body: "Almost every King novel connects to the Dark Tower in some way. Essential: Salem's Lot (the shared universe is evident from book 1; Father Callahan becomes a major character in book 5), The Stand (Randall Flagg is Walter, the Man in Black — the same villain), Insomnia (directly tied to the Dark Tower's plot), Black House (direct companion to book 5). Broader web: It, The Shining, Firestarter, and Pet Sematary all share the same universe — prior reading adds resonance but nothing is required.",
      color: 'green',
    },
    {
      title: '💔 The Ka-Tet',
      body: "Roland's companions — gathered across books 1–3 — are the emotional core of the series. Eddie Dean: a recovering heroin addict pulled from 1980s New York. Susannah Dean: a woman with a fractured identity pulled from 1960s New York. Jake Chambers: a boy whose death is the first paragraph of the entire series. Oy: a billy-bumbler (a raccoon-dog hybrid) who can mimic speech. Their relationships, losses, and fates are what make the Dark Tower matter.",
      color: 'blue',
    },
    {
      title: '⚠️ The Ending',
      body: "King includes a literal author's note before the final chapter warning readers that the ending may be unsatisfying and giving them permission to stop. This is not false modesty — the ending is genuinely divisive, arguably the most controversial conclusion in King's career. Read it anyway. The ending is the point. The Dark Tower was never about the destination.",
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
          note: "Roland pulls three companions from our world through doors on a beach. Eddie and Susannah are introduced here — the series opens up immediately and never closes back down. Most readers consider this where the Dark Tower truly begins. The best entry point for anyone who bounced off book 1.",
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
          note: "The riddle contest ends on the first pages, then the book pivots entirely: Roland tells the story of his first love, Susan Delgado, and the tragedy that made him who he is. The longest book in the series and the most divisive — some readers consider it the emotional peak; others find it a detour. It is not optional.",
          page_count: 718,
          publication_year: 1997,
        },
        {
          title: 'The Wind Through the Keyhole',
          slug: 'the-wind-through-the-keyhole',
          status: 'supplementary',
          seriesLabel: 'Interlude — between #4 and #5',
          note: "Published in 2012, eight years after the series concluded. Set in the timeline between Wizard and Glass and Wolves of the Calla — Roland tells two nested stories while the ka-tet shelters from a deadly storm. It reads as a warm return to the world rather than essential plot. Read it here if you want the full experience in order.",
          page_count: 352,
          publication_year: 2012,
        },
        {
          title: 'Wolves of the Calla',
          slug: 'wolves-of-the-calla',
          status: 'mandatory',
          note: "The ka-tet arrives at a farming village terrorised by the Wolves — robotic raiders from Thunderclap who steal children. Father Callahan from Salem's Lot appears as a major character. Book 5 opens the final arc and deepens the connections to the wider King universe. Slower than books 2–4, but essential.",
          page_count: 714,
          publication_year: 2003,
        },
        {
          title: 'Song of Susannah',
          slug: 'song-of-susannah',
          status: 'mandatory',
          note: "The ka-tet fractures across time as Susannah is taken to New York. King himself appears as a character — a self-insertion that is either the series' most audacious move or its most indulgent, depending on your tolerance. The shortest of the final three books and essentially a bridge to the finale.",
          page_count: 463,
          publication_year: 2004,
        },
        {
          title: 'The Dark Tower',
          slug: 'the-dark-tower',
          status: 'mandatory',
          note: "The end. All threads converge. The losses are real and the ending is what it is — King includes a warning before the final chapter and means it. At 908 pages, it is the longest and most emotionally demanding book in the series. Read it in one sustained push if you can. Do not stop before the last chapter.",
          page_count: 908,
          publication_year: 2004,
        },
      ],
    },
  ],
  sections: [
    {
      heading: 'The King Universe — what to read and when',
      type: 'bullets',
      bullets: [
        "Essential reading that directly affects the Dark Tower plot: Salem's Lot — Father Callahan's backstory is told in Wolves of the Calla; you can read his chapters without prior knowledge, but Salem's Lot makes them hit much harder. Insomnia — directly tied to the events of the final books; if you want to read one companion novel, this is it.",
        "The Stand — Randall Flagg, the primary villain of The Stand, is Walter O'Dim, the Man in Black, Roland's nemesis. You do not need to read The Stand to understand the Dark Tower; knowing Flagg's other appearances adds another layer to his menace.",
        "Black House (by King and Peter Straub) is a direct companion to Wolves of the Calla and shares characters. Read it after book 4 or alongside book 5. Not required, but closer to essential than anything else on this list.",
        "The broader connections — It, The Shining, Firestarter, Pet Sematary — are cosmetic in terms of plot but add texture to the shared universe. Prior reading of any of these is a bonus, not a prerequisite.",
        "If you have read none of King's other work, start with The Gunslinger. The Dark Tower was written to stand alone, and it does.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Violence is frequent and sometimes graphic — King does not flinch from injury, death, or body horror. Books 5–7 are the most intense. The ka-tet's losses in the final arc are among the most emotionally brutal passages in the series.",
        "Horror content throughout — the series is Stephen King. Expect monsters, psychological dread, disturbing imagery. Books 1 and 3 have the most traditional horror sequences; the later books shift toward grief and inevitability as their primary darkness.",
        "Explicit content: moderate. There are sexual passages in several books, none especially graphic by adult fiction standards. The series is not erotica but it is not sanitised.",
        "Roland's companion Eddie Dean is introduced as an active heroin addict — his addiction and withdrawal are depicted in detail in book 2.",
        "Reader fit: The Dark Tower rewards patience and investment. It is not a binge series — book 1 is deliberately slow, book 4 is almost entirely backstory, and the connections between books compound over time. Readers who want propulsive plot from the first page should start with book 2.",
      ],
    },
    {
      heading: 'The van incident and the shift in books 5–7',
      type: 'prose',
      prose:
        "In June 1999, King was struck by a distracted driver's van while walking near his home. He suffered multiple fractures, a punctured lung, and a shattered leg. During his recovery, certain that he might die before finishing the series, he wrote the final three books in a sustained burst. There is a noticeable tonal shift: books 5–7 are more urgent, less polished, and more willing to kill characters without ceremony. King has said the accident changed how he thought about mortality and how he wanted the series to end. He also used the experience directly in the narrative — he includes himself as a character in books 6 and 7, and the fiction explicitly acknowledges that the author's survival determines Roland's fate.",
    },
  ],
  darkness: [
    {
      label: 'Books 1–4',
      level: 3,
      desc: 'Dark fantasy at the intersection of Western and horror — violence throughout, occasional body horror, moral ambiguity in every character',
    },
    {
      label: 'Books 5–7',
      level: 4,
      desc: 'Escalating intensity — major character deaths, grief as a structural theme, sequences of genuine horror; the final book is the most emotionally demanding',
    },
  ],
  metaDescription:
    'The complete Dark Tower reading order — all 8 books in sequence, the King universe connections explained, and when to read The Wind Through the Keyhole.',
  shortName: 'The Dark Tower',
  booksLikeSlug: 'the-dark-tower',
  finishedLabel: 'Finished the Tower?',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: ['black-company', 'malazan', 'first-law', 'mark-lawrence', 'asoiaf', 'witcher'],
  lastUpdated: '2026-05-25',
};
