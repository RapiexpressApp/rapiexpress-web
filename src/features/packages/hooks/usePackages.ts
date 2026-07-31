import { useQuery } from '@tanstack/react-query'
import { getPackages } from '../api/packages'

export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: () => getPackages(),
  })
}
