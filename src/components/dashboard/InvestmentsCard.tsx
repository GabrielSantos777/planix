import { TrendingUp } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { useCurrency } from "@/context/CurrencyContext"
import { usePrivacy } from "@/context/PrivacyContext"

interface InvestmentsCardProps {
  totalValue: number
  isEditMode?: boolean
}

export const InvestmentsCard = ({ totalValue, isEditMode }: InvestmentsCardProps) => {
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, hideValue } = usePrivacy()

  const formatPrivacyCurrency = (amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }

  return (
    <DashboardCard
      title="Investimentos"
      icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />}
      isEditMode={isEditMode}
    >
      <div className="text-xl sm:text-2xl font-bold text-success">
        {formatPrivacyCurrency(totalValue)}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        Valor total investido
      </p>
    </DashboardCard>
  )
}
