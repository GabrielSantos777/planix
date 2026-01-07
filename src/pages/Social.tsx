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
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import { MessageCircle, TrendingDown, Copy, Plus, Edit, Trash2, MinusCircle } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState, useMemo } from "react"
import { parseLocalDate, getLocalDateString } from "@/utils/dateUtils"
import { CurrencyInput } from "@/components/ui/currency-input"

interface SocialAdjustment {
  id: string
  contact_id: string
  description: string
  amount: number
  date: string
}

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
  adjustments: SocialAdjustment[]
  total: number
  adjustmentsTotal: number
  finalTotal: number
}

export default function Social() {
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { accounts, categories, contacts: allContacts, addTransaction, updateTransaction, deleteTransaction } = useSupabaseData()
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  const [selectedContactData, setSelectedContactData] = useState<ContactWithTransactions | null>(null)
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'))
  
  // Transaction modal state
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [selectedContactForTransaction, setSelectedContactForTransaction] = useState<Contact | null>(null)
  const [transactionForm, setTransactionForm] = useState({
    description: '',
    amount: 0,
    date: getLocalDateString(),
    category_id: '',
    account_id: ''
  })

  // Adjustment modal state
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false)
  const [editingAdjustment, setEditingAdjustment] = useState<SocialAdjustment | null>(null)
  const [selectedContactForAdjustment, setSelectedContactForAdjustment] = useState<Contact | null>(null)
  const [adjustmentForm, setAdjustmentForm] = useState({
    description: '',
    amount: 0,
    date: getLocalDateString()
  })

  // Query for social adjustments
  const { data: socialAdjustments = [] } = useQuery({
    queryKey: ['social-adjustments', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      const { data, error } = await supabase
        .from('social_adjustments')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
      if (error) throw error
      return data as SocialAdjustment[]
    },
    enabled: !!user?.id,
  })

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
            adjustments: [],
            total: 0,
            adjustmentsTotal: 0,
            finalTotal: 0,
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

  // Filtrar transações e ajustes considerando dia de pagamento do contato
  const filteredContactsWithTransactions = useMemo(() => {
    if (!contactsWithTransactions || !selectedMonth) return contactsWithTransactions

    const [selectedYear, selectedMonthNum] = selectedMonth.split('-').map(Number)

    return contactsWithTransactions.map(({ contact, transactions }) => {
      const paymentDay = (contact as any).payment_day || null

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

      // Filter adjustments for this contact and month
      const contactAdjustments = socialAdjustments.filter(adj => {
        if (adj.contact_id !== contact.id) return false
        const adjDate = parseLocalDate(adj.date)
        const adjYear = adjDate.getFullYear()
        const adjMonth = adjDate.getMonth() + 1
        
        if (paymentDay) {
          const adjDay = adjDate.getDate()
          const prevMonth = selectedMonthNum === 1 ? 12 : selectedMonthNum - 1
          const prevYear = selectedMonthNum === 1 ? selectedYear - 1 : selectedYear
          
          const isCurrentMonthBeforePaymentDay = 
            adjYear === selectedYear && 
            adjMonth === selectedMonthNum && 
            adjDay < paymentDay
          
          const isPrevMonthAfterPaymentDay = 
            adjYear === prevYear && 
            adjMonth === prevMonth && 
            adjDay >= paymentDay
          
          return isCurrentMonthBeforePaymentDay || isPrevMonthAfterPaymentDay
        } else {
          return adjYear === selectedYear && adjMonth === selectedMonthNum
        }
      })

      const filteredTotal = filteredTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
      const adjustmentsTotal = contactAdjustments.reduce((sum, a) => sum + a.amount, 0)
      const finalTotal = filteredTotal - adjustmentsTotal // Adjustments reduce the amount owed

      return {
        contact,
        transactions: filteredTransactions,
        adjustments: contactAdjustments,
        total: filteredTotal,
        adjustmentsTotal,
        finalTotal
      }
    }).filter(item => item.transactions.length > 0 || item.adjustments.length > 0)
  }, [contactsWithTransactions, selectedMonth, socialAdjustments])

  // Gerar lista de meses disponíveis (6 meses passados + mês atual + 6 meses futuros)
  const availableMonths = useMemo(() => {
    const months: { value: string; label: string }[] = []
    // 6 meses para trás
    for (let i = 6; i >= 1; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      months.push({
        value: format(date, 'yyyy-MM'),
        label: format(date, 'MMMM yyyy', { locale: ptBR })
      })
    }
    // Mês atual
    months.push({
      value: format(new Date(), 'yyyy-MM'),
      label: format(new Date(), 'MMMM yyyy', { locale: ptBR })
    })
    // 6 meses para frente
    for (let i = 1; i <= 6; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() + i)
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
    
    const message = getWhatsAppMessage()
    navigator.clipboard.writeText(message)
    
    toast({
      title: "Mensagem copiada!",
      description: "Cole no WhatsApp e envie para o contato",
    })
  }

  const getWhatsAppMessage = () => {
    if (!selectedContactData) return ""
    
    const { contact, transactions, adjustments, total, adjustmentsTotal, finalTotal } = selectedContactData
    const transactionList = transactions
      .map((t, index) => 
        `${index + 1}. ${t.description} - ${formatCurrency(Math.abs(t.amount))} (${format(parseLocalDate(t.date), "dd/MM/yyyy", { locale: ptBR })})`
      )
      .join('\n')

    let message = `Olá ${contact.name}! 👋\n\nAqui está o resumo das suas compras:\n\n${transactionList}\n\n💰 *Subtotal: ${formatCurrency(total)}*`
    
    if (adjustments.length > 0) {
      const adjustmentsList = adjustments
        .map((a, index) => 
          `${index + 1}. ${a.description} - ${formatCurrency(a.amount)} (${format(parseLocalDate(a.date), "dd/MM/yyyy", { locale: ptBR })})`
        )
        .join('\n')
      
      message += `\n\n📝 *Abatimentos/Ajustes:*\n${adjustmentsList}\n\n💵 *Total ajustes: -${formatCurrency(adjustmentsTotal)}*`
    }
    
    message += `\n\n🎯 *Total a pagar: ${formatCurrency(Math.max(0, finalTotal))}*\n\nPor favor, realize o pagamento quando possível. Obrigado!`
    
    return message
  }

  // Open modal to add new transaction for a contact
  const handleAddTransaction = (contact: Contact) => {
    setSelectedContactForTransaction(contact)
    setEditingTransaction(null)
    setTransactionForm({
      description: '',
      amount: 0,
      date: getLocalDateString(),
      category_id: '',
      account_id: accounts.length > 0 ? accounts[0].id : ''
    })
    setIsTransactionModalOpen(true)
  }

  // Open modal to edit an existing transaction
  const handleEditTransaction = (transaction: Transaction, contact: Contact) => {
    setSelectedContactForTransaction(contact)
    setEditingTransaction(transaction)
    setTransactionForm({
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      date: transaction.date,
      category_id: transaction.category_id || '',
      account_id: ''
    })
    setIsTransactionModalOpen(true)
  }

  // Save transaction (add or update)
  const handleSaveTransaction = async () => {
    if (!user || !selectedContactForTransaction) return

    try {
      if (editingTransaction) {
        // Update existing transaction
        await updateTransaction(editingTransaction.id, {
          description: transactionForm.description,
          amount: -Math.abs(transactionForm.amount), // Expense is negative
          date: transactionForm.date,
          category_id: transactionForm.category_id || null
        })
        toast({
          title: "Transação atualizada!",
          description: "A transação foi atualizada com sucesso."
        })
      } else {
        // Add new transaction
        await addTransaction({
          description: transactionForm.description,
          amount: -Math.abs(transactionForm.amount), // Expense is negative
          type: 'expense',
          date: transactionForm.date,
          category_id: transactionForm.category_id || null,
          account_id: transactionForm.account_id || null,
          contact_id: selectedContactForTransaction.id,
          credit_card_id: null,
          user_id: user.id
        })
        toast({
          title: "Transação adicionada!",
          description: "A transação foi vinculada ao contato."
        })
      }

      setIsTransactionModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['social-contacts'] })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar transação. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  // Delete a transaction
  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteTransaction(transactionId)
      toast({
        title: "Transação excluída!",
        description: "A transação foi removida."
      })
      queryClient.invalidateQueries({ queryKey: ['social-contacts'] })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir transação.",
        variant: "destructive"
      })
    }
  }

  // Adjustment handlers
  const handleAddAdjustment = (contact: Contact) => {
    setSelectedContactForAdjustment(contact)
    setEditingAdjustment(null)
    setAdjustmentForm({
      description: '',
      amount: 0,
      date: getLocalDateString()
    })
    setIsAdjustmentModalOpen(true)
  }

  const handleEditAdjustment = (adjustment: SocialAdjustment, contact: Contact) => {
    setSelectedContactForAdjustment(contact)
    setEditingAdjustment(adjustment)
    setAdjustmentForm({
      description: adjustment.description,
      amount: adjustment.amount,
      date: adjustment.date
    })
    setIsAdjustmentModalOpen(true)
  }

  const handleSaveAdjustment = async () => {
    if (!user || !selectedContactForAdjustment) return

    try {
      if (editingAdjustment) {
        const { error } = await supabase
          .from('social_adjustments')
          .update({
            description: adjustmentForm.description,
            amount: adjustmentForm.amount,
            date: adjustmentForm.date
          })
          .eq('id', editingAdjustment.id)
        
        if (error) throw error
        toast({
          title: "Ajuste atualizado!",
          description: "O ajuste foi atualizado com sucesso."
        })
      } else {
        const { error } = await supabase
          .from('social_adjustments')
          .insert({
            user_id: user.id,
            contact_id: selectedContactForAdjustment.id,
            description: adjustmentForm.description,
            amount: adjustmentForm.amount,
            date: adjustmentForm.date
          })
        
        if (error) throw error
        toast({
          title: "Ajuste adicionado!",
          description: "O ajuste foi adicionado ao contato."
        })
      }

      setIsAdjustmentModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['social-adjustments'] })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar ajuste. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteAdjustment = async (adjustmentId: string) => {
    try {
      const { error } = await supabase
        .from('social_adjustments')
        .delete()
        .eq('id', adjustmentId)
      
      if (error) throw error
      toast({
        title: "Ajuste excluído!",
        description: "O ajuste foi removido."
      })
      queryClient.invalidateQueries({ queryKey: ['social-adjustments'] })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir ajuste.",
        variant: "destructive"
      })
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
            {filteredContactsWithTransactions.map(({ contact, transactions, adjustments, total, adjustmentsTotal, finalTotal }) => (
              <Card key={contact.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>{contact.name}</CardTitle>
                      <CardDescription>{contact.phone}</CardDescription>
                    </div>
                    <div className="text-left sm:text-right">
                      {adjustmentsTotal > 0 && (
                        <>
                          <div className="text-sm text-muted-foreground line-through">
                            {formatCurrency(total)}
                          </div>
                          <div className="text-xs text-success">
                            Ajustes: -{formatCurrency(adjustmentsTotal)}
                          </div>
                        </>
                      )}
                      <div className="text-2xl font-bold text-destructive">
                        {formatCurrency(Math.max(0, finalTotal))}
                      </div>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        <Badge variant="secondary">
                          {transactions.length} transação(ões)
                        </Badge>
                        {adjustments.length > 0 && (
                          <Badge variant="outline" className="text-success border-success">
                            {adjustments.length} ajuste(s)
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Buttons to add transaction or adjustment */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddTransaction(contact)}
                      className="flex-1 gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Transação
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddAdjustment(contact)}
                      className="flex-1 gap-2"
                    >
                      <MinusCircle className="h-4 w-4 text-success" />
                      Ajuste/Abatimento
                    </Button>
                  </div>

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
                          <div className="flex items-center gap-2">
                            <div className="text-destructive font-semibold text-sm shrink-0">
                              {formatCurrency(Math.abs(transaction.amount))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEditTransaction(transaction, contact)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-destructive"
                              onClick={() => handleDeleteTransaction(transaction.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{transaction.categories?.name || 'Sem categoria'}</span>
                          <span>{format(parseLocalDate(transaction.date), "dd/MM/yyyy", { locale: ptBR })}</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Adjustments mobile */}
                    {adjustments.map((adjustment) => (
                      <div 
                        key={adjustment.id}
                        className="border border-success/30 rounded-md p-3 space-y-1 bg-success/5"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="font-medium text-sm flex-1 line-clamp-2 text-success">
                            {adjustment.description}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-success font-semibold text-sm shrink-0">
                              -{formatCurrency(adjustment.amount)}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEditAdjustment(adjustment, contact)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-destructive"
                              onClick={() => handleDeleteAdjustment(adjustment.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>Ajuste</span>
                          <span>{format(parseLocalDate(adjustment.date), "dd/MM/yyyy", { locale: ptBR })}</span>
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
                          <TableHead>Tipo</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
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
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleEditTransaction(transaction, contact)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-destructive"
                                  onClick={() => handleDeleteTransaction(transaction.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {/* Adjustments rows */}
                        {adjustments.map((adjustment) => (
                          <TableRow key={adjustment.id} className="bg-success/5">
                            <TableCell className="font-medium text-success">
                              {adjustment.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-success border-success">
                                Ajuste
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {format(parseLocalDate(adjustment.date), "dd/MM/yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell className="text-right text-success">
                              -{formatCurrency(adjustment.amount)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleEditAdjustment(adjustment, contact)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-destructive"
                                  onClick={() => handleDeleteAdjustment(adjustment.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
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
                      onClick={() => {
                        window.location.href = `/transacoes?type=income&contact=${contact.name}&amount=${finalTotal}`
                      }}
                      className="gap-2 w-full sm:w-auto"
                    >
                      <TrendingDown className="h-4 w-4" />
                      Marcar como Pago
                    </Button>
                    <Button 
                      onClick={() => handleSendWhatsApp({ contact, transactions, adjustments, total, adjustmentsTotal, finalTotal })}
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

      {/* Transaction Modal */}
      <Dialog open={isTransactionModalOpen} onOpenChange={setIsTransactionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
            </DialogTitle>
            <DialogDescription>
              {selectedContactForTransaction ? `Transação para ${selectedContactForTransaction.name}` : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={transactionForm.description}
                onChange={(e) => setTransactionForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição da transação"
              />
            </div>

            <div>
              <Label htmlFor="amount">Valor</Label>
              <CurrencyInput
                value={transactionForm.amount}
                onChange={(value) => setTransactionForm(prev => ({ ...prev, amount: value }))}
              />
            </div>

            <div>
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={transactionForm.date}
                onChange={(e) => setTransactionForm(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={transactionForm.category_id} 
                onValueChange={(value) => setTransactionForm(prev => ({ ...prev, category_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!editingTransaction && (
              <div>
                <Label htmlFor="account">Conta</Label>
                <Select 
                  value={transactionForm.account_id} 
                  onValueChange={(value) => setTransactionForm(prev => ({ ...prev, account_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma conta" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map(acc => (
                      <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button onClick={handleSaveTransaction} className="w-full">
              {editingTransaction ? 'Atualizar' : 'Adicionar'} Transação
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Adjustment Modal */}
      <Dialog open={isAdjustmentModalOpen} onOpenChange={setIsAdjustmentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAdjustment ? 'Editar Ajuste' : 'Novo Ajuste/Abatimento'}
            </DialogTitle>
            <DialogDescription>
              {selectedContactForAdjustment ? `Ajuste para ${selectedContactForAdjustment.name}` : ''}
              <br />
              <span className="text-xs">Este ajuste reduz o valor que a pessoa te deve. Não afeta suas transações reais.</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="adj-description">Descrição</Label>
              <Input
                id="adj-description"
                value={adjustmentForm.description}
                onChange={(e) => setAdjustmentForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Ex: Comprou algo pra mim"
              />
            </div>

            <div>
              <Label htmlFor="adj-amount">Valor do Abatimento</Label>
              <CurrencyInput
                value={adjustmentForm.amount}
                onChange={(value) => setAdjustmentForm(prev => ({ ...prev, amount: value }))}
              />
            </div>

            <div>
              <Label htmlFor="adj-date">Data</Label>
              <Input
                id="adj-date"
                type="date"
                value={adjustmentForm.date}
                onChange={(e) => setAdjustmentForm(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <Button onClick={handleSaveAdjustment} className="w-full">
              {editingAdjustment ? 'Atualizar' : 'Adicionar'} Ajuste
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
