export type TropeCategory = "character" | "relationship" | "plot" | "world-magic";

export type PublicTrope = {
  slug: string;
  name: string;
  category: TropeCategory;
  description: string;
  intro?: string;
  /** Up to 7 book slugs that are the definitive examples of this trope */
  bestExamples?: string[];
  /** Slugs of books-like guides relevant to this trope */
  booksLikeGuides?: string[];
  /** Editorial FAQs shown in the visible FAQ section */
  editorialFaqs?: { q: string; a: string }[];
};
