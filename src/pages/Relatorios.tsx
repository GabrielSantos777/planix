import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  BarChart3,
  FileText,
  Calendar
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Layout from "@/components/Layout"

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
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const expenseCategories: CategoryData[] = [
    { category: "Alimentação", amount: 1200, percentage: 35, color: "bg-destructive" },
    { category: "Transporte", amount: 800, percentage: 23, color: "bg-warning" },
    { category: "Moradia", amount: 600, percentage: 18, color: "bg-primary" },
    { category: "Lazer", amount: 400, percentage: 12, color: "bg-success" },
    { category: "Outros", amount: 400, percentage: 12, color: "bg-muted" }
  ]

  const incomeCategories: CategoryData[] = [
    { category: "Salário", amount: 5000, percentage: 80, color: "bg-success" },
    { category: "Freelance", amount: 800, percentage: 13, color: "bg-primary" },
    { category: "Investimentos", amount: 450, percentage: 7, color: "bg-warning" }
  ]

  const monthlyData: MonthlyData[] = [
    { month: "Jan", income: 6250, expenses: 3400, balance: 2850 },
    { month: "Fev", income: 6100, expenses: 3200, balance: 2900 },
    { month: "Mar", income: 6250, expenses: 3600, balance: 2650 },
    { month: "Abr", income: 6400, expenses: 3800, balance: 2600 },
    { month: "Mai", income: 6250, expenses: 3400, balance: 2850 },
    { month: "Jun", income: 6350, expenses: 3500, balance: 2850 }
  ]

  const handleExportPDF = () => {
    toast({
      title: "Relatório PDF",
      description: "Relatório em PDF será baixado em breve",
    })
  }

  const handleExportExcel = () => {
    toast({
      title: "Relatório Excel",
      description: "Planilha Excel será baixada em breve",
    })
  }

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0)
  const totalBalance = totalIncome - totalExpenses

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
                  <SelectItem value="alimentacao">Alimentação</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="moradia">Moradia</SelectItem>
                  <SelectItem value="lazer">Lazer</SelectItem>
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
              R$ {totalIncome.toLocaleString('pt-BR')}
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
              R$ {totalExpenses.toLocaleString('pt-BR')}
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
              R$ {totalBalance.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="comparison">Comparativo</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Expense Categories Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Despesas por Categoria
                </CardTitle>
                <CardDescription>Distribuição dos gastos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseCategories.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category.category}</span>
                      <span className="font-medium">
                        R$ {category.amount.toLocaleString('pt-BR')} ({category.percentage}%)
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Income Categories Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Receitas por Fonte
                </CardTitle>
                <CardDescription>Origem das receitas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {incomeCategories.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category.category}</span>
                      <span className="font-medium">
                        R$ {category.amount.toLocaleString('pt-BR')} ({category.percentage}%)
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
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
                  {expenseCategories.map((category) => (
                    <TableRow key={category.category}>
                      <TableCell className="font-medium">{category.category}</TableCell>
                      <TableCell className="text-right">
                        R$ {category.amount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">{category.percentage}%</TableCell>
                      <TableCell className="text-right text-success">+5.2%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal</CardTitle>
              <CardDescription>Comparativo de receitas e despesas por mês</CardDescription>
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
                  {monthlyData.map((month) => (
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Períodos</CardTitle>
              <CardDescription>Análise comparativa entre diferentes períodos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Período Atual</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Receitas:</span>
                      <span className="font-medium text-success">R$ 6.250</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Despesas:</span>
                      <span className="font-medium text-destructive">R$ 3.400</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Saldo:</span>
                      <span className="font-bold text-success">R$ 2.850</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Período Anterior</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Receitas:</span>
                      <span className="font-medium text-success">R$ 6.100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Despesas:</span>
                      <span className="font-medium text-destructive">R$ 3.200</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Saldo:</span>
                      <span className="font-bold text-success">R$ 2.900</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-4">Variações</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Receitas:</span>
                    <span className="font-medium text-success">+R$ 150 (+2.5%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Despesas:</span>
                    <span className="font-medium text-destructive">+R$ 200 (+6.3%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saldo:</span>
                    <span className="font-medium text-destructive">-R$ 50 (-1.7%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </Layout>
  )
}

export default Relatorios