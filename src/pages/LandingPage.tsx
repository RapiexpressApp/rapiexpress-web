import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  Package,
  MapPin,
  Globe,
  TrendingUp,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
  ChevronRight,
  X,
  Truck,
  Warehouse,
  Plane,
  Ship,
} from 'lucide-react'

const navLinks = [
  { label: 'Cómo funciona', href: '#como-funciona', icon: Plane },
  { label: 'Beneficios', href: '#beneficios', icon: TrendingUp },
  { label: 'Cobertura', href: '#cobertura', icon: Globe },
]

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

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMobileCta, setShowMobileCta] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
      setShowMobileCta(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  const initialRender = useRef(true)
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    if (mobileMenuOpen) {
      drawerCloseRef.current?.focus()
    } else {
      hamburgerRef.current?.focus()
    }
  }, [mobileMenuOpen])

  return (
    <div className="overflow-hidden">
      {/* ─── Navbar ─── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-5 h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <img src="/logo.webp" alt="Rapiexpress" className="h-8 sm:h-9 md:h-11 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:transition-all after:duration-300 after:content-[''] ${
                  scrolled || mobileMenuOpen
                    ? 'text-brand-dark/80 hover:text-brand-dark after:bg-accent hover:after:w-full'
                    : 'text-white/85 hover:text-white after:bg-accent-light hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className={`transition-colors duration-200 ${
                  scrolled || mobileMenuOpen
                    ? 'text-brand-dark hover:bg-brand-muted hover:text-brand-dark'
                    : 'text-white border border-white/25 bg-white/10 hover:bg-white/20 hover:text-white'
                }`}
              >
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-accent hover:bg-accent-dark text-brand-dark shadow-sm">
                Registrarse
              </Button>
            </Link>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-1.5">
            <Link to="/register">
              <Button
                size="sm"
                className="h-9 rounded-lg bg-accent hover:bg-accent-dark text-brand-dark shadow-sm"
              >
                Registrarse
              </Button>
            </Link>
            <button
              ref={hamburgerRef}
              className={`relative flex items-center justify-center w-11 h-11 -mr-2 rounded-lg transition-colors ${
                scrolled || mobileMenuOpen
                  ? 'text-brand-dark hover:bg-brand-muted'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45' : '-translate-y-[3px]'
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45' : 'translate-y-[3px]'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop para cerrar el drawer */}
      <div
        className={`fixed inset-0 z-[55] bg-brand-dark/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 sm:px-5 border-b border-border">
          <img src="/logo.webp" alt="Rapiexpress" className="h-8 w-auto" />
          <button
            ref={drawerCloseRef}
            className="flex items-center justify-center w-11 h-11 -mr-2 rounded-lg text-brand-dark hover:bg-brand-muted transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-brand-muted"
              >
                <span className="flex items-center gap-3.5 text-base font-medium text-brand-dark">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-muted text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  {link.label}
                </span>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                />
              </a>
            )
          })}
        </nav>

        <div className="border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-3">
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="outline" size="lg" className="w-full">
              Iniciar sesión
            </Button>
          </Link>
          <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
            <Button size="lg" className="w-full bg-accent hover:bg-accent-dark text-brand-dark shadow-sm">
              Abrir cuenta gratis
              <ArrowRight size={16} />
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-2 pt-1.5 text-xs text-muted-foreground">
            <HeadphonesIcon size={14} className="text-accent-dark" />
            WhatsApp: +1 (305) 555-0123
          </div>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="relative min-h-svh flex items-center bg-gradient-to-br from-brand-dark via-brand-mid to-brand pt-16 md:pt-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-light/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1000 800" preserveAspectRatio="none">
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
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-brand-dark px-8 text-base shadow-lg shadow-accent/25 gap-2">
                  Abrir cuenta gratis
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#como-funciona" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white px-8 text-base">
                  Cómo funciona
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-brand-muted border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: '+10,000', label: 'Paquetes entregados' },
            { value: '99.8%', label: 'Satisfacción' },
            { value: '3', label: 'Países conectados' },
            { value: '24/7', label: 'Soporte' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl md:text-3xl font-bold text-brand-dark">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Cómo funciona ─── */}
      <section id="como-funciona" className="py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-3">Cómo funciona</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
              Tu paquete, desde la tienda hasta tu casa
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-4 md:gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-light/40 via-accent/60 to-brand-light/40" />

            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="relative flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                  <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-md border border-border flex items-center justify-center mb-5 md:mb-6">
                    <Icon size={28} className="text-brand" strokeWidth={1.5} />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-brand-dark text-xs font-bold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="beneficios" className="py-16 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-3">Beneficios</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
              Por qué elegir Rapiexpress
            </h2>
          </div>

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

      {/* ─── Coverage ─── */}
      <section id="cobertura" className="py-16 md:py-28 bg-gradient-to-br from-brand-dark via-brand-mid to-brand-dark relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-brand-light/5 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-3">Cobertura</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
              Conectamos tres continentes para ti
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-12 items-center">
            {[
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
            ].map((place) => (
              <div key={place.title} className="text-center text-white/90 p-6 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <span className="text-5xl block mb-4">{place.flag}</span>
                <h3 className="font-heading font-semibold text-xl text-white mb-2">{place.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{place.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <Link to="/register" className="block sm:inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-brand-dark px-8 text-base shadow-lg gap-2">
                Abrir cuenta gratis
                <ChevronRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-16 md:py-28 bg-brand-muted">
        <div className="max-w-xl mx-auto px-4 sm:px-5 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-muted-foreground mb-8 md:mb-10 max-w-md mx-auto">
            Crea tu cuenta gratis y recibe tu dirección internacional en Miami en menos de 5 minutos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              className="bg-white h-11"
            />
            <Link to="/register">
              <Button className="bg-accent hover:bg-accent-dark text-brand-dark h-11 px-6 w-full sm:w-auto whitespace-nowrap gap-2">
                Crear cuenta
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Sin compromiso. Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-brand-dark text-white/70 border-t border-white/10 pb-24 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-14">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <Link to="/" className="font-heading text-xl font-bold text-white">Rapiexpress</Link>
              <p className="text-sm mt-3 max-w-xs leading-relaxed">
                Tu casillero internacional en Miami. Compra en USA y China con la confianza de recibir tus paquetes directo en Ecuador.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white text-sm mb-4">Enlaces</h4>
              <ul className="space-y-2.5 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-accent transition-colors">{link.label}</a>
                  </li>
                ))}
                <li><Link to="/login" className="hover:text-accent transition-colors">Iniciar sesión</Link></li>
                <li><Link to="/register" className="hover:text-accent transition-colors">Registrarse</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white text-sm mb-4">Contacto</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2">
                  <HeadphonesIcon size={14} className="text-accent-light shrink-0" />
                  hola@rapiexpress.com
                </li>
                <li className="flex items-center gap-2">
                  <Truck size={14} className="text-accent-light shrink-0" />
                  WhatsApp: +1 (305) 555-0123
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-accent-light shrink-0 mt-0.5" />
                  <span>Miami, FL · Quito · Guayaquil</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>© {new Date().getFullYear()} Rapiexpress. Todos los derechos reservados.</p>
            <p className="text-white/40">Hecho con ❤️ en Ecuador 🇪🇨</p>
          </div>
        </div>
      </footer>

      {/* ─── Mobile sticky CTA ─── */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-300 ease-out ${
          showMobileCta && !mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white/95 backdrop-blur border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Link to="/register" className="block">
            <Button size="lg" className="w-full bg-accent hover:bg-accent-dark text-brand-dark shadow-md gap-2">
              Abrir cuenta gratis
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
