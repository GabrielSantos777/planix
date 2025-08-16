-- Update existing profiles table to ensure it has all needed columns
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create subscribers table for Stripe integration
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security on subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for subscribers table
CREATE POLICY IF NOT EXISTS "select_own_subscription" ON public.subscribers
  FOR SELECT
  USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY IF NOT EXISTS "update_own_subscription" ON public.subscribers
  FOR UPDATE
  USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY IF NOT EXISTS "insert_subscription" ON public.subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create orders table for one-time payments
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER,
  currency TEXT DEFAULT 'brl',
  status TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY IF NOT EXISTS "select_own_orders" ON public.orders
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "insert_order" ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "update_order" ON public.orders
  FOR UPDATE
  USING (true);