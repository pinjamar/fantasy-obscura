# Fantasy Obscura - Database Setup Guide

## Step 1: Set Up Environment Variables

Make sure your `.env` file has the correct Supabase credentials:

```env
PUBLIC_SUPABASE_URL=https://yxrcperutfhemlmdszst.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sb_publishable_HtsOyp_5_jE1_FquPFWHHA_g48NiBmT
# Optional: for admin operations
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 2: Apply Database Schema

### Option A: Using Supabase Dashboard (Recommended for first-time setup)

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase/schema.sql`
6. Paste it into the SQL editor
7. Click **Run** (or press Ctrl+Enter)

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Initialize Supabase in your project (if not already done)
cd c:\Users\Ivan\Desktop\fantasy-obscura
supabase init

# Link to your remote project
supabase link --project-ref yxrcperutfhemlmdszst

# Push the schema
supabase db push
```

## Step 3: Verify the Table

1. In Supabase Dashboard, go to **Table Editor**
2. You should see a `books` table with all the columns
3. Check the **Indexes** tab to verify GIN indexes are created

## Step 4: Set Up Row Level Security (RLS) - Optional but Recommended

If you want public read access but restricted write access:

```sql
-- Enable RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.books
  FOR SELECT USING (true);

-- Restrict write access (only authenticated users or service role)
CREATE POLICY "Allow authenticated inserts" ON public.books
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON public.books
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated deletes" ON public.books
  FOR DELETE USING (auth.role() = 'authenticated');
```

## Step 5: Seed Some Test Data (Optional)

```sql
INSERT INTO public.books (title, slug, authors, cover_url, synopsis, page_count, publication_year, avg_rating, subgenres, tropes, magic_system, tone, pacing, heat_level, diversity_rep) VALUES
(
  'The Name of the Wind',
  'the-name-of-the-wind',
  ARRAY['Patrick Rothfuss'],
  'https://example.com/notw.jpg',
  'The tale of Kvothe, a magically gifted young man who grows to be the most notorious wizard his world has ever seen.',
  662,
  2007,
  4.55,
  ARRAY['Epic Fantasy', 'High Fantasy'],
  ARRAY['Magic Academy', 'Coming of Age', 'Mentor Dies'],
  'Hard Magic',
  ARRAY['Character-driven', 'Atmospheric'],
  'Mixed',
  'Clean',
  NULL
),
(
  'Mistborn: The Final Empire',
  'mistborn-the-final-empire',
  ARRAY['Brandon Sanderson'],
  'https://example.com/mistborn.jpg',
  'In a world where ash falls from the sky, and mist dominates the night, an unlikely hero must use the magic of metal to challenge an empire.',
  541,
  2006,
  4.44,
  ARRAY['Epic Fantasy', 'High Fantasy'],
  ARRAY['Heist', 'Chosen One', 'Found Family'],
  'Hard Magic',
  ARRAY['Dark & Serious', 'Action-packed'],
  'Fast-paced',
  'Clean',
  NULL
);
```

## Step 6: Test the API

Create a test page or use the browser console to verify your setup:

```typescript
import { getBooks } from './src/lib/db/books';

// Test fetching books
const result = await getBooks(
  {
    subgenres: ['Epic Fantasy'],
    min_rating: 4.0,
  },
  {
    page: 1,
    pageSize: 10,
    sort: 'rating_desc',
  },
);

console.log(result);
```

## Usage Examples

### Fetch books with filters

```typescript
import { getBooks } from '@/lib/db/books';

const { data, count } = await getBooks(
  {
    search: 'dragon',
    subgenres: ['Epic Fantasy', 'High Fantasy'],
    tropes: ['Found Family'],
    min_rating: 4.0,
    heat_level: 'Clean',
  },
  {
    page: 1,
    pageSize: 20,
    sort: 'rating_desc',
  },
);
```

### Get a single book

```typescript
import { getBookBySlug } from '@/lib/db/books';

const book = await getBookBySlug('the-name-of-the-wind');
```

### Create a new book

```typescript
import { createBook } from '@/lib/db/books';

const newBook = await createBook({
  title: 'A Wizard of Earthsea',
  slug: 'a-wizard-of-earthsea',
  authors: ['Ursula K. Le Guin'],
  publication_year: 1968,
  subgenres: ['High Fantasy', 'Coming of Age'],
  tropes: ['Magic Academy', 'Quest'],
  magic_system: 'Soft Magic',
});
```

## Available Filter Constants

Check `src/lib/filters.ts` for all predefined filter options:

- Subgenres (Epic Fantasy, Urban Fantasy, Cozy Fantasy, etc.)
- Tropes (Found Family, Enemies to Lovers, Dragon Riders, etc.)
- Magic Systems (Hard Magic, Soft Magic, No Magic)
- Tones (Grimdark, Hopeful, Whimsical, etc.)
- Pacing (Fast-paced, Slow-burn, Mixed)
- Heat Levels (Clean, Fade to Black, Steamy, Spicy, Explicit)
- Diversity Rep (LGBTQ+, POC, Disability Rep, etc.)
