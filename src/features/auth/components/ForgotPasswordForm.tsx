import { type FormEvent, useState } from 'react'
import { useForgotPassword } from '../hooks/useForgotPassword'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export function ForgotPasswordForm() {
  const forgotPassword = useForgotPassword()
  const [email, setEmail] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    forgotPassword.mutate(email)
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          required
          autoComplete="email"
        />
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