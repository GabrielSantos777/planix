import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  User, Shield, CreditCard, Camera, Upload, Crown, Tags, UserCircle,
  Calendar, Lock, LogOut, ExternalLink, Settings as SettingsIcon
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import Layout from '@/components/Layout'
import { formatPhoneNumber } from '@/utils/phoneFormatter'
import { ContactsManagement } from '@/components/ContactsManagement'
import { CategoryManagement } from '@/components/CategoryManagement'
import { formatCPF } from '@/utils/cpfFormatter'
import { cn } from '@/lib/utils'

// ─── Sidebar nav tabs ─────────────────────────────────────────────────────────
type TabId = 'profile' | 'categories' | 'contacts' | 'account' | 'subscription'

const TABS: { id: TabId; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'profile', label: 'Perfil', icon: User, description: 'Dados pessoais e foto' },
  { id: 'categories', label: 'Categorias', icon: Tags, description: 'Organize receitas e despesas' },
  { id: 'contacts', label: 'Contatos', icon: UserCircle, description: 'Vincule contatos a transações' },
  { id: 'account', label: 'Conta', icon: Shield, description: 'Segurança e informações' },
  { id: 'subscription', label: 'Assinatura', icon: Crown, description: 'Plano e cobrança' },
]

// ─── Main component ───────────────────────────────────────────────────────────
const SettingsImproved = () => {
  const { user, profile, refreshProfile, signOut } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<TabId>('profile')
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  })

  useEffect(() => {
    if (profile) {
      setFormData({ full_name: profile.full_name || '', phone: profile.phone || '' })
      setAvatarUrl(profile.avatar_url ?? null)
    }
  }, [profile])

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const formatDate = (d: string) => new Date(d).toLocaleDateString('pt-BR')

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file) return

      const ext = file.name.split('.').pop()
      const path = `avatars/${user?.id}.${ext}`

      const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
      if (upErr) throw upErr

      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      const url = data.publicUrl

      const { error: updateErr } = await supabase.from('profiles').update({ avatar_url: url }).eq('user_id', user?.id)
      if (updateErr) throw updateErr

      setAvatarUrl(url)
      await refreshProfile()
      toast({ title: 'Foto atualizada!' })
    } catch (err: any) {
      toast({ title: 'Erro no upload', description: err.message, variant: 'destructive' })
    } finally {
      setUploading(false)
    }
  }

  const handleProfileUpdate = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from('profiles').update(formData).eq('user_id', user?.id)
      if (error) throw error
      await refreshProfile()
      toast({ title: 'Perfil atualizado!' })
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err: any) {
      toast({ title: 'Erro ao sair', description: err.message, variant: 'destructive' })
    }
  }

  // ─── Render active tab content ───────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      // ── PROFILE ──────────────────────────────────────────────────────────
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Informações do Perfil</h2>
              <p className="text-sm text-muted-foreground">Atualize seu nome, telefone e foto</p>
            </div>

            {/* Avatar */}
            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-5">
                  <Avatar className="h-20 w-20 shrink-0">
                    <AvatarImage src={avatarUrl || ''} />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                      {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{profile?.full_name || 'Sem nome'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2 gap-2">
                          <Camera className="h-4 w-4" /> Alterar foto
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                          <DialogTitle>Alterar Foto do Perfil</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-4 py-2">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={avatarUrl || ''} />
                            <AvatarFallback className="text-2xl">
                              {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="w-full space-y-2">
                            <Label htmlFor="avatar-file">Selecionar imagem</Label>
                            <Input id="avatar-file" type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
                            <p className="text-xs text-muted-foreground">JPG, PNG, GIF · máx. 5 MB</p>
                          </div>
                          {uploading && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Upload className="h-4 w-4 animate-pulse" /> Enviando...
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form */}
            <Card>
              <CardContent className="pt-5 pb-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nome Completo</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={e => setFormData(f => ({ ...f, full_name: e.target.value }))}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input value={user?.email || ''} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={e => setFormData(f => ({ ...f, phone: formatPhoneNumber(e.target.value) }))}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  {profile?.cpf && (
                    <div className="space-y-2">
                      <Label>CPF</Label>
                      <Input value={formatCPF(profile.cpf)} disabled className="bg-muted" />
                      <p className="text-xs text-muted-foreground">CPF não pode ser alterado</p>
                    </div>
                  )}
                </div>
                <Button onClick={handleProfileUpdate} disabled={saving}>
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      // ── CATEGORIES ───────────────────────────────────────────────────────
      case 'categories':
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Categorias</h2>
              <p className="text-sm text-muted-foreground">Organize suas receitas e despesas por categorias</p>
            </div>
            <CategoryManagement />
          </div>
        )

      // ── CONTACTS ─────────────────────────────────────────────────────────
      case 'contacts':
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Contatos</h2>
              <p className="text-sm text-muted-foreground">Gerencie contatos para vincular às suas transações</p>
            </div>
            <ContactsManagement />
          </div>
        )

      // ── ACCOUNT ──────────────────────────────────────────────────────────
      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Informações da Conta</h2>
              <p className="text-sm text-muted-foreground">Segurança, datas e sessão</p>
            </div>

            <Card>
              <CardContent className="pt-5 pb-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">E-mail</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</p>
                    <Badge variant="default" className="text-xs">Ativo</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conta criada em</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <p>{user?.created_at ? formatDate(user.created_at) : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Último login</p>
                    <div className="flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      <p>{user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="pt-1">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    Sair da conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      // ── SUBSCRIPTION ─────────────────────────────────────────────────────
      case 'subscription':
        const isPremium = profile?.subscription_plan === 'premium'
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Plano e Assinatura</h2>
              <p className="text-sm text-muted-foreground">Gerencie seu plano e cobranças</p>
            </div>

            <Card className={cn('border-2', isPremium ? 'border-yellow-400/40' : 'border-border')}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg', isPremium ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-muted')}>
                    <Crown className={cn('h-5 w-5', isPremium ? 'text-yellow-600' : 'text-muted-foreground')} />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {isPremium ? 'Plano Premium' : 'Plano Básico'}
                    </CardTitle>
                    <CardDescription>
                      {profile?.subscription_end
                        ? `Ativo até ${formatDate(profile.subscription_end)}`
                        : profile?.trial_end
                          ? `Trial — expira em ${formatDate(profile.trial_end)}`
                          : 'Trial ativo'}
                    </CardDescription>
                  </div>
                  <Badge className="ml-auto" variant={isPremium ? 'default' : 'secondary'}>
                    {isPremium ? 'Premium' : 'Básico'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {!isPremium && (
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-3 text-sm">
                    <p className="font-medium text-primary mb-1">Desbloqueie o Premium</p>
                    <ul className="space-y-1 text-muted-foreground text-xs list-disc list-inside">
                      <li>Transações e contas ilimitadas</li>
                      <li>Relatórios avançados</li>
                      <li>Integração WhatsApp</li>
                      <li>Suporte prioritário</li>
                    </ul>
                  </div>
                )}
                <Button
                  className="gap-2"
                  variant={isPremium ? 'outline' : 'default'}
                  onClick={() => window.location.href = '/plans'}
                >
                  <ExternalLink className="h-4 w-4" />
                  {isPremium ? 'Gerenciar Assinatura' : 'Ver Planos'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-5xl mx-auto">
        {/* ── Sidebar nav ────────────────────────────────────────────────── */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold">Configurações</h1>
          </div>
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left whitespace-nowrap md:whitespace-normal',
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Content ────────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {renderContent()}
        </main>
      </div>
    </Layout>
  )
}

export default SettingsImproved
