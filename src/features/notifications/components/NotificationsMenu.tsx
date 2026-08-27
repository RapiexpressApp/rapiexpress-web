import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell, CreditCard, Info, Package, TriangleAlert } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { formatShortDate } from '@/shared/lib/format'
import { useNotifications } from '../hooks/useNotifications'
import type { NotificationKind } from '../types'

const KIND_STYLES: Record<NotificationKind, { icon: LucideIcon; chip: string; accent: string }> = {
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

interface NotificationsMenuProps {
  align?: 'start' | 'end'
}

export function NotificationsMenu({ align = 'end' }: NotificationsMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, isError, refetch } = useNotifications()
  const notifications = data?.data ?? []
  const unreadCount = notifications.filter((n) => n.unread).length

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Ver notificaciones"
        className={cn(
          'relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/80 backdrop-blur transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
          open && 'bg-white/15 text-white',
        )}
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-brand-dark">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Notificaciones"
          className={cn(
            'fixed inset-x-4 top-20 z-50 overflow-hidden rounded-2xl border border-border bg-card shadow-lg md:absolute md:inset-x-auto md:top-full md:mt-2 md:w-96',
            align === 'end' ? 'md:right-0' : 'md:left-0',
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-ink">Notificaciones</p>
            {unreadCount > 0 && (
              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
                {unreadCount} sin leer
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                Cargando notificaciones...
              </p>
            ) : isError ? (
              <div className="px-4 py-6 text-center">
                <TriangleAlert size={18} className="mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No pudimos cargar tus notificaciones.
                </p>
                <button
                  type="button"
                  onClick={() => void refetch()}
                  className="mt-3 text-sm font-medium text-brand hover:underline"
                >
                  Reintentar
                </button>
              </div>
            ) : notifications.length ? (
              <ul className="divide-y divide-border">
                {notifications.map((notification) => {
                  const { icon: Icon, chip, accent } = KIND_STYLES[notification.kind]
                  return (
                    <li
                      key={notification.id}
                      role="menuitem"
                      className={cn(
                        'flex items-start gap-3 px-4 py-3 transition-colors hover:bg-paper',
                        notification.unread && 'bg-brand/[0.03]',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border',
                          chip,
                        )}
                      >
                        <Icon size={14} className={accent} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-sm font-medium leading-snug text-ink">
                          <span className="min-w-0">{notification.title}</span>
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
                        <time className="mt-1 block font-mono text-[11px] text-muted-foreground">
                          {formatShortDate(notification.date)}
                        </time>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                No tienes notificaciones por ahora.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
