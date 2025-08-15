import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireSubscription?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireSubscription = false 
}) => {
  const { user, loading, profile, isTrialExpired, hasActiveSubscription } = useAuth()

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

  if (requireSubscription && profile) {
    const hasAccess = !isTrialExpired || hasActiveSubscription
    if (!hasAccess) {
      return <Navigate to="/plans" replace />
    }
  }

  return <>{children}</>
}

export default ProtectedRoute