import { ChevronDown } from 'lucide-react'

import { Reveal } from '#/components/ui/Reveal'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { faqs } from '#/data/content'

export function Faq() {
  return (
    <section id="hoi-dap" className="bg-ink-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Hỏi đáp"
            title="Những điều mọi người hay hỏi"
            description="Chưa thấy câu trả lời? Gọi 1900 6868 hoặc gửi email, đội ngũ hỗ trợ từ 8h đến 22h mỗi ngày."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-3">
            {faqs.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group rounded-2xl bg-white px-6 shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    className="size-5 shrink-0 text-ink-400 transition group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="pb-6 text-sm leading-relaxed text-ink-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
