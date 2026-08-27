import { Calculator } from 'lucide-react'
import { QuoteCalculator } from '@/features/quote/components/QuoteCalculator'
import { PageHeader } from '@/shared/components/layout/PageHeader'

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        eyebrow="Tarifas y estimaciones"
        title="Cotiza tu envío"
        description="Antes de comprar, estima cuánto te costará traer tu paquete desde USA o China hasta Ecuador."
        icon={Calculator}
      />

      <section className="animate-fade-in-up animate-delay-100">
        <QuoteCalculator />
      </section>
    </div>
  )
}
