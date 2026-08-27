import { NavLink, Outlet } from 'react-router-dom'
import { Box, Calculator, Home, LifeBuoy, LogOut, Wallet } from 'lucide-react'
import { Logo } from '@/shared/components/layout/Logo'
import { useSession } from '@/features/auth/hooks/useSession'
import { NotificationsMenu } from '@/features/notifications/components/NotificationsMenu'
import { cn } from '@/shared/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Inicio', icon: Home },
  { to: '/locker', label: 'Casillero', icon: Box },
  { to: '/cotizador', label: 'Cotizador', icon: Calculator },
  { to: '/pagos', label: 'Pagos', icon: Wallet },
  { to: '/ayuda', label: 'Ayuda', icon: LifeBuoy },
]

function initials(name?: string) {
  if (!name) return 'C'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function AppLayout() {
  const { user, logout } = useSession()

  return (
    <div className="min-h-screen bg-paper text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center justify-between gap-3 border-b border-border px-5">
          <Logo to="/dashboard" className="h-8" />
          <NotificationsMenu align="start" />
        </div>

        <nav aria-label="Navegación principal" className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-ink text-white shadow-sm'
                    : 'text-muted-foreground hover:bg-paper hover:text-ink',
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              {initials(user?.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              aria-label="Cerrar sesión"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/80 backdrop-blur-md md:hidden">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <Logo to="/dashboard" className="h-7" />
            <div className="flex items-center gap-2">
              <NotificationsMenu />
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pt-8 pb-28 sm:px-6 sm:pt-10 md:pb-10 md:pt-10">
          <Outlet />
        </main>
      </div>

      <nav
        aria-label="Navegación inferior"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex touch-manipulation flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors',
                  isActive ? 'text-brand' : 'text-muted-foreground hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex h-6 w-11 items-center justify-center rounded-full transition-colors',
                      isActive && 'bg-brand/10',
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
