import { useMemo, useState } from 'react'
import { useRates } from '../hooks/useRates'
import { calculateQuote } from '../lib/calculate'
import { formatCurrency } from '@/shared/lib/format'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { ErrorState } from '@/shared/components/feedback/ErrorState'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Select } from '@/shared/components/ui/select'

export function QuoteCalculator() {
  const { data, isLoading, isError, refetch } = useRates()
  const rates = data?.data

  const [categoryId, setCategoryId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [weight, setWeight] = useState('1')

  const effectiveCategoryId = categoryId || rates?.categories[0]?.id || ''
  const effectiveDestinationId =
    destinationId || rates?.destinations[0]?.id || ''

  const quote = useMemo(() => {
    if (!rates) return null
    return calculateQuote(
      {
        categoryId: effectiveCategoryId,
        weightKg: Number(weight),
        destinationId: effectiveDestinationId,
      },
      rates,
    )
  }, [rates, effectiveCategoryId, effectiveDestinationId, weight])

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      {isLoading ? (
        <LoadingState label="Cargando tarifas..." />
      ) : isError ? (
        <ErrorState
          title="No pudimos cargar las tarifas."
          onRetry={() => void refetch()}
        />
      ) : rates ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quote-category">Categoría</Label>
              <Select
                id="quote-category"
                value={effectiveCategoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {rates.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-weight">Peso estimado (kg)</Label>
              <Input
                id="quote-weight"
                type="number"
                min="0.5"
                step="0.5"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-destination">Destino en Ecuador</Label>
            <Select
              id="quote-destination"
              value={effectiveDestinationId}
              onChange={(e) => setDestinationId(e.target.value)}
            >
              {rates.destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.label}
                </option>
              ))}
            </Select>
          </div>

          {quote ? (
            <div className="rounded-xl border border-brand/25 bg-brand-muted/60 p-4">
              <dl className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">
                    Tarifa por peso
                    {quote.minFeeApplied && ' (tarifa mínima)'}
                  </dt>
                  <dd className="font-mono text-ink">
                    {formatCurrency(quote.freight, rates.currency)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Manejo en bodega</dt>
                  <dd className="font-mono text-ink">
                    {formatCurrency(quote.handlingFee, rates.currency)}
                  </dd>
                </div>
                {quote.deliverySurcharge > 0 && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">
                      Entrega a domicilio
                    </dt>
                    <dd className="font-mono text-ink">
                      {formatCurrency(quote.deliverySurcharge, rates.currency)}
                    </dd>
                  </div>
                )}
              </dl>
              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-brand/20 pt-3">
                <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/70">
                  Total estimado
                </span>
                <span className="font-mono text-xl font-semibold text-brand-dark">
                  {formatCurrency(quote.total, rates.currency)}
                </span>
              </div>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border bg-paper p-4 text-sm text-muted-foreground">
              Ingresa un peso válido para ver la estimación.
            </p>
          )}

          <p className="text-xs leading-relaxed text-muted-foreground">
            * Estimación referencial. El precio final se calcula cuando tu
            paquete llega a nuestra bodega en Miami.
          </p>
        </div>
      ) : null}
    </div>
  )
}
