import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { login } from '../api/auth'
import type { LoginRequest } from '../types'

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response) => {
      setAuth(response.data.token, response.data.user)
    },
  })
}
