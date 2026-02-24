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
```

## Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor to create the books table.

Add the darkness level column if not already present:

```sql
ALTER TABLE books ADD COLUMN IF NOT EXISTS darkness_level smallint;
```

## Scripts

```bash
node seed-books.js       # Seed ~100 curated fantasy books
node seed-darkness.js    # Set darkness_level (1–5) on all books
node update-series.js    # Add series metadata to existing books
```

Run in order if setting up from scratch: `seed-books` → `seed-darkness` → `update-series`.

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

| Field                                          | Type              | Notes                       |
| ---------------------------------------------- | ----------------- | --------------------------- |
| `title`, `authors`                             | string / string[] | required                    |
| `slug`                                         | string            | URL key for `/books/[slug]` |
| `subgenres`, `tropes`                          | string[]          | used for filtering          |
| `tone`, `diversity_rep`                        | string[]          |                             |
| `magic_system`, `pacing`, `heat_level`         | string            |                             |
| `audience`                                     | string            | Adult / YA / Children's     |
| `darkness_level`                               | 1–5               | 1=Lighthearted → 5=Brutal   |
| `series`, `series_number`                      | string / number   |                             |
| `avg_rating`, `page_count`, `publication_year` | number            |                             |
| `cover_url`, `synopsis`                        | string            |                             |

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
