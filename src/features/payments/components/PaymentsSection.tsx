import { cn } from '@/shared/lib/utils'
import { formatCurrency, formatShortDate } from '@/shared/lib/format'
import { usePayments } from '../hooks/usePayments'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { ErrorState } from '@/shared/components/feedback/ErrorState'
import type { PaymentStatus } from '../types'

const STATUS_STYLES: Record<PaymentStatus, string> = {
  Pagado: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600',
  Pendiente: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600',
}

export function PaymentsSection() {
  const { data, isLoading, isError, refetch } = usePayments()
  const overview = data?.data

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      {isLoading ? (
        <LoadingState label="Cargando tu estado de cuenta..." />
      ) : isError ? (
        <ErrorState
          title="No pudimos cargar tus pagos."
          onRetry={() => void refetch()}
        />
      ) : overview ? (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-dark via-brand-mid to-brand p-4 text-white">
            <div className="absolute inset-0 bg-grid-dark" />
            <div className="relative flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent/90">
                  Saldo pendiente
                </p>
                <p className="mt-1 font-mono text-2xl font-medium tracking-tight">
                  {formatCurrency(overview.pendingTotal, overview.currency)}
                </p>
              </div>
              <p className="max-w-[12rem] text-right text-[11px] leading-relaxed text-white/60">
                Coordinamos el cobro por WhatsApp cuando tu guía esté lista
                para entrega.
              </p>
            </div>
          </div>

          <ul className="divide-y divide-border">
            {overview.payments.map((payment) => (
              <li
                key={payment.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">
                    {payment.concept}
                  </p>
                  <p className="mt-0.5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                    {payment.trackingNumber}
                    <span aria-hidden>·</span>
                    {formatShortDate(payment.date)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-sm text-ink">
                    {formatCurrency(payment.amount, payment.currency)}
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                      STATUS_STYLES[payment.status],
                    )}
                  >
                    {payment.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
