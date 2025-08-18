import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/context/AuthContext'
import type { Database } from '@/integrations/supabase/types'

export type Account = Database['public']['Tables']['accounts']['Row']
export type CreditCard = Database['public']['Tables']['credit_cards']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']
export type Investment = Database['public']['Tables']['investments']['Row']
export type Goal = Database['public']['Tables']['goals']['Row']

export interface TransactionWithRelations extends Transaction {
  category?: Category
  account?: Account
  credit_card?: CreditCard
}

export const useSupabaseData = () => {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [creditCards, setCreditCards] = useState<CreditCard[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<TransactionWithRelations[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch accounts
  const fetchAccounts = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAccounts(data || [])
    } catch (error) {
      console.error('Error fetching accounts:', error)
    }
  }

  // Fetch credit cards
  const fetchCreditCards = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('credit_cards')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCreditCards(data || [])
    } catch (error) {
      console.error('Error fetching credit cards:', error)
    }
  }

  // Fetch categories
  const fetchCategories = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Fetch transactions
  const fetchTransactions = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          category:categories(*),
          account:accounts(*),
          credit_card:credit_cards(*)
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(100)

      if (error) throw error
      setTransactions(data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  // Fetch investments
  const fetchInvestments = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setInvestments(data || [])
    } catch (error) {
      console.error('Error fetching investments:', error)
    }
  }

  // Fetch goals
  const fetchGoals = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setGoals(data || [])
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  const fetchAllData = async () => {
    if (!user) return
    setLoading(true)
    await Promise.all([
      fetchAccounts(),
      fetchCreditCards(),
      fetchCategories(),
      fetchTransactions(),
      fetchInvestments(),
      fetchGoals()
    ])
    setLoading(false)
  }

  useEffect(() => {
    fetchAllData()
  }, [user])

  // CRUD operations for accounts
  const addAccount = async (account: Omit<Account, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert([{ ...account, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      setAccounts(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error adding account:', error)
      throw error
    }
  }

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setAccounts(prev => prev.map(acc => acc.id === id ? data : acc))
      return data
    } catch (error) {
      console.error('Error updating account:', error)
      throw error
    }
  }

  const deleteAccount = async (id: string) => {
    try {
      // First, delete all transactions related to this account
      await supabase
        .from('transactions')
        .delete()
        .eq('account_id', id)

      // Then, completely delete the account from the database
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id)

      if (error) throw error
      setAccounts(prev => prev.filter(acc => acc.id !== id))
      
      // Refresh transactions to reflect the changes
      await fetchTransactions()
    } catch (error) {
      console.error('Error deleting account:', error)
      throw error
    }
  }

  // Similar CRUD operations for other entities...
  const addCreditCard = async (card: Omit<CreditCard, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('credit_cards')
        .insert([{ ...card, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      setCreditCards(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error adding credit card:', error)
      throw error
    }
  }

  const addTransaction = async (transaction: Database['public']['Tables']['transactions']['Insert']) => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...transaction, user_id: user.id }])
        .select(`
          *,
          category:categories(*),
          account:accounts(*),
          credit_card:credit_cards(*)
        `)
        .single()

      if (error) throw error
      setTransactions(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error adding transaction:', error)
      throw error
    }
  }

  const addGoal = async (goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([{ ...goal, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      setGoals(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error adding goal:', error)
      throw error
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setGoals(prev => prev.map(goal => goal.id === id ? data : goal))
      return data
    } catch (error) {
      console.error('Error updating goal:', error)
      throw error
    }
  }

  const deleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)

      if (error) throw error
      setGoals(prev => prev.filter(goal => goal.id !== id))
    } catch (error) {
      console.error('Error deleting goal:', error)
      throw error
    }
  }

  return {
    // Data
    accounts,
    creditCards,
    categories,
    transactions,
    investments,
    goals,
    loading,
    
    // Methods
    fetchAllData,
    addAccount,
    updateAccount,
    deleteAccount,
    addCreditCard,
    addTransaction,
    addGoal,
    updateGoal,
    deleteGoal
  }
}