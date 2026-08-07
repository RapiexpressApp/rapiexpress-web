import { useState } from 'react'
import { Copy, Check, Hash } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { LockerInfo } from '../types'

interface LockerInfoCardProps {
  locker: LockerInfo
}

function Barcode() {
  const bars = [2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1]
  return (
    <div className="flex h-5 items-stretch overflow-hidden text-[3px] leading-none text-ink/60" aria-hidden>
      {bars.map((w, i) => (
        <span key={i} className="bg-current" style={{ width: `${w}px` }} />
      ))}
    </div>
  )
}

function buildAddress(locker: LockerInfo) {
  return [locker.address, `${locker.city}, ${locker.state} ${locker.zip}`, locker.country].join('\n')
}

export function LockerInfoCard({ locker }: LockerInfoCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildAddress(locker))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand/20 bg-card shadow-sm">
      <div className="relative bg-ink p-5 text-white">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="relative flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-sky-200/70">
              Casillero internacional
            </p>
            <h2 className="mt-0.5 font-heading text-lg font-bold text-white">
              Tu dirección en Miami
            </h2>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-yellow-400">
            <Hash size={16} />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <address className="font-mono text-sm leading-relaxed text-ink not-italic">
          <span className="block font-semibold">{locker.address}</span>
          <span className="text-muted-foreground">
            {locker.city}, {locker.state} {locker.zip}
          </span>
          <span className="block text-muted-foreground">{locker.country}</span>
        </address>

        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors',
            copied
              ? 'bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/30'
              : 'bg-brand text-white hover:bg-brand-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Copiado' : 'Copiar dirección'}
        </button>
      </div>

      {locker.instructions && (
        <div className="border-t border-dashed border-border px-5 py-3">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <span className="mt-0.5 font-mono text-brand-light">*</span>
            {locker.instructions}
          </p>
        </div>
      )}

      <div className="px-5 pb-4">
        <Barcode />
        <p className="mt-1 text-center font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground">
          Rapiexpress · Miami FL
        </p>
      </div>
    </div>
  )
}