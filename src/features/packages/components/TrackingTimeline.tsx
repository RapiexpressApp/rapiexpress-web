import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { StatusBadge } from './StatusBadge'
import type { PackageHistory } from '../types'

interface TrackingTimelineProps {
  history: PackageHistory[]
  trackingNumber: string
}

export function TrackingTimeline({ history, trackingNumber }: TrackingTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial — {trackingNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin historial disponible.</p>
        ) : (
          <ol className="relative border-s border-border ml-3 space-y-6">
            {history.map((entry, index) => (
              <li key={index} className="ms-6">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-2 ring-border">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge status={entry.status} />
                  <time className="text-xs text-muted-foreground">{entry.date}</time>
                </div>
                <p className="text-sm text-muted-foreground">{entry.location}</p>
                {entry.description && (
                  <p className="text-sm mt-1">{entry.description}</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}
