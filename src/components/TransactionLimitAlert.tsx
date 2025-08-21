import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Crown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePlanLimits } from '@/hooks/usePlanLimits'

interface TransactionLimitAlertProps {
  currentCount: number
}

const TransactionLimitAlert: React.FC<TransactionLimitAlertProps> = ({ currentCount }) => {
  const navigate = useNavigate()
  const limits = usePlanLimits()

  // Se tem acesso ilimitado
  if (limits.hasUnlimitedFeatures) {
    return null
  }

  const percentageUsed = (currentCount / limits.maxTransactions) * 100

  // Avisar quando atingir 80% do limite
  if (percentageUsed >= 80 && percentageUsed < 100) {
    return (
      <Alert className="border-warning bg-warning/5">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            Você usou {currentCount} de {limits.maxTransactions} lançamentos permitidos no seu plano {limits.planName} ({Math.round(percentageUsed)}%).
          </span>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => navigate('/plans')}
            className="ml-4"
          >
            <Crown className="h-4 w-4 mr-2" />
            Ver Planos
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  // Bloquear quando atingir 100% do limite
  if (currentCount >= limits.maxTransactions) {
    return (
      <Alert className="border-destructive bg-destructive/5">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            Você atingiu o limite de {limits.maxTransactions} lançamentos do plano {limits.planName}.
          </span>
          <Button 
            size="sm" 
            onClick={() => navigate('/plans')}
            className="ml-4"
          >
            <Crown className="h-4 w-4 mr-2" />
            Fazer Upgrade
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return null
}

export default TransactionLimitAlert