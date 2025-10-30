import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  month: number;
  year: number;
  planned_amount: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetSettings {
  id: string;
  user_id: string;
  savings_goal_percentage: number;
  enable_rollover: boolean;
  enable_zero_based: boolean;
  created_at: string;
  updated_at: string;
}

export interface BudgetWithCategory extends Budget {
  category: {
    id: string;
    name: string;
    type: 'income' | 'expense';
    icon: string;
    color: string;
  };
}

export const useBudget = (month: number, year: number) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch budgets for a specific month/year
  const { data: budgets = [], isLoading } = useQuery({
    queryKey: ['budgets', user?.id, month, year],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('budgets')
        .select(`
          *,
          category:categories(id, name, type, icon, color)
        `)
        .eq('user_id', user.id)
        .eq('month', month)
        .eq('year', year)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as BudgetWithCategory[];
    },
    enabled: !!user?.id,
  });

  // Fetch budget settings
  const { data: settings } = useQuery({
    queryKey: ['budget-settings', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('budget_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as BudgetSettings | null;
    },
    enabled: !!user?.id,
  });

  // Create or update budget
  const upsertBudget = useMutation({
    mutationFn: async (budget: Partial<Budget> & { category_id: string; month: number; year: number; planned_amount: number }) => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      // Check if budget already exists
      const { data: existingBudget } = await supabase
        .from('budgets')
        .select('id')
        .eq('user_id', user.id)
        .eq('category_id', budget.category_id)
        .eq('month', budget.month)
        .eq('year', budget.year)
        .maybeSingle();

      const budgetData = {
        user_id: user.id,
        category_id: budget.category_id,
        month: budget.month,
        year: budget.year,
        planned_amount: budget.planned_amount,
        notes: budget.notes || undefined,
      };

      let data, error;

      if (existingBudget) {
        // Update existing budget
        ({ data, error } = await supabase
          .from('budgets')
          .update(budgetData)
          .eq('id', existingBudget.id)
          .select()
          .single());
      } else {
        // Insert new budget
        ({ data, error } = await supabase
          .from('budgets')
          .insert(budgetData)
          .select()
          .single());
      }

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success('Orçamento salvo com sucesso');
    },
    onError: (error) => {
      console.error('Erro ao salvar orçamento:', error);
      toast.error('Erro ao salvar orçamento');
    },
  });

  // Delete budget
  const deleteBudget = useMutation({
    mutationFn: async (budgetId: string) => {
      const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('id', budgetId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success('Orçamento removido');
    },
    onError: (error) => {
      console.error('Erro ao remover orçamento:', error);
      toast.error('Erro ao remover orçamento');
    },
  });

  // Copy budgets from previous month
  const copyFromPreviousMonth = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;

      // Fetch previous month budgets
      const { data: prevBudgets, error: fetchError } = await supabase
        .from('budgets')
        .select('category_id, planned_amount, notes')
        .eq('user_id', user.id)
        .eq('month', prevMonth)
        .eq('year', prevYear);

      if (fetchError) throw fetchError;
      if (!prevBudgets || prevBudgets.length === 0) {
        throw new Error('Nenhum orçamento encontrado no mês anterior');
      }

      // Insert new budgets for current month
      const newBudgets = prevBudgets.map(b => ({
        user_id: user.id,
        category_id: b.category_id,
        month,
        year,
        planned_amount: b.planned_amount,
        notes: b.notes || undefined,
      }));

      const { error: insertError } = await supabase
        .from('budgets')
        .upsert(newBudgets, { onConflict: 'user_id,category_id,month,year' });

      if (insertError) throw insertError;

      return newBudgets;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success('Orçamento copiado do mês anterior');
    },
    onError: (error: any) => {
      console.error('Erro ao copiar orçamento:', error);
      toast.error(error.message || 'Erro ao copiar orçamento');
    },
  });

  // Update budget settings
  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<BudgetSettings>) => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('budget_settings')
        .upsert({
          ...newSettings,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-settings'] });
      toast.success('Configurações salvas');
    },
    onError: (error) => {
      console.error('Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações');
    },
  });

  return {
    budgets,
    settings,
    isLoading,
    upsertBudget,
    deleteBudget,
    copyFromPreviousMonth,
    updateSettings,
  };
};
