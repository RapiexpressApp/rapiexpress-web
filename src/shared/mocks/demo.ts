// =====================================================================
// MOCK DE DEMOSTRACIÓN
// ---------------------------------------------------------------------
// Datos y respuestas de ejemplo para previsualizar el frontend SIN
// backend .NET. Reemplazar/eliminar cuando esté disponible la API real.
// NO copiar estas respuestas como contrato definitivo.
// =====================================================================

import type { Package, PackageStatus } from '@/features/packages/types'
import type { LockerInfo } from '@/features/locker/types'
import type { AuthResponse } from '@/features/auth/types'
import type { RateTable } from '@/features/quote/types'
import type { AppNotification } from '@/features/notifications/types'
import type { PaymentsOverview } from '@/features/payments/types'
import type { ApiResponse } from '@/shared/types/api'

function wrap<T>(value: T): ApiResponse<T> {
  return { data: value, success: true }
}

export function mockDelay<T>(value: T, ms = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export function mockResponse<T>(value: T, ms = 450): Promise<ApiResponse<T>> {
  return mockDelay(wrap(value), ms)
}

const STATUS_SEQUENCE: PackageStatus[] = [
  'Bodega',
  'Embarcado',
  'Aduana',
  'Agencia',
  'Entregado',
]

export const MOCK_USER = {
  email: 'demo@rapiexpress.com',
  name: 'María Fernanda',
}

function lastUpdateISO(status: PackageStatus): string {
  const daysAgo = STATUS_SEQUENCE.indexOf(status) + 3
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toLocaleDateString('es-EC', { day: '2-digit', month: 'short' })
}

/** Genera un historial consistente hasta el estado dado. */
export function buildHistory(upTo: PackageStatus): Array<{
  status: PackageStatus
  date: string
  location: string
  description: string
}> {
  const until = STATUS_SEQUENCE.indexOf(upTo)
  return STATUS_SEQUENCE.slice(0, until + 1)
    .map((status, index) => {
      const d = new Date()
      d.setDate(d.getDate() - (STATUS_SEQUENCE.length - index))
      return {
        status,
        date: d.toLocaleDateString('es-EC', { day: '2-digit', month: 'short' }),
        location:
          status === 'Bodega'
            ? 'Miami, Estados Unidos'
            : status === 'Embarcado'
              ? 'En tránsito · Océano Pacífico'
              : status === 'Aduana'
                ? 'Guayaquil, Ecuador · Aduana'
                : status === 'Agencia'
                  ? 'Quito, Ecuador · Agencia'
                  : 'Tu casa, Ecuador',
        description: `Registro #${index + 1} del flujo de paquete en estado ${status}.`,
      }
    })
    .reverse()
}

export const MOCK_PACKAGES: Package[] = [
  {
    id: 'pkg-001',
    trackingNumber: 'RXP-8821-3340',
    description: 'Zapatillas Nike Air Max · pedido a Nike.com',
    status: 'Embarcado',
    origin: 'Miami, USA',
    destination: 'Quito, Ecuador',
    lastUpdate: lastUpdateISO('Embarcado'),
  },
  {
    id: 'pkg-002',
    trackingNumber: 'RXP-6681-2903',
    description: 'Suplementos y vitaminas · iHerb',
    status: 'Bodega',
    origin: 'Miami, USA',
    destination: 'Guayaquil, Ecuador',
    lastUpdate: lastUpdateISO('Bodega'),
  },
  {
    id: 'pkg-003',
    trackingNumber: 'RXP-9044-1187',
    description: 'Repuestos de celular · AliExpress',
    status: 'Aduana',
    origin: 'Guangzhou, China',
    destination: 'Cuenca, Ecuador',
    lastUpdate: lastUpdateISO('Aduana'),
  },
  {
    id: 'pkg-004',
    trackingNumber: 'RXP-7712-5560',
    description: 'Ropa y accesorios · Amazon',
    status: 'Entregado',
    origin: 'Miami, USA',
    destination: 'Quito, Ecuador',
    lastUpdate: lastUpdateISO('Entregado'),
  },
  {
    id: 'pkg-005',
    trackingNumber: 'RXP-1209-9018',
    description: 'iPhone 16 Pro Max · Apple Store',
    status: 'Bodega',
    origin: 'Miami, USA',
    destination: 'Quito, Ecuador',
    lastUpdate: lastUpdateISO('Bodega'),
  },
  {
    id: 'pkg-006',
    trackingNumber: 'RXP-3372-7744',
    description: 'Robot aspiradora · Xiaomi',
    status: 'Agencia',
    origin: 'Shanghai, China',
    destination: 'Machala, Ecuador',
    lastUpdate: lastUpdateISO('Agencia'),
  },
]

export const MOCK_HISTORIES: Record<string, ReturnType<typeof buildHistory>> = Object.fromEntries(
  MOCK_PACKAGES.map((pkg) => [pkg.trackingNumber, buildHistory(pkg.status)]),
)

export const MOCK_LOCKER: LockerInfo = {
  address: '7400 NW 25th St, Suite 3B',
  city: 'Miami',
  state: 'FL',
  zip: '33122',
  country: 'Estados Unidos',
  instructions:
    'Coloca siempre tu código de casillero (RX-1942) en la línea de dirección para identificar tu carga.',
}

export function mockAuth(token: string): ApiResponse<AuthResponse> {
  return {
    data: { token, user: MOCK_USER },
    success: true,
  }
}

export const MOCK_RATES: RateTable = {
  currency: 'USD',
  handlingFee: 3,
  categories: [
    { id: 'ropa', label: 'Ropa y calzado', perKg: 5.5, minFee: 12 },
    { id: 'electronica', label: 'Electrónica', perKg: 7, minFee: 15 },
    { id: 'hogar', label: 'Hogar y decoración', perKg: 6, minFee: 15 },
    { id: 'salud', label: 'Salud y belleza', perKg: 6.5, minFee: 15 },
    { id: 'juguetes', label: 'Juguetes y hobby', perKg: 5.5, minFee: 12 },
    { id: 'otros', label: 'Otros', perKg: 6, minFee: 15 },
  ],
  destinations: [
    { id: 'quito', label: 'Quito', surcharge: 0 },
    { id: 'guayaquil', label: 'Guayaquil', surcharge: 0 },
    { id: 'cuenca', label: 'Cuenca', surcharge: 1.5 },
    { id: 'otras', label: 'Otras ciudades', surcharge: 2.5 },
  ],
}

function isoDaysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'ntf-001',
    kind: 'paquete',
    title: 'Tu guía RXP-8821-3340 fue embarcada',
    description: 'Salió de Miami rumbo a Ecuador. Te avisaremos en cada etapa.',
    date: isoDaysAgo(1),
    unread: true,
  },
  {
    id: 'ntf-002',
    kind: 'paquete',
    title: 'RXP-1209-9018 llegó a nuestra bodega',
    description: 'Recibimos tu paquete en Miami y ya tiene código de casillero.',
    date: isoDaysAgo(3),
    unread: true,
  },
  {
    id: 'ntf-003',
    kind: 'pago',
    title: 'Pago confirmado · RXP-7712-5560',
    description: 'Registramos tu pago. La guía pasó a entrega en Quito.',
    date: isoDaysAgo(6),
    unread: false,
  },
  {
    id: 'ntf-004',
    kind: 'sistema',
    title: 'Recuerda tu código de casillero',
    description: 'Usa RX-1942 en todas tus compras para identificar tu carga.',
    date: isoDaysAgo(9),
    unread: false,
  },
]

export const MOCK_PAYMENTS_OVERVIEW: PaymentsOverview = {
  currency: 'USD',
  pendingTotal: 18.5,
  payments: [
    {
      id: 'pay-001',
      trackingNumber: 'RXP-8821-3340',
      concept: 'Envío a Quito · 1.4 kg',
      amount: 18.5,
      currency: 'USD',
      status: 'Pendiente',
      date: isoDaysAgo(2),
    },
    {
      id: 'pay-002',
      trackingNumber: 'RXP-7712-5560',
      concept: 'Envío a Quito · 2.1 kg',
      amount: 14.25,
      currency: 'USD',
      status: 'Pagado',
      date: isoDaysAgo(8),
    },
    {
      id: 'pay-003',
      trackingNumber: 'RXP-6681-2903',
      concept: 'Envío a Guayaquil · 0.8 kg',
      amount: 9.9,
      currency: 'USD',
      status: 'Pagado',
      date: isoDaysAgo(15),
    },
  ],
}