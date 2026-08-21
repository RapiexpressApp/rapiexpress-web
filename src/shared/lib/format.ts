export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'short',
  })
}
