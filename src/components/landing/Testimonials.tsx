import { Reveal } from '#/components/ui/Reveal'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { testimonials } from '#/data/content'

export function Testimonials() {
  return (
    <section id="cau-chuyen" className="bg-ink-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Câu chuyện thật"
            title="Người được giúp, người đi giúp, cùng một cộng đồng"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 100}>
              <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft">
                <blockquote className="flex-1 text-balance text-lg leading-relaxed text-ink-800">
                  <span
                    className="text-3xl leading-none text-brand-400"
                    aria-hidden
                  >
                    “
                  </span>
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-xs font-semibold text-white">
                    {item.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink-500">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
