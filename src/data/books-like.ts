export interface BooksLikeRec {
  title: string
  author: string
  cover_url: string
  darkness_level: number // 1-5
  heat_level?: string | null // e.g. 'Open Door', 'Explicit', 'Fiery' — omit for non-romance
  tags: string[] // similarity elements e.g. ['Enemies to Lovers', 'Fae Courts']
  why: string // 3-4 sentences + caveat
  standalone: boolean
  audiobook: boolean
  amazon_url: string
  bookshop_url: string
}

export interface BooksLikeAspectRec {
  title: string
  author: string
  author_note?: string // e.g. "(yes, more Sanderson — unavoidable)"
  cover_url: string
  darkness_level: number
  heat_level?: string | null
  standalone: boolean
  series?: string // e.g. "The Stormlight Archive"
  series_number?: number // e.g. 1
  series_label?: string // e.g. "Series (10 books planned)" — overrides default "Series"
  audiobook: boolean
  note: string // aspect-specific description + caveat
  tags: string[]
  warning?: string // content warning
  amazon_url: string
  bookshop_url: string
}

export interface BooksLikeAspect {
  heading: string // "If you loved the enemies-to-lovers tension..."
  recs: BooksLikeAspectRec[]
}

export interface BooksLikeEntry {
  slug: string
  source: {
    title: string
    author: string
    cover_url: string
    darkness_level: number
    heat_level?: string | null
    series?: string | null
    series_number?: number | null
    tropes: string[]
    why_people_love: string // one honest paragraph, not a plot summary
  }
  aspects: BooksLikeAspect[]
  recommendations: BooksLikeRec[]
  related: Array<{ title: string; slug: string }> // 3 related Books Like pages
}

const DARKNESS_LEVELS: Array<{ candles: string; label: string; desc: string } | null> = [
  null,
  { candles: '🕯️',             label: 'Lighthearted', desc: 'Cozy, low stakes and emotionally safe' },
  { candles: '🕯️🕯️',          label: 'Mild',         desc: 'Some danger and tension, but generally safe in tone' },
  { candles: '🕯️🕯️🕯️',       label: 'Serious',      desc: 'Death, violence and emotional weight are present' },
  { candles: '🕯️🕯️🕯️🕯️',    label: 'Dark',         desc: 'Violence, trauma and morally harsh outcomes' },
  { candles: '🕯️🕯️🕯️🕯️🕯️', label: 'Brutal',       desc: 'Extreme violence and suffering, no mercy' },
]
export const getDarkness     = (level: number) => DARKNESS_LEVELS[level] ?? null
export const darknessCandles = (level: number) => DARKNESS_LEVELS[level]?.candles ?? ''
export const darknessLabel   = (level: number) => DARKNESS_LEVELS[level]?.label ?? ''

export const HEAT: Record<string, { flames: string; label: string; desc: string }> = {
  'Sweet Romance': { flames: '🔥',         label: 'Sweet / Clean',    desc: 'Kisses only; focus on emotional connection' },
  'Closed Door':   { flames: '🔥🔥',       label: 'Fade to Black',    desc: 'Tension is there, but we leave before the clothes do' },
  'Open Door':     { flames: '🔥🔥🔥',     label: 'Open Door',        desc: 'Explicit scenes, but they don\'t dominate' },
  'Explicit':      { flames: '🔥🔥🔥🔥',   label: 'Explicit / Spicy', desc: 'Graphic detail and high frequency' },
  'Fiery':         { flames: '🔥🔥🔥🔥🔥', label: 'Fiery / Primal',   desc: 'Extreme heat, often including kink' },
}
export const getHeat = (level?: string | null) => (level ? HEAT[level] ?? null : null)

export const BOOKS_LIKE: BooksLikeEntry[] = [
  {
    slug: 'acotar',
    source: {
      title: 'A Court of Thorns and Roses',
      author: 'Sarah J. Maas',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9781619634459-L.jpg',
      darkness_level: 3,
      heat_level: 'Open Door',
      series: 'A Court of Thorns and Roses',
      series_number: 1,
      tropes: ['Fae Courts', 'Enemies to Lovers', 'Beauty & the Beast', 'Chosen One', 'Power at a Cost'],
      why_people_love:
        'ACOTAR earns its fanbase through one thing above all else: the slow-burn tension of Feyre and Tamlin that quietly pivots into something far more interesting by book two. It\'s not the most original premise — Beauty and the Beast in Faerie — but Maas is genuinely skilled at dangling just enough emotional reward to keep you turning pages past midnight. The real hook isn\'t the romance; it\'s watching a character who started as a passive survivor become someone terrifyingly capable. Fair warning: book one is the weakest in the series. If you\'re lukewarm by chapter ten, push through to ACOMAF — that\'s where the series earns its reputation.',
    },
    aspects: [
      {
        heading: 'If you loved the enemies-to-lovers slow burn...',
        recs: [
          {
            title: 'An Ember in the Ashes',
            author: 'Sabaa Tahir',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
            darkness_level: 4,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'An Ember in the Ashes',
            series_number: 1,
            series_label: 'Series (4 books)',
            audiobook: true,
            note: 'Two POVs, both trapped in impossible situations, both drawn to each other despite every reason not to be. The slow burn here is arguably executed better than in most romantasy — the tension earns its payoff across the full series. Caveat: this leans more toward dark epic fantasy than romantasy. Much less spice, much more stakes. If you read ACOTAR primarily for the romance, recalibrate.',
            tags: ['Dual POV', 'Military Fantasy', 'Will They Won\'t They'],
            amazon_url: 'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
            bookshop_url: 'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
          },
          {
            title: 'From Blood and Ash',
            author: 'Jennifer L. Armentrout',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg',
            darkness_level: 3,
            heat_level: 'Explicit',
            standalone: false,
            series: 'Blood and Ash',
            series_number: 1,
            series_label: 'Series (6 books)',
            audiobook: true,
            note: 'The guard-and-ward forbidden romance executed with real heat. Hawke and Poppy have the same push-pull chemistry as Feyre and Rhysand — the power imbalance, the secrets, the tension that refuses to resolve cleanly. If ACOTAR\'s main hook for you was the forbidden element and the spice, this delivers both more directly. Caveat: the writing is more functional than literary. You\'re here for the romance and the lore drops, not the prose.',
            tags: ['Forbidden Romance', 'Guard & Ward', 'Spicy', 'Enemies to Lovers'],
            amazon_url: 'https://www.amazon.com/s?k=From+Blood+and+Ash+Jennifer+Armentrout',
            bookshop_url: 'https://bookshop.org/search?keywords=From+Blood+and+Ash',
          },
        ],
      },
      {
        heading: 'If you loved the Fae courts and political intrigue...',
        recs: [
          {
            title: 'Kingdom of the Wicked',
            author: 'Kerri Maniscalco',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780316428354-L.jpg',
            darkness_level: 3,
            heat_level: 'Open Door',
            standalone: false,
            series: 'Kingdom of the Wicked',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: 'Victorian Sicily meets demon mythology. Emilia and Wrath have sharp banter and the enemies-to-lovers dynamic has somewhere to go — a murder mystery gives the tension structure. The atmosphere is vivid and the morally questionable love interest is handled with the same knowing craft as ACOTAR\'s Rhysand. Caveat: the mystery itself is thin. You\'re really here for the banter and the setting.',
            tags: ['Demons', 'Historical Setting', 'Dark Romance'],
            amazon_url: 'https://www.amazon.com/s?k=Kingdom+of+the+Wicked+Kerri+Maniscalco',
            bookshop_url: 'https://bookshop.org/search?keywords=Kingdom+of+the+Wicked',
          },
          {
            title: 'The Cruel Prince',
            author: 'Holly Black',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780316310314-L.jpg',
            darkness_level: 4,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'The Folk of the Air',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: 'If ACOTAR is the gateway drug, The Cruel Prince is what comes next. Holly Black\'s Fae are genuinely unsettling — cruel, capricious, not safely romantic — and the political scheming in the courts is more sophisticated than anything in ACOTAR book one. Caveat: far less spice, much more brain.',
            tags: ['Fae Courts', 'Political Intrigue', 'Enemies to Lovers'],
            amazon_url: 'https://www.amazon.com/s?k=The+Cruel+Prince+Holly+Black',
            bookshop_url: 'https://bookshop.org/search?keywords=The+Cruel+Prince+Holly+Black',
          },
          {
            title: 'Strange the Dreamer',
            author: 'Laini Taylor',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780316341677-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'Strange the Dreamer',
            series_number: 1,
            series_label: 'Series (duology)',
            audiobook: true,
            note: 'If the lush, atmospheric world-building of ACOTAR was your hook, Strange the Dreamer is the most beautifully written book on this list. Laini Taylor builds mythology the way Maas builds romance — layered, immersive, and structured around one central mystery that keeps unfolding. The forbidden romance between Lazlo and Sarai has real emotional stakes. Caveat: slower and more literary than ACOTAR. Less spice, more ache.',
            tags: ['Lush World-Building', 'Forbidden Romance', 'Mythology', 'Dreamer Magic'],
            amazon_url: 'https://www.amazon.com/s?k=Strange+the+Dreamer+Laini+Taylor',
            bookshop_url: 'https://bookshop.org/search?keywords=Strange+the+Dreamer+Laini+Taylor',
          },
        ],
      },
      {
        heading: 'If you want something darker and less romance-forward...',
        recs: [
          {
            title: 'The Priory of the Orange Tree',
            author: 'Samantha Shannon',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: 'The antidote to series commitment: an 848-page standalone epic with dragons, political intrigue across three continents, and a slow-burn romance that earns its payoff. The worldbuilding is dense and original, the female characters are fully realised. Caveat: this is first and foremost epic fantasy with romantic threads — not romantasy. The ratio of plot to romance is inverted compared to ACOTAR.',
            tags: ['Dragons', 'Epic Fantasy', 'Sapphic Romance', 'Standalone'],
            amazon_url: 'https://www.amazon.com/s?k=The+Priory+of+the+Orange+Tree+Samantha+Shannon',
            bookshop_url: 'https://bookshop.org/search?keywords=The+Priory+of+the+Orange+Tree',
          },
        ],
      },
      {
        heading: 'If you want a standalone before committing to a series...',
        recs: [
          {
            title: 'Uprooted',
            author: 'Naomi Novik',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780804179058-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: true,
            audiobook: true,
            note: 'A fairy-tale standalone with a morally complex, powerful love interest and a female protagonist who discovers terrifying magic within herself — the emotional DNA is similar enough to ACOTAR to scratch the itch without demanding a multi-book commitment. The tension between Agnieszka and the Dragon is slow, sharp, and earns its resolution. Caveat: no spice and significantly less romance-forward. The magic and the forest are the real draw.',
            tags: ['Fairy-Tale Vibes', 'Slow Burn', 'Female Power', 'Standalone'],
            amazon_url: 'https://www.amazon.com/s?k=Uprooted+Naomi+Novik',
            bookshop_url: 'https://bookshop.org/search?keywords=Uprooted+Naomi+Novik',
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
        tags: ['Fae Courts', 'Enemies to Lovers', 'Found Family', 'PTSD Recovery', 'Same Author'],
        why: 'The book that turned ACOTAR from a decent romantasy into a phenomenon. The power dynamics shift completely, the world expands into something genuinely fascinating, and Rhysand becomes one of the genre\'s most discussed love interests for real reasons. It\'s darker, more emotionally honest, and significantly better written than book one. Caveat: if you loved Tamlin, you\'re going to have a complicated time here.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=A+Court+of+Mist+and+Fury+Sarah+J+Maas',
        bookshop_url: 'https://bookshop.org/search?keywords=A+Court+of+Mist+and+Fury',
      },
      {
        title: 'The Cruel Prince',
        author: 'Holly Black',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780316310314-L.jpg',
        darkness_level: 4,
        heat_level: 'Closed Door',
        tags: ['Fae Courts', 'Enemies to Lovers', 'Political Scheming', 'Morally Grey Characters'],
        why: 'If ACOTAR is the gateway drug, The Cruel Prince is what comes next. Holly Black\'s Fae are genuinely unsettling — cruel, capricious, not safely romantic — and Jude is a far more interesting protagonist than Feyre in book one. The enemies-to-lovers tension is sharper, the political scheming more satisfying. Caveat: far less spice, much more brain. If you read ACOTAR primarily for the romance, recalibrate expectations.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Cruel+Prince+Holly+Black',
        bookshop_url: 'https://bookshop.org/search?keywords=The+Cruel+Prince+Holly+Black',
      },
      {
        title: 'An Ember in the Ashes',
        author: 'Sabaa Tahir',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781595148049-L.jpg',
        darkness_level: 4,
        heat_level: 'Sweet Romance',
        tags: ['Enemies to Lovers', 'Dual POV', 'Military Fantasy', 'Oppressive Empire', 'Will They Won\'t They'],
        why: 'The enemies-to-lovers tension in this Roman-inspired fantasy is arguably executed better than in most romantasy. Two POVs, both trapped in impossible situations, both drawn to each other despite every reason not to be. The romance is slow, the stakes are genuinely high, and the world has weight beyond the relationship. Caveat: this leans more toward dark epic fantasy than romantasy — the romance is present but never dominates.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=An+Ember+in+the+Ashes+Sabaa+Tahir',
        bookshop_url: 'https://bookshop.org/search?keywords=An+Ember+in+the+Ashes',
      },
      {
        title: 'From Blood and Ash',
        author: 'Jennifer L. Armentrout',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg',
        darkness_level: 3,
        heat_level: 'Explicit',
        tags: ['Enemies to Lovers', 'Forbidden Romance', 'Guard & Ward', 'Spicy', 'Mystery Origins'],
        why: 'If ACOTAR\'s main appeal for you was the forbidden romance and the heat, From Blood and Ash delivers that more directly. Hawke and Poppy have strong chemistry, the forbidden-romance tension is well-crafted, and the lore reveals in book one are genuinely surprising. Caveat: the writing is more functional than literary — you\'re here for the romance and plot twists, not prose. Spicier than ACOTAR book one.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=From+Blood+and+Ash+Jennifer+Armentrout',
        bookshop_url: 'https://bookshop.org/search?keywords=From+Blood+and+Ash',
      },
      {
        title: 'The Priory of the Orange Tree',
        author: 'Samantha Shannon',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg',
        darkness_level: 3,
        heat_level: 'Closed Door',
        tags: ['Dragons', 'Matriarchal World', 'Epic Fantasy', 'Sapphic Romance', 'Standalone'],
        why: 'The antidote to series commitment: a 848-page standalone epic with dragons, political intrigue across three continents, and a slow-burn romance that earns its payoff. The worldbuilding is dense and original, the female characters are fully realised, and there\'s a real sense that this world has existed for thousands of years before you arrived. Caveat: this is significantly less romance-forward than ACOTAR — it\'s first and foremost epic fantasy with romantic threads.',
        standalone: true,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Priory+of+the+Orange+Tree+Samantha+Shannon',
        bookshop_url: 'https://bookshop.org/search?keywords=The+Priory+of+the+Orange+Tree',
      },
      {
        title: 'Kingdom of the Wicked',
        author: 'Kerri Maniscalco',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780316428354-L.jpg',
        darkness_level: 3,
        heat_level: 'Open Door',
        tags: ['Demons', 'Enemies to Lovers', 'Historical Setting', 'Dark Romance', 'Mythology'],
        why: 'Victorian Sicily meets demon mythology in a book that shares ACOTAR\'s gift for making morally questionable love interests irresistible. The tension between Emilia and Wrath is well-paced, the setting is vivid, and the murder mystery plot gives the enemies-to-lovers dynamic somewhere to actually go. Caveat: the mystery itself is somewhat thin — you\'re really here for the banter and the atmosphere.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Kingdom+of+the+Wicked+Kerri+Maniscalco',
        bookshop_url: 'https://bookshop.org/search?keywords=Kingdom+of+the+Wicked',
      },
    ],
    related: [
      { title: 'Books Like Mistborn', slug: 'mistborn-the-final-empire' },
      { title: 'Books Like The Cruel Prince', slug: 'the-cruel-prince' },
      { title: 'Books Like From Blood and Ash', slug: 'from-blood-and-ash' },
    ],
  },
  {
    slug: 'mistborn-the-final-empire',
    source: {
      title: 'Mistborn: The Final Empire',
      author: 'Brandon Sanderson',
      cover_url: 'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
      darkness_level: 3,
      heat_level: null,
      series: 'Mistborn',
      series_number: 1,
      tropes: ['Found Family', 'Heist Fantasy', 'Chosen One', 'Oppressive Empire', 'Power at a Cost'],
      why_people_love:
        'Mistborn earns its devoted readership through two things it does better than almost anyone else: a magic system that feels genuinely original and fair, and a heist narrative that gives the mechanics somewhere to actually go. Kelsier is one of fantasy\'s great charismatic leaders — magnetic, morally complicated, and driving every scene he\'s in. The world of ash and eternal night has a weight to it that most secondary worlds don\'t manage, and the finale earns its emotional punch. Fair warning: the first hundred pages are slow as Sanderson lays the groundwork. Push through — the back half moves fast and pays off everything it\'s been building.',
    },
    aspects: [
      {
        heading: 'If you loved the hard magic system with rules and consequences...',
        recs: [
          {
            title: 'The Way of Kings',
            author: 'Brandon Sanderson',
            author_note: 'yes, more Sanderson — unavoidable',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
            darkness_level: 3,
            heat_level: null,
            standalone: false,
            series: 'The Stormlight Archive',
            series_number: 1,
            series_label: 'Series (10 books planned)',
            audiobook: true,
            note: 'Stormlight Archive is Sanderson operating at full scale. The magic — Stormlight, Shardblades, Radiant powers — is even more elaborately constructed than Allomancy. Slower opening than Mistborn, but by book\'s end you\'ll understand why people call it the best epic fantasy being written today. Caveat: the first 200 pages test your patience. Push through.',
            tags: ['Hard Magic', 'Epic Scale', 'Multiple POVs'],
            amazon_url: 'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson',
            bookshop_url: 'https://bookshop.org/search?keywords=The+Way+of+Kings+Sanderson',
          },
          {
            title: 'The Name of the Wind',
            author: 'Patrick Rothfuss',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg',
            darkness_level: 2,
            heat_level: 'Sweet Romance',
            standalone: false,
            series: 'The Kingkiller Chronicle',
            series_number: 1,
            series_label: 'Series (unfinished — be warned)',
            audiobook: true,
            note: 'Where Sanderson builds systems, Rothfuss builds atmosphere. The magic here — Sympathy — has its own internal logic but feels more like chemistry than physics. Kvothe is the anti-Vin: arrogant, brilliant, unreliable. The prose is genuinely beautiful in a way Sanderson\'s isn\'t. Caveat: book 3 has been unfinished for 14 years. Read knowing this.',
            tags: ['Hard Magic', 'Single POV', 'Slower Burn'],
            amazon_url: 'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss',
            bookshop_url: 'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss',
          },
        ],
      },
      {
        heading: 'If you loved the heist and underdog structure...',
        recs: [
          {
            title: 'Six of Crows',
            author: 'Leigh Bardugo',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9781627792127-L.jpg',
            darkness_level: 3,
            heat_level: 'Closed Door',
            standalone: false,
            series: 'Six of Crows',
            series_number: 1,
            series_label: 'Series (duology)',
            audiobook: true,
            note: 'The most purely fun book on this list. Six morally compromised people plan an impossible heist. The ensemble structure means you\'re never bored, and Bardugo\'s Ketterdam feels as lived-in as the Final Empire. Less hard magic, more character chemistry. Caveat: read Bardugo\'s Shadow and Bone trilogy first or you\'ll miss context.',
            tags: ['Heist', 'Found Family', 'Morally Grey Characters'],
            amazon_url: 'https://www.amazon.com/s?k=Six+of+Crows+Leigh+Bardugo',
            bookshop_url: 'https://bookshop.org/search?keywords=Six+of+Crows+Leigh+Bardugo',
          },
          {
            title: 'The Lies of Locke Lamora',
            author: 'Scott Lynch',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'Gentleman Bastard',
            series_number: 1,
            series_label: 'Series (ongoing)',
            audiobook: true,
            note: 'If the heist planning and crew chemistry were your main draws, this is the more hardcore version. The Gentleman Bastards are con artists in a city that feels genuinely dangerous, and the schemes are elaborately satisfying. Lynch writes banter better than almost anyone. Caveat: significantly darker and more violent than Mistborn. The pacing in the middle third is uneven but the payoff is real.',
            tags: ['Heist', 'Con Artists', 'Dark World'],
            amazon_url: 'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
            bookshop_url: 'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
          },
        ],
      },
      {
        heading: 'If you want something darker with the same epic scope...',
        recs: [
          {
            title: 'The Poppy War',
            author: 'R.F. Kuang',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780062662583-L.jpg',
            darkness_level: 5,
            heat_level: null,
            standalone: false,
            series: 'The Poppy War',
            series_number: 1,
            series_label: 'Series (trilogy)',
            audiobook: true,
            note: 'This is where the caveats matter most. The Poppy War starts feeling somewhat like Mistborn — scrappy underdog enters elite military academy, discovers terrifying power — and then it becomes one of the darkest fantasy novels published in the last decade. Inspired by the Second Sino-Japanese War. If you can handle it, it\'s extraordinary. If you want something hopeful, go elsewhere.',
            tags: ['Underdog', 'Military Academy', 'Hard Power System'],
            warning: 'War Crimes, Genocide, Drug Addiction, Torture',
            amazon_url: 'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang',
            bookshop_url: 'https://bookshop.org/search?keywords=The+Poppy+War+Kuang',
          },
          {
            title: 'The Blade Itself',
            author: 'Joe Abercrombie',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
            darkness_level: 4,
            heat_level: null,
            standalone: false,
            series: 'The First Law',
            series_number: 1,
            series_label: 'Series (trilogy + standalones)',
            audiobook: true,
            note: 'Mistborn subverts the Chosen One trope; The Blade Itself goes further, cheerfully dismantling every heroic fantasy convention it can find. The ensemble cast is morally compromised in ways that feel earned rather than edgy, and Abercrombie\'s ear for character voice is exceptional. Caveat: if you were drawn to Mistborn\'s sense of hope — the idea that the underdog can actually win — the First Law will actively antagonise that instinct. It\'s a deconstruction.',
            tags: ['Grimdark', 'Morally Grey Characters', 'Subverted Tropes', 'Ensemble Cast'],
            amazon_url: 'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
            bookshop_url: 'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
          },
        ],
      },
      {
        heading: 'If you want a standalone before committing to a long series...',
        recs: [
          {
            title: 'Elantris',
            author: 'Brandon Sanderson',
            cover_url: 'https://covers.openlibrary.org/b/isbn/9780765350374-L.jpg',
            darkness_level: 2,
            heat_level: null,
            standalone: true,
            audiobook: true,
            note: 'His first published novel, and it shows — the prose is rougher, the characters less developed than Mistborn — but the mystery of the broken magic system is compelling and it resolves completely in one volume. A good Sanderson on-ramp if you\'re not ready to commit to a 10-book series.',
            tags: ['Standalone', 'Broken Magic System', 'Political Intrigue'],
            amazon_url: 'https://www.amazon.com/s?k=Elantris+Brandon+Sanderson',
            bookshop_url: 'https://bookshop.org/search?keywords=Elantris+Sanderson',
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
        tags: ['Heist Fantasy', 'Con Artists', 'Found Family', 'Dark World', 'Clever Protagonists'],
        why: 'The closest thing to Mistborn\'s heist energy you\'ll find. The Gentleman Bastards are a crew of con artists operating in a city that feels genuinely dangerous, and the schemes are elaborately satisfying in the same way Allomancy is — complex, with costs, and revealed in layers. Lynch writes banter better than almost anyone in the genre. Caveat: significantly darker and more violent than Mistborn, and the pacing in the middle third is uneven. The payoff is worth it.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch',
        bookshop_url: 'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora',
      },
      {
        title: 'Six of Crows',
        author: 'Leigh Bardugo',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781627792127-L.jpg',
        darkness_level: 3,
        heat_level: 'Closed Door',
        tags: ['Heist Fantasy', 'Found Family', 'Multiple POVs', 'Morally Grey Characters'],
        why: 'If Mistborn\'s heist structure and found family dynamic were your main draws, Six of Crows delivers both with more romance. A crew of misfit criminals planning an impossible prison break — the structure is familiar, the execution is sharp, and Kaz Brekker is one of the genre\'s better morally grey leads. Caveat: lighter in tone and the magic system is less central. It\'s Bardugo at her best, which is very good, but a different kind of book.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Six+of+Crows+Leigh+Bardugo',
        bookshop_url: 'https://bookshop.org/search?keywords=Six+of+Crows+Leigh+Bardugo',
      },
      {
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780756404079-L.jpg',
        darkness_level: 2,
        heat_level: 'Sweet Romance',
        tags: ['Underdog Hero', 'First Person Narrative', 'University Setting', 'Legendary Protagonist'],
        why: 'Sympathy and Naming are built with the same rigorous internal logic as Allomancy, and Kvothe\'s outsider-genius arc has the same propulsive quality as Vin\'s. The prose is a step up from Sanderson. Caveat: the series is unfinished and has been for fifteen years — book three shows no sign of arriving. If you can make peace with that, the first two books are genuinely exceptional.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss',
        bookshop_url: 'https://bookshop.org/search?keywords=The+Name+of+the+Wind+Rothfuss',
      },
      {
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
        darkness_level: 3,
        heat_level: null,
        tags: ['Found Family', 'Multiple POVs', 'Massive World', 'Same Author'],
        why: 'The obvious next step if you loved Mistborn and want more Sanderson at full scale. Three interconnected magic systems, multiple continents, and characters who are psychologically complex in ways Mistborn only hints at. Kaladin\'s arc in book one is the best thing Sanderson has written. Caveat: this is a serious commitment — book one is over 1,000 pages and the series currently stands at five volumes.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson',
        bookshop_url: 'https://bookshop.org/search?keywords=The+Way+of+Kings+Sanderson',
      },
      {
        title: 'The Blade Itself',
        author: 'Joe Abercrombie',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9781591025948-L.jpg',
        darkness_level: 4,
        heat_level: null,
        tags: ['Grimdark', 'Morally Grey Characters', 'Subverted Tropes', 'Political Intrigue', 'Ensemble Cast'],
        why: 'Mistborn subverts the Chosen One trope in interesting ways; The Blade Itself goes further, cheerfully dismantling every heroic fantasy convention it can find. The ensemble cast is morally compromised in ways that feel earned rather than edgy. Caveat: if you were drawn to Mistborn\'s sense of hope — the idea that the underdog can actually win — the First Law trilogy will actively antagonise that instinct. It\'s a deconstruction.',
        standalone: false,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=The+Blade+Itself+Joe+Abercrombie',
        bookshop_url: 'https://bookshop.org/search?keywords=The+Blade+Itself+Abercrombie',
      },
      {
        title: 'Elantris',
        author: 'Brandon Sanderson',
        cover_url: 'https://covers.openlibrary.org/b/isbn/9780765350374-L.jpg',
        darkness_level: 2,
        heat_level: null,
        tags: ['Standalone', 'Political Intrigue', 'Broken Magic System', 'Same Author', 'Dual POV'],
        why: 'If you want more Sanderson before committing to a 10-book series, Elantris is the gentler on-ramp. His first published novel — the prose is rougher and the characters less developed — but the mystery of the broken magic system is compelling and it resolves completely in one volume. Caveat: lower expectations on prose and character depth, enjoy the puzzle plot.',
        standalone: true,
        audiobook: true,
        amazon_url: 'https://www.amazon.com/s?k=Elantris+Brandon+Sanderson',
        bookshop_url: 'https://bookshop.org/search?keywords=Elantris+Sanderson',
      },
    ],
    related: [
      { title: 'Books Like A Court of Thorns and Roses', slug: 'acotar' },
      { title: 'Books Like The Way of Kings', slug: 'the-way-of-kings' },
      { title: 'Books Like The Name of the Wind', slug: 'the-name-of-the-wind' },
    ],
  },
]

export function getBooksLikeEntry(slug: string): BooksLikeEntry | undefined {
  return BOOKS_LIKE.find((e) => e.slug === slug)
}
