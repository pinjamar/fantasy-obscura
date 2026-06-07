import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "love-triangle", name: "Love Triangle", category: "relationship",
  description: "Three characters entangled romantically.",
  intro: "The love triangle earns its reputation as a tired trope when it functions as a poll — readers voting for their preferred option while the protagonist wavers. It earns genuine power when both options represent incompatible versions of who the protagonist can become, and choosing one closes the other for good. Fantasy is particularly suited to this because the romantic choice is often structurally tied to political allegiance or magical destiny — Alina Starkov's choice in Shadow and Bone is not just personal but geopolitical, and Leigh Bardugo makes sure the reader feels what each option costs. The triangle becomes compelling when it stops being about preference and starts being about identity: which love demands the protagonist to be the version of themselves they can live with. Readers drawn to love triangles are often drawn to the specific pain of the road not taken — the option that made complete sense and still couldn't be chosen.",
  bestExamples: ["shadow-and-bone", "a-court-of-mist-and-fury", "an-ember-in-the-ashes", "throne-of-glass", "fourth-wing", "from-blood-and-ash", "the-cruel-prince"],
  booksLikeGuides: ["shadow-and-bone", "an-ember-in-the-ashes", "throne-of-glass", "from-blood-and-ash"],
  editorialFaqs: [
    { q: "Do love triangles always get resolved by the end of a series?", a: "In romantasy and YA fantasy, almost always — leaving two options genuinely open tends to frustrate readers enough that authors close it. The question is usually when and how. Shadow and Bone takes three books to fully resolve its triangle, and the resolution divided the fandom sharply. Throne of Glass adds and removes options across six books before settling." },
    { q: "Which fantasy love triangle has the most reader debate?", a: "The Darkling vs Mal debate in Shadow and Bone is the most sustained fandom argument in recent fantasy — years after the series ended, readers still disagree whether Leigh Bardugo made the right narrative choice. Team Darkling argued his arc deserved a different resolution; Team Mal argued the point was always there. An Ember in the Ashes runs a close second, with the Elias/Laia/Keenan dynamic generating genuine uncertainty across four books." },
    { q: "Are there love triangles where the protagonist doesn't end up with either option?", a: "Rare in fantasy, but they exist. Some series resolve the triangle by removing one option through death or betrayal rather than a clean romantic choice — which tends to read as the author dodging the question. The more interesting version is when the protagonist's relationship with herself changes enough that neither original option fits anymore. That's harder to execute but avoids the triangle feeling like a simple either/or." },
  ],
};

export default trope;
