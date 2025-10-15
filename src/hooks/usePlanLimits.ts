import { useAuth } from '@/context/AuthContext'
import { useMemo } from 'react'

export interface PlanLimits {
  maxAccounts: number
  maxTransactions: number
  canExportReports: boolean
  canAccessWhatsApp: boolean
  canAccessAdvancedCharts: boolean
  hasUnlimitedFeatures: boolean
  planName: string
}

export const usePlanLimits = (): PlanLimits => {
  const { profile, isAdmin, hasActiveSubscription, isTrialExpired } = useAuth()

  return useMemo(() => {
    // Se é admin, tem acesso ilimitado
    if (isAdmin) {
      return {
        maxAccounts: Infinity,
        maxTransactions: Infinity,
        canExportReports: true,
        canAccessWhatsApp: true,
        canAccessAdvancedCharts: true,
        hasUnlimitedFeatures: true,
        planName: 'Admin'
      }
    }

    // Se tem assinatura ativa
    if (hasActiveSubscription) {
      switch (profile?.subscription_plan) {
        case 'premium':
          return {
            maxAccounts: Infinity,
            maxTransactions: Infinity,
            canExportReports: true,
            canAccessWhatsApp: true,
            canAccessAdvancedCharts: true,
            hasUnlimitedFeatures: true,
            planName: 'Premium'
          }
        
        case 'professional':
          return {
            maxAccounts: 6,
            maxTransactions: Infinity,
            canExportReports: true,
            canAccessWhatsApp: false,
            canAccessAdvancedCharts: true,
            hasUnlimitedFeatures: false,
            planName: 'Profissional'
          }
        
        default:
          return {
            maxAccounts: 2,
            maxTransactions: 100,
            canExportReports: false,
            canAccessWhatsApp: false,
            canAccessAdvancedCharts: false,
            hasUnlimitedFeatures: false,
            planName: 'Básico'
          }
      }
    }

    // Se ainda está no trial (não expirado)
    if (!isTrialExpired) {
      return {
        maxAccounts: 2,
        maxTransactions: 100,
        canExportReports: false,
        canAccessWhatsApp: false,
        canAccessAdvancedCharts: false,
        hasUnlimitedFeatures: false,
        planName: 'Trial Básico'
      }
    }

    // Trial expirado, sem assinatura
    return {
      maxAccounts: 0,
      maxTransactions: 0,
      canExportReports: false,
      canAccessWhatsApp: false,
      canAccessAdvancedCharts: false,
      hasUnlimitedFeatures: false,
      planName: 'Expirado'
    }
  }, [profile, isAdmin, hasActiveSubscription, isTrialExpired])
}

export default usePlanLimits