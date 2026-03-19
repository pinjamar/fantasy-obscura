export interface BooksLikeRec {
  title: string;
  author: string;
  cover_url: string;
  darkness_level: number; // 1-5
  heat_level?: string | null; // e.g. 'Open Door', 'Explicit', 'Fiery' — omit for non-romance
  tags: string[]; // similarity elements e.g. ['Enemies to Lovers', 'Fae Courts']
  why: string; // 3-4 sentences + caveat
  standalone: boolean;
  audiobook: boolean;
  amazon_url: string;
  bookshop_url: string;
}

export interface BooksLikeAspectRec {
  title: string;
  author: string;
  author_note?: string; // e.g. "(yes, more Sanderson — unavoidable)"
  cover_url: string;
  darkness_level: number;
  heat_level?: string | null;
  standalone: boolean;
  series?: string; // e.g. "The Stormlight Archive"
  series_number?: number; // e.g. 1
  series_label?: string; // e.g. "Series (10 books planned)" — overrides default "Series"
  audiobook: boolean;
  note: string; // aspect-specific description + caveat
  tags: string[];
  warning?: string; // content warning
  amazon_url: string;
  bookshop_url: string;
}

export interface BooksLikeAspect {
  heading: string; // "If you loved the enemies-to-lovers tension..."
  recs: BooksLikeAspectRec[];
}

export interface BooksLikeEntry {
  slug: string;
  source: {
    title: string;
    author: string;
    db_slug?: string; // override when DB slug differs from title-based slug
    cover_url: string;
    darkness_level: number;
    heat_level?: string | null;
    series?: string | null;
    series_number?: number | null;
    tropes: string[];
    why_people_love: string; // one honest paragraph, not a plot summary
    angle?: string; // short subgenre hook for title tag e.g. "Dark Romantasy with Forbidden Heat"
    answer_line?: string; // one sentence above recs e.g. "If you loved X for Y, start with A, B, and C."
  };
  aspects: BooksLikeAspect[];
  recommendations: BooksLikeRec[];
  related: Array<{ title: string; slug: string }>; // 3 related Books Like pages
}

const DARKNESS_LEVELS: Array<{
  candles: string;
  label: string;
  desc: string;
} | null> = [
  null,
  {
    candles: '🕯️',
    label: 'Lighthearted',
    desc: 'Cozy, low stakes and emotionally safe',
  },
  {
    candles: '🕯️🕯️',
    label: 'Mild',
    desc: 'Some danger and tension, but generally safe in tone',
  },
  {
    candles: '🕯️🕯️🕯️',
    label: 'Serious',
    desc: 'Death, violence and emotional weight are present',
  },
  {
    candles: '🕯️🕯️🕯️🕯️',
    label: 'Dark',
    desc: 'Violence, trauma and morally harsh outcomes',
  },
  {
    candles: '🕯️🕯️🕯️🕯️🕯️',
    label: 'Brutal',
    desc: 'Extreme violence and suffering, no mercy',
  },
];
export const getDarkness = (level: number) => DARKNESS_LEVELS[level] ?? null;
export const darknessCandles = (level: number) =>
  DARKNESS_LEVELS[level]?.candles ?? '';
export const darknessLabel = (level: number) =>
  DARKNESS_LEVELS[level]?.label ?? '';

export const HEAT: Record<
  string,
  { flames: string; label: string; desc: string }
> = {
  'Sweet Romance': {
    flames: '🔥',
    label: 'Sweet / Clean',
    desc: 'Kisses only; focus on emotional connection',
  },
  'Closed Door': {
    flames: '🔥🔥',
    label: 'Fade to Black',
    desc: 'Tension is there, but we leave before the clothes do',
  },
  'Open Door': {
    flames: '🔥🔥🔥',
    label: 'Open Door',
    desc: "Explicit scenes, but they don't dominate",
  },
  Explicit: {
    flames: '🔥🔥🔥🔥',
    label: 'Explicit / Spicy',
    desc: 'Graphic detail and high frequency',
  },
  Fiery: {
    flames: '🔥🔥🔥🔥🔥',
    label: 'Fiery / Primal',
    desc: 'Extreme heat, often including kink',
  },
};
export const getHeat = (level?: string | null) =>
  level ? (HEAT[level] ?? null) : null;

export const BOOKS_LIKE: BooksLikeEntry[] = [
  {
    slug: 'a-court-of-silver-flames',
    source: {
      title: 'A Court of Silver Flames (ACOSF)',
      author: 'Sarah J. Maas',
      db_slug: 'a-court-of-silver-flames',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781635575613-L.jpg',
      darkness_level: 3,
      heat_level: 'Fiery',
      series: 'A Court of Thorns and Roses',
      series_number: 4,
      tropes: [
        'Enemies to Lovers',
        'Fae Courts',
        'Illyrian Warriors',
        'Trauma Recovery',
        'Found Family',
        'Forced Proximity',
        'Female Rage',
      ],
      angle: 'Spicy Enemies-to-Lovers Romantasy',
      answer_line:
        'If you loved A Court of Silver Flames for the intense character healing, explicit romance, sharp-edged chemistry, and warrior-training arc, start with From Blood and Ash, Kingdom of the Wicked and Fourth Wing.',
      why_people_love:
        "ACOSF works for a different reason than the earlier ACOTAR books: Nesta is not likeable, and Maas doesn't try to make her so. She starts the book drunk, angry, and actively self-destructing — and the slow process of watching her stop performing fine is more compelling than any of Feyre's heroics. Cassian earns his love interest status by refusing to leave someone alone who is trying very hard to be left alone. The Valkyrie training arc gives the book its spine; the seething antagonism between two people who are essentially the same stubborn, prideful mess gives it its pulse. The spice level is higher than any previous ACOTAR book. If that's what you came for, it delivers. If you preferred the earlier books' adventure-forward pacing, this is slower and more internal.",
    },
    aspects: [
      {
        heading:
          'If you loved the seething, weaponised hate-to-love dynamic between Nesta and Cassian...',
        recs: [
          {
            title: 'From Blood and Ash',
            author: 'Jennifer L. Armentrout',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg',
            darkness_level: 3,
            heat_level: 'Explicit',
            standalone: false,
            series: 'Blood and Ash',
            series_number: 1,
            series_label: 'Series (6 books)',
            audiobook: true,
            note: "The most direct structural match for ACOSF's dynamic: a heroine kept sheltered and powerless, a guard assigned to protect her who clearly feels more than he should, and a romance built entirely on charged hostility that neither of them will admit to. Hawke is essentially Cassian with a bigger secret. The heat level is equivalent, the slow build is there, and the world-building reward for sticking with the series is substantial. The heroine is softer than Nesta — some readers prefer that; others will miss the equal-sized ego clash.",
            tags: [
              'Enemies to Lovers',
              'Guard & Ward',
              'Forbidden Romance',
              'Explicit',
              'Dark Secrets',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=From+Blood+and+Ash+Jennifer+Armentrout',
            bookshop_url:
              'https://bookshop.org/search?keywords=From+Blood+and+Ash',
          },
          {
            title: 'Kingdom of the Wicked',
            author: 'Kerri Maniscalco',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316428354-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'Kingdom of the Wicked',
            series_number: 1,
            series_label: 'Series (3 books)',
            audiobook: true,
            note: 'Victorian Sicily setting, a deal with a demon prince, and a heroine who meets her love interest with absolute contempt and never fully loses it. The chemistry between Emilia and Wrath is built on mutual antagonism and barely-leashed respect — the same push-pull engine that drives the Nesta/Cassian dynamic. Lower heat than ACOSF, but the tension is palpable throughout. The mythology is rich and the atmosphere is thick with sensory detail. Caveat: the mystery plot is less developed than the romance — go in for the dynamic, not the whodunit.',
            tags: [
              'Enemies to Lovers',
              'Deal with a Demon',
              'Gothic Atmosphere',
              'Historical Setting',
              'Slow Burn',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Kingdom+of+the+Wicked+Kerri+Maniscalco',
            bookshop_url:
              'https://bookshop.org/search?keywords=Kingdom+of+the+Wicked+Maniscalco',
          },
        ],
      },
      {
        heading:
          "If you loved Nesta's arc — a damaged woman who refuses to be saved, learning to save herself...",
        recs: [
          {
            title: 'The Poppy War',
            author: 'R.F. Kuang',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780062662569-L.jpg',
            darkness_level: 5,
            heat_level: null,
            standalone: false,
            series: 'The Poppy War',
            series_number: 1,
            series_label: 'Series (3 books)',
            audiobook: true,
            note: "Rin's arc is the grimdark mirror of Nesta's: a young woman from nothing who discovers power she was told she shouldn't have, surrounded by institutions that underestimate her, making increasingly terrible choices because the alternative is extinction. The self-destruction is real here — Kuang doesn't soften it. No romance, no spice, and the darkness is far more brutal than ACOSF. But if Nesta's rage and refusal to perform wellness was what resonated, Rin takes that archetype to its logical extreme.",
            tags: [
              'Female Rage',
              'Trauma Arc',
              'Power at a Cost',
              'Military Fantasy',
              'Dark Magic',
            ],
            warning:
              'Extreme violence, genocide, substance addiction, war crimes.',
            amazon_url: 'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Poppy+War+Kuang',
          },
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: 'Two characters in impossible situations finding each other across the worst possible circumstances. Laia starts the series as someone everyone underestimates — including herself — and her arc is learning to stop apologising for taking up space. The training sequences, the military world-building, and the sense of being trapped inside an institution designed to crush you all mirror ACOSF. Much lower heat, but the emotional intensity matches. The series sustains its quality across all four books, which is rarer than it should be.',
            tags: [
              'Dual POV',
              'Military Fantasy',
              'Slow Burn',
              'Hidden Power',
              'Resistance',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url:
              'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
          },
        ],
      },
      {
        heading:
          'If you loved the Valkyrie training, Illyrian culture and the depth of the Fae world...',
        recs: [
          {
            title: 'Fourth Wing',
            author: 'Rebecca Yarros',
            cover_url:
              'https://books.google.com/books/publisher/content/images/frontcover/2BKGEAAAQBAJ?fife=w400-h600',
            darkness_level: 4,
            heat_level: 'Explicit',
            standalone: false,
            series: 'The Empyrean',
            series_number: 1,
            series_label: 'Series (5 books planned)',
            audiobook: true,
            note: "If the Valkyrie training — the physical grind, the military hierarchy, the sense of women proving themselves in an institution built to keep them out — was the part of ACOSF that grabbed you, Fourth Wing is the obvious next stop. Dragon riders, a war college that will kill you as easily as train you, and a romance between two people on opposite sides of a secret. The world-building is different but the energy is nearly identical: women being told they don't belong, and being unreasonably correct about their right to be there anyway.",
            tags: [
              'Dragon Riders',
              'Military Academy',
              'Enemies to Lovers',
              'War Fantasy',
              'Explicit',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Fourth+Wing+Rebecca+Yarros',
            bookshop_url:
              'https://bookshop.org/search?keywords=Fourth+Wing+Yarros',
          },
          {
            title: 'Shadow and Bone',
            author: 'Leigh Bardugo',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250027436-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'Shadow and Bone',
            series_number: 1,
            series_label: 'Series (3 books + spinoffs)',
            audiobook: true,
            note: "The Grishaverse is the natural world-building companion to ACOTAR: military factions with specific magical abilities, a court that's gorgeous and predatory in equal measure, and a heroine who discovers power she never knew she had. Bardugo's prose is sharper and more controlled than Maas's, and the mythology draws from Russian folklore in a way ACOTAR doesn't. Lower heat, but Six of Crows — set in the same world — is where the franchise truly opens up.",
            tags: [
              'Military Fantasy',
              'Magical Abilities',
              'Hidden Power',
              'Slow Burn',
              'Court Politics',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Shadow+and+Bone+Leigh+Bardugo',
            bookshop_url:
              'https://bookshop.org/search?keywords=Shadow+and+Bone+Bardugo',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like ACOTAR', slug: 'acotar' },
      { title: 'Books Like Fourth Wing', slug: 'fourth-wing' },
      { title: 'Books Like From Blood and Ash', slug: 'from-blood-and-ash' },
    ],
  },
  {
    slug: 'acotar',
    source: {
      title: 'A Court of Thorns and Roses (ACOTAR)',
      author: 'Sarah J. Maas',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781619634459-L.jpg',
      darkness_level: 3,
      heat_level: 'Open Door',
      series: 'A Court of Thorns and Roses',
      series_number: 1,
      tropes: [
        'Fae Courts',
        'Enemies to Lovers',
        'Beauty & the Beast',
        'Chosen One',
        'Power at a Cost',
      ],
      angle: 'Fae Court Romantasy',
      answer_line:
        'If you loved A Court of Thorns and Roses for the fae courts, slow-burn romance, dangerous glamour and escalating emotional stakes, start with The Cruel Prince, From Blood and Ash, and Fourth Wing.',
      why_people_love:
        "ACOTAR earns its fanbase through one thing above all else: the slow-burn tension of Feyre and Tamlin that quietly pivots into something far more interesting by book two. It's not the most original premise — Beauty and the Beast in Faerie — but Maas is genuinely skilled at dangling just enough emotional reward to keep you turning pages past midnight. The real hook isn't the romance; it's watching a character who started as a passive survivor become someone terrifyingly capable. Fair warning: book one is the weakest in the series. If you're lukewarm by chapter ten, push through to ACOMAF — that's where the series earns its reputation.",
    },
    aspects: [
      {
        heading: 'If you loved the enemies-to-lovers slow burn...',
        recs: [
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: 'Two POVs, both trapped in impossible situations, both drawn to each other despite every reason not to be. The slow burn here is arguably executed better than in most romantasy — the tension earns its payoff across the full series. Caveat: this leans more toward dark epic fantasy than romantasy. Much less spice, much more stakes. If you read ACOTAR primarily for the romance, recalibrate.',
            tags: ['Dual POV', 'Military Fantasy', "Will They Won't They"],
            amazon_url:
              'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url:
              'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
          },
          {
            title: 'From Blood and Ash',
            author: 'Jennifer L. Armentrout',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg',
            darkness_level: 3,
            heat_level: 'Explicit',
            standalone: false,
            series: 'Blood and Ash',
            series_number: 1,
            series_label: 'Series (6 books)',
            audiobook: true,
            note: "The guard-and-ward forbidden romance executed with real heat. Hawke and Poppy have the same push-pull chemistry as Feyre and Rhysand — the power imbalance, the secrets, the tension that refuses to resolve cleanly. If ACOTAR's main hook for you was the forbidden element and the spice, this delivers both more directly. Caveat: the writing is more functional than literary. You're here for the romance and the lore drops, not the prose.",
            tags: [
              'Forbidden Romance',
              'Guard & Ward',
              'Spicy',
              'Enemies to Lovers',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=From+Blood+and+Ash+Jennifer+Armentrout',
            bookshop_url:
              'https://bookshop.org/search?keywords=From+Blood+and+Ash',
          },
        ],
      },
      {
        heading: 'If you loved the Fae courts and political intrigue...',
        recs: [
          {
            title: 'Kingdom of the Wicked',
            author: 'Kerri Maniscalco',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316428354-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: false,
            series: 'Kingdom of the Wicked',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "Victorian Sicily meets demon mythology. Emilia and Wrath have sharp banter and the enemies-to-lovers dynamic has somewhere to go — a murder mystery gives the tension structure. The atmosphere is vivid and the morally questionable love interest is handled with the same knowing craft as ACOTAR's Rhysand. Caveat: the mystery itself is thin. You're really here for the banter and the setting.",
            tags: ['Demons', 'Historical Setting', 'Dark Romance'],
            amazon_url:
              'https://www.amazon.com/s?k=Kingdom+of+the+Wicked+Kerri+Maniscalco',
            bookshop_url:
              'https://bookshop.org/search?keywords=Kingdom+of+the+Wicked',
          },
          {
            title: 'The Cruel Prince',
            author: 'Holly Black',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316310314-L.jpg',
            darkness_level: 4,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'The Folk of the Air',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "If ACOTAR is the gateway drug, The Cruel Prince is what comes next. Holly Black's Fae are genuinely unsettling — cruel, capricious, not safely romantic — and the political scheming in the courts is more sophisticated than anything in ACOTAR book one. Caveat: far less spice, much more brain.",
            tags: ['Fae Courts', 'Political Intrigue', 'Enemies to Lovers'],
            amazon_url:
              'https://www.amazon.com/s?k=The+Cruel+Prince+Holly+Black',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Cruel+Prince+Holly+Black',
          },
          {
            title: 'Strange the Dreamer',
            author: 'Laini Taylor',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316341677-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'Strange the Dreamer',
            series_number: 1,
            series_label: 'Series (duology)',
            audiobook: true,
            note: 'If the lush, atmospheric world-building of ACOTAR was your hook, Strange the Dreamer is the most beautifully written book on this list. Laini Taylor builds mythology the way Maas builds romance — layered, immersive, and structured around one central mystery that keeps unfolding. The forbidden romance between Lazlo and Sarai has real emotional stakes. Caveat: slower and more literary than ACOTAR. Less spice, more ache.',
            tags: [
              'Lush World-Building',
              'Forbidden Romance',
              'Mythology',
              'Dreamer Magic',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Strange+the+Dreamer+Laini+Taylor',
            bookshop_url:
              'https://bookshop.org/search?keywords=Strange+the+Dreamer+Laini+Taylor',
          },
        ],
      },
      {
        heading: 'If you want something darker and less romance-forward...',
        recs: [
          {
            title: 'The Priory of the Orange Tree',
            author: 'Samantha Shannon',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: 'The antidote to series commitment: an 848-page standalone epic with dragons, political intrigue across three continents, and a slow-burn romance that earns its payoff. The worldbuilding is dense and original, the female characters are fully realised. Caveat: this is first and foremost epic fantasy with romantic threads — not romantasy. The ratio of plot to romance is inverted compared to ACOTAR.',
            tags: ['Dragons', 'Epic Fantasy', 'Sapphic Romance', 'Standalone'],
            amazon_url:
              'https://www.amazon.com/s?k=The+Priory+of+the+Orange+Tree+Samantha+Shannon',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Priory+of+the+Orange+Tree',
          },
        ],
      },
      {
        heading: 'If you want a standalone before committing to a series...',
        recs: [
          {
            title: 'Uprooted',
            author: 'Naomi Novik',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780804179058-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: 'A fairy-tale standalone with a morally complex, powerful love interest and a female protagonist who discovers terrifying magic within herself — the emotional DNA is similar enough to ACOTAR to scratch the itch without demanding a multi-book commitment. The tension between Agnieszka and the Dragon is slow, sharp, and earns its resolution. Caveat: no spice and significantly less romance-forward. The magic and the forest are the real draw.',
            tags: [
              'Fairy-Tale Vibes',
              'Slow Burn',
              'Female Power',
              'Standalone',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Uprooted+Naomi+Novik',
            bookshop_url:
              'https://bookshop.org/search?keywords=Uprooted+Naomi+Novik',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'A Court of Mist and Fury',
        author: 'Sarah J. Maas',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781619634466-L.jpg',
        darkness_level: 4,
        heat_level: 'Explicit',
        tags: [
          'Fae Courts',
          'Enemies to Lovers',
          'Found Family',
          'PTSD Recovery',
          'Same Author',
        ],
        why: "The book that turned ACOTAR from a decent romantasy into a phenomenon. The power dynamics shift completely, the world expands into something genuinely fascinating, and Rhysand becomes one of the genre's most discussed love interests for real reasons. It's darker, more emotionally honest, and significantly better written than book one. Caveat: if you loved Tamlin, you're going to have a complicated time here.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=A+Court+of+Mist+and+Fury+Sarah+J+Maas',
        bookshop_url:
          'https://bookshop.org/search?keywords=A+Court+of+Mist+and+Fury',
      },
      {
        title: 'The Cruel Prince',
        author: 'Holly Black',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780316310314-L.jpg',
        darkness_level: 4,
        heat_level: 'Closed Door',
        tags: [
          'Fae Courts',
          'Enemies to Lovers',
          'Political Scheming',
          'Morally Grey Characters',
        ],
        why: "If ACOTAR is the gateway drug, The Cruel Prince is what comes next. Holly Black's Fae are genuinely unsettling — cruel, capricious, not safely romantic — and Jude is a far more interesting protagonist than Feyre in book one. The enemies-to-lovers tension is sharper, the political scheming more satisfying. Caveat: far less spice, much more brain. If you read ACOTAR primarily for the romance, recalibrate expectations.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Cruel+Prince+Holly+Black',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Cruel+Prince+Holly+Black',
      },
      {
        title: 'An Ember in the Ashes',
        author: 'Sabaa Tahir',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
        darkness_level: 4,
        heat_level: 'Sweet Romance',
        tags: [
          'Enemies to Lovers',
          'Dual POV',
          'Military Fantasy',
          'Oppressive Empire',
          "Will They Won't They",
        ],
        why: 'The enemies-to-lovers tension in this Roman-inspired fantasy is arguably executed better than in most romantasy. Two POVs, both trapped in impossible situations, both drawn to each other despite every reason not to be. The romance is slow, the stakes are genuinely high, and the world has weight beyond the relationship. Caveat: this leans more toward dark epic fantasy than romantasy — the romance is present but never dominates.',
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
        bookshop_url:
          'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
      },
      {
        title: 'From Blood and Ash',
        author: 'Jennifer L. Armentrout',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg',
        darkness_level: 3,
        heat_level: 'Explicit',
        tags: [
          'Enemies to Lovers',
          'Forbidden Romance',
          'Guard & Ward',
          'Spicy',
          'Mystery Origins',
        ],
        why: "If ACOTAR's main appeal for you was the forbidden romance and the heat, From Blood and Ash delivers that more directly. Hawke and Poppy have strong chemistry, the forbidden-romance tension is well-crafted, and the lore reveals in book one are genuinely surprising. Caveat: the writing is more functional than literary — you're here for the romance and plot twists, not prose. Spicier than ACOTAR book one.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=From+Blood+and+Ash+Jennifer+Armentrout',
        bookshop_url: 'https://bookshop.org/search?keywords=From+Blood+and+Ash',
      },
      {
        title: 'The Priory of the Orange Tree',
        author: 'Samantha Shannon',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg',
        darkness_level: 3,
        heat_level: 'Closed Door',
        tags: [
          'Dragons',
          'Matriarchal World',
          'Epic Fantasy',
          'Sapphic Romance',
          'Standalone',
        ],
        why: "The antidote to series commitment: a 848-page standalone epic with dragons, political intrigue across three continents, and a slow-burn romance that earns its payoff. The worldbuilding is dense and original, the female characters are fully realised, and there's a real sense that this world has existed for thousands of years before you arrived. Caveat: this is significantly less romance-forward than ACOTAR — it's first and foremost epic fantasy with romantic threads.",
        standalone: true,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Priory+of+the+Orange+Tree+Samantha+Shannon',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Priory+of+the+Orange+Tree',
      },
      {
        title: 'Kingdom of the Wicked',
        author: 'Kerri Maniscalco',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780316428354-L.jpg',
        darkness_level: 3,
        heat_level: 'Open Door',
        tags: [
          'Demons',
          'Enemies to Lovers',
          'Historical Setting',
          'Dark Romance',
          'Mythology',
        ],
        why: "Victorian Sicily meets demon mythology in a book that shares ACOTAR's gift for making morally questionable love interests irresistible. The tension between Emilia and Wrath is well-paced, the setting is vivid, and the murder mystery plot gives the enemies-to-lovers dynamic somewhere to actually go. Caveat: the mystery itself is somewhat thin — you're really here for the banter and the atmosphere.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=Kingdom+of+the+Wicked+Kerri+Maniscalco',
        bookshop_url:
          'https://bookshop.org/search?keywords=Kingdom+of+the+Wicked',
      },
    ],
    related: [
      { title: 'Books Like Fourth Wing', slug: 'fourth-wing' },
      {
        title: 'Books Like The Priory of the Orange Tree',
        slug: 'the-priory-of-the-orange-tree',
      },
      { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
    ],
  },
  {
    slug: 'a-game-of-thrones',
    source: {
      title: 'A Game of Thrones',
      author: 'George R.R. Martin',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780553593716-L.jpg',
      darkness_level: 5,
      heat_level: 'Explicit',
      series: 'A Song of Ice and Fire',
      series_number: 1,
      tropes: [
        'Multi-POV',
        'Political Intrigue',
        'No Safe Characters',
        'Morally Grey Cast',
        'Grimdark',
        'War & Conflict',
        'Subverted Heroism',
        'Dragons',
      ],
      angle: 'Dark Epic Fantasy with Political Intrigue',
      answer_line:
        'If you loved A Game of Thrones for the brutal politics, shifting loyalties, morally grey players, and constant sense that no one is safe, start with The First Law, The Poppy War and The Traitor Baru Cormorant.',
      why_people_love: `A Song of Ice and Fire broke every assumption readers had about what epic fantasy was allowed to do. Martin applied the political logic of real medieval history to a secondary world and refused to grant his protagonists narrative immunity — Ned Stark's death in book one established a contract with the reader that remained in force across five volumes: honourable intentions do not constitute plot armor, the world operates by power rather than justice, and the most decent character in the room is not the one who survives. The multi-POV structure is the series' formal masterstroke: because you understand why every faction does what it does, every betrayal is devastating rather than merely surprising. The prose is richer than most genre fiction, the political machinery — marriages, debts, succession crises, the weight of old wars — has the density of actual history, and the fantasy elements arrive late and sparingly, which makes them more powerful when they come. Five books and twenty-five years later, the ending remains unwritten, but the first three are among the finest work the genre has produced regardless.`,
    },
    aspects: [
      {
        heading:
          'If you loved the political realism and the no-safe-characters stakes...',
        recs: [
          {
            title: 'The Blade Itself',
            author: 'Joe Abercrombie',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'The First Law',
            series_number: 1,
            series_label:
              'Series (trilogy + 4 standalones + sequel trilogy, all complete)',
            audiobook: true,
            note: "The most direct heir to ASOIAF's political grimdark. Abercrombie uses the same multi-POV structure — characters with conflicting agendas converging on the same crisis — and applies Martin's logic that heroism is systematically punished. The First Law world operates by the same rules as Westeros: talent doesn't protect you, justice doesn't arrive on schedule, and the people who win are the ones who understand what the game actually is. The First Law trilogy is complete in three volumes and the standalone novels set in the same world are even better. The ending of the trilogy is one of the great gut-punch conclusions in modern fantasy. Caveat: smaller in immediate scale than ASOIAF, more focused cast, more obviously satirical about genre conventions.",
            tags: [
              'Political Realism',
              'No Safe Heroism',
              'Multi-POV',
              'Grimdark',
              'Complete Series',
            ],
            warning: 'Graphic violence, torture, war',
            amazon_url:
              'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
          },
          {
            title: 'The Traitor Baru Cormorant',
            author: 'Seth Dickinson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765380722-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'The Masquerade',
            series_number: 1,
            series_label: 'Series (4 books planned, 3 released)',
            audiobook: true,
            note: "The most rigorous application of political machinery in modern fantasy. Baru is an accountant working for an empire she intends to destroy from within, and Dickinson writes her political calculations with the same historical specificity Martin brings to the Lannister debt structure. Every chapter of Baru's success has a hidden cost that compounds — and the book is fundamentally about what happens to a person who believes they can use the tools of power without being changed by them. If the political architecture was the main draw — the way debt and obligation and institutional momentum shape every decision — this is the most serious escalation of that element. Caveat: deliberately devastating, the series is incomplete, and the first book ends without clean resolution.",
            tags: [
              'Political Machination',
              'No Safe Heroism',
              'Economic Realism',
              'Moral Cost',
              'Grimdark',
            ],
            warning: 'Queerphobia as systemic theme, emotional devastation',
            amazon_url:
              'https://www.amazon.com/s?k=The+Traitor+Baru+Cormorant+Seth+Dickinson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Traitor+Baru+Cormorant+Dickinson',
          },
        ],
      },
      {
        heading:
          'If you loved the world-spanning multi-POV structure and the depth beneath the story...',
        recs: [
          {
            title: 'Gardens of the Moon',
            author: 'Steven Erikson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765348784-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'Malazan Book of the Fallen',
            series_number: 1,
            series_label: 'Series (10 books, complete)',
            audiobook: true,
            note: "Same ambition, dramatically harder entry. Erikson's ten books follow dozens of characters across multiple continents and 300,000 years of history — the scale makes ASOIAF look contained. The moral complexity is comparable: Erikson refuses heroism the same way Martin does, his gods are capricious, his empires are brutal, and the characters who survive are not the ones who deserved to. The world has the same quality as Martin's of feeling like it existed long before the story began and will continue long after. Caveat: the hardest entry point in the genre — Erikson drops you mid-campaign with no glossary and trusts you to catch up. Many readers require a second attempt. If you persist, the payoff is enormous.",
            tags: [
              'Maximum Scale',
              'Multi-POV',
              'Deep Lore',
              'No Safe Heroism',
              'Complete Series',
            ],
            warning: 'Graphic violence, war, mature themes throughout',
            amazon_url:
              'https://www.amazon.com/s?k=Gardens+of+the+Moon+Steven+Erikson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Gardens+of+the+Moon+Erikson',
          },
          {
            title: 'The Eye of the World',
            author: 'Robert Jordan',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765345424-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'The Wheel of Time',
            series_number: 1,
            series_label: 'Series (14 books, complete)',
            audiobook: true,
            note: "The other defining epic fantasy of the 1990s, written in the same era as Martin began ASOIAF. Jordan's fourteen-book series has a comparable cast size, similar political complexity across multiple kingdoms, and the same investment in a world that feels fully inhabited outside the frame of the story. Significantly more hopeful in tone — chosen-one heroism survives here, the good characters are not systematically punished — and the magic is systematic rather than rare and frightening. For ASOIAF readers who want comparable scope and the same feeling of a world with real history, but who want a more comfortable emotional register and the satisfaction of a completed story.",
            tags: [
              'Epic Scale',
              'Multi-POV',
              'Completed Series',
              'Political Complexity',
              'Rich World',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Eye+of+the+World+Robert+Jordan',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Eye+of+the+World+Robert+Jordan',
          },
        ],
      },
      {
        heading:
          'If you loved the morally grey characters whose choices compound into catastrophe...',
        recs: [
          {
            title: 'The Poppy War',
            author: 'R.F. Kuang',
            cover_url:
              'https://books.google.com/books/content?id=NKB8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            darkness_level: 5,
            standalone: false,
            series: 'The Poppy War',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: "ASOIAF's greatest achievement is making you understand why everyone does what they do, including the people doing terrible things — moral complexity built step by step until the devastating choices feel inevitable. Kuang does this for one protagonist: Rin's moral erosion is constructed the same way, each decision following logically from the last, until she has become something the reader watched her choose to become. The military horror of the second act hits with the same density of consequence as the Red Wedding — you understand exactly how it happened and why nothing could have stopped it. Caveat: significantly darker than ASOIAF at its darkest, with content drawn directly from historical atrocity. The trilogy is complete.",
            tags: [
              'Moral Erosion',
              'No Safe Heroism',
              'Dark Power',
              'War & Atrocity',
              'Female Protagonist',
            ],
            warning: 'War atrocity, genocide, drug addiction, graphic violence',
            amazon_url: 'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Poppy+War+RF+Kuang',
          },
          {
            title: 'Prince of Thorns',
            author: 'Mark Lawrence',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780441020409-L.jpg',
            darkness_level: 5,
            standalone: false,
            series: 'The Broken Empire',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: "The anti-hero taken to its extreme. Jorg of Ancrath is thirteen years old and has already done things that cannot be undone, and Lawrence never exonerates him. The narrative strategy is the same as Martin's with Cersei or Jaime — you understand exactly why this person is doing what they are doing, which is different from forgiving them for it. The Broken Empire trilogy is complete and the ending earns its grimness. Caveat: the first-person perspective is far more uncomfortable than Martin's third-person diffusion; you are inside Jorg's head rather than observing him, which some readers find genuinely difficult to sustain.",
            tags: [
              'Anti-Hero',
              'Moral Darkness',
              'First-Person Villain',
              'Grimdark',
              'Complete Trilogy',
            ],
            warning: 'Graphic violence, war crimes, disturbing protagonist',
            amazon_url:
              'https://www.amazon.com/s?k=Prince+of+Thorns+Mark+Lawrence',
            bookshop_url:
              'https://bookshop.org/search?keywords=Prince+of+Thorns+Mark+Lawrence',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg',
        darkness_level: 2,
        heat_level: 'Sweet Romance',
        tags: [
          'Literary Prose',
          'Legendary Protagonist',
          'Deep Magic System',
          'Same Reader Demographic',
        ],
        why: "If ASOIAF's appeal was partly the quality of the writing — prose that exceeds genre conventions and rewards re-reading — Rothfuss is the other fantasy author of the era working at that level. Kvothe's story doesn't have Martin's political realism or the no-safe-characters contract, but the richness of the world, the depth of the magic, and the pleasure of a narrator recounting his own legendary deeds make it the natural companion read for ASOIAF fans who care about how the writing is done. Caveat: the third book has not been published in fifteen years — approach with that awareness.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss',
      },
      {
        title: 'The Lies of Locke Lamora',
        author: 'Scott Lynch',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
        darkness_level: 4,
        heat_level: null,
        tags: [
          'Political Scheming',
          'Morally Grey',
          'Witty Dialogue',
          'World With History',
          'Found Family',
        ],
        why: "For the ASOIAF reader whose favorite element was the scheming — the pleasure of watching intelligent, ruthless people outmanoeuvre each other. A crew of con artists operating in a detailed fantasy city built on the ruins of an alien civilisation, pulling off elaborate schemes against people who think they can't be touched. Lynch writes banter and political scheming with comparable wit to Martin at his best, and the world has the same quality of depth beneath the visible story. The violence is real, the betrayals hurt, and the friendship at the center of the book earns its emotional weight. Caveat: smaller in scale, heist-focused rather than geopolitical, stakes are personal rather than civilizational.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora+Scott+Lynch',
      },
      {
        title: 'Red Rising',
        author: 'Pierce Brown',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780345539786-L.jpg',
        darkness_level: 4,
        heat_level: 'Closed Door',
        tags: [
          'No Safe Characters',
          'Political Scheming',
          'Epic Scope',
          'Complete Saga',
          'Fast-Paced',
        ],
        why: "For the ASOIAF reader who wants comparable scope and no-safe-characters stakes at twice the pace. Brown studied ASOIAF's structure explicitly — the alliances that last only as long as they're useful, the protagonists who are not immune to consequence, the political factions each with coherent self-interest — and the debt is visible. The saga expands from a single mine to a solar system across six complete books. Caveat: significantly more action-driven and less interested in prose quality than Martin; the political scheming is legitimate but the emotional register is more kinetic.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Red+Rising+Pierce+Brown',
        bookshop_url:
          'https://bookshop.org/search?keywords=Red+Rising+Pierce+Brown',
      },
    ],
    related: [
      { title: 'Books Like The Wheel of Time', slug: 'the-wheel-of-time' },
      { title: 'Books Like The Poppy War', slug: 'the-poppy-war' },
      { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
    ],
  },
  {
    slug: 'fourth-wing',
    source: {
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781649374080-L.jpg',
      darkness_level: 3,
      heat_level: 'Explicit',
      series: 'The Empyrean',
      series_number: 1,
      tropes: [
        'Dragon Riders',
        'Enemies to Lovers',
        'War College',
        'Chosen One',
        'Fated Mates',
        'Military Fantasy',
        'Hidden Powers',
      ],
      angle: 'Dragon Rider Romantasy',
      answer_line:
        'If you loved Fourth Wing for the dragon bond, war-college pressure, enemies-to-lovers heat, and the mix of action and romantic tension, start with Eragon, From Blood and Ash and An Ember in the Ashes.',
      why_people_love:
        "Fourth Wing works because Yarros understood what she was building: a romantasy with a dragon rider skin stretched over it, and she leaned into both completely. Xaden and Violet's dynamic is the engine — the power imbalance, the secrets, the tension that keeps not resolving — but the dragon bond genuinely earns its place. Tairn isn't an accessory; the connection matters to the plot and to Violet's sense of identity. The war college setting gives the romance structure and stakes that pure romantasy often lacks. Fair warning: the prose is functional rather than literary, and if you're coming for the fantasy worldbuilding depth, manage expectations. You're here for the characters and the heat. Both deliver.",
    },
    aspects: [
      {
        heading: 'If you loved the dragon bond and the Riders Quadrant...',
        recs: [
          {
            title: 'Eragon',
            author: 'Christopher Paolini',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780375826696-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'Inheritance Cycle',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: 'The original dragon rider coming-of-age for a generation of fantasy readers. The bond between Eragon and Saphira is the emotional core — possessive, world-altering, irreversible — which is exactly the dynamic Yarros echoes with Tairn. The tone is significantly more earnest and less spicy, but if the dragon relationship was your main draw in Fourth Wing, this is the essential read. Caveat: the writing reflects that Paolini was fifteen when he started it. Push past the first hundred pages; the scope improves.',
            tags: [
              'Dragon Bond',
              'Coming of Age',
              'Classic Fantasy',
              'Chosen One',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Eragon+Christopher+Paolini',
            bookshop_url: 'https://bookshop.org/search?keywords=Eragon+Paolini',
          },
          {
            title: "His Majesty's Dragon",
            author: 'Naomi Novik',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780345481283-L.jpg',
            darkness_level: 2,
            heat_level: null,
            standalone: false,
            series: 'Temeraire',
            series_number: 1,
            series_label: 'Series (9 books)',
            audiobook: true,
            note: 'Napoleonic war meets dragon riders, and the bond between Captain Laurence and Temeraire is one of the most emotionally honest relationships in fantasy — not romantic, but genuinely moving in a way that illuminates why the dragon-rider connection archetype works. The tone is entirely different from Fourth Wing: no spice, no enemies-to-lovers, just impeccable historical atmosphere and a dragon who wants to be treated as a person. If the Tairn-Violet dynamic resonated more than the romance, start here.',
            tags: [
              'Dragon Bond',
              'Military Fantasy',
              'Historical Setting',
              'Platonic Depth',
            ],
            amazon_url:
              "https://www.amazon.com/s?k=His+Majesty's+Dragon+Naomi+Novik",
            bookshop_url:
              "https://bookshop.org/search?keywords=His+Majesty's+Dragon+Novik",
          },
        ],
      },
      {
        heading: 'If you loved the enemies-to-lovers tension and the spice...',
        recs: [
          {
            title: 'From Blood and Ash',
            author: 'Jennifer L. Armentrout',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg',
            darkness_level: 3,
            heat_level: 'Explicit',
            standalone: false,
            series: 'Blood and Ash',
            series_number: 1,
            series_label: 'Series (6 books)',
            audiobook: true,
            note: "The closest structural match to Fourth Wing in the romantasy space. Guard-and-ward forbidden romance, a hero with secrets he's not sharing, a heroine who's been told she's special her whole life and is only now finding out why. The heat level is equivalent, the tension is well-executed, and Hawke has the same controlled-dangerous energy as Xaden. Caveat: the lore reveals arrive slowly and some readers find the middle books repetitive. The first two are the high point.",
            tags: [
              'Enemies to Lovers',
              'Forbidden Romance',
              'Guard & Ward',
              'Spicy',
              'Secrets',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=From+Blood+and+Ash+Jennifer+Armentrout',
            bookshop_url:
              'https://bookshop.org/search?keywords=From+Blood+and+Ash',
          },
          {
            title: 'A Court of Thorns and Roses',
            author: 'Sarah J. Maas',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781619634459-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: false,
            series: 'A Court of Thorns and Roses',
            series_number: 1,
            series_label: 'Series (5 books)',
            audiobook: true,
            note: 'If you read Fourth Wing for the romantasy DNA — the morally grey love interest, the slow burn that eventually breaks open — ACOTAR is the natural companion read. Maas and Yarros are working in the same tradition: female protagonist discovering power, a dangerous man with reasons to keep his distance, a world that keeps raising the stakes. Caveat: ACOTAR book one is the weakest. ACOMAF is where the series genuinely earns its reputation.',
            tags: [
              'Fae Courts',
              'Enemies to Lovers',
              'Slow Burn',
              'Female Power',
              'Romantasy',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=A+Court+of+Thorns+and+Roses+Sarah+J+Maas',
            bookshop_url:
              'https://bookshop.org/search?keywords=A+Court+of+Thorns+and+Roses',
          },
        ],
      },
      {
        heading: 'If you loved the war college and training under pressure...',
        recs: [
          {
            title: 'The Poppy War',
            author: 'R.F. Kuang',
            cover_url:
              'https://books.google.com/books/content?id=NKB8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            darkness_level: 5,
            heat_level: null,
            standalone: false,
            series: 'The Poppy War',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "The war college opening of The Poppy War — scrappy outsider earns a place at an elite military academy through sheer stubbornness, discovers a terrifying hidden power, makes a found family — is the closest the literary fantasy world gets to Fourth Wing's first act structure. Then it becomes something else entirely. This is inspired by the Second Sino-Japanese War and does not soften what that means. Extraordinary and brutal in equal measure.",
            tags: [
              'War College',
              'Hidden Powers',
              'Found Family',
              'Military Fantasy',
              'Dark Turn',
            ],
            warning:
              'War Crimes, Genocide, Drug Addiction, Torture. Significant tonal shift from military school to atrocity.',
            amazon_url: 'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Poppy+War+Kuang',
          },
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: "Military academy setting, impossible trials, dual POVs — one a soldier, one an outsider thrust into a world they weren't built for. The slow-burn tension here is arguably more earned than Fourth Wing's: Tahir makes you wait and the waiting matters. Darker in tone, lighter on heat, but the tension between Laia and Elias is real. If the Riders Quadrant structure resonated more than the romance, this is your next read.",
            tags: [
              'Military Training',
              'Dual POV',
              'Slow Burn',
              'High Stakes',
              'Oppressive System',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url:
              'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
          },
        ],
      },
      {
        heading: 'If you loved the hidden power and secret heritage...',
        recs: [
          {
            title: 'Daughter of the Moon Goddess',
            author: 'Sue Lynn Tan',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780063031463-L.jpg',
            darkness_level: 2,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'The Celestial Kingdom',
            series_number: 1,
            series_label: 'Series (duology)',
            audiobook: true,
            note: "A different kind of hidden power story: Chinese mythology, lush prose, a heroine whose heritage determines her destiny in ways she has to fight to control. The romance is slower and quieter than Fourth Wing, but the sense of a protagonist discovering she's been lied to about who she is runs through both books. If Violet's arc of 'everyone knew something about me I didn't' resonated emotionally, this carries that thread further. Caveat: significantly less heat, much more mythology.",
            tags: [
              'Chinese Mythology',
              'Hidden Heritage',
              'Chosen One',
              'Lush World-Building',
              'Quest',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Daughter+of+the+Moon+Goddess+Sue+Lynn+Tan',
            bookshop_url:
              'https://bookshop.org/search?keywords=Daughter+of+the+Moon+Goddess',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like A Court of Thorns and Roses', slug: 'acotar' },
      { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
      { title: 'Books Like Red Rising', slug: 'red-rising' },
    ],
  },
  {
    slug: 'from-blood-and-ash',
    source: {
      title: 'From Blood and Ash',
      author: 'Jennifer L. Armentrout',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg',
      darkness_level: 3,
      heat_level: 'Explicit',
      series: 'Blood and Ash',
      series_number: 1,
      tropes: [
        'Forbidden Romance',
        'Guard & Ward',
        'Enemies to Lovers',
        'Chosen One',
        'Secret Identity',
        'Fated Mates',
      ],
      angle: 'Dark Romantasy with Forbidden Heat',
      answer_line:
        'If you loved From Blood and Ash for the forbidden romance, explicit spice, hidden-identity reveals, and expanding mythology, start with A Court of Thorns and Roses, The Bridge Kingdom and Fourth Wing.',
      why_people_love:
        "From Blood and Ash works because it does one thing relentlessly well: the forbidden tension between Poppy and Hawke is structured to maximise every stolen glance and almost-moment before the reveal that changes everything. Armentrout layers a genuine mystery over the romance — who is Hawke, what is Poppy really, and what does the kingdom actually want from her — so there's plot scaffolding holding up the heat rather than heat alone. The lore drops that accelerate in the second half of book one are genuinely surprising for a subgenre that often telegraphs its twists. Fair warning: the writing is functional, not literary — you're not here for prose. You're here because the slow-burn tension is executed with real craft, and the world keeps expanding in directions you don't expect.",
    },
    aspects: [
      {
        heading: 'If you loved the forbidden romance and the heat...',
        recs: [
          {
            title: 'A Court of Thorns and Roses',
            author: 'Sarah J. Maas',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781619634459-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: false,
            series: 'A Court of Thorns and Roses',
            series_number: 1,
            series_label: 'Series (5 books)',
            audiobook: true,
            note: 'The closest structural match — female protagonist with a secret identity, a love interest hiding who he really is, and a forbidden romance that earns its payoff. ACOTAR book one is slower and less spicy than FBAA, but book two (ACOMAF) goes significantly darker and better. Caveat: the heat level ramps up across the series rather than arriving immediately. If you loved FBAA specifically for its explicit content from early on, adjust expectations for book one.',
            tags: [
              'Forbidden Romance',
              'Fae Courts',
              'Slow Burn',
              'Female Power',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=A+Court+of+Thorns+and+Roses+Sarah+Maas',
            bookshop_url:
              'https://bookshop.org/search?keywords=A+Court+of+Thorns+and+Roses',
          },
          {
            title: 'The Bridge Kingdom',
            author: 'Danielle L. Jensen',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781733090032-L.jpg',
            darkness_level: 3,
            heat_level: 'Explicit',
            standalone: false,
            series: 'Bridge Kingdom',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: 'A princess sent to spy on her enemy husband who turns out to be far more complicated than expected. The dual-betrayal setup means both characters are lying to each other from page one, which creates the same tension FBAA thrives on — chemistry underneath deception. The heat arrives early and the emotional betrayals hit hard. Caveat: shorter and faster-paced than FBAA; the world is less developed but the romance hits harder per page.',
            tags: [
              'Enemies to Lovers',
              'Spy Premise',
              'Dual POV',
              'Political Marriage',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Bridge+Kingdom+Danielle+Jensen',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Bridge+Kingdom+Danielle+Jensen',
          },
        ],
      },
      {
        heading: 'If you loved the mystery of who Hawke really is...',
        recs: [
          {
            title: 'The Cruel Prince',
            author: 'Holly Black',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316310314-L.jpg',
            darkness_level: 4,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'The Folk of the Air',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: 'Cardan is built on the same template as Hawke — a love interest whose cruelty conceals something more complicated, whose motives keep shifting. The political scheming in the Fae court gives the tension somewhere to go beyond just chemistry. Caveat: far less explicit than FBAA; if heat level is the primary draw, recalibrate. This is a story about power and manipulation with romance alongside it.',
            tags: [
              'Fae Courts',
              'Enemies to Lovers',
              'Political Intrigue',
              'Morally Grey Love Interest',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Cruel+Prince+Holly+Black',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Cruel+Prince+Holly+Black',
          },
          {
            title: 'Daughter of the Moon Goddess',
            author: 'Sue Lynn Tan',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780063031609-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'Celestial Kingdom',
            series_number: 1,
            series_label: 'Series (duology)',
            audiobook: true,
            note: "A lush mythology-driven fantasy where the protagonist's true nature and destiny are slowly uncovered across the narrative — similar to Poppy's journey of self-discovery. The love interest is kind rather than antagonistic, but the world-building and the unfolding of who the protagonist really is delivers the same sense of hidden identity revelations. Caveat: this is much lower heat and more lyrical in tone — it pairs the revelation structure with Chinese mythology rather than explicit romance.",
            tags: [
              'Hidden Identity',
              'Chinese Mythology',
              'Chosen One',
              'Female Power',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Daughter+of+the+Moon+Goddess+Sue+Lynn+Tan',
            bookshop_url:
              'https://bookshop.org/search?keywords=Daughter+of+the+Moon+Goddess',
          },
        ],
      },
      {
        heading: 'If you loved the fantasy world and the lore...',
        recs: [
          {
            title: 'Fourth Wing',
            author: 'Rebecca Yarros',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg',
            darkness_level: 3,
            heat_level: 'Explicit',
            standalone: false,
            series: 'The Empyrean',
            series_number: 1,
            series_label: 'Series (ongoing)',
            audiobook: true,
            note: "The other dominant force in current romantasy. Dragons, a war academy, and a love interest with a dangerous secret — Fourth Wing has the same beats as FBAA but with a military structure replacing the guardian setup. The heat and the lore drop frequency are comparable. Caveat: the world-building is shallower than FBAA's. You're here for the dragon-rider fantasy and the relationship, not complex mythology.",
            tags: [
              'Dragons',
              'Academy Setting',
              'Enemies to Lovers',
              'Spicy',
              'War Stakes',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Fourth+Wing+Rebecca+Yarros',
            bookshop_url:
              'https://bookshop.org/search?keywords=Fourth+Wing+Rebecca+Yarros',
          },
          {
            title: 'Kingdom of the Wicked',
            author: 'Kerri Maniscalco',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316428354-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: false,
            series: 'Kingdom of the Wicked',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "A fantasy with layered mythology and a love interest whose allegiance and nature are deliberately obscured — the same structural pleasure as Hawke's reveal. Victorian Sicily setting makes this stand out visually, and the murder mystery gives the romance somewhere to develop beyond chemistry alone. Caveat: less explicit than FBAA and less sweeping in its world-building. More gothic atmosphere, less epic fantasy scope.",
            tags: [
              'Demons',
              'Historical Setting',
              'Dark Romance',
              'Hidden Identity',
              'Mystery',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Kingdom+of+the+Wicked+Kerri+Maniscalco',
            bookshop_url:
              'https://bookshop.org/search?keywords=Kingdom+of+the+Wicked',
          },
        ],
      },
      {
        heading: 'If you want something darker with less romance...',
        recs: [
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: "The structural parallel to FBAA: a protagonist whose identity and freedom are controlled by a rigid system, a love interest entangled in that system, and a romance that's forbidden by the world's rules rather than personal choice. The tension is comparable; the explicit content is not. Caveat: Ember is significantly darker in outcome — characters suffer real consequences, the romance does not insulate anyone from the world's violence.",
            tags: [
              'Enemies to Lovers',
              'Oppressive Empire',
              'Dual POV',
              "Will They Won't They",
            ],
            amazon_url:
              'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url:
              'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'A Kingdom of Flesh and Fire',
        author: 'Jennifer L. Armentrout',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781952457272-L.jpg',
        darkness_level: 3,
        heat_level: 'Explicit',
        tags: [
          'Same Series',
          'Enemies to Lovers',
          'Forced Proximity',
          'Betrayal',
          'Escalating Stakes',
        ],
        why: 'The direct continuation — and for most readers the best book in the series. The dynamic between Poppy and Hawke shifts completely after the book-one reveal, and Armentrout uses that shift to add a layer of genuine antagonism that the first book only gestured at. The lore deepens significantly and the heat level stays consistent. Caveat: you cannot read this without having read FBAA. The reveals are the entire premise.',
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=A+Kingdom+of+Flesh+and+Fire+Armentrout',
        bookshop_url:
          'https://bookshop.org/search?keywords=A+Kingdom+of+Flesh+and+Fire',
      },
      {
        title: 'A Court of Mist and Fury',
        author: 'Sarah J. Maas',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781619634466-L.jpg',
        darkness_level: 4,
        heat_level: 'Explicit',
        tags: [
          'Fae Courts',
          'Enemies to Lovers',
          'Found Family',
          'PTSD',
          'Power Awakening',
        ],
        why: 'The closest structural equivalent to the FBAA experience in the Maas catalogue — a protagonist discovering her real power, a love interest whose public persona is a mask, and a fantasy world that keeps expanding in surprising directions. ACOMAF is the better-written book and the romance is more emotionally layered. Caveat: you need to read ACOTAR first, and book one is slower.',
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=A+Court+of+Mist+and+Fury+Sarah+Maas',
        bookshop_url:
          'https://bookshop.org/search?keywords=A+Court+of+Mist+and+Fury',
      },
      {
        title: 'Fourth Wing',
        author: 'Rebecca Yarros',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg',
        darkness_level: 3,
        heat_level: 'Explicit',
        tags: [
          'Dragons',
          'Academy Fantasy',
          'Enemies to Lovers',
          'Spicy',
          'War Stakes',
        ],
        why: "The current dominant force in the same lane as FBAA — explicit romantasy with a layered world and a love interest hiding secrets. The dragon-rider academy gives the tension a physical setting and a ticking clock. Caveat: world-building is shallower than FBAA's and the plot structure is looser, but the pacing is faster and the dragon element adds genuine spectacle.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Fourth+Wing+Rebecca+Yarros',
        bookshop_url:
          'https://bookshop.org/search?keywords=Fourth+Wing+Rebecca+Yarros',
      },
      {
        title: 'The Bridge Kingdom',
        author: 'Danielle L. Jensen',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781733090032-L.jpg',
        darkness_level: 3,
        heat_level: 'Explicit',
        tags: [
          'Political Marriage',
          'Spy Premise',
          'Dual Betrayal',
          'Enemies to Lovers',
        ],
        why: "Tighter and faster than FBAA with the same essential engine: two people who are lying to each other, drawn together despite every reason not to be. The dual-spy setup means the betrayal runs both ways, which gives the romance genuine stakes. Caveat: significantly shorter with less world-building depth — it's a focused delivery of the exact dynamic FBAA readers come for.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Bridge+Kingdom+Danielle+Jensen',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Bridge+Kingdom+Danielle+Jensen',
      },
      {
        title: 'The Cruel Prince',
        author: 'Holly Black',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780316310314-L.jpg',
        darkness_level: 4,
        heat_level: 'Closed Door',
        tags: [
          'Fae Courts',
          'Enemies to Lovers',
          'Power Games',
          'Morally Grey Love Interest',
        ],
        why: "Shares FBAA's core pleasure — a love interest whose cruelty is a performance hiding something more complicated — but executes it with more literary craft and political complexity. Jude is a more interesting protagonist than Poppy in terms of agency. Caveat: significantly less explicit. If heat is the primary draw, this delivers the tension without the content.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Cruel+Prince+Holly+Black',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Cruel+Prince+Holly+Black',
      },
      {
        title: 'An Ember in the Ashes',
        author: 'Sabaa Tahir',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
        darkness_level: 4,
        heat_level: 'Sweet Romance',
        tags: [
          'Enemies to Lovers',
          'Forbidden Romance',
          'Oppressive Empire',
          'Dual POV',
        ],
        why: "For readers who want FBAA's forbidden-romance premise taken seriously as an epic fantasy rather than romantasy. The tension between Laia and Elias is comparable in structure but the consequences are real — no safety net. Caveat: far less explicit. This is the option for readers who want the emotional experience of FBAA with more literary ambition and darker outcomes.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
        bookshop_url:
          'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
      },
    ],
    related: [
      { title: 'Books Like A Court of Thorns and Roses', slug: 'acotar' },
      { title: 'Books Like Fourth Wing', slug: 'fourth-wing' },
      { title: 'Books Like A Game of Thrones', slug: 'a-game-of-thrones' },
    ],
  },
  {
    slug: 'the-goblin-emperor',
    source: {
      title: 'The Goblin Emperor',
      author: 'Katherine Addison',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780765365682-L.jpg',
      darkness_level: 2,
      heat_level: null,
      series: null,
      series_number: null,
      tropes: [
        'Unexpected Ruler',
        'Kind Protagonist',
        'Political Intrigue',
        'Court Dynamics',
        'Steampunk-Adjacent',
        'Found Family',
      ],
      angle: 'Cosy Fantasy with a Kind Protagonist',
      why_people_love: `The Goblin Emperor is the book readers recommend when someone says they are exhausted by grimdark. The half-goblin youngest son of the emperor inherits the throne after a catastrophic airship accident kills everyone ahead of him in succession, and the entire novel is about a fundamentally decent person trying to be a good ruler in a world that was not designed for decency. Maia does not become ruthless. He does not harden. He learns to navigate a court full of people who underestimate or manipulate him while remaining himself — and the book is quietly radical for insisting this is not naivety but strength. The court politics are intricate, the relationships are earned, and the emotional payoff of watching someone refuse to be corrupted is unexpectedly powerful.`,
    },
    aspects: [
      {
        heading:
          'If you loved the kind protagonist navigating hostile power...',
        recs: [
          {
            title: 'Piranesi',
            author: 'Susanna Clarke',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781526622426-L.jpg',
            darkness_level: 2,
            standalone: true,
            audiobook: true,
            note: "A man who catalogues an impossible world with perfect contentment and genuine care for everything in it. Clarke's protagonist shares Maia's essential quality: an absolute moral clarity that the narrative treats as strength rather than innocence. The tonal register is completely different — mysterious, strange, literary — but both books centre on a protagonist whose decency is their defining characteristic and whose perspective shapes how the reader experiences the world. Caveat: no court politics, minimal interpersonal conflict, almost entirely atmosphere and mystery.",
            tags: ['Kind Protagonist', 'Unique World', 'Literary', 'Quiet'],
            amazon_url: 'https://www.amazon.com/s?k=Piranesi+Susanna+Clarke',
            bookshop_url:
              'https://bookshop.org/search?keywords=Piranesi+Susanna+Clarke',
          },
          {
            title: 'The House in the Cerulean Sea',
            author: 'TJ Klune',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250217318-L.jpg',
            darkness_level: 1,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: "The closest tonal match in modern fantasy. Linus Baker is a case worker for magical children, sent to inspect an unusual orphanage — and like Maia, he's a fundamentally decent person placed in a bureaucratic world that treats decency as weakness. The cosy atmosphere, the slow-building found family, and the central theme of a gentle protagonist refusing to be cynical about a world that expects him to be make this the most natural companion read to The Goblin Emperor.",
            tags: [
              'Cosy Fantasy',
              'Kind Protagonist',
              'Found Family',
              'Bureaucracy',
              'Queer Romance',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+House+in+the+Cerulean+Sea+TJ+Klune',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+House+in+the+Cerulean+Sea',
          },
        ],
      },
      {
        heading: 'If you loved the intricate court politics and bureaucracy...',
        recs: [
          {
            title: 'Sorcerer to the Crown',
            author: 'Zen Cho',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780425283370-L.jpg',
            darkness_level: 2,
            standalone: false,
            series: 'Sorcerer Royal',
            series_number: 1,
            series_label: 'Series (duology, complete)',
            audiobook: true,
            note: "Regency England where magic is administered by a gentlemen's society, and a freed slave has become its Sorcerer Royal to universal hostility. Cho writes with the same wit and warmth as Addison — the protagonist navigates an institution built to exclude him with patience, intelligence, and no compromise of his principles. The Regency comedy-of-manners texture gives it a similar flavour to Goblin Emperor's court formality, and the political stakes (magic is failing, someone is responsible) sit underneath the social comedy without overwhelming it.",
            tags: [
              'Court Intrigue',
              'Regency Fantasy',
              'Outsider Protagonist',
              'Witty',
              'Magic Politics',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Sorcerer+to+the+Crown+Zen+Cho',
            bookshop_url:
              'https://bookshop.org/search?keywords=Sorcerer+to+the+Crown+Zen+Cho',
          },
          {
            title: 'The Traitor Baru Cormorant',
            author: 'Seth Dickinson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765380722-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'The Masquerade',
            series_number: 1,
            series_label: 'Series (4 books planned, 3 released)',
            audiobook: true,
            note: "The darkest possible escalation of Goblin Emperor's political intelligence. Where Maia learns to work within the system without being corrupted by it, Baru decides to destroy the system from within — and the book is about what that decision costs at every step. Dickinson's economics and political machinery are among the most rigorous in fantasy. Recommended only if you want something that takes the same interest in how power actually works and applies it to a protagonist making increasingly terrible choices. Caveat: deliberately devastating, not a comfort read.",
            tags: [
              'Political Machination',
              'Empire',
              'Moral Cost',
              'Economics',
              'Grimdark',
            ],
            warning: 'Queerphobia as systemic theme, emotional devastation',
            amazon_url:
              'https://www.amazon.com/s?k=The+Traitor+Baru+Cormorant+Seth+Dickinson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Traitor+Baru+Cormorant+Dickinson',
          },
        ],
      },
      {
        heading:
          'If you loved the warmth, the found family, and the hopeful tone...',
        recs: [
          {
            title: 'The House in the Cerulean Sea',
            author: 'TJ Klune',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250217318-L.jpg',
            darkness_level: 1,
            heat_level: 'Sweet Romance',
            standalone: true,
            audiobook: true,
            note: "The most direct tonal match. A caseworker for magical children arrives at a remote orphanage and slowly falls in love with both the community and the man who runs it. Klune writes institutional warmth — the way a place fills with belonging when the right people commit to each other — with the same quiet power Addison brings to Maia's court. The bureaucratic texture (forms, regulations, inspections) mirrors Goblin Emperor's administrative detail in a gentler register. An easy recommendation for anyone who finished Goblin Emperor and wanted more of that feeling.",
            tags: [
              'Found Family',
              'Cozy',
              'Sweet Romance',
              'Institutional Warmth',
              'Queer',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+House+in+the+Cerulean+Sea+TJ+Klune',
            bookshop_url:
              'https://bookshop.org/search?keywords=House+Cerulean+Sea+TJ+Klune',
          },
          {
            title: 'Legends & Lattes',
            author: 'Travis Baldree',
            cover_url:
              'https://covers.openlibrary.org/b/title/Legends%20%26%20Lattes-L.jpg',
            darkness_level: 1,
            heat_level: 'Sweet Romance',
            standalone: true,
            audiobook: true,
            note: "An orc barbarian retires from adventuring and opens a coffee shop. Like Maia's story, this is entirely about a person who chooses gentleness in a world that expected violence from them — and the narrative rewards that choice without irony. The community that forms around the coffee shop has the same texture as the loyal inner circle Maia slowly builds. Much lower stakes, no court politics, shorter. Recommended for the tonal match rather than structural similarity.",
            tags: [
              'Cozy Fantasy',
              'Found Community',
              'Chosen Gentleness',
              'Slice of Life',
              'Queer',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Legends+and+Lattes+Travis+Baldree',
            bookshop_url:
              'https://bookshop.org/search?keywords=Legends+Lattes+Travis+Baldree',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: "Howl's Moving Castle",
        author: 'Diana Wynne Jones',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780064410342-L.jpg',
        darkness_level: 1,
        heat_level: 'Sweet Romance',
        tags: [
          'Cozy Fantasy',
          'Classic',
          'Witty',
          'Found Family',
          'Kind Protagonist',
        ],
        why: "The closest predecessor to Goblin Emperor in terms of tonal intent: an unlikely protagonist in a magical world they did not choose, surrounded by people who underestimate them, navigating chaos with decency and wit. Sophie is cursed into old age and ends up running a wizard's household with the same practical intelligence Maia brings to governing an empire. Wynne Jones wrote warmth into the architecture of her stories — the plot is in service of the characters, the romance is slow and earned, and no one is punished for being kind. Essential reading for anyone who loved what Goblin Emperor was doing and wants its lineage.",
        standalone: true,
        audiobook: true,
        amazon_url:
          "https://www.amazon.com/s?k=Howl's+Moving+Castle+Diana+Wynne+Jones",
        bookshop_url:
          "https://bookshop.org/search?keywords=Howl's+Moving+Castle+Diana+Wynne+Jones",
      },
      {
        title: 'The Very Secret Society of Irregular Witches',
        author: 'Sangu Mandanna',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780593336229-L.jpg',
        darkness_level: 1,
        heat_level: 'Sweet Romance',
        tags: [
          'Found Family',
          'Cozy Fantasy',
          'Witches',
          'Ensemble Cast',
          'Warmth',
        ],
        why: 'A solitary witch is hired to teach three young witches in secret, and slowly, reluctantly, becomes part of the household. Mandanna writes found family with the same warmth and patience as Goblin Emperor — the community forms through repeated small acts of care rather than dramatic events, the protagonist resists belonging before accepting it, and the tone never strays from fundamental kindness. The romance is slow and sweet. Caveat: lower stakes and lighter in tone than Goblin Emperor — closer to Legends & Lattes in register. If you want the warmth without any political complexity, this delivers it more directly.',
        standalone: true,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Very+Secret+Society+of+Irregular+Witches+Mandanna',
        bookshop_url:
          'https://bookshop.org/search?keywords=Very+Secret+Society+Irregular+Witches+Mandanna',
      },
    ],
    related: [
      { title: 'Books Like Legends & Lattes', slug: 'legends-and-lattes' },
      { title: 'Books Like Piranesi', slug: 'piranesi' },
      {
        title: 'Books Like The Priory of the Orange Tree',
        slug: 'the-priory-of-the-orange-tree',
      },
    ],
  },
  {
    slug: 'the-hobbit',
    source: {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      db_slug: 'the-hobbit',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
      darkness_level: 2,
      heat_level: null,
      series: null,
      series_number: null,
      tropes: [
        'Reluctant Hero',
        'Quest Fantasy',
        'Found Family',
        'Dragons',
        'Unlikely Hero',
        'Episodic Adventure',
        'Chosen by Fate',
      ],
      angle: 'Classic Adventure Fantasy',
      answer_line:
        'If you loved The Hobbit for the adventure-first pacing, charming quest feel, cozy-but-dangerous tone, and classic fantasy wonder, start with The Eye of the World, The Name of the Wind and The Way of Kings.',
      why_people_love:
        "The Hobbit works because Tolkien understood that the best adventures start with someone who doesn't want one. Bilbo Baggins is not a hero — he's a homebody who likes his pantry full and his routine undisturbed — and the entire novel is powered by the tension between the comfortable life he's been pulled away from and the person the road is slowly making him become. It's the book that invented the template for cozy epic fantasy: high stakes, genuine peril, but always with a warmth underneath that tells you the world is worth saving. The dwarves are well-drawn despite being thirteen of them, the episodic structure means every chapter delivers something new, and Riddles in the Dark remains one of the most perfectly constructed scenes in fantasy. Short enough to read in a weekend, rich enough to think about for years.",
    },
    aspects: [
      {
        heading:
          'If you loved the cozy, warm-hearted tone and the unlikely hero swept up in something larger than himself...',
        recs: [
          {
            title: 'The Goblin Emperor',
            author: 'Katherine Addison',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765365682-L.jpg',
            darkness_level: 2,
            heat_level: null,
            standalone: true,
            series_label: 'Standalone (with companion novel)',
            audiobook: true,
            note: "The closest modern novel to The Hobbit's emotional register: a fundamentally decent protagonist thrust into an impossible situation, refusing to become cruel despite every incentive to do so. Maia, like Bilbo, is an outsider who discovers unexpected reserves of character on the way. No dragon, no quest — but the same sense of an ordinary person discovering they are not ordinary after all. If you read The Hobbit for the warmth rather than the adventure, this is your book.",
            tags: [
              'Unlikely Ruler',
              'Kind Protagonist',
              'Court Politics',
              'Found Family',
              'Cozy Fantasy',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Goblin+Emperor+Katherine+Addison',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Goblin+Emperor+Addison',
          },
          {
            title: 'Legends & Lattes',
            author: 'Travis Baldree',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250888808-L.jpg',
            darkness_level: 1,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'Legends & Lattes',
            series_number: 1,
            series_label: 'Series (2 books)',
            audiobook: true,
            note: "An orc barbarian who hangs up her sword to open a coffee shop — which is exactly as charming as it sounds. Legends & Lattes captures the post-adventure warmth of The Hobbit's return to the Shire: the sense that the world is good, the people in it are mostly decent, and small pleasures are worth protecting. Even lower stakes than The Hobbit, even more cozy. If you want zero peril and maximum found-family comfort, this is the answer.",
            tags: [
              'Cozy Fantasy',
              'Found Family',
              'Low Stakes',
              'Slice of Life',
              'Charming',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Legends+and+Lattes+Travis+Baldree',
            bookshop_url:
              'https://bookshop.org/search?keywords=Legends+and+Lattes+Baldree',
          },
        ],
      },
      {
        heading:
          'If you loved the episodic quest structure — a band of companions, a new wonder at every stop...',
        recs: [
          {
            title: 'A Wizard of Earthsea',
            author: 'Ursula K. Le Guin',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780547773742-L.jpg',
            darkness_level: 2,
            heat_level: null,
            standalone: false,
            series: 'Earthsea',
            series_number: 1,
            series_label: 'Series (6 books)',
            audiobook: true,
            note: "The other foundational short fantasy novel — slim, mythic, and deeply concerned with what power costs the person who wields it. Ged's journey across the Earthsea archipelago has the same episodic, wonder-per-chapter structure as Bilbo's road. Le Guin's prose is quieter and more literary than Tolkien's, but the spirit is identical: a young person discovering who they are through the places the road takes them. A perfect companion read.",
            tags: [
              'Coming of Age',
              'Episodic Adventure',
              'Magic System',
              'Classic Fantasy',
              'Quest',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=A+Wizard+of+Earthsea+Le+Guin',
            bookshop_url:
              'https://bookshop.org/search?keywords=A+Wizard+of+Earthsea',
          },
          {
            title: 'The Name of the Wind',
            author: 'Patrick Rothfuss',
            cover_url:
              'https://books.google.com/books/publisher/content/images/frontcover/DSyJEAAAQBAJ?fife=w400-h600',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'The Kingkiller Chronicle',
            series_number: 1,
            series_label: 'Series (unfinished — 2 books published)',
            audiobook: true,
            note: "Where The Hobbit is a quest, The Name of the Wind is a bildungsroman told as myth — Kvothe narrating his own legend from a tavern in a small town. The episodic structure is similar, the sense of a world bigger than any map is identical, and Rothfuss has Tolkien's gift for making magic feel genuinely wondrous rather than mechanical. Caveat: the third book has not been published and may never be. Read knowing you are signing up for an unfinished journey.",
            tags: [
              'Bildungsroman',
              'Magic University',
              'Legend Building',
              'Episodic Adventure',
              'Lyrical Prose',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Name+of+the+Wind+Rothfuss',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss',
          },
        ],
      },
      {
        heading:
          "If you loved Tolkien's world — the deep history, the dragons, the sense that the mythology goes on forever...",
        recs: [
          {
            title: 'The Eye of the World',
            author: 'Robert Jordan',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765345424-L.jpg',
            darkness_level: 3,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'The Wheel of Time',
            series_number: 1,
            series_label: 'Series (14 books, complete)',
            audiobook: true,
            note: "The most direct heir to Tolkien's world-building ambition: a mythology that stretches back thousands of years, a party of ordinary people from a small village pulled into something vast, and a villain whose shadow falls across the entire world. Jordan studied The Lord of the Rings carefully and built something with comparable scope — though at fourteen books it is a far longer commitment than Bilbo ever faced. Start with book one and judge from there.",
            tags: [
              'Epic Quest',
              'Chosen One',
              'Deep Mythology',
              'Found Family',
              'World-Building',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Eye+of+the+World+Robert+Jordan',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Eye+of+the+World+Jordan',
          },
          {
            title: 'The Way of Kings',
            author: 'Brandon Sanderson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765376671-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'The Stormlight Archive',
            series_number: 1,
            series_label: 'Series (10 books planned)',
            audiobook: true,
            note: "Sanderson has been explicit that Tolkien is the reason he became a fantasy writer — and it shows. The Way of Kings has the same depth of mythology (Roshar's history runs back thousands of years before the novel opens), the same care for world-building as pleasure in itself, and the same interest in what ordinary people become under extraordinary pressure. Much longer, much darker, and with a hard magic system that Tolkien's softer approach lacks. But the love of the world is identical.",
            tags: [
              'Epic Fantasy',
              'Deep Lore',
              'Hard Magic System',
              'War Fantasy',
              'Multiple POV',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Way+of+Kings+Sanderson',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like The Eye of the World', slug: 'the-wheel-of-time' },
      { title: 'Books Like The Goblin Emperor', slug: 'the-goblin-emperor' },
      { title: 'Books Like Legends & Lattes', slug: 'legends-and-lattes' },
    ],
  },
  {
    slug: 'iron-flame',
    source: {
      title: 'Iron Flame',
      author: 'Rebecca Yarros',
      db_slug: 'iron-flame',
      cover_url:
        'https://books.google.com/books/publisher/content/images/frontcover/EY69EAAAQBAJ?fife=w400-h600',
      darkness_level: 4,
      heat_level: 'Explicit',
      series: 'The Empyrean',
      series_number: 2,
      tropes: [
        'Enemies to Lovers',
        'Betrayal',
        'Political Intrigue',
        'Morally Grey Hero',
        'Forbidden Romance',
        'War Fantasy',
        'Dark Secrets',
        'Dragon Riders',
      ],
      angle: 'Spicy Dragon Rider Romantasy',
      answer_line:
        'If you loved Iron Flame for the fractured romance, political conspiracy, dark war stakes, and the sense that every secret makes things worse, start with An Ember in the Ashes, A Court of Mist and Fury and From Blood and Ash',
      why_people_love:
        "Iron Flame works because Yarros committed to making the sequel darker and harder than the first book. The romance between Violet and Xaden doesn't reset — it breaks under the weight of what Xaden has been hiding, and watching two people who love each other fail to trust each other is more compelling than enemies finally kissing. The war threat moves from backdrop to centrepiece, and the venin plot raises genuine stakes. If Fourth Wing was a romantasy with a war college skin, Iron Flame is a war fantasy with a romantasy core. The pacing is uneven in the middle third, and some of the dialogue still reads as fanfic-adjacent, but the emotional beats land hard when they matter. The cliffhanger ending is genuinely brutal.",
    },
    aspects: [
      {
        heading:
          'If you loved the political betrayal and conspiracy at the heart of the war...',
        recs: [
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: "The closest match for Iron Flame's combination of military brutality, political conspiracy, and a romance that keeps getting derailed by war. Laia and Elias are on opposite sides of a regime — one trying to survive it, one trying to escape it — and the empire is doing something terrible that most people inside it refuse to see. The heat level is much lower, but the emotional stakes and the sense of a world rigged against its characters are identical.",
            tags: [
              'Military Fantasy',
              'Political Intrigue',
              'Dual POV',
              'Forbidden Romance',
              'Resistance',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url:
              'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
          },
          {
            title: 'The Jasmine Throne',
            author: 'Tasha Suri',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316538718-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: false,
            series: 'Burning Kingdoms',
            series_number: 1,
            series_label: 'Series (3 books)',
            audiobook: true,
            note: "Political intrigue wrapped around a romance between a prisoner and her captor, set in a crumbling empire where the hidden resistance is more complicated than it looks. The pacing is patient and the world-building is rich — Indian-inspired, morally layered, and interested in how power corrupts institutions from the inside. If Iron Flame's conspiracy plot was what gripped you, this delivers that same sense of a rot at the centre of things.",
            tags: [
              'Political Intrigue',
              'Sapphic Romance',
              'Empire & Resistance',
              'Morally Grey',
              'Slow Burn',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Jasmine+Throne+Tasha+Suri',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Jasmine+Throne+Suri',
          },
        ],
      },
      {
        heading:
          "If you loved Violet and Xaden's fractured, trust-breaking romance...",
        recs: [
          {
            title: 'A Court of Mist and Fury',
            author: 'Sarah J. Maas',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781619634671-L.jpg',
            darkness_level: 3,
            heat_level: 'Explicit',
            standalone: false,
            series: 'A Court of Thorns and Roses',
            series_number: 2,
            series_label: 'Series (5 books)',
            audiobook: true,
            note: "The book Iron Flame readers most consistently migrate to. ACOMAF is a second-book-darker story about a woman processing trauma, a relationship shattering under the weight of secrets kept for good reasons, and a new bond forming with someone who treats her as capable rather than fragile. The emotional arc mirrors what Yarros is doing with Violet — a heroine who has to decide whether she trusts her own instincts over what she's being told. Read ACOTAR first, but ACOMAF is the one that earns the series its reputation.",
            tags: [
              'Fae Courts',
              'Enemies to Lovers',
              'Slow Burn',
              'Trauma Recovery',
              'Explicit',
            ],
            warning:
              'Sexual assault (referenced/aftermath), PTSD themes, explicit sexual content.',
            amazon_url:
              'https://www.amazon.com/s?k=A+Court+of+Mist+and+Fury+Sarah+J+Maas',
            bookshop_url:
              'https://bookshop.org/search?keywords=A+Court+of+Mist+and+Fury',
          },
          {
            title: 'From Blood and Ash',
            author: 'Jennifer L. Armentrout',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg',
            darkness_level: 3,
            heat_level: 'Explicit',
            standalone: false,
            series: 'Blood and Ash',
            series_number: 1,
            series_label: 'Series (6 books)',
            audiobook: true,
            note: "The structural twin of the Empyrean series: a heroine who's been kept in the dark about what she really is, a guard with a mission he can't reveal, and a romance built entirely on the tension between what they feel and what they know they shouldn't do. If Xaden's secret-keeping is what wrecked you in Iron Flame, Hawke's arc in this series delivers the same gut-punch across two books. The heat level is equivalent.",
            tags: [
              'Forbidden Romance',
              'Guard & Ward',
              'Dark Secrets',
              'Explicit',
              'Slow Burn',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=From+Blood+and+Ash+Jennifer+Armentrout',
            bookshop_url:
              'https://bookshop.org/search?keywords=From+Blood+and+Ash',
          },
        ],
      },
      {
        heading:
          'If you loved the dark magic, escalating stakes and brutal war...',
        recs: [
          {
            title: 'The Dragon Republic',
            author: 'R.F. Kuang',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780062662583-L.jpg',
            darkness_level: 5,
            heat_level: null,
            standalone: false,
            series: 'The Poppy War',
            series_number: 2,
            series_label: 'Series (3 books)',
            audiobook: true,
            note: "The Poppy War's darker, more politically brutal sequel — and the entry point for readers who want Iron Flame's escalating war stakes pushed to their absolute limit. Rin's power is destroying her, the alliances she trusted are fracturing, and the war has become something no one can control. Zero romance, maximum darkness. If the venin threat and Violet's fear of what her power might make her was the part that gripped you, Kuang takes that exact fear and runs it to its logical conclusion.",
            tags: [
              'Dark Magic',
              'War Fantasy',
              'Political Betrayal',
              'Power Corruption',
              'Military',
            ],
            warning:
              'Extreme violence, genocide, substance addiction, war crimes.',
            amazon_url:
              'https://www.amazon.com/s?k=The+Dragon+Republic+RF+Kuang',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Dragon+Republic+Kuang',
          },
          {
            title: 'The Blade Itself',
            author: 'Joe Abercrombie',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780575079793-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'The First Law',
            series_number: 1,
            series_label: 'Series (3 books + standalones)',
            audiobook: true,
            note: "If the morally grey characters and the sense that the institutions Violet trusted are rotten at the core is what hooked you, Abercrombie is the natural next step. The First Law is built on the premise that the heroes and villains are determined by who's writing the history. No spice, no dragon bonds — but the same satisfying gut-punch when a character you trusted turns out to have been lying to you for very good reasons.",
            tags: [
              'Grimdark',
              'Morally Grey',
              'Political Intrigue',
              'War Fantasy',
              'Dark Humour',
            ],
            warning: 'Graphic violence, torture, war crimes.',
            amazon_url:
              'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like Fourth Wing', slug: 'fourth-wing' },
      { title: 'Books Like A Court of Thorns and Roses', slug: 'acotar' },
      { title: 'Books Like From Blood and Ash', slug: 'from-blood-and-ash' },
    ],
  },
  {
    slug: 'legends-and-lattes',
    source: {
      title: 'Legends & Lattes',
      author: 'Travis Baldree',
      cover_url:
        'https://covers.openlibrary.org/b/title/Legends%20%26%20Lattes-L.jpg',
      darkness_level: 1,
      heat_level: 'Sweet Romance',
      series: null,
      series_number: null,
      tropes: [
        'Cozy Fantasy',
        'Slice of Life',
        'Found Family',
        'Slow Burn Romance',
        'Low Stakes',
      ],
      angle: 'Cosy Fantasy',
      answer_line:
        'If you loved Legends & Lattes for the cozy atmosphere, community-building, gentle romance, and emotionally safe fantasy vibe, start with The House in the Cerulean Sea, The Very Secret Society of Irregular Witches and A Wizard’s Guide to Defensive Baking',
      why_people_love: `Legends & Lattes is the book that launched "cozy fantasy" as a mainstream genre category. An orc barbarian retires from adventuring and opens a coffee shop. Nothing about the premise requires the reader to have any prior fantasy knowledge and almost nothing about the book requires tension or conflict in the traditional sense. What it offers instead is warmth: the pleasure of watching a community form around a new thing, a slow-burn romance that earns every page of its development, and the radical idea that a fantasy novel can be entirely about people choosing to be kind to each other. Readers who found epic fantasy exhausting, or who needed a book that felt safe, found exactly that here.`,
    },
    aspects: [
      {
        heading:
          'If you loved the cozy, low-stakes slice-of-life atmosphere...',
        recs: [
          {
            title: 'Piranesi',
            author: 'Susanna Clarke',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781526622426-L.jpg',
            darkness_level: 2,
            standalone: true,
            audiobook: true,
            note: 'A completely different kind of quiet. A man lives alone in a House of infinite halls and tidal statues, cataloguing its beauty with perfect contentment. Clarke writes with extraordinary restraint — the mystery unfolds slowly and the atmosphere is unlike anything else in the genre. If Legends & Lattes appealed because of its unhurried pace and the sense that the protagonist has found their place in the world, Piranesi delivers that same quality in a stranger, darker register. Caveat: there is a real mystery here and a plot that sharpens into something urgent. Not purely cozy — more like deeply strange with a warm core.',
            tags: [
              'Quiet Atmosphere',
              'Unique World',
              'Literary',
              'Found Contentment',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Piranesi+Susanna+Clarke',
            bookshop_url:
              'https://bookshop.org/search?keywords=Piranesi+Susanna+Clarke',
          },
          {
            title: "A Wizard's Guide to Defensive Baking",
            author: 'T. Kingfisher',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781614504139-L.jpg',
            darkness_level: 2,
            standalone: true,
            audiobook: true,
            note: "A fourteen-year-old bread mage who can make gingerbread men walk. The food magic is warm and inventive, the protagonist is genuinely funny, and Kingfisher writes with the same low-key delight in small magical things that makes Legends & Lattes work. Slightly darker than Baldree's book — there are actual stakes and some genuine tension — but the tone is fundamentally kind. The gingerbread sourdough starter character may be the best character in cozy fantasy.",
            tags: ['Food Magic', 'Cozy', 'Young Protagonist', 'Warm Tone'],
            amazon_url:
              'https://www.amazon.com/s?k=A+Wizard%27s+Guide+to+Defensive+Baking+T+Kingfisher',
            bookshop_url:
              'https://bookshop.org/search?keywords=Wizard+Guide+Defensive+Baking+Kingfisher',
          },
        ],
      },
      {
        heading: 'If you loved the found family and community building...',
        recs: [
          {
            title: 'The House in the Cerulean Sea',
            author: 'TJ Klune',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250217318-L.jpg',
            darkness_level: 1,
            heat_level: 'Sweet Romance',
            standalone: true,
            audiobook: true,
            note: "The closest direct match to Legends & Lattes in tone and intent. A caseworker for magical children arrives at a remote orphanage and slowly, inevitably, falls in love with both the place and the man who runs it. Klune writes warmth the same way Baldree does — unhurried, character-first, with a romance that develops through small repeated moments rather than dramatic declarations. The stakes are slightly higher (there's a bureaucratic threat to the community) but the book's fundamental project is the same: showing how a found family forms. Read this immediately after Legends & Lattes.",
            tags: [
              'Found Family',
              'Community',
              'Sweet Romance',
              'Cozy',
              'Queer',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+House+in+the+Cerulean+Sea+TJ+Klune',
            bookshop_url:
              'https://bookshop.org/search?keywords=House+Cerulean+Sea+Klune',
          },
          {
            title: 'The Very Secret Society of Irregular Witches',
            author: 'Sangu Mandanna',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780593336229-L.jpg',
            darkness_level: 1,
            standalone: true,
            audiobook: true,
            note: "A solitary witch hired to teach three young witches in secret, and the household that slowly adopts her. Mandanna constructs community the same way Baldree does: through repeated small gestures of care and the gradual dissolution of a protagonist's self-protective distance. The stakes are low, the tone is warm, and the found family that forms around the main character has the same texture as the one that forms around Viv's coffee bar. Caveat: even lighter and lower-stakes than Legends & Lattes; there is a romance but it is the quietest possible version of slow-burn.",
            tags: [
              'Found Family',
              'Cozy Fantasy',
              'Witches',
              'Community',
              'Warm Tone',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Very+Secret+Society+of+Irregular+Witches+Mandanna',
            bookshop_url:
              'https://bookshop.org/search?keywords=Very+Secret+Society+Irregular+Witches+Mandanna',
          },
        ],
      },
      {
        heading:
          'If you loved the slow-burn romance built through small moments...',
        recs: [
          {
            title: 'A Natural History of Dragons',
            author: 'Marie Brennan',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765331960-L.jpg',
            darkness_level: 2,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'The Memoirs of Lady Trent',
            series_number: 1,
            series_label: 'Series (5 books)',
            audiobook: true,
            note: "A Victorian-flavoured fantasy memoir about a woman who becomes the world's foremost dragon naturalist, written as her reminiscences in old age. The romance is already resolved before the story begins — what Brennan captures instead is the slow development of a partnership between two people who genuinely like and respect each other, which is the same emotional register Baldree works in. Warm, intelligent, and driven by curiosity rather than conflict. Caveat: more adventure and less slice-of-life than Legends & Lattes — there are actual dragons and occasional peril.",
            tags: [
              'Slow Burn',
              'Partnership Romance',
              'Historical Fantasy',
              'Dragons',
              'Female Protagonist',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=A+Natural+History+of+Dragons+Marie+Brennan',
            bookshop_url:
              'https://bookshop.org/search?keywords=Natural+History+Dragons+Marie+Brennan',
          },
          {
            title: 'Uprooted',
            author: 'Naomi Novik',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780804179058-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: "The romance between Agnieszka and the Dragon develops through friction, proximity, and gradually earned trust — the same architecture as Viv and Tandri, just compressed into a standalone and set against a darker backdrop. Novik writes slow-burn with real patience, letting the relationship shift through small revelations rather than dramatic moments. Caveat: significantly darker than Legends & Lattes and the stakes are genuinely high — this is not a cozy book, it's a fairy-tale standalone with a cozy-shaped romance inside it.",
            tags: [
              'Slow Burn',
              'Fairy-Tale Fantasy',
              'Standalone',
              'Female Power',
              'Forced Proximity',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Uprooted+Naomi+Novik',
            bookshop_url:
              'https://bookshop.org/search?keywords=Uprooted+Naomi+Novik',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'The Goblin Emperor',
        author: 'Katherine Addison',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780765365682-L.jpg',
        darkness_level: 2,
        heat_level: null,
        tags: [
          'Cozy Fantasy',
          'Kind Protagonist',
          'Found Family',
          'Low Stakes',
          'Political Warmth',
        ],
        why: 'The half-goblin youngest son who accidentally inherits an empire. Addison does what Baldree does: she insists that kindness is strength, not naivety, and builds the entire novel around a gentle person finding their footing in a world that underestimates them. Where Legends & Lattes finds its warmth in a coffee shop, Goblin Emperor finds it in a court — same emotional register, completely different setting. If you finished Legends & Lattes wanting more low-stakes stories about fundamentally decent people refusing to become harder, start here.',
        standalone: true,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Goblin+Emperor+Katherine+Addison',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Goblin+Emperor+Katherine+Addison',
      },
      {
        title: 'Under the Whispering Door',
        author: 'TJ Klune',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781250217349-L.jpg',
        darkness_level: 2,
        heat_level: 'Closed Door',
        tags: [
          'Cozy Fantasy',
          'Found Family',
          'Queer Romance',
          'Death & Grief',
          'Warm Tone',
        ],
        why: "A recently deceased lawyer arrives at a teashop that serves as a waystation between life and death, and is forced to reckon with the life he failed to live. Klune writes warmth with the same unhurried hand Baldree uses — the community that forms in the teashop has the same texture as the one that forms around Viv's coffee bar. The romance is slow and earned, the emotional arc is about learning to be soft, and the book is fundamentally kind to its characters even when it's making them uncomfortable. Slightly more melancholy than Legends & Lattes, but the overall effect is comparable.",
        standalone: true,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=Under+the+Whispering+Door+TJ+Klune',
        bookshop_url:
          'https://bookshop.org/search?keywords=Under+Whispering+Door+TJ+Klune',
      },
      {
        title: "Howl's Moving Castle",
        author: 'Diana Wynne Jones',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780064410342-L.jpg',
        darkness_level: 1,
        heat_level: 'Sweet Romance',
        tags: ['Cozy Fantasy', 'Classic', 'Witty', 'Found Family', 'Magic'],
        why: "The classic entry point for readers who want fantasy that is primarily warm and funny rather than epic and dangerous. Sophie is cursed into an old woman's body and ends up in a wizard's castle full of petty magic, bad cooking, and an ensemble of characters who slowly, grudgingly care about each other. Wynne Jones invented much of what makes cozy fantasy work: the pleasure of competent characters in a small world, the slow-burn romance written with wit rather than angst, the sense that the plot exists to serve the characters rather than the other way around. If Legends & Lattes made you want more of that register, this is where the register comes from.",
        standalone: true,
        audiobook: true,
        amazon_url:
          "https://www.amazon.com/s?k=Howl's+Moving+Castle+Diana+Wynne+Jones",
        bookshop_url:
          "https://bookshop.org/search?keywords=Howl's+Moving+Castle+Diana+Wynne+Jones",
      },
    ],
    related: [
      { title: 'Books Like Piranesi', slug: 'piranesi' },
      { title: 'Books Like The Goblin Emperor', slug: 'the-goblin-emperor' },
      {
        title: 'Books Like The Priory of the Orange Tree',
        slug: 'the-priory-of-the-orange-tree',
      },
    ],
  },
  {
    slug: 'lord-of-the-rings',
    source: {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      db_slug: 'the-fellowship-of-the-ring',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg',
      darkness_level: 2,
      heat_level: null,
      series: 'The Lord of the Rings',
      series_number: 1,
      tropes: [
        'Epic Quest',
        'Dark Lord',
        'Ancient Evil',
        'Reluctant Hero',
        'Fellowship of Companions',
        'Maps & Deep Lore',
        'Good vs Evil',
        'World-Building',
      ],
      angle: 'Epic Quest Fantasy',
      answer_line:
        'If you loved The Lord of the Rings for the epic quest, deep worldbuilding, mythic weight, and fellowship-driven journey, start with The Eye of the World, The Way of Kings and The Goblin Emperor.',
      why_people_love: `The Fellowship of the Ring is the reason the word "epic" exists in fantasy. Tolkien built not just a story but an entire world — with languages, histories, genealogies, and myths stretching back thousands of years before the events of the novel — and somehow made all of that feel lived-in rather than encyclopaedic. What draws readers back is not the plot mechanics but the texture: the Shire's quiet domesticity against the enormity of what's coming, the sense that every hill and river has a name and a legend, the way the Fellowship itself — a dwarf, an elf, men, hobbits, a wizard — feels like a genuine group of people rather than a convenient lineup. The central argument of the book is moral rather than strategic: the Ring cannot be used against Sauron because power corrupts the one who wields it, and the only answer is to destroy it. That idea, paired with the image of the most ordinary people in the world carrying the most dangerous object, is what makes the story feel permanent.`,
    },
    aspects: [
      {
        heading:
          'If you loved the epic quest and the fellowship of companions...',
        recs: [
          {
            title: 'The Eye of the World',
            author: 'Robert Jordan',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780812511819-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'The Wheel of Time',
            series_number: 1,
            series_label: 'Series (14 books, complete)',
            audiobook: true,
            note: `The most structurally faithful heir to Fellowship of the Ring. Jordan consciously modelled the opening on Tolkien — a village of ordinary young people disrupted by a dark messenger, an urgent departure, a world that turns out to be far larger and more dangerous than they knew. The group dynamic across multiple POVs, the Aes Sedai as a Gandalf-equivalent (but more ambiguous), the ancient evil who was sealed away and is stirring again — all of it is Tolkien filtered through a more modern epic sensibility. The Wheel of Time runs to 14 volumes, but the first book works as a standalone introduction. Caveat: Jordan's prose is denser and less poetic than Tolkien's, and the series expands enormously in scope and cast before eventually converging; readers who want something finished should know the payoff is 14 books away.`,
            tags: [
              'Epic Quest',
              'Ancient Evil',
              'Multiple POVs',
              'Ensemble Cast',
              'Deep World-Building',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Eye+of+the+World+Robert+Jordan',
            bookshop_url:
              'https://bookshop.org/search?keywords=Eye+of+the+World+Robert+Jordan',
          },
          {
            title: 'The Way of Kings',
            author: 'Brandon Sanderson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'The Stormlight Archive',
            series_number: 1,
            series_label: 'Series (10 books planned, 5 released)',
            audiobook: true,
            note: `The most ambitious modern attempt at Tolkien's scale. Sanderson builds Roshar with the same density of history, culture, and cosmology — there are in-world documents, epigraphs, and flashback chapters that gradually reveal a world with thousands of years of buried truth. The ensemble cast is distinct and well-developed, the magic system (Stormlight, Surgebinding) is rigorously constructed, and the threat (the Desolations returning) operates on the same ancient-evil timescale as Sauron. At 1000+ pages, The Way of Kings rewards patience with the same sense of immersion as Fellowship. Caveat: Sanderson's prose is functional rather than lyrical — if you came to Tolkien primarily for the writing style, this will feel different; if you came for the world and the stakes, this delivers both.`,
            tags: [
              'Epic World-Building',
              'Ancient Threat',
              'Multiple POVs',
              'Magic System',
              'Long Series',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Way+of+Kings+Brandon+Sanderson',
          },
        ],
      },
      {
        heading:
          'If you loved the depth of world-building and the sense of deep, ancient history...',
        recs: [
          {
            title: 'The Name of the Wind',
            author: 'Patrick Rothfuss',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'The Kingkiller Chronicle',
            series_number: 1,
            series_label: 'Series (unfinished — 2 of 3 books released)',
            audiobook: true,
            note: `Where Tolkien builds his world outward through history and geography, Rothfuss builds his inward through myth, music, and the unreliability of stories. The world of the Four Corners feels ancient in the same way Middle-earth does — there are names for things that were old before the characters were born, languages that carry weight, and legends that the protagonist may actually be living. Kvothe is a very different kind of hero to Frodo, but both books share the quality of prose that reads like it belongs to the tradition of oral storytelling. Caveat: the series is currently unfinished (third book has no release date), and the second book ends without resolution; recommended for the experience of the first book, with that caveat clearly understood.`,
            tags: [
              'Lyrical Prose',
              'Deep Mythology',
              'Legendary Protagonist',
              'Magic University',
              'Storytelling',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss',
            bookshop_url:
              'https://bookshop.org/search?keywords=Name+of+the+Wind+Patrick+Rothfuss',
          },
          {
            title: 'The Priory of the Orange Tree',
            author: 'Samantha Shannon',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781635570304-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: `A 800-page standalone built with the same care for depth that Tolkien applied to Middle-earth. Shannon constructs a world with multiple civilisations, centuries of religious schism, rival interpretations of the same historical events, and a threat (the Nameless One, an ancient dragon) that works on Tolkien's timeline of ancient evil sealed away and returning. The multiple POV structure — set across different cultures with different relationships to the same dragon mythology — deliberately echoes how Tolkien's world looks different from different vantage points. The prose is more contemporary but equally considered. Recommended especially for Tolkien readers who want the scale and the dragon lore in a single complete book rather than a multi-volume series.`,
            tags: [
              'Dragon Lore',
              'Multiple POVs',
              'Deep History',
              'Standalone Epic',
              'Queer Romance',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Priory+of+the+Orange+Tree+Samantha+Shannon',
            bookshop_url:
              'https://bookshop.org/search?keywords=Priory+Orange+Tree+Samantha+Shannon',
          },
        ],
      },
      {
        heading:
          'If you loved that ordinary people carry the weight of the world...',
        recs: [
          {
            title: 'A Wizard of Earthsea',
            author: 'Ursula K. Le Guin',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780547773742-L.jpg',
            darkness_level: 2,
            heat_level: null,
            standalone: false,
            series: 'Earthsea Cycle',
            series_number: 1,
            series_label: 'Series (6 books, each standalone)',
            audiobook: true,
            note: `Le Guin wrote Earthsea in direct conversation with Tolkien — the same belief in secondary world as a moral space, the same respect for myth and geography, the same conviction that power comes with a cost. Ged is a goat-boy from a minor island who becomes the greatest wizard of his age, but the story is about what he has to confront to get there, not the external victories. The prose is the most Tolkien-adjacent of any modern fantasy writer: economical, weighty, and built to last. At under 200 pages, it is the opposite of Fellowship's scale — but it does everything Tolkien does with character and theme at a fraction of the length. Essential reading for anyone who loved what Fellowship was doing morally, not just narratively.`,
            tags: [
              'Classic Fantasy',
              'Humble Origins',
              'Moral Weight',
              'Coming of Age',
              'True Names',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=A+Wizard+of+Earthsea+Ursula+Le+Guin',
            bookshop_url:
              'https://bookshop.org/search?keywords=Wizard+Earthsea+Ursula+Le+Guin',
          },
          {
            title: 'The Goblin Emperor',
            author: 'Katherine Addison',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765365682-L.jpg',
            darkness_level: 2,
            heat_level: null,
            standalone: true,
            audiobook: true,
            note: `The most direct modern parallel to Frodo's arc: a protagonist who is not supposed to be important, who did not ask for the burden placed on him, and who responds to it not with heroic self-confidence but with quiet determination and fundamental decency. Maia inherits an empire he was never prepared for and navigates it without becoming ruthless — and the novel is quietly radical for insisting this is the right response rather than naivety. The court politics replace Fellowship's journey structure, but the emotional argument is the same: that small, kind people can carry enormous weight, and that their smallness is not a weakness. Caveat: very different in setting and plot; the connection is thematic rather than structural.`,
            tags: [
              'Kind Protagonist',
              'Unexpected Greatness',
              'Court Intrigue',
              'Standalone',
              'Hopeful',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Goblin+Emperor+Katherine+Addison',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Goblin+Emperor+Katherine+Addison',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like The Hobbit', slug: 'the-hobbit' },
      { title: 'Books Like The Eye of the World', slug: 'the-wheel-of-time' },
      { title: 'Books Like A Game of Thrones', slug: 'a-game-of-thrones' },
    ],
  },
  {
    slug: 'mistborn-the-final-empire',
    source: {
      title: 'Mistborn: The Final Empire',
      author: 'Brandon Sanderson',
      db_slug: 'the-final-empire',
      cover_url:
        'https://books.google.com/books/publisher/content/images/frontcover/dlfOfxkm1PoC?fife=w400-h600',
      darkness_level: 3,
      heat_level: null,
      series: 'Mistborn',
      series_number: 1,
      tropes: [
        'Found Family',
        'Heist Fantasy',
        'Chosen One',
        'Oppressive Empire',
        'Power at a Cost',
      ],
      angle: 'Epic Heist Fantasy',
      answer_line:
        'If you loved Mistborn for the rule-based magic, heist structure, underdog rebellion, and crew dynamic, start with The Way of Kings, Six of Crows and The Lies of Locke Lamora.',
      why_people_love:
        "Mistborn earns its devoted readership through two things it does better than almost anyone else: a magic system that feels genuinely original and fair, and a heist narrative that gives the mechanics somewhere to actually go. Kelsier is one of fantasy's great charismatic leaders — magnetic, morally complicated, and driving every scene he's in. The world of ash and eternal night has a weight to it that most secondary worlds don't manage, and the finale earns its emotional punch. Fair warning: the first hundred pages are slow as Sanderson lays the groundwork. Push through — the back half moves fast and pays off everything it's been building.",
    },
    aspects: [
      {
        heading:
          'If you loved the hard magic system with rules and consequences...',
        recs: [
          {
            title: 'The Way of Kings',
            author: 'Brandon Sanderson',
            author_note: 'yes, more Sanderson — unavoidable',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'The Stormlight Archive',
            series_number: 1,
            series_label: 'Series (10 books planned)',
            audiobook: true,
            note: "Stormlight Archive is Sanderson operating at full scale. The magic — Stormlight, Shardblades, Radiant powers — is even more elaborately constructed than Allomancy. Slower opening than Mistborn, but by book's end you'll understand why people call it the best epic fantasy being written today. Caveat: the first 200 pages test your patience. Push through.",
            tags: ['Hard Magic', 'Epic Scale', 'Multiple POVs'],
            amazon_url:
              'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Way+of+Kings+Sanderson',
          },
          {
            title: 'The Name of the Wind',
            author: 'Patrick Rothfuss',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg',
            darkness_level: 2,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'The Kingkiller Chronicle',
            series_number: 1,
            series_label: 'Series (unfinished — be warned)',
            audiobook: true,
            note: "Where Sanderson builds systems, Rothfuss builds atmosphere. The magic here — Sympathy — has its own internal logic but feels more like chemistry than physics. Kvothe is the anti-Vin: arrogant, brilliant, unreliable. The prose is genuinely beautiful in a way Sanderson's isn't. Caveat: book 3 has been unfinished for 14 years. Read knowing this.",
            tags: ['Hard Magic', 'Single POV', 'Slower Burn'],
            amazon_url:
              'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss',
          },
        ],
      },
      {
        heading: 'If you loved the heist and underdog structure...',
        recs: [
          {
            title: 'Six of Crows',
            author: 'Leigh Bardugo',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781627792127-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'Six of Crows',
            series_number: 1,
            series_label: 'Series (duology)',
            audiobook: true,
            note: "The most purely fun book on this list. Six morally compromised people plan an impossible heist. The ensemble structure means you're never bored, and Bardugo's Ketterdam feels as lived-in as the Final Empire. Less hard magic, more character chemistry. Caveat: read Bardugo's Shadow and Bone trilogy first or you'll miss context.",
            tags: ['Heist', 'Found Family', 'Morally Grey Characters'],
            amazon_url: 'https://www.amazon.com/s?k=Six+of+Crows+Leigh+Bardugo',
            bookshop_url:
              'https://bookshop.org/search?keywords=Six+of+Crows+Leigh+Bardugo',
          },
          {
            title: 'The Lies of Locke Lamora',
            author: 'Scott Lynch',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'Gentleman Bastard',
            series_number: 1,
            series_label: 'Series (ongoing)',
            audiobook: true,
            note: 'If the heist planning and crew chemistry were your main draws, this is the more hardcore version. The Gentleman Bastards are con artists in a city that feels genuinely dangerous, and the schemes are elaborately satisfying. Lynch writes banter better than almost anyone. Caveat: significantly darker and more violent than Mistborn. The pacing in the middle third is uneven but the payoff is real.',
            tags: ['Heist', 'Con Artists', 'Dark World'],
            amazon_url:
              'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
          },
        ],
      },
      {
        heading: 'If you want something darker with the same epic scope...',
        recs: [
          {
            title: 'The Poppy War',
            author: 'R.F. Kuang',
            cover_url:
              'https://books.google.com/books/content?id=NKB8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            darkness_level: 5,
            heat_level: null,
            standalone: false,
            series: 'The Poppy War',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "This is where the caveats matter most. The Poppy War starts feeling somewhat like Mistborn — scrappy underdog enters elite military academy, discovers terrifying power — and then it becomes one of the darkest fantasy novels published in the last decade. Inspired by the Second Sino-Japanese War. If you can handle it, it's extraordinary. If you want something hopeful, go elsewhere.",
            tags: ['Underdog', 'Military Academy', 'Hard Power System'],
            warning: 'War Crimes, Genocide, Drug Addiction, Torture',
            amazon_url: 'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Poppy+War+Kuang',
          },
          {
            title: 'The Blade Itself',
            author: 'Joe Abercrombie',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'The First Law',
            series_number: 1,
            series_label: 'Series (trilogy + standalones)',
            audiobook: true,
            note: "Mistborn subverts the Chosen One trope; The Blade Itself goes further, cheerfully dismantling every heroic fantasy convention it can find. The ensemble cast is morally compromised in ways that feel earned rather than edgy, and Abercrombie's ear for character voice is exceptional. Caveat: if you were drawn to Mistborn's sense of hope — the idea that the underdog can actually win — the First Law will actively antagonise that instinct. It's a deconstruction.",
            tags: [
              'Grimdark',
              'Morally Grey Characters',
              'Subverted Tropes',
              'Ensemble Cast',
            ],
            warning: 'Graphic violence, torture, war crimes.',
            amazon_url:
              'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
          },
        ],
      },
      {
        heading:
          'If you want a standalone before committing to a long series...',
        recs: [
          {
            title: 'Elantris',
            author: 'Brandon Sanderson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765350374-L.jpg',
            darkness_level: 2,
            heat_level: null,
            standalone: true,
            audiobook: true,
            note: "His first published novel, and it shows — the prose is rougher, the characters less developed than Mistborn — but the mystery of the broken magic system is compelling and it resolves completely in one volume. A good Sanderson on-ramp if you're not ready to commit to a 10-book series.",
            tags: ['Standalone', 'Broken Magic System', 'Political Intrigue'],
            amazon_url: 'https://www.amazon.com/s?k=Elantris+Brandon+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Elantris+Sanderson',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'The Lies of Locke Lamora',
        author: 'Scott Lynch',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
        darkness_level: 4,
        heat_level: null,
        tags: [
          'Heist Fantasy',
          'Con Artists',
          'Found Family',
          'Dark World',
          'Clever Protagonists',
        ],
        why: "The closest thing to Mistborn's heist energy you'll find. The Gentleman Bastards are a crew of con artists operating in a city that feels genuinely dangerous, and the schemes are elaborately satisfying in the same way Allomancy is — complex, with costs, and revealed in layers. Lynch writes banter better than almost anyone in the genre. Caveat: significantly darker and more violent than Mistborn, and the pacing in the middle third is uneven. The payoff is worth it.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
      },
      {
        title: 'Six of Crows',
        author: 'Leigh Bardugo',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781627792127-L.jpg',
        darkness_level: 3,
        heat_level: 'Closed Door',
        tags: [
          'Heist Fantasy',
          'Found Family',
          'Multiple POVs',
          'Morally Grey Characters',
        ],
        why: "If Mistborn's heist structure and found family dynamic were your main draws, Six of Crows delivers both with more romance. A crew of misfit criminals planning an impossible prison break — the structure is familiar, the execution is sharp, and Kaz Brekker is one of the genre's better morally grey leads. Caveat: lighter in tone and the magic system is less central. It's Bardugo at her best, which is very good, but a different kind of book.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Six+of+Crows+Leigh+Bardugo',
        bookshop_url:
          'https://bookshop.org/search?keywords=Six+of+Crows+Leigh+Bardugo',
      },
      {
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg',
        darkness_level: 2,
        heat_level: 'Sweet Romance',
        tags: [
          'Underdog Hero',
          'First Person Narrative',
          'University Setting',
          'Legendary Protagonist',
        ],
        why: "Sympathy and Naming are built with the same rigorous internal logic as Allomancy, and Kvothe's outsider-genius arc has the same propulsive quality as Vin's. The prose is a step up from Sanderson. Caveat: the series is unfinished and has been for fifteen years — book three shows no sign of arriving. If you can make peace with that, the first two books are genuinely exceptional.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss',
      },
      {
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
        darkness_level: 3,
        heat_level: null,
        tags: ['Found Family', 'Multiple POVs', 'Massive World', 'Same Author'],
        why: "The obvious next step if you loved Mistborn and want more Sanderson at full scale. Three interconnected magic systems, multiple continents, and characters who are psychologically complex in ways Mistborn only hints at. Kaladin's arc in book one is the best thing Sanderson has written. Caveat: this is a serious commitment — book one is over 1,000 pages and the series currently stands at five volumes.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Way+of+Kings+Sanderson',
      },
      {
        title: 'The Blade Itself',
        author: 'Joe Abercrombie',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
        darkness_level: 4,
        heat_level: null,
        tags: [
          'Grimdark',
          'Morally Grey Characters',
          'Subverted Tropes',
          'Political Intrigue',
          'Ensemble Cast',
        ],
        why: "Mistborn subverts the Chosen One trope in interesting ways; The Blade Itself goes further, cheerfully dismantling every heroic fantasy convention it can find. The ensemble cast is morally compromised in ways that feel earned rather than edgy. Caveat: if you were drawn to Mistborn's sense of hope — the idea that the underdog can actually win — the First Law trilogy will actively antagonise that instinct. It's a deconstruction.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
      },
      {
        title: 'Elantris',
        author: 'Brandon Sanderson',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780765350374-L.jpg',
        darkness_level: 2,
        heat_level: null,
        tags: [
          'Standalone',
          'Political Intrigue',
          'Broken Magic System',
          'Same Author',
          'Dual POV',
        ],
        why: 'If you want more Sanderson before committing to a 10-book series, Elantris is the gentler on-ramp. His first published novel — the prose is rougher and the characters less developed — but the mystery of the broken magic system is compelling and it resolves completely in one volume. Caveat: lower expectations on prose and character depth, enjoy the puzzle plot.',
        standalone: true,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Elantris+Brandon+Sanderson',
        bookshop_url: 'https://bookshop.org/search?keywords=Elantris+Sanderson',
      },
    ],
    related: [
      { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
      { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
      {
        title: 'Books Like The Name of the Wind',
        slug: 'the-name-of-the-wind',
      },
    ],
  },
  {
    slug: 'the-name-of-the-wind',
    source: {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      cover_url:
        'https://books.google.com/books/publisher/content/images/frontcover/DSyJEAAAQBAJ?fife=w400-h600',
      darkness_level: 2,
      heat_level: 'Sweet Romance',
      series: 'The Kingkiller Chronicle',
      series_number: 1,
      tropes: [
        'Unreliable Narrator',
        'Magic University',
        'Legendary Hero',
        'Slow Burn Romance',
        'Rags to Riches',
        'Hard Magic System',
      ],
      angle: 'Lyrical Epic Fantasy',
      answer_line:
        'If you loved The Name of the Wind for the lyrical prose, gifted outsider lead, university arc, and storytelling-within-story atmosphere, start with Jonathan Strange & Mr Norrell, The Lies of Locke Lamora and The Magicians.',
      why_people_love:
        "The Name of the Wind earns its reputation through one thing that almost no other fantasy novel manages: prose that is genuinely, consistently beautiful. Rothfuss writes sentences you stop and reread. The frame narrative — an innkeeper who was once the most famous man in the world, now telling his own story — creates a melancholy that runs under everything, because you know the legend didn't end well. Kvothe is arrogant and brilliant and often wrong in ways that cost him, which makes him one of the more human protagonists in epic fantasy. The magic system feels like chemistry and music rather than physics, and the university sections have a grounded, lived-in quality that's rare in the genre. Fair warning: this is the first book of a trilogy that has been unfinished since 2011, with no confirmed publication date for book three. Read it knowing this.",
    },
    aspects: [
      {
        heading: 'If you loved the prose and the storytelling craft...',
        recs: [
          {
            title: 'Jonathan Strange & Mr Norrell',
            author: 'Susanna Clarke',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781582344164-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: true,
            audiobook: true,
            note: "The only fantasy novel that can match Rothfuss for prose distinction — but they're doing entirely different things with it. Clarke writes in the style of a Victorian historian cataloguing impossible events, complete with footnotes, and the effect is hypnotic. Magic here feels genuinely strange and unknowable. If you read Name of the Wind primarily for the voice and the atmosphere, this is the closest equivalent — and it has the advantage of being complete. Caveat: extremely slow. This rewards patience in a way that Rothfuss doesn't demand.",
            tags: [
              'Literary Prose',
              'Standalone',
              'Historical Setting',
              'Strange Magic',
              'Unique Voice',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke',
            bookshop_url:
              'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell',
          },
          {
            title: 'The Lies of Locke Lamora',
            author: 'Scott Lynch',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'Gentleman Bastard',
            series_number: 1,
            series_label: 'Series (ongoing)',
            audiobook: true,
            note: "Where Rothfuss builds atmosphere, Lynch builds momentum. The Gentleman Bastards are con artists in a city that feels as lived-in as Tarbean, and Locke has the same outsider-genius quality as Kvothe — brilliant, scrappy, too clever for his own good. The banter is exceptional and the schemes are elaborately satisfying. Caveat: darker and more violent, with much less interiority. You're in the plot rather than in a character's head.",
            tags: [
              'Heist',
              'Con Artists',
              'Morally Grey Hero',
              'Dark City',
              'Found Family',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
          },
        ],
      },
      {
        heading:
          'If you loved the magic university and the underdog genius arc...',
        recs: [
          {
            title: 'The Magicians',
            author: 'Lev Grossman',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780670020553-L.jpg',
            darkness_level: 4,
            heat_level: 'Open Door',
            standalone: false,
            series: 'The Magicians',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "A magic university novel that takes Rothfuss's premise and deliberately darkens it. Quentin Coldwater is Kvothe without the self-assurance — equally talented, far more self-destructive — and Brakebills has the same rigorous, rules-based approach to magic as the University. The prose is sharp and the deconstruction of fantasy expectations is bracingly honest. Caveat: this is a deeply melancholy book that takes seriously what it would actually feel like to get everything you wanted. Not a comfort read.",
            tags: [
              'Magic University',
              'Deconstruction',
              'Dark Tone',
              'Coming of Age',
              'Hard Magic',
            ],
            warning:
              'Depression, suicidal ideation, substance abuse, sexual content.',
            amazon_url: 'https://www.amazon.com/s?k=The+Magicians+Lev+Grossman',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Magicians+Lev+Grossman',
          },
          {
            title: 'A Deadly Education',
            author: 'Naomi Novik',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780593128480-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'The Scholomance',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "A magic school that actively tries to kill you, a prickly female Kvothe who's been told she's destined for destruction, and a magic system built around rules, costs, and consequences. The voice is the draw — El is acerbic and funny and precisely observant in a way that makes the pages disappear. Lighter in tone than Rothfuss but similarly driven by a single compelling protagonist's interiority. Caveat: lighter stakes, more YA energy despite the dark premise.",
            tags: [
              'Magic School',
              'Sardonic Voice',
              'Hard Magic',
              'Survival',
              'Slow Burn',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=A+Deadly+Education+Naomi+Novik',
            bookshop_url:
              'https://bookshop.org/search?keywords=A+Deadly+Education+Novik',
          },
        ],
      },
      {
        heading: 'If you loved the hard magic system with internal logic...',
        recs: [
          {
            title: 'Mistborn: The Final Empire',
            author: 'Brandon Sanderson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'Mistborn',
            series_number: 1,
            series_label: 'Series (trilogy + sequel trilogy)',
            audiobook: true,
            note: "The obvious contrast. Where Sympathy feels like chemistry — intuitive, physical, dangerous when you're tired — Allomancy feels like physics: each metal does one thing, you can map it, and Sanderson never cheats. If the rigour of Rothfuss's magic system was your hook, Sanderson is the natural next step. Caveat: the prose is functional rather than beautiful, which will be an adjustment. The trade-off is a complete, satisfying story with a real ending.",
            tags: [
              'Hard Magic System',
              'Underdog Hero',
              'Heist',
              'Complete Series',
              'World-Building',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Mistborn+Final+Empire+Brandon+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson',
          },
        ],
      },
      {
        heading:
          'If you want something complete while you wait for book three...',
        recs: [
          {
            title: 'Uprooted',
            author: 'Naomi Novik',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780804179058-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: 'A standalone fairy-tale fantasy with prose that has the same lyrical quality as Rothfuss, a magic system that feels organic rather than mechanical, and a slow-burn tension between protagonists that earns its resolution — all in one volume. If waiting indefinitely for Doors of Stone has you burned, this is the palate cleanser: beautiful, complete, deeply satisfying. Caveat: lower stakes than Kingkiller, more fairy tale than epic. The ambition is different.',
            tags: [
              'Standalone',
              'Lyrical Prose',
              'Slow Burn',
              'Fairy-Tale Vibes',
              'Female Power',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Uprooted+Naomi+Novik',
            bookshop_url:
              'https://bookshop.org/search?keywords=Uprooted+Naomi+Novik',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: "The Wise Man's Fear",
        author: 'Patrick Rothfuss',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780756404734-L.jpg',
        darkness_level: 3,
        heat_level: 'Open Door',
        tags: [
          'Same Series',
          'Kvothe',
          'Travel',
          'Magic University',
          'Legendary Hero',
        ],
        why: "The obvious next step and arguably the better book — longer, darker, more confident, and with a section in the middle that represents Rothfuss at his absolute peak. Kvothe leaves the University and the world opens up: new continents, new magic, and the Adem warrior culture that recontextualises everything. Caveat: it ends as inconclusively as book one. You're still waiting for book three. This is the cost of entry.",
        standalone: false,
        audiobook: true,
        amazon_url:
          "https://www.amazon.com/s?k=The+Wise+Man's+Fear+Patrick+Rothfuss",
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Wise+Man+Fear+Rothfuss',
      },
      {
        title: 'The Lies of Locke Lamora',
        author: 'Scott Lynch',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
        darkness_level: 4,
        heat_level: null,
        tags: [
          'Heist',
          'Con Artists',
          'Morally Grey Hero',
          'Brilliant Protagonist',
          'Dark City',
        ],
        why: "The closest thing to Kvothe's outsider-genius energy in a completely different setting. Locke is a con artist rather than a magician, but the dynamic is the same: someone who is better at this than anyone around him, operating in a world that keeps raising the stakes. Lynch's Camorr is as vividly constructed as Rothfuss's Tarbean, and the schemes are satisfying in ways that Sympathy demonstrations are. Caveat: darker, more violent, less interior. You're in the plot rather than in a character's head.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
      },
      {
        title: 'Jonathan Strange & Mr Norrell',
        author: 'Susanna Clarke',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781582344164-L.jpg',
        darkness_level: 3,
        heat_level: null,
        tags: [
          'Literary Prose',
          'Standalone',
          'Unique Voice',
          'Historical Setting',
          'Strange Magic',
        ],
        why: "The only other fantasy novel with prose of comparable distinction — though operating in a completely different register. Clarke's Victorian-historian voice is as controlled and deliberate as Rothfuss's lyrical one, and her magic is genuinely strange in a way that most fantasy never manages. The book takes its time the way Rothfuss does, building atmosphere before plot. Caveat: extremely slow, and the human characters are often less interesting than the world around them. Has the advantage of being complete.",
        standalone: true,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke',
        bookshop_url:
          'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell',
      },
      {
        title: 'Mistborn: The Final Empire',
        author: 'Brandon Sanderson',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
        darkness_level: 3,
        heat_level: null,
        tags: [
          'Hard Magic System',
          'Underdog Hero',
          'Complete Story',
          'Heist',
          'World-Building',
        ],
        why: "The natural companion read for anyone who responded most to Sympathy's rigour. Allomancy is Sanderson's best standalone system — clean rules, high costs, and a heist narrative that gives the mechanics real purpose. Where Rothfuss never quite finished, Sanderson delivers a complete, emotionally satisfying arc. Caveat: the prose is workmanlike where Rothfuss is beautiful. The trade-off is a story that actually ends.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=Mistborn+Final+Empire+Brandon+Sanderson',
        bookshop_url:
          'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson',
      },
      {
        title: 'The Magicians',
        author: 'Lev Grossman',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780670020553-L.jpg',
        darkness_level: 4,
        heat_level: 'Open Door',
        tags: [
          'Magic University',
          'Deconstruction',
          'Brilliant Protagonist',
          'Dark Tone',
          'Coming of Age',
        ],
        why: "What happens if you take Rothfuss's magic university premise and strip away all the heroic framing? Grossman asks that question seriously. Quentin is as gifted as Kvothe and even less emotionally equipped to deal with it, and Brakebills has the same rigorous approach to magical theory. The book is sharply written and genuinely melancholy. Caveat: this is a deconstruction of fantasy wish-fulfilment, not an endorsement of it. If you read Kingkiller primarily for the adventure, recalibrate.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Magicians+Lev+Grossman',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Magicians+Grossman',
      },
      {
        title: 'Uprooted',
        author: 'Naomi Novik',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780804179058-L.jpg',
        darkness_level: 3,
        heat_level: 'Closed Door',
        tags: [
          'Standalone',
          'Lyrical Prose',
          'Complete',
          'Slow Burn',
          'Fairy-Tale Vibes',
        ],
        why: 'The best answer to the "I need something beautiful that actually finishes" problem. Novik\'s prose has a lyrical quality in the Rothfuss register, the magic feels organic and uncategorisable, and the slow-burn tension earns a genuine resolution. One book, complete, satisfying. Caveat: smaller stakes than Kingkiller, more intimate in scope. The ambition is different but the craft is real.',
        standalone: true,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Uprooted+Naomi+Novik',
        bookshop_url:
          'https://bookshop.org/search?keywords=Uprooted+Naomi+Novik',
      },
    ],
    related: [
      { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
      { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
      { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
    ],
  },
  {
    slug: 'piranesi',
    source: {
      title: 'Piranesi',
      author: 'Susanna Clarke',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781526622426-L.jpg',
      darkness_level: 2,
      heat_level: null,
      series: null,
      series_number: null,
      tropes: [
        'Unreliable Narrator',
        'Mysterious World',
        'Literary Fantasy',
        'Mystery',
        'Isolation',
        'Unique Atmosphere',
      ],
      angle: 'Literary Mystery Fantasy',
      answer_line:
        'If you loved Piranesi for the dreamlike architecture, quiet mystery, meditative tone, and slow revelation of hidden truth, start with Jonathan Strange & Mr Norrell, The Buried Giant and The Starless Sea.',
      why_people_love: `Piranesi is a book that is almost impossible to describe without diminishing it. A man lives alone in a House of infinite halls filled with tidal statues and flooding lower vestibules, cataloguing everything with meticulous care and complete contentment — and he has no memory of how he got there. Clarke withholds information in a way that never feels cruel, allowing the strangeness of the world to accumulate until it means something. The mystery unfolds slowly and the revelation, when it comes, recontextualises everything without undercutting the beauty. Readers who found it difficult to return to other fiction afterward were responding to the rarity of a book this formally perfect, this controlled, this genuinely unlike anything else. It is short (272 pages), complete in one volume, and asks nothing of you except patience.`,
    },
    aspects: [
      {
        heading:
          'If you loved the impossible, dreaming architecture of the House...',
        recs: [
          {
            title: 'Jonathan Strange & Mr Norrell',
            author: 'Susanna Clarke',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781582344164-L.jpg',
            darkness_level: 3,
            standalone: true,
            audiobook: true,
            note: "Clarke's first novel, and the most direct companion to Piranesi — the Raven King's roads and the mirrors that lead to other places are made of the same imaginative material as the House. Set in Napoleonic England where magic is returning, it is longer (800 pages), slower, and structured as an intricate Victorian comedy-of-manners before it becomes something far stranger. The footnotes alone constitute a second book. If Piranesi made you want to live inside Clarke's imagination, this is where to go next — it requires more patience but rewards it with extraordinary density.",
            tags: [
              'Unique World',
              'English Magic',
              'Victorian Style',
              'Dark Fairy Tale',
              'Literary',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Jonathan+Strange+Mr+Norrell+Susanna+Clarke',
            bookshop_url:
              'https://bookshop.org/search?keywords=Jonathan+Strange+Mr+Norrell+Clarke',
          },
          {
            title: 'The Buried Giant',
            author: 'Kazuo Ishiguro',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780307455796-L.jpg',
            darkness_level: 3,
            standalone: true,
            audiobook: true,
            note: "Post-Arthurian England, where a collective amnesia has erased everyone's memory of the recent past. An elderly couple set out on a journey and gradually, gently, the truth of what they have forgotten begins to surface. Ishiguro uses the fantasy setting the same way Clarke does in Piranesi — not as spectacle but as a formal mechanism for exploring what it means to know and not know. The world is strange and quiet, the atmosphere is melancholy and precise, and the central mystery reshapes the meaning of everything that came before it. Caveat: slow and literary; there is genuine fantasy here (a dragon, Arthurian knights) but it is never foregrounded.",
            tags: [
              'Arthurian',
              'Literary Fantasy',
              'Memory',
              'Quiet World',
              'Bittersweet',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Buried+Giant+Kazuo+Ishiguro',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Buried+Giant+Ishiguro',
          },
        ],
      },
      {
        heading:
          'If you loved the unreliable narrator and the mystery unfolding...',
        recs: [
          {
            title: 'The Unspoken Name',
            author: 'A.K. Larkwood',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250238900-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'The Serpent Gates',
            series_number: 1,
            series_label: 'Series (duology, complete)',
            audiobook: true,
            note: "A priestess raised to be sacrificed escapes her fate and spends the novel piecing together who she is outside the identity that was imposed on her. The structure of self-discovery through accumulated revelations maps onto Piranesi's experience — a protagonist whose understanding of their own situation is radically incomplete, slowly reconstructing a world that was hidden from them. The tone is darker and more action-forward than Clarke's novel, but the central formal pleasure is the same: reality is not what it appeared. Caveat: significantly more violent and plot-driven than Piranesi.",
            tags: [
              'Unreliable Self',
              'Identity Mystery',
              'Dark Fantasy',
              'Found Family',
              'Portal Fantasy',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Unspoken+Name+AK+Larkwood',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Unspoken+Name+Larkwood',
          },
          {
            title: 'The Starless Sea',
            author: 'Erin Morgenstern',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780385541213-L.jpg',
            darkness_level: 2,
            standalone: true,
            audiobook: true,
            note: "A graduate student finds a book that contains a story about himself and follows it into an underground world of endless stories and doors. Morgenstern builds environments the way Clarke does — the Starless Sea is a place whose rules must be inferred, whose beauty is its primary argument, and whose logic is narrative rather than physical. The mystery of what is happening and why accumulates slowly and is never quite fully resolved. Caveat: looser structurally than Piranesi — the plot dissolves into atmosphere more than it resolves into revelation. If Piranesi's precision was the main appeal, this is its dreamier, less controlled cousin.",
            tags: [
              'Impossible World',
              'Stories Within Stories',
              'Atmospheric',
              'Literary Fantasy',
              'Standalone',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Starless+Sea+Erin+Morgenstern',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Starless+Sea+Morgenstern',
          },
        ],
      },
      {
        heading:
          'If you loved the quiet, meditative tone and the beauty of small details...',
        recs: [
          {
            title: 'The Ocean at the End of the Lane',
            author: 'Neil Gaiman',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780062255655-L.jpg',
            darkness_level: 3,
            standalone: true,
            audiobook: true,
            note: 'A middle-aged man returns to the farm at the end of his childhood lane and remembers things he had entirely forgotten. Gaiman writes the same collision of the mundane and the cosmically strange that Clarke does — the pond that is an ocean, the housekeeper who is something very old, the child protagonist who understands more than he should. The prose is precise and restrained, the wonder is earned through specific detail, and the emotional core is about the weight of forgotten things. Caveat: shorter and more parable-like than Piranesi; the mystery resolves rather than opens outward.',
            tags: [
              'Childhood Wonder',
              'Literary Fantasy',
              'Cosmic Horror-Adjacent',
              'Memory',
              'Standalone',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Ocean+at+the+End+of+the+Lane+Neil+Gaiman',
            bookshop_url:
              'https://bookshop.org/search?keywords=Ocean+End+Lane+Neil+Gaiman',
          },
          {
            title: 'Anansi Boys',
            author: 'Neil Gaiman',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780060515195-L.jpg',
            darkness_level: 2,
            standalone: true,
            audiobook: true,
            note: 'A perfectly ordinary man discovers his father was Anansi the spider god, and that he has a brother who has inherited powers he never knew existed. Gaiman writes myth with the same quality Clarke brings to the House — events feel both impossible and exactly right, the world has a logic that only becomes clear in retrospect, and the prose is unhurried and precise. The tone is warmer and funnier than Piranesi, but the sense that reality is larger and stranger than any individual can perceive is the same. Caveat: more comedic and plot-driven; the meditative quality is lower, the wit higher.',
            tags: [
              'Mythology',
              'Trickster Gods',
              'Literary Fantasy',
              'Warm Tone',
              'Standalone',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Anansi+Boys+Neil+Gaiman',
            bookshop_url:
              'https://bookshop.org/search?keywords=Anansi+Boys+Neil+Gaiman',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'The Night Circus',
        author: 'Erin Morgenstern',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg',
        darkness_level: 2,
        heat_level: 'Closed Door',
        tags: [
          'Atmospheric',
          'Magical World',
          'Beautiful Prose',
          'Mystery',
          'Standalone',
        ],
        why: 'A black and white circus that appears without warning in the night, filled with tents containing impossible things. Morgenstern builds atmosphere with the same precision Clarke uses — the House and the circus both exist as places where you catalogue beauty and try to understand the rules. The Night Circus is more explicitly a love story and its plot is more conventional, but the core experience is the same: a magical world that rewards slow, careful attention. Readers who loved Piranesi for its atmosphere rather than its mystery will find this the easiest transition.',
        standalone: true,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Night+Circus+Erin+Morgenstern',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Night+Circus+Erin+Morgenstern',
      },
      {
        title: 'The Starless Sea',
        author: 'Erin Morgenstern',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780385541213-L.jpg',
        darkness_level: 2,
        heat_level: 'Closed Door',
        tags: [
          'Labyrinthine World',
          'Books Within Books',
          'Literary Fantasy',
          'Mystery',
          'Atmospheric',
        ],
        why: "A graduate student follows a story that seems to be about him through a series of impossible doors into an underground world of stories, seas, and libraries. Where Piranesi has one man cataloguing one impossible place, Starless Sea has a labyrinthine world of nested narratives that comment on each other. The reading experience is comparable: you are inside a beautiful, strange thing that you understand in pieces. Morgenstern's prose is ornate and her plot is deliberately non-linear. Caveat: the story architecture is looser than Piranesi's — this is a book to be experienced rather than solved, and some readers find it unsatisfying as a result.",
        standalone: true,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Starless+Sea+Erin+Morgenstern',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Starless+Sea+Erin+Morgenstern',
      },
    ],
    related: [
      { title: 'Books Like Legends & Lattes', slug: 'legends-and-lattes' },
      {
        title: 'Books Like The Name of the Wind',
        slug: 'the-name-of-the-wind',
      },
      {
        title: 'Books Like The Priory of the Orange Tree',
        slug: 'the-priory-of-the-orange-tree',
      },
    ],
  },
  {
    slug: 'the-poppy-war',
    source: {
      title: 'The Poppy War',
      author: 'R.F. Kuang',
      cover_url:
        'https://books.google.com/books/content?id=NKB8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      darkness_level: 5,
      heat_level: null,
      series: 'The Poppy War',
      series_number: 1,
      tropes: [
        'Prodigy Protagonist',
        'War & Conflict',
        'Chosen One',
        'Dark Power',
        'Historical Basis',
        'Female Warrior',
      ],
      angle: 'Dark Military Fantasy',
      answer_line:
        'If you loved The Poppy War for the brutal military-school arc, morally eroding protagonist, war atrocity, and power-with-consequences, start with Nevernight, Red Sister and The Blade Itself.',
      why_people_love:
        'The Poppy War is the book that makes people sit with their mouth open at the end of part two. Kuang does something technically extraordinary: she builds a compelling YA-coded fantasy in the first third — military school, prodigy underdog, found family — and then pivots without warning into a war narrative based directly on the Second Sino-Japanese War and the Nanjing Massacre. The result is one of the most viscerally affecting fantasy novels of the last decade. Rin is a complicated, morally eroding protagonist whose power comes at a specific and terrible cost. Fair warning: the book contains extended depictions of wartime atrocity, genocide, and drug addiction. Kuang does not soften her historical source material. Approach only if you can handle darkness used seriously.',
    },
    aspects: [
      {
        heading:
          'If you loved the brutal military school and underdog prodigy arc...',
        recs: [
          {
            title: 'Nevernight',
            author: 'Jay Kristoff',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250301055-L.jpg',
            darkness_level: 5,
            heat_level: 'Explicit',
            standalone: false,
            series: 'The Nevernight Chronicle',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: "The closest structural parallel for the training school section. Mia Corvere is an underdog in an extremely dangerous school where failure is death, the social dynamics are brutal, and the protagonist's intelligence is the only weapon that matters. Both books use the school section as a vehicle for a much larger story about power and revenge. Caveat: Nevernight is more stylised and the explicit content (violence and sexual) is higher than Poppy War.",
            tags: [
              'Assassin School',
              'Prodigy Protagonist',
              'Morally Grey',
              'Revenge',
            ],
            warning: 'Graphic violence, explicit sexual content',
            amazon_url: 'https://www.amazon.com/s?k=Nevernight+Jay+Kristoff',
            bookshop_url:
              'https://bookshop.org/search?keywords=Nevernight+Jay+Kristoff',
          },
          {
            title: 'Red Sister',
            author: 'Mark Lawrence',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780425284049-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'Book of the Ancestor',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: 'The closest fantasy equivalent to the Poppy War school arc. Nona is a peasant girl with a gift for violence sent to a convent that trains young women to become warriors and assassins. The training is brutal, the social dynamics are vicious, and the protagonist is an underdog whose abilities emerge slowly and at cost. Lawrence writes with the same refusal to soften that Kuang has — the school sections are dark, the power is disturbing, and the story grows significantly heavier as the trilogy progresses. Caveat: starts slightly slower; the full payoff builds across three books.',
            tags: [
              'Assassin Convent',
              'Prodigy Protagonist',
              'Dark Magic',
              'Underdog',
              'Female Warrior',
            ],
            warning: 'Violence, dark themes',
            amazon_url: 'https://www.amazon.com/s?k=Red+Sister+Mark+Lawrence',
            bookshop_url:
              'https://bookshop.org/search?keywords=Red+Sister+Mark+Lawrence',
          },
        ],
      },
      {
        heading:
          'If you loved the grimdark war fantasy and historical depth...',
        recs: [
          {
            title: 'The Blade Itself',
            author: 'Joe Abercrombie',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'The First Law',
            series_number: 1,
            series_label: 'Series (3 books + 4 standalones + sequel trilogy)',
            audiobook: true,
            note: 'If the brutally honest depiction of war — the way it corrupts everyone it touches — was the draw, Abercrombie is the master class in the genre. The First Law refuses heroism the same way Kuang refuses it: with specific, undeniable consequences. Characters who started with principles progressively abandon them. The ending of the trilogy is a gut punch comparable to part two of The Poppy War. Caveat: no historical grounding, European secondary world, no female protagonist.',
            tags: [
              'Grimdark',
              'War Corruption',
              'Moral Erosion',
              'No Safe Heroism',
            ],
            warning: 'Violence, torture, war atrocity',
            amazon_url:
              'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
          },
          {
            title: 'She Who Became the Sun',
            author: 'Shelley Parker-Chan',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250621801-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'The Radiant Emperor',
            series_number: 1,
            series_label: 'Series (duology, complete)',
            audiobook: true,
            note: "The most direct parallel in setting and intent. Parker-Chan writes historical China-adjacent fantasy with the same unflinching commitment to what ambition costs — specifically what it costs a person who has no legitimate path to power. The protagonist assumes a dead boy's identity and fights upward through a brutal military world. The prose is exceptional. Caveat: slower paced than The Poppy War, less overt magic, more literary in construction.",
            tags: [
              'Historical China',
              'Female Protagonist',
              'Identity',
              'Military Ambition',
              'Literary',
            ],
            warning: 'Violence, war, themes of gender and identity',
            amazon_url:
              'https://www.amazon.com/s?k=She+Who+Became+the+Sun+Shelley+Parker-Chan',
            bookshop_url:
              'https://bookshop.org/search?keywords=She+Who+Became+the+Sun',
          },
        ],
      },
      {
        heading: 'If you loved the dark power and the cost of wielding it...',
        recs: [
          {
            title: 'Prince of Thorns',
            author: 'Mark Lawrence',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780441020409-L.jpg',
            darkness_level: 5,
            standalone: false,
            series: 'The Broken Empire',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: "A protagonist who has crossed lines that cannot be uncrossed, narrating his own moral dissolution with complete self-awareness. Jorg Ancrath and Rin occupy the same dark space: people who chose a terrible power and are still choosing it. Lawrence's prose is sharp and the unreliable narrator framing is used with real skill. Caveat: Jorg is younger than Rin and the book opens with a scene many readers find too extreme. The series demands you sit with a genuinely repellent protagonist.",
            tags: [
              'Morally Repellent Protagonist',
              'Dark Power',
              'Unreliable Narrator',
              'Post-Apocalyptic Medieval',
            ],
            warning: 'Extreme violence, sexual violence referenced',
            amazon_url:
              'https://www.amazon.com/s?k=Prince+of+Thorns+Mark+Lawrence',
            bookshop_url:
              'https://bookshop.org/search?keywords=Prince+of+Thorns+Mark+Lawrence',
          },
          {
            title: 'Red Rising',
            author: 'Pierce Brown',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780345539786-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'Red Rising Saga',
            series_number: 1,
            series_label: 'Series (6 books, ongoing)',
            audiobook: true,
            note: "The structural parallel is close: prodigy protagonist from an underclass infiltrates a brutal training system, builds a found family under pressure, then watches the world force increasingly terrible choices on them. Brown's tone is more hopeful than Kuang's and the violence less atrocity-focused — this is war and strategy rather than massacre. Read it if you want the training school intensity and moral erosion with more propulsive action and less historical horror.",
            tags: [
              'Training Sequence',
              'Underdog Protagonist',
              'Moral Cost',
              'Found Family',
            ],
            warning: 'Violence, character deaths',
            amazon_url: 'https://www.amazon.com/s?k=Red+Rising+Pierce+Brown',
            bookshop_url:
              'https://bookshop.org/search?keywords=Red+Rising+Pierce+Brown',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like Red Rising', slug: 'red-rising' },
      { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
      { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
    ],
  },
  {
    slug: 'the-priory-of-the-orange-tree',
    source: {
      title: 'The Priory of the Orange Tree',
      author: 'Samantha Shannon',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg',
      darkness_level: 3,
      heat_level: 'Closed Door',
      series: null,
      series_number: null,
      tropes: [
        'Female Protagonist',
        'Dragons',
        'Queer Romance',
        'Standalone Epic',
        'Political Intrigue',
        'Multiple POV',
      ],
      angle: 'Epic Dragon Fantasy',
      answer_line:
        'If you loved The Priory of the Orange Tree for the female-led epic scale, political depth, dragon lore, and queer fantasy stakes, start with The Traitor Baru Cormorant, The Goblin Emperor and His Majesty’s Dragon.',
      why_people_love: `The Priory of the Orange Tree is an 800-page standalone epic fantasy — a complete story with no sequels required — built entirely around women in positions of power: queens, dragon-riders, assassins, mages. Shannon writes political intrigue with a careful hand and the dragon lore is among the most original in the genre. The queer romance is central rather than peripheral and earns its space in the narrative. For readers who wanted epic fantasy scope — world-building, multi-POV, a world-ending threat — without the 10-book commitment, and specifically wanted female protagonists treated with the same seriousness male heroes receive, this book delivered something the genre had not previously offered at this scale.`,
    },
    aspects: [
      {
        heading:
          'If you loved the female-led epic fantasy with political depth...',
        recs: [
          {
            title: 'The Traitor Baru Cormorant',
            author: 'Seth Dickinson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765380722-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'The Masquerade',
            series_number: 1,
            series_label: 'Series (4 books planned, 3 released)',
            audiobook: true,
            note: "A female protagonist who uses financial and political manipulation to try to destroy an empire from within, while the empire uses her in return. Dickinson's political realism is brutal — every chapter of Baru's success comes with a price she doesn't fully register until it's too late. If the political manoeuvring in Priory was the main draw, this is the sharpest possible escalation of that element. Caveat: significantly darker, the narrative is deliberately uncomfortable, and the first book ends without a clean resolution. Not cozy politics — genuinely punishing.",
            tags: [
              'Political Intrigue',
              'Female Protagonist',
              'Empire',
              'Grimdark',
              'Queer',
            ],
            warning: 'Queerphobia as systemic theme, emotional devastation',
            amazon_url:
              'https://www.amazon.com/s?k=The+Traitor+Baru+Cormorant+Seth+Dickinson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Traitor+Baru+Cormorant+Dickinson',
          },
          {
            title: 'The Goblin Emperor',
            author: 'Katherine Addison',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765365682-L.jpg',
            darkness_level: 2,
            standalone: true,
            audiobook: true,
            note: "An accidental emperor — the half-goblin youngest son, universally ignored — inherits the throne after a catastrophic accident and has to learn to rule with no preparation and no allies. The political learning curve is the entire book: how power works, how kindness survives within it, what it costs to remain decent in a position designed to corrupt. Shannon's queens navigate similar terrain. Caveat: male protagonist, far less darkness, the world-ending threat is entirely absent — this is intimate politics rather than epic. The warmth is exceptional.",
            tags: [
              'Political Learning',
              'Unexpected Ruler',
              'Kind Protagonist',
              'Steampunk-Adjacent',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Goblin+Emperor+Katherine+Addison',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Goblin+Emperor+Katherine+Addison',
          },
        ],
      },
      {
        heading: 'If you loved the dragon lore and world-building...',
        recs: [
          {
            title: "His Majesty's Dragon",
            author: 'Naomi Novik',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780345481283-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'Temeraire',
            series_number: 1,
            series_label: 'Series (9 books, complete)',
            audiobook: true,
            note: "Napoleonic naval warfare with dragons as aerial combat units — the dragon-human bond is the entire emotional core of the series. Novik's dragon Temeraire is opinionated, intellectually curious, and fiercely loyal; the bond between him and his captain is the relationship that drives nine books. Shannon's dragon-riders have the same quality: the dragon relationship is not backdrop but central. Caveat: military fiction framing, the battles are the point, the politics are secondary to the war narrative.",
            tags: [
              'Dragon Bond',
              'Military Fantasy',
              'Historical Setting',
              'Character Relationship',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=His+Majesty%27s+Dragon+Naomi+Novik',
            bookshop_url:
              'https://bookshop.org/search?keywords=His+Majesty+Dragon+Naomi+Novik',
          },
          {
            title: 'The Bone Ships',
            author: 'RJ Barker',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316487962-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'The Tide Child',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: "A nautical epic in a world where sea dragons are extinct — until one is spotted, and every ship in the world races to claim or protect it. Barker built one of the most detailed and original fantasy maritime worlds in recent memory: the ships are made from dragon bones, the crew hierarchies are richly imagined, and the central creature is treated with the same reverence Shannon gives her dragons. Caveat: darker tone, more violence, the crew are disgraced outcasts — the emotional register is more desperate than Priory's dignified epic.",
            tags: [
              'Sea Dragons',
              'Maritime',
              'Original World-Building',
              'Creature Reverence',
            ],
            warning: 'Violence, death',
            amazon_url: 'https://www.amazon.com/s?k=The+Bone+Ships+RJ+Barker',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Bone+Ships+RJ+Barker',
          },
        ],
      },
      {
        heading: 'If you loved the queer romance woven through epic fantasy...',
        recs: [
          {
            title: 'A Strange and Stubborn Endurance',
            author: 'Foz Meadows',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250817044-L.jpg',
            darkness_level: 4,
            heat_level: 'Open Door',
            standalone: true,
            audiobook: true,
            note: "Two men from rival nations are forced into a political marriage — one to broker peace, one as a humiliation — and the book's central tension is whether love can grow from something designed to wound. Meadows writes queer romance with the same seriousness Shannon brings to her epic world-building: the cultural clash is detailed, the political stakes are genuine, and the romance is earned rather than accelerated. Probably the best pure fantasy equivalent to the queer political romance Shannon weaves through Priory.",
            tags: [
              'Queer Romance',
              'Political Marriage',
              'Empire & Resistance',
              'Slow Burn',
              'Hugo Nominated',
            ],
            warning: 'Sexual violence (referenced), war, trauma.',
            amazon_url:
              'https://www.amazon.com/s?k=A+Strange+and+Stubborn+Endurance+Foz+Meadows',
            bookshop_url:
              'https://bookshop.org/search?keywords=A+Strange+and+Stubborn+Endurance',
          },
          {
            title: 'The Jasmine Throne',
            author: 'Tasha Suri',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781728241616-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: false,
            series: 'Burning Kingdoms',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: "A princess in exile and a handmaiden with a secret magic form an alliance that becomes something more. Suri writes South Asian-inspired epic fantasy with the same seriousness Shannon brings to her world-building — the religious and political systems are coherent and deeply felt. The queer romance is central, unhurried, and given as much weight as the revolution it's entangled with. Caveat: more romance-forward than Priory, the heat level is higher, and the series covers three books rather than standing alone.",
            tags: [
              'Queer Romance',
              'South Asian Fantasy',
              'Political Resistance',
              'Magic System',
              'Female Protagonists',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Jasmine+Throne+Tasha+Suri',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Jasmine+Throne+Tasha+Suri',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'Spinning Silver',
        author: 'Naomi Novik',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781984802224-L.jpg',
        darkness_level: 3,
        heat_level: 'Closed Door',
        tags: [
          'Female Protagonist',
          'Political Intrigue',
          'Fairy Tale Retelling',
          'Standalone Epic',
          'Literary',
        ],
        why: "Three women in a Russian fairy tale world use intelligence, resourcefulness, and ruthless pragmatism to survive powerful men who want to use them. Novik builds female protagonists who navigate dangerous worlds with the same patience and strategic intelligence Shannon's queens deploy. The prose is exceptional, the political dynamics are intricate, and the book stands alone in one volume. The tonal match is closest to Priory's female-led political thriller elements — less epic in scale, more intimate in focus, but the same seriousness about women in power.",
        standalone: true,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Spinning+Silver+Naomi+Novik',
        bookshop_url:
          'https://bookshop.org/search?keywords=Spinning+Silver+Naomi+Novik',
      },
      {
        title: 'She Who Became the Sun',
        author: 'Shelley Parker-Chan',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781250621801-L.jpg',
        darkness_level: 4,
        heat_level: 'Closed Door',
        tags: [
          'Female Protagonist',
          'Historical Epic',
          'Military Fantasy',
          'Identity',
          'Queer',
        ],
        why: "Historical China-adjacent epic fantasy about a peasant girl who assumes a dead boy's identity to seize the destiny denied to her by her gender. Parker-Chan writes female ambition in impossible circumstances with the same unflinching commitment Shannon brings to her queens — the scale is comparable, the political machinery is ruthless, and the queer undercurrent runs throughout. The prose is exceptional and the duology is complete. Caveat: significantly darker than Priory, the violence is more graphic, and the moral cost of ambition is the central subject rather than an undertone.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=She+Who+Became+the+Sun+Shelley+Parker-Chan',
        bookshop_url:
          'https://bookshop.org/search?keywords=She+Who+Became+the+Sun+Parker-Chan',
      },
      {
        title: 'The Bear and the Nightingale',
        author: 'Katherine Arden',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781101885932-L.jpg',
        darkness_level: 3,
        heat_level: 'Closed Door',
        tags: [
          'Female Protagonist',
          'Russian Folklore',
          'Atmospheric',
          'Magic System',
          'Standalone Entry Point',
        ],
        why: "A girl in medieval Russia who can see and speak to the spirits that the Orthodox church is trying to erase. Arden's world is built from genuine Slavic folklore with the same respect for source material Shannon brings to her East Asian-inspired cosmology. Vasya is a female protagonist who refuses the roles available to her and pays for it — the same stubbornness that defines Shannon's queens. The trilogy is complete and the first book works as a satisfying standalone entry. Caveat: the scale is much smaller, no multi-POV structure, and the atmosphere is cold and wintry rather than warm and epic.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Bear+and+the+Nightingale+Katherine+Arden',
        bookshop_url:
          'https://bookshop.org/search?keywords=Bear+and+the+Nightingale+Katherine+Arden',
      },
    ],
    related: [
      { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
      { title: 'Books Like The Goblin Emperor', slug: 'the-goblin-emperor' },
      { title: 'Books Like The Poppy War', slug: 'the-poppy-war' },
    ],
  },
  {
    slug: 'red-rising',
    source: {
      title: 'Red Rising',
      author: 'Pierce Brown',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780345539786-L.jpg',
      darkness_level: 4,
      heat_level: null,
      series: 'Red Rising Saga',
      series_number: 1,
      tropes: [
        'Underdog Rebellion',
        'Class Warfare',
        'Chosen One',
        'Infiltration',
        'Brutal Training',
        'Revenge',
      ],
      angle: 'Dark Sci-Fi Action',
      answer_line:
        'If you loved Red Rising for the brutal competition, underdog rebellion, class warfare, and ruthless protagonist energy, start with An Ember in the Ashes, Mistborn: The Final Empire and Six of Crows.',
      why_people_love:
        "Red Rising is the book people finish at 3am and immediately text their friends about. Pierce Brown writes action with a propulsive clarity that few authors match — every chapter has a decision with real stakes, every alliance is potentially a betrayal, and the protagonist's intelligence is visible on the page rather than just asserted. The Roman mythology layered onto a caste-divided future society gives it a mythic weight that pure dystopian fiction usually lacks. The first book is essentially The Hunger Games crossed with Ender's Game — a brutal training sequence that is also a political education. The sequels escalate to full interplanetary war. Fair warning: this book commits to its premise. Characters you care about will die, and the author will not cushion the blow.",
    },
    aspects: [
      {
        heading:
          'If you loved the brutal action and the gladiatorial violence...',
        recs: [
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books, complete)',
            audiobook: true,
            note: 'The closest structural match. A brutal military training sequence, a society built on oppression by caste, a protagonist from the underclass who infiltrates the ruling system — the DNA is nearly identical. Tahir adds a dual-POV romance that Brown largely omits, and the Roman setting feels genuinely inhabited. Caveat: slightly slower-paced and more romance-forward than Red Rising. The action is equally brutal but less constant.',
            tags: [
              'Brutal Training',
              'Caste System',
              'Dual POV',
              'Military Fantasy',
            ],
            warning: 'Violence, assault, torture',
            amazon_url:
              'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url:
              'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
          },
          {
            title: 'Nevernight',
            author: 'Jay Kristoff',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250301055-L.jpg',
            darkness_level: 5,
            heat_level: 'Explicit',
            standalone: false,
            series: 'The Nevernight Chronicle',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: "Training school, brutal competition, and a morally compromised protagonist who is brilliant and dangerous and completely committed to her goal. The assassin's school sections have the same lethal energy as the Institute in Red Rising. The prose is more stylised and the heat level is significantly higher. Caveat: much more explicit in all directions — violence and sexual content both. Not for readers who found Red Rising's brutality already at their limit.",
            tags: [
              'Assassin School',
              'Morally Grey Heroine',
              'Brutal Competition',
              'Stylised Prose',
            ],
            warning:
              'Graphic violence, explicit sexual content, death of multiple POV characters',
            amazon_url: 'https://www.amazon.com/s?k=Nevernight+Jay+Kristoff',
            bookshop_url:
              'https://bookshop.org/search?keywords=Nevernight+Jay+Kristoff',
          },
        ],
      },
      {
        heading: 'If you loved the underdog rebellion and class warfare...',
        recs: [
          {
            title: 'The Final Empire',
            author: 'Brandon Sanderson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'Mistborn',
            series_number: 1,
            series_label: 'Series (3 books, complete)',
            audiobook: true,
            note: 'The most satisfying comparison for the class warfare angle. A world where the oppressors have held power for a thousand years, the protagonist infiltrates the upper class, and the plan involves dismantling the entire system from within. The Final Empire is lighter in tone and violence than Red Rising, but the political intelligence driving both books is similar. Caveat: far less propulsive action. Sanderson builds carefully; Brown moves at pace.',
            tags: [
              'Underdog Rebellion',
              'Infiltration',
              'Class System',
              'Hard Magic',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Mistborn+Final+Empire+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Mistborn+Final+Empire',
          },
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books, complete)',
            audiobook: true,
            note: "A Roman-inspired empire built on conquest and slavery, where a girl infiltrates the empire's military academy as a spy and a soldier is forced to hunt her. The class warfare and the oppressive caste system are the engine of both books; Tahir and Brown share the same interest in what the system does to people who try to survive inside it. The dual POV gives you both sides of the divide simultaneously. Caveat: significantly more romance-forward than Red Rising, and the violence, while real, is less relentless. The Roman parallels are present here too but less central.",
            tags: [
              'Underdog Rebellion',
              'Oppressive Empire',
              'Dual POV',
              'Infiltration',
              'Roman-Inspired',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url:
              'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes+Sabaa+Tahir',
          },
        ],
      },
      {
        heading:
          'If you loved the morally grey protagonist and the betrayals...',
        recs: [
          {
            title: 'Six of Crows',
            author: 'Leigh Bardugo',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250076960-L.jpg',
            darkness_level: 4,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'Six of Crows',
            series_number: 1,
            series_label: 'Series (duology, complete)',
            audiobook: true,
            note: "Darrow's strategic intelligence — the ability to see four moves ahead and use people as pieces in a game while still caring about them — is exactly what Kaz Brekker does in every chapter. Both leads are brilliant, emotionally controlled, willing to sacrifice and be sacrificed for. The crew dynamic in Six of Crows has the same found-family intensity as Darrow's Howlers. Caveat: smaller in scope, more heist than war, significantly more romance.",
            tags: [
              'Morally Grey Lead',
              'Brilliant Strategist',
              'Found Family',
              'Heist',
            ],
            amazon_url: 'https://www.amazon.com/s?k=Six+of+Crows+Leigh+Bardugo',
            bookshop_url:
              'https://bookshop.org/search?keywords=Six+of+Crows+Bardugo',
          },
          {
            title: 'The Lies of Locke Lamora',
            author: 'Scott Lynch',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'Gentleman Bastards',
            series_number: 1,
            series_label: 'Series (3 books published, ongoing)',
            audiobook: true,
            note: "The strategic intelligence, the found family, the willingness to burn every asset in service of the goal — Locke Lamora and Darrow are cousins. Lynch writes con artistry the way Brown writes war: as a series of decisions with visible internal logic and immediate consequences. The banter between Locke and Jean has the same warmth as the Howlers. Caveat: no action set pieces on Red Rising's scale. This is scheming and dialogue, not battle.",
            tags: ['Con Artistry', 'Found Family', 'Morally Grey', 'Dark City'],
            warning: 'Graphic violence, torture scenes',
            amazon_url:
              'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
      { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
      { title: 'Books Like The Poppy War', slug: 'the-poppy-war' },
    ],
  },

  // ── The Poppy War ─────────────────────────────────────────────────,
  {
    slug: 'six-of-crows',
    source: {
      title: 'Six of Crows',
      author: 'Leigh Bardugo',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781627792127-L.jpg',
      darkness_level: 3,
      heat_level: 'Closed Door',
      series: 'Six of Crows',
      series_number: 1,
      tropes: [
        'Heist Fantasy',
        'Found Family',
        'Morally Grey Characters',
        'Enemies to Lovers',
        'Multiple POVs',
        'Dark City',
      ],
      angle: 'Heist Fantasy with Found Family',
      answer_line:
        'If you loved Six of Crows for the heist planning, crew chemistry, morally grey leads, and dangerous city atmosphere, start with The Lies of Locke Lamora, Mistborn: The Final Empire and Nevernight.',
      why_people_love:
        "Six of Crows works because Bardugo understood that heist fiction lives and dies by its ensemble, and she built one of the best in fantasy. Six people, six distinct voices, six separate reasons to care whether the plan succeeds — and then she puts them in impossible situations where the plan keeps not succeeding. Kaz Brekker is the morally grey lead done right: his ruthlessness has specific causes and specific costs, and his slow-burn dynamic with Inej is one of the most emotionally honest relationships in recent fantasy. The city of Ketterdam feels genuinely dangerous in a way that most fantasy settings don't. Fair warning: the book is richer if you've read Bardugo's Shadow and Bone trilogy first, though it functions without that context. And the ending stops rather than concludes — Crooked Kingdom is not optional.",
    },
    aspects: [
      {
        heading: 'If you loved the heist planning and crew chemistry...',
        recs: [
          {
            title: 'The Lies of Locke Lamora',
            author: 'Scott Lynch',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'Gentleman Bastard',
            series_number: 1,
            series_label: 'Series (ongoing)',
            audiobook: true,
            note: "The more hardcore version. If Six of Crows gave you the heist-fantasy itch, The Lies of Locke Lamora is where you go next. The Gentleman Bastards are a smaller crew — four main players — but the schemes are more elaborate, the setting is darker, and Lynch's ear for banter is the best in the genre. Camorr feels as fully realised as Ketterdam. Caveat: no romantic subplots, no magic system of consequence. This is pure ensemble heist fiction, and it leans into that completely.",
            tags: [
              'Heist',
              'Con Artists',
              'Brilliant Crew',
              'Dark City',
              'Banter',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
          },
          {
            title: 'Mistborn: The Final Empire',
            author: 'Brandon Sanderson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'Mistborn',
            series_number: 1,
            series_label: 'Series (trilogy + sequel trilogy)',
            audiobook: true,
            note: "An underdog crew planning an impossible heist against an all-powerful empire — the structural DNA is identical to Six of Crows. Sanderson's ensemble is smaller and less developed, but the magic system gives the planning scenes the same satisfying complexity as Kaz's schemes. The found-family dynamic builds through the back half in ways that hit surprisingly hard. Caveat: less character interiority, lighter on romance, heavier on world-building scaffolding.",
            tags: [
              'Heist',
              'Found Family',
              'Hard Magic',
              'Underdog Crew',
              'Oppressive Empire',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Mistborn+Final+Empire+Brandon+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson',
          },
        ],
      },
      {
        heading: 'If you loved Kaz and the morally grey leads...',
        recs: [
          {
            title: 'Nevernight',
            author: 'Jay Kristoff',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781250301055-L.jpg',
            darkness_level: 5,
            heat_level: 'Explicit',
            standalone: false,
            series: 'The Nevernight Chronicle',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "A morally compromised protagonist training to become an assassin in a school that operates like a darker, more dangerous version of Six of Crows' Ice Court. Mia Corvere has Kaz's controlled ruthlessness and an equally complicated backstory driving it. The prose is more stylised than Bardugo's, the darkness is higher, and the set-pieces are spectacular. Caveat: significantly more explicit and brutal. Content warnings for sexual violence and torture apply.",
            tags: [
              'Assassin Academy',
              'Morally Grey Heroine',
              'Dark Magic',
              'Training',
              'Revenge',
            ],
            warning: 'Sexual violence, torture, extreme violence',
            amazon_url: 'https://www.amazon.com/s?k=Nevernight+Jay+Kristoff',
            bookshop_url:
              'https://bookshop.org/search?keywords=Nevernight+Jay+Kristoff',
          },
          {
            title: 'The Blade Itself',
            author: 'Joe Abercrombie',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'The First Law',
            series_number: 1,
            series_label: 'Series (trilogy + standalones)',
            audiobook: true,
            note: "If Kaz Brekker was the draw — the morally compromised lead with precise, unsentimental logic — Abercrombie is the master class. The First Law builds an ensemble of morally grey characters and then systematically refuses to let any of them be heroes. Logen Ninefingers has the same controlled danger as Kaz; Glokta, the torturer-protagonist, is one of fantasy's most unsettling and compelling POV characters. Caveat: this is grimdark — no heist structure, no romance, no found-family warmth. It's a deconstruction of heroic fantasy.",
            tags: [
              'Grimdark',
              'Morally Grey Ensemble',
              'Deconstruction',
              'Political Intrigue',
              'Brutal World',
            ],
            warning: 'Graphic violence, torture, war crimes.',
            amazon_url:
              'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
          },
        ],
      },
      {
        heading:
          'If you loved the slow-burn romance across multiple couples...',
        recs: [
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: "Two POVs, both under impossible pressure, both in slow-burn dynamics that refuse to resolve cleanly — the structural DNA matches Six of Crows more than most comparisons admit. Tahir's tension is arguably more earned: she makes you wait, and the waiting matters because the characters have real reasons not to act. Darker in tone, lighter on heat, but the pull between Laia and Elias has the same 'they can't, but...' quality as Kaz and Inej.",
            tags: [
              'Dual POV',
              'Slow Burn',
              'High Stakes',
              'Military Setting',
              "Will They Won't They",
            ],
            amazon_url:
              'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url:
              'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
          },
        ],
      },
      {
        heading: 'If you loved the dark city and the criminal underworld...',
        recs: [
          {
            title: 'The Way of Shadows',
            author: 'Brent Weeks',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316033671-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'Night Angel',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: "A street kid in a dangerous city apprentices himself to the world's most feared assassin — the setting and survival logic of Ketterdam's underworld, taken to a darker extreme. The city of Cenaria has the same lived-in, genuinely-threatening atmosphere as Ketterdam. Less ensemble-focused than Six of Crows, but Azoth's arc from disposable gutter-rat to something more has real emotional momentum. Caveat: grimmer and less witty, with fewer female characters who matter.",
            tags: [
              'Assassin',
              'Dark City',
              'Coming of Age',
              'Criminal Underworld',
              'Training',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Way+of+Shadows+Brent+Weeks',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Way+of+Shadows+Brent+Weeks',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'Crooked Kingdom',
        author: 'Leigh Bardugo',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781627792134-L.jpg',
        darkness_level: 3,
        heat_level: 'Closed Door',
        tags: [
          'Same Series',
          'Heist',
          'Found Family',
          'Payoff',
          'Multiple POVs',
        ],
        why: "Non-optional. Six of Crows ends mid-story and Crooked Kingdom is where everything pays off — the romances, the character arcs, the scheming. Bardugo wrote book two with full knowledge of the emotional debts she'd built in book one, and she collects them methodically. The heists are bigger, the stakes are personal, and the final chapters deliver some of the best-earned emotional payoffs in recent fantasy. Caveat: it ends. Read it, then mourn.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Crooked+Kingdom+Leigh+Bardugo',
        bookshop_url:
          'https://bookshop.org/search?keywords=Crooked+Kingdom+Leigh+Bardugo',
      },
      {
        title: 'The Lies of Locke Lamora',
        author: 'Scott Lynch',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
        darkness_level: 4,
        heat_level: null,
        tags: [
          'Heist',
          'Con Artists',
          'Found Family',
          'Dark City',
          'Brilliant Crew',
        ],
        why: 'The natural next read. Everything Six of Crows does with ensemble heist fiction, The Lies of Locke Lamora does with more darkness and better banter. Camorr feels as dangerous as Ketterdam, the Gentleman Bastards have the same found-family energy as the Dregs, and the schemes are elaborately satisfying. Caveat: no magic system of consequence, no romance. This is pure heist craft.',
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
      },
      {
        title: 'Mistborn: The Final Empire',
        author: 'Brandon Sanderson',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
        darkness_level: 3,
        heat_level: null,
        tags: [
          'Heist',
          'Found Family',
          'Hard Magic',
          'Underdog Crew',
          'Complete Arc',
        ],
        why: "An impossible heist, a crew of misfits with complementary abilities, a found-family dynamic that builds across the book — the structural parallel is close. Sanderson's ensemble is smaller and less complex than Bardugo's, but the magic gives the planning scenes the same satisfying internal logic as Kaz's schemes. Caveat: lighter on character interiority, heavier on world-building, no romance to speak of. The complete, satisfying ending is a genuine advantage.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=Mistborn+Final+Empire+Brandon+Sanderson',
        bookshop_url:
          'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson',
      },
      {
        title: 'Nevernight',
        author: 'Jay Kristoff',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781250301055-L.jpg',
        darkness_level: 5,
        heat_level: 'Explicit',
        tags: [
          'Morally Grey Heroine',
          'Assassin',
          'Dark Magic',
          'Training',
          'Revenge',
        ],
        why: "Kaz Brekker's ruthlessness, taken to a darker and more explicit place. Mia Corvere is an assassin-in-training with a controlled, unsentimental intelligence and a backstory full of specific grievance — the emotional architecture is similar. The prose is more stylised than Bardugo's, the world is more brutal, and the training-school sections have the same political complexity as the Ice Court. Caveat: significantly more explicit in all directions — heat, violence, content warnings apply.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Nevernight+Jay+Kristoff',
        bookshop_url:
          'https://bookshop.org/search?keywords=Nevernight+Jay+Kristoff',
      },
      {
        title: 'An Ember in the Ashes',
        author: 'Sabaa Tahir',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
        darkness_level: 4,
        heat_level: 'Sweet Romance',
        tags: [
          'Dual POV',
          'Slow Burn',
          'High Stakes',
          'Military Setting',
          'Found Family',
        ],
        why: "The best slow-burn comparison. Six of Crows and An Ember in the Ashes both build romantic tension through impossible circumstances — characters who have real reasons not to act on what they feel, set against genuinely high stakes. Tahir's dual-POV structure gives both romantic threads room to breathe. Darker in tone than Bardugo, lighter on heat, but the tension is real and the world has weight. Caveat: less heist, more survival.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
        bookshop_url:
          'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
      },
      {
        title: 'The Blade Itself',
        author: 'Joe Abercrombie',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
        darkness_level: 4,
        heat_level: null,
        tags: [
          'Morally Grey Ensemble',
          'Grimdark',
          'Deconstruction',
          'Brilliant Characters',
          'Political Intrigue',
        ],
        why: 'If Kaz Brekker was the draw — the morally grey lead who makes calculated decisions and pays specific costs — Abercrombie is the master class. The First Law ensemble is built from characters who are each morally compromised in different, interesting ways, and Abercrombie refuses to let any of them be safely heroic. The political scheming is more sophisticated than anything in Six of Crows. Caveat: no heist structure, no romance, no found-family warmth. This is a deconstruction.',
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
      },
    ],
    related: [
      { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
      {
        title: 'Books Like The Name of the Wind',
        slug: 'the-name-of-the-wind',
      },
      { title: 'Books Like The Poppy War', slug: 'the-poppy-war' },
    ],
  },

  // ── The Way of Kings ──────────────────────────────────────────────,
  {
    slug: 'the-way-of-kings',
    source: {
      title: 'The Way of Kings',
      author: 'Brandon Sanderson',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
      darkness_level: 3,
      heat_level: null,
      series: 'The Stormlight Archive',
      series_number: 1,
      tropes: [
        'Chosen One',
        'Hard Magic System',
        'Epic Scale',
        'Multiple POVs',
        'Found Family',
        'War & Conflict',
      ],
      angle: 'Epic Fantasy with Deep World-Building',
      answer_line:
        'If you loved The Way of Kings for the huge worldbuilding, intricate magic, broken-but-enduring heroes, and long-form epic payoff, start with Gardens of the Moon, The Name of the Wind and The Blade Itself.',
      why_people_love:
        "The Way of Kings is the book people point to when they say epic fantasy can be genuinely ambitious. Sanderson builds a world unlike anything in the genre — alien in its ecology, geology, and mythology — and then tells three storylines that each earn their length. Kaladin's arc is one of the most satisfying protagonist journeys in modern fantasy: a man stripped of everything who rebuilds himself from scratch through sheer stubborn refusal to stop. The Stormlight magic system (Stormlight and Shardblades) is intricate and earned. Fair warning: this is a slow-build novel. The first 200 pages are deliberately unhurried. The payoff for patience is enormous, but if you need action by chapter three, this isn't the book.",
    },
    aspects: [
      {
        heading:
          'If you loved the epic worldbuilding and intricate magic system...',
        recs: [
          {
            title: 'Gardens of the Moon',
            author: 'Steven Erikson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765348784-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'Malazan Book of the Fallen',
            series_number: 1,
            series_label: 'Series (10 books)',
            audiobook: true,
            note: "The most ambitious worldbuilding project in epic fantasy, full stop. Erikson drops you mid-story with zero hand-holding — no map legend for the magic, no character glossary, just an enormous world already in motion. If you loved how Sanderson built Roshar from the ground up with internal consistency, Malazan does the same at twice the scale. Caveat: far harder to read than Stormlight. Erikson rewards patience more slowly than Sanderson and the early books are actively hostile to newcomers. Push through to Gardens' second half.",
            tags: [
              'Epic Scope',
              'Complex Magic',
              'No Hand-Holding',
              'Military Fantasy',
            ],
            warning: 'Violence throughout; some graphic scenes',
            amazon_url:
              'https://www.amazon.com/s?k=Gardens+of+the+Moon+Steven+Erikson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Gardens+of+the+Moon+Erikson',
          },
          {
            title: 'The Name of the Wind',
            author: 'Patrick Rothfuss',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'The Kingkiller Chronicle',
            series_number: 1,
            series_label: 'Series (unfinished — 2 books published)',
            audiobook: true,
            note: "The closest comparison in prose quality. Rothfuss builds the University's sympathy system with the same rigour Sanderson brings to Stormlight — the magic follows strict, discoverable rules and the protagonist is systematically excellent at exploiting them. The atmosphere is different (intimate bardic fantasy vs. epic war saga) but the intellectual satisfaction of watching a genius work within a well-designed system is identical. Caveat: the series is unfinished and has been for over a decade. Book three has no release date.",
            tags: [
              'Hard Magic System',
              'Prodigy Protagonist',
              'Beautiful Prose',
              'Intricate World',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Name+of+the+Wind+Rothfuss',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss',
          },
        ],
      },
      {
        heading:
          "If you loved Kaladin's arc — the broken soldier who refuses to stay down...",
        recs: [
          {
            title: 'The Blade Itself',
            author: 'Joe Abercrombie',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'The First Law',
            series_number: 1,
            series_label: 'Series (3 books + 3 standalones + sequel trilogy)',
            audiobook: true,
            note: 'Logen Ninefingers is the anti-Kaladin — a man who has done terrible things and keeps doing them — but the emotional core is the same: a soldier trying to survive a world that grinds people into pieces. Abercrombie deconstructs every heroic archetype Sanderson earnestly builds. Reading them back-to-back reveals what each is doing with the genre. Caveat: much darker, no hopepunk, endings deliberately unsatisfying. If you need your protagonist to be fundamentally good, Abercrombie will frustrate you.',
            tags: [
              'Broken Soldier',
              'Grimdark',
              'Morally Complex',
              'Character Study',
            ],
            warning: 'Violence, torture, no redemption arcs guaranteed',
            amazon_url:
              'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
          },
          {
            title: 'The Final Empire',
            author: 'Brandon Sanderson',
            author_note: 'yes, more Sanderson — unavoidable',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'Mistborn',
            series_number: 1,
            series_label: 'Series (3 books, complete)',
            audiobook: true,
            note: "If the Kaladin arc was the hook — the powerless person discovering they have extraordinary ability and using it to protect people who can't protect themselves — The Final Empire delivers that satisfaction more efficiently. Vin's arc is tighter than Kaladin's, the book is half the length, and the heist structure gives it momentum that Stormlight's first volume occasionally lacks. Start here if you want Sanderson at his most propulsive before committing to a 10-book series.",
            tags: [
              'Underdog Protagonist',
              'Hard Magic',
              'Heist',
              'Oppressive World',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Mistborn+Final+Empire+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Mistborn+Final+Empire',
          },
        ],
      },
      {
        heading:
          'If you loved the multiple POVs and the sense of an enormous story unfolding...',
        recs: [
          {
            title: 'The Eye of the World',
            author: 'Robert Jordan',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780812511819-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'The Wheel of Time',
            series_number: 1,
            series_label: 'Series (14 books, complete)',
            audiobook: true,
            note: "The grandparent of everything Stormlight is doing. The Wheel of Time pioneered the multi-POV, multi-volume epic fantasy with a single cohesive ending — Sanderson literally completed it after Jordan's death. The scope, the interlocking political systems, the magic with strict rules — all present. Caveat: Jordan's prose is slower than Sanderson's and his female characters are frustratingly written by modern standards. The series improves dramatically from book four onward.",
            tags: [
              'Multi-POV',
              'Epic Scale',
              'World-Ending Stakes',
              'Complete Series',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Eye+of+the+World+Robert+Jordan',
            bookshop_url:
              'https://bookshop.org/search?keywords=Eye+of+the+World+Jordan',
          },
          {
            title: 'A Game of Thrones',
            author: 'George R.R. Martin',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780553381689-L.jpg',
            darkness_level: 5,
            standalone: false,
            series: 'A Song of Ice and Fire',
            series_number: 1,
            series_label: 'Series (unfinished — 5 books published)',
            audiobook: true,
            note: 'If the multi-POV structure and political complexity were the draw, Martin is the benchmark. Every major character gets a POV, every POV reveals a different facet of the same broken world, and no one is safe. The worldbuilding has the same depth and internal consistency as Roshar. Caveat: significantly darker, no reassurance that protagonists survive, and the series has been unfinished since 2011 with no end in sight.',
            tags: [
              'Multi-POV',
              'Political Intrigue',
              'No Safety Net',
              'Rich World',
            ],
            warning:
              'Graphic violence, sexual content including assault, character deaths',
            amazon_url:
              'https://www.amazon.com/s?k=A+Game+of+Thrones+George+Martin',
            bookshop_url:
              'https://bookshop.org/search?keywords=A+Game+of+Thrones+Martin',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
      { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
      {
        title: 'Books Like The Name of the Wind',
        slug: 'the-name-of-the-wind',
      },
    ],
  },

  {
    slug: 'the-wheel-of-time',
    source: {
      title: 'Wheel of Time: The Eye of the World',
      author: 'Robert Jordan',
      db_slug: 'the-eye-of-the-world',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780765345424-L.jpg',
      darkness_level: 3,
      heat_level: null,
      series: 'The Wheel of Time',
      series_number: 1,
      tropes: [
        'Chosen One',
        'Epic Quest',
        'Magic System',
        'Multiple POVs',
        'World-Ending Stakes',
        'Found Family',
        'Female Magic Institution',
        'Political Intrigue',
      ],
      angle: 'Epic Quest Fantasy Series',
      answer_line:
        'If you loved The Eye of the World for the meticulous magic system, sprawling world, ensemble cast, and classic epic-fantasy scale, start with The Way of Kings, Gardens of the Moon and A Game of Thrones.',
      why_people_love: `The Wheel of Time is the most complete expression of epic fantasy as a genre project: fourteen books across twenty-two years of publication, completed after Robert Jordan's death in 2007 by Brandon Sanderson, totalling over four million words and one of the most elaborately constructed secondary worlds in fiction. Jordan did not invent epic fantasy but he refined its architecture to an extraordinary degree — the One Power's gender-split magic system, the Aes Sedai as a fully realised female institution with internal politics and centuries of history, dozens of distinct nations each with coherent cultures, and a chosen-one premise made systemic rather than arbitrary through the ta'veren mechanic. The series begins at a deliberate, almost pastoral pace and expands progressively, adding POVs and political layers with each volume. It demands enormous commitment: readers who bounced off the early books often struggled because Jordan builds everything before he uses it. The readers who committed consistently describe it as the defining reading experience of their lives — a world so richly inhabited that leaving it felt like grief.`,
    },
    aspects: [
      {
        heading:
          'If you loved the meticulous magic system and the depth of world-building...',
        recs: [
          {
            title: 'The Way of Kings',
            author: 'Brandon Sanderson',
            author_note: '(the man who completed Wheel of Time)',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'The Stormlight Archive',
            series_number: 1,
            series_label: 'Series (10 books planned, 5 released)',
            audiobook: true,
            note: "Stormlight is what happens when the author who finished WoT builds his own universe from scratch at comparable scale. Three interconnected magic systems, multiple continents, thousands of years of documented history, and a cast of characters who are psychologically complex in ways WoT only gestures at. Sanderson's prose is more efficient than Jordan's and his pacing is tighter, but the sense that the world exists fully outside the frame of the story — that you are reading a slice of something enormous — is identical. Kaladin's arc in book one is some of the best character work in modern epic fantasy. Caveat: ten books planned, five released — a serious commitment to something unfinished, though each book resolves its own arc.",
            tags: [
              'Magic System',
              'Epic World-Building',
              'Multiple POVs',
              'Same Author (completed WoT)',
              'Massive Scope',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Way+of+Kings+Sanderson',
          },
          {
            title: 'Gardens of the Moon',
            author: 'Steven Erikson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765348784-L.jpg',
            darkness_level: 4,
            standalone: false,
            series: 'Malazan Book of the Fallen',
            series_number: 1,
            series_label: 'Series (10 books, complete)',
            audiobook: true,
            note: 'The most ambitious project ever attempted in epic fantasy: ten books, a 300,000-year history, hundreds of characters across multiple continents, and absolutely no hand-holding. Erikson drops the reader into a fully-formed world mid-campaign with no glossary and trusts them to catch up. The scale makes the Wheel of Time look contained. Readers who loved WoT for the feeling of depth beneath the story — the sense that empires and ages existed before the book began — will find that feeling amplified here to an almost overwhelming degree. Caveat: the first two books are by wide consensus the most challenging entry point in the genre; many readers require a second attempt. If you push through, the payoff is exceptional.',
            tags: [
              'Maximum Scope',
              'Deep Lore',
              'Military Fantasy',
              'No Hand-Holding',
              'Complete Series',
            ],
            warning: 'Violence, mature themes throughout',
            amazon_url:
              'https://www.amazon.com/s?k=Gardens+of+the+Moon+Steven+Erikson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Gardens+of+the+Moon+Erikson',
          },
        ],
      },
      {
        heading:
          'If you loved the multi-POV ensemble and watching a cast grow across many books...',
        recs: [
          {
            title: 'A Game of Thrones',
            author: 'George R.R. Martin',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780553593716-L.jpg',
            darkness_level: 5,
            standalone: false,
            series: 'A Song of Ice and Fire',
            series_number: 1,
            series_label: 'Series (5 released of 7 planned, unfinished)',
            audiobook: true,
            note: "The other defining epic fantasy of the 1990s, written in partial response to conventions Jordan helped establish. Martin shares Jordan's ambition for scope and ensemble but applies it to a world where no character is safe, no arc is guaranteed a satisfying resolution, and magic is rare, strange, and frightening rather than systematic and learnable. The political realism is sharper, the moral landscape darker, and the deaths more consequential. The first three books (A Game of Thrones, A Clash of Kings, A Storm of Swords) are among the best work in the genre. Caveat: the series remains unfinished after two decades with no reliable publication timeline for the final volumes — approach with that awareness.",
            tags: [
              'Multi-POV Epic',
              'Political Intrigue',
              'No Safe Characters',
              'Grimdark',
              'Same Ambition',
            ],
            warning: 'Graphic violence, sexual violence, war atrocity',
            amazon_url:
              'https://www.amazon.com/s?k=A+Game+of+Thrones+George+RR+Martin',
            bookshop_url:
              'https://bookshop.org/search?keywords=A+Game+of+Thrones+George+RR+Martin',
          },
          {
            title: 'The Dragonbone Chair',
            author: 'Tad Williams',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780886773786-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'Memory, Sorrow, and Thorn',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: 'Robert Jordan cited Memory, Sorrow, and Thorn as direct inspiration for the Wheel of Time, and the structural debt is visible: an unlikely young hero drawn out of a comfortable situation into an ancient world-ending conflict, a richly built secondary world drawn from real-world mythologies, and a cast spread across a continent pursuing separate threads that converge slowly. Williams builds with the same patient, cumulative method Jordan used. The prose is more literary and the pacing even more deliberate than WoT. Caveat: extremely slow opening — the first third of book one is almost entirely scene-setting — but readers who gave it space consistently rate it as one of the great under-read series in the genre.',
            tags: [
              'Direct WoT Ancestor',
              'Epic Quest',
              'Multi-POV',
              'Slow Build',
              'Rich Mythology',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Dragonbone+Chair+Tad+Williams',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Dragonbone+Chair+Tad+Williams',
          },
        ],
      },
      {
        heading:
          'If you loved the Aes Sedai and the idea of women holding real institutional power...',
        recs: [
          {
            title: 'Mistborn: The Final Empire',
            author: 'Brandon Sanderson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
            darkness_level: 3,
            standalone: false,
            series: 'Mistborn',
            series_number: 1,
            series_label: 'Series (trilogy, complete + sequel trilogy)',
            audiobook: true,
            note: "A female underdog protagonist discovering a rigorous, systematic magic ability in a world that considered her disposable. Sanderson built Allomancy with the same structural discipline Jordan used for the One Power — everything has rules, everything has cost, the learning arc is pleasurable because the system rewards attention. Vin's journey to wielding power that was deliberately withheld from people like her maps clearly onto WoT's central concern about female access to power. Significantly shorter and faster-paced than WoT, with a completed trilogy that fully resolves. A natural next series for WoT readers who want Sanderson's magic rigour at a more manageable scale.",
            tags: [
              'Female Protagonist',
              'Rigorous Magic System',
              'Heist Fantasy',
              'Chosen One',
              'Same Author (completed WoT)',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Mistborn+The+Final+Empire+Brandon+Sanderson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Mistborn+Final+Empire+Sanderson',
          },
          {
            title: 'The Poppy War',
            author: 'R.F. Kuang',
            cover_url:
              'https://books.google.com/books/content?id=NKB8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            darkness_level: 5,
            standalone: false,
            series: 'The Poppy War',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: "The Aes Sedai's power is titanic, gendered, and institutional — and so is Rin's. Kuang builds a female protagonist whose access to power runs through a military academy that was not designed for her, and whose ultimate abilities are framed explicitly as transgression. The One Power in WoT is terrible when misused; Rin's power is terrible in a way that is inseparable from its use. Both series are fundamentally concerned with what it costs a woman to wield power that the world tried to keep from her. Caveat: extreme darkness, extended historical atrocity, graphic violence — a completely different tonal register from WoT's adventure-epic warmth. Only if you are prepared for serious grimdark.",
            tags: [
              'Female Protagonist',
              'Dark Power',
              'Military School',
              'Transgressive Magic',
              'Historical Basis',
            ],
            warning: 'War atrocity, genocide, drug addiction, graphic violence',
            amazon_url: 'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang',
            bookshop_url:
              'https://bookshop.org/search?keywords=The+Poppy+War+RF+Kuang',
          },
        ],
      },
    ],
    recommendations: [
      {
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg',
        darkness_level: 2,
        heat_level: 'Sweet Romance',
        tags: [
          'Magic System Depth',
          'Legendary Protagonist',
          'University Setting',
          'First Person Narrative',
        ],
        why: "If the One Power's internal logic was the part of WoT that made you lean forward, Sympathy and Naming are the most precisely constructed magic systems in the genre. Kvothe's arc — from poverty and obscurity to the legendary figure everyone talks about at the frame story's inn — has the same propulsive quality as WoT's chosen-one structure, compressed into one man's remembered life. The prose is a step up in literary ambition from Jordan's, the world smaller and less geopolitically complex. Rothfuss writes the university sections with the same pleasure in systems that Jordan brings to the Tower. Caveat: the third book remains unwritten after fifteen years — the series is definitively unfinished.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss',
      },
      {
        title: 'The Blade Itself',
        author: 'Joe Abercrombie',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
        darkness_level: 4,
        heat_level: null,
        tags: [
          'Grimdark',
          'Multi-POV',
          'Political Realism',
          'Subverted Heroism',
          'Complete Trilogy',
        ],
        why: "For the WoT reader who is ready for epic fantasy that refuses to be comfortable. Abercrombie uses the same multi-POV ensemble structure as Jordan — a diverse cast converging on a world-threatening crisis — but strips out the genre's comforting assumptions about heroism, destiny, and just outcomes. Characters who start with principles progressively abandon them. The magic is rare and horrible. The politics have weight because people lose. The First Law trilogy is complete in three tightly-paced volumes, and the standalone novels set in the same world are even better. Recommended specifically for WoT readers who occasionally felt that Jordan's world was too clean, that the stakes weren't quite heavy enough.",
        standalone: false,
        audiobook: true,
        amazon_url:
          'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
        bookshop_url:
          'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
      },
      {
        title: 'Red Rising',
        author: 'Pierce Brown',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780345539786-L.jpg',
        darkness_level: 4,
        heat_level: 'Closed Door',
        tags: [
          'Chosen One',
          'Brutal Training',
          'Epic Scope',
          'Fast-Paced',
          'Complete Saga',
        ],
        why: "For the WoT reader who wants the chosen-one arc and the epic scope but with completely different pacing. Where Jordan builds his world slowly and carefully, Brown moves at an almost violent pace — each chapter escalates, the political stakes expand across six books from a single mine to an entire solar system, and the protagonist's transformation from nobody to legend is written with kinetic momentum. The series is complete at six books (Red Rising trilogy + follow-up trilogy) and rewards binge-reading. Caveat: more violent and morally ruthless than WoT, less interested in world-building depth, entirely different in register — but the sense of a protagonist becoming something the world wasn't ready for is recognisable.",
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Red+Rising+Pierce+Brown',
        bookshop_url:
          'https://bookshop.org/search?keywords=Red+Rising+Pierce+Brown',
      },
    ],
    related: [
      { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
      { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
      {
        title: 'Books Like The Name of the Wind',
        slug: 'the-name-of-the-wind',
      },
    ],
  },

  // ── Red Rising ────────────────────────────────────────────────────,

  {
    slug: 'uprooted',
    source: {
      title: 'Uprooted',
      author: 'Naomi Novik',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780804179034-L.jpg',
      darkness_level: 3,
      heat_level: 'Closed Door',
      series: null,
      series_number: null,
      tropes: [
        'Dark Forest',
        'Hidden Magic',
        'Enemies to Lovers',
        'Mentor & Student',
        'Folk Magic',
        'Slavic Folklore',
        'Coming of Age',
      ],
      angle: 'Dark Fairy Tale Fantasy',
      answer_line:
        'If you loved Uprooted for the folklore-rooted magic, uneasy mentor dynamic, living forest menace, and fairy-tale atmosphere, start with Spinning Silver, The Bear and the Nightingale and Circe.',
      why_people_love: `Uprooted is built around two things that rarely coexist: a genuinely terrifying antagonist and a genuinely tender romance. The Wood — an ancient, malevolent forest that corrupts everything it touches — is one of the most effective threats in modern fantasy, not because of violence but because of wrongness. Against this backdrop, Agnieszka discovers that her magic is wild, instinctive, and nothing like what her aloof wizard mentor Sarkan considers proper — and the novel is partly about the clash between her chaotic power and his rigid precision, and partly about what happens when two people who irritate each other enormously start to depend on each other. Novik's prose has a fairy-tale cadence that makes even brutal scenes feel mythic. Readers return to it because it's a complete story — a standalone that actually ends, with a romance that earns its resolution and a world that feels genuinely ancient.`,
    },
    aspects: [
      {
        heading:
          'If you loved The Wood — the dark, ancient forest as a living threat...',
        recs: [
          {
            title: 'The Bear and the Nightingale',
            author: 'Katherine Arden',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781101885963-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'Winternight Trilogy',
            series_number: 1,
            series_label: 'Series (trilogy, complete)',
            audiobook: true,
            note: `The most natural companion read to Uprooted. Arden writes Slavic folklore with the same instinctive authority as Novik — the frost demons, the household spirits, and the dark forest are treated as genuinely real and genuinely dangerous. Vasya is a young woman who can see the old spirits that Christianity is slowly erasing, and the tension between her wild nature and the world's expectations mirrors Agnieszka's arc closely. The prose has the same fairy-tale weight. Caveat: the romance is far less central — this is primarily a coming-of-age story about a woman refusing to be tamed, with the romantic thread developed more in later books.`,
            tags: [
              'Slavic Folklore',
              'Dark Forest',
              'Hidden Magic',
              'Coming of Age',
              'Folk Spirits',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=The+Bear+and+the+Nightingale+Katherine+Arden',
            bookshop_url:
              'https://bookshop.org/search?keywords=Bear+Nightingale+Katherine+Arden',
          },
          {
            title: 'Spinning Silver',
            author: 'Naomi Novik',
            author_note: 'same author',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780525619369-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: `Novik's follow-up uses Ashkenazi Jewish folklore the way Uprooted uses Slavic — as foundational architecture rather than decoration. A moneylender's daughter catches the attention of the Staryk king, a cold and dangerous figure from a frozen otherworld, and has to bargain her way to survival. The fairy-tale logic is tighter here — every deal has consequences, every gift has a price — and the prose has the same lyrical weight. Caveat: Spinning Silver has multiple POV characters and a more complex plot structure than Uprooted; the romance is slower and less central but ultimately delivers the same emotional payoff.`,
            tags: [
              'Jewish Folklore',
              'Fairy Tale',
              'Dangerous Fae',
              'Enemies to Lovers',
              'Winter Magic',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Spinning+Silver+Naomi+Novik',
            bookshop_url:
              'https://bookshop.org/search?keywords=Spinning+Silver+Naomi+Novik',
          },
        ],
      },
      {
        heading:
          'If you loved Agnieszka discovering her wild magic and the antagonistic mentor dynamic...',
        recs: [
          {
            title: 'Sorcery of Thorns',
            author: 'Margaret Rogerson',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9781534439146-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: true,
            audiobook: true,
            note: `An apprentice librarian discovers she has powers she shouldn't, and gets tangled up with a sorcerer who is not what he appears. Rogerson is directly in Novik's tradition — the magic has a tactile, instinctive quality, the antagonism between the two leads is well-written, and the romance earns its slow burn. The library-as-magical-archive setting gives it a distinctive atmosphere, and the pacing is tight for a standalone. Caveat: somewhat lighter in tone than Uprooted, the darkness is more adventure-thriller than psychological horror, and the romantic tension resolves earlier.`,
            tags: [
              'Hidden Magic',
              'Enemies to Lovers',
              'Magic Libraries',
              'Antagonistic Romance',
              'Standalone',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=Sorcery+of+Thorns+Margaret+Rogerson',
            bookshop_url:
              'https://bookshop.org/search?keywords=Sorcery+of+Thorns+Margaret+Rogerson',
          },
          {
            title: 'A Wizard of Earthsea',
            author: 'Ursula K. Le Guin',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780547773742-L.jpg',
            darkness_level: 2,
            heat_level: null,
            standalone: false,
            series: 'Earthsea Cycle',
            series_number: 1,
            series_label: 'Series (6 books, each standalone)',
            audiobook: true,
            note: `The foundational text for everything Uprooted does with hidden power and unconventional magic. Ged's path from goat-boy to great wizard is told with Le Guin's characteristic economy — no wasted words, no wasted scenes — and the climax, which turns on Ged confronting what he cannot run from, is the same psychological courage Agnieszka has to find. Le Guin invented the template for "protagonist whose magic doesn't work the way the rules say it should." Caveat: short and written for a younger audience in register; no romance. Recommended as the essential ancestor, not a structural match.`,
            tags: [
              'Classic Fantasy',
              'Coming of Age',
              'Magic School',
              'True Names',
              'Quiet Power',
            ],
            amazon_url:
              'https://www.amazon.com/s?k=A+Wizard+of+Earthsea+Le+Guin',
            bookshop_url:
              'https://bookshop.org/search?keywords=Wizard+Earthsea+Le+Guin',
          },
        ],
      },
      {
        heading:
          'If you loved the lyrical prose and fairy-tale completeness...',
        recs: [
          {
            title: "Howl's Moving Castle",
            author: 'Diana Wynne Jones',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780064410342-L.jpg',
            darkness_level: 2,
            heat_level: 'Sweet Romance',
            standalone: true,
            audiobook: true,
            note: `The direct predecessor to Uprooted's spirit: a young woman taken from her ordinary life ends up working for an infuriating, powerful wizard, and the whole story is about unexpected magic and a romance that develops through sustained irritation. Jones writes fairy-tale logic with the same casual confidence as Novik — the rules are internally consistent but never over-explained — and the ending has the same sense of deep satisfaction. The tone is lighter and more comedic, and the darkness is low stakes. Recommended for anyone who wants more of the wizard-and-unexpected-girl dynamic with warmth dialled up and horror dialled down.`,
            tags: [
              'Fairy Tale',
              'Unexpected Magic',
              'Antagonistic Romance',
              'Classic',
              'Standalone',
            ],
            amazon_url:
              "https://www.amazon.com/s?k=Howl's+Moving+Castle+Diana+Wynne+Jones",
            bookshop_url:
              "https://bookshop.org/search?keywords=Howl's+Moving+Castle+Diana+Wynne+Jones",
          },
          {
            title: 'Circe',
            author: 'Madeline Miller',
            cover_url:
              'https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: true,
            audiobook: true,
            note: `The closest match to Uprooted's prose register. Miller writes with the same mythic cadence — sentences that feel like they have weight and age — and Circe's arc of discovering power that the gods dismiss, learning it in isolation, and becoming something no one anticipated mirrors Agnieszka's closely. The setting is Greek mythology rather than Slavic folklore, but the emotional core is identical: a woman who was underestimated transforming through her own effort and loss. Caveat: Circe is more internal and reflective in pace, the romance is a smaller component, and some sections are deliberately episodic.`,
            tags: [
              'Mythological Retelling',
              'Self-Discovery',
              'Lyrical Prose',
              'Powerful Protagonist',
              'Standalone',
            ],
            warning: 'Sexual assault (non-graphic, mythological context)',
            amazon_url: 'https://www.amazon.com/s?k=Circe+Madeline+Miller',
            bookshop_url:
              'https://bookshop.org/search?keywords=Circe+Madeline+Miller',
          },
        ],
      },
    ],
    recommendations: [],
    related: [
      { title: 'Books Like The Goblin Emperor', slug: 'the-goblin-emperor' },
      { title: 'Books Like Piranesi', slug: 'piranesi' },
      {
        title: 'Books Like The Priory of the Orange Tree',
        slug: 'the-priory-of-the-orange-tree',
      },
    ],
  },
];

export function getBooksLikeEntry(slug: string): BooksLikeEntry | undefined {
  return BOOKS_LIKE.find((e) => e.slug === slug);
}
