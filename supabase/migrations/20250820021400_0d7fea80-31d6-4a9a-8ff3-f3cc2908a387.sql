-- Add installment support to transactions table
ALTER TABLE public.transactions 
ADD COLUMN installments INTEGER DEFAULT 1,
ADD COLUMN installment_number INTEGER DEFAULT 1,
ADD COLUMN is_installment BOOLEAN DEFAULT false;