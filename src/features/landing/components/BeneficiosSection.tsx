import { HeadphonesIcon, ShieldCheck, TrendingUp, Warehouse } from 'lucide-react'
import { SectionHeading } from '@/shared/components/layout/SectionHeading'

const features = [
  {
    icon: TrendingUp,
    title: 'Tracking en tiempo real',
    desc: 'Sigue cada paso de tu paquete desde que llega a Miami hasta que lo recibes.',
  },
  {
    icon: Warehouse,
    title: 'Consolidación gratuita',
    desc: 'Agrupa varias compras en un solo envío y ahorra en costos internacionales.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad garantizada',
    desc: 'Cada paquete está asegurado durante todo el proceso de transporte.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Soporte dedicado',
    desc: 'Atención personalizada vía WhatsApp, chat y teléfono en horario extendido.',
  },
]

export function BeneficiosSection() {
  return (
    <section id="beneficios" className="py-16 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Beneficios"
          title="Por qué elegir Rapiexpress"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-brand-muted p-5 sm:p-6 hover:shadow-md hover:border-brand-light/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/15 transition-colors">
                  <Icon size={22} className="text-brand" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-semibold text-brand-dark mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
