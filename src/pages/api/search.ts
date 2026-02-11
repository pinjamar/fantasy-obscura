import type { APIRoute } from 'astro';
import {
  fetchBigbook,
  fetchGoogleBooks,
  fetchHarvardGraphql,
  fetchOpenLibrary,
} from '../../lib/books/providers';

export const GET: APIRoute = async ({ url }) => {
  const source = (
    url.searchParams.get('source') || 'openlibrary'
  ).toLowerCase();
  const q = (url.searchParams.get('q') || '').trim();

  if (!q) {
    return new Response(JSON.stringify({ error: 'Missing query' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    if (source === 'openlibrary') {
      const items = await fetchOpenLibrary(q);
      return new Response(JSON.stringify({ items }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (source === 'googlebooks') {
      const apiKey = import.meta.env.GOOGLE_BOOKS_API_KEY;
      const items = await fetchGoogleBooks(q, apiKey);
      return new Response(JSON.stringify({ items }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (source === 'harvard') {
      const endpoint = import.meta.env.HARVARD_GRAPHQL_URL || '';
      const apiKey = import.meta.env.HARVARD_GRAPHQL_API_KEY;
      const graphQuery = import.meta.env.HARVARD_GRAPHQL_QUERY;
      const items = await fetchHarvardGraphql(q, endpoint, apiKey, graphQuery);
      return new Response(JSON.stringify({ items }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (source === 'bigbook') {
      const items = await fetchBigbook(q);
      return new Response(JSON.stringify({ items }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        error:
          'Unknown source. Try: openlibrary, googlebooks, harvard, bigbook',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Search failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
