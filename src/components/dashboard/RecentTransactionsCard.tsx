import { TrendingUp, TrendingDown } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { useCurrency } from "@/context/CurrencyContext"
import { usePrivacy } from "@/context/PrivacyContext"

interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense" | "transfer"
  date: string
  category?: { name: string }
  account?: { name: string }
}

interface RecentTransactionsCardProps {
  transactions: Transaction[]
  isEditMode?: boolean
}

export const RecentTransactionsCard = ({ transactions, isEditMode }: RecentTransactionsCardProps) => {
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, hideValue } = usePrivacy()

  const formatPrivacyCurrency = (amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }

  const sortedTransactions = [...transactions]
    .filter(t => t.type !== "transfer")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  return (
    <DashboardCard
      title="Transações Recentes"
      description="Suas últimas movimentações financeiras"
      isEditMode={isEditMode}
    >
      <div className="space-y-3 sm:space-y-4">
        {sortedTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between gap-2 p-2 sm:p-3 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
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
                <p className="font-medium text-xs sm:text-sm truncate">{transaction.description}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {transaction.category?.name || 'Sem categoria'} • {transaction.account?.name || 'Conta removida'}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={`font-bold text-xs sm:text-sm ${transaction.type === "income" ? "text-success" : "text-destructive"
                }`}>
                {transaction.type === "income" ? "+" : ""}
                {formatPrivacyCurrency(transaction.amount)}
              </p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(transaction.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
