import { supabaseClient } from '../supabaseClient';

export type BookTag = {
  id: string;
  tag_slug: string;
  tag_name: string;
  created_at: string;
};

/**
 * Fetch approved community tags for a book.
 */
export async function getApprovedTags(bookId: string): Promise<BookTag[]> {
  const { data, error } = await supabaseClient
    .from('book_tags')
    .select('id, tag_slug, tag_name, created_at')
    .eq('book_id', bookId)
    .eq('approved', true)
    .order('created_at', { ascending: true });

  if (error) return [];
  return (data as BookTag[]) ?? [];
}

/**
 * Submit a community tag. Silently ignores duplicate (same book + tag + user).
 */
export async function submitTag(
  bookId: string,
  tagSlug: string,
  tagName: string,
  userId: string,
): Promise<{ error: string | null }> {
  const { error } = await supabaseClient.from('book_tags').insert({
    book_id: bookId,
    tag_slug: tagSlug,
    tag_name: tagName,
    user_id: userId,
  });

  // 23505 = unique_violation — user already submitted this tag for this book
  if (error && error.code !== '23505') {
    return { error: error.message };
  }
  return { error: null };
}
