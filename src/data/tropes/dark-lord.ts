import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "dark-lord", name: "Dark Lord", category: "character",
  description: "A powerful evil ruler threatening the world.",
  intro: "The Dark Lord works in fantasy because the genre can make evil feel like it has weight: architectural, historical, something that has been building for centuries before the protagonist was born.\n\n*The Fellowship of the Ring* gives fantasy its purest version of the type. Sauron is barely a character and completely terrifying precisely because he's a presence rather than a person, a will that bends the fabric of the world toward its end.\n\n*Mistborn* does the opposite. The Lord Ruler has held power for a thousand years, and the trilogy spends its length showing that his tyranny has an actual history, a logic, and in the end something close to a reason. One Dark Lord is unknowable by design. The other is legible, and the legibility turns out to be its own kind of horror.",
  bestExamples: [
    "the-fellowship-of-the-ring",
    "the-final-empire",
    "the-eye-of-the-world",
    "harry-potter-philosophers-stone",
    "eragon",
    "the-black-company",
    "the-hunger-games",
  ],
  booksLikeGuides: [
    "the-fellowship-of-the-ring",
    "the-final-empire",
    "the-eye-of-the-world",
    "harry-potter-philosophers-stone",
    "the-hunger-games",
    "eragon",
    "the-black-company",
  ],
  editorialFaqs: [
    {
      q: "Does a Dark Lord need to be evil for evil's sake?",
      a: "No, and the ones that are tend to be the least interesting. Sauron works because the story never asks you to understand him: he is simply what he is, a fixed cosmic threat rather than a personality. The Lord Ruler in Mistborn works for the opposite reason. A thousand years of rule gives him an actual history, and the horror is realizing that his tyranny made a kind of sense at the time he built it.",
    },
    {
      q: "What's the difference between a Dark Lord and a villain protagonist?",
      a: "A Dark Lord is the thing the story is organized against; the protagonist's whole arc points at defeating or escaping them. A villain protagonist is the person the story follows and asks you to understand from the inside. Voldemort is a Dark Lord throughout Harry Potter. Rin in The Poppy War starts the series as neither and ends it closer to a Dark Lord than a villain protagonist, which is part of why that ending unsettles readers.",
    },
  ],
};

export default trope;
