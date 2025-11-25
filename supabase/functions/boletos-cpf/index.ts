import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { encodeHex } from "https://deno.land/std@0.168.0/encoding/hex.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Crypto functions for CPF encryption
const ENCRYPTION_KEY = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(Deno.env.get('CPF_ENCRYPTION_KEY') || 'default-key-change-me-in-production!!'),
  { name: "AES-GCM" },
  false,
  ["encrypt", "decrypt"]
);

async function encryptCPF(cpf: string): Promise<{ encrypted: string; token: string }> {
  // Generate HMAC token for pseudonymization
  const hmacKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(Deno.env.get('CPF_HMAC_KEY') || 'hmac-key-change-me!!'),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const tokenData = await crypto.subtle.sign(
    "HMAC",
    hmacKey,
    new TextEncoder().encode(cpf)
  );
  const token = encodeHex(new Uint8Array(tokenData));

  // Encrypt CPF with AES-GCM
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    ENCRYPTION_KEY,
    new TextEncoder().encode(cpf)
  );

  const encrypted = `${encodeHex(iv)}:${encodeHex(new Uint8Array(encryptedData))}`;
  
  return { encrypted, token };
}

async function decryptCPF(encrypted: string): Promise<string> {
  const [ivHex, dataHex] = encrypted.split(':');
  const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const data = new Uint8Array(dataHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    ENCRYPTION_KEY,
    data
  );

  return new TextDecoder().decode(decrypted);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { action, cpf } = await req.json();

    if (action === 'save') {
      // Validate CPF format (remove formatting)
      const cleanCPF = cpf.replace(/\D/g, '');
      if (cleanCPF.length !== 11) {
        throw new Error('CPF inválido');
      }

      // Encrypt and tokenize CPF
      const { encrypted, token } = await encryptCPF(cleanCPF);

      // Save to database
      const { data, error } = await supabase
        .from('user_cpf_tokens')
        .upsert({
          user_id: user.id,
          cpf_token: token,
          encrypted_cpf: encrypted,
          last_used_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving CPF:', error);
        throw error;
      }

      return new Response(JSON.stringify({ success: true, token }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'get') {
      // Get CPF metadata (not the actual CPF)
      const { data, error } = await supabase
        .from('user_cpf_tokens')
        .select('id, created_at, last_used_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error getting CPF:', error);
        throw error;
      }

      return new Response(JSON.stringify({ has_cpf: !!data, metadata: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'delete') {
      // Delete CPF
      const { error } = await supabase
        .from('user_cpf_tokens')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting CPF:', error);
        throw error;
      }

      // Also delete cached boletos
      await supabase
        .from('boletos')
        .delete()
        .eq('user_id', user.id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'decrypt') {
      // Internal use only - decrypt CPF for Open Finance API calls
      const { data, error } = await supabase
        .from('user_cpf_tokens')
        .select('encrypted_cpf, cpf_token')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        throw new Error('CPF not found');
      }

      const decryptedCPF = await decryptCPF(data.encrypted_cpf);

      // Update last used
      await supabase
        .from('user_cpf_tokens')
        .update({ last_used_at: new Date().toISOString() })
        .eq('user_id', user.id);

      return new Response(JSON.stringify({ cpf: decryptedCPF, token: data.cpf_token }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');
  } catch (error) {
    console.error('Error in boletos-cpf:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});