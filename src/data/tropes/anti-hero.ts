import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "anti-hero", name: "Anti-Hero", category: "character",
  description: "A morally complex or flawed main character.",
  intro: "Anti-heroes work in fantasy better than almost any other genre because the genre actually follows the consequences. A morally compromised protagonist in a thriller moves the plot; in fantasy, they have to live inside the world they're damaging for hundreds of pages, and the damage accumulates. Joe Abercrombie spent three books letting Logen Ninefingers convince himself he had no choice, then spent three more proving he was wrong. Fantasy's invented worlds strip away the institutions that absorb the fallout from bad choices — no justice system, no social contract that holds — so when an anti-hero breaks something, it stays broken. What readers who love this trope are really after is the relief of watching someone act without the limits they impose on themselves, and the uncomfortable question of what it means that they enjoyed every page of it.",
  bestExamples: ["the-blade-itself", "the-lies-of-locke-lamora", "nevernight", "red-rising", "best-served-cold", "the-poppy-war", "prince-of-thorns"],
  booksLikeGuides: ["the-blade-itself", "the-lies-of-locke-lamora", "red-rising", "nevernight"],
  editorialFaqs: [
    { q: "What separates an anti-hero from a villain protagonist?", a: "Anti-heroes are protagonists readers root for despite their methods — they have goals we're broadly aligned with, even if their means are reprehensible. Villain protagonists make us root for someone whose goals themselves are wrong or destructive. The distinction is the reader's alignment: an anti-hero is someone you follow; a villain protagonist is someone you watch with uncomfortable fascination." },
    { q: "Which anti-hero fantasy books are best for grimdark newcomers?", a: "The Blade Itself by Joe Abercrombie is the standard recommendation — Logen Ninefingers and Glokta are two of the most compelling anti-heroes in modern fantasy, and the first book delivers the genre's core satisfaction without the bleakness of later entries. The Lies of Locke Lamora is a softer entry point: the protagonist is a con artist rather than a killer, and the tone is warmer." },
  ],
};

export default trope;
