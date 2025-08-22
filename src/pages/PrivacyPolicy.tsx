import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Database, Cookie, Users, Lock, Eye } from "lucide-react"

const PrivacyPolicy = () => {
  const navigate = useNavigate()

  const sections = [
    {
      icon: Database,
      title: "1. Coleta de Dados",
      content: [
        "Coletamos informações pessoais quando você se registra em nossa plataforma, como nome, email e telefone.",
        "Dados financeiros são inseridos voluntariamente por você para uso das funcionalidades da plataforma.",
        "Coletamos automaticamente dados de uso, como páginas visitadas, tempo de sessão e preferências.",
        "Informações técnicas como endereço IP, tipo de navegador e sistema operacional são coletadas para melhorar nossos serviços.",
        "Não coletamos dados sensíveis além do necessário para o funcionamento da plataforma."
      ]
    },
    {
      icon: Lock,
      title: "2. Uso dos Dados",
      content: [
        "Seus dados são utilizados exclusivamente para fornecer e melhorar nossos serviços financeiros.",
        "Processamos informações para gerar relatórios, gráficos e análises personalizadas.",
        "Utilizamos dados para autenticação, segurança e prevenção de fraudes.",
        "Enviamos comunicações relacionadas à sua conta, atualizações de serviços e suporte técnico.",
        "Dados agregados e anonimizados podem ser usados para pesquisa e melhoria da plataforma.",
        "Nunca vendemos ou alugamos seus dados pessoais para terceiros."
      ]
    },
    {
      icon: Shield,
      title: "3. Segurança e Proteção",
      content: [
        "Implementamos criptografia de ponta a ponta para proteger seus dados em trânsito e armazenamento.",
        "Utilizamos protocolos de segurança padrão da indústria, incluindo HTTPS e TLS.",
        "Acesso aos dados é restrito apenas a funcionários autorizados que necessitam das informações para suas funções.",
        "Realizamos auditorias regulares de segurança e testes de penetração em nossos sistemas.",
        "Mantemos logs de acesso e monitoramento 24/7 para detectar atividades suspeitas.",
        "Em caso de violação de dados, notificaremos os usuários afetados dentro de 72 horas."
      ]
    },
    {
      icon: Cookie,
      title: "4. Cookies e Analytics",
      content: [
        "Utilizamos cookies essenciais para o funcionamento da plataforma, como manter você logado.",
        "Cookies de preferência armazenam suas configurações de interface e idioma.",
        "Implementamos Google Analytics para entender como os usuários interagem com nossa plataforma.",
        "Cookies de marketing podem ser usados para personalizar conteúdo (com seu consentimento).",
        "Você pode gerenciar suas preferências de cookies através das configurações do navegador.",
        "Fornecemos um banner de consentimento para cookies não essenciais."
      ]
    },
    {
      icon: Users,
      title: "5. Compartilhamento com Terceiros",
      content: [
        "Não compartilhamos dados pessoais com terceiros, exceto nas situações descritas nesta política.",
        "Podemos compartilhar dados com prestadores de serviços que nos auxiliam na operação da plataforma.",
        "Todos os terceiros são obrigados contratualmente a proteger seus dados e usá-los apenas conforme instruído.",
        "Em caso de fusão, aquisição ou venda de ativos, dados podem ser transferidos como parte da transação.",
        "Podemos divulgar informações se exigido por lei ou para proteger nossos direitos legais.",
        "Integração com WhatsApp: dados necessários são compartilhados apenas para funcionalidade do bot."
      ]
    },
    {
      icon: Eye,
      title: "6. Seus Direitos (LGPD)",
      content: [
        "Direito de acesso: você pode solicitar uma cópia de todos os dados que temos sobre você.",
        "Direito de retificação: pode solicitar correção de dados incorretos ou desatualizados.",
        "Direito de exclusão: pode solicitar a remoção de seus dados pessoais de nossos sistemas.",
        "Direito de portabilidade: pode solicitar seus dados em formato estruturado e legível.",
        "Direito de oposição: pode se opor ao processamento de seus dados para certas finalidades.",
        "Direito de limitação: pode solicitar restrição do processamento em certas circunstâncias.",
        "Para exercer seus direitos, entre em contato através do email: privacidade@PLANIX.com"
      ]
    },
    {
      title: "7. Retenção de Dados",
      content: [
        "Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas.",
        "Dados de conta são mantidos enquanto sua conta estiver ativa.",
        "Após cancelamento, dados podem ser mantidos por até 5 anos para fins de auditoria e conformidade.",
        "Dados financeiros podem ser mantidos por períodos maiores conforme exigências legais.",
        "Você pode solicitar exclusão antecipada de dados não sujeitos a obrigações legais.",
        "Backups podem conter dados por períodos adicionais por motivos de segurança."
      ]
    },
    {
      title: "8. Transferência Internacional",
      content: [
        "Seus dados são processados principalmente em servidores localizados no Brasil.",
        "Alguns prestadores de serviços podem estar localizados em outros países.",
        "Garantimos que qualquer transferência internacional atende aos padrões de proteção adequados.",
        "Implementamos salvaguardas contratuais para proteger dados transferidos internacionalmente."
      ]
    },
    {
      title: "9. Menores de Idade",
      content: [
        "Nossa plataforma não é destinada a menores de 18 anos.",
        "Não coletamos intencionalmente dados de menores de idade.",
        "Se tomarmos conhecimento de coleta acidental de dados de menores, os removeremos imediatamente.",
        "Pais ou responsáveis podem entrar em contato para reportar uso por menores."
      ]
    },
    {
      title: "10. Alterações nesta Política",
      content: [
        "Podemos atualizar esta política periodicamente para refletir mudanças em nossas práticas.",
        "Alterações significativas serão comunicadas por email ou notificação na plataforma.",
        "A versão mais atual estará sempre disponível em nossa plataforma.",
        "Recomendamos revisar esta política regularmente para estar ciente de atualizações."
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
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Política de Privacidade
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparência total sobre como coletamos, usamos e protegemos seus dados pessoais.
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
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Compromisso com sua Privacidade</h2>
                </div>
                <p className="text-muted-foreground">
                  No PLANIX, sua privacidade é nossa prioridade. Esta política descreve como tratamos 
                  seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD) e 
                  outras regulamentações aplicáveis.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl text-primary">
                      {section.icon && <section.icon className="h-6 w-6" />}
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground leading-relaxed">
                          • {item}
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
                <h3 className="text-xl font-semibold mb-4">Contato para Questões de Privacidade</h3>
                <p className="text-muted-foreground mb-4">
                  Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email do Encarregado de Dados:</strong> privacidade@PLANIX.com</p>
                  <p><strong>Email Geral:</strong> suporte@PLANIX.com</p>
                  <p><strong>Tempo de Resposta:</strong> até 15 dias úteis</p>
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
              <button onClick={() => navigate("/termos")} className="text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
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

export default PrivacyPolicy