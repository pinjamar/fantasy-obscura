import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const toSlug = (s: string) =>
  s.toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);

const slugVariants = (title: string): string[] => {
  const variants = new Set<string>();
  variants.add(toSlug(title));
  // Strip subtitle after ': '  e.g. "Mistborn: The Final Empire" → "the-final-empire"
  const colonIdx = title.indexOf(': ');
  if (colonIdx > 0) variants.add(toSlug(title.slice(colonIdx + 2)));
  // Strip leading article  e.g. "A Crown of Stars" → "crown-of-stars"
  variants.add(toSlug(title.replace(/^(A|An|The) /i, '')));
  // Strip parenthetical series tag  e.g. "The Eye of the World (Wheel of Time, #1)"
  const parenIdx = title.lastIndexOf(' (');
  if (parenIdx > 0) {
    const base = title.slice(0, parenIdx);
    variants.add(toSlug(base));
    variants.add(toSlug(base.replace(/^(A|An|The) /i, '')));
  }
  return [...variants];
};

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('x-admin-key') !== import.meta.env.ADMIN_SECRET) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const body = await request.json().catch(() => null);
  const books: { rank: number; title: string; author: string; book_url: string; average_rating: string }[] = body?.books ?? [];

  if (!books.length) return json({ error: 'No books provided' }, 400);

  // Build all slug variants for all incoming books
  const allSlugs = [...new Set(books.flatMap(b => slugVariants(b.title)))];

  // Batch into chunks of 150 to avoid PostgREST URL length limits
  const BATCH = 150;
  const allDbBooks: { slug: string }[] = [];
  for (let i = 0; i < allSlugs.length; i += BATCH) {
    const chunk = allSlugs.slice(i, i + BATCH);
    const { data, error } = await supabase
      .from('books')
      .select('slug')
      .in('slug', chunk);
    if (error) return json({ error: error.message }, 500);
    if (data) allDbBooks.push(...data);
  }

  const foundSlugs = new Set(allDbBooks.map(b => b.slug));

  // Missing = no slug variant matched
  const missing = books.filter(b =>
    !slugVariants(b.title).some(s => foundSlugs.has(s))
  );

  return json({
    total: books.length,
    found: books.length - missing.length,
    missing,
  });
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
