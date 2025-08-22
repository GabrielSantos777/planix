-- Remove SECURITY DEFINER view completely and use regular view with proper RLS
DROP VIEW IF EXISTS public.whatsapp_integrations_safe;

-- Create a simple view without SECURITY DEFINER
CREATE VIEW public.whatsapp_integrations_safe AS
SELECT 
  id,
  user_id,
  phone_number,
  is_active,
  created_at,
  'Connected' as status
FROM public.whatsapp_integrations;

-- Grant access to the view
GRANT SELECT ON public.whatsapp_integrations_safe TO authenticated;