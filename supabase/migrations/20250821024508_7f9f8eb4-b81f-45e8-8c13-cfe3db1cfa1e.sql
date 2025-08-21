-- Create invoice status table to track credit card invoice payments and statuses
CREATE TABLE public.credit_card_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  credit_card_id UUID NOT NULL REFERENCES public.credit_cards(id) ON DELETE CASCADE,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  paid_amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'paid', 'partial')),
  due_date DATE,
  payment_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(credit_card_id, month, year)
);

-- Enable RLS
ALTER TABLE public.credit_card_invoices ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own invoices" 
ON public.credit_card_invoices 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own invoices" 
ON public.credit_card_invoices 
FOR ALL 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_credit_card_invoices_updated_at
BEFORE UPDATE ON public.credit_card_invoices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();