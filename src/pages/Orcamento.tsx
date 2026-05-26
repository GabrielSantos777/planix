import { useState, useRef, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Sheet, SheetContent, SheetHeader,
  SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ChevronLeft, ChevronRight, Copy, BarChart3,
  Plus, X, Trash2, TrendingUp, TrendingDown,
  Wallet, PiggyBank, ExternalLink, Info,
} from 'lucide-react';
import { useBudgetItems, BudgetItem } from '@/hooks/useBudgetItems';
import { useBudgetItemAnalytics } from '@/hooks/useBudgetItemAnalytics';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useCurrency } from '@/context/CurrencyContext';
import { useBudget } from '@/hooks/useBudget';
import { useBudgetAnalytics } from '@/hooks/useBudgetAnalytics';
import { formatCurrency } from '@/utils/formatters';
import { CurrencyInput } from '@/components/ui/currency-input';
import { format, getDaysInMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SummaryCard({
  label, value, sub, icon: Icon, color,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1 min-w-0">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        <Icon className={cn('h-3.5 w-3.5', color)} />
        {label}
      </div>
      <p className={cn('text-2xl font-bold tabular-nums', color)}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

// ─── Inline-editable text cell ───────────────────────────────────────────────

interface InlineCellProps {
  value: string;
  placeholder?: string;
  onSave: (v: string) => void;
  onTab?: () => void;
  onEnter?: () => void;
  className?: string;
  autoFocus?: boolean;
}

function InlineTextCell({
  value, placeholder, onSave, onTab, onEnter, className, autoFocus,
}: InlineCellProps) {
  const [editing, setEditing] = useState(autoFocus ?? false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  useEffect(() => {
    if (autoFocus) { setEditing(true); setDraft(value); }
  }, [autoFocus]);

  const commit = useCallback(() => {
    setEditing(false);
    if (draft !== value) onSave(draft);
  }, [draft, value, onSave]);

  if (!editing) {
    return (
      <button
        onClick={() => { setDraft(value); setEditing(true); }}
        className={cn(
          'w-full text-left px-2 py-1 rounded text-sm transition-colors hover:bg-muted/50',
          !value && 'text-muted-foreground italic text-xs',
          className
        )}
      >
        {value || placeholder || '—'}
      </button>
    );
  }

  return (
    <input
      ref={ref}
      className={cn(
        'w-full bg-primary/10 border border-primary rounded px-2 py-0.5 text-sm outline-none',
        className
      )}
      value={draft}
      onChange={e => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={e => {
        if (e.key === 'Enter') { commit(); onEnter?.(); }
        if (e.key === 'Tab')   { e.preventDefault(); commit(); onTab?.(); }
        if (e.key === 'Escape') { setDraft(value); setEditing(false); }
      }}
    />
  );
}

// ─── Inline-editable amount cell ─────────────────────────────────────────────

function InlineAmountCell({
  value, currency, onSave, onTab, onEnter, className, autoFocus,
}: {
  value: number;
  currency: string;
  onSave: (v: number) => void;
  onTab?: () => void;
  onEnter?: () => void;
  className?: string;
  autoFocus?: boolean;
}) {
  const [editing, setEditing] = useState(autoFocus ?? false);
  const [raw, setRaw] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) { ref.current?.focus(); ref.current?.select(); }
  }, [editing]);

  const startEdit = () => {
    setRaw(value > 0 ? value.toFixed(2).replace('.', ',') : '');
    setEditing(true);
  };

  const commit = useCallback(() => {
    const num = parseFloat(raw.replace(/\./g, '').replace(',', '.'));
    if (!isNaN(num) && num >= 0) onSave(num);
    setEditing(false);
  }, [raw, onSave]);

  if (!editing) {
    return (
      <button
        onClick={startEdit}
        className={cn(
          'w-full text-right px-2 py-1 rounded text-sm tabular-nums transition-colors hover:bg-muted/50',
          value > 0 ? 'font-medium' : 'text-muted-foreground italic text-xs',
          className
        )}
      >
        {value > 0 ? formatCurrency(value, currency) : '+ definir'}
      </button>
    );
  }

  return (
    <input
      ref={ref}
      className="w-full bg-primary/10 border border-primary rounded px-2 py-0.5 text-sm text-right tabular-nums outline-none"
      value={raw}
      onChange={e => setRaw(e.target.value)}
      onBlur={commit}
      onKeyDown={e => {
        if (e.key === 'Enter') { commit(); onEnter?.(); }
        if (e.key === 'Tab')   { e.preventDefault(); commit(); onTab?.(); }
        if (e.key === 'Escape') setEditing(false);
      }}
    />
  );
}

// ─── Inline category selector ─────────────────────────────────────────────────

function InlineCategoryCell({
  categoryId,
  categories,
  onSave,
  onTab,
  className,
}: {
  categoryId: string | null;
  categories: { id: string; name: string; color: string }[];
  onSave: (id: string | null) => void;
  onTab?: () => void;
  className?: string;
}) {
  const cat = categories.find(c => c.id === categoryId);

  return (
    <Select
      value={categoryId ?? 'none'}
      onValueChange={v => { onSave(v === 'none' ? null : v); onTab?.(); }}
    >
      <SelectTrigger
        className={cn(
          'h-7 text-xs border-transparent bg-transparent hover:bg-muted/50 focus:ring-1',
          className
        )}
      >
        <SelectValue>
          {cat ? (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="truncate max-w-[100px]">{cat.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground italic">Sem categoria</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">
          <span className="text-muted-foreground italic">Sem categoria</span>
        </SelectItem>
        {categories.map(c => (
          <SelectItem key={c.id} value={c.id}>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              {c.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ─── Budget row ───────────────────────────────────────────────────────────────

interface BudgetRowProps {
  item: BudgetItem;
  actual: number;
  transactions: { id: string; description: string; amount: number; date: string }[];
  categories: { id: string; name: string; color: string; type: 'income' | 'expense' }[];
  currency: string;
  isNew?: boolean;
  onUpdate: (id: string, patch: Partial<BudgetItem>) => void;
  onDelete: (id: string) => void;
  onAddBelow: () => void;
  onOpenSheet: (item: BudgetItem) => void;
}

function BudgetRow({
  item, actual, transactions, categories, currency,
  isNew, onUpdate, onDelete, onAddBelow, onOpenSheet,
}: BudgetRowProps) {
  const isExpense = item.type === 'expense';
  const remaining = item.planned_amount - actual;
  const isOver    = isExpense && remaining < 0;
  const pct       = item.planned_amount > 0
    ? Math.min((actual / item.planned_amount) * 100, 100)
    : 0;

  const fmt = (v: number) => formatCurrency(v, currency);

  const save = (patch: Partial<BudgetItem>) => onUpdate(item.id, patch);

  return (
    <tr
      className={cn(
        'border-b border-border/40 hover:bg-muted/20 transition-colors group/row',
        isOver && 'bg-destructive/5',
      )}
    >
      {/* Description */}
      <td className="py-1 pl-4 pr-2 w-[220px]">
        <InlineTextCell
          value={item.description}
          placeholder="Descrição..."
          autoFocus={isNew}
          onSave={v => save({ description: v })}
          onEnter={onAddBelow}
          className="font-medium"
        />
      </td>

      {/* Category */}
      <td className="py-1 px-2 w-[160px]">
        <InlineCategoryCell
          categoryId={item.category_id}
          categories={categories.filter(c => c.type === item.type)}
          onSave={v => save({ category_id: v })}
        />
      </td>

      {/* Planned */}
      <td className="py-1 px-2 w-[130px]">
        <InlineAmountCell
          value={item.planned_amount}
          currency={currency}
          onSave={v => save({ planned_amount: v })}
          onEnter={onAddBelow}
          className="text-right"
        />
      </td>

      {/* Actual (read-only) */}
      <td className={cn(
        'py-1 px-3 text-right text-sm tabular-nums w-[120px]',
        actual > 0
          ? isExpense ? 'text-destructive font-medium' : 'text-emerald-500 font-medium'
          : 'text-muted-foreground',
      )}>
        {actual > 0 ? fmt(actual) : <span className="text-xs">—</span>}
      </td>

      {/* Balance */}
      <td className={cn(
        'py-1 px-3 text-right text-sm tabular-nums font-semibold w-[120px]',
        isOver ? 'text-destructive' : 'text-emerald-500',
      )}>
        {item.planned_amount === 0 && actual === 0
          ? <span className="text-muted-foreground font-normal text-xs">—</span>
          : isOver
            ? `−${fmt(Math.abs(remaining))}`
            : `+${fmt(remaining)}`}
      </td>

      {/* Progress + % */}
      <td className="py-1 px-3 w-[110px]">
        {item.planned_amount > 0 && (
          <div className="flex items-center gap-2">
            <div className="relative flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${pct}%`,
                  backgroundColor: isOver
                    ? 'hsl(var(--destructive))'
                    : item.category?.color ?? 'hsl(var(--primary))',
                }}
              />
            </div>
            <span className={cn(
              'text-xs w-8 text-right tabular-nums shrink-0',
              isOver ? 'text-destructive font-semibold' : 'text-muted-foreground',
            )}>
              {Math.round((actual / item.planned_amount) * 100)}%
            </span>
          </div>
        )}
      </td>

      {/* Actions */}
      <td className="py-1 pr-3 pl-1 w-[60px]">
        <div className="flex items-center gap-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            onClick={() => onOpenSheet(item)}
            className="p-1 rounded text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            title="Ver detalhes"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
            title="Excluir linha"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface SectionProps {
  type: 'income' | 'expense';
  items: BudgetItem[];
  analyticsMap: Record<string, { actual: number; transactions: any[] }>;
  categories: { id: string; name: string; color: string; type: 'income' | 'expense' }[];
  currency: string;
  newItemId: string | null;
  onUpdate: (id: string, patch: Partial<BudgetItem>) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onOpenSheet: (item: BudgetItem) => void;
}

function BudgetSection({
  type, items, analyticsMap, categories, currency,
  newItemId, onUpdate, onDelete, onAdd, onOpenSheet,
}: SectionProps) {
  const isExpense  = type === 'expense';
  const label      = isExpense ? 'Despesas' : 'Receitas';
  const fmt        = (v: number) => formatCurrency(v, currency);

  const totalPlanned = items.reduce((s, i) => s + i.planned_amount, 0);
  const totalActual  = items.reduce((s, i) => s + (analyticsMap[i.id]?.actual ?? 0), 0);
  const totalDiff    = totalPlanned - totalActual;

  return (
    <>
      {/* Section header */}
      <tr className="bg-muted/60 border-y border-border/60">
        <td colSpan={3} className="py-2 pl-4 pr-2">
          <div className="flex items-center gap-2">
            <span className={cn(
              'w-2.5 h-2.5 rounded-full',
              isExpense ? 'bg-destructive' : 'bg-emerald-500',
            )} />
            <span className="font-semibold text-xs uppercase tracking-widest">
              {label}
            </span>
          </div>
        </td>
        <td className="py-2 px-3 text-right text-xs text-muted-foreground tabular-nums font-semibold">
          {fmt(totalActual)}
        </td>
        <td className={cn(
          'py-2 px-3 text-right text-xs font-bold tabular-nums',
          totalDiff >= 0 ? 'text-emerald-500' : 'text-destructive',
        )}>
          {totalDiff >= 0 ? '+' : '−'}{fmt(Math.abs(totalDiff))}
        </td>
        <td className="py-2 px-3 text-right text-xs text-muted-foreground" colSpan={2}>
          {fmt(totalPlanned)} planejado
        </td>
      </tr>

      {/* Column headers */}
      <tr className="border-b border-border/40 bg-muted/20">
        <th className="py-1.5 pl-4 pr-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Descrição
        </th>
        <th className="py-1.5 px-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Categoria
        </th>
        <th className="py-1.5 px-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Orçado <span className="normal-case opacity-60">(clique p/ editar)</span>
        </th>
        <th className="py-1.5 px-3 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Realizado
        </th>
        <th className="py-1.5 px-3 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Saldo
        </th>
        <th className="py-1.5 px-3 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wider" colSpan={2}>
          %
        </th>
      </tr>

      {/* Empty state */}
      {items.length === 0 && (
        <tr>
          <td colSpan={7} className="py-4 pl-4 text-xs text-muted-foreground italic">
            Nenhum {label.toLowerCase().slice(0, -1)} orçado — clique em "+ Adicionar" abaixo
          </td>
        </tr>
      )}

      {/* Rows */}
      {items.map(item => (
        <BudgetRow
          key={item.id}
          item={item}
          actual={analyticsMap[item.id]?.actual ?? 0}
          transactions={analyticsMap[item.id]?.transactions ?? []}
          categories={categories}
          currency={currency}
          isNew={item.id === newItemId}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAddBelow={onAdd}
          onOpenSheet={onOpenSheet}
        />
      ))}

      {/* Add button */}
      <tr>
        <td colSpan={7} className="py-2 pl-4">
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar {isExpense ? 'despesa' : 'receita'}
          </button>
        </td>
      </tr>
    </>
  );
}

// ─── Detail Sheet ─────────────────────────────────────────────────────────────

function BudgetItemSheet({
  item,
  analytics,
  categories,
  currency,
  onSave,
  onDelete,
  onClose,
}: {
  item: BudgetItem | null;
  analytics: { actual: number; transactions: { id: string; description: string; amount: number; date: string }[] } | null;
  categories: { id: string; name: string; color: string; type: 'income' | 'expense' }[];
  currency: string;
  onSave: (id: string, patch: Partial<BudgetItem>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Partial<BudgetItem>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (item) { setDraft({}); setConfirmDelete(false); }
  }, [item?.id]);

  if (!item) return null;

  const merged = { ...item, ...draft };
  const fmt = (v: number) => formatCurrency(v, currency);
  const filteredCats = categories.filter(c => c.type === merged.type);
  const cat = filteredCats.find(c => c.id === merged.category_id);

  const handleSave = () => {
    if (Object.keys(draft).length > 0) onSave(item.id, draft);
    onClose();
  };

  const handleDelete = () => {
    if (confirmDelete) { onDelete(item.id); onClose(); }
    else setConfirmDelete(true);
  };

  return (
    <Sheet open={!!item} onOpenChange={open => !open && onClose()}>
      <SheetContent className="w-[380px] sm:w-[420px] overflow-y-auto flex flex-col gap-0 p-0">
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border">
          <SheetTitle className="text-base">Detalhes do item</SheetTitle>
          <SheetDescription className="text-xs">
            Edite os campos e salve, ou feche para descartar.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs">Descrição</Label>
            <Input
              value={merged.description ?? ''}
              onChange={e => setDraft(d => ({ ...d, description: e.target.value }))}
              placeholder="Ex: Aluguel, Mercado semanal..."
              className="text-sm h-9"
            />
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <Label className="text-xs">Tipo</Label>
            <div className="flex gap-2">
              {(['income', 'expense'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setDraft(d => ({ ...d, type: t, category_id: null }))}
                  className={cn(
                    'flex-1 py-1.5 rounded-md text-xs font-medium border transition-colors',
                    merged.type === t
                      ? t === 'income'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'bg-destructive/15 border-destructive text-destructive'
                      : 'border-border text-muted-foreground hover:bg-muted',
                  )}
                >
                  {t === 'income' ? '↑ Receita' : '↓ Despesa'}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-xs">Categoria (opcional)</Label>
            <Select
              value={merged.category_id ?? 'none'}
              onValueChange={v => setDraft(d => ({ ...d, category_id: v === 'none' ? null : v }))}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue>
                  {cat
                    ? <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        {cat.name}
                      </span>
                    : <span className="text-muted-foreground italic">Sem categoria</span>}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">
                  <span className="text-muted-foreground italic">Sem categoria</span>
                </SelectItem>
                {filteredCats.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!merged.category_id && (
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" />
                Sem categoria: o campo "Realizado" ficará zerado
              </p>
            )}
          </div>

          {/* Planned amount */}
          <div className="space-y-1.5">
            <Label className="text-xs">Valor orçado</Label>
            <CurrencyInput
              value={merged.planned_amount ?? 0}
              onChange={v => setDraft(d => ({ ...d, planned_amount: v }))}
              currency={currency}
              className="h-9 text-sm text-right"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs">Notas</Label>
            <Textarea
              value={merged.notes ?? ''}
              onChange={e => setDraft(d => ({ ...d, notes: e.target.value }))}
              placeholder="Observações sobre este item..."
              className="text-sm resize-none h-20"
            />
          </div>

          {/* Transactions */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Realizado este mês
              </span>
              <span className={cn(
                'text-sm font-bold tabular-nums',
                (analytics?.actual ?? 0) > 0
                  ? item.type === 'expense' ? 'text-destructive' : 'text-emerald-500'
                  : 'text-muted-foreground',
              )}>
                {fmt(analytics?.actual ?? 0)}
              </span>
            </div>

            {!merged.category_id ? (
              <p className="text-xs text-muted-foreground italic py-2">
                Associe uma categoria para ver as transações vinculadas automaticamente.
              </p>
            ) : !analytics?.transactions.length ? (
              <p className="text-xs text-muted-foreground italic py-2">
                Nenhuma transação nesta categoria este mês.
              </p>
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="py-1.5 px-3 text-left text-muted-foreground font-medium">Data</th>
                      <th className="py-1.5 px-2 text-left text-muted-foreground font-medium">Descrição</th>
                      <th className="py-1.5 px-3 text-right text-muted-foreground font-medium">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.transactions.map(t => (
                      <tr key={t.id} className="border-b border-border/40 last:border-0">
                        <td className="py-1.5 px-3 text-muted-foreground whitespace-nowrap">
                          {format(new Date(t.date + 'T00:00:00'), 'dd/MM')}
                        </td>
                        <td className="py-1.5 px-2 truncate max-w-[140px]">{t.description}</td>
                        <td className={cn(
                          'py-1.5 px-3 text-right font-semibold tabular-nums',
                          item.type === 'expense' ? 'text-destructive' : 'text-emerald-500',
                        )}>
                          {fmt(t.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border flex gap-2">
          <Button size="sm" className="flex-1" onClick={handleSave}>
            Salvar
          </Button>
          <Button
            size="sm"
            variant={confirmDelete ? 'destructive' : 'outline'}
            className="gap-1"
            onClick={handleDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
            {confirmDelete ? 'Confirmar exclusão' : 'Excluir'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Charts panel ─────────────────────────────────────────────────────────────

function ChartsPanel({
  incomeItems, expenseItems, analyticsMap, currency,
}: {
  incomeItems: BudgetItem[];
  expenseItems: BudgetItem[];
  analyticsMap: Record<string, { actual: number; transactions: any[] }>;
  currency: string;
}) {
  const fmt = (v: number) => formatCurrency(v, currency);

  const barData = [
    ...incomeItems.map(i => ({
      name: i.description || 'Receita',
      Planejado: i.planned_amount,
      Realizado: analyticsMap[i.id]?.actual ?? 0,
      type: 'income',
    })),
    ...expenseItems.map(i => ({
      name: i.description || 'Despesa',
      Planejado: i.planned_amount,
      Realizado: analyticsMap[i.id]?.actual ?? 0,
      type: 'expense',
    })),
  ].filter(d => d.Planejado > 0 || d.Realizado > 0);

  const pieData = expenseItems
    .filter(i => i.planned_amount > 0)
    .map(i => ({ name: i.description || 'Sem nome', value: i.planned_amount, color: i.category?.color ?? '#888' }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 pb-4">
      {barData.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm font-semibold mb-3">Planejado vs Realizado</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis tickFormatter={v => formatCurrency(v, currency)} tick={{ fontSize: 10 }} tickLine={false} />
              <RechartsTip formatter={(v: number) => fmt(v)} />
              <Bar dataKey="Planejado" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Realizado" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {pieData.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm font-semibold mb-3">Distribuição de despesas</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTip formatter={(v: number) => fmt(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Orcamento() {
  const { selectedCurrency } = useCurrency();
  const currency = selectedCurrency.code;
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year,  setYear]  = useState(now.getFullYear());
  const [showChart, setShowChart] = useState(false);
  const [sheetItem, setSheetItem] = useState<BudgetItem | null>(null);
  const [newItemId, setNewItemId] = useState<string | null>(null);

  const { categories } = useSupabaseData();
  const { items, isLoading, createItem, updateItem, deleteItem, copyFromPreviousMonth } =
    useBudgetItems(month, year);
  const { analyticsMap, summary } = useBudgetItemAnalytics(month, year, items);

  const incomeItems  = items.filter(i => i.type === 'income');
  const expenseItems = items.filter(i => i.type === 'expense');

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const handleAdd = async (type: 'income' | 'expense') => {
    const result = await createItem.mutateAsync({ month, year, type, description: '' });
    setNewItemId(result.id);
    setTimeout(() => setNewItemId(null), 1500);
  };

  const handleUpdate = (id: string, patch: Partial<BudgetItem>) => {
    updateItem.mutate({ id, ...patch });
  };

  const handleDelete = (id: string) => {
    deleteItem.mutate(id);
  };

  const isCurrentMonth = now.getMonth() + 1 === month && now.getFullYear() === year;
  const dayProgress = isCurrentMonth
    ? Math.round((now.getDate() / getDaysInMonth(now)) * 100)
    : null;

  const fmt = (v: number) => formatCurrency(v, currency);

  const netPlanned = summary.totalIncomePlanned - summary.totalExpensePlanned;
  const netActual  = summary.totalIncomeActual  - summary.totalExpenseActual;
  const savingsGoal = summary.totalIncomePlanned * 0.2;

  return (
    <Layout>
      <div className="flex flex-col h-full min-h-0">

        {/* ── Top bar ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-border shrink-0">
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
              variant="outline" size="sm" className="gap-1.5 text-xs h-8"
              onClick={() => copyFromPreviousMonth.mutate()}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copiar anterior</span>
            </Button>

            <Button
              variant={showChart ? 'default' : 'outline'}
              size="sm" className="gap-1.5 text-xs h-8"
              onClick={() => setShowChart(v => !v)}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Gráficos</span>
            </Button>
          </div>
        </div>

        {/* ── Summary cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 py-3 shrink-0">
          <SummaryCard
            label="Receitas" icon={TrendingUp} color="text-emerald-500"
            value={fmt(summary.totalIncomeActual)}
            sub={`Planejado: ${fmt(summary.totalIncomePlanned)}`}
          />
          <SummaryCard
            label="Despesas" icon={TrendingDown} color="text-destructive"
            value={fmt(summary.totalExpenseActual)}
            sub={`Planejado: ${fmt(summary.totalExpensePlanned)}`}
          />
          <SummaryCard
            label="Saldo Real" icon={Wallet}
            color={netActual >= 0 ? 'text-emerald-500' : 'text-destructive'}
            value={(netActual >= 0 ? '+' : '') + fmt(netActual)}
            sub={`Planejado: ${fmt(netPlanned)}`}
          />
          <SummaryCard
            label="Poupança" icon={PiggyBank} color="text-primary"
            value={fmt(summary.totalIncomeActual - summary.totalExpenseActual)}
            sub={`Meta: ${fmt(savingsGoal)}`}
          />
        </div>

        {/* ── Charts ────────────────────────────────────────────────────────── */}
        {showChart && (
          <ChartsPanel
            incomeItems={incomeItems}
            expenseItems={expenseItems}
            analyticsMap={analyticsMap}
            currency={currency}
          />
        )}

        {/* ── Spreadsheet table ─────────────────────────────────────────────── */}
        <div className="flex-1 overflow-auto px-4 pb-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
              Carregando orçamento...
            </div>
          ) : (
            <table className="w-full border-collapse text-sm">
              <tbody>
                <BudgetSection
                  type="income"
                  items={incomeItems}
                  analyticsMap={analyticsMap}
                  categories={categories as any}
                  currency={currency}
                  newItemId={newItemId}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onAdd={() => handleAdd('income')}
                  onOpenSheet={setSheetItem}
                />

                {/* Spacer between sections */}
                <tr><td colSpan={7} className="py-3" /></tr>

                <BudgetSection
                  type="expense"
                  items={expenseItems}
                  analyticsMap={analyticsMap}
                  categories={categories as any}
                  currency={currency}
                  newItemId={newItemId}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onAdd={() => handleAdd('expense')}
                  onOpenSheet={setSheetItem}
                />

                {/* Net total row */}
                {(incomeItems.length > 0 || expenseItems.length > 0) && (
                  <>
                    <tr><td colSpan={7} className="py-2" /></tr>
                    <tr className="border-t-2 border-border bg-muted/40">
                      <td colSpan={2} className="py-3 pl-4 font-bold text-sm">
                        Saldo líquido
                      </td>
                      <td className="py-3 px-2 text-right text-sm tabular-nums font-semibold text-muted-foreground">
                        {fmt(summary.totalIncomePlanned)} − {fmt(summary.totalExpensePlanned)}
                      </td>
                      <td className="py-3 px-3 text-right text-sm tabular-nums font-semibold text-muted-foreground">
                        {fmt(summary.totalIncomeActual)} − {fmt(summary.totalExpenseActual)}
                      </td>
                      <td className={cn(
                        'py-3 px-3 text-right text-base tabular-nums font-bold',
                        netActual >= 0 ? 'text-emerald-500' : 'text-destructive',
                      )}>
                        {netActual >= 0 ? '+' : ''}{fmt(netActual)}
                      </td>
                      <td colSpan={2} />
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Detail sheet ──────────────────────────────────────────────────── */}
        <BudgetItemSheet
          item={sheetItem}
          analytics={sheetItem ? (analyticsMap[sheetItem.id] ?? null) : null}
          categories={categories as any}
          currency={currency}
          onSave={(id, patch) => updateItem.mutate({ id, ...patch })}
          onDelete={id => { deleteItem.mutate(id); }}
          onClose={() => setSheetItem(null)}
        />
      </div>
    </Layout>
  );
}
