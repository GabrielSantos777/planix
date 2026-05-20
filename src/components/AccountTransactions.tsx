import { useMemo, useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Separator } from '@/components/ui/separator'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { useAuth } from '@/context/AuthContext'
import { useCurrency } from '@/context/CurrencyContext'
import { TrendingUp, TrendingDown, ArrowUpDown, Edit, Trash2, Plus, Calendar } from 'lucide-react'
import { parseLocalDate } from '@/utils/dateUtils'
import { CurrencyInput } from '@/components/ui/currency-input'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface AccountTransactionsProps {
  accountId: string
  accountName: string
  className?: string
}

type TxType = 'income' | 'expense' | 'transfer'

const typeConfig: Record<TxType, { label: string; color: string; icon: React.ReactNode }> = {
  income:   { label: 'Receita',       color: 'text-emerald-600 dark:text-emerald-400',  icon: <TrendingUp  className="h-3.5 w-3.5" /> },
  expense:  { label: 'Despesa',       color: 'text-destructive', icon: <TrendingDown className="h-3.5 w-3.5" /> },
  transfer: { label: 'Transferência', color: 'text-blue-500',    icon: <ArrowUpDown  className="h-3.5 w-3.5" /> },
}

const emptyAdd = {
  description: '',
  amount: 0,
  type: 'expense' as TxType,
  date: format(new Date(), 'yyyy-MM-dd'),
  category_id: '',
  contact_id: '',
  notes: '',
}

const emptyEdit = {
  description: '',
  amount: 0,
  type: 'expense' as TxType,
  date: '',
  category_id: '',
  contact_id: '',
  notes: '',
}

export const AccountTransactions = ({ accountId, accountName, className }: AccountTransactionsProps) => {
  const { transactions, categories, contacts, addTransaction, updateTransaction, deleteTransaction } = useSupabaseData()
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()

  // ── Filters ──────────────────────────────────────────────────
  const [monthFilter,       setMonthFilter]       = useState('all')
  const [typeFilter,        setTypeFilter]        = useState<'all' | TxType>('all')
  const [responsibleFilter, setResponsibleFilter] = useState('all')
  const [monthInitialized,  setMonthInitialized]  = useState(false)

  // ── Modal states ──────────────────────────────────────────────
  const [addOpen,            setAddOpen]            = useState(false)
  const [editingTx,          setEditingTx]          = useState<any>(null)
  const [deletingTx,         setDeletingTx]         = useState<any>(null)
  const [addForm,            setAddForm]            = useState(emptyAdd)
  const [editForm,           setEditForm]           = useState(emptyEdit)

  // ── Available months ──────────────────────────────────────────
  const availableMonths = useMemo(() => {
    const months = new Map<string, { month: number; year: number }>()
    transactions
      .filter(t => t.account_id === accountId)
      .forEach(t => {
        const d = parseLocalDate(t.date)
        const key = `${d.getFullYear()}-${d.getMonth().toString().padStart(2, '0')}`
        if (!months.has(key)) months.set(key, { month: d.getMonth(), year: d.getFullYear() })
      })
    return Array.from(months.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [transactions, accountId])

  // Auto-init to current month
  useEffect(() => {
    if (monthInitialized || availableMonths.length === 0) return
    const now = new Date()
    const key = `${now.getFullYear()}-${now.getMonth().toString().padStart(2, '0')}`
    setMonthFilter(availableMonths.some(([k]) => k === key) ? key : 'all')
    setMonthInitialized(true)
  }, [availableMonths, monthInitialized])

  // ── Filtered transactions ─────────────────────────────────────
  const filtered = useMemo(() => {
    let list = transactions
      .filter(t => t.account_id === accountId)
      .sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime())

    if (monthFilter !== 'all') {
      const [y, m] = monthFilter.split('-').map(Number)
      list = list.filter(t => {
        const d = parseLocalDate(t.date)
        return d.getMonth() === m && d.getFullYear() === y
      })
    }
    if (typeFilter !== 'all') list = list.filter(t => t.type === typeFilter)
    if (responsibleFilter === 'me')         list = list.filter(t => !t.contact_id)
    else if (responsibleFilter !== 'all')   list = list.filter(t => t.contact_id === responsibleFilter)

    return list
  }, [transactions, accountId, monthFilter, typeFilter, responsibleFilter])

  // ── Summary ───────────────────────────────────────────────────
  const summary = useMemo(() => {
    const income   = filtered.filter(t => t.type === 'income').reduce((s, t)   => s + (t.amount || 0), 0)
    const expense  = filtered.filter(t => t.type === 'expense').reduce((s, t)  => s + Math.abs(t.amount || 0), 0)
    const transfer = filtered.filter(t => t.type === 'transfer').reduce((s, t) => s + (t.amount || 0), 0)
    return { income, expense, net: income - expense, transfer }
  }, [filtered])

  // ── Group by date ─────────────────────────────────────────────
  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof filtered> = {}
    filtered.forEach(t => {
      if (!groups[t.date]) groups[t.date] = []
      groups[t.date].push(t)
    })
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
  }, [filtered])

  // ── Helpers ───────────────────────────────────────────────────
  const getCatName = (id: string | null) => categories.find(c => c.id === id)?.name || ''
  const getContactName = (id: string | null) => id ? (contacts.find(c => c.id === id)?.name || '—') : 'Eu'

  // ── Add transaction ───────────────────────────────────────────
  const handleAdd = async () => {
    if (!user || !addForm.description || addForm.amount <= 0) {
      toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' })
      return
    }
    try {
      const amount = addForm.type === 'expense' ? -Math.abs(addForm.amount) : Math.abs(addForm.amount)
      await addTransaction({
        user_id: user.id,
        description: addForm.description,
        amount,
        type: addForm.type as any,
        account_id: accountId,
        date: addForm.date,
        currency: 'BRL',
        category_id: addForm.category_id || null,
        contact_id: addForm.contact_id || null,
        notes: addForm.notes || null,
        installments: 1,
        installment_number: 1,
        is_installment: false,
      })
      toast({ title: 'Transação adicionada com sucesso!' })
      setAddForm(emptyAdd)
      setAddOpen(false)
    } catch {
      toast({ title: 'Erro ao adicionar transação', variant: 'destructive' })
    }
  }

  // ── Edit transaction ──────────────────────────────────────────
  const openEdit = (tx: any) => {
    setEditingTx(tx)
    setEditForm({
      description: tx.description,
      amount: Math.abs(tx.amount),
      type: tx.type,
      date: tx.date,
      category_id: tx.category_id || '',
      contact_id: tx.contact_id || '',
      notes: tx.notes || '',
    })
  }

  const handleSaveEdit = async () => {
    if (!editingTx) return
    try {
      const amount = editForm.type === 'expense' ? -Math.abs(editForm.amount) : Math.abs(editForm.amount)
      await updateTransaction(editingTx.id, {
        description: editForm.description,
        amount,
        type: editForm.type as any,
        date: editForm.date,
        category_id: editForm.category_id || null,
        contact_id: editForm.contact_id || null,
        notes: editForm.notes || null,
      })
      toast({ title: 'Transação atualizada com sucesso!' })
      setEditingTx(null)
    } catch {
      toast({ title: 'Erro ao atualizar transação', variant: 'destructive' })
    }
  }

  // ── Delete transaction ────────────────────────────────────────
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

  const filteredCats = categories.filter(c => c.type === (editForm.type === 'transfer' ? 'expense' : editForm.type))
  const addCats      = categories.filter(c => c.type === (addForm.type  === 'transfer' ? 'expense' : addForm.type))

  return (
    <div className={className}>
      {/* ── Filter Bar ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        {/* Month */}
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="h-8 w-[160px] text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Todos os meses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os meses</SelectItem>
            {availableMonths.map(([key, { month, year }]) => (
              <SelectItem key={key} value={key}>
                {format(new Date(year, month, 1), 'MMMM yyyy', { locale: ptBR })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type toggle */}
        <div className="flex rounded-md border overflow-hidden text-xs">
          {(['all', 'income', 'expense', 'transfer'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1.5 font-medium transition-colors ${
                typeFilter === t ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {t === 'all' ? 'Todos' : t === 'income' ? 'Receitas' : t === 'expense' ? 'Despesas' : 'Transf.'}
            </button>
          ))}
        </div>

        {/* Responsible */}
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

        <Button size="sm" className="h-8 ml-auto" onClick={() => setAddOpen(true)}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          Nova Transação
        </Button>
      </div>

      {/* ── Summary strip ────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-2">
          <p className="text-xs text-muted-foreground mb-0.5">Entradas</p>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(summary.income)}</p>
        </div>
        <div className="rounded-lg bg-red-50 dark:bg-red-950/40 p-2">
          <p className="text-xs text-muted-foreground mb-0.5">Saídas</p>
          <p className="text-sm font-semibold text-destructive">{formatCurrency(summary.expense)}</p>
        </div>
        <div className={`rounded-lg p-2 ${summary.net >= 0 ? 'bg-blue-50 dark:bg-blue-950/40' : 'bg-red-50 dark:bg-red-950/40'}`}>
          <p className="text-xs text-muted-foreground mb-0.5">Saldo período</p>
          <p className={`text-sm font-semibold ${summary.net >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-destructive'}`}>
            {formatCurrency(summary.net)}
          </p>
        </div>
      </div>

      {/* ── Transaction list — bank statement style ──────────────── */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nenhuma transação encontrada
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          {groupedByDate.map(([dateKey, txs], gi) => (
            <div key={dateKey}>
              {/* Date header */}
              <div className="px-4 py-2 bg-muted/30 border-b">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {format(parseLocalDate(dateKey), "dd 'de' MMMM", { locale: ptBR })}
                </span>
              </div>

              {/* Transactions for this date */}
              {txs.map((tx, ti) => {
                const cfg = typeConfig[tx.type as TxType] || typeConfig.expense
                const isLast = ti === txs.length - 1 && gi === groupedByDate.length - 1
                return (
                  <div
                    key={tx.id}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors group ${!isLast ? 'border-b border-border/50' : ''}`}
                  >
                    {/* Type icon */}
                    <div className={`flex-shrink-0 ${cfg.color}`}>{cfg.icon}</div>

                    {/* Description + category */}
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

                    {/* Amount */}
                    <p className={`text-sm font-semibold whitespace-nowrap ${cfg.color}`}>
                      {tx.type === 'expense' ? '−' : tx.amount > 0 ? '+' : ''}
                      {formatCurrency(Math.abs(tx.amount))}
                    </p>

                    {/* Actions — visible on hover */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(tx)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeletingTx(tx)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── Add Transaction Dialog ───────────────────────────────── */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Nova Transação — {accountName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <div className="flex rounded-md border overflow-hidden text-sm">
                {(['income', 'expense'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setAddForm(f => ({ ...f, type: t, category_id: '' }))}
                    className={`flex-1 py-1.5 font-medium transition-colors ${addForm.type === t ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted'}`}
                  >
                    {t === 'income' ? 'Receita' : 'Despesa'}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Descrição *</Label>
              <Input placeholder="Ex: Supermercado" value={addForm.description} onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Valor *</Label>
                <CurrencyInput value={addForm.amount} onChange={v => setAddForm(f => ({ ...f, amount: v }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Data *</Label>
                <Input type="date" value={addForm.date} onChange={e => setAddForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={addForm.category_id} onValueChange={v => setAddForm(f => ({ ...f, category_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {addCats.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {contacts.length > 0 && (
              <div className="space-y-1.5">
                <Label>Responsável</Label>
                <Select value={addForm.contact_id || 'me'} onValueChange={v => setAddForm(f => ({ ...f, contact_id: v === 'me' ? '' : v }))}>
                  <SelectTrigger><SelectValue placeholder="Eu" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Eu</SelectItem>
                    {contacts.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancelar</Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ──────────────────────────────────────────── */}
      <Dialog open={!!editingTx} onOpenChange={() => setEditingTx(null)}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={editForm.type} onValueChange={(v: any) => setEditForm(f => ({ ...f, type: v, category_id: '' }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                <SelectContent>
                  {filteredCats.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
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

      {/* ── Delete Confirm ───────────────────────────────────────── */}
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
