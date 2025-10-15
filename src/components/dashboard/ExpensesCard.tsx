import { TrendingDown } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { useCurrency } from "@/context/CurrencyContext"
import { usePrivacy } from "@/context/PrivacyContext"

interface ExpensesCardProps {
  amount: number
  isEditMode?: boolean
}

export const ExpensesCard = ({ amount, isEditMode }: ExpensesCardProps) => {
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, hideValue } = usePrivacy()

  const formatPrivacyCurrency = (amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }

  return (
    <DashboardCard
      title="Total Despesas"
      icon={<TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0" />}
      isEditMode={isEditMode}
    >
      <div className="text-xl sm:text-2xl font-bold text-destructive">
        {formatPrivacyCurrency(amount)}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        Total Gastos do mês atual
      </p>
    </DashboardCard>
  )
}
