import { useState } from 'react'
import {
  ArrowRight,
  BedDouble,
  GraduationCap,
  House,
  Milk,
  Pill,
  Utensils,
  Wrench,
} from 'lucide-react'

import { useDonate } from '#/components/landing/DonateDialog'
import { buttonClass } from '#/components/ui/Button'
import { Reveal } from '#/components/ui/Reveal'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { impacts } from '#/data/content'
import type { Impact } from '#/data/content'
import { formatVnd } from '#/lib/format'

const icons: Record<Impact['icon'], typeof Utensils> = {
  meal: Utensils,
  medicine: Pill,
  hospital: BedDouble,
  milk: Milk,
  school: GraduationCap,
  tools: Wrench,
  home: House,
}

export function GiveAnyAmount() {
  const { open } = useDonate()
  const [selected, setSelected] = useState<Impact>(impacts[1])
  const Icon = icons[selected.icon]

  return (
    <section id="gop" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Góp bao nhiêu cũng quý"
            title="Có nhiêu góp nhiêu. Một ly cà phê cũng là một bữa cơm."
            description="Phần lớn hoàn cảnh được giúp đủ không phải nhờ một nhà tài trợ lớn, mà nhờ hàng nghìn khoản góp nhỏ của anh em thợ và người thương thợ."
          />
          <ul className="mt-8 space-y-3 text-sm text-ink-600">
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
              Không có mức tối thiểu. Mức góp phổ biến nhất là 50.000đ.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
              95% số tiền chuyển thẳng đến gia đình thợ trong 24 giờ.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
              Bạn nhận cập nhật khi hoàn cảnh mình góp có tiến triển.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl bg-ink-50 p-6 sm:p-8">
            <p className="text-sm font-medium text-ink-700">
              Chọn một số tiền để xem nó giúp được gì
            </p>
            <div
              role="radiogroup"
              aria-label="Số tiền"
              className="mt-4 flex flex-wrap gap-2"
            >
              {impacts.map((impact) => {
                const active = impact.amount === selected.amount
                return (
                  <button
                    key={impact.amount}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSelected(impact)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? 'bg-ink-900 text-white'
                        : 'bg-white text-ink-700 shadow-soft hover:text-ink-900'
                    }`}
                  >
                    {impact.amount >= 1_000_000
                      ? `${impact.amount / 1_000_000} triệu`
                      : `${impact.amount / 1_000}k`}
                  </button>
                )
              })}
            </div>

            <div
              key={selected.amount}
              className="mt-8 flex animate-pop items-start gap-5 rounded-2xl bg-white p-6 shadow-soft"
              aria-live="polite"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon className="size-7" aria-hidden />
              </span>
              <div>
                <p className="text-sm text-ink-500">
                  {formatVnd(selected.amount)} tương đương
                </p>
                <p className="mt-1 text-balance text-xl font-semibold leading-snug text-ink-900">
                  {selected.label.charAt(0).toUpperCase() +
                    selected.label.slice(1)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => open({ amount: selected.amount })}
              className={buttonClass('primary', 'lg', 'mt-6 w-full')}
            >
              Góp {formatVnd(selected.amount)}
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <p className="mt-3 text-center text-xs text-ink-500">
              Hoặc nhập số tiền tùy tâm ở bước tiếp theo.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
