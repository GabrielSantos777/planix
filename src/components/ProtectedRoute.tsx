import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Clock, Lock, Loader2, AlertTriangle } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireSubscription?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireSubscription = false 
}) => {
  const { user, profile, isAdmin, loading, isTrialExpired, hasActiveSubscription } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  // Se requer assinatura e não é admin
  if (requireSubscription && !isAdmin) {
    // Se o trial expirou e não tem assinatura ativa
    if (isTrialExpired && !hasActiveSubscription) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-destructive/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full">
                <Lock className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-xl">Acesso Restrito</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Esta funcionalidade requer uma assinatura ativa. Seu período de teste gratuito de 15 dias expirou.
              </p>
              
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Trial Expirado
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Data de expiração: {profile?.trial_end ? new Date(profile.trial_end).toLocaleDateString('pt-BR') : 'N/A'}
                </p>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/plans')} 
                  className="w-full"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Escolher Plano
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Voltar ao Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Se a assinatura estiver expirada
    if (hasActiveSubscription && profile?.subscription_end && new Date(profile.subscription_end) < new Date()) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-warning/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-warning/10 rounded-full">
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
              <CardTitle className="text-xl">Assinatura Vencida</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Sua assinatura venceu em {new Date(profile.subscription_end).toLocaleDateString('pt-BR')}. 
                Renove para continuar acessando esta funcionalidade.
              </p>
              
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center border-warning text-warning">
                  <Clock className="h-4 w-4 mr-2" />
                  Plano {profile?.subscription_plan} Vencido
                </Badge>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/plans')} 
                  className="w-full"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Renovar Assinatura
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Voltar ao Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Se ainda está no trial, mostrar aviso mas permitir acesso
    if (!hasActiveSubscription && !isTrialExpired) {
      const trialDaysLeft = profile?.trial_end 
        ? Math.ceil((new Date(profile.trial_end).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0

      return (
        <div className="min-h-screen">
          {trialDaysLeft <= 3 && (
            <div className="bg-warning/10 border-b border-warning/20 p-4">
              <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-warning" />
                  <span className="text-sm font-medium">
                    Trial expira em {trialDaysLeft} dias
                  </span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/plans')}
                  className="bg-warning text-warning-foreground hover:bg-warning/90"
                >
                  Escolher Plano
                </Button>
              </div>
            </div>
          )}
          {children}
        </div>
      )
    }
  }

  return <>{children}</>
}

export default ProtectedRoute