import React from 'react'

export const formatCurrency = (amount: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatCurrencyWithColor = (
  amount: number, 
  currency: string = 'BRL',
  showSign: boolean = false
): React.ReactElement => {
  const isNegative = amount < 0
  const absAmount = Math.abs(amount)
  const formattedAmount = formatCurrency(absAmount, currency)
  
  const colorClass = isNegative ? 'text-destructive' : 'text-success'
  const sign = isNegative ? '- ' : (showSign && amount > 0 ? '+ ' : '')
  
  return (
    <span className={colorClass}>
      {sign}{formattedAmount}
    </span>
  )
}

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj)
}

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}