import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { formatCPF, unformatCPF, validateCPF } from "@/utils/cpfFormatter"
import { supabase } from "@/integrations/supabase/client"
import { z } from "zod"

// Schema de validação
const signupSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos").refine(validateCPF, "CPF inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres").max(100, "Senha muito longa"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const cleanCPF = unformatCPF(formData.cpf)
    
    // Validar todos os campos com zod
    const validation = signupSchema.safeParse({
      name: formData.name,
      email: formData.email,
      cpf: cleanCPF,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    })

    if (!validation.success) {
      const firstError = validation.error.errors[0]
      toast({
        title: "Erro no cadastro",
        description: firstError.message,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Verificar se CPF já está em uso
      const { data: existingCPF } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('cpf', cleanCPF)
        .maybeSingle()

      if (existingCPF) {
        toast({
          title: "CPF já cadastrado",
          description: "Este CPF já está sendo usado por outra conta",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Criar conta no Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      })

      if (signUpError) throw signUpError

      // Atualizar perfil com CPF (para exibição)
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ cpf: cleanCPF })
          .eq('user_id', authData.user.id)

        if (profileError) throw profileError

        // Salvar CPF criptografado via edge function (para uso em boletos)
        const { error: cpfError } = await supabase.functions.invoke('boletos-cpf', {
          body: { 
            action: 'save',
            cpf: cleanCPF 
          }
        })

        if (cpfError) {
          console.error('Erro ao criptografar CPF:', cpfError)
          // Continua mesmo se falhar a criptografia, pois o CPF está salvo no perfil
        }
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar o cadastro",
      })
      navigate("/login")
    } catch (error: any) {
      // Não fazer log de erros de autenticação com dados sensíveis
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cpf') {
      // Formata CPF enquanto digita
      setFormData(prev => ({ ...prev, cpf: formatCPF(value) }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>
            Crie sua conta no FinanceTracker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => handleInputChange("cpf", e.target.value)}
                maxLength={14}
                required
              />
              <p className="text-xs text-muted-foreground">
                Seu CPF será usado para consultar boletos e não poderá ser alterado
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link to="/login" className="text-primary hover:underline">
              Fazer login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup