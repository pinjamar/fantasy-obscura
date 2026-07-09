import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "secret-royalty", name: "Secret Royalty", category: "character",
  description: "A protagonist unaware of their royal lineage.",
  intro: "Secret royalty stories work because the reveal is a trap, not a gift. The crown comes with enemies the protagonist didn't know they had, obligations they didn't consent to, and the immediate problem of whether the people around them were friends or positions.\n\n*The Once and Future King* plays it as destiny fulfilled. Wart pulls the sword from the stone almost by accident, and the discovery of who he really is arrives as validation: proof that what he already was mattered before anyone knew to look for it.\n\n*The Black Prism* plays it as ambush. Kip learns his father is the most powerful and feared man in the world, and the discovery doesn't hand him belonging. It hands him a target on his back and a family that was never going to make room for him easily. One book treats the reveal as arriving home. The other treats it as being drafted.",
  bestExamples: [
    "the-once-and-future-king",
    "strange-the-dreamer",
    "the-false-prince",
    "the-black-prism",
    "six-crimson-cranes",
    "nine-princes-in-amber",
    "the-hedge-knight",
  ],
  booksLikeGuides: ["nine-princes-in-amber"],
  editorialFaqs: [
    {
      q: "Does the secret royal have to actually want the throne once they learn about it?",
      a: "No, and reluctance is common. Kip in The Black Prism spends most of the book trying to survive his new circumstances rather than embrace them. Wart in The Once and Future King barely has time to want anything before the sword is out of the stone and the decision is made for him. The trope tracks the hidden bloodline, not the character's enthusiasm about claiming it.",
    },
    {
      q: "What's the difference between secret royalty and a lost heir?",
      a: "They overlap constantly, but secret royalty is specifically about the protagonist not knowing their own bloodline. A lost heir can know exactly who they are and still be denied recognition by everyone else. Corwin in Nine Princes in Amber is both at once: he starts the book with amnesia, secret even from himself, and spends the rest of it reclaiming a throne other people already know is his.",
    },
  ],
};

export default trope;
