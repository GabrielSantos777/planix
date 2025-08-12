import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react"
import Layout from "@/components/Layout"

interface Account {
  id: string
  name: string
  type: "bank" | "credit"
  balance: number
}

const Settings = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [profile, setProfile] = useState({
    name: localStorage.getItem("userName") || "",
    email: "user@example.com",
    address: "Rua Example, 123",
    city: "São Paulo",
    phone: "(11) 99999-9999"
  })

  const [accounts, setAccounts] = useState<Account[]>([
    { id: "1", name: "Conta Principal", type: "bank", balance: 5000 },
    { id: "2", name: "Poupança", type: "bank", balance: 10000 },
    { id: "3", name: "Cartão Visa", type: "credit", balance: -1500 }
  ])

  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "bank" as "bank" | "credit",
    balance: 0
  })

  const handleSaveProfile = () => {
    localStorage.setItem("userName", profile.name)
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso",
    })
  }

  const handleAddAccount = () => {
    if (!newAccount.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome da conta",
        variant: "destructive"
      })
      return
    }

    const account: Account = {
      id: Date.now().toString(),
      ...newAccount
    }

    setAccounts([...accounts, account])
    setNewAccount({ name: "", type: "bank", balance: 0 })
    toast({
      title: "Conta adicionada",
      description: "Nova conta foi adicionada com sucesso",
    })
  }

  const handleRemoveAccount = (accountId: string) => {
    setAccounts(accounts.filter(acc => acc.id !== accountId))
    toast({
      title: "Conta removida",
      description: "A conta foi removida com sucesso",
    })
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="accounts">Contas</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Gerencie suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg">
                      {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Foto
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => setProfile({...profile, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile}>
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Contas</CardTitle>
                <CardDescription>
                  Gerencie suas contas bancárias e cartões
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Lista de contas existentes */}
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{account.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {account.type === "bank" ? "Conta Bancária" : "Cartão de Crédito"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`font-bold ${
                          account.balance >= 0 ? "text-success" : "text-destructive"
                        }`}>
                          R$ {account.balance.toLocaleString('pt-BR')}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveAccount(account.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adicionar nova conta */}
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Adicionar Nova Conta</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Nome da Conta</Label>
                      <Input
                        id="accountName"
                        placeholder="Ex: Conta Corrente"
                        value={newAccount.name}
                        onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountType">Tipo</Label>
                      <select
                        id="accountType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={newAccount.type}
                        onChange={(e) => setNewAccount({...newAccount, type: e.target.value as "bank" | "credit"})}
                      >
                        <option value="bank">Conta Bancária</option>
                        <option value="credit">Cartão de Crédito</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountBalance">Saldo Inicial</Label>
                      <Input
                        id="accountBalance"
                        type="number"
                        placeholder="0"
                        value={newAccount.balance}
                        onChange={(e) => setNewAccount({...newAccount, balance: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddAccount} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>
                  Configure suas preferências do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tema</h3>
                    <p className="text-sm text-muted-foreground">
                      Escolha entre modo claro, escuro ou automático
                    </p>
                  </div>
                  <ThemeToggle />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por Email</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre suas transações
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Relatórios Mensais</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba relatórios automáticos todo mês
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Settings