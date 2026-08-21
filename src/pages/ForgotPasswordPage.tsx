import { Link } from 'react-router-dom'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Recuperar contraseña"
      footer={
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-primary underline-offset-4 hover:underline">
            Volver a iniciar sesión
          </Link>
        </p>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}