<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { toast } from '$lib/utils';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';

  let isResending = false;
  let email = $page.url.searchParams.get('email');

  onMount(() => {
    if (browser) {
      const signupPending = document.cookie.includes('signup_pending=true');
      if (!signupPending) {
        goto('/login');
      }
    }
  });

  function handleResend() {
    return async ({ result }) => {
      isResending = false;
      
      if (result.type === 'failure') {
        toast.error(result.data?.error || 'Failed to resend verification email');
      } else if (result.type === 'success') {
        toast.success('Verification email resent successfully');
      }
    };
  }
</script>

<div class="space-y-6">
  <div class="space-y-2">
    <h2 class="text-2xl font-semibold tracking-tight">Check your email</h2>
    <p class="text-[hsl(var(--muted-foreground))]">
      We've sent you a verification email. Click the link to activate your account.
    </p>
  </div>

  <div class="bg-[hsl(var(--muted)_/_0.1)] border border-[hsl(var(--border))] rounded-lg p-4">
    <div class="flex gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[hsl(var(--primary))] h-5 w-5 mt-0.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
      <div>
        <h4 class="text-sm font-medium mb-2">Next steps:</h4>
        <ul class="text-[hsl(var(--muted-foreground))] text-sm space-y-1">
          <li>• Check your email inbox ({email})</li>
          <li>• Click the verification link</li>
          <li>• Return to sign in</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="space-y-3">
    <form 
      method="POST" 
      action="?/resend"
      use:enhance={handleResend}
      class="contents"
    >
      <input type="hidden" name="email" value={email} />
      <button
        class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[hsl(var(--muted)_/_0.3)] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted)_/_0.4)] border border-[hsl(var(--border))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isResending}
      >
        {#if isResending}
          <div class="animate-spin h-4 w-4 border-2 border-t-2 rounded-full border-[hsl(var(--border))] border-t-[hsl(var(--primary))]"></div>
          Resending...
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
          </svg>
          Resend verification email
        {/if}
      </button>
    </form>

    <a
      href="/login"
      class="flex items-center justify-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
        <path d="m15 18-6-6 6-6" />
      </svg>
      Back to login
    </a>
  </div>
</div>
