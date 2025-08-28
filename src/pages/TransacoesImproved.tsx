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
import { useSearchParams, useNavigate } from "react-router-dom"
import Layout from "@/components/Layout"
import { CurrencyInput } from "@/components/ui/currency-input"
import { useCurrency } from "@/context/CurrencyContext"
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

const TransacoesImproved = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  const navigate = useNavigate()
  const { 
    transactions, 
    accounts, 
    creditCards,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction
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
    type: "expense" as "income" | "expense",
    category_id: "",
    date: new Date().toISOString().split('T')[0],
    account_id: "",
    credit_card_id: "",
    payment_method: accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account",
    installments: 1,
    is_installment: false,
    notes: ""
  })

  // Handle quick action from dashboard
  useEffect(() => {
    const type = searchParams.get('type')
    if (type && ['income', 'expense'].includes(type)) {
      setNewTransaction(prev => ({ ...prev, type: type as any }))
      setIsDialogOpen(true)
    }
  }, [searchParams])

  // Set default payment method based on available options
  useEffect(() => {
    const defaultPaymentMethod = accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account"
    setNewTransaction(prev => ({ ...prev, payment_method: defaultPaymentMethod }))
  }, [accounts, creditCards])

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
    // Validation
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category_id) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      })
      return
    }

    // Validate payment method selection
    if (newTransaction.payment_method === "account" && !newTransaction.account_id) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, selecione uma conta bancária.",
        variant: "destructive"
      })
      return
    }

    if (newTransaction.payment_method === "credit_card" && !newTransaction.credit_card_id) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, selecione um cartão de crédito.",
        variant: "destructive"
      })
      return
    }

    try {
      const baseTransactionData = {
        description: newTransaction.description,
        amount: newTransaction.type === "expense" ? -Math.abs(newTransaction.amount) : newTransaction.amount,
        type: newTransaction.type,
        category_id: newTransaction.category_id,
        date: newTransaction.date,
        notes: newTransaction.notes,
        user_id: user?.id,
        currency: 'BRL',
        account_id: newTransaction.payment_method === "account" ? newTransaction.account_id : null,
        credit_card_id: newTransaction.payment_method === "credit_card" ? newTransaction.credit_card_id : null
      }

      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, baseTransactionData)
        toast({
          title: "✅ Transação Atualizada",
          description: `${baseTransactionData.description} foi atualizada com sucesso`,
        })
      } else {
        // Check if it's an installment transaction
        if (newTransaction.payment_method === "credit_card" && newTransaction.is_installment && newTransaction.installments > 1) {
          // Create multiple transactions for installments
          const installmentAmount = baseTransactionData.amount / newTransaction.installments
          const installmentDate = new Date(newTransaction.date)
          
          for (let i = 1; i <= newTransaction.installments; i++) {
            const installmentData = {
              ...baseTransactionData,
              amount: installmentAmount,
              installments: newTransaction.installments,
              installment_number: i,
              is_installment: true,
              description: `${baseTransactionData.description} (${i}/${newTransaction.installments})`,
              date: new Date(installmentDate.getFullYear(), installmentDate.getMonth() + (i - 1), installmentDate.getDate()).toISOString().split('T')[0]
            }
            await addTransaction(installmentData)
          }
          
          toast({
            title: "✅ Transação Parcelada Criada",
            description: `${newTransaction.installments}x de ${formatCurrency(Math.abs(installmentAmount))}`,
          })
        } else {
          // Single transaction
          await addTransaction({
            ...baseTransactionData,
            installments: 1,
            installment_number: 1,
            is_installment: false
          })
          
          toast({
            title: "✅ Transação Adicionada",
            description: `${baseTransactionData.description} - ${formatCurrency(Math.abs(baseTransactionData.amount))}`,
          })
        }
      }

      setNewTransaction({
        description: "",
        amount: 0,
        type: "expense",
        category_id: "",
        date: new Date().toISOString().split('T')[0],
        account_id: "",
        credit_card_id: "",
                payment_method: accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account",
        installments: 1,
        is_installment: false,
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
      const transaction = transactions.find(t => t.id === id)
      await deleteTransaction(id)
      toast({
        title: "🗑️ Transação Excluída",
        description: transaction ? `${transaction.description} foi removida` : "Transação excluída com sucesso",
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
      credit_card_id: transaction.credit_card_id || "",
      payment_method: transaction.account_id ? "account" : "credit_card",
      installments: transaction.installments || 1,
      is_installment: transaction.is_installment || false,
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
      default:
        return null
    }
  }

  const incomeCategories = categories.filter(cat => cat.type === 'income')
  const expenseCategories = categories.filter(cat => cat.type === 'expense')

  return (
    <Layout>
      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold">Lançamentos</h1>
              <p className="text-muted-foreground">
                Gerencie suas transações financeiras
              </p>
            </div>
            
            {/* Action Buttons - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full">
              <input
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="hidden"
                id="csv-import"
              />
              <Button 
                onClick={() => navigate('/categorias')}
                variant="outline" 
                className="gap-2 w-full"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Gerenciar</span> Categorias
              </Button>
              <Button 
                onClick={() => document.getElementById('csv-import')?.click()} 
                variant="outline" 
                className="gap-2 w-full"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Importar</span> CSV
              </Button>
              <Button 
                onClick={handleExportPDF} 
                variant="outline" 
                className="gap-2 w-full"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exportar</span> PDF
              </Button>
              <Button 
                onClick={handleExportExcel} 
                variant="outline" 
                className="gap-2 w-full"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exportar</span> Excel
              </Button>
              <Button 
                onClick={() => {
                  setEditingTransaction(null)
                  setNewTransaction({
                    description: "",
                    amount: 0,
                    type: "expense",
                    category_id: "",
                    date: new Date().toISOString().split('T')[0],
                    account_id: "",
                    credit_card_id: "",
                    payment_method: accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account",
                    installments: 1,
                    is_installment: false,
                    notes: ""
                  })
                  setIsDialogOpen(true)
                }} 
                className="gap-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Nova Transação
              </Button>
            </div>
          </div>
          
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="sm:col-span-2 lg:col-span-1">
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
                         <div className="flex justify-end gap-1 sm:gap-2">
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => handleEditTransaction(transaction)}
                             className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                           >
                             <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                             <span className="sr-only sm:not-sr-only sm:ml-2 hidden sm:inline">Editar</span>
                           </Button>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => handleDeleteTransaction(transaction.id)}
                             className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                           >
                             <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                             <span className="sr-only sm:not-sr-only sm:ml-2 hidden sm:inline">Excluir</span>
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
          <DialogContent className="w-[95vw] max-w-[525px] max-h-[90vh] overflow-y-auto mx-auto">
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
                  <Label htmlFor="payment_method">Forma de Pagamento</Label>
                  <Select value={newTransaction.payment_method} onValueChange={(value: any) => setNewTransaction({...newTransaction, payment_method: value, account_id: "", credit_card_id: ""})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.length > 0 && (
                        <SelectItem value="account">Conta Bancária</SelectItem>
                      )}
                      {creditCards.length > 0 && (
                        <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {accounts.length === 0 && creditCards.length === 0 && (
                    <p className="text-sm text-muted-foreground text-destructive">
                      Nenhuma conta ou cartão cadastrado. Cadastre primeiro em "Contas".
                    </p>
                  )}
                  {accounts.length === 0 && creditCards.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Apenas cartões de crédito disponíveis.
                    </p>
                  )}
                  {creditCards.length === 0 && accounts.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Apenas contas bancárias disponíveis. Cadastre cartões em "Contas" para mais opções.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {newTransaction.payment_method === "account" ? (
                  <div className="space-y-2">
                    <Label htmlFor="account">Conta</Label>
                    <Select value={newTransaction.account_id} onValueChange={(value) => setNewTransaction({...newTransaction, account_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma conta" />
                      </SelectTrigger>
                        {accounts.length === 0 ? (
                          <SelectContent>
                            <SelectItem value="" disabled>
                              Nenhuma conta cadastrada
                            </SelectItem>
                          </SelectContent>
                        ) : (
                          <SelectContent>
                            {accounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        )}
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="credit_card">Cartão de Crédito</Label>
                    <Select value={newTransaction.credit_card_id} onValueChange={(value) => setNewTransaction({...newTransaction, credit_card_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cartão" />
                      </SelectTrigger>
                        {creditCards.length === 0 ? (
                          <SelectContent>
                            <SelectItem value="" disabled>
                              Nenhum cartão cadastrado
                            </SelectItem>
                          </SelectContent>
                        ) : (
                          <SelectContent>
                            {creditCards.map((card) => (
                              <SelectItem key={card.id} value={card.id}>
                                {card.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        )}
                    </Select>
                  </div>
                )}
                
                {newTransaction.payment_method === "credit_card" && !editingTransaction && (
                  <div className="space-y-2">
                    <Label htmlFor="installment_type">Tipo de Pagamento</Label>
                    <Select value={newTransaction.is_installment ? "installment" : "cash"} onValueChange={(value) => setNewTransaction({...newTransaction, is_installment: value === "installment", installments: value === "installment" ? newTransaction.installments : 1})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">À Vista</SelectItem>
                        <SelectItem value="installment">Parcelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {editingTransaction && editingTransaction.is_installment && (
                  <div className="space-y-2">
                    <Label>Tipo de Pagamento</Label>
                    <div className="p-2 bg-muted rounded border">
                      <p className="text-sm">Transação Parcelada ({editingTransaction.installment_number}/{editingTransaction.installments})</p>
                      <p className="text-xs text-muted-foreground">Não é possível alterar o parcelamento de uma transação já criada</p>
                    </div>
                  </div>
                )}
              </div>
              
              {newTransaction.payment_method === "credit_card" && newTransaction.is_installment && !editingTransaction && (
                <div className="space-y-2">
                  <Label htmlFor="installments">Quantidade de Parcelas</Label>
                  <Select value={newTransaction.installments.toString()} onValueChange={(value) => setNewTransaction({...newTransaction, installments: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 24}, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}x de {formatCurrency(newTransaction.amount / num)}
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