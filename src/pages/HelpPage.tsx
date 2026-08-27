import { LifeBuoy } from 'lucide-react'
import { HelpSection } from '@/features/support/components/HelpSection'
import { PageHeader } from '@/shared/components/layout/PageHeader'

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        eyebrow="Soporte"
        title="Ayuda y contacto"
        description="¿Dudas con tu compra, tu casillero o una guía en camino? Estamos para ayudarte."
        icon={LifeBuoy}
      />

      <section className="animate-fade-in-up animate-delay-100">
        <HelpSection />
      </section>
    </div>
  )
}
