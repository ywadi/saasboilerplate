-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own profile" ON profiles;

-- Create comprehensive policies
CREATE POLICY "Allow profile creation during signup"
    ON profiles FOR INSERT
    WITH CHECK (
        -- Allow insertion if the ID matches the authenticated user
        auth.uid() = id OR 
        -- Or if no authenticated user exists (for signup process)
        auth.uid() IS NULL
    );

CREATE POLICY "Users can view and update their own profile"
    ON profiles FOR ALL
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);
