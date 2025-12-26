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
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    
    // Create client with anon key for auth verification
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey)
    // Service role client for data queries (after auth verification)
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }), 
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // ========== AUTHENTICATION CHECK ==========
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('No authorization header provided')
      return new Response(
        JSON.stringify({ error: 'Não autorizado: token de autenticação ausente' }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message)
      return new Response(
        JSON.stringify({ error: 'Não autorizado: token inválido ou expirado' }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Authenticated user:', user.id)
    // ========== END AUTHENTICATION CHECK ==========

    const { account_id, account_name } = await req.json()
    console.log('Request data:', { account_id, account_name })

    // User can only access their own data - use the authenticated user's ID
    const userId = user.id

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
      .select('id, name, type, current_balance, initial_balance')
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

    // Calcular saldo total das contas com suporte a seleção por conta (exclui contas de investimento da soma)
    let accountsBalance = 0
    let selectedAccount = null as any
    const normalize = (s: any) => (s ?? '').toString().toLowerCase().trim()

    const isInvestmentAccount = (a: any) => (a?.type === 'investment') || (normalize(a?.name) === 'investimentos - conta geral')

    // Mapear movimentações por conta e calcular saldo a partir do saldo inicial + transações
    const movementByAccount: Record<string, number> = {}
    transactions?.forEach((t: any) => {
      if (t.account_id) {
        const amt = Number(t.amount) || 0
        movementByAccount[t.account_id] = (movementByAccount[t.account_id] || 0) + amt
      }
    })
    const computedBalance = (a: any) => (Number((a as any).initial_balance) || 0) + (movementByAccount[a.id] || 0)

    if (account_id || account_name) {
      selectedAccount = accounts?.find((a: any) =>
        (account_id && a.id === account_id) ||
        (account_name && normalize(a.name).includes(normalize(account_name))
      )) as any

      if (selectedAccount) {
        // Se a conta selecionada é de investimento, não incluir no saldo de contas para evitar dupla contagem
        accountsBalance = isInvestmentAccount(selectedAccount)
          ? 0
          : computedBalance(selectedAccount)
      } else {
        accountsBalance = accounts
          ?.filter((a: any) => !isInvestmentAccount(a))
          ?.reduce((total: number, a: any) => total + computedBalance(a), 0) || 0
      }
    } else {
      accountsBalance = accounts
        ?.filter((a: any) => !isInvestmentAccount(a))
        ?.reduce((total: number, a: any) => total + computedBalance(a), 0) || 0
    }

    console.log('Accounts list (excluindo investimento na soma):', accounts?.map(a => ({ id: a.id, name: a.name, type: a.type, current_balance: Number(a.current_balance)||0, computed_balance: Number(computedBalance(a).toFixed(2)) })))
    if (selectedAccount) console.log('Selected account:', { id: selectedAccount.id, name: selectedAccount.name, type: selectedAccount.type, current_balance: Number(selectedAccount.current_balance)||0, computed_balance: Number(computedBalance(selectedAccount).toFixed(2)) })

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
        saldo_atual: Number(computedBalance(selectedAccount).toFixed(2)),
        saldo_inicial: Number((selectedAccount as any).initial_balance || 0)
      } : null,
      contas: accounts?.map(account => ({
        id: account.id,
        nome: account.name,
        saldo: Number(computedBalance(account).toFixed(2)), // alias para compatibilidade
        saldo_atual: Number(computedBalance(account).toFixed(2)),
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