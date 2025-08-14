import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  Home, 
  Car, 
  ShoppingCart, 
  Utensils, 
  GamepadIcon, 
  Shirt, 
  Heart, 
  GraduationCap,
  Plane,
  Gift,
  Briefcase,
  Coins,
  PiggyBank,
  TrendingUp
} from 'lucide-react'

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  icon: string
  color: string
}

interface CategoriesContextType {
  categories: Category[]
  addCategory: (category: Omit<Category, 'id'>) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
  getCategoryIcon: (iconName: string) => React.ComponentType<any>
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

export const useCategories = () => {
  const context = useContext(CategoriesContext)
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider')
  }
  return context
}

const iconMap = {
  Home,
  Car,
  ShoppingCart,
  Utensils,
  GamepadIcon,
  Shirt,
  Heart,
  GraduationCap,
  Plane,
  Gift,
  Briefcase,
  Coins,
  PiggyBank,
  TrendingUp
}

const defaultCategories: Category[] = [
  // Despesas
  { id: '1', name: 'Alimentação', type: 'expense', icon: 'Utensils', color: '#FF6B6B' },
  { id: '2', name: 'Transporte', type: 'expense', icon: 'Car', color: '#4ECDC4' },
  { id: '3', name: 'Compras', type: 'expense', icon: 'ShoppingCart', color: '#45B7D1' },
  { id: '4', name: 'Casa', type: 'expense', icon: 'Home', color: '#96CEB4' },
  { id: '5', name: 'Entretenimento', type: 'expense', icon: 'GamepadIcon', color: '#FFEAA7' },
  { id: '6', name: 'Roupas', type: 'expense', icon: 'Shirt', color: '#DDA0DD' },
  { id: '7', name: 'Saúde', type: 'expense', icon: 'Heart', color: '#FF7675' },
  { id: '8', name: 'Educação', type: 'expense', icon: 'GraduationCap', color: '#74B9FF' },
  { id: '9', name: 'Viagem', type: 'expense', icon: 'Plane', color: '#00B894' },
  
  // Receitas
  { id: '10', name: 'Salário', type: 'income', icon: 'Briefcase', color: '#00B894' },
  { id: '11', name: 'Freelance', type: 'income', icon: 'Coins', color: '#FDCB6E' },
  { id: '12', name: 'Investimentos', type: 'income', icon: 'TrendingUp', color: '#6C5CE7' },
  { id: '13', name: 'Presente', type: 'income', icon: 'Gift', color: '#FD79A8' },
  { id: '14', name: 'Poupança', type: 'income', icon: 'PiggyBank', color: '#00CEC9' }
]

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories)

  useEffect(() => {
    const savedCategories = localStorage.getItem('categories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    }
    setCategories(prev => [...prev, newCategory])
  }

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id 
          ? { ...category, ...updatedCategory }
          : category
      )
    )
  }

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id))
  }

  const getCategoryIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Home
  }

  const value: CategoriesContextType = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryIcon
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}