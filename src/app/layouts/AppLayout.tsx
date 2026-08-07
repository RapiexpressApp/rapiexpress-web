import { NavLink, Outlet } from 'react-router-dom'
import { LogOut, LayoutDashboard } from 'lucide-react'
import { Logo } from '@/shared/components/layout/Logo'
import { useSession } from '@/features/auth/hooks/useSession'
import { cn } from '@/shared/lib/utils'

const navItems = [{ to: '/dashboard', label: 'Mis paquetes', icon: LayoutDashboard }]

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
      <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo to="/dashboard" className="h-7 sm:h-8" />

          <nav className="hidden items-center gap-1 rounded-full border border-border bg-card p-1 md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-ink text-white shadow-sm' : 'text-muted-foreground hover:text-ink',
                  )
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 lg:inline-flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {initials(user?.name)}
              </span>
              <span className="max-w-[10rem] truncate text-sm font-medium text-ink">{user?.name}</span>
            </span>
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

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}