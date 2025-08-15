import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/context/AuthContext'

export interface Account {
  id: string
  name: string
  type: 'bank' | 'savings' | 'investment'
  initial_balance: number
  current_balance: number
  currency: string
  is_active: boolean
}

export interface CreditCard {
  id: string
  name: string
  card_type: 'visa' | 'mastercard' | 'elo' | 'amex'
  limit_amount: number
  current_balance: number
  closing_day: number
  due_day: number
  best_purchase_day?: number
  currency: string
  is_active: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  type: 'income' | 'expense' | 'transfer'
  is_default: boolean
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  category_id?: string
  account_id?: string
  credit_card_id?: string
  date: string
  currency: string
  notes?: string
  category?: Category
  account?: Account
  credit_card?: CreditCard
}

export interface Investment {
  id: string
  symbol: string
  name: string
  type: 'stocks' | 'crypto' | 'bonds' | 'funds'
  quantity: number
  average_price: number
  current_price: number
  currency: string
}

export interface Goal {
  id: string
  title: string
  description?: string
  target_amount: number
  current_amount: number
  target_date?: string
  status: 'active' | 'completed' | 'paused'
  currency: string
}

export const useSupabaseData = () => {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [creditCards, setCreditCards] = useState<CreditCard[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
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
  const addAccount = async (account: Omit<Account, 'id'>) => {
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
      const { error } = await supabase
        .from('accounts')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      setAccounts(prev => prev.filter(acc => acc.id !== id))
    } catch (error) {
      console.error('Error deleting account:', error)
      throw error
    }
  }

  // Similar CRUD operations for other entities...
  const addCreditCard = async (card: Omit<CreditCard, 'id'>) => {
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

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
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

  const addGoal = async (goal: Omit<Goal, 'id'>) => {
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