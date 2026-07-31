import { useParams, useNavigate } from 'react-router-dom'
import { usePackageDetail } from '@/features/packages/hooks/usePackageDetail'
import { TrackingTimeline } from '@/features/packages/components/TrackingTimeline'
import { Button } from '@/shared/components/ui/button'

export default function PackageTrackingPage() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>()
  const navigate = useNavigate()
  const { data, isLoading } = usePackageDetail(trackingNumber ?? '')

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto space-y-4">
      <Button variant="ghost" onClick={() => navigate('/dashboard')}>
        ← Volver
      </Button>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando historial...</p>
      ) : data?.data ? (
        <TrackingTimeline
          history={data.data}
          trackingNumber={trackingNumber ?? ''}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          No se encontró información para este paquete.
        </p>
      )}
    </div>
  )
}
