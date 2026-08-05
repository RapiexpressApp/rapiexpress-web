import { usePackages } from '@/features/packages/hooks/usePackages'
import { useLocker } from '@/features/locker/hooks/useLocker'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { LockerInfoCard } from '@/features/locker/components/LockerInfoCard'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { EmptyState } from '@/shared/components/feedback/EmptyState'

export default function DashboardPage() {
  const { data: packagesData, isLoading: packagesLoading } = usePackages()
  const { data: lockerData, isLoading: lockerLoading } = useLocker()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mis Paquetes</h1>
        <p className="text-sm text-muted-foreground">
          Resumen de tu casillero y tus envíos en camino.
        </p>
      </div>

      <section>
        {lockerLoading ? (
          <LoadingState label="Cargando casillero..." />
        ) : lockerData?.data ? (
          <LockerInfoCard locker={lockerData.data} />
        ) : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {packagesLoading ? (
          <LoadingState label="Cargando paquetes..." className="col-span-full" />
        ) : packagesData?.data?.length ? (
          packagesData.data.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))
        ) : (
          <div className="col-span-full py-8">
            <EmptyState
              title="No hay paquetes registrados."
              description="Cuando realices una compra, aquí verás el resumen de tus envíos."
            />
          </div>
        )}
      </section>
    </div>
  )
}