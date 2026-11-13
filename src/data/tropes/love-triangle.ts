import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "love-triangle", name: "Love Triangle", category: "relationship",
  description: "Three characters entangled romantically.",
  intro: "The love triangle earns its reputation as a tired trope when it functions as a poll, with readers voting for their preferred option while the protagonist wavers. It earns genuine power when both options represent incompatible versions of who the protagonist can become, and choosing one closes the other for good.\n\nAlina's choice in *Shadow and Bone* is structurally tied to magical destiny and geopolitics, not just preference, and Leigh Bardugo makes sure the reader feels what each option costs the wider world, not just Alina. *A Court of Mist and Fury* ties the choice to something more interior: Feyre isn't choosing between two men so much as between two versions of safety, and which one she can actually live inside without shrinking.\n\nThe triangle stops being a tired device once it stops being about preference and starts being about identity. Which love demands the protagonist become a version of themselves they can live with is the real question underneath the obvious one.",
  bestExamples: ["shadow-and-bone", "a-court-of-mist-and-fury", "an-ember-in-the-ashes", "throne-of-glass", "fourth-wing", "from-blood-and-ash", "the-cruel-prince"],
  booksLikeGuides: ["shadow-and-bone", "an-ember-in-the-ashes", "throne-of-glass", "from-blood-and-ash", "fourth-wing", "the-cruel-prince", "the-hunger-games"],
  editorialFaqs: [
    { q: "Which fantasy love triangle has the most reader debate?", a: "The Darkling vs Mal debate in Shadow and Bone is the most sustained fandom argument in recent fantasy. Years after the series ended, readers still disagree whether Leigh Bardugo made the right narrative choice. Team Darkling argued his arc deserved a different resolution; Team Mal argued the point was always there. An Ember in the Ashes runs a close second, with the Elias/Laia/Keenan dynamic generating genuine uncertainty across four books." },
    { q: "Are there love triangles where the protagonist doesn't end up with either option?", a: "Rare in fantasy, but they exist. Some series resolve the triangle by removing one option through death or betrayal rather than a clean romantic choice. That tends to read as the author dodging the question. The more interesting version is when the protagonist's relationship with herself changes enough that neither original option fits anymore. That's harder to execute but avoids the triangle feeling like a simple either/or." },
  ],
};

export default trope;
