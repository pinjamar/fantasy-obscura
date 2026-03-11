import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const responseHeaders = new Headers();
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
