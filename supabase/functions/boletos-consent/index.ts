import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from auth header
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

    const { action, consent_text, consent_version } = await req.json();

    if (action === 'create') {
      // Get client info - extract first IP from x-forwarded-for (can contain multiple IPs)
      const forwardedFor = req.headers.get('x-forwarded-for');
      const clientIp = forwardedFor 
        ? forwardedFor.split(',')[0].trim() 
        : req.headers.get('cf-connecting-ip');
      
      const clientInfo = {
        ip_address: clientIp,
        user_agent: req.headers.get('user-agent'),
      };

      // Create consent record
      const { data: consent, error: consentError } = await supabase
        .from('user_consents')
        .insert({
          user_id: user.id,
          consent_type: 'boletos_open_finance',
          consent_version: consent_version || 'v1.0',
          consent_text: consent_text,
          ip_address: clientInfo.ip_address,
          user_agent: clientInfo.user_agent,
          is_active: true,
        })
        .select()
        .single();

      if (consentError) {
        console.error('Error creating consent:', consentError);
        throw consentError;
      }

      return new Response(JSON.stringify({ success: true, consent }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'revoke') {
      // Revoke consent
      const { error: revokeError } = await supabase
        .from('user_consents')
        .update({
          is_active: false,
          revoked_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('consent_type', 'boletos_open_finance')
        .eq('is_active', true);

      if (revokeError) {
        console.error('Error revoking consent:', revokeError);
        throw revokeError;
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'check') {
      // Check if user has active consent
      const { data: consent, error: checkError } = await supabase
        .from('user_consents')
        .select('*')
        .eq('user_id', user.id)
        .eq('consent_type', 'boletos_open_finance')
        .eq('is_active', true)
        .order('granted_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking consent:', checkError);
        throw checkError;
      }

      return new Response(JSON.stringify({ has_consent: !!consent, consent }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');
  } catch (error) {
    // SECURITY: Log full error details server-side, return generic message to client
    const supportId = crypto.randomUUID();
    console.error('Error in boletos-consent:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      supportId,
      timestamp: new Date().toISOString()
    });
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred processing your request',
        support_id: supportId 
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});