-- Fix search_path for prevent_cpf_update function
CREATE OR REPLACE FUNCTION prevent_cpf_update()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.cpf IS NOT NULL AND NEW.cpf IS DISTINCT FROM OLD.cpf THEN
    RAISE EXCEPTION 'CPF cannot be changed once set';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';