import { CreditCard } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { useCurrency } from "@/context/CurrencyContext"
import { usePrivacy } from "@/context/PrivacyContext"

interface MyCreditCardCardProps {
  amount: number
  isEditMode?: boolean
}

export const MyCreditCardCard = ({ amount, isEditMode }: MyCreditCardCardProps) => {
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, hideValue } = usePrivacy()

  const formatPrivacyCurrency = (amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }

  return (
    <DashboardCard
      title="Meu Cartão"
      icon={<CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />}
      isEditMode={isEditMode}
    >
      <div className="text-xl sm:text-2xl font-bold text-orange-500">
        {formatPrivacyCurrency(amount)}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        Do mês atual feitas por mim como responsável
      </p>
    </DashboardCard>
  )
}
