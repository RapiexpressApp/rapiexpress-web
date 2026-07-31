import { Globe, HeadphonesIcon, MapPin, Package, Plane, ShieldCheck, Warehouse } from 'lucide-react'

const journey = [
  { icon: Globe, label: 'Compra en USA o China' },
  { icon: Warehouse, label: 'Llega a tu casillero en Miami' },
  { icon: Package, label: 'Consolidamos y enviamos' },
  { icon: MapPin, label: 'Lo recibes en Ecuador' },
]

const reasons = [
  { icon: ShieldCheck, text: 'Paquetes asegurados en todo el trayecto' },
  { icon: Plane, text: 'Enviamos a todo el Ecuador' },
  { icon: Warehouse, text: 'Consolidación y reempaque gratis' },
  { icon: HeadphonesIcon, text: 'Atención en español todos los días' },
]

export function NosotrosSection() {
  return (
    <section id="nosotros" className="py-16 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-3">
              Quiénes somos
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-6">
              Compra en el mundo,
              <br className="hidden sm:block" /> recibe en tu casa
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Rapiexpress nació para romper la barrera de comprar online desde Ecuador. Con tu
              casillero físico en Miami, cualquier tienda de USA o China queda a un clic de
              distancia.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nos encargamos de la dirección, la consolidación y el envío puerta a puerta, para que
              tú solo pienses en qué quieres comprar.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {reasons.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-brand-dark/85">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Journey visual */}
          <div className="relative animate-fade-in-up animate-delay-200">
            <div className="absolute -inset-3 rotate-2 rounded-3xl bg-brand-muted" />
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark via-brand-mid to-brand p-7 md:p-9 text-white shadow-xl">
              <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-accent/15 blur-3xl" />
              <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-brand-light/20 blur-3xl" />
              <div className="relative">
                <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent mb-7">
                  Tu ruta en 4 pasos
                </p>
                <div className="relative">
                  <div className="absolute left-[22px] top-3 bottom-3 w-px border-l border-dashed border-white/25" />
                  <ul className="space-y-6">
                    {journey.map(({ icon: Icon, label }, i) => (
                      <li key={label} className="relative flex items-center gap-4">
                        <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <div>
                          <p className="text-xs text-white/50">Paso {i + 1}</p>
                          <p className="font-heading font-medium text-white/95">{label}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                  <span className="text-sm text-white/80">Tiempo promedio de entrega</span>
                  <span className="font-heading font-semibold text-accent">7–12 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
