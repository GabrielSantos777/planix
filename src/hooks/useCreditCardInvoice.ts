import { useMemo } from 'react'
import { parseLocalDate } from '@/utils/dateUtils'
interface CreditCard {
  id: string
  name: string
  closing_day: number
  due_day: number
  best_purchase_day?: number | null
  limit_amount: number
}

interface Transaction {
  id: string
  date: string
  amount: number
  description: string
  credit_card_id?: string | null
}

interface InvoiceInfo {
  month: number
  year: number
  closingDate: Date
  dueDate: Date
  isOpen: boolean
  isCurrent: boolean
}

/**
 * Calcula em qual fatura uma compra cairá com base na data da compra e no dia de fechamento
 * 
 * LÓGICA CORRETA - O período da fatura ATRAVESSA meses:
 * Exemplo: Fechamento dia 8
 * - Fatura de Janeiro/2024: compras de 09/Dez/2023 até 08/Jan/2024
 * - Fatura de Fevereiro/2024: compras de 09/Jan/2024 até 08/Fev/2024
 * 
 * Regras:
 * - Compras do dia 1 até o dia do fechamento (inclusive) → fatura do mês atual
 * - Compras do dia APÓS fechamento até o final do mês → fatura do PRÓXIMO mês
 */
export function getInvoiceForPurchase(
  purchaseDate: Date,
  closingDay: number,
  dueDay: number
): InvoiceInfo {
  const purchaseDay = purchaseDate.getDate()
  const purchaseMonth = purchaseDate.getMonth()
  const purchaseYear = purchaseDate.getFullYear()
  
  let invoiceMonth: number
  let invoiceYear: number
  
  // Se a compra foi feita ATÉ o dia do fechamento (inclusive), vai para a fatura do MÊS ATUAL
  // Se a compra foi feita APÓS o dia do fechamento, vai para a fatura do PRÓXIMO mês
  if (purchaseDay <= closingDay) {
    // Compra até o dia do fechamento → fatura do mês atual da compra
    invoiceMonth = purchaseMonth
    invoiceYear = purchaseYear
  } else {
    // Compra após o fechamento → fatura do próximo mês
    if (purchaseMonth === 11) {
      invoiceMonth = 0
      invoiceYear = purchaseYear + 1
    } else {
      invoiceMonth = purchaseMonth + 1
      invoiceYear = purchaseYear
    }
  }
  
  // Calcular data de fechamento da fatura (dia do fechamento no mês da fatura)
  const closingDate = new Date(invoiceYear, invoiceMonth, closingDay)
  
  // Calcular data de vencimento da fatura
  const dueDate = new Date(invoiceYear, invoiceMonth, dueDay)
  
  // Verificar se a fatura está aberta (ainda não fechou)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const isOpen = today < closingDate
  
  // Verificar se é a fatura atual a ser exibida
  const currentInvoice = getCurrentInvoice(closingDay, dueDay)
  const isCurrent = invoiceMonth === currentInvoice.month && invoiceYear === currentInvoice.year
  
  return {
    month: invoiceMonth,
    year: invoiceYear,
    closingDate,
    dueDate,
    isOpen,
    isCurrent
  }
}

/**
 * Retorna a fatura atual que deve ser exibida com base na data de hoje e no dia de fechamento
 * 
 * LÓGICA CORRETA - O período da fatura ATRAVESSA meses:
 * Exemplo: Fechamento dia 8, hoje é dia 5 de Janeiro
 * - Estamos dentro do período da fatura de Janeiro (que recebe compras de 09/Dez até 08/Jan)
 * - Fatura atual = Janeiro
 * 
 * Exemplo: Fechamento dia 8, hoje é dia 15 de Janeiro
 * - Já passou o fechamento de Janeiro, agora estamos no período da fatura de Fevereiro
 * - Fatura atual = Fevereiro (recebe compras de 09/Jan até 08/Fev)
 * 
 * Regras:
 * - Até o dia de fechamento (inclusive): exibir fatura do mês atual
 * - Após o dia de fechamento: exibir fatura do próximo mês como "atual"
 */
export function getCurrentInvoice(
  closingDay: number,
  dueDay: number
): InvoiceInfo {
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  let invoiceMonth: number
  let invoiceYear: number
  
  // Se estamos ATÉ o dia de fechamento (inclusive), a fatura atual é do mês corrente
  // Se estamos APÓS o dia de fechamento, a fatura "atual" passa a ser a do próximo mês
  if (currentDay <= closingDay) {
    invoiceMonth = currentMonth
    invoiceYear = currentYear
  } else {
    // Após o fechamento, a fatura atual é a do próximo mês
    if (currentMonth === 11) {
      invoiceMonth = 0
      invoiceYear = currentYear + 1
    } else {
      invoiceMonth = currentMonth + 1
      invoiceYear = currentYear
    }
  }
  
  const closingDate = new Date(invoiceYear, invoiceMonth, closingDay)
  const dueDate = new Date(invoiceYear, invoiceMonth, dueDay)
  
  return {
    month: invoiceMonth,
    year: invoiceYear,
    closingDate,
    dueDate,
    isOpen: true,
    isCurrent: true
  }
}

/**
 * Calcula o melhor dia de compra (sempre o dia seguinte ao fechamento)
 */
export function getBestPurchaseDay(closingDay: number): number {
  // O melhor dia é sempre o dia seguinte ao fechamento
  // Se o fechamento é dia 31, o melhor dia é dia 1 do próximo mês
  if (closingDay >= 28) {
    return 1 // Para evitar problemas com meses que não têm dia 29, 30 ou 31
  }
  return closingDay + 1
}

/**
 * Retorna informações sobre quando uma compra feita em determinada data será cobrada
 */
export function getPurchaseInvoiceInfo(
  purchaseDate: Date,
  closingDay: number,
  dueDay: number
): {
  invoice: InvoiceInfo
  explanation: string
  daysUntilDue: number
} {
  const invoice = getInvoiceForPurchase(purchaseDate, closingDay, dueDay)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const daysUntilDue = Math.ceil((invoice.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  
  const purchaseDay = purchaseDate.getDate()
  let explanation: string
  
  if (purchaseDay <= closingDay) {
    explanation = `Compra no dia ${purchaseDay} (até o fechamento dia ${closingDay}): cairá na fatura de ${monthNames[invoice.month]}/${invoice.year}`
  } else {
    explanation = `Compra no dia ${purchaseDay} (após o fechamento dia ${closingDay}): cairá na fatura de ${monthNames[invoice.month]}/${invoice.year}`
  }
  
  return {
    invoice,
    explanation,
    daysUntilDue
  }
}

/**
 * Hook para gerenciar a lógica de faturas de um cartão de crédito
 */
export function useCreditCardInvoice(
  card: CreditCard | null,
  transactions: Transaction[]
) {
  const cardTransactions = useMemo(() => {
    if (!card) return []
    return transactions.filter(t => t.credit_card_id === card.id)
  }, [card, transactions])
  
  const bestPurchaseDay = useMemo(() => {
    if (!card) return null
    return card.best_purchase_day || getBestPurchaseDay(card.closing_day)
  }, [card])
  
  const currentInvoice = useMemo(() => {
    if (!card) return null
    return getCurrentInvoice(card.closing_day, card.due_day)
  }, [card])
  
  // Agrupar transações por fatura
  const invoicesByMonth = useMemo(() => {
    if (!card) return new Map<string, { 
      month: number
      year: number
      transactions: Transaction[]
      total: number
      closingDate: Date
      dueDate: Date
      isOpen: boolean
      isCurrent: boolean
      status: 'open' | 'closed' | 'overdue'
    }>()
    
    const invoices = new Map<string, {
      month: number
      year: number
      transactions: Transaction[]
      total: number
      closingDate: Date
      dueDate: Date
      isOpen: boolean
      isCurrent: boolean
      status: 'open' | 'closed' | 'overdue'
    }>()
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    cardTransactions.forEach(transaction => {
      const transactionDate = parseLocalDate(transaction.date)
      const invoiceInfo = getInvoiceForPurchase(transactionDate, card.closing_day, card.due_day)
      
      const key = `${invoiceInfo.year}-${invoiceInfo.month.toString().padStart(2, '0')}`
      
      if (!invoices.has(key)) {
        // Determinar status
        let status: 'open' | 'closed' | 'overdue' = 'open'
        if (today > invoiceInfo.dueDate) {
          status = 'overdue'
        } else if (today > invoiceInfo.closingDate) {
          status = 'closed'
        }
        
        invoices.set(key, {
          month: invoiceInfo.month,
          year: invoiceInfo.year,
          transactions: [],
          total: 0,
          closingDate: invoiceInfo.closingDate,
          dueDate: invoiceInfo.dueDate,
          isOpen: invoiceInfo.isOpen,
          isCurrent: invoiceInfo.isCurrent,
          status
        })
      }
      
      const invoice = invoices.get(key)!
      invoice.transactions.push(transaction)
      invoice.total += Math.abs(transaction.amount)
    })
    
    return invoices
  }, [card, cardTransactions])
  
  // Obter fatura atual
  const currentInvoiceData = useMemo(() => {
    if (!currentInvoice) return null
    const key = `${currentInvoice.year}-${currentInvoice.month.toString().padStart(2, '0')}`
    return invoicesByMonth.get(key) || {
      month: currentInvoice.month,
      year: currentInvoice.year,
      transactions: [],
      total: 0,
      closingDate: currentInvoice.closingDate,
      dueDate: currentInvoice.dueDate,
      isOpen: true,
      isCurrent: true,
      status: 'open' as const
    }
  }, [currentInvoice, invoicesByMonth])
  
  // Lista de todas as faturas ordenadas por data (mais recente primeiro)
  const allInvoices = useMemo(() => {
    return Array.from(invoicesByMonth.values()).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return b.month - a.month
    })
  }, [invoicesByMonth])
  
  return {
    bestPurchaseDay,
    currentInvoice,
    currentInvoiceData,
    allInvoices,
    invoicesByMonth,
    getInvoiceForPurchase: (date: Date) => 
      card ? getInvoiceForPurchase(date, card.closing_day, card.due_day) : null,
    getPurchaseInfo: (date: Date) =>
      card ? getPurchaseInvoiceInfo(date, card.closing_day, card.due_day) : null
  }
}
