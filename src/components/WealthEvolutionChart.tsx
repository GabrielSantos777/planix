import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { useCurrency } from '@/context/CurrencyContext'
import { usePrivacy } from '@/context/PrivacyContext'

interface WealthEvolutionChartProps {
  className?: string
}

export const WealthEvolutionChart = ({ className }: WealthEvolutionChartProps) => {
  const { transactions, accounts } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled } = usePrivacy()

  // Cálculo do saldo total mensal nos últimos 12 meses
  const evolutionData = useMemo(() => {
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - i))
      return {
        month: date.toLocaleDateString('pt-BR', { month: 'short' }),
        year: date.getFullYear(),
        monthIndex: date.getMonth()
      }
    })

    return last12Months.map(({ month, year, monthIndex }) => {
      // Calcular todas as transações até o final deste mês
      const endOfMonth = new Date(year, monthIndex + 1, 0)
      const transactionsUpToMonth = transactions.filter(t => new Date(t.date) <= endOfMonth)
      
      // Somar saldos iniciais das contas
      const accountsBalance = accounts.reduce((sum, account) => sum + (account.initial_balance || 0), 0)
      
      // Somar movimentações das transações
      const movementsBalance = transactionsUpToMonth.reduce((sum, t) => {
        return sum + (t.amount || 0)
      }, 0)
      
      const totalBalance = accountsBalance + movementsBalance

      return {
        month,
        balance: totalBalance
      }
    })
  }, [transactions, accounts])

  const currentBalance = evolutionData[evolutionData.length - 1]?.balance || 0
  const previousBalance = evolutionData[evolutionData.length - 2]?.balance || 0
  const growthPercentage = previousBalance !== 0 ? ((currentBalance - previousBalance) / Math.abs(previousBalance)) * 100 : 0

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={evolutionData}
          margin={{ top: 5, right: 5, bottom: 5, left: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
              return `${value}`
            }}
          />
          <Tooltip 
            formatter={(value: number) => [!isPrivacyEnabled ? formatCurrency(value) : '•'.repeat(12), '']}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}