import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { useApp } from "@/context/AppContext"
import Layout from "@/components/Layout"

const Contas = () => {
  const { toast } = useToast()
  const { accounts, addAccount, updateAccount, deleteAccount, transactions } = useApp()
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<any | null>(null)
  const [isStatementOpen, setIsStatementOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null)
  
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "bank" as "bank" | "credit",
    balance: 0
  })

  // Calculate account balance based on transactions
  const getAccountBalance = (accountName: string) => {
    const accountTransactions = transactions.filter(t => t.account === accountName)
    const transactionTotal = accountTransactions.reduce((sum, t) => sum + t.amount, 0)
    const baseAccount = accounts.find(a => a.name === accountName)
    return (baseAccount?.balance || 0) + transactionTotal
  }

  const getAccountTransactions = (accountName: string) => {
    return transactions.filter(t => t.account === accountName)
  }

  const totalBalance = accounts.reduce((sum, account) => sum + getAccountBalance(account.name), 0)
  const activeAccounts = accounts.length

  const handleAddAccount = () => {
    if (!newAccount.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome da conta",
        variant: "destructive"
      })
      return
    }

    if (editingAccount) {
      updateAccount(editingAccount.id, newAccount)
      toast({
        title: "Conta atualizada",
        description: "A conta foi atualizada com sucesso",
      })
    } else {
      addAccount(newAccount)
      toast({
        title: "Conta adicionada",
        description: "Nova conta foi criada com sucesso",
      })
    }

    setNewAccount({ name: "", type: "bank", balance: 0 })
    setEditingAccount(null)
    setIsDialogOpen(false)
  }

  const handleDeleteAccount = (accountId: string) => {
    deleteAccount(accountId)
    toast({
      title: "Conta removida",
      description: "A conta foi removida com sucesso",
    })
  }

  const handleEditAccount = (account: any) => {
    setEditingAccount(account)
    setNewAccount({
      name: account.name,
      type: account.type,
      balance: account.balance
    })
    setIsDialogOpen(true)
  }

  const handleViewStatement = (account: any) => {
    setSelectedAccount(account)
    setIsStatementOpen(true)
  }

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "bank":
        return <Wallet className="h-5 w-5" />
      case "credit":
        return <CreditCard className="h-5 w-5" />
      default:
        return <Wallet className="h-5 w-5" />
    }
  }

  const getAccountTypeName = (type: string) => {
    switch (type) {
      case "bank":
        return "Conta Bancária"
      case "credit":
        return "Cartão de Crédito"
      default:
        return "Conta"
    }
  }

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-success"
    if (balance < 0) return "text-destructive"
    return "text-muted-foreground"
  }

  const maxBalance = accounts.length > 0 ? Math.max(...accounts.map(a => getAccountBalance(a.name))) : 0

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Contas</h1>
            <p className="text-muted-foreground">
              Gerencie suas contas bancárias e cartões
            </p>
          </div>
          
          <Button onClick={() => {
            setEditingAccount(null)
            setNewAccount({ name: "", type: "bank", balance: 0 })
            setIsDialogOpen(true)
          }} className="gap-2">
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
                R$ {maxBalance.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-muted-foreground">
                Conta com maior saldo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Accounts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => {
            const currentBalance = getAccountBalance(account.name)
            return (
              <Card key={account.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    {getAccountIcon(account.type)}
                    <div>
                      <CardTitle className="text-base">{account.name}</CardTitle>
                      <CardDescription>{getAccountTypeName(account.type)}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="default">Ativa</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Saldo Atual
                      </p>
                      <p className={`text-lg font-bold ${getBalanceColor(currentBalance)}`}>
                        R$ {currentBalance.toLocaleString('pt-BR')}
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
            )
          })}
        </div>

        {/* Add Account Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingAccount ? "Editar Conta" : "Nova Conta"}
              </DialogTitle>
              <DialogDescription>
                {editingAccount 
                  ? "Edite os dados da conta selecionada" 
                  : "Adicione uma nova conta bancária ou cartão"
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da Conta</Label>
                <Input 
                  id="name" 
                  placeholder="Ex: Conta Principal" 
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Conta</Label>
                <Select 
                  value={newAccount.type} 
                  onValueChange={(value) => setNewAccount({...newAccount, type: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Conta Bancária</SelectItem>
                    <SelectItem value="credit">Cartão de Crédito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="balance">Saldo Inicial</Label>
                <Input 
                  id="balance" 
                  type="number" 
                  placeholder="0,00" 
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({...newAccount, balance: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddAccount}>
                {editingAccount ? "Atualizar Conta" : "Criar Conta"}
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
                  <p className={`text-xl font-bold ${getBalanceColor(selectedAccount ? getAccountBalance(selectedAccount.name) : 0)}`}>
                    R$ {selectedAccount ? getAccountBalance(selectedAccount.name).toLocaleString('pt-BR') : '0'}
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
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedAccount && getAccountTransactions(selectedAccount.name).map((transaction) => (
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
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.type === "income" ? "text-success" : "text-destructive"
                      }`}>
                        {transaction.type === "income" ? "+" : ""}
                        R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))}
                  {selectedAccount && getAccountTransactions(selectedAccount.name).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Nenhuma transação encontrada para esta conta
                      </TableCell>
                    </TableRow>
                  )}
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
    </Layout>
  )
}

export default Contas