import type { ReadingOrderEntry } from '../reading-orders';

export const inheritanceCycle: ReadingOrderEntry = {
  slug: 'inheritance-cycle',
  name: 'The Inheritance Cycle',
  author: 'Christopher Paolini',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete — 4 novels + companion works',
  description:
    'One of the most remarkable debut achievements in fantasy — Christopher Paolini began writing Eragon at fifteen and published it at seventeen. The Inheritance Cycle follows Eragon, a farm boy who discovers a dragon egg and is pulled into a war against the tyrant king Galbatorix. The Star Wars and Lord of the Rings influences in the first book are impossible to miss, but Paolini genuinely grows as a writer across four volumes. By Brisingr and Inheritance the world has real depth, the magic system has genuine teeth, and the stakes feel earned. This is the series that made a generation of readers fall in love with dragons. Eragon is where to start — the Inheritance Cycle reading order is linear, following one continuous story across all four books.',
  darknessDisplay: '🕯️🕯️ Mild',
  orderNote:
    'Read the four main books in order — they form one continuous story. The Fork, the Witch, and the Worm and Murtagh are best read after finishing Inheritance.',
  groups: [
    {
      label: 'The Inheritance Cycle',
      sublabel: 'the complete tetralogy — read in order',
      books: [
        {
          title: 'Eragon',
          slug: 'eragon',
          status: 'mandatory',
          seriesLabel: 'Inheritance Cycle #1',
          note: 'Start here. A farm boy, a dragon egg, and a world under a tyrant king. The Lord of the Rings and Star Wars bones are visible but the enthusiasm is infectious. Paolini was fifteen when he wrote this — the ambition alone is remarkable.',
          page_count: 503,
          publication_year: 2003,
        },
        {
          title: 'Eldest',
          slug: 'eldest',
          status: 'mandatory',
          seriesLabel: 'Inheritance Cycle #2',
          note: 'Eragon trains with the elves while Roran fights back home in Carvahall. The dual storyline expands the world significantly. Paolini is visibly maturing — the elf culture and magic theory are more developed than anything in book 1.',
          page_count: 668,
          publication_year: 2005,
        },
        {
          title: 'Brisingr',
          slug: 'brisingr',
          status: 'mandatory',
          seriesLabel: 'Inheritance Cycle #3',
          note: 'Originally planned as the trilogy finale, the story grew too large. The Ancient Language magic system gets its deepest exploration. Long but rewarding — the Paolini who wrote this is a different writer to the fifteen-year-old who started Eragon.',
          page_count: 748,
          publication_year: 2008,
        },
        {
          title: 'Inheritance',
          slug: 'inheritance',
          status: 'mandatory',
          seriesLabel: 'Inheritance Cycle #4',
          note: 'The conclusion. The final confrontation with Galbatorix is one of the most creative boss fights in fantasy. The ending is divisive — not triumphant in the way readers expected — but it is honest and earned.',
          page_count: 849,
          publication_year: 2011,
        },
      ],
    },
    {
      label: 'Return to Alagaësia',
      sublabel: 'after the main cycle — read in publication order',
      books: [
        {
          title: 'The Fork, the Witch, and the Worm',
          slug: 'the-fork-the-witch-and-the-worm',
          status: 'optional',
          seriesLabel: 'Tales from Alagaësia #1',
          note: "Three short stories set after Inheritance, framed by a new narrator. A gentle return to Alagaësia — light on plot, heavy on world texture. For fans who aren't ready to leave.",
          page_count: 272,
          publication_year: 2018,
        },
        {
          title: 'Murtagh',
          slug: 'murtagh',
          status: 'optional',
          seriesLabel: 'Alagaësia #5',
          note: "The full novel follow-up, focused on the series' most complex character. Far more psychologically nuanced than the main cycle. If Murtagh was your favourite, this is essential.",
          page_count: 672,
          publication_year: 2023,
        },
      ],
    },
  ],
  cards: [
    {
      title: '🐉 The Tetralogy (4)',
      body: 'Eragon through Inheritance — one continuous story. All four are core. The series gets stronger with each book.',
      color: 'blue',
    },
    {
      title: '📖 Return to Alagaësia (2)',
      body: 'The Fork, the Witch, and the Worm and Murtagh. Optional but rewarding for fans — especially Murtagh if you loved the character.',
      color: 'green',
    },
  ],
  sections: [
    {
      heading: 'The Paolini factor',
      type: 'bullets',
      bullets: [
        'Paolini started writing Eragon at 15 and self-published it at 17 before Knopf picked it up. The debut-at-fifteen story is real, not marketing.',
        'The first book wears its influences openly — Eragon is structurally very close to A New Hope, and the fantasy DNA is Tolkien and Tolkien adjacent. Later books shake this off as Paolini finds his own voice.',
        'The Ancient Language magic system — where magic is bound by the true names of things — is one of the more philosophically interesting systems in epic fantasy.',
        'Murtagh (2023) is a genuine surprise: psychologically complex, slower-paced, and far more mature than anything in the main cycle.',
        'The map of Alagaësia is worth studying before you start — the geography matters and the journey covers most of the continent.',
      ],
    },
    {
      heading: 'On the ending',
      type: 'prose',
      prose:
        "Inheritance's ending split readers when it came out in 2011. Without spoiling it: Paolini makes a choice that prioritises thematic honesty over wish fulfilment. Some readers found it deeply moving. Others felt cheated. Either way it is a deliberate authorial choice, not a failure of craft — and Murtagh (2023) adds significant context that reframes the finale.",
    },
  ],
  darkness: [
    {
      label: 'Eragon / Eldest',
      level: 2,
      desc: 'Violence in battle, some death — standard epic fantasy stakes',
    },
    {
      label: 'Brisingr / Inheritance',
      level: 3,
      desc: 'War atrocities, psychological cost, the ending carries real weight',
    },
  ],
  lastUpdated: '2026-05-12',
  finishedLabel: 'Finished Alagaësia?',
  categoryHref: '/fantasy/epic/',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['pern', 'dragonlance', 'stormlight'],
};
