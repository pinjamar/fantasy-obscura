import type { APIRoute } from 'astro';
import type { BookInput } from '../../lib/books/types';
import { getSupabaseAdmin } from '../../lib/supabaseAdmin';

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
    subgenres: payload.subgenres?.filter(Boolean) || null,
    tropes: payload.tropes?.filter(Boolean) || null,
    magic_system: payload.magic_system?.trim() || null,
    tone: payload.tone?.filter(Boolean) || null,
    pacing: payload.pacing?.trim() || null,
    heat_level: payload.heat_level?.trim() || null,
    diversity_rep: payload.diversity_rep?.filter(Boolean) || null,
  };
};

export const GET: APIRoute = async () => {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    return new Response(JSON.stringify({ items: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load books';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json()) as BookInput;
    const book = normalizeBook(payload);
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('books')
      .insert([book])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ item: data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save book';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
