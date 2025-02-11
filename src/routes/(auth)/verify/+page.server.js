import { fail } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase';

export const actions = {
  resend: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email) {
      return fail(400, {
        error: 'Email is required'
      });
    }

    try {
      console.log('Server: Attempting to resend verification to:', email);

      const { data, error } = await supabaseAdmin.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${request.url.origin}/confirm`
        }
      });

      console.log('Server: Resend response:', { data, error });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Server: Failed to resend verification:', {
        error,
        message: error.message,
        email
      });

      return fail(500, {
        error: error.message || 'Failed to resend verification email'
      });
    }
  }
};
