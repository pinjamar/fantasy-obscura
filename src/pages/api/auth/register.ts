import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  const responseHeaders = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, responseHeaders);

  const form = await request.formData();
  const email = form.get('email')?.toString() ?? '';
  const password = form.get('password')?.toString() ?? '';

  if (password.length < 6) {
    responseHeaders.set('Location', `/auth/register?error=${encodeURIComponent('Password must be at least 6 characters')}`);
    return new Response(null, { status: 303, headers: responseHeaders });
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    responseHeaders.set('Location', `/auth/register?error=${encodeURIComponent(error.message)}`);
    return new Response(null, { status: 303, headers: responseHeaders });
  }

  responseHeaders.set('Location', '/auth/register?success=1');
  return new Response(null, { status: 303, headers: responseHeaders });
};
