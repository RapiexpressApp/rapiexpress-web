import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { usePackageDetail } from '@/features/packages/hooks/usePackageDetail'
import { StatusStepper } from '@/features/packages/components/StatusStepper'
import { TrackingTimeline } from '@/features/packages/components/TrackingTimeline'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { EmptyState } from '@/shared/components/feedback/EmptyState'
import { ErrorState } from '@/shared/components/feedback/ErrorState'

export default function PackageTrackingPage() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = usePackageDetail(trackingNumber ?? '')

  const history = data?.data ?? []
  const currentStatus = history[0]?.status

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-0 py-1"
      >
        <ArrowLeft size={16} />
        Volver a mis paquetes
      </button>

      <section className="animate-fade-in-up">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
          Rastreo de guía
        </p>
        <h1 className="mt-1 font-mono text-2xl font-medium tracking-wider text-brand-dark sm:text-3xl">
          {trackingNumber}
        </h1>
      </section>

      {isLoading ? (
        <LoadingState label="Cargando ruta..." />
      ) : isError ? (
        <ErrorState
          title="No pudimos cargar el rastreo."
          description="Verifica tu conexión e intenta de nuevo."
          onRetry={() => void refetch()}
          className="rounded-2xl border border-dashed border-border bg-card py-12"
        />
      ) : history.length ? (
        <>
          <section className="animate-fade-in-up animate-delay-100">
            {currentStatus && <StatusStepper currentStatus={currentStatus} />}
          </section>
          <section className="animate-fade-in-up animate-delay-200">
            <TrackingTimeline history={history} trackingNumber={trackingNumber ?? ''} />
          </section>
        </>
      ) : (
        <EmptyState title="No se encontró información para esta guía." />
      )}
    </div>
  )
}