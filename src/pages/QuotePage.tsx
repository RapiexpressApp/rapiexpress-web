import { QuoteCalculator } from '@/features/quote/components/QuoteCalculator'

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="animate-fade-in-up">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
          Tarifas y estimaciones
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Cotiza tu envío
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Antes de comprar, estima cuánto te costará traer tu paquete desde USA
          o China hasta Ecuador.
        </p>
      </header>

      <section className="animate-fade-in-up animate-delay-100">
        <QuoteCalculator />
      </section>
    </div>
  )
}
