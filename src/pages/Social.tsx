import Layout from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/context/AuthContext"
import { useCurrency } from "@/context/CurrencyContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, TrendingDown, Copy } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

interface Contact {
  id: string
  name: string
  phone: string
}

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category_id: string
  categories: { name: string } | null
}

interface ContactWithTransactions {
  contact: Contact
  transactions: Transaction[]
  total: number
}

export default function Social() {
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  const [selectedContactData, setSelectedContactData] = useState<ContactWithTransactions | null>(null)

  const { data: contactsWithTransactions = [], isLoading } = useQuery({
    queryKey: ['social-contacts', user?.id],
    queryFn: async () => {
      if (!user?.id) return []

      // Buscar todas as transações com contatos
      const { data: transactions, error: transError } = await supabase
        .from('transactions')
        .select(`
          id,
          description,
          amount,
          date,
          contact_id,
          category_id,
          categories (name)
        `)
        .eq('user_id', user.id)
        .not('contact_id', 'is', null)
        .order('date', { ascending: false })

      if (transError) throw transError

      // Buscar todos os contatos
      const { data: contacts, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)

      if (contactError) throw contactError

      // Agrupar transações por contato
      const contactMap = new Map<string, ContactWithTransactions>()

      transactions?.forEach((trans) => {
        const contact = contacts?.find(c => c.id === trans.contact_id)
        if (!contact) return

        if (!contactMap.has(contact.id)) {
          contactMap.set(contact.id, {
            contact,
            transactions: [],
            total: 0,
          })
        }

        const contactData = contactMap.get(contact.id)!
        contactData.transactions.push(trans as Transaction)
        contactData.total += Math.abs(trans.amount)
      })

      return Array.from(contactMap.values()).sort((a, b) => b.total - a.total)
    },
    enabled: !!user?.id,
  })

  const handleSendWhatsApp = (contactData: ContactWithTransactions) => {
    setSelectedContactData(contactData)
    setWhatsappModalOpen(true)
  }

  const copyMessageToClipboard = () => {
    if (!selectedContactData) return
    
    const { contact, transactions, total } = selectedContactData
    const transactionList = transactions
      .map((t, index) => 
        `${index + 1}. ${t.description} - ${formatCurrency(Math.abs(t.amount))} (${format(new Date(t.date), "dd/MM/yyyy", { locale: ptBR })})`
      )
      .join('\n')

    const message = `Olá ${contact.name}! 👋\n\nAqui está o resumo das suas compras:\n\n${transactionList}\n\n💰 *Total: ${formatCurrency(total)}*\n\nPor favor, realize o pagamento quando possível. Obrigado!`
    
    navigator.clipboard.writeText(message)
    
    toast({
      title: "Mensagem copiada!",
      description: "Cole no WhatsApp e envie para o contato",
    })
  }

  const getWhatsAppMessage = () => {
    if (!selectedContactData) return ""
    
    const { contact, transactions, total } = selectedContactData
    const transactionList = transactions
      .map((t, index) => 
        `${index + 1}. ${t.description} - ${formatCurrency(Math.abs(t.amount))} (${format(new Date(t.date), "dd/MM/yyyy", { locale: ptBR })})`
      )
      .join('\n')

    return `Olá ${contact.name}! 👋\n\nAqui está o resumo das suas compras:\n\n${transactionList}\n\n💰 *Total: ${formatCurrency(total)}*\n\nPor favor, realize o pagamento quando possível. Obrigado!`
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Social</h1>
          <p className="text-muted-foreground">Acompanhe as transações dos seus contatos</p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">Carregando...</p>
            </CardContent>
          </Card>
        ) : contactsWithTransactions.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                Nenhuma transação vinculada a contatos ainda.
              </p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Vincule contatos às transações para vê-los aqui.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {contactsWithTransactions.map(({ contact, transactions, total }) => (
              <Card key={contact.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{contact.name}</CardTitle>
                      <CardDescription>{contact.phone}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-destructive">
                        {formatCurrency(total)}
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        {transactions.length} transação(ões)
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-64 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">
                              {transaction.description}
                            </TableCell>
                            <TableCell>
                              {transaction.categories?.name || 'Sem categoria'}
                            </TableCell>
                            <TableCell>
                              {format(new Date(transaction.date), "dd/MM/yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell className="text-right text-destructive">
                              {formatCurrency(Math.abs(transaction.amount))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        window.location.href = `/transacoes?type=income&contact=${contact.name}&amount=${total}`
                      }}
                      className="gap-2"
                    >
                      <TrendingDown className="h-4 w-4" />
                      Marcar como Pago
                    </Button>
                    <Button 
                      onClick={() => handleSendWhatsApp({ contact, transactions, total })}
                      className="gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Cobrar via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={whatsappModalOpen} onOpenChange={setWhatsappModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mensagem para {selectedContactData?.contact.name}</DialogTitle>
            <DialogDescription>
              Telefone: {selectedContactData?.contact.phone}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {getWhatsAppMessage()}
              </pre>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={copyMessageToClipboard}
                className="flex-1 gap-2"
              >
                <Copy className="h-4 w-4" />
                Copiar Mensagem
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  if (selectedContactData) {
                    const cleanPhone = selectedContactData.contact.phone.replace(/\D/g, '')
                    window.open(`https://wa.me/55${cleanPhone}`, '_blank')
                  }
                }}
                className="flex-1 gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Abrir WhatsApp
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Copie a mensagem e cole no WhatsApp do contato
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
