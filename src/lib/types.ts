// Database Book model matching Supabase schema
export type Book = {
  id: string;
  title: string;
  slug: string | null;
  authors: string[] | null;
  cover_url: string | null;
  isbn: string | null;
  synopsis: string | null;
  page_count: number | null;
  publication_year: number | null;
  avg_rating: number | null;
  audience: string | null;
  subgenres: string[] | null;
  tropes: string[] | null;
  magic_system: string | null;
  tone: string[] | null;
  pacing: string | null;
  heat_level: string | null;
  diversity_rep: string[] | null;
  series: string | null;
  series_number: number | null;
  darkness_level: number | null;
  created_at: string;
  updated_at: string;
};

// For creating/updating books
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
  audience?: string | null;
  subgenres?: string[] | null;
  tropes?: string[] | null;
  magic_system?: string | null;
  tone?: string[] | null;
  pacing?: string | null;
  heat_level?: string | null;
  diversity_rep?: string[] | null;
  series?: string | null;
  series_number?: number | null;
  darkness_level?: number | null;
};

export type BookSearchResult = BookInput & {
  source?: 'openlibrary' | 'googlebooks' | 'harvard' | 'bigbook' | 'gutendex' | 'manual';
  source_id?: string | null;
};

// Filter types
export type BookFilters = {
  search?: string;
  authors?: string[];
  subgenres?: string[];
  tropes?: string[];
  magic_system?: string;
  tone?: string[];
  pacing?: string;
  heat_level?: string;
  audience?: string;
  diversity_rep?: string[];
  min_rating?: number;
  max_rating?: number;
  min_year?: number;
  max_year?: number;
  min_pages?: number;
  max_pages?: number;
  avoid_explicit?: boolean;
  avoid_grimdark?: boolean;
};

export type SortOption =
  | 'title_asc'
  | 'title_desc'
  | 'rating_desc'
  | 'rating_asc'
  | 'year_desc'
  | 'year_asc'
  | 'pages_desc'
  | 'pages_asc'
  | 'newest'
  | 'oldest';

export type PaginationOptions = {
  page?: number;
  pageSize?: number;
  sort?: SortOption;
};
