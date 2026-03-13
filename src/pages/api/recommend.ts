import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabaseClient } from '../../lib/supabaseClient';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  const books: { title: string; author: string }[] = body?.books ?? [];

  if (!books.length) {
    return new Response(JSON.stringify({ error: 'No books provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const bookList = books.map((b, i) => `${i + 1}. "${b.title}" by ${b.author}`).join('\n');

  const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { thinkingConfig: { thinkingBudget: 0 } } as any,
  });

  const prompt = `You are a fantasy book expert. Based on these books the user loves:

${bookList}

Recommend exactly 4 fantasy books they would likely enjoy. Focus on what these books share — themes, tone, magic, world-building style, pacing — and find books that match those qualities.

Do NOT recommend any of the books already listed.

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

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  let parsed: { recommendations: { title: string; author: string; series: string | null; series_number: number | null; reason: string }[] };

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] ?? text);
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to parse recommendations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Look up covers + slugs from DB by title
  const titles = parsed.recommendations.map((r) => r.title);
  const { data: dbBooks } = await supabaseClient
    .from('books')
    .select('title, cover_url, slug')
    .in('title', titles);

  const coverMap = new Map<string, { cover_url: string; slug: string }>(
    (dbBooks ?? []).map((b) => [b.title.toLowerCase(), { cover_url: b.cover_url, slug: b.slug }])
  );

  const enriched = parsed.recommendations.map((rec) => ({
    ...rec,
    series: rec.series === 'null' || rec.series === '' ? null : rec.series,
    ...( coverMap.get(rec.title.toLowerCase()) ?? {} ),
  }));

  return new Response(JSON.stringify({ recommendations: enriched }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
