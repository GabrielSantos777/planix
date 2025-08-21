import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSupabaseData, type Account } from '@/hooks/useSupabaseData'
import { useCurrency } from '@/context/CurrencyContext'
import { useToast } from '@/hooks/use-toast'

interface CreditCardInvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  invoiceAmount: number
  cardName: string
  onPayment: (paymentData: {
    account_id: string
    payment_date: Date
    amount: number
  }) => void
}

export const CreditCardInvoiceModal = ({
  isOpen,
  onClose,
  invoiceAmount,
  cardName,
  onPayment
}: CreditCardInvoiceModalProps) => {
  const { accounts } = useSupabaseData()
  const { formatCurrency } = useCurrency()
  const { toast } = useToast()
  
  const [selectedAccountId, setSelectedAccountId] = useState<string>('')
  const [paymentDate, setPaymentDate] = useState<Date>(new Date())
  const [paymentAmount, setPaymentAmount] = useState(invoiceAmount)

  const handlePayment = () => {
    if (!selectedAccountId) {
      toast({
        title: "Erro",
        description: "Selecione uma conta para debitar o pagamento",
        variant: "destructive"
      })
      return
    }

    const selectedAccount = accounts.find(acc => acc.id === selectedAccountId)
    if (!selectedAccount) {
      toast({
        title: "Erro", 
        description: "Conta selecionada não encontrada",
        variant: "destructive"
      })
      return
    }

    if ((selectedAccount.current_balance || 0) < paymentAmount) {
      toast({
        title: "Saldo Insuficiente",
        description: "A conta selecionada não possui saldo suficiente",
        variant: "destructive"
      })
      return
    }

    onPayment({
      account_id: selectedAccountId,
      payment_date: paymentDate,
      amount: paymentAmount
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pagar Fatura - {cardName}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Valor da Fatura</Label>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(invoiceAmount)}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Valor a Pagar</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
            />
          </div>

          <div className="grid gap-2">
            <Label>Conta para Debitar</Label>
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{account.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {formatCurrency(account.current_balance || 0)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Data do Pagamento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(paymentDate, "PPP", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={paymentDate}
                  onSelect={(date) => date && setPaymentDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handlePayment}>
            Confirmar Pagamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}