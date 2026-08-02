import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { ChevronRight } from 'lucide-react'

const places = [
  {
    flag: '🇺🇸',
    title: 'USA',
    desc: 'New York, Miami, Los Ángeles. Compra en Amazon, Walmart, Target y más.',
  },
  {
    flag: '🇨🇳',
    title: 'China',
    desc: 'Shenzhen, Shanghai, Beijing. Acceso a AliExpress, Shein, Alibaba.',
  },
  {
    flag: '🇪🇨',
    title: 'Ecuador',
    desc: 'Entrega puerta a puerta en Quito, Guayaquil, Cuenca y todo el país.',
  },
]

export function CoberturaSection() {
  return (
    <section
      id="cobertura"
      className="py-16 md:py-28 bg-gradient-to-br from-brand-dark via-brand-mid to-brand-dark relative"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-brand-light/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
          <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            Cobertura
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
            Conectamos tres paises para ti
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-12 items-center">
          {places.map((place) => (
            <div
              key={place.title}
              className="text-center text-white/90 p-6 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
            >
              <span className="text-5xl block mb-4">{place.flag}</span>
              <h3 className="font-heading font-semibold text-xl text-white mb-2">{place.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{place.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <Link to="/register" className="block sm:inline-block w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-brand-dark px-8 text-base shadow-lg gap-2"
            >
              Abrir cuenta gratis
              <ChevronRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
