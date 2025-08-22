import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lightbulb, Heart, ArrowLeft, Users, Target, Award } from "lucide-react"

const AboutUs = () => {
  const navigate = useNavigate()

  const values = [
    {
      icon: Shield,
      title: "Transparência",
      description: "Informações claras sobre como seus dados são tratados e processados."
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Tecnologia de ponta para simplificar o controle das suas finanças."
    },
    {
      icon: Heart,
      title: "Segurança",
      description: "Proteção máxima dos seus dados pessoais e financeiros."
    }
  ]

  const stats = [
    { number: "10K+", label: "Usuários ativos" },
    { number: "1M+", label: "Transações processadas" },
    { number: "99.9%", label: "Uptime garantido" },
    { number: "24/7", label: "Suporte disponível" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">FinanceApp</h1>
          </div>
          <Button onClick={() => navigate("/auth")}>
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sobre Nós
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça nossa missão de transformar a forma como pessoas e empresas 
            gerenciam suas finanças através de tecnologia inteligente e simplicidade.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Ajudar pessoas e empresas a organizarem suas finanças com 
                simplicidade e inteligência, proporcionando ferramentas 
                modernas que tornam o controle financeiro acessível para todos.
              </p>
              <p className="text-lg text-muted-foreground">
                Acreditamos que todos merecem ter controle total sobre suas 
                finanças, independente do seu nível de conhecimento técnico 
                ou experiência com investimentos.
              </p>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="p-0">
                  <div className="flex items-center justify-center h-64">
                    <Users className="h-32 w-32 text-primary/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Nossa História</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg mb-6">
                O FinanceApp nasceu da necessidade real de simplificar o controle 
                financeiro pessoal e empresarial. Fundado em 2024, nossa plataforma 
                foi desenvolvida por uma equipe de especialistas em tecnologia e 
                finanças que identificaram as principais dificuldades enfrentadas 
                por usuários ao tentar organizar suas finanças.
              </p>
              <p className="text-lg mb-6">
                Através de pesquisas extensivas e feedback direto dos usuários, 
                criamos uma solução que combina simplicidade de uso com recursos 
                avançados de análise financeira, sempre priorizando a segurança 
                e privacidade dos dados.
              </p>
              <p className="text-lg">
                Hoje, ajudamos milhares de pessoas a alcançarem seus objetivos 
                financeiros através de uma plataforma intuitiva e confiável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Os princípios que guiam nosso trabalho e definem nossa relação com os usuários
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Números que Falam</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              A confiança dos nossos usuários refletida em números
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-0">
              <Award className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Junte-se a Nós
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Faça parte da comunidade de pessoas que transformaram 
                sua relação com o dinheiro através da tecnologia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/auth")}>
                  Começar Gratuitamente
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/")}>
                  Conhecer Recursos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">FinanceApp</h3>
              <p className="text-sm text-muted-foreground">
                Simplifique suas finanças com inteligência.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Páginas</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">Início</button></li>
                <li><button onClick={() => navigate("/sobre")} className="text-muted-foreground hover:text-foreground transition-colors">Sobre Nós</button></li>
                <li><button onClick={() => navigate("/contato")} className="text-muted-foreground hover:text-foreground transition-colors">Contato</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate("/termos")} className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</button></li>
                <li><button onClick={() => navigate("/privacidade")} className="text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-sm text-muted-foreground">
                suporte@financeapp.com
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 FinanceApp. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutUs