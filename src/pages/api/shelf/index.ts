import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/auth';

const VALID_SHELVES = ['want_to_read', 'currently_reading', 'read', 'favourites'];

// GET /api/shelf — returns all shelf entries with book data for current user
export const GET: APIRoute = async ({ request }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, headers);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  const { data, error } = await supabase
    .from('user_shelves')
    .select(`
      id, shelf, created_at,
      books (
        id, title, slug, authors, cover_url,
        avg_rating, publication_year, subgenres,
        series, series_number, darkness_level
      )
    `)
    .eq('user_id', user.id)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ entries: data ?? [] }), { headers });
};

// POST /api/shelf — add or move a book to a shelf
// Body: { bookId: string, shelf: string }
export const POST: APIRoute = async ({ request }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, headers);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  let body: { bookId?: string; shelf?: string };
  try { body = await request.json(); } catch { body = {}; }

  const { bookId, shelf } = body;
  if (!bookId || !shelf || !VALID_SHELVES.includes(shelf)) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers });
  }

  // Upsert — moves the book if already on another shelf
  const { error } = await supabase
    .from('user_shelves')
    .upsert({ user_id: user.id, book_id: bookId, shelf }, { onConflict: 'user_id,book_id' });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ ok: true }), { headers });
};

// DELETE /api/shelf?bookId=xxx — remove from shelf
export const DELETE: APIRoute = async ({ request }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, headers);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  const url = new URL(request.url);
  const bookId = url.searchParams.get('bookId');
  if (!bookId) {
    return new Response(JSON.stringify({ error: 'Missing bookId' }), { status: 400, headers });
  }

  const { error } = await supabase
    .from('user_shelves')
    .delete()
    .eq('user_id', user.id)
    .eq('book_id', bookId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ ok: true }), { headers });
};
