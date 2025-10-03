import { useState } from "react"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import { useCurrency } from "@/context/CurrencyContext"
import { useToast } from "@/hooks/use-toast"
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
import { Plus, TrendingUp, TrendingDown, Trash2, RefreshCw } from "lucide-react"
import { CurrencyInput } from "@/components/ui/currency-input-fixed"

const Investimentos = () => {
  const { investments, addInvestment, deleteInvestment, updateInvestment, loading } = useSupabaseData()
  const { formatCurrency, currencies, selectedCurrency } = useCurrency()
  const { toast } = useToast()
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newInvestment, setNewInvestment] = useState({
    symbol: '',
    name: '',
    type: 'stocks' as 'stocks' | 'crypto' | 'bonds' | 'funds',
    quantity: 0,
    average_price: 0,
    current_price: 0,
    currency: 'BRL'
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

    try {
      await addInvestment({
        ...newInvestment,
        current_price: newInvestment.average_price, // Inicialmente o preço atual é igual ao preço médio
      })
      
      setNewInvestment({
        symbol: '',
        name: '',
        type: 'stocks',
        quantity: 0,
        average_price: 0,
        current_price: 0,
        currency: 'BRL'
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
        try {
          let newPrice = investment.current_price

          // Para ações brasileiras (terminam com número)
          if (investment.type === 'stocks' && /\d$/.test(investment.symbol)) {
            const response = await fetch(`https://brapi.dev/api/quote/${investment.symbol}`)
            const data = await response.json()
            
            if (data.results && data.results.length > 0) {
              newPrice = data.results[0].regularMarketPrice
              updatedCount++
            } else {
              errorCount++
              console.error(`Preço não encontrado para ${investment.symbol}`)
            }
          } 
          // Para criptomoedas
          else if (investment.type === 'crypto') {
            const cryptoSymbol = investment.symbol.replace(/USD$|BRL$/, '').toLowerCase()
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=brl`)
            const data = await response.json()
            
            if (data[cryptoSymbol] && data[cryptoSymbol].brl) {
              newPrice = data[cryptoSymbol].brl
              updatedCount++
            } else {
              errorCount++
              console.error(`Preço não encontrado para ${investment.symbol}`)
            }
          } else {
            errorCount++
            console.warn(`Tipo de ativo não suportado ou formato inválido: ${investment.symbol}`)
            continue
          }

          if (newPrice !== investment.current_price) {
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
          description: `${updatedCount} investimento(s) atualizado(s) com sucesso${errorCount > 0 ? `. ${errorCount} erro(s).` : ''}`
        })
      } else {
        toast({
          title: "⚠️ Atenção",
          description: "Não foi possível atualizar nenhum preço. Verifique os símbolos dos ativos.",
          variant: "destructive"
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
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header Section - Responsivo */}
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-start">
          {/* Título e Descrição - Sempre à esquerda */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-left">Investimentos</h1>
            <p className="text-sm sm:text-base text-muted-foreground text-left">
              Gerencie seu portfólio de investimentos
            </p>
          </div>
          
          {/* Status e Botões - Layout Responsivo */}
          <div className="flex flex-col space-y-3 lg:space-y-2 lg:items-end">
            {/* Indicador de Status - Mobile primeiro */}
            <div className="flex items-center gap-2 lg:justify-end">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                Preços atualizados automaticamente
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

        {/* Resumo */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(totalValue)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lucro/Prejuízo
              </CardTitle>
              {totalProfit >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(totalProfit)}
              </div>
              <p className={`text-xs ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {profitPercentage > 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
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
              <CardHeader>
                <CardTitle>Meus Investimentos</CardTitle>
                <CardDescription>
                  Lista completa dos seus ativos
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteInvestment(investment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="charts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Valor</CardTitle>
                  <CardDescription>
                    Valor atual de cada ativo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
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
                <CardHeader>
                  <CardTitle>Distribuição por Tipo</CardTitle>
                  <CardDescription>
                    Porcentagem de cada tipo de investimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
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
      </div>
    </Layout>
  )
}

export default Investimentos