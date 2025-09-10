-- Fix security vulnerability in profiles table RLS policies
-- The current block_anonymous_access policy is PERMISSIVE which doesn't effectively block anonymous access
-- We need to restructure the policies to ensure robust security

-- First, drop the existing problematic policy
DROP POLICY IF EXISTS "block_anonymous_access" ON public.profiles;

-- Create a restrictive policy that explicitly denies all anonymous access
CREATE POLICY "deny_anonymous_access" 
ON public.profiles 
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Ensure the existing authenticated user policies are properly scoped
-- Drop and recreate them to ensure they only work for authenticated users

DROP POLICY IF EXISTS "authenticated_users_select_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "authenticated_users_insert_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "authenticated_users_update_own_profile" ON public.profiles;

-- Recreate policies with stronger security checks
CREATE POLICY "authenticated_users_select_own_profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND auth.uid() = user_id
);

CREATE POLICY "authenticated_users_insert_own_profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND auth.uid() = user_id 
  AND auth.email() IS NOT NULL
);

CREATE POLICY "authenticated_users_update_own_profile" 
ON public.profiles 
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

-- Add a policy to prevent any DELETE operations on profiles for extra security
CREATE POLICY "prevent_profile_deletion" 
ON public.profiles 
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (false);