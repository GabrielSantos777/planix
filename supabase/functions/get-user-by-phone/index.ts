import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Get user by phone called:', req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get phone number from URL params
    const url = new URL(req.url);
    const rawPhone = url.searchParams.get('phone');

    if (!rawPhone) {
      return new Response(
        JSON.stringify({ error: 'Phone number parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize: decode, trim, remove non-digits and build variants with/without "+"
    const decoded = decodeURIComponent(rawPhone);
    const trimmed = decoded.trim();
    const digits = trimmed.replace(/\D/g, '');
    const variants = [digits, `+${digits}`];

    console.log('Looking up user for phone (normalized):', {
      raw: rawPhone,
      decoded,
      trimmed,
      digits,
      variants,
    });

    // Search for user by phone number (accept both formats)
    const { data: integration, error } = await supabase
      .from('whatsapp_integrations')
      .select('user_id, phone_number')
      .in('phone_number', variants)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !integration) {
      console.log('No active integration found for phone variants:', variants);
      return new Response(
        JSON.stringify({ error: 'No active WhatsApp integration found for this phone number' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Found user_id:', integration.user_id);

    return new Response(
      JSON.stringify({ 
        user_id: integration.user_id,
        phone_number: integration.phone_number ?? `+${digits}`,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-user-by-phone function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});