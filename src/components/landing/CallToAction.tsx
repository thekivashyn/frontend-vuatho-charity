import { useState } from 'react'
import { ArrowRight, Check, LifeBuoy, Users } from 'lucide-react'

import { buttonClass } from '#/components/ui/Button'
import { Reveal } from '#/components/ui/Reveal'

const trades = [
  'Điện',
  'Nước',
  'Xây dựng',
  'Cơ khí',
  'Điện lạnh',
  'Sơn / Hoàn thiện',
  'Mộc',
  'Khác',
] as const

const monthly = [
  { value: 0, label: 'Tùy tâm, khi nào tiện' },
  { value: 20_000, label: '20.000đ mỗi tháng' },
  { value: 50_000, label: '50.000đ mỗi tháng' },
  { value: 100_000, label: '100.000đ mỗi tháng' },
] as const

const benefits = [
  'Được quỹ lo trước nếu chính bạn gặp chuyện',
  'Nhận thông báo khi có anh em gần bạn cần xác minh',
  'Thẻ thành viên mạng lưới tương trợ',
]

const phonePattern = /^(0|\+84)(\d{9})$/

const fieldClass =
  'mt-1.5 w-full rounded-xl bg-ink-100 px-3.5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-300'

export function CallToAction() {
  const [phone, setPhone] = useState('')
  const [trade, setTrade] = useState<string>(trades[0])
  const [amount, setAmount] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = phone.replace(/[\s.-]/g, '')
    if (!phonePattern.test(normalized)) {
      setError('Số điện thoại chưa đúng. Ví dụ: 0912 345 678')
      return
    }
    setError(null)
    setSubmitted(true)
  }

  return (
    <section id="tham-gia" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-28">
        <Reveal>
          <div className="flex h-full flex-col rounded-3xl bg-ink-900 p-8 text-white sm:p-10">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-brand-300">
              <LifeBuoy className="size-6" aria-hidden />
            </span>
            <h2 className="mt-6 text-balance text-2xl font-semibold leading-snug sm:text-3xl">
              Bạn là thợ và đang gặp chuyện?
            </h2>
            <p className="mt-3 leading-relaxed text-ink-300">
              Tai nạn, bệnh nặng, mất việc đột ngột. Đừng ngại. Kể cho chúng tôi
              nghe, thợ ở gần bạn sẽ đến gặp trong 72 giờ.
            </p>
            <div className="mt-auto pt-8">
              <a
                href="mailto:hotro@vuatho.charity"
                className={buttonClass('white', 'lg', 'w-full sm:w-auto')}
              >
                Gửi hoàn cảnh
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <p className="mt-4 text-sm text-ink-400">
                Hoặc gọi{' '}
                <a
                  href="tel:19006868"
                  className="font-medium text-white underline-offset-4 hover:underline"
                >
                  1900 6868
                </a>
                , 8h đến 22h mỗi ngày.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl bg-ink-50 p-8 sm:p-10">
            {submitted ? (
              <div
                className="flex h-full flex-col justify-center text-center"
                role="status"
              >
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="size-7" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink-900">
                  Chào mừng bạn vào mạng lưới
                </h3>
                <p className="mt-2 text-sm text-ink-600">
                  Điều phối viên sẽ liên hệ trong 24 giờ để xác nhận và gửi thẻ
                  thành viên.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setPhone('')
                  }}
                  className="mt-5 text-sm font-semibold text-brand-600 hover:underline"
                >
                  Đăng ký cho người khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
                    <Users className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold leading-snug text-ink-900">
                      Gia nhập mạng lưới tương trợ thợ
                    </h2>
                    <p className="mt-1 text-sm text-ink-600">
                      Góp tùy tâm, giúp nhau khi cần. Bạn cũng được lo lại.
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-ink-700">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="cta-phone"
                      className="block text-sm font-medium text-ink-700"
                    >
                      Số điện thoại
                    </label>
                    <input
                      id="cta-phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value)
                        if (error) setError(null)
                      }}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? 'cta-phone-error' : undefined}
                      className={`${fieldClass} ${error ? 'ring-2 ring-red-300' : ''}`}
                    />
                    {error && (
                      <p
                        id="cta-phone-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-600"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="cta-trade"
                      className="block text-sm font-medium text-ink-700"
                    >
                      Nghề của bạn
                    </label>
                    <select
                      id="cta-trade"
                      value={trade}
                      onChange={(event) => setTrade(event.target.value)}
                      className={fieldClass}
                    >
                      {trades.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <fieldset className="mt-4">
                  <legend className="text-sm font-medium text-ink-700">
                    Mức góp định kỳ
                  </legend>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {monthly.map((option) => {
                      const active = amount === option.value
                      return (
                        <label
                          key={option.value}
                          className={`cursor-pointer rounded-xl px-3.5 py-2.5 text-sm transition ${
                            active
                              ? 'bg-ink-900 font-medium text-white'
                              : 'bg-white text-ink-700 shadow-soft hover:text-ink-900'
                          }`}
                        >
                          <input
                            type="radio"
                            name="monthly"
                            value={option.value}
                            checked={active}
                            onChange={() => setAmount(option.value)}
                            className="sr-only"
                          />
                          {option.label}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className={buttonClass('primary', 'lg', 'mt-6 w-full')}
                >
                  Gia nhập mạng lưới
                </button>
                <p className="mt-3 text-center text-xs text-ink-500">
                  Có thể dừng bất cứ lúc nào. Không chia sẻ số điện thoại cho
                  bên thứ ba.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
