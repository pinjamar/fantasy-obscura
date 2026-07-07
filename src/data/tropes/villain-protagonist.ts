import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "villain-protagonist", name: "Villain Protagonist", category: "character",
  description: "The main character begins as or becomes the antagonist.",
  intro: "The villain protagonist is fiction's hardest technical challenge: sustaining readerly investment in someone whose goals are actively wrong. Fantasy handles it best when the protagonist's internal logic is airtight. They aren't evil because the story needed a dark protagonist; they have a coherent framework that makes sense from inside their head and horrifies from outside it.\n\n*Prince of Thorns* commits to this from the first page: Jorg Ancrath is already ruthless when the book opens, and Mark Lawrence never softens his logic or apologizes for it on the reader's behalf.\n\n*The Poppy War* takes the opposite route. Rin begins sympathetic, and the reader is present for every step of her transformation into a war criminal, which means they're also present for every step where a different choice was possible. The book doesn't forgive her; it just refuses to look away.",
  bestExamples: [
    "prince-of-thorns",
    "the-poppy-war",
    "wicked-the-life-and-times-of-the-wicked-witch-of-the-west-the-wicked-years-1",
    "empire-of-silence",
    "vicious",
    "nimona",
    "the-book-of-azrael",
  ],
  booksLikeGuides: [
    "prince-of-thorns",
    "the-poppy-war",
    "empire-of-silence",
    "the-traitor-baru-cormorant",
    "red-country",
    "a-little-hatred",
    "the-black-company",
  ],
  editorialFaqs: [
    {
      q: "What's the difference between a villain protagonist and an anti-hero?",
      a: "An anti-hero still wants something the reader can root for, even if the methods are violent or dishonest. A villain protagonist's actual goal is the story's central wrong. Hadrian Marlowe in Empire of Silence narrates his own life while openly admitting he becomes a mass murderer, and the book never lets that framing soften. The test is whether the ending's harm is something the protagonist chose and achieved, not something they were tricked into or stopped short of.",
    },
    {
      q: "Does a villain protagonist have to lose or be punished by the end?",
      a: "No, and forcing a punishment on them is usually the weaker choice. A story that reflexively kills or redeems its villain protagonist just to reassure the reader is less interesting than one willing to let the win stand and make the reader sit with it. How to Become the Dark Lord and Die Trying takes the opposite approach for comic effect: it treats the win as the joke rather than the tragedy, which is its own valid answer to the question.",
    },
  ],
};

export default trope;
