import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Logo } from '@/shared/components/layout/Logo'

interface AuthLayoutProps {
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 gap-6 bg-brand-muted">
      <Button
        asChild
        size="sm"
        className="group absolute left-4 top-4 rounded-full border border-brand/10 bg-white/80 font-semibold text-brand-dark shadow-sm backdrop-blur transition-all hover:border-brand/25 hover:bg-white hover:shadow-md"
      >
        <Link to="/" aria-label="Volver al sitio principal">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-muted text-brand-dark transition-transform duration-200 group-hover:-translate-x-0.5">
            <ArrowLeft size={12} strokeWidth={2.5} />
          </span>
          <span className="hidden sm:inline">Sitio principal</span>
        </Link>
      </Button>
      <Logo className="h-10" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          {footer}
        </CardContent>
      </Card>
    </div>
  )
}