import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrencyInput } from "@/components/ui/currency-input-fixed"
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
  BarChart3
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Layout from "@/components/Layout"
import { CreditCardInvoices } from "@/components/CreditCardInvoices"

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
    addAccount, 
    updateAccount, 
    deleteAccount, 
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    loading
  } = useSupabaseData()
  
  // Get current month invoice for a credit card
  const getCurrentMonthInvoice = (cardId: string) => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    
    const cardTransactions = transactions.filter(t => 
      t.credit_card_id === cardId &&
      new Date(t.date).getMonth() === currentMonth &&
      new Date(t.date).getFullYear() === currentYear
    )
    
    return cardTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }

  // Calculate used limit including installments for future months
  const getUsedLimit = (cardId: string) => {
    const cardTransactions = transactions.filter(t => t.credit_card_id === cardId)
    
    let totalUsed = 0
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()
    
    // Track installment transactions to avoid counting multiple times
    const processedInstallments = new Set<string>()
    
    cardTransactions.forEach(transaction => {
      if (transaction.is_installment && transaction.installments && transaction.installment_number) {
        // Create unique key for installment group (assuming parent transaction has same base info)
        const installmentKey = `${transaction.description}-${transaction.amount}-${transaction.installments}`
        
        if (!processedInstallments.has(installmentKey)) {
          processedInstallments.add(installmentKey)
          
          // Calculate remaining installments from current month forward
          const transactionDate = new Date(transaction.date)
          const transactionMonth = transactionDate.getMonth()
          const transactionYear = transactionDate.getFullYear()
          
          // Find the starting installment number for current calculation
          let remainingInstallments = 0
          
          // Count how many installments are from current month forward
          for (let i = 1; i <= transaction.installments; i++) {
            const installmentDate = new Date(transactionYear, transactionMonth + i - 1, transactionDate.getDate())
            
            if (installmentDate.getFullYear() > currentYear || 
                (installmentDate.getFullYear() === currentYear && installmentDate.getMonth() >= currentMonth)) {
              remainingInstallments++
            }
          }
          
          totalUsed += Math.abs(transaction.amount) * remainingInstallments
        }
      } else {
        // For regular transactions, only count from current month forward
        const transactionDate = new Date(transaction.date)
        const transactionYear = transactionDate.getFullYear()
        const transactionMonth = transactionDate.getMonth()
        
        if (transactionYear > currentYear || 
           (transactionYear === currentYear && transactionMonth >= currentMonth)) {
          totalUsed += Math.abs(transaction.amount)
        }
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

    try {
      if (editingCreditCard) {
        // Update existing credit card
        await updateCreditCard(editingCreditCard.id, {
          name: newCreditCard.name,
          card_type: newCreditCard.card_type,
          limit_amount: newCreditCard.limit_amount,
          due_day: newCreditCard.due_day,
          closing_day: newCreditCard.closing_day,
          best_purchase_day: newCreditCard.best_purchase_day
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
          best_purchase_day: newCreditCard.best_purchase_day,
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

  const handleDeleteAccount = async (accountId) => {
    try {
      await deleteAccount(accountId)
      toast({
        title: "Sucesso",
        description: "Conta removida com sucesso!"
      })
    } catch (error) {
      console.error('Error deleting account:', error)
      toast({
        title: "Erro",
        description: "Erro ao remover conta. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteCreditCard = async (cardId) => {
    try {
      await deleteCreditCard(cardId)
      toast({
        title: "Sucesso",
        description: "Cartão removido com sucesso!"
      })
    } catch (error) {
      console.error('Error deleting credit card:', error)
      toast({
        title: "Erro",
        description: "Erro ao remover cartão. Tente novamente.",
        variant: "destructive"
      })
    }
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
  const totalBalance = accounts.reduce((sum, account) => sum + (account.current_balance || 0), 0)
  const totalCreditLimit = creditCards.reduce((sum, card) => sum + (card.limit_amount || 0), 0)
  const totalCreditUsed = creditCards.reduce((sum, card) => sum + Math.abs(card.current_balance || 0), 0)
  const totalCreditAvailable = totalCreditLimit - totalCreditUsed

  // Get recent transactions for accounts
  const getAccountTransactions = (accountId) => {
    return transactions
      .filter(t => t.account_id === accountId)
      .slice(0, 5)
  }

  const getCreditCardTransactions = (cardId) => {
    return transactions
      .filter(t => t.credit_card_id === cardId)
      .slice(0, 5)
  }

  // Get transactions grouped by month for credit cards with correct current month logic
  const getCreditCardMonthlyInvoices = (cardId): MonthlyInvoice[] => {
    const cardTransactions = transactions.filter(t => t.credit_card_id === cardId)
    
    const invoicesByMonth: { [key: string]: MonthlyInvoice } = {}
    
    cardTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date)
      const card = creditCards.find(c => c.id === cardId)
      
      if (!card) return
      
      // Calculate invoice month based on closing day
      let invoiceMonth, invoiceYear
      const currentDate = new Date()
      
      if (transactionDate.getDate() <= card.closing_day) {
        // Transaction is for current month's invoice
        invoiceMonth = transactionDate.getMonth()
        invoiceYear = transactionDate.getFullYear()
      } else {
        // Transaction is for next month's invoice
        const nextMonth = new Date(transactionDate.getFullYear(), transactionDate.getMonth() + 1, 1)
        invoiceMonth = nextMonth.getMonth()
        invoiceYear = nextMonth.getFullYear()
      }
      
      const invoiceKey = `${invoiceYear}-${invoiceMonth.toString().padStart(2, '0')}`
      
      if (!invoicesByMonth[invoiceKey]) {
        invoicesByMonth[invoiceKey] = {
          month: invoiceMonth,
          year: invoiceYear,
          transactions: [],
          total: 0,
          dueDate: new Date(invoiceYear, invoiceMonth, card.due_day),
          status: 'open' as 'open' | 'closed' | 'paid'
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
              {creditCards.length} cartão{creditCards.length !== 1 ? 'ões' : 'ão'}
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
        <TabsContent value="accounts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contas Bancárias</h2>
            <Button onClick={() => setIsAccountDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
          </div>

          <div className="grid gap-6">
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
              accounts.map((account) => (
                <Card key={account.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {(account as any).bank_id ? (
                            <span className="text-lg">
                              {banks.find(b => b.id === (account as any).bank_id)?.icon || '🏦'}
                            </span>
                          ) : (
                            <Building2 className="h-5 w-5" />
                          )}
                          {account.name}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant="outline">{accountTypeLabels[account.type]}</Badge>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setViewAccount(account)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditAccountDialog(account)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteAccount(account.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Saldo Atual</Label>
                          <p className="text-2xl font-bold">{formatCurrency(account.current_balance || 0)}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Saldo Inicial</Label>
                          <p className="text-lg">{formatCurrency(account.initial_balance || 0)}</p>
                        </div>
                      </div>
                      
                      {/* Recent Transactions */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Transações Recentes</Label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {getAccountTransactions(account.id).length > 0 ? (
                            getAccountTransactions(account.id).slice(0, 5).map((transaction) => (
                              <div key={transaction.id} className="flex justify-between items-center py-2 border-b">
                                <div>
                                  <p className="font-medium text-sm">{transaction.description}</p>
                                  <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <p className={`font-bold text-sm ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">Nenhuma transação encontrada</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Credit Cards Tab */}
        <TabsContent value="credit-cards" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cartões de Crédito</h2>
            <Button onClick={() => setIsCreditCardDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Cartão
            </Button>
          </div>

          <div className="grid gap-6">
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
              creditCards.map((card) => (
                <Card key={card.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          {card.name}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant="outline">{cardTypeLabels[card.card_type]}</Badge>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setViewCreditCard(card)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditCreditCardDialog(card)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCreditCard(card.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Fatura Atual</Label>
                          <p className="text-2xl font-bold text-destructive">{formatCurrency(getCurrentMonthInvoice(card.id))}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Limite</Label>
                          <p className="text-lg">{formatCurrency(card.limit_amount || 0)}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Limite Usado</Label>
                          <p className="text-lg text-destructive">{formatCurrency(getUsedLimit(card.id))}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Vencimento</Label>
                          <p className="text-sm">Dia {card.due_day}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Fechamento</Label>
                          <p className="text-sm">Dia {card.closing_day}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Melhor Compra</Label>
                          <p className="text-sm">{card.best_purchase_day ? `Dia ${card.best_purchase_day}` : 'N/A'}</p>
                        </div>
                      </div>

                       {/* Credit Card Invoices Component */}
                      <CreditCardInvoices cardId={card.id} cardName={card.name} />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
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
    </div>
    </Layout>
  )
}