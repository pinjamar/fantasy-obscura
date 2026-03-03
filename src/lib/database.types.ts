export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          name: string;
          slug: string;
          bio: string | null;
          photo_url: string | null;
          website: string | null;
          twitter: string | null;
          goodreads: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          bio?: string | null;
          photo_url?: string | null;
          website?: string | null;
          twitter?: string | null;
          goodreads?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          bio?: string | null;
          photo_url?: string | null;
          website?: string | null;
          twitter?: string | null;
          goodreads?: string | null;
          created_at?: string;
        };
      };
      book_tags: {
        Row: {
          id: string;
          book_id: string;
          tag_slug: string;
          tag_name: string;
          user_id: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          tag_slug: string;
          tag_name: string;
          user_id: string;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          tag_slug?: string;
          tag_name?: string;
          user_id?: string;
          approved?: boolean;
          created_at?: string;
        };
      };
      books: {
        Row: {
          id: string;
          title: string;
          slug: string | null;
          authors: string[] | null;
          cover_url: string | null;
          isbn: string | null;
          synopsis: string | null;
          page_count: number | null;
          publication_year: number | null;
          avg_rating: number | null;
          audience: string | null;
          subgenres: string[] | null;
          tropes: string[] | null;
          magic_system: string | null;
          tone: string[] | null;
          pacing: string | null;
          heat_level: string | null;
          diversity_rep: string[] | null;
          series: string | null;
          series_number: number | null;
          darkness_level: number | null;
          audiobook_available: boolean | null;
          audiobook_narrator: string | null;
          audiobook_narrator_rating: string | null;
          audiobook_hours: number | null;
          audiobook_audible_url: string | null;
          unique_angle: string | null;
          ideal_reader: string | null;
          reading_experience: string | null;
          accessibility: string | null;
          awards: string[] | null;
          stakes: string | null;
          series_status: string | null;
          pov_style: string | null;
          pov_count: string | null;
          protagonist_gender: string | null;
          content_warnings: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug?: string | null;
          authors?: string[] | null;
          cover_url?: string | null;
          isbn?: string | null;
          synopsis?: string | null;
          page_count?: number | null;
          publication_year?: number | null;
          avg_rating?: number | null;
          audience?: string | null;
          subgenres?: string[] | null;
          tropes?: string[] | null;
          magic_system?: string | null;
          tone?: string[] | null;
          pacing?: string | null;
          heat_level?: string | null;
          diversity_rep?: string[] | null;
          series?: string | null;
          series_number?: number | null;
          darkness_level?: number | null;
          audiobook_available?: boolean | null;
          audiobook_narrator?: string | null;
          audiobook_narrator_rating?: string | null;
          audiobook_hours?: number | null;
          audiobook_audible_url?: string | null;
          unique_angle?: string | null;
          ideal_reader?: string | null;
          reading_experience?: string | null;
          accessibility?: string | null;
          awards?: string[] | null;
          stakes?: string | null;
          series_status?: string | null;
          pov_style?: string | null;
          pov_count?: string | null;
          protagonist_gender?: string | null;
          content_warnings?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string | null;
          authors?: string[] | null;
          cover_url?: string | null;
          isbn?: string | null;
          synopsis?: string | null;
          page_count?: number | null;
          publication_year?: number | null;
          avg_rating?: number | null;
          audience?: string | null;
          subgenres?: string[] | null;
          tropes?: string[] | null;
          magic_system?: string | null;
          tone?: string[] | null;
          pacing?: string | null;
          heat_level?: string | null;
          diversity_rep?: string[] | null;
          series?: string | null;
          series_number?: number | null;
          darkness_level?: number | null;
          audiobook_available?: boolean | null;
          audiobook_narrator?: string | null;
          audiobook_narrator_rating?: string | null;
          audiobook_hours?: number | null;
          audiobook_audible_url?: string | null;
          unique_angle?: string | null;
          ideal_reader?: string | null;
          reading_experience?: string | null;
          accessibility?: string | null;
          awards?: string[] | null;
          stakes?: string | null;
          series_status?: string | null;
          pov_style?: string | null;
          pov_count?: string | null;
          protagonist_gender?: string | null;
          content_warnings?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
