import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  HandHeart,
  Heart,
  HeartPulse,
  House,
  Landmark,
} from 'lucide-react'
import type { FormEvent } from 'react'
import { useContact } from '#/components/landing/ContactDialog'
import {
  donationAccount,
  donationPresets,
  donationReference,
  isDonationAccountReady,
  parseDonationAmount,
} from '#/data/donation'
import { BankQr } from '#/components/landing/BankQr'
import { formatVnd } from '#/lib/format'

const purposes = [
  {
    icon: HeartPulse,
    title: 'Thêm điểm tựa lúc đau ốm',
    text: 'San sẻ gánh nặng khi sức khỏe khiến người thợ phải tạm dừng công việc.',
  },
  {
    icon: House,
    title: 'Đỡ đần những ngày khó',
    text: 'Hỗ trợ nhu cầu thiết yếu của người thợ và gia đình trong lúc chật vật.',
  },
  {
    icon: HandHeart,
    title: 'Tiếp sức để bước tiếp',
    text: 'Dành sự giúp đỡ cho hoàn cảnh cần thiết, theo xem xét của đội ngũ Vua Thợ.',
  },
]

export function WaysToHelp() {
  const { open } = useContact()
  const [preset, setPreset] = useState<number | null>(100_000)
  const [custom, setCustom] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [transfer, setTransfer] = useState(false)
  const [amountError, setAmountError] = useState('')
  const [consentError, setConsentError] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const previousStepRef = useRef(transfer)
  const amountRef = useRef<HTMLInputElement>(null)
  const consentRef = useRef<HTMLInputElement>(null)
  const ready = isDonationAccountReady(donationAccount)
  const amount = preset ?? parseDonationAmount(custom)

  useEffect(() => {
    if (previousStepRef.current === transfer) return
    previousStepRef.current = transfer
    titleRef.current?.focus({ preventScroll: true })
    titleRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, [transfer])

  function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAmountError(
      amount === null
        ? 'Bạn nhập số tiền nguyên dương bằng VND, tối đa 12 chữ số nhé.'
        : '',
    )
    setConsentError(
      accepted
        ? ''
        : 'Bạn cần đọc và xác nhận nguyên tắc đóng góp trước khi tiếp tục.',
    )
    if (amount === null) {
      amountRef.current?.focus()
      return
    }
    if (!accepted) {
      consentRef.current?.focus()
      return
    }
    setCopyStatus('')
    setTransfer(true)
  }

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopyStatus(`Đã sao chép ${label}.`)
    } catch {
      setCopyStatus(
        'Chưa sao chép được. Bạn có thể chọn và sao chép trực tiếp thông tin đang hiển thị.',
      )
    }
  }

  return (
    <section
      id="dong-hanh"
      className="ways-section section-space"
      aria-labelledby="ways-title"
    >
      <div className="page-width donation-layout">
        <div className="donation-story">
          <p className="eyebrow">
            <span className="section-number" aria-hidden>
              02
            </span>{' '}
            GỬI MỘT TẤM LÒNG
          </p>
          <h2 id="ways-title">
            Bạn góp chút yêu thương.
            <br />
            <em>
              Vua Thợ thay bạn
              <br />
              gửi đến nơi cần.
            </em>
          </h2>
          <p className="donation-intro">
            Có những lúc, một gia đình chỉ cần thêm một điểm tựa để đi qua ngày
            khó. Mỗi khoản góp, dù nhỏ, đều có thể tiếp thêm sự ấm áp ấy.
          </p>
          <a
            href="#chon-khoan-gop"
            className="button button-blue donation-mobile-jump"
          >
            Chọn khoản góp của bạn <ArrowDown size={17} aria-hidden />
          </a>
          <div className="donation-purpose">
            {purposes.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span className="purpose-emblem" aria-hidden>
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="allocation-note">
            <div>
              <strong>Gửi gắm tấm lòng, cùng hiểu cách trao.</strong>
              <p>
                Khoản góp được tiếp nhận chung. Vua Thợ trực tiếp xem xét, lựa
                chọn và phân bổ cho hoàn cảnh phù hợp trong phạm vi mục đích hỗ
                trợ đã công bố.
              </p>
              <a href="#minh-bach" className="text-link">
                Hiểu cách Vua Thợ phân bổ
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </div>
          <button
            className="text-link donation-business"
            onClick={() => open('doanh-nghiep')}
          >
            Doanh nghiệp muốn đồng hành?
            <ArrowUpRight size={16} aria-hidden />
          </button>
        </div>
        <div id="chon-khoan-gop" className="donation-card">
          <div className="donation-card-heading">
            <div>
              <p className="eyebrow">TỰ NGUYỆN TỪ TẤM LÒNG</p>
              <h3 ref={titleRef} tabIndex={-1}>
                {transfer
                  ? 'Thông tin chuyển khoản'
                  : 'Góp một chút, ấm thêm nhiều.'}
              </h3>
            </div>
          </div>
          <ol className="donation-progress" aria-label="Các bước đóng góp">
            <li
              aria-current={!transfer ? 'step' : undefined}
              data-complete={transfer}
            >
              <span aria-hidden>{transfer ? <Check size={13} /> : '1'}</span>
              Khoản góp của bạn
            </li>
            <li aria-current={transfer ? 'step' : undefined}>
              <span aria-hidden>2</span>
              Chuyển khoản
            </li>
          </ol>
          {!ready && (
            <p className="donation-preview-note">
              <span aria-hidden />
              Bản xem trước · Chưa mở tiếp nhận
            </p>
          )}
          {transfer ? (
            <div className="bank-transfer">
              <button
                className="text-link"
                onClick={() => {
                  setTransfer(false)
                  setCopyStatus('')
                }}
              >
                <ArrowLeft size={16} aria-hidden />
                Chỉnh số tiền đóng góp
              </button>
              {ready && amount !== null && (
                <BankQr key={amount} amount={amount} />
              )}
              <div className="bank-heading">
                <Landmark size={17} aria-hidden />
                <span>TÀI KHOẢN CÔNG TY</span>
              </div>
              <dl className="bank-details">
                <div>
                  <dt>Ngân hàng</dt>
                  <dd>{ready ? donationAccount.bankName : 'Sẽ cập nhật'}</dd>
                </div>
                <div>
                  <dt>Chủ tài khoản</dt>
                  <dd>{donationAccount.accountHolder}</dd>
                </div>
                <div>
                  <dt>Số tài khoản</dt>
                  <dd className="copy-row">
                    <span>
                      {ready ? donationAccount.accountNumber : 'Chưa cập nhật'}
                    </span>
                    <button
                      className="copy-icon"
                      disabled={!ready}
                      onClick={() =>
                        copy(donationAccount.accountNumber, 'số tài khoản')
                      }
                      aria-label="Sao chép số tài khoản"
                    >
                      <Copy size={16} aria-hidden />
                    </button>
                  </dd>
                </div>
                <div className="bank-amount">
                  <dt>Số tiền bạn chọn</dt>
                  <dd>{formatVnd(amount ?? 0)}</dd>
                </div>
                <div>
                  <dt>Nội dung chuyển khoản</dt>
                  <dd className="copy-row">
                    <span>{donationReference}</span>
                    <button
                      className="copy-icon"
                      disabled={!ready}
                      onClick={() =>
                        copy(donationReference, 'nội dung chuyển khoản')
                      }
                      aria-label="Sao chép nội dung chuyển khoản"
                    >
                      <Copy size={16} aria-hidden />
                    </button>
                  </dd>
                </div>
              </dl>
              <p className="bank-copy-status" role="status">
                {copyStatus}
              </p>
              <p className="bank-check-note">
                {ready
                  ? 'Trước khi xác nhận, kiểm tra đúng chủ tài khoản, số tiền và nội dung trong ứng dụng ngân hàng. Trang không tự ghi nhận giao dịch.'
                  : 'Tài khoản và QR sẽ được công ty xác nhận trước khi mở tiếp nhận. Hiện chưa thể chuyển tiền từ thông tin trên.'}
              </p>
              <button
                className="button button-blue"
                onClick={() => open(ready ? 'doi-soat' : 'tuy-tam')}
              >
                {ready ? 'Hỏi về khoản đã chuyển' : 'Trao đổi với Vua Thợ'}
                <ArrowUpRight size={17} aria-hidden />
              </button>
              <p className="form-note">
                Giữ lại chứng từ ngân hàng. Vua Thợ ghi nhận theo số tiền thực
                nhận sau đối soát.
              </p>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleContinue}
              className="donation-form"
            >
              <fieldset>
                <legend>Bạn muốn gửi góp bao nhiêu?</legend>
                <div className="donation-presets">
                  {donationPresets.map((value) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={preset === value}
                      onClick={() => {
                        setPreset(value)
                        setCustom('')
                        setAmountError('')
                      }}
                    >
                      {formatVnd(value)}
                      {preset === value && <Check size={15} aria-hidden />}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label htmlFor="donation-custom">Hoặc một khoản tùy tâm</label>
              <div className="donation-amount-input">
                <input
                  id="donation-custom"
                  ref={amountRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={12}
                  name="donationAmount"
                  placeholder="Ví dụ: 150000"
                  value={custom}
                  onChange={(event) => {
                    setCustom(event.target.value)
                    setPreset(null)
                    setAmountError('')
                  }}
                  aria-invalid={amountError ? true : undefined}
                  aria-describedby={
                    amountError ? 'donation-amount-error' : undefined
                  }
                />
                <span>VND</span>
              </div>
              {amountError && (
                <p
                  id="donation-amount-error"
                  className="form-error"
                  role="alert"
                >
                  {amountError}
                </p>
              )}
              <p className="donation-gentle-note">
                Các mức trên chỉ là gợi ý. Bạn chọn trong khả năng của mình.
              </p>
              <div className="donation-method">
                <Landmark size={24} strokeWidth={1.4} aria-hidden />
                <div>
                  <strong>Chuyển khoản ngân hàng</strong>
                  <span>MB Bank · QR tự điền số tiền và nội dung</span>
                </div>
                <Check size={17} aria-hidden />
              </div>
              <div className="donation-consent">
                <input
                  ref={consentRef}
                  id="donation-consent"
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => {
                    setAccepted(event.target.checked)
                    setConsentError('')
                  }}
                  aria-invalid={consentError ? true : undefined}
                  aria-describedby={
                    consentError ? 'donation-consent-error' : undefined
                  }
                />
                <div>
                  <label htmlFor="donation-consent">
                    Tôi hiểu đây là khoản góp tự nguyện vào nguồn hỗ trợ chung,
                    do Vua Thợ xem xét và phân bổ, không gắn với một người nhận
                    cụ thể.
                  </label>
                  <a href="#dieu-kien">
                    Đọc điều kiện đóng góp & giới hạn trách nhiệm
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                </div>
              </div>
              {consentError && (
                <p
                  id="donation-consent-error"
                  className="form-error"
                  role="alert"
                >
                  {consentError}
                </p>
              )}
              <button type="submit" className="button button-blue">
                {ready ? 'Tạo QR chuyển khoản' : 'Xem trước chuyển khoản'}
                <ArrowUpRight size={18} aria-hidden />
              </button>
              <p className="donation-submit-note">
                {ready
                  ? 'Bạn chỉ thực hiện chuyển tiền trong ứng dụng ngân hàng của mình.'
                  : 'Thao tác này chỉ xem giao diện, không phát sinh giao dịch.'}
              </p>
            </form>
          )}
          <div className="donation-card-footer">
            <Heart size={14} aria-hidden />
            Tấm lòng tùy tâm. Sự trân trọng như nhau.
          </div>
        </div>
      </div>
    </section>
  )
}
