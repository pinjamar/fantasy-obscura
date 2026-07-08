import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "chosen-one", name: "Chosen One", category: "character",
  description: "A protagonist marked by destiny or prophecy.",
  intro: "The Chosen One is fantasy's most contested premise and its most durable one. It works because the genre can hold two contradictory things at once: the sincere belief that some people are called to something larger than themselves, and the relentless questioning of what 'called' actually means.\n\n*Mistborn* asks whether prophecy is information or manipulation: whether a hero chosen by an ancient text is being guided or used.\n\n*A Deadly Education* does something different, putting the darkest prophesied sorceress alive in a position where she has to actively fight the narrative that wants her to be a monster. Both books use the same premise to ask opposite questions: one about whether destiny can be trusted, the other about whether it can be refused.",
  bestExamples: ["the-name-of-the-wind", "the-final-empire", "the-way-of-kings", "a-deadly-education", "the-eye-of-the-world", "shadow-and-bone", "red-rising"],
  booksLikeGuides: ["the-name-of-the-wind", "the-final-empire", "the-way-of-kings", "shadow-and-bone", "a-deadly-education", "red-rising", "harry-potter-philosophers-stone"],
  editorialFaqs: [
    { q: "Is the Chosen One trope overused in fantasy?", a: "It's everywhere, but overuse is a symptom, not a flaw. Chosen One stories fail when destiny substitutes for character development — the protagonist is special because the plot says so. They succeed when the protagonist earns the role through failure and choice, or when the story actively interrogates whether 'chosen' means anything at all. A Deadly Education is the most incisive recent deconstruction; Mistborn probably the most satisfying fulfilment." },
    { q: "What's the best Chosen One fantasy for readers who are tired of the trope?", a: "A Deadly Education by Naomi Novik is the most anti-Chosen-One Chosen One story in modern fantasy — the protagonist is supposed to be the darkest sorceress alive and refuses the heroic narrative at every turn. Brandon Sanderson's Mistborn trilogy treats prophecy as a puzzle to be solved rather than a destiny to be embraced." },
  ],
};

export default trope;
