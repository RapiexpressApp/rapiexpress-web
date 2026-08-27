import { Link } from 'react-router-dom'
import { Box, Calculator, Plane } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { usePackages } from '@/features/packages/hooks/usePackages'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { PackageSummaryCards } from '@/features/packages/components/PackageSummaryCards'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { EmptyState } from '@/shared/components/feedback/EmptyState'
import { ErrorState } from '@/shared/components/feedback/ErrorState'
import { useSession } from '@/features/auth/hooks/useSession'
import { useLocker } from '@/features/locker/hooks/useLocker'
import { LockerInfoCard } from '@/features/locker/components/LockerInfoCard'

function greetingFor(date: Date) {
  const hour = date.getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function formatToday(date: Date) {
  const formatted = new Intl.DateTimeFormat('es-EC', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export default function DashboardPage() {
  const {
    data: packagesData,
    isLoading: packagesLoading,
    isError: packagesError,
    refetch: refetchPackages,
  } = usePackages()
  const { user } = useSession()
  const {
    data: lockerData,
    isLoading: lockerLoading,
    isError: lockerError,
    refetch: refetchLocker,
  } = useLocker()

  const now = new Date()
  const firstName = user?.name?.split(/\s+/)[0] ?? 'viajero'
  const packages = packagesData?.data ?? []

  return (
    <div className="space-y-8">
      <header className="relative animate-fade-in-up overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark via-brand-mid to-brand text-white shadow-lg shadow-brand/25">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-light/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-6 hidden h-32 w-full md:block"
          viewBox="0 0 800 128"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M-20 108 C 180 24, 430 128, 620 48 S 790 20, 840 32"
            stroke="#facc15"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            className="animate-route-dash"
          />
        </svg>

        <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-accent backdrop-blur">
              <Plane size={12} />
              Panel del cliente
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {greetingFor(now)}, {firstName}
            </h1>
            <p className="mt-1.5 text-xs font-medium text-white/50">{formatToday(now)}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Un vistazo a las guías que están en camino desde Miami hasta Ecuador.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full bg-accent text-brand-dark shadow-lg shadow-accent/25 hover:bg-accent-dark"
            >
              <Link to="/locker">
                <Box size={16} />
                Mi casillero
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/cotizador">
                <Calculator size={16} />
                Cotizar envío
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="animate-fade-in-up animate-delay-100">
        {lockerLoading ? (
          <LoadingState label="Cargando tu casillero..." />
        ) : lockerError ? (
          <ErrorState
            title="No pudimos cargar tu casillero."
            description="Verifica tu conexión e intenta de nuevo."
            onRetry={() => void refetchLocker()}
          />
        ) : lockerData?.data ? (
          <LockerInfoCard locker={lockerData.data} />
        ) : null}
      </section>

      <section className="animate-fade-in-up animate-delay-200">
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

      <section className="animate-fade-in-up animate-delay-300">
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
            <div className="rounded-2xl border border-dashed border-border bg-card py-12">
              <EmptyState
                title="No hay paquetes registrados."
                description="Cuando hagas una compra en USA o China, aquí verás el resumen de tu envío y podrás rastrearlo paso a paso."
              />
              <div className="mt-5 flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-brand/20 text-brand hover:bg-brand-muted hover:text-brand-dark"
                >
                  <Link to="/locker">
                    <Box size={15} />
                    Ver mi casillero
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
