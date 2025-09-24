-- Corrigir funções com search_path mutable identificadas pelo linter
CREATE OR REPLACE FUNCTION public.validate_phone_number(phone TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Validar formato de telefone brasileiro
  RETURN phone ~ '^\+?55[1-9]{2}9[0-9]{8}$' OR phone ~ '^[1-9]{2}9[0-9]{8}$';
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_cpf(cpf TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  digits TEXT;
  i INTEGER;
  sum1 INTEGER := 0;
  sum2 INTEGER := 0;
  digit1 INTEGER;
  digit2 INTEGER;
BEGIN
  -- Remover caracteres não numéricos
  digits := regexp_replace(cpf, '[^0-9]', '', 'g');
  
  -- Verificar se tem 11 dígitos
  IF length(digits) != 11 THEN
    RETURN FALSE;
  END IF;
  
  -- Verificar se não são todos iguais
  IF digits ~ '^(.)\1{10}$' THEN
    RETURN FALSE;
  END IF;
  
  -- Calcular primeiro dígito verificador
  FOR i IN 1..9 LOOP
    sum1 := sum1 + (substring(digits, i, 1)::INTEGER * (11 - i));
  END LOOP;
  
  digit1 := ((sum1 * 10) % 11) % 10;
  
  -- Calcular segundo dígito verificador
  FOR i IN 1..10 LOOP
    sum2 := sum2 + (substring(digits, i, 1)::INTEGER * (12 - i));
  END LOOP;
  
  digit2 := ((sum2 * 10) % 11) % 10;
  
  -- Verificar se os dígitos estão corretos
  RETURN digit1 = substring(digits, 10, 1)::INTEGER AND 
         digit2 = substring(digits, 11, 1)::INTEGER;
END;
$$;

-- Adicionar funções de segurança para rate limiting por IP
CREATE TABLE IF NOT EXISTS public.rate_limit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address INET NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para rate limiting
CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_endpoint_window 
ON public.rate_limit_log (ip_address, endpoint, window_start);

-- Função para verificar rate limiting
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_ip_address INET,
  p_endpoint TEXT,
  p_max_requests INTEGER DEFAULT 100,
  p_window_minutes INTEGER DEFAULT 60
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_window TIMESTAMPTZ;
  request_count INTEGER;
BEGIN
  current_window := date_trunc('minute', NOW()) - 
                   (EXTRACT(minute FROM NOW())::INTEGER % p_window_minutes) * INTERVAL '1 minute';
  
  -- Verificar requests na janela atual
  SELECT COALESCE(SUM(request_count), 0) INTO request_count
  FROM public.rate_limit_log
  WHERE ip_address = p_ip_address 
    AND endpoint = p_endpoint
    AND window_start >= current_window;
  
  -- Se exceder o limite, bloquear
  IF request_count >= p_max_requests THEN
    RETURN FALSE;
  END IF;
  
  -- Registrar esta requisição
  INSERT INTO public.rate_limit_log (ip_address, endpoint, window_start)
  VALUES (p_ip_address, p_endpoint, current_window)
  ON CONFLICT (ip_address, endpoint, window_start) 
  DO UPDATE SET 
    request_count = rate_limit_log.request_count + 1,
    created_at = NOW();
  
  RETURN TRUE;
END;
$$;

-- Função para limpar logs antigos de rate limiting
CREATE OR REPLACE FUNCTION public.cleanup_rate_limit_logs()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Remover logs de mais de 24 horas
  DELETE FROM public.rate_limit_log 
  WHERE created_at < NOW() - INTERVAL '24 hours';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- Adicionar constraints de segurança para valores monetários
ALTER TABLE public.transactions 
ADD CONSTRAINT reasonable_transaction_amount 
CHECK (ABS(amount) <= 1000000); -- Limite de 1 milhão por transação

ALTER TABLE public.accounts 
ADD CONSTRAINT reasonable_account_balance 
CHECK (current_balance >= -1000000 AND current_balance <= 100000000); -- Limites de saldo

ALTER TABLE public.credit_cards 
ADD CONSTRAINT reasonable_credit_limit 
CHECK (limit_amount > 0 AND limit_amount <= 1000000); -- Limite do cartão

ALTER TABLE public.goals 
ADD CONSTRAINT reasonable_goal_amount 
CHECK (target_amount > 0 AND target_amount <= 100000000); -- Limite de meta

-- Função para validar dados de entrada de transações
CREATE OR REPLACE FUNCTION public.validate_transaction_data()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Validar que transação tem conta OU cartão de crédito, não ambos
  IF (NEW.account_id IS NULL) = (NEW.credit_card_id IS NULL) THEN
    RAISE EXCEPTION 'Transação deve ter exatamente uma conta bancária OU um cartão de crédito';
  END IF;
  
  -- Validar que descrição não está vazia
  IF TRIM(NEW.description) = '' THEN
    RAISE EXCEPTION 'Descrição da transação não pode estar vazia';
  END IF;
  
  -- Validar data não é muito antiga nem futura
  IF NEW.date < CURRENT_DATE - INTERVAL '2 years' OR NEW.date > CURRENT_DATE + INTERVAL '1 year' THEN
    RAISE EXCEPTION 'Data da transação inválida';
  END IF;
  
  -- Verificar se conta/cartão pertence ao usuário
  IF NEW.account_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.accounts 
      WHERE id = NEW.account_id AND user_id = NEW.user_id
    ) THEN
      RAISE EXCEPTION 'Conta não encontrada ou não pertence ao usuário';
    END IF;
  END IF;
  
  IF NEW.credit_card_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.credit_cards 
      WHERE id = NEW.credit_card_id AND user_id = NEW.user_id
    ) THEN
      RAISE EXCEPTION 'Cartão de crédito não encontrado ou não pertence ao usuário';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger para validação de dados de transação
DROP TRIGGER IF EXISTS validate_transaction_data_trigger ON public.transactions;
CREATE TRIGGER validate_transaction_data_trigger
  BEFORE INSERT OR UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_transaction_data();

-- Adicionar função para sanitizar inputs de texto
CREATE OR REPLACE FUNCTION public.sanitize_text_input(input_text TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF input_text IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Remover caracteres perigosos e normalizar
  RETURN TRIM(
    regexp_replace(
      regexp_replace(input_text, '[<>"\'';&]', '', 'g'), -- Remover caracteres perigosos
      '\s+', ' ', 'g' -- Normalizar espaços
    )
  );
END;
$$;

-- Política adicional para proteger dados financeiros sensíveis
CREATE OR REPLACE FUNCTION public.mask_sensitive_financial_data(
  user_requesting_id UUID,
  data_owner_id UUID,
  sensitive_value NUMERIC
) RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Apenas o próprio usuário ou admin pode ver valores completos
  IF user_requesting_id = data_owner_id OR 
     EXISTS (SELECT 1 FROM public.profiles WHERE user_id = user_requesting_id AND is_admin = true) THEN
    RETURN sensitive_value::TEXT;
  ELSE
    RETURN '***';
  END IF;
END;
$$;

-- Função para gerar relatórios de segurança (apenas para admins)
CREATE OR REPLACE FUNCTION public.generate_security_report()
RETURNS TABLE (
  metric TEXT,
  value BIGINT,
  description TEXT
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
$$;