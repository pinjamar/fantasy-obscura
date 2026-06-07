import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "redemption-arc", name: "Redemption Arc", category: "relationship",
  description: "A character seeks redemption for past sins.",
  intro: "Redemption arcs in fantasy are slow because they need to be — the thing being redeemed from has to be real enough that its weight is felt throughout the process, not just acknowledged and set aside. A three-book arc that earns redemption has hundreds of pages of the character behaving differently in situations that cost them something, not a single noble act that cancels out years of damage. Dalinar Kholin in The Stormlight Archive is the genre's most thorough treatment: a warlord who did something so terrible it took Oathbringer's entire flashback structure to deliver, rebuilding across multiple books without the narrative ever suggesting the debt is simply forgiven. The important thing is that the character never gets to decide they're redeemed; only the people they harmed can offer that. Readers who love redemption arcs are looking for the proof that change is possible — not inevitable, not guaranteed, but actually possible.",
  bestExamples: ["the-way-of-kings", "the-blade-itself", "six-of-crows", "the-cruel-prince", "a-court-of-mist-and-fury", "a-little-hatred", "red-rising"],
  booksLikeGuides: ["the-blade-itself", "six-of-crows", "the-cruel-prince", "red-rising"],
  editorialFaqs: [
    { q: "Does a redemption arc require the character to succeed?", a: "No — and the best ones often don't. The arc is about the attempt, not the outcome. Logen Ninefingers across The First Law trilogy is explicitly a test of whether a person can escape what they are. Sanderson's Dalinar (The Stormlight Archive) is the counterexample: one of fantasy's few arcs where the redemption is fully earned and unambiguous. Both are correct; the question is what the story is actually about." },
    { q: "What is the most celebrated redemption arc in fantasy?", a: "Dalinar Kholin in The Stormlight Archive is the most frequently cited. His arc starts with Oathbringer's brutal flashback revelations and pays off across Words of Radiance and beyond — it works because Sanderson makes the reader genuinely uncertain whether redemption is possible before delivering it. Cardan in The Cruel Prince is the most popular romantasy example, though it operates on a much shorter timescale." },
    { q: "Can a villain get a convincing redemption arc in a single book?", a: "It's very hard to do well in isolation — the change needs to feel earned, not convenient, which usually requires substantial page time for the before and after. Cardan in The Cruel Prince manages it across three books. In a single volume, the more common approach is a partial redemption: the character makes one genuinely costly choice that signals change without resolving everything. Full single-book villain redemptions tend to feel rushed unless the book is very long." },
  ],
};

export default trope;
