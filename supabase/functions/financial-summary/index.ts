import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  console.log('Financial Summary API called:', req.method, req.url)

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }), 
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { user_id, phone_number, account_id, account_name } = await req.json()
    console.log('Request data:', { user_id, phone_number, account_id, account_name })

    if (!user_id && !phone_number) {
      return new Response(
        JSON.stringify({ error: 'user_id ou phone_number é obrigatório' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    let userId = user_id

    // Se só temos o telefone, buscar o user_id
    if (!userId && phone_number) {
      console.log('Searching user by phone:', phone_number)
      
      // Normalizar o número removendo espaços, parênteses e formatação
      const cleanPhone = phone_number.replace(/[\s\(\)\-]/g, '')
      console.log('Clean phone:', cleanPhone)
      
      // Primeiro tentar busca exata
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('phone', phone_number)
        .maybeSingle()

      // Se não encontrar, tentar na tabela whatsapp_integrations
      if (profileError || !profileData) {
        console.log('Not found in profiles, trying whatsapp_integrations')
        const { data: whatsappData, error: whatsappError } = await supabase
          .from('whatsapp_integrations')
          .select('user_id')
          .eq('phone_number', phone_number)
          .maybeSingle()
        
        if (whatsappData) {
          profileData = whatsappData
          profileError = null
        } else {
          // Busca flexível - remover caracteres especiais e tentar várias variações
          const variations = [
            cleanPhone,
            cleanPhone.replace(/^\+55/, ''),  // Remove +55
            '+55' + cleanPhone.replace(/^\+55/, ''), // Garante +55
          ]
          
          console.log('Trying phone variations:', variations)
          
          for (const variation of variations) {
            const { data: flexData, error: flexError } = await supabase
              .from('whatsapp_integrations')
              .select('user_id')
              .ilike('phone_number', `%${variation.slice(-10)}%`) // Últimos 10 dígitos
              .maybeSingle()
            
            if (flexData) {
              profileData = flexData
              profileError = null
              console.log('Found with variation:', variation)
              break
            }
          }
        }
      }

      if (profileError || !profileData) {
        console.error('User not found by phone after all attempts:', profileError)
        return new Response(
          JSON.stringify({ 
            error: 'Usuário não encontrado com este telefone',
            debug: {
              searched_phone: phone_number,
              clean_phone: cleanPhone,
              message: 'Verifique se o telefone está cadastrado no sistema'
            }
          }), 
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
      userId = profileData.user_id
    }

    console.log('Using userId:', userId)

    // Buscar todas as transações do usuário
    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (transactionsError) {
      console.error('Error fetching transactions:', transactionsError)
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar transações' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Buscar contas do usuário
    const { data: accounts, error: accountsError } = await supabase
      .from('accounts')
      .select('id, name, current_balance, initial_balance')
      .eq('user_id', userId)
      .eq('is_active', true)

    if (accountsError) {
      console.error('Error fetching accounts:', accountsError)
    }

    // Buscar cartões de crédito do usuário
    const { data: creditCards, error: creditCardsError } = await supabase
      .from('credit_cards')
      .select('id, name, limit_amount, current_balance')
      .eq('user_id', userId)
      .eq('is_active', true)

    if (creditCardsError) {
      console.error('Error fetching credit cards:', creditCardsError)
    }

    // Buscar metas do usuário
    const { data: goals, error: goalsError } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)

    if (goalsError) {
      console.error('Error fetching goals:', goalsError)
    }

    // Buscar investimentos do usuário
    const { data: investments, error: investmentsError } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId)

    if (investmentsError) {
      console.error('Error fetching investments:', investmentsError)
    }

    // Calcular saldo total das contas com suporte a seleção por conta
    let accountsBalance = 0
    let selectedAccount = null as any
    const normalize = (s: any) => (s ?? '').toString().toLowerCase().trim()
    if (account_id || account_name) {
      selectedAccount = accounts?.find((a: any) =>
        (account_id && a.id === account_id) ||
        (account_name && normalize(a.name).includes(normalize(account_name))
      )) as any
      if (selectedAccount) {
        accountsBalance = Number(selectedAccount.current_balance) || 0
      } else {
        accountsBalance = accounts?.reduce((total, account) => total + (Number(account.current_balance) || 0), 0) || 0
      }
    } else {
      accountsBalance = accounts?.reduce((total, account) => total + (Number(account.current_balance) || 0), 0) || 0
    }
    console.log('Accounts list:', accounts?.map(a => ({ id: a.id, name: a.name, current_balance: Number(a.current_balance)||0 })))
    if (selectedAccount) console.log('Selected account:', { id: selectedAccount.id, name: selectedAccount.name, current_balance: Number(selectedAccount.current_balance)||0 })

    // Calcular valor total dos investimentos
    const investmentsBalance = investments?.reduce((total, investment) => {
      return total + (Number(investment.quantity) * Number(investment.current_price))
    }, 0) || 0

    // Calcular dívida total dos cartões
    const creditCardsDebt = creditCards?.reduce((total, card) => {
      return total + (Number(card.current_balance) || 0)
    }, 0) || 0

    // Saldo total geral: contas + investimentos - cartões
    const saldoTotal = accountsBalance + investmentsBalance - creditCardsDebt

    console.log('Balances computed:', {
      accountsBalance,
      investmentsBalance,
      creditCardsDebt,
      saldoTotal,
      accountsCount: accounts?.length || 0,
      investmentsCount: investments?.length || 0,
      creditCardsCount: creditCards?.length || 0,
    })

    // Calcular gastos por categoria (apenas despesas)
    const gastosPorCategoria: Record<string, number> = {}
    
    transactions?.forEach(transaction => {
      if (transaction.type === 'expense' && transaction.category) {
        const categoryName = transaction.category.name
        const amount = Math.abs(Number(transaction.amount) || 0)
        gastosPorCategoria[categoryName] = (gastosPorCategoria[categoryName] || 0) + amount
      }
    })

    // Processar metas
    const metasProcessadas = goals?.map(goal => {
      const objetivo = Number(goal.target_amount) || 0
      const atual = Number(goal.current_amount) || 0
      const progressoPercentual = objetivo > 0 ? Math.round((atual / objetivo) * 100) : 0

      return {
        titulo: goal.title,
        objetivo: objetivo,
        atual: atual,
        progresso_percentual: progressoPercentual,
        status: goal.status
      }
    }) || []

    // Gerar resumo do mês atual
    const agora = new Date()
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1)
    
    const transacoesMesAtual = transactions?.filter(t => 
      new Date(t.date) >= inicioMes
    ) || []

    const gastosMesAtual = transacoesMesAtual
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + Math.abs(Number(t.amount) || 0), 0)

    const receitasMesAtual = transacoesMesAtual
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + (Number(t.amount) || 0), 0)

    // Encontrar principal categoria de gastos do mês
    const categoriasMesAtual: Record<string, number> = {}
    transacoesMesAtual
      .filter(t => t.type === 'expense' && t.category)
      .forEach(t => {
        const categoryName = t.category.name
        const amount = Math.abs(Number(t.amount) || 0)
        categoriasMesAtual[categoryName] = (categoriasMesAtual[categoryName] || 0) + amount
      })

    const principalCategoria = Object.entries(categoriasMesAtual)
      .sort(([,a], [,b]) => b - a)[0]

    // Preparar resposta final
    const response = {
      saldo: Number(saldoTotal.toFixed(2)),
      saldo_total_geral: Number(saldoTotal.toFixed(2)),
      saldo_contas: Number(accountsBalance.toFixed(2)),
      total_investimentos: Number(investmentsBalance.toFixed(2)),
      total_divida_cartoes: Number(creditCardsDebt.toFixed(2)),
      gastos_por_categoria: Object.fromEntries(
        Object.entries(gastosPorCategoria).map(([cat, valor]) => [cat, Number(valor.toFixed(2))])
      ),
      metas: metasProcessadas,
      conta_selecionada: selectedAccount ? {
        id: selectedAccount.id,
        nome: selectedAccount.name,
        saldo_atual: Number(selectedAccount.current_balance || 0),
        saldo_inicial: Number((selectedAccount as any).initial_balance || 0)
      } : null,
      contas: accounts?.map(account => ({
        id: account.id,
        nome: account.name,
        saldo: Number(account.current_balance || 0), // alias para compatibilidade
        saldo_atual: Number(account.current_balance || 0),
        saldo_inicial: Number((account as any).initial_balance || 0)
      })) || [],
      cartoes_credito: creditCards?.map(card => ({
        id: card.id,
        nome: card.name,
        limite: Number(card.limit_amount || 0),
        saldo_atual: Number(card.current_balance || 0)
      })) || [],
      resumo_mensal: {
        mes_ano: agora.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
        total_gastos: Number(gastosMesAtual.toFixed(2)),
        total_receitas: Number(receitasMesAtual.toFixed(2)),
        principal_categoria: principalCategoria ? {
          nome: principalCategoria[0],
          valor: Number(principalCategoria[1].toFixed(2))
        } : null,
        saldo_mensal: Number((receitasMesAtual - gastosMesAtual).toFixed(2))
      },
      estatisticas: {
        total_transacoes: transactions?.length || 0,
        total_categorias: Object.keys(gastosPorCategoria).length,
        total_metas: metasProcessadas.length,
        total_contas: accounts?.length || 0,
        total_cartoes: creditCards?.length || 0,
        ultima_atualizacao: new Date().toISOString()
      }
    }

    console.log('Financial summary generated successfully for user:', userId)
    
    return new Response(
      JSON.stringify(response), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in financial-summary function:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})