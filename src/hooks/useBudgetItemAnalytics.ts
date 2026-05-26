import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { getLocalDateString } from '@/utils/dateUtils';
import { BudgetItem } from './useBudgetItems';

export interface ItemTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface ItemAnalytics {
  itemId: string;
  actual: number;
  transactions: ItemTransaction[];
}

export interface BudgetItemsSummary {
  totalIncomePlanned: number;
  totalIncomeActual: number;
  totalExpensePlanned: number;
  totalExpenseActual: number;
}

/**
 * For each budget_item that has a category_id, fetches the matching
 * transactions from that category in the given month/year, filtered to
 * the current user only.
 */
export const useBudgetItemAnalytics = (
  month: number,
  year: number,
  items: BudgetItem[]
) => {
  const { user } = useAuth();

  // Collect unique category ids that need matching
  const categoryIds = [
    ...new Set(items.map(i => i.category_id).filter(Boolean) as string[]),
  ];

  const itemIds = items.map(i => i.id).sort().join(',');

  const { data: analyticsMap = {}, isLoading } = useQuery({
    queryKey: ['budget-item-analytics', user?.id, month, year, itemIds],
    queryFn: async (): Promise<Record<string, ItemAnalytics>> => {
      if (!user?.id || items.length === 0) return {};

      const firstDay = new Date(year, month - 1, 1);
      const lastDay  = new Date(year, month, 0);

      // Fetch all transactions for this user in this month
      const { data: txns, error } = await supabase
        .from('transactions')
        .select('id, category_id, amount, type, description, date')
        .eq('user_id', user.id)               // ← only the current user's transactions
        .gte('date', getLocalDateString(firstDay))
        .lte('date', getLocalDateString(lastDay));

      if (error) throw error;

      // Group transactions by category_id
      const byCategory: Record<string, ItemTransaction[]> = {};
      (txns ?? []).forEach(t => {
        if (!t.category_id) return;
        if (!byCategory[t.category_id]) byCategory[t.category_id] = [];
        byCategory[t.category_id].push({
          id: t.id,
          description: t.description,
          amount: Math.abs(t.amount),
          date: t.date,
        });
      });

      // Build per-item analytics
      const result: Record<string, ItemAnalytics> = {};
      items.forEach(item => {
        const txList = item.category_id ? (byCategory[item.category_id] ?? []) : [];
        result[item.id] = {
          itemId: item.id,
          actual: txList.reduce((sum, t) => sum + t.amount, 0),
          transactions: txList.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
        };
      });

      return result;
    },
    enabled: !!user?.id,
  });

  // Derived summary totals
  const summary: BudgetItemsSummary = {
    totalIncomePlanned: items
      .filter(i => i.type === 'income')
      .reduce((s, i) => s + i.planned_amount, 0),
    totalIncomeActual: items
      .filter(i => i.type === 'income')
      .reduce((s, i) => s + (analyticsMap[i.id]?.actual ?? 0), 0),
    totalExpensePlanned: items
      .filter(i => i.type === 'expense')
      .reduce((s, i) => s + i.planned_amount, 0),
    totalExpenseActual: items
      .filter(i => i.type === 'expense')
      .reduce((s, i) => s + (analyticsMap[i.id]?.actual ?? 0), 0),
  };

  return { analyticsMap, summary, isLoading };
};
