import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('x-admin-key') !== import.meta.env.ADMIN_SECRET)
    return json({ error: 'Unauthorized' }, 401);

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  let body: { slug: string; action: 'keep' | 'delete' };
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { slug, action } = body;
  if (!slug || !action) return json({ error: 'slug and action required' }, 400);

  if (action === 'keep') return json({ ok: true });

  if (action === 'delete') {
    // Record as rejected so fill-series won't re-import it
    await supabase.from('rejected_books').upsert({ slug }, { onConflict: 'slug', ignoreDuplicates: true });

    const { error } = await supabase.from('books').delete().eq('slug', slug);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: 'action must be keep or delete' }, 400);
};
