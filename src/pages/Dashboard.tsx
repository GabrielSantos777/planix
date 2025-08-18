import { useState, useEffect } from "react"
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
import { useAuth } from "@/context/AuthContext"
import { useInvestments } from "@/context/InvestmentsContext"
import { useCurrency } from "@/context/CurrencyContext"
import { supabase } from "@/integrations/supabase/client"
import Layout from "@/components/Layout"

const Dashboard = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const { getTotalValue: getInvestmentValue } = useInvestments()
  const { formatCurrency } = useCurrency()

  useEffect(() => {
    if (user) {
      // Fetch transactions from Supabase
      const fetchData = async () => {
        try {
          const { data: transactionData } = await supabase
            .from('transactions')
            .select(`
              *,
              categories(name, icon, color),
              accounts(name)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10);
          
          const { data: accountData } = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_active', true);
          
          setTransactions(transactionData || []);
          setAccounts(accountData || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();

      // Set up real-time subscriptions
      const transactionChannel = supabase
        .channel('dashboard-transactions')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` },
          () => fetchData()
        )
        .subscribe();

      const accountChannel = supabase
        .channel('dashboard-accounts')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'accounts', filter: `user_id=eq.${user.id}` },
          () => fetchData()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(transactionChannel);
        supabase.removeChannel(accountChannel);
      };
    }
  }, [user]);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);

  // Calculate balance considering only account transactions, not credit card
  const accountsBalance = accounts.reduce((sum, account) => sum + (account.current_balance || 0), 0);
  const balance = accountsBalance;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(balance)}
              </div>
              <p className="text-xs text-muted-foreground">
                Seu saldo atual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                -5% em relação ao mês passado
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
                {formatCurrency(getInvestmentValue())}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor total investido
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
                variant="secondary" 
                className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none"
                onClick={() => navigate("/transacoes?type=transfer")}
                size="sm"
              >
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Transferência</span>
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
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                    <div className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                      transaction.type === "income" 
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
                        {transaction.categories?.name || 'Sem categoria'} • {transaction.accounts?.name || 'Conta removida'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-sm sm:text-base ${
                      transaction.type === "income" ? "text-success" : "text-destructive"
                    }`}>
                      {transaction.type === "income" ? "+" : ""}
                      {formatCurrency(Math.abs(transaction.amount))}
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