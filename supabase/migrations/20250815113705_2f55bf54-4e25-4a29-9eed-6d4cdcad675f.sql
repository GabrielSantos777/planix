-- Create enum types
CREATE TYPE public.account_type AS ENUM ('bank', 'savings', 'investment');
CREATE TYPE public.card_type AS ENUM ('visa', 'mastercard', 'elo', 'amex');
CREATE TYPE public.transaction_type AS ENUM ('income', 'expense', 'transfer');
CREATE TYPE public.investment_type AS ENUM ('stocks', 'crypto', 'bonds', 'funds');
CREATE TYPE public.subscription_plan AS ENUM ('basic', 'premium', 'enterprise');
CREATE TYPE public.goal_status AS ENUM ('active', 'completed', 'paused');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  subscription_plan subscription_plan DEFAULT 'basic',
  subscription_start TIMESTAMPTZ,
  subscription_end TIMESTAMPTZ,
  trial_end TIMESTAMPTZ DEFAULT (now() + interval '15 days'),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create accounts table
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type account_type NOT NULL,
  initial_balance DECIMAL(15,2) DEFAULT 0,
  current_balance DECIMAL(15,2) DEFAULT 0,
  currency TEXT DEFAULT 'BRL',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create credit_cards table
CREATE TABLE public.credit_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  card_type card_type NOT NULL,
  limit_amount DECIMAL(15,2) NOT NULL,
  current_balance DECIMAL(15,2) DEFAULT 0,
  closing_day INTEGER NOT NULL CHECK (closing_day >= 1 AND closing_day <= 31),
  due_day INTEGER NOT NULL CHECK (due_day >= 1 AND due_day <= 31),
  best_purchase_day INTEGER CHECK (best_purchase_day >= 1 AND best_purchase_day <= 31),
  currency TEXT DEFAULT 'BRL',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'folder',
  color TEXT DEFAULT '#6B7280',
  type transaction_type NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  type transaction_type NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  account_id UUID REFERENCES public.accounts(id),
  credit_card_id UUID REFERENCES public.credit_cards(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  currency TEXT DEFAULT 'BRL',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create investments table
CREATE TABLE public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  type investment_type NOT NULL,
  quantity DECIMAL(15,6) NOT NULL,
  average_price DECIMAL(15,2) NOT NULL,
  current_price DECIMAL(15,2) DEFAULT 0,
  currency TEXT DEFAULT 'BRL',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create goals table
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(15,2) NOT NULL,
  current_amount DECIMAL(15,2) DEFAULT 0,
  target_date DATE,
  status goal_status DEFAULT 'active',
  currency TEXT DEFAULT 'BRL',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create whatsapp_integrations table
CREATE TABLE public.whatsapp_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  phone_number TEXT NOT NULL,
  webhook_token TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_integrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for accounts
CREATE POLICY "Users can view own accounts" ON public.accounts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own accounts" ON public.accounts
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for credit_cards
CREATE POLICY "Users can view own credit cards" ON public.credit_cards
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own credit cards" ON public.credit_cards
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for categories
CREATE POLICY "Users can view own categories" ON public.categories
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own categories" ON public.categories
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own transactions" ON public.transactions
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for investments
CREATE POLICY "Users can view own investments" ON public.investments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own investments" ON public.investments
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for goals
CREATE POLICY "Users can view own goals" ON public.goals
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own goals" ON public.goals
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for whatsapp_integrations
CREATE POLICY "Users can view own whatsapp integrations" ON public.whatsapp_integrations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own whatsapp integrations" ON public.whatsapp_integrations
  FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON public.accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_credit_cards_updated_at BEFORE UPDATE ON public.credit_cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON public.investments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON public.goals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();