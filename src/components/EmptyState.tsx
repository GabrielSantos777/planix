import { Button } from "@/components/ui/button"
import { LucideIcon, Plus, Wallet, ArrowUpDown, Target, BarChart3, CreditCard } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  variant?: 'default' | 'transactions' | 'accounts' | 'goals' | 'reports' | 'cards'
}

const variantConfig = {
  default: { icon: Plus, color: 'text-muted-foreground' },
  transactions: { icon: ArrowUpDown, color: 'text-blue-500' },
  accounts: { icon: Wallet, color: 'text-emerald-500' },
  goals: { icon: Target, color: 'text-amber-500' },
  reports: { icon: BarChart3, color: 'text-purple-500' },
  cards: { icon: CreditCard, color: 'text-orange-500' },
}

export function EmptyState({
  icon: CustomIcon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default'
}: EmptyStateProps) {
  const config = variantConfig[variant]
  const Icon = CustomIcon || config.icon

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className={`relative mb-6`}>
        {/* Background circle with pulse */}
        <div className="absolute inset-0 rounded-full bg-muted/50 animate-pulse scale-150" />
        <div className={`relative rounded-full p-5 bg-muted/80 ${config.color}`}>
          <Icon className="h-10 w-10" />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} className="gap-2">
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
