<script>
  import Hero from '$lib/components/ui/Hero.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { toast } from '$lib/utils';

  onMount(() => {
    // Check for hash fragment
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      handleEmailConfirmation();
    }
  });

  async function handleEmailConfirmation() {
    try {
      // Get the hash parameters
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');

      if (accessToken && type === 'signup') {
        // Verify the token
        const { data, error } = await supabase.auth.getUser(accessToken);
        if (error) throw error;

        // Set cookie for success message
        document.cookie = 'email_confirmed=true; path=/; max-age=300'; // 5 minutes

        // Redirect to login
        goto('/login');
      }
    } catch (error) {
      console.error('Email confirmation error:', error);
      toast.error('Email confirmation failed. Please try again.');
      goto('/login');
    }
  }
</script>

<Hero />
