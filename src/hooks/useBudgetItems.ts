import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface BudgetItem {
  id: string;
  user_id: string;
  month: number;
  year: number;
  type: 'income' | 'expense';
  description: string;
  category_id: string | null;
  planned_amount: number;
  sort_order: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    id: string;
    name: string;
    type: 'income' | 'expense';
    icon: string;
    color: string;
  } | null;
}

export type CreateBudgetItem = Pick<BudgetItem, 'month' | 'year' | 'type' | 'description'> &
  Partial<Pick<BudgetItem, 'category_id' | 'planned_amount' | 'notes' | 'sort_order'>>;

export type UpdateBudgetItem = Partial<
  Pick<BudgetItem, 'description' | 'category_id' | 'planned_amount' | 'notes' | 'sort_order' | 'type'>
>;

const QUERY_KEY = (userId: string | undefined, month: number, year: number) =>
  ['budget-items', userId, month, year] as const;

export const useBudgetItems = (month: number, year: number) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ─── Fetch ────────────────────────────────────────────────────────────────
  const { data: items = [], isLoading } = useQuery({
    queryKey: QUERY_KEY(user?.id, month, year),
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('budget_items')
        .select(`
          *,
          category:categories(id, name, type, icon, color)
        `)
        .eq('user_id', user.id)
        .eq('month', month)
        .eq('year', year)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as BudgetItem[];
    },
    enabled: !!user?.id,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEY(user?.id, month, year) });
  };

  // ─── Create ───────────────────────────────────────────────────────────────
  const createItem = useMutation({
    mutationFn: async (payload: CreateBudgetItem) => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      // Sort order = max current + 1 within same type
      const sameType = items.filter(i => i.type === payload.type);
      const maxOrder = sameType.length > 0
        ? Math.max(...sameType.map(i => i.sort_order))
        : -1;

      const { data, error } = await supabase
        .from('budget_items')
        .insert({
          user_id: user.id,
          month,
          year,
          type: payload.type,
          description: payload.description ?? '',
          category_id: payload.category_id ?? null,
          planned_amount: payload.planned_amount ?? 0,
          sort_order: payload.sort_order ?? maxOrder + 1,
          notes: payload.notes ?? null,
        })
        .select(`*, category:categories(id, name, type, icon, color)`)
        .single();

      if (error) throw error;
      return data as BudgetItem;
    },
    onSuccess: invalidate,
    onError: () => toast.error('Erro ao criar item do orçamento'),
  });

  // ─── Update ───────────────────────────────────────────────────────────────
  const updateItem = useMutation({
    mutationFn: async ({ id, ...payload }: UpdateBudgetItem & { id: string }) => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('budget_items')
        .update(payload)
        .eq('id', id)
        .eq('user_id', user.id)
        .select(`*, category:categories(id, name, type, icon, color)`)
        .single();

      if (error) throw error;
      return data as BudgetItem;
    },
    onSuccess: invalidate,
    onError: () => toast.error('Erro ao atualizar item do orçamento'),
  });

  // ─── Delete ───────────────────────────────────────────────────────────────
  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('budget_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success('Item removido');
    },
    onError: () => toast.error('Erro ao remover item do orçamento'),
  });

  // ─── Copy from previous month ─────────────────────────────────────────────
  const copyFromPreviousMonth = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear  = month === 1 ? year - 1 : year;

      const { data: prev, error: fetchErr } = await supabase
        .from('budget_items')
        .select('type, description, category_id, planned_amount, notes, sort_order')
        .eq('user_id', user.id)
        .eq('month', prevMonth)
        .eq('year', prevYear)
        .order('sort_order', { ascending: true });

      if (fetchErr) throw fetchErr;
      if (!prev?.length) throw new Error('Nenhum item encontrado no mês anterior');

      const toInsert = prev.map((p: any) => ({
        user_id: user.id,
        month,
        year,
        type: p.type,
        description: p.description,
        category_id: p.category_id,
        planned_amount: p.planned_amount,
        notes: p.notes,
        sort_order: p.sort_order,
      }));

      const { error: insertErr } = await supabase
        .from('budget_items')
        .insert(toInsert);

      if (insertErr) throw insertErr;
    },
    onSuccess: () => {
      invalidate();
      toast.success('Orçamento copiado do mês anterior');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Erro ao copiar orçamento');
    },
  });

  return {
    items,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
    copyFromPreviousMonth,
  };
};
