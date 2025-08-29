-- Fix cross-user data access vulnerability in subscribers table
-- The email-based conditions allow potential cross-user access

-- Drop existing vulnerable policies
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "authenticated_users_can_insert_own_subscription" ON public.subscribers;

-- Create secure policies that only use user_id matching
CREATE POLICY "authenticated_users_select_own_subscription" ON public.subscribers
FOR SELECT
TO authenticated
USING (
    auth.uid() IS NOT NULL 
    AND user_id = auth.uid()
);

CREATE POLICY "authenticated_users_update_own_subscription" ON public.subscribers
FOR UPDATE
TO authenticated
USING (
    auth.uid() IS NOT NULL 
    AND user_id = auth.uid()
)
WITH CHECK (
    auth.uid() IS NOT NULL 
    AND user_id = auth.uid()
);

CREATE POLICY "authenticated_users_insert_own_subscription" ON public.subscribers
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() IS NOT NULL 
    AND user_id = auth.uid()
);

-- Ensure user_id is not nullable to prevent bypassing security
ALTER TABLE public.subscribers 
ALTER COLUMN user_id SET NOT NULL;