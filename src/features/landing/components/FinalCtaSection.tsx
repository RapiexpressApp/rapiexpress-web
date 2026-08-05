import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { ArrowRight } from 'lucide-react'

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-5 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-4">
          ¿Listo para empezar?
        </h2>
        <p className="text-muted-foreground mb-8 md:mb-10 max-w-md mx-auto">
          Crea tu cuenta gratis y recibe tu dirección internacional en Miami en menos de 5 minutos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input type="email" placeholder="Tu correo electrónico" className="bg-brand-muted h-11" />
          <Link to="/register">
            <Button className="bg-accent hover:bg-accent-dark text-brand-dark h-11 px-6 w-full sm:w-auto whitespace-nowrap gap-2">
              Crear cuenta
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-4">Sin compromiso. Cancela cuando quieras.</p>
      </div>
    </section>
  )
}
