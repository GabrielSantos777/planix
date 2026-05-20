import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface FinancialHealthScoreProps {
  monthlyIncome: number
  monthlyExpenses: number
  totalBalance: number
  totalInvestments: number
  creditCardExpenses: number
}

export function FinancialHealthScore({
  monthlyIncome,
  monthlyExpenses,
  totalBalance,
  totalInvestments,
  creditCardExpenses,
}: FinancialHealthScoreProps) {
  const { score, label, color, bgColor, description } = useMemo(() => {
    let points = 0

    // 1. Savings rate (0-30 points)
    if (monthlyIncome > 0) {
      const savingsRate = (monthlyIncome - monthlyExpenses) / monthlyIncome
      if (savingsRate >= 0.3) points += 30
      else if (savingsRate >= 0.2) points += 25
      else if (savingsRate >= 0.1) points += 15
      else if (savingsRate >= 0) points += 5
    }

    // 2. Emergency fund (0-25 points)
    if (monthlyExpenses > 0) {
      const monthsCovered = totalBalance / monthlyExpenses
      if (monthsCovered >= 6) points += 25
      else if (monthsCovered >= 3) points += 15
      else if (monthsCovered >= 1) points += 5
    } else if (totalBalance > 0) {
      points += 20
    }

    // 3. Income present (0-15 points)
    if (monthlyIncome > 0) points += 15

    // 4. Investments (0-15 points)
    if (totalInvestments > 0) {
      if (monthlyIncome > 0 && totalInvestments >= monthlyIncome * 3) points += 15
      else if (totalInvestments > 0) points += 8
    }

    // 5. Credit card discipline (0-15 points)
    if (monthlyIncome > 0) {
      const ccRatio = creditCardExpenses / monthlyIncome
      if (ccRatio <= 0.2) points += 15
      else if (ccRatio <= 0.4) points += 10
      else if (ccRatio <= 0.6) points += 5
    } else if (creditCardExpenses === 0) {
      points += 15
    }

    const score = Math.min(100, Math.max(0, points))

    let label: string
    let color: string
    let bgColor: string
    let description: string

    if (score >= 80) {
      label = "Excelente"
      color = "text-emerald-600 dark:text-emerald-400"
      bgColor = "bg-emerald-500"
      description = "Suas finanças estão em ótima forma! Continue assim."
    } else if (score >= 60) {
      label = "Bom"
      color = "text-blue-600 dark:text-blue-400"
      bgColor = "bg-blue-500"
      description = "Caminho certo! Foque em ampliar sua reserva e investimentos."
    } else if (score >= 40) {
      label = "Regular"
      color = "text-amber-600 dark:text-amber-400"
      bgColor = "bg-amber-500"
      description = "Há espaço para melhorar. Revise seus gastos e comece a poupar."
    } else {
      label = "Atenção"
      color = "text-red-600 dark:text-red-400"
      bgColor = "bg-red-500"
      description = "Suas finanças precisam de atenção urgente. Foque em reduzir gastos."
    }

    return { score, label, color, bgColor, description }
  }, [monthlyIncome, monthlyExpenses, totalBalance, totalInvestments, creditCardExpenses])

  // SVG circular gauge
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Saúde Financeira</CardTitle>
        <Heart className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        {/* Circular gauge */}
        <div className="relative flex-shrink-0">
          <svg width="120" height="120" className="-rotate-90">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={color}
              style={{
                transition: "stroke-dashoffset 1s ease-in-out",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${color}`}>{score}</span>
            <span className="text-[10px] text-muted-foreground">/100</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${bgColor}`} />
            <span className={`font-semibold text-sm ${color}`}>{label}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
