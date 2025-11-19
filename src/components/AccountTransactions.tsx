import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { useCurrency } from '@/context/CurrencyContext'
import { TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react'

interface AccountTransactionsProps {
  accountId: string
  accountName: string
  className?: string
}

export const AccountTransactions = ({ accountId, accountName, className }: AccountTransactionsProps) => {
  const { transactions, categories } = useSupabaseData()
  const { formatCurrency } = useCurrency()

  const accountTransactions = useMemo(() => {
    return transactions
      .filter(t => t.account_id === accountId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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

  return (
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nenhuma transação encontrada
                  </TableCell>
                </TableRow>
              ) : (
                accountTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
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
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
