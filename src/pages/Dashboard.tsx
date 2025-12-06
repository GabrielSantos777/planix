import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, TrendingUp, TrendingDown, CreditCard, Wallet, PlusCircle, MinusCircle, ArrowRightLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCurrency } from "@/context/CurrencyContext"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import Layout from "@/components/Layout"
import { useAuth } from "@/context/AuthContext"
import { usePrivacy } from "@/context/PrivacyContext"
import { WealthEvolutionChart } from "@/components/WealthEvolutionChart"
import { useCapacitor } from "@/hooks/useCapacitor"
import { usePushNotifications } from "@/hooks/usePushNotifications"
import { useNavigate } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getInvoiceForPurchase } from "@/hooks/useCreditCardInvoice"

const Dashboard = () => {
  const { user } = useAuth()
  const { accounts, transactions, investments, creditCards } = useSupabaseData()
  const { isNative, platform } = useCapacitor()
  const { isRegistered } = usePushNotifications()
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, togglePrivacy, hideValue } = usePrivacy()
  const navigate = useNavigate()

  // State for selected month/year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    if (isNative) {
      console.log(`Running on native ${platform} platform`)
      if (isRegistered) {
        console.log('Push notifications registered successfully')
      }
    }
  }, [isNative, platform, isRegistered])

  const getTotalInvestmentValue = () => {
    return investments.reduce((total, investment) => {
      return total + (investment.quantity * investment.current_price)
    }, 0)
  }

  const formatPrivacyCurrency = (amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }

  // Month navigation functions
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(selectedMonth + 1)
    }
  }

  const goToCurrentMonth = () => {
    setSelectedMonth(new Date().getMonth())
    setSelectedYear(new Date().getFullYear())
  }

  const isCurrentMonth = selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear()

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date)
    return transactionDate.getMonth() === selectedMonth &&
      transactionDate.getFullYear() === selectedYear
  })

  const monthlyIncome = currentMonthTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  // Monthly expenses (only account transactions, not credit card)
  const monthlyExpenses = currentMonthTransactions
    .filter(t => t.type === "expense" && t.account_id)
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  // Helper function to check if a credit card transaction belongs to a specific invoice month/year
  const isCreditCardTransactionInInvoice = (transaction: typeof transactions[0], targetMonth: number, targetYear: number) => {
    if (!transaction.credit_card_id) return false
    
    const card = creditCards.find(c => c.id === transaction.credit_card_id)
    if (!card) return false
    
    const purchaseDate = new Date(transaction.date)
    const invoiceInfo = getInvoiceForPurchase(purchaseDate, card.closing_day, card.due_day)
    
    return invoiceInfo.month === targetMonth && invoiceInfo.year === targetYear
  }

  // Monthly credit card expenses - using invoice logic
  const monthlyCreditCardExpenses = transactions
    .filter(t => t.type === "expense" && t.credit_card_id && isCreditCardTransactionInInvoice(t, selectedMonth, selectedYear))
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  // Total expenses + credit card
  const totalExpenses = monthlyExpenses + monthlyCreditCardExpenses

  // Expenses made by me (without contact_id)
  const myExpenses = currentMonthTransactions
    .filter(t => t.type === "expense" && !t.contact_id && t.account_id)
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  // My credit card expenses - using invoice logic
  const myCreditCardExpenses = transactions
    .filter(t => t.type === "expense" && !t.contact_id && t.credit_card_id && isCreditCardTransactionInInvoice(t, selectedMonth, selectedYear))
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  const myTotalExpenses = myExpenses + myCreditCardExpenses

  // Total balance from all accounts (initial + all movements)
  const computeAccountBalance = (accountId: string) => {
    const acc = accounts.find(a => a.id === accountId)
    const initial = acc?.initial_balance || 0
    const movement = transactions.filter(t => t.account_id === accountId).reduce((sum, t) => sum + (t.amount || 0), 0)
    return initial + movement
  }
  const totalBalance = accounts.reduce((sum, account) => sum + computeAccountBalance(account.id), 0)

  // Monthly net (income - expenses this month)
  const monthlyNet = monthlyIncome - monthlyExpenses

  const accountBalancesData = useMemo(() => {
    return accounts
      .filter(acc => acc.is_active)
      .map(acc => ({
        name: acc.name,
        balance: computeAccountBalance(acc.id)
      }))
      .sort((a, b) => b.balance - a.balance)
  }, [accounts, transactions])

  // Recent transactions (last 5)
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .filter(t => t.type !== "transfer")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  }, [transactions])

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
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2 flex-1 justify-center">
              <span className="text-sm sm:text-base font-semibold">
                {monthNames[selectedMonth]} {selectedYear}
              </span>
              {!isCurrentMonth && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToCurrentMonth}
                  className="text-xs h-7"
                >
                  Voltar para hoje
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Financial Summary Cards - Grid Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">


          {/* Income */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-success">
                {formatPrivacyCurrency(monthlyIncome)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total Entradas do mês
              </p>
            </CardContent>
          </Card>

          {/* Expenses */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-destructive">
                {formatPrivacyCurrency(monthlyExpenses)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total Gastos do mês
              </p>
            </CardContent>
          </Card>

          {/* Monthly Net */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Mensal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl sm:text-3xl font-bold ${monthlyNet >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatPrivacyCurrency(monthlyNet)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Receitas - Despesas
              </p>
            </CardContent>
          </Card>

          {/* Credit Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cartão de Crédito</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-orange-500">
                {formatPrivacyCurrency(monthlyCreditCardExpenses)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total Gastos no cartão
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Total Balance */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total Geral</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {formatPrivacyCurrency(totalBalance)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Soma de todas as contas
              </p>
            </CardContent>
          </Card>

          {/* Investments */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investimentos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-success">
                {formatPrivacyCurrency(getTotalInvestmentValue())}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Valor total investido
              </p>
            </CardContent>
          </Card>



          {/* My Credit Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meu Cartão</CardTitle>
              <CreditCard className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-orange-500">
                {formatPrivacyCurrency(myCreditCardExpenses)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Gastos feitos por mim
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Account Balances Chart */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Saldo por Conta</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Distribuição do saldo entre suas contas</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accountBalancesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="name"
                    className="text-xs"
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip />
                  <Bar dataKey="balance" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Wealth Evolution Chart */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Evolução Patrimonial</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Crescimento do patrimônio ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <WealthEvolutionChart />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Ações Rápidas</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Adicione transações rapidamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3"
                onClick={() => navigate('/transacoes?type=income')}
              >
                <PlusCircle className="h-5 w-5 text-success" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Nova Receita</div>
                  <div className="text-xs text-muted-foreground">Adicionar entrada</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3"
                onClick={() => navigate('/transacoes?type=expense')}
              >
                <MinusCircle className="h-5 w-5 text-destructive" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Nova Despesa</div>
                  <div className="text-xs text-muted-foreground">Adicionar gasto</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3"
                onClick={() => navigate('/transacoes?type=transfer')}
              >
                <ArrowRightLeft className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Transferência</div>
                  <div className="text-xs text-muted-foreground">Entre contas</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Transações Recentes</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Últimas 5 transações realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma transação recente
              </p>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`mt-0.5 rounded-full p-2 flex-shrink-0 ${transaction.type === 'income'
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
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          {transaction.category?.name && ` • ${transaction.category.name}`}
                        </p>
                      </div>
                    </div>
                    <div className={`text-right font-semibold text-sm sm:text-base flex-shrink-0 ${transaction.type === 'income' ? 'text-success' : 'text-destructive'
                      }`}>
                      {transaction.type === 'income' ? '+' : '-'} {formatPrivacyCurrency(Math.abs(transaction.amount))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard