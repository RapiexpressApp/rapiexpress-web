import type { LoginInput, RegisterInput } from './schemas'

export type LoginRequest = LoginInput

export type RegisterRequest = RegisterInput

export interface AuthResponse {
  token: string
  user: {
    email: string
    name: string
  }
}

export interface User {
  email: string
  name: string
}
