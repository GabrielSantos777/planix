import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  TrendingUp, 
  TrendingDown, 
  Download,
  Calendar as CalendarIcon,
  Filter,
  DollarSign,
  PieChart,
  FileText,
  Table as TableIcon,
  X
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/context/CurrencyContext"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import Layout from "@/components/Layout"
import { ResponsiveContainer, PieChart as RechartsPieChart, Cell, Tooltip, Legend, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

const RelatoriosImproved = () => {
  const { toast } = useToast()
  const { formatCurrency } = useCurrency()
  const { transactions, categories, accounts, creditCards } = useSupabaseData()
  
  // Estados para filtros
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [descriptionFilter, setDescriptionFilter] = useState("")

  // Função para limpar todos os filtros
  const clearAllFilters = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    setCategoryFilter("all")
    setTypeFilter("all")
    setAccountFilter("all")
    setStatusFilter("all")
    setDescriptionFilter("")
  }

  // Verificar se há filtros ativos
  const hasActiveFilters = startDate || endDate || categoryFilter !== "all" || 
    typeFilter !== "all" || accountFilter !== "all" || statusFilter !== "all" || descriptionFilter

  // Filter transactions based on all filters
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      
      // Filtro de data
      let dateMatch = true
      if (startDate) {
        dateMatch = dateMatch && transactionDate >= startDate
      }
      if (endDate) {
        dateMatch = dateMatch && transactionDate <= endDate
      }

      // Filtro de descrição
      const descriptionMatch = !descriptionFilter || 
        transaction.description.toLowerCase().includes(descriptionFilter.toLowerCase())
      
      // Filtro de categoria
      const categoryMatch = categoryFilter === "all" || transaction.category_id === categoryFilter
      
      // Filtro de tipo
      const typeMatch = typeFilter === "all" || transaction.type === typeFilter
      
      // Filtro de conta (incluindo cartões de crédito)
      let accountMatch = true
      if (accountFilter !== "all") {
        accountMatch = transaction.account_id === accountFilter || transaction.credit_card_id === accountFilter
      }
      
      // Filtro de status (simulado baseado na data - se futuro = pendente)
      let statusMatch = true
      if (statusFilter !== "all") {
        const today = new Date()
        const isPaid = transactionDate <= today
        if (statusFilter === "paid" && !isPaid) statusMatch = false
        if (statusFilter === "pending" && isPaid) statusMatch = false
      }

      return dateMatch && descriptionMatch && categoryMatch && typeMatch && accountMatch && statusMatch
    })

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [transactions, startDate, endDate, categoryFilter, typeFilter, accountFilter, statusFilter, descriptionFilter])

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

  // Group by type for overview
  const transactionsByType = useMemo(() => {
    const types = {
      income: { name: "Receitas", value: totalIncome, color: "#10B981" },
      expense: { name: "Despesas", value: totalExpenses, color: "#EF4444" }
    }
    return Object.values(types).filter(item => item.value > 0)
  }, [totalIncome, totalExpenses])

  const getFilterPeriodText = () => {
    if (startDate && endDate) {
      return `${format(startDate, "dd/MM/yyyy")} até ${format(endDate, "dd/MM/yyyy")}`
    } else if (startDate) {
      return `A partir de ${format(startDate, "dd/MM/yyyy")}`
    } else if (endDate) {
      return `Até ${format(endDate, "dd/MM/yyyy")}`
    }
    return "Todos os períodos"
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text('Planix', 20, 20)
    
    doc.setFontSize(16)
    doc.text('Relatório Financeiro Detalhado', 20, 35)
    
    // Period and filters info
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Período: ${getFilterPeriodText()}`, 20, 50)
    
    if (hasActiveFilters) {
      let yPos = 60
      if (categoryFilter !== "all") {
        const cat = categories.find(c => c.id === categoryFilter)
        doc.text(`Categoria: ${cat?.name || 'N/A'}`, 20, yPos)
        yPos += 10
      }
      if (typeFilter !== "all") {
        doc.text(`Tipo: ${typeFilter === 'income' ? 'Receita' : typeFilter === 'expense' ? 'Despesa' : 'Transferência'}`, 20, yPos)
        yPos += 10
      }
    }
    
    // Summary
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text('Resumo Financeiro:', 20, 80)
    
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Total de Receitas: ${formatCurrency(totalIncome)}`, 20, 95)
    doc.text(`Total de Despesas: ${formatCurrency(totalExpenses)}`, 20, 105)
    doc.text(`Saldo Líquido: ${formatCurrency(netBalance)}`, 20, 115)
    
    // Transactions table
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text('Transações:', 20, 135)
    
    // Table headers
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text('Data', 20, 150)
    doc.text('Descrição', 45, 150)
    doc.text('Categoria', 100, 150)
    doc.text('Valor', 140, 150)
    doc.text('Tipo', 170, 150)
    
    // Table data
    doc.setFont("helvetica", "normal")
    let yPosition = 160
    filteredTransactions.slice(0, 30).forEach((transaction) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      
      const date = format(new Date(transaction.date), "dd/MM/yyyy")
      const description = transaction.description.substring(0, 25)
      const category = transaction.category?.name?.substring(0, 15) || 'N/A'
      const amount = formatCurrency(Math.abs(transaction.amount || 0))
      const type = transaction.type === 'income' ? 'Receita' : 'Despesa'
      
      doc.text(date, 20, yPosition)
      doc.text(description, 45, yPosition)
      doc.text(category, 100, yPosition)
      doc.text(amount, 140, yPosition)
      doc.text(type, 170, yPosition)
      yPosition += 8
    })
    
    // Footer
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.text(`Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm")}`, 20, 290)
      doc.text(`Página ${i} de ${totalPages}`, 170, 290)
    }
    
    const fileName = `Relatorio_Financeiro_${startDate ? format(startDate, "dd-MM-yyyy") : 'inicio'}_a_${endDate ? format(endDate, "dd-MM-yyyy") : 'fim'}.pdf`
    doc.save(fileName)
    
    toast({
      title: "PDF Exportado",
      description: "Relatório em PDF foi baixado com sucesso",
    })
  }

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new()
    
    // Primeira aba: Dados detalhados
    const detailedData = filteredTransactions.map(transaction => ({
      'Data': format(new Date(transaction.date), "dd/MM/yyyy"),
      'Descrição': transaction.description,
      'Categoria': transaction.category?.name || 'Sem categoria',
      'Conta': transaction.account?.name || transaction.credit_card?.name || 'N/A',
      'Tipo': transaction.type === 'income' ? 'Receita' : transaction.type === 'expense' ? 'Despesa' : 'Transferência',
      'Valor': transaction.amount,
      'Observações': transaction.notes || ''
    }))
    
    const detailedSheet = XLSX.utils.json_to_sheet(detailedData)
    XLSX.utils.book_append_sheet(workbook, detailedSheet, 'Transações Detalhadas')
    
    // Segunda aba: Resumo por categoria
    const summaryData = [
      { 'Métrica': 'Total de Receitas', 'Valor': totalIncome },
      { 'Métrica': 'Total de Despesas', 'Valor': totalExpenses },
      { 'Métrica': 'Saldo Líquido', 'Valor': netBalance },
      { 'Métrica': '', 'Valor': '' }, // Linha em branco
      { 'Métrica': 'DESPESAS POR CATEGORIA', 'Valor': '' },
      ...expensesByCategory.map(cat => ({
        'Métrica': cat.name,
        'Valor': cat.value
      }))
    ]
    
    const summarySheet = XLSX.utils.json_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumo')
    
    const fileName = `Relatorio_Financeiro_${startDate ? format(startDate, "dd-MM-yyyy") : 'inicio'}_a_${endDate ? format(endDate, "dd-MM-yyyy") : 'fim'}.xlsx`
    XLSX.writeFile(workbook, fileName)
    
    toast({
      title: "Excel Exportado",
      description: "Relatório em Excel foi baixado com sucesso",
    })
  }

  // Combinar contas e cartões para o filtro
  const allAccounts = [
    ...accounts.map(acc => ({ id: acc.id, name: acc.name, type: 'account' })),
    ...creditCards.map(cc => ({ id: cc.id, name: cc.name, type: 'credit_card' }))
  ]

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
            <p className="text-muted-foreground">
              Análise completa das suas finanças com filtros avançados
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleExportPDF} variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button onClick={handleExportExcel} variant="outline" className="gap-2">
              <TableIcon className="h-4 w-4" />
              Exportar Excel
            </Button>
          </div>
        </div>

        {/* Filtros Centralizados */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <CardTitle>Filtros de Relatório</CardTitle>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    {[
                      startDate && "Data início",
                      endDate && "Data fim", 
                      categoryFilter !== "all" && "Categoria",
                      typeFilter !== "all" && "Tipo",
                      accountFilter !== "all" && "Conta",
                      statusFilter !== "all" && "Status",
                      descriptionFilter && "Descrição"
                    ].filter(Boolean).length} filtro(s) ativo(s)
                  </Badge>
                )}
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Limpar tudo
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Período - Data Inicial */}
              <div className="space-y-2">
                <Label>Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Período - Data Final */}
              <div className="space-y-2">
                <Label>Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="income">Receita</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                    <SelectItem value="transfer">Transferência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conta */}
              <div className="space-y-2">
                <Label>Conta</Label>
                <Select value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as contas</SelectItem>
                    {allAccounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} {account.type === 'credit_card' && '(Cartão)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="paid">Pago</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filtro de Descrição - Linha separada */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Buscar por descrição</Label>
                <Input
                  placeholder="Digite para filtrar por descrição..."
                  value={descriptionFilter}
                  onChange={(e) => setDescriptionFilter(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <div className="text-sm text-muted-foreground">
                  {filteredTransactions.length} transação(ões) encontrada(s)
                  {hasActiveFilters && " com os filtros aplicados"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Financeiro */}
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
                {getFilterPeriodText()}
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
                {getFilterPeriodText()}
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
                {getFilterPeriodText()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Gráfico de Pizza - Despesas por Categoria */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Despesas por Categoria
              </CardTitle>
              <CardDescription>
                Distribuição dos gastos no período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              {expensesByCategory.length > 0 ? (
                <div className="space-y-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={expensesByCategory}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {expensesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-2">
                    {expensesByCategory.slice(0, 5).map((category, index) => (
                      <div key={category.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{category.name}</span>
                        </div>
                        <span className="font-medium">{formatCurrency(category.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Nenhuma despesa encontrada no período
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gráfico de Barras - Receitas vs Despesas */}
          <Card>
            <CardHeader>
              <CardTitle>Receitas vs Despesas</CardTitle>
              <CardDescription>
                Comparativo financeiro do período
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactionsByType.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transactionsByType}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="value">
                        {transactionsByType.map((entry, index) => (
                          <Cell key={`bar-cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Nenhuma transação encontrada no período
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Transações */}
        <Card>
          <CardHeader>
            <CardTitle>Transações Detalhadas</CardTitle>
            <CardDescription>
              Lista completa das transações filtradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredTransactions.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Conta</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => {
                      const isPaid = new Date(transaction.date) <= new Date()
                      return (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            {format(new Date(transaction.date), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {transaction.category?.name || "Sem categoria"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {transaction.account?.name || transaction.credit_card?.name || "N/A"}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={transaction.type === "income" ? "default" : "destructive"}
                            >
                              {transaction.type === "income" ? "Receita" : 
                               transaction.type === "expense" ? "Despesa" : "Transferência"}
                            </Badge>
                          </TableCell>
                          <TableCell className={`text-right font-medium ${
                            transaction.type === "income" ? "text-success" : "text-destructive"
                          }`}>
                            {transaction.type === "income" ? "+" : "-"}
                            {formatCurrency(Math.abs(transaction.amount || 0))}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={isPaid ? "default" : "secondary"}
                            >
                              {isPaid ? "Pago" : "Pendente"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <PieChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma transação encontrada</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros para ver suas transações
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default RelatoriosImproved