import { useState } from "react"
import { useApp } from "@/context/AppContext"
import { useCategories } from "@/context/CategoriesContext"
import { useCurrency } from "@/context/CurrencyContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Upload, Plus, Trash2, Palette } from "lucide-react"
import Layout from "@/components/Layout"
import { CurrencyInput } from "@/components/ui/currency-input"

// Account interface is now imported from context

const Settings = () => {
  const { toast } = useToast()
  const { accounts, addAccount, deleteAccount } = useApp()
  const { categories, addCategory, deleteCategory, getCategoryIcon } = useCategories()
  const { currencies, selectedCurrency, setSelectedCurrency, formatCurrency } = useCurrency()
  
  const [profile, setProfile] = useState({
    name: localStorage.getItem("userName") || "",
    email: "user@example.com",
    address: "Rua Example, 123",
    city: "São Paulo",
    phone: "(11) 99999-9999"
  })

  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "bank" as "bank" | "credit",
    balance: 0
  })

  const [newCategory, setNewCategory] = useState({
    name: "",
    type: "expense" as "income" | "expense",
    icon: "Home",
    color: "#FF6B6B"
  })

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)

  const iconOptions = [
    'Home', 'Car', 'ShoppingCart', 'Utensils', 'GamepadIcon', 'Shirt', 
    'Heart', 'GraduationCap', 'Plane', 'Gift', 'Briefcase', 'Coins', 
    'PiggyBank', 'TrendingUp'
  ]

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
        title: "❌ Erro",
        description: "Por favor, preencha o nome da conta",
        variant: "destructive"
      })
      return
    }

    addAccount(newAccount)
    setNewAccount({ name: "", type: "bank", balance: 0 })
    toast({
      title: "✅ Conta adicionada",
      description: "Nova conta foi adicionada com sucesso",
    })
  }

  const handleRemoveAccount = (accountId: string) => {
    deleteAccount(accountId)
    toast({
      title: "🗑️ Conta removida",
      description: "A conta foi removida com sucesso",
    })
  }

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "❌ Erro",
        description: "Por favor, preencha o nome da categoria",
        variant: "destructive"
      })
      return
    }

    addCategory(newCategory)
    setNewCategory({ name: "", type: "expense", icon: "Home", color: "#FF6B6B" })
    setIsCategoryDialogOpen(false)
    toast({
      title: "✅ Categoria adicionada",
      description: "Nova categoria foi adicionada com sucesso",
    })
  }

  const handleRemoveCategory = (categoryId: string) => {
    deleteCategory(categoryId)
    toast({
      title: "🗑️ Categoria removida",
      description: "A categoria foi removida com sucesso",
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
                          {formatCurrency(account.balance)}
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
                      <CurrencyInput
                        value={newAccount.balance}
                        onChange={(value) => setNewAccount({...newAccount, balance: value})}
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
                <CardTitle>Preferências Gerais</CardTitle>
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
                    <h3 className="font-medium">Moeda Principal</h3>
                    <p className="text-sm text-muted-foreground">
                      Escolha a moeda padrão para exibição
                    </p>
                  </div>
                  <Select value={selectedCurrency.code} onValueChange={(value) => {
                    const currency = currencies.find(c => c.code === value)
                    if (currency) setSelectedCurrency(currency)
                  }}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(currency => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
                <CardDescription>
                  Gerencie as categorias de receitas e despesas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Lista de categorias existentes */}
                <div className="space-y-4">
                  <h4 className="font-medium">Categorias Existentes</h4>
                  <div className="grid gap-3 max-h-64 overflow-y-auto">
                    {categories.map((category) => {
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
                            <div>
                              <h5 className="font-medium">{category.name}</h5>
                              <p className="text-sm text-muted-foreground">
                                {category.type === 'income' ? 'Receita' : 'Despesa'}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Adicionar nova categoria */}
                <div className="border-t pt-6">
                  <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Categoria
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                        <DialogDescription>
                          Crie uma nova categoria para organizar suas transações
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="categoryName">Nome da Categoria</Label>
                            <Input
                              id="categoryName"
                              placeholder="Ex: Alimentação"
                              value={newCategory.name}
                              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="categoryType">Tipo</Label>
                            <Select value={newCategory.type} onValueChange={(value: any) => setNewCategory({...newCategory, type: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="income">Receita</SelectItem>
                                <SelectItem value="expense">Despesa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="categoryIcon">Ícone</Label>
                          <Select value={newCategory.icon} onValueChange={(value) => setNewCategory({...newCategory, icon: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {iconOptions.map(iconName => {
                                const IconComponent = getCategoryIcon(iconName)
                                return (
                                  <SelectItem key={iconName} value={iconName}>
                                    <div className="flex items-center gap-2">
                                      <IconComponent className="h-4 w-4" />
                                      {iconName}
                                    </div>
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="categoryColor">Cor</Label>
                          <div className="flex gap-2 flex-wrap">
                            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF7675', '#74B9FF'].map(color => (
                              <button
                                key={color}
                                type="button"
                                className={`w-8 h-8 rounded-full border-2 ${newCategory.color === color ? 'border-gray-800' : 'border-gray-300'}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setNewCategory({...newCategory, color})}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="submit" onClick={handleAddCategory}>
                          Adicionar Categoria
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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