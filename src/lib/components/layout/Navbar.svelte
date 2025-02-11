<script>
  import { Menu, X, Github } from 'lucide-svelte';
  let isOpen = false;
</script>

<nav class="fixed top-0 w-full z-50 bg-[hsl(var(--background)_/_0.8)] backdrop-blur-xl border-b border-[hsl(var(--border))]">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center">
            <span class="text-[hsl(var(--primary-foreground))] font-display font-bold">SB</span>
          </div>
          <span class="font-display font-semibold text-xl">SaasBoiler</span>
        </a>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="#features" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Features</a>
        <a href="#pricing" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Pricing</a>
        <a href="https://github.com" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors flex items-center space-x-1">
          <Github class="w-4 h-4" />
          <span>GitHub</span>
        </a>
        <a href="/login" class="px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)_/_0.9)] transition-colors">
          Sign In
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button
          on:click={() => isOpen = !isOpen}
          class="inline-flex items-center justify-center p-2 rounded-md text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background)_/_0.9)]"
        >
          {#if isOpen}
            <X class="w-6 h-6" />
          {:else}
            <Menu class="w-6 h-6" />
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isOpen}
    <div class="md:hidden bg-[hsl(var(--background))] border-b border-[hsl(var(--border))]">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#features" class="block px-3 py-2 rounded-md text-base font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary)_/_0.5)]">
          Features
        </a>
        <a href="#pricing" class="block px-3 py-2 rounded-md text-base font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary)_/_0.5)]">
          Pricing
        </a>
        <a href="https://github.com" class="block px-3 py-2 rounded-md text-base font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary)_/_0.5)] flex items-center space-x-2">
          <Github class="w-4 h-4" />
          <span>GitHub</span>
        </a>
        <a href="/login" class="block px-3 py-2 rounded-md text-base font-medium bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)_/_0.9)]">
          Sign In
        </a>
      </div>
    </div>
  {/if}
</nav>
