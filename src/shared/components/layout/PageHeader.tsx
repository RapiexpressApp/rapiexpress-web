import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  icon?: LucideIcon
  className?: string
}

export function PageHeader({ eyebrow, title, description, icon: Icon, className }: PageHeaderProps) {
  return (
    <header className={cn('animate-fade-in-up', className)}>
      <div className="flex items-start gap-4">
        {Icon && (
          <span className="mt-1.5 hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-dark to-brand text-white shadow-lg shadow-brand/25 sm:flex">
            <Icon size={22} />
          </span>
        )}
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
