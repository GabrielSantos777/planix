import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCurrency } from '@/context/CurrencyContext'
import { useToast } from '@/hooks/use-toast'
import { CurrencyInput } from '@/components/ui/currency-input-fixed'

interface InvoiceData {
  id?: string
  month: number
  year: number
  total_amount: number
  paid_amount: number
  status: 'open' | 'closed' | 'paid' | 'partial'
  due_date?: Date
  payment_date?: Date
  notes?: string
}

interface CreditCardInvoiceEditModalProps {
  isOpen: boolean
  onClose: () => void
  invoice: InvoiceData | null
  cardName: string
  onSave: (invoiceData: InvoiceData) => void
}

export const CreditCardInvoiceEditModal = ({
  isOpen,
  onClose,
  invoice,
  cardName,
  onSave
}: CreditCardInvoiceEditModalProps) => {
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState<InvoiceData>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    total_amount: 0,
    paid_amount: 0,
    status: 'open',
    due_date: new Date(),
    payment_date: undefined,
    notes: ''
  })

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
        due_date: invoice.due_date ? new Date(invoice.due_date) : new Date(),
        payment_date: invoice.payment_date ? new Date(invoice.payment_date) : undefined
      })
    }
  }, [invoice])

  const handleSave = () => {
    if (formData.paid_amount > formData.total_amount) {
      toast({
        title: "Erro",
        description: "O valor pago não pode ser maior que o valor total",
        variant: "destructive"
      })
      return
    }

    // Auto-calculate status based on payment amounts
    let status: InvoiceData['status'] = 'open'
    if (formData.paid_amount === 0) {
      status = 'open'
    } else if (formData.paid_amount >= formData.total_amount) {
      status = 'paid'
    } else {
      status = 'partial'
    }

    onSave({
      ...formData,
      status
    })

    onClose()
  }

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Fatura - {cardName}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Mês</Label>
              <Select value={formData.month.toString()} onValueChange={(value) => setFormData({...formData, month: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Ano</Label>
              <Input 
                type="number" 
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Valor Total da Fatura</Label>
            <CurrencyInput 
              value={formData.total_amount}
              onChange={(value) => setFormData({...formData, total_amount: value})}
              placeholder="0,00"
            />
          </div>

          <div className="grid gap-2">
            <Label>Valor Pago</Label>
            <CurrencyInput 
              value={formData.paid_amount}
              onChange={(value) => setFormData({...formData, paid_amount: value})}
              placeholder="0,00"
            />
          </div>

          <div className="grid gap-2">
            <Label>Status da Fatura</Label>
            <div className="text-sm p-2 bg-muted rounded">
              {formData.paid_amount === 0 && "Em Aberto"}
              {formData.paid_amount > 0 && formData.paid_amount < formData.total_amount && "Pagamento Parcial"}
              {formData.paid_amount >= formData.total_amount && formData.total_amount > 0 && "Paga"}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Data de Vencimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.due_date ? format(formData.due_date, "PPP", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.due_date}
                  onSelect={(date) => date && setFormData({...formData, due_date: date})}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {formData.paid_amount > 0 && (
            <div className="grid gap-2">
              <Label>Data do Pagamento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.payment_date ? format(formData.payment_date, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.payment_date}
                    onSelect={(date) => setFormData({...formData, payment_date: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Observações</Label>
            <Textarea 
              value={formData.notes || ''}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Observações sobre esta fatura..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}