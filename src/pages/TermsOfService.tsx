import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Scale } from "lucide-react"

const TermsOfService = () => {
  const navigate = useNavigate()

  const sections = [
    {
      title: "1. Aceitação dos Termos",
      content: [
        "Ao acessar e usar o PLANIX, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis.",
        "Se você não concordar com algum destes termos, está proibido de usar ou acessar este site e seus serviços.",
        "Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis."
      ]
    },
    {
      title: "2. Regras de Uso da Plataforma",
      content: [
        "Você deve fornecer informações precisas e atualizadas durante o registro e uso da plataforma.",
        "É proibido usar a plataforma para atividades ilegais, fraudulentas ou que violem direitos de terceiros.",
        "Você é responsável por manter a confidencialidade da sua conta e senha.",
        "Notifique-nos imediatamente sobre qualquer uso não autorizado da sua conta.",
        "É vedado tentar acessar áreas restritas do sistema ou interferir no funcionamento da plataforma."
      ]
    },
    {
      title: "3. Responsabilidade do Usuário",
      content: [
        "Você é totalmente responsável pela veracidade e exatidão dos dados financeiros inseridos na plataforma.",
        "O usuário deve manter seus dados de acesso em sigilo e é responsável por todas as ações realizadas em sua conta.",
        "É de responsabilidade do usuário fazer backup de suas informações importantes.",
        "Você concorda em usar a plataforma apenas para fins legítimos e em conformidade com todas as leis aplicáveis.",
        "O usuário deve notificar imediatamente sobre qualquer atividade suspeita em sua conta."
      ]
    },
    {
      title: "4. Limitação de Responsabilidade da Empresa",
      content: [
        "O PLANIX é fornecido 'como está', sem garantias de qualquer tipo, expressas ou implícitas.",
        "Não garantimos que o serviço será ininterrupto, livre de erros ou totalmente seguro.",
        "Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos, incidentais ou consequenciais.",
        "Nossa responsabilidade total não excederá o valor pago pelo usuário nos últimos 12 meses.",
        "Não somos responsáveis por decisões financeiras tomadas com base nas informações da plataforma.",
        "O usuário reconhece que deve consultar profissionais qualificados para decisões financeiras importantes."
      ]
    },
    {
      title: "5. Cancelamento e Reembolso de Planos",
      content: [
        "Planos pagos podem ser cancelados a qualquer momento através das configurações da conta.",
        "O cancelamento será efetivo ao final do período de cobrança atual.",
        "Não oferecemos reembolsos para períodos já utilizados, exceto em casos específicos.",
        "Em caso de problemas técnicos graves, analisaremos solicitações de reembolso caso a caso.",
        "Downgrade de planos resultará na aplicação das limitações do novo plano imediatamente.",
        "Dados podem ser mantidos por até 30 dias após o cancelamento para possível reativação."
      ]
    },
    {
      title: "6. Alterações dos Termos",
      content: [
        "Reservamo-nos o direito de revisar estes termos de uso a qualquer momento.",
        "Alterações significativas serão comunicadas por email ou através de notificação na plataforma.",
        "O uso continuado da plataforma após alterações constitui aceitação dos novos termos.",
        "Recomendamos a revisão periódica destes termos para estar ciente de qualquer mudança.",
        "Alterações entram em vigor 30 dias após a notificação aos usuários."
      ]
    },
    {
      title: "7. Propriedade Intelectual",
      content: [
        "Todo o conteúdo, design, código e funcionalidades do PLANIX são de nossa propriedade exclusiva.",
        "É proibida a reprodução, distribuição ou criação de trabalhos derivados sem autorização.",
        "Usuários mantêm a propriedade de seus dados pessoais e financeiros inseridos na plataforma.",
        "Concedemos uma licença limitada e revogável para uso pessoal da plataforma."
      ]
    },
    {
      title: "8. Privacidade e Proteção de Dados",
      content: [
        "O tratamento de dados pessoais é regido por nossa Política de Privacidade.",
        "Implementamos medidas técnicas e organizacionais para proteger seus dados.",
        "Não compartilhamos dados pessoais com terceiros, exceto conforme descrito em nossa política.",
        "Usuários têm direitos sobre seus dados conforme a LGPD e outras leis aplicáveis."
      ]
    },
    {
      title: "9. Disposições Gerais",
      content: [
        "Estes termos são regidos pelas leis brasileiras.",
        "Qualquer disputa será resolvida no foro da comarca de São Paulo/SP.",
        "Se alguma disposição for considerada inválida, as demais permanecem em vigor.",
        "Estes termos constituem o acordo completo entre as partes sobre o uso da plataforma."
      ]
    }
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
            <h1 className="text-xl font-bold">PLANIX</h1>
          </div>
          <Button onClick={() => navigate("/auth")}>
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <Scale className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Termos de Uso
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leia atentamente nossos termos e condições para uso da plataforma PLANIX.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8 p-6 bg-muted/30">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Informações Importantes</h2>
                </div>
                <p className="text-muted-foreground">
                  Estes Termos de Uso estabelecem as regras e condições para utilização da plataforma PLANIX. 
                  Ao criar uma conta ou usar nossos serviços, você automaticamente aceita todos os termos descritos abaixo.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Information */}
            <Card className="mt-12 p-6 bg-primary/5">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">Entre em Contato</h3>
                <p className="text-muted-foreground mb-4">
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> legal@PLANIX.com</p>
                  <p><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer with last update */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-4">
              <strong>Última atualização:</strong> 22 de agosto de 2024
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
                Início
              </button>
              <button onClick={() => navigate("/sobre")} className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre Nós
              </button>
              <button onClick={() => navigate("/privacidade")} className="text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidade
              </button>
              <button onClick={() => navigate("/contato")} className="text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </button>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 PLANIX. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TermsOfService