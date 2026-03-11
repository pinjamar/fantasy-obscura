-- Add position column for drag-and-drop ordering within shelves
ALTER TABLE user_shelves ADD COLUMN IF NOT EXISTS position integer NOT NULL DEFAULT 0;

-- Initialize positions from created_at order per user+shelf
UPDATE user_shelves us
SET position = sub.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id, shelf ORDER BY created_at ASC) - 1 AS rn
  FROM user_shelves
) sub
WHERE us.id = sub.id;
