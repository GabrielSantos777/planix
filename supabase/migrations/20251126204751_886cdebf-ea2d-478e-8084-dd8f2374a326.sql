-- Add CPF field to profiles table
ALTER TABLE public.profiles
ADD COLUMN cpf TEXT;

-- Add unique constraint to prevent duplicate CPFs
CREATE UNIQUE INDEX profiles_cpf_unique ON public.profiles(cpf) WHERE cpf IS NOT NULL;

-- Add check to validate CPF format
ALTER TABLE public.profiles
ADD CONSTRAINT cpf_valid CHECK (cpf IS NULL OR public.validate_cpf(cpf));

-- Add trigger to prevent CPF updates after it's set
CREATE OR REPLACE FUNCTION prevent_cpf_update()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.cpf IS NOT NULL AND NEW.cpf IS DISTINCT FROM OLD.cpf THEN
    RAISE EXCEPTION 'CPF cannot be changed once set';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER prevent_cpf_update_trigger
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION prevent_cpf_update();

-- Migrate existing CPF data from user_cpf_tokens to profiles
UPDATE public.profiles p
SET cpf = (
  SELECT regexp_replace(
    public.sanitize_text_input(
      substring(c.encrypted_cpf from 1 for 11)
    ),
    '[^0-9]', '', 'g'
  )
  FROM public.user_cpf_tokens c
  WHERE c.user_id = p.user_id
  LIMIT 1
)
WHERE EXISTS (
  SELECT 1 FROM public.user_cpf_tokens c
  WHERE c.user_id = p.user_id
);