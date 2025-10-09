import { useState } from "react"
import Layout from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Trash2, UserPlus } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface Contact {
  id: string
  user_id: string
  name: string
  phone: string
  created_at: string
}

export default function Contacts() {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('name')
      
      if (error) throw error
      return data as Contact[]
    },
    enabled: !!user?.id,
  })

  const addContactMutation = useMutation({
    mutationFn: async (newContact: { name: string; phone: string }) => {
      if (!user?.id) throw new Error('User not authenticated')
      
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          user_id: user.id,
          name: newContact.name,
          phone: newContact.phone,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast({
        title: "Contato adicionado",
        description: "O contato foi cadastrado com sucesso.",
      })
      setName("")
      setPhone("")
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o contato.",
        variant: "destructive",
      })
      console.error('Error adding contact:', error)
    },
  })

  const deleteContactMutation = useMutation({
    mutationFn: async (contactId: string) => {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast({
        title: "Contato removido",
        description: "O contato foi removido com sucesso.",
      })
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível remover o contato.",
        variant: "destructive",
      })
      console.error('Error deleting contact:', error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e telefone.",
        variant: "destructive",
      })
      return
    }

    addContactMutation.mutate({ name: name.trim(), phone: phone.trim() })
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const limited = numbers.slice(0, 11)
    
    if (limited.length <= 2) {
      return `(${limited}`
    } else if (limited.length <= 7) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Contatos</h1>
          <p className="text-muted-foreground">Gerencie seus contatos para vincular às transações</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Contato</CardTitle>
            <CardDescription>Cadastre pessoas para identificar quem fez cada compra</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: João Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={addContactMutation.isPending}>
                <UserPlus className="mr-2 h-4 w-4" />
                {addContactMutation.isPending ? "Adicionando..." : "Adicionar Contato"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contatos Cadastrados</CardTitle>
            <CardDescription>
              {contacts.length === 0 ? "Nenhum contato cadastrado" : `${contacts.length} contato(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Carregando...</p>
            ) : contacts.length === 0 ? (
              <p className="text-muted-foreground">Adicione seu primeiro contato acima.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteContactMutation.mutate(contact.id)}
                          disabled={deleteContactMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
