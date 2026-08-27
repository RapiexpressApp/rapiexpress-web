import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { StatusBadge } from './StatusBadge'
import type { Package } from '../types'

interface PackageCardProps {
  pkg: Package
}

const BARS = [3, 1, 2, 1, 4, 1, 2, 1, 5, 1, 2, 1, 3, 2, 1, 1, 4, 1, 2, 1, 3, 1, 1, 2]

function Barcode() {
  return (
    <div
      className="flex h-5 items-stretch overflow-hidden text-[3px] leading-none text-ink/55"
      aria-hidden
    >
      {BARS.map((w, i) => (
        <span key={i} className="bg-current" style={{ width: `${w}px` }} />
      ))}
    </div>
  )
}

export function PackageCard({ pkg }: PackageCardProps) {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/tracking/${pkg.trackingNumber}`)}
      className="group relative grid cursor-pointer grid-rows-[auto_auto] overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-dark via-brand-mid to-brand p-4 text-white">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-glint" />
        </div>
        <div className="relative flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent/90">
              Guía aérea
            </p>
            <p className="mt-1 truncate font-mono text-sm tracking-wider text-white sm:text-base">
              {pkg.trackingNumber}
            </p>
          </div>
          <StatusBadge status={pkg.status} className="shrink-0 bg-white/95" />
        </div>
      </div>

      <div className="relative flex flex-col gap-3 p-4">
        <p className="text-sm font-medium leading-snug text-ink">{pkg.description}</p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span className={cn('inline-flex items-center gap-1.5 text-muted-foreground')}>
            <MapPin size={13} className="text-brand-light" />
            {pkg.origin}
          </span>
          <span className="h-px w-4 bg-border" aria-hidden />
          <span className={cn('inline-flex items-center gap-1.5 font-semibold text-brand')}>
            <MapPin size={13} className="text-brand" />
            {pkg.destination}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-border pt-3">
          <Barcode />
          <time className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {pkg.lastUpdate}
          </time>
        </div>
      </div>
    </article>
  )
}