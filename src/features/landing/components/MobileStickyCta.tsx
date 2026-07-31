import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface MobileStickyCtaProps {
  hidden: boolean
}

export function MobileStickyCta({ hidden }: MobileStickyCtaProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-300 ease-out',
        visible && !hidden ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="bg-white/95 backdrop-blur border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link to="/register" className="block">
          <Button size="lg" className="w-full bg-accent hover:bg-accent-dark text-brand-dark shadow-md gap-2">
            Abrir cuenta gratis
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
