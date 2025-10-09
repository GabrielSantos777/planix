-- Add 'transfer' to transaction_type enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'transfer' AND enumtypid = 'transaction_type'::regtype) THEN
    ALTER TYPE transaction_type ADD VALUE 'transfer';
  END IF;
END $$;

-- Add transfer-related fields to transactions table
ALTER TABLE public.transactions 
ADD COLUMN IF NOT EXISTS source_account_id uuid REFERENCES public.accounts(id),
ADD COLUMN IF NOT EXISTS destination_account_id uuid REFERENCES public.accounts(id),
ADD COLUMN IF NOT EXISTS is_transfer boolean DEFAULT false;

-- Create index for transfer queries
CREATE INDEX IF NOT EXISTS idx_transactions_source_account ON public.transactions(source_account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_destination_account ON public.transactions(destination_account_id);

-- Add constraint to prevent same source and destination (drop first if exists)
DO $$
BEGIN
  ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS different_transfer_accounts;
  ALTER TABLE public.transactions 
  ADD CONSTRAINT different_transfer_accounts 
  CHECK (
    CASE 
      WHEN is_transfer = true THEN source_account_id IS DISTINCT FROM destination_account_id
      ELSE true
    END
  );
END $$;