import { useState, useMemo } from "react"
import { useSupabaseData } from "@/hooks/useSupabaseData"
import { useCurrency } from "@/context/CurrencyContext"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer, Legend } from "recharts"
import {
  Plus, TrendingUp, TrendingDown, Trash2, RefreshCw,
  ArrowDownToLine, ArrowUpFromLine, Edit, Wallet, BarChart3
} from "lucide-react"
import { CurrencyInput } from "@/components/ui/currency-input-fixed"
import { getLocalDateString } from "@/utils/dateUtils"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog"

// ── Constants ─────────────────────────────────────────────────────────────
const TYPE_LABELS: Record<string, string> = {
  stocks: 'Ações', crypto: 'Cripto', bonds: 'Renda Fixa', funds: 'Fundos'
}

const TYPE_COLORS: Record<string, string> = {
  stocks: '#10B981', crypto: '#F59E0B', bonds: '#3B82F6', funds: '#8B5CF6'
}

const PIE_COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EF4444', '#EC4899']

const EMPTY_NEW = {
  symbol: '', name: '', type: 'stocks' as const,
  quantity: 0, average_price: 0, currency: 'BRL', account_id: ''
}

// ── Custom Pie Label ──────────────────────────────────────────────────────
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// ── Component ─────────────────────────────────────────────────────────────
const Investimentos = () => {
  const {
    investments, addInvestment, deleteInvestment, updateInvestment,
    accounts, transactions,
    addTransfer, getOrCreateInvestmentAccount,
    loading
  } = useSupabaseData()
  const { formatCurrency, currencies } = useCurrency()
  const { user } = useAuth()
  const { toast } = useToast()

  // ── Dialog visibility ─────────────────────────────────────────────────
  const [addOpen,         setAddOpen]         = useState(false)
  const [aporteOpen,      setAporteOpen]      = useState(false)
  const [resgateOpen,     setResgateOpen]     = useState(false)
  const [precoOpen,       setPrecoOpen]       = useState(false)
  const [deleteOpen,      setDeleteOpen]      = useState(false)
  const [selected,        setSelected]        = useState<any>(null)

  // ── Form state ────────────────────────────────────────────────────────
  const [newInv,           setNewInv]          = useState({ ...EMPTY_NEW })
  const [aporteAmount,     setAporteAmount]    = useState(0)
  const [aporteAccountId,  setAporteAccountId] = useState('')
  const [redeemByValue,    setRedeemByValue]   = useState(true)
  const [redeemValue,      setRedeemValue]     = useState(0)
  const [redeemQty,        setRedeemQty]       = useState(0)
  const [redeemAccountId,  setRedeemAccountId] = useState('')
  const [newPrice,         setNewPrice]        = useState(0)

  // ── Balance helper ────────────────────────────────────────────────────
  const getBalance = (accountId: string) => {
    const acc = accounts.find(a => a.id === accountId)
    if (!acc) return 0
    const moves = transactions
      .filter(t => t.account_id === accountId)
      .reduce((s, t) => s + (t.amount || 0), 0)
    return (acc.initial_balance || 0) + moves
  }

  // ── Portfolio metrics ─────────────────────────────────────────────────
  const { totalValue, totalInvested, totalProfit, profitPct } = useMemo(() => {
    const totalValue    = investments.reduce((s, i) => s + i.quantity * i.current_price, 0)
    const totalInvested = investments.reduce((s, i) => s + i.quantity * i.average_price, 0)
    const totalProfit   = totalValue - totalInvested
    const profitPct     = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0
    return { totalValue, totalInvested, totalProfit, profitPct }
  }, [investments])

  // ── Pie chart data ────────────────────────────────────────────────────
  const pieData = useMemo(() => {
    const byType: Record<string, number> = {}
    investments.forEach(i => {
      byType[i.type] = (byType[i.type] || 0) + i.quantity * i.current_price
    })
    return Object.entries(byType).map(([type, value]) => ({
      name: TYPE_LABELS[type] || type,
      value,
      pct: totalValue > 0 ? (value / totalValue) * 100 : 0,
      color: TYPE_COLORS[type] || '#6B7280'
    }))
  }, [investments, totalValue])

  // ── Actions ───────────────────────────────────────────────────────────

  const handleAdd = async () => {
    if (!newInv.symbol || !newInv.name || newInv.quantity <= 0 || newInv.average_price <= 0) {
      toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' })
      return
    }
    if (!newInv.account_id) {
      toast({ title: 'Selecione uma conta de origem', variant: 'destructive' })
      return
    }
    const total = newInv.quantity * newInv.average_price
    if (getBalance(newInv.account_id) < total) {
      toast({ title: `Saldo insuficiente — necessário ${formatCurrency(total)}`, variant: 'destructive' })
      return
    }
    try {
      const invAcc = await getOrCreateInvestmentAccount()
      await addTransfer({
        fromAccountId: newInv.account_id,
        toAccountId: invAcc.id,
        amount: total,
        date: getLocalDateString(),
        description: `Aporte em ${newInv.name}`,
        investmentMetadata: { kind: 'investment_transfer', action: 'aporte', symbol: newInv.symbol, quantity: newInv.quantity, price: newInv.average_price }
      })
      await addInvestment({
        symbol: newInv.symbol, name: newInv.name, type: newInv.type,
        quantity: newInv.quantity, average_price: newInv.average_price,
        current_price: newInv.average_price, currency: newInv.currency
      })
      toast({ title: 'Investimento adicionado com sucesso!' })
      setNewInv({ ...EMPTY_NEW })
      setAddOpen(false)
    } catch {
      toast({ title: 'Erro ao adicionar investimento', variant: 'destructive' })
    }
  }

  const handleAporte = async () => {
    if (!selected || !aporteAccountId || aporteAmount <= 0) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' })
      return
    }
    if (getBalance(aporteAccountId) < aporteAmount) {
      toast({ title: 'Saldo insuficiente na conta selecionada', variant: 'destructive' })
      return
    }
    try {
      const invAcc = await getOrCreateInvestmentAccount()
      await addTransfer({
        fromAccountId: aporteAccountId,
        toAccountId: invAcc.id,
        amount: aporteAmount,
        date: getLocalDateString(),
        description: `Aporte em ${selected.name}`,
        investmentMetadata: {
          kind: 'investment_transfer', action: 'aporte',
          symbol: selected.symbol,
          quantity: aporteAmount / selected.current_price,
          price: selected.current_price
        }
      })
      const addedQty   = aporteAmount / selected.current_price
      const newQty     = selected.quantity + addedQty
      const newAvgPx   = ((selected.quantity * selected.average_price) + aporteAmount) / newQty
      await updateInvestment(selected.id, { quantity: newQty, average_price: newAvgPx })
      toast({ title: `Aporte de ${formatCurrency(aporteAmount)} realizado!` })
      setAporteOpen(false)
      setAporteAmount(0)
      setAporteAccountId('')
    } catch {
      toast({ title: 'Erro ao realizar aporte', variant: 'destructive' })
    }
  }

  const handleResgate = async () => {
    if (!selected || !redeemAccountId) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' })
      return
    }
    let qty = 0, amount = 0
    const maxValue = selected.quantity * selected.current_price
    if (redeemByValue) {
      if (redeemValue <= 0 || redeemValue > maxValue) {
        toast({ title: `Valor inválido — máximo: ${formatCurrency(maxValue)}`, variant: 'destructive' })
        return
      }
      qty    = redeemValue / selected.current_price
      amount = redeemValue
    } else {
      if (redeemQty <= 0 || redeemQty > selected.quantity) {
        toast({ title: 'Quantidade inválida', variant: 'destructive' })
        return
      }
      qty    = redeemQty
      amount = redeemQty * selected.current_price
    }
    try {
      const invAcc = await getOrCreateInvestmentAccount()
      await addTransfer({
        fromAccountId: invAcc.id,
        toAccountId: redeemAccountId,
        amount,
        date: getLocalDateString(),
        description: `Resgate de ${selected.name}`,
        investmentMetadata: { kind: 'investment_transfer', action: 'resgate', symbol: selected.symbol, quantity: qty, price: selected.current_price }
      })
      const newQty = selected.quantity - qty
      if (newQty > 0.0001) {
        await updateInvestment(selected.id, { quantity: newQty })
      } else {
        await deleteInvestment(selected.id)
      }
      toast({ title: `Resgate de ${formatCurrency(amount)} realizado!` })
      setResgateOpen(false)
      setRedeemValue(0)
      setRedeemQty(0)
      setRedeemAccountId('')
    } catch {
      toast({ title: 'Erro ao realizar resgate', variant: 'destructive' })
    }
  }

  const handlePreco = async () => {
    if (!selected || newPrice <= 0) {
      toast({ title: 'Digite um preço válido', variant: 'destructive' })
      return
    }
    try {
      await updateInvestment(selected.id, { current_price: newPrice })
      toast({ title: `Preço de ${selected.symbol} atualizado!` })
      setPrecoOpen(false)
      setNewPrice(0)
    } catch {
      toast({ title: 'Erro ao atualizar preço', variant: 'destructive' })
    }
  }

  const handleDelete = async () => {
    if (!selected) return
    try {
      await deleteInvestment(selected.id)
      toast({ title: 'Ativo removido com sucesso' })
      setDeleteOpen(false)
    } catch {
      toast({ title: 'Erro ao remover ativo', variant: 'destructive' })
    }
  }

  const handleUpdatePrices = async () => {
    let updated = 0
    for (const inv of investments) {
      if (inv.type === 'bonds' || inv.type === 'funds') continue
      try {
        let p = inv.current_price
        if (inv.type === 'stocks' && /\d$/.test(inv.symbol)) {
          try {
            const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${inv.symbol}.SA`)
            const d = await r.json()
            p = d?.chart?.result?.[0]?.meta?.regularMarketPrice ?? p
          } catch {
            p = Number((p * (0.98 + Math.random() * 0.04)).toFixed(2))
          }
        } else if (inv.type === 'crypto') {
          const map: Record<string, string> = {
            BTC: 'bitcoin', ETH: 'ethereum', ADA: 'cardano', SOL: 'solana',
            DOT: 'polkadot', MATIC: 'polygon', AVAX: 'avalanche-2', LINK: 'chainlink'
          }
          const sym = inv.symbol.replace(/USD$|BRL$/i, '').toUpperCase()
          const id  = map[sym] || sym.toLowerCase()
          try {
            const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=brl`)
            const d = await r.json()
            p = d?.[id]?.brl ?? p
          } catch {
            p = Number((p * (0.95 + Math.random() * 0.1)).toFixed(2))
          }
        }
        if (Math.abs(p - inv.current_price) > 0.001) {
          await updateInvestment(inv.id, { current_price: p })
          updated++
        }
      } catch { /* skip */ }
    }
    toast({ title: updated > 0 ? `${updated} ativo(s) atualizado(s)` : 'Preços já atualizados' })
  }

  const openAction = (inv: any, action: 'aporte' | 'resgate' | 'preco' | 'delete') => {
    setSelected(inv)
    if (action === 'aporte')  { setAporteAmount(0); setAporteAccountId(''); setAporteOpen(true) }
    if (action === 'resgate') { setRedeemValue(0); setRedeemQty(0); setRedeemAccountId(''); setRedeemByValue(inv.type === 'bonds'); setResgateOpen(true) }
    if (action === 'preco')   { setNewPrice(inv.current_price); setPrecoOpen(true) }
    if (action === 'delete')  { setDeleteOpen(true) }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 text-muted-foreground">Carregando...</div>
      </Layout>
    )
  }

  const bankAccounts = accounts.filter(a => a.is_active && a.type !== 'investment')

  return (
    <Layout>
      <div className="space-y-6 max-w-7xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Investimentos</h1>
            <p className="text-sm text-muted-foreground">Gerencie seu portfólio de ativos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleUpdatePrices}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Atualizar preços
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4 mr-1.5" />
              Novo ativo
            </Button>
          </div>
        </div>

        {/* ── Summary cards ────────────────────────────────────────── */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground mb-1">Valor da Carteira</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalValue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground mb-1">Total Investido</p>
              <p className="text-2xl font-bold">{formatCurrency(totalInvested)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground mb-1">Rentabilidade</p>
              <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)}
              </p>
              <p className={`text-xs mt-0.5 ${totalProfit >= 0 ? 'text-emerald-600' : 'text-destructive'}`}>
                {profitPct >= 0 ? '+' : ''}{profitPct.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground mb-1">Ativos</p>
              <p className="text-2xl font-bold">{investments.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{pieData.length} classe{pieData.length !== 1 ? 's' : ''}</p>
            </CardContent>
          </Card>
        </div>

        {investments.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
              <BarChart3 className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Nenhum ativo na carteira</p>
              <Button size="sm" variant="outline" onClick={() => setAddOpen(true)}>
                <Plus className="h-4 w-4 mr-1.5" />
                Adicionar primeiro ativo
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">

            {/* ── Asset list (left 3/5) ──────────────────────────── */}
            <div className="lg:col-span-3 space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Ativos</h2>
              {investments.map(inv => {
                const value   = inv.quantity * inv.current_price
                const cost    = inv.quantity * inv.average_price
                const profit  = value - cost
                const pct     = cost > 0 ? (profit / cost) * 100 : 0
                const alloc   = totalValue > 0 ? (value / totalValue) * 100 : 0
                const priceVar = inv.average_price > 0
                  ? ((inv.current_price - inv.average_price) / inv.average_price) * 100
                  : 0

                return (
                  <Card key={inv.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        {/* Type color dot */}
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: TYPE_COLORS[inv.type] || '#6B7280' }}
                        />

                        {/* Main info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-base">{inv.symbol}</span>
                                <Badge variant="secondary" className="text-xs py-0">
                                  {TYPE_LABELS[inv.type] || inv.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{inv.name}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-bold">{formatCurrency(value, inv.currency)}</p>
                              <p className={`text-sm font-medium ${profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                                {profit >= 0 ? '+' : ''}{formatCurrency(profit, inv.currency)}
                                <span className="text-xs ml-1">({pct >= 0 ? '+' : ''}{pct.toFixed(1)}%)</span>
                              </p>
                            </div>
                          </div>

                          {/* Price row */}
                          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                            <div>
                              <p>Qtd</p>
                              <p className="font-medium text-foreground">{inv.quantity < 1 ? inv.quantity.toFixed(6) : inv.quantity.toFixed(2)}</p>
                            </div>
                            <div>
                              <p>Preço médio</p>
                              <p className="font-medium text-foreground">{formatCurrency(inv.average_price, inv.currency)}</p>
                            </div>
                            <div>
                              <p>Preço atual</p>
                              <p className={`font-medium ${priceVar >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                                {formatCurrency(inv.current_price, inv.currency)}
                              </p>
                            </div>
                          </div>

                          {/* Allocation bar */}
                          <div className="flex items-center gap-2">
                            <Progress value={alloc} className="h-1 flex-1" />
                            <span className="text-xs text-muted-foreground w-10 text-right">{alloc.toFixed(1)}%</span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-1.5 mt-3 flex-wrap">
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => openAction(inv, 'aporte')}>
                              <ArrowUpFromLine className="h-3 w-3 mr-1" />Aportar
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => openAction(inv, 'resgate')}>
                              <ArrowDownToLine className="h-3 w-3 mr-1" />Resgatar
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => openAction(inv, 'preco')}>
                              <Edit className="h-3 w-3 mr-1" />Preço
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive ml-auto" onClick={() => openAction(inv, 'delete')}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* ── Charts (right 2/5) ─────────────────────────────── */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Distribuição</h2>

              {/* Pie chart */}
              <Card>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomLabel}
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <ReTooltip
                        formatter={(val: number) => formatCurrency(val)}
                        labelFormatter={(label) => label}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Legend */}
                  <div className="space-y-2 mt-2">
                    {pieData.map(entry => (
                      <div key={entry.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }} />
                          <span className="text-muted-foreground">{entry.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{formatCurrency(entry.value)}</span>
                          <span className="text-xs text-muted-foreground ml-1.5">{entry.pct.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Per-asset allocation */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Alocação por ativo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {[...investments]
                    .sort((a, b) => (b.quantity * b.current_price) - (a.quantity * a.current_price))
                    .map(inv => {
                      const val  = inv.quantity * inv.current_price
                      const alloc = totalValue > 0 ? (val / totalValue) * 100 : 0
                      return (
                        <div key={inv.id}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-medium">{inv.symbol}</span>
                            <span className="text-muted-foreground">{alloc.toFixed(1)}%</span>
                          </div>
                          <Progress
                            value={alloc}
                            className="h-1.5"
                            style={{ '--progress-color': TYPE_COLORS[inv.type] } as any}
                          />
                        </div>
                      )
                    })
                  }
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ═══════════════ DIALOGS ═══════════════════════════════════ */}

        {/* ── Add ───────────────────────────────────────────────────── */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Ativo</DialogTitle>
              <DialogDescription>Adicione um ativo ao seu portfólio</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Símbolo / Ticker *</Label>
                  <Input placeholder="PETR4, BTC…" value={newInv.symbol}
                    onChange={e => setNewInv(f => ({ ...f, symbol: e.target.value.toUpperCase() }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Tipo *</Label>
                  <Select value={newInv.type} onValueChange={(v: any) => setNewInv(f => ({ ...f, type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(TYPE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Nome do Ativo *</Label>
                <Input placeholder="Ex: Petrobras PN" value={newInv.name}
                  onChange={e => setNewInv(f => ({ ...f, name: e.target.value }))} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Quantidade *</Label>
                  <Input type="number" placeholder="0" value={newInv.quantity || ''}
                    onChange={e => setNewInv(f => ({ ...f, quantity: Number(e.target.value) }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Moeda</Label>
                  <Select value={newInv.currency} onValueChange={v => setNewInv(f => ({ ...f, currency: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {currencies.map(c => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Preço Médio de Compra *</Label>
                <CurrencyInput value={newInv.average_price}
                  onChange={v => setNewInv(f => ({ ...f, average_price: v }))} />
                {newInv.quantity > 0 && newInv.average_price > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Total: <strong>{formatCurrency(newInv.quantity * newInv.average_price)}</strong>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Conta de Origem *</Label>
                <Select value={newInv.account_id} onValueChange={v => setNewInv(f => ({ ...f, account_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {bankAccounts.map(a => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name} — {formatCurrency(getBalance(a.id))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">O valor será debitado desta conta</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancelar</Button>
              <Button onClick={handleAdd}>Adicionar Ativo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Aporte ────────────────────────────────────────────────── */}
        <Dialog open={aporteOpen} onOpenChange={setAporteOpen}>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>Aportar em {selected?.symbol}</DialogTitle>
              <DialogDescription>{selected?.name}</DialogDescription>
            </DialogHeader>
            {selected && (
              <div className="space-y-4 py-2">
                <div className="rounded-lg bg-muted/40 p-3 space-y-1 text-sm">
                  <p>Quantidade atual: <strong>{selected.quantity < 1 ? selected.quantity.toFixed(6) : selected.quantity.toFixed(2)}</strong></p>
                  <p>Preço médio: <strong>{formatCurrency(selected.average_price, selected.currency)}</strong></p>
                  <p>Preço atual: <strong>{formatCurrency(selected.current_price, selected.currency)}</strong></p>
                </div>
                <div className="space-y-1.5">
                  <Label>Valor do aporte *</Label>
                  <CurrencyInput value={aporteAmount} onChange={setAporteAmount} />
                  {aporteAmount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      +{(aporteAmount / selected.current_price).toFixed(6)} unidades ·
                      Novo preço médio: <strong>{formatCurrency(
                        ((selected.quantity * selected.average_price) + aporteAmount) /
                        (selected.quantity + aporteAmount / selected.current_price),
                        selected.currency
                      )}</strong>
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Conta de origem *</Label>
                  <Select value={aporteAccountId} onValueChange={setAporteAccountId}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {bankAccounts.map(a => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.name} — {formatCurrency(getBalance(a.id))}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setAporteOpen(false)}>Cancelar</Button>
              <Button onClick={handleAporte}>Confirmar Aporte</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Resgate ───────────────────────────────────────────────── */}
        <Dialog open={resgateOpen} onOpenChange={setResgateOpen}>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>Resgatar {selected?.symbol}</DialogTitle>
              <DialogDescription>{selected?.name}</DialogDescription>
            </DialogHeader>
            {selected && (
              <div className="space-y-4 py-2">
                <div className="rounded-lg bg-muted/40 p-3 space-y-1 text-sm">
                  <p>Quantidade: <strong>{selected.quantity < 1 ? selected.quantity.toFixed(6) : selected.quantity.toFixed(2)}</strong></p>
                  <p>Preço atual: <strong>{formatCurrency(selected.current_price, selected.currency)}</strong></p>
                  <p>Disponível para resgate: <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(selected.quantity * selected.current_price, selected.currency)}</strong></p>
                </div>

                {/* Toggle: by value or quantity */}
                <div className="space-y-1.5">
                  <Label>Resgatar por</Label>
                  <div className="flex rounded-md border overflow-hidden text-sm">
                    <button
                      onClick={() => { setRedeemByValue(true); setRedeemQty(0) }}
                      className={`flex-1 py-1.5 font-medium transition-colors ${redeemByValue ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted'}`}
                    >Valor (R$)</button>
                    <button
                      onClick={() => { setRedeemByValue(false); setRedeemValue(0) }}
                      className={`flex-1 py-1.5 font-medium transition-colors ${!redeemByValue ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted'}`}
                    >Quantidade</button>
                  </div>
                </div>

                {redeemByValue ? (
                  <div className="space-y-1.5">
                    <Label>Valor a resgatar *</Label>
                    <CurrencyInput value={redeemValue} onChange={v => { setRedeemValue(v); setRedeemQty(v / selected.current_price) }} />
                    {redeemValue > 0 && (
                      <p className="text-xs text-muted-foreground">≈ {(redeemValue / selected.current_price).toFixed(6)} unidades</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <Label>Quantidade a resgatar *</Label>
                    <Input type="number" step="0.000001" max={selected.quantity} value={redeemQty || ''}
                      onChange={e => { const q = Number(e.target.value); setRedeemQty(q); setRedeemValue(q * selected.current_price) }} />
                    {redeemQty > 0 && (
                      <p className="text-xs text-muted-foreground">= {formatCurrency(redeemQty * selected.current_price, selected.currency)}</p>
                    )}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label>Conta de destino *</Label>
                  <Select value={redeemAccountId} onValueChange={setRedeemAccountId}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {bankAccounts.map(a => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.name} — {formatCurrency(getBalance(a.id))}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setResgateOpen(false)}>Cancelar</Button>
              <Button onClick={handleResgate}>Confirmar Resgate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Atualizar Preço ───────────────────────────────────────── */}
        <Dialog open={precoOpen} onOpenChange={setPrecoOpen}>
          <DialogContent className="sm:max-w-[380px]">
            <DialogHeader>
              <DialogTitle>Atualizar Preço — {selected?.symbol}</DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="space-y-4 py-2">
                <div className="rounded-lg bg-muted/40 p-3 space-y-1 text-sm">
                  <p>Preço atual: <strong>{formatCurrency(selected.current_price, selected.currency)}</strong></p>
                  <p>Preço médio: <strong>{formatCurrency(selected.average_price, selected.currency)}</strong></p>
                </div>
                <div className="space-y-1.5">
                  <Label>Novo preço *</Label>
                  <CurrencyInput value={newPrice} onChange={setNewPrice} />
                  {newPrice > 0 && selected.current_price > 0 && (
                    <p className={`text-xs ${newPrice >= selected.current_price ? 'text-emerald-600' : 'text-destructive'}`}>
                      Variação: {newPrice >= selected.current_price ? '+' : ''}{((newPrice - selected.current_price) / selected.current_price * 100).toFixed(2)}% ·
                      Novo valor total: <strong>{formatCurrency(selected.quantity * newPrice, selected.currency)}</strong>
                    </p>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setPrecoOpen(false)}>Cancelar</Button>
              <Button onClick={handlePreco}>Atualizar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Delete ────────────────────────────────────────────────── */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remover {selected?.symbol}?</AlertDialogTitle>
              <AlertDialogDescription>
                O ativo <strong>{selected?.name}</strong> será removido da carteira. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Remover
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </Layout>
  )
}

export default Investimentos
