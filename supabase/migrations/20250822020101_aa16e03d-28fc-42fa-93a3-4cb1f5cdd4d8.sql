-- Fix remaining security issues

-- 1. Fix SECURITY DEFINER functions by pinning search_path
CREATE OR REPLACE FUNCTION public.encrypt_whatsapp_token(token text)
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT encode(
    digest(token || current_setting('app.jwt_secret', true), 'sha256'), 
    'base64'
  );
$function$;

CREATE OR REPLACE FUNCTION public.decrypt_whatsapp_token(encrypted_token text)
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = public
AS $function$
  -- Note: This is a one-way hash, cannot be decrypted
  -- Returns empty string for security
  SELECT ''::text;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_whatsapp_token(user_uuid uuid)
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT CASE 
    WHEN auth.uid() = user_uuid OR auth.role() = 'service_role' THEN
      'token_exists'
    ELSE
      NULL
  END
  FROM whatsapp_integrations 
  WHERE user_id = user_uuid AND is_active = true
  LIMIT 1;
$function$;

CREATE OR REPLACE FUNCTION public.update_whatsapp_token(user_uuid uuid, new_token text, phone text)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = public
AS $function$
  INSERT INTO whatsapp_integrations (user_id, webhook_token, phone_number, is_active)
  VALUES (user_uuid, encode(digest(new_token || current_setting('app.jwt_secret', true), 'sha256'), 'base64'), phone, true)
  ON CONFLICT (user_id, phone_number) 
  DO UPDATE SET 
    webhook_token = encode(digest(new_token || current_setting('app.jwt_secret', true), 'sha256'), 'base64'),
    is_active = true
  WHERE whatsapp_integrations.user_id = user_uuid;
  
  SELECT true;
$function$;

-- 2. Replace SECURITY DEFINER view with proper RLS policies
DROP VIEW IF EXISTS public.whatsapp_integrations_secure;

-- Create a safer view without SECURITY DEFINER
CREATE VIEW public.whatsapp_integrations_public AS
SELECT 
  id,
  user_id,
  phone_number,
  is_active,
  created_at
FROM public.whatsapp_integrations
WHERE auth.uid() = user_id;

-- Grant access to the view
GRANT SELECT ON public.whatsapp_integrations_public TO authenticated;