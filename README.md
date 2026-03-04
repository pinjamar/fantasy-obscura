# Fantasy Obscura

A curated guide site for fantasy and sci-fi book lovers — with genre category pages, reading orders, creature references, an interactive book recommendation tool, and individual book pages with affiliate buy links.

Live at: **fantasy-obscura.pages.dev**

## Quick Start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build
npm run preview
npm run check     # TypeScript check
```

## Tech Stack

- **Astro 5** — SSR, MDX support
- **Cloudflare Pages** — deployment target
- **React 19** — interactive islands
- **Tailwind CSS 4**
- **Supabase** (PostgreSQL) — book database

## Environment Variables

Create a `.env` file:

```
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

`SUPABASE_SERVICE_ROLE_KEY` and `ANTHROPIC_API_KEY` are only needed for running classification scripts — not required for the site itself.

## Database Setup

Run each step **in order** in the Supabase **SQL Editor → New query → Run**.

### Step 1 — Books table (file: `supabase/schema.sql`)
Creates the core `books` table with indexes and `updated_at` trigger.

### Step 2 — Books extra columns (run once, safe to re-run)
Adds columns that were added after the initial schema:
```sql
ALTER TABLE books ADD COLUMN IF NOT EXISTS darkness_level smallint;
ALTER TABLE books ADD COLUMN IF NOT EXISTS audience text;
ALTER TABLE books ADD COLUMN IF NOT EXISTS series text;
ALTER TABLE books ADD COLUMN IF NOT EXISTS series_number integer;
```

### Step 3 — Audiobook columns (file: `supabase/add-audiobook-columns.sql`)
Adds audiobook metadata to the books table:
```sql
ALTER TABLE books
  ADD COLUMN IF NOT EXISTS audiobook_available        boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS audiobook_narrator         text,
  ADD COLUMN IF NOT EXISTS audiobook_narrator_rating  text
    CHECK (audiobook_narrator_rating IN ('excellent', 'good', 'mixed', 'avoid')),
  ADD COLUMN IF NOT EXISTS audiobook_hours            integer,
  ADD COLUMN IF NOT EXISTS audiobook_audible_url      text;
```
Set `audiobook_available = true` on any book row to show the headphones card on its page.

### Step 4 — Authors table + RLS (file: `supabase/authors-rls.sql`)
Creates the `authors` profile table and enables public reads:
```sql
CREATE TABLE authors (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  slug       text UNIQUE NOT NULL,
  bio        text,
  photo_url  text,
  website    text,
  twitter    text,
  goodreads  text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read authors" ON authors FOR SELECT USING (true);
```

### Step 5 — Community book tags table + RLS
Creates the `book_tags` table for user-submitted tags (requires auth):
```sql
CREATE TABLE book_tags (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id    uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  tag_slug   text NOT NULL,
  tag_name   text NOT NULL,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  approved   boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(book_id, tag_slug, user_id)
);
ALTER TABLE book_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read approved tags"      ON book_tags FOR SELECT USING (approved = true);
CREATE POLICY "authenticated users can tag" ON book_tags FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users can remove own tags"   ON book_tags FOR DELETE TO authenticated USING (auth.uid() = user_id);
```
Tags default to `approved = false`. Set to `true` in the Supabase dashboard to make them public.

---

## Scripts

All scripts live in `scripts/`. Run from the project root.

### Import (free — no Anthropic API cost)

```bash
# Import 50 priority SEO books from OpenLibrary
node scripts/import-books.mjs
node scripts/import-books.mjs --dry-run

# Fill all sequel/continuation books for every series already in DB
node scripts/fill-series.mjs
node scripts/fill-series.mjs --dry-run
node scripts/fill-series.mjs --limit 20
```

### Classify new books — all fields in one command

After importing new books, run this single command to fill every NULL classification field:

```bash
npm run classify:new
```

This runs all 5 classifiers in sequence (each skips books already classified):
1. `classify-books` → `darkness_level`, `heat_level`
2. `classify-descriptors` → `accessibility`, `awards`, `stakes`, `pov_style`, `pov_count`, `protagonist_gender`, `series_status`
3. `classify-tropes` → `tropes` (69 canonical tropes)
4. `classify-creatures` → `creatures` (28 creature/race slugs)
5. `classify-content-warnings` → `content_warnings`

### Individual classifiers

```bash
# Darkness level (1–5) and heat level
npm run classify:books
node scripts/classify-books.mjs --dry-run
node scripts/classify-books.mjs --limit 50

# Descriptors
npm run classify:descriptors
node scripts/classify-descriptors.mjs --dry-run
node scripts/classify-descriptors.mjs --limit 50
node scripts/classify-descriptors.mjs --refresh-series   # re-check completed/ongoing for all series

# Tropes (69 canonical tropes across 4 categories)
npm run classify:tropes
node scripts/classify-tropes.mjs --dry-run
node scripts/classify-tropes.mjs --reclassify            # redo all books, not just NULL

# Creatures & races (28 slugs)
npm run classify:creatures
node scripts/classify-creatures.mjs --dry-run
node scripts/classify-creatures.mjs --reclassify

# Content warnings
npm run classify:warnings
node scripts/classify-content-warnings.mjs --dry-run
```

`--reclassify` re-runs classification on books that already have values — use after updating the canonical trope or creature lists.

`--refresh-series` re-asks Claude whether each series is `completed` or `ongoing` — run periodically as ongoing series finish.

### Generate editorial content (optional, costs more)

```bash
# "What Makes It Different" — unique angle (Sonnet, ~$2.10 / 357 books)
node scripts/generate-what-makes-it-different.mjs
node scripts/generate-what-makes-it-different.mjs --dry-run --limit 5

# "Tone & Reading Experience" — feel, darkness, pacing (Haiku, ~$0.45 / 357 books)
node scripts/generate-reading-experience.mjs
node scripts/generate-reading-experience.mjs --dry-run --limit 5

# "Who This Is For" — ideal reader + comps (Haiku, ~$0.50 / 357 books)
node scripts/generate-ideal-reader.mjs
node scripts/generate-ideal-reader.mjs --dry-run --limit 5
node scripts/generate-ideal-reader.mjs --slug six-of-crows    # single book
```

## Project Structure

```
src/
├── components/
│   ├── AlchemyTable.tsx    # Interactive book finder (filters → Supabase)
│   ├── BookDisplay.tsx     # Book grid with sort, darkness badges, slug links
│   ├── BookHub.tsx         # Admin import tool (5 external API sources)
│   ├── CategoryGrid.tsx    # Genre category cards
│   ├── Layout.astro        # Base layout + nav
│   └── ReadingOrder.tsx    # Series reading order display
├── lib/
│   ├── books/providers.ts  # External API integrations (OpenLibrary, Google Books,
│   │                       #   Harvard, BigBook, Gutendex/Project Gutenberg)
│   ├── db/books.ts         # Supabase CRUD helpers
│   ├── database.types.ts   # Auto-generated Supabase types
│   ├── supabaseClient.ts   # Supabase anon client
│   └── types.ts            # App-wide type definitions
└── pages/
    ├── index.astro                  # Home — category grid
    ├── craft/index.astro            # Alchemy Table — book finder
    ├── books/
    │   ├── index.astro              # Book database hub
    │   └── [slug].astro             # Individual book page (SSR, affiliate links)
    ├── books-like/index.astro       # "Books like..." — placeholder
    ├── beginner-lists/index.astro   # Starter reading lists
    ├── reading-orders/              # 8 series reading guides
    │   ├── index.astro
    │   ├── cosmere.astro / discworld.astro / first-law.astro
    │   ├── kingkiller.astro / malazan.astro / stormlight.astro
    │   ├── witcher.astro / dune.mdx
    ├── categories/                  # 12 genre pages (cozy, dark, epic, grimdark,
    │   └── *.astro                  #   historical, litrpg, mythology, paranormal,
    │                                #   romantasy, sci-fi, urban, young)
    ├── creatures/index.astro        # Creature & races reference
    ├── magic-system/index.astro     # Magic systems + BookHub import tool
    └── api/
        ├── books.ts                 # GET all books / POST save book
        ├── craft.ts                 # GET filtered books for Alchemy Table
        └── search.ts                # GET external API search (5 sources)
```

## Book Schema

Key fields on every book record:

| Field                                          | Type              | Notes                                        |
| ---------------------------------------------- | ----------------- | -------------------------------------------- |
| `title`, `authors`                             | string / string[] | required                                     |
| `slug`                                         | string            | URL key for `/books/[slug]`                  |
| `subgenres`, `tropes`                          | string[]          | used for filtering; trope names not slugs    |
| `creatures`                                    | string[]          | creature/race slugs (e.g. `"dragon"`)        |
| `tone`, `diversity_rep`, `content_warnings`    | string[]          |                                              |
| `magic_system`, `pacing`, `heat_level`         | string            |                                              |
| `audience`                                     | string            | Adult / YA / Children's                      |
| `darkness_level`                               | 1–5               | 1=Lighthearted → 5=Brutal                    |
| `accessibility`                                | string            | beginner / intermediate / advanced           |
| `stakes`                                       | string            | personal / kingdom / world                   |
| `pov_style`                                    | string            | First Person / Third Limited / Omniscient    |
| `pov_count`                                    | string            | Single / Dual / Multiple                     |
| `protagonist_gender`                           | string            | Male / Female / Ensemble                     |
| `awards`                                       | string[]          | e.g. `["hugo-winner", "nebula-nominee"]`     |
| `series`, `series_number`, `series_status`     | string / number   | series_status: completed / ongoing           |
| `avg_rating`, `page_count`, `publication_year` | number            |                                              |
| `cover_url`, `synopsis`                        | string            |                                              |

## Darkness Scale

| Level      | Label        | Meaning                                          |
| ---------- | ------------ | ------------------------------------------------ |
| 🕯️         | Lighthearted | Cozy, low stakes, no real darkness               |
| 🕯️🕯️       | Mild         | Some tension but ultimately safe                 |
| 🕯️🕯️🕯️     | Moderate     | Death, moral complexity, some disturbing content |
| 🕯️🕯️🕯️🕯️   | Dark         | Violence, trauma, morally grey characters        |
| 🕯️🕯️🕯️🕯️🕯️ | Brutal       | Grimdark, no redemption guaranteed               |

## Deployment

Deployed to **Cloudflare Pages**. Push to `main` triggers automatic redeploy.

Set env vars in Cloudflare Pages dashboard → Settings → Environment Variables.

---

## TODO

### Reddit Recommendation Bot

Build a Python Reddit bot using PRAW that monitors fantasy subreddits and recommends books from this site.

**Subreddits to monitor:** r/Fantasy, r/fantasybooks, r/booksuggestions, r/romantasy, r/ProgressionFantasy, r/books, r/fantasyromance, r/justfinishedreading, r/suggestmeabook, r/fantasywriters

**Trigger phrases:** "recommend", "looking for", "books like", "what should I read", "suggestions", "similar to", "something like", "next read", "suggest"

**Signal parsing:**

- Genre keywords: map "grimdark" → Grimdark subgenre, "cozy" → Cozy Fantasy, "romantasy" → Romantic Fantasy, "epic" → Epic Fantasy, "dark" → Dark Fantasy, "scary" → Dark Fantasy, "funny/humorous" → tone=Humorous, "heartwarming" → tone=Hopeful
- Trope keywords: "found family" → Found Family trope, "enemies to lovers" → Enemies to Lovers, "magic school" → Magic Academy, "heist" → Heist, "chosen one" → Chosen One
- Darkness preference: "dark", "brutal", "grim", "grimdark" → darkness_level 4–5; "cozy", "light", "wholesome", "clean" → darkness_level 1–2
- Standalone preference: "standalone", "no series", "single book" → exclude books with series set
- "like [book title]" → match title in DB via `/api/books`, pull that book's subgenres/tropes/tone/darkness as search profile

**Matching logic:**

- Fetch all books from the site's `/api/books` endpoint (returns full metadata including subgenres, tropes, tone, darkness_level, series, audience)
- Score each book: +1 for each matching subgenre, +1 per matching trope, +1 for darkness range match, +1 for tone match, +1 if standalone preference matches
- Only reply if top match scores ≥ 50% of possible signal points (silence beats a bad rec)
- Return top 2–3 matches, never just 1

**Reply format:**

```
Based on what you're looking for, here are some picks:

**[Title]** by [Author] — [synopsis excerpt, 1 sentence]. Darkness: 🕯️🕯️🕯️ (Moderate) | [Series name #N / Standalone]

**[Title]** by [Author] — [synopsis excerpt]. Darkness: 🕯️🕯️ (Mild) | Standalone

More curated fantasy picks → fantasy-obscura.pages.dev
```

**Safety rules:**

- Store replied post/comment IDs in `replied.txt`, never reply twice
- Wait minimum 15 minutes between replies
- Never reply to posts older than 24 hours
- Never reply to other bots (skip if `bot` appears in username)
- If no confident match: do nothing

**Deliverables:**

- `bot/bot.py` — main bot with PRAW setup and credential comments
- `bot/.env.example` — Reddit API credentials template
- `bot/requirements.txt`
- `dry_run` mode flag that prints what would be posted without posting
- Deployment instructions for Railway or Render (free tier)
