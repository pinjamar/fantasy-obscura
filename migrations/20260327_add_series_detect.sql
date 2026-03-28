-- Add series detection fields to books table
-- series_confidence : 0.0–1.0, how confident the detector was
-- series_review     : pipeline status ('auto' | 'pending' | 'confirmed' | 'rejected')
-- series_source     : what detected it ('regex' | 'google_books' | 'llm' | 'manual')
--
-- NOTE: series_status is already in use for 'ongoing'/'completed' — do not touch it.

alter table books
  add column if not exists series_confidence numeric(3,2),
  add column if not exists series_review     text check (series_review in ('auto','pending','confirmed','rejected')),
  add column if not exists series_source     text check (series_source in ('regex','google_books','llm','manual'));

-- Index for the admin review queue
create index if not exists books_series_review_idx on books (series_review) where series_review = 'pending';
