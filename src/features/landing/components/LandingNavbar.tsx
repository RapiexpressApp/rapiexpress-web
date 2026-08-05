import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { ChevronRight, Home, Mail, MessageCircle, X } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Logo } from '@/shared/components/layout/Logo'
import { navLinks } from '../data'

interface LandingNavbarProps {
  mobileMenuOpen: boolean
  onMenuChange: (open: boolean) => void
}

const drawerItems = [
  { label: 'Inicio', href: '#inicio', icon: Home },
  ...navLinks,
]

export function LandingNavbar({ mobileMenuOpen, onMenuChange }: LandingNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerCloseRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => onMenuChange(false), [onMenuChange])
  const isLight = scrolled || mobileMenuOpen

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const link of navLinks) {
      const el = document.getElementById(link.href.slice(1))
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
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
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen, closeMenu])

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

  function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    closeMenu()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          isLight
            ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-border'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-5 h-16 md:h-20">
          <Logo to="/" />

          <nav className="hidden md:flex items-center gap-4 xl:gap-7">
            {navLinks.map((link) => {
              const active = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:transition-all after:duration-300 after:content-[""]',
                    isLight
                      ? 'text-brand-dark/80 hover:text-brand-dark after:bg-accent'
                      : 'text-white/85 hover:text-white after:bg-accent-light',
                    active ? 'after:w-full' : 'after:w-0 hover:after:w-full',
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'transition-colors duration-200',
                  isLight
                    ? 'text-brand-dark hover:bg-brand-muted hover:text-brand-dark'
                    : 'text-white border border-white/25 bg-white/10 hover:bg-white/20 hover:text-white',
                )}
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
              className={cn(
                'relative flex items-center justify-center w-11 h-11 -mr-2 rounded-lg transition-colors',
                isLight ? 'text-brand-dark hover:bg-brand-muted' : 'text-white hover:bg-white/10',
              )}
              onClick={() => onMenuChange(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={cn(
                  'absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  mobileMenuOpen ? 'rotate-45' : '-translate-y-[3px]',
                )}
              />
              <span
                className={cn(
                  'absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  mobileMenuOpen ? '-rotate-45' : 'translate-y-[3px]',
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop para cerrar el drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[55] bg-brand-dark/50 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={cn(
          'fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 sm:px-5 border-b border-border">
          <Logo to="/" className="h-8" />
          <button
            ref={drawerCloseRef}
            className="flex items-center justify-center w-11 h-11 -mr-2 rounded-lg text-brand-dark hover:bg-brand-muted transition-colors"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-5 pt-6 pb-2">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
            Navegación
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {drawerItems.map((link, i) => {
            const Icon = link.icon
            const active = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={link.href === '#inicio' ? scrollToTop : closeMenu}
                style={{ transitionDelay: `${mobileMenuOpen ? 50 + i * 45 : 0}ms` }}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-3.5 py-3.5 transition-all duration-300 ease-out',
                  mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
                  active ? 'bg-brand-muted' : 'hover:bg-brand-muted',
                )}
              >
                <span className="flex items-center gap-3.5">
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200',
                      active
                        ? 'bg-brand text-white shadow-md shadow-brand/25'
                        : 'bg-brand-muted text-brand group-hover:bg-brand/10',
                    )}
                  >
                    <Icon size={19} strokeWidth={1.75} />
                  </span>
                  <span
                    className={cn(
                      'text-[15px] font-medium',
                      active ? 'text-brand-dark' : 'text-brand-dark/85',
                    )}
                  >
                    {link.label}
                  </span>
                </span>
                <ChevronRight
                  size={18}
                  className={cn(
                    'transition-all duration-300 group-hover:translate-x-1',
                    active ? 'text-brand' : 'text-muted-foreground group-hover:text-brand',
                  )}
                />
              </a>
            )
          })}
        </nav>

        {/* Contact card */}
        <div
          style={{ transitionDelay: `${mobileMenuOpen ? 50 + drawerItems.length * 45 : 0}ms` }}
          className={cn(
            'px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-out',
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark via-brand-mid to-brand p-5 text-white">
            <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-accent/15 blur-2xl" />
            <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-brand-light/20 blur-2xl" />
            <div className="relative">
              <p className="font-heading text-base font-semibold">¿Necesitas ayuda?</p>
              <p className="mt-1 text-sm text-white/70">Estamos disponibles 24/7, todos los días.</p>
              <div className="mt-4 space-y-2.5">
                <a
                  href="https://wa.me/13055550123"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm font-medium text-white/90 hover:text-accent transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <MessageCircle size={16} />
                  </span>
                  +1 (305) 555-0123
                </a>
                <a
                  href="mailto:hola@rapiexpress.com"
                  className="flex items-center gap-2.5 text-sm font-medium text-white/90 hover:text-accent transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <Mail size={16} />
                  </span>
                  hola@rapiexpress.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
