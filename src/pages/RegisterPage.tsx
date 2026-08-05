import { Link } from 'react-router-dom'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crear cuenta"
      footer={
        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary underline-offset-4 hover:underline">
            Inicia sesión
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthLayout>
  )
}
