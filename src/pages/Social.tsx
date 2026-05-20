import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/AuthContext"
import { useCurrency } from "@/context/CurrencyContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import {
  MessageCircle, Copy, Plus, Edit, Trash2, MinusCircle,
  Users, ChevronDown, ChevronUp, Info, CheckCircle2,
  ArrowUpRight, Calendar, Phone, TrendingDown, Wallet
} from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { format, addMonths, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState, useMemo } from "react"
import { parseLocalDate, getLocalDateString } from "@/utils/dateUtils"
import { CurrencyInput } from "@/components/ui/currency-input"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────
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
  payment_day?: number | null
}

interface SocialTransaction {
  id: string
  description: string
  amount: number
  date: string
  category_id: string
  categories: { name: string } | null
}

interface ContactBill {
  contact: Contact
  transactions: SocialTransaction[]
  adjustments: SocialAdjustment[]
  subtotal: number
  adjustmentsTotal: number
  finalTotal: number
  /** First day of the billing window */
  windowStart: string
  /** Last day of the billing window */
  windowEnd: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join('')
}

function getAvatarColor(name: string) {
  const colors = [
    'bg-violet-200 text-violet-800', 'bg-cyan-200 text-cyan-800',
    'bg-emerald-200 text-emerald-800', 'bg-amber-200 text-amber-800',
    'bg-pink-200 text-pink-800', 'bg-indigo-200 text-indigo-800',
  ]
  const idx = name.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % colors.length
  return colors[idx]
}

/**
 * Given a selected month (YYYY-MM) and a contact's payment_day,
 * compute the billing window:
 *   - With payment_day P: from day P of prev month up to day P-1 of selected month
 *   - Without payment_day: full calendar month
 */
function getBillingWindow(selectedMonth: string, paymentDay: number | null | undefined) {
  const [y, m] = selectedMonth.split('-').map(Number)

  if (!paymentDay) {
    const start = new Date(y, m - 1, 1)
    const end = new Date(y, m, 0)
    return {
      start: getLocalDateString(start),
      end: getLocalDateString(end),
      label: `${MONTHS[m - 1]} ${y}`,
    }
  }

  // Window: from paymentDay of previous month to paymentDay-1 of selected month
  const prevDate = new Date(y, m - 1, 1)
  prevDate.setMonth(prevDate.getMonth() - 1)
  const prevY = prevDate.getFullYear()
  const prevM = prevDate.getMonth() + 1

  const windowStart = new Date(prevY, prevM - 1, paymentDay)
  const windowEnd = new Date(y, m - 1, paymentDay - 1)

  return {
    start: getLocalDateString(windowStart),
    end: getLocalDateString(windowEnd),
    label: `${format(windowStart, 'dd/MM')} → ${format(windowEnd, 'dd/MM/yyyy')} (vence dia ${paymentDay}/${String(m).padStart(2, '0')})`,
  }
}

function isInWindow(dateStr: string, windowStart: string, windowEnd: string): boolean {
  return dateStr >= windowStart && dateStr <= windowEnd
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Social() {
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { accounts, categories, addTransaction, updateTransaction, deleteTransaction } = useSupabaseData()

  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [contactFilter, setContactFilter] = useState('all')
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  // Modals
  const [whatsappModal, setWhatsappModal] = useState<ContactBill | null>(null)
  const [transactionModal, setTransactionModal] = useState<{ contact: Contact; tx?: SocialTransaction } | null>(null)
  const [adjustmentModal, setAdjustmentModal] = useState<{ contact: Contact; adj?: SocialAdjustment } | null>(null)

  const [txForm, setTxForm] = useState({ description: '', amount: 0, date: getLocalDateString(), category_id: '', account_id: '' })
  const [adjForm, setAdjForm] = useState({ description: '', amount: 0, date: getLocalDateString() })

  // ── Queries ────────────────────────────────────────────────────────────────
  const { data: allSocialTx = [], isLoading } = useQuery({
    queryKey: ['social-transactions', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      const { data, error } = await supabase
        .from('transactions')
        .select('id, description, amount, date, contact_id, category_id, categories(name)')
        .eq('user_id', user.id)
        .not('contact_id', 'is', null)
        .order('date', { ascending: false })
      if (error) throw error
      return data as (SocialTransaction & { contact_id: string })[]
    },
    enabled: !!user?.id,
  })

  const { data: allContacts = [] } = useQuery({
    queryKey: ['all-contacts', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      const { data, error } = await supabase.from('contacts').select('*').eq('user_id', user.id).order('name')
      if (error) throw error
      return data as Contact[]
    },
    enabled: !!user?.id,
  })

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

  // ── Computed: bills per contact ────────────────────────────────────────────
  const bills = useMemo<ContactBill[]>(() => {
    const contactMap = new Map<string, Contact>()
    allContacts.forEach(c => contactMap.set(c.id, c))

    // Group transactions by contact_id
    const txByContact = new Map<string, (SocialTransaction & { contact_id: string })[]>()
    allSocialTx.forEach(tx => {
      const arr = txByContact.get(tx.contact_id) ?? []
      arr.push(tx)
      txByContact.set(tx.contact_id, arr)
    })

    // Build bills for each contact that appears in transactions OR adjustments
    const contactIds = new Set([
      ...Array.from(txByContact.keys()),
      ...socialAdjustments.map(a => a.contact_id),
    ])

    const result: ContactBill[] = []

    contactIds.forEach(cid => {
      const contact = contactMap.get(cid)
      if (!contact) return

      const window = getBillingWindow(selectedMonth, contact.payment_day)

      const transactions = (txByContact.get(cid) ?? [])
        .filter(tx => isInWindow(tx.date, window.start, window.end))

      const adjustments = socialAdjustments
        .filter(a => a.contact_id === cid && isInWindow(a.date, window.start, window.end))

      if (transactions.length === 0 && adjustments.length === 0) return

      const subtotal = transactions.reduce((s, t) => s + Math.abs(t.amount), 0)
      const adjustmentsTotal = adjustments.reduce((s, a) => s + a.amount, 0)
      const finalTotal = Math.max(0, subtotal - adjustmentsTotal)

      result.push({
        contact,
        transactions,
        adjustments,
        subtotal,
        adjustmentsTotal,
        finalTotal,
        windowStart: window.start,
        windowEnd: window.end,
      })
    })

    return result.sort((a, b) => b.finalTotal - a.finalTotal)
  }, [allSocialTx, allContacts, socialAdjustments, selectedMonth])

  const filteredBills = useMemo(() =>
    contactFilter === 'all' ? bills : bills.filter(b => b.contact.id === contactFilter)
    , [bills, contactFilter])

  const totalReceivable = filteredBills.reduce((s, b) => s + b.finalTotal, 0)
  const totalContacts = filteredBills.length

  // ── Helpers ────────────────────────────────────────────────────────────────
  const toggleExpand = (id: string) =>
    setExpandedCards(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const expenseCategories = categories.filter(c => c.type === 'expense')

  // ── WhatsApp message ───────────────────────────────────────────────────────
  function buildWhatsAppMessage(bill: ContactBill) {
    const { contact, transactions, adjustments, subtotal, adjustmentsTotal, finalTotal, windowStart, windowEnd } = bill
    const period = `${format(parseLocalDate(windowStart), 'dd/MM')} a ${format(parseLocalDate(windowEnd), 'dd/MM/yyyy')}`
    let msg = `Olá ${contact.name}! 👋\n\nSegue o resumo das compras do período *${period}*:\n\n`
    transactions.forEach((t, i) => {
      msg += `${i + 1}. ${t.description} — *${formatCurrency(Math.abs(t.amount))}* (${format(parseLocalDate(t.date), 'dd/MM')})\n`
    })
    msg += `\n💰 Subtotal: *${formatCurrency(subtotal)}*`
    if (adjustments.length > 0) {
      msg += `\n\n📝 Abatimentos:\n`
      adjustments.forEach((a, i) => { msg += `${i + 1}. ${a.description} — -${formatCurrency(a.amount)}\n` })
      msg += `\nTotal abatimentos: *-${formatCurrency(adjustmentsTotal)}*`
    }
    msg += `\n\n✅ *Total a pagar: ${formatCurrency(finalTotal)}*\n\nPor favor, realize o pagamento. Obrigado! 🙏`
    return msg
  }

  // ── Transaction CRUD ───────────────────────────────────────────────────────
  const handleSaveTx = async () => {
    if (!user || !transactionModal) return
    try {
      if (transactionModal.tx) {
        await updateTransaction(transactionModal.tx.id, {
          description: txForm.description,
          amount: -Math.abs(txForm.amount),
          date: txForm.date,
          category_id: txForm.category_id || null,
        })
        toast({ title: 'Transação atualizada!' })
      } else {
        await addTransaction({
          description: txForm.description,
          amount: -Math.abs(txForm.amount),
          type: 'expense',
          date: txForm.date,
          category_id: txForm.category_id || null,
          account_id: txForm.account_id || null,
          contact_id: transactionModal.contact.id,
          credit_card_id: null,
          user_id: user.id,
        })
        toast({ title: 'Transação adicionada!' })
      }
      setTransactionModal(null)
      queryClient.invalidateQueries({ queryKey: ['social-transactions'] })
    } catch {
      toast({ title: 'Erro', description: 'Erro ao salvar transação.', variant: 'destructive' })
    }
  }

  const handleDeleteTx = async (id: string) => {
    try {
      await deleteTransaction(id)
      toast({ title: 'Transação excluída' })
      queryClient.invalidateQueries({ queryKey: ['social-transactions'] })
    } catch {
      toast({ title: 'Erro', description: 'Erro ao excluir transação.', variant: 'destructive' })
    }
  }

  // ── Adjustment CRUD ────────────────────────────────────────────────────────
  const handleSaveAdj = async () => {
    if (!user || !adjustmentModal) return
    try {
      if (adjustmentModal.adj) {
        await supabase.from('social_adjustments')
          .update({ description: adjForm.description, amount: adjForm.amount, date: adjForm.date })
          .eq('id', adjustmentModal.adj.id)
        toast({ title: 'Abatimento atualizado!' })
      } else {
        await supabase.from('social_adjustments').insert({
          user_id: user.id,
          contact_id: adjustmentModal.contact.id,
          description: adjForm.description,
          amount: adjForm.amount,
          date: adjForm.date,
        })
        toast({ title: 'Abatimento registrado!' })
      }
      setAdjustmentModal(null)
      queryClient.invalidateQueries({ queryKey: ['social-adjustments'] })
    } catch {
      toast({ title: 'Erro', description: 'Erro ao salvar abatimento.', variant: 'destructive' })
    }
  }

  const handleDeleteAdj = async (id: string) => {
    try {
      await supabase.from('social_adjustments').delete().eq('id', id)
      toast({ title: 'Abatimento excluído' })
      queryClient.invalidateQueries({ queryKey: ['social-adjustments'] })
    } catch {
      toast({ title: 'Erro', description: 'Erro ao excluir abatimento.', variant: 'destructive' })
    }
  }

  // ── Month navigation ───────────────────────────────────────────────────────
  const prevMonth = () => {
    const d = parseLocalDate(selectedMonth + '-01')
    setSelectedMonth(format(subMonths(d, 1), 'yyyy-MM'))
  }
  const nextMonth = () => {
    const d = parseLocalDate(selectedMonth + '-01')
    setSelectedMonth(format(addMonths(d, 1), 'yyyy-MM'))
  }
  const [y, m] = selectedMonth.split('-').map(Number)
  const monthLabel = `${MONTHS[m - 1]} ${y}`

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Layout>
      <div className="flex flex-col h-full">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="px-4 pt-4 pb-3 border-b space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Cobranças Sociais
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Acompanhe o que cada contato deve pagar no período de cobrança
              </p>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Month nav */}
            <div className="flex items-center gap-1 bg-muted rounded-lg px-2 py-1">
              <button onClick={prevMonth} className="p-1 hover:text-primary transition-colors">
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>
              <span className="text-sm font-semibold min-w-[110px] text-center">{monthLabel}</span>
              <button onClick={nextMonth} className="p-1 hover:text-primary transition-colors">
                <ChevronUp className="h-4 w-4 rotate-90" />
              </button>
            </div>

            {/* Contact filter */}
            <Select value={contactFilter} onValueChange={setContactFilter}>
              <SelectTrigger className="h-9 text-sm w-48">
                <SelectValue placeholder="Todos os contatos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os contatos</SelectItem>
                {allContacts.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
            {[
              { label: 'Contatos com débito', value: totalContacts.toString(), icon: Users, color: 'text-primary' },
              { label: 'Total a receber', value: formatCurrency(totalReceivable), icon: Wallet, color: 'text-destructive' },
              { label: 'Período', value: monthLabel, icon: Calendar, color: 'text-muted-foreground' },
            ].map(item => (
              <div key={item.label} className="bg-background px-4 py-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <item.icon className={cn('h-3.5 w-3.5', item.color)} />
                  <span className="text-[11px] text-muted-foreground font-medium">{item.label}</span>
                </div>
                <p className={cn('text-base font-bold', item.color)}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content ────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              Carregando...
            </div>
          ) : filteredBills.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-14 gap-3 text-center">
                <div className="p-3 bg-muted rounded-full">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Nenhuma cobrança em {monthLabel}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vincule contatos às transações para rastrear o que cada um deve.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredBills.map(bill => {
              const { contact, transactions, adjustments, subtotal, adjustmentsTotal, finalTotal, windowStart, windowEnd } = bill
              const isExpanded = expandedCards.has(contact.id)
              const avatarColor = getAvatarColor(contact.name)
              const window = getBillingWindow(selectedMonth, contact.payment_day)
              const isPaid = finalTotal === 0

              return (
                <Card
                  key={contact.id}
                  className={cn('overflow-hidden transition-shadow hover:shadow-md', isPaid && 'opacity-60')}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0', avatarColor)}>
                      {getInitials(contact.name)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{contact.name}</p>
                        {contact.payment_day && (
                          <Badge variant="outline" className="text-[10px] py-0 h-4 gap-1">
                            <Calendar className="h-2.5 w-2.5" />
                            Vence dia {contact.payment_day}
                          </Badge>
                        )}
                        {isPaid && (
                          <Badge className="text-[10px] py-0 h-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                            <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                            Pago
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3" />{contact.phone}
                        {contact.payment_day && (
                          <span className="ml-2 flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            {window.label}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      {adjustmentsTotal > 0 && (
                        <p className="text-xs text-muted-foreground line-through">{formatCurrency(subtotal)}</p>
                      )}
                      <p className={cn(
                        'text-xl font-bold tabular-nums',
                        isPaid ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                      )}>
                        {formatCurrency(finalTotal)}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {transactions.length} compra{transactions.length !== 1 ? 's' : ''}
                        {adjustments.length > 0 && ` · ${adjustments.length} abatimento${adjustments.length !== 1 ? 's' : ''}`}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleExpand(contact.id)}
                      className="p-2 hover:text-primary transition-colors shrink-0"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Action buttons (always visible) */}
                  <div className="flex gap-2 px-4 py-2 bg-muted/20 border-b">
                    <Button
                      size="sm" variant="outline" className="h-7 text-xs gap-1"
                      onClick={() => {
                        setTxForm({ description: '', amount: 0, date: getLocalDateString(), category_id: '', account_id: accounts[0]?.id ?? '' })
                        setTransactionModal({ contact })
                      }}
                    >
                      <Plus className="h-3 w-3" /> Compra
                    </Button>
                    <Button
                      size="sm" variant="outline" className="h-7 text-xs gap-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      onClick={() => {
                        setAdjForm({ description: '', amount: 0, date: getLocalDateString() })
                        setAdjustmentModal({ contact })
                      }}
                    >
                      <MinusCircle className="h-3 w-3" /> Abatimento
                    </Button>
                    <div className="flex-1" />
                    <Button
                      size="sm" className="h-7 text-xs gap-1"
                      onClick={() => setWhatsappModal(bill)}
                      disabled={transactions.length === 0}
                    >
                      <MessageCircle className="h-3 w-3" /> Cobrar
                    </Button>
                  </div>

                  {/* Expandable detail */}
                  {isExpanded && (
                    <CardContent className="pt-3 pb-3 px-4 space-y-3">
                      {/* Transactions */}
                      {transactions.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Compras do período
                          </p>
                          <div className="rounded-lg border overflow-hidden">
                            <table className="w-full text-sm">
                              <thead className="bg-muted/40">
                                <tr>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground">Data</th>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground">Descrição</th>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">Categoria</th>
                                  <th className="py-2 px-3 text-right text-xs font-medium text-muted-foreground">Valor</th>
                                  <th className="py-2 px-3 w-16" />
                                </tr>
                              </thead>
                              <tbody>
                                {transactions
                                  .sort((a, b) => b.date.localeCompare(a.date))
                                  .map(tx => (
                                    <tr key={tx.id} className="border-t hover:bg-muted/20 group/tx">
                                      <td className="py-2 px-3 text-xs text-muted-foreground whitespace-nowrap">
                                        {format(parseLocalDate(tx.date), 'dd/MM')}
                                      </td>
                                      <td className="py-2 px-3 text-xs font-medium">{tx.description}</td>
                                      <td className="py-2 px-3 text-xs text-muted-foreground hidden sm:table-cell">
                                        {tx.categories?.name || '—'}
                                      </td>
                                      <td className="py-2 px-3 text-xs text-right font-semibold text-destructive tabular-nums">
                                        {formatCurrency(Math.abs(tx.amount))}
                                      </td>
                                      <td className="py-2 px-3">
                                        <div className="flex gap-1 justify-end opacity-0 group-hover/tx:opacity-100 transition-opacity">
                                          <button
                                            className="p-1 hover:text-primary"
                                            onClick={() => {
                                              setTxForm({ description: tx.description, amount: Math.abs(tx.amount), date: tx.date, category_id: tx.category_id || '', account_id: '' })
                                              setTransactionModal({ contact, tx })
                                            }}
                                          >
                                            <Edit className="h-3.5 w-3.5" />
                                          </button>
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <button className="p-1 hover:text-destructive">
                                                <Trash2 className="h-3.5 w-3.5" />
                                              </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>Excluir transação?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  "{tx.description}" será excluída permanentemente.
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteTx(tx.id)} className="bg-destructive hover:bg-destructive/90">
                                                  Excluir
                                                </AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                              <tfoot>
                                <tr className="border-t bg-muted/30">
                                  <td colSpan={3} className="py-2 px-3 text-xs font-semibold text-muted-foreground">Subtotal</td>
                                  <td className="py-2 px-3 text-xs text-right font-bold text-destructive tabular-nums">
                                    {formatCurrency(subtotal)}
                                  </td>
                                  <td />
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Adjustments */}
                      {adjustments.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Abatimentos / Pagamentos parciais
                          </p>
                          <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 overflow-hidden">
                            <table className="w-full text-sm">
                              <tbody>
                                {adjustments.map(adj => (
                                  <tr key={adj.id} className="border-b last:border-0 hover:bg-muted/20 group/adj">
                                    <td className="py-2 px-3 text-xs text-muted-foreground whitespace-nowrap">
                                      {format(parseLocalDate(adj.date), 'dd/MM')}
                                    </td>
                                    <td className="py-2 px-3 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                      {adj.description}
                                    </td>
                                    <td className="py-2 px-3 text-xs text-right font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                                      −{formatCurrency(adj.amount)}
                                    </td>
                                    <td className="py-2 px-3 w-16">
                                      <div className="flex gap-1 justify-end opacity-0 group-hover/adj:opacity-100 transition-opacity">
                                        <button
                                          className="p-1 hover:text-primary"
                                          onClick={() => {
                                            setAdjForm({ description: adj.description, amount: adj.amount, date: adj.date })
                                            setAdjustmentModal({ contact, adj })
                                          }}
                                        >
                                          <Edit className="h-3.5 w-3.5" />
                                        </button>
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <button className="p-1 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Excluir abatimento?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleDeleteAdj(adj.id)} className="bg-destructive hover:bg-destructive/90">
                                                Excluir
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr className="border-t bg-emerald-50 dark:bg-emerald-950">
                                  <td colSpan={2} className="py-2 px-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400">Total abatido</td>
                                  <td className="py-2 px-3 text-xs text-right font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                                    −{formatCurrency(adjustmentsTotal)}
                                  </td>
                                  <td />
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Final total */}
                      <div className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl font-semibold',
                        isPaid
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-destructive/10 text-destructive'
                      )}>
                        <div className="flex items-center gap-2">
                          {isPaid ? <CheckCircle2 className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                          <span className="text-sm">{isPaid ? 'Saldo zerado' : 'Total a pagar'}</span>
                        </div>
                        <span className="text-lg tabular-nums">{formatCurrency(finalTotal)}</span>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })
          )}
        </div>
      </div>

      {/* ── WhatsApp modal ──────────────────────────────────────────────── */}
      <Dialog open={!!whatsappModal} onOpenChange={o => !o && setWhatsappModal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-emerald-500" />
              Cobrar {whatsappModal?.contact.name}
            </DialogTitle>
            <DialogDescription>{whatsappModal?.contact.phone}</DialogDescription>
          </DialogHeader>
          {whatsappModal && (
            <div className="space-y-3">
              <div className="bg-[#dcf8c6] dark:bg-emerald-950 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 max-h-72 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-sans text-[#111]  dark:text-emerald-100">
                  {buildWhatsAppMessage(whatsappModal)}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 gap-2"
                  onClick={() => {
                    navigator.clipboard.writeText(buildWhatsAppMessage(whatsappModal))
                    toast({ title: 'Mensagem copiada!', description: 'Cole no WhatsApp e envie.' })
                  }}
                >
                  <Copy className="h-4 w-4" /> Copiar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 text-emerald-600 border-emerald-300"
                  onClick={() => {
                    const clean = whatsappModal.contact.phone.replace(/\D/g, '')
                    window.open(`https://wa.me/55${clean}?text=${encodeURIComponent(buildWhatsAppMessage(whatsappModal))}`, '_blank')
                  }}
                >
                  <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Transaction modal ───────────────────────────────────────────── */}
      <Dialog open={!!transactionModal} onOpenChange={o => !o && setTransactionModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {transactionModal?.tx ? 'Editar Compra' : `Nova Compra — ${transactionModal?.contact.name}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <div className="space-y-2">
              <Label>Descrição *</Label>
              <Input value={txForm.description} onChange={e => setTxForm(f => ({ ...f, description: e.target.value }))} placeholder="Ex: Mercado, Pizza..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Valor *</Label>
                <CurrencyInput value={txForm.amount} onChange={v => setTxForm(f => ({ ...f, amount: v }))} />
              </div>
              <div className="space-y-2">
                <Label>Data</Label>
                <Input type="date" value={txForm.date} onChange={e => setTxForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={txForm.category_id} onValueChange={v => setTxForm(f => ({ ...f, category_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {!transactionModal?.tx && (
              <div className="space-y-2">
                <Label>Conta</Label>
                <Select value={txForm.account_id} onValueChange={v => setTxForm(f => ({ ...f, account_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    {accounts.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button className="w-full" onClick={handleSaveTx}>
              {transactionModal?.tx ? 'Atualizar' : 'Adicionar'} Compra
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Adjustment modal ────────────────────────────────────────────── */}
      <Dialog open={!!adjustmentModal} onOpenChange={o => !o && setAdjustmentModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {adjustmentModal?.adj ? 'Editar Abatimento' : `Novo Abatimento — ${adjustmentModal?.contact.name}`}
            </DialogTitle>
            <DialogDescription>
              Registre um pagamento parcial, troca ou qualquer valor que reduz o total devido.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <div className="space-y-2">
              <Label>Descrição *</Label>
              <Input value={adjForm.description} onChange={e => setAdjForm(f => ({ ...f, description: e.target.value }))} placeholder="Ex: Pagou em dinheiro, Comprou algo pra mim..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Valor *</Label>
                <CurrencyInput value={adjForm.amount} onChange={v => setAdjForm(f => ({ ...f, amount: v }))} />
              </div>
              <div className="space-y-2">
                <Label>Data</Label>
                <Input type="date" value={adjForm.date} onChange={e => setAdjForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <Button className="w-full" onClick={handleSaveAdj}>
              {adjustmentModal?.adj ? 'Atualizar' : 'Registrar'} Abatimento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
