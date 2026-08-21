import { Check, Plane, Warehouse, ShieldCheck, Store, Home } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { PackageStatus } from '../types'

const STEPS: Array<{ status: PackageStatus; label: string; icon: typeof Plane }> = [
  { status: 'Bodega', label: 'Bodega', icon: Warehouse },
  { status: 'Embarcado', label: 'Embarcado', icon: Plane },
  { status: 'Aduana', label: 'Aduana', icon: ShieldCheck },
  { status: 'Agencia', label: 'Agencia', icon: Store },
  { status: 'Entregado', label: 'Entregado', icon: Home },
]

interface StatusStepperProps {
  currentStatus: PackageStatus
}

export function StatusStepper({ currentStatus }: StatusStepperProps) {
  const currentIndex = STEPS.findIndex((s) => s.status === currentStatus)

  return (
    <div className="overflow-hidden rounded-2xl border border-brand/20 bg-card shadow-sm">
      <div className="flex justify-between px-4 py-4 sm:px-6">
        {STEPS.map(({ status, label, icon: Icon }, index) => {
          const reached = index <= currentIndex
          const isCurrent = index === currentIndex

          return (
            <div key={status} className="flex flex-1 flex-col items-center gap-2 sm:flex-row sm:gap-0">
              <div className="relative flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-10 sm:w-10',
                    isCurrent
                      ? 'scale-110 border-ink bg-ink text-yellow-400 shadow-lg shadow-ink/20'
                      : reached
                        ? 'border-brand bg-brand/10 text-brand'
                        : 'border-border bg-muted text-muted-foreground',
                  )}
                >
                  {reached && !isCurrent ? <Check size={16} className="text-brand" /> : <Icon size={16} />}
                </span>
                <span
                  className={cn(
                    'text-center text-[10px] font-medium uppercase tracking-wide sm:text-xs sm:whitespace-nowrap',
                    reached ? 'text-brand-dark' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div className="relative h-px w-full bg-border sm:h-[2px] sm:flex-1 sm:self-center sm:mx-3">
                  <span
                    className={cn(
                      'absolute left-0 top-0 h-full transition-all duration-700',
                      index < currentIndex ? 'w-full bg-brand' : 'w-0 bg-brand/30',
                    )}
                    style={index < currentIndex ? {} : undefined}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}