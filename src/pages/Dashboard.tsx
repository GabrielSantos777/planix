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

const Dashboard = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { accounts, creditCards, transactions, investments } = useSupabaseData()
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

  const monthlyExpenses = currentMonthTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  // Total balance from all accounts (initial + all movements)
  const computeAccountBalance = (accountId: string) => {
    const acc = accounts.find(a => a.id === accountId)
    const initial = acc?.initial_balance || 0
    const movement = transactions.filter(t => t.account_id === accountId).reduce((sum, t) => sum + (t.amount || 0), 0)
    return initial + movement
  }
  const totalAccountsBalance = accounts.reduce((sum, account) => sum + computeAccountBalance(account.id), 0)

  // Total credit card debt
  const totalCreditDebt = creditCards.reduce((sum, card) => sum + (card.current_balance || 0), 0)

  // Net balance (accounts - credit debt + investments)
  const totalBalance = totalAccountsBalance - totalCreditDebt + getTotalInvestmentValue()

  // Monthly net (income - expenses this month)
  const monthlyNet = monthlyIncome - monthlyExpenses

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
              <CardTitle className="text-sm font-medium">Receitas do Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(monthlyIncome)}
              </div>
              <p className="text-xs text-muted-foreground">
                Entradas do mês atual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(monthlyExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                Gastos do mês atual
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
              Contas + investimentos - cartões
            </p>
          </CardContent>
        </Card>

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
            <div className="space-y-4">
              {transactions
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 7)
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