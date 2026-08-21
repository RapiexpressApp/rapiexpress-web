// =====================================================================
// MOCK DE DEMOSTRACIÓN — ver src/shared/mocks/demo.ts
// API auténtica (cuando exista): GET /notifications
// =====================================================================
import { mockResponse, MOCK_NOTIFICATIONS } from '@/shared/mocks/demo'

export function getNotifications() {
  return mockResponse(MOCK_NOTIFICATIONS)
}
