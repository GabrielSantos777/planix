import { useEffect, useMemo, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Eye, EyeOff, TrendingUp, TrendingDown, CreditCard, Wallet,
  PlusCircle, MinusCircle, ArrowRightLeft, ChevronLeft, ChevronRight,
  DollarSign
} from "lucide-react"
import { useCurrency } from "@/context/CurrencyContext"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import Layout from "@/components/Layout"
import { usePrivacy } from "@/context/PrivacyContext"
import { WealthEvolutionChart } from "@/components/WealthEvolutionChart"
import { FinancialInsights } from "@/components/FinancialInsights"
import { DashboardSkeleton } from "@/components/LoadingSkeletons"
import { EmptyState } from "@/components/EmptyState"
import { useCapacitor } from "@/hooks/useCapacitor"
import { usePushNotifications } from "@/hooks/usePushNotifications"
import { useNavigate } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getInvoiceForPurchase } from "@/hooks/useCreditCardInvoice"
import { parseLocalDate } from "@/utils/dateUtils"

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const Dashboard = () => {
  const { accounts, transactions, investments, creditCards, loading } = useSupabaseData()
  const { isNative, platform } = useCapacitor()
  const { isRegistered } = usePushNotifications()
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, togglePrivacy, hideValue } = usePrivacy()
  const navigate = useNavigate()

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    if (isNative && isRegistered) {
      console.log(`Push notifications active on ${platform}`)
    }
  }, [isNative, platform, isRegistered])

  const formatPrivacyCurrency = useCallback((amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }, [formatCurrency, isPrivacyEnabled, hideValue])

  // Month navigation
  const goToPreviousMonth = useCallback(() => {
    setSelectedMonth(prev => {
      if (prev === 0) {
        setSelectedYear(y => y - 1)
        return 11
      }
      return prev - 1
    })
  }, [])

  const goToNextMonth = useCallback(() => {
    setSelectedMonth(prev => {
      if (prev === 11) {
        setSelectedYear(y => y + 1)
        return 0
      }
      return prev + 1
    })
  }, [])

  const goToCurrentMonth = useCallback(() => {
    setSelectedMonth(new Date().getMonth())
    setSelectedYear(new Date().getFullYear())
  }, [])

  const isCurrentMonth = selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear()

  // Current month transactions
  const currentMonthTransactions = useMemo(() =>
    transactions.filter(t => {
      const d = parseLocalDate(t.date)
      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear
    }),
    [transactions, selectedMonth, selectedYear]
  )

  const monthlyIncome = useMemo(() =>
    currentMonthTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + (t.amount || 0), 0),
    [currentMonthTransactions]
  )

  const monthlyExpenses = useMemo(() =>
    currentMonthTransactions
      .filter(t => t.type === "expense" && t.account_id)
      .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0),
    [currentMonthTransactions]
  )

  // Credit card expenses using invoice logic
  const isCreditCardTransactionInInvoice = useCallback((transaction: typeof transactions[0], targetMonth: number, targetYear: number) => {
    if (!transaction.credit_card_id) return false
    const card = creditCards.find(c => c.id === transaction.credit_card_id)
    if (!card) return false
    const purchaseDate = parseLocalDate(transaction.date)
    const invoiceInfo = getInvoiceForPurchase(purchaseDate, card.closing_day, card.due_day)
    return invoiceInfo.month === targetMonth && invoiceInfo.year === targetYear
  }, [creditCards])

  const monthlyCreditCardExpenses = useMemo(() =>
    transactions
      .filter(t => t.type === "expense" && t.credit_card_id && isCreditCardTransactionInInvoice(t, selectedMonth, selectedYear))
      .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0),
    [transactions, selectedMonth, selectedYear, isCreditCardTransactionInInvoice]
  )

  // Credit card expenses made only by me (no contact linked)
  const myCreditCardExpenses = useMemo(() =>
    transactions
      .filter(t => t.type === "expense" && t.credit_card_id && !t.contact_id && isCreditCardTransactionInInvoice(t, selectedMonth, selectedYear))
      .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0),
    [transactions, selectedMonth, selectedYear, isCreditCardTransactionInInvoice]
  )

  const othersOnCreditCard = monthlyCreditCardExpenses - myCreditCardExpenses

  const totalExpenses = monthlyExpenses + monthlyCreditCardExpenses

  // Account balance computed from initial + all movements
  const computeAccountBalance = useCallback((accountId: string) => {
    const acc = accounts.find(a => a.id === accountId)
    const initial = acc?.initial_balance || 0
    const movement = transactions
      .filter(t => t.account_id === accountId)
      .reduce((sum, t) => sum + (t.amount || 0), 0)
    return initial + movement
  }, [accounts, transactions])

  const totalBalance = useMemo(() =>
    accounts.reduce((sum, account) => sum + computeAccountBalance(account.id), 0),
    [accounts, computeAccountBalance]
  )

  const totalInvestmentValue = useMemo(() =>
    investments.reduce((total, inv) => total + (inv.quantity * inv.current_price), 0),
    [investments]
  )

  const monthlyNet = monthlyIncome - totalExpenses

  const accountBalancesData = useMemo(() =>
    accounts
      .filter(acc => acc.is_active)
      .map(acc => ({ name: acc.name, balance: computeAccountBalance(acc.id) }))
      .sort((a, b) => b.balance - a.balance),
    [accounts, computeAccountBalance]
  )

  const recentTransactions = useMemo(() => {
    const endOfToday = new Date()
    endOfToday.setHours(23, 59, 59, 999)

    return [...transactions]
      .filter(t => t.type !== "transfer")
      .filter(t => parseLocalDate(t.date).getTime() <= endOfToday.getTime())
      .sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime())
      .slice(0, 5)
  }, [transactions])

  // Show skeleton while loading
  if (loading) {
    return (
      <Layout>
        <DashboardSkeleton />
      </Layout>
    )
  }

  // Show empty state if no data at all
  const hasAnyData = accounts.length > 0 || transactions.length > 0

  return (
    <Layout>
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold truncate">Dashboard</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Visão geral das suas finanças</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={togglePrivacy}
              title={isPrivacyEnabled ? "Mostrar valores" : "Ocultar valores"}
              className="w-full sm:w-auto"
            >
              {isPrivacyEnabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="ml-2">{isPrivacyEnabled ? "Mostrar" : "Ocultar"} valores</span>
            </Button>
          </div>

          {/* Month Selector */}
          <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-muted/50 rounded-lg border">
            <Button variant="outline" size="sm" onClick={goToPreviousMonth} className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <span className="text-sm sm:text-base font-semibold">
                {MONTH_NAMES[selectedMonth]} {selectedYear}
              </span>
              {!isCurrentMonth && (
                <Button variant="ghost" size="sm" onClick={goToCurrentMonth} className="text-xs h-7">
                  Voltar para hoje
                </Button>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={goToNextMonth} className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!hasAnyData ? (
          <EmptyState
            variant="accounts"
            title="Bem-vindo ao PLANIX!"
            description="Comece cadastrando suas contas bancárias e cartões de crédito para ter uma visão completa das suas finanças."
            actionLabel="Cadastrar Contas"
            onAction={() => navigate('/contas')}
          />
        ) : (
          <>
            {/* Quick Actions */}
            <Card className="border-primary/30 bg-gradient-to-r from-primary/10 via-background to-success/10 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Ações Rápidas</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Registre movimentações em poucos toques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    className="w-full justify-start gap-3 h-auto py-4 bg-success hover:bg-success/90 text-success-foreground"
                    onClick={() => navigate('/transacoes?type=income')}
                  >
                    <PlusCircle className="h-5 w-5 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold text-sm">Nova Receita</div>
                      <div className="text-xs text-success-foreground/90">Adicionar entrada</div>
                    </div>
                  </Button>
                  <Button
                    className="w-full justify-start gap-3 h-auto py-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    onClick={() => navigate('/transacoes?type=expense')}
                  >
                    <MinusCircle className="h-5 w-5 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold text-sm">Nova Despesa</div>
                      <div className="text-xs text-destructive-foreground/90">Adicionar gasto</div>
                    </div>
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-start gap-3 h-auto py-4 border border-primary/20 hover:bg-primary/10"
                    onClick={() => navigate('/transacoes?type=transfer')}
                  >
                    <ArrowRightLeft className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold text-sm">Transferência</div>
                      <div className="text-xs text-muted-foreground">Entre contas</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Receitas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-success">
                    {formatPrivacyCurrency(monthlyIncome)}
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Entradas do mês</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Despesas</CardTitle>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-destructive">
                    {formatPrivacyCurrency(monthlyExpenses)}
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Gastos em conta no mês</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Saldo Mensal</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-lg sm:text-2xl font-bold ${monthlyNet >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatPrivacyCurrency(monthlyNet)}
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Receitas - gastos totais</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Cartão de Crédito</CardTitle>
                  <CreditCard className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-orange-500">
                      {formatPrivacyCurrency(monthlyCreditCardExpenses)}
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Total geral da fatura</p>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-orange-400">{formatPrivacyCurrency(myCreditCardExpenses)}</p>
                      <p className="text-[10px] text-muted-foreground">Somente eu</p>
                    </div>
                    {othersOnCreditCard > 0 && (
                      <div className="text-right">
                        <p className="text-xs font-semibold text-muted-foreground">{formatPrivacyCurrency(othersOnCreditCard)}</p>
                        <p className="text-[10px] text-muted-foreground">Outros contatos</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saldo Total Geral</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {formatPrivacyCurrency(totalBalance)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Soma de todas as contas</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Investimentos</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-success">
                    {formatPrivacyCurrency(totalInvestmentValue)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Valor total investido</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Saldo por Conta</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Distribuição entre contas</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] sm:h-[300px]">
                  {accountBalancesData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={accountBalancesData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="balance" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                      Nenhuma conta cadastrada
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Evolução Patrimonial</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Crescimento ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] sm:h-[300px]">
                  <WealthEvolutionChart />
                </CardContent>
              </Card>
            </div>

            {/* Financial Insights */}
            <FinancialInsights
              transactions={transactions}
              monthlyIncome={monthlyIncome}
              monthlyExpenses={monthlyExpenses}
              totalBalance={totalBalance}
              formatCurrency={formatCurrency}
            />
            {/* Recent Transactions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">Transações Recentes</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Últimas 5 transações até hoje</CardDescription>
                </div>
                {recentTransactions.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => navigate('/transacoes')} className="text-xs">
                    Ver todas
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {recentTransactions.length === 0 ? (
                    <EmptyState
                      variant="transactions"
                      title="Nenhuma transação recente"
                      description="Não há movimentações concluídas até hoje para exibir aqui."
                      actionLabel="Ver Transações"
                      onAction={() => navigate('/transacoes')}
                    />
                ) : (
                  <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className={`mt-0.5 rounded-full p-2 flex-shrink-0 ${
                            transaction.type === 'income'
                              ? 'bg-success/10 text-success'
                              : 'bg-destructive/10 text-destructive'
                          }`}>
                            {transaction.type === 'income' ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {parseLocalDate(transaction.date).toLocaleDateString('pt-BR')}
                              {transaction.is_installment && transaction.installment_number && transaction.installments && (
                                <> {`- Parcela ${transaction.installment_number}/${transaction.installments}`}</>
                              )}
                              {transaction.category?.name && ` - ${transaction.category.name}`}
                            </p>
                          </div>
                        </div>
                        <div className={`text-right font-semibold text-sm sm:text-base flex-shrink-0 ${
                          transaction.type === 'income' ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'} {formatPrivacyCurrency(Math.abs(transaction.amount))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Dashboard
