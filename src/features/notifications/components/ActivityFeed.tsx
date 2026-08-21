import type { LucideIcon } from 'lucide-react'
import { CreditCard, Info, Package } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { formatShortDate } from '@/shared/lib/format'
import { useNotifications } from '../hooks/useNotifications'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { ErrorState } from '@/shared/components/feedback/ErrorState'
import type { NotificationKind } from '../types'

const KIND_STYLES: Record<
  NotificationKind,
  { icon: LucideIcon; chip: string; accent: string }
> = {
  paquete: {
    icon: Package,
    chip: 'bg-brand/10 border-brand/20',
    accent: 'text-brand',
  },
  pago: {
    icon: CreditCard,
    chip: 'bg-emerald-500/10 border-emerald-500/30',
    accent: 'text-emerald-600',
  },
  sistema: {
    icon: Info,
    chip: 'bg-sky-500/10 border-sky-500/30',
    accent: 'text-sky-600',
  },
}

export function ActivityFeed() {
  const { data, isLoading, isError, refetch } = useNotifications()
  const notifications = data?.data ?? []

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      {isLoading ? (
        <LoadingState label="Cargando actividad..." />
      ) : isError ? (
        <ErrorState
          title="No pudimos cargar tu actividad."
          onRetry={() => void refetch()}
        />
      ) : notifications.length ? (
        <ul className="space-y-4">
          {notifications.map((notification) => {
            const { icon: Icon, chip, accent } = KIND_STYLES[notification.kind]
            return (
              <li key={notification.id} className="flex items-start gap-3">
                <span
                  className={cn(
                    'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
                    chip,
                  )}
                >
                  <Icon size={16} className={accent} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium leading-snug text-ink">
                    <span className="truncate">{notification.title}</span>
                    {notification.unread && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                        aria-label="No leído"
                      />
                    )}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <time className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {formatShortDate(notification.date)}
                </time>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          Aún no hay actividad para mostrar.
        </p>
      )}
    </div>
  )
}
