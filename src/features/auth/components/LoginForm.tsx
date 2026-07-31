import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export function LoginForm() {
  const navigate = useNavigate()
  const loginMutation = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    loginMutation.mutate(
      { email, password },
      { onSuccess: () => navigate('/dashboard') },
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
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {loginMutation.isError && (
        <p className="text-sm text-destructive">
          {(loginMutation.error as Error).message}
        </p>
      )}
      <Button type="submit" disabled={loginMutation.isPending} className="w-full">
        {loginMutation.isPending ? 'Ingresando...' : 'Iniciar sesión'}
      </Button>
    </form>
  )
}
