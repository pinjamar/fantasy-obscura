import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "immortal-character", name: "Immortal Character", category: "character",
  description: "A character who cannot die naturally.",
  intro: "Immortality works in fantasy as a sustained thought experiment about what accumulated loss actually does to a person. After enough centuries, everyone the immortal loved is gone, every home they had is rubble, and they've had to develop mechanisms for surviving grief that no human lifespan ever required.\n\n*The Invisible Life of Addie LaRue* compresses this into an eighteenth-century woman who cannot die but also cannot be remembered: every person she meets forgets her the moment she's out of sight, and the loneliness that produces feels almost medical in its specificity.\n\n*Circe* takes the opposite approach. Nobody forgets Circe. She's exiled to an island precisely because the other gods know exactly who she is and want her gone. Addie's curse is disappearing from the world; Circe's punishment is being permanently, inescapably seen.",
  bestExamples: [
    "the-invisible-life-of-addie-larue",
    "circe",
    "interview-with-the-vampire",
    "the-sandman-vol-1-preludes-nocturnes",
    "the-golem-and-the-jinni",
    "elantris",
    "mort",
  ],
  booksLikeGuides: ["circe", "elantris", "nine-princes-in-amber", "a-touch-of-darkness", "gideon-the-ninth"],
  editorialFaqs: [
    {
      q: "Does an immortal character need to be ancient for this trope to apply?",
      a: "No. What matters is the structural fact of not aging or dying naturally, not a specific number of centuries lived. Addie LaRue is roughly three hundred years old by the end of her book; Mort's Death has existed since before humans did. Both function the same way in their stories: as a fixed point measuring how much the mortal world around them changes while they don't.",
    },
    {
      q: "What's the difference between an immortal character and a cursed character?",
      a: "They overlap constantly but aren't the same claim. A cursed character is defined by a specific constraint that reshapes their life; immortality is one possible curse among many, not the trope itself. Circe's godhood isn't a curse, it's her nature, and her story is about what she chooses to do with an unbounded lifespan rather than how she suffers under one. Addie LaRue is both: immortal by the terms of her bargain and cursed by the specific price attached to it.",
    },
  ],
};

export default trope;
