-- Tracks slugs rejected via /admin/fill-review so fill-series won't re-import them.
create table if not exists rejected_books (
  slug        text        primary key,
  rejected_at timestamptz not null default now()
);
