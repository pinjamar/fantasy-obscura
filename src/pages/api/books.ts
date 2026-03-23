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
    const genre   = url.searchParams.get('genre');
    const compact = url.searchParams.get('compact') === '1';

    // Compact mode: only fetch the 4 fields needed by CategoryGrid covers/slugs/ratings.
    // Avoids transferring 30+ columns * 2000+ rows on every homepage load.
    if (compact) {
      const { supabaseClient } = await import('../../lib/supabaseClient');
      const BATCH = 1000;
      let allBooks: unknown[] = [];
      let from = 0;
      while (true) {
        const { data, error } = await supabaseClient
          .from('books')
          .select('title, slug, cover_url, avg_rating')
          .order('avg_rating', { ascending: false, nullsFirst: false })
          .range(from, from + BATCH - 1);
        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        if (!data || data.length === 0) break;
        allBooks = allBooks.concat(data);
        if (data.length < BATCH) break;
        from += BATCH;
      }
      return new Response(JSON.stringify({ items: allBooks }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const filters: Record<string, unknown> = {};
    if (genre) {
      filters.subgenres = genre.split(',').map((g) => g.trim()).filter(Boolean);
    }

    const BATCH = 1000;
    let allBooks: unknown[] = [];
    let page = 1;
    let totalCount = 0;

    while (true) {
      const result = await getBooks(filters, { page, pageSize: BATCH, sort: 'rating_desc' });
      if (result.error) {
        return new Response(JSON.stringify({ error: result.error }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (page === 1) totalCount = result.count;
      allBooks = allBooks.concat(result.data);
      if (allBooks.length >= totalCount || result.data.length < BATCH) break;
      page++;
    }

    return new Response(
      JSON.stringify({ items: allBooks, count: totalCount }),
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
