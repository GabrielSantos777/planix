-- Add optional metadata for investment-related info on transactions
ALTER TABLE public.transactions
ADD COLUMN IF NOT EXISTS investment_metadata JSONB;

-- No changes to RLS needed; existing policies already restrict access by user_id.

-- Helpful index for filtering by type when generating reports (optional but small)
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions (type);
