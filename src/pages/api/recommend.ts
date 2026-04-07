import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabaseClient } from '../../lib/supabaseClient';

const LIMIT_ANON = 3;
const LIMIT_AUTH = 10;
const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function checkRateLimit(key: string, limit: number): Promise<{ allowed: boolean; remaining: number }> {
  const now = new Date();
  const resetAt = new Date(now);
  resetAt.setUTCHours(24, 0, 0, 0); // midnight UTC

  const { data } = await supabaseClient
    .from('rate_limits')
    .select('count, reset_at')
    .eq('key', key)
    .maybeSingle();

  // Expired or new — reset to 1
  if (!data || new Date(data.reset_at) <= now) {
    await supabaseClient.from('rate_limits').upsert({ key, count: 1, reset_at: resetAt.toISOString() });
    return { allowed: true, remaining: limit - 1 };
  }

  if (data.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await supabaseClient.from('rate_limits').update({ count: data.count + 1 }).eq('key', key);
  return { allowed: true, remaining: limit - data.count - 1 };
}

export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;
  const geminiKey = (locals.runtime?.env?.GEMINI_API_KEY as string | undefined) ?? import.meta.env.GEMINI_API_KEY;
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown';

  const rateLimitKey = user ? `user:${user.id}` : `ip:${ip}`;
  const limit = user ? LIMIT_AUTH : LIMIT_ANON;

  const { allowed, remaining } = await checkRateLimit(rateLimitKey, limit);

  if (!allowed) {
    const message = user
      ? 'You have used all 10 daily recommendations. Come back tomorrow!'
      : 'You have used all 3 free recommendations today. Sign in for 10 per day.';
    return new Response(JSON.stringify({ error: message, rateLimited: true }), {
      status: 429,
      headers: JSON_HEADERS,
    });
  }

  const body = await request.json().catch(() => null);
  const books: { title: string; author: string }[] = body?.books ?? [];
  const exclude: string[] = body?.exclude ?? [];

  if (!books.length) {
    return new Response(JSON.stringify({ error: 'No books provided' }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  const bookList = books.map((b, i) => `${i + 1}. "${b.title}" by ${b.author}`).join('\n');

  if (!geminiKey) {
    return new Response(JSON.stringify({ error: 'Recommender is not configured yet — check back soon.' }), { status: 503, headers: JSON_HEADERS });
  }

  const genAI = new GoogleGenerativeAI(geminiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { thinkingConfig: { thinkingBudget: 0 } } as any,
  });

  const excludeClause = exclude.length
    ? `\nDo NOT recommend any of these books the user has already seen:\n${exclude.map((t) => `- "${t}"`).join('\n')}\n`
    : '';

  const prompt = `You are a fantasy book expert. Based on these books the user loves:

${bookList}

Recommend exactly 4 fantasy books they would likely enjoy. Focus on what these books share — themes, tone, magic, world-building style, pacing — and find books that match those qualities.

Do NOT recommend any of the books already listed.${excludeClause}

Respond ONLY with valid JSON in this exact format, no extra text:
{
  "recommendations": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "series": "Series Name or null if standalone",
      "series_number": 1,
      "reason": "One sentence on why it matches (max 20 words)"
    }
  ]
}`;

  let text: string;
  try {
    const result = await model.generateContent(prompt);
    text = result.response.text();
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'AI service unavailable';
    return new Response(JSON.stringify({ error: msg }), { status: 503, headers: JSON_HEADERS });
  }

  let parsed: { recommendations: { title: string; author: string; series: string | null; series_number: number | null; reason: string }[] };

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] ?? text);
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to parse recommendations' }), {
      status: 500,
      headers: JSON_HEADERS,
    });
  }

  // Look up covers + slugs from DB — try multiple slug variants per title
  const toSlug = (s: string) => s.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const slugVariants = (title: string): string[] => {
    const variants = new Set<string>();
    variants.add(toSlug(title));
    // Strip subtitle after ': '  e.g. "Mistborn: The Final Empire" → "The Final Empire"
    const colonIdx = title.indexOf(': ');
    if (colonIdx > 0) variants.add(toSlug(title.slice(colonIdx + 2)));
    // Strip leading article  e.g. "A Crown of Stars" → "Crown of Stars"
    variants.add(toSlug(title.replace(/^(A|An|The) /i, '')));
    return [...variants];
  };
  const allSlugs = [...new Set(parsed.recommendations.flatMap((r) => slugVariants(r.title)))];
  const { data: dbBooks } = await supabaseClient
    .from('books')
    .select('title, cover_url, slug')
    .in('slug', allSlugs);

  // Series-based fallback: when AI returns a series name as the title (e.g. "Memory, Sorrow, and Thorn #1")
  const recsNeedingSeriesLookup = parsed.recommendations.filter((r) => {
    const found = slugVariants(r.title).some((s) => (dbBooks ?? []).find((b) => b.slug === s));
    return !found && r.series && r.series_number;
  });
  let seriesBooks: { title: string; cover_url: string | null; slug: string; series: string | null; series_number: number | null }[] = [];
  if (recsNeedingSeriesLookup.length) {
    for (const rec of recsNeedingSeriesLookup) {
      const { data } = await supabaseClient
        .from('books')
        .select('title, cover_url, slug, series, series_number')
        .ilike('series', `%${rec.series!.replace(/[,.']/g, '%')}%`)
        .eq('series_number', rec.series_number!)
        .limit(1);
      if (data?.length) seriesBooks.push(...data as any);
    }
  }

  const coverMapBySlug = new Map<string, { cover_url: string; slug: string }>(
    [...(dbBooks ?? []), ...seriesBooks]
      .filter((b) => b.cover_url && !b.cover_url.includes('archive.org'))
      .map((b) => [b.slug, { cover_url: b.cover_url!, slug: b.slug }])
  );
  // Map series title → slug for series-based matches
  const seriesSlugMap = new Map<string, { cover_url: string; slug: string }>(
    seriesBooks
      .filter((b) => b.cover_url && !b.cover_url.includes('archive.org'))
      .map((b) => [`${b.series?.toLowerCase()}:${b.series_number}`, { cover_url: b.cover_url!, slug: b.slug }])
  );

  const enriched = parsed.recommendations.map((rec) => {
    const cleanSeries = rec.series === 'null' || rec.series === '' ? null : rec.series;
    const match =
      slugVariants(rec.title).reduce<{ cover_url: string; slug: string } | undefined>(
        (found, s) => found ?? coverMapBySlug.get(s),
        undefined
      ) ?? seriesSlugMap.get(`${cleanSeries?.toLowerCase()}:${rec.series_number}`);
    return {
      ...rec,
      series: cleanSeries,
      ...(match ?? {}),
    };
  });

  return new Response(JSON.stringify({ recommendations: enriched, remaining }), {
    status: 200,
    headers: JSON_HEADERS,
  });
};
