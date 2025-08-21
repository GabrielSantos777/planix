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
export type CreditCardInvoice = Database['public']['Tables']['credit_card_invoices']['Row']

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
  const [creditCardInvoices, setCreditCardInvoices] = useState<CreditCardInvoice[]>([])
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
  const fetchCreditCardInvoices = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('credit_card_invoices')
        .select('*')
        .eq('user_id', user.id)
        .order('year', { ascending: false })
        .order('month', { ascending: false })

      if (error) {
        console.error('Error fetching credit card invoices:', error)
        return
      }

      setCreditCardInvoices(data || [])
    } catch (error) {
      console.error('Error fetching credit card invoices:', error)
    }
  }

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
      fetchGoals(),
      fetchCreditCardInvoices()
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
        .insert([{ 
          ...account, 
          user_id: user.id,
          current_balance: account.initial_balance || 0
        }])
        .select()
        .single()

      if (error) throw error
      setAccounts(prev => [data, ...prev])
      await fetchAllData() // Refresh all data to ensure sync
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
        .update({
          ...updates,
          current_balance: updates.initial_balance || updates.current_balance
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setAccounts(prev => prev.map(acc => acc.id === id ? data : acc))
      await fetchAllData() // Refresh all data to ensure sync
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

  const updateCreditCard = async (id: string, updates: Partial<CreditCard>) => {
    try {
      const { data, error } = await supabase
        .from('credit_cards')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setCreditCards(prev => prev.map(card => card.id === id ? data : card))
      return data
    } catch (error) {
      console.error('Error updating credit card:', error)
      throw error
    }
  }

  const deleteCreditCard = async (id: string) => {
    try {
      // First, delete all transactions related to this credit card
      await supabase
        .from('transactions')
        .delete()
        .eq('credit_card_id', id)

      // Then, delete the credit card
      const { error } = await supabase
        .from('credit_cards')
        .delete()
        .eq('id', id)

      if (error) throw error
      setCreditCards(prev => prev.filter(card => card.id !== id))
      
      // Refresh transactions to reflect the changes
      await fetchTransactions()
    } catch (error) {
      console.error('Error deleting credit card:', error)
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
      
      // Update account balance
      if (transaction.account_id) {
        const account = accounts.find(acc => acc.id === transaction.account_id)
        if (account) {
          const newBalance = (account.current_balance || 0) + (transaction.amount || 0)
          await updateAccount(transaction.account_id, { current_balance: newBalance })
        }
      }
      
      // Update credit card balance
      if (transaction.credit_card_id) {
        const creditCard = creditCards.find(card => card.id === transaction.credit_card_id)
        if (creditCard) {
          const newBalance = (creditCard.current_balance || 0) + Math.abs(transaction.amount || 0)
          await updateCreditCard(transaction.credit_card_id, { current_balance: newBalance })
        }
      }
      
      setTransactions(prev => [data, ...prev])
      await fetchAllData() // Refresh all data to ensure sync
      return data
    } catch (error) {
      console.error('Error adding transaction:', error)
      throw error
    }
  }

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      // Get the original transaction to calculate balance changes
      const originalTransaction = transactions.find(t => t.id === id)
      if (!originalTransaction) throw new Error('Transaction not found')

      const { data, error } = await supabase
        .from('transactions')
        .update({
          ...updates,
          amount: updates.type === "expense" && updates.amount ? -Math.abs(updates.amount) : updates.amount
        })
        .eq('id', id)
        .select(`
          *,
          category:categories(*),
          account:accounts(*),
          credit_card:credit_cards(*)
        `)
        .single()

      if (error) throw error
      
      // Update account balance if transaction has an account
      if (originalTransaction.account_id) {
        const account = accounts.find(acc => acc.id === originalTransaction.account_id)
        if (account) {
          // Reverse the original transaction effect
          let newBalance = (account.current_balance || 0) - (originalTransaction.amount || 0)
          // Apply the new transaction effect
          newBalance += (data.amount || 0)
          await updateAccount(originalTransaction.account_id, { current_balance: newBalance })
        }
      }
      
      // Update credit card balance if transaction has a credit card
      if (originalTransaction.credit_card_id) {
        const creditCard = creditCards.find(card => card.id === originalTransaction.credit_card_id)
        if (creditCard) {
          // Reverse the original transaction effect (subtract from balance)
          let newBalance = (creditCard.current_balance || 0) - Math.abs(originalTransaction.amount || 0)
          // Apply the new transaction effect (add to balance)
          newBalance += Math.abs(data.amount || 0)
          await updateCreditCard(originalTransaction.credit_card_id, { current_balance: newBalance })
        }
      }
      
      setTransactions(prev => prev.map(transaction => 
        transaction.id === id ? data : transaction
      ))
      await fetchAllData() // Refresh all data to ensure sync
      return data
    } catch (error) {
      console.error('Error updating transaction:', error)
      throw error
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      // Get the transaction before deleting to update account balance
      const transaction = transactions.find(t => t.id === id)
      
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      // Update account balance if transaction had an account
      if (transaction?.account_id) {
        const account = accounts.find(acc => acc.id === transaction.account_id)
        if (account) {
          const newBalance = (account.current_balance || 0) - (transaction.amount || 0)
          await updateAccount(transaction.account_id, { current_balance: newBalance })
        }
      }
      
      // Update credit card balance if transaction had a credit card
      if (transaction?.credit_card_id) {
        const creditCard = creditCards.find(card => card.id === transaction.credit_card_id)
        if (creditCard) {
          const newBalance = (creditCard.current_balance || 0) - Math.abs(transaction.amount || 0)
          await updateCreditCard(transaction.credit_card_id, { current_balance: newBalance })
        }
      }
      
      setTransactions(prev => prev.filter(transaction => transaction.id !== id))
      await fetchAllData() // Refresh all data to ensure sync
    } catch (error) {
      console.error('Error deleting transaction:', error)
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

  // Credit Card Invoice operations
  const addCreditCardInvoice = async (invoiceData: Omit<CreditCardInvoice, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('credit_card_invoices')
      .insert([{
        ...invoiceData,
        user_id: user.id
      }])
      .select()
      .single()

    if (error) throw error

    setCreditCardInvoices(prev => [data, ...prev])
    return data
  }

  const updateCreditCardInvoice = async (id: string, updates: Partial<CreditCardInvoice>) => {
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('credit_card_invoices')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    setCreditCardInvoices(prev => prev.map(invoice => 
      invoice.id === id ? data : invoice
    ))
    return data
  }

  const upsertCreditCardInvoice = async (invoiceData: {
    credit_card_id: string
    month: number
    year: number
    total_amount: number
    paid_amount: number
    status: string
    due_date?: string
    payment_date?: string
    notes?: string
  }) => {
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('credit_card_invoices')
      .upsert([{
        ...invoiceData,
        user_id: user.id
      }], {
        onConflict: 'credit_card_id,month,year'
      })
      .select()
      .single()

    if (error) throw error

    await fetchCreditCardInvoices()
    return data
  }

  return {
    // Data
    accounts,
    creditCards,
    categories,
    transactions,
    investments,
    goals,
    creditCardInvoices,
    loading,
    
    // Methods
    fetchAllData,
    addAccount,
    updateAccount,
    deleteAccount,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    addCreditCardInvoice,
    updateCreditCardInvoice,
    upsertCreditCardInvoice
  }
}