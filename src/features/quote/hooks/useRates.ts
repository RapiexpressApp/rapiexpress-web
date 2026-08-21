import { useQuery } from '@tanstack/react-query'
import { getRates } from '../api/rates'

export function useRates() {
  return useQuery({
    queryKey: ['rates'],
    queryFn: () => getRates(),
  })
}
