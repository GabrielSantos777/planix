import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/context/AuthContext'
import * as LucideIcons from 'lucide-react'
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
  TrendingUp,
  Folder,
  Coffee,
  Pizza,
  Fuel,
  Zap,
  Wifi,
  Smartphone,
  Laptop,
  Camera,
  Music,
  Video,
  Book,
  Pen,
  Clock,
  Calendar,
  MapPin,
  Globe,
  Shield,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Bell,
  Mail,
  Phone,
  MessageCircle,
  Users,
  User,
  Settings,
  Wrench,
  Hammer,
  Scissors,
  Paperclip,
  Flag,
  Tag,
  Bookmark,
  Archive,
  Download,
  Upload,
  Share,
  Copy,
  AtSign,
  Hash,
  Percent,
  DollarSign,
  Euro,
  Plus,
  Minus,
  X,
  Equal,
  Star,
  Circle,
  Square,
  Triangle,
  Diamond,
  Hexagon
} from 'lucide-react'

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  icon: string
  color: string
  is_default?: boolean
  user_id?: string
  parent_id?: string | null
}

interface CategoriesContextType {
  categories: Category[]
  addCategory: (category: Omit<Category, 'id'>) => Promise<Category | null>
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  getCategoryIcon: (iconName: string) => React.ComponentType<any>
  loading: boolean
  refetch: () => Promise<void>
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

export const useCategories = () => {
  const context = useContext(CategoriesContext)
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider')
  }
  return context
}

const iconMap: Record<string, React.ComponentType<any>> = {
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
  TrendingUp,
  folder: Folder,
  Folder,
  Coffee,
  Pizza,
  Fuel,
  Zap,
  Wifi,
  Smartphone,
  Laptop,
  Camera,
  Music,
  Video,
  Book,
  Pen,
  Clock,
  Calendar,
  MapPin,
  Globe,
  Shield,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Bell,
  Mail,
  Phone,
  MessageCircle,
  Users,
  User,
  Settings,
  Wrench,
  Hammer,
  Scissors,
  Paperclip,
  Flag,
  Tag,
  Bookmark,
  Archive,
  Download,
  Upload,
  Share,
  Copy,
  AtSign,
  Hash,
  Percent,
  DollarSign,
  Euro,
  Plus,
  Minus,
  X,
  Equal,
  Star,
  Circle,
  Square,
  Triangle,
  Diamond,
  Hexagon,
  // Lowercase mappings for database icons
  home: Home,
  car: Car,
  utensils: Utensils,
  heart: Heart,
  book: Book,
  'gamepad-2': GamepadIcon,
  briefcase: Briefcase,
  laptop: Laptop,
  'trending-up': TrendingUp
}

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    if (!user) {
      setCategories([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('name')

      if (error) throw error
      
      // Filter and map to ensure only income/expense types are included
      const filteredData: Category[] = (data || [])
        .filter(cat => cat.type === 'income' || cat.type === 'expense')
        .map(cat => ({
          id: cat.id,
          name: cat.name,
          type: cat.type as 'income' | 'expense',
          icon: cat.icon || 'Folder',
          color: cat.color || '#6B7280',
          is_default: cat.is_default || false,
          user_id: cat.user_id
        }))
      
      setCategories(filteredData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [user])

  const addCategory = async (category: Omit<Category, 'id'>): Promise<Category | null> => {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ 
          ...category, 
          user_id: user.id,
          is_default: false
        }])
        .select()
        .single()

      if (error) throw error
      
      const newCategory: Category = {
        id: data.id,
        name: data.name,
        type: data.type as 'income' | 'expense',
        icon: data.icon || 'Folder',
        color: data.color || '#6B7280',
        is_default: data.is_default || false,
        user_id: data.user_id
      }
      
      setCategories(prev => [...prev, newCategory])
      return newCategory
    } catch (error) {
      console.error('Error adding category:', error)
      throw error
    }
  }

  const updateCategory = async (id: string, updatedCategory: Partial<Category>) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update(updatedCategory)
        .eq('id', id)

      if (error) throw error

      setCategories(prev => 
        prev.map(category => 
          category.id === id 
            ? { ...category, ...updatedCategory }
            : category
        )
      )
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setCategories(prev => prev.filter(category => category.id !== id))
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  }

  const getCategoryIcon = (iconName: string): React.ComponentType<any> => {
    if (!iconName) return Folder
    
    // Try direct match first
    if (iconMap[iconName]) {
      return iconMap[iconName]
    }
    
    // Try with first letter capitalized
    const capitalized = iconName.charAt(0).toUpperCase() + iconName.slice(1)
    if (iconMap[capitalized]) {
      return iconMap[capitalized]
    }
    
    // Try to get from lucide-react dynamically
    const lucideIcon = (LucideIcons as any)[iconName] || (LucideIcons as any)[capitalized]
    if (lucideIcon) {
      return lucideIcon
    }
    
    return Folder
  }

  const value: CategoriesContextType = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryIcon,
    loading,
    refetch: fetchCategories
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
