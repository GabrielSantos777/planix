import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TransactionData {
  amount?: number;
  date?: string;
  description?: string;
  forma_pagamento?: string;
  conta?: string;
  category_name?: string;
  type?: 'income' | 'expense';
  notes?: string;
}

interface RequiredFields {
  amount: boolean;
  date: boolean;
  description: boolean;
  forma_pagamento: boolean;
  conta: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const url = new URL(req.url);
    const path = url.pathname;

    // POST /transaction - Criar transação (pode ser incompleta)
    if (req.method === 'POST' && path.endsWith('/transaction')) {
      const body = await req.json();
      const { user_id, ...transactionData }: { user_id: string } & TransactionData = body;

      if (!user_id) {
        return new Response(
          JSON.stringify({ error: 'user_id é obrigatório' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verificar campos obrigatórios
      const requiredFields: RequiredFields = {
        amount: !!transactionData.amount,
        date: !!transactionData.date,
        description: !!transactionData.description,
        forma_pagamento: !!transactionData.forma_pagamento,
        conta: !!transactionData.conta
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, present]) => !present)
        .map(([field]) => field);

      if (missingFields.length === 0) {
        // Transação completa - inserir diretamente na tabela final
        const finalTransaction = await processCompleteTransaction(supabaseClient, user_id, transactionData);
        return new Response(
          JSON.stringify({
            success: true,
            transaction_id: finalTransaction.id,
            status: 'completed',
            message: 'Transação criada com sucesso'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Transação incompleta - salvar na tabela transitória
        const { data, error } = await supabaseClient
          .from('pending_transactions')
          .insert({
            user_id,
            transaction_data: transactionData,
            missing_fields: missingFields,
            status: 'pending'
          })
          .select()
          .single();

        if (error) throw error;

        return new Response(
          JSON.stringify({
            success: true,
            pending_transaction_id: data.id,
            status: 'pending',
            missing_fields: missingFields,
            message: 'Transação salva como pendente. Campos faltantes: ' + missingFields.join(', ')
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // POST /transaction/complement - Enviar informações faltantes
    if (req.method === 'POST' && path.endsWith('/transaction/complement')) {
      const body = await req.json();
      const { pending_transaction_id, complementary_data }: {
        pending_transaction_id: string;
        complementary_data: Partial<TransactionData>;
      } = body;

      if (!pending_transaction_id) {
        return new Response(
          JSON.stringify({ error: 'pending_transaction_id é obrigatório' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Buscar transação pendente
      const { data: pendingTransaction, error: fetchError } = await supabaseClient
        .from('pending_transactions')
        .select('*')
        .eq('id', pending_transaction_id)
        .eq('status', 'pending')
        .single();

      if (fetchError || !pendingTransaction) {
        return new Response(
          JSON.stringify({ error: 'Transação pendente não encontrada' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Mesclar dados existentes com complementares
      const updatedData = { ...pendingTransaction.transaction_data, ...complementary_data };

      // Verificar se agora está completa
      const requiredFields: RequiredFields = {
        amount: !!updatedData.amount,
        date: !!updatedData.date,
        description: !!updatedData.description,
        forma_pagamento: !!updatedData.forma_pagamento,
        conta: !!updatedData.conta
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, present]) => !present)
        .map(([field]) => field);

      if (missingFields.length === 0) {
        // Agora está completa - processar e mover para tabela final
        const finalTransaction = await processCompleteTransaction(
          supabaseClient, 
          pendingTransaction.user_id, 
          updatedData
        );

        // Marcar como processada
        await supabaseClient
          .from('pending_transactions')
          .update({ status: 'processed' })
          .eq('id', pending_transaction_id);

        return new Response(
          JSON.stringify({
            success: true,
            transaction_id: finalTransaction.id,
            status: 'completed',
            message: 'Transação completada e processada com sucesso'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Ainda incompleta - atualizar dados
        await supabaseClient
          .from('pending_transactions')
          .update({
            transaction_data: updatedData,
            missing_fields: missingFields
          })
          .eq('id', pending_transaction_id);

        return new Response(
          JSON.stringify({
            success: true,
            pending_transaction_id,
            status: 'pending',
            missing_fields: missingFields,
            message: 'Dados atualizados. Ainda faltam: ' + missingFields.join(', ')
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // GET /transaction/pending - Listar transações pendentes
    if (req.method === 'GET' && path.endsWith('/transaction/pending')) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: 'Authorization header obrigatório' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabaseClient
        .from('pending_transactions')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          pending_transactions: data,
          count: data.length
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET /transaction/final - Listar transações finais
    if (req.method === 'GET' && path.endsWith('/transaction/final')) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: 'Authorization header obrigatório' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabaseClient
        .from('transactions')
        .select(`
          *,
          categories (name, icon, color),
          accounts (name),
          credit_cards (name)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          transactions: data,
          count: data.length
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Endpoint não encontrado' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro no transaction-manager:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor', 
        details: error instanceof Error ? error.message : 'Erro desconhecido' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function processCompleteTransaction(
  supabaseClient: any, 
  userId: string, 
  transactionData: TransactionData
) {
  // Buscar ou criar categoria
  let categoryId = null;
  if (transactionData.category_name) {
    const { data: existingCategory } = await supabaseClient
      .from('categories')
      .select('id')
      .eq('user_id', userId)
      .eq('name', transactionData.category_name)
      .single();

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const { data: newCategory } = await supabaseClient
        .from('categories')
        .insert({
          user_id: userId,
          name: transactionData.category_name,
          type: transactionData.type || 'expense',
          icon: 'folder',
          color: '#6B7280'
        })
        .select('id')
        .single();
      
      categoryId = newCategory?.id;
    }
  }

  // Buscar conta
  let accountId = null;
  if (transactionData.conta) {
    const { data: account } = await supabaseClient
      .from('accounts')
      .select('id')
      .eq('user_id', userId)
      .eq('name', transactionData.conta)
      .single();
    
    if (!account) {
      throw new Error(`Conta "${transactionData.conta}" não encontrada`);
    }
    accountId = account.id;
  }

  // Criar transação final
  const { data: transaction, error } = await supabaseClient
    .from('transactions')
    .insert({
      user_id: userId,
      amount: transactionData.amount,
      type: transactionData.type || 'expense',
      description: transactionData.description,
      category_id: categoryId,
      account_id: accountId,
      date: transactionData.date || new Date().toISOString().split('T')[0],
      notes: transactionData.notes
    })
    .select()
    .single();

  if (error) throw error;

  // Atualizar saldo da conta se for transação de conta
  if (accountId) {
    const balanceChange = transactionData.type === 'income' 
      ? transactionData.amount 
      : -transactionData.amount!;

    // Buscar saldo atual
    const { data: currentAccount } = await supabaseClient
      .from('accounts')
      .select('current_balance')
      .eq('id', accountId)
      .single();

    if (currentAccount) {
      const newBalance = (currentAccount.current_balance || 0) + balanceChange;
      
      await supabaseClient
        .from('accounts')
        .update({ current_balance: newBalance })
        .eq('id', accountId);
    }
  }

  return transaction;
}