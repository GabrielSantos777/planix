import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Crown, Lock } from 'lucide-react'
import { usePlanLimits } from '@/hooks/usePlanLimits'

interface PlanLimitGuardProps {
  children: React.ReactNode
  feature: 'accounts' | 'transactions' | 'reports' | 'whatsapp' | 'charts'
  currentCount?: number
  fallbackMessage?: string
}

const PlanLimitGuard: React.FC<PlanLimitGuardProps> = ({ 
  children, 
  feature, 
  currentCount = 0,
  fallbackMessage 
}) => {
  const navigate = useNavigate()
  const limits = usePlanLimits()

  const getFeatureConfig = () => {
    switch (feature) {
      case 'accounts':
        return {
          limit: limits.maxAccounts,
          current: currentCount,
          title: 'Limite de Contas Atingido',
          description: `Você atingiu o limite de ${limits.maxAccounts} contas do plano ${limits.planName}.`,
          canAccess: currentCount < limits.maxAccounts || limits.hasUnlimitedFeatures
        }
      
      case 'transactions':
        return {
          limit: limits.maxTransactions,
          current: currentCount,
          title: 'Limite de Lançamentos Atingido',
          description: `Você atingiu o limite de ${limits.maxTransactions} lançamentos do plano ${limits.planName}.`,
          canAccess: currentCount < limits.maxTransactions || limits.hasUnlimitedFeatures
        }
      
      case 'reports':
        return {
          limit: 'permission',
          current: 0,
          title: 'Exportação de Relatórios Indisponível',
          description: `A exportação de relatórios não está disponível no plano ${limits.planName}.`,
          canAccess: limits.canExportReports
        }
      
      case 'whatsapp':
        return {
          limit: 'permission',
          current: 0,
          title: 'WhatsApp Bot Indisponível',
          description: `O WhatsApp Bot não está disponível no plano ${limits.planName}.`,
          canAccess: limits.canAccessWhatsApp
        }
      
      case 'charts':
        return {
          limit: 'permission',
          current: 0,
          title: 'Gráficos Avançados Indisponíveis',
          description: `Os gráficos avançados não estão disponíveis no plano ${limits.planName}.`,
          canAccess: limits.canAccessAdvancedCharts
        }
      
      default:
        return {
          limit: 0,
          current: 0,
          title: 'Funcionalidade Indisponível',
          description: fallbackMessage || 'Esta funcionalidade não está disponível no seu plano.',
          canAccess: false
        }
    }
  }

  const config = getFeatureConfig()

  if (config.canAccess) {
    return <>{children}</>
  }

  return (
    <Card className="border-warning/20 bg-warning/5">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-warning/10 rounded-full">
            <Lock className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base flex items-center space-x-2">
              <span>{config.title}</span>
              <Badge variant="outline" className="text-xs">
                {limits.planName}
              </Badge>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {config.description}
        </p>

        {typeof config.limit === 'number' && config.limit !== Infinity && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uso atual:</span>
              <span className="font-medium">
                {config.current} / {config.limit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all"
                style={{ width: `${Math.min((config.current / config.limit) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => navigate('/plans')} 
            className="flex-1"
            size="sm"
          >
            <Crown className="h-4 w-4 mr-2" />
            Fazer Upgrade
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            size="sm"
            className="flex-1"
          >
            Voltar ao Dashboard
          </Button>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Faça upgrade para ter acesso ilimitado a todas as funcionalidades.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PlanLimitGuard