import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Crown } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, profile, signOut, isTrialExpired, hasActiveSubscription } = useAuth()
  
  const getSubscriptionBadge = () => {
    if (!profile) return null
    
    if (profile.subscription_plan === 'basic' && !isTrialExpired) {
      return <Badge variant="outline">Trial</Badge>
    }
    
    if (hasActiveSubscription) {
      return (
        <Badge className="bg-primary text-primary-foreground">
          <Crown className="w-3 h-3 mr-1" />
          {profile.subscription_plan === 'premium' ? 'Premium' : 'Enterprise'}
        </Badge>
      )
    }
    
    return <Badge variant="destructive">Expirado</Badge>
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 shadow-sm">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground" />
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm font-medium">
                  Olá, {profile?.full_name || user?.email || 'Usuário'}! 👋
                </span>
                {getSubscriptionBadge()}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm"
                onClick={signOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}