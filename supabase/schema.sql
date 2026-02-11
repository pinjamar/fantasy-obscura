-- Enable uuid extension
create extension if not exists "uuid-ossp";

-- Drop existing table if it exists (start fresh)
drop table if exists public.books cascade;

-- Books table
create table public.books (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique,
  authors text[],
  cover_url text,
  isbn text unique,
  synopsis text,
  page_count integer,
  publication_year integer,
  avg_rating numeric(3,2),
  subgenres text[],
  tropes text[],
  magic_system text,
  tone text[],
  pacing text,
  heat_level text,
  diversity_rep text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for fast filtering
create index idx_books_tropes on public.books using gin (tropes);
create index idx_books_subgenres on public.books using gin (subgenres);
create index idx_books_rating on public.books (avg_rating desc);

-- Optional: keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Drop trigger if it exists, then create it
drop trigger if exists trg_books_updated_at on public.books;
create trigger trg_books_updated_at
before update on public.books
for each row execute function public.set_updated_at();
