import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useToast } from '@/hooks/use-toast'
import { useCategories, Category } from '@/context/CategoriesContext'
import { Plus, Edit, Trash2, Loader2, ChevronDown, ChevronRight } from 'lucide-react'

const iconOptions = [
  // Categorias básicas
  'Home', 'Car', 'ShoppingCart', 'Utensils', 'GamepadIcon', 'Shirt', 
  'Heart', 'GraduationCap', 'Plane', 'Gift', 'Briefcase', 'Coins', 
  'PiggyBank', 'TrendingUp',
  
  // Símbolos de teclado comuns
  'AtSign', 'Hash', 'Percent', 'DollarSign', 'Euro', 'Pound',
  'Plus', 'Minus', 'X', 'Equal', 'Star', 'Circle',
  'Square', 'Triangle', 'Diamond', 'Hexagon',
  
  // Ícones adicionais úteis
  'Coffee', 'Pizza', 'Fuel', 'Zap', 'Wifi', 'Smartphone',
  'Laptop', 'Camera', 'Music', 'Video', 'Book', 'Pen',
  'Clock', 'Calendar', 'MapPin', 'Globe', 'Shield', 'Key',
  'Lock', 'Unlock', 'Eye', 'EyeOff', 'Bell', 'Mail',
  'Phone', 'MessageCircle', 'Users', 'User', 'Settings', 'Tool',
  'Wrench', 'Hammer', 'Scissors', 'Paperclip', 'Flag', 'Tag',
  'Bookmark', 'Archive', 'Download', 'Upload', 'Share', 'Copy'
]

const colorOptions = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
  '#06B6D4', '#84CC16', '#F97316', '#6366F1', '#14B8A6', '#F59E0B'
]

interface CategoryFormData {
  name: string
  type: 'income' | 'expense'
  icon: string
  color: string
  parent_id: string | null
}

export const CategoryManagement = () => {
  const { toast } = useToast()
  const { categories, addCategory, updateCategory, deleteCategory, getCategoryIcon, loading, refetch } = useCategories()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    type: 'expense',
    icon: 'Folder',
    color: '#6B7280',
    parent_id: null
  })
  
  // Refetch categories on mount
  useEffect(() => {
    refetch()
  }, [])

  // Get parent categories (categories without parent_id)
  const getParentCategories = (type: 'income' | 'expense') => {
    return categories.filter(cat => cat.type === type && !cat.parent_id)
  }

  // Get subcategories for a parent
  const getSubcategories = (parentId: string) => {
    return categories.filter(cat => cat.parent_id === parentId)
  }

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome da categoria é obrigatório",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData)
        toast({
          title: "✅ Categoria atualizada!",
          description: `${formData.name} foi atualizada com sucesso.`
        })
      } else {
        await addCategory(formData)
        toast({
          title: "✅ Categoria criada!",
          description: `${formData.name} foi criada com sucesso.`
        })
      }

      setFormData({ name: '', type: 'expense', icon: 'Folder', color: '#6B7280', parent_id: null })
      setEditingCategory(null)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Erro ao salvar categoria:', error)
      toast({
        title: "❌ Erro",
        description: error instanceof Error ? error.message : "Erro ao salvar categoria. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color,
      parent_id: category.parent_id || null
    })
    setIsDialogOpen(true)
  }

  const handleAddSubcategory = (parentCategory: Category) => {
    setEditingCategory(null)
    setFormData({
      name: '',
      type: parentCategory.type,
      icon: 'Folder',
      color: parentCategory.color,
      parent_id: parentCategory.id
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId)
      toast({
        title: "Categoria excluída!",
        description: "Categoria foi removida com sucesso."
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir categoria. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const incomeCategories = getParentCategories('income')
  const expenseCategories = getParentCategories('expense')

  // Get available parent categories based on current type
  const availableParentCategories = categories.filter(
    cat => cat.type === formData.type && !cat.parent_id && cat.id !== editingCategory?.id
  )

  const renderCategory = (category: Category, isSubcategory = false) => {
    const IconComponent = getCategoryIcon(category.icon)
    const subcategories = getSubcategories(category.id)
    const hasSubcategories = subcategories.length > 0
    const isExpanded = expandedCategories.has(category.id)

    return (
      <div key={category.id}>
        <div className={`flex items-center justify-between p-3 border rounded-lg ${isSubcategory ? 'ml-6 border-l-4' : ''}`}
          style={isSubcategory ? { borderLeftColor: category.color } : {}}>
          <div className="flex items-center gap-3">
            {!isSubcategory && hasSubcategories && (
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-6 w-6"
                onClick={() => toggleExpanded(category.id)}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
            {!isSubcategory && !hasSubcategories && <div className="w-6" />}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: category.color + '20', color: category.color }}
            >
              <IconComponent className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{category.name}</span>
              {hasSubcategories && (
                <span className="text-xs text-muted-foreground">
                  {subcategories.length} subcategoria(s)
                </span>
              )}
            </div>
            {category.is_default && (
              <Badge variant="secondary" className="text-xs">Padrão</Badge>
            )}
          </div>
          <div className="flex gap-1">
            {!isSubcategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddSubcategory(category)}
                title="Adicionar subcategoria"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(category)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            {!category.is_default && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Render subcategories */}
        {!isSubcategory && isExpanded && subcategories.map(sub => renderCategory(sub, true))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Categorias</h2>
          <p className="text-muted-foreground">Organize suas receitas e despesas por categorias e subcategorias</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingCategory(null)
              setFormData({ name: '', type: 'expense', icon: 'Folder', color: '#6B7280', parent_id: null })
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Editar Categoria' : formData.parent_id ? 'Nova Subcategoria' : 'Nova Categoria'}
              </DialogTitle>
              <DialogDescription>
                {editingCategory 
                  ? 'Edite os dados da categoria selecionada'
                  : formData.parent_id 
                    ? 'Crie uma subcategoria para organizar melhor suas transações'
                    : 'Crie uma nova categoria para organizar suas transações'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome da categoria"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: 'income' | 'expense') => setFormData({ ...formData, type: value, parent_id: null })}
                  disabled={!!formData.parent_id}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Receita</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="parent">Categoria Pai (opcional)</Label>
                <Select 
                  value={formData.parent_id || 'none'} 
                  onValueChange={(value) => setFormData({ ...formData, parent_id: value === 'none' ? null : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Nenhuma (categoria principal)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma (categoria principal)</SelectItem>
                    {availableParentCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Selecione uma categoria pai para criar uma subcategoria
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label>Ícone</Label>
                <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-background">
                  {iconOptions.map((icon) => {
                    const IconComponent = getCategoryIcon(icon)
                    return (
                      <Button
                        key={icon}
                        variant={formData.icon === icon ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData({ ...formData, icon })}
                        className="aspect-square p-2 h-10 w-10 border hover:border-primary transition-colors"
                      >
                        <IconComponent className="h-4 w-4" />
                      </Button>
                    )
                  })}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Cor</Label>
                <div className="grid grid-cols-6 gap-2">
                  {colorOptions.map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, color })}
                      className="aspect-square p-0 border-2"
                      style={{ 
                        backgroundColor: formData.color === color ? color : 'transparent',
                        borderColor: formData.color === color ? color : '#e2e8f0'
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: color }}
                      />
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingCategory ? 'Atualizar' : 'Criar'} {formData.parent_id ? 'Subcategoria' : 'Categoria'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Income Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-600">Categorias de Receita</CardTitle>
            <CardDescription>{incomeCategories.length} categoria(s) principal(is)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incomeCategories.map((category) => renderCategory(category))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600">Categorias de Despesa</CardTitle>
            <CardDescription>{expenseCategories.length} categoria(s) principal(is)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenseCategories.map((category) => renderCategory(category))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}