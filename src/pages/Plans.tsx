import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, Star, Shield, Zap, Settings } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'

const Plans = () => {
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

  const handleChoosePlan = async (planName: string) => {
    if (planName === 'Básico') {
      return
    }
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para assinar um plano",
        variant: "destructive"
      })
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

  const formatPrice = (monthly: number, yearly: number) => {
    if (monthly === 0) return 'Grátis'
    const price = isYearly ? yearly : monthly
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }

  const getPeriod = () => isYearly ? '/ano' : '/mês'

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Escolha o plano ideal para você
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
                    disabled={plan.current || plan.name === 'Básico'}
                  >
                    {plan.current ? (
                      'Plano Atual'
                    ) : (
                      <>
                        {plan.buttonText}
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
    </div>
  )
}

export default Plans