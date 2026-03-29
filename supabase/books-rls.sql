-- RLS for the books table
-- Public can read all books; only the service role (scripts/admin) can write.

alter table public.books enable row level security;

-- Anyone (including anonymous) can read books
create policy "public read books"
  on public.books
  for select
  using (true);

-- No INSERT/UPDATE/DELETE via the anon/authenticated key.
-- Scripts use SUPABASE_SERVICE_ROLE_KEY which bypasses RLS entirely — no extra policy needed.
