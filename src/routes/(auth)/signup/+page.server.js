import { supabaseAdmin } from '$lib/server/supabase';
import { fail, redirect } from '@sveltejs/kit';

// Track signup attempts to help diagnose rate limiting
const signupAttempts = new Map();

export const actions = {
  signup: async (event) => {
    const { cookies, request, url } = event;
    
    // Detailed logging setup
    console.log('Signup Process Started', {
      timestamp: new Date().toISOString(),
      url: url.toString()
    });

    try {
      const formData = await request.formData();
      const email = formData.get('email');
      const password = formData.get('password');
      const fullName = formData.get('fullName');
      const company = formData.get('company');

      // Get client IP for tracking
      const clientIp = event.getClientAddress();

      // Validate input
      if (!email || !password || !fullName || !company) {
        console.error('Signup Validation Error: Missing Fields', {
          email: !!email,
          password: !!password,
          fullName: !!fullName,
          company: !!company
        });

        return fail(400, { 
          error: 'All fields are required',
          email,
          fullName,
          company
        });
      }

      // Rate limit tracking
      const now = Date.now();
      const ipAttempts = signupAttempts.get(clientIp) || [];
      
      // Remove attempts older than 1 hour
      const recentAttempts = ipAttempts.filter(time => now - time < 3600000);
      
      // Limit to 5 attempts per hour
      if (recentAttempts.length >= 5) {
        console.error('Signup Rate Limit Exceeded', {
          ip: clientIp,
          attempts: recentAttempts.length
        });

        return fail(429, { 
          error: 'Too many signup attempts. Please wait an hour before trying again.',
          email,
          fullName,
          company
        });
      }

      // Record this attempt
      recentAttempts.push(now);
      signupAttempts.set(clientIp, recentAttempts);

      // Log signup attempt
      console.log('Attempting Supabase Signup', {
        email,
        fullName,
        company
      });

      // Create user with Supabase admin
      const { data, error: authError } = await supabaseAdmin.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: company
          },
          emailRedirectTo: `${url.origin}/confirm`
        }
      });

      // Log authentication result
      console.log('Supabase Signup Result', {
        data: !!data,
        error: authError
      });

      // Handle authentication errors
      if (authError) {
        console.error('Signup Auth Error:', {
          message: authError.message,
          email: email
        });

        let errorMessage = 'Signup failed';
        
        switch (authError.message) {
          case 'Email rate limit exceeded':
            errorMessage = 'Email verification limit reached. Please wait before trying again.';
            break;
          case 'User already exists':
            errorMessage = 'An account with this email already exists.';
            break;
          default:
            errorMessage = authError.message || 'An unexpected error occurred';
        }

        return fail(400, { 
          error: errorMessage,
          email,
          fullName,
          company
        });
      }

      // Ensure user was created
      if (!data?.user) {
        console.error('User Creation Failed: No User Data', {
          data
        });

        return fail(400, { 
          error: 'User creation failed',
          email,
          fullName,
          company
        });
      }

      // Log user creation
      console.log('User Created Successfully', {
        userId: data.user.id,
        email: data.user.email
      });

      // Insert profile data
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          company_name: company,
          email: email
        });

      // Log profile creation
      if (profileError) {
        console.error('Profile Creation Error:', {
          message: profileError.message,
          email: email
        });

        return fail(400, { 
          error: 'Failed to create user profile. Please try again.',
          email,
          fullName,
          company
        });
      }

      // Set signup pending cookie
      cookies.set('signup_pending', 'true', {
        path: '/',
        httpOnly: false,
        maxAge: 60 * 30 // 30 minutes
      });

      // Log redirect attempt
      console.log('Attempting Redirect to /verify', {
        email: email
      });

      // Explicitly throw redirect with email parameter
      throw redirect(303, `/verify?email=${encodeURIComponent(email)}`);
    } catch (error) {
      // Detailed error logging
      console.error('Unexpected Signup Error', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      // If it's a redirect, rethrow
      if (error.status === 303 || error.status === 302) {
        throw error;
      }

      // Return fail for other errors
      return fail(500, { 
        error: 'An unexpected error occurred. Please try again later.',
        email,
        fullName,
        company
      });
    }
  }
};
