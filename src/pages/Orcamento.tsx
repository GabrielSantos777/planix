import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle, Plus, ChevronLeft, ChevronRight, Settings, Copy, ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const { categories } = useSupabaseData();
  const { budgets, settings, isLoading, upsertBudget, deleteBudget, copyFromPreviousMonth, updateSettings } = useBudget(selectedMonth, selectedYear);
  const { categorySpending, summary } = useBudgetAnalytics(selectedMonth, selectedYear, budgets);

  const [formData, setFormData] = useState({
    category_id: '',
    planned_amount: 0,
    name: '',
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
      name: formData.name || undefined,
      notes: formData.notes || undefined,
    });

    setFormData({ category_id: '', planned_amount: 0, name: '', notes: '' });
    setEditingBudget(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (budget: any) => {
    setEditingBudget(budget);
    setFormData({
      category_id: budget.category_id,
      planned_amount: Number(budget.planned_amount),
      name: budget.name || '',
      notes: budget.notes || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleSaveSettings = async () => {
    await updateSettings.mutateAsync(settingsData);
    setIsSettingsDialogOpen(false);
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  const expenseSpending = categorySpending.filter(c => c.categoryType === 'expense');
  const incomeSpending = categorySpending.filter(c => c.categoryType === 'income');

  const chartData = expenseSpending.map(c => ({
    name: c.budgetName || c.categoryName,
    value: c.planned,
    color: c.categoryColor,
  }));

  const savingsAmount = summary.totalIncomeActual - summary.totalActual;
  const savingsGoal = (summary.totalIncomeActual * (settings?.savings_goal_percentage || 20)) / 100;
  const savingsProgress = savingsGoal > 0 ? (savingsAmount / savingsGoal) * 100 : 0;

  const summaryWithCalculated = {
    ...summary,
    totalRemaining: summary.totalPlanned - summary.totalActual,
    percentageUsed: summary.totalPlanned > 0 ? (summary.totalActual / summary.totalPlanned) * 100 : 0,
  };

  const renderBudgetTable = (spending: typeof categorySpending, type: 'expense' | 'income') => {
    if (spending.length === 0) {
      return (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Nenhum orçamento de {type === 'expense' ? 'despesa' : 'receita'} definido para este mês
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Nome</th>
                  <th className="py-3 px-4 text-left font-medium">Categoria</th>
                  <th className="py-3 px-4 text-right font-medium">Planejado</th>
                  <th className="py-3 px-4 text-right font-medium">Realizado</th>
                  <th className="py-3 px-4 text-right font-medium">Restante</th>
                  <th className="py-3 px-4 text-right font-medium">% Usado</th>
                  <th className="py-3 px-4 text-center font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {spending.map((row) => {
                  const budget = budgets.find(b => b.category_id === row.categoryId);
                  const isExpanded = expandedRows.has(row.categoryId);
                  const displayName = row.budgetName || row.categoryName;

                  return (
                    <>
                      <tr key={row.categoryId} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleExpand(row.categoryId)}
                            className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            <span>{displayName}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: row.categoryColor }} />
                            {row.categoryName}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          {formatCurrency(row.planned, selectedCurrency.code)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          {formatCurrency(row.actual, selectedCurrency.code)}
                        </td>
                        <td className={`py-3 px-4 text-right font-medium ${row.remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {formatCurrency(row.remaining, selectedCurrency.code)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Progress 
                              value={Math.min(row.percentageUsed, 100)} 
                              className={`w-16 h-2 ${row.percentageUsed > 100 ? '[&>div]:bg-destructive' : ''}`}
                            />
                            <span className="text-xs w-12 text-right">
                              {row.percentageUsed.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => budget && handleEdit(budget)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => budget && deleteBudget.mutate(budget.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${row.categoryId}-details`}>
                          <td colSpan={7} className="bg-muted/20 px-4 py-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">
                                  Transações de "{displayName}" neste mês
                                </h4>
                                <Badge variant={row.transactions.length > 0 ? 'default' : 'secondary'}>
                                  {row.transactions.length} transaç{row.transactions.length === 1 ? 'ão' : 'ões'}
                                </Badge>
                              </div>
                              {row.transactions.length === 0 ? (
                                <p className="text-sm text-muted-foreground py-2">Nenhuma transação registrada nesta categoria.</p>
                              ) : (
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b">
                                        <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground">Data</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground">Descrição</th>
                                        <th className="py-2 px-3 text-right text-xs font-medium text-muted-foreground">Valor</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {row.transactions
                                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                        .map((t) => (
                                          <tr key={t.id} className="border-b last:border-0">
                                            <td className="py-2 px-3 text-xs">
                                              {format(new Date(t.date + 'T00:00:00'), 'dd/MM/yyyy')}
                                            </td>
                                            <td className="py-2 px-3 text-xs">{t.description}</td>
                                            <td className={`py-2 px-3 text-xs text-right font-medium ${t.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                              {formatCurrency(Math.abs(t.amount), selectedCurrency.code)}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                      <tr className="border-t font-medium">
                                        <td colSpan={2} className="py-2 px-3 text-xs">Total</td>
                                        <td className="py-2 px-3 text-xs text-right font-bold">
                                          {formatCurrency(row.actual, selectedCurrency.code)}
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              )}
                              {budget?.notes && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  <span className="font-medium">Obs:</span> {budget.notes}
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
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
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Configurações</span>
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
            <Button onClick={() => copyFromPreviousMonth.mutate()} variant="outline" size="sm">
              <Copy className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Copiar Mês Anterior</span>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) {
                setEditingBudget(null);
                setFormData({ category_id: '', planned_amount: 0, name: '', notes: '' });
              }
            }}>
              <DialogTrigger asChild>
                <Button size="sm">
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
                    <Label>Nome do Orçamento</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Alimentação do mês, Conta de luz..."
                    />
                  </div>
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
                      <SelectContent className="max-h-[300px]">
                        <div className="px-2 py-2 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                          Despesas
                        </div>
                        {expenseCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: cat.color }}
                              />
                              <span>{cat.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                        <div className="px-2 py-2 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0 mt-1">
                          Receitas
                        </div>
                        {incomeCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: cat.color }}
                              />
                              <span>{cat.name}</span>
                            </div>
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
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
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
              <div className={`text-2xl font-bold ${summaryWithCalculated.totalRemaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
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

        {/* Main Content - Default to table */}
        <Tabs defaultValue="table" className="space-y-4">
          <TabsList>
            <TabsTrigger value="table">Tabela</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-destructive">●</span> Despesas
              </h3>
              {renderBudgetTable(expenseSpending, 'expense')}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">●</span> Receitas
              </h3>
              {renderBudgetTable(incomeSpending, 'income')}
            </div>
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
                            <span className="text-sm">{s.budgetName || s.categoryName}</span>
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
                            <span className="text-sm">{s.budgetName || s.categoryName}</span>
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
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
        </Tabs>
      </div>
    </Layout>
  );
}
