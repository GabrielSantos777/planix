-- First, clean up any existing duplicates (keep the newest record for each user_id + external_id)
DELETE FROM public.boletos a
USING public.boletos b
WHERE a.id < b.id 
  AND a.user_id = b.user_id 
  AND a.external_id = b.external_id;

-- Add unique constraint on (user_id, external_id) to prevent duplicate boletos
ALTER TABLE public.boletos 
ADD CONSTRAINT boletos_user_external_id_unique 
UNIQUE (user_id, external_id);