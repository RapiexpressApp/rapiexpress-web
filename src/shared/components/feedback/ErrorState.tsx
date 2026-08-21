import type { LucideIcon } from 'lucide-react'
import { TriangleAlert } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'

interface ErrorStateProps {
  title?: string
  description?: string
  icon?: LucideIcon
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Algo salió mal',
  description,
  icon: Icon = TriangleAlert,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center gap-2', className)}>
      <Icon size={20} className="text-destructive" />
      <p className="text-sm font-medium text-brand-dark">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {onRetry && (
        <Button type="button" variant="outline" size="sm" onClick={onRetry} className="mt-1">
          Reintentar
        </Button>
      )}
    </div>
  )
}
