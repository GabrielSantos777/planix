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
  planned: number;
  actual: number;
  remaining: number;
  percentageUsed: number;
  percentageOfTotal: number;
}

export const useBudgetAnalytics = (month: number, year: number, budgets: BudgetWithCategory[]) => {
  const { user } = useAuth();

  // Fetch actual spending per category for the month
  const { data: categorySpending = [], isLoading } = useQuery({
    queryKey: ['budget-analytics', user?.id, month, year],
    queryFn: async () => {
      if (!user?.id || budgets.length === 0) return [];

      // Get first and last day of the month
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('category_id, amount, type')
        .eq('user_id', user.id)
        .gte('date', getLocalDateString(firstDay))
        .lte('date', getLocalDateString(lastDay));

      if (error) throw error;

      // Group transactions by category
      const spendingByCategory = transactions.reduce((acc, t) => {
        if (!t.category_id) return acc;
        if (!acc[t.category_id]) {
          acc[t.category_id] = 0;
        }
        // For expenses, amount is negative, for income it's positive
        acc[t.category_id] += Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);

      // Calculate totals
      const totalPlanned = budgets
        .filter(b => b.category.type === 'expense')
        .reduce((sum, b) => sum + b.planned_amount, 0);

      // Map budgets with actual spending
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
          planned: budget.planned_amount,
          actual,
          remaining,
          percentageUsed,
          percentageOfTotal,
        };
      });

      return analytics;
    },
    enabled: !!user?.id && budgets.length > 0,
  });

  // Calculate summary statistics
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
