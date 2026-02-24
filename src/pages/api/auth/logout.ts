import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  const responseHeaders = new Headers();
  const supabase = createSupabaseServerClient(request, responseHeaders);

  await supabase.auth.signOut();

  responseHeaders.set('Location', '/');
  return new Response(null, { status: 303, headers: responseHeaders });
};
