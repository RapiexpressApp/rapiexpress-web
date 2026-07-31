import { useQuery } from '@tanstack/react-query'
import { getLockerInfo } from '../api/locker'

export function useLocker() {
  return useQuery({
    queryKey: ['locker'],
    queryFn: () => getLockerInfo(),
  })
}
