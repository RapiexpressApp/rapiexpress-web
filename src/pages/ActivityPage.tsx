import { ActivityFeed } from '@/features/notifications/components/ActivityFeed'

export default function ActivityPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="animate-fade-in-up">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
          Notificaciones
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Actividad reciente
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Lo último de tus guías, pagos y cuenta en un solo lugar.
        </p>
      </header>

      <section className="animate-fade-in-up animate-delay-100">
        <ActivityFeed />
      </section>
    </div>
  )
}
