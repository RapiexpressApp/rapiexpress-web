import { useLocker } from '@/features/locker/hooks/useLocker'
import { LockerInfoCard } from '@/features/locker/components/LockerInfoCard'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { ErrorState } from '@/shared/components/feedback/ErrorState'

export default function LockerPage() {
  const { data, isLoading, isError, refetch } = useLocker()

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="animate-fade-in-up">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
          Casillero internacional
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Tu dirección en Miami
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Usa esta dirección cuando compres en tus tiendas favoritas de USA y China.
          Recuerda incluir siempre tu código de casillero para que podamos identificar tu carga.
        </p>
      </header>

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
