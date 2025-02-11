<script>
  import { ArrowRight, Sparkles, Rocket, Shield } from 'lucide-svelte';
</script>

<section class="relative pt-32 pb-16 overflow-hidden">
  <!-- Background gradient -->
  <div class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)_/_0.05)] via-[hsl(var(--background))] to-[hsl(var(--background))]" />
  
  <!-- Grid pattern -->
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />

  <div class="container relative">
    <!-- Main content -->
    <div class="text-center space-y-8 max-w-4xl mx-auto">
      <div class="space-y-4">
        <h1 class="text-4xl md:text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)_/_0.5)]">
          Launch Your SaaS Faster Than Ever
        </h1>
        <p class="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          A modern, production-ready boilerplate for building scalable SaaS applications. Start with best practices, focus on your product.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/signup" class="px-8 py-3 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)_/_0.9)] transition-colors flex items-center gap-2 group">
          Get Started
          <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="#features" class="px-8 py-3 rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary)_/_0.5)] transition-colors">
          Learn More
        </a>
      </div>

      <!-- Feature badges -->
      <div class="flex flex-wrap justify-center gap-4 pt-8">
        <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--secondary)_/_0.5)] border border-[hsl(var(--border))]">
          <Sparkles class="w-4 h-4 text-[hsl(var(--primary))]" />
          <span class="text-sm">Modern Stack</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--secondary)_/_0.5)] border border-[hsl(var(--border))]">
          <Rocket class="w-4 h-4 text-[hsl(var(--primary))]" />
          <span class="text-sm">Production Ready</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--secondary)_/_0.5)] border border-[hsl(var(--border))]">
          <Shield class="w-4 h-4 text-[hsl(var(--primary))]" />
          <span class="text-sm">Best Practices</span>
        </div>
      </div>
    </div>

    <!-- Floating cards -->
    <div class="mt-16 relative">
      <div class="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent z-10" />
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Card 1 -->
        <div class="animate-float bg-[hsl(var(--card))] rounded-xl p-6 border border-[hsl(var(--border))] shadow-xl">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-lg bg-[hsl(var(--primary)_/_0.1)] flex items-center justify-center">
              <Sparkles class="w-6 h-6 text-[hsl(var(--primary))]" />
            </div>
            <h3 class="text-lg font-display font-semibold">Modern Tech Stack</h3>
            <p class="text-[hsl(var(--muted-foreground))]">Built with SvelteKit, Tailwind, and Supabase for a powerful development experience.</p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="animate-float [animation-delay:200ms] bg-[hsl(var(--card))] rounded-xl p-6 border border-[hsl(var(--border))] shadow-xl">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-lg bg-[hsl(var(--primary)_/_0.1)] flex items-center justify-center">
              <Rocket class="w-6 h-6 text-[hsl(var(--primary))]" />
            </div>
            <h3 class="text-lg font-display font-semibold">Production Ready</h3>
            <p class="text-[hsl(var(--muted-foreground))]">Enterprise-grade architecture with authentication, database, and deployment configured.</p>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="animate-float [animation-delay:400ms] bg-[hsl(var(--card))] rounded-xl p-6 border border-[hsl(var(--border))] shadow-xl">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-lg bg-[hsl(var(--primary)_/_0.1)] flex items-center justify-center">
              <Shield class="w-6 h-6 text-[hsl(var(--primary))]" />
            </div>
            <h3 class="text-lg font-display font-semibold">Best Practices</h3>
            <p class="text-[hsl(var(--muted-foreground))]">Following industry standards for security, performance, and maintainability.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
