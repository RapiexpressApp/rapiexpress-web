// =====================================================================
// MOCK DE DEMOSTRACIÓN — ver src/shared/mocks/demo.ts
// API auténtica (cuando exista): POST /auth/login
// =====================================================================
import { mockResponse, MOCK_USER } from '@/shared/mocks/demo'
import type { ApiResponse } from '@/shared/types/api'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types'

export function login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
  void data
  return mockResponse<AuthResponse>({
    token: `demo-token-${Date.now()}`,
    user: MOCK_USER,
  })
}

export function register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
  void data
  return mockResponse<AuthResponse>({
    token: `demo-token-reg-${Date.now()}`,
    user: MOCK_USER,
  })
}

export function forgotPassword(email: string) {
  void email
  return mockResponse<{ message: string }>({
    message: 'Si el correo existe, recibirás las instrucciones.',
  })
}