import { Link, NavLink, Outlet } from 'react-router-dom'
import { ArrowLeft, Box, Calculator, Home, LifeBuoy, LogOut, Wallet } from 'lucide-react'
import { Logo } from '@/shared/components/layout/Logo'
import { Button } from '@/shared/components/ui/button'
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
      <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-brand-dark via-brand-mid to-brand shadow-md shadow-brand-dark/20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Logo to="/dashboard" className="h-8" />
            <nav aria-label="Navegación principal" className="hidden h-16 items-center gap-1 md:flex">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'relative flex h-full items-center px-3.5 text-sm font-medium transition-colors',
                      isActive ? 'text-white' : 'text-white/60 hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute inset-x-2 bottom-0 h-[3px] rounded-t-full bg-accent"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="group rounded-full text-white/75 hover:bg-white/10 hover:text-white"
            >
              <Link to="/" aria-label="Volver al sitio principal">
                <ArrowLeft
                  size={15}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                <span className="hidden lg:inline">Sitio principal</span>
              </Link>
            </Button>
            <NotificationsMenu />
            <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pl-1 pr-2 backdrop-blur md:flex">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-brand-dark">
                {initials(user?.name)}
              </span>
              <span className="max-w-32 truncate text-sm font-medium text-white">{user?.name}</span>
              <button
                type="button"
                onClick={logout}
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <LogOut size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:border-red-300/40 hover:bg-white/15 hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:hidden"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-8 pb-28 sm:px-6 sm:pt-10 md:pt-8 md:pb-12">
        <Outlet />
      </main>

      <nav
        aria-label="Navegación inferior"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 shadow-sm backdrop-blur-lg md:hidden"
      >
        <div className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex touch-manipulation flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors',
                  isActive ? 'text-brand-dark' : 'text-muted-foreground hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex h-7 w-12 items-center justify-center rounded-full transition-colors',
                      isActive
                        ? 'bg-brand text-white shadow-sm shadow-brand/30'
                        : 'bg-transparent',
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  <span className={cn(isActive && 'font-semibold')}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
