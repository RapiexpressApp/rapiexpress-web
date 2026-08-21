import { usePackages } from '@/features/packages/hooks/usePackages'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { PackageSummaryCards } from '@/features/packages/components/PackageSummaryCards'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { EmptyState } from '@/shared/components/feedback/EmptyState'
import { ErrorState } from '@/shared/components/feedback/ErrorState'
import { useSession } from '@/features/auth/hooks/useSession'

export default function DashboardPage() {
  const {
    data: packagesData,
    isLoading: packagesLoading,
    isError: packagesError,
    refetch: refetchPackages,
  } = usePackages()
  const { user } = useSession()

  const firstName = user?.name?.split(/\s+/)[0] ?? 'viajero'
  const packages = packagesData?.data ?? []

  return (
    <div className="space-y-8">
      <header className="animate-fade-in-up">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
          Panel del cliente
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Hola, {firstName}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Un vistazo a las guías que están en camino desde Miami hasta Ecuador.
        </p>
      </header>

      <section className="animate-fade-in-up animate-delay-100">
        {packagesLoading ? (
          <LoadingState label="Calculando resumen..." />
        ) : packagesError ? (
          <ErrorState
            title="No pudimos cargar tu resumen."
            onRetry={() => void refetchPackages()}
          />
        ) : (
          <PackageSummaryCards packages={packages} />
        )}
      </section>

      <section className="animate-fade-in-up animate-delay-200">
        <div className="flex items-baseline justify-between">
          <h2 className="font-heading text-base font-bold text-ink">Mis paquetes</h2>
          <span className="font-mono text-xs text-muted-foreground">
            {packages.length} guía{packages.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="mt-3">
          {packagesLoading ? (
            <LoadingState label="Cargando paquetes..." />
          ) : packagesError ? (
            <ErrorState
              title="No pudimos cargar tus paquetes."
              description="Verifica tu conexión e intenta de nuevo."
              onRetry={() => void refetchPackages()}
              className="rounded-2xl border border-dashed border-border bg-card py-12"
            />
          ) : packages.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {packages.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${200 + i * 70}ms` }}
                >
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No hay paquetes registrados."
              description="Cuando hagas una compra en USA o China, aquí verás el resumen de tu envío y podrás rastrearlo paso a paso."
              className="rounded-2xl border border-dashed border-border bg-card py-12"
            />
          )}
        </div>
      </section>
    </div>
  )
}
