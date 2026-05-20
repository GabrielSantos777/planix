import React, { createContext, useContext } from 'react'
import { useSupabaseData } from '@/hooks/useSupabaseData'
import type { Account, TransactionWithRelations } from '@/hooks/useSupabaseData'

/**
 * AppContext now delegates to useSupabaseData instead of maintaining
 * separate localStorage state that could conflict with the real database.
 */

interface AppContextType {
  transactions: TransactionWithRelations[]
  accounts: Account[]
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
  const { transactions, accounts } = useSupabaseData()

  const value: AppContextType = {
    transactions,
    accounts,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
