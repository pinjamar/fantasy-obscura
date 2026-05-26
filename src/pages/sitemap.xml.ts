import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { BOOKS_LIKE } from '../data/books-like';
import { READING_ORDERS } from '../data/reading-orders';
import { CATEGORIES_META } from '../data/categories-meta';
import { CURATED_SLUGS } from '../lib/curated-slugs';

const CATEGORY_SLUGS = Object.keys(CATEGORIES_META);
const CATEGORY_LIST_TYPES = ['all-time-greats', 'start-with', 'hidden-gems'] as const;

const SITE = 'https://thegrimoire.co';

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

  // Only include curated book slugs in the sitemap — non-curated books are noindexed
  const bookSlugs = [...CURATED_SLUGS];

  // Enriched authors: bio + writing_style + best_starting_point filled in — substantive editorial content.
  const { data: enrichedAuthorRows } = await supabase
    .from('authors').select('slug')
    .gte('book_count', 3)
    .not('slug', 'is', null)
    .not('writing_style', 'is', null)
    .not('best_starting_point', 'is', null);
  const enrichedAuthorSlugs = (enrichedAuthorRows ?? []).map((a) => a.slug as string);

  // Plain authors: >= 3 books but no enriched content — include at lower priority.
  // Excludes authors with < 3 books (noindexed on the actual page).
  const { data: plainAuthorRows } = await supabase
    .from('authors').select('slug')
    .gte('book_count', 3)
    .not('slug', 'is', null)
    .is('writing_style', null);
  const plainAuthorSlugs = (plainAuthorRows ?? []).map((a) => a.slug as string);

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

  // Only the small set of non-curated reading order pages explicitly allowed to be indexed.
  // All other DB-driven reading order pages are noindexed — excluding them from the sitemap
  // avoids wasting crawl budget on pages Google will immediately mark noindex.
  const dbSeriesSlugs = [
    'he-who-fights-with-monsters',
    'caraval',
    'hell-bent',
    'river-of-time',
    'riverside',
    'crescent-city',
  ];

  const entries: string[] = [
    // Static high-priority pages
    ...STATIC_ROUTES.map((p) => urlEntry(p, p === '/' ? '1.0' : '0.8', 'daily')),
    // Reading orders — curated
    ...CURATED_READING_ORDER_SLUGS.map((s) => urlEntry(`/reading-orders/${s}/`, '0.9', 'weekly')),
    // Books Like guides
    ...BOOKS_LIKE_SLUGS.map((s) => urlEntry(`/books-like/${s}/`, '0.8', 'weekly')),
    // Reading orders — DB-driven
    ...dbSeriesSlugs.map((s) => urlEntry(`/reading-orders/${s}/`, '0.6', 'monthly')),
    // Fantasy category pages (12 total)
    ...CATEGORY_SLUGS.map((s) => urlEntry(`/fantasy/${s}/`, '0.7', 'weekly')),
    // Fantasy category sub-pages (12 × 3 = 36 total)
    ...CATEGORY_SLUGS.flatMap((s) =>
      CATEGORY_LIST_TYPES.map((t) => urlEntry(`/fantasy/${s}/${t}/`, '0.7', 'monthly'))
    ),
    // Authors — enriched profiles (bio + writing_style + best_starting_point)
    ...enrichedAuthorSlugs.map((s) => urlEntry(`/authors/${s}/`, '0.6', 'monthly')),
    // Tropes
    ...tropeSlugs.map((s) => urlEntry(`/tropes/${s}/`, '0.5', 'monthly')),
    // Curated book pages only (non-curated books are noindexed — excluded from sitemap)
    ...bookSlugs.map((s) => urlEntry(`/books/${s}/`, '0.5', 'monthly')),
    // Authors — plain profiles (book list only, no editorial content)
    ...plainAuthorSlugs.map((s) => urlEntry(`/authors/${s}/`, '0.4', 'monthly')),
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
