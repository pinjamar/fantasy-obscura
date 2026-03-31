-- Immutable wrapper needed because array_to_string is STABLE, not IMMUTABLE,
-- but the result is deterministic for text[] + literal separator.
CREATE OR REPLACE FUNCTION authors_to_search_text(arr text[])
RETURNS text LANGUAGE sql IMMUTABLE AS $$
  SELECT lower(array_to_string(arr, ' '));
$$;

ALTER TABLE books
ADD COLUMN IF NOT EXISTS authors_search text
GENERATED ALWAYS AS (authors_to_search_text(authors)) STORED;
