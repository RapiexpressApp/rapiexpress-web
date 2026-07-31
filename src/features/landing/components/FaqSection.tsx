import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const faqs = [
  {
    q: '¿Qué es un casillero internacional y cómo funciona?',
    a: 'Es una dirección física en Miami que te asignamos al crear tu cuenta gratis. Compras en cualquier tienda de USA o China usando esa dirección, nosotros recibimos tu paquete, lo consolidamos y lo enviamos hasta tu puerta en Ecuador.',
  },
  {
    q: '¿Cuánto tarda mi paquete en llegar a Ecuador?',
    a: 'El tiempo promedio es de 7 a 12 días hábiles desde que tu paquete llega a nuestro casillero en Miami, dependiendo de la ciudad de destino y el método de envío que elijas.',
  },
  {
    q: '¿Cómo puedo rastrear mi envío?',
    a: 'Con tu número de guía puedes seguir tu paquete en tiempo real desde tu cuenta. Te notificamos en cada cambio de estado: bodega, embarcado, aduana, agencia y entrega.',
  },
  {
    q: '¿Cuánto cuesta enviar mis paquetes?',
    a: 'El costo se calcula según el peso y volumen de tu paquete. La consolidación y el reempaque son gratuitos, y publicamos nuestras tarifas de forma transparente antes de cada envío.',
  },
  {
    q: '¿Qué productos puedo comprar y cuáles no?',
    a: 'Puedes comprar casi cualquier producto: ropa, electrónica, cosméticos, accesorios y más. Solo están restringidos los artículos prohibidos por la ley ecuatoriana o la aduana, y te los informamos al momento de registrar tu compra.',
  },
  {
    q: '¿Qué pasa si mi paquete llega dañado o se pierde?',
    a: 'Todos los envíos están asegurados desde que llegan a Miami hasta su entrega. Si algo sale mal, nuestro equipo gestiona tu reclamo y te compensamos según la política de la empresa.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="preguntas-frecuentes" className="py-16 md:py-28 bg-brand-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-5">
        <div className="text-center mb-12 md:mb-14">
          <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
            Resolvemos tus dudas
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openIndex === i
            return (
              <div
                key={faq.q}
                className={cn(
                  'rounded-2xl border bg-white transition-all duration-300',
                  open ? 'border-brand-light/40 shadow-md' : 'border-border shadow-sm',
                )}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={cn(
                      'font-heading font-semibold text-sm md:text-[15px] transition-colors',
                      open ? 'text-brand-dark' : 'text-brand-dark/90',
                    )}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                      open ? 'rotate-180 bg-accent text-brand-dark' : 'bg-brand-muted text-brand',
                    )}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            ¿No encontraste tu respuesta?{' '}
            <a
              href="https://wa.me/13055550123"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand hover:text-brand-dark hover:underline"
            >
              Escríbenos por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
