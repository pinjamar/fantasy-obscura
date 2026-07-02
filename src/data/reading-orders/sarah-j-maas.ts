import type { ReadingOrderEntry } from '../reading-orders';

export const sarahJMaas: ReadingOrderEntry = {
  slug: 'sarah-j-maas',
  name: 'Sarah J. Maas Universe',
  author: 'Sarah J. Maas',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - TOG complete; ACOTAR and Crescent City ongoing',
  description:
    'The complete Sarah J. Maas reading order across all three series: Throne of Glass, A Court of Thorns and Roses, and Crescent City. The three worlds form a shared multiverse. Connections are subtle at first, then explicit by the time you reach Crescent City. The order matters: finish all of ACOTAR before opening Crescent City, or the crossovers that define House of Sky and Breath and House of Flame and Shadow land without context.',
  darknessDisplay:
    '🕯️🕯️🕯️-🕯️🕯️🕯️🕯️ Moderate to Dark - escalates across all three series; explicit sexual content throughout from A Court of Mist and Fury (ACOTAR book 2) onward',
  orderNote:
    'TOG and ACOTAR can be read in either order. ACOTAR first is the slightly more accessible entry; TOG first follows publication order. Either way, finish both completely before starting Crescent City. Do not start with Crescent City.',
  cardsPosition: 'above',
  cards: [
    {
      title: '🗺️ The Multiverse',
      body: 'All three series exist in the same multiverse. Throne of Glass hints at it in Kingdom of Ash. ACOTAR and Crescent City collide directly from House of Sky and Breath onward (Bryce ends up in Prythian, Nesta and Azriel cross over into Crescent City).',
      color: 'blue',
    },
    {
      title: '📈 Where Each Peaks',
      body: "TOG starts YA-light and doesn't hit full stride until Crown of Midnight, and becomes exceptional by Heir of Fire. ACOTAR's breakout book is A Court of Mist and Fury (book 2). Crescent City is the most consistent from the start but requires the other two series for its biggest moments to land.",
      color: 'green',
    },
    {
      title: '🔗 The Crossover Key',
      body: 'The eight-pointed star appears across all three series. Rhysand (ACOTAR) and Bryce (CC) share Starborn Fae ancestry through Queen Theia. The Prythian connection is seeded in Kingdom of Ash and brought forward in House of Flame and Shadow.',
      color: 'purple',
    },
    {
      title: '🌆 Crescent City Is Different',
      body: "The third series is urban fantasy. A contemporary city of humans, Fae, angels, and wolves, not a medieval fantasy world. It reads like a detective thriller at first. It's the most mature and consistently explicit of the three series. Don't let the setting fool you: the connections to TOG and ACOTAR run deep and the climax of the series depends on them.",
      color: 'blue',
    },
    {
      title: "⏩ TOG Doesn't Start Like It Ends",
      body: "Throne of Glass opens YA-light: an assassin competition with a love triangle. Crown of Midnight is where the series finds its voice. Heir of Fire is where it becomes exceptional. If book 1 feels lightweight, push to book 2. By book 3 it's a completely different series.",
      color: 'amber',
    },
    {
      title: '⚡ Empire of Storms + Tower of Dawn',
      body: 'These two books happen simultaneously and are best read back-to-back: Empire of Storms first, then Tower of Dawn. Some readers prefer alternating chapters (a chapter-by-chapter guide is widely available online). Do not skip Tower of Dawn. Its ending is essential for Kingdom of Ash.',
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'Throne of Glass',
      sublabel: 'books 1-7 + optional prequel - start here or with ACOTAR',
      noteType: 'required',
      note: 'Read TOG before or after ACOTAR - either order works. The series must be finished before starting Crescent City. Kingdom of Ash ends with a multiverse moment that gains meaning once you know the wider SJM world.',
      books: [
        {
          title: 'Throne of Glass',
          slug: 'throne-of-glass',
          status: 'mandatory',
          note: 'Start here. Celaena Sardothien enters a deadly competition. YA-adjacent in tone - the series grows from here.',
          page_count: 404,
          publication_year: 2012,
        },
        {
          title: 'Crown of Midnight',
          slug: 'crown-of-midnight',
          status: 'mandatory',
          note: 'The series finds its footing. Darker and faster, with a reveal that changes how the first book reads.',
          page_count: 418,
          publication_year: 2013,
        },
        {
          title: "The Assassin's Blade",
          slug: 'the-assassins-blade',
          status: 'optional',
          note: 'Five prequel novellas in one volume. Read here (after Crown of Midnight). The reveal in book 2 makes the novella events land significantly harder. Skip if you want to stay on the main thread.',
          page_count: 432,
          publication_year: 2014,
        },
        {
          title: 'Heir of Fire',
          slug: 'heir-of-fire',
          status: 'mandatory',
          note: 'World expands into Fae and ancient magic. The true threat arrives.',
          page_count: 565,
          publication_year: 2014,
        },
        {
          title: 'Queen of Shadows',
          slug: 'queen-of-shadows',
          status: 'mandatory',
          note: 'Aelin returns to Rifthold. Cast converges, alliances shift.',
          page_count: 648,
          publication_year: 2015,
        },
        {
          title: 'Empire of Storms',
          slug: 'empire-of-storms',
          status: 'mandatory',
          note: 'War begins. Read before Tower of Dawn or alternate chapters - both cover the same timeline.',
          page_count: 689,
          publication_year: 2016,
        },
        {
          title: 'Tower of Dawn',
          slug: 'tower-of-dawn',
          status: 'mandatory',
          note: "Chaol's story runs parallel to Empire of Storms. Do not skip it; its events are essential for the finale.",
          page_count: 660,
          publication_year: 2017,
        },
        {
          title: 'Kingdom of Ash',
          slug: 'kingdom-of-ash',
          status: 'mandatory',
          note: 'The finale. All storylines converge. The closing chapters pierce the veil between worlds. The first hint of the SJM multiverse.',
          page_count: 992,
          publication_year: 2018,
        },
      ],
    },
    {
      label: 'A Court of Thorns and Roses',
      sublabel: 'books 1-5 - start here or after TOG',
      noteType: 'required',
      note: 'Complete the full ACOTAR series before starting Crescent City. A Court of Silver Flames must be read before House of Flame and Shadow: Nesta and Azriel appear in CC book 3.',
      books: [
        {
          title: 'A Court of Thorns and Roses',
          slug: 'a-court-of-thorns-and-roses',
          status: 'mandatory',
          note: 'Beauty and the Beast retelling. Feyre is pulled into the Fae world. Slower start; the series takes off at book 2.',
          page_count: 419,
          publication_year: 2015,
        },
        {
          title: 'A Court of Mist and Fury',
          slug: 'a-court-of-mist-and-fury',
          status: 'mandatory',
          note: 'The best book in the series. Everything expands: the world, the stakes, and the romance. The Night Court opens here.',
          page_count: 624,
          publication_year: 2016,
        },
        {
          title: 'A Court of Wings and Ruin',
          slug: 'a-court-of-wings-and-ruin',
          status: 'mandatory',
          note: 'War arrives. Closes the main trilogy with full cast convergence.',
          page_count: 699,
          publication_year: 2017,
        },
        {
          title: 'A Court of Frost and Starlight',
          slug: 'a-court-of-frost-and-starlight',
          status: 'supplementary',
          note: 'Short bridge novella (~230 pages). War aftermath. Read before A Court of Silver Flames.',
          page_count: 232,
          publication_year: 2018,
        },
        {
          title: 'A Court of Silver Flames',
          slug: 'a-court-of-silver-flames',
          status: 'mandatory',
          note: "Nesta and Cassian's book. READ THIS before Crescent City book 3. Nesta and Azriel play major roles in House of Flame and Shadow.",
          page_count: 757,
          publication_year: 2021,
        },
        {
          title: 'A Court of Thorns and Roses: Book 6',
          slug: 'a-court-of-thorns-and-roses-book-6',
          status: 'upcoming',
          note: 'Upcoming October 27, 2026. Title not yet announced.',
          publication_year: 2026,
        },
        {
          title: 'A Court of Thorns and Roses: Book 7',
          slug: 'a-court-of-thorns-and-roses-book-7',
          status: 'upcoming',
          note: 'Upcoming January 12, 2027. Title not yet announced.',
          publication_year: 2027,
        },
      ],
    },
    {
      label: 'Crescent City',
      sublabel: 'books 1-4 - read last',
      noteType: 'warning',
      note: 'Do not start here. House of Sky and Breath and House of Flame and Shadow contain major ACOTAR crossover content: reading CC first means encountering Nesta and Azriel as strangers when the book assumes you know them. Finish all of ACOTAR including A Court of Silver Flames before opening this group.',
      books: [
        {
          title: 'House of Earth and Blood',
          slug: 'house-of-earth-and-blood',
          status: 'mandatory',
          note: "Bryce Quinlan investigates her best friend's murder in a modern city of humans, Fae, angels, and wolves. Urban fantasy foundation before the worlds collide.",
          page_count: 803,
          publication_year: 2020,
        },
        {
          title: 'House of Sky and Breath',
          slug: 'house-of-sky-and-breath',
          status: 'mandatory',
          note: 'The SJM multiverse begins. The final pages send Bryce to Prythian (the ACOTAR world). The crossover starts here.',
          page_count: 804,
          publication_year: 2022,
        },
        {
          title: 'House of Flame and Shadow',
          slug: 'house-of-flame-and-shadow',
          status: 'mandatory',
          note: '~1/3 of this book is set in Prythian with Nesta and Azriel. Requires ACOTAR to be fully read. This is where the multiverse becomes explicit.',
          page_count: 896,
          publication_year: 2024,
        },
        {
          title: 'Crescent City: Book 4',
          slug: 'crescent-city-book-4',
          status: 'upcoming',
          note: 'Title and release date not yet announced.',
          publication_year: null,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Aelin Ashryver Whitethorn Galathynius',
      role: 'Assassin known as Celaena Sardothien; Queen of Terrasen; fire-wielder; protagonist of Throne of Glass',
      color: 'blue',
      why_they_work:
        "The gap between Celaena and Aelin is the structural secret of the first four books. The reader meets her under one name and one identity and watches that identity gradually reveal itself as a performance the character has maintained since childhood. Crown of Midnight is where the first crack appears; Heir of Fire is where it breaks open. The shift from hired assassin to exiled queen isn't just character development: it retroactively changes the meaning of the first two books.",
    },
    {
      name: 'Dorian Havilliard',
      role: 'Crown prince of Adarlan; magic user; secondary protagonist across the Throne of Glass series',
      color: 'amber',
      why_they_work:
        "Dorian is the reader's access to Rifthold as a society rather than a killing field. His friendship with Chaol grounds the early series in something that has nothing to do with assassins or courts: two young men disagreeing about where their loyalties should sit. His magic manifesting (in a world where magic is illegal) transforms him from an audience surrogate into a character with direct stakes. His arc in Kingdom of Ash carries the most significant question the series asks about inherited power.",
    },
    {
      name: 'Feyre Archeron',
      role: 'Human huntress pulled into the Fae world; protagonist of ACOTAR',
      color: 'green',
      why_they_work:
        "ACOTAR book 1 works because Feyre accepts Tamlin's framing of her situation, and so does the reader. A Court of Mist and Fury works because Maas uses that established credulity against both simultaneously. When Rhysand's Night Court turns out to be what it actually is, the reader's prior trust in Feyre's judgment (which was wrong) makes the reveal hit harder. Her unreliability in book 1 is not a flaw: it is load-bearing architecture for book 2.",
    },
    {
      name: 'Rhysand',
      role: 'High Lord of the Night Court; central male protagonist of ACOTAR',
      color: 'purple',
      why_they_work:
        "Rhysand is introduced as the villain and structured to remain readable as a villain for two-thirds of ACOTAR. The first-book characterization holds: he does do the things that make him appear monstrous. What A Court of Mist and Fury reveals is not that those appearances were false but that they were deliberate performances for external audiences. The structure requires the reader to accept the villain framing first and interrogate it after, which is why ACMAF only works in sequence.",
    },
    {
      name: 'Nesta Archeron',
      role: "Feyre's eldest sister; Cauldron-Made; protagonist of A Court of Silver Flames",
      color: 'red',
      why_they_work:
        "Nesta is the most divisive character in the ACOTAR cast for a specific structural reason: she is deliberately constructed as difficult. Her coldness in ACOTAR books 1-3 is rendered entirely through Feyre's POV, which means the reader arrives at ACOSF with three books of evidence for resenting her before the book switches to Nesta's own perspective and reveals what was underneath. A Court of Silver Flames is controversial partly because it asks readers who disliked her to stay with her for 750 pages of recovery.",
    },
    {
      name: 'Bryce Quinlan',
      role: 'Half-Fae party girl turned revolutionary; protagonist of Crescent City',
      color: 'zinc',
      why_they_work:
        "Bryce's narrative function in the multiverse is structural as much as character-based. She is the only SJM protagonist who physically crosses between worlds, and her disorientation in Prythian in House of Flame and Shadow is the one place Maas allows a character to vocalize what the reader experiences: the worlds feel like they shouldn't touch. Her Starborn ancestry as the bridge between Midgard and Prythian makes her the load-bearing character for the entire multiverse architecture.",
    },
  ],
  sections: [
    {
      heading: 'The crossover moments explained',
      type: 'bullets',
      bullets: [
        'Minor spoilers below: each point names which book the crossover happens in, not what happens after.',
        'Kingdom of Ash (TOG #7, end): Aelin pierces the veil between worlds, the first confirmation that the SJM worlds are connected.',
        'House of Sky and Breath (CC #2, end): Bryce is transported to Prythian instead of Hel. The crossover starts here.',
        'House of Flame and Shadow (CC #3): Bryce spends ~1/3 of the book in Prythian with Nesta and Azriel. Bryce learns the Fae of Midgard descended from Prythian. The multiverse becomes explicit.',
        'Connecting lore: the eight-pointed star, Starborn Fae lineage, and Queen Theia link ACOTAR and Crescent City through shared bloodlines.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Throne of Glass: explicit content from Heir of Fire / Queen of Shadows onward - the first two books are mild.',
        'ACOTAR: book 1 is significantly milder - explicit content begins with A Court of Mist and Fury (book 2).',
        'Crescent City: the most mature of the three. Explicit throughout, urban fantasy violence, highest darkness level of the three series.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "A Court of Mist and Fury became the most checked-out digital book from US libraries in 2023, nearly a decade after its 2016 publication. The book did not debut as a library phenomenon; it became one through sustained social media discovery, demonstrating a new commercial pattern for backlist fantasy titles.",
        "The Throne of Glass series made an unusual move within a continuous publication: it started as YA fantasy (books 1-2) and became adult epic fantasy (books 4-7) without a category rebrand. The protagonist's age, the romance's explicitness, and the violence's scale all escalated between books 2 and 3. Book 5 (Empire of Storms) is a structurally different book from book 1 by almost every metric.",
        "The term 'romantasy' as a commercial genre category emerged after 2020 and was defined largely by the SJM catalog and its comparables. Publishers began using it as a shelving category; Barnes & Noble reorganized fantasy sections around it. The genre category was created to describe books that already existed.",
        "The SJM multiverse crossover (Bryce and Rhysand in the same room, Nesta and Azriel in Crescent City) is structurally unusual for commercial fantasy: it requires readers to have completed a separate multi-book series before a chapter in the current book makes sense. House of Flame and Shadow is one of the first major commercial fantasy crossovers that uses previously-established characters as load-bearing plot elements rather than cameo appearances.",
      ],
    },
  ],
  darkness: [
    {
      label: 'TOG books 1-2',
      level: 2,
      desc: 'Competition, intrigue - relatively contained',
    },
    {
      label: 'TOG books 3-7',
      level: 4,
      desc: 'Full-scale war, sacrifice, world-ending stakes',
    },
    { label: 'ACOTAR 1-3', level: 3, desc: 'Dark fairy tale, trauma, war' },
    { label: 'ACSF', level: 3, desc: 'Intense recovery arc, darker tone' },
    {
      label: 'Crescent City',
      level: 4,
      desc: 'Most mature - explicit, violent, high stakes throughout',
    },
  ],
  metaDescription:
    'Sarah J. Maas reading order: all three series (Throne of Glass, ACOTAR, and Crescent City) in sequence, with crossovers explained and recommended order.',
  lastUpdated: '2026-07-01',
  booksLikeSlug: 'a-court-of-silver-flames',
  shortName: 'Maasverse',
  finishedLabel: 'Finished the SJM universe?',
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  related: [
    'acotar',
    'throne-of-glass',
    'empyrean',
    'blood-and-ash',
    'grishaverse',
    'kate-daniels',
  ],
};
