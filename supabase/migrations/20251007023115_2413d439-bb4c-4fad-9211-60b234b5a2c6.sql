-- Recompute balances consistently and keep current_balance always correct
-- 1) Helper functions
CREATE OR REPLACE FUNCTION public.recompute_account_balance(p_account_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.accounts a
  SET current_balance = COALESCE(a.initial_balance, 0) + COALESCE((
    SELECT SUM(t.amount)
    FROM public.transactions t
    WHERE t.account_id = p_account_id
  ), 0)
  WHERE a.id = p_account_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.recompute_credit_card_balance(p_card_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.credit_cards c
  SET current_balance = COALESCE((
    SELECT SUM(t.amount)
    FROM public.transactions t
    WHERE t.credit_card_id = p_card_id
  ), 0)
  WHERE c.id = p_card_id;
END;
$$;

-- 2) Trigger function on transactions to keep balances in sync
CREATE OR REPLACE FUNCTION public.trg_transactions_recompute_balances()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.account_id IS NOT NULL THEN
      PERFORM public.recompute_account_balance(NEW.account_id);
    END IF;
    IF NEW.credit_card_id IS NOT NULL THEN
      PERFORM public.recompute_credit_card_balance(NEW.credit_card_id);
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Recompute for old and new account if changed or amount changed
    IF OLD.account_id IS DISTINCT FROM NEW.account_id THEN
      IF OLD.account_id IS NOT NULL THEN
        PERFORM public.recompute_account_balance(OLD.account_id);
      END IF;
      IF NEW.account_id IS NOT NULL THEN
        PERFORM public.recompute_account_balance(NEW.account_id);
      END IF;
    ELSIF NEW.account_id IS NOT NULL AND (OLD.amount IS DISTINCT FROM NEW.amount) THEN
      PERFORM public.recompute_account_balance(NEW.account_id);
    END IF;

    -- Recompute for old and new credit card if changed or amount changed
    IF OLD.credit_card_id IS DISTINCT FROM NEW.credit_card_id THEN
      IF OLD.credit_card_id IS NOT NULL THEN
        PERFORM public.recompute_credit_card_balance(OLD.credit_card_id);
      END IF;
      IF NEW.credit_card_id IS NOT NULL THEN
        PERFORM public.recompute_credit_card_balance(NEW.credit_card_id);
      END IF;
    ELSIF NEW.credit_card_id IS NOT NULL AND (OLD.amount IS DISTINCT FROM NEW.amount) THEN
      PERFORM public.recompute_credit_card_balance(NEW.credit_card_id);
    END IF;

    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.account_id IS NOT NULL THEN
      PERFORM public.recompute_account_balance(OLD.account_id);
    END IF;
    IF OLD.credit_card_id IS NOT NULL THEN
      PERFORM public.recompute_credit_card_balance(OLD.credit_card_id);
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Drop and recreate trigger to ensure latest definition
DROP TRIGGER IF EXISTS transactions_recompute_balances ON public.transactions;
CREATE TRIGGER transactions_recompute_balances
AFTER INSERT OR UPDATE OR DELETE ON public.transactions
FOR EACH ROW EXECUTE FUNCTION public.trg_transactions_recompute_balances();

-- 3) Trigger on accounts to keep current_balance aligned when initial_balance changes
CREATE OR REPLACE FUNCTION public.trg_accounts_recompute_on_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- On insert or when initial_balance changes, recompute using all transactions
  PERFORM public.recompute_account_balance(NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS accounts_recompute_on_change ON public.accounts;
CREATE TRIGGER accounts_recompute_on_change
AFTER INSERT OR UPDATE OF initial_balance ON public.accounts
FOR EACH ROW EXECUTE FUNCTION public.trg_accounts_recompute_on_change();

-- 4) Useful indexes for performance (idempotent)
CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON public.transactions (account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_credit_card_id ON public.transactions (credit_card_id);

-- 5) Backfill: recompute all existing balances now
UPDATE public.accounts a
SET current_balance = COALESCE(a.initial_balance, 0) + COALESCE((
  SELECT SUM(t.amount) FROM public.transactions t WHERE t.account_id = a.id
), 0);

UPDATE public.credit_cards c
SET current_balance = COALESCE((
  SELECT SUM(t.amount) FROM public.transactions t WHERE t.credit_card_id = c.id
), 0);
