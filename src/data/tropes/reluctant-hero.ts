import type { PublicTrope } from '../trope-types';

const trope: PublicTrope = {
  slug: "reluctant-hero", name: "Reluctant Hero", category: "character",
  description: "A hero who does not initially seek their role.",
  intro: "The reluctant hero works because the alternative, someone who eagerly volunteers to save the world, is harder to believe. Fantasy earns its reluctance through specificity: the protagonist has a home, relationships, a life that is small and real and worth protecting, and the call to action asks them to risk all of it.\n\n*The Fellowship of the Ring* takes the slow route. Frodo doesn't want the ring, doesn't want the journey, and spends the whole book being dragged forward by circumstance and loyalty rather than deciding all at once that he's the hero.\n\n*The Hunger Games* takes the fast one. Katniss doesn't get time to be dragged. She volunteers in the space of a single scene, and the reluctance doesn't disappear afterward, it just stops being a choice she gets to make slowly. Frodo's heroism arrives late. Katniss's arrives instantly and then has to be sustained for the rest of the book.",
  bestExamples: [
    "the-fellowship-of-the-ring",
    "harry-potter-philosophers-stone",
    "dungeon-crawler-carl",
    "project-hail-mary",
    "the-hunger-games",
    "the-crown-conspiracy",
    "a-deadly-education",
  ],
  booksLikeGuides: [
    "the-fellowship-of-the-ring",
    "harry-potter-philosophers-stone",
    "dungeon-crawler-carl",
    "project-hail-mary",
    "the-hunger-games",
    "a-deadly-education",
  ],
  editorialFaqs: [
    {
      q: "Does a reluctant hero have to stay reluctant the whole story?",
      a: "No, and most don't. The trope tracks how the hero enters the story, not how they end it. Frodo spends most of The Fellowship of the Ring being pulled along and gradually starts making his own choices by the end. Katniss in The Hunger Games volunteers instantly but stays reluctant about almost everything that follows. Reluctance at the start is the requirement. Staying reluctant forever usually just reads as passive.",
    },
    {
      q: "What's the difference between a reluctant hero and an outcast hero?",
      a: "An outcast hero has already been rejected by their world before the story starts; the exclusion is the starting condition. A reluctant hero is usually accepted by their world just fine and has to be talked, forced, or circumstanced into leaving it. Carl in Dungeon Crawler Carl isn't an outcast: he had an ordinary life before the Syndicate ended it. He's reluctant because the life he had was worth keeping, not because it never wanted him.",
    },
  ],
};

export default trope;
