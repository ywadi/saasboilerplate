export const load = async ({ cookies }) => {
  const signupPending = cookies.get('signup_pending');
  const emailConfirmed = cookies.get('email_confirmed');
  
  // Clear the cookies after reading
  if (signupPending) {
    cookies.delete('signup_pending', { path: '/' });
  }
  if (emailConfirmed) {
    cookies.delete('email_confirmed', { path: '/' });
  }

  return {
    signupPending: signupPending === 'true',
    emailConfirmed: emailConfirmed === 'true'
  };
};
