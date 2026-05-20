import React, { useState, useEffect, useMemo } from 'react'
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
import { banks } from "@/data/banks"
import { Plus, Edit, Trash2, CreditCard, Building2, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import Layout from "@/components/Layout"
import { CreditCardInvoices } from "@/components/CreditCardInvoices"
import { AccountTransactions } from "@/components/AccountTransactions"
import { CreditCardTransactions } from "@/components/CreditCardTransactions"
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel"
import { getBestPurchaseDay } from "@/hooks/useCreditCardInvoice"
import { parseLocalDate } from "@/utils/dateUtils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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

const cardTypeColors: Record<string, string> = {
  visa: "from-blue-700 to-blue-900",
  mastercard: "from-orange-600 to-red-800",
  elo: "from-yellow-600 to-yellow-800",
  amex: "from-green-700 to-green-900"
}

export default function ContasImproved() {
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()

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

  // Carousel state
  const [accountCarouselApi, setAccountCarouselApi] = useState<CarouselApi>()
  const [creditCardCarouselApi, setCreditCardCarouselApi] = useState<CarouselApi>()
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0)
  const [selectedCreditCardIndex, setSelectedCreditCardIndex] = useState(0)

  useEffect(() => {
    if (accountCarouselApi) accountCarouselApi.scrollTo(selectedAccountIndex)
  }, [selectedAccountIndex, accountCarouselApi])

  useEffect(() => {
    if (creditCardCarouselApi) creditCardCarouselApi.scrollTo(selectedCreditCardIndex)
  }, [selectedCreditCardIndex, creditCardCarouselApi])

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

  // Compute account balance from transactions
  function getComputedAccountBalance(accountId: string) {
    const acc = accounts.find(a => a.id === accountId)
    const initial = acc?.initial_balance || 0
    const movement = transactions
      .filter(t => t.account_id === accountId)
      .reduce((sum, t) => sum + (t.amount || 0), 0)
    return initial + movement
  }

  // Compute used credit across all unpaid invoices
  const getUsedLimit = (cardId: string) => {
    const card = creditCards.find(c => c.id === cardId)
    if (!card) return 0

    const invoicesByMonth: { [key: string]: { total: number; isPaid: boolean } } = {}

    transactions.filter(t => t.credit_card_id === cardId).forEach(transaction => {
      const tDate = parseLocalDate(transaction.date)
      let invoiceMonth: number, invoiceYear: number

      if (tDate.getDate() >= card.closing_day) {
        invoiceMonth = tDate.getMonth() === 11 ? 0 : tDate.getMonth() + 1
        invoiceYear = tDate.getMonth() === 11 ? tDate.getFullYear() + 1 : tDate.getFullYear()
      } else {
        invoiceMonth = tDate.getMonth()
        invoiceYear = tDate.getFullYear()
      }

      const key = `${invoiceYear}-${invoiceMonth.toString().padStart(2, '0')}`
      if (!invoicesByMonth[key]) invoicesByMonth[key] = { total: 0, isPaid: false }
      invoicesByMonth[key].total += Math.abs(transaction.amount)
    })

    transactions.filter(t =>
      t.account_id &&
      t.description.toLowerCase().includes('pagamento fatura') &&
      t.description.toLowerCase().includes(card.name.toLowerCase())
    ).forEach(payment => {
      const pDate = parseLocalDate(payment.date)
      const prevMonth = pDate.getMonth() === 0 ? 11 : pDate.getMonth() - 1
      const prevYear = pDate.getMonth() === 0 ? pDate.getFullYear() - 1 : pDate.getFullYear()
      const key = `${prevYear}-${prevMonth.toString().padStart(2, '0')}`
      if (invoicesByMonth[key]) invoicesByMonth[key].isPaid = true
    })

    return Object.values(invoicesByMonth)
      .filter(inv => !inv.isPaid)
      .reduce((sum, inv) => sum + inv.total, 0)
  }

  // Statement modals
  const [statementAccount, setStatementAccount] = useState<any>(null)

  // Mini monthly summary per account
  const getMonthSummary = (accountId: string) => {
    const now = new Date()
    const thisMo = transactions.filter(t => {
      if (t.account_id !== accountId) return false
      const d = parseLocalDate(t.date)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    const income  = thisMo.filter(t => t.type === 'income').reduce((s, t)  => s + (t.amount || 0), 0)
    const expense = thisMo.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount || 0), 0)
    return { income, expense, count: thisMo.length, month: format(now, 'MMMM', { locale: ptBR }) }
  }

  // Dialog state
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)
  const [isCreditCardDialogOpen, setIsCreditCardDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<any>(null)
  const [editingCreditCard, setEditingCreditCard] = useState<any>(null)

  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteType, setDeleteType] = useState<'account' | 'creditCard' | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [deleteTargetName, setDeleteTargetName] = useState('')

  // Form state
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: 'bank' as 'bank' | 'savings' | 'investment',
    initial_balance: 0,
    bank_id: ''
  })

  const [newCreditCard, setNewCreditCard] = useState({
    name: '',
    card_type: 'visa' as 'visa' | 'mastercard' | 'elo' | 'amex',
    limit_amount: 0,
    due_day: 10,
    closing_day: 5,
  })

  const handleAddAccount = async () => {
    if (!newAccount.name) {
      toast({ title: "Erro", description: "Preencha o nome da conta", variant: "destructive" })
      return
    }
    try {
      if (editingAccount) {
        await updateAccount(editingAccount.id, {
          name: newAccount.name,
          type: newAccount.type,
          initial_balance: newAccount.initial_balance,
        })
        toast({ title: "Conta atualizada com sucesso!" })
      } else {
        await addAccount({
          name: newAccount.name,
          type: newAccount.type,
          initial_balance: newAccount.initial_balance,
          current_balance: newAccount.initial_balance,
          currency: 'BRL',
          is_active: true,
          bank_id: newAccount.bank_id || null,
        } as any)
        toast({ title: "Conta criada com sucesso!" })
      }
      setNewAccount({ name: '', type: 'bank', initial_balance: 0, bank_id: '' })
      setEditingAccount(null)
      setIsAccountDialogOpen(false)
    } catch {
      toast({ title: "Erro ao salvar conta", variant: "destructive" })
    }
  }

  const handleAddCreditCard = async () => {
    if (!newCreditCard.name || !newCreditCard.limit_amount) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" })
      return
    }
    const bestPurchaseDay = getBestPurchaseDay(newCreditCard.closing_day)
    try {
      if (editingCreditCard) {
        await updateCreditCard(editingCreditCard.id, {
          name: newCreditCard.name,
          card_type: newCreditCard.card_type,
          limit_amount: newCreditCard.limit_amount,
          due_day: newCreditCard.due_day,
          closing_day: newCreditCard.closing_day,
          best_purchase_day: bestPurchaseDay
        })
        toast({ title: "Cartão atualizado com sucesso!" })
      } else {
        await addCreditCard({
          name: newCreditCard.name,
          card_type: newCreditCard.card_type,
          limit_amount: newCreditCard.limit_amount,
          current_balance: 0,
          due_day: newCreditCard.due_day,
          closing_day: newCreditCard.closing_day,
          best_purchase_day: bestPurchaseDay,
          currency: 'BRL',
          is_active: true
        })
        toast({ title: "Cartão criado com sucesso!" })
      }
      setNewCreditCard({ name: '', card_type: 'visa', limit_amount: 0, due_day: 10, closing_day: 5 })
      setEditingCreditCard(null)
      setIsCreditCardDialogOpen(false)
    } catch {
      toast({ title: "Erro ao salvar cartão", variant: "destructive" })
    }
  }

  const confirmDelete = (type: 'account' | 'creditCard', id: string, name: string) => {
    setDeleteType(type)
    setDeleteTargetId(id)
    setDeleteTargetName(name)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTargetId || !deleteType) return
    try {
      if (deleteType === 'account') {
        await deleteAccount(deleteTargetId)
        toast({ title: "Conta removida com sucesso!" })
      } else {
        await deleteCreditCard(deleteTargetId)
        toast({ title: "Cartão removido com sucesso!" })
      }
    } catch {
      toast({ title: "Erro ao remover", variant: "destructive" })
    } finally {
      setDeleteConfirmOpen(false)
      setDeleteTargetId(null)
      setDeleteTargetName('')
      setDeleteType(null)
    }
  }

  const openEditAccountDialog = (account: any) => {
    setEditingAccount(account)
    setNewAccount({
      name: account.name,
      type: account.type,
      initial_balance: account.initial_balance || 0,
      bank_id: account.bank_id || ''
    })
    setIsAccountDialogOpen(true)
  }

  const openEditCreditCardDialog = (card: any) => {
    setEditingCreditCard(card)
    setNewCreditCard({
      name: card.name,
      card_type: card.card_type,
      limit_amount: card.limit_amount,
      due_day: card.due_day,
      closing_day: card.closing_day,
    })
    setIsCreditCardDialogOpen(true)
  }

  // Totals
  const totalBalance = accounts.reduce((sum, acc) => sum + getComputedAccountBalance(acc.id), 0)
  const totalCreditLimit = creditCards.reduce((sum, c) => sum + (c.limit_amount || 0), 0)
  const totalCreditUsed = creditCards.reduce((sum, c) => sum + getUsedLimit(c.id), 0)
  const totalCreditAvailable = Math.max(0, totalCreditLimit - totalCreditUsed)
  const creditUsagePercent = totalCreditLimit > 0 ? (totalCreditUsed / totalCreditLimit) * 100 : 0

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Carregando...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contas & Cartões</h1>
          <p className="text-sm text-muted-foreground">Gerencie suas contas bancárias e cartões de crédito</p>
        </div>

        {/* Summary — 2 cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Total Balance */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">Saldo Total</span>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{formatCurrency(totalBalance)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {accounts.length} conta{accounts.length !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          {/* Credit Limit — unified */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">Crédito</span>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">{formatCurrency(totalCreditAvailable)}</p>
                <span className="text-sm text-muted-foreground">disponível</span>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Usado: {formatCurrency(totalCreditUsed)}</span>
                  <span>{creditUsagePercent.toFixed(1)}% de {formatCurrency(totalCreditLimit)}</span>
                </div>
                <Progress value={creditUsagePercent} className="h-1.5" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {creditCards.length} cartão{creditCards.length !== 1 ? 'ões' : ''}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main tabs */}
        <Tabs defaultValue="accounts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="accounts">Contas Bancárias</TabsTrigger>
            <TabsTrigger value="credit-cards">Cartões de Crédito</TabsTrigger>
          </TabsList>

          {/* ── Accounts Tab ── */}
          <TabsContent value="accounts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-muted-foreground">
                {accounts.length} conta{accounts.length !== 1 ? 's' : ''}
              </h2>
              <Button size="sm" onClick={() => { setEditingAccount(null); setNewAccount({ name: '', type: 'bank', initial_balance: 0, bank_id: '' }); setIsAccountDialogOpen(true) }}>
                <Plus className="h-4 w-4 mr-1.5" />
                Nova Conta
              </Button>
            </div>

            {accounts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
                  <Building2 className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">Nenhuma conta cadastrada ainda</p>
                  <Button size="sm" variant="outline" onClick={() => setIsAccountDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-1.5" />
                    Criar Primeira Conta
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {/* Account Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  {accounts.map((account, index) => (
                    <button
                      key={account.id}
                      onClick={() => setSelectedAccountIndex(index)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                        selectedAccountIndex === index
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border text-muted-foreground hover:border-foreground/40'
                      }`}
                    >
                      {(account as any).bank_id
                        ? <span>{banks.find(b => b.id === (account as any).bank_id)?.icon || '🏦'}</span>
                        : <Building2 className="h-3 w-3" />}
                      <span className="max-w-[120px] truncate">{account.name}</span>
                    </button>
                  ))}
                </div>

                {/* Carousel */}
                <Carousel
                  setApi={setAccountCarouselApi}
                  className="w-full"
                  opts={{ align: "center", loop: accounts.length > 1 }}
                >
                  <CarouselContent>
                    {accounts.map((account) => {
                      const balance = getComputedAccountBalance(account.id)
                      const bankIcon = banks.find(b => b.id === (account as any).bank_id)?.icon
                      return (
                        <CarouselItem key={account.id}>
                          <Card className="shadow-sm">
                            <CardContent className="pt-6">
                              {/* Account header */}
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                  {bankIcon
                                    ? <span className="text-3xl">{bankIcon}</span>
                                    : <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"><Building2 className="h-5 w-5 text-muted-foreground" /></div>
                                  }
                                  <div>
                                    <h3 className="font-semibold text-lg leading-tight">{account.name}</h3>
                                    <Badge variant="secondary" className="text-xs mt-0.5">{accountTypeLabels[account.type]}</Badge>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditAccountDialog(account)}>
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => confirmDelete('account', account.id, account.name)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>

                              {/* Balance */}
                              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/40 rounded-xl">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-0.5">Saldo Atual</p>
                                  <p className={`text-2xl font-bold ${balance >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                                    {formatCurrency(balance)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-0.5">Saldo Inicial</p>
                                  <p className="text-lg font-medium text-muted-foreground">{formatCurrency(account.initial_balance || 0)}</p>
                                </div>
                              </div>

                              {/* Mini monthly summary */}
                              {(() => {
                                const s = getMonthSummary(account.id)
                                return (
                                  <div className="rounded-xl border p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                        Extrato — {s.month}
                                      </p>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-xs"
                                        onClick={() => setStatementAccount(account)}
                                      >
                                        <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                                        Ver Extrato
                                      </Button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-2">
                                        <p className="text-xs text-muted-foreground">Entradas</p>
                                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(s.income)}</p>
                                      </div>
                                      <div className="rounded-lg bg-red-50 dark:bg-red-950/40 p-2">
                                        <p className="text-xs text-muted-foreground">Saídas</p>
                                        <p className="text-sm font-semibold text-destructive">{formatCurrency(s.expense)}</p>
                                      </div>
                                      <div className={`rounded-lg p-2 ${s.income - s.expense >= 0 ? 'bg-blue-50 dark:bg-blue-950/40' : 'bg-red-50 dark:bg-red-950/40'}`}>
                                        <p className="text-xs text-muted-foreground">Saldo</p>
                                        <p className={`text-sm font-semibold ${s.income - s.expense >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-destructive'}`}>
                                          {formatCurrency(s.income - s.expense)}
                                        </p>
                                      </div>
                                    </div>
                                    {s.count === 0 && (
                                      <p className="text-xs text-center text-muted-foreground">Nenhuma transação este mês</p>
                                    )}
                                  </div>
                                )
                              })()}
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
          </TabsContent>

          {/* ── Credit Cards Tab ── */}
          <TabsContent value="credit-cards" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-muted-foreground">
                {creditCards.length} cartão{creditCards.length !== 1 ? 'ões' : ''}
              </h2>
              <Button size="sm" onClick={() => { setEditingCreditCard(null); setNewCreditCard({ name: '', card_type: 'visa', limit_amount: 0, due_day: 10, closing_day: 5 }); setIsCreditCardDialogOpen(true) }}>
                <Plus className="h-4 w-4 mr-1.5" />
                Novo Cartão
              </Button>
            </div>

            {creditCards.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
                  <CreditCard className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">Nenhum cartão cadastrado ainda</p>
                  <Button size="sm" variant="outline" onClick={() => setIsCreditCardDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-1.5" />
                    Adicionar Primeiro Cartão
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {/* Card Selector */}
                <div className="flex flex-wrap gap-2">
                  {creditCards.map((card, index) => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCreditCardIndex(index)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                        selectedCreditCardIndex === index
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border text-muted-foreground hover:border-foreground/40'
                      }`}
                    >
                      <CreditCard className="h-3 w-3" />
                      <span className="max-w-[120px] truncate">{card.name}</span>
                    </button>
                  ))}
                </div>

                {/* Carousel */}
                <Carousel
                  setApi={setCreditCardCarouselApi}
                  className="w-full"
                  opts={{ align: "center", loop: creditCards.length > 1 }}
                >
                  <CarouselContent>
                    {creditCards.map((card) => {
                      const usedLimit = getUsedLimit(card.id)
                      const availableLimit = Math.max(0, (card.limit_amount || 0) - usedLimit)
                      const usagePercent = card.limit_amount > 0 ? (usedLimit / card.limit_amount) * 100 : 0
                      const gradient = cardTypeColors[card.card_type] || 'from-gray-700 to-gray-900'

                      return (
                        <CarouselItem key={card.id}>
                          <Card className="shadow-sm overflow-hidden">
                            {/* Visual Credit Card */}
                            <div className={`bg-gradient-to-br ${gradient} text-white p-5 relative overflow-hidden`}>
                              <div className="absolute inset-0 opacity-10">
                                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white" />
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white" />
                              </div>
                              <div className="relative flex items-start justify-between">
                                <div>
                                  <p className="text-white/70 text-xs mb-0.5">Cartão de Crédito</p>
                                  <h3 className="font-semibold text-lg">{card.name}</h3>
                                  <Badge className="mt-1 bg-white/20 text-white border-white/30 text-xs">
                                    {cardTypeLabels[card.card_type]}
                                  </Badge>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => openEditCreditCardDialog(card)}>
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => confirmDelete('creditCard', card.id, card.name)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>

                              {/* Limit usage on card */}
                              <div className="relative mt-5">
                                <div className="flex justify-between text-xs text-white/70 mb-1">
                                  <span>Limite usado</span>
                                  <span>{usagePercent.toFixed(1)}%</span>
                                </div>
                                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-white/80 rounded-full transition-all"
                                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                  />
                                </div>
                                <div className="flex justify-between mt-2">
                                  <div>
                                    <p className="text-xs text-white/70">Usado</p>
                                    <p className="font-semibold">{formatCurrency(usedLimit)}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-white/70">Disponível</p>
                                    <p className="font-semibold">{formatCurrency(availableLimit)}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-white/70">Limite Total</p>
                                    <p className="font-semibold">{formatCurrency(card.limit_amount || 0)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <CardContent className="pt-6 space-y-6">
                              {/* Invoice section */}
                              <CreditCardInvoices
                                cardId={card.id}
                                cardName={card.name}
                                closingDay={card.closing_day}
                                dueDay={card.due_day}
                              />

                              {/* Transactions section */}
                              <CreditCardTransactions
                                cardId={card.id}
                                cardName={card.name}
                                closingDay={card.closing_day}
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* ── Account Dialog ── */}
        <Dialog open={isAccountDialogOpen} onOpenChange={(open) => { setIsAccountDialogOpen(open); if (!open) setEditingAccount(null) }}>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>{editingAccount ? "Editar Conta" : "Nova Conta Bancária"}</DialogTitle>
              <DialogDescription>
                {editingAccount ? "Atualize as informações da conta." : "Crie uma nova conta para gerenciar suas finanças."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Nome da Conta</Label>
                <Input
                  placeholder="Ex: Conta Corrente Nubank"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Tipo</Label>
                <Select value={newAccount.type} onValueChange={(v: any) => setNewAccount({ ...newAccount, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Conta Corrente</SelectItem>
                    <SelectItem value="savings">Poupança</SelectItem>
                    <SelectItem value="investment">Investimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Banco</Label>
                <Select value={newAccount.bank_id} onValueChange={(v) => setNewAccount({ ...newAccount, bank_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione o banco" /></SelectTrigger>
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
              <div className="space-y-1.5">
                <Label>Saldo Inicial</Label>
                <CurrencyInput
                  value={newAccount.initial_balance}
                  onChange={(v) => setNewAccount({ ...newAccount, initial_balance: v })}
                  placeholder="0,00"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsAccountDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddAccount}>{editingAccount ? "Atualizar" : "Criar Conta"}</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── Credit Card Dialog ── */}
        <Dialog open={isCreditCardDialogOpen} onOpenChange={(open) => { setIsCreditCardDialogOpen(open); if (!open) setEditingCreditCard(null) }}>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>{editingCreditCard ? "Editar Cartão" : "Novo Cartão de Crédito"}</DialogTitle>
              <DialogDescription>
                {editingCreditCard ? "Atualize as informações do cartão." : "Adicione um novo cartão de crédito."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Nome do Cartão</Label>
                <Input
                  placeholder="Ex: Nubank Mastercard"
                  value={newCreditCard.name}
                  onChange={(e) => setNewCreditCard({ ...newCreditCard, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Bandeira</Label>
                <Select value={newCreditCard.card_type} onValueChange={(v: any) => setNewCreditCard({ ...newCreditCard, card_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="elo">Elo</SelectItem>
                    <SelectItem value="amex">American Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Limite</Label>
                <CurrencyInput
                  value={newCreditCard.limit_amount}
                  onChange={(v) => setNewCreditCard({ ...newCreditCard, limit_amount: v })}
                  placeholder="0,00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Dia do Vencimento</Label>
                  <Input
                    type="number" min="1" max="31"
                    value={newCreditCard.due_day}
                    onChange={(e) => setNewCreditCard({ ...newCreditCard, due_day: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Dia do Fechamento</Label>
                  <Input
                    type="number" min="1" max="31"
                    value={newCreditCard.closing_day}
                    onChange={(e) => setNewCreditCard({ ...newCreditCard, closing_day: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
              {newCreditCard.closing_day > 0 && (
                <p className="text-xs text-muted-foreground">
                  Melhor dia para compras: <strong>Dia {getBestPurchaseDay(newCreditCard.closing_day)}</strong>
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsCreditCardDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddCreditCard}>{editingCreditCard ? "Atualizar" : "Criar Cartão"}</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── Account Statement Modal ── */}
        <Dialog open={!!statementAccount} onOpenChange={(open) => { if (!open) setStatementAccount(null) }}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {statementAccount?.bank_id
                  ? <span>{banks.find(b => b.id === statementAccount.bank_id)?.icon}</span>
                  : <Building2 className="h-4 w-4" />}
                Extrato — {statementAccount?.name}
              </DialogTitle>
            </DialogHeader>
            {statementAccount && (
              <AccountTransactions accountId={statementAccount.id} accountName={statementAccount.name} />
            )}
          </DialogContent>
        </Dialog>

        {/* ── Delete Confirmation ── */}
        <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir {deleteType === 'account' ? 'a conta' : 'o cartão'}{' '}
                <strong>"{deleteTargetName}"</strong>?{' '}
                <span className="text-destructive">Todas as transações vinculadas também serão removidas.</span>
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
      </div>
    </Layout>
  )
}
