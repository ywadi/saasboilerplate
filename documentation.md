# SvelteKit SaaS Boilerplate Documentation

## Project Structure
```
src/
├── lib/               # Shared components and utilities
│   ├── components/    # Reusable Svelte components
│   │   ├── ui/       # UI components (buttons, forms, etc.)
│   │   └── layout/   # Layout components
│   ├── server/       # Server-side code
│   │   ├── db/       # Database related code
│   │   └── auth/     # Authentication related code
│   ├── utils/        # Utility functions
│   └── stores/       # Svelte stores
├── routes/           # SvelteKit routes (pages)
│   ├── (auth)/      # Authentication related routes
│   ├── (app)/       # Protected application routes
│   └── (marketing)/ # Public marketing pages
└── styles/          # Global styles and Tailwind configurations
```

## Tech Stack
- SvelteKit (without TypeScript)
- Tailwind CSS for styling
- Supabase for:
  - Database
  - Authentication
  - Storage
  - Realtime features
- PNPM as package manager

## Development Practices
- Route grouping using parentheses notation for better organization
- Server-side code kept separate in lib/server
- Component-first development approach
- Proper error handling and loading states
- Progressive enhancement where possible

## Supabase Integration

### Directory Structure
```
supabase/
├── migrations/    # SQL migration files
├── types/        # Database type definitions
└── seed/         # Seed data for development
```

### Authentication
The project uses Supabase Authentication with server-side rendering (SSR) support. The setup includes:
- Server-side hooks for session management
- Protected routes in the `(app)` directory
- Separate admin and client Supabase instances

### Environment Variables
Required environment variables:
```
PUBLIC_SUPABASE_URL=your-project-url
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SERVICE_ROLE_KEY=your-service-role-key
```

### Database Migrations
- Store all database migrations in `supabase/migrations/`
- Use timestamp prefixes for migration files (e.g., `20240211_initial_schema.sql`)
- Each migration should be idempotent
- Include both "up" and "down" migrations

### Best Practices
1. Use the service role key (`supabaseAdmin`) only in server-side code
2. Keep database types in sync with Supabase schema
3. Use Row Level Security (RLS) policies for data access control
4. Handle authentication state changes properly
5. Use environment variables for configuration
6. Keep migrations versioned and documented

## Styling and Theme

### CSS Variables and Tailwind
The project uses HSL CSS variables for theming, defined in `src/app.css`. When using these variables in Tailwind classes, use the following syntax:

```css
/* For borders */
border-[hsl(var(--border))]

/* For backgrounds */
bg-[hsl(var(--background))]

/* For text colors */
text-[hsl(var(--foreground))]

/* For opacity variations */
bg-[hsl(var(--primary)_/_0.9)]  /* 90% opacity */
bg-[hsl(var(--primary)_/_0.1)]  /* 10% opacity */
```

This ensures proper CSS variable interpolation in Tailwind's JIT compiler.

### Theme Colors
The theme uses a dark color scheme with HSL values:
- Background: `240 10% 3.9%`
- Primary: `142 76% 36%` (green accent)
- Text: `0 0% 98%`
- Borders: `240 3.7% 15.9%`

## Updates
This documentation will be continuously updated as the project evolves.
