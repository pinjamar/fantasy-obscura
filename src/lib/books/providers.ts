import type { BookSearchResult } from './types';

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

type HarvardGraphQLResponse = {
  data?: {
    items?: Array<{
      id?: string;
      title?: string;
      authors?: string[];
      publicationYear?: number;
      coverUrl?: string;
      isbn?: string;
      synopsis?: string;
      pageCount?: number;
      avgRating?: number;
    }>;
  };
  errors?: Array<{ message?: string }>;
};

type BigbookResponse = {
  items?: Array<{
    id?: string;
    title?: string;
    authors?: string[];
    year?: number;
    cover_url?: string;
    isbn?: string;
    synopsis?: string;
    page_count?: number;
    avg_rating?: number;
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
        ? parseInt(info.publishedDate.slice(0, 4), 10) || null
        : null,
      page_count: info.pageCount ?? null,
      synopsis: info.description ?? null,
      cover_url:
        info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail ?? null,
      isbn: isbn ?? null,
      avg_rating: info.averageRating ?? null,
    };
  });
};

export const fetchHarvardGraphql = async (
  query: string,
  endpoint: string,
  apiKey?: string,
  graphQuery?: string,
): Promise<BookSearchResult[]> => {
  if (!endpoint) throw new Error('Harvard GraphQL endpoint not configured');
  if (!graphQuery) throw new Error('Harvard GraphQL query not configured');

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({ query: graphQuery, variables: { query } }),
  });

  if (!res.ok) throw new Error('Harvard GraphQL request failed');
  const data = (await res.json()) as HarvardGraphQLResponse;
  if (data.errors?.length)
    throw new Error(data.errors[0]?.message || 'Harvard GraphQL error');

  return (data.data?.items || []).slice(0, 20).map((item) => ({
    source: 'harvard',
    source_id: item.id ?? null,
    title: item.title ?? 'Untitled',
    authors: item.authors ?? null,
    publication_year: item.publicationYear ?? null,
    cover_url: item.coverUrl ?? null,
    isbn: item.isbn ?? null,
    synopsis: item.synopsis ?? null,
    page_count: item.pageCount ?? null,
    avg_rating: item.avgRating ?? null,
  }));
};

export const fetchBigbook = async (
  query: string,
  baseUrl: string,
  apiKey?: string,
  searchPath = '/search',
): Promise<BookSearchResult[]> => {
  if (!baseUrl) throw new Error('Bigbook API base URL not configured');
  const url = `${baseUrl.replace(/\/$/, '')}${searchPath}?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
  });

  if (!res.ok) throw new Error('Bigbook request failed');
  const data = (await res.json()) as BigbookResponse;

  return (data.items || []).slice(0, 20).map((item) => ({
    source: 'bigbook',
    source_id: item.id ?? null,
    title: item.title ?? 'Untitled',
    authors: item.authors ?? null,
    publication_year: item.year ?? null,
    cover_url: item.cover_url ?? null,
    isbn: item.isbn ?? null,
    synopsis: item.synopsis ?? null,
    page_count: item.page_count ?? null,
    avg_rating: item.avg_rating ?? null,
  }));
};
