import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "prophecy-child", name: "Prophecy Child", category: "character",
  description: "A character born into or shaped by prophecy, destined for a role they didn't choose.",
  intro: "The prophecy child trope is about the violence of expectation: the way being defined as what you're for prevents you from becoming who you are. The character hasn't done anything yet. The weight on them is entirely about what someone else decided they would do, often before they were born.\n\n*The Eye of the World* treats the prophecy as real and external. Rand al'Thor is the Dragon Reborn whether he likes it or not, and the books spend thousands of pages on the process of surviving becoming a symbol while remaining a person.\n\n*Dune* treats the prophecy as manufactured. The Bene Gesserit seeded the Kwisatz Haderach legend across a thousand cultures for a thousand years as a tool, and Paul's destiny is partly real power and partly a myth other people built so they'd have somewhere to point him. One book asks what it costs to fulfill a true prophecy. The other asks what it means when the prophecy was never fully true to begin with.",
  bestExamples: [
    "the-eye-of-the-world",
    "dune",
    "keeper-of-the-lost-cities-1",
    "the-bird-and-the-sword",
    "the-dark-is-rising",
    "from-blood-and-ash",
    "skulduggery-pleasant",
  ],
  booksLikeGuides: ["the-eye-of-the-world", "dune", "from-blood-and-ash"],
  editorialFaqs: [
    {
      q: "Does the prophecy in a prophecy child story have to come true exactly as stated?",
      a: "No, and the best ones deliberately complicate it. Dune spends its length showing that Paul's prophecy is a political tool as much as a genuine destiny, and fulfilling it is closer to a trap than a triumph. The Eye of the World plays its prophecy straighter, but even there the meaning of the words shifts as the series goes on. A prophecy that resolves exactly as first quoted, with no reinterpretation along the way, is usually a sign the story isn't taking the trope seriously.",
    },
    {
      q: "What's the difference between a prophecy child and a Chosen One?",
      a: "Prophecy Child is specifically about being marked before birth or in infancy, by someone else's words, before the character has done anything to earn or disprove them. Chosen One is broader and can happen at any age, through any mechanism (an artifact, a bloodline discovered later, an act of destiny mid-story). Rand al'Thor is both: prophesied as the Dragon Reborn before he was old enough to understand what that meant, and then also functionally a Chosen One once the story catches up to him.",
    },
  ],
};

export default trope;
