import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../../lib/auth';
import { getApprovedTags, submitTag } from '../../../../lib/db/tags';
import { getBookBySlug } from '../../../../lib/db/books';

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  if (!slug) return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });

  const book = await getBookBySlug(slug);
  if (!book) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });

  const tags = await getApprovedTags(book.id);
  return new Response(JSON.stringify({ tags }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  const responseHeaders = new Headers({ 'Content-Type': 'application/json' });
  const supabase = createSupabaseServerClient(request, responseHeaders);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: responseHeaders,
    });
  }

  const { slug } = params;
  if (!slug) return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400, headers: responseHeaders });

  const book = await getBookBySlug(slug);
  if (!book) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: responseHeaders });

  const body = await request.json() as { tag_slug?: string; tag_name?: string };
  const { tag_slug, tag_name } = body;

  if (!tag_slug || !tag_name) {
    return new Response(JSON.stringify({ error: 'tag_slug and tag_name are required' }), {
      status: 400,
      headers: responseHeaders,
    });
  }

  const result = await submitTag(book.id, tag_slug, tag_name, user.id);

  if (result.error) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 500,
      headers: responseHeaders,
    });
  }

  return new Response(JSON.stringify({ success: true, pending: true }), {
    status: 201,
    headers: responseHeaders,
  });
};
