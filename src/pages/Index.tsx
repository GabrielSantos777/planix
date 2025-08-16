import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { TrendingUp, Shield, BarChart3, Smartphone } from "lucide-react"

const Index = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Remove old localStorage check and use proper auth
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            FinanceFlow
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gerencie suas finanças pessoais de forma inteligente e eficiente. 
            Controle receitas, despesas e acompanhe seu patrimônio em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 justify-center">
              <Button size="lg" onClick={() => navigate("/auth")} className="w-full sm:w-auto">
                Começar Agora
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/plans")} className="w-full sm:w-auto">
                Ver Planos
              </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Controle Total</h3>
            <p className="text-sm text-muted-foreground">
              Monitore todas suas receitas e despesas em um só lugar
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Relatórios Detalhados</h3>
            <p className="text-sm text-muted-foreground">
              Gráficos e relatórios para melhor análise financeira
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <Shield className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Segurança</h3>
            <p className="text-sm text-muted-foreground">
              Seus dados protegidos com a mais alta segurança
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <Smartphone className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Acesso Mobile</h3>
            <p className="text-sm text-muted-foreground">
              Interface responsiva para todos os dispositivos
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-primary-foreground rounded-lg p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Pronto para transformar suas finanças?
          </h2>
          <p className="text-base sm:text-lg mb-6">
            Junte-se a milhares de usuários que já estão no controle de suas finanças
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/auth")}
          >
            Criar Conta Gratuita
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
