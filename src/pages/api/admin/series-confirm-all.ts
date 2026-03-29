import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

/** Bulk-confirm all pending books on a given page (by slug list). */
export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('x-admin-key') !== import.meta.env.ADMIN_SECRET) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { slugs } = await request.json() as { slugs: string[] };
  if (!slugs?.length) return json({ error: 'slugs required' }, 400);

  const { error } = await supabase
    .from('books')
    .update({ series_review: 'confirmed' })
    .in('slug', slugs);

  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, confirmed: slugs.length });
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
