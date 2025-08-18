import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useInvestments } from '@/context/InvestmentsContext'
import { useCurrency } from '@/context/CurrencyContext'

interface WealthEvolutionChartProps {
  className?: string
}

export const WealthEvolutionChart = ({ className }: WealthEvolutionChartProps) => {
  const { transactions, accounts } = useApp()
  const { getTotalValue: getInvestmentValue } = useInvestments()
  const { formatCurrency } = useCurrency()

  const evolutionData = useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - i))
      return {
        month: date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
        date: new Date(date.getFullYear(), date.getMonth(), 1)
      }
    })

    return last6Months.map(({ month, date }) => {
      // Calculate accumulated balance up to this month
      const transactionsUpToMonth = transactions.filter(t => new Date(t.date) <= date)
      const balance = transactionsUpToMonth.reduce((sum, t) => sum + t.amount, 0)
      
      // Add initial account balances
      const accountsBalance = accounts.reduce((sum, account) => sum + (account.balance || 0), 0)
      
      // Simulate investment growth (in real app, this would come from historical data)
      const investmentValue = getInvestmentValue() * (0.8 + Math.random() * 0.4)
      
      const totalWealth = balance + accountsBalance + investmentValue

      return {
        month,
        wealth: Math.max(0, totalWealth),
        balance: Math.max(0, balance + accountsBalance),
        investments: Math.max(0, investmentValue)
      }
    })
  }, [transactions, accounts, getInvestmentValue])

  const currentWealth = evolutionData[evolutionData.length - 1]?.wealth || 0
  const previousWealth = evolutionData[evolutionData.length - 2]?.wealth || 0
  const growthPercentage = previousWealth > 0 ? ((currentWealth - previousWealth) / previousWealth) * 100 : 0

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Evolução Patrimonial
        </CardTitle>
        <CardDescription>
          Crescimento do patrimônio nos últimos 6 meses
        </CardDescription>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            {formatCurrency(currentWealth)}
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
                dataKey="wealth" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="investments" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary"></div>
            <span>Patrimônio Total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-success border-dashed"></div>
            <span>Saldo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-warning border-dashed"></div>
            <span>Investimentos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}