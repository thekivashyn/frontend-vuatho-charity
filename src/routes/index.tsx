import { createFileRoute } from '@tanstack/react-router'
import { BackToTop } from '#/components/landing/BackToTop'
import { CallToAction } from '#/components/landing/CallToAction'
import { Mission } from '#/components/landing/Mission'
import { ContactProvider } from '#/components/landing/ContactDialog'
import { Faq } from '#/components/landing/Faq'
import { Footer } from '#/components/landing/Footer'
import { WaysToHelp } from '#/components/landing/WaysToHelp'
import { Header } from '#/components/landing/Header'
import { Hero } from '#/components/landing/Hero'
import { HowItWorks } from '#/components/landing/HowItWorks'
import { CommunityValues } from '#/components/landing/CommunityValues'
import { CommunityBelief } from '#/components/landing/CommunityBelief'
import { DonationTerms } from '#/components/landing/DonationTerms'
import { Transparency } from '#/components/landing/Transparency'

export const Route = createFileRoute('/')({ component: LandingPage })
function LandingPage() {
  return (
    <ContactProvider>
      <Header />
      <main id="noi-dung">
        <Hero />
        <CommunityValues />
        <Mission />
        <WaysToHelp />
        <HowItWorks />
        <Transparency />
        <CommunityBelief />
        <CallToAction />
        <Faq />
        <DonationTerms />
      </main>
      <Footer />
      <BackToTop />
    </ContactProvider>
  )
}
