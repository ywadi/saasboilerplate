<script>
  import { enhance } from '$app/forms';
  import { toast } from '$lib/utils';
  import { goto } from '$app/navigation';

  export let form;

  let fullName = form?.fullName ?? '';
  let email = form?.email ?? '';
  let company = form?.company ?? '';
  let password = '';
  let confirmPassword = '';
  let isLoading = false;

  $: passwordsMatch = password === confirmPassword;
  $: isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  $: isValidPassword = password.length >= 6;
  $: canSubmit = fullName && isValidEmail && isValidPassword && passwordsMatch && !isLoading;

  $: if (form?.error) {
    toast.error(form.error);
  }

  // Attempt to redirect if signup is successful
  $: if (form) {
    console.log('Form state:', form);
  }
</script>

<div class="space-y-6">
  <div class="space-y-2">
    <h2 class="text-2xl font-display font-bold text-center">Create your account</h2>
    <p class="text-sm text-[hsl(var(--muted-foreground))] text-center">
      Already have an account?
      <a href="/login" class="font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)_/_0.9)]">Sign in</a>
    </p>
  </div>

  <form 
    method="POST" 
    action="?/signup"
    class="space-y-4"
    use:enhance={() => {
      isLoading = true;
      return async ({ result, update }) => {
        // Force update to get the latest form state
        await update();

        // Log the result for debugging
        console.log('Form submission result:', result);

        isLoading = false;

        // Check if there's a redirect needed
        if (result.type === 'redirect') {
          console.log('Redirecting to:', result.location);
          await goto(result.location);
        }
      };
    }}
  >
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
          disabled={isLoading}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
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
          placeholder="john@example.com"
          bind:value={email}
          disabled={isLoading}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
        />
        {#if email && !isValidEmail}
          <p class="text-xs text-[hsl(var(--destructive))]">Please enter a valid email address</p>
        {/if}
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
          autocomplete="new-password"
          required
          bind:value={password}
          disabled={isLoading}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
        />
        {#if password && !isValidPassword}
          <p class="text-xs text-[hsl(var(--destructive))]">Password must be at least 6 characters</p>
        {/if}
      </div>

      <div class="space-y-1">
        <label for="confirmPassword" class="text-sm font-medium">Confirm password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autocomplete="new-password"
          required
          bind:value={confirmPassword}
          disabled={isLoading}
          class="flex w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background)_/_0.5)] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
        />
        {#if confirmPassword && !passwordsMatch}
          <p class="text-xs text-[hsl(var(--destructive))]">Passwords do not match</p>
        {/if}
      </div>
    </div>

    <button
      type="submit"
      disabled={!canSubmit}
      class="inline-flex w-full items-center justify-center rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(var(--primary)_/_0.9)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {#if isLoading}
        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Creating account...
      {:else}
        Create account
      {/if}
    </button>
  </form>
</div>
