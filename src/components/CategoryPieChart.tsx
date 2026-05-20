import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { parseLocalDate } from "@/utils/dateUtils"

interface Transaction {
  id: string
  amount: number
  type: string
  date: string
  category?: { name: string } | null
  account_id?: string | null
}

interface CategoryPieChartProps {
  transactions: Transaction[]
  selectedMonth: number
  selectedYear: number
  formatCurrency: (amount: number) => string
}

const COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#84cc16",
  "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6",
  "#6366f1", "#a855f7", "#ec4899", "#f43f5e",
]

export function CategoryPieChart({
  transactions,
  selectedMonth,
  selectedYear,
  formatCurrency,
}: CategoryPieChartProps) {
  const data = useMemo(() => {
    const categoryTotals = new Map<string, number>()

    transactions
      .filter((t) => {
        if (t.type !== "expense") return false
        const d = parseLocalDate(t.date)
        return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear
      })
      .forEach((t) => {
        const name = t.category?.name || "Sem categoria"
        categoryTotals.set(name, (categoryTotals.get(name) || 0) + Math.abs(t.amount || 0))
      })

    return [...categoryTotals.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8) // Top 8 categories
  }, [transactions, selectedMonth, selectedYear])

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Sem despesas neste mês
      </div>
    )
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg shadow-md px-3 py-2">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
          iconSize={8}
          formatter={(value: string) => (
            <span className="text-xs text-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
