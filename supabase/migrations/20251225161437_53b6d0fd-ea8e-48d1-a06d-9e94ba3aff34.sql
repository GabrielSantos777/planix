-- Add payment_day column to contacts table
ALTER TABLE public.contacts 
ADD COLUMN payment_day integer CHECK (payment_day >= 1 AND payment_day <= 31);