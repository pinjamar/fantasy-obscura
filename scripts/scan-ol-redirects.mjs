import { config } from 'dotenv';
config();
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const sb = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fetchWithTimeout(url, opts, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  let all = [];
  let from = 0;
  while (true) {
    const { data, error } = await sb
      .from('books')
      .select('id, slug, title, cover_url')
      .ilike('cover_url', '%covers.openlibrary.org%')
      .range(from, from + 999);
    if (error) { console.error(error); process.exit(1); }
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < 1000) break;
    from += 1000;
  }
  console.log('Total books with an OpenLibrary cover_url:', all.length);

  let direct = 0, redirects = 0, errors = 0;
  const redirectBooks = [];

  for (const b of all) {
    try {
      const res = await fetchWithTimeout(b.cover_url, { method: 'HEAD', redirect: 'manual' }, 8000);
      if (res.status >= 300 && res.status < 400) {
        redirects++;
        redirectBooks.push(b);
        console.log(`  REDIRECT: ${b.title}`);
      } else if (res.status === 200) {
        direct++;
      } else {
        errors++;
        console.log(`  ERROR ${res.status}: ${b.title}`);
      }
    } catch (err) {
      errors++;
      console.log(`  TIMEOUT/ERR: ${b.title} (${err.message})`);
    }
  }

  console.log(`\nDirect 200: ${direct} | Redirects: ${redirects} | Errors: ${errors}`);
  fs.writeFileSync('./scripts/.ol-redirect-scope.json', JSON.stringify(redirectBooks));
  console.log('Redirecting book list saved to scripts/.ol-redirect-scope.json');
}

main();
