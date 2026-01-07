-- Criar tabela para ajustes sociais (créditos/débitos que não afetam transações reais)
CREATE TABLE public.social_adjustments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Comentário explicativo
COMMENT ON TABLE public.social_adjustments IS 'Ajustes de débito/crédito para contatos sociais que não afetam transações reais';

-- Habilitar RLS
ALTER TABLE public.social_adjustments ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view their own social adjustments"
ON public.social_adjustments
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own social adjustments"
ON public.social_adjustments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social adjustments"
ON public.social_adjustments
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social adjustments"
ON public.social_adjustments
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_social_adjustments_updated_at
BEFORE UPDATE ON public.social_adjustments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();