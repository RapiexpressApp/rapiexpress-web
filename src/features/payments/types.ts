export type PaymentStatus = 'Pagado' | 'Pendiente'

export interface Payment {
  id: string
  trackingNumber: string
  concept: string
  amount: number
  currency: string
  status: PaymentStatus
  date: string
}

export interface PaymentsOverview {
  currency: string
  pendingTotal: number
  payments: Payment[]
}
