import type { ReadingOrderEntry } from '../reading-orders';

export const wheelOfTime: ReadingOrderEntry = {
  slug: 'wheel-of-time',
  name: 'The Wheel of Time',
  author: 'Robert Jordan',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 14 books (1990-2013)',
  description:
    "The defining epic fantasy of the 1990s and still one of the most ambitious ever written: 14 books, ~11,000 pages, hundreds of named characters, and a prophecy 3,000 years in the making. Robert Jordan built a world of staggering depth: politics, religion, magic, and gender dynamics woven together across a cast that grows to rival small nations. It is not a fast series and it does not pretend to be. The middle books slow to a crawl before the pace snaps back, and the ending (completed by Brandon Sanderson after Jordan's death) closes every thread. The reading order is strictly linear.",
  darknessDisplay:
    '🕯️🕯️🕯️ Moderate - escalates from adventure quest to psychological collapse and apocalypse by the final arc',
  orderNote:
    "Start with The Eye of the World. All 14 main books in publication order: all essential. New Spring (prequel novella) is optional and best read after book 3 or saved for after the full series.",
  groups: [
    {
      label: 'The Foundation',
      sublabel: 'books 1-3: where the series arrives',
      noteType: 'required',
      note: "Eye of the World is Tolkien-adjacent for the first 100 pages and unmistakably its own thing by book 2. The female cast arrives in full force with Dragon Reborn. New Spring is a supplementary prequel: best read here, once you know Moiraine, or saved for after the full series.",
      books: [
        {
          title: 'The Eye of the World',
          slug: 'the-eye-of-the-world',
          status: 'mandatory',
          note: 'Start here. Tolkien-flavoured for the first 100 pages: same village, same dark rider, same departure. The world and the cast differentiate completely by book 2.',
          page_count: 782,
          publication_year: 1990,
        },
        {
          title: 'The Great Hunt',
          slug: 'the-great-hunt',
          status: 'mandatory',
          note: 'The Horn of Valere. The world expands significantly. The series starts to reveal the scale of what it is building.',
          page_count: 681,
          publication_year: 1990,
        },
        {
          title: 'The Dragon Reborn',
          slug: 'the-dragon-reborn',
          status: 'mandatory',
          note: "Rand accepts his fate. Egwene, Nynaeve, and Elayne step into the foreground: the female cast is as important as the male from this point on.",
          page_count: 675,
          publication_year: 1991,
        },
        {
          title: 'New Spring',
          slug: 'new-spring',
          status: 'supplementary',
          note: 'Prequel novella: Moiraine and Lan before the series begins, set 20 years before Eye of the World. Read here once you know Moiraine, or save it for after the full series. Not required at any point.',
          page_count: 334,
          publication_year: 2004,
        },
      ],
    },
    {
      label: 'The Peak',
      sublabel: 'books 4-6: the series at full power',
      noteType: 'required',
      note: "The Shadow Rising is the series high point: three of the best storylines running simultaneously. Lord of Chaos ends with one of the most explosive sequences in the series.",
      books: [
        {
          title: 'The Shadow Rising',
          slug: 'the-shadow-rising',
          status: 'mandatory',
          note: "The series high point. Rand in the Aiel Waste, Perrin in the Two Rivers, Mat in the ter'angreal chamber: three of the series' finest sequences running simultaneously.",
          page_count: 981,
          publication_year: 1992,
        },
        {
          title: 'The Fires of Heaven',
          slug: 'the-fires-of-heaven',
          status: 'mandatory',
          note: 'Rand and Mat in the south. Nynaeve and Elayne on the run. Tension sustained across the entire book.',
          page_count: 963,
          publication_year: 1993,
        },
        {
          title: 'Lord of Chaos',
          slug: 'lord-of-chaos',
          status: 'mandatory',
          note: "Dumai's Wells. One of the most explosive sequences in the series. The political board reaches maximum complexity.",
          page_count: 1011,
          publication_year: 1994,
        },
      ],
    },
    {
      label: 'The Slog',
      sublabel: 'books 7-10: read knowing it improves',
      noteType: 'warning',
      note: "Pacing slows dramatically across books 7-10. Multiple storylines stall across hundreds of pages. Crossroads of Twilight is the nadir: it covers almost the same timeline as Winter's Heart with little forward movement. This is real and temporary. Knife of Dreams ends it completely.",
      books: [
        {
          title: 'A Crown of Swords',
          slug: 'a-crown-of-swords',
          status: 'mandatory',
          note: "Political intrigue and the Bowl of the Winds. The beginning of the slog: the pacing starts to slip here.",
          page_count: 856,
          publication_year: 1996,
        },
        {
          title: 'The Path of Daggers',
          slug: 'the-path-of-daggers',
          status: 'mandatory',
          note: 'Shorter but slower. Rand reaches a psychological breaking point. Notable for what it sets up rather than what happens.',
          page_count: 591,
          publication_year: 1998,
        },
        {
          title: "Winter's Heart",
          slug: 'winters-heart',
          status: 'mandatory',
          note: 'Slow through the middle, then a massive event at the end that changes the state of the world. Worth it.',
          page_count: 766,
          publication_year: 2000,
        },
        {
          title: 'Crossroads of Twilight',
          slug: 'crossroads-of-twilight',
          status: 'mandatory',
          note: "The slowest book. Covers largely the same timeline as Winter's Heart from other perspectives. Very little ground covered. The last one at this pace.",
          page_count: 822,
          publication_year: 2003,
        },
      ],
    },
    {
      label: 'The Home Stretch',
      sublabel: 'books 11-14: the pace never drops again',
      noteType: 'required',
      note: "Knife of Dreams ends the slog and never looks back. Brandon Sanderson completes the remaining three books from Jordan's extensive notes and outlines (including a fully written ending Jordan had kept sealed). The transition is seamless. The Gathering Storm and Towers of Midnight share a timeline: read them sequentially in publication order.",
      books: [
        {
          title: 'Knife of Dreams',
          slug: 'knife-of-dreams',
          status: 'mandatory',
          note: "Jordan's last solo book. Returns to full pace immediately. One of the strongest books in the series. The end of the slog.",
          page_count: 837,
          publication_year: 2005,
        },
        {
          title: 'The Gathering Storm',
          slug: 'the-gathering-storm',
          status: 'mandatory',
          note: "Sanderson's first WoT novel. Excellent from page one. Egwene's arc in this book is the highlight of the entire Sanderson run.",
          page_count: 766,
          publication_year: 2009,
        },
        {
          title: 'Towers of Midnight',
          slug: 'towers-of-midnight',
          status: 'mandatory',
          note: "Runs parallel to The Gathering Storm in timeline. Mat and Perrin's long-running arcs are resolved here.",
          page_count: 843,
          publication_year: 2010,
        },
        {
          title: 'A Memory of Light',
          slug: 'a-memory-of-light',
          status: 'mandatory',
          note: "Tarmon Gai'don. The Last Battle. One chapter runs for nearly 200 pages. Epic, overwhelming, and proportional to what the series built.",
          page_count: 912,
          publication_year: 2013,
        },
      ],
    },
  ],
  cards: [
    {
      title: '📏 The Scale',
      body: '14 books. ~11,000 pages. Hundreds of named characters. A prophecy 3,000 years in the making. The Wheel of Time is the largest single fantasy series ever completed. Every thread gets resolved. The ending closes every major plotline.',
      color: 'blue',
    },
    {
      title: '✍️ The Handoff',
      body: "Robert Jordan died in 2007 with the series unfinished. Brandon Sanderson completed it from Jordan's extensive notes and outlines, including a fully written ending Jordan had kept sealed. The transition is remarkably seamless. Books 12-14 are excellent.",
      color: 'green',
    },
    {
      title: '👥 The Women',
      body: "The female cast is as central as the male. Egwene al'Vere, Nynaeve al'Meara, and Moiraine are among the most compelling characters in the series. The Aes Sedai politics are a highlight, not a detour.",
      color: 'purple',
    },
    {
      title: '⚠️ The Slog',
      body: "Books 7-10 slow dramatically. Storylines stall. Crossroads of Twilight is the nadir: it covers the same timeline as Winter's Heart with almost no forward movement. Push through: Knife of Dreams ends it completely and the pace never drops again.",
      color: 'amber',
    },
    {
      title: '🎧 The Audiobooks',
      body: "Michael Kramer and Kate Reading have narrated all fourteen books: Kramer takes male POV chapters, Reading takes female. They have been at it since 1990 and the consistency across 14 books is remarkable. If the prose feels dense on the page, try the audio.",
      color: 'red',
    },
    {
      title: '📺 The Amazon Show',
      body: "Amazon Prime's The Wheel of Time (2021-2024) ran for three seasons. Season 1 compresses and restructures the early books significantly; later seasons diverge further. The casting is strong. The books are substantially better.",
      color: 'zinc',
    },
  ],
  cardsPosition: 'above',
  characters: [
    {
      name: "Rand al'Thor",
      role: 'The Dragon Reborn; ta\'veren; primary protagonist',
      color: 'blue',
      why_they_work:
        "Rand is structured as the burden-bearer of the series: his arc across 14 books is the progressive destruction of his ability to function as a person under the weight of what he is supposed to do. The madness from the taint on saidin is not just a plot device; it is a sustained examination of what it means to know you are going to lose your mind, and still have to act on behalf of the world. His resolution in The Gathering Storm is the emotional hinge of the entire back half of the series, and it requires all ten books before it to land with full force.",
    },
    {
      name: "Egwene al'Vere",
      role: 'Amyrlin Seat; most powerful Aes Sedai of her generation',
      color: 'amber',
      why_they_work:
        "Egwene's arc is the series' clearest argument about institutional power: how institutions resist change, who they elevate, and what it costs to change them from within. Her path from village girl to Amyrlin Seat is not a power fantasy but a detailed depiction of political process, loyalty, and the gap between what an institution claims to be and what it actually does. The Gathering Storm puts this on full display and it is the best sustained writing in the Sanderson portion of the series.",
    },
    {
      name: 'Mat Cauthon',
      role: "Ta'veren; general; reluctant hero",
      color: 'red',
      why_they_work:
        "Mat is the character who consistently refuses what the series asks of him and then does it anyway. The refusal is not cowardice: he genuinely does not want to be important, does not want the memories of dead generals in his head, and does not want to be the one making battlefield decisions that determine whether thousands live or die. The series keeps making him important regardless. The chapter in which he finally stops running is one of the sharpest single character moments in the series.",
    },
    {
      name: "Nynaeve al'Meara",
      role: "Wisdom of Emond's Field; Aes Sedai; healer",
      color: 'green',
      why_they_work:
        "Nynaeve cannot channel unless she is angry: her block is literal and metaphorical at once. Her entire arc is about emotional honesty and the cost of controlling everything through anger rather than acknowledging vulnerability. The block takes six books to resolve, and Jordan has laid enough groundwork that when it breaks, the moment is specific rather than convenient. She has the most complete character development arc in the series and it is the one most easily missed because it is built from internal rather than external events.",
    },
    {
      name: 'Perrin Aybara',
      role: "Ta'veren; blacksmith; wolfbrother; Lord of the Two Rivers",
      color: 'purple',
      why_they_work:
        "Perrin is the most contested POV in the series. His storyline in the middle books (the Faile kidnapping arc) is one of the primary reasons books 7-10 feel as long as they do. His resolution in Towers of Midnight is proportional to the patience required: Jordan structured the setup across four books and the resolution is the longest single-character payback in the series. He demonstrates Jordan's approach more clearly than anyone: the setup is the cost of admission for what follows.",
    },
    {
      name: 'Moiraine Damodred',
      role: 'Aes Sedai of the Blue Ajah; the catalyst of the series',
      color: 'zinc',
      why_they_work:
        "Moiraine is the reader's primary orientation in the world for the first three books: she knows what she knows, and the reader learns the world as she reveals it. Her absence in the middle books is one of the structural reasons the slog feels as long as it does: the series loses its most reliable anchor. New Spring (the prequel) is best read after book 3 because it explains why she is the way she is, which requires having watched her be that way for long enough to wonder.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        "This is the largest completed epic fantasy ever written: 14 books, ~11,000 pages. The scope is a feature. Jordan built complete political systems, magic systems, religions, and cultural traditions for every nation the story touches, and they are internally consistent.",
        "The middle books slow dramatically (books 7-10). Multiple storylines stall across hundreds of pages. This is real and documented. Knife of Dreams (book 11) ends it and the pace never drops again through the final four books.",
        "The male and female characters in this world frequently struggle to understand each other. Jordan wrote this as a structural feature of the world rather than an oversight, and it runs through all 14 books.",
        "The ending is unambiguous and complete. Every major plotline resolves. The Sanderson-completed final three books are excellent, and the ending Jordan had written and sealed before his death was incorporated directly.",
      ],
    },
    {
      heading: 'What to know before you start',
      type: 'bullets',
      bullets: [
        "New Spring (prequel, ~334 pages) is best read after book 3: by then you know Moiraine well enough for her origin story to land. It can also be saved for after the full series with no loss to the main story.",
        "The Gathering Storm and Towers of Midnight share a timeline. Read them in publication order: they work fine sequentially and the interleaved approach is unnecessary.",
        "Jordan's notes for the final book were so complete that Harriet McDougal (his widow and editor) has said the ending was largely already written. Brandon Sanderson was selected to complete the series from those notes and outlines.",
        "The political systems, religious structures, and histories of every nation are fully realised and form a coherent world. The detail is deliberate and load-bearing, not supplementary.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Books 1-3',
      level: 2,
      desc: 'Adventure, wonder, classic quest energy',
    },
    {
      label: 'Books 4-6',
      level: 3,
      desc: 'War, politics, psychological strain on the Dragon',
    },
    {
      label: 'Books 7-14',
      level: 4,
      desc: "Rand's mental collapse, apocalypse approaching, mass casualties",
    },
  ],
  metaDescription:
    'The complete Wheel of Time reading order: all 14 Robert Jordan and Brandon Sanderson novels, New Spring placed correctly, and an honest guide to the slog.',
  shortName: 'Wheel of Time',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished the series?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'the-wheel-of-time',
  related: ['cosmere', 'malazan', 'stormlight', 'memory-sorrow-thorn', 'first-law', 'robin-hobb'],
};
