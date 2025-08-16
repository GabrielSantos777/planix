import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const body = await req.json();
    console.log("WhatsApp webhook received:", JSON.stringify(body, null, 2));

    // Verificar se é uma mensagem de WhatsApp
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            const value = change.value;
            
            if (value.messages) {
              for (const message of value.messages) {
                const phoneNumber = message.from;
                const messageText = message.text?.body || '';
                
                console.log(`Message from ${phoneNumber}: ${messageText}`);
                
                // Buscar usuário pelo número de telefone
                const { data: whatsappIntegration } = await supabaseClient
                  .from('whatsapp_integrations')
                  .select('user_id')
                  .eq('phone_number', phoneNumber)
                  .eq('is_active', true)
                  .single();

                if (whatsappIntegration) {
                  // Processar comando financeiro
                  const response = await processFinancialCommand(messageText, whatsappIntegration.user_id, supabaseClient);
                  
                  // Aqui você enviaria a resposta via WhatsApp
                  console.log(`Response to send: ${response}`);
                }
              }
            }
          }
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

async function processFinancialCommand(message: string, userId: string, supabase: any): Promise<string> {
  const command = message.toLowerCase().trim();
  
  try {
    if (command.includes('saldo') || command.includes('balance')) {
      // Buscar saldo atual
      const { data: accounts } = await supabase
        .from('accounts')
        .select('current_balance')
        .eq('user_id', userId);
      
      const totalBalance = accounts?.reduce((sum, account) => sum + (account.current_balance || 0), 0) || 0;
      return `Seu saldo atual é: R$ ${totalBalance.toFixed(2)}`;
    }
    
    if (command.includes('gastos hoje')) {
      // Buscar gastos do dia
      const today = new Date().toISOString().split('T')[0];
      const { data: transactions } = await supabase
        .from('transactions')
        .select('amount')
        .eq('user_id', userId)
        .eq('type', 'expense')
        .gte('date', today);
      
      const totalExpenses = transactions?.reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;
      return `Seus gastos de hoje: R$ ${totalExpenses.toFixed(2)}`;
    }
    
    if (command.includes('metas') || command.includes('goals')) {
      // Buscar metas
      const { data: goals } = await supabase
        .from('goals')
        .select('title, current_amount, target_amount')
        .eq('user_id', userId)
        .eq('status', 'active');
      
      if (!goals || goals.length === 0) {
        return 'Você não possui metas ativas no momento.';
      }
      
      let response = 'Suas metas ativas:\n';
      goals.forEach((goal, index) => {
        const progress = ((goal.current_amount / goal.target_amount) * 100).toFixed(1);
        response += `${index + 1}. ${goal.title}: R$ ${goal.current_amount.toFixed(2)} / R$ ${goal.target_amount.toFixed(2)} (${progress}%)\n`;
      });
      
      return response;
    }
    
    return 'Comandos disponíveis:\n• "saldo" - Ver saldo atual\n• "gastos hoje" - Ver gastos do dia\n• "metas" - Ver suas metas\n• "adicionar gasto [valor] [descrição]" - Registrar despesa';
  } catch (error) {
    console.error('Error processing command:', error);
    return 'Desculpe, ocorreu um erro ao processar sua solicitação.';
  }
}