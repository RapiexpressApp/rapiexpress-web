import { useQuery } from '@tanstack/react-query'
import { getPackageHistory } from '../api/packages'

export function usePackageDetail(trackingNumber: string) {
  return useQuery({
    queryKey: ['package', trackingNumber],
    queryFn: () => getPackageHistory(trackingNumber),
    enabled: !!trackingNumber,
  })
}
