-- Drop the username column
ALTER TABLE profiles DROP COLUMN IF EXISTS username;

-- Make sure email constraints are properly set
DO $$ 
BEGIN
    -- Drop the existing constraint if it exists
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_email_unique'
    ) THEN
        ALTER TABLE profiles DROP CONSTRAINT profiles_email_unique;
    END IF;
    
    -- Add the constraint
    ALTER TABLE profiles ADD CONSTRAINT profiles_email_unique UNIQUE (email);
    
    -- Set NOT NULL if not already set
    ALTER TABLE profiles ALTER COLUMN email SET NOT NULL;
END $$;
