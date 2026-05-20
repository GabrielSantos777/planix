import { useMemo, useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { useCurrency } from '@/context/CurrencyContext'
import { TrendingDown, Edit, Trash2, User, Calendar } from 'lucide-react'
import { parseLocalDate } from '@/utils/dateUtils'
import { CurrencyInput } from '@/components/ui/currency-input'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CreditCardTransactionsProps {
  cardId: string
  cardName: string
  closingDay: number
  className?: string
}

export const CreditCardTransactions = ({ cardId, cardName, closingDay, className }: CreditCardTransactionsProps) => {
  const { transactions, categories, contacts, updateTransaction, deleteTransaction } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()

  const [responsibleFilter, setResponsibleFilter] = useState('all')
  const [monthFilter, setMonthFilter] = useState('all')
  const [monthInitialized, setMonthInitialized] = useState(false)
  const [editingTx, setEditingTx] = useState<any>(null)
  const [deletingTx, setDeletingTx] = useState<any>(null)
  const [editForm, setEditForm] = useState({ description: '', amount: 0, date: '', category_id: '', contact_id: '' })

  const getInvoiceMonth = (d: Date) => {
    if (d.getDate() >= closingDay) {
      const m = d.getMonth() === 11 ? 0 : d.getMonth() + 1
      const y = d.getMonth() === 11 ? d.getFullYear() + 1 : d.getFullYear()
      return { invoiceMonth: m, invoiceYear: y }
    }
    return { invoiceMonth: d.getMonth(), invoiceYear: d.getFullYear() }
  }

  // Current invoice key
  const currentInvoiceKey = useMemo(() => {
    const now = new Date()
    const { invoiceMonth, invoiceYear } = getInvoiceMonth(now)
    return `${invoiceYear}-${invoiceMonth.toString().padStart(2, '0')}`
  }, [closingDay])

  const availableInvoiceMonths = useMemo(() => {
    const months = new Map<string, { month: number; year: number }>()
    transactions.filter(t => t.credit_card_id === cardId).forEach(t => {
      const d = parseLocalDate(t.date)
      const { invoiceMonth, invoiceYear } = getInvoiceMonth(d)
      const key = `${invoiceYear}-${invoiceMonth.toString().padStart(2, '0')}`
      if (!months.has(key)) months.set(key, { month: invoiceMonth, year: invoiceYear })
    })
    return Array.from(months.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [transactions, cardId, closingDay])

  useEffect(() => {
    if (monthInitialized || availableInvoiceMonths.length === 0) return
    const hasCurrentMonth = availableInvoiceMonths.some(([key]) => key === currentInvoiceKey)
    setMonthFilter(hasCurrentMonth ? currentInvoiceKey : 'all')
    setMonthInitialized(true)
  }, [availableInvoiceMonths, monthInitialized, currentInvoiceKey])

  const filtered = useMemo(() => {
    let list = transactions
      .filter(t => t.credit_card_id === cardId)
      .sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime())

    if (monthFilter !== 'all') {
      const [y, m] = monthFilter.split('-').map(Number)
      list = list.filter(t => {
        const { invoiceMonth, invoiceYear } = getInvoiceMonth(parseLocalDate(t.date))
        return invoiceMonth === m && invoiceYear === y
      })
    }
    if (responsibleFilter === 'me')       list = list.filter(t => !t.contact_id)
    else if (responsibleFilter !== 'all') list = list.filter(t => t.contact_id === responsibleFilter)
    return list
  }, [transactions, cardId, monthFilter, responsibleFilter, closingDay])

  const total = useMemo(() => filtered.reduce((s, t) => s + Math.abs(t.amount || 0), 0), [filtered])

  // Group by date
  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof filtered> = {}
    filtered.forEach(t => {
      if (!groups[t.date]) groups[t.date] = []
      groups[t.date].push(t)
    })
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
  }, [filtered])

  const getCatName = (id: string | null) => categories.find(c => c.id === id)?.name || ''
  const getContactName = (id: string | null) => id ? (contacts.find(c => c.id === id)?.name || '—') : 'Eu'

  const openEdit = (tx: any) => {
    setEditingTx(tx)
    setEditForm({
      description: tx.description,
      amount: Math.abs(tx.amount),
      date: tx.date,
      category_id: tx.category_id || '',
      contact_id: tx.contact_id || '',
    })
  }

  const handleSaveEdit = async () => {
    if (!editingTx) return
    try {
      await updateTransaction(editingTx.id, {
        description: editForm.description,
        amount: -Math.abs(editForm.amount),
        date: editForm.date,
        category_id: editForm.category_id || null,
        contact_id: editForm.contact_id || null,
      })
      toast({ title: 'Transação atualizada com sucesso!' })
      setEditingTx(null)
    } catch {
      toast({ title: 'Erro ao atualizar transação', variant: 'destructive' })
    }
  }

  const handleDelete = async () => {
    if (!deletingTx) return
    try {
      await deleteTransaction(deletingTx.id)
      toast({ title: 'Transação excluída com sucesso!' })
      setDeletingTx(null)
    } catch {
      toast({ title: 'Erro ao excluir transação', variant: 'destructive' })
    }
  }

  const expenseCats = categories.filter(c => c.type === 'expense')

  return (
    <div className={className}>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="h-8 w-[170px] text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Todas as faturas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as faturas</SelectItem>
            {availableInvoiceMonths.map(([key, { month, year }]) => (
              <SelectItem key={key} value={key}>
                {format(new Date(year, month, 1), 'MMMM yyyy', { locale: ptBR })}
                {key === currentInvoiceKey && ' · Atual'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {contacts.length > 0 && (
          <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
            <SelectTrigger className="h-8 w-[140px] text-sm">
              <SelectValue placeholder="Responsável" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="me">Eu</SelectItem>
              {contacts.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        )}

        <span className="ml-auto text-sm text-muted-foreground">
          {filtered.length} lançamento{filtered.length !== 1 ? 's' : ''} · <strong className="text-destructive">{formatCurrency(total)}</strong>
        </span>
      </div>

      {/* Transaction list — statement style */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nenhum lançamento encontrado
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          {groupedByDate.map(([dateKey, txs], gi) => (
            <div key={dateKey}>
              <div className="px-4 py-2 bg-muted/30 border-b">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {format(parseLocalDate(dateKey), "dd 'de' MMMM", { locale: ptBR })}
                </span>
              </div>
              {txs.map((tx, ti) => (
                <div
                  key={tx.id}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors group ${ti < txs.length - 1 || gi < groupedByDate.length - 1 ? 'border-b border-border/50' : ''}`}
                >
                  <TrendingDown className="h-3.5 w-3.5 flex-shrink-0 text-destructive" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tx.description}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {getCatName(tx.category_id) && (
                        <span className="text-xs text-muted-foreground">{getCatName(tx.category_id)}</span>
                      )}
                      {tx.contact_id && (
                        <Badge variant="outline" className="text-xs py-0 h-4 px-1">
                          {getContactName(tx.contact_id)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-destructive whitespace-nowrap">
                    −{formatCurrency(Math.abs(tx.amount))}
                  </p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(tx)}>
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeletingTx(tx)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {/* Footer total */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-t">
            <span className="text-sm font-medium">Total</span>
            <span className="text-sm font-bold text-destructive">{formatCurrency(total)}</span>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingTx} onOpenChange={() => setEditingTx(null)}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader><DialogTitle>Editar Lançamento</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label>Descrição</Label>
              <Input value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Valor</Label>
                <CurrencyInput value={editForm.amount} onChange={v => setEditForm(f => ({ ...f, amount: v }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Data</Label>
                <Input type="date" value={editForm.date} onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={editForm.category_id} onValueChange={v => setEditForm(f => ({ ...f, category_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{expenseCats.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {contacts.length > 0 && (
              <div className="space-y-1.5">
                <Label>Responsável</Label>
                <Select value={editForm.contact_id || 'me'} onValueChange={v => setEditForm(f => ({ ...f, contact_id: v === 'me' ? '' : v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Eu</SelectItem>
                    {contacts.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTx(null)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deletingTx} onOpenChange={() => setDeletingTx(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Excluir "{deletingTx?.description}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
