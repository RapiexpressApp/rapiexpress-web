import { Link } from 'react-router-dom'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { LoginForm } from '@/features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Iniciar sesión"
      footer={
        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-primary underline-offset-4 hover:underline">
            Regístrate
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}
