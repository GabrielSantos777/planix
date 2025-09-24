-- Adicionar política para whatsapp_integrations permitir apenas service role criar registros via função segura
CREATE OR REPLACE FUNCTION public.create_whatsapp_integration(
  p_user_id UUID,
  p_phone_number TEXT,
  p_webhook_token TEXT
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  integration_id UUID;
BEGIN
  -- Verificar se o usuário está autenticado ou se é service role
  IF auth.uid() IS NULL AND auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Acesso negado';
  END IF;
  
  -- Se não for service role, verificar se é o próprio usuário
  IF auth.role() != 'service_role' AND auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Você só pode criar integração para seu próprio usuário';
  END IF;
  
  -- Criar ou atualizar integração WhatsApp
  INSERT INTO public.whatsapp_integrations (user_id, phone_number, webhook_token, is_active)
  VALUES (p_user_id, p_phone_number, public.encrypt_whatsapp_token(p_webhook_token), true)
  ON CONFLICT (user_id, phone_number) 
  DO UPDATE SET 
    webhook_token = public.encrypt_whatsapp_token(p_webhook_token),
    is_active = true
  RETURNING id INTO integration_id;
  
  RETURN integration_id;
END;
$$;

-- Adicionar função para desativar integração WhatsApp de forma segura
CREATE OR REPLACE FUNCTION public.deactivate_whatsapp_integration(
  p_user_id UUID,
  p_phone_number TEXT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Verificar se o usuário está autenticado
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado';
  END IF;
  
  -- Verificar se é o próprio usuário
  IF auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Você só pode desativar sua própria integração';
  END IF;
  
  -- Desativar integração
  UPDATE public.whatsapp_integrations 
  SET is_active = false 
  WHERE user_id = p_user_id AND phone_number = p_phone_number;
  
  RETURN TRUE;
END;
$$;

-- Melhorar a política de inserção para usar apenas a função segura
DROP POLICY IF EXISTS "prevent_direct_whatsapp_token_insert" ON public.whatsapp_integrations;

CREATE POLICY "allow_whatsapp_integration_via_function_only" 
ON public.whatsapp_integrations 
FOR INSERT 
WITH CHECK (
  -- Permitir apenas se for via função de segurança ou service role
  current_setting('role') = 'service_role' OR 
  current_setting('app.function_name', true) IN ('create_whatsapp_integration')
);

-- Atualizar função para validação de número de telefone
CREATE OR REPLACE FUNCTION public.validate_phone_number(phone TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Validar formato de telefone brasileiro
  RETURN phone ~ '^\+?55[1-9]{2}9[0-9]{8}$' OR phone ~ '^[1-9]{2}9[0-9]{8}$';
END;
$$;

-- Adicionar restrição de telefone válido para whatsapp_integrations
ALTER TABLE public.whatsapp_integrations 
ADD CONSTRAINT valid_phone_number 
CHECK (public.validate_phone_number(phone_number));

-- Adicionar política mais restritiva para orders (evitar manipulação de pedidos)
DROP POLICY IF EXISTS "users_can_update_own_orders" ON public.orders;

CREATE POLICY "users_can_view_own_orders_only" 
ON public.orders 
FOR UPDATE 
USING (user_id = auth.uid() AND status != 'completed');

-- Função para validar limites de transações por usuário
CREATE OR REPLACE FUNCTION public.check_transaction_limits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  daily_count INTEGER;
  daily_amount NUMERIC;
  user_plan TEXT;
BEGIN
  -- Buscar plano do usuário
  SELECT subscription_plan INTO user_plan
  FROM public.profiles 
  WHERE user_id = NEW.user_id;
  
  -- Contar transações do dia
  SELECT COUNT(*), COALESCE(SUM(ABS(amount)), 0)
  INTO daily_count, daily_amount
  FROM public.transactions 
  WHERE user_id = NEW.user_id 
    AND date = CURRENT_DATE;
  
  -- Aplicar limites baseados no plano
  IF user_plan = 'basic' THEN
    IF daily_count >= 50 THEN
      RAISE EXCEPTION 'Limite diário de 50 transações atingido para plano básico';
    END IF;
    IF daily_amount >= 10000 THEN
      RAISE EXCEPTION 'Limite diário de R$ 10.000 atingido para plano básico';
    END IF;
  ELSIF user_plan = 'premium' THEN
    IF daily_count >= 200 THEN
      RAISE EXCEPTION 'Limite diário de 200 transações atingido';
    END IF;
    IF daily_amount >= 100000 THEN
      RAISE EXCEPTION 'Limite diário de R$ 100.000 atingido';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Criar trigger para validação de limites de transações
DROP TRIGGER IF EXISTS validate_transaction_limits ON public.transactions;
CREATE TRIGGER validate_transaction_limits
  BEFORE INSERT ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.check_transaction_limits();

-- Função para log de auditoria de transações sensíveis
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS na tabela de auditoria
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Política para auditoria - apenas admins podem ver
CREATE POLICY "admins_can_view_audit_log" 
ON public.audit_log 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Função de auditoria para transações
CREATE OR REPLACE FUNCTION public.audit_transactions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Log para inserções de valores altos
  IF TG_OP = 'INSERT' AND ABS(NEW.amount) > 1000 THEN
    INSERT INTO public.audit_log (table_name, operation, user_id, new_data)
    VALUES ('transactions', 'INSERT', NEW.user_id, row_to_json(NEW));
  END IF;
  
  -- Log para atualizações de valores
  IF TG_OP = 'UPDATE' AND (OLD.amount != NEW.amount OR OLD.description != NEW.description) THEN
    INSERT INTO public.audit_log (table_name, operation, user_id, old_data, new_data)
    VALUES ('transactions', 'UPDATE', NEW.user_id, row_to_json(OLD), row_to_json(NEW));
  END IF;
  
  -- Log para exclusões
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_log (table_name, operation, user_id, old_data)
    VALUES ('transactions', 'DELETE', OLD.user_id, row_to_json(OLD));
    RETURN OLD;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger de auditoria para transações
DROP TRIGGER IF EXISTS audit_transactions_trigger ON public.transactions;
CREATE TRIGGER audit_transactions_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_transactions();

-- Adicionar índices para performance e segurança
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON public.transactions (user_id, date);
CREATE INDEX IF NOT EXISTS idx_transactions_amount ON public.transactions (amount) WHERE ABS(amount) > 1000;
CREATE INDEX IF NOT EXISTS idx_whatsapp_integrations_phone ON public.whatsapp_integrations (phone_number);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_created ON public.audit_log (user_id, created_at);

-- Função para limpar dados antigos de auditoria (GDPR compliance)
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Manter apenas logs dos últimos 2 anos
  DELETE FROM public.audit_log 
  WHERE created_at < NOW() - INTERVAL '2 years';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- Adicionar validação de CPF/CNPJ para dados sensíveis (se houver)
CREATE OR REPLACE FUNCTION public.validate_cpf(cpf TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
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