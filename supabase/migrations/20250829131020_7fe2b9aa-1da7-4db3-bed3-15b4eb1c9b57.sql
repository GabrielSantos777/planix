-- Enhanced security fix for profiles table
-- Address all potential vulnerabilities in RLS policies

-- First, ensure we have a clean slate by dropping existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "deny_anon_access" ON public.profiles;

-- Create a restrictive policy that explicitly denies all access to anon users
CREATE POLICY "block_anonymous_access" ON public.profiles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Create secure policies for authenticated users only
-- Each policy explicitly checks that user is authenticated AND accessing own data
CREATE POLICY "authenticated_users_select_own_profile" ON public.profiles
FOR SELECT
TO authenticated
USING (
    auth.uid() IS NOT NULL 
    AND auth.uid() = user_id
);

CREATE POLICY "authenticated_users_insert_own_profile" ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.uid() = user_id
    AND auth.email() IS NOT NULL
);

CREATE POLICY "authenticated_users_update_own_profile" ON public.profiles
FOR UPDATE
TO authenticated
USING (
    auth.uid() IS NOT NULL 
    AND auth.uid() = user_id
)
WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.uid() = user_id
);

-- Ensure no DELETE policy exists unless specifically needed
DROP POLICY IF EXISTS "authenticated_users_delete_own_profile" ON public.profiles;

-- Add additional constraint to prevent NULL user_id insertions
ALTER TABLE public.profiles 
ALTER COLUMN user_id SET NOT NULL;

-- Create a function to validate profile access (security definer for consistent behavior)
CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (auth.uid() IS NOT NULL AND auth.uid() = profile_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Grant execute permission only to authenticated users
GRANT EXECUTE ON FUNCTION public.is_profile_owner(UUID) TO authenticated;
REVOKE ALL ON FUNCTION public.is_profile_owner(UUID) FROM anon, public;