import { Globe, MapPin, Package, Ship } from 'lucide-react'

const steps = [
  {
    icon: Package,
    title: 'Regístrate gratis',
    desc: 'Crea tu cuenta en minutos sin costo. Solo necesitas tu cédula o RUC.',
  },
  {
    icon: MapPin,
    title: 'Recibe tu dirección en Miami',
    desc: 'Te asignamos un casillero internacional con dirección física en Miami.',
  },
  {
    icon: Globe,
    title: 'Compra en USA y China',
    desc: 'Usa tu dirección de Miami para comprar en cualquier tienda online.',
  },
  {
    icon: Ship,
    title: 'Recibe en Ecuador',
    desc: 'Consolidamos, empacamos y enviamos tus paquetes directo a tu puerta.',
  },
]

export function ComoFuncionaSection() {
  return (
    <section id="como-funciona" className="py-16 md:py-28 bg-brand-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
          <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            Cómo funciona
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
            Tu paquete, desde la tienda hasta tu casa
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-4 md:gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-light/40 via-accent/60 to-brand-light/40" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-md border border-border flex items-center justify-center mb-5 md:mb-6">
                  <Icon size={28} className="text-brand" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-brand-dark text-xs font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
