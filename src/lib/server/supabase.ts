import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { SERVICE_ROLE_KEY } from '$env/static/private';

// Create supabase client for server-side operations (with service role)
export const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Create supabase client for client-side operations (with anon key)
export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
