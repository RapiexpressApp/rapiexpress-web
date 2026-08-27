import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { SectionHeading } from '@/shared/components/layout/SectionHeading'

const stores = [
  {
    name: 'Amazon',
    href: 'https://www.amazon.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/kkkk-AR0Vqww9NeFZP4po.png',
  },
  {
    name: 'Walmart',
    href: 'https://www.walmart.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/iklll-m2WrWpPGwjHO7yJ9.png',
  },
  {
    name: 'Target',
    href: 'https://www.target.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/ollll-m7VkVwBnoeho1gEP.png',
  },
  {
    name: 'eBay',
    href: 'https://www.ebay.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/hhhh-mjE5EvEMzJhZMLa6.png',
  },
  {
    name: 'Temu',
    href: 'https://www.temu.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/jjh-AwvPvMXZnMfoVRPK.png',
  },
  {
    name: 'SHEIN',
    href: 'https://www.shein.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/uiuiuiui-Aq2N2vZeMptMk2RV.png',
  },
  {
    name: "Victoria's Secret",
    href: 'https://www.victoriassecret.com/us/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/ghhhhnn-m2WrWpgWxMH9o5P0.png',
  },
  {
    name: 'Sephora',
    href: 'https://www.sephora.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/uiuiuui-YNqNqy97Q4I2O2lx.png',
  },
  {
    name: 'Bath & Body Works',
    href: 'https://www.bathandbodyworks.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/iiii-mp878vNp7yHpvD6v.png',
  },
  {
    name: 'GAP',
    href: 'https://www.gap.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/hfghfgh-YKbNb69jvPu8B1aD.png',
  },
  {
    name: "Carter's",
    href: 'https://www.carters.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/cdfdfdf-YZ9X9brnjos61Bxa.png',
  },
  {
    name: "The Children's Place",
    href: 'https://www.childrensplace.com/us/home',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/gggg-AGBvBnr1j4t8D53b.png',
  },
  {
    name: 'Aéropostale',
    href: 'https://www.aeropostale.com/',
    logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=416,h=142,fit=crop/AzGDnLb4E2fvvbX1/hhhhh-AVLNL1DR4nuE4qNe.png',
  },
]

export function TiendasSection() {
  return (
    <section id="tiendas" className="py-16 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Tus tiendas favoritas"
          title={
            <>
              Dale clic y disfruta de las ofertas de{' '}
              <span className="text-brand">tus tiendas favoritas</span>
            </>
          }
          description="Compra en las tiendas de USA que ya conoces y recibe todo en tu casillero de Miami."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {stores.map((store, i) => (
            <a
              key={store.name}
              href={store.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label={`Comprar en ${store.name}`}
              className="group flex h-20 animate-fade-in-up items-center justify-center rounded-xl border border-border bg-card px-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg sm:h-24"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <img
                src={store.logo}
                alt={`Logo de ${store.name}`}
                loading="lazy"
                className="max-h-10 w-auto max-w-[7.5rem] object-contain opacity-75 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-12"
              />
            </a>
          ))}
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Link to="/register" className="block sm:inline-block w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-brand-dark px-8 text-base shadow-lg shadow-accent/25 gap-2"
            >
              Crea tu casillero gratis aquí
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
