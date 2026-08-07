import { Package as PackageIcon, PackageCheck, Plane, Clock3 } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { Package as PackageType } from '../types'

interface Stats {
  inTransit: number
  delivered: number
  staged: number
  total: number
}

function computeStats(packages: PackageType[]): Stats {
  return packages.reduce<Stats>(
    (acc, pkg) => {
      acc.total += 1
      if (pkg.status === 'Entregado') acc.delivered += 1
      else if (pkg.status === 'Bodega') acc.staged += 1
      else acc.inTransit += 1
      return acc
    },
    { inTransit: 0, delivered: 0, staged: 0, total: 0 },
  )
}

interface PackageSummaryCardsProps {
  packages: PackageType[]
}

export function PackageSummaryCards({ packages }: PackageSummaryCardsProps) {
  const stats = computeStats(packages)

  const cards = [
    {
      label: 'En tránsito',
      value: stats.inTransit,
      icon: Plane,
      accent: 'text-sky-600',
      chip: 'bg-sky-500/10 border-sky-500/30',
    },
    {
      label: 'En bodega',
      value: stats.staged,
      icon: PackageIcon,
      accent: 'text-yellow-600',
      chip: 'bg-yellow-500/10 border-yellow-500/30',
    },
    {
      label: 'Entregados',
      value: stats.delivered,
      icon: PackageCheck,
      accent: 'text-emerald-600',
      chip: 'bg-emerald-500/10 border-emerald-500/30',
    },
    {
      label: 'Total activos',
      value: stats.total,
      icon: Clock3,
      accent: 'text-brand-light',
      chip: 'bg-brand/10 border-brand/20',
    },
  ] as const

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
      {cards.map(({ label, value, icon: Icon, accent, chip }) => (
        <div
          key={label}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          <span
            className={cn(
              'absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border',
              chip,
            )}
          >
            <Icon size={17} className={accent} />
          </span>
          <p className={cn('font-mono text-2xl font-medium tracking-tight', accent)}>
            {value}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}