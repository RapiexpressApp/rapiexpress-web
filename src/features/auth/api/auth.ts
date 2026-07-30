import { httpClient } from '@/shared/lib/http-client'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types'

export function login(data: LoginRequest) {
  return httpClient.post<AuthResponse>('/auth/login', data)
}

export function register(data: RegisterRequest) {
  return httpClient.post<AuthResponse>('/auth/register', data)
}

export function forgotPassword(email: string) {
  return httpClient.post<{ message: string }>('/auth/forgot-password', { email })
}
