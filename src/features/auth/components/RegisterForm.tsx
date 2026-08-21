import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'
import { registerSchema } from '../schemas'
import { issuesToRecord, withoutKey } from '@/shared/lib/validation'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export function RegisterForm() {
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const result = registerSchema.safeParse({ name, email, password })
    if (!result.success) {
      setErrors(issuesToRecord(result.error.issues))
      return
    }
    setErrors({})
    registerMutation.mutate(result.data, {
      onSuccess: () => navigate('/dashboard'),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrors((prev) => withoutKey(prev, 'name'))
          }}
          required
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setErrors((prev) => withoutKey(prev, 'email'))
          }}
          required
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrors((prev) => withoutKey(prev, 'password'))
          }}
          required
          autoComplete="new-password"
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password}
          </p>
        )}
      </div>
      {registerMutation.isError && (
        <p className="text-sm text-destructive">
          {(registerMutation.error as Error).message}
        </p>
      )}
      <Button type="submit" disabled={registerMutation.isPending} className="w-full">
        {registerMutation.isPending ? 'Registrando...' : 'Crear cuenta'}
      </Button>
    </form>
  )
}
