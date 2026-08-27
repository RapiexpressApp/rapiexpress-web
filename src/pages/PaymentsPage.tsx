import { Wallet } from 'lucide-react'
import { PaymentsSection } from '@/features/payments/components/PaymentsSection'
import { PageHeader } from '@/shared/components/layout/PageHeader'

export default function PaymentsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        eyebrow="Estado de cuenta"
        title="Pagos y saldos"
        description="Revisa tu saldo pendiente y el historial de pagos de tus guías."
        icon={Wallet}
      />

      <section className="animate-fade-in-up animate-delay-100">
        <PaymentsSection />
      </section>
    </div>
  )
}
