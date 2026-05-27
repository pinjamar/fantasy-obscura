import type { ReadingOrderEntry } from '../reading-orders';

export const rfKuang: ReadingOrderEntry = {
  slug: 'rf-kuang',
  name: 'R.F. Kuang',
  author: 'R.F. Kuang',
  seriesStatus: 'ongoing',
  seriesStatusLabel:
    '📖 Ongoing - Poppy War trilogy complete (2018–2020), Babel and Yellowface standalone, Katabasis (2025)',
  description:
    "Every R.F. Kuang book is about what institutions do to the brilliant outsiders they admit. The military academy. The shamanic war machine. The empire's translation bureau. The publishing industry. The protagonist is always talented, always admitted on unequal terms, always brought to understand that the institution's offer is also a trap. Kuang has written across three genre registers — military fantasy, dark academia, psychological satire — with no shared universe and no reading order dependencies. Every book stands alone. The only through-line is the argument, and it sharpens with each book.",
  darknessDisplay: '🕯️🕯️🕯️🕯️🕯️ Brutal',
  groups: [
    {
      label: 'The Poppy War Trilogy',
      sublabel: '2018-2020 - complete, read consecutively',
      note: 'Three books, complete. Military fantasy inspired directly by 20th-century Chinese history - the Second Sino-Japanese War, the Nanjing Massacre, Republican-era warlord politics. The first third of book one reads as dark academia; then the war starts and the register shifts permanently. The shift is intentional — do not seek out spoilers.',
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
          note: "The war fractures into civil conflict. The scope widens - more factions, more ideological betrayal, more colonial politics. The most politically complex book in the trilogy and the one where the series' argument about revolution becomes explicit.",
          page_count: 544,
          publication_year: 2019,
        },
        {
          title: 'The Burning God',
          slug: 'the-burning-god',
          status: 'mandatory',
          note: 'The conclusion. Every ideological question the trilogy has built - who gets to be the liberator, what does revolution do to the revolutionary, when does resistance become the thing it resisted — is answered without flinching. One of the bleaker and more intellectually honest endings in modern fantasy.',
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
          note: "Not fantasy. Psychological satire of the publishing industry. A white author steals a dead Chinese-American friend's manuscript and becomes a bestseller. First-person narration that implicates the reader in the narrator's logic. The darkness is entirely social and psychological — flag clearly as a genre departure for readers who came from the Poppy War.",
          page_count: 320,
          publication_year: 2023,
        },
        {
          title: 'Katabasis',
          slug: 'katabasis',
          status: 'mandatory',
          note: 'The title is the classical Greek term for a descent into the underworld - the literary device used by Homer, Virgil, and Dante. Kuang takes that mythological framework and runs her institutional argument through it. Assumes familiarity with her register. Best read last.',
          page_count: 559,
          publication_year: 2025,
        },
      ],
    },
  ],
  orderNote:
    "Start with The Poppy War for most readers - it is the defining work. Start with Babel if you want dark academia with an easier entry. Start with Yellowface if you want Kuang's voice with no fantasy or violence.",
  cardsPosition: 'above',
  cards: [
    {
      title: '📖 Where to Start',
      body: "Start with The Poppy War if you are prepared for the content and want Kuang at her most ambitious - the trilogy is the defining work. Start with Babel if you want dark academia with colonial politics at its centre, or if you are wary of the military-fantasy register — the first half eases you in and it is the better entry for readers from literary fiction. Start with Yellowface if you want Kuang's voice and intelligence with none of the fantasy or violence, as a test before committing to the trilogy. Do not start with Katabasis.",
      color: 'blue',
    },
    {
      title: '🏛️ The Institutional Argument',
      body: "Every Kuang book runs the same argument across different settings. The institution - the military academy, the shamanic war machine, the empire's translation bureau, the publishing industry — admits a brilliant outsider on unequal terms. The protagonist is talented enough to succeed inside it. The story is about what the institution requires of them in exchange, and what it costs when they finally understand the full terms. This is not a theme Kuang varies — it is a consistent intellectual project deployed across genres and centuries.",
      color: 'purple',
    },
    {
      title: '⚔️ The Poppy War: Know Before You Read',
      body: "The Poppy War opens as dark academia - an entrance exam, an elite academy, a protagonist who doesn't belong. At roughly the one-third mark the register shifts completely and does not shift back. The war content includes mass atrocity, genocide depicted with historical specificity, addiction, child soldiers, and sexual violence. These are not decorative. Kuang has described the trilogy as a deliberate act — a fantasy that forces Western readers to sit with Chinese history they had been permitted to ignore. Do not seek out spoilers about the shift.",
      color: 'red',
    },
    {
      title: "✨ Babel's Magic System",
      body: "Silverworking is built around untranslatability. Silver bars engraved with a word and its foreign-language equivalent generate power from the semantic gap between them — the more meaning is lost in translation, the more power the bar produces. The British Empire's magical economy therefore runs on colonial languages because the gap between those words and their English equivalents is large and irreducible. The empire needs the colonised precisely as translators, and it needs them to remain second-class. The magic functions simultaneously as a hard system with clear rules and as a political argument.",
      color: 'amber',
    },
    {
      title: '📚 The Range is Real',
      body: "Kuang's five works span military fantasy, dark academia, psychological satire, and a mythological descent novel - with no shared universe, no shared magic, no shared characters. A reader who finishes The Poppy War and picks up Yellowface will encounter a completely different genre and emotional mode. This is intentional. Each book is the genre Kuang needed to make the argument she was making at that time. Readers who bounce off one Kuang should try another before writing her off — the range is genuine and the through-line rewards following it.",
      color: 'green',
    },
    {
      title: '📅 The Darkness Range',
      body: "The darkness range across Kuang's work is unusually wide - level 5 for the Poppy War trilogy, level 4 for Babel, level 3 for Yellowface. A reader who cannot handle the Poppy War's content may find Babel entirely manageable, and Yellowface is accessible to readers who do not normally read dark fiction at all. This means Kuang's body of work has genuine entry points across the spectrum. The right starting point depends on what you can handle, not just what you want.",
      color: 'zinc',
    },
  ],
  sections: [
    {
      heading: 'Reading order notes',
      type: 'bullets',
      bullets: [
        'Read the Poppy War trilogy consecutively - the plot density rewards forward momentum and the argument builds across all three books.',
        'The standalone works (Babel, Yellowface, Katabasis) have no dependencies on each other or on the trilogy. A reader who starts with Babel needs no prior Kuang.',
        'Avoid reviews of The Burning God before reading it — the ending is widely discussed and spoilers are easy to encounter.',
        "Katabasis is best read last — it is a novella that assumes familiarity with Kuang's register and rewards readers who have already spent time in her work.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'The Poppy War trilogy: wartime atrocity, genocide depicted with historical specificity, addiction, child soldiers, sexual violence — level 5. These elements are the point of the work, not decoration.',
        'Babel: colonial violence, period racism, graphic violence in the final act - level 4.',
        'Yellowface: psychological horror, social and reputational stakes, no physical violence - level 3.',
        'Romance is absent across all works. No explicit content in any book.',
        'Not right for: readers who need escapist fantasy or a hopeful tone. Right for: readers who want fiction that demands something of them.',
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
  lastUpdated: '2026-05-27',
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
