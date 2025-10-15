import { Wallet } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { useCurrency } from "@/context/CurrencyContext"
import { usePrivacy } from "@/context/PrivacyContext"

interface TotalBalanceCardProps {
  balance: number
  isEditMode?: boolean
}

export const TotalBalanceCard = ({ balance, isEditMode }: TotalBalanceCardProps) => {
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled, hideValue } = usePrivacy()

  const formatPrivacyCurrency = (amount: number) => {
    const formatted = formatCurrency(amount)
    return isPrivacyEnabled ? hideValue(formatted) : formatted
  }

  return (
    <DashboardCard
      title="Saldo Total Geral"
      icon={<Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />}
      isEditMode={isEditMode}
    >
      <div className={`text-xl sm:text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
        {formatPrivacyCurrency(balance)}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        Soma de todas as contas
      </p>
    </DashboardCard>
  )
}
