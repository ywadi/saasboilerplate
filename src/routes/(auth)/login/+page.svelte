<script>
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { toast } from '$lib/utils';
  import { browser } from '$app/environment';

  export let data;

  let email = '';
  let password = '';
  let isLoading = false;

  // Show messages only in browser
  $: if (browser) {
    if (data.signupPending) {
      toast.info('Please verify your email before signing in.');
    }
    if (data.emailConfirmed) {
      toast.success('Email verified successfully! You can now sign in.');
    }
  }

  async function handleLogin() {
    try {
      isLoading = true;
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (loginData.user) {
        toast.success('Login successful!');
        goto('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('Email not confirmed')) {
        toast.error('Please verify your email before signing in.');
      } else {
        toast.error(error.message || 'Login failed');
      }
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="space-y-6">
  <div class="space-y-2">
    <h2 class="text-2xl font-display font-bold text-center">Log in to your account</h2>
    <p class="text-sm text-[hsl(var(--muted-foreground))] text-center">
      Don't have an account?
      <a href="/signup" class="font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)_/_0.9)]">Sign up</a>
    </p>
  </div>

  <form class="space-y-4" on:submit|preventDefault={handleLogin}>
    <div class="space-y-4">
      <div class="space-y-1">
        <label for="email" class="text-sm font-medium">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          placeholder="john@example.com"
          bind:value={email}
          disabled={isLoading}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div class="space-y-1">
        <label for="password" class="text-sm font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          bind:value={password}
          disabled={isLoading}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>

    <button
      type="submit"
      disabled={isLoading}
      class="inline-flex w-full items-center justify-center rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(var(--primary)_/_0.9)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {#if isLoading}
        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Logging in...
      {:else}
        Log in
      {/if}
    </button>
  </form>
</div>
