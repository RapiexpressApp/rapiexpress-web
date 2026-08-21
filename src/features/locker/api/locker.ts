// =====================================================================
// MOCK DE DEMOSTRACIÓN — ver src/shared/mocks/demo.ts
// API auténtica (cuando exista): GET /locker
// =====================================================================
import { mockResponse, MOCK_LOCKER } from '@/shared/mocks/demo'

export function getLockerInfo() {
  return mockResponse(MOCK_LOCKER)
}