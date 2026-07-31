import { httpClient } from '@/shared/lib/http-client'
import type { LockerInfo } from '../types'

export function getLockerInfo() {
  return httpClient.get<LockerInfo>('/locker')
}
