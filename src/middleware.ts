import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const responseHeaders = new Headers();

  // Skip Supabase entirely for anonymous visitors (no auth cookie present).
  // This avoids a network round trip on every public page request and prevents
  // Cloudflare Worker CPU/startup limit errors (error 1102) for non-logged-in users.
  const cookie = context.request.headers.get('Cookie') ?? '';
  const hasAuthCookie = cookie.includes('sb-') || cookie.includes('supabase');

  if (!hasAuthCookie) {
    context.locals.user = null;
    context.locals.userProfile = null;
    return next();
  }

  const supabase = createSupabaseServerClient(context.request, responseHeaders);

  const { data: { user } } = await supabase.auth.getUser();
  context.locals.user = user ?? null;

  // Fetch profile if logged in
  if (user) {
    const { data } = await supabase
      .from('user_profiles')
      .select('display_name, avatar_url')
      .eq('user_id', user.id)
      .single();
    context.locals.userProfile = data ?? null;
  } else {
    context.locals.userProfile = null;
  }

  const response = await next();

  // Forward any Set-Cookie headers written by Supabase (token refresh etc.)
  responseHeaders.forEach((value, key) => {
    response.headers.append(key, value);
  });

  return response;
});
