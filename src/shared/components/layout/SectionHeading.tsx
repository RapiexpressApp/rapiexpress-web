import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  inverted?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  inverted = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-xl' : 'max-w-2xl',
        className,
      )}
    >
      <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-3">
        {eyebrow}
      </p>
      <h2
        className={cn(
          'font-heading text-3xl md:text-4xl font-bold leading-tight',
          inverted ? 'text-white' : 'text-brand-dark',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 leading-relaxed', inverted ? 'text-white/70' : 'text-muted-foreground')}>
          {description}
        </p>
      )}
    </div>
  )
}