import type { APIRoute } from 'astro';
import type { BookInput } from '../../lib/types';
import { createBook } from '../../lib/db/books';

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

const BOOK_COLS = 'id,title,slug,authors,cover_url,isbn,publication_year,page_count,avg_rating,synopsis,subgenres,series,series_number,darkness_level,heat_level,series_status,audiobook_available,tropes,audience';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const compact = url.searchParams.get('compact') === '1';

    const { supabaseClient } = await import('../../lib/supabaseClient');

    // ── Compact mode (category grids — 4 columns only) ──────────────────────
    if (compact) {
      const BATCH = 1000;
      let allBooks: unknown[] = [];
      let from = 0;
      while (true) {
        const { data, error } = await supabaseClient
          .from('books')
          .select('title, slug, cover_url, avg_rating')
          .order('avg_rating', { ascending: false, nullsFirst: false })
          .range(from, from + BATCH - 1);
        if (error) return jsonError(error.message);
        if (!data?.length) break;
        allBooks = allBooks.concat(data);
        if (data.length < BATCH) break;
        from += BATCH;
      }
      return jsonOk({ items: allBooks });
    }

    // ── Paginated + filtered mode ────────────────────────────────────────────
    const page      = Math.max(1, parseInt(url.searchParams.get('page')  ?? '1',  10));
    const limit     = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') ?? '48', 10)));
    const sort      = url.searchParams.get('sort')      ?? 'rating-desc';
    const search    = (url.searchParams.get('search')   ?? '').trim();
    const genre     = url.searchParams.get('genre')     ?? '';
    const darkness  = url.searchParams.get('darkness');
    const heat      = url.searchParams.get('heat');
    const trope     = url.searchParams.get('trope');
    const audience  = url.searchParams.get('audience');
    const standalone = url.searchParams.get('standalone') === '1';
    const completed  = url.searchParams.get('completed')  === '1';

    let query = supabaseClient.from('books').select(BOOK_COLS, { count: 'exact' });

    if (search.length >= 2) {
      query = query.or(`title.ilike.%${search}%,series.ilike.%${search}%`);
    }
    if (genre) {
      const genres = genre.split(',').map((g: string) => g.trim()).filter(Boolean);
      if (genres.length) query = query.overlaps('subgenres', genres);
    }
    if (darkness)   query = query.eq('darkness_level', parseInt(darkness, 10));
    if (heat)       query = query.eq('heat_level', heat);
    if (trope)      query = query.overlaps('tropes', [trope]);
    if (audience)   query = query.eq('audience', audience);
    if (standalone) query = query.is('series', null);
    if (completed)  query = query.eq('series_status', 'completed');

    switch (sort) {
      case 'title-asc':  query = query.order('title', { ascending: true }); break;
      case 'title-desc': query = query.order('title', { ascending: false }); break;
      case 'newest':     query = query.order('publication_year', { ascending: false, nullsFirst: false }); break;
      case 'oldest':     query = query.order('publication_year', { ascending: true,  nullsFirst: false }); break;
      case 'shortest':   query = query.order('page_count',        { ascending: true,  nullsFirst: false }); break;
      case 'longest':    query = query.order('page_count',        { ascending: false, nullsFirst: false }); break;
      case 'author-asc': query = query.order('authors',           { ascending: true }); break;
      default:           query = query.order('avg_rating',        { ascending: false, nullsFirst: false }); break;
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, error, count } = await query;
    if (error) return jsonError(error.message);

    return jsonOk({
      items:      data ?? [],
      total:      count ?? 0,
      page,
      totalPages: Math.ceil((count ?? 0) / limit),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load books';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function jsonOk(data: object) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function jsonError(message: string, status = 500) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
