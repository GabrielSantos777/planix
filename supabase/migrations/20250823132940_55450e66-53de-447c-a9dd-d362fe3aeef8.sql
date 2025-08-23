-- Adicionar constraint única para permitir ON CONFLICT na função update_whatsapp_token
ALTER TABLE whatsapp_integrations 
ADD CONSTRAINT whatsapp_integrations_user_phone_unique 
UNIQUE (user_id, phone_number);