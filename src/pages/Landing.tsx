import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  BarChart3,
  Target,
  Wallet,
  FileDown,
  Star,
  Check,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Bot,
  ArrowRight,
  Shield,
  Zap,
  Settings
} from "lucide-react"
import { useState } from "react"
import heroImage from "@/assets/hero-dashboard.jpg"
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'

const Landing = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isYearly, setIsYearly] = useState(false)
  const { profile, user } = useAuth()
  const { toast } = useToast()

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal')
      
      if (error) throw error
      
      if (data?.url) {
        window.open(data.url, '_blank')
      }
    } catch (error) {
      console.error('Error opening customer portal:', error)
      toast({
        title: "Erro",
        description: "Erro ao abrir portal de gerenciamento. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleChoosePlan = async (planName: string) => {
    if (planName === 'Básico') {
      navigate('/auth')
      return
    }
    
    if (!user) {
      navigate('/auth')
      return
    }
    
    try {
      const planType = planName === 'Premium' ? 'premium' : 'professional'
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType }
      })
      
      if (error) throw error
      
      if (data?.url) {
        window.open(data.url, '_blank')
      }
    } catch (error) {
      console.error('Error creating checkout:', error)
      toast({
        title: "Erro",
        description: "Erro ao processar pagamento. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const features = [
    {
      icon: TrendingUp,
      title: "Controle de Despesas e Receitas",
      description: "Monitore seus gastos e ganhos de forma detalhada e organize suas finanças"
    },
    {
      icon: BarChart3,
      title: "Gráficos e Relatórios Automáticos",
      description: "Visualize seus dados financeiros com gráficos intuitivos e relatórios detalhados"
    },
    {
      icon: Target,
      title: "Definição de Metas Financeiras",
      description: "Estabeleça objetivos e acompanhe seu progresso rumo à independência financeira"
    },
    {
      icon: Wallet,
      title: "Gestão de Múltiplas Contas",
      description: "Centralize todas suas contas bancárias e cartões em um só lugar"
    },
    {
      icon: FileDown,
      title: "Exportação PDF/Excel",
      description: "Exporte seus relatórios e dados para análise externa ou backup"
    },
    {
      icon: Bot,
      title: "Bot WhatsApp",
      description: "Insira suas receitas e despesas, consulte saldos, receba relatórios diretamente no seu WhatsApp"
    }
  ]

  const plans = [
    {
      name: 'Básico',
      description: 'Ideal para quem está começando no controle financeiro',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Até 100 transações por mês',
        'Até 2 contas bancárias conectadas',
        'Relatórios simples e claros',
        'Controle de receitas e despesas',
        'Suporte por e-mail'
      ],
      limitations: [
        'Sem relatórios avançados',
        'Sem exportação de dados',
        'Sem metas financeiras'
      ],
      current: !profile?.subscription_plan || profile?.subscription_plan === 'basic',
      popular: false,
      trial: true,
      buttonText: 'Plano Gratuito'
    },
    {
      name: 'Profissional',
      description: 'Para quem quer organização completa das finanças pessoais',
      monthlyPrice: 24.90,
      yearlyPrice: 249.00,
      features: [
        'Transações ilimitadas',
        'Até 6 contas/cartões conectados',
        'Relatórios avançados + dashboards interativos',
        'Metas financeiras personalizadas',
        'Exportação de relatórios em PDF/Excel',
        'Suporte prioritário'
      ],
      limitations: [],
      current: profile?.subscription_plan === 'professional' && profile?.subscription_end && new Date(profile.subscription_end) > new Date(),
      popular: true,
      trial: false,
      buttonText: 'Escolher Profissional'
    },
    {
      name: 'Premium',
      description: 'Para empreendedores, autônomos e gestão avançada',
      monthlyPrice: 49.90,
      yearlyPrice: 499.00,
      features: [
        'Tudo do Plano Profissional',
        'Análises financeiras avançadas (fluxo de caixa, comparativos)',
        'Cadastro de contas/cartões ilimitados',
        'Consultoria financeira com IA',
        'Integração com outras ferramentas (API)',
        'Suporte 24 horas'
      ],
      limitations: [],
      current: profile?.subscription_plan === 'premium' && profile?.subscription_end && new Date(profile.subscription_end) > new Date(),
      popular: false,
      trial: false,
      buttonText: 'Escolher Premium'
    }
  ]

  const formatPrice = (monthly: number, yearly: number) => {
    if (monthly === 0) return 'Grátis'
    const price = isYearly ? yearly : monthly
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }

  const getPeriod = () => isYearly ? '/ano' : '/mês'

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      content: "Transformou completamente como vejo minhas finanças. Consegui economizar 30% mais em 3 meses!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Desenvolvedor",
      content: "Interface intuitiva e relatórios muito detalhados. Recomendo para quem quer organizar a vida financeira.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Freelancer",
      content: "Finalmente posso acompanhar todos os meus projetos e rendas em um só lugar. Essencial para autônomos!",
      rating: 5
    }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">PLANIX</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('funcionalidades')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Funcionalidades
              </button>
              <button
                onClick={() => scrollToSection('planos')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Planos
              </button>
              <button
                onClick={() => scrollToSection('depoimentos')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contato
              </button>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Login
              </Button>
              <Button onClick={() => navigate('/auth')}>
                Criar conta
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-background/95 backdrop-blur">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('funcionalidades')}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                >
                  Funcionalidades
                </button>
                <button
                  onClick={() => scrollToSection('planos')}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                >
                  Planos
                </button>
                <button
                  onClick={() => scrollToSection('depoimentos')}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                >
                  Depoimentos
                </button>
                <button
                  onClick={() => scrollToSection('contato')}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                >
                  Contato
                </button>
                <div className="pt-4 space-y-2">
                  <Button variant="ghost" className="w-full" onClick={() => navigate('/auth')}>
                    Login
                  </Button>
                  <Button className="w-full" onClick={() => navigate('/auth')}>
                    Criar conta
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Organize suas finanças de forma{' '}
                <span className="text-primary">simples e inteligente</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Controle gastos, planeje metas e conquiste a liberdade financeira com nossa plataforma completa de gestão financeira pessoal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/auth')}>
                  Começar agora
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection('funcionalidades')}>
                  Saiba mais
                </Button>
              </div>
            </div>
            <div className="lg:order-last">
              <img
                src={heroImage}
                alt="Dashboard do sistema financeiro"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Funcionalidades Poderosas</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Todas as ferramentas que você precisa para ter controle total sobre suas finanças
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Escolha o plano ideal para você</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece grátis e evolua conforme suas necessidades. 
              Cancele a qualquer momento.
            </p>

            {/* Toggle de período */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
                Mensal
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-12 h-6 p-0"
              >
                <div className={`absolute w-4 h-4 bg-primary rounded-full transition-transform ${
                  isYearly ? 'translate-x-3' : 'translate-x-1'
                }`} />
              </Button>
              <span className={`font-medium ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
                Anual
              </span>
              {isYearly && (
                <Badge variant="secondary" className="ml-2">
                  Economize até 17%
                </Badge>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105' 
                    : plan.current 
                      ? 'border-success' 
                      : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                {plan.current && (
                  <div className="absolute -top-3 right-4">
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      <Check className="w-3 h-3 mr-1" />
                      Atual
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    {index === 0 && <Shield className="w-6 h-6 text-primary" />}
                    {index === 1 && <Zap className="w-6 h-6 text-primary" />}
                    {index === 2 && <Star className="w-6 h-6 text-primary" />}
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">
                      {formatPrice(plan.monthlyPrice, plan.yearlyPrice)}
                    </div>
                    {plan.monthlyPrice > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {getPeriod()}
                      </div>
                    )}
                    {plan.trial && (
                      <Badge variant="outline" className="mt-2">
                        15 dias grátis
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Limitações:</p>
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-start gap-3 mb-1">
                          <span className="text-xs text-muted-foreground">• {limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 mt-6">
                    <Button 
                      className="w-full"
                      variant={plan.popular ? "default" : plan.current ? "secondary" : "outline"}
                      onClick={() => handleChoosePlan(plan.name)}
                      disabled={plan.current && plan.name !== 'Básico'}
                    >
                      {plan.current && plan.name !== 'Básico' ? (
                        'Plano Atual'
                      ) : (
                        <>
                          {plan.name === 'Básico' ? 'Começar grátis' : plan.buttonText}
                          {plan.name !== 'Básico' && <ArrowRight className="w-4 h-4 ml-2" />}
                        </>
                      )}
                    </Button>
                    
                    {plan.current && plan.name !== 'Básico' && (
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={handleManageSubscription}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Gerenciar Assinatura
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Todos os planos incluem 30 dias de garantia. Cancele a qualquer momento.
            </p>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <span>✓ Dados seguros e criptografados</span>
              <span>✓ Suporte especializado</span>
              <span>✓ Atualizações gratuitas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">O que nossos clientes dizem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra como o PLANIX está transformando a vida financeira das pessoas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para dominar suas finanças?
            </h2>
            <p className="text-xl opacity-90">
              Junte-se a milhares de pessoas que já transformaram sua relação com o dinheiro
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => navigate('/auth')}
            >
              Criar minha conta grátis
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="py-12 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">PLANIX</h3>
              <p className="text-muted-foreground">
                Sua jornada rumo à liberdade financeira começa aqui.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Links Rápidos</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => navigate("/sobre")} className="hover:text-foreground transition-colors">Sobre</button></li>
                <li><button onClick={() => navigate("/termos")} className="hover:text-foreground transition-colors">Termos de Uso</button></li>
                <li><button onClick={() => navigate("/privacidade")} className="hover:text-foreground transition-colors">Política de Privacidade</button></li>
                <li><button onClick={() => navigate("/contato")} className="hover:text-foreground transition-colors">Contato</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#funcionalidades" className="hover:text-foreground transition-colors">Funcionalidades</a></li>
                <li><a href="#planos" className="hover:text-foreground transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Suporte</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; 2025 PLANIX. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing