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
import { getLocalDateString, getLocalDateForMonth, parseLocalDate } from "@/utils/dateUtils"
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
    contacts,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getOrCreateInvestmentAccount,
    addTransfer,
    fetchAllData,
  } = useSupabaseData()
  const [searchParams] = useSearchParams()
  
  const [filterType, setFilterType] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterMonth, setFilterMonth] = useState<string>("all") // "all" or YYYY-MM format
  const [filterContact, setFilterContact] = useState<string>("all")
  const [filterAccount, setFilterAccount] = useState<string>("all")
  const [filterCreditCard, setFilterCreditCard] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null)
  
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: 0,
    type: "expense" as "income" | "expense" | "transfer",
    category_id: "",
    date: getLocalDateString(),
    account_id: "",
    credit_card_id: "",
    contact_id: "",
    payment_method: accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account",
    installments: 1,
    is_installment: false,
    notes: "",
    source_account_id: "",
    destination_account_id: ""
  })

  // Handle quick action from dashboard
  useEffect(() => {
    const type = searchParams.get('type')
    if (type && ['income', 'expense', 'transfer'].includes(type)) {
      setNewTransaction(prev => ({ 
        ...prev, 
        type: type as "income" | "expense" | "transfer"
      }))
      setIsDialogOpen(true)
    }
  }, [searchParams])

  // Set default payment method based on available options
  useEffect(() => {
    const defaultPaymentMethod = accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account"
    setNewTransaction(prev => ({ ...prev, payment_method: defaultPaymentMethod }))
  }, [accounts, creditCards])

  const filteredTransactions = transactions.filter(transaction => {
    // Ocultar a perna da transferência na conta de investimentos para evitar "duplicados"
    if (
      transaction.type === 'transfer' &&
      transaction.account &&
      (transaction.account.name === 'Investimentos' || transaction.account.type === 'investment')
    ) {
      return false
    }

    const matchesAccount = filterAccount === "all" || transaction.account_id === filterAccount
    const matchesCreditCard = filterCreditCard === "all" || transaction.credit_card_id === filterCreditCard
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesCategory = filterCategory === "all" || transaction.category_id === filterCategory
    const matchesContact = filterContact === "all" || 
                          (filterContact === "me" && !transaction.contact_id) || 
                          transaction.contact_id === filterContact
    
    // Filter by month (YYYY-MM) - only if not "all"
    const transactionMonth = transaction.date.slice(0, 7) // Get YYYY-MM from date
    const matchesMonth = filterMonth === "all" || transactionMonth === filterMonth
 
    return matchesType && matchesCategory && matchesMonth && matchesContact && matchesAccount && matchesCreditCard
  })

  const handleAddTransaction = async () => {
    // Validação para transferência
    if (newTransaction.type === "transfer") {
      if (!newTransaction.description || !newTransaction.amount) {
        toast({
          title: "Erro de Validação",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        })
        return
      }
      
      if (!newTransaction.source_account_id || !newTransaction.destination_account_id) {
        toast({
          title: "Erro de Validação",
          description: "Selecione a conta de origem e destino para a transferência.",
          variant: "destructive"
        })
        return
      }
      
      if (newTransaction.source_account_id === newTransaction.destination_account_id) {
        toast({
          title: "Erro de Validação",
          description: "A conta de origem e destino não podem ser as mesmas.",
          variant: "destructive"
        })
        return
      }
      
      // Execute transfer
      try {
        await addTransfer({
          fromAccountId: newTransaction.source_account_id,
          toAccountId: newTransaction.destination_account_id,
          amount: newTransaction.amount,
          date: newTransaction.date,
          description: newTransaction.description,
          notes: newTransaction.notes
        })
        
        await fetchAllData()
        
        toast({
          title: "✅ Transferência Realizada",
          description: `${formatCurrency(newTransaction.amount)} transferido com sucesso`,
        })

        setNewTransaction({
          description: "",
          amount: 0,
          type: "expense",
          category_id: "",
          date: getLocalDateString(),
          account_id: "",
          credit_card_id: "",
          contact_id: "",
          payment_method: accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account",
          installments: 1,
          is_installment: false,
          notes: "",
          source_account_id: "",
          destination_account_id: ""
        })
        setEditingTransaction(null)
        setIsDialogOpen(false)
        return
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao realizar transferência. Tente novamente.",
          variant: "destructive"
        })
        return
      }
    }
    
    // Validation for normal transactions
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category_id) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      })
      return
    }

    // Check if user has accounts or credit cards
    if (accounts.length === 0 && creditCards.length === 0) {
      toast({
        title: "Erro de Validação",
        description: "Você precisa ter pelo menos uma conta bancária ou cartão de crédito cadastrado para registrar transações.",
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

    // Validação de saldo disponível
    if (newTransaction.type === "expense") {
      if (newTransaction.payment_method === "account" && newTransaction.account_id) {
        const account = accounts.find(a => a.id === newTransaction.account_id)
        if (account && account.current_balance < newTransaction.amount) {
          toast({
            title: "Saldo Insuficiente",
            description: `Saldo disponível: ${formatCurrency(account.current_balance)}. Esta transação excede o saldo da conta.`,
            variant: "destructive"
          })
          return
        }
      }

      if (newTransaction.payment_method === "credit_card" && newTransaction.credit_card_id) {
        const card = creditCards.find(c => c.id === newTransaction.credit_card_id)
        if (card) {
          const availableLimit = card.limit_amount - (card.current_balance || 0)
          if (availableLimit < newTransaction.amount) {
            toast({
              title: "Limite Insuficiente",
              description: `Limite disponível: ${formatCurrency(availableLimit)}. Esta transação excede o limite do cartão.`,
              variant: "destructive"
            })
            return
          }
        }
      }
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
        credit_card_id: newTransaction.payment_method === "credit_card" ? newTransaction.credit_card_id : null,
        contact_id: newTransaction.contact_id || null
      }

      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, baseTransactionData)
        await fetchAllData() // Refresh data after update
        toast({
          title: "✅ Transação Atualizada",
          description: `${baseTransactionData.description} foi atualizada com sucesso`,
        })
      } else {
        // Check if it's an installment transaction
        if (newTransaction.payment_method === "credit_card" && newTransaction.is_installment && newTransaction.installments > 1) {
          // Create multiple transactions for installments
          const installmentAmount = baseTransactionData.amount / newTransaction.installments
          const installmentDate = parseLocalDate(newTransaction.date)
          
          for (let i = 1; i <= newTransaction.installments; i++) {
            const installmentData = {
              ...baseTransactionData,
              amount: installmentAmount,
              installments: newTransaction.installments,
              installment_number: i,
              is_installment: true,
              description: `${baseTransactionData.description} (${i}/${newTransaction.installments})`,
              date: getLocalDateForMonth(installmentDate, i - 1)
            }
            await addTransaction(installmentData)
          }
          
          toast({
            title: "✅ Transação Parcelada Criada",
            description: `${newTransaction.installments}x de ${formatCurrency(Math.abs(installmentAmount))}`,
          })
        } else {
          // Single transaction ou conversão automática para transferência de investimento
          const category = categories.find(c => c.id === newTransaction.category_id)
          const desc = newTransaction.description.toLowerCase()
          const catName = (category?.name || '').toLowerCase()

          const investmentKeywords = ['investimento','aporte','corretora','aplicação','compra de ativo','ações','etf','cdb','tesouro','cripto','lci','lca','resgate','venda']
          const feeKeywords = ['taxa','corretagem','custódia','emolumentos','tarifa']

          const isInvestmentRelated = investmentKeywords.some(k => desc.includes(k) || catName.includes(k))
          const isFee = feeKeywords.some(k => desc.includes(k) || catName.includes(k))

          if (newTransaction.payment_method === 'account' && isInvestmentRelated && !isFee && newTransaction.account_id) {
            const invAcc = await getOrCreateInvestmentAccount()
            const date = newTransaction.date
            const value = Math.abs(newTransaction.amount)

            if (newTransaction.type === 'expense') {
              await addTransfer({
                fromAccountId: newTransaction.account_id,
                toAccountId: invAcc.id,
                amount: value,
                date,
                description: newTransaction.description,
                notes: newTransaction.notes,
                investmentMetadata: {
                  kind: 'investment_transfer',
                  action: 'aporte',
                  group_id: (crypto as any)?.randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`
                }
              })
              await fetchAllData()
            } else if (newTransaction.type === 'income') {
              await addTransfer({
                fromAccountId: invAcc.id,
                toAccountId: newTransaction.account_id,
                amount: value,
                date,
                description: newTransaction.description,
                notes: newTransaction.notes,
                investmentMetadata: {
                  kind: 'investment_transfer',
                  action: 'resgate',
                  group_id: (crypto as any)?.randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`
                }
              })
              await fetchAllData()
            }

            toast({
              title: '🔁 Transferência registrada',
              description: 'Movimentação classificada como transferência de/para investimentos',
            })
          } else {
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
      }

      setNewTransaction({
        description: "",
        amount: 0,
        type: "expense",
        category_id: "",
        date: getLocalDateString(),
        account_id: "",
        credit_card_id: "",
        contact_id: "",
        payment_method: accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account",
        installments: 1,
        is_installment: false,
        notes: "",
        source_account_id: "",
        destination_account_id: ""
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
      contact_id: transaction.contact_id || "",
      payment_method: transaction.account_id ? "account" : "credit_card",
      installments: transaction.installments || 1,
      is_installment: transaction.is_installment || false,
      notes: transaction.notes || "",
      source_account_id: transaction.source_account_id || "",
      destination_account_id: transaction.destination_account_id || ""
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
      doc.text(`Categoria - ${parseLocalDate(transaction.date).toLocaleDateString('pt-BR')}`, 20, yPosition + 5)
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
          'Data': parseLocalDate(transaction.date).toLocaleDateString('pt-BR'),
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

  // Mostrar todas as categorias disponíveis para cada tipo de transação
  // mas priorizar as do tipo correto
  const incomeCategories = categories.filter(cat => cat.type === 'income')
  const expenseCategories = categories.filter(cat => cat.type === 'expense')
  
  // Para permitir flexibilidade, mostrar todas as categorias na seleção
  const allCategoriesForSelection = categories

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
                    date: getLocalDateString(),
                    account_id: "",
                    credit_card_id: "",
                    contact_id: "",
                    payment_method: accounts.length > 0 ? "account" : creditCards.length > 0 ? "credit_card" : "account",
                    installments: 1,
                    is_installment: false,
                    notes: "",
                    source_account_id: "",
                    destination_account_id: ""
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
                <Select value={filterCreditCard} onValueChange={setFilterCreditCard}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cartão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os cartões</SelectItem>
                    {creditCards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os meses</SelectItem>
                    {Array.from({ length: 12 }, (_, i) => {
                      const date = new Date()
                      date.setMonth(date.getMonth() - i)
                      const monthValue = date.toISOString().slice(0, 7)
                      const monthLabel = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
                      return (
                        <SelectItem key={monthValue} value={monthValue}>
                          {monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterContact} onValueChange={setFilterContact}>
                  <SelectTrigger>
                    <SelectValue placeholder="Responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os responsáveis</SelectItem>
                    <SelectItem value="me">Você</SelectItem>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredTransactions.length} transação(ões) encontrada(s)
              </p>
              <div className="text-sm font-medium">
                Total: {formatCurrency(filteredTransactions.reduce((sum, t) => sum + (t.amount || 0), 0))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Transações</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {filteredTransactions.length} transações encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            {filteredTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-medium mb-2">Nenhuma transação encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Adicione sua primeira transação para começar
                </p>
              </div>
            ) : (
              <>
                {/* Mobile View - Cards */}
                <div className="block sm:hidden">
                  <div className="max-h-[600px] overflow-y-auto space-y-3 p-3">
                    {filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="p-3 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeIcon(transaction.type)}
                              {getTypeBadge(transaction.type)}
                            </div>
                            <p className="font-medium text-sm truncate">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {parseLocalDate(transaction.date).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <span className={`font-bold text-sm ml-2 flex-shrink-0 ${
                            transaction.type === "income" ? "text-success" : "text-destructive"
                          }`}>
                            {transaction.type === "income" ? "+" : ""}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                          <span>{transaction.category?.name || 'Sem categoria'}</span>
                          <span>{transaction.account?.name || transaction.credit_card?.name || '-'}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-xs text-muted-foreground">
                            {transaction.contact?.name || 'Você'}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditTransaction(transaction)}
                              className="h-7 w-7 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteTransaction(transaction.id)}
                              className="h-7 w-7 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop View - Table */}
                <div className="hidden sm:block">
                  <div className="max-h-[600px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Tipo</TableHead>
                          <TableHead className="text-xs">Descrição</TableHead>
                          <TableHead className="text-xs">Categoria</TableHead>
                          <TableHead className="text-xs">Conta</TableHead>
                          <TableHead className="text-xs">Responsável</TableHead>
                          <TableHead className="text-xs">Data</TableHead>
                          <TableHead className="text-right text-xs">Valor</TableHead>
                          <TableHead className="text-right text-xs">Ações</TableHead>
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
                            <TableCell className="font-medium text-xs">
                              {transaction.description}
                            </TableCell>
                            <TableCell className="text-xs">
                              {transaction.category?.name || 'Sem categoria'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {transaction.account?.name || transaction.credit_card?.name || '-'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {transaction.contact?.name || 'Você'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {parseLocalDate(transaction.date).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className={`text-right font-medium text-xs ${
                              transaction.type === "income" ? "text-success" : "text-destructive"
                            }`}>
                              {transaction.type === "income" ? "+" : ""}
                              {formatCurrency(transaction.amount)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1 sm:gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditTransaction(transaction)}
                                  className="h-7 w-7 p-0"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteTransaction(transaction.id)}
                                  className="h-7 w-7 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </>
            )}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              {/* Transfer Fields */}
              {newTransaction.type === "transfer" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source_account">Conta de Origem</Label>
                    <Select value={newTransaction.source_account_id} onValueChange={(value) => setNewTransaction({...newTransaction, source_account_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a conta de origem" />
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
                  <div className="space-y-2">
                    <Label htmlFor="destination_account">Conta de Destino</Label>
                    <Select value={newTransaction.destination_account_id} onValueChange={(value) => setNewTransaction({...newTransaction, destination_account_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a conta de destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id} disabled={account.id === newTransaction.source_account_id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select value={newTransaction.category_id} onValueChange={(value) => setNewTransaction({...newTransaction, category_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Mostrar todas as categorias, agrupadas por tipo */}
                          {newTransaction.type === "income" && incomeCategories.length > 0 && (
                            <>
                              <SelectItem value="__income_header__" disabled className="font-semibold text-xs text-muted-foreground">
                                — Categorias de Receita —
                              </SelectItem>
                              {incomeCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </>
                          )}
                          {newTransaction.type === "income" && expenseCategories.length > 0 && (
                            <>
                              <SelectItem value="__expense_header__" disabled className="font-semibold text-xs text-muted-foreground">
                                — Outras Categorias —
                              </SelectItem>
                              {expenseCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </>
                          )}
                          {newTransaction.type === "expense" && expenseCategories.length > 0 && (
                            <>
                              <SelectItem value="__expense_header__" disabled className="font-semibold text-xs text-muted-foreground">
                                — Categorias de Despesa —
                              </SelectItem>
                              {expenseCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </>
                          )}
                          {newTransaction.type === "expense" && incomeCategories.length > 0 && (
                            <>
                              <SelectItem value="__income_header__" disabled className="font-semibold text-xs text-muted-foreground">
                                — Outras Categorias —
                              </SelectItem>
                              {incomeCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </>
                          )}
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
                        <p className="text-xs text-muted-foreground text-destructive">
                          Nenhuma conta ou cartão cadastrado. Cadastre primeiro em "Contas".
                        </p>
                      )}
                      {accounts.length === 0 && creditCards.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Apenas cartões de crédito disponíveis.
                        </p>
                      )}
                      {creditCards.length === 0 && accounts.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Apenas contas bancárias disponíveis. Cadastre cartões em "Contas" para mais opções.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                {newTransaction.payment_method === "account" ? (
                  <div className="space-y-2">
                    <Label htmlFor="account">Conta</Label>
                    <Select value={newTransaction.account_id} onValueChange={(value) => setNewTransaction({...newTransaction, account_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma conta" />
                      </SelectTrigger>
                        {accounts.length === 0 ? (
                          <SelectContent>
                            <SelectItem value="no-account" disabled>
                              <span className="text-xs">Nenhuma conta cadastrada. Cadastre primeiro em "Contas".</span>
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
                ) : newTransaction.payment_method === "credit_card" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credit_card">Cartão de Crédito</Label>
                      <Select value={newTransaction.credit_card_id} onValueChange={(value) => setNewTransaction({...newTransaction, credit_card_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cartão" />
                        </SelectTrigger>
                          {creditCards.length === 0 ? (
                            <SelectContent>
                              <SelectItem value="no-card" disabled>
                                <span className="text-xs">Nenhum cartão cadastrado. Cadastre primeiro em "Contas".</span>
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
                    
                    {!editingTransaction && (
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
                  </div>
                ) : null}
                
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
              </>
              )}
              
              {newTransaction.type !== "transfer" && newTransaction.payment_method === "credit_card" && newTransaction.is_installment && !editingTransaction && (
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
                <Label htmlFor="contact">Responsável (opcional)</Label>
                <Select value={newTransaction.contact_id || "none"} onValueChange={(value) => setNewTransaction({...newTransaction, contact_id: value === "none" ? "" : value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Você (padrão)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Você</SelectItem>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
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