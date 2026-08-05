import { useState } from 'react'
import { LandingNavbar } from '@/features/landing/components/LandingNavbar'
import { Hero } from '@/features/landing/components/Hero'
import { StatsBar } from '@/features/landing/components/StatsBar'
import { NosotrosSection } from '@/features/landing/components/NosotrosSection'
import { ComoFuncionaSection } from '@/features/landing/components/ComoFuncionaSection'
import { BeneficiosSection } from '@/features/landing/components/BeneficiosSection'
import { CoberturaSection } from '@/features/landing/components/CoberturaSection'
import { FaqSection } from '@/features/landing/components/FaqSection'
import { FinalCtaSection } from '@/features/landing/components/FinalCtaSection'
import { LandingFooter } from '@/features/landing/components/LandingFooter'
import { MobileStickyCta } from '@/features/landing/components/MobileStickyCta'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="overflow-hidden">
      <LandingNavbar mobileMenuOpen={mobileMenuOpen} onMenuChange={setMobileMenuOpen} />
      <main>
        <Hero />
        <StatsBar />
        <NosotrosSection />
        <ComoFuncionaSection />
        <BeneficiosSection />
        <CoberturaSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
      <MobileStickyCta hidden={mobileMenuOpen} />
    </div>
  )
}
