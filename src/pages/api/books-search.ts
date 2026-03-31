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

  const [titleRes, authorRes] = await Promise.all([
    supabaseClient
      .from('books')
      .select('id, title, authors, slug, cover_url, series, series_number')
      .or(`title.ilike.%${q}%,series.ilike.%${q}%`)
      .order('title')
      .limit(6),
    supabaseClient
      .from('books')
      .select('id, title, authors, slug, cover_url, series, series_number')
      .ilike('authors_search', `%${q.toLowerCase()}%`)
      .not('title', 'ilike', `%${q}%`)
      .order('title')
      .limit(4),
  ]);

  if (titleRes.error && authorRes.error) {
    return new Response(JSON.stringify({ error: titleRes.error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const seen = new Set<string>();
  const merged = [...(titleRes.data ?? []), ...(authorRes.data ?? [])].filter((b) => {
    if (seen.has(b.id)) return false;
    seen.add(b.id);
    return true;
  }).slice(0, 8);

  return new Response(JSON.stringify({ books: merged }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
