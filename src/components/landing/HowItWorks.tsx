import { HandCoins, MapPinCheck, Send } from 'lucide-react'

import { Reveal } from '#/components/ui/Reveal'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { steps } from '#/data/content'

const icons = [Send, MapPinCheck, HandCoins]

export function HowItWorks() {
  return (
    <section id="cach-hoat-dong" className="bg-ink-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Cách hoạt động"
            title="Thợ giúp thợ, theo cách thợ tin nhau"
            description="Không qua trung gian xa lạ. Người xác minh là thợ ở cùng khu vực, người nhận là gia đình thợ, tiền đi thẳng."
          />
        </Reveal>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = icons[index] ?? Send
            return (
              <Reveal key={step.title} delay={index * 100}>
                <li className="h-full rounded-3xl bg-white p-8 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-ink-400">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
