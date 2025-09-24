-- Habilitar RLS nas tabelas que não têm RLS ativado (correção do erro crítico)
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;

-- Política para rate_limit_log - apenas service role pode acessar
CREATE POLICY "service_role_only_rate_limit" 
ON public.rate_limit_log 
FOR ALL 
USING (auth.role() = 'service_role');

-- Verificar e ajustar outras configurações de segurança
-- Adicionar unique constraint na tabela rate_limit_log para evitar duplicatas
ALTER TABLE public.rate_limit_log
ADD CONSTRAINT unique_rate_limit_window 
UNIQUE (ip_address, endpoint, window_start);

-- Função para verificar integridade dos dados financeiros
CREATE OR REPLACE FUNCTION public.verify_financial_integrity()
RETURNS TABLE (
  check_name TEXT,
  status TEXT,
  details TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Verificar se é admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem verificar integridade';
  END IF;
  
  -- Verificar saldos de contas vs transações
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
  
  -- Verificar transações órfãs (sem conta nem cartão)
  SELECT 
    'orphan_transactions'::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'AVISO' END::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'Nenhuma transação órfã' 
         ELSE COUNT(*)::TEXT || ' transações sem conta ou cartão' END::TEXT
  FROM public.transactions
  WHERE account_id IS NULL AND credit_card_id IS NULL
  
  UNION ALL
  
  -- Verificar usuários sem perfil
  SELECT 
    'users_without_profile'::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'AVISO' END::TEXT,
    CASE WHEN COUNT(*) = 0 THEN 'Todos os usuários têm perfil' 
         ELSE COUNT(*)::TEXT || ' usuários sem perfil' END::TEXT
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  WHERE p.id IS NULL;
END;
$$;

-- Função para backup de segurança de dados críticos
CREATE OR REPLACE FUNCTION public.create_security_backup()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  backup_info TEXT;
BEGIN
  -- Verificar se é admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem criar backups';
  END IF;
  
  -- Criar snapshot de estatísticas importantes
  INSERT INTO public.audit_log (table_name, operation, user_id, new_data)
  SELECT 
    'security_backup',
    'SNAPSHOT',
    auth.uid(),
    json_build_object(
      'timestamp', NOW(),
      'total_users', (SELECT COUNT(*) FROM public.profiles),
      'total_transactions', (SELECT COUNT(*) FROM public.transactions),
      'total_accounts', (SELECT COUNT(*) FROM public.accounts),
      'total_credit_cards', (SELECT COUNT(*) FROM public.credit_cards),
      'active_whatsapp_integrations', (SELECT COUNT(*) FROM public.whatsapp_integrations WHERE is_active = true)
    );
  
  backup_info := 'Backup de segurança criado em ' || NOW()::TEXT;
  RETURN backup_info;
END;
$$;

-- Adicionar índices para melhorar performance em consultas de segurança
CREATE INDEX IF NOT EXISTS idx_profiles_admin ON public.profiles (is_admin) WHERE is_admin = true;
CREATE INDEX IF NOT EXISTS idx_transactions_high_value ON public.transactions (amount, created_at) WHERE ABS(amount) > 1000;
CREATE INDEX IF NOT EXISTS idx_whatsapp_integrations_active ON public.whatsapp_integrations (is_active, created_at) WHERE is_active = true;

-- Função para detectar atividade suspeita
CREATE OR REPLACE FUNCTION public.detect_suspicious_activity()
RETURNS TABLE (
  user_id UUID,
  suspicious_activity TEXT,
  risk_level TEXT,
  details TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Verificar se é admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem detectar atividade suspeita';
  END IF;
  
  RETURN QUERY
  -- Usuários com muitas transações de alto valor em pouco tempo
  SELECT 
    t.user_id,
    'high_value_transactions'::TEXT,
    'ALTO'::TEXT,
    'Usuário fez ' || COUNT(*)::TEXT || ' transações acima de R$ 10.000 nas últimas 24h'::TEXT
  FROM public.transactions t
  WHERE ABS(t.amount) > 10000 
    AND t.created_at > NOW() - INTERVAL '24 hours'
  GROUP BY t.user_id
  HAVING COUNT(*) >= 5
  
  UNION ALL
  
  -- Usuários com tentativas de login frequentes (baseado em logs)
  SELECT 
    COALESCE(a.user_id, '00000000-0000-0000-0000-000000000000'::UUID),
    'multiple_login_attempts'::TEXT,
    'MÉDIO'::TEXT,
    'Múltiplas tentativas de acesso detectadas'::TEXT
  FROM public.audit_log a
  WHERE a.table_name = 'auth_attempts'
    AND a.created_at > NOW() - INTERVAL '1 hour'
  GROUP BY a.user_id
  HAVING COUNT(*) > 10
  
  UNION ALL
  
  -- Contas com saldos muito negativos
  SELECT 
    a.user_id,
    'negative_balance'::TEXT,
    'MÉDIO'::TEXT,
    'Conta com saldo muito negativo: R$ ' || a.current_balance::TEXT
  FROM public.accounts a
  WHERE a.current_balance < -50000;
END;
$$;

-- Adicionar trigger para prevenir escalação de privilégios maliciosa
CREATE OR REPLACE FUNCTION public.prevent_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Impedir que usuários não-admin se tornem admin diretamente
  IF NEW.is_admin = true AND OLD.is_admin = false THEN
    -- Verificar se quem está fazendo a mudança é admin
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    ) THEN
      RAISE EXCEPTION 'Apenas administradores podem conceder privilégios de administrador';
    END IF;
    
    -- Log da mudança de privilégio
    INSERT INTO public.audit_log (table_name, operation, user_id, old_data, new_data)
    VALUES (
      'privilege_escalation',
      'ADMIN_GRANTED',
      auth.uid(),
      json_build_object('target_user', NEW.user_id, 'previous_admin', OLD.is_admin),
      json_build_object('target_user', NEW.user_id, 'new_admin', NEW.is_admin)
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger para log de escalação de privilégios
DROP TRIGGER IF EXISTS prevent_privilege_escalation_trigger ON public.profiles;
CREATE TRIGGER prevent_privilege_escalation_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  WHEN (OLD.is_admin IS DISTINCT FROM NEW.is_admin)
  EXECUTE FUNCTION public.prevent_privilege_escalation();