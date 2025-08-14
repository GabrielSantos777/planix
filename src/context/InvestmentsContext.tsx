import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Investment {
  id: string
  symbol: string
  name: string
  type: 'stock' | 'reit' | 'crypto' | 'bond' | 'fund'
  quantity: number
  averagePrice: number
  currentPrice: number
  currency: string
  lastUpdate: string
}

interface InvestmentsContextType {
  investments: Investment[]
  addInvestment: (investment: Omit<Investment, 'id'>) => void
  updateInvestment: (id: string, investment: Partial<Investment>) => void
  deleteInvestment: (id: string) => void
  getTotalValue: () => number
  getTotalProfit: () => number
  updatePrices: () => Promise<void>
}

const InvestmentsContext = createContext<InvestmentsContextType | undefined>(undefined)

export const useInvestments = () => {
  const context = useContext(InvestmentsContext)
  if (!context) {
    throw new Error('useInvestments must be used within an InvestmentsProvider')
  }
  return context
}

// Mock data for demonstration
const mockInvestments: Investment[] = [
  {
    id: '1',
    symbol: 'PETR4',
    name: 'Petrobras PN',
    type: 'stock',
    quantity: 100,
    averagePrice: 28.50,
    currentPrice: 32.15,
    currency: 'BRL',
    lastUpdate: new Date().toISOString()
  },
  {
    id: '2',
    symbol: 'VALE3',
    name: 'Vale ON',
    type: 'stock',
    quantity: 50,
    averagePrice: 65.20,
    currentPrice: 68.75,
    currency: 'BRL',
    lastUpdate: new Date().toISOString()
  },
  {
    id: '3',
    symbol: 'HGLG11',
    name: 'CSHG Logística',
    type: 'reit',
    quantity: 200,
    averagePrice: 155.30,
    currentPrice: 162.80,
    currency: 'BRL',
    lastUpdate: new Date().toISOString()
  }
]

export const InvestmentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments)

  useEffect(() => {
    const savedInvestments = localStorage.getItem('investments')
    if (savedInvestments) {
      setInvestments(JSON.parse(savedInvestments))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments))
  }, [investments])

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: Date.now().toString(),
      lastUpdate: new Date().toISOString()
    }
    setInvestments(prev => [...prev, newInvestment])
  }

  const updateInvestment = (id: string, updatedInvestment: Partial<Investment>) => {
    setInvestments(prev => 
      prev.map(investment => 
        investment.id === id 
          ? { ...investment, ...updatedInvestment, lastUpdate: new Date().toISOString() }
          : investment
      )
    )
  }

  const deleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(investment => investment.id !== id))
  }

  const getTotalValue = () => {
    return investments.reduce((total, investment) => {
      return total + (investment.quantity * investment.currentPrice)
    }, 0)
  }

  const getTotalProfit = () => {
    return investments.reduce((total, investment) => {
      const invested = investment.quantity * investment.averagePrice
      const current = investment.quantity * investment.currentPrice
      return total + (current - invested)
    }, 0)
  }

  // Mock function to simulate real-time price updates
  const updatePrices = async () => {
    // In a real implementation, this would fetch data from a financial API
    setInvestments(prev => 
      prev.map(investment => ({
        ...investment,
        currentPrice: investment.currentPrice * (0.95 + Math.random() * 0.1), // ±5% variation
        lastUpdate: new Date().toISOString()
      }))
    )
  }

  const value: InvestmentsContextType = {
    investments,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    getTotalValue,
    getTotalProfit,
    updatePrices
  }

  return (
    <InvestmentsContext.Provider value={value}>
      {children}
    </InvestmentsContext.Provider>
  )
}