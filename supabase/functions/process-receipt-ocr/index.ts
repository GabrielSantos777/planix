import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { imageBase64, userId, phoneNumber } = await req.json();
    console.log("Processing receipt OCR for user:", userId);

    // Processar imagem com OpenAI Vision
    const extractedData = await processReceiptWithAI(imageBase64);
    
    if (!extractedData.amount || !extractedData.type) {
      const errorMessage = "❌ Não consegui extrair os dados da imagem. Verifique se é uma nota fiscal ou comprovante válido.";
      await sendWhatsAppMessage(phoneNumber, errorMessage);
      return new Response(JSON.stringify({ success: false, message: errorMessage }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Buscar conta padrão do usuário
    const { data: accounts } = await supabaseClient
      .from('accounts')
      .select('id')
      .eq('user_id', userId)
      .eq('is_active', true)
      .limit(1);

    if (!accounts || accounts.length === 0) {
      const errorMessage = "❌ Você precisa cadastrar uma conta primeiro no sistema.";
      await sendWhatsAppMessage(phoneNumber, errorMessage);
      return new Response(JSON.stringify({ success: false, message: errorMessage }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Buscar ou criar categoria
    let categoryId = null;
    if (extractedData.category) {
      categoryId = await getOrCreateCategory(supabaseClient, userId, extractedData.category);
    }

    // Criar transação
    const { data: transaction, error } = await supabaseClient
      .from('transactions')
      .insert({
        user_id: userId,
        account_id: accounts[0].id,
        category_id: categoryId,
        amount: extractedData.type === 'expense' ? -Math.abs(extractedData.amount) : Math.abs(extractedData.amount),
        type: extractedData.type,
        description: extractedData.description || 'Transação via comprovante WhatsApp',
        date: extractedData.date || new Date().toISOString().split('T')[0]
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating transaction:', error);
      const errorMessage = "❌ Erro ao registrar transação. Tente novamente.";
      await sendWhatsAppMessage(phoneNumber, errorMessage);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Atualizar saldo da conta
    const balanceChange = extractedData.type === 'expense' ? -Math.abs(extractedData.amount) : Math.abs(extractedData.amount);
    
    // Fetch current balance and calculate new balance
    const { data: currentAccount } = await supabaseClient
      .from('accounts')
      .select('current_balance')
      .eq('id', accounts[0].id)
      .single();
    
    if (currentAccount) {
      const newBalance = (currentAccount.current_balance || 0) + balanceChange;
      await supabaseClient
        .from('accounts')
        .update({ current_balance: newBalance })
        .eq('id', accounts[0].id);
    }

    // Buscar saldo atualizado
    const { data: updatedAccount } = await supabaseClient
      .from('accounts')
      .select('current_balance')
      .eq('id', accounts[0].id)
      .single();

    const newBalance = updatedAccount?.current_balance || 0;
    const typeEmoji = extractedData.type === 'expense' ? '💸' : '💰';
    const typeText = extractedData.type === 'expense' ? 'Despesa' : 'Receita';
    
    let response = `📷 **${typeText} registrada via comprovante!**\n\n`;
    response += `💵 Valor: R$ ${Math.abs(extractedData.amount).toFixed(2).replace('.', ',')}\n`;
    if (extractedData.category) {
      response += `📂 Categoria: ${extractedData.category}\n`;
    }
    if (extractedData.description) {
      response += `📝 Descrição: ${extractedData.description}\n`;
    }
    if (extractedData.date) {
      response += `📅 Data: ${new Date(extractedData.date).toLocaleDateString('pt-BR')}\n`;
    }
    response += `\n💳 **Saldo atual: R$ ${newBalance.toFixed(2).replace('.', ',')}**`;
    
    // Enviar resposta via WhatsApp
    await sendWhatsAppMessage(phoneNumber, response);

    return new Response(JSON.stringify({ success: true, transaction, response }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Receipt OCR error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

async function processReceiptWithAI(imageBase64: string): Promise<{
  amount: number | null;
  type: 'income' | 'expense' | null;
  category: string | null;
  description: string | null;
  date: string | null;
}> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    console.error('OpenAI API key not found');
    return { amount: null, type: null, category: null, description: null, date: null };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um especialista em extrair informações financeiras de comprovantes, notas fiscais e recibos em português brasileiro.

            Analise a imagem e extraia as seguintes informações:
            1. Valor total (amount): número em reais
            2. Tipo (type): "expense" para compras/gastos ou "income" para recebimentos
            3. Categoria (category): Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Salário, Freelance, Investimentos, ou "Outros"
            4. Descrição (description): estabelecimento ou descrição da transação
            5. Data (date): no formato YYYY-MM-DD

            Retorne APENAS um JSON válido:
            {"amount": 123.45, "type": "expense", "category": "Alimentação", "description": "Restaurante ABC", "date": "2024-01-15"}

            Se não conseguir extrair alguma informação, use null.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extraia os dados financeiros desta imagem:'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        temperature: 0.1,
        max_tokens: 300
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return { amount: null, type: null, category: null, description: null, date: null };
    }
  } catch (error) {
    console.error('Error calling OpenAI Vision API:', error);
    return { amount: null, type: null, category: null, description: null, date: null };
  }
}

async function getOrCreateCategory(supabase: any, userId: string, categoryName: string): Promise<string | null> {
  try {
    // Buscar categoria existente
    const { data: existingCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('user_id', userId)
      .ilike('name', categoryName)
      .single();

    if (existingCategory) {
      return existingCategory.id;
    }

    // Criar nova categoria se não existir
    const categoryMap: { [key: string]: { icon: string; color: string; type: string } } = {
      'alimentação': { icon: 'utensils', color: '#EF4444', type: 'expense' },
      'transporte': { icon: 'car', color: '#F59E0B', type: 'expense' },
      'moradia': { icon: 'home', color: '#8B5CF6', type: 'expense' },
      'saúde': { icon: 'heart', color: '#EC4899', type: 'expense' },
      'educação': { icon: 'book', color: '#06B6D4', type: 'expense' },
      'lazer': { icon: 'gamepad-2', color: '#10B981', type: 'expense' },
      'salário': { icon: 'briefcase', color: '#22C55E', type: 'income' },
      'freelance': { icon: 'laptop', color: '#3B82F6', type: 'income' },
      'investimentos': { icon: 'trending-up', color: '#F59E0B', type: 'income' },
    };

    const categoryData = categoryMap[categoryName.toLowerCase()] || 
                        { icon: 'folder', color: '#6B7280', type: 'expense' };

    const { data: newCategory, error } = await supabase
      .from('categories')
      .insert({
        user_id: userId,
        name: categoryName,
        icon: categoryData.icon,
        color: categoryData.color,
        type: categoryData.type
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating category:', error);
      return null;
    }

    return newCategory.id;
  } catch (error) {
    console.error('Error in getOrCreateCategory:', error);
    return null;
  }
}

async function sendWhatsAppMessage(phoneNumber: string, message: string): Promise<boolean> {
  try {
    const whatsappToken = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
    if (!whatsappToken) {
      console.error('WhatsApp access token not found');
      return false;
    }

    const response = await fetch(`https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: message
        }
      }),
    });

    if (!response.ok) {
      console.error('Error sending WhatsApp message:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return false;
  }
}