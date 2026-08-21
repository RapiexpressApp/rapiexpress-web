import { HelpSection } from '@/features/support/components/HelpSection'

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="animate-fade-in-up">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
          Soporte
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Ayuda y contacto
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          ¿Dudas con tu compra, tu casillero o una guía en camino? Estamos para
          ayudarte.
        </p>
      </header>

      <section className="animate-fade-in-up animate-delay-100">
        <HelpSection />
      </section>
    </div>
  )
}
