import { type FormEvent, useState } from 'react'
import { useForgotPassword } from '../hooks/useForgotPassword'
import { forgotPasswordSchema } from '../schemas'
import { issuesToRecord } from '@/shared/lib/validation'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export function ForgotPasswordForm() {
  const forgotPassword = useForgotPassword()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const result = forgotPasswordSchema.safeParse({ email })
    if (!result.success) {
      setError(issuesToRecord(result.error.issues).email ?? null)
      return
    }
    setError(null)
    forgotPassword.mutate(result.data.email)
  }

  if (forgotPassword.isSuccess) {
    return (
      <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
        Si existe una cuenta asociada a «{email}», enviaremos instrucciones para
        restablecer tu contraseña. Revisa tu bandeja de entrada.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
          placeholder="tucorreo@ejemplo.com"
          required
          autoComplete="email"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'email-error' : undefined}
        />
        {error && (
          <p id="email-error" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
      {forgotPassword.isError && (
        <p className="text-sm text-destructive">
          {(forgotPassword.error as Error).message}
        </p>
      )}
      <Button type="submit" disabled={forgotPassword.isPending} className="w-full">
        {forgotPassword.isPending ? 'Enviando...' : 'Enviar instrucciones'}
      </Button>
    </form>
  )
}
