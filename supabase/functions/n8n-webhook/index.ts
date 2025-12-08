import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

// SECURITY: Input validation schemas
const transactionSchema = z.object({
  user_id: z.string().uuid('Invalid user ID format'),
  amount: z.number().min(-1000000).max(1000000),
  type: z.enum(['income', 'expense']),
  description: z.string().trim().min(1).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(d => {
    const date = new Date(d);
    const now = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(now.getFullYear() - 2);
    const oneYearAhead = new Date();
    oneYearAhead.setFullYear(now.getFullYear() + 1);
    return date >= twoYearsAgo && date <= oneYearAhead;
  }, 'Date must be within 2 years ago and 1 year ahead').optional(),
  category_name: z.string().trim().max(50).optional(),
  payment_method: z.string().max(50).optional(),
  account_name: z.string().max(100).optional(),
  credit_card_name: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

const categorySchema = z.object({
  user_id: z.string().uuid('Invalid user ID format'),
  name: z.string().trim().min(1).max(50),
  type: z.enum(['income', 'expense']),
  icon: z.string().max(50).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

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

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Require API key authentication
    const apiKey = req.headers.get('x-api-key');
    const expectedApiKey = Deno.env.get('N8N_API_KEY');
    
    // Explicitly fail if secret is not configured
    if (!expectedApiKey) {
      console.error('N8N_API_KEY secret is not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!apiKey || apiKey !== expectedApiKey) {
      console.error('Invalid or missing API key');
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid or missing API key' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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

    // Handle category creation (DISABLED: categories must be managed in app)
    if (body.action === 'create_category') {
      return new Response(
        JSON.stringify({
          error: 'Criação de categorias via webhook desabilitada. Use o app para gerenciar categorias.',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // SECURITY: Validate transaction input
    let validatedTransaction;
    try {
      validatedTransaction = transactionSchema.parse(body);
    } catch (error) {
      console.error('Transaction validation failed:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid transaction data', details: error.errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate that account or credit card is specified
    if (!validatedTransaction.account_name && !validatedTransaction.credit_card_name) {
      return new Response(
        JSON.stringify({ error: 'Either account_name or credit_card_name must be specified' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get or create category
    let categoryId = null;
    if (validatedTransaction.category_name) {
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', validatedTransaction.user_id)
        .eq('name', validatedTransaction.category_name)
        .eq('type', validatedTransaction.type)
        .single();

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const { data: newCategory, error: categoryError } = await supabase
          .from('categories')
          .insert({
            user_id: validatedTransaction.user_id,
            name: validatedTransaction.category_name,
            type: validatedTransaction.type,
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

    // Get account ID
    let accountId = null;
    if (validatedTransaction.account_name) {
      const { data: account } = await supabase
        .from('accounts')
        .select('id')
        .eq('user_id', validatedTransaction.user_id)
        .eq('name', validatedTransaction.account_name)
        .single();

      if (account) {
        accountId = account.id;
      } else {
        return new Response(
          JSON.stringify({ error: `Account '${validatedTransaction.account_name}' not found` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Get credit card ID
    let creditCardId = null;
    if (validatedTransaction.credit_card_name) {
      const { data: creditCard } = await supabase
        .from('credit_cards')
        .select('id')
        .eq('user_id', validatedTransaction.user_id)
        .eq('name', validatedTransaction.credit_card_name)
        .single();

      if (creditCard) {
        creditCardId = creditCard.id;
      } else {
        return new Response(
          JSON.stringify({ error: `Credit card '${validatedTransaction.credit_card_name}' not found` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Create transaction
    const transactionInsert = {
      user_id: validatedTransaction.user_id,
      amount: Math.abs(validatedTransaction.amount),
      type: validatedTransaction.type,
      description: validatedTransaction.description,
      category_id: categoryId,
      account_id: accountId,
      credit_card_id: creditCardId,
      date: validatedTransaction.date || new Date().toISOString().split('T')[0],
      notes: validatedTransaction.notes,
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
