import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, RotateCcw } from "lucide-react"
import { DashboardCard } from "@/hooks/useDashboardLayout"

interface DashboardCustomizerProps {
  cards: DashboardCard[]
  onToggleCard: (cardId: string) => void
  onResetLayout: () => void
}

export const DashboardCustomizer = ({ cards, onToggleCard, onResetLayout }: DashboardCustomizerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Personalizar</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Personalizar Dashboard</SheetTitle>
          <SheetDescription>
            Escolha quais cards exibir e organize o layout arrastando os cards
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Cards Visíveis</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onResetLayout}
                className="gap-2 text-xs"
              >
                <RotateCcw className="h-3 w-3" />
                Restaurar padrão
              </Button>
            </div>
            
            {cards.map((card) => (
              <div key={card.id} className="flex items-center justify-between space-x-2 p-3 rounded-lg border">
                <Label htmlFor={card.id} className="flex-1 cursor-pointer text-sm">
                  {card.title}
                </Label>
                <Switch
                  id={card.id}
                  checked={card.visible}
                  onCheckedChange={() => onToggleCard(card.id)}
                />
              </div>
            ))}
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h4 className="text-sm font-medium">💡 Dica</h4>
            <p className="text-xs text-muted-foreground">
              Arraste os cards para reorganizar o layout. As alterações são salvas automaticamente.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
