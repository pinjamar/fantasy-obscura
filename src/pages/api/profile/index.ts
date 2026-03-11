import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/auth';

// GET /api/profile — returns current user's profile
export const GET: APIRoute = async ({ request }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, headers);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  const { data } = await supabase
    .from('user_profiles')
    .select('display_name, avatar_url')
    .eq('user_id', user.id)
    .single();

  return new Response(JSON.stringify({ profile: data ?? { display_name: null, avatar_url: null } }), { headers });
};

// POST /api/profile — upsert display_name and/or avatar_url
// Body: { display_name?: string, avatar_url?: string }
export const POST: APIRoute = async ({ request }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, headers);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  let body: { display_name?: string; avatar_url?: string };
  try { body = await request.json(); } catch { body = {}; }

  const { error } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: user.id,
      ...(body.display_name !== undefined ? { display_name: body.display_name } : {}),
      ...(body.avatar_url !== undefined ? { avatar_url: body.avatar_url } : {}),
    }, { onConflict: 'user_id' });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ ok: true }), { headers });
};
