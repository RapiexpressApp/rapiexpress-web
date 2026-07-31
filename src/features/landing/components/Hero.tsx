import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { ArrowRight, Plane } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-svh flex items-center bg-gradient-to-br from-brand-dark via-brand-mid to-brand pt-16 md:pt-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-light/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
        >
          <circle cx="200" cy="400" r="120" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="500" cy="300" r="180" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="800" cy="500" r="100" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="200" y1="400" x2="500" y2="300" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <line x1="500" y1="300" x2="800" y2="500" stroke="white" strokeWidth="0.5" opacity="0.3" />
        </svg>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-5 py-16 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-accent text-xs font-medium mb-6 sm:mb-8 animate-fade-in-up">
            <Plane size={14} />
            Envíos desde USA y China a Ecuador
          </div>

          <h1 className="font-heading text-[2.5rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-5 sm:mb-6 animate-fade-in-up animate-delay-100">
            Tu dirección en Miami.
            <br />
            <span className="text-accent">Compras sin fronteras.</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 sm:mb-10 animate-fade-in-up animate-delay-200 leading-relaxed">
            Recibe tus paquetes de tiendas en USA y China directo a Ecuador.
            Abre tu casillero internacional gratis y empieza a comprar hoy.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full animate-fade-in-up animate-delay-300">
            <Link to="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-brand-dark px-8 text-base shadow-lg shadow-accent/25 gap-2"
              >
                Abrir cuenta gratis
                <ArrowRight size={18} />
              </Button>
            </Link>
            <a href="#como-funciona" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white px-8 text-base"
              >
                Cómo funciona
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
