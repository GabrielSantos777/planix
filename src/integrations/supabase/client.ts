// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    '[Supabase] Missing environment variables. ' +
    'Make sure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in your .env file.'
  );
}

export const supabase = createClient<Database>(
  SUPABASE_URL || '',
  SUPABASE_PUBLISHABLE_KEY || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
