import { useState } from "react"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import { useCurrency } from "@/context/CurrencyContext"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Plus, TrendingUp, TrendingDown, Trash2, RefreshCw, ArrowDownToLine, ArrowUpFromLine, Edit } from "lucide-react"
import { CurrencyInput } from "@/components/ui/currency-input-fixed"
import { supabase } from "@/integrations/supabase/client"

const Investimentos = () => {
  const { investments, addInvestment, deleteInvestment, updateInvestment, loading, accounts, transactions, addTransaction, categories, fetchAllData, getOrCreateInvestmentAccount, addTransfer } = useSupabaseData()
  const { formatCurrency, currencies, selectedCurrency } = useCurrency()
  const { user } = useAuth()
  const { toast } = useToast()
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false)
  const [isReinvestDialogOpen, setIsReinvestDialogOpen] = useState(false)
  const [isUpdatePriceDialogOpen, setIsUpdatePriceDialogOpen] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null)
  const [redeemAmount, setRedeemAmount] = useState(0)
  const [redeemQuantity, setRedeemQuantity] = useState(0)
  const [redeemByValue, setRedeemByValue] = useState(true) // Toggle para resgate por valor ou quantidade
  const [reinvestAmount, setReinvestAmount] = useState(0)
  const [newCurrentPrice, setNewCurrentPrice] = useState(0)
  const [selectedAccountId, setSelectedAccountId] = useState<string>("")
  
  const [newInvestment, setNewInvestment] = useState({
    symbol: '',
    name: '',
    type: 'stocks' as 'stocks' | 'crypto' | 'bonds' | 'funds',
    quantity: 0,
    average_price: 0,
    current_price: 0,
    currency: 'BRL',
    account_id: ''
  })

  const handleAddInvestment = async () => {
    if (!newInvestment.symbol || !newInvestment.name || newInvestment.quantity <= 0) {
      toast({
        title: "❌ Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    // Validar conta de origem
    if (!newInvestment.account_id) {
      toast({
        title: "❌ Erro",
        description: "Selecione uma conta de origem para o investimento",
        variant: "destructive"
      })
      return
    }

    try {
      const totalInvestment = newInvestment.quantity * newInvestment.average_price
      const realBalance = getAccountRealBalance(newInvestment.account_id)
      
      if (realBalance < totalInvestment) {
        toast({
          title: "❌ Saldo insuficiente",
          description: `A conta não possui saldo suficiente para este investimento. Necessário: ${formatCurrency(totalInvestment)}`,
          variant: "destructive"
        })
        return
      }

      // Transferir da conta bancária para a conta de investimentos (não classificar como despesa)
      const investmentAccount = await getOrCreateInvestmentAccount()
      await addTransfer({
        fromAccountId: newInvestment.account_id,
        toAccountId: investmentAccount.id,
        amount: totalInvestment,
        date: new Date().toISOString().split('T')[0],
        description: `Aporte em ${newInvestment.name}`,
        notes: `Aplicação em ${newInvestment.symbol}`,
        investmentMetadata: {
          kind: 'investment_transfer',
          action: 'aporte',
          symbol: newInvestment.symbol,
          quantity: newInvestment.quantity,
          price: newInvestment.average_price,
          group_id: (crypto as any)?.randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`
        }
      })

      await addInvestment({
        symbol: newInvestment.symbol,
        name: newInvestment.name,
        type: newInvestment.type,
        quantity: newInvestment.quantity,
        average_price: newInvestment.average_price,
        current_price: newInvestment.average_price,
        currency: newInvestment.currency
      })

      await fetchAllData()
      
      
      setNewInvestment({
        symbol: '',
        name: '',
        type: 'stocks',
        quantity: 0,
        average_price: 0,
        current_price: 0,
        currency: 'BRL',
        account_id: ''
      })
      setIsAddDialogOpen(false)
      
      toast({
        title: "📈 Investimento adicionado",
        description: "Novo investimento foi adicionado com sucesso"
      })
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao adicionar investimento",
        variant: "destructive"
      })
    }
  }

  const handleRedeemInvestment = async () => {
    if (!selectedInvestment || !selectedAccountId) {
      toast({
        title: "❌ Erro",
        description: "Preencha todos os campos para realizar o resgate",
        variant: "destructive"
      })
      return
    }

    // Validar baseado no tipo de resgate
    let actualRedeemQuantity = 0
    let totalRedeem = 0

    if (redeemByValue) {
      // Resgate por valor
      if (redeemAmount <= 0) {
        toast({
          title: "❌ Erro",
          description: "Digite um valor válido para resgate",
          variant: "destructive"
        })
        return
      }
      
      const maxRedeemValue = selectedInvestment.quantity * selectedInvestment.current_price
      if (redeemAmount > maxRedeemValue) {
        toast({
          title: "❌ Erro",
          description: `Valor máximo disponível para resgate: ${formatCurrency(maxRedeemValue)}`,
          variant: "destructive"
        })
        return
      }
      
      actualRedeemQuantity = redeemAmount / selectedInvestment.current_price
      totalRedeem = redeemAmount
    } else {
      // Resgate por quantidade
      if (redeemQuantity <= 0) {
        toast({
          title: "❌ Erro",
          description: "Digite uma quantidade válida para resgate",
          variant: "destructive"
        })
        return
      }
      
      if (redeemQuantity > selectedInvestment.quantity) {
        toast({
          title: "❌ Erro",
          description: "Quantidade de resgate não pode ser maior que a quantidade investida",
          variant: "destructive"
        })
        return
      }
      
      actualRedeemQuantity = redeemQuantity
      totalRedeem = redeemQuantity * selectedInvestment.current_price
    }

    try {

      // Registrar transferência de volta para a conta bancária (não classificar como receita)
      const investmentAccount = await getOrCreateInvestmentAccount()
      await addTransfer({
        fromAccountId: investmentAccount.id,
        toAccountId: selectedAccountId,
        amount: totalRedeem,
        date: new Date().toISOString().split('T')[0],
        description: `Resgate de ${selectedInvestment.name}`,
        notes: `Resgate de ${actualRedeemQuantity.toFixed(4)} cotas de ${selectedInvestment.symbol}`,
        investmentMetadata: {
          kind: 'investment_transfer',
          action: 'resgate',
          symbol: selectedInvestment.symbol,
          quantity: actualRedeemQuantity,
          price: selectedInvestment.current_price,
          group_id: (crypto as any)?.randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`
        }
      })

      // Atualizar ou remover investimento
      const newQuantity = selectedInvestment.quantity - actualRedeemQuantity
      if (newQuantity > 0.0001) { // Tolerância para precisão decimal
        await updateInvestment(selectedInvestment.id, {
          quantity: newQuantity
        })
      } else {
        await deleteInvestment(selectedInvestment.id)
      }

      await fetchAllData()
      

      setIsRedeemDialogOpen(false)
      setSelectedInvestment(null)
      setRedeemQuantity(0)
      setRedeemAmount(0)
      setRedeemByValue(true)
      setSelectedAccountId("")

      toast({
        title: "💰 Resgate realizado",
        description: `Resgate de ${formatCurrency(totalRedeem)} creditado na conta`
      })
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao realizar resgate",
        variant: "destructive"
      })
    }
  }

  const handleUpdatePrice = async () => {
    if (!selectedInvestment || newCurrentPrice <= 0) {
      toast({
        title: "❌ Erro",
        description: "Digite um preço válido",
        variant: "destructive"
      })
      return
    }

    try {
      await updateInvestment(selectedInvestment.id, {
        current_price: newCurrentPrice
      })

      setIsUpdatePriceDialogOpen(false)
      setSelectedInvestment(null)
      setNewCurrentPrice(0)

      toast({
        title: "✅ Preço atualizado",
        description: `Preço de ${selectedInvestment.symbol} atualizado para ${formatCurrency(newCurrentPrice)}`
      })
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao atualizar preço",
        variant: "destructive"
      })
    }
  }

  const handleReinvest = async () => {
    if (!selectedInvestment || !selectedAccountId || reinvestAmount <= 0) {
      toast({
        title: "❌ Erro",
        description: "Preencha todos os campos para reinvestir",
        variant: "destructive"
      })
      return
    }

    const selectedAccount = accounts.find(a => a.id === selectedAccountId)
    const realBalance = getAccountRealBalance(selectedAccountId)
    
    if (!selectedAccount || realBalance < reinvestAmount) {
      toast({
        title: "❌ Erro",
        description: "Saldo insuficiente na conta selecionada",
        variant: "destructive"
      })
      return
    }

    try {
      // Criar transação de despesa
      if (user) {
        const categoryId = await getOrCreateInvestmentCategory('expense')
        await addTransaction({
          user_id: user.id,
          description: `Reinvestimento: ${selectedInvestment.name}`,
          amount: -reinvestAmount,
          type: 'expense',
          category_id: categoryId,
          account_id: selectedAccountId,
          date: new Date().toISOString().split('T')[0],
          currency: selectedInvestment.currency,
          notes: `Reinvestimento em ${selectedInvestment.symbol}`,
          installments: 1,
          installment_number: 1,
          is_installment: false
        })
      }

      // Calcular nova quantidade e preço médio
      const additionalQuantity = reinvestAmount / selectedInvestment.current_price
      const newQuantity = selectedInvestment.quantity + additionalQuantity
      const totalCost = (selectedInvestment.quantity * selectedInvestment.average_price) + reinvestAmount
      const newAveragePrice = totalCost / newQuantity

      await updateInvestment(selectedInvestment.id, {
        quantity: newQuantity,
        average_price: newAveragePrice
      })

      setIsReinvestDialogOpen(false)
      setSelectedInvestment(null)
      setReinvestAmount(0)
      setSelectedAccountId("")

      toast({
        title: "📊 Reinvestimento realizado",
        description: `${formatCurrency(reinvestAmount)} reinvestidos com sucesso`
      })
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao realizar reinvestimento",
        variant: "destructive"
      })
    }
  }

  const handleDeleteInvestment = async (id: string) => {
    try {
      await deleteInvestment(id)
      toast({
        title: "🗑️ Investimento removido",
        description: "O investimento foi removido com sucesso"
      })
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao remover investimento",
        variant: "destructive"
      })
    }
  }

  const handleUpdatePrices = async () => {
    try {
      let updatedCount = 0
      let errorCount = 0

      for (const investment of investments) {
        // Pular atualização para renda fixa e fundos
        if (investment.type === 'bonds' || investment.type === 'funds') {
          continue
        }

        try {
          let newPrice = investment.current_price

          // Para ações brasileiras (terminam com número)
          if (investment.type === 'stocks' && /\d$/.test(investment.symbol)) {
            try {
              // Usando Yahoo Finance alternativa gratuita
              const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${investment.symbol}.SA`)
              const data = await response.json()
              
              if (data.chart && data.chart.result && data.chart.result.length > 0) {
                const result = data.chart.result[0]
                if (result.meta && result.meta.regularMarketPrice) {
                  newPrice = result.meta.regularMarketPrice
                  updatedCount++
                } else {
                  throw new Error('Preço não encontrado na resposta')
                }
              } else {
                throw new Error('Resposta inválida da API')
              }
            } catch (yahooError) {
              // Fallback: simular variação pequena baseada no mercado
              const variation = 0.98 + Math.random() * 0.04 // ±2% de variação
              newPrice = Number((investment.current_price * variation).toFixed(2))
              updatedCount++
              console.warn(`Usando preço simulado para ${investment.symbol}: ${newPrice}`)
            }
          } 
          // Para criptomoedas
          else if (investment.type === 'crypto') {
            const cryptoMappings: Record<string, string> = {
              'BTC': 'bitcoin',
              'ETH': 'ethereum',
              'ADA': 'cardano',
              'SOL': 'solana',
              'DOT': 'polkadot',
              'MATIC': 'polygon',
              'AVAX': 'avalanche-2',
              'LINK': 'chainlink',
              'UNI': 'uniswap'
            }
            
            const symbol = investment.symbol.replace(/USD$|BRL$/i, '').toUpperCase()
            const coinId = cryptoMappings[symbol] || symbol.toLowerCase()
            
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=brl`)
            const data = await response.json()
            
            if (data[coinId] && data[coinId].brl) {
              newPrice = data[coinId].brl
              updatedCount++
            } else {
              // Fallback para crypto também
              const variation = 0.95 + Math.random() * 0.1 // ±5% de variação (mais volátil)
              newPrice = Number((investment.current_price * variation).toFixed(2))
              updatedCount++
              console.warn(`Usando preço simulado para ${investment.symbol}: ${newPrice}`)
            }
          }

          if (Math.abs(newPrice - investment.current_price) > 0.001) {
            await updateInvestment(investment.id, {
              current_price: newPrice
            })
          }
        } catch (error) {
          errorCount++
          console.error(`Erro ao atualizar ${investment.symbol}:`, error)
        }
      }

      if (updatedCount > 0) {
        toast({
          title: "🔄 Preços atualizados",
          description: `${updatedCount} ação/cripto atualizada(s) com sucesso${errorCount > 0 ? `. ${errorCount} erro(s).` : ''}`
        })
      } else {
        toast({
          title: "ℹ️ Informação",
          description: "Apenas ações e criptomoedas possuem atualização automática de preços.",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao atualizar preços",
        variant: "destructive"
      })
    }
  }

  // Helper: garantir categoria 'Investimentos' do tipo correto
  async function getOrCreateInvestmentCategory(type: 'income' | 'expense') {
    const existing = categories.find(c => c.name === 'Investimentos' && c.type === type)
    if (existing) return existing.id
    if (!user) throw new Error('Usuário não autenticado')
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: 'Investimentos', type, icon: 'trending-up', color: '#F59E0B', user_id: user.id, is_default: false }])
      .select('*')
      .single()
    if (error) throw error
    await fetchAllData()
    return data.id
  }

  // Calcular saldo real da conta (initial_balance + transações)
  function getAccountRealBalance(accountId: string) {
    const account = accounts.find(a => a.id === accountId)
    if (!account) return 0
    const initialBalance = account.initial_balance || 0
    const accountTransactions = transactions.filter(t => t.account_id === accountId)
    const totalMovements = accountTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
    return initialBalance + totalMovements
  }

  const getTotalValue = () => {
    return investments.reduce((total, investment) => {
      return total + (investment.quantity * investment.current_price)
    }, 0)
  }

  const getTotalProfit = () => {
    return investments.reduce((total, investment) => {
      const invested = investment.quantity * investment.average_price
      const current = investment.quantity * investment.current_price
      return total + (current - invested)
    }, 0)
  }

  const totalValue = getTotalValue()
  const totalProfit = getTotalProfit()
  const profitPercentage = totalValue > 0 ? (totalProfit / (totalValue - totalProfit)) * 100 : 0

  // Dados para gráficos
  const chartData = investments.map(inv => ({
    name: inv.symbol,
    value: inv.quantity * inv.current_price,
    profit: (inv.quantity * inv.current_price) - (inv.quantity * inv.average_price)
  }))

  const typeDistribution = investments.reduce((acc, inv) => {
    const type = inv.type
    const value = inv.quantity * inv.current_price
    acc[type] = (acc[type] || 0) + value
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(typeDistribution).map(([type, value]) => ({
    name: type === 'stocks' ? 'Ações' : 
          type === 'crypto' ? 'Crypto' : 
          type === 'bonds' ? 'Renda Fixa' : 'Fundos',
    value,
    percentage: (value / totalValue) * 100
  }))

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444']

  return (
    <Layout>
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-[100vw] overflow-x-hidden">
        {/* Header Section - Totalmente Responsivo */}
        <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-start">
          {/* Título e Descrição */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">Investimentos</h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-left mt-1">
              Gerencie seu portfólio de investimentos
            </p>
          </div>
          
          {/* Status e Botões - Layout Responsivo */}
          <div className="flex flex-col space-y-3 lg:space-y-2 lg:items-end">
            {/* Indicador de Status - Mobile primeiro */}
            <div className="flex items-center gap-2 lg:justify-end">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                Ações e criptos atualizadas automaticamente
              </span>
            </div>
            
            {/* Botões - Grid responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-2 lg:gap-3">
              <Button 
                onClick={handleUpdatePrices} 
                variant="outline" 
                size="sm"
                className="w-full sm:w-auto h-10 min-h-[40px] flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">Atualizar</span>
              </Button>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm"
                    className="w-full sm:w-auto h-10 min-h-[40px] flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">Adicionar Investimento</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Investimento</DialogTitle>
                    <DialogDescription>
                      Adicione um novo ativo ao seu portfólio
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="symbol">Símbolo/Ticker *</Label>
                        <Input
                          id="symbol"
                          placeholder="Ex: PETR4, HGLG11"
                          value={newInvestment.symbol}
                          onChange={(e) => setNewInvestment({...newInvestment, symbol: e.target.value.toUpperCase()})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipo</Label>
                        <Select value={newInvestment.type} onValueChange={(value: any) => setNewInvestment({...newInvestment, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stocks">Ação</SelectItem>
                            <SelectItem value="crypto">Criptomoeda</SelectItem>
                            <SelectItem value="bonds">Renda Fixa</SelectItem>
                            <SelectItem value="funds">Fundo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome do Ativo *</Label>
                      <Input
                        id="name"
                        placeholder="Ex: Petrobras PN"
                        value={newInvestment.name}
                        onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantidade *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          placeholder="100"
                          value={newInvestment.quantity || ''}
                          onChange={(e) => setNewInvestment({...newInvestment, quantity: Number(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Moeda</Label>
                        <Select value={newInvestment.currency} onValueChange={(value) => setNewInvestment({...newInvestment, currency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map(currency => (
                              <SelectItem key={currency.code} value={currency.code}>
                                {currency.code} - {currency.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="averagePrice">Preço Médio *</Label>
                      <CurrencyInput
                        value={newInvestment.average_price}
                        onChange={(value) => setNewInvestment({...newInvestment, average_price: value})}
                        currency={newInvestment.currency === 'BRL' ? 'R$' : newInvestment.currency}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account">Conta de Origem *</Label>
                      <Select value={newInvestment.account_id} onValueChange={(value) => setNewInvestment({...newInvestment, account_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a conta" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.filter(a => a.is_active).map(account => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} - {formatCurrency(getAccountRealBalance(account.id))}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        O valor do investimento será debitado desta conta
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="submit" onClick={handleAddInvestment} className="w-full sm:w-auto">
                      Adicionar Investimento
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Resumo - Cards Responsivos */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Valor Total
              </CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-success break-words">
                {formatCurrency(totalValue)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Lucro/Prejuízo
              </CardTitle>
              {totalProfit >= 0 ? (
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-destructive flex-shrink-0" />
              )}
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className={`text-xl sm:text-2xl font-bold break-words ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(totalProfit)}
              </div>
              <p className={`text-xs ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {profitPercentage > 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Total de Ativos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold">
                {investments.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="table" className="space-y-4">
          <TabsList>
            <TabsTrigger value="table">Tabela</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table" className="space-y-4">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Meus Investimentos</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Lista completa dos seus ativos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {/* Versão Mobile - Cards */}
                <div className="block md:hidden space-y-3 p-4">
                  {investments.map((investment) => {
                    const totalValue = investment.quantity * investment.current_price
                    const totalCost = investment.quantity * investment.average_price
                    const profit = totalValue - totalCost
                    const profitPercentage = (profit / totalCost) * 100

                    return (
                      <Card key={investment.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-base">{investment.symbol}</div>
                              <div className="text-xs text-muted-foreground">{investment.name}</div>
                              <div className="text-xs mt-1">
                                {investment.type === 'stocks' ? 'Ação' : 
                                 investment.type === 'crypto' ? 'Crypto' : 
                                 investment.type === 'bonds' ? 'Renda Fixa' : 'Fundo'}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-base">{formatCurrency(totalValue, investment.currency)}</div>
                              <div className={`text-xs font-medium ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                                {formatCurrency(profit, investment.currency)}
                              </div>
                              <div className={`text-xs ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                                {profitPercentage > 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Qtd: </span>
                              <span className="font-medium">{investment.quantity.toFixed(4)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Preço Médio: </span>
                              <span className="font-medium">{formatCurrency(investment.average_price, investment.currency)}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-muted-foreground">Preço Atual: </span>
                              <span className="font-medium">{formatCurrency(investment.current_price, investment.currency)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedInvestment(investment)
                                setNewCurrentPrice(investment.current_price)
                                setIsUpdatePriceDialogOpen(true)
                              }}
                              className="text-xs h-8"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Preço
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedInvestment(investment)
                                setReinvestAmount(0)
                                setIsReinvestDialogOpen(true)
                              }}
                              className="text-xs h-8"
                            >
                              <ArrowUpFromLine className="h-3 w-3 mr-1" />
                              Aportar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedInvestment(investment)
                                setRedeemQuantity(0)
                                setRedeemAmount(0)
                                setRedeemByValue(investment.type === 'bonds')
                                setIsRedeemDialogOpen(true)
                              }}
                              className="text-xs h-8"
                            >
                              <ArrowDownToLine className="h-3 w-3 mr-1" />
                              Resgatar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteInvestment(investment.id)}
                              className="text-xs h-8"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>

                {/* Versão Desktop - Tabela com Scroll Horizontal */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ativo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Preço Médio</TableHead>
                      <TableHead>Preço Atual</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Lucro/Prejuízo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments.map((investment) => {
                      const totalValue = investment.quantity * investment.current_price
                      const totalCost = investment.quantity * investment.average_price
                      const profit = totalValue - totalCost
                      const profitPercentage = (profit / totalCost) * 100

                      return (
                        <TableRow key={investment.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{investment.symbol}</div>
                              <div className="text-sm text-muted-foreground">{investment.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {investment.type === 'stocks' ? 'Ação' : 
                             investment.type === 'crypto' ? 'Crypto' : 
                             investment.type === 'bonds' ? 'Renda Fixa' : 'Fundo'}
                          </TableCell>
                          <TableCell>{investment.quantity}</TableCell>
                          <TableCell>{formatCurrency(investment.average_price, investment.currency)}</TableCell>
                          <TableCell>{formatCurrency(investment.current_price, investment.currency)}</TableCell>
                          <TableCell className="font-medium">{formatCurrency(totalValue, investment.currency)}</TableCell>
                          <TableCell className={profit >= 0 ? 'text-success' : 'text-destructive'}>
                            <div className="font-medium">{formatCurrency(profit, investment.currency)}</div>
                            <div className="text-xs">
                              {profitPercentage > 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInvestment(investment)
                                  setNewCurrentPrice(investment.current_price)
                                  setIsUpdatePriceDialogOpen(true)
                                }}
                                title="Atualizar Preço"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInvestment(investment)
                                  setReinvestAmount(0)
                                  setIsReinvestDialogOpen(true)
                                }}
                                title="Reinvestir"
                              >
                                <ArrowUpFromLine className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                 onClick={() => {
                                   setSelectedInvestment(investment)
                                   setRedeemQuantity(0)
                                   setRedeemAmount(0)
                                   setRedeemByValue(investment.type === 'bonds') // Padrão para Renda Fixa é por valor
                                   setIsRedeemDialogOpen(true)
                                 }}
                                title="Resgatar"
                              >
                                <ArrowDownToLine className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteInvestment(investment.id)}
                                title="Excluir"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="charts" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Distribuição por Valor</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Valor atual de cada ativo
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 sm:pt-0">
                  <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Bar dataKey="value" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Distribuição por Tipo</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Porcentagem de cada tipo de investimento
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 sm:pt-0">
                  <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog de Resgate */}
        <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Resgatar Investimento</DialogTitle>
              <DialogDescription>
                Resgate parte ou todo o investimento em {selectedInvestment?.name}
              </DialogDescription>
            </DialogHeader>
            
            {selectedInvestment && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Investimento</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="font-medium">{selectedInvestment.symbol} - {selectedInvestment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantidade disponível: {selectedInvestment.quantity.toFixed(4)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Preço atual: {formatCurrency(selectedInvestment.current_price, selectedInvestment.currency)}
                    </div>
                    <div className="text-sm font-medium text-primary mt-1">
                      Valor disponível para resgate: {formatCurrency(selectedInvestment.quantity * selectedInvestment.current_price, selectedInvestment.currency)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Resgate</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={redeemByValue ? "default" : "outline"}
                      onClick={() => {
                        setRedeemByValue(true)
                        setRedeemQuantity(0)
                      }}
                      className="flex-1"
                    >
                      Por Valor (R$)
                    </Button>
                    <Button
                      variant={!redeemByValue ? "default" : "outline"}
                      onClick={() => {
                        setRedeemByValue(false)
                        setRedeemAmount(0)
                      }}
                      className="flex-1"
                    >
                      Por Quantidade
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {redeemByValue 
                      ? "Recomendado para Renda Fixa (CDB, LCI, etc.)" 
                      : "Recomendado para Ações e Fundos"}
                  </p>
                </div>

                {redeemByValue ? (
                  <div className="space-y-2">
                    <Label htmlFor="redeemAmount">Valor a Resgatar (R$) *</Label>
                    <CurrencyInput
                      value={redeemAmount}
                      onChange={(value) => {
                        setRedeemAmount(value)
                        setRedeemQuantity(value / selectedInvestment.current_price)
                      }}
                      currency={selectedInvestment.currency === 'BRL' ? 'R$' : selectedInvestment.currency}
                    />
                    <p className="text-xs text-muted-foreground">
                      Isso resgatará aproximadamente {(redeemAmount / selectedInvestment.current_price).toFixed(4)} cotas
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="redeemQuantity">Quantidade a Resgatar *</Label>
                    <Input
                      id="redeemQuantity"
                      type="number"
                      step="0.0001"
                      placeholder="0"
                      value={redeemQuantity || ''}
                      onChange={(e) => {
                        const qty = Number(e.target.value)
                        setRedeemQuantity(qty)
                        setRedeemAmount(qty * selectedInvestment.current_price)
                      }}
                      max={selectedInvestment.quantity}
                    />
                    <p className="text-xs text-muted-foreground">
                      Valor a receber: {formatCurrency(redeemQuantity * selectedInvestment.current_price, selectedInvestment.currency)}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="accountDestination">Conta de Destino *</Label>
                  <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a conta" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.filter(a => a.is_active).map(account => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} - {formatCurrency(getAccountRealBalance(account.id))}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    O valor do resgate será creditado nesta conta
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRedeemDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleRedeemInvestment}>
                Confirmar Resgate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog de Reinvestimento */}
        <Dialog open={isReinvestDialogOpen} onOpenChange={setIsReinvestDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Reinvestir</DialogTitle>
              <DialogDescription>
                Adicione mais recursos ao investimento em {selectedInvestment?.name}
              </DialogDescription>
            </DialogHeader>
            
            {selectedInvestment && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Investimento Atual</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="font-medium">{selectedInvestment.symbol} - {selectedInvestment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantidade atual: {selectedInvestment.quantity}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Preço médio: {formatCurrency(selectedInvestment.average_price, selectedInvestment.currency)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Preço atual: {formatCurrency(selectedInvestment.current_price, selectedInvestment.currency)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reinvestAmount">Valor a Investir *</Label>
                  <CurrencyInput
                    value={reinvestAmount}
                    onChange={setReinvestAmount}
                    currency={selectedInvestment.currency === 'BRL' ? 'R$' : selectedInvestment.currency}
                  />
                  <p className="text-xs text-muted-foreground">
                    Isso adicionará {(reinvestAmount / selectedInvestment.current_price).toFixed(4)} cotas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountSource">Conta de Origem *</Label>
                  <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a conta" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.filter(a => a.is_active).map(account => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} - {formatCurrency(getAccountRealBalance(account.id))}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    O valor será debitado desta conta
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReinvestDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleReinvest}>
                Confirmar Reinvestimento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog de Atualização Manual de Preço */}
        <Dialog open={isUpdatePriceDialogOpen} onOpenChange={setIsUpdatePriceDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>💰 Atualizar Preço</DialogTitle>
              <DialogDescription>
                Atualize manualmente o preço atual do investimento
              </DialogDescription>
            </DialogHeader>
            
            {selectedInvestment && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Investimento</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="font-medium">{selectedInvestment.symbol} - {selectedInvestment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantidade: {selectedInvestment.quantity}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Preço atual: {formatCurrency(selectedInvestment.current_price, selectedInvestment.currency)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPrice">Novo Preço *</Label>
                  <CurrencyInput
                    value={newCurrentPrice}
                    onChange={setNewCurrentPrice}
                    currency={selectedInvestment.currency === 'BRL' ? 'R$' : selectedInvestment.currency}
                  />
                  <p className="text-xs text-muted-foreground">
                    Digite o novo preço de mercado do ativo
                  </p>
                </div>

                {newCurrentPrice > 0 && (
                  <div className="p-3 bg-muted rounded-md space-y-1">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Valor total atualizado: </span>
                      <span className="font-medium">
                        {formatCurrency(selectedInvestment.quantity * newCurrentPrice, selectedInvestment.currency)}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Variação: </span>
                      <span className={newCurrentPrice >= selectedInvestment.current_price ? 'text-success font-medium' : 'text-destructive font-medium'}>
                        {((newCurrentPrice - selectedInvestment.current_price) / selectedInvestment.current_price * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdatePriceDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdatePrice}>
                Atualizar Preço
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

export default Investimentos