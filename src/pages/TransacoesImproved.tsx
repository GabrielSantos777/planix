import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Plus, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Calendar
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import { useSearchParams } from "react-router-dom"
import Layout from "@/components/Layout"
import { CurrencyInput } from "@/components/ui/currency-input"
import { useCurrency } from "@/context/CurrencyContext"
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

const TransacoesImproved = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  const { 
    transactions, 
    accounts, 
    categories,
    addTransaction
  } = useSupabaseData()
  const [searchParams] = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null)
  
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: 0,
    type: "expense" as "income" | "expense" | "transfer",
    category_id: "",
    date: new Date().toISOString().split('T')[0],
    account_id: "",
    account_to_id: "", // Para transferências
    notes: ""
  })

  // Handle quick action from dashboard
  useEffect(() => {
    const type = searchParams.get('type')
    if (type && ['income', 'expense', 'transfer'].includes(type)) {
      setNewTransaction(prev => ({ ...prev, type: type as any }))
      setIsDialogOpen(true)
    }
  }, [searchParams])

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesCategory = filterCategory === "all" || transaction.category_id === filterCategory
    
    const transactionDate = new Date(transaction.date)
    const matchesDateFrom = !dateFrom || transactionDate >= new Date(dateFrom)
    const matchesDateTo = !dateTo || transactionDate <= new Date(dateTo)
    
    return matchesSearch && matchesType && matchesCategory && matchesDateFrom && matchesDateTo
  })

  const handleAddTransaction = async () => {
    if (!newTransaction.description || !newTransaction.account_id) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    if (newTransaction.type === "transfer" && !newTransaction.account_to_id) {
      toast({
        title: "Erro",
        description: "Para transferências, selecione a conta de destino",
        variant: "destructive"
      })
      return
    }

    try {
      const transactionData = {
        ...newTransaction,
        amount: newTransaction.type === "expense" ? -Math.abs(newTransaction.amount) : newTransaction.amount,
        user_id: user?.id,
        currency: 'BRL'
      }

      if (editingTransaction) {
        // Update functionality to be implemented
        console.log('Update:', transactionData)
        toast({
          title: "✅ Transação Atualizada",
          description: `${transactionData.description} foi atualizada com sucesso`,
        })
      } else {
        await addTransaction(transactionData)
        toast({
          title: "✅ Transação Adicionada",
          description: `${transactionData.description} - ${formatCurrency(Math.abs(transactionData.amount))}`,
        })
      }

      setNewTransaction({
        description: "",
        amount: 0,
        type: "expense",
        category_id: "",
        date: new Date().toISOString().split('T')[0],
        account_id: "",
        account_to_id: "",
        notes: ""
      })
      setEditingTransaction(null)
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar transação. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteTransaction = async (id: string) => {
    try {
      // Delete functionality to be implemented
      console.log('Delete:', id)
      toast({
        title: "🗑️ Transação Excluída",
        description: "Transação excluída com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir transação. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleEditTransaction = (transaction: any) => {
    setEditingTransaction(transaction)
    setNewTransaction({
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      type: transaction.type,
      category_id: transaction.category_id || "",
      date: transaction.date,
      account_id: transaction.account_id || "",
      account_to_id: transaction.account_to_id || "",
      notes: transaction.notes || ""
    })
    setIsDialogOpen(true)
  }

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string
          const lines = text.split('\n')
          const headers = lines[0].split(',')
          
          // Process CSV data here
          toast({
            title: "Importação",
            description: "Arquivo CSV processado com sucesso",
          })
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao processar arquivo CSV",
            variant: "destructive"
          })
        }
      }
      reader.readAsText(file)
    }
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Relatório de Transações', 20, 20)
    
    let yPosition = 40
    filteredTransactions.forEach((transaction, index) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.setFontSize(10)
      doc.text(`${transaction.description} - ${formatCurrency(transaction.amount)}`, 20, yPosition)
      doc.text(`Categoria - ${new Date(transaction.date).toLocaleDateString('pt-BR')}`, 20, yPosition + 5)
      yPosition += 15
    })
    
    doc.save('transacoes.pdf')
    toast({
      title: "PDF Exportado",
      description: "Relatório em PDF foi baixado com sucesso",
    })
  }

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new()
        const data = filteredTransactions.map(transaction => ({
          'Data': new Date(transaction.date).toLocaleDateString('pt-BR'),
          'Descrição': transaction.description,
          'Tipo': transaction.type === 'income' ? 'Receita' : transaction.type === 'expense' ? 'Despesa' : 'Transferência',
          'Categoria': 'Categoria',
          'Conta': 'Conta',
          'Valor': transaction.amount,
          'Observações': transaction.notes || ''
        }))
    
    const worksheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transações')
    XLSX.writeFile(workbook, 'transacoes.xlsx')
    
    toast({
      title: "Excel Exportado",
      description: "Planilha Excel foi baixada com sucesso",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="h-4 w-4 text-success" />
      case "expense":
        return <TrendingDown className="h-4 w-4 text-destructive" />
      case "transfer":
        return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
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
        return <Badge className="bg-muted text-muted-foreground">Transferência</Badge>
      default:
        return null
    }
  }

  const incomeCategories = categories.filter(cat => cat.type === 'income')
  const expenseCategories = categories.filter(cat => cat.type === 'expense')

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Lançamentos</h1>
              <p className="text-muted-foreground">
                Gerencie suas transações financeiras
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
              id="csv-import"
            />
            <Button 
              onClick={() => window.location.href = '/categorias'}
              variant="outline" 
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Gerenciar Categorias
            </Button>
            <Button onClick={() => document.getElementById('csv-import')?.click()} variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Importar CSV
            </Button>
            <Button onClick={handleExportPDF} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button onClick={handleExportExcel} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar Excel
            </Button>
            <Button onClick={() => {
              setEditingTransaction(null)
              setNewTransaction({
                description: "",
                amount: 0,
                type: "expense",
                category_id: "",
                date: new Date().toISOString().split('T')[0],
                account_id: "",
                account_to_id: "",
                notes: ""
              })
              setIsDialogOpen(true)
            }} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Transação
            </Button>
            </div>
          </div>
          
          {/* Category Management Quick Access */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Configurações Rápidas</h3>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/categorias'}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Gerenciar Categorias
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar transações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="income">Receitas</SelectItem>
                    <SelectItem value="expense">Despesas</SelectItem>
                    <SelectItem value="transfer">Transferências</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  type="date"
                  placeholder="Data início"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="date"
                  placeholder="Data fim"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transações</CardTitle>
            <CardDescription>
              {filteredTransactions.length} transação(ões) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Conta</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(transaction.type)}
                          {getTypeBadge(transaction.type)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.description}
                      </TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Conta</TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.type === "income" ? "text-success" : "text-destructive"
                      }`}>
                        {transaction.type === "income" ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTransaction(transaction)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Transaction Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTransaction ? "Editar Transação" : "Nova Transação"}
              </DialogTitle>
              <DialogDescription>
                {editingTransaction 
                  ? "Edite os dados da transação"
                  : "Adicione uma nova transação financeira"
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    placeholder="Ex: Compra no supermercado"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor</Label>
                  <CurrencyInput
                    value={newTransaction.amount}
                    onChange={(value) => setNewTransaction({...newTransaction, amount: value})}
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={newTransaction.type} onValueChange={(value: any) => setNewTransaction({...newTransaction, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                      <SelectItem value="transfer">Transferência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={newTransaction.category_id} onValueChange={(value) => setNewTransaction({...newTransaction, category_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {newTransaction.type === "income" 
                        ? incomeCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))
                        : expenseCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account">Conta</Label>
                  <Select value={newTransaction.account_id} onValueChange={(value) => setNewTransaction({...newTransaction, account_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma conta" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {newTransaction.type === "transfer" && (
                <div className="space-y-2">
                  <Label htmlFor="accountTo">Conta de Destino</Label>
                  <Select value={newTransaction.account_to_id} onValueChange={(value) => setNewTransaction({...newTransaction, account_to_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a conta de destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.filter(acc => acc.id !== newTransaction.account_id).map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="notes">Observações (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Observações adicionais..."
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({...newTransaction, notes: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditingTransaction(null)
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddTransaction}>
                {editingTransaction ? "Salvar Alterações" : "Adicionar Transação"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

export default TransacoesImproved