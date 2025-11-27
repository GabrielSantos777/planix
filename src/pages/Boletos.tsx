import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, RefreshCw, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { formatCurrency, formatDate } from "@/utils/formatters"
import { formatCPF, unformatCPF, validateCPF } from "@/utils/cpfFormatter"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Layout from "@/components/Layout"
import { z } from "zod"

// Schema de validação
const cpfSchema = z.object({
  cpf: z.string().length(11, "CPF deve ter 11 dígitos").refine(validateCPF, "CPF inválido")
})

const CONSENT_TEXT = `
Ao autorizar, você está consentindo que:

1. Suas informações de boletos sejam consultadas via Open Finance
2. Os dados sejam armazenados de forma segura e criptografada
3. Seu CPF seja usado exclusivamente para consulta de boletos
4. Você pode revogar este consentimento a qualquer momento

Esta autorização é necessária para cumprir com a LGPD e as regulamentações do Open Finance Brasil.
`

interface Boleto {
  id: string
  external_id: string
  barcode: string | null
  digitable_line: string | null
  beneficiary: string
  amount: number
  due_date: string
  payment_date: string | null
  status: string
  payer_name: string | null
  payer_document: string | null
  synced_at: string
}

const Boletos = () => {
  const [boletos, setBoletos] = useState<Boleto[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [showCPFModal, setShowCPFModal] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)
  const [hasCPF, setHasCPF] = useState(false)
  const [cpfInput, setCpfInput] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    checkConsentAndCPF()
  }, [])

  const checkConsentAndCPF = async () => {
    try {
      setLoading(true)

      // Verificar se o usuário tem CPF no perfil
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado",
          variant: "destructive",
        })
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('cpf')
        .eq('user_id', user.id)
        .single()

      if (profileError) throw profileError

      const hasCPFValue = !!profile?.cpf
      setHasCPF(hasCPFValue)

      // Verificar consentimento
      const { data: consentData, error: consentError } = await supabase.functions.invoke(
        'boletos-consent',
        {
          body: { action: 'check' },
        }
      )

      if (consentError) throw consentError

      const hasConsentValue = consentData?.has_consent || false
      setHasConsent(hasConsentValue)

      // Se não tem CPF, solicitar
      if (!hasCPFValue) {
        setShowCPFModal(true)
        return
      }

      // Se não tem consentimento, solicitar
      if (!hasConsentValue) {
        setShowConsentModal(true)
        return
      }

      // Se tem tudo, carregar boletos
      await loadBoletos()
    } catch (error: any) {
      // Não fazer log de dados sensíveis
      toast({
        title: "Erro",
        description: error.message || "Erro ao verificar dados",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCPF = async () => {
    const cleanCPF = unformatCPF(cpfInput)
    
    // Validar CPF com zod
    const validation = cpfSchema.safeParse({ cpf: cleanCPF })
    
    if (!validation.success) {
      toast({
        title: "CPF inválido",
        description: validation.error.errors[0].message,
        variant: "destructive",
      })
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Usuário não autenticado")

      // Verificar se CPF já está em uso
      const { data: existingCPF } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('cpf', cleanCPF)
        .neq('user_id', user.id)
        .maybeSingle()

      if (existingCPF) {
        toast({
          title: "CPF já cadastrado",
          description: "Este CPF já está sendo usado por outra conta",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase
        .from('profiles')
        .update({ cpf: cleanCPF })
        .eq('user_id', user.id)

      if (error) throw error

      setHasCPF(true)
      setShowCPFModal(false)
      setCpfInput("")
      
      toast({
        title: "CPF salvo com sucesso",
        description: "Agora você pode consultar seus boletos",
      })

      // Verificar consentimento
      if (!hasConsent) {
        setShowConsentModal(true)
      } else {
        await loadBoletos()
      }
    } catch (error: any) {
      // Não fazer log de dados sensíveis
      toast({
        title: "Erro ao salvar CPF",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleConsent = async (granted: boolean) => {
    if (!granted) {
      setShowConsentModal(false)
      toast({
        title: "Consentimento negado",
        description: "Você precisa autorizar para consultar boletos",
        variant: "destructive",
      })
      return
    }

    try {
      const { error } = await supabase.functions.invoke('boletos-consent', {
        body: { 
          action: 'create',
          consent_text: CONSENT_TEXT,
        },
      })

      if (error) throw error

      setHasConsent(true)
      setShowConsentModal(false)
      
      toast({
        title: "Consentimento registrado",
        description: "Consultando seus boletos...",
      })

      await loadBoletos()
    } catch (error: any) {
      // Não fazer log de dados sensíveis
      toast({
        title: "Erro ao registrar consentimento",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const loadBoletos = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase.functions.invoke('boletos-search')

      if (error) throw error

      setBoletos(data?.boletos || [])
      
      toast({
        title: "Boletos carregados",
        description: `${data?.boletos?.length || 0} boletos encontrados`,
      })
    } catch (error: any) {
      // Não fazer log de dados sensíveis
      toast({
        title: "Erro ao carregar boletos",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadBoletos()
    setRefreshing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pago
          </Badge>
        )
      case 'open':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
            <Clock className="w-3 h-3 mr-1" />
            Em aberto
          </Badge>
        )
      case 'overdue':
        return (
          <Badge className="bg-red-500/10 text-red-700 dark:text-red-400">
            <AlertCircle className="w-3 h-3 mr-1" />
            Vencido
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredBoletos = boletos.filter(boleto => {
    const matchesSearch = 
      boleto.beneficiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boleto.external_id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || boleto.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const exportToCSV = () => {
    const headers = ['Data Vencimento', 'Beneficiário', 'Valor', 'Status', 'Código de Barras']
    const rows = filteredBoletos.map(boleto => [
      formatDate(boleto.due_date),
      boleto.beneficiary,
      formatCurrency(boleto.amount),
      boleto.status,
      boleto.barcode || boleto.digitable_line || ''
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `boletos_${new Date().toISOString().split('T')[0]}.csv`
    link.click()

    toast({
      title: "Exportado com sucesso",
      description: `${filteredBoletos.length} boletos exportados`,
    })
  }

  if (loading && !hasConsent && !hasCPF) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Meus Boletos</h1>
            <p className="text-muted-foreground">
              Consulte e gerencie seus boletos via Open Finance
            </p>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Busque e filtre seus boletos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por beneficiário ou código..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="open">Em aberto</TabsTrigger>
                  <TabsTrigger value="paid">Pagos</TabsTrigger>
                  <TabsTrigger value="overdue">Vencidos</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filteredBoletos.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum boleto encontrado</h3>
              <p className="text-muted-foreground text-center max-w-md">
                {searchQuery || statusFilter !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Não foram encontrados boletos para o seu CPF'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredBoletos.map((boleto) => (
              <Card key={boleto.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{boleto.beneficiary}</h3>
                        {getStatusBadge(boleto.status)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Vencimento:</span> {formatDate(boleto.due_date)}
                        </div>
                        {boleto.payment_date && (
                          <div>
                            <span className="font-medium">Pagamento:</span> {formatDate(boleto.payment_date)}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Código:</span> {boleto.external_id}
                        </div>
                      </div>
                      {boleto.digitable_line && (
                        <div className="text-xs text-muted-foreground font-mono">
                          {boleto.digitable_line}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-2xl font-bold">{formatCurrency(boleto.amount)}</div>
                      <div className="text-xs text-muted-foreground">
                        Sincronizado: {new Date(boleto.synced_at).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modal de CPF */}
        <Dialog open={showCPFModal} onOpenChange={setShowCPFModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>CPF necessário</DialogTitle>
              <DialogDescription>
                Para consultar boletos via Open Finance, precisamos do seu CPF. 
                Este CPF ficará salvo no seu cadastro e não poderá ser alterado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpfInput}
                  onChange={(e) => setCpfInput(formatCPF(e.target.value))}
                  maxLength={14}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCPFModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveCPF}>
                Salvar CPF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Consentimento */}
        <Dialog open={showConsentModal} onOpenChange={setShowConsentModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Consentimento - Open Finance</DialogTitle>
              <DialogDescription>
                Leia atentamente os termos de consentimento
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                {CONSENT_TEXT}
              </pre>
            </div>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => handleConsent(false)}>
                Não Autorizo
              </Button>
              <Button onClick={() => handleConsent(true)}>
                Autorizo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

export default Boletos
