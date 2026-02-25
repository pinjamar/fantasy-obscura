-- Run this in the Supabase SQL editor to add audiobook columns to the books table

ALTER TABLE books
  ADD COLUMN IF NOT EXISTS audiobook_available  boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS audiobook_narrator   text,
  ADD COLUMN IF NOT EXISTS audiobook_narrator_rating text
    CHECK (audiobook_narrator_rating IN ('excellent', 'good', 'mixed', 'avoid')),
  ADD COLUMN IF NOT EXISTS audiobook_hours      integer,
  ADD COLUMN IF NOT EXISTS audiobook_audible_url text;
