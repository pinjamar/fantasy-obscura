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

  const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
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

  // Look up covers + slugs from DB by title
  const titles = parsed.recommendations.map((r) => r.title);
  const { data: dbBooks } = await supabaseClient
    .from('books')
    .select('title, cover_url, slug')
    .in('title', titles);

  const coverMap = new Map<string, { cover_url: string; slug: string }>(
    (dbBooks ?? [])
      .filter((b) => b.cover_url && !b.cover_url.includes('archive.org'))
      .map((b) => [b.title.toLowerCase(), { cover_url: b.cover_url, slug: b.slug }])
  );

  const enriched = parsed.recommendations.map((rec) => ({
    ...rec,
    series: rec.series === 'null' || rec.series === '' ? null : rec.series,
    ...( coverMap.get(rec.title.toLowerCase()) ?? {} ),
  }));

  return new Response(JSON.stringify({ recommendations: enriched, remaining }), {
    status: 200,
    headers: JSON_HEADERS,
  });
};
