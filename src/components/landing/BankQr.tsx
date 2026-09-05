import { useEffect, useState } from 'react'
import { Download, QrCode, RotateCw, Smartphone } from 'lucide-react'
import { donationAccount, donationReference } from '#/data/donation'
import { buildVietQr } from '#/lib/vietqr'
import { formatVnd } from '#/lib/format'

type QrImages = { code: string; download: string }

// All graphics and the downloadable card are created locally. The square QR and
// four-module quiet zone remain untouched by the decorative frame and text.
async function createImages(amount: number): Promise<QrImages> {
  const { default: QRCode } = await import('qrcode')
  const code = await QRCode.toDataURL(
    buildVietQr({
      bankBin: donationAccount.bankBin,
      accountNumber: donationAccount.accountNumber,
      amount,
      reference: donationReference,
    }),
    {
      width: 720,
      margin: 4,
      errorCorrectionLevel: 'M',
      color: { dark: '#102C2C', light: '#FFFFFF' },
    },
  )

  const qrImage = new Image()
  qrImage.src = code
  await qrImage.decode()
  const canvas = document.createElement('canvas')
  canvas.width = 960
  canvas.height = 1340
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')
  ctx.fillStyle = '#FAF7EF'
  ctx.fillRect(0, 0, 960, 1340)
  ctx.fillStyle = '#173D3B'
  ctx.fillRect(0, 0, 960, 200)
  ctx.textAlign = 'center'
  ctx.fillStyle = '#ECCD96'
  ctx.font = 'bold 34px sans-serif'
  ctx.fillText('VUA THO', 480, 77)
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '28px sans-serif'
  ctx.fillText('Gửi một tấm lòng', 480, 134)
  ctx.fillStyle = '#173D3B'
  ctx.font = 'bold 36px sans-serif'
  ctx.fillText('MB Bank · VietQR', 480, 272)
  ctx.drawImage(qrImage, 120, 312, 720, 720)
  ctx.font = 'bold 27px sans-serif'
  ctx.fillText(donationAccount.accountHolder, 480, 1074)
  ctx.font = 'bold 39px sans-serif'
  ctx.fillText(donationAccount.accountNumber, 480, 1130)
  ctx.font = 'bold 36px sans-serif'
  ctx.fillText(formatVnd(amount), 480, 1188)
  ctx.font = '24px sans-serif'
  ctx.fillText(donationReference, 480, 1236)
  ctx.fillStyle = '#5F6D68'
  ctx.font = '20px sans-serif'
  ctx.fillText(
    'Kiểm tra người nhận và xác nhận trong ứng dụng ngân hàng.',
    480,
    1295,
  )
  return { code, download: canvas.toDataURL('image/png') }
}

export function BankQr({ amount }: { amount: number }) {
  const [images, setImages] = useState<QrImages | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let cancelled = false
    createImages(amount).then(
      (result) => {
        if (!cancelled) setImages(result)
      },
      () => {
        if (!cancelled) setFailed(true)
      },
    )
    return () => {
      cancelled = true
    }
  }, [amount, attempt])

  return (
    <div className="bank-qr live-bank-qr">
      <div className="qr-gift-card">
        <div className="qr-gift-header">
          <span>GỬI MỘT TẤM LÒNG</span>
          <strong>MB Bank</strong>
        </div>
        <div className="qr-gift-content">
          <p className="qr-amount-label">Khoản góp của bạn</p>
          <strong className="qr-selected-amount">{formatVnd(amount)}</strong>
          <div className="qr-code-surface" aria-busy={!images && !failed}>
            {images ? (
              <img
                src={images.code}
                alt={`VietQR chuyển ${formatVnd(amount)} đến MB Bank, tài khoản ${donationAccount.accountNumber}, nội dung ${donationReference}.`}
                width={720}
                height={720}
              />
            ) : (
              <div className="qr-loading" role="status">
                <QrCode size={44} strokeWidth={1.25} aria-hidden />
                <p>{failed ? 'Chưa tạo được mã QR.' : 'Đang tạo mã QR…'}</p>
              </div>
            )}
          </div>
          <p className="qr-recipient">{donationAccount.accountHolder}</p>
          <p className="qr-account-number">{donationAccount.accountNumber}</p>
          <span className="qr-format-label">
            VietQR · Chuyển khoản ngân hàng
          </span>
        </div>
      </div>
      {failed ? (
        <div className="qr-retry">
          <p>Bạn có thể nhập thông tin tài khoản bên dưới để chuyển khoản.</p>
          <button
            className="text-link"
            type="button"
            onClick={() => {
              setFailed(false)
              setImages(null)
              setAttempt((value) => value + 1)
            }}
          >
            <RotateCw size={16} aria-hidden /> Tạo lại mã QR
          </button>
        </div>
      ) : images ? (
        <a
          className="button button-outline qr-download"
          href={images.download}
          download={`Vua-Tho-MB-${donationAccount.accountNumber}-${amount}VND.png`}
        >
          <Download size={17} aria-hidden /> Tải ảnh QR
        </a>
      ) : null}
      <div className="qr-phone-guide">
        <Smartphone size={19} aria-hidden />
        <p>
          <strong>Đang xem trên điện thoại?</strong> Tải ảnh QR, mở ứng dụng
          ngân hàng → Quét QR → chọn ảnh từ thư viện. Tên chức năng có thể khác
          tùy ngân hàng.
        </p>
      </div>
      <p className="qr-scan-guide">
        Quét bằng ứng dụng ngân hàng hỗ trợ VietQR. Mã đã có tài khoản, số tiền
        và nội dung; bạn kiểm tra người nhận rồi xác nhận chuyển.
      </p>
    </div>
  )
}
