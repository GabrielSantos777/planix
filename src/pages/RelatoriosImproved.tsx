import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  TrendingUp, 
  TrendingDown, 
  Download,
  Calendar,
  Filter,
  DollarSign,
  PieChart
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/context/CurrencyContext"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import Layout from "@/components/Layout"
import { ResponsiveContainer, PieChart as RechartsPieChart, Cell, Tooltip, Legend, Pie } from 'recharts'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

const RelatoriosImproved = () => {
  const { toast } = useToast()
  const { formatCurrency } = useCurrency()
  const { transactions, categories, accounts } = useSupabaseData()
  
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [transactionFilter, setTransactionFilter] = useState("")
  const [accountFilter, setAccountFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  // Filter transactions based on period and additional filters
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      let dateMatch = true

      if (selectedPeriod === "month") {
        dateMatch = transactionDate.getMonth() + 1 === selectedMonth && 
                   transactionDate.getFullYear() === selectedYear
      } else if (selectedPeriod === "year") {
        dateMatch = transactionDate.getFullYear() === selectedYear
      }

      const descriptionMatch = !transactionFilter || 
        transaction.description.toLowerCase().includes(transactionFilter.toLowerCase())
      
      const accountMatch = !accountFilter || transaction.account_id === accountFilter
      
      const categoryMatch = !categoryFilter || transaction.category_id === categoryFilter

      return dateMatch && descriptionMatch && accountMatch && categoryMatch
    })

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [transactions, selectedPeriod, selectedMonth, selectedYear, transactionFilter, accountFilter, categoryFilter])

  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const totalExpenses = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  const netBalance = totalIncome - totalExpenses

  // Group expenses by category for chart
  const expensesByCategory = useMemo(() => {
    const expenseTransactions = filteredTransactions.filter(t => t.type === "expense")
    const grouped = expenseTransactions.reduce((acc, transaction) => {
      const categoryName = transaction.category?.name || "Sem categoria"
      if (!acc[categoryName]) {
        acc[categoryName] = 0
      }
      acc[categoryName] += Math.abs(transaction.amount || 0)
      return acc
    }, {} as Record<string, number>)

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [filteredTransactions])

  const handleExportPDF = () => {
    // Enhanced PDF with all filtered data
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(18)
    doc.text('Relatório Financeiro', 20, 20)
    
    // Period info
    doc.setFontSize(12)
    let periodText = "Período: "
    if (selectedPeriod === "month") {
      periodText += `${selectedMonth}/${selectedYear}`
    } else if (selectedPeriod === "year") {
      periodText += `${selectedYear}`
    } else {
      periodText += "Todos os registros"
    }
    doc.text(periodText, 20, 35)
    
    // Summary
    doc.setFontSize(14)
    doc.text('Resumo:', 20, 50)
    doc.setFontSize(10)
    doc.text(`Total de Receitas: ${formatCurrency(totalIncome)}`, 20, 60)
    doc.text(`Total de Despesas: ${formatCurrency(totalExpenses)}`, 20, 70)
    doc.text(`Saldo Líquido: ${formatCurrency(netBalance)}`, 20, 80)
    
    // Transactions
    doc.setFontSize(14)
    doc.text('Transações:', 20, 100)
    
    let yPosition = 110
    filteredTransactions.forEach((transaction, index) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.setFontSize(9)
      const type = transaction.type === 'income' ? 'Receita' : 'Despesa'
      const amount = formatCurrency(Math.abs(transaction.amount || 0))
      const date = new Date(transaction.date).toLocaleDateString('pt-BR')
      const category = transaction.category?.name || 'Sem categoria'
      const account = transaction.account?.name || 'Conta removida'
      
      doc.text(`${date} | ${type} | ${transaction.description}`, 20, yPosition)
      doc.text(`${category} | ${account} | ${amount}`, 20, yPosition + 5)
      yPosition += 15
    })
    
    doc.save(`relatorio-financeiro-${Date.now()}.pdf`)
    
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
      'Tipo': transaction.type === 'income' ? 'Receita' : 'Despesa',
      'Categoria': transaction.category?.name || 'Sem categoria',
      'Conta': transaction.account?.name || 'Conta removida',
      'Valor': transaction.amount,
      'Observações': transaction.notes || ''
    }))
    
    const worksheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transações')
    XLSX.writeFile(workbook, `relatorio-financeiro-${Date.now()}.xlsx`)
    
    toast({
      title: "Excel Exportado",
      description: "Relatório em Excel foi baixado com sucesso",
    })
  }

  const getMonthName = (month: number) => {
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
    return months[month - 1]
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Relatórios</h1>
              <p className="text-muted-foreground">
                Análise detalhada das suas finanças
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar PDF
              </Button>
              <Button onClick={handleExportExcel} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar Excel
              </Button>
            </div>
          </div>

          {/* Period Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Período de Análise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os períodos</SelectItem>
                      <SelectItem value="month">Por mês</SelectItem>
                      <SelectItem value="year">Por ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedPeriod === "month" && (
                  <div className="space-y-2">
                    <Label htmlFor="month">Mês</Label>
                    <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {getMonthName(month)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {(selectedPeriod === "month" || selectedPeriod === "year") && (
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano</Label>
                    <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros Avançados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    placeholder="Filtrar por descrição..."
                    value={transactionFilter}
                    onChange={(e) => setTransactionFilter(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="account">Conta</Label>
                  <Select value={accountFilter} onValueChange={setAccountFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as contas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as contas</SelectItem>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Ações</Label>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setTransactionFilter("")
                      setAccountFilter("")
                      setCategoryFilter("")
                    }}
                    className="w-full"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas por Período */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedPeriod === "month" 
                  ? `${getMonthName(selectedMonth)} ${selectedYear}` 
                  : selectedPeriod === "year" 
                    ? `${selectedYear}` 
                    : "Todos os períodos"
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedPeriod === "month" 
                  ? `${getMonthName(selectedMonth)} ${selectedYear}` 
                  : selectedPeriod === "year" 
                    ? `${selectedYear}` 
                    : "Todos os períodos"
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                netBalance >= 0 ? "text-success" : "text-destructive"
              }`}>
                {formatCurrency(netBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedPeriod === "month" 
                  ? `${getMonthName(selectedMonth)} ${selectedYear}` 
                  : selectedPeriod === "year" 
                    ? `${selectedYear}` 
                    : "Todos os períodos"
                }
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          {/* Despesas por Categoria com Gráfico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Despesas por Categoria
              </CardTitle>
              <CardDescription>
                Distribuição de gastos por categoria no período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              {expensesByCategory.length > 0 ? (
                <div className="space-y-6">
                  {/* Gráfico */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <defs>
                          {COLORS.map((color, index) => (
                            <linearGradient key={index} id={`gradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                              <stop offset="100%" stopColor={color} stopOpacity={0.6}/>
                            </linearGradient>
                          ))}
                        </defs>
                        <Pie
                          data={expensesByCategory}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                        >
                          {expensesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`url(#gradient${index % COLORS.length})`} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Lista detalhada */}
                  <div className="space-y-2">
                    {expensesByCategory.map((category, index) => (
                      <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="font-bold text-destructive">
                          {formatCurrency(category.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma despesa encontrada no período selecionado
                </p>
              )}
            </CardContent>
          </Card>

          {/* Todas as Transações */}
          <Card>
            <CardHeader>
              <CardTitle>Todas as Transações</CardTitle>
              <CardDescription>
                {filteredTransactions.length} transação(ões) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Conta</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.description}
                        </TableCell>
                        <TableCell>
                          {transaction.category?.name || 'Sem categoria'}
                        </TableCell>
                        <TableCell>
                          {transaction.account?.name || 'Conta removida'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                            {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${
                          transaction.type === "income" ? "text-success" : "text-destructive"
                        }`}>
                          {transaction.type === "income" ? "+" : ""}
                          {formatCurrency(Math.abs(transaction.amount || 0))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma transação encontrada com os filtros aplicados
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default RelatoriosImproved