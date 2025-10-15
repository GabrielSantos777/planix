import { TrendingUp } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { useCurrency } from "@/context/CurrencyContext"
import { usePrivacy } from "@/context/PrivacyContext"

interface IncomeCardProps {
  amount: number
  isEditMode?: boolean
}

export const IncomeCard = ({ amount, isEditMode }: IncomeCardProps) => {
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, hideValue } = usePrivacy()

  const formatPrivacyCurrency = (amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }

  return (
    <DashboardCard
      title="Total Receitas"
      icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-success flex-shrink-0" />}
      isEditMode={isEditMode}
    >
      <div className="text-xl sm:text-2xl font-bold text-success">
        {formatPrivacyCurrency(amount)}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        Total Entradas do mês atual
      </p>
    </DashboardCard>
  )
}
