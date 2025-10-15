import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// SECURITY: Input validation schemas
const transactionDataSchema = z.object({
  amount: z.number().min(-1000000).max(1000000).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(d => {
    const date = new Date(d);
    const now = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(now.getFullYear() - 2);
    const oneYearAhead = new Date();
    oneYearAhead.setFullYear(now.getFullYear() + 1);
    return date >= twoYearsAgo && date <= oneYearAhead;
  }, 'Date must be within 2 years ago and 1 year ahead').optional(),
  description: z.string().trim().min(1).max(200).optional(),
  forma_pagamento: z.string().max(50).optional(),
  conta: z.string().max(100).optional(),
  category_name: z.string().trim().max(50).optional(),
  type: z.enum(['income', 'expense']).optional(),
  notes: z.string().max(500).optional(),
});

const complementSchema = z.object({
  pending_transaction_id: z.string().uuid(),
  complementary_data: transactionDataSchema,
});

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
    // SECURITY: Require authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // SECURITY: Get authenticated user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      console.error('User verification failed:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = user.id;
    const url = new URL(req.url);
    const path = url.pathname;

    // POST /transaction - Create new transaction
    if (req.method === 'POST' && path.endsWith('/transaction')) {
      const body = await req.json();
      
      // SECURITY: Validate input
      let validatedData;
      try {
        validatedData = transactionDataSchema.parse(body);
      } catch (error) {
        console.error('Transaction validation failed:', error);
        return new Response(
          JSON.stringify({ error: 'Invalid transaction data', details: error.errors }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const transactionData: TransactionData = validatedData;

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
        const finalTransaction = await processCompleteTransaction(supabaseClient, userId, transactionData);
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
        const { data, error } = await supabaseClient
          .from('pending_transactions')
          .insert({
            user_id: userId,
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

    // POST /transaction/complement - Update pending transaction
    if (req.method === 'POST' && path.endsWith('/transaction/complement')) {
      const body = await req.json();
      
      // SECURITY: Validate input
      let validatedInput;
      try {
        validatedInput = complementSchema.parse(body);
      } catch (error) {
        console.error('Complement validation failed:', error);
        return new Response(
          JSON.stringify({ error: 'Invalid complement data', details: error.errors }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { pending_transaction_id, complementary_data } = validatedInput;

      const { data: pendingTransaction, error: fetchError } = await supabaseClient
        .from('pending_transactions')
        .select('*')
        .eq('id', pending_transaction_id)
        .eq('user_id', userId)  // SECURITY: Ensure user owns this transaction
        .eq('status', 'pending')
        .single();

      if (fetchError || !pendingTransaction) {
        return new Response(
          JSON.stringify({ error: 'Transação pendente não encontrada' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const updatedData = { ...pendingTransaction.transaction_data, ...complementary_data };

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
        const finalTransaction = await processCompleteTransaction(
          supabaseClient, 
          userId, 
          updatedData
        );

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

    // GET /transaction/pending - List pending transactions
    if (req.method === 'GET' && path.endsWith('/transaction/pending')) {
      const { data, error } = await supabaseClient
        .from('pending_transactions')
        .select('*')
        .eq('user_id', userId)  // SECURITY: Only user's own transactions
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

    // GET /transaction/final - List final transactions
    if (req.method === 'GET' && path.endsWith('/transaction/final')) {
      const { data, error } = await supabaseClient
        .from('transactions')
        .select(`
          *,
          categories (name, icon, color),
          accounts (name),
          credit_cards (name)
        `)
        .eq('user_id', userId)  // SECURITY: Only user's own transactions
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

  return transaction;
}
