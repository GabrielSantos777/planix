import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface N8NCategory {
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
  color?: string;
}

serve(async (req) => {
  console.log('N8N Category webhook called:', req.method);

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

    const categoryData: N8NCategory = body;
    
    // Validate required fields for category
    if (!categoryData.user_id || !categoryData.name || !categoryData.type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: user_id, name, type' }),
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

  } catch (error) {
    console.error('Error in n8n-category-webhook function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});