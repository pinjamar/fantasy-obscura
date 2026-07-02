import type { ReadingOrderEntry } from '../reading-orders';

export const lockedTomb: ReadingOrderEntry = {
  slug: 'locked-tomb',
  name: 'The Locked Tomb',
  author: 'Tamsyn Muir',
  seriesStatus: 'ongoing',
  seriesStatusLabel: '📖 Ongoing - 3 books published; Alecto the Ninth no date announced',
  description:
    "Tamsyn Muir's Locked Tomb is one of the most genuinely difficult series to categorise in contemporary fiction: science fantasy, gothic horror, queer romance, necromancy in space, and comedy, all at once. The one-sentence description that circulates is 'Lesbian necromancers in space' and it is not wrong. The four books follow the Nine Houses of a dying solar system: nine distinct factions of necromancers and their cavalier bodyguards, all circling the Emperor who created them thousands of years ago. The series is structurally cumulative in a very specific way: each book retroactively rewrites what came before, and reading out of order is not a viable option.",
  darknessDisplay: '🕯️🕯️🕯️🕯️ Dark - gothic horror, body horror, significant character deaths',
  orderNote:
    'Read in publication order, no exceptions. The series is structurally cumulative and the second book is deliberately disorienting in a way that only resolves in retrospect. Gideon the Ninth is the only entry point. The voice established in the first chapter is the foundation of everything that follows. Readers who bounce off the opening do not find a different version later.',
  booksLikeSlug: 'locked-tomb',
  cardsPosition: 'above',
  cards: [
    {
      title: '💀 Necromancers in Space',
      body: "The Nine Houses are a dying solar system's civilisation, built on necromancy: the magic of bones, flesh, shadow, and death. Each House has a distinct magical speciality and a distinct number. The whole structure has the texture of a collapsed empire that once spanned stars and has since retreated into ritual, mythology, and hierarchy. The Emperor created all of it thousands of years ago and is still alive.",
      color: 'purple',
    },
    {
      title: '⚔️ The Necromancer/Cavalier Bond',
      body: "Every necromancer is paired with a cavalier: a sword-arm bodyguard who provides the physical protection the necromancer cannot. The bond is consuming and asymmetric: necromancers provide the magic, cavaliers provide the blade and, ultimately, something more than that. The nature of the sacrifice at the centre of the bond is what the series is about. Do not look it up.",
      color: 'red',
    },
    {
      title: "🗣️ Gideon's Voice",
      body: "Gideon Nav narrates book one in a voice full of contemporary slang, dry deadpan humour, and pop culture references dropped into a far-future gothic setting. This is a choice, not an error. It is either immediately funny or an immediate barrier. There is very little middle ground. The entire series works because of this voice. Readers who bounce off the first chapter rarely come back.",
      color: 'amber',
    },
    {
      title: "📖 Harrow's Narration",
      body: "Harrow the Ninth is written in second person: the 'you' is deliberate and structural, not an affectation. On first read, certain events seem impossible, contradictory, or simply absent. This is intentional: the narrator cannot tell you what she cannot see. On re-read after Nona the Ninth, the entire book resolves into clarity. Muir constructed the narration so the same text means different things depending on what the reader knows. The most common response is to reread Harrow immediately after finishing Nona.",
      color: 'blue',
    },
    {
      title: '🏳️‍🌈 Queer at the Centre',
      body: "The central relationship is between two women. This is not subtext and requires no reading between lines. Multiple other major characters are also queer. The series does not treat any of this as remarkable: it is simply the fabric of the world. The romantic arc is as central to the plot as the necromancy, and the two are inseparable.",
      color: 'green',
    },
    {
      title: "🌌 Nona's Shift",
      body: "Nona the Ninth was originally the first half of Alecto the Ninth before the book outgrew its container. It follows a protagonist named Nona, whose identity is the book's central mystery. The register shifts dramatically from the palace horror of book one: grounded, everyday, a found-family of survivors in a specific city. The contrast is intentional. The events of Nona change what Harrow means.",
      color: 'zinc',
    },
  ],
  groups: [
    {
      label: 'The Locked Tomb',
      sublabel: '3 books complete + 1 upcoming + 3 short stories - main series read in order',
      noteType: 'required',
      note: 'One continuous story across four novels, with three short stories interspersed at their recommended reading positions. The novels are mandatory and must be read in order. The short stories are supplementary: skip them freely, but each is best read at the indicated point rather than before Gideon or all at the end.',
      books: [
        {
          title: 'Gideon the Ninth',
          slug: 'gideon-the-ninth',
          status: 'mandatory',
          note: "Gideon Nav, indentured swordswoman of the Ninth House, is conscripted to accompany her necromancer Harrowhark to a haunted palace where the Nine Houses compete to unlock the secret of Lyctorhood. The competitors begin dying. The voice is everything: deadpan, anachronistic, furious, funny.",
          page_count: 448,
          publication_year: 2019,
        },
        {
          title: 'The Mysterious Study of Doctor Sex',
          slug: 'the-mysterious-study-of-doctor-sex',
          status: 'supplementary',
          note: 'A locked-room mystery set in the Sixth House, following young Palamedes Sextus and Camilla Hect at thirteen. A prequel (#0.5) set before Gideon. Skip on a first read: the characters need the weight of Gideon to make this land.',
          page_count: 28,
          publication_year: 2020,
        },
        {
          title: 'Harrow the Ninth',
          slug: 'harrow-the-ninth',
          status: 'mandatory',
          note: "Written in second person: Harrowhark is 'you', drafted into the Emperor's inner circle and fighting an unwinnable war alongside saints she does not trust. Do not skip ahead when the book disorients you. The disorientation is the mechanism, not a flaw. A structurally different experience on re-read after Nona.",
          page_count: 512,
          publication_year: 2020,
        },
        {
          title: 'As Yet Unsent',
          slug: 'as-yet-unsent',
          status: 'supplementary',
          note: "An epistolary short story told through Judith Deuteros's coded report on Blood of Eden activities, exploring her relationship with Coronabeth Tridentarius (#2.5). Originally published in the Harrow the Ninth paperback. Read between Harrow and Nona.",
          page_count: 24,
          publication_year: 2021,
        },
        {
          title: 'Nona the Ninth',
          slug: 'nona-the-ninth',
          status: 'mandatory',
          note: "Follows Nona, a person of uncertain identity living a grounded, everyday life with a found-family of survivors in a city under siege. The register shift from the palace horror of book one is jarring and intentional. Nona's identity is the book's central question. What happens here changes the meaning of Harrow the Ninth in ways that are only apparent after the fact.",
          page_count: 512,
          publication_year: 2022,
        },
        {
          title: 'Alecto the Ninth',
          slug: 'alecto-the-ninth',
          status: 'upcoming',
          note: 'The fourth and final book in the Locked Tomb series. No release date announced as of 2026.',
          page_count: null,
          publication_year: null,
        },
        {
          title: 'The Unwanted Guest',
          slug: 'the-unwanted-guest',
          status: 'supplementary',
          note: 'A short story set in the Locked Tomb universe. Best read after completing the main series.',
          page_count: 15,
          publication_year: 2014,
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Gideon Nav',
      role: 'Cavalier of the Ninth House; POV narrator of book one',
      color: 'amber',
      why_they_work:
        "She is technically in the subordinate role (a cavalier exists to protect her necromancer), but she narrates the entire first book, which means the reader's access to the palace mystery is constrained by what a swordswoman with no necromantic training can see and understand. The voice is not a layer on top of the story. It is the story. There is no version of Gideon the Ninth without it.",
    },
    {
      name: 'Harrowhark Nonagesimus',
      role: 'Necromancer of the Ninth House; POV narrator of book two',
      color: 'purple',
      why_they_work:
        "Seen entirely through Gideon's limited and hostile perspective in book one, which means the reader meets her as an antagonist. Book two hands the narration to her in second person, showing what was happening inside her head during events that looked very different from Gideon's POV. What reads as cruelty in book one becomes something else in book two, and something else again after book three. The same character reads three different ways across three books.",
    },
    {
      name: 'Nona',
      role: 'POV narrator of book three; identity is the central mystery of Nona the Ninth',
      color: 'green',
      why_they_work:
        "Her identity cannot be stated here without spoiling both books 2 and 3. What can be said: she is the most emotionally immediate narrator in the series, her grounded register is in deliberate contrast to the horror and disorientation of books 1 and 2, and what happens to her is what the series has been working toward from the beginning. The found-family she has built is the most human element in the Locked Tomb.",
    },
  ],
  sections: [
    {
      heading: 'What the series is',
      type: 'bullets',
      bullets: [
        'The genre blend is not a gimmick and not metaphorical: the necromancy is literal magic, the space is a literal dying solar system, the gothic horror is actual horror, the queer romance is the central relationship of the plot. All of it is load-bearing.',
        'Each book retroactively rewrites the previous ones. Reading out of order is not viable. Harrow the Ninth is deliberately incomprehensible on a first read and only resolves after Nona.',
        'The magic is atmospheric and internally consistent but not a Sanderson-style rule-system. The necromancy operates by its own logic, but that logic is revealed gradually and incompletely.',
        'Three books published; the concluding volume has no announced release date. Starting now means waiting for Alecto the Ninth with no timeline.',
        'The voice of Gideon the Ninth (contemporary slang, deadpan humour, anachronistic references) continues through the series in various forms. Readers who find it alienating in the first chapter will not find a different version later.',
      ],
    },
    {
      heading: 'Content notes',
      type: 'bullets',
      bullets: [
        'The darkness escalates across the series: gothic horror in book 1 becomes psychological horror in book 2 and civilisational-scale loss in book 3. Body horror is present throughout and increases.',
        'No explicit sexual content. The central romantic relationship is closed door.',
        'Character deaths are significant and not reversed. The series does not protect its cast.',
        'The horror in Nona the Ninth operates through implication and grief rather than direct gore: it is the quietest book in the series and also one of the most emotionally difficult.',
      ],
    },
  ],
  darkness: [
    {
      label: 'Gideon the Ninth',
      level: 3,
      desc: 'Gothic horror and deaths in the palace. Played with dark humour but the violence and stakes are real.',
    },
    {
      label: 'Harrow the Ninth',
      level: 4,
      desc: 'Psychological horror, body horror, and a narrator whose unreliability is itself unsettling. The darkest in tone.',
    },
    {
      label: 'Nona the Ninth',
      level: 3,
      desc: 'War and loss at civilisation scale, grounded register. The horror is in implication rather than image.',
    },
    {
      label: 'Alecto the Ninth',
      level: 4,
      desc: 'Anticipated conclusion: expected to match or exceed the darkness of Harrow based on where the series is heading.',
    },
  ],
  metaDescription:
    'The complete Locked Tomb reading order by Tamsyn Muir - all 4 books, the short fiction, and how to survive Harrow the Ninth.',
  shortName: 'Locked Tomb',
  lastUpdated: '2026-07-01',
  finishedLabel: 'Finished the Locked Tomb?',
  categoryHref: '/fantasy/dark',
  categoryLabel: 'Browse Dark Fantasy',
  related: ['grishaverse', 'first-law', 'asoiaf', 'malazan', 'black-company', 'mistborn'],
};
