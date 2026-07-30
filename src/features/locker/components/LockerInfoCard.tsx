import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import type { LockerInfo } from '../types'

interface LockerInfoCardProps {
  locker: LockerInfo
}

export function LockerInfoCard({ locker }: LockerInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tu Casillero en Miami</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p>{locker.address}</p>
        <p>
          {locker.city}, {locker.state} {locker.zip}
        </p>
        <p>{locker.country}</p>
        {locker.instructions && (
          <p className="text-muted-foreground mt-2">{locker.instructions}</p>
        )}
      </CardContent>
    </Card>
  )
}
