import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense" | "transfer"
  category: string
  date: string
  account: string
}

export interface Account {
  id: string
  name: string
  type: "bank" | "credit"
  balance: number
}

interface AppContextType {
  transactions: Transaction[]
  accounts: Account[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  addAccount: (account: Omit<Account, 'id'>) => void
  updateAccount: (id: string, account: Partial<Account>) => void
  deleteAccount: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Trabalho",
      date: "2024-01-15",
      account: "Conta Principal"
    },
    {
      id: "2",
      description: "Supermercado",
      amount: -250,
      type: "expense",
      category: "Alimentação",
      date: "2024-01-14",
      account: "Cartão de Crédito"
    },
    {
      id: "3",
      description: "Freelance",
      amount: 800,
      type: "income",
      category: "Extra",
      date: "2024-01-13",
      account: "Conta Principal"
    }
  ])

  const [accounts, setAccounts] = useState<Account[]>([
    { id: "1", name: "Conta Principal", type: "bank", balance: 5000 },
    { id: "2", name: "Poupança", type: "bank", balance: 10000 },
    { id: "3", name: "Cartão Visa", type: "credit", balance: -1500 }
  ])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions')
    const savedAccounts = localStorage.getItem('accounts')
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
    
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts))
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts))
  }, [accounts])

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id 
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    )
  }

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id))
  }

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount: Account = {
      ...account,
      id: Date.now().toString()
    }
    setAccounts(prev => [...prev, newAccount])
  }

  const updateAccount = (id: string, updatedAccount: Partial<Account>) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === id 
          ? { ...account, ...updatedAccount }
          : account
      )
    )
  }

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id))
  }

  const value: AppContextType = {
    transactions,
    accounts,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addAccount,
    updateAccount,
    deleteAccount
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}