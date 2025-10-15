import { useState, useEffect } from 'react'
import { Layout } from 'react-grid-layout'

export interface DashboardCard {
  id: string
  title: string
  visible: boolean
}

const defaultLayout: Layout[] = [
  { i: 'investments', x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: 'income', x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: 'expenses', x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: 'creditCard', x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: 'totalBalance', x: 0, y: 2, w: 4, h: 2, minW: 2, minH: 2 },
  { i: 'monthlyNet', x: 4, y: 2, w: 4, h: 2, minW: 2, minH: 2 },
  { i: 'myCreditCard', x: 8, y: 2, w: 4, h: 2, minW: 2, minH: 2 },
  { i: 'accountBalances', x: 0, y: 4, w: 6, h: 4, minW: 4, minH: 3 },
  { i: 'wealthEvolution', x: 6, y: 4, w: 6, h: 4, minW: 4, minH: 3 },
  { i: 'quickActions', x: 0, y: 8, w: 12, h: 2, minW: 4, minH: 2 },
  { i: 'recentTransactions', x: 0, y: 10, w: 12, h: 4, minW: 4, minH: 3 },
]

const defaultCards: DashboardCard[] = [
  { id: 'investments', title: 'Investimentos', visible: true },
  { id: 'income', title: 'Total Receitas', visible: true },
  { id: 'expenses', title: 'Total Despesas', visible: true },
  { id: 'creditCard', title: 'Cartão de Crédito', visible: true },
  { id: 'totalBalance', title: 'Saldo Total Geral', visible: true },
  { id: 'monthlyNet', title: 'Saldo Mensal', visible: true },
  { id: 'myCreditCard', title: 'Meu Cartão', visible: true },
  { id: 'accountBalances', title: 'Saldo por Conta', visible: true },
  { id: 'wealthEvolution', title: 'Evolução Patrimonial', visible: true },
  { id: 'quickActions', title: 'Ações Rápidas', visible: true },
  { id: 'recentTransactions', title: 'Transações Recentes', visible: true },
]

export const useDashboardLayout = () => {
  const [layout, setLayout] = useState<Layout[]>(() => {
    const saved = localStorage.getItem('dashboard-layout')
    return saved ? JSON.parse(saved) : defaultLayout
  })

  const [cards, setCards] = useState<DashboardCard[]>(() => {
    const saved = localStorage.getItem('dashboard-cards')
    return saved ? JSON.parse(saved) : defaultCards
  })

  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('dashboard-layout', JSON.stringify(layout))
  }, [layout])

  useEffect(() => {
    localStorage.setItem('dashboard-cards', JSON.stringify(cards))
  }, [cards])

  const toggleCardVisibility = (cardId: string) => {
    setCards(prev =>
      prev.map(card =>
        card.id === cardId ? { ...card, visible: !card.visible } : card
      )
    )
  }

  const resetLayout = () => {
    setLayout(defaultLayout)
    setCards(defaultCards)
  }

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout)
  }

  return {
    layout,
    cards,
    isEditMode,
    setIsEditMode,
    toggleCardVisibility,
    resetLayout,
    onLayoutChange,
  }
}
