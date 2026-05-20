import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ChevronLeft, ChevronRight, Plus, Copy, Settings, AlertCircle,
  TrendingUp, TrendingDown, Wallet, BarChart3, X, Check,
  ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { useBudget } from '@/hooks/useBudget';
import { useBudgetAnalytics } from '@/hooks/useBudgetAnalytics';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { formatCurrency } from '@/utils/formatters';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencyInput } from '@/components/ui/currency-input';
import { format, getDaysInMonth } from 'date-fns';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { cn } from '@/lib/utils';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

// ─── Inline editable cell ───────────────────────────────────────────────────
function InlineAmount({
  value,
  onSave,
  currency,
}: {
  value: number;
  onSave: (v: number) => void;
  currency: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setRaw(value > 0 ? value.toFixed(2).replace('.', ',') : '');
    setEditing(true);
  };

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commit = () => {
    const num = parseFloat(raw.replace(/\./g, '').replace(',', '.'));
    if (!isNaN(num) && num >= 0) onSave(num);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        className="w-28 bg-primary/10 border border-primary rounded px-2 py-0.5 text-sm text-right tabular-nums outline-none"
        value={raw}
        onChange={e => setRaw(e.target.value)}
        onBlur={commit}
        onKeyDown={e => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') setEditing(false);
        }}
      />
    );
  }

  return (
    <button
      onClick={startEdit}
      title="Clique para editar"
      className={cn(
        'text-sm tabular-nums text-right w-full block px-2 py-0.5 rounded transition-colors',
        value > 0
          ? 'font-medium hover:bg-muted cursor-text'
          : 'text-muted-foreground italic hover:bg-muted cursor-text text-xs'
      )}
    >
      {value > 0 ? formatCurrency(value, currency) : '+ definir'}
    </button>
  );
}

// ─── Quick‑add row ───────────────────────────────────────────────────────────
function QuickAddRow({
  categories,
  onAdd,
  onCancel,
  currency,
}: {
  categories: { id: string; name: string; color: string }[];
  onAdd: (categoryId: string, amount: number) => void;
  onCancel: () => void;
  currency: string;
}) {
  const [catId, setCatId] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <tr className="bg-primary/5 border-t border-primary/20">
      <td className="py-2 px-4" colSpan={1}>
        <Select value={catId} onValueChange={setCatId}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Escolher categoria..." />
          </SelectTrigger>
          <SelectContent>
            {categories.map(c => (
              <SelectItem key={c.id} value={c.id}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>
      <td className="py-2 px-3">
        <CurrencyInput
          value={amount}
          onChange={setAmount}
          currency={currency}
          className="h-8 text-xs text-right"
        />
      </td>
      <td colSpan={3} className="py-2 px-3">
        <div className="flex gap-1">
          <Button
            size="sm"
            className="h-7 px-3 text-xs gap-1"
            onClick={() => { if (catId && amount > 0) { onAdd(catId, amount); setCatId(''); setAmount(0); } }}
          >
            <Check className="h-3 w-3" /> Adicionar
          </Button>
          <Button size="sm" variant="ghost" className="h-7 px-2" onClick={onCancel}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function Orcamento() {
  const { selectedCurrency } = useCurrency();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [showChart, setShowChart] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [addingSection, setAddingSection] = useState<'income' | 'expense' | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { categories } = useSupabaseData();
  const { budgets, settings, isLoading, upsertBudget, deleteBudget, copyFromPreviousMonth, updateSettings } =
    useBudget(month, year);
  const { categorySpending, summary } = useBudgetAnalytics(month, year, budgets);

  const [settingsData, setSettingsData] = useState({
    savings_goal_percentage: settings?.savings_goal_percentage ?? 20,
    enable_rollover: settings?.enable_rollover ?? false,
    enable_zero_based: settings?.enable_zero_based ?? false,
  });
  useEffect(() => {
    if (settings) setSettingsData({
      savings_goal_percentage: settings.savings_goal_percentage,
      enable_rollover: settings.enable_rollover,
      enable_zero_based: settings.enable_zero_based,
    });
  }, [settings]);

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const toggleRow = (id: string) =>
    setExpandedRows(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseSpending = categorySpending.filter(c => c.categoryType === 'expense');
  const incomeSpending = categorySpending.filter(c => c.categoryType === 'income');

  // Filter out categories already budgeted for add row
  const budgetedCatIds = new Set(budgets.map(b => b.category_id));
  const availableExpCats = expenseCategories.filter(c => !budgetedCatIds.has(c.id));
  const availableIncCats = incomeCategories.filter(c => !budgetedCatIds.has(c.id));

  const handleInlineSave = async (budgetId: string | undefined, categoryId: string, newAmount: number) => {
    await upsertBudget.mutateAsync({
      id: budgetId,
      category_id: categoryId,
      month,
      year,
      planned_amount: newAmount,
    });
  };

  const handleQuickAdd = async (categoryId: string, amount: number) => {
    await upsertBudget.mutateAsync({ category_id: categoryId, month, year, planned_amount: amount });
    setAddingSection(null);
  };

  const netActual = summary.totalIncomeActual - summary.totalActual;
  const netPlanned = summary.totalIncomePlanned - summary.totalPlanned;

  const isCurrentMonth = now.getMonth() + 1 === month && now.getFullYear() === year;
  const dayProgress = isCurrentMonth
    ? Math.round((now.getDate() / getDaysInMonth(now)) * 100)
    : null;

  const fmt = (v: number) => formatCurrency(v, selectedCurrency.code);

  // ─── Section row renderer ──────────────────────────────────────────────────
  const renderSection = (
    spending: typeof categorySpending,
    type: 'income' | 'expense',
    availableCats: typeof expenseCategories
  ) => {
    const isExp = type === 'expense';
    const label = isExp ? 'Despesas' : 'Receitas';
    const totalPlanned = spending.reduce((s, c) => s + c.planned, 0);
    const totalActual = spending.reduce((s, c) => s + c.actual, 0);
    const totalDiff = totalPlanned - totalActual;
    const isAdding = addingSection === type;

    return (
      <>
        {/* Section header */}
        <tr className="bg-muted/60">
          <td className="py-2 px-4 font-semibold text-xs uppercase tracking-widest" colSpan={2}>
            <div className="flex items-center gap-2">
              <span className={isExp ? 'text-destructive' : 'text-emerald-500'}>●</span>
              {label}
            </div>
          </td>
          <td className="py-2 px-3 text-right text-xs font-semibold text-muted-foreground tabular-nums">
            {fmt(totalActual)}
          </td>
          <td className={cn(
            'py-2 px-3 text-right text-xs font-bold tabular-nums',
            totalDiff >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
          )}>
            {totalDiff >= 0 ? '+' : '−'}{fmt(Math.abs(totalDiff))}
          </td>
          <td className="py-2 px-3 text-right text-xs text-muted-foreground" colSpan={1}>
            {fmt(totalPlanned)} planejado
          </td>
        </tr>

        {/* Rows */}
        {spending.length === 0 && (
          <tr>
            <td colSpan={5} className="py-3 px-4 text-xs text-muted-foreground italic">
              Nenhum orçamento de {label.toLowerCase()} definido
            </td>
          </tr>
        )}

        {spending.map(row => {
          const budget = budgets.find(b => b.category_id === row.categoryId);
          const isOver = isExp && row.remaining < 0;
          const pct = Math.min(row.percentageUsed, 100);
          const isExpanded = expandedRows.has(row.categoryId);

          return (
            <>
              <tr
                key={row.categoryId}
                className={cn(
                  'border-b border-border/50 hover:bg-muted/20 transition-colors group/row',
                  isOver && 'bg-destructive/5'
                )}
              >
                {/* Category */}
                <td className="py-2.5 px-4">
                  <button
                    onClick={() => toggleRow(row.categoryId)}
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors w-full text-left"
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.categoryColor }} />
                    <span className="truncate max-w-[160px]">{row.budgetName || row.categoryName}</span>
                    {row.transactions.length > 0 && (
                      <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground ml-1">
                        {row.transactions.length}
                      </span>
                    )}
                    {isExpanded
                      ? <ChevronUp className="h-3 w-3 ml-auto text-muted-foreground" />
                      : <ChevronDown className="h-3 w-3 ml-auto text-muted-foreground opacity-0 group-hover/row:opacity-100" />}
                  </button>
                </td>

                {/* Planned (inline editable) */}
                <td className="py-2 px-3 text-right">
                  <InlineAmount
                    value={row.planned}
                    currency={selectedCurrency.code}
                    onSave={(v) => handleInlineSave(budget?.id, row.categoryId, v)}
                  />
                </td>

                {/* Actual */}
                <td className={cn(
                  'py-2.5 px-3 text-right text-sm tabular-nums font-medium',
                  isExp
                    ? row.actual > 0 ? 'text-destructive' : 'text-muted-foreground'
                    : row.actual > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
                )}>
                  {row.actual > 0 ? fmt(row.actual) : <span className="text-xs italic">—</span>}
                </td>

                {/* Diff */}
                <td className={cn(
                  'py-2.5 px-3 text-right text-sm tabular-nums font-semibold',
                  isOver ? 'text-destructive' : 'text-emerald-600 dark:text-emerald-400'
                )}>
                  {row.actual === 0 && row.planned === 0
                    ? <span className="text-muted-foreground font-normal text-xs">—</span>
                    : isOver
                      ? `−${fmt(Math.abs(row.remaining))}`
                      : `+${fmt(row.remaining)}`}
                </td>

                {/* Progress + delete */}
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2 justify-end">
                    {row.planned > 0 && (
                      <>
                        <div className="relative w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: isOver
                                ? 'hsl(var(--destructive))'
                                : row.categoryColor,
                            }}
                          />
                        </div>
                        <span className={cn(
                          'text-xs w-8 text-right tabular-nums',
                          isOver ? 'text-destructive font-semibold' : 'text-muted-foreground'
                        )}>
                          {row.percentageUsed.toFixed(0)}%
                        </span>
                      </>
                    )}
                    <button
                      onClick={() => budget && deleteBudget.mutate(budget.id)}
                      className="opacity-0 group-hover/row:opacity-100 transition-opacity text-muted-foreground hover:text-destructive ml-1"
                      title="Remover"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Expanded transactions */}
              {isExpanded && (
                <tr key={`${row.categoryId}-exp`}>
                  <td colSpan={5} className="bg-muted/20 px-4 py-3 border-b">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Transações de {row.budgetName || row.categoryName}
                    </div>
                    {row.transactions.length === 0 ? (
                      <p className="text-xs text-muted-foreground py-1">Nenhuma transação nesta categoria este mês.</p>
                    ) : (
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="py-1.5 text-left text-muted-foreground font-medium w-20">Data</th>
                            <th className="py-1.5 text-left text-muted-foreground font-medium">Descrição</th>
                            <th className="py-1.5 text-right text-muted-foreground font-medium">Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.transactions
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map(t => (
                              <tr key={t.id} className="border-b border-border/30 last:border-0">
                                <td className="py-1.5 text-muted-foreground">
                                  {format(new Date(t.date + 'T00:00:00'), 'dd/MM')}
                                </td>
                                <td className="py-1.5">{t.description}</td>
                                <td className={cn(
                                  'py-1.5 text-right font-semibold tabular-nums',
                                  t.amount < 0 ? 'text-destructive' : 'text-emerald-600 dark:text-emerald-400'
                                )}>
                                  {fmt(Math.abs(t.amount))}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-border/50">
                            <td colSpan={2} className="py-1.5 font-semibold text-muted-foreground">Total</td>
                            <td className="py-1.5 text-right font-bold tabular-nums">{fmt(row.actual)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    )}
                  </td>
                </tr>
              )}
            </>
          );
        })}

        {/* Quick‑add row or button */}
        {isAdding ? (
          <QuickAddRow
            categories={availableCats}
            onAdd={handleQuickAdd}
            onCancel={() => setAddingSection(null)}
            currency={selectedCurrency.code}
          />
        ) : availableCats.length > 0 ? (
          <tr>
            <td colSpan={5} className="py-1.5 px-4">
              <button
                onClick={() => setAddingSection(type)}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar {isExp ? 'despesa' : 'receita'}
              </button>
            </td>
          </tr>
        ) : null}
      </>
    );
  };

  return (
    <Layout>
      <div className="flex flex-col h-full min-h-0">

        {/* ── Top bar ────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-border">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Orçamento Mensal
            </h1>
            {dayProgress !== null && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Dia {now.getDate()}/{getDaysInMonth(now)} — {dayProgress}% do mês concluído
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Month nav */}
            <div className="flex items-center gap-1 bg-muted rounded-lg px-2 py-1">
              <button onClick={prevMonth} className="p-1 hover:text-primary transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold min-w-[120px] text-center">
                {MONTHS[month - 1]} {year}
              </span>
              <button onClick={nextMonth} className="p-1 hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs h-8"
              onClick={() => copyFromPreviousMonth.mutate()}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copiar anterior</span>
            </Button>

            <Button
              variant={showChart ? 'default' : 'outline'}
              size="sm"
              className="gap-1.5 text-xs h-8"
              onClick={() => setShowChart(v => !v)}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Gráficos</span>
            </Button>

            {/* Settings */}
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Configurações do Orçamento</DialogTitle>
                  <DialogDescription>Ajuste as preferências do seu planejamento</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Meta de Poupança (%)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number" min="0" max="100"
                        value={settingsData.savings_goal_percentage}
                        onChange={e => setSettingsData(s => ({ ...s, savings_goal_percentage: +e.target.value }))}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">% da receita mensal</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-medium">Rolar saldo</p>
                      <p className="text-xs text-muted-foreground">Transferir saldo positivo para o próximo mês</p>
                    </div>
                    <Switch
                      checked={settingsData.enable_rollover}
                      onCheckedChange={c => setSettingsData(s => ({ ...s, enable_rollover: c }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-medium">Base zero</p>
                      <p className="text-xs text-muted-foreground">Toda receita deve ser alocada</p>
                    </div>
                    <Switch
                      checked={settingsData.enable_zero_based}
                      onCheckedChange={c => setSettingsData(s => ({ ...s, enable_zero_based: c }))}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={async () => { await updateSettings.mutateAsync(settingsData); setIsSettingsOpen(false); }}
                  >
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ── Summary strip ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border-b border-border">
          {[
            {
              label: 'Receitas',
              planned: summary.totalIncomePlanned,
              actual: summary.totalIncomeActual,
              icon: TrendingUp,
              color: 'text-emerald-600 dark:text-emerald-400',
            },
            {
              label: 'Despesas',
              planned: summary.totalPlanned,
              actual: summary.totalActual,
              icon: TrendingDown,
              color: 'text-destructive',
            },
            {
              label: 'Saldo Real',
              planned: netPlanned,
              actual: netActual,
              icon: Wallet,
              color: netActual >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive',
              isBalance: true,
            },
            {
              label: 'Poupança',
              planned: (summary.totalIncomePlanned * (settings?.savings_goal_percentage ?? 20)) / 100,
              actual: netActual,
              icon: Wallet,
              color: netActual >= ((summary.totalIncomeActual * (settings?.savings_goal_percentage ?? 20)) / 100)
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-amber-500',
              isSavings: true,
            },
          ].map(card => (
            <div key={card.label} className="bg-background px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <card.icon className={cn('h-3.5 w-3.5', card.color)} />
                <span className="text-xs text-muted-foreground font-medium">{card.label}</span>
              </div>
              <p className={cn('text-base font-bold tabular-nums', card.color)}>
                {(card as any).isBalance
                  ? `${card.actual >= 0 ? '+' : '−'}${fmt(Math.abs(card.actual))}`
                  : fmt(card.actual)}
              </p>
              <p className="text-[11px] text-muted-foreground tabular-nums">
                {(card as any).isSavings
                  ? `Meta: ${fmt(card.planned)}`
                  : `Planejado: ${fmt(card.planned)}`}
              </p>
            </div>
          ))}
        </div>

        {/* ── Over-budget alert ──────────────────────────────────────────── */}
        {summary.categoriesOverBudget > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 border-b border-destructive/20 text-destructive text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              <strong>{summary.categoriesOverBudget}</strong> {summary.categoriesOverBudget === 1 ? 'categoria excedeu' : 'categorias excederam'} o orçamento
            </span>
          </div>
        )}

        {/* ── Main spreadsheet ────────────────────────────────────────────── */}
        {!showChart ? (
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm border-collapse">
              {/* Sticky column headers */}
              <thead className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
                <tr>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[40%]">
                    Categoria
                  </th>
                  <th className="py-2.5 px-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[18%]">
                    Orçado
                    <span className="ml-1 text-[10px] font-normal normal-case">(clique p/ editar)</span>
                  </th>
                  <th className="py-2.5 px-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[18%]">
                    Realizado
                  </th>
                  <th className="py-2.5 px-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[14%]">
                    Saldo
                  </th>
                  <th className="py-2.5 px-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[10%]">
                    %
                  </th>
                </tr>
              </thead>

              <tbody>
                {renderSection(incomeSpending, 'income', availableIncCats)}

                {/* Spacer between sections */}
                <tr><td colSpan={5} className="py-1" /></tr>

                {renderSection(expenseSpending, 'expense', availableExpCats)}

                {/* Net balance footer */}
                {(incomeSpending.length > 0 || expenseSpending.length > 0) && (
                  <>
                    <tr><td colSpan={5} className="py-2 border-t-2 border-border" /></tr>
                    <tr className="bg-muted/40 font-semibold">
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          {netActual >= 0
                            ? <TrendingUp className="h-4 w-4 text-emerald-500" />
                            : <TrendingDown className="h-4 w-4 text-destructive" />}
                          Saldo do Mês
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right text-sm tabular-nums text-muted-foreground">
                        {netPlanned >= 0 ? '+' : '−'}{fmt(Math.abs(netPlanned))}
                      </td>
                      <td className="py-3 px-3" />
                      <td className={cn(
                        'py-3 px-3 text-right text-base tabular-nums font-bold',
                        netActual >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                      )}>
                        {netActual >= 0 ? '+' : '−'}{fmt(Math.abs(netActual))}
                      </td>
                      <td className="py-3 px-3" />
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            {/* Hint */}
            <div className="flex items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground border-t border-border">
              <Info className="h-3.5 w-3.5 shrink-0" />
              Clique no valor orçado para editar · Clique no nome da categoria para ver as transações
            </div>
          </div>
        ) : (
          /* ── Charts panel ──────────────────────────────────────────────── */
          <div className="flex-1 overflow-auto p-4 space-y-6">
            {/* Bar chart: planned vs actual */}
            {expenseSpending.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3">Orçado × Realizado (Despesas)</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={expenseSpending.map(c => ({
                      name: (c.budgetName || c.categoryName).slice(0, 14),
                      Orçado: c.planned,
                      Realizado: c.actual,
                      color: c.categoryColor,
                    }))}
                    margin={{ top: 8, right: 8, left: 0, bottom: 36 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => fmt(v).replace(/[^\d,]/g, '').slice(0, 8)} width={55} />
                    <RechartsTip formatter={(v: number, n: string) => [fmt(v), n]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    <Legend verticalAlign="top" height={28} />
                    <Bar dataKey="Orçado" fill="hsl(var(--primary))" opacity={0.35} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Realizado" radius={[3, 3, 0, 0]}>
                      {expenseSpending.map((e, i) => (
                        <Cell key={i} fill={e.actual > e.planned ? 'hsl(var(--destructive))' : e.categoryColor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Donut pie */}
              {expenseSpending.filter(c => c.planned > 0).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3">Distribuição das Despesas</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={expenseSpending.filter(c => c.planned > 0).map(c => ({
                          name: c.budgetName || c.categoryName,
                          value: c.planned,
                          color: c.categoryColor,
                        }))}
                        cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                        paddingAngle={2} dataKey="value"
                      >
                        {expenseSpending.filter(c => c.planned > 0).map((e, i) => (
                          <Cell key={i} fill={e.categoryColor} />
                        ))}
                      </Pie>
                      <RechartsTip formatter={(v: number) => [fmt(v), 'Orçado']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      <Legend iconType="circle" iconSize={8} formatter={v => <span style={{ fontSize: 11 }}>{v}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Over/under summary */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    Acima do orçamento
                  </h3>
                  {expenseSpending.filter(s => s.remaining < 0).length === 0 ? (
                    <p className="text-xs text-muted-foreground">Nenhuma categoria excedeu</p>
                  ) : (
                    <div className="space-y-1.5">
                      {expenseSpending.filter(s => s.remaining < 0).sort((a, b) => a.remaining - b.remaining).map(s => (
                        <div key={s.categoryId} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.categoryColor }} />
                            <span className="truncate max-w-[140px]">{s.budgetName || s.categoryName}</span>
                          </div>
                          <span className="text-destructive font-semibold tabular-nums">+{fmt(Math.abs(s.remaining))}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Maior economia
                  </h3>
                  {expenseSpending.filter(s => s.remaining > 0 && s.actual > 0).length === 0 ? (
                    <p className="text-xs text-muted-foreground">Nenhuma economia registrada</p>
                  ) : (
                    <div className="space-y-1.5">
                      {expenseSpending.filter(s => s.remaining > 0 && s.actual > 0).sort((a, b) => b.remaining - a.remaining).slice(0, 5).map(s => (
                        <div key={s.categoryId} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.categoryColor }} />
                            <span className="truncate max-w-[140px]">{s.budgetName || s.categoryName}</span>
                          </div>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">−{fmt(s.remaining)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
