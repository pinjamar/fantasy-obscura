import type { ReadingOrderEntry } from '../reading-orders';

export const narnia: ReadingOrderEntry = {
  slug: 'narnia',
  name: 'The Chronicles of Narnia',
  author: 'C.S. Lewis',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 7 books (1950-1956)',
  description:
    "Seven books set in a world you can reach through an ordinary wardrobe, a painting on a wall, or a pair of magic rings. C.S. Lewis wrote The Chronicles of Narnia between 1950 and 1956, producing the entire series while simultaneously working as an Oxford academic and Christian apologist. The books are warm, imaginative, and saturated in Christian allegory that becomes more explicit the deeper you go. Aslan is a clear Christ figure. The Last Battle draws heavily from Revelation. Lewis never tried to conceal any of this. The series has never been out of print and remains the most widely read Christian allegory in English fiction.",
  darknessDisplay:
    '🕯️ Gentle - danger is present but never graphic; The Last Battle is the darkest entry',
  warning:
    "Most modern editions number The Magician's Nephew as book 1. That's a 1990s publishing decision, not what Lewis wanted. Start with The Lion, the Witch and the Wardrobe no matter what the spine says.",
  orderNote:
    "Start with The Lion, the Witch and the Wardrobe. Publication vs chronological is the most contested reading order question in classic children's fantasy; this guide explains both and recommends publication order.",
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ C.S. Lewis',
      body: 'Lewis was a professor of Medieval and Renaissance Literature at Oxford (and later Cambridge). Former atheist who converted to Christianity in his early thirties. The image of a faun with an umbrella walking through a snowy wood had been stuck in his head since he was sixteen. He finally wrote The Lion, the Witch and the Wardrobe when he was 52. He died on November 22, 1963 (same day as JFK and Aldous Huxley) and got almost no coverage because of it.',
      color: 'blue',
    },
    {
      title: '✝️ The Allegory',
      body: "Narnia is Christian allegory, and Lewis never tried to hide it. Aslan is a clear Christ figure. His death and resurrection in the first book mirror the Passion. The Last Battle draws heavily from Revelation. Lewis was also a prominent Christian apologist (Mere Christianity, The Screwtape Letters). The allegory is woven into the structure of the books, not layered on top.",
      color: 'purple',
    },
    {
      title: '📚 Publication vs Chronological',
      body: "There are two ways to read them: publication order (the order Lewis wrote and released them) and chronological order (in-world timeline, with The Magician's Nephew first). Modern box sets defaulted to chronological after a 1994 HarperCollins resequencing based on a 1957 letter Lewis wrote to a young reader. Lewis scholars treat the letter as a polite reply to a child, not a considered authorial directive. Publication order is the recommendation here.",
      color: 'amber',
    },
    {
      title: '🦁 Why Publication Order Wins',
      body: "The Lion, the Witch and the Wardrobe hits so hard because you know nothing about Narnia when you step through that wardrobe. The wonder, the danger, Aslan, the White Witch: they land. The Magician's Nephew is an origin story, and origin stories only feel significant when you already love the world they're explaining. Read it sixth (as Lewis intended) and the creation of the wardrobe is a genuine discovery. Read it first and it's setup for a world you don't yet care about.",
      color: 'blue',
    },
    {
      title: '🤝 Lewis and Tolkien',
      body: 'Lewis and J.R.R. Tolkien were both in the Inklings, the Oxford group that met to drink, smoke, and read their works-in-progress out loud. Tolkien actually helped Lewis convert to Christianity. But Tolkien hated Narnia. He thought the allegory was too blunt, the world-building too sloppy, and the mix of Father Christmas, fauns, and Norse dwarves was a mess. Their friendship survived, but Tolkien never came around on the series.',
      color: 'green',
    },
    {
      title: '🔚 The Last Battle',
      body: "The most divisive book in the series. Lewis writes the end of Narnia as a Revelation-inflected reckoning: what survives, what is lost, and who gets to enter what comes after. The ending is theologically explicit in ways the earlier books are not. It won the Carnegie Medal. The question of what Lewis does with Susan Pevensie here has been debated by readers, scholars, and other authors for seventy years.",
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
          note: 'Start here. Four siblings discover Narnia through a wardrobe and find it trapped in eternal winter under the White Witch. Aslan has not been seen in years. The series at its most immediate; it reads in a single sitting.',
          page_count: null,
          publication_year: 1950,
        },
        {
          title: 'Prince Caspian',
          slug: 'prince-caspian',
          status: 'mandatory',
          note: 'The Pevensies return to find Narnia changed beyond recognition: over a thousand years have passed and the old magic has been suppressed. Darker and more melancholic than The Lion, the Witch and the Wardrobe. The tension between faith in what you cannot see and the evidence in front of you runs through the whole book.',
          page_count: 216,
          publication_year: 1951,
        },
        {
          title: 'The Voyage of the Dawn Treader',
          slug: 'the-voyage-of-the-dawn-treader',
          status: 'mandatory',
          note: "Edmund, Lucy, and their insufferable cousin Eustace sail east toward the edge of the world. Episodic in structure: each island is its own story and its own temptation. Eustace's arc is the book's emotional core and one of the most effective character transformations in the series.",
          page_count: null,
          publication_year: 1952,
        },
        {
          title: 'The Silver Chair',
          slug: 'the-silver-chair',
          status: 'mandatory',
          note: "Eustace returns with Jill Scrubb to find a missing Narnian prince. The most straightforwardly quest-structured book in the series: linear, underground, and steadily unnerving. The Lady of the Green Kirtle is the series' best villain.",
          page_count: 217,
          publication_year: 1953,
        },
        {
          title: 'The Horse and His Boy',
          slug: 'the-horse-and-his-boy',
          status: 'mandatory',
          note: "Set during the reign of the Pevensies (concurrently with The Lion, the Witch and the Wardrobe) but the Narnia children are minor characters. The protagonist is Shasta, a Calormene boy, and Bree, a talking horse trying to reach Narnia. The most standalone entry in the series and the most different in setting: desert kingdoms, scheming viziers, and a very different view of Aslan.",
          page_count: 208,
          publication_year: 1954,
        },
        {
          title: "The Magician's Nephew",
          slug: 'the-magicians-nephew',
          status: 'mandatory',
          note: "The origin story: how Narnia was created, how the White Witch first entered the world, and how a wardrobe came to be magical. Everything it reveals lands as discovery rather than setup. The image of Narnia's creation reads entirely differently once you know what Narnia becomes.",
          page_count: 186,
          publication_year: 1955,
        },
        {
          title: 'The Last Battle',
          slug: 'the-last-battle',
          status: 'mandatory',
          note: 'The end of Narnia. A false Aslan, a collapsing kingdom, and a reckoning that divides readers to this day. The emotional weight of what is lost depends entirely on how much you have invested across the previous six books. Won the Carnegie Medal. Will not leave you neutral.',
          page_count: 192,
          publication_year: 1956,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Aslan',
      role: 'The lion; the Christ figure; the narrative anchor',
      color: 'amber',
      why_they_work:
        "He does not appear in every book, and when he does appear, his role shifts. The series uses his absence more than his presence as a structural tool: what characters choose when Aslan is not there is what the books are actually about. The allegory is unmistakable but it does not reduce him.",
    },
    {
      name: 'Lucy Pevensie',
      role: 'The first to discover Narnia',
      color: 'blue',
      why_they_work:
        "She is right every time the others do not believe her. Lewis is not subtle about this: it is a structural choice, not incidental. Lucy functions as the reader's anchor in a world where everything else is uncertain.",
    },
    {
      name: 'Edmund Pevensie',
      role: 'The traitor; the redeemed one',
      color: 'zinc',
      why_they_work:
        "The traitor arc in The Lion, the Witch and the Wardrobe is completed without sentimentality and without being revisited. Edmund is a fully different person in every book after the first. Lewis does not use the redemption as an ongoing plot device.",
    },
    {
      name: 'Eustace Scrubb',
      role: 'The insufferable cousin; the most developed arc',
      color: 'green',
      why_they_work:
        "Gets the most sustained character development across multiple books. The Voyage of the Dawn Treader transforms him; The Silver Chair tests whether the transformation held. His arc is the only one in the series that spans two complete narratives.",
    },
  ],
  sections: [
    {
      heading: 'The reading order debate',
      type: 'bullets',
      bullets: [
        "The resequencing originated with a 1957 letter C.S. Lewis wrote to a young American reader named Laurence, who asked whether chronological or publication order was preferable. Lewis replied that the chronological approach might work well. Publishers used this as editorial justification to renumber the books in the 1990s. Lewis scholars treat the letter as a polite reply to a child, not a considered authorial directive.",
        "If reading with children, publication order matters more. The Magician's Nephew opens slowly and abstractly. The Lion, the Witch and the Wardrobe hooks within the first chapter. Starting with the origin story removes the magic from the discovery.",
        "If you have already read the series in chronological order, the books hold up. The reading order shapes the experience of The Magician's Nephew specifically. Everything else reads the same either way.",
      ],
    },
    {
      heading: 'Things worth knowing',
      type: 'bullets',
      bullets: [
        'Lewis dedicated The Lion, the Witch and the Wardrobe to his goddaughter Lucy Barfield. The Lucy in the books is named after her.',
        'The name Narnia comes from Narni, a small medieval town in Umbria, Italy. Lewis found it on a map of Roman settlements and liked the sound of it.',
        'All seven books were written in six years (between 1950 and 1956) while Lewis was simultaneously producing major works of academic scholarship and Christian apologetics.',
        "The books were illustrated from the first edition by Pauline Baynes, who also illustrated Tolkien's Farmer Giles of Ham. Her drawings are still used in most editions.",
        'The Chronicles of Narnia have sold over 100 million copies in 47 languages and have never been out of print.',
        'The image Lewis started with (a Faun carrying an umbrella and parcels in a snowy wood) came to him at age 16. He was 52 when he finally wrote it into a book.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Violence is present but handled lightly throughout books 1-6. Aslan's death in The Lion, the Witch and the Wardrobe is the most intense passage. The Last Battle involves the deaths of most major characters and the destruction of Narnia itself.",
        "Romance: none. These are children's books; relationships are familial and friendship-based throughout.",
        'No explicit content of any kind.',
        "Right for: readers who want classic children's epic fantasy with a strong moral and Christian framework. Not right for: readers who find religious allegory intrusive, or who are sensitive to Lewis's handling of Susan Pevensie in The Last Battle.",
      ],
    },
    {
      heading: 'The Problem of Susan',
      type: 'spoiler',
      prose:
        "The Last Battle excludes Susan Pevensie from Narnia's final salvation. Lewis explains it obliquely: she has grown up and left Narnia behind, now interested in nylons, lipstick, and invitations. The implication is that she chose the wrong things. J.R.R. Tolkien found this troubling. Philip Pullman has cited it as a significant moral objection to the series as a whole. Susan's handling is the most debated moment in the books after the reading order itself. Unlike the reading order debate, it has no clean resolution.",
    },
  ],
  darkness: [
    {
      label: 'The series overall',
      level: 1,
      desc: "Gentle children's fantasy - danger is present but handled lightly; Aslan's death and resurrection in The Lion, the Witch and the Wardrobe is the most intense passage in books 1-6",
    },
    {
      label: 'The Last Battle',
      level: 2,
      desc: 'The darkest entry - the destruction of Narnia, the deaths of most major characters, and some genuinely disturbing imagery involving the Dwarfs',
    },
  ],
  metaDescription:
    'The complete Chronicles of Narnia reading order - publication vs chronological order explained, with notes on all seven C.S. Lewis books.',
  shortName: 'Narnia',
  booksLikeSlug: 'the-chronicles-of-narnia',
  finishedLabel: 'Finished Narnia?',
  categoryHref: '/fantasy/epic',
  categoryLabel: 'Browse Epic Fantasy',
  related: [
    'earthsea',
    'middle-earth',
    'inheritance-cycle',
    'rick-riordan',
    'old-kingdom',
    'shannara',
  ],
  lastUpdated: '2026-06-26',
};
