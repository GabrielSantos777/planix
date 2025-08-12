import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Wallet,
  CreditCard,
  PiggyBank,
  Building,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Account {
  id: string
  name: string
  type: "checking" | "savings" | "credit" | "investment"
  balance: number
  bank: string
  status: "active" | "inactive"
}

interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  date: string
}

const Contas = () => {
  const { toast } = useToast()
  const [accounts] = useState<Account[]>([
    {
      id: "1",
      name: "Conta Principal",
      type: "checking",
      balance: 5750,
      bank: "Banco do Brasil",
      status: "active"
    },
    {
      id: "2",
      name: "Poupança",
      type: "savings",
      balance: 15000,
      bank: "Caixa Econômica",
      status: "active"
    },
    {
      id: "3",
      name: "Cartão de Crédito",
      type: "credit",
      balance: -1250,
      bank: "Nubank",
      status: "active"
    },
    {
      id: "4",
      name: "Investimentos",
      type: "investment",
      balance: 25000,
      bank: "XP Investimentos",
      status: "active"
    }
  ])

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isStatementOpen, setIsStatementOpen] = useState(false)

  const sampleTransactions: Transaction[] = [
    {
      id: "1",
      description: "Depósito salário",
      amount: 5000,
      type: "income",
      date: "2024-01-15"
    },
    {
      id: "2",
      description: "Supermercado",
      amount: -250,
      type: "expense",
      date: "2024-01-14"
    },
    {
      id: "3",
      description: "PIX recebido",
      amount: 300,
      type: "income",
      date: "2024-01-13"
    }
  ]

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const activeAccounts = accounts.filter(account => account.status === "active").length

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Wallet className="h-5 w-5" />
      case "savings":
        return <PiggyBank className="h-5 w-5" />
      case "credit":
        return <CreditCard className="h-5 w-5" />
      case "investment":
        return <Building className="h-5 w-5" />
      default:
        return <Wallet className="h-5 w-5" />
    }
  }

  const getAccountTypeName = (type: string) => {
    switch (type) {
      case "checking":
        return "Conta Corrente"
      case "savings":
        return "Poupança"
      case "credit":
        return "Cartão de Crédito"
      case "investment":
        return "Investimento"
      default:
        return "Conta"
    }
  }

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-success"
    if (balance < 0) return "text-destructive"
    return "text-muted-foreground"
  }

  const handleAddAccount = () => {
    setIsDialogOpen(true)
  }

  const handleViewStatement = (account: Account) => {
    setSelectedAccount(account)
    setIsStatementOpen(true)
  }

  const handleEditAccount = (account: Account) => {
    toast({
      title: "Editar conta",
      description: "Funcionalidade será implementada em breve",
    })
  }

  const handleDeleteAccount = (accountId: string) => {
    toast({
      title: "Conta removida",
      description: "A conta foi removida com sucesso",
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contas</h1>
          <p className="text-muted-foreground">
            Gerencie suas contas bancárias e cartões
          </p>
        </div>
        
        <Button onClick={handleAddAccount} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getBalanceColor(totalBalance)}`}>
              R$ {totalBalance.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              Soma de todas as contas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAccounts}</div>
            <p className="text-xs text-muted-foreground">
              Contas em funcionamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Saldo</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              R$ {Math.max(...accounts.map(a => a.balance)).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              Conta com maior saldo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                {getAccountIcon(account.type)}
                <div>
                  <CardTitle className="text-base">{account.name}</CardTitle>
                  <CardDescription>{account.bank}</CardDescription>
                </div>
              </div>
              <Badge variant={account.status === "active" ? "default" : "secondary"}>
                {account.status === "active" ? "Ativa" : "Inativa"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {getAccountTypeName(account.type)}
                  </p>
                  <p className={`text-lg font-bold ${getBalanceColor(account.balance)}`}>
                    R$ {account.balance.toLocaleString('pt-BR')}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewStatement(account)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Extrato
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditAccount(account)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAccount(account.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Account Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova Conta</DialogTitle>
            <DialogDescription>
              Adicione uma nova conta bancária ou cartão
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Conta</Label>
              <Input id="name" placeholder="Ex: Conta Principal" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Conta</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Conta Corrente</SelectItem>
                  <SelectItem value="savings">Poupança</SelectItem>
                  <SelectItem value="credit">Cartão de Crédito</SelectItem>
                  <SelectItem value="investment">Investimento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bank">Banco</Label>
              <Input id="bank" placeholder="Ex: Banco do Brasil" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="balance">Saldo Inicial</Label>
              <Input id="balance" type="number" placeholder="0,00" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              setIsDialogOpen(false)
              toast({
                title: "Conta criada",
                description: "Nova conta adicionada com sucesso",
              })
            }}>
              Criar Conta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Statement Dialog */}
      <Dialog open={isStatementOpen} onOpenChange={setIsStatementOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Extrato - {selectedAccount?.name}</DialogTitle>
            <DialogDescription>
              Movimentações recentes da conta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Saldo Atual</p>
                <p className={`text-xl font-bold ${getBalanceColor(selectedAccount?.balance || 0)}`}>
                  R$ {selectedAccount?.balance.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Tipo</p>
                <p className="font-medium">{getAccountTypeName(selectedAccount?.type || "")}</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {transaction.type === "income" ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        {transaction.description}
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.type === "income" ? "text-success" : "text-destructive"
                    }`}>
                      {transaction.type === "income" ? "+" : ""}
                      R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsStatementOpen(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Contas