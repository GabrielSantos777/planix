import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Crown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePlanLimits } from '@/hooks/usePlanLimits'

interface AccountLimitAlertProps {
  currentCount: number
}

const AccountLimitAlert: React.FC<AccountLimitAlertProps> = ({ currentCount }) => {
  const navigate = useNavigate()
  const limits = usePlanLimits()

  // Se tem acesso ilimitado ou ainda não atingiu o limite
  if (limits.hasUnlimitedFeatures || currentCount < limits.maxAccounts) {
    return null
  }

  // Se atingiu o limite
  if (currentCount >= limits.maxAccounts) {
    return (
      <Alert className="border-warning bg-warning/5">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            Você atingiu o limite de {limits.maxAccounts} contas do plano {limits.planName}.
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

export default AccountLimitAlert