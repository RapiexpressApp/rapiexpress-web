import { Box } from 'lucide-react'
import { useLocker } from '@/features/locker/hooks/useLocker'
import { LockerInfoCard } from '@/features/locker/components/LockerInfoCard'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { ErrorState } from '@/shared/components/feedback/ErrorState'
import { PageHeader } from '@/shared/components/layout/PageHeader'

export default function LockerPage() {
  const { data, isLoading, isError, refetch } = useLocker()

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        eyebrow="Casillero internacional"
        title="Tu dirección en Miami"
        description="Usa esta dirección cuando compres en tus tiendas favoritas de USA y China. Recuerda incluir siempre tu código de casillero para que podamos identificar tu carga."
        icon={Box}
      />

      <section className="animate-fade-in-up animate-delay-100">
        {isLoading ? (
          <LoadingState label="Cargando casillero..." />
        ) : isError ? (
          <ErrorState
            title="No pudimos cargar tu casillero."
            description="Verifica tu conexión e intenta de nuevo."
            onRetry={() => void refetch()}
          />
        ) : data?.data ? (
          <LockerInfoCard locker={data.data} />
        ) : null}
      </section>
    </div>
  )
}
