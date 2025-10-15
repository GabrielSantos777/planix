import { Landmark } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useCurrency } from "@/context/CurrencyContext"
import { usePrivacy } from "@/context/PrivacyContext"

interface AccountBalancesCardProps {
  data: { name: string; balance: number }[]
  isEditMode?: boolean
}

export const AccountBalancesCard = ({ data, isEditMode }: AccountBalancesCardProps) => {
  const { formatCurrency } = useCurrency()
  const { isPrivacyEnabled } = usePrivacy()

  return (
    <DashboardCard
      title="Saldo por Conta Bancária"
      description="Saldo atual de cada conta cadastrada"
      icon={<Landmark className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />}
      isEditMode={isEditMode}
    >
      <div className="h-48 sm:h-56 md:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              type="category"
              dataKey="name" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis 
              type="number"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => !isPrivacyEnabled ? `R$ ${(value / 1000).toFixed(0)}k` : '***'}
              className="text-muted-foreground"
            />
            <Tooltip 
              formatter={(value: number) => [!isPrivacyEnabled ? formatCurrency(value) : '***', 'Saldo']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                fontSize: '12px'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar 
              dataKey="balance" 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}
