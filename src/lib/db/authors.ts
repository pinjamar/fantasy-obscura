import { supabaseClient } from '../supabaseClient';

export type AuthorProfile = {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  photo_url: string | null;
  website: string | null;
  twitter: string | null;
  goodreads: string | null;
};

export async function getAuthorProfile(slug: string): Promise<AuthorProfile | null> {
  const { data, error } = await supabaseClient
    .from('authors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data as AuthorProfile;
}
