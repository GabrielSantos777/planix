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
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Evolução Patrimonial
        </CardTitle>
        <CardDescription>
          Comparação de saldo acumulado por ano
        </CardDescription>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            {!isPrivacyEnabled ? formatCurrency(currentBalance) : '•'.repeat(12)}
          </span>
          <span className={`text-sm ${growthPercentage >= 0 ? 'text-success' : 'text-destructive'}`}>
            {growthPercentage >= 0 ? '+' : ''}{growthPercentage.toFixed(1)}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelFormatter={(label) => `Mês: ${label}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}