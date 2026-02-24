import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Creates a Supabase client for server-side use (API routes, middleware, .astro pages).
 * Reads and writes auth tokens via HTTP cookie headers.
 */
export function createSupabaseServerClient(request: Request, responseHeaders: Headers) {
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          responseHeaders.append(
            'Set-Cookie',
            serializeCookieHeader(name, value, options),
          );
        });
      },
    },
  });
}
