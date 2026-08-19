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
      .from('authors')
      .select('id, slug, name, photo_url')
      .ilike('photo_url', '%covers.openlibrary.org%')
      .range(from, from + 999);
    if (error) { console.error(error); process.exit(1); }
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < 1000) break;
    from += 1000;
  }
  console.log('Total authors with an OpenLibrary photo_url:', all.length);

  let direct = 0, redirects = 0, errors = 0;
  const redirectAuthors = [];

  for (const a of all) {
    try {
      const res = await fetchWithTimeout(a.photo_url, { method: 'HEAD', redirect: 'manual' }, 8000);
      if (res.status >= 300 && res.status < 400) {
        redirects++;
        redirectAuthors.push(a);
        console.log(`  REDIRECT: ${a.name}`);
      } else if (res.status === 200) {
        direct++;
      } else {
        errors++;
        console.log(`  ERROR ${res.status}: ${a.name}`);
      }
    } catch (err) {
      errors++;
      console.log(`  TIMEOUT/ERR: ${a.name} (${err.message})`);
    }
  }

  console.log(`\nDirect 200: ${direct} | Redirects: ${redirects} | Errors: ${errors}`);
  fs.writeFileSync('./scripts/.ol-redirect-scope-authors.json', JSON.stringify(redirectAuthors));
  console.log('Redirecting author list saved to scripts/.ol-redirect-scope-authors.json');
}

main();
