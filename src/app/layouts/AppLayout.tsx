import { Outlet } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { Logo } from '@/shared/components/layout/Logo'
import { useSession } from '@/features/auth/hooks/useSession'

export function AppLayout() {
  const { user, logout } = useSession()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="max-w-5xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          <Logo to="/dashboard" className="h-8" />
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground">{user?.name}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}