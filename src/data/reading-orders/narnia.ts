import type { ReadingOrderEntry } from '../reading-orders';

export const narnia: ReadingOrderEntry = {
  slug: 'narnia',
  name: 'The Chronicles of Narnia',
  author: 'C.S. Lewis',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete — 7 books (1950–1956)',
  description:
    "Seven books set in a world reached through an ordinary wardrobe, a painting on a wall, or a pair of magic rings. C.S. Lewis wrote The Chronicles of Narnia between 1950 and 1956, producing one of the most beloved children's fantasy series ever written — and one of fiction's most debated reading orders. Narnia is warm, imaginative, and suffused with Christian allegory. The talking animals, the great lion Aslan, and the children who stumble through from our world have been in print continuously for over seventy years. This guide covers all seven books in the recommended reading order and settles the publication vs chronological debate.",
  darknessDisplay: '🕯️ Gentle — danger is present but never graphic; The Last Battle is the darkest entry',
  warning:
    "Most copies of The Chronicles of Narnia currently in print number The Magician's Nephew as book 1. This is a publishing decision from the 1990s — not C.S. Lewis's intended reading order. Start with The Lion, the Witch and the Wardrobe regardless of what the numbers on your copy say.",
  orderNote:
    "Start with The Lion, the Witch and the Wardrobe. The publication vs chronological debate is the most searched reading order question in classic children's fantasy — this guide explains both and recommends publication order.",
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ C.S. Lewis',
      body: "Lewis (1898–1963) was a professor of Medieval and Renaissance Literature at Oxford, later Cambridge. A former atheist who converted to Christianity in his early 30s — an experience he recounted in Surprised by Joy. He had the image of a faun carrying an umbrella in a snowy wood in his head since he was 16. He was 52 when The Lion, the Witch and the Wardrobe was published. He died on November 22, 1963 — the same day as JFK and Aldous Huxley, almost entirely overshadowed in news coverage.",
      color: 'blue',
    },
    {
      title: '✝️ The Allegory',
      body: "Narnia is Christian allegory. This is intentional, pervasive, and not subtle. Aslan is a Christ figure. His death and resurrection in LWW mirror the Passion. The Last Battle draws heavily on Revelation. Lewis was a Christian apologist — Mere Christianity, The Screwtape Letters — and Narnia is partly a vehicle for those ideas. Many readers love the series regardless of their own beliefs. Worth knowing before you start.",
      color: 'purple',
    },
    {
      title: '📚 Publication vs Chronological',
      body: "The seven Narnia books exist in two sequences. Publication order (LWW first, 1950) is the order Lewis wrote and released them. Chronological order (The Magician's Nephew first) follows the in-world timeline. In the 1990s, publishers resequenced the books based on a 1957 letter Lewis wrote to a young American reader. Most Lewis scholars consider this a misreading of a polite, informal reply. Publication order is recommended — and this is not a close debate.",
      color: 'amber',
    },
    {
      title: '🦁 Why Publication Order',
      body: "The Lion, the Witch and the Wardrobe works because you enter Narnia knowing nothing. The wardrobe, Aslan, and the White Witch hit with full force as discoveries. The Magician's Nephew is an origin story — and origin stories only land when you already love the thing being explained. Read it sixth, as Lewis wrote it, and the wardrobe's creation is a revelation. Read it first and it's just backstory.",
      color: 'blue',
    },
    {
      title: '🤝 Lewis and Tolkien',
      body: "Lewis and Tolkien were both members of the Inklings, an Oxford literary group that met weekly to read works-in-progress aloud. Tolkien was instrumental in Lewis's conversion to Christianity. He was also openly critical of Narnia — he found the allegory too heavy-handed, the world-building too hasty, and the mixing of Father Christmas, classical fauns, and Norse dwarves a fundamental violation of subcreative consistency. Their friendship survived it, but the disagreement was genuine. Tolkien never reconciled himself to Narnia.",
      color: 'green',
    },
    {
      title: '🔚 The Last Battle',
      body: "The Last Battle is the series' most divisive book — a final reckoning with the destruction of Narnia and what comes after. Some readers find the ending transcendent. Others find it troubling in ways the earlier books do not prepare you for. It won the Carnegie Medal. It requires all six previous books to land properly. Go in knowing it will not be comfortable.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'The Chronicles of Narnia',
      sublabel: 'read in this order',
      books: [
        {
          title: 'The Lion, the Witch and the Wardrobe',
          slug: 'the-lion-the-witch-and-the-wardrobe',
          status: 'mandatory',
          note: 'Start here. Four siblings discover Narnia through a wardrobe and find it trapped in eternal winter under the White Witch. Aslan has not been seen in years. The series at its most immediate — reads in a single sitting.',
          page_count: null,
          publication_year: 1950,
        },
        {
          title: 'Prince Caspian',
          slug: 'prince-caspian',
          status: 'mandatory',
          note: 'The Pevensies return to find Narnia changed beyond recognition — over a thousand years have passed and the old magic has been suppressed. Darker and more melancholic than LWW. The tension between faith in what you cannot see and the evidence in front of you runs through the whole book.',
          page_count: 216,
          publication_year: 1951,
        },
        {
          title: 'The Voyage of the Dawn Treader',
          slug: 'the-voyage-of-the-dawn-treader',
          status: 'mandatory',
          note: "Edmund, Lucy, and their insufferable cousin Eustace sail east toward the edge of the world. Episodic in structure — each island is its own story and its own temptation. Eustace's arc is the book's emotional core and one of the most effective character transformations in the series.",
          page_count: null,
          publication_year: 1952,
        },
        {
          title: 'The Silver Chair',
          slug: 'the-silver-chair',
          status: 'mandatory',
          note: "Eustace returns with Jill Scrubb to find a missing Narnian prince. The most straightforwardly quest-structured book in the series — linear, underground, and steadily unnerving. The Lady of the Green Kirtle is the series' best villain.",
          page_count: 217,
          publication_year: 1953,
        },
        {
          title: 'The Horse and His Boy',
          slug: 'the-horse-and-his-boy',
          status: 'mandatory',
          note: "Set during the reign of the Pevensies — concurrently with LWW — but the Narnia children are minor characters. The protagonist is Shasta, a Calormene boy, and Bree, a talking horse trying to reach Narnia. The series' most standalone entry and the most different in setting: desert kingdoms, scheming viziers, and a very different view of Aslan.",
          page_count: 208,
          publication_year: 1954,
        },
        {
          title: "The Magician's Nephew",
          slug: 'the-magicians-nephew',
          status: 'mandatory',
          note: "The origin story — how Narnia was created, how the White Witch first entered the world, and how a wardrobe came to be magical. Everything it reveals lands as discovery rather than setup. The image of Narnia's creation hits entirely differently once you know what Narnia becomes.",
          page_count: 186,
          publication_year: 1955,
        },
        {
          title: 'The Last Battle',
          slug: 'the-last-battle',
          status: 'mandatory',
          note: "The end of Narnia. A false Aslan, a collapsing kingdom, and a reckoning that divides readers to this day. The emotional weight of what is lost depends entirely on how much you have invested across the previous six books. Won the Carnegie Medal. Will not leave you neutral.",
          page_count: 192,
          publication_year: 1956,
        },
      ],
    },
  ],
  sections: [
    {
      heading: 'Where to start',
      type: 'bullets',
      bullets: [
        "Always begin with The Lion, the Witch and the Wardrobe — regardless of which order you choose overall. It is the original entry point, the most iconic book in the series, and the one that establishes what Narnia is before any backstory is needed. If your copy is numbered with The Magician's Nephew as #1, ignore the number.",
        "If you are reading with children, publication order is even more important. The Magician's Nephew opens slowly and abstractly — LWW hooks within the first chapter and does not let go.",
      ],
    },
    {
      heading: 'The reading order debate',
      type: 'bullets',
      bullets: [
        "The resequencing originated with a 1957 letter C.S. Lewis wrote to a young American reader named Laurence, who had asked whether chronological or publication order was preferable. Lewis replied that the chronological approach might work well. Publishers later used this as editorial justification to renumber the books in the 1990s. Most Lewis scholars now treat the letter as a polite reply to a child, not a considered authorial directive.",
        "The core argument for chronological order misunderstands how origin stories function. The Magician's Nephew is only moving because you already know what the wardrobe becomes, who Aslan is, and what Narnia will eventually mean. Strip that foreknowledge and the origin story is just a creation myth. The emotional weight of watching Narnia come into being requires knowing what it will cost.",
        "If you have already read the series in chronological order, you have not made a serious mistake. The books are good enough that the reading order debate matters less than the books themselves.",
      ],
    },
    {
      heading: 'Things worth knowing',
      type: 'bullets',
      bullets: [
        "Lewis dedicated The Lion, the Witch and the Wardrobe to his goddaughter Lucy Barfield. The Lucy in the books is named after her.",
        "The name Narnia comes from Narni, a small medieval town in Umbria, Italy. Lewis found it on a map of Roman settlements and liked the sound of it.",
        "All seven books were written in six years — between 1950 and 1956 — while Lewis was simultaneously producing major works of academic scholarship and Christian apologetics. The pace was extraordinary.",
        "The books were illustrated from the first edition by Pauline Baynes, who also illustrated Tolkien's Farmer Giles of Ham. Her drawings are still used in most editions. Lewis was delighted by them.",
        "The Chronicles of Narnia have sold over 100 million copies in 47 languages and have never been out of print.",
        "The image Lewis started with — a Faun carrying an umbrella and parcels in a snowy wood — came to him at the age of 16. He was 52 when he finally wrote it into a book.",
      ],
    },
    {
      heading: 'The Problem of Susan',
      type: 'spoiler',
      prose:
        "The Last Battle excludes Susan Pevensie from Narnia's final salvation. Lewis explains it obliquely — she has grown up and left Narnia behind, now interested in nylons, lipstick, and invitations. The implication is that she chose the wrong things. J.R.R. Tolkien found this troubling. Philip Pullman has cited it as a significant moral objection to the series as a whole. Many readers who love Narnia deeply consider Susan's handling the one part of it that does not sit right. It is the most debated moment in the books after the reading order itself.",
    },
  ],
  darkness: [
    {
      label: 'The series overall',
      level: 1,
      desc: "Gentle children's fantasy — danger is present but handled lightly; Aslan's death and resurrection in LWW is the most intense passage in books 1–6",
    },
    {
      label: 'The Last Battle',
      level: 2,
      desc: 'The darkest entry — the destruction of Narnia, the deaths of most major characters, and some genuinely disturbing imagery involving the Dwarfs',
    },
  ],
  metaDescription:
    'The complete Chronicles of Narnia reading order — publication vs chronological order explained, with notes on all seven C.S. Lewis books.',
  shortName: 'Narnia',
  booksLikeSlug: 'the-chronicles-of-narnia',
  finishedLabel: 'Finished Narnia?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: ['earthsea', 'middle-earth', 'inheritance-cycle', 'rick-riordan', 'old-kingdom', 'shannara'],
  lastUpdated: '2026-05-25',
};
