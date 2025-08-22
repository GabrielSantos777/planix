-- Fix security issue: Restrict order updates to owner only

-- Drop the insecure update policy
DROP POLICY IF EXISTS "update_order" ON orders;

-- Create secure update policy that only allows users to update their own orders
CREATE POLICY "users_can_update_own_orders" 
ON orders 
FOR UPDATE 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());