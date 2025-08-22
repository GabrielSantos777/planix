-- Remove all custom views and rely only on RLS policies
DROP VIEW IF EXISTS public.whatsapp_integrations_safe CASCADE;
DROP VIEW IF EXISTS public.whatsapp_integrations_secure CASCADE;
DROP VIEW IF EXISTS public.whatsapp_integrations_public CASCADE;

-- Ensure no views remain that could cause security warnings
-- Users will access the table directly with proper RLS protection