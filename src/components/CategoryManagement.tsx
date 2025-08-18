import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useCategories } from '@/context/CategoriesContext'
import { Plus, Edit, Trash2 } from 'lucide-react'

const iconOptions = [
  'utensils', 'car', 'home', 'heart', 'book', 'gamepad-2', 'briefcase', 
  'laptop', 'trending-up', 'shopping-cart', 'coffee', 'fuel', 'plane',
  'music', 'gift', 'camera', 'dumbbell', 'stethoscope', 'graduation-cap'
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
}

export const CategoryManagement = () => {
  const { toast } = useToast()
  const { categories, addCategory, updateCategory, deleteCategory, getCategoryIcon } = useCategories()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any | null>(null)
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    type: 'expense',
    icon: 'folder',
    color: '#6B7280'
  })

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome da categoria é obrigatório",
        variant: "destructive"
      })
      return
    }

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData)
        toast({
          title: "Categoria atualizada!",
          description: `${formData.name} foi atualizada com sucesso.`
        })
      } else {
        await addCategory(formData)
        toast({
          title: "Categoria criada!",
          description: `${formData.name} foi criada com sucesso.`
        })
      }

      setFormData({ name: '', type: 'expense', icon: 'folder', color: '#6B7280' })
      setEditingCategory(null)
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar categoria. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color
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

  const incomeCategories = categories.filter(cat => cat.type === 'income')
  const expenseCategories = categories.filter(cat => cat.type === 'expense')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Categorias</h2>
          <p className="text-muted-foreground">Organize suas receitas e despesas por categorias</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingCategory(null)
              setFormData({ name: '', type: 'expense', icon: 'folder', color: '#6B7280' })
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </DialogTitle>
              <DialogDescription>
                {editingCategory 
                  ? 'Edite os dados da categoria selecionada'
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
                <Select value={formData.type} onValueChange={(value: 'income' | 'expense') => setFormData({ ...formData, type: value })}>
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
                <Label>Ícone</Label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((icon) => {
                    const IconComponent = getCategoryIcon(icon)
                    return (
                      <Button
                        key={icon}
                        variant={formData.icon === icon ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData({ ...formData, icon })}
                        className="aspect-square p-0"
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
              
              <Button onClick={handleSubmit} className="w-full">
                {editingCategory ? 'Atualizar' : 'Criar'} Categoria
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Income Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-600">Categorias de Receita</CardTitle>
            <CardDescription>{incomeCategories.length} categoria(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incomeCategories.map((category) => {
                const IconComponent = getCategoryIcon(category.icon)
                return (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: category.color + '20', color: category.color }}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                      {(category as any).is_default && (
                        <Badge variant="secondary" className="text-xs">Padrão</Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!(category as any).is_default && (
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
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600">Categorias de Despesa</CardTitle>
            <CardDescription>{expenseCategories.length} categoria(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenseCategories.map((category) => {
                const IconComponent = getCategoryIcon(category.icon)
                return (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: category.color + '20', color: category.color }}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                      {(category as any).is_default && (
                        <Badge variant="secondary" className="text-xs">Padrão</Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!(category as any).is_default && (
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
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}