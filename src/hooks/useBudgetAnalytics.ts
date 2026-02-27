import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { BudgetWithCategory } from './useBudget';
import { getLocalDateString } from '@/utils/dateUtils';

export interface CategorySpending {
  categoryId: string;
  categoryName: string;
  categoryType: 'income' | 'expense';
  categoryColor: string;
  budgetName?: string;
  planned: number;
  actual: number;
  remaining: number;
  percentageUsed: number;
  percentageOfTotal: number;
  transactions: Array<{
    id: string;
    description: string;
    amount: number;
    date: string;
    type: string;
  }>;
}

export const useBudgetAnalytics = (month: number, year: number, budgets: BudgetWithCategory[]) => {
  const { user } = useAuth();

  const budgetIds = budgets.map(b => b.id).sort().join(',');

  const { data: categorySpending = [], isLoading } = useQuery({
    queryKey: ['budget-analytics', user?.id, month, year, budgetIds],
    queryFn: async () => {
      if (!user?.id || budgets.length === 0) return [];

      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('id, category_id, amount, type, description, date')
        .eq('user_id', user.id)
        .gte('date', getLocalDateString(firstDay))
        .lte('date', getLocalDateString(lastDay));

      if (error) throw error;

      const spendingByCategory: Record<string, number> = {};
      const transactionsByCategory: Record<string, Array<{ id: string; description: string; amount: number; date: string; type: string }>> = {};

      transactions.forEach(t => {
        if (!t.category_id) return;
        spendingByCategory[t.category_id] = (spendingByCategory[t.category_id] || 0) + Math.abs(t.amount);
        if (!transactionsByCategory[t.category_id]) {
          transactionsByCategory[t.category_id] = [];
        }
        transactionsByCategory[t.category_id].push({
          id: t.id,
          description: t.description,
          amount: t.amount,
          date: t.date,
          type: t.type,
        });
      });

      const totalPlanned = budgets
        .filter(b => b.category.type === 'expense')
        .reduce((sum, b) => sum + b.planned_amount, 0);

      const analytics: CategorySpending[] = budgets.map(budget => {
        const actual = spendingByCategory[budget.category_id] || 0;
        const remaining = budget.planned_amount - actual;
        const percentageUsed = budget.planned_amount > 0 
          ? (actual / budget.planned_amount) * 100 
          : 0;
        const percentageOfTotal = totalPlanned > 0 
          ? (budget.planned_amount / totalPlanned) * 100 
          : 0;

        return {
          categoryId: budget.category_id,
          categoryName: budget.category.name,
          categoryType: budget.category.type,
          categoryColor: budget.category.color,
          budgetName: (budget as any).name || undefined,
          planned: budget.planned_amount,
          actual,
          remaining,
          percentageUsed,
          percentageOfTotal,
          transactions: transactionsByCategory[budget.category_id] || [],
        };
      });

      return analytics;
    },
    enabled: !!user?.id && budgets.length > 0,
  });

  const totalPlanned = categorySpending
    .filter(c => c.categoryType === 'expense')
    .reduce((sum, c) => sum + c.planned, 0);
  const totalActual = categorySpending
    .filter(c => c.categoryType === 'expense')
    .reduce((sum, c) => sum + c.actual, 0);
  const totalIncomePlanned = categorySpending
    .filter(c => c.categoryType === 'income')
    .reduce((sum, c) => sum + c.planned, 0);
  const totalIncomeActual = categorySpending
    .filter(c => c.categoryType === 'income')
    .reduce((sum, c) => sum + c.actual, 0);

  const summary = {
    totalPlanned,
    totalActual,
    totalIncomePlanned,
    totalIncomeActual,
    categoriesOverBudget: categorySpending.filter(c => c.remaining < 0).length,
    categoriesUnderBudget: categorySpending.filter(c => c.remaining > 0 && c.actual > 0).length,
    totalRemaining: totalPlanned - totalActual,
    percentageUsed: totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0,
  };

  return {
    categorySpending,
    summary,
    isLoading,
  };
};
