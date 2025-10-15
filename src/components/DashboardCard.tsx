import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GripVertical } from "lucide-react"

interface DashboardCardProps {
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  isEditMode?: boolean
  className?: string
}

export const DashboardCard = ({
  title,
  description,
  icon,
  children,
  isEditMode = false,
  className = "",
}: DashboardCardProps) => {
  return (
    <Card className={`h-full flex flex-col ${className} ${isEditMode ? 'cursor-move border-2 border-dashed border-primary/50' : ''}`}>
      <CardHeader className={`flex-shrink-0 ${description ? 'pb-3' : 'pb-2'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon}
            <CardTitle className="text-sm sm:text-base md:text-lg truncate">{title}</CardTitle>
          </div>
          {isEditMode && (
            <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
        </div>
        {description && (
          <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {children}
      </CardContent>
    </Card>
  )
}
