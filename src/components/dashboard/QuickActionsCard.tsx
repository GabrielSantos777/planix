import { PlusCircle, CreditCard } from "lucide-react"
import { DashboardCard } from "../DashboardCard"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface QuickActionsCardProps {
  isEditMode?: boolean
}

export const QuickActionsCard = ({ isEditMode }: QuickActionsCardProps) => {
  const navigate = useNavigate()

  return (
    <DashboardCard
      title="Ações Rápidas"
      description="Adicione novas transações ou gerencie suas contas"
      isEditMode={isEditMode}
    >
      <div className="flex gap-2 flex-wrap">
        <Button
          className="flex items-center gap-2 flex-1 min-w-[120px]"
          onClick={() => navigate("/transacoes?type=income")}
          size="sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="text-xs sm:text-sm">Nova Receita</span>
        </Button>
        <Button
          variant="destructive"
          className="flex items-center gap-2 flex-1 min-w-[120px]"
          onClick={() => navigate("/transacoes?type=expense")}
          size="sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="text-xs sm:text-sm">Nova Despesa</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 flex-1 min-w-[120px]"
          onClick={() => navigate("/contas")}
          size="sm"
        >
          <CreditCard className="h-4 w-4" />
          <span className="text-xs sm:text-sm">Gerenciar Contas</span>
        </Button>
      </div>
    </DashboardCard>
  )
}
