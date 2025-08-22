import * as React from "react"
import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowUpDown, 
  BarChart3, 
  Settings,
  TrendingUp,
  Target,
  MessageSquare,
  X
} from "lucide-react"

import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const items = [
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: LayoutDashboard 
  },
  { 
    title: "Transações", 
    url: "/transacoes", 
    icon: ArrowUpDown 
  },
  { 
    title: "Contas", 
    url: "/contas", 
    icon: Wallet 
  },
  { 
    title: "Investimentos", 
    url: "/investimentos", 
    icon: TrendingUp 
  },
  { 
    title: "Metas", 
    url: "/metas", 
    icon: Target 
  },
  { 
    title: "Relatórios", 
    url: "/relatorios", 
    icon: BarChart3 
  },
  { 
    title: "Conexão", 
    url: "/conexao", 
    icon: MessageSquare 
  },
  { 
    title: "Configurações", 
    url: "/settings", 
    icon: Settings 
  },
]

export function AppSidebar() {
  const { open, openMobile, isMobile, setOpen, setOpenMobile } = useSidebar()
  const isOpen = isMobile ? openMobile : open

  // Fechamento com tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (isMobile) {
          setOpenMobile(false)
        } else {
          setOpen(false)
        }
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, isMobile, setOpen, setOpenMobile])

  // Overlay para fechar o sidebar
  const handleOverlayClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    } else {
      setOpen(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay semitransparente */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={handleOverlayClick}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar-background border-r border-sidebar-border z-50",
          "transition-transform duration-300 ease-in-out",
          // Desktop: 250px de largura
          "w-64 md:w-60 lg:w-64",
          // Mobile: tela cheia
          "sm:w-full",
          // Animação de entrada
          "transform translate-x-0"
        )}
      >
        <div className="flex flex-col h-full bg-sidebar-background">
          {/* Header com botão de fechar */}
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold text-sidebar-foreground">
                PLANIX
              </h1>
            </div>
            
            {/* Botão de fechar */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleOverlayClick}
              className="h-8 w-8 p-0 hover:bg-sidebar-accent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Menu */}
          <div className="flex-1 p-4">
            <div className="mb-4">
              <h2 className="text-sm font-medium text-sidebar-foreground/60 mb-2">
                Menu Principal
              </h2>
            </div>
            
            <nav className="space-y-1">
              {items.map((item) => (
                <NavLink 
                  key={item.title}
                  to={item.url} 
                  end 
                  onClick={() => {
                    // Fechar sidebar ao navegar em mobile
                    if (isMobile) {
                      setOpenMobile(false)
                    }
                  }}
                  className={({ isActive }) => 
                    cn(
                      "flex items-center gap-3 px-3 py-3 rounded-md transition-colors min-h-[40px]",
                      isActive 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                    )
                  }
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{item.title}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}