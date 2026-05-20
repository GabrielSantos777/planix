import { useState } from 'react'
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
import { formatCurrency } from '@/utils/formatters'
import {
  Plus, Target, Calendar, TrendingUp, Edit, Trash2, Wallet,
  Car, Home, Plane, GraduationCap, Shield, PiggyBank, Star,
  CheckCircle2, Clock, AlertTriangle, ChevronDown, Sparkles,
  ArrowRight, Trophy, Zap
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Layout from '@/components/Layout'
import { CurrencyInput } from '@/components/ui/currency-input'
import { differenceInDays, differenceInMonths, parseISO } from 'date-fns'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const GOAL_CATEGORIES = [
  { value: 'emergency', label: 'Reserva de Emergência', Icon: Shield, color: '#f59e0b', bg: 'bg-amber-50 dark:bg-amber-950' },
  { value: 'travel', label: 'Viagem', Icon: Plane, color: '#06b6d4', bg: 'bg-cyan-50 dark:bg-cyan-950' },
  { value: 'car', label: 'Veículo', Icon: Car, color: '#8b5cf6', bg: 'bg-violet-50 dark:bg-violet-950' },
  { value: 'home', label: 'Imóvel', Icon: Home, color: '#10b981', bg: 'bg-emerald-50 dark:bg-emerald-950' },
  { value: 'education', label: 'Educação', Icon: GraduationCap, color: '#f43f5e', bg: 'bg-rose-50 dark:bg-rose-950' },
  { value: 'retirement', label: 'Aposentadoria', Icon: PiggyBank, color: '#64748b', bg: 'bg-slate-50 dark:bg-slate-950' },
  { value: 'other', label: 'Outro', Icon: Star, color: '#6366f1', bg: 'bg-indigo-50 dark:bg-indigo-950' },
]

function getCategoryFromDescription(description: string | null): string {
  if (!description) return 'other'
  const match = description.match(/^\[([a-z]+)\]/)
  return match ? match[1] : 'other'
}

function getDescriptionWithoutCategory(description: string | null): string {
  if (!description) return ''
  return description.replace(/^\[[a-z]+\]\s*/, '')
}

function buildDescription(category: string, description: string): string {
  return `[${category}] ${description}`.trim()
}

function getCategoryConfig(value: string) {
  return GOAL_CATEGORIES.find(c => c.value === value) ?? GOAL_CATEGORIES[GOAL_CATEGORIES.length - 1]
}

const STATUS_FILTER = ['all', 'active', 'paused', 'completed'] as const
type StatusFilter = typeof STATUS_FILTER[number]

const GoalsImproved = () => {
  const { goals, accounts, addGoal, updateGoal, deleteGoal } = useSupabaseData()
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [contributingGoal, setContributingGoal] = useState<Goal | null>(null)
  const [contributionAmount, setContributionAmount] = useState(0)
  const [selectedAccountId, setSelectedAccountId] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'other',
    target_amount: 0,
    current_amount: 0,
    target_date: '',
    currency: 'BRL',
    status: 'active' as 'active' | 'completed' | 'paused',
  })

  const resetForm = () => {
    setNewGoal({
      title: '',
      description: '',
      category: 'other',
      target_amount: 0,
      current_amount: 0,
      target_date: '',
      currency: 'BRL',
      status: 'active',
    })
    setEditingGoal(null)
  }

  const handleAddGoal = async () => {
    if (!newGoal.title || newGoal.target_amount <= 0) {
      toast({ title: 'Erro', description: 'Preencha o título e o valor da meta.', variant: 'destructive' })
      return
    }
    try {
      const descWithCategory = buildDescription(newGoal.category, newGoal.description)
      if (editingGoal) {
        await updateGoal(editingGoal.id, {
          title: newGoal.title,
          description: descWithCategory,
          target_amount: newGoal.target_amount,
          current_amount: newGoal.current_amount,
          target_date: newGoal.target_date || null,
          currency: newGoal.currency,
          status: newGoal.status,
        })
        toast({ title: 'Meta atualizada!', description: 'Sua meta foi atualizada com sucesso.' })
      } else {
        await addGoal({
          title: newGoal.title,
          description: descWithCategory,
          target_amount: newGoal.target_amount,
          current_amount: newGoal.current_amount,
          target_date: newGoal.target_date || null,
          currency: newGoal.currency,
          status: newGoal.status,
        })
        toast({ title: 'Meta criada!', description: 'Sua nova meta foi criada com sucesso.' })
      }
      setIsAddDialogOpen(false)
      resetForm()
    } catch {
      toast({ title: 'Erro', description: 'Erro ao salvar meta. Tente novamente.', variant: 'destructive' })
    }
  }

  const handleContributeToGoal = async () => {
    if (!contributingGoal || contributionAmount <= 0) {
      toast({ title: 'Erro', description: 'Informe um valor válido para contribuir.', variant: 'destructive' })
      return
    }
    try {
      const newCurrent = Math.min(
        contributingGoal.current_amount + contributionAmount,
        contributingGoal.target_amount
      )
      const isCompleted = newCurrent >= contributingGoal.target_amount
      await updateGoal(contributingGoal.id, {
        ...contributingGoal,
        current_amount: newCurrent,
        status: isCompleted ? 'completed' : contributingGoal.status,
      })
      toast({
        title: isCompleted ? '🎉 Meta concluída!' : 'Contribuição realizada!',
        description: `${formatCurrency(contributionAmount)} adicionado à meta.`,
      })
      setIsContributeDialogOpen(false)
      setContributingGoal(null)
      setContributionAmount(0)
      setSelectedAccountId('')
    } catch {
      toast({ title: 'Erro', description: 'Erro ao contribuir para a meta.', variant: 'destructive' })
    }
  }

  const handleEditGoal = (goal: Goal) => {
    const category = getCategoryFromDescription(goal.description)
    const description = getDescriptionWithoutCategory(goal.description)
    setEditingGoal(goal)
    setNewGoal({
      title: goal.title,
      description,
      category,
      target_amount: goal.target_amount,
      current_amount: goal.current_amount,
      target_date: goal.target_date || '',
      currency: goal.currency ?? 'BRL',
      status: goal.status ?? 'active',
    })
    setIsAddDialogOpen(true)
  }

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoal(id)
      toast({ title: 'Meta excluída', description: 'A meta foi excluída com sucesso.' })
    } catch {
      toast({ title: 'Erro', description: 'Erro ao excluir meta.', variant: 'destructive' })
    }
  }

  const getProgress = (current: number, target: number) => Math.min((current / target) * 100, 100)

  const getDaysInfo = (targetDate: string | null) => {
    if (!targetDate) return null
    const days = differenceInDays(parseISO(targetDate), new Date())
    return days
  }

  const getMonthlyNeeded = (goal: Goal) => {
    if (!goal.target_date) return null
    const remaining = goal.target_amount - goal.current_amount
    if (remaining <= 0) return 0
    const months = differenceInMonths(parseISO(goal.target_date), new Date())
    if (months <= 0) return remaining
    return remaining / months
  }

  const getDaysBadge = (days: number | null) => {
    if (days === null) return null
    if (days < 0) return { label: 'Atrasada', color: 'bg-destructive text-destructive-foreground' }
    if (days < 30) return { label: `${days}d restantes`, color: 'bg-destructive/20 text-destructive' }
    if (days < 90) return { label: `${days}d restantes`, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' }
    return { label: `${days}d restantes`, color: 'bg-muted text-muted-foreground' }
  }

  const filteredGoals = goals.filter(g => {
    if (statusFilter === 'all') return true
    return g.status === statusFilter
  })

  // Summary stats
  const activeGoals = goals.filter(g => g.status === 'active')
  const completedGoals = goals.filter(g => g.status === 'completed')
  const totalSaved = goals.reduce((s, g) => s + (g.current_amount ?? 0), 0)
  const totalTarget = goals.reduce((s, g) => s + g.target_amount, 0)
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0

  const FILTER_LABELS: Record<StatusFilter, string> = {
    all: `Todas (${goals.length})`,
    active: `Ativas (${activeGoals.length})`,
    paused: `Pausadas (${goals.filter(g => g.status === 'paused').length})`,
    completed: `Concluídas (${completedGoals.length})`,
  }

  return (
    <Layout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <Target className="h-7 w-7 text-primary" />
              Metas Financeiras
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Planeje, acompanhe e conquiste seus objetivos financeiros
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={(open) => { setIsAddDialogOpen(open); if (!open) resetForm() }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Meta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingGoal ? 'Editar Meta' : 'Nova Meta Financeira'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                {/* Category selector */}
                <div className="space-y-2">
                  <Label>Tipo de Meta</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {GOAL_CATEGORIES.map(({ value, label, Icon, color }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setNewGoal(g => ({ ...g, category: value }))}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all text-xs font-medium ${
                          newGoal.category === value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/40'
                        }`}
                      >
                        <Icon className="h-5 w-5" style={{ color }} />
                        <span className="text-center leading-tight">{label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Viagem para Europa"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(g => ({ ...g, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva sua meta..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(g => ({ ...g, description: e.target.value }))}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Valor da Meta *</Label>
                    <CurrencyInput
                      value={newGoal.target_amount}
                      onChange={(value) => setNewGoal(g => ({ ...g, target_amount: value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Já tenho</Label>
                    <CurrencyInput
                      value={newGoal.current_amount}
                      onChange={(value) => setNewGoal(g => ({ ...g, current_amount: value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target_date">Data Limite</Label>
                    <Input
                      id="target_date"
                      type="date"
                      value={newGoal.target_date}
                      onChange={(e) => setNewGoal(g => ({ ...g, target_date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={newGoal.status} onValueChange={(v: any) => setNewGoal(g => ({ ...g, status: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativa</SelectItem>
                        <SelectItem value="paused">Pausada</SelectItem>
                        <SelectItem value="completed">Concluída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preview monthly savings needed */}
                {newGoal.target_date && newGoal.target_amount > 0 && (() => {
                  const remaining = newGoal.target_amount - newGoal.current_amount
                  const months = differenceInMonths(parseISO(newGoal.target_date), new Date())
                  if (remaining > 0 && months > 0) {
                    return (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm">
                        <Zap className="h-4 w-4 text-primary shrink-0" />
                        <span>
                          Poupe <strong>{formatCurrency(remaining / months)}</strong>/mês para atingir sua meta
                        </span>
                      </div>
                    )
                  }
                  return null
                })()}

                <Button onClick={handleAddGoal} className="w-full">
                  {editingGoal ? 'Atualizar Meta' : 'Criar Meta'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Stats */}
        {goals.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Metas Ativas</p>
                    <p className="text-2xl font-bold">{activeGoals.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                    <Trophy className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Concluídas</p>
                    <p className="text-2xl font-bold">{completedGoals.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Poupado</p>
                    <p className="text-lg font-bold">{formatCurrency(totalSaved)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Progresso Geral</p>
                    <p className="text-xs font-bold">{overallProgress.toFixed(0)}%</p>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(totalSaved)} / {formatCurrency(totalTarget)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filter Tabs */}
        {goals.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTER.map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  statusFilter === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:border-primary/40 text-muted-foreground'
                }`}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
        )}

        {/* Goals Grid */}
        {filteredGoals.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="p-4 bg-muted rounded-full">
                <Target className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {goals.length === 0 ? 'Nenhuma meta criada' : 'Nenhuma meta neste filtro'}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                  {goals.length === 0
                    ? 'Crie sua primeira meta financeira e dê o primeiro passo para realizá-la.'
                    : 'Tente outro filtro ou crie uma nova meta.'}
                </p>
              </div>
              {goals.length === 0 && (
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Criar primeira meta
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredGoals.map((goal) => {
              const progress = getProgress(goal.current_amount ?? 0, goal.target_amount)
              const isCompleted = goal.status === 'completed' || progress >= 100
              const category = getCategoryFromDescription(goal.description)
              const descText = getDescriptionWithoutCategory(goal.description)
              const catConfig = getCategoryConfig(category)
              const daysLeft = getDaysInfo(goal.target_date)
              const daysBadge = getDaysBadge(daysLeft)
              const monthlyNeeded = getMonthlyNeeded(goal)
              const remaining = goal.target_amount - (goal.current_amount ?? 0)

              return (
                <Card
                  key={goal.id}
                  className={`relative overflow-hidden transition-all hover:shadow-lg group ${
                    isCompleted ? 'border-emerald-300 dark:border-emerald-700' : ''
                  } ${goal.status === 'paused' ? 'opacity-75' : ''}`}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: catConfig.color }}
                  />

                  <CardHeader className="pb-3 pt-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="p-2 rounded-xl shrink-0"
                          style={{ backgroundColor: catConfig.color + '20' }}
                        >
                          <catConfig.Icon className="h-5 w-5" style={{ color: catConfig.color }} />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-base leading-tight truncate">{goal.title}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">{catConfig.label}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!isCompleted && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => { setContributingGoal(goal); setIsContributeDialogOpen(true) }}
                            title="Contribuir"
                          >
                            <Wallet className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditGoal(goal)}>
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir meta?</AlertDialogTitle>
                              <AlertDialogDescription>
                                A meta "{goal.title}" será excluída permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteGoal(goal.id)} className="bg-destructive hover:bg-destructive/90">
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>

                    {descText && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{descText}</p>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-lg" style={{ color: catConfig.color }}>
                          {progress.toFixed(0)}%
                        </span>
                        {isCompleted ? (
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Concluída
                          </Badge>
                        ) : goal.status === 'paused' ? (
                          <Badge variant="secondary" className="gap-1">
                            <Clock className="h-3 w-3" />
                            Pausada
                          </Badge>
                        ) : null}
                      </div>
                      <div className="relative h-2.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${progress}%`,
                            background: isCompleted
                              ? 'linear-gradient(90deg, #10b981, #34d399)'
                              : `linear-gradient(90deg, ${catConfig.color}99, ${catConfig.color})`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(goal.current_amount ?? 0, goal.currency ?? 'BRL')}</span>
                        <span>{formatCurrency(goal.target_amount, goal.currency ?? 'BRL')}</span>
                      </div>
                    </div>

                    {/* Info row */}
                    <div className="grid grid-cols-2 gap-3">
                      {!isCompleted && remaining > 0 && (
                        <div className="p-2.5 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Faltam</p>
                          <p className="text-sm font-semibold mt-0.5">
                            {formatCurrency(remaining, goal.currency ?? 'BRL')}
                          </p>
                        </div>
                      )}

                      {goal.target_date && daysBadge && (
                        <div className={`p-2.5 rounded-lg ${daysBadge.color.includes('destructive') ? 'bg-destructive/10' : 'bg-muted/50'}`}>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> Prazo
                          </p>
                          <p className={`text-sm font-semibold mt-0.5 ${daysLeft !== null && daysLeft < 30 ? 'text-destructive' : ''}`}>
                            {daysLeft !== null && daysLeft < 0 ? 'Expirada' : daysBadge.label}
                          </p>
                        </div>
                      )}

                      {monthlyNeeded !== null && monthlyNeeded > 0 && !isCompleted && (
                        <div className="p-2.5 rounded-lg bg-primary/5 col-span-2">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-primary" /> Poupe por mês
                          </p>
                          <p className="text-sm font-semibold text-primary mt-0.5">
                            {formatCurrency(monthlyNeeded, goal.currency ?? 'BRL')}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Contribute CTA for active goals */}
                    {goal.status === 'active' && !isCompleted && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 border-dashed"
                        onClick={() => { setContributingGoal(goal); setIsContributeDialogOpen(true) }}
                      >
                        <Wallet className="h-4 w-4" />
                        Contribuir
                        <ArrowRight className="h-3 w-3 ml-auto" />
                      </Button>
                    )}

                    {isCompleted && (
                      <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                        <Trophy className="h-4 w-4" />
                        Meta conquistada!
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Contribute Dialog */}
        <Dialog open={isContributeDialogOpen} onOpenChange={setIsContributeDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Contribuir para Meta
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {contributingGoal && (() => {
                const catConfig = getCategoryConfig(getCategoryFromDescription(contributingGoal.description))
                const progress = getProgress(contributingGoal.current_amount ?? 0, contributingGoal.target_amount)
                return (
                  <div className="p-4 rounded-xl border" style={{ borderColor: catConfig.color + '40', backgroundColor: catConfig.color + '10' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <catConfig.Icon className="h-5 w-5" style={{ color: catConfig.color }} />
                      <div>
                        <h4 className="font-semibold">{contributingGoal.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(contributingGoal.current_amount ?? 0)} de {formatCurrency(contributingGoal.target_amount)}
                        </p>
                      </div>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                )
              })()}

              <div className="space-y-2">
                <Label>Valor da Contribuição</Label>
                <CurrencyInput value={contributionAmount} onChange={setContributionAmount} />
              </div>

              {contributingGoal && contributionAmount > 0 && (
                <div className="p-3 rounded-lg bg-muted/50 text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    Após esta contribuição: <strong>
                      {formatCurrency(Math.min((contributingGoal.current_amount ?? 0) + contributionAmount, contributingGoal.target_amount))}
                    </strong>{' '}
                    ({Math.min(getProgress((contributingGoal.current_amount ?? 0) + contributionAmount, contributingGoal.target_amount), 100).toFixed(0)}%)
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <Label>Conta de Origem <span className="text-muted-foreground text-xs">(opcional)</span></Label>
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
                <Button variant="outline" onClick={() => setIsContributeDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleContributeToGoal} className="flex-1 gap-2">
                  <Wallet className="h-4 w-4" />
                  Confirmar
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
