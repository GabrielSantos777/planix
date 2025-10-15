-- SECURITY FIX: Add authorization checks to SECURITY DEFINER functions

-- Fix recompute_account_balance to require ownership
CREATE OR REPLACE FUNCTION public.recompute_account_balance(p_account_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- SECURITY: Verify caller owns the account
  IF NOT EXISTS (
    SELECT 1 FROM public.accounts 
    WHERE id = p_account_id AND user_id = auth.uid()
  ) AND auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Unauthorized: you do not own this account';
  END IF;
  
  UPDATE public.accounts a
  SET current_balance = COALESCE(a.initial_balance, 0) + COALESCE((
    SELECT SUM(t.amount)
    FROM public.transactions t
    WHERE t.account_id = p_account_id
  ), 0)
  WHERE a.id = p_account_id;
END;
$function$;

-- Fix recompute_credit_card_balance to require ownership
CREATE OR REPLACE FUNCTION public.recompute_credit_card_balance(p_card_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- SECURITY: Verify caller owns the card
  IF NOT EXISTS (
    SELECT 1 FROM public.credit_cards 
    WHERE id = p_card_id AND user_id = auth.uid()
  ) AND auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Unauthorized: you do not own this credit card';
  END IF;
  
  UPDATE public.credit_cards c
  SET current_balance = COALESCE((
    SELECT SUM(t.amount)
    FROM public.transactions t
    WHERE t.credit_card_id = p_card_id
  ), 0)
  WHERE c.id = p_card_id;
END;
$function$;

-- Fix cleanup functions to require admin role
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- SECURITY: Require admin role
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;
  
  DELETE FROM public.audit_log 
  WHERE created_at < NOW() - INTERVAL '2 years';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_rate_limit_logs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- SECURITY: Require admin role
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;
  
  DELETE FROM public.rate_limit_log 
  WHERE created_at < NOW() - INTERVAL '24 hours';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$function$;

-- Fix admin check functions to use has_role instead of is_admin
CREATE OR REPLACE FUNCTION public.generate_security_report()
RETURNS TABLE(metric text, value bigint, description text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- SECURITY: Use has_role instead of is_admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem gerar relatórios de segurança';
  END IF;
  
  RETURN QUERY
  SELECT 'active_users'::TEXT, COUNT(DISTINCT user_id), 'Usuários ativos nos últimos 30 dias'::TEXT
  FROM public.transactions 
  WHERE created_at > NOW() - INTERVAL '30 days'
  
  UNION ALL
  
  SELECT 'high_value_transactions'::TEXT, COUNT(*), 'Transações acima de R$ 10.000 nos últimos 7 dias'::TEXT
  FROM public.transactions 
  WHERE ABS(amount) > 10000 AND created_at > NOW() - INTERVAL '7 days'
  
  UNION ALL
  
  SELECT 'failed_logins'::TEXT, COUNT(*), 'Tentativas de login falharam (estimativa)'::TEXT
  FROM public.audit_log 
  WHERE table_name = 'auth_attempts' AND created_at > NOW() - INTERVAL '24 hours'
  
  UNION ALL
  
  SELECT 'whatsapp_integrations'::TEXT, COUNT(*), 'Integrações WhatsApp ativas'::TEXT
  FROM public.whatsapp_integrations 
  WHERE is_active = true;
END;
$function$;

CREATE OR REPLACE FUNCTION public.verify_financial_integrity()
RETURNS TABLE(check_name text, status text, details text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- SECURITY: Use has_role instead of is_admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem verificar integridade';
  END IF;
  
  RETURN QUERY
  WITH account_balances AS (
    SELECT 
      a.id,
      a.current_balance,
      a.initial_balance + COALESCE(SUM(t.amount), 0) as calculated_balance
    FROM public.accounts a
    LEFT JOIN public.transactions t ON t.account_id = a.id
    GROUP BY a.id, a.current_balance, a.initial_balance
  )
  SELECT 
    'account_balance_integrity'::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'ERRO' END::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'Todos os saldos estão corretos' 
         ELSE COUNT(*)::TEXT || ' contas com saldos incorretos' END::TEXT
  FROM account_balances
  WHERE ABS(current_balance - calculated_balance) > 0.01
  
  UNION ALL
  
  SELECT 
    'orphan_transactions'::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'AVISO' END::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'Nenhuma transação órfã' 
         ELSE COUNT(*)::TEXT || ' transações sem conta ou cartão' END::TEXT
  FROM public.transactions
  WHERE account_id IS NULL AND credit_card_id IS NULL
  
  UNION ALL
  
  SELECT 
    'users_without_profile'::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'AVISO' END::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'Todos os usuários têm perfil' 
         ELSE COUNT(*)::TEXT || ' usuários sem perfil' END::TEXT
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  WHERE p.id IS NULL;
END;
$function$;

-- Drop the deprecated is_admin column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_admin;
