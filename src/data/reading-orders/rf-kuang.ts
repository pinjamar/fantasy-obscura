import type { ReadingOrderEntry } from '../reading-orders';

export const rfKuang: ReadingOrderEntry = {
  slug: 'rf-kuang',
  name: 'R.F. Kuang',
  author: 'R.F. Kuang',
  seriesStatus: 'ongoing',
  seriesStatusLabel:
    '📖 Ongoing - Poppy War trilogy complete (2018-2020), Babel and Yellowface standalone, Katabasis (2025)',
  description:
    "Every R.F. Kuang book is about what institutions do to the brilliant outsiders they admit. The military academy. The shamanic war machine. The empire's translation bureau. The publishing industry. The protagonist is always talented, always admitted on unequal terms, always brought to understand that the institution's offer is also a trap. Kuang has written across three genre registers (military fantasy, dark academia, psychological satire) with no shared universe and no reading order dependencies. Every book stands alone. The only through-line is the argument, and it sharpens with each book.",
  darknessDisplay:
    '🕯️🕯️🕯️🕯️🕯️ Brutal - Poppy War trilogy is level 5; Babel level 4; Yellowface and Katabasis level 3',
  orderNote:
    "Start with The Poppy War: it is the defining work. Babel is the better entry for readers from literary fiction or dark academia. Yellowface stands alone with no fantasy content. Do not start with Katabasis.",
  cardsPosition: 'above',
  cards: [
    {
      title: '📖 Where to Start',
      body: "Start with The Poppy War if you are prepared for the content and want Kuang at her most ambitious: the trilogy is the defining work. Start with Babel if you want dark academia with colonial politics at its centre, or if you are wary of the military-fantasy register; the first half eases you in and it is the better entry for readers from literary fiction. Start with Yellowface if you want Kuang's voice and intelligence with none of the fantasy or violence, as a test before committing to the trilogy. Do not start with Katabasis.",
      color: 'blue',
    },
    {
      title: '🏛️ The Institutional Argument',
      body: "Every Kuang book runs the same argument across different settings. The institution (the military academy, the shamanic war machine, the empire's translation bureau, the publishing industry) admits a brilliant outsider on unequal terms. The protagonist is talented enough to succeed inside it. The story is about what the institution requires of them in exchange, and what it costs when they finally understand the full terms. This is not a theme Kuang varies; it is a consistent intellectual project deployed across genres and centuries.",
      color: 'purple',
    },
    {
      title: '⚔️ The Poppy War: Know Before You Read',
      body: "The Poppy War opens as dark academia: an entrance exam, an elite academy, a protagonist who doesn't belong. At roughly the one-third mark the register shifts completely and does not shift back. The war content includes mass atrocity, genocide depicted with historical specificity, addiction, child soldiers, and sexual violence. These are not decorative. Kuang has described the trilogy as a deliberate act: a fantasy that forces Western readers to sit with Chinese history they had been permitted to ignore. Do not seek out spoilers about the shift.",
      color: 'red',
    },
    {
      title: "✨ Babel's Magic System",
      body: "Silverworking is built around untranslatability. Silver bars engraved with a word and its foreign-language equivalent generate power from the semantic gap between them; the more meaning is lost in translation, the more power the bar produces. The British Empire's magical economy therefore runs on colonial languages because the gap between those words and their English equivalents is large and irreducible. The empire needs the colonised precisely as translators, and it needs them to remain second-class. The magic functions simultaneously as a hard system with clear rules and as a political argument.",
      color: 'amber',
    },
    {
      title: '📚 The Range is Real',
      body: "Kuang's five works span military fantasy, dark academia, psychological satire, and a mythological descent novel, with no shared universe, no shared magic, no shared characters. A reader who finishes The Poppy War and picks up Yellowface will encounter a completely different genre and emotional mode. This is intentional. Each book is the genre Kuang needed to make the argument she was making at that time. Readers who bounce off one Kuang should try another before writing her off; the range is genuine and the through-line is worth following.",
      color: 'green',
    },
    {
      title: '🕯️ The Darkness Range',
      body: "The darkness range across Kuang's work is unusually wide: level 5 for the Poppy War trilogy, level 4 for Babel, level 3 for Yellowface. A reader who cannot handle the Poppy War's content may find Babel entirely manageable, and Yellowface is accessible to readers who do not normally read dark fiction at all. Kuang's body of work has genuine entry points across the spectrum.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'The Poppy War Trilogy',
      sublabel: '2018-2020 - complete, read consecutively',
      note: 'Three books, complete. Military fantasy inspired directly by 20th-century Chinese history: the Second Sino-Japanese War, the Nanjing Massacre, Republican-era warlord politics. The first third of book one reads as dark academia; then the war starts and the register shifts permanently. The shift is intentional; do not seek out spoilers.',
      noteType: 'required',
      books: [
        {
          title: 'The Poppy War',
          slug: 'the-poppy-war',
          status: 'mandatory',
          note: "Rin is a war orphan who cheats her way into the Empire's elite military academy on raw intelligence and brutal self-discipline. The academy section is compulsive; what follows it is not fantasy as escapism. The tonal shift is abrupt and permanent.",
          page_count: 544,
          publication_year: 2018,
        },
        {
          title: 'The Dragon Republic',
          slug: 'the-dragon-republic',
          status: 'mandatory',
          note: "The war fractures into civil conflict. The scope widens: more factions, more ideological betrayal, more colonial politics. The most politically complex book in the trilogy and the one where the series' argument about revolution becomes explicit.",
          page_count: 544,
          publication_year: 2019,
        },
        {
          title: 'The Burning God',
          slug: 'the-burning-god',
          status: 'mandatory',
          note: 'The conclusion. Every ideological question the trilogy has built: who gets to be the liberator, what does revolution do to the revolutionary, when does resistance become the thing it resisted. All answered without flinching. The ending does not soften.',
          page_count: 656,
          publication_year: 2020,
        },
      ],
    },
    {
      label: 'Standalone Works',
      sublabel: 'no connection to the trilogy - any order',
      note: 'Three entirely separate books across different genres with different worlds and no shared characters. No reading order dependencies between them or with the trilogy.',
      noteType: 'optional',
      books: [
        {
          title: 'Babel, or The Necessity of Violence',
          slug: 'babel',
          status: 'mandatory',
          note: "Dark academia set in an alternate 1830s Oxford. The magic (Silverworking) runs on the semantic gap between a word and its foreign-language equivalent: the wider the gap, the more power the bar generates. The British Empire's magical economy therefore runs on colonial languages. The first half is deliberately seductive. Kuang wants the reader to love it before the cost arrives.",
          page_count: 545,
          publication_year: 2022,
        },
        {
          title: 'Yellowface',
          slug: 'yellowface',
          status: 'mandatory',
          note: "Not fantasy. Psychological satire of the publishing industry. A white author steals a dead Chinese-American friend's manuscript and becomes a bestseller. First-person narration that implicates the reader in the narrator's logic. The darkness is entirely social and psychological; flag clearly as a genre departure for readers who came from the Poppy War.",
          page_count: 320,
          publication_year: 2023,
        },
        {
          title: 'Katabasis',
          slug: 'katabasis',
          status: 'mandatory',
          note: 'The title is the classical Greek term for a descent into the underworld: the literary device used by Homer, Virgil, and Dante. Kuang takes that mythological framework and runs her institutional argument through it. Assumes familiarity with her register. Best read last.',
          page_count: 559,
          publication_year: 2025,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Rin',
      role: 'War orphan; protagonist of the Poppy War trilogy; shamanic soldier',
      color: 'red',
      why_they_work:
        "Rin is the trilogy's central moral argument made flesh. Her choices across three books are the question of whether someone formed entirely by violence and survival has the capacity for anything else. The cards describe her arc and the tonal shift; the structural point is different: Kuang never lets the reader separate from Rin's perspective, which means the reader is inside every decision including the ones that are indefensible. That refusal to provide narrative distance is what makes the trilogy so difficult and so honest.",
    },
    {
      name: 'Altan Trengsin',
      role: 'Speerly commander; war hero; the figure Rin measures herself against',
      color: 'amber',
      why_they_work:
        "Altan is what Rin might become, and his arc in the first book is the blueprint for hers across the next two. He's compelling in the way that makes the reader understand exactly how Rin becomes what she becomes: not through weakness, but through a specific kind of strength that the world around her treats as exceptional and that costs her everything.",
    },
    {
      name: 'Robin Swift',
      role: "Orphan and translator; protagonist of Babel; member of Oxford's silver-working translation corps",
      color: 'blue',
      why_they_work:
        "Robin's structural function mirrors Rin's but the mechanism is linguistic rather than military. Like Rin, he's brilliant, admitted on unequal terms, and the story is about what the institution costs him. The magic system IS his arc: as a translator, he is the semantic gap the silver bars exploit. His personal cost is inseparable from the political argument the book is making, which is what makes Babel more than a magic-system novel.",
    },
    {
      name: 'June Hayward',
      role: 'Unreliable narrator; protagonist of Yellowface; white author who steals a manuscript',
      color: 'green',
      why_they_work:
        "June is the most structurally ambitious narrator in Kuang's work. She's charming, self-aware, and rationalizes with enough sophistication that the reader finds themselves agreeing with arguments they shouldn't. The implication is the point: Kuang is writing about how privilege operates in publishing partly by demonstrating it at the level of first-person narration. A less skilled narrator would let the reader off the hook too easily.",
    },
  ],
  sections: [
    {
      heading: 'Reading order notes',
      type: 'bullets',
      bullets: [
        "The Poppy War trilogy's argument compounds across all three books; stopping between them and picking up weeks later loses the cumulative effect.",
        'Avoid reviews of The Burning God before reading it; the ending is widely discussed and spoilers are easy to encounter.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'The Poppy War trilogy: wartime atrocity, genocide depicted with historical specificity, addiction, child soldiers, sexual violence. Level 5. These elements are the point of the work, not decoration.',
        'Babel: colonial violence, period racism depicted with accuracy, graphic violence in the final act. Level 4.',
        'Yellowface and Katabasis: psychological stakes, no physical violence. Level 3.',
        'Romance is absent across all works. No explicit content in any book.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "The Poppy War (2018) was Kuang's debut, written when she was 19. It used fantasy structures to frame the Second Sino-Japanese War and the Nanjing Massacre, events largely absent from Western commercial fiction. The book brought Chinese 20th-century history into a genre that had previously permitted Western readers to ignore it.",
        "The Silverworking magic in Babel is among the most structurally integrated magic systems in commercial fiction: the mechanism IS the political argument. The empire's magical economy requires colonial translators precisely because it requires the semantic gap. The magic does not illustrate the theme; it is the theme.",
        "Yellowface (2023) used the publishing industry's own mechanisms (BookTok virality, sensitivity readers, review-bombing) as the subject of its satire, making the book's reception part of the text in ways that played out in real time.",
        "Kuang published five books across three distinct genre registers in seven years (2018-2025), each in a different mode. The coherence is thematic, not generic: she is one of the few major commercial authors working in genre fiction who maintains a visible intellectual project across every book.",
      ],
    },
  ],
  darkness: [
    {
      label: 'The Poppy War Trilogy',
      level: 5,
      desc: 'Wartime atrocity, genocide, addiction, child soldiers, sexual violence - relentless and purposeful.',
    },
    {
      label: 'Babel',
      level: 4,
      desc: 'Colonial violence, period racism depicted with accuracy, graphic violence in the final section.',
    },
    {
      label: 'Yellowface / Katabasis',
      level: 3,
      desc: 'Psychological stakes only in Yellowface. No physical violence.',
    },
  ],
  shortName: 'R.F. Kuang',
  booksLikeSlug: 'the-poppy-war',
  metaDescription:
    'R.F. Kuang reading order: The Poppy War trilogy, Babel, Yellowface, and Katabasis - with entry point guidance and full content notes for each work.',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished a book?',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: [
    'broken-earth',
    'red-rising',
    'first-law',
    'malazan',
    'locked-tomb',
    'gene-wolfe',
  ],
};
