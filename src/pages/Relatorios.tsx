import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  BarChart3,
  FileText,
  Calendar,
  List
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import { useCurrency } from "@/context/CurrencyContext"
import Layout from "@/components/Layout"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'
import { WealthEvolutionChart } from '@/components/WealthEvolutionChart'

const periodOptions = [
  { value: "current-month", label: "Mês Atual" },
  { value: "last-month", label: "Mês Passado" },
  { value: "last-3-months", label: "Últimos 3 Meses" },
  { value: "last-6-months", label: "Últimos 6 Meses" },
  { value: "current-year", label: "Ano Atual" }
]

interface CategoryData {
  category: string
  amount: number
  percentage: number
  color: string
}

interface MonthlyData {
  month: string
  income: number
  expenses: number
  balance: number
}

const Relatorios = () => {
  const { toast } = useToast()
  const { transactions } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expenseViewType, setExpenseViewType] = useState<"list" | "chart">("list")
  const [incomeViewType, setIncomeViewType] = useState<"list" | "chart">("list")

  // Cores para gráficos
  const CHART_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ffb347']

  // Filtrar transações baseado no período selecionado
  const filteredTransactions = useMemo(() => {
    const now = new Date()
    let startDate = new Date()

    switch (selectedPeriod) {
      case "current-month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case "last-month":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const endDate = new Date(now.getFullYear(), now.getMonth(), 0)
        return transactions.filter(t => {
          const transactionDate = new Date(t.date)
          return transactionDate >= startDate && transactionDate <= endDate
        })
      case "last-3-months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1)
        break
      case "last-6-months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1)
        break
      case "current-year":
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    return transactions.filter(t => {
      const transactionDate = new Date(t.date)
      const categoryMatch = selectedCategory === "all" || t.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
      return transactionDate >= startDate && categoryMatch
    })
  }, [transactions, selectedPeriod, selectedCategory])

  // Calcular dados das categorias de despesas
  const expenseCategories: CategoryData[] = useMemo(() => {
    const expenses = filteredTransactions.filter(t => t.type === "expense")
    const categoryTotals = expenses.reduce((acc, transaction) => {
      const category = transaction.category?.name || 'Sem categoria'
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount)
      return acc
    }, {} as Record<string, number>)

    const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)
    
    return Object.entries(categoryTotals)
      .map(([category, amount], index) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
        color: CHART_COLORS[index % CHART_COLORS.length]
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [filteredTransactions])

  // Calcular dados das categorias de receitas
  const incomeCategories: CategoryData[] = useMemo(() => {
    const incomes = filteredTransactions.filter(t => t.type === "income")
    const categoryTotals = incomes.reduce((acc, transaction) => {
      const category = transaction.category?.name || 'Sem categoria'
      acc[category] = (acc[category] || 0) + transaction.amount
      return acc
    }, {} as Record<string, number>)

    const totalIncome = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)
    
    return Object.entries(categoryTotals)
      .map(([category, amount], index) => ({
        category,
        amount,
        percentage: totalIncome > 0 ? Math.round((amount / totalIncome) * 100) : 0,
        color: CHART_COLORS[index % CHART_COLORS.length]
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [filteredTransactions])

  // Calcular dados mensais
  const monthlyData: MonthlyData[] = useMemo(() => {
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    const monthlyTotals = filteredTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`
      const monthName = monthNames[date.getMonth()]
      
      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthName, income: 0, expenses: 0, balance: 0 }
      }
      
      if (transaction.type === "income") {
        acc[monthKey].income += transaction.amount
      } else if (transaction.type === "expense") {
        acc[monthKey].expenses += Math.abs(transaction.amount)
      }
      
      return acc
    }, {} as Record<string, MonthlyData>)

    return Object.values(monthlyTotals)
      .map(data => ({
        ...data,
        balance: data.income - data.expenses
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
  }, [filteredTransactions])

  const handleExportPDF = () => {
    const doc = new jsPDF()
    
    // Header with gradient background effect
    doc.setFillColor(59, 130, 246) // Blue color
    doc.rect(0, 0, 210, 40, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text('Relatório Financeiro', 20, 25)
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.text(`Período: ${periodOptions.find(p => p.value === selectedPeriod)?.label || 'Atual'}`, 20, 55)
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 20, 65)
    
    // Summary section with background
    doc.setFillColor(248, 250, 252) // Light gray
    doc.rect(15, 75, 180, 50, 'F')
    doc.setDrawColor(203, 213, 225)
    doc.rect(15, 75, 180, 50, 'S')
    
    doc.setFontSize(16)
    doc.setTextColor(15, 23, 42)
    doc.text('💰 Resumo Financeiro', 20, 90)
    
    doc.setFontSize(12)
    doc.setTextColor(22, 163, 74) // Green for income
    doc.text(`📈 Total de Receitas: R$ ${totalIncome.toLocaleString('pt-BR')}`, 25, 105)
    
    doc.setTextColor(239, 68, 68) // Red for expenses
    doc.text(`📉 Total de Despesas: R$ ${totalExpenses.toLocaleString('pt-BR')}`, 25, 115)
    
    doc.setTextColor(totalBalance >= 0 ? 22 : 239, totalBalance >= 0 ? 163 : 68, totalBalance >= 0 ? 74 : 68)
    doc.text(`💳 Saldo Líquido: R$ ${totalBalance.toLocaleString('pt-BR')}`, 25, 125)
    
    let yPosition = 145
    
    // Expense categories section
    if (expenseCategories.length > 0) {
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(16)
      doc.text('📊 Despesas por Categoria', 20, yPosition)
      yPosition += 15
      
      expenseCategories.forEach((category, index) => {
        if (yPosition > 260) {
          doc.addPage()
          yPosition = 30
        }
        
        // Category bar visualization
        const barWidth = (category.percentage / 100) * 100
        doc.setFillColor(239, 68, 68) // Red color for expense bars
        doc.rect(25, yPosition - 5, barWidth, 8, 'F')
        
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
        doc.text(`${category.category}`, 25, yPosition + 8)
        doc.text(`R$ ${category.amount.toLocaleString('pt-BR')} (${category.percentage}%)`, 130, yPosition + 8)
        
        yPosition += 18
      })
    }
    
    // Footer
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text('Relatório gerado automaticamente pelo sistema', 20, 285)
    doc.text(`Página 1`, 180, 285)
    
    doc.save(`relatorio-financeiro-${new Date().toISOString().split('T')[0]}.pdf`)
    
    toast({
      title: "📄 Relatório Exportado!",
      description: "Seu relatório em PDF foi baixado com sucesso.",
    })
  }

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new()
    
    // Aba de resumo
    const summaryData = [
      ['Resumo Financeiro', ''],
      ['Total de Receitas', `R$ ${totalIncome.toLocaleString('pt-BR')}`],
      ['Total de Despesas', `R$ ${totalExpenses.toLocaleString('pt-BR')}`],
      ['Saldo Líquido', `R$ ${totalBalance.toLocaleString('pt-BR')}`],
      [''],
      ['Despesas por Categoria', ''],
      ...expenseCategories.map(cat => [cat.category, `R$ ${cat.amount.toLocaleString('pt-BR')}`])
    ]
    const summaryWS = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(wb, summaryWS, 'Resumo')
    
    // Aba de transações detalhadas
    const transactionsWS = XLSX.utils.json_to_sheet(filteredTransactions.map(item => ({
      'Data': new Date(item.date).toLocaleDateString('pt-BR'),
      'Descrição': item.description,
      'Categoria': item.category?.name || 'Sem categoria',
      'Tipo': item.type === 'income' ? 'Receita' : 'Despesa',
      'Valor': `R$ ${Math.abs(item.amount).toLocaleString('pt-BR')}`
    })))
    XLSX.utils.book_append_sheet(wb, transactionsWS, 'Transações')
    
    XLSX.writeFile(wb, `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.xlsx`)
    
    toast({
      title: "Relatório exportado!",
      description: "O arquivo Excel foi baixado com sucesso.",
    })
  }

  const totalIncome = useMemo(() => 
    filteredTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)
  , [filteredTransactions])

  const totalExpenses = useMemo(() => 
    filteredTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  , [filteredTransactions])

  const totalBalance = totalIncome - totalExpenses

  // Obter categorias únicas para o filtro
  const availableCategories = useMemo(() => {
    const categories = new Set(transactions.map(t => t.category?.name).filter(Boolean))
    return Array.from(categories)
  }, [transactions])

  return (
    <Layout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Análises e relatórios financeiros detalhados
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleExportPDF} variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Exportar PDF
          </Button>
          <Button onClick={handleExportExcel} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-48">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Mês Atual</SelectItem>
                  <SelectItem value="last-month">Mês Passado</SelectItem>
                  <SelectItem value="last-3-months">Últimos 3 Meses</SelectItem>
                  <SelectItem value="last-6-months">Últimos 6 Meses</SelectItem>
                  <SelectItem value="current-year">Ano Atual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {availableCategories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatCurrency(totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="dashboard" className="text-xs sm:text-sm">Dashboard</TabsTrigger>
          <TabsTrigger value="categories" className="text-xs sm:text-sm">Categorias</TabsTrigger>
          <TabsTrigger value="monthly" className="text-xs sm:text-sm">Mensal</TabsTrigger>
          <TabsTrigger value="comparison" className="text-xs sm:text-sm">Evolução</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Expense Categories Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {expenseViewType === "list" ? <BarChart3 className="h-5 w-5" /> : <PieChart className="h-5 w-5" />}
                    Despesas por Categoria
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpenseViewType(expenseViewType === "list" ? "chart" : "list")}
                    className="gap-2"
                  >
                    {expenseViewType === "list" ? <PieChart className="h-4 w-4" /> : <List className="h-4 w-4" />}
                    {expenseViewType === "list" ? "Gráfico" : "Lista"}
                  </Button>
                </CardTitle>
                <CardDescription>Distribuição dos gastos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseCategories.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma despesa encontrada para o período selecionado
                  </p>
                ) : expenseViewType === "list" ? (
                  expenseCategories.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.category}</span>
                        <span className="font-medium">
                          R$ {category.amount.toLocaleString('pt-BR')} ({category.percentage}%)
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <defs>
                          {expenseCategories.map((category, index) => (
                            <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={category.color} />
                              <stop offset="100%" stopColor={category.color} stopOpacity={0.8} />
                            </linearGradient>
                          ))}
                        </defs>
                        <Pie
                          data={expenseCategories.map((cat, idx) => ({ ...cat, fill: `url(#gradient-${idx})` }))}
                          dataKey="amount"
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ category, percentage }) => `${category}: ${percentage}%`}
                        >
                          {expenseCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Income Categories Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {incomeViewType === "list" ? <BarChart3 className="h-5 w-5" /> : <PieChart className="h-5 w-5" />}
                    Receitas por Fonte
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIncomeViewType(incomeViewType === "list" ? "chart" : "list")}
                    className="gap-2"
                  >
                    {incomeViewType === "list" ? <PieChart className="h-4 w-4" /> : <List className="h-4 w-4" />}
                    {incomeViewType === "list" ? "Gráfico" : "Lista"}
                  </Button>
                </CardTitle>
                <CardDescription>Origem das receitas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {incomeCategories.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma receita encontrada para o período selecionado
                  </p>
                ) : incomeViewType === "list" ? (
                  incomeCategories.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.category}</span>
                        <span className="font-medium">
                          R$ {category.amount.toLocaleString('pt-BR')} ({category.percentage}%)
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <defs>
                          {incomeCategories.map((category, index) => (
                            <linearGradient key={`gradient-income-${index}`} id={`gradient-income-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={category.color} />
                              <stop offset="100%" stopColor={category.color} stopOpacity={0.8} />
                            </linearGradient>
                          ))}
                        </defs>
                        <Pie
                          data={incomeCategories.map((cat, idx) => ({ ...cat, fill: `url(#gradient-income-${idx})` }))}
                          dataKey="amount"
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ category, percentage }) => `${category}: ${percentage}%`}
                        >
                          {incomeCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada por Categoria</CardTitle>
              <CardDescription>Gastos e receitas organizados por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Percentual</TableHead>
                    <TableHead className="text-right">Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Nenhuma despesa encontrada para o período selecionado
                      </TableCell>
                    </TableRow>
                  ) : (
                    [...expenseCategories, ...incomeCategories].map((category) => (
                      <TableRow key={category.category}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {category.category}
                            <Badge variant={expenseCategories.includes(category) ? "destructive" : "default"}>
                              {expenseCategories.includes(category) ? "Despesa" : "Receita"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          R$ {category.amount.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-right">{category.percentage}%</TableCell>
                        <TableCell className="text-right text-muted-foreground">-</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Gráfico de Barras Mensal */}
            <Card>
              <CardHeader>
                <CardTitle>Gráfico Mensal</CardTitle>
                <CardDescription>Visualização gráfica da evolução mensal</CardDescription>
              </CardHeader>
              <CardContent>
                {monthlyData.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum dado encontrado para o período selecionado
                  </p>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number, name: string) => [
                            `R$ ${value.toLocaleString('pt-BR')}`, 
                            name === 'income' ? 'Receitas' : name === 'expenses' ? 'Despesas' : 'Saldo'
                          ]} 
                        />
                        <Legend />
                        <Bar dataKey="income" fill="#22c55e" name="Receitas" />
                        <Bar dataKey="expenses" fill="#ef4444" name="Despesas" />
                        <Bar dataKey="balance" fill="#3b82f6" name="Saldo" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabela Mensal */}
            <Card>
              <CardHeader>
                <CardTitle>Tabela Detalhada</CardTitle>
                <CardDescription>Valores detalhados por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mês</TableHead>
                      <TableHead className="text-right">Receitas</TableHead>
                      <TableHead className="text-right">Despesas</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          Nenhum dado encontrado para o período selecionado
                        </TableCell>
                      </TableRow>
                    ) : (
                      monthlyData.map((month) => (
                        <TableRow key={month.month}>
                          <TableCell className="font-medium">{month.month}</TableCell>
                          <TableCell className="text-right text-success">
                            R$ {month.income.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-right text-destructive">
                            R$ {month.expenses.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell className={`text-right font-medium ${
                            month.balance >= 0 ? 'text-success' : 'text-destructive'
                          }`}>
                            R$ {month.balance.toLocaleString('pt-BR')}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <WealthEvolutionChart />
        </TabsContent>
      </Tabs>
      </div>
    </Layout>
  )
}

export default Relatorios