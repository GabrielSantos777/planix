import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import type { Database } from '@/integrations/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']
type UserRole = 'admin' | 'moderator' | 'user'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  userRoles: UserRole[]
  isAdmin: boolean
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signInWithGoogle: () => Promise<{ error: any }>
  signOut: () => Promise<void>
  isTrialExpired: boolean
  hasActiveSubscription: boolean
  isSubscriptionExpired: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userRoles, setUserRoles] = useState<UserRole[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in fetchProfile:', error)
      return null
    }
  }

  const fetchUserRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)

      if (error) {
        console.error('Error fetching user roles:', error)
        return []
      }

      return (data || []).map(r => r.role as UserRole)
    } catch (error) {
      console.error('Error in fetchUserRoles:', error)
      return []
    }
  }

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      const roles = await fetchUserRoles(user.id)
      setProfile(profileData)
      setUserRoles(roles)
    }
  }

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          // Fetch profile data and roles
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id)
            const roles = await fetchUserRoles(session.user.id)
            setProfile(profileData)
            setUserRoles(roles)
            setLoading(false)
          }, 0)
        } else {
          setProfile(null)
          setUserRoles([])
          setLoading(false)
        }
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        setTimeout(async () => {
          const profileData = await fetchProfile(session.user.id)
          const roles = await fetchUserRoles(session.user.id)
          setProfile(profileData)
          setUserRoles(roles)
          setLoading(false)
        }, 0)
      } else {
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        })
        return { error }
      }

      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu email para confirmar a conta.",
      })

      return { error: null }
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      })
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive",
        })
        return { error }
      }

      // Verificar status da assinatura após login
      setTimeout(async () => {
        try {
          await supabase.functions.invoke('check-subscription')
        } catch (err) {
          console.log('Erro ao verificar assinatura:', err)
        }
      }, 1000)

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao PLANIX",
      })

      return { error: null }
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive",
      })
      return { error }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })

      if (error) {
        toast({
          title: "Erro no login com Google",
          description: error.message,
          variant: "destructive",
        })
        return { error }
      }

      return { error: null }
    } catch (error: any) {
      toast({
        title: "Erro no login com Google",
        description: error.message,
        variant: "destructive",
      })
      return { error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      setUser(null)
      setSession(null)
      setProfile(null)
      setUserRoles([])

      toast({
        title: "Logout realizado",
        description: "Até logo!",
      })
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const isTrialExpired = profile?.trial_end ? new Date(profile.trial_end) < new Date() : false
  const hasActiveSubscription = profile?.subscription_end ? new Date(profile.subscription_end) > new Date() : false
  const isSubscriptionExpired = profile?.subscription_end ? new Date(profile.subscription_end) < new Date() : true
  const isAdmin = userRoles.includes('admin')

  const value: AuthContextType = {
    user,
    session,
    profile,
    userRoles,
    isAdmin,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    isTrialExpired,
    hasActiveSubscription,
    isSubscriptionExpired,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}