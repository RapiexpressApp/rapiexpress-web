import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Ingresa un correo válido.'),
  password: z.string().min(1, 'Ingresa tu contraseña.'),
})

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre.'),
  email: z.email('Ingresa un correo válido.'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
})

export const forgotPasswordSchema = z.object({
  email: z.email('Ingresa un correo válido.'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
