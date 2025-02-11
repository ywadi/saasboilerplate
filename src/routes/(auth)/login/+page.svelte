<script>
  let email = '';
  let password = '';
  let isLoading = false;

  const handleSubmit = async () => {
    isLoading = true;
    // TODO: Implement login logic
    isLoading = false;
  };
</script>

<div class="space-y-6">
  <div class="space-y-2">
    <h2 class="text-2xl font-display font-bold text-center">Welcome back</h2>
    <p class="text-sm text-[hsl(var(--muted-foreground))] text-center">
      Don't have an account?
      <a href="/signup" class="font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)_/_0.9)]">Sign up</a>
    </p>
  </div>

  <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
    <div class="space-y-4">
      <div class="space-y-1">
        <label for="email" class="text-sm font-medium">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          placeholder="name@company.com"
          bind:value={email}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
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
          placeholder="••••••••"
          bind:value={password}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
        />
      </div>
    </div>

    <button
      type="submit"
      disabled={isLoading}
      class="w-full relative flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)_/_0.9)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[0.98]"
    >
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <span class="opacity-0">Sign in</span>
      {:else}
        Sign in
      {/if}
    </button>
  </form>
</div>
