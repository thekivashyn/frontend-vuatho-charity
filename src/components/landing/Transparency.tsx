import { Award, Download, MapPinCheck, Receipt } from 'lucide-react'

import { buttonClass } from '#/components/ui/Button'
import { Reveal } from '#/components/ui/Reveal'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { allocation } from '#/data/content'

const pillars = [
  {
    icon: Receipt,
    title: 'Chứng từ cho từng khoản',
    description:
      'Mỗi lần chuyển tiền đến gia đình hoặc bệnh viện đều được đăng kèm chứng từ trong 48 giờ. Bạn xem được ngay trên trang hoàn cảnh.',
  },
  {
    icon: MapPinCheck,
    title: 'Thợ địa phương xác minh và bảo lãnh',
    description:
      'Người xác minh có tên, có nghề, ở cùng khu vực với hoàn cảnh. Họ chịu trách nhiệm với cộng đồng về điều mình bảo lãnh.',
  },
  {
    icon: Award,
    title: 'Kiểm toán độc lập hằng năm',
    description:
      'Báo cáo tài chính được kiểm toán bởi đơn vị độc lập và công bố công khai vào quý I mỗi năm.',
  },
]

const colors = ['bg-brand-500', 'bg-ink-700', 'bg-ink-300']

export function Transparency() {
  return (
    <section id="minh-bach" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Minh bạch"
            title="Bạn biết chính xác tiền của mình đến tay ai"
            description="Tiền của anh em thợ là tiền mồ hôi. Chúng tôi giữ nó như giữ của chính mình."
          />
          <ul className="mt-10 space-y-8">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ink-50 text-brand-600">
                  <pillar.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">
                    {pillar.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl bg-ink-50 p-6 sm:p-8">
            <p className="font-semibold text-ink-900">
              Mỗi 100.000đ bạn góp đi đâu
            </p>
            <p className="mt-1 text-sm text-ink-500">
              Số liệu năm 2025, đã kiểm toán.
            </p>

            <div
              className="mt-6 flex h-3 gap-0.5 overflow-hidden rounded-full"
              role="img"
              aria-label="Phân bổ: 95% chuyển thẳng đến gia đình thợ, 3% xác minh và đi lại, 2% vận hành"
            >
              {allocation.map((item, index) => (
                <div
                  key={item.label}
                  className={`${colors[index]} rounded-full`}
                  style={{ width: `${item.value}%` }}
                />
              ))}
            </div>

            <ul className="mt-5 space-y-3">
              {allocation.map((item, index) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2.5 text-ink-700">
                    <span
                      className={`size-2.5 rounded-full ${colors[index]}`}
                      aria-hidden
                    />
                    {item.label}
                  </span>
                  <span className="font-semibold tabular-nums text-ink-900">
                    {item.value}%
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-soft">
                <p className="text-2xl font-semibold tabular-nums text-ink-900">
                  48,2 tỷ
                </p>
                <p className="mt-0.5 text-xs text-ink-500">
                  Đã trao đến gia đình thợ
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-soft">
                <p className="text-2xl font-semibold tabular-nums text-ink-900">
                  24 giờ
                </p>
                <p className="mt-0.5 text-xs text-ink-500">
                  Thời gian chuyển tiền trung bình
                </p>
              </div>
            </div>

            <a href="#" className={buttonClass('white', 'md', 'mt-6 w-full')}>
              <Download className="size-4" aria-hidden />
              Tải báo cáo tài chính 2025
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
