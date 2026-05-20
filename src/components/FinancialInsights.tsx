import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Flame,
  ShieldCheck,
  PiggyBank,
} from "lucide-react"
import { parseLocalDate } from "@/utils/dateUtils"

interface Transaction {
  id: string
  description: string
  amount: number
  type: string
  date: string
  category_id?: string | null
  category?: { name: string; type: string } | null
  account_id?: string | null
  credit_card_id?: string | null
}

interface FinancialInsightsProps {
  transactions: Transaction[]
  monthlyIncome: number
  monthlyExpenses: number
  totalBalance: number
  formatCurrency: (amount: number) => string
}

interface Insight {
  id: string
  type: 'success' | 'warning' | 'danger' | 'info'
  icon: typeof TrendingUp
  title: string
  description: string
  priority: number
}

export function FinancialInsights({
  transactions,
  monthlyIncome,
  monthlyExpenses,
  totalBalance,
  formatCurrency,
}: FinancialInsightsProps) {
  const insights = useMemo(() => {
    const result: Insight[] = []
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Current month transactions
    const currentMonthTx = transactions.filter((t) => {
      const d = parseLocalDate(t.date)
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    })

    // Previous month transactions
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const prevMonthTx = transactions.filter((t) => {
      const d = parseLocalDate(t.date)
      return d.getMonth() === prevMonth && d.getFullYear() === prevYear
    })

    const prevIncome = prevMonthTx
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + (t.amount || 0), 0)
    const prevExpenses = prevMonthTx
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + Math.abs(t.amount || 0), 0)

    // 1. Savings rate
    if (monthlyIncome > 0) {
      const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
      if (savingsRate >= 20) {
        result.push({
          id: "savings-good",
          type: "success",
          icon: PiggyBank,
          title: "Ótima taxa de poupança!",
          description: `Você está guardando ${savingsRate.toFixed(0)}% da sua renda. Acima dos 20% recomendados.`,
          priority: 1,
        })
      } else if (savingsRate >= 0) {
        result.push({
          id: "savings-low",
          type: "warning",
          icon: PiggyBank,
          title: "Taxa de poupança baixa",
          description: `Você está guardando apenas ${savingsRate.toFixed(0)}% da renda. Tente chegar a 20%.`,
          priority: 2,
        })
      } else {
        result.push({
          id: "savings-negative",
          type: "danger",
          icon: AlertTriangle,
          title: "Gastando mais do que ganha",
          description: `Suas despesas superam a receita em ${formatCurrency(Math.abs(monthlyIncome - monthlyExpenses))}. Revise seus gastos.`,
          priority: 3,
        })
      }
    }

    // 2. Expense trend comparison
    if (prevExpenses > 0 && monthlyExpenses > 0) {
      const expenseChange = ((monthlyExpenses - prevExpenses) / prevExpenses) * 100
      if (expenseChange > 15) {
        result.push({
          id: "expense-up",
          type: "warning",
          icon: TrendingUp,
          title: "Gastos em alta",
          description: `Despesas subiram ${expenseChange.toFixed(0)}% em relação ao mês anterior. Fique atento.`,
          priority: 2,
        })
      } else if (expenseChange < -10) {
        result.push({
          id: "expense-down",
          type: "success",
          icon: TrendingDown,
          title: "Gastos reduzidos!",
          description: `Você gastou ${Math.abs(expenseChange).toFixed(0)}% menos que no mês passado. Continue assim!`,
          priority: 1,
        })
      }
    }

    // 3. Top spending category
    const categorySpending = new Map<string, number>()
    currentMonthTx
      .filter((t) => t.type === "expense" && t.category?.name)
      .forEach((t) => {
        const catName = t.category!.name
        categorySpending.set(catName, (categorySpending.get(catName) || 0) + Math.abs(t.amount || 0))
      })

    if (categorySpending.size > 0) {
      const sorted = [...categorySpending.entries()].sort((a, b) => b[1] - a[1])
      const [topCat, topAmount] = sorted[0]
      const pctOfTotal = monthlyExpenses > 0 ? (topAmount / monthlyExpenses) * 100 : 0

      if (pctOfTotal > 40) {
        result.push({
          id: "top-category",
          type: "info",
          icon: Flame,
          title: `${topCat} concentra ${pctOfTotal.toFixed(0)}% dos gastos`,
          description: `Você gastou ${formatCurrency(topAmount)} nessa categoria. Diversificar pode ajudar.`,
          priority: 2,
        })
      }
    }

    // 4. Emergency fund check
    if (monthlyExpenses > 0 && totalBalance > 0) {
      const monthsCovered = totalBalance / monthlyExpenses
      if (monthsCovered >= 6) {
        result.push({
          id: "emergency-ok",
          type: "success",
          icon: ShieldCheck,
          title: "Reserva de emergência saudável",
          description: `Seu saldo cobre ${monthsCovered.toFixed(1)} meses de despesas. Excelente!`,
          priority: 1,
        })
      } else if (monthsCovered < 3) {
        result.push({
          id: "emergency-low",
          type: "danger",
          icon: AlertTriangle,
          title: "Reserva de emergência insuficiente",
          description: `Seu saldo cobre apenas ${monthsCovered.toFixed(1)} meses. O ideal são 6 meses.`,
          priority: 3,
        })
      }
    }

    // 5. No income registered
    if (monthlyIncome === 0 && currentMonthTx.length > 0) {
      result.push({
        id: "no-income",
        type: "warning",
        icon: Lightbulb,
        title: "Nenhuma receita registrada este mês",
        description: "Registre suas receitas para ter uma visão completa das finanças.",
        priority: 2,
      })
    }

    // Sort by priority (higher = more urgent)
    return result.sort((a, b) => b.priority - a.priority).slice(0, 3)
  }, [transactions, monthlyIncome, monthlyExpenses, totalBalance, formatCurrency])

  if (insights.length === 0) return null

  const typeStyles = {
    success: "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30",
    warning: "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/30",
    danger: "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/30",
    info: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30",
  }

  const iconStyles = {
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
    danger: "text-red-600 dark:text-red-400",
    info: "text-blue-600 dark:text-blue-400",
  }

  const badgeStyles = {
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  }

  const badgeLabels = {
    success: "Positivo",
    warning: "Atenção",
    danger: "Alerta",
    info: "Dica",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Insights Financeiros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => {
          const Icon = insight.icon
          return (
            <div
              key={insight.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${typeStyles[insight.type]}`}
            >
              <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconStyles[insight.type]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-sm">{insight.title}</span>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${badgeStyles[insight.type]}`}>
                    {badgeLabels[insight.type]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
