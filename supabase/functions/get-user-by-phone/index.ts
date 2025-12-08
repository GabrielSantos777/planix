import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

// SECURITY FIX: Input validation schema
const phoneSchema = z.string()
  .trim()
  .regex(/^\+?55[1-9]{2}9[0-9]{8}$|^[1-9]{2}9[0-9]{8}$/, 'Invalid Brazilian phone number format')
  .transform(phone => {
    const digits = phone.replace(/\D/g, '');
    return digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
  });

serve(async (req) => {
  console.log('Get user by phone called:', req.method);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Require API key authentication
    const apiKey = req.headers.get('x-api-key');
    const expectedApiKey = Deno.env.get('N8N_API_KEY');
    
    // Explicitly fail if secret is not configured
    if (!expectedApiKey) {
      console.error('N8N_API_KEY secret is not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!apiKey || apiKey !== expectedApiKey) {
      console.error('Invalid or missing API key');
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid or missing API key' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const rawPhone = url.searchParams.get('phone');

    if (!rawPhone) {
      return new Response(
        JSON.stringify({ error: 'Phone number parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SECURITY FIX: Validate phone number format
    let normalizedPhone: string;
    try {
      normalizedPhone = phoneSchema.parse(rawPhone);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number format. Use Brazilian format: +5511999999999' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Search for user with normalized phone
    const digits = normalizedPhone.replace(/\D/g, '');
    const variants = [digits, `+${digits}`, normalizedPhone];

    console.log('Looking up user for phone (normalized):', normalizedPhone);

    const { data: integration, error } = await supabase
      .from('whatsapp_integrations')
      .select('user_id, phone_number')
      .in('phone_number', variants)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !integration) {
      console.log('No active integration found for phone');
      return new Response(
        JSON.stringify({ error: 'No active WhatsApp integration found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Found user_id:', integration.user_id);

    return new Response(
      JSON.stringify({ 
        user_id: integration.user_id,
        phone_number: integration.phone_number,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-user-by-phone function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
