import React, { useState, useEffect } from 'react'
import { Input } from './input'
import { useCurrency } from '@/context/CurrencyContext'

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  className?: string
  currency?: string
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "0,00",
  className = "",
  currency 
}) => {
  const { formatCurrency, selectedCurrency } = useCurrency()
  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    if (value === 0) {
      setDisplayValue('')
    } else {
      const formatted = Math.abs(value).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      setDisplayValue(formatted)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Remove tudo que não é número ou vírgula
    const numericValue = inputValue.replace(/[^\d,]/g, '')
    
    // Se vazio, define como 0
    if (!numericValue) {
      setDisplayValue('')
      onChange(0)
      return
    }
    
    // Converte vírgula para ponto e transforma em número
    const numberValue = parseFloat(numericValue.replace(',', '.'))
    
    if (!isNaN(numberValue)) {
      setDisplayValue(numericValue)
      onChange(numberValue)
    }
  }

  const currencySymbol = currency 
    ? currency 
    : selectedCurrency.symbol

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
        {currencySymbol}
      </div>
      <Input
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`pl-12 ${className}`}
      />
    </div>
  )
}