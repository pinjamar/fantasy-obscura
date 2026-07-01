import type { ReadingOrderEntry } from '../reading-orders';

export const bloodAndAsh: ReadingOrderEntry = {
  slug: 'blood-and-ash',
  name: 'From Blood and Ash',
  author: 'Jennifer L. Armentrout',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - The Throne of Bone and Ash due 2026',
  description:
    "Romantasy with slow-burn enemies-to-lovers at its core. From Blood and Ash starts as a sheltered Maiden meets her mysterious guard and spirals into a full-scale fantasy epic. The first book reads like pure romantasy; by book three it's a proper political fantasy with war, gods, and a sprawling world. Explicit throughout.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate · 🔥🔥🔥 Explicit',
  groups: [
    {
      label: 'Blood and Ash',
      sublabel: 'main series - start here',
      noteType: 'required',
      note: "The core story. All books are essential and must be read in order. A Soul of Ash and Blood (book 5) is optional: it retells book 1 from Hawke's POV with no new plot. Read it after book 4 or skip it.",
      books: [
        {
          title: 'From Blood and Ash',
          slug: 'from-blood-and-ash',
          status: 'mandatory',
          note: 'Start here. Poppy is a sheltered Maiden whose world unravels when she meets her guard Hawke. Slow-burn enemies-to-lovers with high tension and a twist ending.',
          page_count: 622,
          publication_year: 2020,
        },
        {
          title: 'A Kingdom of Flesh and Fire',
          slug: 'a-kingdom-of-flesh-and-fire',
          status: 'mandatory',
          note: "The slow burn resolves. Poppy and Hawke's situation shifts significantly, and the world behind the Maiden mythology starts to show itself. Darker in tone than book one.",
          page_count: 651,
          publication_year: 2020,
        },
        {
          title: 'The Crown of Gilded Bones',
          slug: 'the-crown-of-gilded-bones',
          status: 'mandatory',
          note: "Poppy and Casteel travel to Atlantia. Poppy's powers become undeniable and what she is finally has a name. The war between Atlantia and Solis moves from background to front.",
          page_count: 728,
          publication_year: 2021,
        },
        {
          title: 'The War of Two Queens',
          slug: 'the-war-of-two-queens',
          status: 'mandatory',
          note: 'The war becomes active conflict. Poppy and Casteel are separated for most of the book. Longer and more brutal than the first three.',
          page_count: 726,
          publication_year: 2022,
        },
        {
          title: 'A Soul of Ash and Blood',
          slug: 'a-soul-of-ash-and-blood',
          status: 'optional',
          note: "Retells book one from Hawke's POV. Contains no new plot. Best read after book 4 or 5.",
          page_count: 829,
          publication_year: 2023,
        },
        {
          title: 'The Primal of Blood and Bone',
          slug: 'the-primal-of-blood-and-bone',
          status: 'mandatory',
          note: "The scope of the conflict expands to the god-level. Poppy's powers and what she is as a god move fully to the center of the plot.",
          page_count: 608,
          publication_year: 2025,
        },
        {
          title: 'A Crown of Ruin',
          slug: 'a-crown-of-ruin',
          status: 'supplementary',
          note: 'Free novella. Bridges The Primal of Blood and Bone and The Throne of Bone and Ash with scenes not covered in the main books.',
          page_count: null,
          publication_year: 2025,
        },
        {
          title: 'The Throne of Bone and Ash',
          slug: 'the-throne-of-bone-and-ash',
          status: 'upcoming',
          note: 'Expected 2026.',
          page_count: null,
          publication_year: 2026,
        },
      ],
    },
    {
      label: 'Flesh and Fire',
      sublabel: 'companion series - read after book 4',
      noteType: 'warning',
      note: 'A companion series set in the same world in an earlier era, following Nyktos and Sera. The storylines converge with the main series. Read these after The War of Two Queens.',
      books: [
        {
          title: 'A Shadow in the Ember',
          slug: 'a-shadow-in-the-ember',
          status: 'mandatory',
          note: 'Sera is a mortal woman fated to the God of Death, Nyktos, in the era before Blood and Ash begins. Darker in tone and slower to start than book 1 of the main series.',
          page_count: 622,
          publication_year: 2021,
        },
        {
          title: 'A Light in the Flame',
          slug: 'a-light-in-the-flame',
          status: 'mandatory',
          note: 'The bond between Sera and Nyktos deepens under increasing pressure. The connections to the Blood and Ash mythology start to become explicit.',
          page_count: 638,
          publication_year: 2022,
        },
        {
          title: 'A Fire in the Flesh',
          slug: 'a-fire-in-the-flesh',
          status: 'mandatory',
          note: 'The two storylines begin to converge. What Sera and Nyktos built is tested against consequences neither of them chose.',
          page_count: 569,
          publication_year: 2023,
        },
        {
          title: 'Born of Blood and Ash',
          slug: 'born-of-blood-and-ash',
          status: 'mandatory',
          note: 'The Flesh and Fire arc resolves and connects directly into the main Blood and Ash timeline.',
          page_count: 560,
          publication_year: 2024,
        },
      ],
    },
  ],
  orderNote:
    'Start with From Blood and Ash. Read the main series straight through before touching the companion series. The Flesh and Fire companion series (starting with A Shadow in the Ember) slots in after book 4: the two storylines converge by the end of Born of Blood and Ash.',
  cardsPosition: 'above',
  cards: [
    {
      title: '💘 The Hook',
      body: 'From Blood and Ash is slow-burn enemies-to-lovers with a sharp plot twist at the end. The tension between Poppy and Hawke carries the whole first book, and then the reveal changes what the entire first book was doing. Go in without spoilers.',
      color: 'blue',
    },
    {
      title: '🐺 Hawke',
      body: "Hawke (later known as Casteel) is the love interest the series is built around. He is dangerous, funny, and deliberately withholding. What he's actually doing in book 1 (and why) comes out in the final reveal, and it changes the meaning of every scene that came before it. The mystery of who he is and what he wants carries book 1. Don't look anything up.",
      color: 'red',
    },
    {
      title: '⚔️ The Shift',
      body: "From Blood and Ash reads like pure romantasy. By The Crown of Gilded Bones the balance tips: romance takes a back seat to world-building, politics, and war. Books 3 onward are significantly more plot-heavy and darker. Know this before you start if romance is the main draw.",
      color: 'amber',
    },
    {
      title: '🌍 The Mythology',
      body: "Underneath the slow-burn romance is a constructed mythology of gods, Primals, and the origins of the world. It feels decorative in book 1. By book 3, it's the point. The Flesh and Fire companion series tells the gods' story directly. It belongs in the reading order.",
      color: 'zinc',
    },
    {
      title: '📖 Flesh and Fire',
      body: 'The companion series follows Nyktos, the God of Death, and Sera (a mortal woman fated to him). Set in the same world in an earlier era and reads as a parallel mythology. The two storylines converge by the end of Born of Blood and Ash. Read it after book 4 of the main series: the connections only land once you know the main story.',
      color: 'green',
    },
    {
      title: '📚 The Reading Experience',
      body: "From Blood and Ash is 622 pages and reads like a 350-page book. Armentrout writes close first-person: everything is Poppy's perception, reaction, and interior monologue. Short chapters, relentless pacing, tension on nearly every page. The books across both series are long (560–829 pages) but none of them feel their length.",
      color: 'purple',
    },
  ],
  characters: [
    {
      name: 'Poppy (Penellaphe)',
      role: 'The Maiden; POV narrator',
      color: 'amber',
      why_they_work:
        "Has been told her whole life she is sacred, untouchable, and destined for something chosen for her. The series is her figuring out that this was a construction and deciding what to do about it. Her passivity in book 1 is a cage, not a character trait.",
    },
    {
      name: 'Hawke / Casteel',
      role: 'Royal guard; love interest',
      color: 'red',
      why_they_work:
        "His concealment in book 1 is structural: what he knows but doesn't say reshapes every scene in retrospect. What he's actually doing doesn't diminish the romance. It complicates it in ways book 2 then has to work through honestly.",
    },
    {
      name: 'Nyktos',
      role: 'God of Death; protagonist of Flesh and Fire',
      color: 'purple',
      why_they_work:
        "A god who is supposed to be feared and has no interest in being known. His arc in Flesh and Fire is what he does when someone refuses to let him remain unknowable. The mythology behind Blood and Ash's world runs through his history.",
    },
    {
      name: 'Sera (Seraphena)',
      role: 'Mortal woman fated to Nyktos; protagonist of Flesh and Fire',
      color: 'zinc',
      why_they_work:
        "Shaped her whole life to be a weapon: willing herself into a specific fate she chose rather than one chosen for her. The dynamic with Nyktos works because she walked into it deliberately, not because she had no choice.",
    },
  ],
  sections: [
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'Darkness type: escalating. Books 1–2 are romance-forward with danger filtered through courtship tension. Books 3–6 involve active war, torture, and significant character deaths.',
        'Explicit sexual content: yes, throughout every book in both series. High heat level from early in book 1.',
        'Not suitable for younger readers. The explicit content is present from the first book, not introduced gradually.',
        'Right for: readers who want explicit slow-burn romantasy that builds into a full fantasy epic with gods and war. Not right for: readers who want fantasy without explicit content, or who need the romance to stay central throughout.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Books 1–2',
      level: 3,
      desc: 'Romance-forward, with danger present but filtered through courtship tension.',
    },
    {
      label: 'Books 3–6',
      level: 4,
      desc: 'War, torture, heavy losses, and escalating stakes. Significantly darker than the first two books.',
    },
    {
      label: 'Flesh and Fire 1–4',
      level: 4,
      desc: 'Gods, fate, and sacrifice. Comparable in tone to books 3–4 of the main series.',
    },
  ],
  metaDescription:
    'The From Blood and Ash reading order: all books in the Blood and Ash series and the Flesh and Fire companion series, in the right order, with guidance on when to read each.',
  lastUpdated: '2026-07-01',
  shortName: 'Blood and Ash',
  finishedLabel: "Finished what's published?",
  booksLikeSlug: 'from-blood-and-ash',
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  related: ['empyrean', 'acotar', 'grishaverse', 'sarah-j-maas', 'throne-of-glass', 'folk-of-the-air'],
};
