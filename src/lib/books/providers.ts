import type { BookSearchResult } from '../../lib/types';

type OpenLibrarySearchResponse = {
  docs?: Array<{
    key?: string;
    title?: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
    isbn?: string[];
  }>;
};

type GoogleBooksResponse = {
  items?: Array<{
    id?: string;
    volumeInfo?: {
      title?: string;
      authors?: string[];
      publishedDate?: string;
      pageCount?: number;
      description?: string;
      industryIdentifiers?: Array<{ type?: string; identifier?: string }>;
      imageLinks?: { thumbnail?: string; smallThumbnail?: string };
      averageRating?: number;
    };
  }>;
};

export const fetchOpenLibrary = async (
  query: string,
): Promise<BookSearchResult[]> => {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Open Library request failed');
  const data = (await res.json()) as OpenLibrarySearchResponse;

  return (data.docs || []).slice(0, 20).map((doc) => ({
    source: 'openlibrary',
    source_id: doc.key ?? null,
    title: doc.title ?? 'Untitled',
    authors: doc.author_name ?? null,
    publication_year: doc.first_publish_year ?? null,
    cover_url: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : null,
    isbn: doc.isbn?.[0] ?? null,
  }));
};

export const fetchGoogleBooks = async (
  query: string,
  apiKey?: string,
): Promise<BookSearchResult[]> => {
  const keyParam = apiKey ? `&key=${encodeURIComponent(apiKey)}` : '';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}${keyParam}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Google Books request failed');
  const data = (await res.json()) as GoogleBooksResponse;

  return (data.items || []).slice(0, 20).map((item) => {
    const info = item.volumeInfo || {};
    const isbn = info.industryIdentifiers?.find((i) =>
      i.type?.includes('ISBN'),
    )?.identifier;
    return {
      source: 'googlebooks',
      source_id: item.id ?? null,
      title: info.title ?? 'Untitled',
      authors: info.authors ?? null,
      publication_year: info.publishedDate
        ? parseInt(info.publishedDate.split('-')[0], 10)
        : null,
      cover_url: info.imageLinks?.thumbnail ?? null,
      page_count: info.pageCount ?? null,
      synopsis: info.description ?? null,
      avg_rating: info.averageRating ?? null,
      isbn: isbn ?? null,
    };
  });
};

export const fetchBigbook = async (
  query: string,
): Promise<BookSearchResult[]> => {
  const url = `https://www.bigbookapi.com/search?q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Bigbook request failed');
    const data = (await res.json()) as {
      items?: Array<{ title?: string; authors?: string[] }>;
    };
    return (data.items || []).slice(0, 20).map((item) => ({
      source: 'bigbook',
      title: item.title ?? 'Untitled',
      authors: item.authors ?? null,
    }));
  } catch {
    return [];
  }
};

type GutendexResponse = {
  results?: Array<{
    id?: number;
    title?: string;
    authors?: Array<{ name?: string; birth_year?: number | null; death_year?: number | null }>;
    formats?: Record<string, string>;
  }>;
};

export const fetchGutendex = async (query: string): Promise<BookSearchResult[]> => {
  const url = `https://gutendex.com/books/?search=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gutendex request failed');
  const data = (await res.json()) as GutendexResponse;

  return (data.results || []).slice(0, 20).map((book) => ({
    source: 'gutendex' as const,
    source_id: book.id != null ? `gutendex_${book.id}` : null,
    title: book.title ?? 'Untitled',
    authors:
      book.authors
        ?.map((a) => {
          if (!a.name) return '';
          // Gutendex returns "Last, First" — reverse to "First Last"
          const parts = a.name.split(', ');
          return parts.length === 2 ? `${parts[1]} ${parts[0]}` : a.name;
        })
        .filter(Boolean) ?? null,
    cover_url: book.formats?.['image/jpeg'] ?? null,
    publication_year: null,
  }));
};

export const fetchHarvardGraphql = async (
  query: string,
  endpoint: string,
  apiKey?: string,
  graphQuery?: string,
): Promise<BookSearchResult[]> => {
  if (!endpoint) return [];
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
      },
      body: JSON.stringify({
        query: graphQuery || `query { books(search: "${query}") { id title } }`,
      }),
    });
    if (!res.ok) throw new Error('Harvard GraphQL request failed');
    const data = (await res.json()) as {
      data?: { items?: Array<{ title?: string; authors?: string[] }> };
    };
    return (data.data?.items || []).slice(0, 20).map((item) => ({
      source: 'harvard',
      title: item.title ?? 'Untitled',
      authors: item.authors ?? null,
    }));
  } catch {
    return [];
  }
};
