import { useAuthStore } from '@/stores/authStore'

export function useSession() {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  return {
    isAuthenticated: !!token,
    user,
    logout: clearAuth,
  }
}
