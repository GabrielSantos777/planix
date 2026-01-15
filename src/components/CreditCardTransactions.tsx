import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
import { useIsMobile } from '@/hooks/use-mobile'
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
  const isMobile = useIsMobile()
  const { toast } = useToast()

  const [responsibleFilter, setResponsibleFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("all")
  const [editingTransaction, setEditingTransaction] = useState<any>(null)
  const [deletingTransaction, setDeletingTransaction] = useState<any>(null)
  const [editForm, setEditForm] = useState({
    description: '',
    amount: 0,
    date: '',
    category_id: '',
    contact_id: '',
    notes: ''
  })

  // Get invoice month for a transaction
  const getInvoiceMonth = (transactionDate: Date) => {
    let invoiceMonth, invoiceYear
    if (transactionDate.getDate() >= closingDay) {
      if (transactionDate.getMonth() === 11) {
        invoiceMonth = 0
        invoiceYear = transactionDate.getFullYear() + 1
      } else {
        invoiceMonth = transactionDate.getMonth() + 1
        invoiceYear = transactionDate.getFullYear()
      }
    } else {
      invoiceMonth = transactionDate.getMonth()
      invoiceYear = transactionDate.getFullYear()
    }
    return { invoiceMonth, invoiceYear }
  }

  // Get available invoice months from transactions
  const availableInvoiceMonths = useMemo(() => {
    const months = new Map<string, { month: number; year: number }>()
    
    transactions
      .filter(t => t.credit_card_id === cardId)
      .forEach(t => {
        const tDate = parseLocalDate(t.date)
        const { invoiceMonth, invoiceYear } = getInvoiceMonth(tDate)
        const key = `${invoiceYear}-${invoiceMonth.toString().padStart(2, '0')}`
        if (!months.has(key)) {
          months.set(key, { month: invoiceMonth, year: invoiceYear })
        }
      })
    
    return Array.from(months.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
  }, [transactions, cardId, closingDay])

  const cardTransactions = useMemo(() => {
    let filtered = transactions
      .filter(t => t.credit_card_id === cardId)
      .sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime())
    
    // Apply month filter (by invoice month)
    if (monthFilter !== "all") {
      const [year, month] = monthFilter.split('-').map(Number)
      filtered = filtered.filter(t => {
        const tDate = parseLocalDate(t.date)
        const { invoiceMonth, invoiceYear } = getInvoiceMonth(tDate)
        return invoiceMonth === month && invoiceYear === year
      })
    }
    
    // Apply responsible filter
    if (responsibleFilter === "me") {
      filtered = filtered.filter(t => t.contact_id === null)
    } else if (responsibleFilter !== "all") {
      filtered = filtered.filter(t => t.contact_id === responsibleFilter)
    }
    
    return filtered
  }, [transactions, cardId, responsibleFilter, monthFilter, closingDay])

  // Calculate totals by responsible
  const totalByResponsible = useMemo(() => {
    const total = cardTransactions.reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)
    return total
  }, [cardTransactions])

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return '-'
    const category = categories.find(c => c.id === categoryId)
    return category?.name || '-'
  }

  const getContactName = (contactId: string | null) => {
    if (!contactId) return 'Eu'
    const contact = contacts.find(c => c.id === contactId)
    return contact?.name || '-'
  }

  const handleEditClick = (transaction: any) => {
    setEditingTransaction(transaction)
    setEditForm({
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      date: transaction.date,
      category_id: transaction.category_id || '',
      contact_id: transaction.contact_id || '',
      notes: transaction.notes || ''
    })
  }

  const handleDeleteClick = (transaction: any) => {
    setDeletingTransaction(transaction)
  }

  const handleConfirmDelete = async () => {
    if (!deletingTransaction) return

    try {
      await deleteTransaction(deletingTransaction.id)
      toast({
        title: "Sucesso",
        description: "Transação excluída com sucesso!"
      })
      setDeletingTransaction(null)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir transação",
        variant: "destructive"
      })
    }
  }

  const handleSaveEdit = async () => {
    if (!editingTransaction) return

    try {
      await updateTransaction(editingTransaction.id, {
        description: editForm.description,
        amount: -Math.abs(editForm.amount), // Credit card transactions are always expenses
        date: editForm.date,
        category_id: editForm.category_id || null,
        contact_id: editForm.contact_id || null,
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

  const ResponsibleFilterText = () => {
    if (responsibleFilter === "all") return "Todos os responsáveis"
    if (responsibleFilter === "me") return "Eu"
    const contact = contacts.find(c => c.id === responsibleFilter)
    return contact?.name || "Responsável"
  }

  const MonthFilterText = () => {
    if (monthFilter === "all") return "Todas as faturas"
    const [year, month] = monthFilter.split('-').map(Number)
    return format(new Date(year, month, 1), 'MMMM yyyy', { locale: ptBR })
  }

  if (isMobile) {
    return (
      <>
        <Card className={className}>
          <CardHeader>
            <CardTitle>Transações de {cardName}</CardTitle>
            <CardDescription>
              {cardTransactions.length} transação(ões) encontrada(s)
            </CardDescription>
            
            {/* Filters */}
            <div className="pt-2 space-y-3">
              <div className="space-y-2">
                <Label className="text-sm">Fatura</Label>
                <Select value={monthFilter} onValueChange={setMonthFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as faturas</SelectItem>
                    {availableInvoiceMonths.map(([key, { month, year }]) => (
                      <SelectItem key={key} value={key}>
                        {format(new Date(year, month, 1), 'MMMM yyyy', { locale: ptBR })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Responsável</Label>
                <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="me">Eu</SelectItem>
                    {contacts.map(contact => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {(responsibleFilter !== "all" || monthFilter !== "all") && (
                <div className="text-sm font-medium text-primary">
                  Total: {formatCurrency(totalByResponsible)}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {cardTransactions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                Nenhuma transação encontrada
              </div>
            ) : (
              cardTransactions.map((transaction) => (
                <Card key={transaction.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {parseLocalDate(transaction.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="text-destructive font-semibold">
                          {formatCurrency(transaction.amount)}
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => handleEditClick(transaction)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteClick(transaction)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center text-sm gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{getCategoryName(transaction.category_id)}</span>
                        <Badge variant="outline" className="text-xs">
                          <User className="h-3 w-3 mr-1" />
                          {getContactName(transaction.contact_id)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Transação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Descrição</Label>
                <Input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
              </div>
              <div>
                <Label>Valor</Label>
                <CurrencyInput value={editForm.amount} onChange={(v) => setEditForm({ ...editForm, amount: v })} />
              </div>
              <div>
                <Label>Data</Label>
                <Input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
              </div>
              <div>
                <Label>Categoria</Label>
                <Select value={editForm.category_id} onValueChange={(v) => setEditForm({ ...editForm, category_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Responsável</Label>
                <Select value={editForm.contact_id || "me"} onValueChange={(v) => setEditForm({ ...editForm, contact_id: v === "me" ? "" : v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Eu</SelectItem>
                    {contacts.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingTransaction(null)}>Cancelar</Button>
              <Button onClick={handleSaveEdit}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deletingTransaction} onOpenChange={() => setDeletingTransaction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir a transação "{deletingTransaction?.description}"? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Transações de {cardName}</CardTitle>
              <CardDescription>
                {cardTransactions.length} transação(ões) encontrada(s)
              </CardDescription>
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={monthFilter} onValueChange={setMonthFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todas as faturas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as faturas</SelectItem>
                    {availableInvoiceMonths.map(([key, { month, year }]) => (
                      <SelectItem key={key} value={key}>
                        {format(new Date(year, month, 1), 'MMMM yyyy', { locale: ptBR })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm whitespace-nowrap">Responsável:</Label>
                <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="me">Eu</SelectItem>
                    {contacts.map(contact => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {(responsibleFilter !== "all" || monthFilter !== "all") && (
            <div className="text-sm font-medium text-primary pt-2">
              Total ({monthFilter !== "all" ? MonthFilterText() : ''} {responsibleFilter !== "all" ? ResponsibleFilterText() : ''}): {formatCurrency(totalByResponsible)}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="w-20">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cardTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Nenhuma transação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  cardTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="whitespace-nowrap">
                        {parseLocalDate(transaction.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{getCategoryName(transaction.category_id)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          <User className="h-3 w-3 mr-1" />
                          {getContactName(transaction.contact_id)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <TrendingDown className="h-4 w-4 text-destructive" />
                          <span className="text-destructive font-medium">
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="ghost" onClick={() => handleEditClick(transaction)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDeleteClick(transaction)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Descrição</Label>
              <Input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
            </div>
            <div>
              <Label>Valor</Label>
              <CurrencyInput value={editForm.amount} onChange={(v) => setEditForm({ ...editForm, amount: v })} />
            </div>
            <div>
              <Label>Data</Label>
              <Input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
            </div>
            <div>
              <Label>Categoria</Label>
              <Select value={editForm.category_id} onValueChange={(v) => setEditForm({ ...editForm, category_id: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Responsável</Label>
              <Select value={editForm.contact_id || "me"} onValueChange={(v) => setEditForm({ ...editForm, contact_id: v === "me" ? "" : v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="me">Eu</SelectItem>
                  {contacts.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTransaction(null)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingTransaction} onOpenChange={() => setDeletingTransaction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a transação "{deletingTransaction?.description}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
