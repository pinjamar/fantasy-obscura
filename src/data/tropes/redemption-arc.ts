import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "redemption-arc", name: "Redemption Arc", category: "relationship",
  description: "A character seeks redemption for past sins.",
  intro: "Redemption arcs in fantasy are slow because they need to be. The thing being redeemed from has to be real enough that its weight is felt throughout the process, not just acknowledged and set aside.\n\nDalinar Kholin in *The Way of Kings* gets the genre's most thorough treatment: a warlord whose atrocities took Oathbringer's entire flashback structure to fully deliver, rebuilding across multiple books without the narrative ever suggesting the debt is simply forgiven. *The Blade Itself* refuses that certainty. Logen Ninefingers spends the trilogy testing whether a person can actually escape what they are, and Joe Abercrombie never fully answers it either way.\n\nThe important thing both versions share is that the character never gets to decide they're redeemed. Only the people they harmed can offer that, which is what keeps a three-book arc from collapsing into one noble act that cancels out years of damage.",
  bestExamples: ["the-way-of-kings", "the-blade-itself", "six-of-crows", "the-cruel-prince", "a-court-of-mist-and-fury", "a-little-hatred", "red-rising"],
  booksLikeGuides: ["the-blade-itself", "six-of-crows", "the-cruel-prince", "red-rising", "the-way-of-kings", "a-little-hatred", "homeland"],
  editorialFaqs: [
    { q: "Does a redemption arc require the character to succeed?", a: "No. The best ones often don't. The arc is about the attempt, not the outcome. Logen Ninefingers across The First Law trilogy is explicitly a test of whether a person can escape what they are. Sanderson's Dalinar (The Stormlight Archive) is the counterexample: one of fantasy's few arcs where the redemption is fully earned and unambiguous. Both are correct; the question is what the story is actually about." },
    { q: "Can a villain get a convincing redemption arc in a single book?", a: "It's very hard to do well in isolation. The change needs to feel earned, not convenient, which usually requires substantial page time for the before and after. Cardan in The Cruel Prince manages it across three books. In a single volume, the more common approach is a partial redemption: the character makes one genuinely costly choice that signals change without resolving everything. Full single-book villain redemptions tend to feel rushed unless the book is very long." },
  ],
};

export default trope;
