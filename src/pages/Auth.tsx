import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/context/AuthContext'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { user, signIn, signUp, signInWithGoogle } = useAuth()

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  // Password validation
  const isPasswordStrong = (pwd: string) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
    return pwd.length >= 8 && strongRegex.test(pwd)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (isLogin) {
      await signIn(email, password)
    } else {
      if (password !== confirmPassword) {
        alert('As senhas não coincidem')
        setIsLoading(false)
        return
      }
      if (!isPasswordStrong(password)) {
        alert('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo especial')
        setIsLoading(false)
        return
      }
      await signUp(email, password, fullName)
    }
    
    setIsLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    const { error } = await signInWithGoogle()
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Planix</CardTitle>
          <CardDescription>
            {isLogin ? 'Faça login para acessar sua conta' : 'Crie sua conta e comece a gerenciar suas finanças'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Continue com email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isLogin ? "Sua senha" : "Mínimo 8 caracteres com maiúscula, número e símbolo"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {!isLogin && password && !isPasswordStrong(password) && (
                <p className="text-sm text-destructive">
                  A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo especial
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-destructive">
                    As senhas não coincidem
                  </p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Manter-me conectado
                </Label>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLogin ? 'Entrar' : 'Criar conta'}
            </Button>
          </form>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            </span>
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Criar conta' : 'Fazer login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth