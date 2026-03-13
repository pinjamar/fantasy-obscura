import type { APIRoute } from 'astro';
import { supabaseClient } from '../../lib/supabaseClient';

export const GET: APIRoute = async ({ url }) => {
  const q = (url.searchParams.get('q') || '').trim();
  if (!q || q.length < 2) {
    return new Response(JSON.stringify({ books: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await supabaseClient
    .from('books')
    .select('id, title, authors, slug, cover_url, series, series_number')
    .or(`title.ilike.%${q}%,series.ilike.%${q}%`)
    .order('title')
    .limit(8);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ books: data ?? [] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
