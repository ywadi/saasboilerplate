<script>
  let fullName = '';
  let email = '';
  let company = '';
  let password = '';
  let confirmPassword = '';
  let isLoading = false;

  $: passwordsMatch = password === confirmPassword;

  const handleSubmit = async () => {
    if (!passwordsMatch) return;
    isLoading = true;
    // TODO: Implement signup logic
    isLoading = false;
  };
</script>

<div class="space-y-6">
  <div class="space-y-2">
    <h2 class="text-2xl font-display font-bold text-center">Create your account</h2>
    <p class="text-sm text-[hsl(var(--muted-foreground))] text-center">
      Already have an account?
      <a href="/login" class="font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)_/_0.9)]">Sign in</a>
    </p>
  </div>

  <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
    <div class="space-y-4">
      <div class="space-y-1">
        <label for="fullName" class="text-sm font-medium">Full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autocomplete="name"
          required
          placeholder="John Doe"
          bind:value={fullName}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
        />
      </div>

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
        <label for="company" class="text-sm font-medium">Company name</label>
        <input
          id="company"
          name="company"
          type="text"
          autocomplete="organization"
          required
          placeholder="Acme Inc."
          bind:value={company}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
        />
      </div>

      <div class="space-y-1">
        <label for="password" class="text-sm font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="new-password"
          required
          placeholder="••••••••"
          bind:value={password}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
        />
      </div>

      <div class="space-y-1">
        <label for="confirmPassword" class="text-sm font-medium">Confirm password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autocomplete="new-password"
          required
          placeholder="••••••••"
          bind:value={confirmPassword}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent {!passwordsMatch && confirmPassword ? 'border-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]' : ''}"
        />
        {#if !passwordsMatch && confirmPassword}
          <p class="text-sm text-[hsl(var(--destructive))]">Passwords do not match</p>
        {/if}
      </div>
    </div>

    <button
      type="submit"
      disabled={isLoading || !passwordsMatch}
      class="w-full relative flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)_/_0.9)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[0.98]"
    >
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <span class="opacity-0">Create account</span>
      {:else}
        Create account
      {/if}
    </button>
  </form>
</div>
