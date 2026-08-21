import { MapPin, Clock } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { StatusBadge } from './StatusBadge'
import type { PackageHistory } from '../types'

interface TrackingTimelineProps {
  history: PackageHistory[]
  trackingNumber: string
}

export function TrackingTimeline({ history, trackingNumber }: TrackingTimelineProps) {
  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Sin historial disponible para esta guía.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Historial de ruta
        </h2>
        <span className="font-mono text-xs text-muted-foreground">{trackingNumber}</span>
      </div>

      <ol className="relative ml-2 space-y-0">
        <span className="absolute bottom-2 left-3 top-2 w-px bg-gradient-to-b from-brand via-brand/40 to-border" aria-hidden />
        {history.map((entry, index) => {
          const isLatest = index === 0
          return (
            <li key={index} className="relative pl-10 pb-8 last:pb-0">
              <span
                className={cn(
                  'absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-card',
                  isLatest ? 'border-brand' : 'border-border bg-muted',
                )}
              >
                <span className={cn('h-2 w-2 rounded-full', isLatest ? 'bg-brand' : 'bg-muted-foreground/40')} />
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={entry.status} />
                <time className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Clock size={12} />
                  {entry.date}
                </time>
              </div>

              <p className="mt-1 flex items-center gap-1 text-sm font-medium text-ink">
                <MapPin size={13} className="text-brand-light" />
                {entry.location}
              </p>
              {entry.description && (
                <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}