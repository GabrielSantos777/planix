import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowUpDown, 
  BarChart3, 
  Settings,
  TrendingUp,
  Target,
  MessageSquare
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

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
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <Sidebar 
      className={collapsed ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar-background">
        {/* Brand */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <h1 className="text-lg font-bold text-sidebar-foreground">
                Planix
              </h1>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">
            {!collapsed && "Menu Principal"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}