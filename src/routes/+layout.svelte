<script>
  import '../app.css';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  let { children } = $props();
</script>

<div class="min-h-screen bg-background text-foreground antialiased">
  <Navbar />
  <main>
    {@render children()}
  </main>
</div>
