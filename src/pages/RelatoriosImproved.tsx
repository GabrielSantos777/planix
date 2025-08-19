import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  TrendingUp, 
  TrendingDown, 
  Download,
  Calendar,
  FileText,
  BarChart3
} from "lucide-react"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import { useCurrency } from "@/context/CurrencyContext"
import Layout from "@/components/Layout"
import jsPDF from 'jspdf'

const RelatoriosImproved = () => {
  const { transactions, accounts, categories } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [filterType, setFilterType] = useState<"month" | "period">("month")

  const months = [
    { value: 0, label: "Janeiro" },
    { value: 1, label: "Fevereiro" },
    { value: 2, label: "Março" },
    { value: 3, label: "Abril" },
    { value: 4, label: "Maio" },
    { value: 5, label: "Junho" },
    { value: 6, label: "Julho" },
    { value: 7, label: "Agosto" },
    { value: 8, label: "Setembro" },
    { value: 9, label: "Outubro" },
    { value: 10, label: "Novembro" },
    { value: 11, label: "Dezembro" }
  ]

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      
      if (filterType === "month") {
        return transactionDate.getMonth() === selectedMonth && 
               transactionDate.getFullYear() === selectedYear
      } else {
        const from = dateFrom ? new Date(dateFrom) : null
        const to = dateTo ? new Date(dateTo) : null
        
        if (from && transactionDate < from) return false
        if (to && transactionDate > to) return false
        return true
      }
    })
  }, [transactions, filterType, selectedMonth, selectedYear, dateFrom, dateTo])

  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const totalExpenses = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  const netBalance = totalIncome - totalExpenses

  const categoryExpenses = useMemo(() => {
    const expenses = filteredTransactions.filter(t => t.type === "expense")
    const categoryMap = new Map<string, { amount: number; name: string; color: string }>()
    
    expenses.forEach(transaction => {
      const category = categories.find(c => c.id === transaction.category_id)
      const categoryName = category?.name || "Sem categoria"
      const categoryColor = category?.color || "#6B7280"
      
      if (categoryMap.has(categoryName)) {
        categoryMap.get(categoryName)!.amount += Math.abs(transaction.amount || 0)
      } else {
        categoryMap.set(categoryName, {
          amount: Math.abs(transaction.amount || 0),
          name: categoryName,
          color: categoryColor
        })
      }
    })
    
    return Array.from(categoryMap.values()).sort((a, b) => b.amount - a.amount)
  }, [filteredTransactions, categories])

  const accountBalances = useMemo(() => {
    return accounts.map(account => ({
      name: account.name,
      balance: account.current_balance || 0,
      transactions: filteredTransactions.filter(t => t.account_id === account.id).length
    }))
  }, [accounts, filteredTransactions])

  const getPeriodLabel = () => {
    if (filterType === "month") {
      return `${months[selectedMonth].label} de ${selectedYear}`
    } else {
      const from = dateFrom ? new Date(dateFrom).toLocaleDateString('pt-BR') : "Início"
      const to = dateTo ? new Date(dateTo).toLocaleDateString('pt-BR') : "Fim"
      return `${from} - ${to}`
    }
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    
    // Título
    doc.setFontSize(18)
    doc.text('Relatório Financeiro', 20, 20)
    
    // Período
    doc.setFontSize(12)
    doc.text(`Período: ${getPeriodLabel()}`, 20, 35)
    
    // Resumo
    doc.setFontSize(14)
    doc.text('Resumo Financeiro', 20, 55)
    
    doc.setFontSize(10)
    let yPos = 70
    
    doc.text(`Total de Receitas: ${formatCurrency(totalIncome)}`, 20, yPos)
    yPos += 8
    doc.text(`Total de Despesas: ${formatCurrency(totalExpenses)}`, 20, yPos)
    yPos += 8
    doc.text(`Saldo Líquido: ${formatCurrency(netBalance)}`, 20, yPos)
    yPos += 15
    
    // Despesas por categoria
    doc.setFontSize(14)
    doc.text('Despesas por Categoria', 20, yPos)
    yPos += 10
    
    doc.setFontSize(10)
    categoryExpenses.forEach((category, index) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      const percentage = totalExpenses > 0 ? ((category.amount / totalExpenses) * 100).toFixed(1) : '0.0'
      doc.text(`${category.name}: ${formatCurrency(category.amount)} (${percentage}%)`, 20, yPos)
      yPos += 8
    })
    
    // Transações
    yPos += 10
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    
    doc.setFontSize(14)
    doc.text('Transações', 20, yPos)
    yPos += 10
    
    doc.setFontSize(8)
    filteredTransactions.slice(0, 50).forEach((transaction, index) => {
      if (yPos > 280) {
        doc.addPage()
        yPos = 20
      }
      
      const type = transaction.type === 'income' ? 'R' : transaction.type === 'expense' ? 'D' : 'T'
      const category = categories.find(c => c.id === transaction.category_id)?.name || 'S/C'
      const account = accounts.find(a => a.id === transaction.account_id)?.name || 'S/C'
      
      doc.text(
        `${new Date(transaction.date).toLocaleDateString('pt-BR')} | ${type} | ${transaction.description.substring(0, 25)} | ${category} | ${account} | ${formatCurrency(Math.abs(transaction.amount))}`,
        20, yPos
      )
      yPos += 6
    })
    
    doc.save(`relatorio-financeiro-${getPeriodLabel().replace(/\s/g, '-')}.pdf`)
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">
              Análise detalhada das suas finanças
            </p>
          </div>
          <Button onClick={handleExportPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Período do Relatório
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant={filterType === "month" ? "default" : "outline"}
                  onClick={() => setFilterType("month")}
                  size="sm"
                >
                  Por Mês
                </Button>
                <Button
                  variant={filterType === "period" ? "default" : "outline"}
                  onClick={() => setFilterType("period")}
                  size="sm"
                >
                  Período Customizado
                </Button>
              </div>
              
              {filterType === "month" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mês</Label>
                    <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value.toString()}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ano</Label>
                    <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data Início</Label>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Data Fim</Label>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Receitas - {getPeriodLabel()}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredTransactions.filter(t => t.type === "income").length} transação(ões)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Despesas - {getPeriodLabel()}
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredTransactions.filter(t => t.type === "expense").length} transação(ões)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saldo Líquido - {getPeriodLabel()}
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(netBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                {netBalance >= 0 ? 'Resultado positivo' : 'Resultado negativo'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Despesas por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
            <CardDescription>
              Distribuição das suas despesas no período selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryExpenses.map((category, index) => {
                const percentage = totalExpenses > 0 ? (category.amount / totalExpenses) * 100 : 0
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-destructive">
                        {formatCurrency(category.amount)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Saldos das Contas */}
        <Card>
          <CardHeader>
            <CardTitle>Saldos das Contas</CardTitle>
            <CardDescription>
              Situação atual das suas contas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accountBalances.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {account.transactions} transação(ões) no período
                    </p>
                  </div>
                  <div className={`font-bold ${
                    account.balance >= 0 ? "text-success" : "text-destructive"
                  }`}>
                    {formatCurrency(account.balance)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default RelatoriosImproved