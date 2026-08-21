export interface RateCategory {
  id: string
  label: string
  perKg: number
  minFee: number
}

export interface Destination {
  id: string
  label: string
  surcharge: number
}

export interface RateTable {
  currency: string
  handlingFee: number
  categories: RateCategory[]
  destinations: Destination[]
}

export interface QuoteInput {
  categoryId: string
  weightKg: number
  destinationId: string
}

export interface QuoteBreakdown {
  freight: number
  minFeeApplied: boolean
  handlingFee: number
  deliverySurcharge: number
  total: number
}
