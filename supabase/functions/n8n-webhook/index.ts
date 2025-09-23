import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface N8NTransaction {
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  category_name?: string;
  account_name?: string;
  credit_card_name?: string;
  date?: string;
  notes?: string;
}

serve(async (req) => {
  console.log('N8N webhook called:', req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if request has body
    const contentType = req.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    let body;
    try {
      const text = await req.text();
      console.log('Raw request body:', text);
      
      if (!text || text.trim() === '') {
        throw new Error('Empty request body');
      }
      
      body = JSON.parse(text);
      console.log('Parsed JSON body:', body);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body', 
          details: parseError.message,
          receivedContentType: contentType 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const transactionData: N8NTransaction = body;

    // Validate required fields
    if (!transactionData.user_id || !transactionData.amount || !transactionData.type || !transactionData.description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: user_id, amount, type, description' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get or create category
    let categoryId = null;
    if (transactionData.category_name) {
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', transactionData.user_id)
        .eq('name', transactionData.category_name)
        .eq('type', transactionData.type)
        .single();

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        // Create new category
        const { data: newCategory, error: categoryError } = await supabase
          .from('categories')
          .insert({
            user_id: transactionData.user_id,
            name: transactionData.category_name,
            type: transactionData.type,
            icon: 'folder',
            color: '#6B7280'
          })
          .select('id')
          .single();

        if (categoryError) {
          console.error('Error creating category:', categoryError);
        } else {
          categoryId = newCategory.id;
        }
      }
    }

    // Get account ID if specified
    let accountId = null;
    if (transactionData.account_name) {
      const { data: account } = await supabase
        .from('accounts')
        .select('id')
        .eq('user_id', transactionData.user_id)
        .eq('name', transactionData.account_name)
        .single();

      if (account) {
        accountId = account.id;
      }
    }

    // Get credit card ID if specified
    let creditCardId = null;
    if (transactionData.credit_card_name) {
      const { data: creditCard } = await supabase
        .from('credit_cards')
        .select('id')
        .eq('user_id', transactionData.user_id)
        .eq('name', transactionData.credit_card_name)
        .single();

      if (creditCard) {
        creditCardId = creditCard.id;
      }
    }

    // Create transaction
    const transactionInsert = {
      user_id: transactionData.user_id,
      amount: Math.abs(transactionData.amount),
      type: transactionData.type,
      description: transactionData.description,
      category_id: categoryId,
      account_id: accountId,
      credit_card_id: creditCardId,
      date: transactionData.date || new Date().toISOString().split('T')[0],
      notes: transactionData.notes,
      currency: 'BRL'
    };

    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert(transactionInsert)
      .select()
      .single();

    if (transactionError) {
      console.error('Error creating transaction:', transactionError);
      return new Response(
        JSON.stringify({ error: 'Failed to create transaction', details: transactionError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update account balance if account is specified
    if (accountId) {
      const balanceChange = transactionData.type === 'income' ? transactionData.amount : -transactionData.amount;
      
      const { error: balanceError } = await supabase
        .from('accounts')
        .update({ current_balance: supabase.sql`current_balance + ${balanceChange}` })
        .eq('id', accountId);

      if (balanceError) {
        console.error('Error updating account balance:', balanceError);
      }
    }

    // Update credit card balance if credit card is specified
    if (creditCardId && transactionData.type === 'expense') {
      const { error: creditCardError } = await supabase
        .from('credit_cards')
        .update({ current_balance: supabase.sql`current_balance + ${transactionData.amount}` })
        .eq('id', creditCardId);

      if (creditCardError) {
        console.error('Error updating credit card balance:', creditCardError);
      }
    }

    console.log('Transaction created successfully:', transaction.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        transaction_id: transaction.id,
        message: 'Transaction registered successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in n8n-webhook function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});