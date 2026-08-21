import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useSession } from '@/features/auth/hooks/useSession'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}