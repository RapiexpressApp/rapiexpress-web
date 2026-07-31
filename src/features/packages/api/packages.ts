import { httpClient } from '@/shared/lib/http-client'
import type { Package, PackageHistory } from '../types'

export function getPackages() {
  return httpClient.get<Package[]>('/packages')
}

export function getPackageHistory(trackingNumber: string) {
  return httpClient.get<PackageHistory[]>(`/packages/${trackingNumber}/history`)
}
