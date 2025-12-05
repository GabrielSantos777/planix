import { useMemo } from 'react'

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
 * Regras:
 * - Compras feitas ANTES do dia de fechamento → fatura atual (mesmo mês)
 * - Compras feitas NO DIA ou APÓS o fechamento → próxima fatura
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
  
  // Se a compra foi feita no dia do fechamento ou depois, vai para a PRÓXIMA fatura
  if (purchaseDay >= closingDay) {
    // Próximo mês
    if (purchaseMonth === 11) {
      invoiceMonth = 0
      invoiceYear = purchaseYear + 1
    } else {
      invoiceMonth = purchaseMonth + 1
      invoiceYear = purchaseYear
    }
  } else {
    // Compra antes do fechamento → fatura atual (mesmo mês da compra)
    invoiceMonth = purchaseMonth
    invoiceYear = purchaseYear
  }
  
  // Calcular data de fechamento da fatura
  const closingDate = new Date(invoiceYear, invoiceMonth, closingDay)
  
  // Calcular data de vencimento da fatura
  const dueDate = new Date(invoiceYear, invoiceMonth, dueDay)
  
  // Verificar se a fatura está aberta (ainda não fechou)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Determinar data de fechamento atual para comparação
  const currentClosingDate = new Date(today.getFullYear(), today.getMonth(), closingDay)
  
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
 * Regras:
 * - Até o dia de fechamento (inclusive): exibir fatura do mês atual
 * - A partir do dia seguinte ao fechamento: exibir fatura do próximo mês como "atual"
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
  
  // Se estamos NO DIA de fechamento ou ANTES, a fatura atual é do mês corrente
  // Se estamos DEPOIS do dia de fechamento, a fatura "atual" passa a ser a do próximo mês
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
  
  if (purchaseDay >= closingDay) {
    explanation = `Compra no dia ${purchaseDay} (no dia do fechamento ou após): cairá na fatura de ${monthNames[invoice.month]}/${invoice.year}`
  } else {
    explanation = `Compra no dia ${purchaseDay} (antes do fechamento dia ${closingDay}): cairá na fatura de ${monthNames[invoice.month]}/${invoice.year}`
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
      const transactionDate = new Date(transaction.date)
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
