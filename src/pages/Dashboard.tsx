import { useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useCurrency } from "@/context/CurrencyContext"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import Layout from "@/components/Layout"
import { useAuth } from "@/context/AuthContext"
import { usePrivacy } from "@/context/PrivacyContext"
import { WealthEvolutionChart } from "@/components/WealthEvolutionChart"
import { useCapacitor } from "@/hooks/useCapacitor"
import { usePushNotifications } from "@/hooks/usePushNotifications"
import { useDashboardLayout } from "@/hooks/useDashboardLayout"
import { DashboardCustomizer } from "@/components/DashboardCustomizer"
import ReactGridLayout, { Layout as GridLayout } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import { InvestmentsCard } from "@/components/dashboard/InvestmentsCard"
import { IncomeCard } from "@/components/dashboard/IncomeCard"
import { ExpensesCard } from "@/components/dashboard/ExpensesCard"
import { CreditCardCard } from "@/components/dashboard/CreditCardCard"
import { TotalBalanceCard } from "@/components/dashboard/TotalBalanceCard"
import { MonthlyNetCard } from "@/components/dashboard/MonthlyNetCard"
import { MyCreditCardCard } from "@/components/dashboard/MyCreditCardCard"
import { AccountBalancesCard } from "@/components/dashboard/AccountBalancesCard"
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard"
import { RecentTransactionsCard } from "@/components/dashboard/RecentTransactionsCard"
import { useIsMobile } from "@/hooks/use-mobile"

const Dashboard = () => {
  const { user } = useAuth()
  const { accounts, transactions, investments } = useSupabaseData()
  const { isNative, platform } = useCapacitor()
  const { isRegistered } = usePushNotifications()
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, togglePrivacy } = usePrivacy()
  const { layout, cards, isEditMode, setIsEditMode, toggleCardVisibility, resetLayout, onLayoutChange } = useDashboardLayout()
  const isMobile = useIsMobile()

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

  const accountBalancesData = useMemo(() => {
    return accounts
      .filter(acc => acc.is_active)
      .map(acc => ({
        name: acc.name,
        balance: acc.current_balance || 0
      }))
      .sort((a, b) => b.balance - a.balance)
  }, [accounts])

  const visibleCards = cards.filter(card => card.visible)
  const visibleLayout = layout.filter(l => visibleCards.some(c => c.id === l.i))

  const cardComponents: Record<string, JSX.Element> = {
    investments: <InvestmentsCard totalValue={getTotalInvestmentValue()} isEditMode={isEditMode} />,
    income: <IncomeCard amount={monthlyIncome} isEditMode={isEditMode} />,
    expenses: <ExpensesCard amount={monthlyExpenses} isEditMode={isEditMode} />,
    creditCard: <CreditCardCard amount={monthlyCreditCardExpenses} isEditMode={isEditMode} />,
    totalBalance: <TotalBalanceCard balance={totalBalance} isEditMode={isEditMode} />,
    monthlyNet: <MonthlyNetCard net={monthlyNet} isEditMode={isEditMode} />,
    myCreditCard: <MyCreditCardCard amount={myCreditCardExpenses} isEditMode={isEditMode} />,
    accountBalances: <AccountBalancesCard data={accountBalancesData} isEditMode={isEditMode} />,
    wealthEvolution: (
      <div className="h-full">
        <WealthEvolutionChart />
      </div>
    ),
    quickActions: <QuickActionsCard isEditMode={isEditMode} />,
    recentTransactions: <RecentTransactionsCard transactions={transactions} isEditMode={isEditMode} />,
  }

  return (
    <Layout>
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header com controles */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold truncate">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Visão geral das suas finanças</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePrivacy}
              title={isPrivacyEnabled ? "Mostrar valores" : "Ocultar valores"}
              className="flex-1 sm:flex-none"
            >
              {isPrivacyEnabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="ml-2 sm:hidden">Privacidade</span>
            </Button>
            <DashboardCustomizer 
              cards={cards}
              onToggleCard={toggleCardVisibility}
              onResetLayout={resetLayout}
            />
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsEditMode(!isEditMode)}
              className="flex-1 sm:flex-none"
            >
              {isEditMode ? "Salvar" : "Editar Layout"}
            </Button>
          </div>
        </div>

        {/* Grid Layout Responsivo */}
        <div className="w-full">
          {isMobile ? (
            // Layout vertical para mobile
            <div className="space-y-4">
              {visibleCards.map((card) => (
                <div key={card.id}>
                  {cardComponents[card.id]}
                </div>
              ))}
            </div>
          ) : (
            // Grid layout para desktop/tablet
            <ReactGridLayout
              className="layout"
              layout={visibleLayout}
              cols={12}
              rowHeight={60}
              width={1200}
              onLayoutChange={onLayoutChange}
              isDraggable={isEditMode}
              isResizable={isEditMode}
              compactType="vertical"
              preventCollision={false}
              margin={[16, 16]}
              containerPadding={[0, 0]}
            >
              {visibleCards.map((card) => (
                <div key={card.id} className="transition-all">
                  {cardComponents[card.id]}
                </div>
              ))}
            </ReactGridLayout>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard