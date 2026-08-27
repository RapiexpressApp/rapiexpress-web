import { BadgeCheck, Star } from 'lucide-react'
import { SectionHeading } from '@/shared/components/layout/SectionHeading'

const reviews = [
  {
    name: 'María Fernanda R.',
    initials: 'MF',
    city: 'Guayaquil',
    rating: 5,
    text: 'Pensé que sería complicado comprar en Amazon desde Guayaquil, pero con Rapiexpress todo fue fácil. Mi dirección en Miami llegó al instante y pude rastrear mi paquete en cada paso.',
  },
  {
    name: 'Gabriela S.',
    initials: 'GS',
    city: 'Cuenca',
    rating: 5,
    text: 'Traigo ropa de Carter\u2019s y GAP para mis hijos. El envío salió justo de precio y llegó antes de lo esperado. Ya no compro en tiendas de USA sin casillero.',
  },
  {
    name: 'Carlos A.',
    initials: 'CA',
    city: 'Quito',
    rating: 4,
    text: 'Excelente atención por WhatsApp. Me guiaron con un pedido de China que tenía dudas de aduana y llegó todo completo. Muy recomendado.',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-accent text-accent' : 'text-white/20'}
          aria-hidden
        />
      ))}
    </div>
  )
}

export function ResenasSection() {
  return (
    <section
      id="resenas"
      className="relative py-16 md:py-28 bg-gradient-to-br from-brand-dark via-brand-mid to-brand-dark"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 right-16 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-light/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Reseñas"
          title="Lo que dicen nuestros viajeros"
          description="Miles de ecuatorianos ya compran en USA y China con su casillero Rapiexpress."
          inverted
        />

        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:-mt-6 md:mb-12">
          <span className="font-heading text-3xl font-bold text-accent">4.9</span>
          <Stars rating={5} />
          <span className="text-sm text-white/60">· +1,200 clientes satisfechos</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {reviews.map((review, i) => (
            <figure
              key={review.name}
              className="flex animate-fade-in-up flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.08]"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <Stars rating={review.rating} />
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300/90">
                  <BadgeCheck size={13} />
                  Compra verificada
                </span>
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/80">
                “{review.text}”
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-brand-dark">
                  {review.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{review.name}</p>
                  <p className="text-xs text-white/50">{review.city}, Ecuador</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
