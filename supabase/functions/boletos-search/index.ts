import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock Open Finance integration - Replace with real API calls
async function searchBoletosOpenFinance(cpf: string): Promise<any[]> {
  // TODO: Implement real Open Finance OAuth flow and API integration
  // This is a mock for demonstration
  console.log('Searching boletos for CPF (masked for security)');
  
  // Mock data - replace with real API call
  const mockBoletos = [
    {
      external_id: 'BOL-2024-001',
      barcode: '12345678901234567890123456789012345678901234567',
      digitable_line: '12345.67890 12345.678901 23456.789012 3 12345678901234',
      beneficiary: 'Empresa XYZ Ltda',
      amount: 150.50,
      due_date: '2024-02-15',
      status: 'open',
      payer_name: 'Usuário Teste',
      payer_document: cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    },
    {
      external_id: 'BOL-2024-002',
      barcode: '98765432109876543210987654321098765432109876543',
      digitable_line: '98765.43210 98765.432109 87654.321098 7 98765432109876',
      beneficiary: 'Serviços ABC',
      amount: 320.00,
      due_date: '2024-02-20',
      status: 'open',
      payer_name: 'Usuário Teste',
      payer_document: cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    },
    {
      external_id: 'BOL-2024-003',
      barcode: '55555555555555555555555555555555555555555555555',
      digitable_line: '55555.55555 55555.555555 55555.555555 5 55555555555555',
      beneficiary: 'Energia Elétrica SA',
      amount: 180.75,
      due_date: '2024-01-25',
      status: 'paid',
      payment_date: '2024-01-24',
      payer_name: 'Usuário Teste',
      payer_document: cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockBoletos;
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

    // Check if user has active consent
    const { data: consent } = await supabase
      .from('user_consents')
      .select('*')
      .eq('user_id', user.id)
      .eq('consent_type', 'boletos_open_finance')
      .eq('is_active', true)
      .order('granted_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!consent) {
      return new Response(
        JSON.stringify({ error: 'Consent required' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get decrypted CPF by calling boletos-cpf function
    const cpfResponse = await supabase.functions.invoke('boletos-cpf', {
      body: { action: 'decrypt' },
      headers: {
        Authorization: authHeader,
      },
    });

    if (cpfResponse.error || !cpfResponse.data?.cpf) {
      throw new Error('CPF not found. Please save your CPF first.');
    }

    const cpf = cpfResponse.data.cpf;

    // Search boletos via Open Finance (mock)
    const boletos = await searchBoletosOpenFinance(cpf);

    // Update cache in database
    for (const boleto of boletos) {
      await supabase.from('boletos').upsert({
        user_id: user.id,
        external_id: boleto.external_id,
        barcode: boleto.barcode,
        digitable_line: boleto.digitable_line,
        beneficiary: boleto.beneficiary,
        amount: boleto.amount,
        due_date: boleto.due_date,
        payment_date: boleto.payment_date || null,
        status: boleto.status,
        payer_name: boleto.payer_name,
        payer_document: boleto.payer_document,
        synced_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,external_id',
      });
    }

    // Return boletos
    const { data: cachedBoletos, error: fetchError } = await supabase
      .from('boletos')
      .select('*')
      .eq('user_id', user.id)
      .order('due_date', { ascending: true });

    if (fetchError) {
      console.error('Error fetching boletos:', fetchError);
      throw fetchError;
    }

    return new Response(JSON.stringify({ boletos: cachedBoletos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // SECURITY: Log full error details server-side, return generic message to client
    const supportId = crypto.randomUUID();
    console.error('Error in boletos-search:', {
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