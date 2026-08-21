// =====================================================================
// MOCK DE DEMOSTRACIÓN — ver src/shared/mocks/demo.ts
// API auténtica (cuando exista): GET /rates
// =====================================================================
import { mockResponse, MOCK_RATES } from '@/shared/mocks/demo'

export function getRates() {
  return mockResponse(MOCK_RATES)
}
