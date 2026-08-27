import type { LucideIcon } from 'lucide-react'
import { Building2, Globe, HelpCircle, Plane, ShoppingBag, TrendingUp } from 'lucide-react'

export interface NavLink {
  label: string
  href: string
  icon: LucideIcon
}

export const navLinks: NavLink[] = [
  { label: 'Nosotros', href: '#nosotros', icon: Building2 },
  { label: 'Cómo funciona', href: '#como-funciona', icon: Plane },
  { label: 'Beneficios', href: '#beneficios', icon: TrendingUp },
  { label: 'Cobertura', href: '#cobertura', icon: Globe },
  { label: 'Tiendas', href: '#tiendas', icon: ShoppingBag },
  { label: 'FAQ', href: '#preguntas-frecuentes', icon: HelpCircle },
]

export const stats = [
  { value: '+10,000', label: 'Paquetes entregados' },
  { value: '99.8%', label: 'Satisfacción' },
  { value: '3', label: 'Países conectados' },
  { value: '24/7', label: 'Soporte' },
]
