import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const responseHeaders = new Headers();
  const supabase = createSupabaseServerClient(context.request, responseHeaders);

  const { data: { user } } = await supabase.auth.getUser();
  context.locals.user = user ?? null;

  const response = await next();

  // Forward any Set-Cookie headers written by Supabase (token refresh etc.)
  responseHeaders.forEach((value, key) => {
    response.headers.append(key, value);
  });

  return response;
});
