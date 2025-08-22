import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Crown } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, profile, signOut, isTrialExpired, hasActiveSubscription } = useAuth()
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
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
      <div className="min-h-screen w-full bg-background relative">
        <AppSidebar />
        
        {/* Main Content - sempre ocupa toda a largura */}
        <div className="w-full flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b bg-card px-2 sm:px-4 shadow-sm z-10 relative">
            <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
              <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground" />
              <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2 min-w-0">
                <span className="text-xs sm:text-sm font-medium truncate">
                  Olá, {profile?.full_name || user?.email || 'Usuário'}! 👋
                </span>
                {getSubscriptionBadge()}
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium leading-none">
                    {profile?.full_name || 'Usuário'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="text-xs">
                    {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm"
                onClick={signOut}
                className="gap-1 sm:gap-2 px-2 sm:px-3"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-2 sm:p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}