import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Download, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Install = () => {
  const navigate = useNavigate()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Instalar Planix</CardTitle>
          <CardDescription>
            Adicione o Planix à tela inicial do seu celular para acesso rápido
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isInstalled ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-lg font-semibold">App já instalado!</p>
              <p className="text-sm text-muted-foreground">
                O Planix já está instalado no seu dispositivo
              </p>
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                Abrir Dashboard
              </Button>
            </div>
          ) : isInstallable ? (
            <div className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Acesso offline
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Carregamento rápido
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Experiência nativa
                </p>
              </div>
              <Button onClick={handleInstallClick} className="w-full" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Instalar Agora
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Para instalar o Planix:
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    1
                  </span>
                  <p>
                    <strong>No Chrome/Edge (Android):</strong> Toque no menu (⋮) e selecione "Instalar app" ou "Adicionar à tela inicial"
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    2
                  </span>
                  <p>
                    <strong>No Safari (iPhone):</strong> Toque no botão Compartilhar e selecione "Adicionar à Tela de Início"
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="w-full">
                Continuar no Navegador
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Install
