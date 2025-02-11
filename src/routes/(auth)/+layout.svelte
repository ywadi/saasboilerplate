<script>
  let mouseX = 50;
  let mouseY = 50;

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  }
</script>

<div 
  class="min-h-screen bg-[hsl(var(--background))] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden"
  on:mousemove={handleMouseMove}
>
  <!-- Background Pattern -->
  <div class="absolute inset-0 bg-grid-white/[0.02] -z-10" />
  
  <!-- Spotlight Effect -->
  <div 
    class="pointer-events-none absolute inset-0 transition-all duration-500 ease-in-out"
    style="
      background: radial-gradient(
        1500px circle at {mouseX}px {mouseY}px,
        rgba(var(--primary-rgb), 0.25),
        rgba(var(--primary-rgb), 0.15) 30%,
        rgba(var(--primary-rgb), 0.05) 45%,
        rgba(var(--primary-rgb), 0) 60%
      )
    "
  />

  <!-- Additional Ambient Gradients -->
  <div class="absolute inset-0 bg-gradient-to-tr from-background/10 via-accent/5 to-primary/10 -z-10" />

  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <a href="/" class="flex items-center justify-center space-x-2 group">
      <div class="w-10 h-10 bg-[hsl(var(--primary))] rounded-xl flex items-center justify-center shadow-lg shadow-[hsl(var(--primary)_/_0.3)] transition-all duration-300 group-hover:shadow-[hsl(var(--primary)_/_0.4)] group-hover:scale-105">
        <span class="text-[hsl(var(--primary-foreground))] font-display font-bold text-xl">SB</span>
      </div>
      <span class="font-display font-semibold text-2xl">SaasBoiler</span>
    </a>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-[320px]">
    <div class="bg-[hsl(var(--card)_/_0.5)] backdrop-blur-xl py-6 px-4 shadow-xl sm:rounded-2xl sm:px-6 border border-[hsl(var(--border))] relative overflow-hidden transition-shadow duration-300 hover:shadow-[hsl(var(--primary)_/_0.1)]">
      <!-- Card Gradient Border -->
      <div class="absolute inset-[1px] rounded-2xl bg-gradient-to-tr from-background via-border/10 to-border/20 -z-10" />
      
      <!-- Card Spotlight -->
      <div 
        class="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={`background: radial-gradient(400px circle at ${mouseX}% ${mouseY}%, 
          hsl(var(--primary) / 0.1),
          transparent 40%
        )`}
      />
      
      <slot />
    </div>
  </div>
</div>

<style>
  .bg-grid-white {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
  }

  /* Add CSS Variable for RGB values of primary color */
  :global(:root) {
    --primary-rgb: 36, 194, 92; /* This should match your primary color */
  }
</style>
