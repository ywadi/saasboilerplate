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

## Authentication Flow

### Signup Process

#### Overview
The signup process is designed to provide a smooth user registration experience with email verification:

1. **User Registration**
   - Users fill out a comprehensive signup form with:
     - Full Name
     - Email Address
     - Company Name
     - Password (with confirmation)

2. **Client-Side Validation**
   - Real-time form validation includes:
     - Email format checking
     - Password length (minimum 6 characters)
     - Password confirmation match

3. **Server-Side Signup**
   - Uses Supabase authentication for user creation
   - Stores additional user profile information
   - Generates email verification link

4. **Email Verification**
   - After signup, users are redirected to `/verify` page
   - A `signup_pending` cookie is set to track the signup state
   - Users are instructed to check their email for a verification link

#### Key Implementation Details

##### Signup Form Validation
- Client-side reactive validation prevents submission of invalid forms
- Disables submit button until all fields are valid
- Provides immediate feedback on input errors

##### Error Handling
- Comprehensive error handling for various scenarios:
  - Missing form fields
  - Invalid email format
  - Password requirements
  - Supabase authentication errors

##### Security Considerations
- Passwords are never stored in plain text
- Uses Supabase's built-in authentication mechanisms
- Implements rate limiting for signup attempts

### Verification Page

#### Features
- Checks for `signup_pending` cookie to validate access
- Redirects to login if accessed without a pending signup
- Provides clear instructions for email verification
- Placeholder for future "Resend Verification Email" functionality

### Email Verification Flow

#### Overview
The email verification flow is designed to ensure users verify their email addresses before accessing the application:

1. **Signup Process**
   - After successful signup, users are redirected to `/verify?email=[their-email]`
   - The email parameter is passed securely using URL parameters
   - A `signup_pending` cookie is set to track verification state

2. **Verification Page**
   - Shows clear instructions with the user's email address
   - Provides a resend verification option using Supabase's built-in functionality
   - Displays loading states during resend operations
   - Prevents access without a valid `signup_pending` cookie

3. **Email Confirmation**
   - When users click the verification link in their email:
     - Validates the token from Supabase
     - Sets up the user session
     - Clears the `signup_pending` cookie
     - Redirects to the dashboard on success

4. **Error Handling**
   - Invalid verification links redirect to login with error message
   - Failed verification attempts show clear error messages
   - Rate limiting on resend verification attempts

#### Implementation Details

##### Verification Link Handling
```javascript
// Supabase auth configuration
emailRedirectTo: `${url.origin}/confirm`
```

##### Resend Verification
Uses Supabase's auth.resend() method:
```javascript
await supabase.auth.resend({
  type: 'signup',
  email: userEmail
})
```

#### Security Considerations
- Email parameter is URL encoded to prevent injection
- Verification state tracked via httpOnly cookie
- Server-side validation of all verification attempts
- Automatic session cleanup for expired verifications

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
