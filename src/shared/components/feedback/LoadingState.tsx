import { Loader2 } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface LoadingStateProps {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Cargando...', className }: LoadingStateProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      <Loader2 size={14} className="animate-spin" />
      {label}
    </div>
  )
}