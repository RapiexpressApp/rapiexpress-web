import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: LucideIcon
  className?: string
}

export function EmptyState({
  title = 'Sin resultados',
  description,
  icon: Icon = Inbox,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center gap-2', className)}>
      <Icon size={20} className="text-muted-foreground" />
      <p className="text-sm font-medium text-brand-dark">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
    </div>
  )
}