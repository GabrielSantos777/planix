import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown, ChevronUp, Calendar, CreditCard, Edit } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCurrency } from '@/context/CurrencyContext'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { CreditCardInvoiceModal } from './CreditCardInvoiceModal'
import { CreditCardInvoiceEditModal } from './CreditCardInvoiceEditModal'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/context/AuthContext'

interface MonthlyInvoice {
  month: number
  year: number
  transactions: any[]
  total: number
  dueDate: Date
  status: 'open' | 'closed' | 'paid' | 'partial'
}

interface CreditCardInvoicesProps {
  cardId: string
  cardName: string
}

export const CreditCardInvoices = ({ cardId, cardName }: CreditCardInvoicesProps) => {
  const { transactions, addTransaction, creditCardInvoices, upsertCreditCardInvoice } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  const { user } = useAuth()
  
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [invoiceToPayAmount, setInvoiceToPayAmount] = useState(0)
  const [currentEditingInvoice, setCurrentEditingInvoice] = useState<any>(null)

  // Get all invoices for this card with database status
  const getCardInvoices = (): MonthlyInvoice[] => {
    const cardTransactions = transactions.filter(t => t.credit_card_id === cardId)
    const invoicesByMonth: { [key: string]: MonthlyInvoice } = {}
    
    // First, create invoices from transactions
    cardTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date)
      const month = transactionDate.getMonth()
      const year = transactionDate.getFullYear()
      
      const invoiceKey = `${year}-${month.toString().padStart(2, '0')}`
      
      if (!invoicesByMonth[invoiceKey]) {
        invoicesByMonth[invoiceKey] = {
          month,
          year,
          transactions: [],
          total: 0,
          dueDate: new Date(year, month + 1, 10),
          status: 'open'
        }
      }
      
      invoicesByMonth[invoiceKey].transactions.push(transaction)
      invoicesByMonth[invoiceKey].total += Math.abs(transaction.amount)
    })
    
    // Update status from database
    creditCardInvoices
      .filter(invoice => invoice.credit_card_id === cardId)
      .forEach(dbInvoice => {
        const invoiceKey = `${dbInvoice.year}-${dbInvoice.month.toString().padStart(2, '0')}`
        if (invoicesByMonth[invoiceKey]) {
          invoicesByMonth[invoiceKey].status = dbInvoice.status as 'open' | 'closed' | 'paid' | 'partial'
        }
      })
    
    return Object.values(invoicesByMonth).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return b.month - a.month
    })
  }

  const invoices = getCardInvoices()
  const currentMonthInvoice = invoices.find(inv => {
    const now = new Date()
    return inv.month === now.getMonth() && inv.year === now.getFullYear()
  })

  const displayInvoice = selectedMonth && selectedMonth !== 'current'
    ? invoices.find(inv => `${inv.year}-${inv.month.toString().padStart(2, '0')}` === selectedMonth)
    : currentMonthInvoice

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Faturas - {cardName}
        </h3>
        
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecionar mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Mês Atual</SelectItem>
            {invoices.map((invoice) => (
              <SelectItem 
                key={`${invoice.year}-${invoice.month}`}
                value={`${invoice.year}-${invoice.month.toString().padStart(2, '0')}`}
              >
                {format(new Date(invoice.year, invoice.month, 1), 'MMMM yyyy', { locale: ptBR })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {displayInvoice ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Fatura {format(new Date(displayInvoice.year, displayInvoice.month, 1), 'MMMM yyyy', { locale: ptBR })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={displayInvoice.status === 'paid' ? 'default' : displayInvoice.status === 'partial' ? 'secondary' : 'destructive'}>
                  {displayInvoice.status === 'paid' ? 'Paga' : displayInvoice.status === 'partial' ? 'Parcial' : 'Em Aberto'}
                </Badge>
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
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(displayInvoice.total)}
              </div>
              <div className="text-sm text-muted-foreground">
                Vencimento: {format(displayInvoice.dueDate, 'dd/MM/yyyy')}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {displayInvoice.transactions.length} transação(ões)
                </span>
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
                  <div key={transaction.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(transaction.date), 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-destructive">
                        {formatCurrency(Math.abs(transaction.amount))}
                      </p>
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
    </div>
  )
}