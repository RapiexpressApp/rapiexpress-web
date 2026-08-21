import { useQuery } from '@tanstack/react-query'
import { getPaymentsOverview } from '../api/payments'

export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: () => getPaymentsOverview(),
  })
}
