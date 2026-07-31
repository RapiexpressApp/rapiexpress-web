import { usePackages } from '@/features/packages/hooks/usePackages'
import { useLocker } from '@/features/locker/hooks/useLocker'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { LockerInfoCard } from '@/features/locker/components/LockerInfoCard'
import { useSession } from '@/features/auth/hooks/useSession'
import { Button } from '@/shared/components/ui/button'

export default function DashboardPage() {
  const { user, logout } = useSession()
  const { data: packagesData, isLoading: packagesLoading } = usePackages()
  const { data: lockerData, isLoading: lockerLoading } = useLocker()

  return (
    <div className="min-h-screen p-4 max-w-5xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mis Paquetes</h1>
          <p className="text-sm text-muted-foreground">{user?.name}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          Cerrar sesión
        </Button>
      </header>

      <section>
        {lockerLoading ? (
          <p className="text-sm text-muted-foreground">Cargando casillero...</p>
        ) : lockerData?.data ? (
          <LockerInfoCard locker={lockerData.data} />
        ) : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {packagesLoading ? (
          <p className="text-sm text-muted-foreground col-span-full">
            Cargando paquetes...
          </p>
        ) : packagesData?.data?.length ? (
          packagesData.data.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground col-span-full">
            No hay paquetes registrados.
          </p>
        )}
      </section>
    </div>
  )
}
