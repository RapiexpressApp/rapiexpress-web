import { Badge } from '@/shared/components/ui/badge'
import type { PackageStatus } from '../types'

const statusStyles: Record<PackageStatus, string> = {
  Bodega: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Embarcado: 'bg-blue-100 text-blue-800 border-blue-300',
  Aduana: 'bg-purple-100 text-purple-800 border-purple-300',
  Agencia: 'bg-orange-100 text-orange-800 border-orange-300',
  Entregado: 'bg-green-100 text-green-800 border-green-300',
}

interface StatusBadgeProps {
  status: PackageStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={statusStyles[status] ?? ''} variant="outline">
      {status}
    </Badge>
  )
}
