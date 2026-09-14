import type { ReadingOrderEntry } from '../reading-orders';

export const redQueen: ReadingOrderEntry = {
  slug: 'red-queen',
  name: 'Red Queen',
  author: 'Victoria Aveyard',
  seriesStatus: 'complete',
  seriesStatusLabel: '✅ Complete - 4 books + 2 bonus collections (finished 2018)',
  description:
    "Mare Barrow is Red: no powers, no future beyond conscription into a war she didn't start, in a kingdom ruled by Silvers who can throw fire and read minds. Then she manifests lightning in front of the entire Silver court, and rather than admit a Red can do what she just did, the crown invents a lost noble bloodline for her and engages her to a prince to keep the lie contained. Victoria Aveyard spends four books on what happens when the cover-up outgrows the people who built it.",
  darknessDisplay: '🕯️🕯️🕯️ Moderate - war, executions, and psychological manipulation, no explicit content',
  orderNote:
    "Read the four main books in strict publication order: Red Queen, Glass Sword, King's Cage, War Storm. Each ends on a cliffhanger the next picks up immediately, so don't gap between them. Cruel Crown and Broken Throne are optional novella collections: Cruel Crown works either between Red Queen and Glass Sword or after War Storm, but save Broken Throne for last since it assumes the ending. (Spoiler-Free.)",
  cardsPosition: 'above',
  cards: [
    {
      title: '✍️ Victoria Aveyard',
      body: "Aveyard was 24, fresh out of USC's screenwriting program, when Red Queen came out in 2015. She wrote all four main books over the next three years, finishing the series in 2018, and has said the novel was conceived and pitched as a book from the start rather than adapted from an earlier screenplay.",
      color: 'blue',
    },
    {
      title: '🗡️ The Scarlet Guard Existed First',
      body: "The Reds' rebellion was running smuggling networks and staging attacks years before Mare ever showed powers; Farley, its senior field commander, gets her own origin story in the Steel Scars novella. Mare doesn't start the resistance. She becomes its most useful weapon.",
      color: 'red',
    },
    {
      title: '💔 "Anyone Can Betray Anyone"',
      body: "It's not marketing copy. It's a line the scholar Julian Jacos says to Mare early in book 1, and it's the actual mechanism the series runs on rather than a tagline. The betrayal it's warning about is what most readers remember years after finishing. Go into Red Queen knowing nothing more than the premise.",
      color: 'purple',
    },
    {
      title: '👑 Maven Calore',
      body: "Whatever the pacing does in the middle stretch, the relationship between Mare and Maven doesn't let up: it drives books 1 and 2 more than the political plot does, and Aveyard writes his particular kind of damage more convincingly than she writes the war around him.",
      color: 'zinc',
    },
    {
      title: '📉 The Middle Slows Down',
      body: "Glass Sword and King's Cage broaden the cast and the politics, and the pace drops noticeably from book 1's momentum. Know this going in rather than discovering it mid-Glass Sword: the series asks for patience in the middle two books before War Storm pulls everything back together.",
      color: 'amber',
    },
    {
      title: '📺 The Stalled Adaptation',
      body: "A Peacock TV series written by Aveyard and directed by Elizabeth Banks has been in development since 2021, but remains stuck in pre-production with no cast or release date as of mid-2026. Aveyard has said the project isn't cancelled, just moving very slowly.",
      color: 'green',
    },
  ],
  groups: [
    {
      label: 'Main Series',
      sublabel: 'read in this order - required',
      noteType: 'required',
      books: [
        {
          title: 'Red Queen',
          slug: 'red-queen',
          status: 'mandatory',
          note: "Engaged to Prince Maven Calore as the crown's cover story, Mare trains to hide her Red blood while secretly feeding information to the Scarlet Guard, and the book ends on a reveal that recontextualizes everything that came before it.",
          page_count: 416,
          publication_year: 2015,
        },
        {
          title: 'Glass Sword',
          slug: 'glass-sword',
          status: 'mandatory',
          note: "Mare reunites with her brother Shade, secretly a Red-Silver hybrid, and uses a smuggled list to find other 'newbloods' like them before Maven's forces can eliminate them first; a rescue meant to save lives costs the group one of its own.",
          page_count: 464,
          publication_year: 2016,
        },
        {
          title: "King's Cage",
          slug: 'kings-cage',
          status: 'mandatory',
          note: "Maven keeps Mare as a captive trophy while the whisper Samson Merandus tears through her memories for the Guard's secrets, and his sudden marriage to Lakelander princess Iris Cygnet destabilizes the war just as Norta's nobility starts questioning which brother actually deserves the throne.",
          page_count: 500,
          publication_year: 2017,
        },
        {
          title: 'War Storm',
          slug: 'war-storm',
          status: 'mandatory',
          note: "Every faction (the Lakelands, Piedmont, Monfort, and the Scarlet Guard alike) picks a side as Mare and Cal's uneasy alliance with House Samos faces its last test, and the book resolves both who takes Norta's throne and what's left of Mare and Cal after everything the crown has cost them.",
          page_count: 661,
          publication_year: 2018,
        },
      ],
    },
    {
      label: 'Bonus Collections',
      sublabel: 'any order - optional, skippable',
      noteType: 'optional',
      books: [
        {
          title: 'Cruel Crown',
          slug: 'cruel-crown',
          status: 'supplementary',
          note: "Two novellas: Queen Song follows Cal's mother Coriane Jacos through her rise and eventual breakdown at Elara Merandus's hands decades before Mare's story, and Steel Scars follows Farley recruiting for the Scarlet Guard's first strike, ending with her discovery of Mare.",
          page_count: 187,
          publication_year: 2016,
        },
        {
          title: 'Broken Throne',
          slug: 'broken-throne',
          status: 'supplementary',
          note: "A post-series anthology of new novellas covering the war's aftermath, plus reprints of Steel Scars and Queen Song, maps, and family trees. Written entirely for readers who've already finished War Storm.",
          page_count: 468,
          publication_year: 2019,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Mare Barrow',
      role: 'Protagonist, all four books',
      faction: 'Red, later Silver-passing',
      color: 'blue',
      why_they_work:
        "She spends the series being used as a symbol by every faction around her, Silver propaganda, Scarlet Guard recruitment, her own family's hopes, and her actual arc is fighting to be a person instead of whatever the nearest power wants her to represent.",
    },
    {
      name: 'Maven Calore',
      role: 'Antagonist, all four books',
      faction: 'House Calore, King of Norta',
      color: 'zinc',
      why_they_work:
        "Aveyard gives him a specific, real reason for what he becomes, a mother who rewired his mind for her own purposes since childhood, without using it to excuse a single thing he does with the throne once he has it.",
    },
    {
      name: 'Cal (Tiberias Calore VII)',
      role: "Mare's ally and love interest",
      faction: 'House Calore, exiled prince',
      color: 'amber',
      why_they_work:
        "His arc runs opposite a chosen-one story: a prince raised to rule spends four books discovering how much of what he was taught about Reds and Silvers alike was simply wrong.",
    },
    {
      name: 'Evangeline Samos',
      role: 'Rival, later uneasy ally',
      faction: 'House Samos',
      color: 'purple',
      why_they_work:
        "She wants out of an arranged-marriage political system as badly as Mare wants out of the caste system, and the books let her be genuinely dangerous and genuinely sympathetic without softening either quality to make room for the other.",
    },
    {
      name: 'Farley (Diana Farley)',
      role: 'Scarlet Guard commander',
      faction: 'The Scarlet Guard',
      color: 'red',
      why_they_work:
        "Unlike Mare, whose powers make her useful to the cause overnight, Farley built her position through years of unglamorous, dangerous groundwork, a contrast the books make explicit whenever the two clash over strategy.",
    },
    {
      name: 'Julian Jacos',
      role: "Mare's tutor, royal scholar",
      faction: 'House Jacos',
      color: 'green',
      why_they_work:
        "He's the one character whose warnings the plot keeps validating, which makes him less a mentor figure and more a working demonstration that knowing the truth about this court has never been enough to survive it.",
    },
  ],
  sections: [
    {
      heading: 'What kind of series this is',
      type: 'bullets',
      bullets: [
        "YA dystopian fantasy built on class-based oppression and political betrayal rather than quest-based adventure; the Silver-Red caste system drives the political plot directly rather than serving as backdrop for the romance.",
        "The closest comparisons on this list are Divergent for the class-revolution structure and faction politics, and the Grishaverse for a commoner protagonist whose sudden power upends a rigid magical aristocracy.",
        "Romance runs through all four books, a shifting triangle among Mare, Cal, and Maven, but the series is more interested in political consequence than romantic resolution; nobody's choice in that triangle comes free.",
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        "Darkness is moderate: war, executions, imprisonment, and psychological manipulation (memory torture, mind control) appear throughout and intensify in King's Cage, though violence stays off-page more than graphic.",
        'Explicit content: no. Romance stays closed-door throughout the main series and the bonus collections.',
      ],
    },
    {
      heading: 'Why it matters',
      type: 'bullets',
      bullets: [
        'Red Queen debuted at #1 on the New York Times YA bestseller list in its first week of release, the only debut novel ever to open there at #1.',
        "It arrived in 2015 as the Hunger Games/Divergent YA dystopian wave was cresting, and became one of the last major breakout series in that specific subgenre before YA readership shifted toward romantasy in the years that followed.",
      ],
    },
  ],
  darkness: [
    {
      label: 'Main Series',
      level: 3,
      desc: "Executions and battlefield deaths are described plainly rather than graphically; the real weight comes from Maven's psychological control over Mare in King's Cage and the war's mounting political cost in War Storm",
    },
    {
      label: 'Bonus Collections',
      level: 3,
      desc: "Queen Song ends in a forced psychological breakdown and suicide; Steel Scars covers guerrilla warfare and rebellion casualties with the same weight as the main series",
    },
  ],
  metaDescription:
    "The complete Red Queen reading order: all four main books in publication order, plus where the Cruel Crown and Broken Throne novellas fit in.",
  shortName: 'Red Queen',
  booksLikeSlug: 'red-queen',
  lastUpdated: '2026-09-14',
  finishedLabel: 'Finished the Red Queen series?',
  categoryHref: '/fantasy/romantasy',
  categoryLabel: 'Browse Romantasy',
  related: ['divergent', 'grishaverse', 'throne-of-glass', 'shadowhunter-chronicles', 'folk-of-the-air', 'zodiac-academy'],
};
