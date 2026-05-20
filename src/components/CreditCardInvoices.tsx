import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Edit, Sparkles, ChevronDown, ChevronUp, List } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCurrency } from '@/context/CurrencyContext'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { CreditCardInvoiceModal } from './CreditCardInvoiceModal'
import { CreditCardInvoiceEditModal } from './CreditCardInvoiceEditModal'
import { CreditCardTransactions } from './CreditCardTransactions'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/context/AuthContext'
import { useCreditCardInvoice, getBestPurchaseDay } from '@/hooks/useCreditCardInvoice'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { parseLocalDate } from '@/utils/dateUtils'

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

const statusConfig = {
  paid:    { label: 'Paga',     className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300' },
  partial: { label: 'Parcial',  className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300' },
  closed:  { label: 'Fechada',  className: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300' },
  overdue: { label: 'Vencida',  className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300' },
  open:    { label: 'Aberta',   className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300' },
}

export const CreditCardInvoices = ({ cardId, cardName, closingDay, dueDay }: CreditCardInvoicesProps) => {
  const { transactions, creditCards, addTransaction, creditCardInvoices, upsertCreditCardInvoice } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  const { user } = useAuth()

  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [expanded, setExpanded] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [txModalOpen, setTxModalOpen] = useState(false)
  const [invoiceToPayAmount, setInvoiceToPayAmount] = useState(0)
  const [currentEditingInvoice, setCurrentEditingInvoice] = useState<any>(null)

  const card = creditCards.find(c => c.id === cardId)
  const { bestPurchaseDay, currentInvoiceData, allInvoices } = useCreditCardInvoice(
    card ? { ...card, closing_day: closingDay, due_day: dueDay } : null,
    transactions
  )

  const invoices: MonthlyInvoice[] = allInvoices.map(inv => {
    const dbInvoice = creditCardInvoices.find(
      db => db.credit_card_id === cardId && db.month === inv.month && db.year === inv.year
    )
    return {
      month: inv.month,
      year: inv.year,
      transactions: inv.transactions,
      total: inv.total,
      dueDate: inv.dueDate,
      closingDate: inv.closingDate,
      status: (dbInvoice?.status || inv.status) as MonthlyInvoice['status'],
      isCurrent: inv.isCurrent
    }
  })

  const currentInvoice = invoices.find(inv => inv.isCurrent) || currentInvoiceData as any
  const displayInvoice: MonthlyInvoice | undefined =
    selectedMonth && selectedMonth !== 'current'
      ? invoices.find(inv => `${inv.year}-${inv.month.toString().padStart(2, '0')}` === selectedMonth)
      : currentInvoice

  const handlePayInvoice = async (paymentData: { account_id: string; payment_date: Date; amount: number }) => {
    if (!user || !displayInvoice) return
    try {
      await addTransaction({
        description: `Pagamento Fatura ${cardName}`,
        amount: -Math.abs(paymentData.amount),
        type: 'expense' as const,
        account_id: paymentData.account_id,
        date: format(paymentData.payment_date, 'yyyy-MM-dd'),
        currency: 'BRL',
        user_id: user.id
      })
      await upsertCreditCardInvoice({
        credit_card_id: cardId,
        month: displayInvoice.month,
        year: displayInvoice.year,
        total_amount: displayInvoice.total,
        paid_amount: paymentData.amount,
        status: paymentData.amount >= displayInvoice.total ? 'paid' : 'partial',
        payment_date: format(paymentData.payment_date, 'yyyy-MM-dd')
      })
      toast({ title: "Pagamento registrado com sucesso!" })
      setPaymentModalOpen(false)
    } catch {
      toast({ title: "Erro ao processar pagamento", variant: "destructive" })
    }
  }

  const handleEditInvoice = (invoice: MonthlyInvoice) => {
    const dbInvoice = creditCardInvoices.find(
      inv => inv.credit_card_id === cardId && inv.month === invoice.month && inv.year === invoice.year
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
      toast({ title: "Fatura atualizada com sucesso!" })
    } catch {
      toast({ title: "Erro ao salvar fatura", variant: "destructive" })
    }
  }

  const today = new Date()
  const currentDay = today.getDate()
  const isBeforeClosing = currentDay < closingDay
  const sc = displayInvoice ? statusConfig[displayInvoice.status] || statusConfig.open : statusConfig.open

  const visibleTransactions = displayInvoice
    ? expanded
      ? displayInvoice.transactions
      : displayInvoice.transactions.slice(0, 6)
    : []

  // Group transactions by date for real-statement look
  const groupedByDate = visibleTransactions.reduce((acc, t) => {
    const key = t.date
    if (!acc[key]) acc[key] = []
    acc[key].push(t)
    return acc
  }, {} as Record<string, any[]>)

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a))

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Invoice period selector */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Fatura</h3>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px] h-8 text-sm">
              <SelectValue placeholder="Fatura Atual" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Fatura Atual</SelectItem>
              {invoices.map((inv) => (
                <SelectItem
                  key={`${inv.year}-${inv.month}`}
                  value={`${inv.year}-${inv.month.toString().padStart(2, '0')}`}
                >
                  {format(new Date(inv.year, inv.month, 1), 'MMMM yyyy', { locale: ptBR })}
                  {inv.isCurrent && ' ·  Atual'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {displayInvoice ? (
          <div className="rounded-xl border overflow-hidden">
            {/* Statement Header */}
            <div className="bg-muted/40 px-5 py-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {format(new Date(displayInvoice.year, displayInvoice.month, 1), 'MMMM yyyy', { locale: ptBR })}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${sc.className}`}>
                      {sc.label}
                    </span>
                    {displayInvoice.isCurrent && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Atual</span>
                    )}
                  </div>
                  <p className="text-3xl font-bold">{formatCurrency(displayInvoice.total)}</p>
                </div>

                <div className="flex flex-col gap-1 text-right text-sm">
                  {displayInvoice.closingDate && (
                    <p className="text-muted-foreground">
                      Fechamento: <span className="font-medium text-foreground">
                        {format(displayInvoice.closingDate, 'dd/MM/yyyy')}
                      </span>
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    Vencimento: <span className="font-semibold text-foreground">
                      {format(displayInvoice.dueDate, 'dd/MM/yyyy')}
                    </span>
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-muted-foreground flex items-center justify-end gap-1 cursor-help">
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          Melhor compra:{' '}
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            Dia {bestPurchaseDay}
                          </span>
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Compras a partir do dia {bestPurchaseDay} têm o maior prazo para pagamento</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Info strip */}
              <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                <span>Fechamento: <strong className="text-foreground">dia {closingDay}</strong></span>
                <span>Vencimento: <strong className="text-foreground">dia {dueDay}</strong></span>
                <span>
                  {isBeforeClosing
                    ? `Compras até dia ${closingDay} entram nesta fatura`
                    : `Compras de hoje entram na próxima fatura`}
                </span>
              </div>
            </div>

            {/* Action row */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-background border-b flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">
                {displayInvoice.transactions.length} lançamento{displayInvoice.transactions.length !== 1 ? 's' : ''}
              </span>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setTxModalOpen(true)}>
                  <List className="h-3.5 w-3.5 mr-1" />
                  Ver lançamentos
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => handleEditInvoice(displayInvoice)}>
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Editar fatura
                </Button>
                {displayInvoice.status !== 'paid' && (
                  <Button size="sm" className="h-7 text-xs" onClick={() => { setInvoiceToPayAmount(displayInvoice.total); setPaymentModalOpen(true) }}>
                    Pagar fatura
                  </Button>
                )}
              </div>
            </div>

            {/* Transactions — real statement style */}
            {displayInvoice.transactions.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                Nenhum lançamento nesta fatura
              </div>
            ) : (
              <div className="divide-y">
                {sortedDates.map(dateKey => (
                  <div key={dateKey}>
                    <div className="px-5 py-2 bg-muted/20">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {format(parseLocalDate(dateKey), "dd 'de' MMMM", { locale: ptBR })}
                      </span>
                    </div>
                    {groupedByDate[dateKey].map((transaction: any) => (
                      <div key={transaction.id} className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors">
                        <div className="flex-1 min-w-0 mr-4">
                          <p className="text-sm font-medium truncate">{transaction.description}</p>
                          {transaction.category?.name && (
                            <p className="text-xs text-muted-foreground">{transaction.category.name}</p>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-destructive whitespace-nowrap">
                          {formatCurrency(Math.abs(transaction.amount))}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Show more / less */}
            {displayInvoice.transactions.length > 6 && (
              <>
                <Separator />
                <div className="px-5 py-2.5 flex items-center justify-between">
                  {!expanded && (
                    <span className="text-xs text-muted-foreground">
                      +{displayInvoice.transactions.length - 6} lançamentos ocultos
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs ml-auto"
                    onClick={() => setExpanded(e => !e)}
                  >
                    {expanded ? (
                      <><ChevronUp className="h-3.5 w-3.5 mr-1" />Mostrar menos</>
                    ) : (
                      <><ChevronDown className="h-3.5 w-3.5 mr-1" />Ver todos</>
                    )}
                  </Button>
                </div>
              </>
            )}

            {/* Statement footer — subtotal */}
            {displayInvoice.transactions.length > 0 && (
              <div className="flex items-center justify-between px-5 py-3 bg-muted/40 border-t font-medium">
                <span className="text-sm">Total da Fatura</span>
                <span className="text-sm font-bold">{formatCurrency(displayInvoice.total)}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            Nenhuma fatura encontrada para o período selecionado
          </div>
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

        {/* Transactions Modal */}
        <Dialog open={txModalOpen} onOpenChange={setTxModalOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Lançamentos — {cardName}</DialogTitle>
            </DialogHeader>
            <CreditCardTransactions
              cardId={cardId}
              cardName={cardName}
              closingDay={closingDay}
            />
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
