-- Fix critical security issue: Remove public access to profiles table
-- Only authenticated users should be able to access profiles

-- Revoke all permissions from anon (unauthenticated) role
REVOKE ALL PRIVILEGES ON public.profiles FROM anon;

-- Revoke all permissions from public role
REVOKE ALL PRIVILEGES ON public.profiles FROM public;

-- Grant appropriate permissions only to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;

-- Ensure service_role maintains full access for admin operations
GRANT ALL PRIVILEGES ON public.profiles TO service_role;

-- Add a stronger policy to explicitly deny access to non-authenticated users
CREATE POLICY "deny_anon_access" ON public.profiles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Ensure the existing policies only work for authenticated users by adding explicit role restriction
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Recreate policies with explicit role restrictions
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE  
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);