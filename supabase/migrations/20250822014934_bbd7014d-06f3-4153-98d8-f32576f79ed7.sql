-- Fix credit card security: Strengthen RLS policies with more granular controls

-- Drop the broad "ALL" policy for more specific controls
DROP POLICY IF EXISTS "Users can manage own credit cards" ON credit_cards;

-- Create more specific and secure policies
CREATE POLICY "users_can_insert_own_credit_cards" 
ON credit_cards 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_credit_cards" 
ON credit_cards 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_credit_cards" 
ON credit_cards 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add additional security constraint to ensure user_id is always set
ALTER TABLE credit_cards 
ADD CONSTRAINT credit_cards_user_id_required 
CHECK (user_id IS NOT NULL);