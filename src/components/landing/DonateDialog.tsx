import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Check, Landmark, QrCode, ShieldCheck, Wallet, X } from 'lucide-react'

import { buttonClass } from '#/components/ui/Button'
import { cases, impacts } from '#/data/content'
import type { SupportCase } from '#/data/content'
import { formatVnd } from '#/lib/format'

type OpenOptions = {
  supportCase?: SupportCase
  amount?: number
}

type DonateContextValue = {
  open: (options?: OpenOptions) => void
}

const DonateContext = createContext<DonateContextValue | null>(null)

export function useDonate(): DonateContextValue {
  const context = useContext(DonateContext)
  if (!context) {
    throw new Error('useDonate must be used inside <DonateProvider>')
  }
  return context
}

const presets = [20_000, 50_000, 100_000, 200_000, 500_000] as const

const methods = [
  { id: 'bank', label: 'Chuyển khoản', hint: 'Miễn phí', icon: Landmark },
  { id: 'momo', label: 'Ví MoMo', hint: 'Tức thì', icon: Wallet },
  { id: 'vnpay', label: 'VNPay QR', hint: 'Mọi ngân hàng', icon: QrCode },
] as const

type MethodId = (typeof methods)[number]['id']

const fieldClass =
  'mt-1.5 w-full rounded-xl bg-ink-100 px-3.5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-300'

/** Largest impact whose amount is at or below the given amount. */
function impactFor(amount: number) {
  let match = null
  for (const impact of impacts) {
    if (impact.amount <= amount) match = impact
  }
  return match
}

export function DonateProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [caseId, setCaseId] = useState<string>('general')
  const [preset, setPreset] = useState<number>(50_000)
  const [custom, setCustom] = useState('')
  const [method, setMethod] = useState<MethodId>('bank')
  const [anonymous, setAnonymous] = useState(false)
  const [done, setDone] = useState(false)

  const open = useCallback((options?: OpenOptions) => {
    setCaseId(options?.supportCase?.id ?? 'general')
    if (options?.amount) {
      const isPreset = presets.some((p) => p === options.amount)
      if (isPreset) {
        setPreset(options.amount)
        setCustom('')
      } else {
        setCustom(String(options.amount))
      }
    }
    setDone(false)
    dialogRef.current?.showModal()
  }, [])

  const close = () => dialogRef.current?.close()

  const value = useMemo(() => ({ open }), [open])

  const customAmount = Number(custom.replace(/\D/g, ''))
  const amount = customAmount > 0 ? customAmount : preset
  const selected = cases.find((c) => c.id === caseId) ?? null
  const impact = impactFor(amount)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDone(true)
  }

  return (
    <DonateContext.Provider value={value}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="donate-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) close()
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-white p-0 text-ink-900 shadow-lift open:animate-pop"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Đóng"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-ink-500 transition hover:bg-ink-100 hover:text-ink-900"
          >
            <X className="size-5" aria-hidden />
          </button>

          {done ? (
            <div className="py-4 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="size-7" aria-hidden />
              </div>
              <h2 id="donate-title" className="mt-5 text-2xl font-semibold">
                Cảm ơn bạn
              </h2>
              <p className="mt-2 leading-relaxed text-ink-600">
                {formatVnd(amount)} của bạn{' '}
                {selected
                  ? `sẽ đến với ${selected.name} `
                  : 'sẽ đến với hoàn cảnh đang cần nhất '}
                trong vòng 24 giờ. Biên lai và cập nhật sẽ được gửi qua email.
              </p>
              <button
                type="button"
                onClick={close}
                className={buttonClass('dark', 'md', 'mt-6')}
              >
                Đóng
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-sm font-medium text-brand-600">
                Có nhiêu góp nhiêu
              </p>
              <h2
                id="donate-title"
                className="mt-1 pr-8 text-balance text-xl font-semibold"
              >
                {selected ? `Góp cho ${selected.name}` : 'Góp cho anh em thợ'}
              </h2>

              <label className="mt-5 block text-sm font-medium text-ink-700">
                Hoàn cảnh
                <select
                  value={caseId}
                  onChange={(event) => setCaseId(event.target.value)}
                  className={fieldClass}
                >
                  <option value="general">
                    Để quỹ phân bổ cho hoàn cảnh cần nhất
                  </option>
                  {cases.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}, {item.trade.toLowerCase()}, {item.location}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="mt-5">
                <legend className="text-sm font-medium text-ink-700">
                  Số tiền
                </legend>
                <div className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {presets.map((option) => {
                    const active = customAmount === 0 && preset === option
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setPreset(option)
                          setCustom('')
                        }}
                        aria-pressed={active}
                        className={`rounded-xl px-2 py-2.5 text-sm font-semibold transition ${
                          active
                            ? 'bg-ink-900 text-white'
                            : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
                        }`}
                      >
                        {option / 1_000}k
                      </button>
                    )
                  })}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Hoặc nhập số tiền tùy tâm"
                    value={custom}
                    onChange={(event) => setCustom(event.target.value)}
                    className={`${fieldClass} pr-12`}
                  />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-ink-400">
                    VND
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-500" aria-live="polite">
                  {impact
                    ? `${formatVnd(amount)} tương đương ${impact.label}.`
                    : 'Mỗi đồng đều được chuyển thẳng đến gia đình thợ.'}
                </p>
              </fieldset>

              <fieldset className="mt-5">
                <legend className="text-sm font-medium text-ink-700">
                  Phương thức
                </legend>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {methods.map((option) => {
                    const Icon = option.icon
                    const active = method === option.id
                    return (
                      <label
                        key={option.id}
                        className={`cursor-pointer rounded-xl px-3 py-3 text-left transition ${
                          active
                            ? 'bg-brand-50 ring-2 ring-brand-300'
                            : 'bg-ink-100 hover:bg-ink-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="method"
                          value={option.id}
                          checked={active}
                          onChange={() => setMethod(option.id)}
                          className="sr-only"
                        />
                        <Icon
                          className={`size-5 ${active ? 'text-brand-600' : 'text-ink-500'}`}
                          aria-hidden
                        />
                        <span className="mt-2 block text-sm font-semibold text-ink-900">
                          {option.label}
                        </span>
                        <span className="block text-xs text-ink-500">
                          {option.hint}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <label className="mt-5 flex items-center gap-2.5 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(event) => setAnonymous(event.target.checked)}
                  className="size-4 rounded accent-brand-500"
                />
                Góp ẩn danh
              </label>

              <button
                type="submit"
                className={buttonClass('primary', 'lg', 'mt-6 w-full')}
              >
                Góp {formatVnd(amount)}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-500">
                <ShieldCheck className="size-4 text-emerald-600" aria-hidden />
                Giao dịch được mã hóa. Không có mức tối thiểu.
              </p>
            </form>
          )}
        </div>
      </dialog>
    </DonateContext.Provider>
  )
}
