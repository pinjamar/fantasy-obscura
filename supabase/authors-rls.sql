-- Run this after creating the authors table
-- Enables RLS and grants public read access (required for anon key)

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read authors"
  ON authors FOR SELECT
  USING (true);
