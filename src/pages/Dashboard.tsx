import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PlusCircle,
  Wallet
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/context/CurrencyContext"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import Layout from "@/components/Layout"
import { useAuth } from "@/context/AuthContext"

const Dashboard = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const { accounts, creditCards, transactions, investments, contacts } = useSupabaseData()
  const getTotalInvestmentValue = () => {
    return investments.reduce((total, investment) => {
      return total + (investment.quantity * investment.current_price)
    }, 0)
  }
  const { formatCurrency } = useCurrency()

  // Get current month transactions
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date)
    return transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
  })

  const monthlyIncome = currentMonthTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  // Monthly expenses (only account transactions, not credit card)
  const monthlyExpenses = currentMonthTransactions
    .filter(t => t.type === "expense" && t.account_id)
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  // Monthly credit card expenses
  const monthlyCreditCardExpenses = currentMonthTransactions
    .filter(t => t.type === "expense" && t.credit_card_id)
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  // Total expenses + credit card
  const totalExpenses = monthlyExpenses + monthlyCreditCardExpenses

  // Expenses made by me (without contact_id)
  const myExpenses = currentMonthTransactions
    .filter(t => t.type === "expense" && !t.contact_id && t.account_id)
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  const myCreditCardExpenses = currentMonthTransactions
    .filter(t => t.type === "expense" && !t.contact_id && t.credit_card_id)
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  const myTotalExpenses = myExpenses + myCreditCardExpenses

  // Transaction counts
  const totalTransactionCount = currentMonthTransactions.filter(t => t.type === "expense").length
  const myTransactionCount = currentMonthTransactions.filter(t => t.type === "expense" && !t.contact_id).length

  // Total balance from all accounts (initial + all movements)
  const computeAccountBalance = (accountId: string) => {
    const acc = accounts.find(a => a.id === accountId)
    const initial = acc?.initial_balance || 0
    const movement = transactions.filter(t => t.account_id === accountId).reduce((sum, t) => sum + (t.amount || 0), 0)
    return initial + movement
  }
  // Total balance of all accounts (matches Contas page)
  const totalBalance = accounts.reduce((sum, account) => sum + computeAccountBalance(account.id), 0)

  // Monthly net (income - expenses this month)
  const monthlyNet = monthlyIncome - monthlyExpenses

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Summary Cards - First Row */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Mensal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${monthlyNet >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(monthlyNet)}
              </div>
              <p className="text-xs text-muted-foreground">
                Receitas - Despesas (mês atual)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(monthlyIncome)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total Entradas do mês atual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(monthlyExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total Gastos do mês atual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cartão de Crédito</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {formatCurrency(monthlyCreditCardExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total Gastos no cartão (mês atual)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investimentos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(getTotalInvestmentValue())}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor total investido
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards - Second Row */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total Geral</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(totalBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                Soma de todas as contas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Despesas + Cartão</CardTitle>
              <DollarSign className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalTransactionCount} transações • {myTransactionCount} por mim
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cartão</CardTitle>
              <CreditCard className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {formatCurrency(myCreditCardExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                Do mês atual feitas por mim como responsável
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Adicione novas transações ou gerencie suas contas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 sm:gap-4 flex-wrap">
              <Button
                className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none"
                onClick={() => navigate("/transacoes?type=income")}
                size="sm"
              >
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Nova Receita</span>
              </Button>
              <Button
                variant="destructive"
                className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none"
                onClick={() => navigate("/transacoes?type=expense")}
                size="sm"
              >
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Nova Despesa</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none"
                onClick={() => navigate("/contas")}
                size="sm"
              >
                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Gerenciar Contas</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>
              Suas últimas movimentações financeiras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
              {transactions
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                      <div className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${transaction.type === "income"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                        }`}>
                        {transaction.type === "income" ? (
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                          <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">{transaction.description}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {transaction.category?.name || 'Sem categoria'} • {transaction.account?.name || 'Conta removida'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`font-bold text-sm sm:text-base ${transaction.type === "income" ? "text-success" : "text-destructive"
                         }`}>
                         {transaction.type === "income" ? "+" : ""}
                         {formatCurrency(transaction.amount)}
                       </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard