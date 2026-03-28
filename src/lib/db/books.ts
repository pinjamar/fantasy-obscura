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
    if (filters.creatures?.length) {
      query = query.overlaps('creatures', filters.creatures);
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

    // Audiobook filter
    if (filters.has_audiobook) {
      query = query.eq('audiobook_available', true);
    }

    // New descriptor filters
    if (filters.accessibility) {
      query = query.eq('accessibility', filters.accessibility);
    }
    if (filters.awards?.length) {
      query = query.overlaps('awards', filters.awards);
    }
    if (filters.stakes) {
      query = query.eq('stakes', filters.stakes);
    }
    if (filters.series_status) {
      if (filters.series_status === 'standalone') {
        query = query.eq('series_status', 'standalone');
      } else {
        query = query.eq('series_status', filters.series_status);
      }
    }
    if (filters.series_min_length !== undefined) {
      query = query.gte('series_total', filters.series_min_length);
    }
    if (filters.series_max_length !== undefined) {
      query = query.lte('series_total', filters.series_max_length);
    }
    if (filters.starters_only) {
      query = query.or('series_number.eq.1,series.is.null');
    }
    if (filters.pov_style) {
      query = query.eq('pov_style', filters.pov_style);
    }
    if (filters.pov_count) {
      query = query.eq('pov_count', filters.pov_count);
    }
    if (filters.protagonist_gender) {
      query = query.eq('protagonist_gender', filters.protagonist_gender);
    }

    // Publication era → year range
    if (filters.publication_era === 'classic') {
      query = query.lt('publication_year', 2000);
    } else if (filters.publication_era === 'modern') {
      query = query.gte('publication_year', 2000).lte('publication_year', 2015);
    } else if (filters.publication_era === 'contemporary') {
      query = query.gt('publication_year', 2015);
    }

    // Content warning exclusions — each excluded warning removes books that explicitly carry it.
    // Books with NULL content_warnings (not yet classified) are kept.
    if (filters.exclude_warnings?.length) {
      for (const warning of filters.exclude_warnings) {
        query = query.or(`content_warnings.is.null,content_warnings.not.cs.{${warning}}`);
      }
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
  type AuthorRow = { authors: string[] | null; subgenres: string[] | null; avg_rating: number | null };

  // Paginate to bypass any server-side max-rows cap
  const PAGE = 1000;
  const allRows: AuthorRow[] = [];
  let offset = 0;
  while (true) {
    const { data } = await supabaseClient
      .from('books')
      .select('authors, subgenres, avg_rating')
      .range(offset, offset + PAGE - 1) as { data: AuthorRow[] | null };
    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }

  const authorMap = new Map<string, { bookCount: number; genres: Map<string, number>; ratings: number[] }>();

  allRows.forEach((book) => {
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
    .sort((a, b) => {
      const lastName = (n: string) => n.trim().split(/\s+/).at(-1) ?? n;
      return lastName(a.name).localeCompare(lastName(b.name));
    });
}

/**
 * Get all books in a series, sorted by series_number
 */
export async function getBooksBySeries(seriesName: string): Promise<Book[]> {
  const { data } = await supabaseClient
    .from('books')
    .select('*')
    .ilike('series', seriesName)
    .order('series_number', { ascending: true, nullsFirst: false });
  return data || [];
}

/**
 * Get all distinct series names that have 2+ books, with book count
 */
export async function getAllSeries(): Promise<{ name: string; slug: string; bookCount: number }[]> {
  // Paginate in chunks of 1000 to bypass the anon key row cap
  const PAGE = 1000;
  const counts = new Map<string, number>();
  for (let page = 0; ; page++) {
    const { data } = await supabaseClient
      .from('books')
      .select('series')
      .not('series', 'is', null)
      .range(page * PAGE, (page + 1) * PAGE - 1) as { data: { series: string | null }[] | null };
    if (!data || data.length === 0) break;
    for (const row of data) {
      if (row.series) counts.set(row.series, (counts.get(row.series) ?? 0) + 1);
    }
    if (data.length < PAGE) break;
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count >= 2)
    .map(([name, bookCount]) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      bookCount,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all books by a specific author name
 */
export async function getBooksByAuthor(authorName: string): Promise<Book[]> {
  const { data } = await supabaseClient
    .from('books')
    .select('slug, title, cover_url, series, series_number, avg_rating, publication_year, page_count, darkness_level, subgenres, tropes, tone')
    .contains('authors', [authorName])
    .order('publication_year', { ascending: true, nullsFirst: false });

  return (data || []) as unknown as Book[];
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
