import { ArrowRight, BadgeCheck, Clock, MapPin } from 'lucide-react'

import { useDonate } from '#/components/landing/DonateDialog'
import { buttonClass } from '#/components/ui/Button'
import { CaseImage } from '#/components/ui/CaseImage'
import { cases } from '#/data/content'
import { formatCompactVnd, percent } from '#/lib/format'

const featured = cases[0]
const quickAmounts = [20_000, 50_000, 100_000] as const

export function Hero() {
  const { open } = useDonate()
  const progress = percent(featured.raised, featured.goal)

  return (
    <section className="relative -mt-16 overflow-hidden bg-ink-50 pt-16 lg:-mt-[72px] lg:pt-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full bg-brand-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 size-[480px] rounded-full bg-amber-100/50 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:pb-28 lg:pt-20">
        <div>
          <p className="text-sm font-medium text-brand-600">
            Quỹ tương trợ của cộng đồng thợ Việt Nam
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Khi một người thợ gục ngã, cả cộng đồng thợ đỡ lấy
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            Tai nạn lao động, bệnh hiểm nghèo, mất kế sinh nhai. Vua Thợ Charity
            là nơi anh em thợ và những người thương thợ cùng góp lại, người vài
            chục nghìn, người vài trăm, để không ai phải một mình.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => open()}
              className={buttonClass('primary', 'lg')}
            >
              Góp ngay
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <a href="#hoan-canh" className={buttonClass('secondary', 'lg')}>
              Xem các hoàn cảnh
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-ink-600">
            <span className="mr-1">Góp nhanh:</span>
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => open({ amount })}
                className="rounded-full bg-white px-3.5 py-1.5 font-semibold text-ink-800 shadow-soft transition hover:bg-brand-50 hover:text-brand-700"
              >
                {amount / 1_000}k
              </button>
            ))}
            <span className="text-ink-400">Không có mức tối thiểu.</span>
          </div>
        </div>

        <article className="group rounded-3xl bg-white p-4 shadow-lift">
          <CaseImage
            src={featured.image}
            alt={featured.imageAlt}
            category={featured.category}
            eager
            className="h-56 rounded-2xl"
          />
          <div className="px-2 pb-2 pt-5">
            <div className="flex items-center gap-2 text-xs font-medium text-ink-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
                <BadgeCheck className="size-3.5" aria-hidden />
                Đã xác minh
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden />
                {featured.location}
              </span>
            </div>

            <h2 className="mt-3 text-balance text-xl font-semibold leading-snug text-ink-900">
              {featured.name}, {featured.age} tuổi,{' '}
              {featured.trade.toLowerCase()}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
              {featured.title}
            </p>

            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-semibold text-ink-900">
                  {formatCompactVnd(featured.raised)}
                </span>
                <span className="text-sm text-ink-500">
                  cần {formatCompactVnd(featured.goal)}
                </span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-ink-100"
                role="progressbar"
                aria-label="Tiến độ hỗ trợ"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full origin-left rounded-full bg-brand-500"
                  style={{ transform: `scaleX(${progress / 100})` }}
                />
              </div>
              <div className="mt-2.5 flex justify-between text-xs text-ink-500">
                <span>
                  {featured.supporters.toLocaleString('vi-VN')} người đã góp
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden />
                  Còn {featured.daysLeft} ngày
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => open({ supportCase: featured })}
              className={buttonClass('dark', 'md', 'mt-5 w-full')}
            >
              Góp cho {featured.name}
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}
