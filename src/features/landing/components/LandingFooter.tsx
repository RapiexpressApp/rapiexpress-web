import { Link } from 'react-router-dom'
import { HeadphonesIcon, Mail, MapPin, MessageCircle } from 'lucide-react'
import { navLinks } from '../data'

export function LandingFooter() {
  return (
    <footer className="bg-brand-dark text-white/70 border-t border-white/10 pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="font-heading text-xl font-bold text-white">
              Rapiexpress
            </Link>
            <p className="text-sm mt-3 max-w-xs leading-relaxed">
              Tu casillero internacional en Miami. Compra en USA y China con la confianza de recibir
              tus paquetes directo en Ecuador.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Enlaces</h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/login" className="hover:text-accent transition-colors">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-accent transition-colors">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-accent-light shrink-0" />
                hola@rapiexpress.com
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="text-accent-light shrink-0" />
                WhatsApp: +1 (305) 555-0123
              </li>
              <li className="flex items-start gap-2">
                <HeadphonesIcon size={14} className="text-accent-light shrink-0 mt-0.5" />
                Soporte 24/7
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
  )
}
