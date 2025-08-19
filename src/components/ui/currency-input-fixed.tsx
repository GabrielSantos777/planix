import React, { useState, useEffect, forwardRef } from 'react'
import { Input } from './input'
import { useCurrency } from '@/context/CurrencyContext'
import { cn } from '@/lib/utils'

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  className?: string
  currency?: string
  disabled?: boolean
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, placeholder = "0,00", className = "", currency, disabled }, ref) => {
    const { selectedCurrency } = useCurrency()
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
      let inputValue = e.target.value
      
      // Remove tudo que não é número
      const numericValue = inputValue.replace(/\D/g, '')
      
      // Se vazio, define como 0
      if (!numericValue) {
        setDisplayValue('')
        onChange(0)
        return
      }
      
      // Converte para número (em centavos) e depois para reais
      const numberValue = parseInt(numericValue) / 100
      
      // Formata para exibição
      const formatted = numberValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      
      setDisplayValue(formatted)
      onChange(numberValue)
    }

    const currencySymbol = currency 
      ? currency 
      : selectedCurrency.symbol

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
          {currencySymbol}
        </div>
        <Input
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "pl-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            className
          )}
        />
      </div>
    )
  }
)

CurrencyInput.displayName = "CurrencyInput"