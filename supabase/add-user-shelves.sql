-- User shelves: one shelf per book per user (like Goodreads)
-- Shelf values: want_to_read, currently_reading, read, favourites

CREATE TABLE IF NOT EXISTS user_shelves (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id    uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  shelf      text NOT NULL CHECK (shelf IN ('want_to_read', 'currently_reading', 'read', 'favourites')),
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, book_id)
);

ALTER TABLE user_shelves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own shelves"
  ON user_shelves FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Index for fast per-user shelf queries
CREATE INDEX IF NOT EXISTS user_shelves_user_shelf_idx ON user_shelves (user_id, shelf);
