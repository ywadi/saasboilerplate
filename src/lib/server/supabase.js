import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

// Create supabase admin client for server-side operations
export const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, import.meta.env.VITE_SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
