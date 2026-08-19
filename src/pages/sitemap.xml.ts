import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { BOOKS_LIKE } from '../data/books-like';
import { INDEXED_DB_READING_ORDER_SLUGS, READING_ORDERS } from '../data/reading-orders';
import { CATEGORIES_META } from '../data/categories-meta';
import { CURATED_SLUGS } from '../lib/curated-slugs';
import { PUBLIC_TROPES } from '../data/tropes';

const CATEGORY_SLUGS = Object.keys(CATEGORIES_META);
const CATEGORY_LIST_TYPES = ['all-time-greats', 'start-with', 'hidden-gems'] as const;

const SITE = 'https://thegrimoire.co';

// Books-like slugs from static data
const BOOKS_LIKE_SLUGS = BOOKS_LIKE.map((e) => e.slug);

// Curated reading order slugs from static data (used for lastmod in sitemap entries)

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

function urlEntry(path: string, priority = '0.5', changefreq = 'weekly', lastmod?: string) {
  return `  <url>
    <loc>${SITE}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async ({ locals }) => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  );

  // Only include curated book slugs in the sitemap — non-curated books are noindexed.
  // Validate against the DB first: a slug in CURATED_SLUGS that doesn't match a real
  // book (typo, or a book referenced in priority-slugs.mjs that was never added) would
  // otherwise submit a dead 404 URL to Google — a real, confirmed cause of wasted
  // crawl budget and rejected sitemap entries.
  const candidateBookSlugs = [...CURATED_SLUGS];
  const bookSlugs: string[] = [];
  {
    const CHUNK = 200;
    for (let i = 0; i < candidateBookSlugs.length; i += CHUNK) {
      const chunk = candidateBookSlugs.slice(i, i + CHUNK);
      const { data } = await supabase.from('books').select('slug').in('slug', chunk);
      const found = new Set((data ?? []).map((b) => b.slug));
      for (const s of chunk) if (found.has(s)) bookSlugs.push(s);
    }
  }

  // Enriched authors: bio + writing_style + best_starting_point filled in — substantive editorial content.
  const { data: enrichedAuthorRows } = await supabase
    .from('authors').select('slug')
    .gte('book_count', 3)
    .not('slug', 'is', null)
    .not('writing_style', 'is', null)
    .not('best_starting_point', 'is', null);
  const enrichedAuthorSlugs = (enrichedAuthorRows ?? []).map((a) => a.slug as string);

  // Fetch trope+darkness counts via RPC — accurate across all books, single round-trip
  const { data: tropeCountRows } = await supabase.rpc('get_trope_darkness_counts');

  const DARKNESS_SLUG = ['', 'lighthearted', 'mild', 'moderate', 'dark', 'brutal'] as const;

  // All trope pages — use static list so tropes with null-darkness books aren't silently excluded
  const tropeSlugs = PUBLIC_TROPES.map((t) => t.slug);

  const darknessCombos = (tropeCountRows ?? [])
    .filter((r: any) => (r.book_count as number) >= 10)
    .map((r: any) => ({
      tropeSlug: r.trope_slug as string,
      darknessSlug: DARKNESS_SLUG[r.darkness_level as number],
    }));

  // DB-driven reading order pages explicitly allowed to be indexed (not yet curated).
  // All other auto-generated series pages are noindexed and excluded from the sitemap.
  const dbSeriesSlugs = INDEXED_DB_READING_ORDER_SLUGS;

  const entries: string[] = [
    // Static high-priority pages
    ...STATIC_ROUTES.map((p) => urlEntry(p, p === '/' ? '1.0' : '0.8', 'daily')),
    // Reading orders — curated
    ...READING_ORDERS.map((e) => urlEntry(`/reading-orders/${e.slug}/`, '0.9', 'weekly', e.lastUpdated)),
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
    // Trope darkness sub-pages (only combos with ≥10 books)
    ...darknessCombos.map(({ tropeSlug, darknessSlug }) => urlEntry(`/tropes/${tropeSlug}/${darknessSlug}/`, '0.4', 'monthly')),
    // Curated book pages only (non-curated books are noindexed — excluded from sitemap)
    ...bookSlugs.map((s) => urlEntry(`/books/${s}/`, '0.5', 'monthly')),
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
