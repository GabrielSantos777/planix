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
                  const response = await processFinancialCommand(messageText, whatsappIntegration.user_id, supabaseClient, phoneNumber);
                  
                  // Enviar resposta via WhatsApp
                  await sendWhatsAppMessage(phoneNumber, response);
                  console.log(`Response sent to ${phoneNumber}: ${response}`);
                } else {
                  // Usuário não autenticado - solicitar vinculação
                  const authMessage = `🔐 **Olá! Bem-vindo ao FinanceBot!**\n\nPara usar o bot, você precisa vincular seu número ao sistema:\n\n1. Acesse o sistema financeiro\n2. Vá em Configurações > WhatsApp\n3. Digite seu número: ${phoneNumber}\n4. Clique em "Conectar"\n\nApós isso, você poderá usar todos os comandos do bot! 🚀`;
                  await sendWhatsAppMessage(phoneNumber, authMessage);
                  console.log(`Auth message sent to ${phoneNumber}`);
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

// Função para extrair informações de texto usando IA
async function extractTransactionFromText(text: string): Promise<{
  amount: number | null;
  type: 'income' | 'expense' | null;
  category: string | null;
  description: string | null;
}> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    console.error('OpenAI API key not found');
    return { amount: null, type: null, category: null, description: null };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Você é um assistente especializado em extrair informações financeiras de mensagens de texto em português brasileiro. 
            
            Sua tarefa é analisar mensagens e extrair:
            1. Valor (amount): número em reais, pode estar com R$, vírgula ou ponto decimal
            2. Tipo (type): "income" para entradas/receitas ou "expense" para gastos/despesas
            3. Categoria (category): uma das opções: Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Salário, Freelance, Investimentos, ou "Outros" se não identificar
            4. Descrição (description): descrição da transação

            Retorne APENAS um JSON válido no formato:
            {"amount": 123.45, "type": "expense", "category": "Alimentação", "description": "Almoço no restaurante"}

            Se não conseguir extrair alguma informação, use null para esse campo.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.1,
        max_tokens: 200
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return { amount: null, type: null, category: null, description: null };
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return { amount: null, type: null, category: null, description: null };
  }
}

// Função para buscar ou criar categoria
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

// Função para enviar mensagem via WhatsApp
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

// Armazenar transações pendentes na memória (em produção, usar banco de dados)
const pendingTransactions = new Map<string, any>();

async function processFinancialCommand(message: string, userId: string, supabase: any, phoneNumber: string): Promise<string> {
  const command = message.toLowerCase().trim();
  
  try {
    // Comandos de consulta
    if (command.includes('saldo') || command.includes('balance')) {
      const { data: accounts } = await supabase
        .from('accounts')
        .select('name, current_balance')
        .eq('user_id', userId)
        .eq('is_active', true);
      
      if (!accounts || accounts.length === 0) {
        return '💳 Você ainda não possui contas cadastradas.';
      }

      const totalBalance = accounts.reduce((sum, account) => sum + (account.current_balance || 0), 0);
      
      let response = `💰 **Saldo Atual: R$ ${totalBalance.toFixed(2).replace('.', ',')}**\n\n`;
      response += '📊 **Por conta:**\n';
      accounts.forEach(account => {
        const balance = account.current_balance || 0;
        const emoji = balance >= 0 ? '✅' : '⚠️';
        response += `${emoji} ${account.name}: R$ ${balance.toFixed(2).replace('.', ',')}\n`;
      });
      
      return response;
    }
    
    if (command.includes('resumo diário') || command.includes('resumo hoje')) {
      return await generateDailyReport(supabase, userId);
    }
    
    if (command.includes('resumo semanal')) {
      return await generateWeeklyReport(supabase, userId);
    }
    
    if (command.includes('resumo mensal')) {
      return await generateMonthlyReport(supabase, userId);
    }
    
    if (command.startsWith('gastos em ')) {
      const categoryName = command.replace('gastos em ', '').trim();
      return await getCategoryExpenses(supabase, userId, categoryName);
    }
    
    // Verificar se é uma resposta de seleção de conta (números 1-9)
    if (/^[1-9]$/.test(command) && pendingTransactions.has(phoneNumber)) {
      return await processAccountSelection(command, userId, supabase, phoneNumber);
    }
    
    // Processar transações usando IA
    const extractedData = await extractTransactionFromText(message);
    
    if (extractedData.amount && extractedData.type) {
      // Buscar contas e cartões disponíveis
      const [accountsResult, cardsResult] = await Promise.all([
        supabase
          .from('accounts')
          .select('id, name, type')
          .eq('user_id', userId)
          .eq('is_active', true),
        supabase
          .from('credit_cards')
          .select('id, name, card_type')
          .eq('user_id', userId)
          .eq('is_active', true)
      ]);

      const accounts = accountsResult.data || [];
      const creditCards = cardsResult.data || [];
      
      // Se não há contas nem cartões
      if (accounts.length === 0 && creditCards.length === 0) {
        return '❌ **Você precisa cadastrar uma conta bancária ou cartão de crédito primeiro no sistema para registrar transações.**\n\nAcesse o sistema e vá em:\n• "Contas" para adicionar conta bancária\n• "Cartões" para adicionar cartão de crédito';
      }
      
      // Se há apenas uma opção disponível, usar automaticamente
      if (accounts.length + creditCards.length === 1) {
        const accountId = accounts.length > 0 ? accounts[0].id : null;
        const creditCardId = creditCards.length > 0 ? creditCards[0].id : null;
        
        return await createTransaction(extractedData, userId, supabase, accountId, creditCardId);
      }
      
      // Armazenar transação pendente e mostrar opções
      pendingTransactions.set(phoneNumber, {
        extractedData,
        userId,
        timestamp: Date.now()
      });
      
      let response = `💰 **Transação identificada:**\n`;
      response += `💵 Valor: R$ ${Math.abs(extractedData.amount).toFixed(2).replace('.', ',')}\n`;
      response += `📂 Tipo: ${extractedData.type === 'expense' ? 'Despesa' : 'Receita'}\n`;
      if (extractedData.category) {
        response += `📂 Categoria: ${extractedData.category}\n`;
      }
      if (extractedData.description) {
        response += `📝 Descrição: ${extractedData.description}\n`;
      }
      
      response += `\n🏦 **Escolha onde registrar:**\n`;
      
      let optionNumber = 1;
      
      // Listar contas bancárias
      if (accounts.length > 0) {
        response += `\n**💳 Contas Bancárias:**\n`;
        accounts.forEach(account => {
          response += `${optionNumber}. ${account.name} (${account.type})\n`;
          optionNumber++;
        });
      }
      
      // Listar cartões de crédito
      if (creditCards.length > 0) {
        response += `\n**💎 Cartões de Crédito:**\n`;
        creditCards.forEach(card => {
          response += `${optionNumber}. ${card.name} (${card.card_type})\n`;
          optionNumber++;
        });
      }
      
      response += `\n**Digite o número da opção desejada (1-${optionNumber-1})**`;
      
      return response;
    }
    
    // Menu de ajuda
    return `🤖 **FinanceBot - Comandos Disponíveis:**

📊 **Consultas:**
• "saldo" - Ver saldo atual
• "resumo diário" - Relatório de hoje
• "resumo semanal" - Relatório da semana
• "resumo mensal" - Relatório do mês
• "gastos em [categoria]" - Total por categoria

💰 **Registrar Transações:**
• "Receita de R$ 1.500 salário"
• "Gasto de R$ 50 na categoria alimentação"
• "Despesa R$ 30,00 café da manhã"
• "Entrada freelance R$ 800"

📷 **Comprovantes:**
• Envie uma foto de nota fiscal ou comprovante
• O sistema extrairá automaticamente os dados

❓ **Dúvidas:** Digite qualquer comando em linguagem natural!`;
    
  } catch (error) {
    console.error('Error processing command:', error);
    return '❌ Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.';
  }
}

// Função para processar seleção de conta
async function processAccountSelection(selection: string, userId: string, supabase: any, phoneNumber: string): Promise<string> {
  const pendingData = pendingTransactions.get(phoneNumber);
  if (!pendingData) {
    return '❌ Não há transação pendente. Envie uma nova transação.';
  }
  
  // Limpar dados antigos (mais de 5 minutos)
  if (Date.now() - pendingData.timestamp > 5 * 60 * 1000) {
    pendingTransactions.delete(phoneNumber);
    return '⏰ Transação expirou. Envie uma nova transação.';
  }
  
  const optionIndex = parseInt(selection) - 1;
  
  // Buscar contas e cartões novamente
  const [accountsResult, cardsResult] = await Promise.all([
    supabase
      .from('accounts')
      .select('id, name')
      .eq('user_id', userId)
      .eq('is_active', true),
    supabase
      .from('credit_cards')
      .select('id, name')
      .eq('user_id', userId)
      .eq('is_active', true)
  ]);
  
  const accounts = accountsResult.data || [];
  const creditCards = cardsResult.data || [];
  const allOptions = [...accounts, ...creditCards];
  
  if (optionIndex < 0 || optionIndex >= allOptions.length) {
    return `❌ Opção inválida. Digite um número entre 1 e ${allOptions.length}.`;
  }
  
  const selectedOption = allOptions[optionIndex];
  const isAccount = optionIndex < accounts.length;
  
  const accountId = isAccount ? selectedOption.id : null;
  const creditCardId = !isAccount ? selectedOption.id : null;
  
  // Remover transação pendente
  pendingTransactions.delete(phoneNumber);
  
  return await createTransaction(pendingData.extractedData, userId, supabase, accountId, creditCardId);
}

// Função para criar transação
async function createTransaction(extractedData: any, userId: string, supabase: any, accountId: string | null, creditCardId: string | null): Promise<string> {
  try {
    // Buscar ou criar categoria
    let categoryId = null;
    if (extractedData.category) {
      categoryId = await getOrCreateCategory(supabase, userId, extractedData.category);
    }

    // Criar transação
    const transactionData: any = {
      user_id: userId,
      category_id: categoryId,
      amount: extractedData.type === 'expense' ? -Math.abs(extractedData.amount) : Math.abs(extractedData.amount),
      type: extractedData.type,
      description: extractedData.description || `${extractedData.type === 'expense' ? 'Despesa' : 'Receita'} via WhatsApp`,
      date: new Date().toISOString().split('T')[0]
    };
    
    if (accountId) {
      transactionData.account_id = accountId;
    }
    if (creditCardId) {
      transactionData.credit_card_id = creditCardId;
    }

    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert(transactionData)
      .select()
      .single();

    if (error) {
      console.error('Error creating transaction:', error);
      return '❌ Erro ao registrar transação. Tente novamente.';
    }

    // Atualizar saldo apenas se for conta bancária
    if (accountId) {
      const balanceChange = extractedData.type === 'expense' ? -Math.abs(extractedData.amount) : Math.abs(extractedData.amount);
      await supabase
        .from('accounts')
        .update({
          current_balance: supabase.raw(`current_balance + ${balanceChange}`)
        })
        .eq('id', accountId);
    }

    const typeEmoji = extractedData.type === 'expense' ? '💸' : '💰';
    const typeText = extractedData.type === 'expense' ? 'Despesa' : 'Receita';
    const accountType = creditCardId ? 'cartão de crédito' : 'conta bancária';
    
    let response = `${typeEmoji} **${typeText} registrada com sucesso!**\n\n`;
    response += `💵 Valor: R$ ${Math.abs(extractedData.amount).toFixed(2).replace('.', ',')}\n`;
    response += `🏦 Registrado em: ${accountType}\n`;
    if (extractedData.category) {
      response += `📂 Categoria: ${extractedData.category}\n`;
    }
    if (extractedData.description) {
      response += `📝 Descrição: ${extractedData.description}\n`;
    }
    
    // Mostrar saldo atualizado apenas para contas bancárias
    if (accountId) {
      const { data: updatedAccount } = await supabase
        .from('accounts')
        .select('current_balance')
        .eq('id', accountId)
        .single();
      
      const newBalance = updatedAccount?.current_balance || 0;
      response += `\n💳 **Saldo atual: R$ ${newBalance.toFixed(2).replace('.', ',')}**`;
    }
    
    return response;
  } catch (error) {
    console.error('Error in createTransaction:', error);
    return '❌ Erro ao processar transação. Tente novamente.';
  }
}

async function generateDailyReport(supabase: any, userId: string): Promise<string> {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: transactions } = await supabase
    .from('transactions')
    .select(`
      amount,
      type,
      description,
      categories (name)
    `)
    .eq('user_id', userId)
    .eq('date', today);

  if (!transactions || transactions.length === 0) {
    return '📅 **Resumo de Hoje:**\n\nNenhuma movimentação registrada hoje.';
  }

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  let response = `📅 **Resumo de Hoje:**\n\n`;
  response += `💰 Receitas: R$ ${income.toFixed(2).replace('.', ',')}\n`;
  response += `💸 Despesas: R$ ${expenses.toFixed(2).replace('.', ',')}\n`;
  response += `📊 Saldo do dia: R$ ${(income - expenses).toFixed(2).replace('.', ',')}\n\n`;

  if (expenses > 0) {
    response += `💸 **Principais gastos:**\n`;
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    expenseTransactions.slice(0, 5).forEach(t => {
      const category = t.categories?.name || 'Outros';
      response += `• ${category}: R$ ${Math.abs(t.amount).toFixed(2).replace('.', ',')} - ${t.description}\n`;
    });
  }

  return response;
}

async function generateWeeklyReport(supabase: any, userId: string): Promise<string> {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  const { data: transactions } = await supabase
    .from('transactions')
    .select(`
      amount,
      type,
      categories (name)
    `)
    .eq('user_id', userId)
    .gte('date', weekStart.toISOString().split('T')[0]);

  if (!transactions || transactions.length === 0) {
    return '📅 **Resumo Semanal:**\n\nNenhuma movimentação registrada esta semana.';
  }

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Agrupar por categoria
  const expensesByCategory: { [key: string]: number } = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const category = t.categories?.name || 'Outros';
      expensesByCategory[category] = (expensesByCategory[category] || 0) + Math.abs(t.amount);
    });

  let response = `📅 **Resumo Semanal:**\n\n`;
  response += `💰 Receitas: R$ ${income.toFixed(2).replace('.', ',')}\n`;
  response += `💸 Despesas: R$ ${expenses.toFixed(2).replace('.', ',')}\n`;
  response += `📊 Saldo da semana: R$ ${(income - expenses).toFixed(2).replace('.', ',')}\n\n`;

  if (Object.keys(expensesByCategory).length > 0) {
    response += `💸 **Gastos por categoria:**\n`;
    Object.entries(expensesByCategory)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([category, amount]) => {
        response += `• ${category}: R$ ${amount.toFixed(2).replace('.', ',')}\n`;
      });
  }

  return response;
}

async function generateMonthlyReport(supabase: any, userId: string): Promise<string> {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const { data: transactions } = await supabase
    .from('transactions')
    .select(`
      amount,
      type,
      categories (name)
    `)
    .eq('user_id', userId)
    .gte('date', monthStart.toISOString().split('T')[0]);

  if (!transactions || transactions.length === 0) {
    return '📅 **Resumo Mensal:**\n\nNenhuma movimentação registrada este mês.';
  }

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Agrupar por categoria
  const expensesByCategory: { [key: string]: number } = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const category = t.categories?.name || 'Outros';
      expensesByCategory[category] = (expensesByCategory[category] || 0) + Math.abs(t.amount);
    });

  let response = `📅 **Resumo Mensal:**\n\n`;
  response += `💰 Receitas: R$ ${income.toFixed(2).replace('.', ',')}\n`;
  response += `💸 Despesas: R$ ${expenses.toFixed(2).replace('.', ',')}\n`;
  response += `📊 Saldo do mês: R$ ${(income - expenses).toFixed(2).replace('.', ',')}\n\n`;

  if (Object.keys(expensesByCategory).length > 0) {
    response += `💸 **Gastos por categoria:**\n`;
    Object.entries(expensesByCategory)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, amount]) => {
        response += `• ${category}: R$ ${amount.toFixed(2).replace('.', ',')}\n`;
      });
  }

  return response;
}

async function getCategoryExpenses(supabase: any, userId: string, categoryName: string): Promise<string> {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const { data: transactions } = await supabase
    .from('transactions')
    .select(`
      amount,
      date,
      description,
      categories!inner (name)
    `)
    .eq('user_id', userId)
    .eq('type', 'expense')
    .ilike('categories.name', `%${categoryName}%`)
    .gte('date', monthStart.toISOString().split('T')[0])
    .order('date', { ascending: false });

  if (!transactions || transactions.length === 0) {
    return `📂 **Gastos em "${categoryName}":**\n\nNenhum gasto encontrado nesta categoria este mês.`;
  }

  const total = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  let response = `📂 **Gastos em "${categoryName}" (este mês):**\n\n`;
  response += `💸 **Total: R$ ${total.toFixed(2).replace('.', ',')}**\n\n`;
  response += `📋 **Últimas transações:**\n`;
  
  transactions.slice(0, 8).forEach(t => {
    const date = new Date(t.date).toLocaleDateString('pt-BR');
    response += `• ${date}: R$ ${Math.abs(t.amount).toFixed(2).replace('.', ',')} - ${t.description}\n`;
  });

  if (transactions.length > 8) {
    response += `\n... e mais ${transactions.length - 8} transações.`;
  }

  return response;
}