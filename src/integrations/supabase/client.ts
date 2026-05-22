// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Fallback to hardcoded values so the app works even when env vars
// are not injected by the build platform (e.g. Lovable production).
// The anon key is intentionally public — data is protected by Supabase RLS.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://zdaoeuthpztxonytbcww.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYW9ldXRocHp0eG9ueXRiY3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQyMzQsImV4cCI6MjA3MDc3MDIzNH0.7ww6j9lgyrQfxOP825gM-1S3M9QboMojamNHJYWe2as';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
