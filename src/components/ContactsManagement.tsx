import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Trash2, UserPlus, Edit, Check, X } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface Contact {
  id: string
  user_id: string
  name: string
  phone: string
  payment_day: number | null
  created_at: string
}

export function ContactsManagement() {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentDay, setPaymentDay] = useState<string>("")
  const [editingContact, setEditingContact] = useState<string | null>(null)
  const [editPaymentDay, setEditPaymentDay] = useState<string>("")

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
    mutationFn: async (newContact: { name: string; phone: string; payment_day: number | null }) => {
      if (!user?.id) throw new Error('User not authenticated')
      
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          user_id: user.id,
          name: newContact.name,
          phone: newContact.phone,
          payment_day: newContact.payment_day,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast({
        title: "✅ Contato adicionado",
        description: "O contato foi cadastrado com sucesso.",
      })
      setName("")
      setPhone("")
      setPaymentDay("")
    },
    onError: (error) => {
      toast({
        title: "❌ Erro",
        description: "Não foi possível adicionar o contato.",
        variant: "destructive",
      })
      console.error('Error adding contact:', error)
    },
  })

  const updateContactMutation = useMutation({
    mutationFn: async ({ contactId, payment_day }: { contactId: string; payment_day: number | null }) => {
      const { error } = await supabase
        .from('contacts')
        .update({ payment_day })
        .eq('id', contactId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast({
        title: "✅ Contato atualizado",
        description: "O dia de pagamento foi atualizado.",
      })
      setEditingContact(null)
      setEditPaymentDay("")
    },
    onError: (error) => {
      toast({
        title: "❌ Erro",
        description: "Não foi possível atualizar o contato.",
        variant: "destructive",
      })
      console.error('Error updating contact:', error)
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
        title: "🗑️ Contato removido",
        description: "O contato foi removido com sucesso.",
      })
    },
    onError: (error) => {
      toast({
        title: "❌ Erro",
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
        title: "⚠️ Campos obrigatórios",
        description: "Preencha nome e telefone.",
        variant: "destructive",
      })
      return
    }

    const payment_day = paymentDay ? parseInt(paymentDay) : null

    addContactMutation.mutate({ 
      name: name.trim(), 
      phone: phone.trim(),
      payment_day 
    })
  }

  const handleEditPaymentDay = (contact: Contact) => {
    setEditingContact(contact.id)
    setEditPaymentDay(contact.payment_day?.toString() || "")
  }

  const handleSavePaymentDay = (contactId: string) => {
    const payment_day = editPaymentDay ? parseInt(editPaymentDay) : null
    updateContactMutation.mutate({ contactId, payment_day })
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

  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Contato</CardTitle>
          <CardDescription>
            Cadastre pessoas para identificar quem fez cada compra. 
            O dia de pagamento define quando o contato costuma te pagar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Nome *</Label>
                <Input
                  id="contact-name"
                  placeholder="Ex: João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Telefone *</Label>
                <Input
                  id="contact-phone"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-day">Dia de Pagamento</Label>
                <Select value={paymentDay} onValueChange={setPaymentDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem dia fixo</SelectItem>
                    {dayOptions.map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        Dia {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <div className="text-center py-8">
              <p className="text-muted-foreground">Carregando contatos...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Adicione seu primeiro contato acima.</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Dia de Pagamento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>
                        {editingContact === contact.id ? (
                          <div className="flex items-center gap-2">
                            <Select 
                              value={editPaymentDay} 
                              onValueChange={setEditPaymentDay}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue placeholder="Dia" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Sem dia</SelectItem>
                                {dayOptions.map(day => (
                                  <SelectItem key={day} value={day.toString()}>
                                    Dia {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSavePaymentDay(contact.id)}
                              disabled={updateContactMutation.isPending}
                            >
                              <Check className="h-4 w-4 text-success" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingContact(null)}
                            >
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ) : (
                          <span className={contact.payment_day ? "" : "text-muted-foreground"}>
                            {contact.payment_day ? `Dia ${contact.payment_day}` : "Não definido"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPaymentDay(contact)}
                            title="Editar dia de pagamento"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteContactMutation.mutate(contact.id)}
                            disabled={deleteContactMutation.isPending}
                            title="Remover contato"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
