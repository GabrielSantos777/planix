import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingDown, TrendingUp, AlertCircle, Plus, ChevronLeft, ChevronRight, Settings, Copy, PieChart } from 'lucide-react';
import { useBudget } from '@/hooks/useBudget';
import { useBudgetAnalytics } from '@/hooks/useBudgetAnalytics';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { formatCurrency } from '@/utils/formatters';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cell, Pie, PieChart as RechartsPie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencyInput } from '@/components/ui/currency-input';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function Orcamento() {
  const { selectedCurrency } = useCurrency();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);

  const { categories } = useSupabaseData();
  const { budgets, settings, isLoading, upsertBudget, deleteBudget, copyFromPreviousMonth, updateSettings } = useBudget(selectedMonth, selectedYear);
  const { categorySpending, summary } = useBudgetAnalytics(selectedMonth, selectedYear, budgets);

  const [formData, setFormData] = useState({
    category_id: '',
    planned_amount: 0,
    notes: '',
  });

  const [settingsData, setSettingsData] = useState({
    savings_goal_percentage: settings?.savings_goal_percentage || 20,
    enable_rollover: settings?.enable_rollover || false,
    enable_zero_based: settings?.enable_zero_based || false,
  });

  const handlePreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category_id || formData.planned_amount <= 0) {
      return;
    }
    
    await upsertBudget.mutateAsync({
      id: editingBudget?.id,
      category_id: formData.category_id,
      month: selectedMonth,
      year: selectedYear,
      planned_amount: formData.planned_amount,
      notes: formData.notes || undefined,
    });

    setFormData({ category_id: '', planned_amount: 0, notes: '' });
    setEditingBudget(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (budget: any) => {
    setEditingBudget(budget);
    setFormData({
      category_id: budget.category_id,
      planned_amount: Number(budget.planned_amount),
      notes: budget.notes || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleSaveSettings = async () => {
    await updateSettings.mutateAsync(settingsData);
    setIsSettingsDialogOpen(false);
  };

  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  const expenseSpending = categorySpending.filter(c => c.categoryType === 'expense');
  const incomeSpending = categorySpending.filter(c => c.categoryType === 'income');

  const chartData = expenseSpending.map(c => ({
    name: c.categoryName,
    value: c.planned,
    color: c.categoryColor,
  }));

  const savingsAmount = summary.totalIncomeActual - summary.totalActual;
  const savingsGoal = (summary.totalIncomeActual * (settings?.savings_goal_percentage || 20)) / 100;
  const savingsProgress = savingsGoal > 0 ? (savingsAmount / savingsGoal) * 100 : 0;

  type SummaryType = typeof summary & {
    totalRemaining: number;
    percentageUsed: number;
  };

  const summaryWithCalculated: SummaryType = {
    ...summary,
    totalRemaining: summary.totalPlanned - summary.totalActual,
    percentageUsed: summary.totalPlanned > 0 ? (summary.totalActual / summary.totalPlanned) * 100 : 0,
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Orçamento Mensal</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Planeje e acompanhe seus gastos e receitas
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="sm:size-icon">
                  <Settings className="h-4 w-4" />
                  <span className="sm:hidden ml-2">Configurações</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configurações de Orçamento</DialogTitle>
                  <DialogDescription>
                    Configure suas preferências de orçamento
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Meta de Poupança (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={settingsData.savings_goal_percentage}
                      onChange={(e) => setSettingsData({ ...settingsData, savings_goal_percentage: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Rolar saldo para próximo mês</Label>
                    <Switch
                      checked={settingsData.enable_rollover}
                      onCheckedChange={(checked) => setSettingsData({ ...settingsData, enable_rollover: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Orçamento Zero-Based</Label>
                    <Switch
                      checked={settingsData.enable_zero_based}
                      onCheckedChange={(checked) => setSettingsData({ ...settingsData, enable_zero_based: checked })}
                    />
                  </div>
                  <Button onClick={handleSaveSettings} className="w-full">
                    Salvar Configurações
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={() => copyFromPreviousMonth.mutate()} variant="outline" size="sm" className="flex-shrink-0">
              <Copy className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Copiar Mês Anterior</span>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex-shrink-0">
                  <Plus className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Adicionar Orçamento</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingBudget ? 'Editar' : 'Adicionar'} Orçamento</DialogTitle>
                  <DialogDescription>
                    Defina o valor planejado para uma categoria
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                      required
                      disabled={!!editingBudget}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Despesas</div>
                        {expenseCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Receitas</div>
                        {incomeCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Valor Planejado</Label>
                    <CurrencyInput
                      value={formData.planned_amount}
                      onChange={(value) => setFormData({ ...formData, planned_amount: value })}
                      currency={selectedCurrency.symbol}
                      placeholder="0,00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Adicione observações sobre este orçamento..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingBudget ? 'Atualizar' : 'Adicionar'}
                    </Button>
                    {editingBudget && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          deleteBudget.mutate(editingBudget.id);
                          setEditingBudget(null);
                          setIsAddDialogOpen(false);
                        }}
                      >
                        Excluir
                      </Button>
                    )}
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Month Selector */}
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {MONTHS[selectedMonth - 1]} {selectedYear}
              </span>
            </div>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Receita Prevista</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(summary.totalIncomePlanned, selectedCurrency.code)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Realizado: {formatCurrency(summary.totalIncomeActual, selectedCurrency.code)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Despesas Planejadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(summary.totalPlanned, selectedCurrency.code)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Realizado: {formatCurrency(summary.totalActual, selectedCurrency.code)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Saldo Restante</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${summaryWithCalculated.totalRemaining >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(summaryWithCalculated.totalRemaining, selectedCurrency.code)}
              </div>
              <Progress value={summaryWithCalculated.percentageUsed} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {summaryWithCalculated.percentageUsed.toFixed(1)}% utilizado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Meta de Poupança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(savingsAmount, selectedCurrency.code)}
              </div>
              <Progress value={Math.min(savingsProgress, 100)} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Meta: {formatCurrency(savingsGoal, selectedCurrency.code)} ({settings?.savings_goal_percentage || 20}%)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {summary.categoriesOverBudget > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {summary.categoriesOverBudget} {summary.categoriesOverBudget === 1 ? 'categoria excedeu' : 'categorias excederam'} o orçamento planejado
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <Tabs defaultValue="expenses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
            <TabsTrigger value="income">Receitas</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
            <TabsTrigger value="table">Tabela</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4">
            {expenseSpending.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Nenhum orçamento de despesa definido para este mês
                </CardContent>
              </Card>
            ) : (
              <>
                {expenseSpending.map((spending) => {
                  const budget = budgets.find(b => b.category_id === spending.categoryId);
                  return (
                    <Card key={spending.categoryId} className="cursor-pointer hover:bg-accent/50" onClick={() => budget && handleEdit(budget)}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: spending.categoryColor }}
                            />
                            <CardTitle className="text-lg">{spending.categoryName}</CardTitle>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              {spending.percentageOfTotal.toFixed(1)}% do total
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Planejado</span>
                          <span className="font-semibold">{formatCurrency(spending.planned, selectedCurrency.code)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Realizado</span>
                          <span className="font-semibold">{formatCurrency(spending.actual, selectedCurrency.code)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Restante</span>
                          <span className={`font-semibold ${spending.remaining >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {formatCurrency(spending.remaining, selectedCurrency.code)}
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(spending.percentageUsed, 100)} 
                          className={spending.percentageUsed > 100 ? '[&>div]:bg-destructive' : ''}
                        />
                        <div className="text-xs text-muted-foreground text-right">
                          {spending.percentageUsed.toFixed(1)}% utilizado
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            )}
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            {incomeSpending.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Nenhum orçamento de receita definido para este mês
                </CardContent>
              </Card>
            ) : (
              <>
                {incomeSpending.map((spending) => {
                  const budget = budgets.find(b => b.category_id === spending.categoryId);
                  return (
                    <Card key={spending.categoryId} className="cursor-pointer hover:bg-accent/50" onClick={() => budget && handleEdit(budget)}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: spending.categoryColor }}
                            />
                            <CardTitle className="text-lg">{spending.categoryName}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Previsto</span>
                          <span className="font-semibold">{formatCurrency(spending.planned, selectedCurrency.code)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Recebido</span>
                          <span className="font-semibold">{formatCurrency(spending.actual, selectedCurrency.code)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Diferença</span>
                          <span className={`font-semibold ${spending.actual >= spending.planned ? 'text-success' : 'text-destructive'}`}>
                            {formatCurrency(spending.actual - spending.planned, selectedCurrency.code)}
                          </span>
                        </div>
                        <Progress 
                          value={Math.min((spending.actual / spending.planned) * 100, 100)} 
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            )}
          </TabsContent>

          <TabsContent value="charts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição do Orçamento Planejado</CardTitle>
                <CardDescription>
                  Visualização da alocação de gastos por categoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                {chartData.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    Nenhum dado disponível para exibir
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <RechartsPie>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value, selectedCurrency.code)} />
                      <Legend />
                    </RechartsPie>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Categorias Acima do Orçamento</CardTitle>
                </CardHeader>
                <CardContent>
                  {expenseSpending.filter(s => s.remaining < 0).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhuma categoria excedeu o orçamento</p>
                  ) : (
                    <div className="space-y-2">
                      {expenseSpending
                        .filter(s => s.remaining < 0)
                        .map(s => (
                          <div key={s.categoryId} className="flex justify-between items-center">
                            <span className="text-sm">{s.categoryName}</span>
                            <span className="text-sm font-semibold text-destructive">
                              {formatCurrency(Math.abs(s.remaining), selectedCurrency.code)}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Categorias com Maior Economia</CardTitle>
                </CardHeader>
                <CardContent>
                  {expenseSpending.filter(s => s.remaining > 0 && s.actual > 0).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhuma economia registrada</p>
                  ) : (
                    <div className="space-y-2">
                      {expenseSpending
                        .filter(s => s.remaining > 0 && s.actual > 0)
                        .sort((a, b) => b.remaining - a.remaining)
                        .slice(0, 5)
                        .map(s => (
                          <div key={s.categoryId} className="flex justify-between items-center">
                            <span className="text-sm">{s.categoryName}</span>
                            <span className="text-sm font-semibold text-success">
                              {formatCurrency(s.remaining, selectedCurrency.code)}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tabela de Orçamentos</CardTitle>
                <CardDescription>Edite ou exclua orçamentos diretamente na tabela</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 px-3">Categoria</th>
                        <th className="py-2 px-3">Tipo</th>
                        <th className="py-2 px-3 text-right">Planejado</th>
                        <th className="py-2 px-3 text-right">Realizado</th>
                        <th className="py-2 px-3 text-right">Restante</th>
                        <th className="py-2 px-3 text-right">% Usado</th>
                        <th className="py-2 px-3 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorySpending.map((row) => {
                        const budget = budgets.find(b => b.category_id === row.categoryId);
                        return (
                          <tr key={row.categoryId} className="border-t">
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: row.categoryColor }} />
                                {row.categoryName}
                              </div>
                            </td>
                            <td className="py-2 px-3 capitalize">{row.categoryType}</td>
                            <td className="py-2 px-3 text-right">{formatCurrency(row.planned, selectedCurrency.code)}</td>
                            <td className="py-2 px-3 text-right">{formatCurrency(row.actual, selectedCurrency.code)}</td>
                            <td className={`py-2 px-3 text-right ${row.remaining >= 0 ? 'text-success' : 'text-destructive'}`}>{formatCurrency(row.remaining, selectedCurrency.code)}</td>
                            <td className="py-2 px-3 text-right">{row.percentageUsed.toFixed(0)}%</td>
                            <td className="py-2 px-3">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={() => budget && handleEdit(budget)}>Editar</Button>
                                <Button size="sm" variant="destructive" onClick={() => budget && deleteBudget.mutate(budget.id)}>Excluir</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
