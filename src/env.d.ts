/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: import('@supabase/supabase-js').User | null;
    userProfile: { display_name: string | null; avatar_url: string | null } | null;
  }
}
