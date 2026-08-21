import { PaymentsSection } from '@/features/payments/components/PaymentsSection'

export default function PaymentsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="animate-fade-in-up">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
          Estado de cuenta
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Pagos y saldos
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Revisa tu saldo pendiente y el historial de pagos de tus guías.
        </p>
      </header>

      <section className="animate-fade-in-up animate-delay-100">
        <PaymentsSection />
      </section>
    </div>
  )
}
