import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { ChevronDown, ChevronUp, Calendar, CreditCard, Edit, Info, Sparkles } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCurrency } from '@/context/CurrencyContext'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { CreditCardInvoiceModal } from './CreditCardInvoiceModal'
import { CreditCardInvoiceEditModal } from './CreditCardInvoiceEditModal'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/context/AuthContext'
import { useCreditCardInvoice, getBestPurchaseDay } from '@/hooks/useCreditCardInvoice'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { parseLocalDate } from '@/utils/dateUtils'
import { CurrencyInput } from '@/components/ui/currency-input'

interface MonthlyInvoice {
  month: number
  year: number
  transactions: any[]
  total: number
  dueDate: Date
  closingDate?: Date
  status: 'open' | 'closed' | 'paid' | 'partial' | 'overdue'
  isCurrent?: boolean
}

interface CreditCardInvoicesProps {
  cardId: string
  cardName: string
  closingDay: number
  dueDay: number
}

export const CreditCardInvoices = ({ cardId, cardName, closingDay, dueDay }: CreditCardInvoicesProps) => {
  const { transactions, creditCards, categories, addTransaction, creditCardInvoices, upsertCreditCardInvoice, updateTransaction } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  const { user } = useAuth()
  
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [invoiceToPayAmount, setInvoiceToPayAmount] = useState(0)
  const [currentEditingInvoice, setCurrentEditingInvoice] = useState<any>(null)
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set())
  
  // State for editing individual transactions
  const [editingTransaction, setEditingTransaction] = useState<any>(null)
  const [editForm, setEditForm] = useState({
    description: '',
    amount: 0,
    date: '',
    category_id: '',
    notes: ''
  })

  // Toggle transaction selection
  const toggleTransactionSelection = (transactionId: string) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(transactionId)) {
        newSet.delete(transactionId)
      } else {
        newSet.add(transactionId)
      }
      return newSet
    })
  }

  const toggleAllInvoiceTransactions = (transactionIds: string[]) => {
    setSelectedTransactions(prev => {
      const allSelected = transactionIds.every(id => prev.has(id))
      if (allSelected) {
        const newSet = new Set(prev)
        transactionIds.forEach(id => newSet.delete(id))
        return newSet
      } else {
        const newSet = new Set(prev)
        transactionIds.forEach(id => newSet.add(id))
        return newSet
      }
    })
  }

  // Handle editing a transaction
  const handleEditTransaction = (transaction: any) => {
    setEditingTransaction(transaction)
    setEditForm({
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      date: transaction.date,
      category_id: transaction.category_id || '',
      notes: transaction.notes || ''
    })
  }

  const handleSaveTransaction = async () => {
    if (!editingTransaction) return

    try {
      await updateTransaction(editingTransaction.id, {
        description: editForm.description,
        amount: -Math.abs(editForm.amount), // Always negative for credit card expenses
        date: editForm.date,
        category_id: editForm.category_id || null,
        notes: editForm.notes || null
      })

      toast({
        title: "Sucesso",
        description: "Transação atualizada com sucesso!"
      })
      setEditingTransaction(null)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar transação",
        variant: "destructive"
      })
    }
  }

  const expenseCategories = categories.filter(c => c.type === 'expense')

  // Usar o hook de faturas com a lógica correta
  const card = creditCards.find(c => c.id === cardId)
  const { 
    bestPurchaseDay, 
    currentInvoiceData, 
    allInvoices,
    getInvoiceForPurchase 
  } = useCreditCardInvoice(
    card ? { ...card, closing_day: closingDay, due_day: dueDay } : null, 
    transactions
  )

  // Converter para o formato esperado pelo componente
  const invoices = allInvoices.map(inv => {
    // Verificar status no banco de dados
    const dbInvoice = creditCardInvoices.find(
      dbInv => dbInv.credit_card_id === cardId && 
               dbInv.month === inv.month && 
               dbInv.year === inv.year
    )
    
    return {
      month: inv.month,
      year: inv.year,
      transactions: inv.transactions,
      total: inv.total,
      dueDate: inv.dueDate,
      closingDate: inv.closingDate,
      status: (dbInvoice?.status || inv.status) as 'open' | 'closed' | 'paid' | 'partial' | 'overdue',
      isCurrent: inv.isCurrent
    }
  })

  // Encontrar a fatura atual baseada na lógica correta
  const currentInvoice = invoices.find(inv => inv.isCurrent) || currentInvoiceData

  const displayInvoice = selectedMonth && selectedMonth !== 'current'
    ? invoices.find(inv => `${inv.year}-${inv.month.toString().padStart(2, '0')}` === selectedMonth)
    : currentInvoice

  const handlePayInvoice = async (paymentData: {
    account_id: string
    payment_date: Date
    amount: number
  }) => {
    if (!user || !displayInvoice) return
    
    try {
      // Create expense transaction for payment
      await addTransaction({
        description: `Pagamento Fatura ${cardName}`,
        amount: -Math.abs(paymentData.amount),
        type: 'expense' as const,
        account_id: paymentData.account_id,
        date: format(paymentData.payment_date, 'yyyy-MM-dd'),
        currency: 'BRL',
        user_id: user.id
      })

      // Mark invoice as paid in database
      await upsertCreditCardInvoice({
        credit_card_id: cardId,
        month: displayInvoice.month,
        year: displayInvoice.year,
        total_amount: displayInvoice.total,
        paid_amount: paymentData.amount,
        status: paymentData.amount >= displayInvoice.total ? 'paid' : 'partial',
        payment_date: format(paymentData.payment_date, 'yyyy-MM-dd')
      })

      toast({
        title: "Sucesso",
        description: "Pagamento da fatura registrado com sucesso!",
      })
      
      setPaymentModalOpen(false)
    } catch (error) {
      console.error('Error processing payment:', error)
      toast({
        title: "Erro",
        description: "Erro ao processar pagamento. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleEditInvoice = (invoice: MonthlyInvoice) => {
    const dbInvoice = creditCardInvoices.find(inv => 
      inv.credit_card_id === cardId && 
      inv.month === invoice.month && 
      inv.year === invoice.year
    )
    
    setCurrentEditingInvoice({
      id: dbInvoice?.id,
      month: invoice.month,
      year: invoice.year,
      total_amount: dbInvoice?.total_amount || invoice.total,
      paid_amount: dbInvoice?.paid_amount || 0,
      status: dbInvoice?.status || 'open',
      due_date: dbInvoice?.due_date ? new Date(dbInvoice.due_date) : invoice.dueDate,
      payment_date: dbInvoice?.payment_date ? new Date(dbInvoice.payment_date) : undefined,
      notes: dbInvoice?.notes || ''
    })
    setEditModalOpen(true)
  }

  const handleSaveInvoice = async (invoiceData: any) => {
    try {
      await upsertCreditCardInvoice({
        credit_card_id: cardId,
        month: invoiceData.month,
        year: invoiceData.year,
        total_amount: invoiceData.total_amount,
        paid_amount: invoiceData.paid_amount,
        status: invoiceData.status,
        due_date: invoiceData.due_date ? format(invoiceData.due_date, 'yyyy-MM-dd') : undefined,
        payment_date: invoiceData.payment_date ? format(invoiceData.payment_date, 'yyyy-MM-dd') : undefined,
        notes: invoiceData.notes
      })

      toast({
        title: "Sucesso",
        description: "Fatura atualizada com sucesso!",
      })
    } catch (error) {
      console.error('Error saving invoice:', error)
      toast({
        title: "Erro",
        description: "Erro ao salvar fatura. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const today = new Date()
  const currentDay = today.getDate()
  const isBeforeClosing = currentDay < closingDay
  const isClosingDay = currentDay === closingDay

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-500">Paga</Badge>
      case 'partial':
        return <Badge variant="secondary">Parcial</Badge>
      case 'closed':
        return <Badge variant="outline">Fechada</Badge>
      case 'overdue':
        return <Badge variant="destructive">Vencida</Badge>
      default:
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Aberta</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Informações da lógica de faturas */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Info className="h-4 w-4 text-primary" />
            Informações do Cartão
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground">Fechamento</span>
              <p className="font-medium">Dia {closingDay}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Vencimento</span>
              <p className="font-medium">Dia {dueDay}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-yellow-500" />
                <span className="text-muted-foreground">Melhor dia de compra</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="font-medium text-green-600 cursor-help">Dia {bestPurchaseDay}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Compras a partir do dia {bestPurchaseDay} terão o maior prazo para pagamento</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Status hoje</span>
              <p className="font-medium">
                {isClosingDay ? (
                  <span className="text-orange-500">Dia do fechamento</span>
                ) : isBeforeClosing ? (
                  <span className="text-blue-500">Fatura aberta</span>
                ) : (
                  <span className="text-green-500">Próxima fatura</span>
                )}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isBeforeClosing 
              ? `Compras até dia ${closingDay} entram na fatura atual. A partir do dia ${closingDay + 1}, entram na próxima.`
              : `Compras de hoje em diante entram na fatura de ${format(new Date(today.getFullYear(), today.getMonth() + 1, 1), 'MMMM', { locale: ptBR })}.`
            }
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Faturas - {cardName}
          </h3>
          
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Fatura Atual" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Fatura Atual</SelectItem>
              {invoices.map((invoice) => (
                <SelectItem 
                  key={`${invoice.year}-${invoice.month}`}
                  value={`${invoice.year}-${invoice.month.toString().padStart(2, '0')}`}
                >
                  {format(new Date(invoice.year, invoice.month, 1), 'MMMM yyyy', { locale: ptBR })}
                  {invoice.isCurrent && ' (Atual)'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {displayInvoice ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">
                    Fatura {format(new Date(displayInvoice.year, displayInvoice.month, 1), 'MMMM yyyy', { locale: ptBR })}
                  </CardTitle>
                  {displayInvoice.isCurrent && (
                    <Badge variant="outline" className="text-xs">Atual</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(displayInvoice.status)}
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditInvoice(displayInvoice)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  {displayInvoice.status !== 'paid' && (
                    <Button 
                      size="sm"
                      onClick={() => {
                        setInvoiceToPayAmount(displayInvoice.total)
                        setPaymentModalOpen(true)
                      }}
                    >
                      Pagar Fatura
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-2xl font-bold text-destructive">
                  {formatCurrency(displayInvoice.total)}
                </div>
                <div className="text-right">
                  {displayInvoice.closingDate && (
                    <p className="text-xs text-muted-foreground">
                      Fecha em: {format(displayInvoice.closingDate, 'dd/MM/yyyy')}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Vencimento: {format(displayInvoice.dueDate, 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
            </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium">
                    {displayInvoice.transactions.length} transação(ões)
                  </span>
                  {displayInvoice.transactions.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`select-all-invoice-${displayInvoice.year}-${displayInvoice.month}`}
                        checked={displayInvoice.transactions.every(t => selectedTransactions.has(t.id))}
                        onCheckedChange={() => toggleAllInvoiceTransactions(displayInvoice.transactions.map(t => t.id))}
                      />
                      <label 
                        htmlFor={`select-all-invoice-${displayInvoice.year}-${displayInvoice.month}`} 
                        className="text-xs text-muted-foreground cursor-pointer"
                      >
                        Selecionar todas
                      </label>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedInvoice(
                    expandedInvoice === `${displayInvoice.year}-${displayInvoice.month}` 
                      ? null 
                      : `${displayInvoice.year}-${displayInvoice.month}`
                  )}
                >
                  {expandedInvoice === `${displayInvoice.year}-${displayInvoice.month}` ? (
                    <>Mostrar menos <ChevronUp className="h-4 w-4 ml-1" /></>
                  ) : (
                    <>Ver todas <ChevronDown className="h-4 w-4 ml-1" /></>
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                {(expandedInvoice === `${displayInvoice.year}-${displayInvoice.month}` 
                  ? displayInvoice.transactions 
                  : displayInvoice.transactions.slice(0, 5)
                ).map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className={`flex items-center gap-3 p-2 border rounded transition-colors ${selectedTransactions.has(transaction.id) ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                  >
                    <Checkbox
                      id={`invoice-transaction-${transaction.id}`}
                      checked={selectedTransactions.has(transaction.id)}
                      onCheckedChange={() => toggleTransactionSelection(transaction.id)}
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(parseLocalDate(transaction.date), 'dd/MM/yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-destructive">
                          {formatCurrency(transaction.amount)}
                        </p>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleEditTransaction(transaction)}
                          title="Editar transação"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {!expandedInvoice && displayInvoice.transactions.length > 5 && (
                  <p className="text-sm text-muted-foreground text-center">
                    +{displayInvoice.transactions.length - 5} transações...
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Nenhuma fatura encontrada para o período selecionado
            </p>
          </CardContent>
        </Card>
      )}

      <CreditCardInvoiceModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        invoiceAmount={invoiceToPayAmount}
        cardName={cardName}
        onPayment={handlePayInvoice}
      />

      <CreditCardInvoiceEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        invoice={currentEditingInvoice}
        cardName={cardName}
        onSave={handleSaveInvoice}
      />

      {/* Modal for editing individual transactions */}
      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Descrição</Label>
              <Input 
                value={editForm.description} 
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} 
              />
            </div>
            <div>
              <Label>Valor</Label>
              <CurrencyInput 
                value={editForm.amount} 
                onChange={(v) => setEditForm({ ...editForm, amount: v })} 
              />
            </div>
            <div>
              <Label>Data</Label>
              <Input 
                type="date" 
                value={editForm.date} 
                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} 
              />
            </div>
            <div>
              <Label>Categoria</Label>
              <Select 
                value={editForm.category_id} 
                onValueChange={(v) => setEditForm({ ...editForm, category_id: v })}
              >
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Observações</Label>
              <Input 
                value={editForm.notes} 
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTransaction(null)}>Cancelar</Button>
            <Button onClick={handleSaveTransaction}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </TooltipProvider>
  )
}