import { useCountUp } from '#/hooks/useCountUp'
import { useInView } from '#/hooks/useInView'
import { partners, stats } from '#/data/content'
import type { Stat } from '#/data/content'

export function Stats() {
  const { ref, inView } = useInView<HTMLElement>(0.3)

  return (
    <section id="tac-dong" ref={ref} className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((item) => (
            <StatItem key={item.label} stat={item} active={inView} />
          ))}
        </dl>

        <div className="mt-14 flex flex-col items-center gap-4 lg:flex-row lg:gap-10">
          <p className="shrink-0 text-xs font-medium uppercase tracking-wider text-ink-400">
            Đồng hành cùng
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-semibold text-ink-300">
            {partners.map((partner) => (
              <li key={partner} className="transition hover:text-ink-600">
                {partner}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.value, active)
  const decimals = stat.decimals ?? 0
  const formatted = value.toLocaleString('vi-VN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <div>
      <dd className="text-4xl font-semibold tracking-tight text-ink-900 tabular-nums sm:text-5xl">
        {formatted}
        <span className="text-brand-500">{stat.suffix}</span>
      </dd>
      <dt className="mt-2 text-sm text-ink-500">{stat.label}</dt>
    </div>
  )
}
