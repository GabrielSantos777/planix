import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useSupabaseData, Goal } from '@/hooks/useSupabaseData'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { Plus, Target, Calendar, TrendingUp, Edit, Trash2, Wallet } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Layout from '@/components/Layout'
import { CurrencyInput } from '@/components/ui/currency-input-fixed'

const GoalsImproved = () => {
  const { goals, accounts, addGoal, updateGoal, deleteGoal } = useSupabaseData()
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [contributingGoal, setContributingGoal] = useState<Goal | null>(null)
  const [contributionAmount, setContributionAmount] = useState(0)
  const [selectedAccountId, setSelectedAccountId] = useState('')
  
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target_amount: 0,
    current_amount: 0,
    target_date: '',
    currency: 'BRL',
    status: 'active' as 'active' | 'completed' | 'paused'
  })

  const handleAddGoal = async () => {
    if (!newGoal.title || newGoal.target_amount <= 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      if (editingGoal) {
        await updateGoal(editingGoal.id, newGoal)
        toast({
          title: "Meta atualizada!",
          description: "Sua meta foi atualizada com sucesso.",
        })
      } else {
        await addGoal(newGoal)
        toast({
          title: "Meta criada!",
          description: "Sua nova meta foi criada com sucesso.",
        })
      }
      setIsAddDialogOpen(false)
      setEditingGoal(null)
      setNewGoal({
        title: '',
        description: '',
        target_amount: 0,
        current_amount: 0,
        target_date: '',
        currency: 'BRL',
        status: 'active'
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar meta. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleContributeToGoal = async () => {
    if (!contributingGoal || contributionAmount <= 0 || !selectedAccountId) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos para contribuir",
        variant: "destructive",
      })
      return
    }

    try {
      const newCurrentAmount = contributingGoal.current_amount + contributionAmount
      await updateGoal(contributingGoal.id, {
        ...contributingGoal,
        current_amount: Math.min(newCurrentAmount, contributingGoal.target_amount),
        status: newCurrentAmount >= contributingGoal.target_amount ? 'completed' : contributingGoal.status
      })

      toast({
        title: "Contribuição realizada!",
        description: `${formatCurrency(contributionAmount)} foi adicionado à meta.`,
      })
      
      setIsContributeDialogOpen(false)
      setContributingGoal(null)
      setContributionAmount(0)
      setSelectedAccountId('')
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao contribuir para a meta. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
    setNewGoal({
      title: goal.title,
      description: goal.description || '',
      target_amount: goal.target_amount,
      current_amount: goal.current_amount,
      target_date: goal.target_date || '',
      currency: goal.currency,
      status: goal.status
    })
    setIsAddDialogOpen(true)
  }

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoal(id)
      toast({
        title: "Meta excluída",
        description: "A meta foi excluída com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir meta. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground'
      case 'paused':
        return 'bg-warning text-warning-foreground'
      default:
        return 'bg-primary text-primary-foreground'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída'
      case 'paused':
        return 'Pausada'
      default:
        return 'Ativa'
    }
  }

  // Meta principal (primeira ativa ou com maior progresso)
  const primaryGoal = goals.find(goal => goal.status === 'active') || goals[0]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Metas Financeiras</h1>
            <p className="text-muted-foreground">
              Defina e acompanhe suas metas financeiras
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingGoal(null)
                setNewGoal({
                  title: '',
                  description: '',
                  target_amount: 0,
                  current_amount: 0,
                  target_date: '',
                  currency: 'BRL',
                  status: 'active'
                })
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Meta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingGoal ? 'Editar Meta' : 'Nova Meta Financeira'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Meta *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Comprar um carro"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva sua meta..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor da Meta *</Label>
                    <CurrencyInput
                      value={newGoal.target_amount}
                      onChange={(value) => setNewGoal({ ...newGoal, target_amount: value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select value={newGoal.currency} onValueChange={(value) => setNewGoal({ ...newGoal, currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real (BRL)</SelectItem>
                        <SelectItem value="USD">Dólar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target_date">Data Limite</Label>
                    <Input
                      id="target_date"
                      type="date"
                      value={newGoal.target_date}
                      onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newGoal.status} onValueChange={(value: any) => setNewGoal({ ...newGoal, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativa</SelectItem>
                        <SelectItem value="paused">Pausada</SelectItem>
                        <SelectItem value="completed">Concluída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={handleAddGoal} className="w-full">
                  {editingGoal ? 'Atualizar Meta' : 'Criar Meta'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Meta Principal (para Dashboard) */}
        {primaryGoal && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Meta Principal: {primaryGoal.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span className="font-medium">{getProgress(primaryGoal.current_amount, primaryGoal.target_amount).toFixed(1)}%</span>
                </div>
                <Progress value={getProgress(primaryGoal.current_amount, primaryGoal.target_amount)} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatCurrency(primaryGoal.current_amount, primaryGoal.currency)}</span>
                  <span>{formatCurrency(primaryGoal.target_amount, primaryGoal.currency)}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setContributingGoal(primaryGoal)
                    setIsContributeDialogOpen(true)
                  }}
                  className="flex-1"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Contribuir
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleEditGoal(primaryGoal)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals Grid */}
        {goals.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma meta criada</h3>
              <p className="text-muted-foreground text-center mb-4">
                Crie sua primeira meta financeira e comece a planejar seu futuro.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Meta
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const progress = getProgress(goal.current_amount, goal.target_amount)
              const isCompleted = goal.status === 'completed' || progress >= 100
              
              return (
                <Card key={goal.id} className={`transition-all hover:shadow-md ${isCompleted ? 'border-success' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{goal.title}</CardTitle>
                        <Badge className={getStatusColor(goal.status)}>
                          {getStatusText(goal.status)}
                        </Badge>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setContributingGoal(goal)
                            setIsContributeDialogOpen(true)
                          }}
                        >
                          <Wallet className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditGoal(goal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {goal.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {goal.description}
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatCurrency(goal.current_amount, goal.currency)}</span>
                        <span>{formatCurrency(goal.target_amount, goal.currency)}</span>
                      </div>
                    </div>
                    
                    {goal.target_date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Meta para {formatDate(goal.target_date)}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>
                        Faltam {formatCurrency(goal.target_amount - goal.current_amount, goal.currency)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Contribute to Goal Dialog */}
        <Dialog open={isContributeDialogOpen} onOpenChange={setIsContributeDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Contribuir para Meta</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {contributingGoal && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">{contributingGoal.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(contributingGoal.current_amount)} de {formatCurrency(contributingGoal.target_amount)}
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="contribution">Valor da Contribuição</Label>
                <CurrencyInput
                  value={contributionAmount}
                  onChange={setContributionAmount}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account">Conta de Origem</Label>
                <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma conta" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsContributeDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button onClick={handleContributeToGoal} className="flex-1">
                  Contribuir
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

export default GoalsImproved