import type { QuoteBreakdown, QuoteInput, RateTable } from '../types'

export function calculateQuote(
  input: QuoteInput,
  table: RateTable,
): QuoteBreakdown | null {
  const category = table.categories.find((c) => c.id === input.categoryId)
  const destination = table.destinations.find((d) => d.id === input.destinationId)

  if (
    !category ||
    !destination ||
    !Number.isFinite(input.weightKg) ||
    input.weightKg <= 0
  ) {
    return null
  }

  const byWeight = category.perKg * input.weightKg
  const freight = Math.max(byWeight, category.minFee)

  return {
    freight,
    minFeeApplied: byWeight < category.minFee,
    handlingFee: table.handlingFee,
    deliverySurcharge: destination.surcharge,
    total: freight + table.handlingFee + destination.surcharge,
  }
}
