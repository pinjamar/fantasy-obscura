import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  const responseHeaders = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, responseHeaders);

  const form = await request.formData();
  const email = form.get('email')?.toString() ?? '';
  const password = form.get('password')?.toString() ?? '';
  const redirectTo = form.get('redirectTo')?.toString() || '/';

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    responseHeaders.set('Location', `/auth/login?error=${encodeURIComponent(error.message)}&redirectTo=${encodeURIComponent(redirectTo)}`);
    return new Response(null, { status: 303, headers: responseHeaders });
  }

  responseHeaders.set('Location', redirectTo);
  return new Response(null, { status: 303, headers: responseHeaders });
};
