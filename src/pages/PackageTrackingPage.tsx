import { useParams, useNavigate } from 'react-router-dom'
import { usePackageDetail } from '@/features/packages/hooks/usePackageDetail'
import { TrackingTimeline } from '@/features/packages/components/TrackingTimeline'
import { Button } from '@/shared/components/ui/button'
import { LoadingState } from '@/shared/components/feedback/LoadingState'
import { EmptyState } from '@/shared/components/feedback/EmptyState'

export default function PackageTrackingPage() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>()
  const navigate = useNavigate()
  const { data, isLoading } = usePackageDetail(trackingNumber ?? '')

  return (
    <div className="space-y-4 max-w-2xl">
      <Button variant="ghost" onClick={() => navigate('/dashboard')}>
        ← Volver
      </Button>

      {isLoading ? (
        <LoadingState label="Cargando historial..." />
      ) : data?.data ? (
        <TrackingTimeline
          history={data.data}
          trackingNumber={trackingNumber ?? ''}
        />
      ) : (
        <EmptyState title="No se encontró información para este paquete." />
      )}
    </div>
  )
}