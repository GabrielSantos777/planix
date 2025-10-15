import { TrendingUp } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { useCurrency } from "@/context/CurrencyContext"
import { usePrivacy } from "@/context/PrivacyContext"

interface MonthlyNetCardProps {
  net: number
  isEditMode?: boolean
}

export const MonthlyNetCard = ({ net, isEditMode }: MonthlyNetCardProps) => {
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, hideValue } = usePrivacy()

  const formatPrivacyCurrency = (amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }

  return (
    <DashboardCard
      title="Saldo Mensal"
      icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />}
      isEditMode={isEditMode}
    >
      <div className={`text-xl sm:text-2xl font-bold ${net >= 0 ? 'text-success' : 'text-destructive'}`}>
        {formatPrivacyCurrency(net)}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        Receitas - Despesas (mês atual)
      </p>
    </DashboardCard>
  )
}
