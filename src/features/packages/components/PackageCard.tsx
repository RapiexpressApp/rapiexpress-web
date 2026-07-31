import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { StatusBadge } from './StatusBadge'
import type { Package } from '../types'

interface PackageCardProps {
  pkg: Package
}

export function PackageCard({ pkg }: PackageCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/tracking/${pkg.trackingNumber}`)}
    >
      <CardHeader>
        <CardTitle className="text-sm">{pkg.trackingNumber}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pkg.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{pkg.origin}</span>
          <StatusBadge status={pkg.status} />
        </div>
      </CardContent>
    </Card>
  )
}
