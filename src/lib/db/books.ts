import { supabaseClient } from '../supabaseClient';
import type {
  Book,
  BookInput,
  BookFilters,
  PaginationOptions,
  SortOption,
} from '../types';

type BookQueryResult = {
  data: Book[];
  count: number;
  error: string | null;
};

/**
 * Fetch books with advanced filtering
 */
export async function getBooks(
  filters: BookFilters = {},
  pagination: PaginationOptions = {},
): Promise<BookQueryResult> {
  try {
    const { page = 1, pageSize = 20, sort = 'rating_desc' } = pagination;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabaseClient.from('books').select('*', { count: 'exact' });

    // Text search across title, authors, synopsis
    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,synopsis.ilike.%${filters.search}%`,
      );
    }

    // Array filters (using GIN indexes)
    if (filters.subgenres?.length) {
      query = query.overlaps('subgenres', filters.subgenres);
    }
    if (filters.tropes?.length) {
      query = query.overlaps('tropes', filters.tropes);
    }
    if (filters.tone?.length) {
      query = query.overlaps('tone', filters.tone);
    }
    if (filters.diversity_rep?.length) {
      query = query.overlaps('diversity_rep', filters.diversity_rep);
    }

    // Exact match filters
    if (filters.magic_system) {
      query = query.eq('magic_system', filters.magic_system);
    }
    if (filters.pacing) {
      query = query.eq('pacing', filters.pacing);
    }
    if (filters.heat_level) {
      query = query.eq('heat_level', filters.heat_level);
    }
    if (filters.audience) {
      query = query.eq('audience', filters.audience);
    }

    // Exclusion filters (content warnings)
    if (filters.avoid_explicit) {
      query = query.or('heat_level.is.null,heat_level.neq.Spicy');
    }
    if (filters.avoid_grimdark) {
      query = query.not('subgenres', 'ov', '{Grimdark}');
    }

    // Range filters
    if (filters.min_rating !== undefined) {
      query = query.gte('avg_rating', filters.min_rating);
    }
    if (filters.max_rating !== undefined) {
      query = query.lte('avg_rating', filters.max_rating);
    }
    if (filters.min_year !== undefined) {
      query = query.gte('publication_year', filters.min_year);
    }
    if (filters.max_year !== undefined) {
      query = query.lte('publication_year', filters.max_year);
    }
    if (filters.min_pages !== undefined) {
      query = query.gte('page_count', filters.min_pages);
    }
    if (filters.max_pages !== undefined) {
      query = query.lte('page_count', filters.max_pages);
    }

    // Sorting
    query = applySorting(query, sort);

    // Pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    return {
      data: data || [],
      count: count || 0,
      error: error?.message || null,
    };
  } catch (err) {
    return {
      data: [],
      count: 0,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Get a single book by slug
 */
export async function getBookBySlug(slug: string): Promise<Book | null> {
  const { data, error } = await supabaseClient
    .from('books')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

/**
 * Get a single book by ID
 */
export async function getBookById(id: string): Promise<Book | null> {
  const { data, error } = await supabaseClient
    .from('books')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data;
}

/**
 * Create a new book
 */
export async function createBook(book: BookInput): Promise<Book | null> {
  const { data, error } = await supabaseClient
    .from('books')
    .insert(book)
    .select()
    .single();

  if (error || !data) {
    console.error('Error creating book:', error);
    return null;
  }
  return data;
}

/**
 * Update an existing book
 */
export async function updateBook(
  id: string,
  updates: Partial<BookInput>,
): Promise<Book | null> {
  const { data, error } = await supabaseClient
    .from('books')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error('Error updating book:', error);
    return null;
  }
  return data;
}

/**
 * Delete a book
 */
export async function deleteBook(id: string): Promise<boolean> {
  const { error } = await supabaseClient.from('books').delete().eq('id', id);

  if (error) {
    console.error('Error deleting book:', error);
    return false;
  }
  return true;
}

/**
 * Get distinct values for filter options
 */
export async function getFilterOptions(): Promise<{
  subgenres: string[];
  tropes: string[];
  tones: string[];
  diversityReps: string[];
  magicSystems: string[];
  pacings: string[];
  heatLevels: string[];
  audiences: string[];
}> {
  const { data } = await supabaseClient
    .from('books')
    .select(
      'subgenres, tropes, tone, diversity_rep, magic_system, pacing, heat_level, audience',
    );

  const subgenres = new Set<string>();
  const tropes = new Set<string>();
  const tones = new Set<string>();
  const diversityReps = new Set<string>();
  const magicSystems = new Set<string>();
  const pacings = new Set<string>();
  const heatLevels = new Set<string>();
  const audiences = new Set<string>();

  data?.forEach((book) => {
    book.subgenres?.forEach((s: string) => subgenres.add(s));
    book.tropes?.forEach((t: string) => tropes.add(t));
    book.tone?.forEach((t: string) => tones.add(t));
    book.diversity_rep?.forEach((d: string) => diversityReps.add(d));
    if (book.magic_system) magicSystems.add(book.magic_system);
    if (book.pacing) pacings.add(book.pacing);
    if (book.heat_level) heatLevels.add(book.heat_level);
    if (book.audience) audiences.add(book.audience);
  });

  return {
    subgenres: Array.from(subgenres).sort(),
    tropes: Array.from(tropes).sort(),
    tones: Array.from(tones).sort(),
    diversityReps: Array.from(diversityReps).sort(),
    magicSystems: Array.from(magicSystems).sort(),
    pacings: Array.from(pacings).sort(),
    heatLevels: Array.from(heatLevels).sort(),
    audiences: Array.from(audiences).sort(),
  };
}

/**
 * Convert an author name to a URL slug
 */
export function authorToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Get all authors aggregated from the books table
 */
export async function getAllAuthors(): Promise<{
  name: string;
  slug: string;
  bookCount: number;
  topGenres: string[];
  avgRating: number | null;
}[]> {
  const { data } = await supabaseClient
    .from('books')
    .select('authors, subgenres, avg_rating');

  const authorMap = new Map<string, { bookCount: number; genres: Map<string, number>; ratings: number[] }>();

  data?.forEach((book) => {
    book.authors?.forEach((author: string) => {
      if (!author) return;
      if (!authorMap.has(author)) {
        authorMap.set(author, { bookCount: 0, genres: new Map(), ratings: [] });
      }
      const entry = authorMap.get(author)!;
      entry.bookCount++;
      if (book.avg_rating != null) entry.ratings.push(book.avg_rating);
      book.subgenres?.forEach((g: string) => {
        entry.genres.set(g, (entry.genres.get(g) || 0) + 1);
      });
    });
  });

  return Array.from(authorMap.entries())
    .map(([name, entry]) => ({
      name,
      slug: authorToSlug(name),
      bookCount: entry.bookCount,
      topGenres: Array.from(entry.genres.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([g]) => g),
      avgRating:
        entry.ratings.length > 0
          ? Math.round((entry.ratings.reduce((a, b) => a + b, 0) / entry.ratings.length) * 10) / 10
          : null,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all books by a specific author name
 */
export async function getBooksByAuthor(authorName: string): Promise<Book[]> {
  const { data } = await supabaseClient
    .from('books')
    .select('*')
    .contains('authors', [authorName])
    .order('publication_year', { ascending: true, nullsLast: true });

  return data || [];
}

/**
 * Helper to apply sorting
 */
function applySorting(query: any, sort: SortOption) {
  switch (sort) {
    case 'title_asc':
      return query.order('title', { ascending: true });
    case 'title_desc':
      return query.order('title', { ascending: false });
    case 'rating_desc':
      return query.order('avg_rating', { ascending: false, nullsLast: true });
    case 'rating_asc':
      return query.order('avg_rating', { ascending: true, nullsLast: true });
    case 'year_desc':
      return query.order('publication_year', {
        ascending: false,
        nullsLast: true,
      });
    case 'year_asc':
      return query.order('publication_year', {
        ascending: true,
        nullsLast: true,
      });
    case 'pages_desc':
      return query.order('page_count', { ascending: false, nullsLast: true });
    case 'pages_asc':
      return query.order('page_count', { ascending: true, nullsLast: true });
    case 'newest':
      return query.order('created_at', { ascending: false });
    case 'oldest':
      return query.order('created_at', { ascending: true });
    default:
      return query.order('avg_rating', { ascending: false, nullsLast: true });
  }
}
