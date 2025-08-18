import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrencyInput } from "@/components/ui/currency-input-fixed"
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Wallet,
  CreditCard,
  Building,
  TrendingUp,
  TrendingDown,
  Calculator
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import { useCurrency } from "@/context/CurrencyContext"
import { supabase } from "@/integrations/supabase/client"
import Layout from "@/components/Layout"

interface Account {
  id: string
  name: string
  type: 'bank' | 'savings' | 'investment'
  initial_balance: number
  current_balance: number
  is_active: boolean
  currency: string
}

interface CreditCard {
  id: string
  name: string
  card_type: 'visa' | 'mastercard' | 'elo' | 'amex'
  limit_amount: number
  current_balance: number
  due_day: number
  closing_day: number
  best_purchase_day?: number
  is_active: boolean
  currency: string
}

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  type: 'income' | 'expense' | 'transfer'
  account_id?: string
  credit_card_id?: string
  categories?: { name: string }
  accounts?: { name: string }
  credit_cards?: { name: string }
}

const ContasImproved = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const { formatCurrency } = useCurrency()
  
  const [accounts, setAccounts] = useState<Account[]>([])
  const [creditCards, setCreditCards] = useState<CreditCard[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)
  const [isCreditCardDialogOpen, setIsCreditCardDialogOpen] = useState(false)
  const [isStatementOpen, setIsStatementOpen] = useState(false)
  
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [editingCreditCard, setEditingCreditCard] = useState<CreditCard | null>(null)
  const [selectedForStatement, setSelectedForStatement] = useState<{type: 'account' | 'card', item: Account | CreditCard} | null>(null)
  
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "bank" as "bank" | "savings" | "investment",
    initial_balance: 0
  })
  
  const [newCreditCard, setNewCreditCard] = useState({
    name: "",
    card_type: "visa" as "visa" | "mastercard" | "elo" | "amex",
    limit_amount: 0,
    due_day: 10,
    closing_day: 5,
    best_purchase_day: 6
  })

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      // Fetch accounts
      const { data: accountsData } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)

      // Fetch credit cards
      const { data: creditCardsData } = await supabase
        .from('credit_cards')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)

      // Fetch transactions
      const { data: transactionsData } = await supabase
        .from('transactions')
        .select(`
          *,
          categories(name),
          accounts(name),
          credit_cards(name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setAccounts(accountsData || [])
      setCreditCards(creditCardsData || [])
      setTransactions(transactionsData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

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
        const { error } = await supabase
          .from('accounts')
          .update({
            name: newAccount.name,
            type: newAccount.type,
            initial_balance: newAccount.initial_balance,
            current_balance: newAccount.initial_balance
          })
          .eq('id', editingAccount.id)

        if (error) throw error

        toast({
          title: "✅ Conta Atualizada",
          description: `${newAccount.name} foi atualizada com sucesso`,
        })
      } else {
        const { error } = await supabase
          .from('accounts')
          .insert({
            user_id: user.id,
            name: newAccount.name,
            type: newAccount.type,
            initial_balance: newAccount.initial_balance,
            current_balance: newAccount.initial_balance,
            is_active: true,
            currency: 'BRL'
          })

        if (error) throw error

        toast({
          title: "✅ Nova Conta Criada",
          description: `${newAccount.name} - ${formatCurrency(newAccount.initial_balance)}`,
        })
      }

      setNewAccount({ name: "", type: "bank", initial_balance: 0 })
      setEditingAccount(null)
      setIsAccountDialogOpen(false)
      fetchData()
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
    if (!newCreditCard.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome do cartão",
        variant: "destructive"
      })
      return
    }

    try {
      if (editingCreditCard) {
        const { error } = await supabase
          .from('credit_cards')
          .update({
            name: newCreditCard.name,
            card_type: newCreditCard.card_type,
            limit_amount: newCreditCard.limit_amount,
            due_day: newCreditCard.due_day,
            closing_day: newCreditCard.closing_day,
            best_purchase_day: newCreditCard.best_purchase_day
          })
          .eq('id', editingCreditCard.id)

        if (error) throw error

        toast({
          title: "✅ Cartão Atualizado",
          description: `${newCreditCard.name} foi atualizado com sucesso`,
        })
      } else {
        const { error } = await supabase
          .from('credit_cards')
          .insert({
            user_id: user.id,
            name: newCreditCard.name,
            card_type: newCreditCard.card_type,
            limit_amount: newCreditCard.limit_amount,
            current_balance: 0,
            due_day: newCreditCard.due_day,
            closing_day: newCreditCard.closing_day,
            best_purchase_day: newCreditCard.best_purchase_day,
            is_active: true,
            currency: 'BRL'
          })

        if (error) throw error

        toast({
          title: "✅ Novo Cartão Criado",
          description: `${newCreditCard.name} - Limite: ${formatCurrency(newCreditCard.limit_amount)}`,
        })
      }

      setNewCreditCard({
        name: "",
        card_type: "visa",
        limit_amount: 0,
        due_day: 10,
        closing_day: 5,
        best_purchase_day: 6
      })
      setEditingCreditCard(null)
      setIsCreditCardDialogOpen(false)
      fetchData()
    } catch (error) {
      console.error('Error saving credit card:', error)
      toast({
        title: "Erro",
        description: "Erro ao salvar cartão. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const getAccountTransactions = (accountId: string) => {
    return transactions.filter(t => t.account_id === accountId)
  }

  const getCreditCardTransactions = (cardId: string) => {
    return transactions.filter(t => t.credit_card_id === cardId)
  }

  const getAccountTypeName = (type: string) => {
    switch (type) {
      case "bank": return "Conta Corrente"
      case "savings": return "Poupança"
      case "investment": return "Investimento"
      case "visa":
      case "mastercard": 
      case "elo":
      case "amex": return "Cartão de Crédito"
      default: return "Conta"
    }
  }

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "bank": return <Wallet className="h-5 w-5" />
      case "savings": return <Building className="h-5 w-5" />
      case "investment": return <TrendingUp className="h-5 w-5" />
      case "visa":
      case "mastercard":
      case "elo":
      case "amex": return <CreditCard className="h-5 w-5" />
      default: return <Wallet className="h-5 w-5" />
    }
  }

  const totalAccounts = accounts.reduce((sum, acc) => sum + acc.current_balance, 0)
  const totalCreditLimit = creditCards.reduce((sum, card) => sum + card.limit_amount, 0)
  const totalCreditUsed = creditCards.reduce((sum, card) => sum + card.current_balance, 0)

  return (
    <Layout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Contas & Cartões</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Gerencie suas contas bancárias e cartões de crédito
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total em Contas</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-xl sm:text-2xl font-bold ${totalAccounts >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(totalAccounts)}
              </div>
              <p className="text-xs text-muted-foreground">
                {accounts.length} contas ativas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Limite Total</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {formatCurrency(totalCreditLimit)}
              </div>
              <p className="text-xs text-muted-foreground">
                {creditCards.length} cartões ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Limite Usado</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-destructive">
                {formatCurrency(totalCreditUsed)}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalCreditLimit > 0 ? `${((totalCreditUsed / totalCreditLimit) * 100).toFixed(1)}%` : '0%'} do limite
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="accounts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="accounts" className="text-sm">Contas Bancárias</TabsTrigger>
            <TabsTrigger value="cards" className="text-sm">Cartões</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Contas Bancárias</h2>
              <Button onClick={() => {
                setEditingAccount(null)
                setNewAccount({ name: "", type: "bank", initial_balance: 0 })
                setIsAccountDialogOpen(true)
              }} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Conta
              </Button>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => (
                <Card key={account.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                      {getAccountIcon(account.type)}
                      <div>
                        <CardTitle className="text-base">{account.name}</CardTitle>
                        <CardDescription className="text-sm">{getAccountTypeName(account.type)}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">Ativa</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Saldo Atual</p>
                        <p className={`text-lg font-bold ${account.current_balance >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {formatCurrency(account.current_balance)}
                        </p>
                      </div>
                      
                      <div className="flex gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedForStatement({type: 'account', item: account})
                            setIsStatementOpen(true)
                          }}
                          className="flex-1"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="text-xs sm:text-sm">Extrato</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingAccount(account)
                            setNewAccount({
                              name: account.name,
                              type: account.type,
                              initial_balance: account.initial_balance
                            })
                            setIsAccountDialogOpen(true)
                          }}
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cards" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Cartões de Crédito</h2>
              <Button onClick={() => {
                setEditingCreditCard(null)
                setNewCreditCard({
                  name: "",
                  card_type: "visa",
                  limit_amount: 0,
                  due_day: 10,
                  closing_day: 5,
                  best_purchase_day: 6
                })
                setIsCreditCardDialogOpen(true)
              }} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Cartão
              </Button>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {creditCards.map((card) => {
                const usagePercentage = card.limit_amount > 0 ? (card.current_balance / card.limit_amount) * 100 : 0
                return (
                  <Card key={card.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        {getAccountIcon(card.card_type)}
                        <div>
                          <CardTitle className="text-base">{card.name}</CardTitle>
                          <CardDescription className="text-sm">{getAccountTypeName(card.card_type)}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="default">Ativo</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Limite Usado</p>
                          <p className="text-lg font-bold text-destructive">
                            {formatCurrency(card.current_balance)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            de {formatCurrency(card.limit_amount)} ({usagePercentage.toFixed(1)}%)
                          </p>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <p>Vencimento: dia {card.due_day}</p>
                          <p>Fechamento: dia {card.closing_day}</p>
                        </div>
                        
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedForStatement({type: 'card', item: card})
                              setIsStatementOpen(true)
                            }}
                            className="flex-1"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Fatura</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingCreditCard(card)
                              setNewCreditCard({
                                name: card.name,
                                card_type: card.card_type,
                                limit_amount: card.limit_amount,
                                due_day: card.due_day,
                                closing_day: card.closing_day,
                                best_purchase_day: card.best_purchase_day || 6
                              })
                              setIsCreditCardDialogOpen(true)
                            }}
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
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
                {editingAccount 
                  ? "Edite os dados da conta selecionada" 
                  : "Adicione uma nova conta bancária"
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="account-name">Nome da Conta</Label>
                <Input 
                  id="account-name" 
                  placeholder="Ex: Conta Principal" 
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-type">Tipo de Conta</Label>
                <Select 
                  value={newAccount.type} 
                  onValueChange={(value: any) => setNewAccount({...newAccount, type: value})}
                >
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
                {editingCreditCard ? "Editar Cartão" : "Novo Cartão"}
              </DialogTitle>
              <DialogDescription>
                {editingCreditCard 
                  ? "Edite os dados do cartão selecionado" 
                  : "Adicione um novo cartão de crédito"
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="card-name">Nome do Cartão</Label>
                <Input 
                  id="card-name" 
                  placeholder="Ex: Cartão Principal" 
                  value={newCreditCard.name}
                  onChange={(e) => setNewCreditCard({...newCreditCard, name: e.target.value})}
                />
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
                  <Label htmlFor="due-day">Dia Vencimento</Label>
                  <Input 
                    id="due-day" 
                    type="number" 
                    min="1" 
                    max="31"
                    placeholder="10" 
                    value={newCreditCard.due_day}
                    onChange={(e) => setNewCreditCard({...newCreditCard, due_day: Number(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="closing-day">Dia Fechamento</Label>
                  <Input 
                    id="closing-day" 
                    type="number" 
                    min="1" 
                    max="31"
                    placeholder="5" 
                    value={newCreditCard.closing_day}
                    onChange={(e) => setNewCreditCard({...newCreditCard, closing_day: Number(e.target.value)})}
                  />
                </div>
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

        {/* Statement Dialog */}
        <Dialog open={isStatementOpen} onOpenChange={setIsStatementOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedForStatement?.type === 'account' ? 'Extrato' : 'Fatura'} - {selectedForStatement?.item?.name}
              </DialogTitle>
              <DialogDescription>
                Movimentações recentes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedForStatement?.type === 'account' ? 'Saldo Atual' : 'Fatura Atual'}
                  </p>
                  <p className={`text-xl font-bold ${
                    selectedForStatement?.type === 'account' 
                      ? (selectedForStatement.item as Account).current_balance >= 0 ? 'text-success' : 'text-destructive'
                      : 'text-destructive'
                  }`}>
                    {selectedForStatement?.type === 'account' 
                      ? formatCurrency((selectedForStatement.item as Account).current_balance)
                      : formatCurrency((selectedForStatement.item as CreditCard).current_balance)
                    }
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">
                    {getAccountTypeName(
                      selectedForStatement?.type === 'account' 
                        ? (selectedForStatement.item as Account).type 
                        : (selectedForStatement.item as CreditCard).card_type
                    )}
                  </p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedForStatement && (
                    selectedForStatement.type === 'account' 
                      ? getAccountTransactions(selectedForStatement.item.id)
                      : getCreditCardTransactions(selectedForStatement.item.id)
                  ).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {transaction.type === "income" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          {transaction.description}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.categories?.name || 'Sem categoria'}</TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.type === "income" ? "text-success" : "text-destructive"
                      }`}>
                        {transaction.type === "income" ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setIsStatementOpen(false)}>
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

export default ContasImproved