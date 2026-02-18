# Fantasy Obscura

A guide site for fantasy and sci-fi book lovers — with curated reading lists, reading orders, creature references, and an interactive book recommendation tool.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build
npm run preview
npm run check     # TypeScript check
```

## Tech Stack

- **Astro 5** with server output
- **Cloudflare Pages** adapter (deployment target)
- **React 19** for interactive components
- **Tailwind CSS 4**
- **Supabase** (PostgreSQL) for book database
- **MDX** for content pages

## Environment Variables

Create a `.env` file:

```
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor to create the books table.

To seed the database with 20 curated fantasy books:

```bash
node seed-books.js
```

## Project Structure

```
src/
├── components/
│   ├── AlchemyTable.tsx   # Interactive book recommendation filters
│   ├── BookDisplay.tsx    # Book grid with filtering
│   ├── BookHub.tsx        # Admin book import/entry tool
│   └── Layout.astro       # Base layout
├── lib/
│   ├── db/books.ts        # Supabase CRUD operations
│   ├── database.types.ts  # Auto-generated Supabase types
│   ├── filters.ts         # Predefined filter options
│   ├── supabaseClient.ts  # Supabase client (anon)
│   └── types.ts           # App type definitions
└── pages/
    ├── index.astro              # Home — category cards
    ├── craft/index.astro        # Alchemy Table — book finder
    ├── books/index.astro        # Book database hub
    ├── beginner-lists/          # Starter reading lists
    ├── reading-orders/          # Series reading orders (MDX)
    ├── creatures/               # Creatures & races reference
    ├── magic-system/            # Magic systems overview
    ├── categories/              # 12 genre category pages
    └── api/
        ├── books.ts             # GET/POST books
        └── craft.ts             # GET books by filter (Alchemy Table)
```

## Deployment

Deployed to **Cloudflare Pages**. Push to `main` branch triggers automatic redeploy.

Set environment variables in Cloudflare Pages dashboard under Settings → Environment Variables.
