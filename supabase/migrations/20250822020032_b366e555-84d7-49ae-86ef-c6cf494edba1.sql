-- Comprehensive Security Fixes (Simplified)

-- 1. Protect admin privileges: Prevent users from setting themselves as admin
CREATE OR REPLACE FUNCTION public.protect_admin_privileges()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow is_admin changes if current user is already admin or if it's the initial insert
  IF OLD IS NOT NULL AND OLD.is_admin != NEW.is_admin THEN
    -- Check if current user is admin
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    ) THEN
      RAISE EXCEPTION 'Only administrators can modify admin privileges';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add trigger to protect admin privileges
DROP TRIGGER IF EXISTS protect_admin_privileges_trigger ON public.profiles;
CREATE TRIGGER protect_admin_privileges_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_admin_privileges();

-- 2. Update SECURITY DEFINER functions to pin search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, trial_end)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    now() + interval '15 days'
  );

  -- Create default categories for new user
  INSERT INTO public.categories (user_id, name, icon, color, type, is_default) VALUES
    (NEW.id, 'Alimentação', 'utensils', '#EF4444', 'expense', true),
    (NEW.id, 'Transporte', 'car', '#F59E0B', 'expense', true),
    (NEW.id, 'Moradia', 'home', '#8B5CF6', 'expense', true),
    (NEW.id, 'Saúde', 'heart', '#EC4899', 'expense', true),
    (NEW.id, 'Educação', 'book', '#06B6D4', 'expense', true),
    (NEW.id, 'Lazer', 'gamepad-2', '#10B981', 'expense', true),
    (NEW.id, 'Salário', 'briefcase', '#22C55E', 'income', true),
    (NEW.id, 'Freelance', 'laptop', '#3B82F6', 'income', true),
    (NEW.id, 'Investimentos', 'trending-up', '#F59E0B', 'income', true);

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 3. Create secure view for WhatsApp integrations without exposing tokens
CREATE OR REPLACE VIEW public.whatsapp_integrations_secure AS
SELECT 
  id,
  user_id,
  phone_number,
  is_active,
  created_at,
  CASE 
    WHEN auth.uid() = user_id THEN 'Connected'
    ELSE 'Hidden'
  END as connection_status
FROM public.whatsapp_integrations;

-- Grant access to the secure view
GRANT SELECT ON public.whatsapp_integrations_secure TO authenticated;

-- 4. Strengthen RLS policies with explicit WITH CHECK conditions

-- Drop and recreate accounts policies
DROP POLICY IF EXISTS "Users can manage own accounts" ON accounts;
DROP POLICY IF EXISTS "Users can view own accounts" ON accounts;

CREATE POLICY "users_can_view_own_accounts" 
ON accounts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_accounts" 
ON accounts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_accounts" 
ON accounts FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_accounts" 
ON accounts FOR DELETE 
USING (auth.uid() = user_id);

-- Drop and recreate categories policies
DROP POLICY IF EXISTS "Users can manage own categories" ON categories;
DROP POLICY IF EXISTS "Users can view own categories" ON categories;

CREATE POLICY "users_can_view_own_categories" 
ON categories FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_categories" 
ON categories FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_categories" 
ON categories FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_categories" 
ON categories FOR DELETE 
USING (auth.uid() = user_id);

-- Drop and recreate transactions policies
DROP POLICY IF EXISTS "Users can manage own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;

CREATE POLICY "users_can_view_own_transactions" 
ON transactions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_transactions" 
ON transactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_transactions" 
ON transactions FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_transactions" 
ON transactions FOR DELETE 
USING (auth.uid() = user_id);

-- Drop and recreate goals policies
DROP POLICY IF EXISTS "Users can manage own goals" ON goals;
DROP POLICY IF EXISTS "Users can view own goals" ON goals;

CREATE POLICY "users_can_view_own_goals" 
ON goals FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_goals" 
ON goals FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_goals" 
ON goals FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_goals" 
ON goals FOR DELETE 
USING (auth.uid() = user_id);

-- Drop and recreate investments policies
DROP POLICY IF EXISTS "Users can manage own investments" ON investments;
DROP POLICY IF EXISTS "Users can view own investments" ON investments;

CREATE POLICY "users_can_view_own_investments" 
ON investments FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_investments" 
ON investments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_investments" 
ON investments FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_investments" 
ON investments FOR DELETE 
USING (auth.uid() = user_id);

-- Drop and recreate credit card invoices policies
DROP POLICY IF EXISTS "Users can manage own invoices" ON credit_card_invoices;
DROP POLICY IF EXISTS "Users can view own invoices" ON credit_card_invoices;

CREATE POLICY "users_can_view_own_invoices" 
ON credit_card_invoices FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_invoices" 
ON credit_card_invoices FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_invoices" 
ON credit_card_invoices FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_invoices" 
ON credit_card_invoices FOR DELETE 
USING (auth.uid() = user_id);

-- 5. Add constraints to ensure user_id is always set on critical tables
DO $$
BEGIN
  -- Add constraints only if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'accounts_user_id_required'
  ) THEN
    ALTER TABLE accounts ADD CONSTRAINT accounts_user_id_required CHECK (user_id IS NOT NULL);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'categories_user_id_required'
  ) THEN
    ALTER TABLE categories ADD CONSTRAINT categories_user_id_required CHECK (user_id IS NOT NULL);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'transactions_user_id_required'
  ) THEN
    ALTER TABLE transactions ADD CONSTRAINT transactions_user_id_required CHECK (user_id IS NOT NULL);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'goals_user_id_required'
  ) THEN
    ALTER TABLE goals ADD CONSTRAINT goals_user_id_required CHECK (user_id IS NOT NULL);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'investments_user_id_required'
  ) THEN
    ALTER TABLE investments ADD CONSTRAINT investments_user_id_required CHECK (user_id IS NOT NULL);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'credit_card_invoices_user_id_required'
  ) THEN
    ALTER TABLE credit_card_invoices ADD CONSTRAINT credit_card_invoices_user_id_required CHECK (user_id IS NOT NULL);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'whatsapp_integrations_user_id_required'
  ) THEN
    ALTER TABLE whatsapp_integrations ADD CONSTRAINT whatsapp_integrations_user_id_required CHECK (user_id IS NOT NULL);
  END IF;
END
$$;