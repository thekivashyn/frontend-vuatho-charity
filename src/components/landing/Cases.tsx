import { useState } from 'react'
import { BadgeCheck, Clock, MapPin } from 'lucide-react'

import { useDonate } from '#/components/landing/DonateDialog'
import { buttonClass } from '#/components/ui/Button'
import { CaseImage } from '#/components/ui/CaseImage'
import { Reveal } from '#/components/ui/Reveal'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { useInView } from '#/hooks/useInView'
import { cases, categories, categoryLabel } from '#/data/content'
import type { CaseCategory, SupportCase } from '#/data/content'
import { formatCompactVnd, percent } from '#/lib/format'

type Filter = CaseCategory | 'all'

export function Cases() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible =
    filter === 'all' ? cases : cases.filter((c) => c.category === filter)

  return (
    <section id="hoan-canh" className="bg-ink-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Hoàn cảnh đang cần giúp"
              title="Những anh em thợ đang cần một bàn tay"
              description="Mỗi hoàn cảnh đều được thợ tình nguyện ở cùng địa phương đến tận nơi xác minh và đứng tên bảo lãnh."
            />
            <div
              role="tablist"
              aria-label="Lọc theo hoàn cảnh"
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => {
                const active = filter === category.id
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(category.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? 'bg-ink-900 text-white'
                        : 'bg-white text-ink-600 shadow-soft hover:text-ink-900'
                    }`}
                  >
                    {category.label}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 80}>
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-500" aria-live="polite">
          Đang hiển thị {visible.length} trong {cases.length} hoàn cảnh.
        </p>
      </div>
    </section>
  )
}

function CaseCard({ item }: { item: SupportCase }) {
  const { open } = useDonate()
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const progress = percent(item.raised, item.goal)
  const almostDone = progress >= 90
  const urgent = item.daysLeft <= 7

  return (
    <article
      ref={ref}
      className="group flex h-full flex-col rounded-3xl bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative">
        <CaseImage
          src={item.image}
          alt={item.imageAlt}
          category={item.category}
          className="h-48 rounded-2xl"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-ink-800 backdrop-blur">
          {categoryLabel[item.category]}
        </span>
        {almostDone && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white">
            Sắp đủ
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <BadgeCheck className="size-3.5" aria-hidden />
            Đã xác minh
          </span>
        </div>

        <h3 className="mt-2.5 text-lg font-semibold leading-snug text-ink-900">
          {item.name}, {item.age} tuổi, {item.trade.toLowerCase()}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-600">
          {item.title}
        </p>
        <p className="mt-3 text-xs text-ink-500">
          <span className="font-medium text-ink-700">Cần cho:</span> {item.need}
        </p>

        <div className="mt-auto pt-6">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-semibold text-ink-900">
              {formatCompactVnd(item.raised)}
            </span>
            <span className="text-xs text-ink-500">
              {progress}% của {formatCompactVnd(item.goal)}
            </span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100"
            role="progressbar"
            aria-label="Tiến độ hỗ trợ"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full origin-left rounded-full transition-transform duration-1000 ease-out-expo ${
                almostDone ? 'bg-emerald-500' : 'bg-brand-500'
              }`}
              style={{ transform: `scaleX(${inView ? progress / 100 : 0})` }}
            />
          </div>

          <div className="mt-2.5 flex justify-between text-xs text-ink-500">
            <span>{item.supporters.toLocaleString('vi-VN')} người đã góp</span>
            <span
              className={`inline-flex items-center gap-1 ${urgent ? 'font-medium text-brand-700' : ''}`}
            >
              <Clock className="size-3.5" aria-hidden />
              Còn {item.daysLeft} ngày
            </span>
          </div>

          <button
            type="button"
            onClick={() => open({ supportCase: item })}
            className={buttonClass(
              'secondary',
              'md',
              'mt-5 w-full group-hover:bg-ink-900 group-hover:text-white',
            )}
          >
            Góp cho {item.name}
          </button>
        </div>
      </div>
    </article>
  )
}
