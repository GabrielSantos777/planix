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
  Bot
} from "lucide-react"
import { useState } from "react"
import heroImage from "@/assets/hero-dashboard.jpg"

const Landing = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      name: "Básico",
      price: "Grátis",
      period: "",
      description: "Perfeito para começar",
      features: [
        "Até 100 transações/mês",
        "Relatórios básicos",
        "1 conta bancária",
        "Suporte por email"
      ],
      highlighted: false
    },
    {
      name: "Profissional",
      price: "R$ 19,90",
      period: "/mês",
      description: "Ideal para uso pessoal",
      features: [
        "Transações ilimitadas",
        "Todos os relatórios",
        "Múltiplas contas",
        "Metas financeiras",
        "Exportação PDF/Excel",
        "Suporte prioritário"
      ],
      highlighted: true
    },
    {
      name: "Premium",
      price: "R$ 39,90",
      period: "/mês",
      description: "Para empresários e autônomos",
      features: [
        "Tudo do Profissional",
        "Análises avançadas",
        "Integração bancária",
        "Consultoria financeira",
        "API personalizada",
        "Suporte 24/7"
      ],
      highlighted: false
    }
  ]

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
            <h2 className="text-3xl md:text-4xl font-bold">Escolha seu Plano</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece grátis e evolua conforme suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.highlighted ? 'ring-2 ring-primary border-primary' : ''}`}>
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Recomendado
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => navigate('/auth')}
                  >
                    {plan.name === "Básico" ? "Começar grátis" : "Escolher plano"}
                  </Button>
                </CardContent>
              </Card>
            ))}
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
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
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
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
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