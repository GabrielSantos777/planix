import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Currency {
  code: string
  symbol: string
  name: string
  rate: number // Taxa em relação ao BRL
}

interface CurrencyContextType {
  currencies: Currency[]
  selectedCurrency: Currency
  setSelectedCurrency: (currency: Currency) => void
  formatCurrency: (amount: number, currencyCode?: string) => string
  convertToBRL: (amount: number, fromCurrency: string) => number
  convertFromBRL: (amount: number, toCurrency: string) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

const defaultCurrencies: Currency[] = [
  { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro', rate: 1 },
  { code: 'USD', symbol: '$', name: 'Dólar Americano', rate: 5.2 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 5.6 },
  { code: 'GBP', symbol: '£', name: 'Libra Esterlina', rate: 6.5 },
  { code: 'JPY', symbol: '¥', name: 'Iene Japonês', rate: 0.035 },
  { code: 'CAD', symbol: 'C$', name: 'Dólar Canadense', rate: 3.8 },
  { code: 'AUD', symbol: 'A$', name: 'Dólar Australiano', rate: 3.4 },
  { code: 'CHF', symbol: 'CHF', name: 'Franco Suíço', rate: 5.8 }
]

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currency[]>(defaultCurrencies)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrencies[0])

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency')
    if (savedCurrency) {
      const currency = JSON.parse(savedCurrency)
      setSelectedCurrency(currency)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency))
  }, [selectedCurrency])

  const formatCurrency = (amount: number, currencyCode?: string) => {
    const currency = currencyCode 
      ? currencies.find(c => c.code === currencyCode) || selectedCurrency
      : selectedCurrency

    return `${currency.symbol} ${Math.abs(amount).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }

  const convertToBRL = (amount: number, fromCurrency: string) => {
    const currency = currencies.find(c => c.code === fromCurrency)
    if (!currency || fromCurrency === 'BRL') return amount
    return amount * currency.rate
  }

  const convertFromBRL = (amount: number, toCurrency: string) => {
    const currency = currencies.find(c => c.code === toCurrency)
    if (!currency || toCurrency === 'BRL') return amount
    return amount / currency.rate
  }

  const value: CurrencyContextType = {
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    formatCurrency,
    convertToBRL,
    convertFromBRL
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}