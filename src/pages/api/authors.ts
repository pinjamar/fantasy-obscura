import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search')?.trim() ?? '';

  if (search.length < 2) {
    return jsonOk({ items: [] });
  }

  const { supabaseClient } = await import('../../lib/supabaseClient');

  const { data, error } = await supabaseClient
    .from('authors')
    .select('name, slug, photo_url, book_count, top_genres, avg_rating')
    .ilike('name', `%${search}%`)
    .order('book_count', { ascending: false, nullsFirst: false })
    .limit(60);

  if (error) return jsonOk({ items: [] });

  return jsonOk({ items: data ?? [] });
};

function jsonOk(data: object) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
