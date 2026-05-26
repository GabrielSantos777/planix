-- Create budget_items table (free-form, no unique constraint on category)
CREATE TABLE public.budget_items (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month          INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year           INTEGER NOT NULL CHECK (year >= 2000 AND year <= 2100),
  type           TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  description    TEXT NOT NULL DEFAULT '',
  category_id    UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  planned_amount NUMERIC NOT NULL DEFAULT 0 CHECK (planned_amount >= 0),
  sort_order     INTEGER NOT NULL DEFAULT 0,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
  -- Intentionally NO UNIQUE constraint — multiple rows per category allowed
);

-- Enable RLS
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "users_can_view_own_budget_items"
  ON public.budget_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_budget_items"
  ON public.budget_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_budget_items"
  ON public.budget_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_budget_items"
  ON public.budget_items FOR DELETE
  USING (auth.uid() = user_id);

-- updated_at trigger
CREATE TRIGGER update_budget_items_updated_at
  BEFORE UPDATE ON public.budget_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing budgets → budget_items (preserves all historical data)
INSERT INTO public.budget_items (
  user_id, month, year, type, description,
  category_id, planned_amount, sort_order, notes, created_at
)
SELECT
  b.user_id,
  b.month,
  b.year,
  c.type,
  COALESCE(b.name, c.name, 'Item'),
  b.category_id,
  b.planned_amount,
  ROW_NUMBER() OVER (
    PARTITION BY b.user_id, b.month, b.year, c.type
    ORDER BY b.created_at
  ),
  b.notes,
  b.created_at
FROM public.budgets b
JOIN public.categories c ON c.id = b.category_id;
