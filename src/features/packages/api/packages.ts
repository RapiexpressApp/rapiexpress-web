// =====================================================================
// MOCK DE DEMOSTRACIÓN — ver src/shared/mocks/demo.ts
// API auténtica (cuando exista): GET /packages, GET /packages/{n}/history
// =====================================================================
import { mockResponse, MOCK_PACKAGES, MOCK_HISTORIES } from '@/shared/mocks/demo'
import type { PackageHistory } from '../types'

export function getPackages() {
  return mockResponse(MOCK_PACKAGES)
}

export function getPackageHistory(trackingNumber: string) {
  const history: PackageHistory[] = MOCK_HISTORIES[trackingNumber] ?? []
  return mockResponse(history)
}