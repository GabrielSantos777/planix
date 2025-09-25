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

interface N8NCategory {
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
  color?: string;
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
      const errorMessage = parseError instanceof Error ? parseError.message : 'Invalid JSON format';
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body', 
          details: errorMessage,
          receivedContentType: contentType 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if it's a category creation request
    if (body.action === 'create_category') {
      const categoryData: N8NCategory = body;
      
      // Validate required fields for category
      if (!categoryData.user_id || !categoryData.name || !categoryData.type) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields for category: user_id, name, type' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if category already exists
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', categoryData.user_id)
        .eq('name', categoryData.name)
        .eq('type', categoryData.type)
        .single();

      if (existingCategory) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            category_id: existingCategory.id,
            message: 'Category already exists' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create new category
      const { data: newCategory, error: categoryError } = await supabase
        .from('categories')
        .insert({
          user_id: categoryData.user_id,
          name: categoryData.name,
          type: categoryData.type,
          icon: categoryData.icon || 'folder',
          color: categoryData.color || '#6B7280'
        })
        .select('id')
        .single();

      if (categoryError) {
        console.error('Error creating category:', categoryError);
        return new Response(
          JSON.stringify({ error: 'Failed to create category', details: categoryError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Category created successfully:', newCategory.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          category_id: newCategory.id,
          message: 'Category created successfully' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle transaction creation (existing logic)
    const transactionData: N8NTransaction = body;

    // Validate required fields
    if (!transactionData.user_id || !transactionData.amount || !transactionData.type || !transactionData.description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: user_id, amount, type, description' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate that account or credit card is specified
    if (!transactionData.account_name && !transactionData.credit_card_name) {
      return new Response(
        JSON.stringify({ error: 'Either account_name or credit_card_name must be specified' }),
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
      } else {
        return new Response(
          JSON.stringify({ error: `Account '${transactionData.account_name}' not found` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
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
      } else {
        return new Response(
          JSON.stringify({ error: `Credit card '${transactionData.credit_card_name}' not found` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
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
      
      // Fetch current balance and calculate new balance
      const { data: currentAccount } = await supabase
        .from('accounts')
        .select('current_balance')
        .eq('id', accountId)
        .single();
      
      if (currentAccount) {
        const newBalance = (currentAccount.current_balance || 0) + balanceChange;
        const { error: balanceError } = await supabase
          .from('accounts')
          .update({ current_balance: newBalance })
          .eq('id', accountId);

        if (balanceError) {
          console.error('Error updating account balance:', balanceError);
        }
      }
    }

    // Update credit card balance if credit card is specified
    if (creditCardId && transactionData.type === 'expense') {
      // Fetch current balance and calculate new balance
      const { data: currentCard } = await supabase
        .from('credit_cards')
        .select('current_balance')
        .eq('id', creditCardId)
        .single();
      
      if (currentCard) {
        const newBalance = (currentCard.current_balance || 0) + transactionData.amount;
        const { error: creditCardError } = await supabase
          .from('credit_cards')
          .update({ current_balance: newBalance })
          .eq('id', creditCardId);

        if (creditCardError) {
          console.error('Error updating credit card balance:', creditCardError);
        }
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});