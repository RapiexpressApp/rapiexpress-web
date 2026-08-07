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