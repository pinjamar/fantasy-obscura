import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const SITE = 'https://fantasy-obscura.pages.dev';

// Static routes that are always present
const STATIC_ROUTES = [
  '/',
  '/books/',
  '/craft/',
  '/tropes/',
  '/books-like/',
  '/reading-orders/',
  '/authors/',
  '/categories/',
  '/reading-orders/cosmere/',
  '/reading-orders/first-law/',
  '/reading-orders/acotar/',
  '/reading-orders/stormlight/',
  '/reading-orders/wheel-of-time/',
  '/reading-orders/malazan/',
  '/reading-orders/witcher/',
  '/reading-orders/kingkiller/',
  '/reading-orders/discworld/',
  '/reading-orders/dresden-files/',
];

function urlEntry(path: string, priority = '0.5', changefreq = 'weekly') {
  return `  <url>
    <loc>${SITE}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async ({ locals }) => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  );

  // Fetch all book slugs
  const PAGE = 1000;
  const bookSlugs: string[] = [];
  let from = 0;
  while (true) {
    const { data } = await supabase
      .from('books')
      .select('slug')
      .not('slug', 'is', null)
      .range(from, from + PAGE - 1);
    if (!data?.length) break;
    for (const b of data) if (b.slug) bookSlugs.push(b.slug);
    if (data.length < PAGE) break;
    from += PAGE;
  }

  // Fetch all author slugs
  const { data: authorRows } = await supabase.from('authors').select('slug').not('slug', 'is', null);
  const authorSlugs = (authorRows ?? []).map((a) => a.slug as string);

  // Fetch all trope slugs
  const { data: tropeRows } = await supabase
    .from('books')
    .select('tropes')
    .not('tropes', 'is', null)
    .limit(500);
  const tropeSlugs = [...new Set(
    (tropeRows ?? []).flatMap((b) => (b.tropes ?? []) as string[])
      .map((t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
  )];

  const entries: string[] = [
    // Static
    ...STATIC_ROUTES.map((p) => urlEntry(p, p === '/' ? '1.0' : '0.7', 'daily')),
    // Books
    ...bookSlugs.map((s) => urlEntry(`/books/${s}/`, '0.8', 'weekly')),
    // Authors
    ...authorSlugs.map((s) => urlEntry(`/authors/${s}/`, '0.6', 'monthly')),
    // Tropes
    ...tropeSlugs.map((s) => urlEntry(`/tropes/${s}/`, '0.5', 'monthly')),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
