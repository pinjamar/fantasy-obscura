import type { APIRoute } from 'astro';
import type { BookInput } from '../../lib/types';
import { createBook, getBooks } from '../../lib/db/books';

const normalizeBook = (payload: BookInput) => {
  const title = payload.title?.trim();
  if (!title) throw new Error('Title is required');
  return {
    title,
    slug: payload.slug?.trim() || null,
    authors: payload.authors?.filter(Boolean) || null,
    cover_url: payload.cover_url?.trim() || null,
    isbn: payload.isbn?.trim() || null,
    synopsis: payload.synopsis?.trim() || null,
    page_count: payload.page_count ?? null,
    publication_year: payload.publication_year ?? null,
    avg_rating: payload.avg_rating ?? null,
    audience: payload.audience?.trim() || null,
    subgenres: payload.subgenres?.filter(Boolean) || null,
    tropes: payload.tropes?.filter(Boolean) || null,
    magic_system: payload.magic_system?.trim() || null,
    tone: payload.tone?.filter(Boolean) || null,
    pacing: payload.pacing?.trim() || null,
    heat_level: payload.heat_level?.trim() || null,
    diversity_rep: payload.diversity_rep?.filter(Boolean) || null,
    series: payload.series?.trim() || null,
    series_number: payload.series_number ?? null,
  };
};

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload = (await request.json()) as BookInput;
    const normalized = normalizeBook(payload);
    const book = await createBook(normalized);

    if (!book) throw new Error('Failed to create book');

    return new Response(JSON.stringify({ success: true, book }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Save failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    const result = await getBooks(
      {},
      { page: 1, pageSize: 100, sort: 'rating_desc' },
    );

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ items: result.data, count: result.count }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load books';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
