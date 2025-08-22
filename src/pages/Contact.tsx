import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, Mail, MessageCircle, HeadphonesIcon, Instagram } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Contact = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Mensagem Enviada!",
      description: "Recebemos sua mensagem e entraremos em contato em breve.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    })
    setIsSubmitting(false)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email de Suporte",
      description: "suporte@financeapp.com",
      subtitle: "Resposta em até 24 horas"
    },
    {
      icon: HeadphonesIcon,
      title: "Suporte Técnico",
      description: "Para problemas urgentes",
      subtitle: "Segunda a Sexta, 9h às 18h"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat direto conosco",
      subtitle: "Resposta rápida"
    }
  ]

  const subjects = [
    "Dúvida sobre planos",
    "Problema técnico",
    "Sugestão de melhoria",
    "Solicitação de reembolso",
    "Questão de privacidade",
    "Parceria/Negócios",
    "Outro"
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
          <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Fale Conosco
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo 
            ou preencha o formulário para enviar sua mensagem.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-lg text-muted-foreground mb-1">{method.description}</p>
                  <p className="text-sm text-muted-foreground">{method.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
                <p className="text-muted-foreground">
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Select onValueChange={handleSubjectChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o assunto da sua mensagem" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Descreva sua dúvida, problema ou sugestão em detalhes..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja se sua dúvida já foi respondida abaixo
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como cancelar minha assinatura?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Você pode cancelar sua assinatura a qualquer momento através das 
                  configurações da sua conta. O acesso permanece ativo até o fim do período pago.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meus dados estão seguros?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sim! Utilizamos criptografia de ponta a ponta e seguimos todas as 
                  normas de segurança da LGPD para proteger seus dados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso usar em múltiplos dispositivos?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sim! Sua conta funciona em qualquer dispositivo - computador, 
                  tablet ou smartphone - com sincronização automática.
                </p>
              </CardContent>
            </Card>
          </div>
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
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
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

export default Contact