import type { ReadingOrderEntry } from '../reading-orders';

export const throneOfGlass: ReadingOrderEntry = {
  slug: 'throne-of-glass',
  name: 'Throne of Glass',
  author: 'Sarah J. Maas',
  seriesStatus: 'complete',
  seriesStatusLabel: '✓ Complete — 7 books + prequel novella collection',
  description:
    'An assassin forced to compete for her freedom becomes the fulcrum of a war against an immortal darkness. Throne of Glass starts as a YA competition novel and grows (across seven books) into full-scale epic fantasy with Fae, ancient magic, a multidimensional antagonist and world-ending stakes. The protagonist begins as Celaena Sardothien and becomes someone else entirely. That evolution is the series. The first book is the weakest entry; Crown of Midnight is where it finds its voice. If you plan to read both Throne of Glass and ACOTAR, start here. The two series share a universe and reading ToG first pays off considerably in ACOTAR.',
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark',
  groups: [
    {
      label: 'The Main Series',
      sublabel: 'books 1–5 + optional prequel',
      noteType: 'required',
      note: "All main books are essential and must be read in order. The Assassin's Blade (prequel) is optional - read it after Crown of Midnight, not after book 1. The series takes off at Crown of Midnight.",
      books: [
        {
          title: 'Throne of Glass',
          slug: 'throne-of-glass',
          status: 'mandatory',
          note: 'Start here. Celaena Sardothien, assassin, enters a deadly competition in a corrupt kingdom.',
          page_count: 404,
          publication_year: 2012,
        },
        {
          title: 'Crown of Midnight',
          slug: 'crown-of-midnight',
          status: 'mandatory',
          note: 'The series finds its voice. Darker, faster, with a reveal that reframes everything before it.',
          page_count: 418,
          publication_year: 2013,
        },
        {
          title: "The Assassin's Blade",
          slug: 'the-assassins-blade',
          status: 'optional',
          note: 'Five prequel novellas in one volume. Read here - after Crown of Midnight. The reveal in book 2 makes the novella events land significantly harder. Skip if you want to stay on the main thread.',
          page_count: 432,
          publication_year: 2014,
        },
        {
          title: 'Heir of Fire',
          slug: 'heir-of-fire',
          status: 'mandatory',
          note: 'The world expands massively. The Fae, the true antagonist, and the real magic system arrive. A turning point.',
          page_count: 565,
          publication_year: 2014,
        },
        {
          title: 'Queen of Shadows',
          slug: 'queen-of-shadows',
          status: 'mandatory',
          note: 'Aelin returns to Rifthold. High stakes, new alliances, and a cast that finally converges.',
          page_count: 648,
          publication_year: 2015,
        },
        {
          title: 'Empire of Storms',
          slug: 'empire-of-storms',
          status: 'mandatory',
          note: 'The war begins in earnest. Covers the same timeline as Tower of Dawn — read EoS first, then ToD.',
          page_count: 689,
          publication_year: 2016,
        },
      ],
    },
    {
      label: 'The Finale',
      sublabel: 'Tower of Dawn + Kingdom of Ash - read back-to-back',
      noteType: 'warning',
      note: "Tower of Dawn runs parallel to Empire of Storms from Chaol's POV. Read EoS in full first and then Tower of Dawn. You can alternate chapters using an online interleave guide (search 'ToG EoS ToD reading guide'). Do not skip Tower of Dawn as its events are essential for Kingdom of Ash.",
      books: [
        {
          title: 'Tower of Dawn',
          slug: 'tower-of-dawn',
          status: 'mandatory',
          note: "Chaol's story, running parallel to Empire of Storms. Read after EoS or interleaved — not before.",
          page_count: 660,
          publication_year: 2017,
        },
        {
          title: 'Kingdom of Ash',
          slug: 'kingdom-of-ash',
          status: 'mandatory',
          note: 'The finale. All characters and storylines converge. Massive in scope and delivers on the full series buildup.',
          page_count: 992,
          publication_year: 2018,
        },
      ],
    },
  ],
  orderNote:
    'Publication order is the correct order. The Empire of Storms / Tower of Dawn overlap is the one structural complication - the group note above explains how to handle it.',
  cardsPosition: 'above',
  cards: [
    {
      title: '📈 Stick With Book 1',
      body: "Throne of Glass is the weakest entry. The competition premise feels YA-light and the protagonist is deliberately unreliable about who she really is. Crown of Midnight is where the series finds its voice. It is darker and faster, with a reveal that reframes everything before it. Don't judge the series on book 1.",
      color: 'blue',
    },
    {
      title: '🗡️ Celaena / Aelin',
      body: "The series is built entirely around one woman and her evolution across seven books. She begins as Celaena Sardothien. Arrogant, brilliant and more complicated than she first appears. By the end she is someone else entirely. That transformation is the series' central engine.",
      color: 'purple',
    },
    {
      title: '🌍 The Tone Shift',
      body: 'This series starts as YA-adjacent and ends as full-scale epic fantasy with world-ending stakes, ancient magic, and a body count. The shift is gradual but real. By Heir of Fire the Fae, the true antagonist, and the larger mythology arrive. Book 7 is not the same genre as book 1.',
      color: 'green',
    },
    {
      title: '💕 The Romance',
      body: 'Throne of Glass is romantasy, the romance arcs are as central as the plot. There are multiple love interests across the series and readers feel strongly about them. The main romantic thread resolves definitively by the final book. Going in knowing this is a romantic series removes the dissonance of expecting pure action fantasy.',
      color: 'red',
    },
    {
      title: '🔗 The SJM Universe',
      body: 'Throne of Glass and ACOTAR share a universe. Characters and lore cross over and reading ToG first adds significant context to ACOTAR. Maas has said the full picture only emerges across both series. If you plan to read both, start here.',
      color: 'amber',
    },
    {
      title: "📖 The Assassin's Blade",
      body: 'Five prequel novellas in one volume. Optional - the main series works without them. Positioned after Crown of Midnight in this guide: the novellas land significantly harder once you have the context of book 2. Skip entirely if you want to stay on the main thread.',
      color: 'zinc',
    },
  ],
  sections: [
    {
      heading: 'Before you start',
      type: 'bullets',
      bullets: [
        'Book 1 is the weakest entry. The series finds its voice at Crown of Midnight. Push to book 2 before deciding.',
        'The series grows significantly darker from book 3 onward. Book 1 is YA-adjacent. Books 6-7 are not.',
        'If you plan to read ACOTAR, read Throne of Glass first, the payoff is larger in that order.',
        'Empire of Storms and Tower of Dawn cover the same timeline from different POVs. Read EoS first, then ToD; see the group note for the interleave option.',
      ],
    },
    {
      heading: 'The magic system',
      type: 'bullets',
      bullets: [
        'Wyrdmarks: ancient symbols drawn from the Wyrd (the fabric of existence) that can channel raw power. Introduced early but fully explained later.',
        "Wyrdkeys: three keys that together can open a portal between worlds. The series' central MacGuffin, driving the conflict from book 2 onward.",
        'Fae magic: shapeshifting, enhanced senses and strength, extended lifespans. Arrives properly in Heir of Fire and becomes central to the later books.',
        'Valg: demonic entities from another world capable of possessing humans. The true antagonistic force that is revealed gradually across books 3-4.',
        "Magic is suppressed across the main kingdom by the king's power. Part of what changes as the series progresses.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Violence and torture throughout. Darker than the covers suggest, especially from book 3 onward.',
        "Slavery and captivity are core to the protagonist's backstory.",
        'Genocide and cultural erasure as backdrop to the main conflict.',
        'Romance becomes more explicit in the later books. Books 6-7 have adult content.',
        'Right for: readers who want character evolution across a long series, romantasy and a magic system that builds to full revelation.',
        'Not right for: readers who need a strong first book to commit. Push to Crown of Midnight before deciding.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Crown of Midnight is where the series becomes exceptional. Most readers who bounced off book 1 name book 2 as the turning point.',
        'The series charts the full transition from YA fantasy to adult epic. By Kingdom of Ash it shares more with Malazan than with Twilight.',
        'The SJM shared universe (ToG + ACOTAR + Crescent City) is one of the most commercially dominant fantasy universes of the past decade.',
        "Kingdom of Ash's climax delivers on seven books of buildup in a way few series manage. The payoff is proportional to the investment.",
      ],
    },
    {
      heading: 'What you find out',
      type: 'spoiler',
      bullets: [
        'Celaena Sardothien is not who she claims to be. Her real name, heritage and identity are revealed gradually from book 2 and fully confirmed in book 3 — reframe every prior page of the series. This is a carefully plotted reveal with setup from the first chapter.',
        "The Valg (introduced as the king's secret weapon) are not human and not from Erilea. Their origin and nature, revealed across books 3–4, expand the conflict from a kingdom-level war to something multidimensional.",
        'The SJM universe crossover becomes explicit in the final book. A character from ACOTAR appears in Kingdom of Ash. Reading ACOTAR before finishing the series adds a layer to this moment — but is not required.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Books 1-2',
      level: 2,
      desc: 'Competition, intrigue, assassination are relatively contained',
    },
    {
      label: 'Books 3-5',
      level: 3,
      desc: 'War builds, magic escalates, loss becomes real',
    },
    {
      label: 'Books 6-7',
      level: 4,
      desc: 'Full-scale war, sacrifice, world-ending stakes',
    },
  ],
  metaDescription:
    "Throne of Glass reading order: all 7 books plus The Assassin's Blade in the correct sequence, with guidance on the Empire of Storms / Tower of Dawn overlap.",
  lastUpdated: '2026-05-13',
  finishedLabel: 'Finished the series?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  booksLikeSlug: 'throne-of-glass',
  related: [
    'acotar',
    'sarah-j-maas',
    'grishaverse',
    'blood-and-ash',
    'empyrean',
    'kingkiller',
  ],
};
