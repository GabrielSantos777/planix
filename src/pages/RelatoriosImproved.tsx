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
  DollarSign,
  PieChart as PieChartIcon,
  FileText,
  Table as TableIcon,
  X,
  Wallet,
  Filter,
  ChevronDown,
  ChevronUp,
  Hash,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/context/CurrencyContext"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import Layout from "@/components/Layout"
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Tooltip,
  Legend,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts"
import jsPDF from "jspdf"
import * as XLSX from "xlsx"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { parseLocalDate } from "@/utils/dateUtils"

const COLORS = [
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#14B8A6",
]

const SHORT_MONTH_NAMES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
const FULL_MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const RelatoriosImproved = () => {
  const { toast } = useToast()
  const { formatCurrency } = useCurrency()
  const { transactions, categories, accounts, creditCards, contacts } = useSupabaseData()

  // Filter state
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7))
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")
  const [creditCardFilter, setCreditCardFilter] = useState("all")
  const [contactFilter, setContactFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [descriptionFilter, setDescriptionFilter] = useState("")
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const clearAllFilters = () => {
    setFilterMonth(new Date().toISOString().slice(0, 7))
    setCategoryFilter("all")
    setTypeFilter("all")
    setAccountFilter("all")
    setCreditCardFilter("all")
    setContactFilter("all")
    setStatusFilter("all")
    setDescriptionFilter("")
  }

  const secondaryActiveCount = [
    typeFilter !== "all",
    categoryFilter !== "all",
    accountFilter !== "all",
    creditCardFilter !== "all",
    contactFilter !== "all",
    statusFilter !== "all",
  ].filter(Boolean).length

  const hasActiveFilters =
    secondaryActiveCount > 0 || !!descriptionFilter

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      const transactionMonth = transaction.date.slice(0, 7)
      const dateMatch = transactionMonth === filterMonth

      const descriptionMatch =
        !descriptionFilter ||
        transaction.description.toLowerCase().includes(descriptionFilter.toLowerCase())

      const categoryMatch = categoryFilter === "all" || transaction.category_id === categoryFilter

      const typeMatch = typeFilter === "all" || transaction.type === typeFilter

      let accountMatch = true
      if (accountFilter !== "all") {
        accountMatch = transaction.account_id === accountFilter
      }

      let creditCardMatch = true
      if (creditCardFilter !== "all") {
        creditCardMatch = transaction.credit_card_id === creditCardFilter
      }

      let contactMatch = true
      if (contactFilter === "me") {
        contactMatch = transaction.contact_id === null
      } else if (contactFilter !== "all") {
        contactMatch = transaction.contact_id === contactFilter
      }

      let statusMatch = true
      if (statusFilter !== "all") {
        const today = new Date()
        const transactionDate = parseLocalDate(transaction.date)
        const isPaid = transactionDate <= today
        if (statusFilter === "paid" && !isPaid) statusMatch = false
        if (statusFilter === "pending" && isPaid) statusMatch = false
      }

      return (
        dateMatch &&
        descriptionMatch &&
        categoryMatch &&
        typeMatch &&
        accountMatch &&
        creditCardMatch &&
        contactMatch &&
        statusMatch
      )
    })

    return filtered.sort(
      (a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime()
    )
  }, [
    transactions,
    filterMonth,
    categoryFilter,
    typeFilter,
    accountFilter,
    creditCardFilter,
    contactFilter,
    statusFilter,
    descriptionFilter,
  ])

  // KPI calculations
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const totalExpenses = filteredTransactions
    .filter((t) => {
      if (t.type !== "expense") return false
      const isInvoicePayment =
        t.description?.toLowerCase().includes("pagamento") &&
        t.description?.toLowerCase().includes("fatura")
      return !isInvoicePayment
    })
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  const netBalance = totalIncome - totalExpenses

  const biggestExpense = useMemo(() => {
    const expenses = filteredTransactions.filter((t) => t.type === "expense")
    if (expenses.length === 0) return null
    return expenses.reduce((max, t) =>
      Math.abs(t.amount || 0) > Math.abs(max.amount || 0) ? t : max
    )
  }, [filteredTransactions])

  // Chart data: expenses by category (donut)
  const expensesByCategory = useMemo(() => {
    const grouped = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const name = t.category?.name || "Sem categoria"
        acc[name] = (acc[name] || 0) + Math.abs(t.amount || 0)
        return acc
      }, {} as Record<string, number>)

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [filteredTransactions])

  // Chart data: account balances (horizontal bar)
  const accountBalancesData = useMemo(() => {
    return accounts
      .filter((acc) => acc.is_active)
      .map((acc) => ({ name: acc.name, balance: acc.current_balance || 0 }))
      .sort((a, b) => b.balance - a.balance)
  }, [accounts])

  // Chart data: last 12 months grouped bars (income vs expense)
  const last12MonthsData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date()
      d.setMonth(d.getMonth() - (11 - i))
      const year = d.getFullYear()
      const month = d.getMonth() // 0-indexed
      const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`

      const monthTransactions = transactions.filter((t) => t.date.slice(0, 7) === monthStr)

      const income = monthTransactions
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + (t.amount || 0), 0)

      const expense = monthTransactions
        .filter((t) => {
          if (t.type !== "expense") return false
          const isInvoice =
            t.description?.toLowerCase().includes("pagamento") &&
            t.description?.toLowerCase().includes("fatura")
          return !isInvoice
        })
        .reduce((s, t) => s + Math.abs(t.amount || 0), 0)

      return {
        month: SHORT_MONTH_NAMES[month],
        receitas: income,
        despesas: expense,
      }
    })
  }, [transactions])

  // Chart data: expenses by day for selected month (area chart)
  const dailyExpensesData = useMemo(() => {
    const [year, month] = filterMonth.split("-").map(Number)
    const daysInMonth = new Date(year, month, 0).getDate()

    const byDay: Record<number, number> = {}
    filteredTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const day = parseLocalDate(t.date).getDate()
        byDay[day] = (byDay[day] || 0) + Math.abs(t.amount || 0)
      })

    return Array.from({ length: daysInMonth }, (_, i) => ({
      dia: i + 1,
      gasto: byDay[i + 1] || 0,
    }))
  }, [filteredTransactions, filterMonth])

  const getFilterPeriodText = () => {
    const [year, month] = filterMonth.split("-")
    return `${FULL_MONTH_NAMES[parseInt(month) - 1]} de ${year}`
  }

  // PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("PLANIX", 20, 20)

    doc.setFontSize(16)
    doc.text("Relatório Financeiro Detalhado", 20, 35)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Período: ${getFilterPeriodText()}`, 20, 50)

    if (hasActiveFilters) {
      let yPos = 60
      if (categoryFilter !== "all") {
        const cat = categories.find((c) => c.id === categoryFilter)
        doc.text(`Categoria: ${cat?.name || "N/A"}`, 20, yPos)
        yPos += 10
      }
      if (typeFilter !== "all") {
        doc.text(
          `Tipo: ${typeFilter === "income" ? "Receita" : typeFilter === "expense" ? "Despesa" : "Transferência"}`,
          20,
          yPos
        )
        yPos += 10
      }
    }

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Resumo Financeiro:", 20, 80)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Total de Receitas: ${formatCurrency(totalIncome)}`, 20, 95)
    doc.text(`Total de Despesas: ${formatCurrency(totalExpenses)}`, 20, 105)
    doc.text(`Saldo Líquido: ${formatCurrency(netBalance)}`, 20, 115)

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Transações:", 20, 135)

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Data", 20, 150)
    doc.text("Descrição", 45, 150)
    doc.text("Categoria", 100, 150)
    doc.text("Valor", 140, 150)
    doc.text("Tipo", 170, 150)

    doc.setFont("helvetica", "normal")
    let yPosition = 160
    filteredTransactions.slice(0, 30).forEach((transaction) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      const date = format(parseLocalDate(transaction.date), "dd/MM/yyyy")
      const description = transaction.description.substring(0, 25)
      const category = transaction.category?.name?.substring(0, 15) || "N/A"
      const amount = formatCurrency(transaction.amount || 0)
      const type = transaction.type === "income" ? "Receita" : "Despesa"

      doc.text(date, 20, yPosition)
      doc.text(description, 45, yPosition)
      doc.text(category, 100, yPosition)
      doc.text(amount, 140, yPosition)
      doc.text(type, 170, yPosition)
      yPosition += 8
    })

    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.text(`Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm")}`, 20, 290)
      doc.text(`Página ${i} de ${totalPages}`, 170, 290)
    }

    doc.save(`Relatorio_Financeiro_${filterMonth.replace("-", "_")}.pdf`)

    toast({ title: "PDF Exportado", description: "Relatório em PDF foi baixado com sucesso" })
  }

  // Excel Export
  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new()

    const detailedData = filteredTransactions.map((transaction) => ({
      Data: format(parseLocalDate(transaction.date), "dd/MM/yyyy"),
      Descrição: transaction.description,
      Categoria: transaction.category?.name || "Sem categoria",
      Conta: transaction.account?.name || transaction.credit_card?.name || "N/A",
      Tipo:
        transaction.type === "income"
          ? "Receita"
          : transaction.type === "expense"
          ? "Despesa"
          : "Transferência",
      Valor: transaction.amount,
      Observações: transaction.notes || "",
    }))

    const detailedSheet = XLSX.utils.json_to_sheet(detailedData)
    XLSX.utils.book_append_sheet(workbook, detailedSheet, "Transações Detalhadas")

    const summaryData = [
      { Métrica: "Total de Receitas", Valor: totalIncome },
      { Métrica: "Total de Despesas", Valor: totalExpenses },
      { Métrica: "Saldo Líquido", Valor: netBalance },
      { Métrica: "", Valor: "" },
      { Métrica: "DESPESAS POR CATEGORIA", Valor: "" },
      ...expensesByCategory.map((cat) => ({ Métrica: cat.name, Valor: cat.value })),
    ]

    const summarySheet = XLSX.utils.json_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Resumo")

    XLSX.writeFile(workbook, `Relatorio_Financeiro_${filterMonth.replace("-", "_")}.xlsx`)

    toast({ title: "Excel Exportado", description: "Relatório em Excel foi baixado com sucesso" })
  }

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "var(--radius)",
    fontSize: "12px",
  }

  return (
    <Layout>
      <div className="space-y-5 p-3 sm:p-4 md:p-6">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold truncate">Relatórios Financeiros</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Análise completa das suas finanças com filtros avançados
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportPDF} variant="outline" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar</span> PDF
            </Button>
            <Button onClick={handleExportExcel} variant="outline" size="sm" className="gap-2">
              <TableIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar</span> Excel
            </Button>
          </div>
        </div>

        {/* ── Compact Filter Bar ── */}
        <div className="rounded-xl border bg-card shadow-sm">
          {/* Primary filter row */}
          <div className="flex flex-wrap items-end gap-3 p-3 sm:p-4">
            {/* Month — always visible */}
            <div className="flex flex-col gap-1.5 min-w-[160px]">
              <Label htmlFor="filterMonth" className="text-xs font-medium">
                Mês
              </Label>
              <Input
                id="filterMonth"
                type="month"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Mais filtros toggle */}
            <Button
              variant={showMoreFilters ? "secondary" : "outline"}
              size="sm"
              className="gap-2 h-9"
              onClick={() => setShowMoreFilters((v) => !v)}
            >
              <Filter className="h-3.5 w-3.5" />
              Mais filtros
              {secondaryActiveCount > 0 && (
                <Badge className="ml-1 h-4 min-w-4 px-1 text-[10px] leading-none">
                  {secondaryActiveCount}
                </Badge>
              )}
              {showMoreFilters ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </Button>

            {/* Clear chip */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="gap-1.5 h-9 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Limpar filtros
              </Button>
            )}
          </div>

          {/* Secondary filters — collapsible */}
          {showMoreFilters && (
            <div className="border-t px-3 sm:px-4 pb-4 pt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* Tipo */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Tipo</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="income">Receita</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                    <SelectItem value="transfer">Transferência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Categoria */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Categoria</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Conta */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Conta</Label>
                <Select value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {accounts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cartão */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Cartão</Label>
                <Select value={creditCardFilter} onValueChange={setCreditCardFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {creditCards.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Responsável */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Responsável</Label>
                <Select value={contactFilter} onValueChange={setContactFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="me">Eu</SelectItem>
                    {contacts.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="paid">Pago</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* ── 5 KPI Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Receitas */}
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Receitas
                </span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 truncate">{getFilterPeriodText()}</p>
            </CardContent>
          </Card>

          {/* Despesas */}
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Despesas
                </span>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-xl font-bold text-red-600 dark:text-red-400 tabular-nums">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 truncate">{getFilterPeriodText()}</p>
            </CardContent>
          </Card>

          {/* Saldo Líquido */}
          <Card
            className={cn(
              "border-l-4",
              netBalance >= 0 ? "border-l-emerald-500" : "border-l-red-500"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Saldo Líquido
                </span>
                <DollarSign
                  className={cn(
                    "h-4 w-4",
                    netBalance >= 0 ? "text-emerald-500" : "text-red-500"
                  )}
                />
              </div>
              <div
                className={cn(
                  "text-xl font-bold tabular-nums",
                  netBalance >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {formatCurrency(netBalance)}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 truncate">{getFilterPeriodText()}</p>
            </CardContent>
          </Card>

          {/* Qtd. Transações */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Transações
                </span>
                <Hash className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                {filteredTransactions.length}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">no período</p>
            </CardContent>
          </Card>

          {/* Maior Gasto */}
          <Card className="border-l-4 border-l-orange-500 col-span-2 sm:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Maior Gasto
                </span>
                <AlertCircle className="h-4 w-4 text-orange-500" />
              </div>
              {biggestExpense ? (
                <>
                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400 tabular-nums">
                    {formatCurrency(Math.abs(biggestExpense.amount || 0))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 truncate" title={biggestExpense.description}>
                    {biggestExpense.description}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-muted-foreground">—</div>
                  <p className="text-[11px] text-muted-foreground mt-1">sem despesas</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Section 1: Receitas × Despesas — Últimos 12 meses (full width) ── */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="h-5 w-5" />
              Receitas × Despesas — Últimos 12 meses
            </CardTitle>
            <CardDescription>Comparativo mensal de entradas e saídas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last12MonthsData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name === "receitas" ? "Receitas" : "Despesas",
                    ]}
                    contentStyle={tooltipStyle}
                  />
                  <Legend
                    formatter={(value) => (value === "receitas" ? "Receitas" : "Despesas")}
                  />
                  <Bar dataKey="receitas" fill="#10B981" radius={[3, 3, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="despesas" fill="#EF4444" radius={[3, 3, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ── Section 2: Donut + Account Balances (2 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* Donut — Gastos por Categoria */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <PieChartIcon className="h-5 w-5" />
                Gastos por Categoria
              </CardTitle>
              <CardDescription>Distribuição das despesas no período</CardDescription>
            </CardHeader>
            <CardContent>
              {expensesByCategory.length > 0 ? (
                <div className="space-y-4">
                  <div className="h-56 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={expensesByCategory}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          label={false}
                        >
                          {expensesByCategory.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={tooltipStyle}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend below */}
                  <div className="grid grid-cols-1 gap-1.5">
                    {expensesByCategory.slice(0, 6).map((cat, index) => (
                      <div key={cat.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="truncate text-muted-foreground">{cat.name}</span>
                        </div>
                        <span className="font-semibold tabular-nums ml-4 flex-shrink-0">
                          {formatCurrency(cat.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-2">
                  <PieChartIcon className="h-10 w-10 opacity-30" />
                  <span className="text-sm">Nenhuma despesa no período</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Horizontal bar — Saldo por Conta */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Wallet className="h-5 w-5" />
                Saldo por Conta
              </CardTitle>
              <CardDescription>Saldo atual de cada conta cadastrada</CardDescription>
            </CardHeader>
            <CardContent>
              {accountBalancesData.length > 0 ? (
                <div className="h-56 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={accountBalancesData}
                      layout="vertical"
                      margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={80}
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={tooltipStyle}
                      />
                      <Bar dataKey="balance" radius={[0, 4, 4, 0]} maxBarSize={28}>
                        {accountBalancesData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.balance >= 0 ? "#10B981" : "#EF4444"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-2">
                  <Wallet className="h-10 w-10 opacity-30" />
                  <span className="text-sm">Nenhuma conta cadastrada</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Section 3: Gastos dia a dia (full width area chart) ── */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Gastos dia a dia — {getFilterPeriodText()}
            </CardTitle>
            <CardDescription>Valor de despesas para cada dia do mês selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dailyExpensesData}
                  margin={{ top: 5, right: 10, bottom: 5, left: -10 }}
                >
                  <defs>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                  <XAxis
                    dataKey="dia"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Gastos"]}
                    labelFormatter={(label) => `Dia ${label}`}
                    contentStyle={tooltipStyle}
                  />
                  <Area
                    type="monotone"
                    dataKey="gasto"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fill="url(#expenseGradient)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#EF4444" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ── Transaction Table ── */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg">Transações Detalhadas</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {filteredTransactions.length} transação(ões) · total:{" "}
                  <span className={cn("font-semibold", netBalance >= 0 ? "text-emerald-600" : "text-red-600")}>
                    {formatCurrency(netBalance)}
                  </span>
                </CardDescription>
              </div>
            </div>

            {/* Description search */}
            <div className="mt-2 max-w-sm">
              <Input
                placeholder="Buscar por descrição..."
                value={descriptionFilter}
                onChange={(e) => setDescriptionFilter(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:px-6 sm:pb-6">
            {filteredTransactions.length > 0 ? (
              <>
                {/* Mobile cards */}
                <div className="block sm:hidden">
                  <div className="max-h-[500px] overflow-y-auto space-y-2 p-3">
                    {filteredTransactions.map((t) => {
                      const isPaid = parseLocalDate(t.date) <= new Date()
                      return (
                        <div
                          key={t.id}
                          className="p-3 border rounded-lg space-y-2 hover:bg-muted/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{t.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(parseLocalDate(t.date), "dd/MM/yyyy")}
                              </p>
                            </div>
                            <Badge
                              variant={t.type === "income" ? "default" : "destructive"}
                              className="flex-shrink-0 text-xs"
                            >
                              {t.type === "income" ? "Receita" : t.type === "expense" ? "Despesa" : "Transfer."}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {t.category?.name || "Sem categoria"}
                            </Badge>
                            <span
                              className={cn(
                                "font-bold text-sm tabular-nums",
                                t.type === "income"
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-red-600 dark:text-red-400"
                              )}
                            >
                              {t.type === "income" ? "+" : "−"}
                              {formatCurrency(Math.abs(t.amount || 0))}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t">
                            <span className="text-xs text-muted-foreground truncate">
                              {t.account?.name || t.credit_card?.name || "N/A"}
                            </span>
                            <Badge variant={isPaid ? "default" : "secondary"} className="text-xs">
                              {isPaid ? "Pago" : "Pendente"}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Desktop table */}
                <div className="hidden sm:block">
                  <div className="max-h-[600px] overflow-y-auto relative">
                    <Table>
                      <TableHeader className="sticky top-0 z-10 bg-card shadow-sm">
                        <TableRow>
                          <TableHead className="text-xs w-[100px]">Data</TableHead>
                          <TableHead className="text-xs">Descrição</TableHead>
                          <TableHead className="text-xs">Categoria</TableHead>
                          <TableHead className="text-xs">Conta</TableHead>
                          <TableHead className="text-xs">Tipo</TableHead>
                          <TableHead className="text-right text-xs">Valor</TableHead>
                          <TableHead className="text-xs w-[90px]">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.map((t, idx) => {
                          const isPaid = parseLocalDate(t.date) <= new Date()
                          return (
                            <TableRow
                              key={t.id}
                              className={cn(
                                "hover:bg-muted/50 transition-colors",
                                idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                              )}
                            >
                              <TableCell className="text-xs font-medium whitespace-nowrap">
                                {format(parseLocalDate(t.date), "dd/MM/yyyy")}
                              </TableCell>
                              <TableCell className="text-xs max-w-[200px]">
                                <span className="truncate block" title={t.description}>
                                  {t.description}
                                </span>
                              </TableCell>
                              <TableCell className="text-xs">
                                <Badge variant="outline" className="text-xs font-normal">
                                  {t.category?.name || "Sem categoria"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                                {t.account?.name || t.credit_card?.name || "N/A"}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={t.type === "income" ? "default" : t.type === "expense" ? "destructive" : "secondary"}
                                  className="text-xs"
                                >
                                  {t.type === "income"
                                    ? "Receita"
                                    : t.type === "expense"
                                    ? "Despesa"
                                    : "Transferência"}
                                </Badge>
                              </TableCell>
                              <TableCell
                                className={cn(
                                  "text-right text-xs font-semibold tabular-nums",
                                  t.type === "income"
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-red-600 dark:text-red-400"
                                )}
                              >
                                {t.type === "income" ? "+" : "−"}
                                {formatCurrency(Math.abs(t.amount || 0))}
                              </TableCell>
                              <TableCell>
                                <Badge variant={isPaid ? "default" : "secondary"} className="text-xs">
                                  {isPaid ? "Pago" : "Pendente"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Table footer */}
                  <div className="flex items-center justify-between px-1 pt-3 text-sm text-muted-foreground border-t mt-1">
                    <span>{filteredTransactions.length} registro(s)</span>
                    <div className="flex gap-4">
                      <span>
                        Receitas:{" "}
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(totalIncome)}
                        </span>
                      </span>
                      <span>
                        Despesas:{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          {formatCurrency(totalExpenses)}
                        </span>
                      </span>
                      <span>
                        Saldo:{" "}
                        <span
                          className={cn(
                            "font-semibold",
                            netBalance >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-600 dark:text-red-400"
                          )}
                        >
                          {formatCurrency(netBalance)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <PieChartIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-2">Nenhuma transação encontrada</h3>
                <p className="text-sm text-muted-foreground">
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
