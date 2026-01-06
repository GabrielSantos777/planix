import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { useCurrency } from '@/context/CurrencyContext'
import { TrendingUp, TrendingDown, ArrowUpDown, Info, X } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { parseLocalDate, getLocalDateString } from '@/utils/dateUtils'
import { CurrencyInput } from '@/components/ui/currency-input'
import { useToast } from '@/hooks/use-toast'

interface AccountTransactionsProps {
  accountId: string
  accountName: string
  className?: string
}

export const AccountTransactions = ({ accountId, accountName, className }: AccountTransactionsProps) => {
  const { transactions, categories, updateTransaction } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const isMobile = useIsMobile()
  const { toast } = useToast()

  const [editingTransaction, setEditingTransaction] = useState<any>(null)
  const [editForm, setEditForm] = useState({
    description: '',
    amount: 0,
    date: '',
    category_id: '',
    type: 'expense' as 'income' | 'expense' | 'transfer',
    notes: ''
  })

  const accountTransactions = useMemo(() => {
    return transactions
      .filter(t => t.account_id === accountId)
      .sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime())
  }, [transactions, accountId])

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return '-'
    const category = categories.find(c => c.id === categoryId)
    return category?.name || '-'
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="h-4 w-4 text-success" />
      case "expense":
        return <TrendingDown className="h-4 w-4 text-destructive" />
      case "transfer":
        return <ArrowUpDown className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "income":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Receita</Badge>
      case "expense":
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Despesa</Badge>
      case "transfer":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Transferência</Badge>
      default:
        return null
    }
  }

  const handleEditClick = (transaction: any) => {
    setEditingTransaction(transaction)
    setEditForm({
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      date: transaction.date,
      category_id: transaction.category_id || '',
      type: transaction.type,
      notes: transaction.notes || ''
    })
  }

  const handleSaveEdit = async () => {
    if (!editingTransaction) return

    try {
      const amount = editForm.type === 'expense' ? -Math.abs(editForm.amount) : Math.abs(editForm.amount)
      
      await updateTransaction(editingTransaction.id, {
        description: editForm.description,
        amount,
        date: editForm.date,
        category_id: editForm.category_id || null,
        type: editForm.type,
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

  const filteredCategories = categories.filter(c => c.type === editForm.type)

  if (isMobile) {
    return (
      <>
        <Card className={className}>
          <CardHeader>
            <CardTitle>Transações de {accountName}</CardTitle>
            <CardDescription>
              {accountTransactions.length} transação(ões) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {accountTransactions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                Nenhuma transação encontrada
              </div>
            ) : (
              accountTransactions.map((transaction) => (
                <Card key={transaction.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {parseLocalDate(transaction.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={
                          transaction.type === 'income' 
                            ? 'text-success font-semibold' 
                            : transaction.type === 'expense'
                            ? 'text-destructive font-semibold'
                            : 'font-semibold'
                        }>
                          {formatCurrency(transaction.amount)}
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => handleEditClick(transaction)}>
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{getCategoryName(transaction.category_id)}</span>
                      {getTypeBadge(transaction.type)}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

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
                <Label>Tipo</Label>
                <Select value={editForm.type} onValueChange={(v: any) => setEditForm({ ...editForm, type: v, category_id: '' })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Receita</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Categoria</Label>
                <Select value={editForm.category_id} onValueChange={(v) => setEditForm({ ...editForm, category_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
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
      </>
    )
  }

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Transações de {accountName}</CardTitle>
          <CardDescription>
            {accountTransactions.length} transação(ões) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Nenhuma transação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  accountTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="whitespace-nowrap">
                        {parseLocalDate(transaction.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{getCategoryName(transaction.category_id)}</TableCell>
                      <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {getTypeIcon(transaction.type)}
                          <span className={
                            transaction.type === 'income' 
                              ? 'text-success font-medium' 
                              : transaction.type === 'expense'
                              ? 'text-destructive font-medium'
                              : 'font-medium'
                          }>
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost" onClick={() => handleEditClick(transaction)}>
                          <Info className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
              <Label>Tipo</Label>
              <Select value={editForm.type} onValueChange={(v: any) => setEditForm({ ...editForm, type: v, category_id: '' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Categoria</Label>
              <Select value={editForm.category_id} onValueChange={(v) => setEditForm({ ...editForm, category_id: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {filteredCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
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
    </>
  )
}
