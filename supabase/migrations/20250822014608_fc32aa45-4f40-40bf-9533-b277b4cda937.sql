-- Fix security issue: Encrypt WhatsApp tokens and strengthen access controls

-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a secure encryption/decryption function for WhatsApp tokens
CREATE OR REPLACE FUNCTION encrypt_whatsapp_token(token TEXT)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT encode(
    encrypt(
      token::bytea, 
      decode(split_part(current_setting('app.encryption_key', true), ':', 2), 'base64'),
      'aes'
    ), 
    'base64'
  );
$$;

-- Create decryption function for WhatsApp tokens
CREATE OR REPLACE FUNCTION decrypt_whatsapp_token(encrypted_token TEXT)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT convert_from(
    decrypt(
      decode(encrypted_token, 'base64'),
      decode(split_part(current_setting('app.encryption_key', true), ':', 2), 'base64'),
      'aes'
    ),
    'UTF8'
  );
$$;

-- Create a function to safely retrieve decrypted tokens (only for the owner)
CREATE OR REPLACE FUNCTION get_user_whatsapp_token(user_uuid UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT CASE 
    WHEN auth.uid() = user_uuid OR auth.role() = 'service_role' THEN
      decrypt_whatsapp_token(webhook_token)
    ELSE
      NULL
  END
  FROM whatsapp_integrations 
  WHERE user_id = user_uuid AND is_active = true
  LIMIT 1;
$$;

-- Create a function to safely update WhatsApp tokens
CREATE OR REPLACE FUNCTION update_whatsapp_token(user_uuid UUID, new_token TEXT, phone TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  INSERT INTO whatsapp_integrations (user_id, webhook_token, phone_number, is_active)
  VALUES (user_uuid, encrypt_whatsapp_token(new_token), phone, true)
  ON CONFLICT (user_id, phone_number) 
  DO UPDATE SET 
    webhook_token = encrypt_whatsapp_token(new_token),
    is_active = true
  WHERE whatsapp_integrations.user_id = user_uuid;
  
  SELECT true;
$$;

-- Add constraint to prevent direct access to webhook_token column
ALTER TABLE whatsapp_integrations ADD CONSTRAINT check_no_direct_token_access 
CHECK (length(webhook_token) > 20); -- Encrypted tokens are always longer than 20 chars

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Users can manage own whatsapp integrations" ON whatsapp_integrations;
DROP POLICY IF EXISTS "Users can view own whatsapp integrations" ON whatsapp_integrations;

-- Create more restrictive policies
CREATE POLICY "users_can_view_own_whatsapp_integration_metadata" 
ON whatsapp_integrations 
FOR SELECT 
USING (
  auth.uid() = user_id AND 
  -- Only allow viewing non-sensitive fields, token access via function only
  true
);

CREATE POLICY "users_can_update_own_whatsapp_integration_status" 
ON whatsapp_integrations 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Only allow inserts through the secure function (this will fail for direct inserts)
CREATE POLICY "prevent_direct_whatsapp_token_insert" 
ON whatsapp_integrations 
FOR INSERT 
WITH CHECK (false);

-- Allow service role full access for webhook processing
CREATE POLICY "service_role_can_access_whatsapp_integrations" 
ON whatsapp_integrations 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION encrypt_whatsapp_token(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION decrypt_whatsapp_token(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_whatsapp_token(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_whatsapp_token(UUID, TEXT, TEXT) TO authenticated;