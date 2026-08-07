import { cn } from '@/shared/lib/utils'
import type { PackageStatus } from '../types'

interface StatusMeta {
  label: string
  dot: string
  chip: string
}

const statusMeta: Record<PackageStatus, StatusMeta> = {
  Bodega: {
    label: 'En bodega',
    dot: 'bg-yellow-500',
    chip: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700',
  },
  Embarcado: {
    label: 'Embarcado',
    dot: 'bg-sky-500',
    chip: 'border-sky-500/30 bg-sky-500/10 text-sky-700',
  },
  Aduana: {
    label: 'En aduana',
    dot: 'bg-violet-500',
    chip: 'border-violet-500/30 bg-violet-500/10 text-violet-700',
  },
  Agencia: {
    label: 'En agencia',
    dot: 'bg-orange-500',
    chip: 'border-orange-500/30 bg-orange-500/10 text-orange-700',
  },
  Entregado: {
    label: 'Entregado',
    dot: 'bg-emerald-500',
    chip: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700',
  },
}

interface StatusBadgeProps {
  status: PackageStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const meta = statusMeta[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium',
        meta.chip,
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60', meta.dot)} />
        <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', meta.dot)} />
      </span>
      {meta.label}
    </span>
  )
}