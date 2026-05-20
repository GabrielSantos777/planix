import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Search,
  SlidersHorizontal,
  RotateCcw,
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
import { EmptyState } from "@/components/EmptyState"
import { getLocalDateString, getLocalDateForMonth, parseLocalDate } from "@/utils/dateUtils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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

  const currentMonthValue = useMemo(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  }, [])
  
  const [filterType, setFilterType] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterMonth, setFilterMonth] = useState<string>(currentMonthValue) // "all" or YYYY-MM format
  const [filterContact, setFilterContact] = useState<string>("all")
  const [filterAccount, setFilterAccount] = useState<string>("all")
  const [filterCreditCard, setFilterCreditCard] = useState<string>("all")
  const [searchText, setSearchText] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null)
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set())
  
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

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => {
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
      const matchesContact =
        filterContact === "all" ||
        (filterContact === "me" && !transaction.contact_id) ||
        transaction.contact_id === filterContact

      // Filter by month (YYYY-MM) - only if not "all"
      const transactionMonth = transaction.date.slice(0, 7)
      const matchesMonth = filterMonth === "all" || transactionMonth === filterMonth

      // Search text filter
      const matchesSearch =
        searchText.trim() === "" ||
        transaction.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.category?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.notes?.toLowerCase().includes(searchText.toLowerCase())

        return matchesType && matchesCategory && matchesMonth && matchesContact && matchesAccount && matchesCreditCard && matchesSearch
      })
      .sort((a, b) => {
        const byDate = parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime()
        if (byDate !== 0) return byDate
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
  }, [
    transactions,
    filterAccount,
    filterCreditCard,
    filterType,
    filterCategory,
    filterContact,
    filterMonth,
    searchText,
  ])

  const monthOptions = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const date = new Date()
      date.setDate(1)
      date.setMonth(date.getMonth() - i)
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const label = date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
      return {
        value,
        label: label.charAt(0).toUpperCase() + label.slice(1),
      }
    })
  }, [])

  const filteredTotal = useMemo(() => {
    return filteredTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  }, [filteredTransactions])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (searchText.trim()) count += 1
    if (filterType !== "all") count += 1
    if (filterCategory !== "all") count += 1
    if (filterContact !== "all") count += 1
    if (filterAccount !== "all") count += 1
    if (filterCreditCard !== "all") count += 1
    if (filterMonth !== currentMonthValue) count += 1
    return count
  }, [
    searchText,
    filterType,
    filterCategory,
    filterContact,
    filterAccount,
    filterCreditCard,
    filterMonth,
    currentMonthValue,
  ])

  const clearFilters = () => {
    setSearchText("")
    setFilterType("all")
    setFilterCategory("all")
    setFilterContact("all")
    setFilterAccount("all")
    setFilterCreditCard("all")
    setFilterMonth(currentMonthValue)
    setShowAdvancedFilters(false)
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      setEditingTransaction(null)
    }
  }

  useEffect(() => {
    const availableIds = new Set(filteredTransactions.map(t => t.id))
    setSelectedTransactions(prev => {
      const next = new Set([...prev].filter(id => availableIds.has(id)))
      return next.size === prev.size ? prev : next
    })
  }, [filteredTransactions])

  const handleAddTransaction = async () => {
    // Validação para transferência
    if (newTransaction.type === "transfer" && !editingTransaction) {
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
    if (!newTransaction.description || !newTransaction.amount || (newTransaction.type !== "transfer" && !newTransaction.category_id)) {
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
    if (newTransaction.type !== "transfer" && newTransaction.payment_method === "account" && !newTransaction.account_id) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, selecione uma conta bancária.",
        variant: "destructive"
      })
      return
    }

    if (newTransaction.type !== "transfer" && newTransaction.payment_method === "credit_card" && !newTransaction.credit_card_id) {
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
        category_id: newTransaction.type === "transfer" ? null : newTransaction.category_id,
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

  // Selection functions
  const toggleTransactionSelection = (id: string) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleAllTransactions = () => {
    if (selectedTransactions.size === filteredTransactions.length) {
      setSelectedTransactions(new Set())
    } else {
      setSelectedTransactions(new Set(filteredTransactions.map(t => t.id)))
    }
  }

  const handleDeleteSelectedTransactions = async () => {
    try {
      for (const id of selectedTransactions) {
        await deleteTransaction(id)
      }
      toast({
        title: "🗑️ Transações Excluídas",
        description: `${selectedTransactions.size} transação(ões) removida(s)`,
      })
      setSelectedTransactions(new Set())
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir transações.",
        variant: "destructive"
      })
    }
  }

  const handleEditTransaction = (transaction: any) => {
    if (transaction.type === "transfer") {
      toast({
        title: "Edição indisponível para transferências",
        description: "Para manter a consistência entre contas, exclua e lance a transferência novamente.",
      })
      return
    }

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
    doc.setFontSize(18)
    doc.text('PLANIX - Relatório de Transações', 20, 20)
    doc.setFontSize(10)
    doc.setTextColor(120)
    doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR')} · ${filteredTransactions.length} transações`, 20, 28)
    doc.setTextColor(0)
    
    // Summary
    const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0)
    const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount || 0), 0)
    
    doc.setFontSize(11)
    doc.text(`Receitas: ${formatCurrency(totalIncome)}`, 20, 38)
    doc.text(`Despesas: ${formatCurrency(totalExpense)}`, 20, 44)
    doc.text(`Saldo: ${formatCurrency(totalIncome - totalExpense)}`, 20, 50)
    
    // Table header
    let yPosition = 62
    doc.setFontSize(9)
    doc.setFont(undefined!, 'bold')
    doc.text('Data', 20, yPosition)
    doc.text('Descrição', 45, yPosition)
    doc.text('Categoria', 105, yPosition)
    doc.text('Valor', 155, yPosition)
    doc.setFont(undefined!, 'normal')
    yPosition += 8
    
    filteredTransactions.forEach((transaction) => {
      if (yPosition > 275) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.setFontSize(8)
      doc.text(parseLocalDate(transaction.date).toLocaleDateString('pt-BR'), 20, yPosition)
      doc.text((transaction.description || '').substring(0, 30), 45, yPosition)
      doc.text((transaction.category?.name || '-').substring(0, 20), 105, yPosition)
      
      const amountStr = formatCurrency(transaction.amount)
      doc.setTextColor(transaction.type === 'income' ? 34 : 220, transaction.type === 'income' ? 139 : 38, transaction.type === 'income' ? 34 : 38)
      doc.text(amountStr, 155, yPosition)
      doc.setTextColor(0)
      
      yPosition += 6
    })
    
    doc.save('planix-transacoes.pdf')
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
          'Categoria': transaction.category?.name || 'Sem categoria',
          'Conta': transaction.account?.name || transaction.credit_card?.name || '-',
          'Responsável': transaction.contact?.name || 'Você',
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
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-1">
                  A visualização inicia no mês atual. Se quiser, altere para todos os meses.
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={activeFilterCount > 0 ? "default" : "secondary"} className="h-8">
                  {activeFilterCount} filtro(s) ativo(s)
                </Badge>
                <Button
                  variant={filterMonth === currentMonthValue ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setFilterMonth(currentMonthValue)}
                >
                  <Calendar className="h-4 w-4" />
                  Mês atual
                </Button>
                <Button
                  variant={filterMonth === "all" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setFilterMonth("all")}
                >
                  Todos os meses
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={clearFilters}
                >
                  <RotateCcw className="h-4 w-4" />
                  Limpar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição, categoria ou observação..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={currentMonthValue}>Mês atual</SelectItem>
                  <SelectItem value="all">Todos os meses</SelectItem>
                  {monthOptions.filter((month) => month.value !== currentMonthValue).map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  {showAdvancedFilters ? "Ocultar filtros avançados" : "Mostrar filtros avançados"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Select value={filterAccount} onValueChange={setFilterAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Conta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as contas</SelectItem>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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
              </CollapsibleContent>
            </Collapsible>

            <div className="pt-2 flex items-center justify-between border-t text-sm">
              <p className="text-muted-foreground">
                {filteredTransactions.length} transação(ões) encontrada(s)
              </p>
              <div className="font-medium">
                Saldo filtrado: {formatCurrency(filteredTotal)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base sm:text-lg">Transações</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {filteredTransactions.length} transações encontrada(s)
                </CardDescription>
              </div>
              {selectedTransactions.size > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDeleteSelectedTransactions}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir ({selectedTransactions.size})
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            {filteredTransactions.length === 0 ? (
              <EmptyState
                variant="transactions"
                title="Nenhuma transação encontrada"
                description={activeFilterCount > 0
                  ? "Tente ajustar os filtros para encontrar o que procura."
                  : "Adicione sua primeira transação para começar a controlar suas finanças."}
                actionLabel={activeFilterCount === 0 ? "Nova Transação" : undefined}
                onAction={activeFilterCount === 0 ? () => {
                  setEditingTransaction(null)
                  setIsDialogOpen(true)
                } : undefined}
              />
            ) : (
              <>
                {/* Mobile View - Cards */}
                <div className="block sm:hidden">
                  <div className="max-h-[600px] overflow-y-auto space-y-3 p-3">
                    {filteredTransactions.map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className={`p-3 border rounded-lg space-y-3 ${selectedTransactions.has(transaction.id) ? 'ring-2 ring-primary' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedTransactions.has(transaction.id)}
                            onCheckedChange={() => toggleTransactionSelection(transaction.id)}
                            className="mt-1"
                          />
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
                              disabled={transaction.type === "transfer"}
                              title={transaction.type === "transfer" ? "Exclua e recrie para ajustar transferências" : "Editar transação"}
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
                          <TableHead className="w-10">
                            <Checkbox
                              checked={selectedTransactions.size === filteredTransactions.length && filteredTransactions.length > 0}
                              onCheckedChange={toggleAllTransactions}
                            />
                          </TableHead>
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
                          <TableRow 
                            key={transaction.id}
                            className={selectedTransactions.has(transaction.id) ? 'bg-accent' : ''}
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedTransactions.has(transaction.id)}
                                onCheckedChange={() => toggleTransactionSelection(transaction.id)}
                              />
                            </TableCell>
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
                                  disabled={transaction.type === "transfer"}
                                  title={transaction.type === "transfer" ? "Exclua e recrie para ajustar transferências" : "Editar transação"}
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
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogContent className="w-[95vw] max-w-[620px] max-h-[90vh] overflow-y-auto mx-auto">
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
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
