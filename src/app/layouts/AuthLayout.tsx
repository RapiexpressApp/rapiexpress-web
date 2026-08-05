import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Logo } from '@/shared/components/layout/Logo'

interface AuthLayoutProps {
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6 bg-brand-muted">
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