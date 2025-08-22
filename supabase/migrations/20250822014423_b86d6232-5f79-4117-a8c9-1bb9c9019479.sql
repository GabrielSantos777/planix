-- Fix security issue: Restrict INSERT policies for subscribers and orders tables

-- Drop existing permissive INSERT policies
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "insert_order" ON public.orders;

-- Create secure INSERT policy for subscribers table
-- Only allow authenticated users to create their own subscription records
CREATE POLICY "authenticated_users_can_insert_own_subscription" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  (user_id = auth.uid() OR email = auth.email())
);

-- Create secure INSERT policy for orders table  
-- Only allow authenticated users to create their own order records
CREATE POLICY "authenticated_users_can_insert_own_orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  user_id = auth.uid()
);