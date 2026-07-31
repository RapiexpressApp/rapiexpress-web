import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { register } from '../api/auth'
import type { RegisterRequest } from '../types'

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (response) => {
      setAuth(response.data.token, response.data.user)
    },
  })
}
