import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/auth';

// POST /api/profile/avatar — upload avatar image, returns public URL
// Body: multipart/form-data with field "file"
export const POST: APIRoute = async ({ request }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, headers);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  let formData: FormData;
  try { formData = await request.formData(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid form data' }), { status: 400, headers }); }

  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400, headers });
  }

  // Validate type and size (2 MB max)
  if (!file.type.startsWith('image/')) {
    return new Response(JSON.stringify({ error: 'File must be an image' }), { status: 400, headers });
  }
  if (file.size > 2 * 1024 * 1024) {
    return new Response(JSON.stringify({ error: 'Image must be under 2 MB' }), { status: 400, headers });
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${user.id}/avatar.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, arrayBuffer, { contentType: file.type, upsert: true });

  if (uploadError) {
    return new Response(JSON.stringify({ error: uploadError.message }), { status: 500, headers });
  }

  const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path);
  const avatar_url = urlData.publicUrl;

  // Save URL to profile
  await supabase.from('user_profiles').upsert(
    { user_id: user.id, avatar_url },
    { onConflict: 'user_id' }
  );

  return new Response(JSON.stringify({ ok: true, avatar_url }), { headers });
};
