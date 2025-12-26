import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { useCurrency } from '@/context/CurrencyContext'
import { usePrivacy } from '@/context/PrivacyContext'
import { parseLocalDate } from '@/utils/dateUtils'

interface WealthEvolutionChartProps {
  className?: string
}

export const WealthEvolutionChart = ({ className }: WealthEvolutionChartProps) => {
  const { transactions, accounts } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled } = usePrivacy()

  // Cálculo do patrimônio líquido mensal nos últimos 12 meses
  // Mostra o saldo total consolidado ao final de cada mês
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
      // Calcular o saldo total no final deste mês
      const endOfMonth = new Date(year, monthIndex + 1, 0)
      
      // Somar saldos iniciais de todas as contas ativas
      const accountsInitialBalance = accounts
        .filter(acc => acc.is_active)
        .reduce((sum, account) => sum + (account.initial_balance || 0), 0)
      
      // Filtrar TODAS as transações de contas até o final deste mês
      // Incluindo transferências, pois elas afetam o saldo das contas
      // Usando parseLocalDate para evitar problemas de fuso horário
      const accountTransactionsUpToMonth = transactions.filter(t => {
        const transactionDate = parseLocalDate(t.date)
        return transactionDate <= endOfMonth && t.account_id
      })
      
      // Calcular o saldo baseado nas transações de contas
      const accountTransactionsBalance = accountTransactionsUpToMonth
        .reduce((sum, t) => sum + (t.amount || 0), 0)
      
      // Patrimônio líquido = saldo inicial de todas as contas + movimentações
      // Não subtraímos cartão de crédito pois queremos o saldo real das contas
      const netWorth = accountsInitialBalance + accountTransactionsBalance

      return {
        month,
        balance: netWorth
      }
    })
  }, [transactions, accounts])

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
              if (value <= -1000) return `${(value / 1000).toFixed(0)}k`
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
