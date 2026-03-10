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
    darkness_level: payload.darkness_level ?? null,
    series: payload.series?.trim() || null,
    series_number: payload.series_number ?? null,
    audiobook_available: payload.audiobook_available ?? null,
    audiobook_narrator: payload.audiobook_narrator?.trim() || null,
    audiobook_narrator_rating: payload.audiobook_narrator_rating ?? null,
    audiobook_hours: payload.audiobook_hours ?? null,
    audiobook_audible_url: payload.audiobook_audible_url?.trim() || null,
    unique_angle: payload.unique_angle?.trim() || null,
    ideal_reader: payload.ideal_reader?.trim() || null,
    reading_experience: payload.reading_experience?.trim() || null,
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

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');

    const filters: Record<string, unknown> = {};
    if (genre) {
      // Support comma-separated genres (e.g. "Epic Fantasy,High Fantasy")
      filters.subgenres = genre.split(',').map((g) => g.trim()).filter(Boolean);
    }

    const result = await getBooks(
      filters,
      { page: 1, pageSize: 2000, sort: 'rating_desc' },
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
