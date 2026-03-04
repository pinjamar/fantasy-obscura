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
  audiobook_available: boolean | null;
  audiobook_narrator: string | null;
  audiobook_narrator_rating: 'excellent' | 'good' | 'mixed' | 'avoid' | null;
  audiobook_hours: number | null;
  audiobook_audible_url: string | null;
  unique_angle: string | null;
  ideal_reader: string | null;
  reading_experience: string | null;
  accessibility: string | null;
  awards: string[] | null;
  stakes: string | null;
  series_status: string | null;
  pov_style: string | null;
  pov_count: string | null;
  protagonist_gender: string | null;
  content_warnings: string[] | null;
  creatures: string[] | null;
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
  audiobook_available?: boolean | null;
  audiobook_narrator?: string | null;
  audiobook_narrator_rating?: 'excellent' | 'good' | 'mixed' | 'avoid' | null;
  audiobook_hours?: number | null;
  audiobook_audible_url?: string | null;
  unique_angle?: string | null;
  ideal_reader?: string | null;
  reading_experience?: string | null;
  accessibility?: string | null;
  awards?: string[] | null;
  stakes?: string | null;
  series_status?: string | null;
  pov_style?: string | null;
  pov_count?: string | null;
  protagonist_gender?: string | null;
  content_warnings?: string[] | null;
  creatures?: string[] | null;
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
  exclude_warnings?: string[];
  has_audiobook?: boolean;
  accessibility?: string;
  awards?: string[];
  stakes?: string;
  series_status?: string;
  pov_style?: string;
  pov_count?: string;
  protagonist_gender?: string;
  publication_era?: string;
  creatures?: string[];
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
