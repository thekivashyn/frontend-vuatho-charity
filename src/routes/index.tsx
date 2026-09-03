import { createFileRoute } from '@tanstack/react-router'

import { BackToTop } from '#/components/landing/BackToTop'
import { CallToAction } from '#/components/landing/CallToAction'
import { Cases } from '#/components/landing/Cases'
import { DonateProvider } from '#/components/landing/DonateDialog'
import { Faq } from '#/components/landing/Faq'
import { Footer } from '#/components/landing/Footer'
import { GiveAnyAmount } from '#/components/landing/GiveAnyAmount'
import { Header } from '#/components/landing/Header'
import { Hero } from '#/components/landing/Hero'
import { HowItWorks } from '#/components/landing/HowItWorks'
import { Stats } from '#/components/landing/Stats'
import { Testimonials } from '#/components/landing/Testimonials'
import { Transparency } from '#/components/landing/Transparency'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <DonateProvider>
      <Header />
      <main id="noi-dung">
        <Hero />
        <Stats />
        <Cases />
        <GiveAnyAmount />
        <HowItWorks />
        <Transparency />
        <Testimonials />
        <CallToAction />
        <Faq />
      </main>
      <Footer />
      <BackToTop />
    </DonateProvider>
  )
}
