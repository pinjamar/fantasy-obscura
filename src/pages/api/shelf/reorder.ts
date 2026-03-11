import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/auth';

// PATCH /api/shelf/reorder
// Body: { shelf: string, order: string[] }  — book IDs in new order
export const PATCH: APIRoute = async ({ request }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, headers);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  let body: { shelf?: string; order?: string[] };
  try { body = await request.json(); } catch { body = {}; }

  const { shelf, order } = body;
  if (!shelf || !Array.isArray(order)) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers });
  }

  // Update position for each book in the new order
  const updates = order.map((bookId, position) =>
    supabase
      .from('user_shelves')
      .update({ position })
      .eq('user_id', user.id)
      .eq('book_id', bookId)
      .eq('shelf', shelf)
  );

  await Promise.all(updates);

  return new Response(JSON.stringify({ ok: true }), { headers });
};
