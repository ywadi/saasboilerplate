<script>
  import '../app.css';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import { Toaster } from 'svelte-sonner';
  let { children } = $props();
</script>

<div class="min-h-screen bg-background text-foreground antialiased">
  <Navbar />
  <Toaster richColors closeButton position="top-right" />
  <main>
    <slot />
  </main>
</div>
