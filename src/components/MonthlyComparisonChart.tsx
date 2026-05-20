import { useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { parseLocalDate } from "@/utils/dateUtils"

interface Transaction {
  id: string
  amount: number
  type: string
  date: string
  account_id?: string | null
}

interface MonthlyComparisonChartProps {
  transactions: Transaction[]
  formatCurrency: (amount: number) => string
}

const MONTH_NAMES_SHORT = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
]

export function MonthlyComparisonChart({
  transactions,
  formatCurrency,
}: MonthlyComparisonChartProps) {
  const data = useMemo(() => {
    const now = new Date()
    const months: { month: number; year: number; label: string }[] = []

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({
        month: d.getMonth(),
        year: d.getFullYear(),
        label: `${MONTH_NAMES_SHORT[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`,
      })
    }

    return months.map(({ month, year, label }) => {
      const monthTx = transactions.filter((t) => {
        const d = parseLocalDate(t.date)
        return d.getMonth() === month && d.getFullYear() === year
      })

      const income = monthTx
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + (t.amount || 0), 0)

      const expenses = monthTx
        .filter((t) => t.type === "expense" && t.account_id)
        .reduce((s, t) => s + Math.abs(t.amount || 0), 0)

      return {
        name: label,
        Receitas: income,
        Despesas: expenses,
        Saldo: income - expenses,
      }
    })
  }, [transactions])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg shadow-md px-3 py-2 space-y-1">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, i: number) => (
            <p key={i} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} className="text-xs" />
        <YAxis tick={{ fontSize: 11 }} className="text-xs" />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value: string) => (
            <span className="text-xs text-foreground">{value}</span>
          )}
        />
        <Bar
          dataKey="Receitas"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
        <Bar
          dataKey="Despesas"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
