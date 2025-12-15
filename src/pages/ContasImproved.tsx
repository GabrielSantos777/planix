import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrencyInput } from "@/components/ui/currency-input-fixed"
import { Checkbox } from "@/components/ui/checkbox"
import { banks } from "@/data/banks"
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CreditCard, 
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Layout from "@/components/Layout"
import { CreditCardInvoices } from "@/components/CreditCardInvoices"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel"
import { getBestPurchaseDay } from "@/hooks/useCreditCardInvoice"

const accountTypeLabels = {
  bank: "Conta Corrente",
  savings: "Poupança", 
  investment: "Investimento"
}

const cardTypeLabels = {
  visa: "Visa",
  mastercard: "Mastercard",
  elo: "Elo",
  amex: "American Express"
}

// Interface for monthly invoice
interface MonthlyInvoice {
  month: number
  year: number
  transactions: any[]
  total: number
  dueDate: Date
  status: 'open' | 'closed' | 'paid'
}

export default function ContasImproved() {
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  
  // Usar o hook personalizado para dados do Supabase
  const { 
    accounts, 
    creditCards, 
    transactions, 
    investments,
    addAccount, 
    updateAccount, 
    deleteAccount, 
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    loading
  } = useSupabaseData()

  // Carousel state
  const [accountCarouselApi, setAccountCarouselApi] = useState<CarouselApi>()
  const [creditCardCarouselApi, setCreditCardCarouselApi] = useState<CarouselApi>()
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0)
  const [selectedCreditCardIndex, setSelectedCreditCardIndex] = useState(0)

  // Sync carousel with selected index
  useEffect(() => {
    if (accountCarouselApi) {
      accountCarouselApi.scrollTo(selectedAccountIndex)
    }
  }, [selectedAccountIndex, accountCarouselApi])

  useEffect(() => {
    if (creditCardCarouselApi) {
      creditCardCarouselApi.scrollTo(selectedCreditCardIndex)
    }
  }, [selectedCreditCardIndex, creditCardCarouselApi])

  // Listen to carousel changes
  useEffect(() => {
    if (!accountCarouselApi) return
    
    accountCarouselApi.on("select", () => {
      setSelectedAccountIndex(accountCarouselApi.selectedScrollSnap())
    })
  }, [accountCarouselApi])

  useEffect(() => {
    if (!creditCardCarouselApi) return
    
    creditCardCarouselApi.on("select", () => {
      setSelectedCreditCardIndex(creditCardCarouselApi.selectedScrollSnap())
    })
  }, [creditCardCarouselApi])
  
  // Get current month invoice for a credit card (usando lógica correta de faturas)
  const getCurrentMonthInvoice = (cardId: string) => {
    const card = creditCards.find(c => c.id === cardId)
    if (!card) return 0
    
    const now = new Date()
    const currentDay = now.getDate()
    
    // Determinar qual é a fatura "atual" baseada no dia de fechamento
    let targetMonth, targetYear
    if (currentDay <= card.closing_day) {
      targetMonth = now.getMonth()
      targetYear = now.getFullYear()
    } else {
      // Após fechamento, a fatura atual é a do próximo mês
      if (now.getMonth() === 11) {
        targetMonth = 0
        targetYear = now.getFullYear() + 1
      } else {
        targetMonth = now.getMonth() + 1
        targetYear = now.getFullYear()
      }
    }
    
    // Filtrar transações que pertencem a esta fatura
    const cardTransactions = transactions.filter(t => {
      if (t.credit_card_id !== cardId) return false
      const tDate = new Date(t.date)
      
      // Calcular em qual fatura esta transação cai
      let invoiceMonth, invoiceYear
      if (tDate.getDate() >= card.closing_day) {
        if (tDate.getMonth() === 11) {
          invoiceMonth = 0
          invoiceYear = tDate.getFullYear() + 1
        } else {
          invoiceMonth = tDate.getMonth() + 1
          invoiceYear = tDate.getFullYear()
        }
      } else {
        invoiceMonth = tDate.getMonth()
        invoiceYear = tDate.getFullYear()
      }
      
      return invoiceMonth === targetMonth && invoiceYear === targetYear
    })
    
    return cardTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }

  // Calculate used limit including all open invoices and future installments
  const getUsedLimit = (cardId: string) => {
    const card = creditCards.find(c => c.id === cardId)
    if (!card) return 0
    
    const cardTransactions = transactions.filter(t => t.credit_card_id === cardId)
    
    // Group transactions by invoice month using correct logic
    const invoicesByMonth: { [key: string]: { transactions: any[], total: number, isPaid: boolean } } = {}
    
    cardTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date)
      
      // Aplicar a mesma lógica de faturas
      let invoiceMonth, invoiceYear
      
      if (transactionDate.getDate() >= card.closing_day) {
        // Compra no dia do fechamento ou depois → próxima fatura
        if (transactionDate.getMonth() === 11) {
          invoiceMonth = 0
          invoiceYear = transactionDate.getFullYear() + 1
        } else {
          invoiceMonth = transactionDate.getMonth() + 1
          invoiceYear = transactionDate.getFullYear()
        }
      } else {
        // Compra antes do fechamento → fatura do mês atual
        invoiceMonth = transactionDate.getMonth()
        invoiceYear = transactionDate.getFullYear()
      }
      
      const invoiceKey = `${invoiceYear}-${invoiceMonth.toString().padStart(2, '0')}`
      
      if (!invoicesByMonth[invoiceKey]) {
        invoicesByMonth[invoiceKey] = {
          transactions: [],
          total: 0,
          isPaid: false
        }
      }
      
      invoicesByMonth[invoiceKey].transactions.push(transaction)
      invoicesByMonth[invoiceKey].total += Math.abs(transaction.amount)
    })
    
    // Check for payment transactions to mark invoices as paid
    const paymentTransactions = transactions.filter(t => 
      t.account_id && 
      t.description.toLowerCase().includes('pagamento fatura') &&
      t.description.toLowerCase().includes(card.name.toLowerCase())
    )
    
    paymentTransactions.forEach(payment => {
      const paymentDate = new Date(payment.date)
      const paymentMonth = paymentDate.getMonth()
      const paymentYear = paymentDate.getFullYear()
      
      // Mark the previous month's invoice as paid (assuming payment is for previous month)
      const prevMonth = paymentMonth === 0 ? 11 : paymentMonth - 1
      const prevYear = paymentMonth === 0 ? paymentYear - 1 : paymentYear
      const invoiceKey = `${prevYear}-${prevMonth.toString().padStart(2, '0')}`
      
      if (invoicesByMonth[invoiceKey]) {
        invoicesByMonth[invoiceKey].isPaid = true
      }
    })
    
    // Calculate total from open invoices
    let totalUsed = 0
    Object.values(invoicesByMonth).forEach(invoice => {
      if (!invoice.isPaid) {
        totalUsed += invoice.total
      }
    })
    
    return totalUsed
  }
  
  // Estados para dialogs
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)
  const [isCreditCardDialogOpen, setIsCreditCardDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)
  const [editingCreditCard, setEditingCreditCard] = useState(null)
  const [viewAccount, setViewAccount] = useState(null)
  const [viewCreditCard, setViewCreditCard] = useState(null)
  
  // Estados para confirmação de exclusão
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteType, setDeleteType] = useState<'account' | 'creditCard' | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [deleteTargetName, setDeleteTargetName] = useState<string>('')
  
  // Estado para transações selecionadas
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set())
  
  // Estados para novos itens
  const [newAccount, setNewAccount] = useState<{
    name: string
    type: 'bank' | 'savings' | 'investment'
    initial_balance: number
    current_balance: number
    bank_id?: string
  }>({
    name: '',
    type: 'bank',
    initial_balance: 0,
    current_balance: 0,
    bank_id: ''
  })
  
  const [newCreditCard, setNewCreditCard] = useState<{
    name: string
    card_type: 'visa' | 'mastercard' | 'elo' | 'amex'
    limit_amount: number
    current_balance: number
    due_day: number
    closing_day: number
    best_purchase_day: number | null
  }>({
    name: '',
    card_type: 'visa',
    limit_amount: 0,
    current_balance: 0,
    due_day: 10,
    closing_day: 5,
    best_purchase_day: null
  })

  const handleAddAccount = async () => {
    if (!newAccount.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome da conta",
        variant: "destructive"
      })
      return
    }

    try {
      if (editingAccount) {
        // Update existing account
        await updateAccount(editingAccount.id, {
          name: newAccount.name,
          type: newAccount.type,
          initial_balance: newAccount.initial_balance,
          current_balance: newAccount.current_balance
        })

        toast({
          title: "Sucesso",
          description: "Conta atualizada com sucesso!"
        })
      } else {
        // Create new account
        await addAccount({
          name: newAccount.name,
          type: newAccount.type,
          initial_balance: newAccount.initial_balance,
          current_balance: newAccount.initial_balance, // Current balance starts as initial balance
          currency: 'BRL',
          is_active: true
        })

        toast({
          title: "Sucesso",
          description: "Nova conta criada com sucesso!"
        })
      }

      // Reset form and close dialog
      setNewAccount({ name: '', type: 'bank', initial_balance: 0, current_balance: 0, bank_id: '' })
      setEditingAccount(null)
      setIsAccountDialogOpen(false)
    } catch (error) {
      console.error('Error saving account:', error)
      toast({
        title: "Erro",
        description: "Erro ao salvar conta. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleAddCreditCard = async () => {
    if (!newCreditCard.name || !newCreditCard.limit_amount) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    // Calcular automaticamente o melhor dia de compra (dia seguinte ao fechamento)
    const calculatedBestPurchaseDay = getBestPurchaseDay(newCreditCard.closing_day)

    try {
      if (editingCreditCard) {
        // Update existing credit card
        await updateCreditCard(editingCreditCard.id, {
          name: newCreditCard.name,
          card_type: newCreditCard.card_type,
          limit_amount: newCreditCard.limit_amount,
          due_day: newCreditCard.due_day,
          closing_day: newCreditCard.closing_day,
          best_purchase_day: calculatedBestPurchaseDay
        })

        toast({
          title: "Sucesso",
          description: "Cartão atualizado com sucesso!"
        })
      } else {
        // Create new credit card
        await addCreditCard({
          name: newCreditCard.name,
          card_type: newCreditCard.card_type,
          limit_amount: newCreditCard.limit_amount,
          current_balance: 0,
          due_day: newCreditCard.due_day,
          closing_day: newCreditCard.closing_day,
          best_purchase_day: calculatedBestPurchaseDay,
          currency: 'BRL',
          is_active: true
        })

        toast({
          title: "Sucesso",
          description: "Novo cartão criado com sucesso!"
        })
      }

      // Reset form and close dialog
      setNewCreditCard({
        name: '',
        card_type: 'visa',
        limit_amount: 0,
        current_balance: 0,
        due_day: 10,
        closing_day: 5,
        best_purchase_day: null
      })
      setEditingCreditCard(null)
      setIsCreditCardDialogOpen(false)
    } catch (error) {
      console.error('Error saving credit card:', error)
      toast({
        title: "Erro",
        description: "Erro ao salvar cartão. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  // Funções para abrir diálogo de confirmação de exclusão
  const confirmDeleteAccount = (account: any) => {
    setDeleteType('account')
    setDeleteTargetId(account.id)
    setDeleteTargetName(account.name)
    setDeleteConfirmOpen(true)
  }

  const confirmDeleteCreditCard = (card: any) => {
    setDeleteType('creditCard')
    setDeleteTargetId(card.id)
    setDeleteTargetName(card.name)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTargetId || !deleteType) return
    
    try {
      if (deleteType === 'account') {
        await deleteAccount(deleteTargetId)
        toast({
          title: "Sucesso",
          description: "Conta removida com sucesso!"
        })
      } else if (deleteType === 'creditCard') {
        await deleteCreditCard(deleteTargetId)
        toast({
          title: "Sucesso",
          description: "Cartão removido com sucesso!"
        })
      }
    } catch (error) {
      console.error('Error deleting:', error)
      toast({
        title: "Erro",
        description: `Erro ao remover ${deleteType === 'account' ? 'conta' : 'cartão'}. Tente novamente.`,
        variant: "destructive"
      })
    } finally {
      setDeleteConfirmOpen(false)
      setDeleteTargetId(null)
      setDeleteTargetName('')
      setDeleteType(null)
    }
  }

  // Funções para seleção de transações
  const toggleTransactionSelection = (transactionId: string) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(transactionId)) {
        newSet.delete(transactionId)
      } else {
        newSet.add(transactionId)
      }
      return newSet
    })
  }

  const toggleAllTransactions = (transactionIds: string[]) => {
    setSelectedTransactions(prev => {
      const allSelected = transactionIds.every(id => prev.has(id))
      if (allSelected) {
        // Deselect all
        const newSet = new Set(prev)
        transactionIds.forEach(id => newSet.delete(id))
        return newSet
      } else {
        // Select all
        const newSet = new Set(prev)
        transactionIds.forEach(id => newSet.add(id))
        return newSet
      }
    })
  }

  const openEditAccountDialog = (account) => {
    setEditingAccount(account)
    setNewAccount({
      name: account.name,
      type: account.type,
      initial_balance: account.initial_balance || 0,
      current_balance: account.current_balance || 0,
      bank_id: account.bank_id || ''
    })
    setIsAccountDialogOpen(true)
  }

  const openEditCreditCardDialog = (card) => {
    setEditingCreditCard(card)
    setNewCreditCard({
      name: card.name,
      card_type: card.card_type,
      limit_amount: card.limit_amount,
      current_balance: card.current_balance || 0,
      due_day: card.due_day,
      closing_day: card.closing_day,
      best_purchase_day: card.best_purchase_day
    })
    setIsCreditCardDialogOpen(true)
  }

  // Calculate totals
  const getTotalInvestmentValue = () => {
    return investments.reduce((total, investment) => {
      return total + (investment.quantity * investment.current_price)
    }, 0)
  }
  const totalBalance = accounts.reduce((sum, account) => sum + getComputedAccountBalance(account.id), 0)
  const totalCreditLimit = creditCards.reduce((sum, card) => sum + (card.limit_amount || 0), 0)
  const totalCreditUsed = creditCards.reduce((sum, card) => sum + getUsedLimit(card.id), 0)
  const totalCreditAvailable = Math.max(0, totalCreditLimit - totalCreditUsed)

  // Get transactions for accounts
  const getAccountTransactions = (accountId) => {
    return transactions.filter(t => t.account_id === accountId)
  }

  function getComputedAccountBalance(accountId: string) {
    const acc = accounts.find(a => a.id === accountId)
    const initial = acc?.initial_balance || 0
    const movement = transactions
      .filter(t => t.account_id === accountId)
      .reduce((sum, t) => sum + (t.amount || 0), 0)
    return initial + movement
  }

  const getCreditCardTransactions = (cardId) => {
    return transactions
      .filter(t => t.credit_card_id === cardId)
      .slice(0, 5)
  }

  // Get transactions grouped by month for credit cards with correct invoice logic
  const getCreditCardMonthlyInvoices = (cardId): MonthlyInvoice[] => {
    const cardTransactions = transactions.filter(t => t.credit_card_id === cardId)
    const card = creditCards.find(c => c.id === cardId)
    
    if (!card) return []
    
    const invoicesByMonth: { [key: string]: MonthlyInvoice } = {}
    const today = new Date()
    
    cardTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date)
      
      // Determinar a qual fatura a transação pertence
      // REGRA: Compras NO DIA do fechamento ou DEPOIS → próxima fatura
      // Compras ANTES do dia de fechamento → fatura atual
      let invoiceMonth, invoiceYear
      
      if (transactionDate.getDate() >= card.closing_day) {
        // Compra no dia do fechamento ou depois → próxima fatura
        if (transactionDate.getMonth() === 11) {
          invoiceMonth = 0
          invoiceYear = transactionDate.getFullYear() + 1
        } else {
          invoiceMonth = transactionDate.getMonth() + 1
          invoiceYear = transactionDate.getFullYear()
        }
      } else {
        // Compra antes do fechamento → fatura do mês atual
        invoiceMonth = transactionDate.getMonth()
        invoiceYear = transactionDate.getFullYear()
      }
      
      const invoiceKey = `${invoiceYear}-${invoiceMonth.toString().padStart(2, '0')}`
      
      if (!invoicesByMonth[invoiceKey]) {
        const closingDate = new Date(invoiceYear, invoiceMonth, card.closing_day)
        const dueDate = new Date(invoiceYear, invoiceMonth, card.due_day)
        
        // Determinar status da fatura
        let status: 'open' | 'closed' | 'paid' = 'open'
        
        if (today > dueDate) {
          status = 'paid' // Vencida (assumir paga por agora)
        } else if (today > closingDate) {
          status = 'closed' // Fechada mas ainda não vencida
        }
        
        invoicesByMonth[invoiceKey] = {
          month: invoiceMonth,
          year: invoiceYear,
          transactions: [],
          total: 0,
          dueDate,
          status
        }
      }
      
      invoicesByMonth[invoiceKey].transactions.push(transaction)
      invoicesByMonth[invoiceKey].total += Math.abs(transaction.amount)
    })
    
    // Sort by most recent first
    return Object.values(invoicesByMonth).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return b.month - a.month
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contas & Cartões</h1>
          <p className="text-muted-foreground">Gerencie suas contas bancárias e cartões de crédito</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            <p className="text-xs text-muted-foreground">
              {accounts.length} conta{accounts.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite Total</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCreditLimit)}</div>
            <p className="text-xs text-muted-foreground">
              {creditCards.length} cart{creditCards.length !== 1 ? 'ões' : 'ão'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite Usado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatCurrency(totalCreditUsed)}</div>
            <p className="text-xs text-muted-foreground">
              {totalCreditLimit > 0 ? ((totalCreditUsed / totalCreditLimit) * 100).toFixed(1) : 0}% do limite
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite Disponível</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalCreditAvailable)}</div>
            <p className="text-xs text-muted-foreground">
              Disponível para uso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accounts">Contas Bancárias</TabsTrigger>
          <TabsTrigger value="credit-cards">Cartões de Crédito</TabsTrigger>
        </TabsList>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contas Bancárias</h2>
            <Button onClick={() => setIsAccountDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
          </div>

          {accounts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Nenhuma conta cadastrada</p>
                <p className="text-muted-foreground mb-4">Comece criando sua primeira conta bancária</p>
                <Button onClick={() => setIsAccountDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeira Conta
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Account Selector */}
              <div className="flex flex-wrap gap-2 justify-center">
                {accounts.map((account, index) => (
                  <Button
                    key={account.id}
                    variant={selectedAccountIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAccountIndex(index)}
                    className="transition-all"
                  >
                    {(account as any).bank_id ? (
                      <span className="mr-1.5">
                        {banks.find(b => b.id === (account as any).bank_id)?.icon || '🏦'}
                      </span>
                    ) : (
                      <Building2 className="h-3.5 w-3.5 mr-1.5" />
                    )}
                    <span className="max-w-[120px] truncate">{account.name}</span>
                  </Button>
                ))}
              </div>

              {/* Carousel */}
              <Carousel
                setApi={setAccountCarouselApi}
                className="w-full"
                opts={{
                  align: "center",
                  loop: true
                }}
              >
                <CarouselContent>
                  {accounts.map((account) => (
                    <CarouselItem key={account.id}>
                      <Card className="border-2 shadow-lg">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {(account as any).bank_id ? (
                                  <span className="text-2xl">
                                    {banks.find(b => b.id === (account as any).bank_id)?.icon || '🏦'}
                                  </span>
                                ) : (
                                  <Building2 className="h-6 w-6" />
                                )}
                                {account.name}
                              </CardTitle>
                              <CardDescription className="mt-2">
                                <Badge variant="outline" className="text-sm">{accountTypeLabels[account.type]}</Badge>
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setViewAccount(account)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openEditAccountDialog(account)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => confirmDeleteAccount(account)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-1">
                                <Label className="text-sm font-medium text-muted-foreground">Saldo Atual</Label>
                                <p className="text-3xl font-bold">{formatCurrency(getComputedAccountBalance(account.id))}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-sm font-medium text-muted-foreground">Saldo Inicial</Label>
                                <p className="text-2xl font-semibold">{formatCurrency(account.initial_balance || 0)}</p>
                              </div>
                            </div>
                            
                            {/* Recent Transactions */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Transações Recentes</Label>
                                {getAccountTransactions(account.id).length > 0 && (
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      id={`select-all-${account.id}`}
                                      checked={getAccountTransactions(account.id).slice(0, 8).every(t => selectedTransactions.has(t.id))}
                                      onCheckedChange={() => toggleAllTransactions(getAccountTransactions(account.id).slice(0, 8).map(t => t.id))}
                                    />
                                    <label htmlFor={`select-all-${account.id}`} className="text-xs text-muted-foreground cursor-pointer">
                                      Selecionar todas
                                    </label>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2 max-h-80 overflow-y-auto rounded-lg border bg-muted/30 p-3">
                                {getAccountTransactions(account.id).length > 0 ? (
                                  getAccountTransactions(account.id).slice(0, 8).map((transaction) => {
                                    const category = transaction.category_id ? 
                                      (transactions.find(t => t.id === transaction.id) as any)?.categories?.name : 
                                      '-'
                                    const typeLabel = transaction.is_transfer ? 'Transferência' : 
                                      transaction.type === 'income' ? 'Receita' : 'Despesa'
                                    
                                    return (
                                      <div key={transaction.id} className={`p-3 rounded-md bg-background border hover:bg-accent/50 transition-colors ${selectedTransactions.has(transaction.id) ? 'ring-2 ring-primary' : ''}`}>
                                        <div className="flex items-start gap-3">
                                          <Checkbox
                                            id={`transaction-${transaction.id}`}
                                            checked={selectedTransactions.has(transaction.id)}
                                            onCheckedChange={() => toggleTransactionSelection(transaction.id)}
                                            className="mt-1"
                                          />
                                          <div className="flex-1 min-w-0 flex justify-between items-start gap-3">
                                            <div className="flex-1 min-w-0">
                                              <p className="font-medium text-sm truncate">{transaction.description}</p>
                                              <div className="flex flex-wrap gap-2 mt-1">
                                                <p className="text-xs text-muted-foreground">
                                                  {new Date(transaction.date).toLocaleDateString('pt-BR')}
                                                </p>
                                                <Badge variant="outline" className="text-xs">
                                                  {typeLabel}
                                                </Badge>
                                                {category && category !== '-' && (
                                                  <Badge variant="secondary" className="text-xs">
                                                    {category}
                                                  </Badge>
                                                )}
                                              </div>
                                            </div>
                                            <p className={`font-bold text-sm whitespace-nowrap ${
                                              transaction.type === 'income' ? 'text-green-600' : 
                                              transaction.is_transfer ? 'text-blue-600' : 'text-red-600'
                                            }`}>
                                              {transaction.type === 'income' || transaction.is_transfer ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                ) : (
                                  <p className="text-sm text-muted-foreground text-center py-4">Nenhuma transação encontrada</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </TabsContent>

        {/* Credit Cards Tab */}
        <TabsContent value="credit-cards" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cartões de Crédito</h2>
            <Button onClick={() => setIsCreditCardDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Cartão
            </Button>
          </div>

          {creditCards.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Nenhum cartão cadastrado</p>
                <p className="text-muted-foreground mb-4">Comece adicionando seu primeiro cartão de crédito</p>
                <Button onClick={() => setIsCreditCardDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Primeiro Cartão
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Credit Card Selector */}
              <div className="flex flex-wrap gap-2 justify-center">
                {creditCards.map((card, index) => (
                  <Button
                    key={card.id}
                    variant={selectedCreditCardIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCreditCardIndex(index)}
                    className="transition-all"
                  >
                    <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                    <span className="max-w-[120px] truncate">{card.name}</span>
                  </Button>
                ))}
              </div>

              {/* Carousel */}
              <Carousel
                setApi={setCreditCardCarouselApi}
                className="w-full"
                opts={{
                  align: "center",
                  loop: true
                }}
              >
                <CarouselContent>
                  {creditCards.map((card) => (
                    <CarouselItem key={card.id}>
                      <Card className="border-2 shadow-lg">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-6 w-6" />
                                {card.name}
                              </CardTitle>
                              <CardDescription className="mt-2">
                                <Badge variant="outline" className="text-sm">{cardTypeLabels[card.card_type]}</Badge>
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setViewCreditCard(card)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openEditCreditCardDialog(card)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => confirmDeleteCreditCard(card)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <Label className="text-sm font-medium text-muted-foreground">Fatura Atual</Label>
                                <p className="text-2xl font-bold text-destructive">{formatCurrency(getCurrentMonthInvoice(card.id))}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-sm font-medium text-muted-foreground">Limite Total</Label>
                                <p className="text-xl font-semibold">{formatCurrency(card.limit_amount || 0)}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-sm font-medium text-muted-foreground">Limite Usado</Label>
                                <p className="text-xl font-semibold text-destructive">{formatCurrency(getUsedLimit(card.id))}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/30 border">
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Disponível</Label>
                                <p className="text-lg font-bold text-green-600">{formatCurrency(Math.max(0, (card.limit_amount || 0) - getUsedLimit(card.id)))}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Vencimento</Label>
                                <p className="text-sm font-medium">Dia {card.due_day}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Fechamento</Label>
                                <p className="text-sm font-medium">Dia {card.closing_day}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Melhor Compra</Label>
                                <p className="text-sm font-medium">{card.best_purchase_day ? `Dia ${card.best_purchase_day}` : 'N/A'}</p>
                              </div>
                            </div>

                            {/* Credit Card Invoices Component */}
                            <CreditCardInvoices 
                              cardId={card.id} 
                              cardName={card.name} 
                              closingDay={card.closing_day}
                              dueDay={card.due_day}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Account Dialog */}
      <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingAccount ? "Editar Conta" : "Nova Conta Bancária"}
            </DialogTitle>
            <DialogDescription>
              {editingAccount ? "Atualize as informações da conta." : "Crie uma nova conta bancária para gerenciar suas finanças."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="account-name">Nome da Conta</Label>
              <Input 
                id="account-name" 
                placeholder="Ex: Conta Corrente Banco do Brasil" 
                value={newAccount.name}
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="account-type">Tipo de Conta</Label>
              <Select value={newAccount.type} onValueChange={(value) => setNewAccount({...newAccount, type: value as 'bank' | 'savings' | 'investment'})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Conta Corrente</SelectItem>
                  <SelectItem value="savings">Poupança</SelectItem>
                  <SelectItem value="investment">Investimento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bank-select">Banco</Label>
              <Select value={newAccount.bank_id} onValueChange={(value) => setNewAccount({...newAccount, bank_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o banco" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id}>
                      <div className="flex items-center gap-2">
                        <span>{bank.icon}</span>
                        <span>{bank.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="account-balance">Saldo Inicial</Label>
              <CurrencyInput 
                value={newAccount.initial_balance}
                onChange={(value) => setNewAccount({...newAccount, initial_balance: value})}
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAccountDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddAccount}>
              {editingAccount ? "Atualizar Conta" : "Criar Conta"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Credit Card Dialog */}
      <Dialog open={isCreditCardDialogOpen} onOpenChange={setIsCreditCardDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCreditCard ? "Editar Cartão" : "Novo Cartão de Crédito"}
            </DialogTitle>
            <DialogDescription>
              {editingCreditCard ? "Atualize as informações do cartão." : "Adicione um novo cartão de crédito para controlar seus gastos."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="card-name">Nome do Cartão</Label>
              <Input 
                id="card-name" 
                placeholder="Ex: Nubank Mastercard" 
                value={newCreditCard.name}
                onChange={(e) => setNewCreditCard({...newCreditCard, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card-type">Tipo do Cartão</Label>
              <Select value={newCreditCard.card_type} onValueChange={(value) => setNewCreditCard({...newCreditCard, card_type: value as 'visa' | 'mastercard' | 'elo' | 'amex'})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="elo">Elo</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card-limit">Limite</Label>
              <CurrencyInput 
                value={newCreditCard.limit_amount}
                onChange={(value) => setNewCreditCard({...newCreditCard, limit_amount: value})}
                placeholder="0,00"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="due-day">Dia do Vencimento</Label>
                <Input 
                  id="due-day" 
                  type="number" 
                  min="1" 
                  max="31" 
                  value={newCreditCard.due_day}
                  onChange={(e) => setNewCreditCard({...newCreditCard, due_day: parseInt(e.target.value)})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="closing-day">Dia do Fechamento</Label>
                <Input 
                  id="closing-day" 
                  type="number" 
                  min="1" 
                  max="31" 
                  value={newCreditCard.closing_day}
                  onChange={(e) => setNewCreditCard({...newCreditCard, closing_day: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="best-purchase-day">Melhor Dia para Compras (Opcional)</Label>
              <Input 
                id="best-purchase-day" 
                type="number" 
                min="1" 
                max="31" 
                placeholder="Ex: 6"
                value={newCreditCard.best_purchase_day || ''}
                onChange={(e) => setNewCreditCard({...newCreditCard, best_purchase_day: e.target.value ? parseInt(e.target.value) : null})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreditCardDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddCreditCard}>
              {editingCreditCard ? "Atualizar Cartão" : "Criar Cartão"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir {deleteType === 'account' ? 'a conta' : 'o cartão'} <strong>"{deleteTargetName}"</strong>?
              <br /><br />
              <span className="text-destructive font-medium">
                Esta ação não pode ser desfeita. Todas as transações vinculadas também serão removidas.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </Layout>
  )
}