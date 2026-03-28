import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { SeriesReviewAction } from '../../../types/series-detect';

export const POST: APIRoute = async ({ request }) => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  let body: SeriesReviewAction;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { slug, action, series_name, series_number } = body;
  if (!slug || !action) return json({ error: 'slug and action required' }, 400);

  if (action === 'confirm') {
    const update: Record<string, unknown> = { series_review: 'confirmed' };
    if (series_name) update.series = series_name;
    if (series_number !== undefined && series_number !== null) update.series_number = series_number;
    const { error } = await supabase.from('books').update(update).eq('slug', slug);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (action === 'reject') {
    const { error } = await supabase
      .from('books')
      .update({
        series: null,
        series_number: null,
        series_review: 'rejected',
        series_confidence: null,
        series_source: null,
      })
      .eq('slug', slug);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: 'action must be confirm or reject' }, 400);
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
