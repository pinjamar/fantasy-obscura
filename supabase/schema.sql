-- Enable uuid extension
create extension if not exists "uuid-ossp";

-- Books table
create table if not exists public.books (
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
create index if not exists idx_books_tropes on public.books using gin (tropes);
create index if not exists idx_books_subgenres on public.books using gin (subgenres);
create index if not exists idx_books_rating on public.books (avg_rating desc);

-- Optional: keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger if not exists trg_books_updated_at
before update on public.books
for each row execute function public.set_updated_at();
