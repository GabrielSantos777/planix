-- Fix security issues by setting search_path for functions
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Fix update function
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;