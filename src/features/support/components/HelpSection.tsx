// =====================================================================
// DATOS DE CONTACTO DE DEMOSTRACIÓN
// Reemplazar teléfono y correo reales cuando estén definidos.
// =====================================================================
import { Clock, HelpCircle, Mail, MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/593991234567'
const SUPPORT_EMAIL = 'soporte@rapiexpress.com'

export function HelpSection() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="space-y-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MessageCircle size={16} />
          Escríbenos por WhatsApp
        </a>

        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3">
            <Mail size={15} className="shrink-0 text-brand-light" />
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="truncate text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Clock size={15} className="shrink-0 text-brand-light" />
            <span className="text-muted-foreground">
              Lun a Vie 9:00–18:00 · Sáb 9:00–13:00
            </span>
          </li>
          <li className="flex items-center gap-3">
            <HelpCircle size={15} className="shrink-0 text-brand-light" />
            <a
              href="/#preguntas-frecuentes"
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              Preguntas frecuentes
            </a>
          </li>
        </ul>

        <p className="rounded-xl border border-dashed border-border bg-paper p-3 text-xs leading-relaxed text-muted-foreground">
          Para compras en tiendas de USA o China, usa siempre tu dirección de
          casillero en Miami con tu código personal.
        </p>
      </div>
    </div>
  )
}
