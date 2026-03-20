import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { BOOKS_LIKE } from '../data/books-like';
import { READING_ORDERS } from '../data/reading-orders';
import { CATEGORIES_META } from '../data/categories-meta';

const CATEGORY_SLUGS = Object.keys(CATEGORIES_META);
const CATEGORY_LIST_TYPES = ['all-time-greats', 'start-with', 'hidden-gems'] as const;

const SITE = 'https://www.thegrimoire.co';

// Books-like slugs from static data
const BOOKS_LIKE_SLUGS = BOOKS_LIKE.map((e) => e.slug);

// Curated reading order slugs from static data
const CURATED_READING_ORDER_SLUGS = READING_ORDERS.map((e) => e.slug);

// Static routes that are always present
const STATIC_ROUTES = [
  '/',
  '/books/',
  '/book-finder/',
  '/tropes/',
  '/books-like/',
  '/reading-orders/',
  '/authors/',
  '/fantasy/',
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

  // Fetch DB-driven reading order slugs (series not in curated list)
  const curatedSet = new Set(CURATED_READING_ORDER_SLUGS);
  const { data: seriesRows } = await supabase
    .from('books')
    .select('series')
    .not('series', 'is', null);
  const dbSeriesSlugs = [...new Set(
    (seriesRows ?? []).map((b) => (b.series as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
  )].filter((s) => !curatedSet.has(s));

  const entries: string[] = [
    // Static
    ...STATIC_ROUTES.map((p) => urlEntry(p, p === '/' ? '1.0' : '0.7', 'daily')),
    // Books
    ...bookSlugs.map((s) => urlEntry(`/books/${s}/`, '0.8', 'weekly')),
    // Authors
    ...authorSlugs.map((s) => urlEntry(`/authors/${s}/`, '0.6', 'monthly')),
    // Tropes
    ...tropeSlugs.map((s) => urlEntry(`/tropes/${s}/`, '0.5', 'monthly')),
    // Fantasy category pages
    ...CATEGORY_SLUGS.map((s) => urlEntry(`/fantasy/${s}/`, '0.7', 'weekly')),
    // Fantasy category sub-pages (all-time-greats, start-with, hidden-gems)
    ...CATEGORY_SLUGS.flatMap((s) =>
      CATEGORY_LIST_TYPES.map((t) => urlEntry(`/fantasy/${s}/${t}/`, '0.6', 'monthly'))
    ),
    // Books Like
    ...BOOKS_LIKE_SLUGS.map((s) => urlEntry(`/books-like/${s}/`, '0.7', 'monthly')),
    // Reading orders — curated
    ...CURATED_READING_ORDER_SLUGS.map((s) => urlEntry(`/reading-orders/${s}/`, '0.7', 'monthly')),
    // Reading orders — DB-driven
    ...dbSeriesSlugs.map((s) => urlEntry(`/reading-orders/${s}/`, '0.5', 'monthly')),
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
