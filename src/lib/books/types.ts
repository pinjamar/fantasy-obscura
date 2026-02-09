export type BookInput = {
  title: string;
  slug?: string | null;
  authors?: string[] | null;
  cover_url?: string | null;
  isbn?: string | null;
  synopsis?: string | null;
  page_count?: number | null;
  publication_year?: number | null;
  avg_rating?: number | null;
  subgenres?: string[] | null;
  tropes?: string[] | null;
  magic_system?: string | null;
  tone?: string[] | null;
  pacing?: string | null;
  heat_level?: string | null;
  diversity_rep?: string[] | null;
};

export type BookSearchResult = BookInput & {
  source?: 'openlibrary' | 'googlebooks' | 'harvard' | 'bigbook' | 'manual';
  source_id?: string | null;
};
