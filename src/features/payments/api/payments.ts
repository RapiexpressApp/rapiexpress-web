// =====================================================================
// MOCK DE DEMOSTRACIÓN — ver src/shared/mocks/demo.ts
// API auténtica (cuando exista): GET /payments/overview
// =====================================================================
import { mockResponse, MOCK_PAYMENTS_OVERVIEW } from '@/shared/mocks/demo'

export function getPaymentsOverview() {
  return mockResponse(MOCK_PAYMENTS_OVERVIEW)
}
