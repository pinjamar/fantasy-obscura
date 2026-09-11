import type { ReadingOrderEntry } from '../reading-orders';

export const thomasCovenant: ReadingOrderEntry = {
  slug: 'thomas-covenant',
  name: 'Thomas Covenant',
  author: 'Stephen R. Donaldson',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 10 books (finished 2013)',
  description:
    "Thomas Covenant is a leper, and in the world Donaldson gives him, leprosy means numbness: a strict daily discipline of never trusting a feeling that might get him killed by an injury he can't sense. When something drags him into the Land, a gorgeous, magical secondary world entirely convinced he's its prophesied saviour, Covenant doesn't respond with wonder. He decides it's a hallucination and treats everyone in it accordingly. What that refusal costs the people around him, and what it costs him to keep insisting on it for as long as he does, is the actual subject of all ten books.",
  darknessDisplay: '🕯️🕯️🕯️🕯️🕯️ Severe - moral and psychological darkness, not just violence',
  orderNote:
    "Read all ten books in strict order. This is one continuous story, not a pick-and-choose saga: decades or centuries pass in the Land between sub-series even though only months or years pass for Covenant, so treat each gap as a time-skip within a single narrative, not a natural stopping point. The First Chronicles do form a complete trilogy on their own if you want to stop after book 3, but the Second and Last Chronicles depend on everything that came before them. (Spoiler-Free.)",
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Stephen R. Donaldson',
      body: "Donaldson's manuscript for Lord Foul's Bane was rejected 47 times over roughly four years before editor Lester del Rey found it in his slush pile and used it, alongside The Sword of Shannara and A Spell for Chameleon, to launch the new Del Rey Books fantasy imprint in 1977.",
      color: 'blue',
    },
    {
      title: '📖 Dense, Demanding, Deliberately Difficult',
      body: "Donaldson writes in a thick, Latinate vocabulary that sends most readers to a dictionary at least once a book, and the pacing is patient by any standard. This isn't a period quirk: the prose difficulty is doing work, mirroring Covenant's own alienation from a world he's decided isn't real.",
      color: 'purple',
    },
    {
      title: '⚠️ What Happens Early in Book 1',
      body: "In the first quarter of Lord Foul's Bane, Covenant rapes Lena, the teenage daughter of the woman guiding him through the Land. Donaldson doesn't treat it as heroic or resolve it with comfort: it's the act Covenant can't outrun for the rest of the ten-book arc, and the series' entire moral architecture is built around what he owes for it. Know this going in.",
      color: 'red',
    },
    {
      title: '🌿 The Land Argues Back',
      body: "Everything Covenant refuses to believe in is rendered with enough specificity that the reader believes it anyway: a health-sense that lets the Land's people perceive the vitality of living things, and a magic, Earthpower and the wild magic of white gold, that runs on passion and hard-won choices rather than incantations. The gap between his refusal and the reader's growing conviction is where the books do their actual work.",
      color: 'green',
    },
    {
      title: '⏳ Linden Avery Changes the Math',
      body: "Every time Covenant crosses into the Land, decades or centuries have passed there while only months or years pass for him. The physician Linden Avery joins him as co-protagonist starting with The Wounded Land, then becomes the sole viewpoint character for the final four books, set well after Covenant's own arc from the first six has ended.",
      color: 'amber',
    },
    {
      title: '🌑 The Last Dark',
      body: "Donaldson closed the saga in 2013, thirty-six years after Lord Foul's Bane, with Covenant, Linden, and Linden's son Jeremiah converging on Lord Foul himself while the Worm of the World's End threatens to unmake reality outright. It's a rare decades-spanning saga finished by the same author who started it, writing at the same pitch throughout.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'The First Chronicles',
      sublabel: 'read in this order - required',
      note: "Covenant's first crossing into the Land, told as one continuous crisis with no time-skip between the three books.",
      noteType: 'required',
      books: [
        {
          title: "Lord Foul's Bane",
          slug: 'lord-fouls-bane',
          status: 'mandatory',
          note: "The Cavewight Drool Rockworm has stolen the Staff of Law and summoned Covenant to use his white gold ring against it. Guided by the Stonedownor Atiaran and hailed as the reincarnated hero Berek Halfhand, Covenant refuses to believe any of it while High Lord Prothall's party races to stop Drool before Lord Foul the Despiser claims the Staff's power himself.",
          page_count: 394,
          publication_year: 1977,
        },
        {
          title: 'The Illearth War',
          slug: 'the-illearth-war',
          status: 'mandatory',
          note: "Forty years have passed in the Land for only weeks of Covenant's own time, and Lord Foul now wields the Illearth Stone, an artifact that nullifies the Lords' magic outright. High Lord Elena turns to Covenant's ring while his Earth-side counterpart, the warlord Hile Troy, leads the Warward against Foul's general Fleshharrower, ending with Troy's army trapped and the war unresolved.",
          page_count: 479,
          publication_year: 1978,
        },
        {
          title: 'The Power That Preserves',
          slug: 'the-power-that-preserves',
          status: 'mandatory',
          note: "Revelstone is under full siege by Lord Foul's army under Satansfist as the Land endures an unnatural winter. Kidnapped by Ravers, Covenant is forced to confront the reanimated ghost of High Lord Elena and destroy the Staff of Law with wild magic to be free of her, then journeys into Lord Foul's own stronghold for the trilogy's final confrontation.",
          page_count: 531,
          publication_year: 1979,
        },
      ],
    },
    {
      label: 'The Second Chronicles',
      sublabel: 'read in this order - required',
      note: "Roughly four thousand years pass in the Land for about a decade of Covenant's own life; the world has changed almost past recognition by the time he returns.",
      noteType: 'required',
      books: [
        {
          title: 'The Wounded Land',
          slug: 'the-wounded-land',
          status: 'mandatory',
          note: "Covenant returns with new co-protagonist Linden Avery, a doctor pulled in alongside him, to a Land ravaged by the Sunbane, a corrupted cycle that has replaced nature's laws, while a theocratic Clave practices human sacrifice to feed a Banefire that channels it. Learning the Sunbane stems from the Staff of Law's destruction, Covenant and Linden set out to find the One Tree and forge a new one.",
          page_count: 497,
          publication_year: 1980,
        },
        {
          title: 'The One Tree',
          slug: 'the-one-tree',
          status: 'mandatory',
          note: "The Search sails aboard a Giantship with the enigmatic Elohim Findail toward the One Tree the original Staff of Law was carved from. At the port of the Bhrathair, the wizard Kasreyn tries to steal Covenant's ring before Findail kills him, and at the Tree itself the party learns it's guarded by the Worm of the World's End, whose use would shatter the Arch of Time entirely.",
          page_count: 496,
          publication_year: 1982,
        },
        {
          title: 'White Gold Wielder',
          slug: 'white-gold-wielder',
          status: 'mandatory',
          note: "Returning to a Land nearly destroyed by the Sunbane, Covenant and Linden use a captured Sandgorgon to help extinguish the Banefire and break the Clave's power. Linden then fuses the constructs Vain and Findail into a new Staff of Law, ending the Sunbane and healing the Land, while Covenant dies confronting Lord Foul directly.",
          page_count: 512,
          publication_year: 1983,
        },
      ],
    },
    {
      label: 'The Last Chronicles',
      sublabel: 'read in this order - required',
      note: "Set about a decade later for Linden but centuries later again in the Land, where the erosion known as Kevin's Dirt has wiped out most memory of Earthpower.",
      noteType: 'required',
      books: [
        {
          title: 'The Runes of the Earth',
          slug: 'the-runes-of-the-earth',
          status: 'mandatory',
          note: "Linden Avery becomes sole protagonist after her adopted, unresponsive son Jeremiah is kidnapped by Covenant's ex-wife Joan and his resurrected son Roger, both being used by Lord Foul to escape the Arch of Time. Pulled back into a Land that has forgotten Earthpower, Linden teams with the amnesiac Anele to recover the lost Staff of Law, and the book ends with Jeremiah arriving alongside an apparently resurrected Covenant.",
          page_count: 532,
          publication_year: 2004,
        },
        {
          title: 'Fatal Revenant',
          slug: 'fatal-revenant',
          status: 'mandatory',
          note: "The returned Covenant and a now-lucid Jeremiah are subtly, unmistakably wrong, cold and dismissive toward Linden, while Esmer, offspring of an Elohim and a Haruchai, keeps intervening to help or sabotage her efforts. Transported centuries into the Land's past, Linden learns Covenant and Jeremiah intend to drink the Earthblood to thwart both Lord Foul and the renegade Elohim Kastenessen.",
          page_count: 896,
          publication_year: 2007,
        },
        {
          title: 'Against All Things Ending',
          slug: 'against-all-things-ending',
          status: 'mandatory',
          note: "Linden literally resurrects Thomas Covenant using his ring, her Staff of Law, and High Lord Loric's krill, but the act awakens the Worm of the World's End and fractures Covenant's mind as his leprosy returns. With Lord Foul, Kastenessen, Roger, and a Raver-possessed Joan all closing in, the sorcerer the Harrow offers to find Jeremiah in exchange for the ring and Staff.",
          page_count: 624,
          publication_year: 2010,
        },
        {
          title: 'The Last Dark',
          slug: 'the-last-dark',
          status: 'mandatory',
          note: "With the sun failing and the Worm consuming the Elohim, the company splits three ways: Jeremiah builds a protective ward, Linden seeks out the ancient forest-guardian Caerroil Wildwood, and Covenant confronts Lord Foul directly at Kiril Threndor, where Covenant finally absorbs Foul entirely and the three of them repair the Arch of Time.",
          page_count: 896,
          publication_year: 2013,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Thomas Covenant',
      role: 'Protagonist, all ten books',
      faction: 'The Unbeliever',
      color: 'blue',
      why_they_work:
        "Donaldson never resolves the tension the whole series runs on: Covenant's refusal to believe in the Land makes complete sense as a leper's survival strategy, and the books never quite let the reader forgive him for what that belief costs everyone around him, even after he commits to defending the place.",
    },
    {
      name: 'Linden Avery',
      role: 'Co-protagonist from The Wounded Land; sole protagonist, The Last Chronicles',
      faction: 'Physician, the world outside the Land',
      color: 'green',
      why_they_work:
        "She's introduced to give Covenant's damage an outside witness, then ends up making the single most consequential and morally compromising decision in the entire saga herself, in the Last Chronicles.",
    },
    {
      name: 'Lord Foul, the Despiser',
      role: 'Antagonist, all ten books',
      faction: 'The Despiser',
      color: 'red',
      why_they_work:
        "He's barely on the page across ten books, which is the point: Donaldson keeps him as an almost entirely off-screen pressure, so the real conflict stays with what the Land's people, and Covenant, do to each other under that pressure rather than with Foul directly.",
    },
    {
      name: 'Saltheart Foamfollower',
      role: 'Companion, The First Chronicles',
      faction: 'The Giants of Seareach',
      color: 'amber',
      why_they_work:
        "As the one major character who likes Covenant without reservation and pays a real price for it, Foamfollower is the series' clearest answer to what loving someone this difficult actually costs.",
    },
    {
      name: 'High Lord Elena',
      role: 'Ally, The First Chronicles',
      faction: 'The Council of Lords',
      color: 'purple',
      why_they_work:
        "Her arc, falling for a version of Covenant that exists mostly in her own hero-worship and then paying for that misjudgment through the very power he gave her, is the series' first proof that reverence for Covenant is exactly as dangerous as his own self-loathing.",
    },
    {
      name: 'Jeremiah',
      role: "Linden's adopted son, The Last Chronicles",
      faction: 'The world outside the Land',
      color: 'zinc',
      why_they_work:
        "He spends most of the Last Chronicles as an object other characters fight over rather than an agent of his own, which makes his eventual choice near the end land as a genuine structural surprise instead of a foregone one.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        "Philosophical dark fantasy built around a deliberately unlikeable protagonist, closer to literary fiction in its concerns (guilt, complicity, what a person owes the people he's damaged) than to adventure fantasy.",
        "The closest comparisons on this list are Gene Wolfe's Book of the New Sun for dense, vocabulary-heavy prose that trusts the reader to do real work, and Mark Lawrence's Prince of Thorns for an unrepentant narrator the book refuses to soften.",
        "This isn't violence-for-its-own-sake grimdark: the darkness is moral and psychological first, and the Land's own beauty and wonder are played completely straight, never undercut for irony.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Darkness is severe and mostly psychological or moral, though later books add real battlefield violence and body horror (the Sunbane's corruption of the Land, the Worm of the World's End).",
        "Explicit content: yes, in Lord Foul's Bane (see the content warning card above for specifics).",
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        "Lord Foul's Bane (1977) predates A Game of Thrones (1996) by nearly two decades and The Blade Itself (2006) by close to thirty years, making Covenant one of the earliest deliberately unsympathetic protagonists in modern epic fantasy rather than a product of the genre's later grimdark turn.",
        "Genre critics and historians (Grimdark Magazine, Black Gate) consistently place Donaldson alongside Glen Cook as one of the two writers who brought morally compromised protagonists into epic fantasy before grimdark existed as a recognized category.",
      ],
    },
  ],
  darkness: [
    {
      label: 'The First Chronicles',
      level: 5,
      desc: "Opens with a sexual assault by the protagonist in its first quarter, then sustains siege warfare and psychological horror around Covenant's guilt for the rest of the trilogy",
    },
    {
      label: 'The Second Chronicles',
      level: 4,
      desc: "The Sunbane cycles the Land's own weather through phases that each demand human sacrifice to survive; the darkness here is body-horror and atrocity more than personal violation",
    },
    {
      label: 'The Last Chronicles',
      level: 4,
      desc: 'Reality itself starts unraveling through time-rifts and a world-devouring Worm, shifting toward existential and cosmic stakes alongside Covenant and Linden\'s returning personal guilt',
    },
  ],
  metaDescription:
    "The complete Thomas Covenant reading order: all ten books across three Chronicles, read straight through in strict publication order.",
  shortName: 'Thomas Covenant',
  booksLikeSlug: 'lord-fouls-bane',
  lastUpdated: '2026-09-11',
  finishedLabel: 'Finished the Chronicles of Thomas Covenant?',
  categoryHref: '/fantasy/grimdark',
  categoryLabel: 'Browse Grimdark Fantasy',
  related: ['gene-wolfe', 'mark-lawrence', 'black-company', 'malazan', 'first-law', 'earthsea'],
};
