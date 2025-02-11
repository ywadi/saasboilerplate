<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { toast } from '$lib/utils';

  onMount(async () => {
    // Get the hash from the URL
    const hash = window.location.hash.substring(1);
    
    // Parse the hash parameters
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const type = params.get('type');
    const refreshToken = params.get('refresh_token');

    if (accessToken && type === 'signup') {
      try {
        // Exchange tokens and set session
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });

        if (error) {
          throw error;
        }

        // Clear signup_pending cookie
        document.cookie = 'signup_pending=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        // Redirect to dashboard or home
        goto('/dashboard');
      } catch (error) {
        console.error('Email confirmation error:', error);
        toast.error('Email confirmation failed. Please try again.');
        goto('/login');
      }
    } else {
      // Invalid confirmation link
      toast.error('Invalid confirmation link');
      goto('/login');
    }
  });
</script>

<div class="space-y-6 text-center">
  <div class="space-y-2">
    <h2 class="text-2xl font-semibold tracking-tight">Confirming your email</h2>
    <p class="text-[hsl(var(--muted-foreground))]">Please wait while we verify your account...</p>
  </div>

  <div class="flex justify-center">
    <div class="animate-spin h-8 w-8 border-4 border-t-4 rounded-full border-[hsl(var(--border))] border-t-[hsl(var(--primary))]"></div>
  </div>
</div>
