export type PackageStatus =
  | 'Bodega'
  | 'Embarcado'
  | 'Aduana'
  | 'Agencia'
  | 'Entregado'

export interface Package {
  id: string
  trackingNumber: string
  description: string
  status: PackageStatus
  origin: string
  destination: string
  lastUpdate: string
}

export interface PackageHistory {
  status: PackageStatus
  date: string
  location: string
  description: string
}
