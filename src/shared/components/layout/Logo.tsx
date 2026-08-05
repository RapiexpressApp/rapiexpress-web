import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/utils'

interface LogoProps {
  className?: string
  to?: string
}

export function Logo({ className, to = '/' }: LogoProps) {
  const img = (
    <img
      src="/logo.webp"
      alt="Rapiexpress"
      className={cn('h-8 sm:h-9 md:h-11 w-auto', className)}
    />
  )

  return (
    <Link to={to} className="flex items-center">
      {img}
    </Link>
  )
}