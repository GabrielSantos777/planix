-- Tabela de consentimentos LGPD
CREATE TABLE IF NOT EXISTS public.user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL DEFAULT 'boletos_open_finance',
  consent_version TEXT NOT NULL DEFAULT 'v1.0',
  consent_text TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de CPF pseudonimizado (tokenizado)
CREATE TABLE IF NOT EXISTS public.user_cpf_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  cpf_token TEXT NOT NULL UNIQUE, -- Hash HMAC do CPF
  encrypted_cpf TEXT NOT NULL, -- CPF criptografado (AES-256)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at TIMESTAMPTZ
);

-- Tabela de cache de boletos (para evitar chamadas desnecessárias)
CREATE TABLE IF NOT EXISTS public.boletos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  external_id TEXT NOT NULL, -- ID do boleto no banco
  barcode TEXT,
  digitable_line TEXT,
  beneficiary TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  due_date DATE NOT NULL,
  payment_date DATE,
  status TEXT NOT NULL, -- 'open', 'paid', 'overdue', 'cancelled'
  payer_name TEXT,
  payer_document TEXT,
  additional_info JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_consents_user_id ON public.user_consents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_consents_active ON public.user_consents(user_id, is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_user_cpf_tokens_user_id ON public.user_cpf_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_boletos_user_id ON public.boletos(user_id);
CREATE INDEX IF NOT EXISTS idx_boletos_status ON public.boletos(user_id, status);
CREATE INDEX IF NOT EXISTS idx_boletos_due_date ON public.boletos(user_id, due_date);

-- RLS Policies
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cpf_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boletos ENABLE ROW LEVEL SECURITY;

-- Policies para user_consents
CREATE POLICY "Users can view their own consents"
  ON public.user_consents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own consents"
  ON public.user_consents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consents"
  ON public.user_consents FOR UPDATE
  USING (auth.uid() = user_id);

-- Policies para user_cpf_tokens
CREATE POLICY "Users can view their own CPF tokens"
  ON public.user_cpf_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own CPF tokens"
  ON public.user_cpf_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CPF tokens"
  ON public.user_cpf_tokens FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CPF tokens"
  ON public.user_cpf_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- Policies para boletos
CREATE POLICY "Users can view their own boletos"
  ON public.boletos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own boletos"
  ON public.boletos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own boletos"
  ON public.boletos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own boletos"
  ON public.boletos FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_boletos()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_boletos_updated_at
  BEFORE UPDATE ON public.boletos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_boletos();

CREATE TRIGGER update_user_cpf_tokens_updated_at
  BEFORE UPDATE ON public.user_cpf_tokens
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_boletos();