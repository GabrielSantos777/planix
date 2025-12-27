import Layout from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useCurrency } from "@/context/CurrencyContext"
import { useCategories } from "@/context/CategoriesContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, TrendingDown, Copy, Plus, Edit, Trash2, Loader2 } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { format, addMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState, useMemo } from "react"
import { parseLocalDate, getLocalDateString } from "@/utils/dateUtils"

interface Contact {
  id: string
  name: string
  phone: string
  payment_day?: number | null
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
  const { categories } = useCategories()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  const [selectedContactData, setSelectedContactData] = useState<ContactWithTransactions | null>(null)
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'))
  
  // Transaction edit/add modal state
  const [transactionModalOpen, setTransactionModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionForm, setTransactionForm] = useState({
    description: '',
    amount: '',
    date: getLocalDateString(new Date()),
    category_id: ''
  })

  const { data: contactsWithTransactions = [], isLoading, refetch } = useQuery({
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

  // Filtrar transações considerando dia de pagamento do contato
  const filteredContactsWithTransactions = useMemo(() => {
    if (!contactsWithTransactions || !selectedMonth) return contactsWithTransactions

    const [selectedYear, selectedMonthNum] = selectedMonth.split('-').map(Number)

    return contactsWithTransactions.map(({ contact, transactions, total }) => {
      const paymentDay = contact.payment_day || null

      const filteredTransactions = transactions.filter(t => {
        const transDate = parseLocalDate(t.date)
        const transYear = transDate.getFullYear()
        const transMonth = transDate.getMonth() + 1
        const transDay = transDate.getDate()
        
        if (paymentDay) {
          const prevMonth = selectedMonthNum === 1 ? 12 : selectedMonthNum - 1
          const prevYear = selectedMonthNum === 1 ? selectedYear - 1 : selectedYear
          
          const isCurrentMonthBeforePaymentDay = 
            transYear === selectedYear && 
            transMonth === selectedMonthNum && 
            transDay < paymentDay
          
          const isPrevMonthAfterPaymentDay = 
            transYear === prevYear && 
            transMonth === prevMonth && 
            transDay >= paymentDay
          
          return isCurrentMonthBeforePaymentDay || isPrevMonthAfterPaymentDay
        } else {
          return transYear === selectedYear && transMonth === selectedMonthNum
        }
      })

      const filteredTotal = filteredTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)

      return {
        contact,
        transactions: filteredTransactions,
        total: filteredTotal
      }
    }).filter(item => item.transactions.length > 0)
  }, [contactsWithTransactions, selectedMonth])

  // Gerar lista de meses disponíveis (12 meses passados + 12 meses futuros)
  const availableMonths = useMemo(() => {
    const months: { value: string; label: string }[] = []
    const now = new Date()
    
    // 12 meses passados
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now)
      date.setMonth(date.getMonth() - i)
      months.push({
        value: format(date, 'yyyy-MM'),
        label: format(date, 'MMMM yyyy', { locale: ptBR })
      })
    }
    
    // 12 meses futuros
    for (let i = 1; i <= 12; i++) {
      const date = addMonths(now, i)
      months.push({
        value: format(date, 'yyyy-MM'),
        label: format(date, 'MMMM yyyy', { locale: ptBR })
      })
    }
    
    return months
  }, [])

  const handleSendWhatsApp = (contactData: ContactWithTransactions) => {
    setSelectedContactData(contactData)
    setWhatsappModalOpen(true)
  }

  const copyMessageToClipboard = () => {
    if (!selectedContactData) return
    
    const { contact, transactions, total } = selectedContactData
    const transactionList = transactions
      .map((t, index) => 
        `${index + 1}. ${t.description} - ${formatCurrency(Math.abs(t.amount))} (${format(parseLocalDate(t.date), "dd/MM/yyyy", { locale: ptBR })})`
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
        `${index + 1}. ${t.description} - ${formatCurrency(Math.abs(t.amount))} (${format(parseLocalDate(t.date), "dd/MM/yyyy", { locale: ptBR })})`
      )
      .join('\n')

    return `Olá ${contact.name}! 👋\n\nAqui está o resumo das suas compras:\n\n${transactionList}\n\n💰 *Total: ${formatCurrency(total)}*\n\nPor favor, realize o pagamento quando possível. Obrigado!`
  }

  // Transaction CRUD handlers
  const handleAddTransaction = (contact: Contact) => {
    setSelectedContact(contact)
    setEditingTransaction(null)
    setTransactionForm({
      description: '',
      amount: '',
      date: getLocalDateString(new Date()),
      category_id: ''
    })
    setTransactionModalOpen(true)
  }

  const handleEditTransaction = (transaction: Transaction, contact: Contact) => {
    setSelectedContact(contact)
    setEditingTransaction(transaction)
    setTransactionForm({
      description: transaction.description,
      amount: Math.abs(transaction.amount).toString(),
      date: transaction.date,
      category_id: transaction.category_id || ''
    })
    setTransactionModalOpen(true)
  }

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return
    
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transactionId)
      
      if (error) throw error
      
      toast({
        title: "Transação excluída!",
        description: "A transação foi removida com sucesso."
      })
      
      refetch()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir transação.",
        variant: "destructive"
      })
    }
  }

  const handleSubmitTransaction = async () => {
    if (!user?.id || !selectedContact) return
    
    if (!transactionForm.description.trim() || !transactionForm.amount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      const amount = -Math.abs(parseFloat(transactionForm.amount)) // Negative because it's a receivable (expense for the contact)
      
      if (editingTransaction) {
        const { error } = await supabase
          .from('transactions')
          .update({
            description: transactionForm.description,
            amount,
            date: transactionForm.date,
            category_id: transactionForm.category_id || null
          })
          .eq('id', editingTransaction.id)
        
        if (error) throw error
        
        toast({
          title: "Transação atualizada!",
          description: "A transação foi atualizada com sucesso."
        })
      } else {
        const { error } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            description: transactionForm.description,
            amount,
            date: transactionForm.date,
            type: 'expense',
            contact_id: selectedContact.id,
            category_id: transactionForm.category_id || null
          })
        
        if (error) throw error
        
        toast({
          title: "Transação criada!",
          description: "A transação foi adicionada com sucesso."
        })
      }
      
      setTransactionModalOpen(false)
      refetch()
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro",
        description: "Erro ao salvar transação.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const expenseCategories = categories.filter(c => c.type === 'expense')

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Social</h1>
            <p className="text-muted-foreground">Acompanhe as transações dos seus contatos</p>
          </div>
          
          {/* Filtro de Mês */}
          <div className="w-full md:w-64">
            <Label>Filtrar por Mês</Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">Carregando...</p>
            </CardContent>
          </Card>
        ) : filteredContactsWithTransactions.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                Nenhuma transação encontrada para o mês selecionado.
              </p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Tente selecionar outro mês ou vincule contatos às transações.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredContactsWithTransactions.map(({ contact, transactions, total }) => (
              <Card key={contact.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>{contact.name}</CardTitle>
                      <CardDescription>
                        {contact.phone}
                        {contact.payment_day && (
                          <span className="ml-2 text-xs">(Dia de pagamento: {contact.payment_day})</span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="text-left sm:text-right">
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
                  {/* Mobile - Cards */}
                  <div className="md:hidden space-y-2 max-h-64 overflow-y-auto">
                    {transactions.map((transaction) => (
                      <div 
                        key={transaction.id}
                        className="border rounded-md p-3 space-y-1 bg-card"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="font-medium text-sm flex-1 line-clamp-2">
                            {transaction.description}
                          </div>
                          <div className="text-destructive font-semibold text-sm shrink-0">
                            {formatCurrency(Math.abs(transaction.amount))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{transaction.categories?.name || 'Sem categoria'}</span>
                          <span>{format(parseLocalDate(transaction.date), "dd/MM/yyyy", { locale: ptBR })}</span>
                        </div>
                        <div className="flex gap-1 pt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTransaction(transaction, contact)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop - Table */}
                  <div className="hidden md:block max-h-64 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                          <TableHead className="w-20">Ações</TableHead>
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
                              {format(parseLocalDate(transaction.date), "dd/MM/yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell className="text-right text-destructive">
                              {formatCurrency(Math.abs(transaction.amount))}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditTransaction(transaction, contact)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteTransaction(transaction.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleAddTransaction(contact)}
                      className="gap-2 w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar Transação
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        window.location.href = `/transacoes?type=income&contact=${contact.name}&amount=${total}`
                      }}
                      className="gap-2 w-full sm:w-auto"
                    >
                      <TrendingDown className="h-4 w-4" />
                      Marcar como Pago
                    </Button>
                    <Button 
                      onClick={() => handleSendWhatsApp({ contact, transactions, total })}
                      className="gap-2 w-full sm:w-auto"
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

      {/* WhatsApp Modal */}
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

      {/* Transaction Add/Edit Modal */}
      <Dialog open={transactionModalOpen} onOpenChange={setTransactionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
            </DialogTitle>
            <DialogDescription>
              {selectedContact?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={transactionForm.description}
                onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
                placeholder="Ex: Almoço, Compra no mercado..."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="amount">Valor</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={transactionForm.amount}
                onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                placeholder="0,00"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={transactionForm.date}
                onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={transactionForm.category_id || 'none'} 
                onValueChange={(value) => setTransactionForm({ ...transactionForm, category_id: value === 'none' ? '' : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem categoria</SelectItem>
                  {expenseCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleSubmitTransaction} className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingTransaction ? 'Atualizar' : 'Criar'} Transação
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}