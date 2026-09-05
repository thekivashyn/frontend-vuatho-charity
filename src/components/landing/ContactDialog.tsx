import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageCircleHeart,
  Phone,
  X,
} from 'lucide-react'
import type { FormEvent, ReactNode } from 'react'
import { contact, topicLabels } from '#/data/content'
import type { SupportTopic } from '#/data/content'

type ContactContextValue = { open: (topic?: SupportTopic) => void }
const ContactContext = createContext<ContactContextValue | null>(null)
export function useContact(): ContactContextValue {
  const context = useContext(ContactContext)
  if (!context)
    throw new Error('useContact must be used inside ContactProvider')
  return context
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const topicRef = useRef<HTMLSelectElement>(null)
  const previewTitleRef = useRef<HTMLHeadingElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [topic, setTopic] = useState<SupportTopic>('tim-hieu')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [prepared, setPrepared] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const [error, setError] = useState('')

  const open = useCallback((nextTopic: SupportTopic = 'tim-hieu') => {
    setTopic(nextTopic)
    setName('')
    setMessage('')
    setPrepared(false)
    setCopyStatus('')
    setError('')
    setIsOpen(true)
    dialogRef.current?.showModal()
  }, [])
  const value = useMemo(() => ({ open }), [open])

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    if (prepared) previewTitleRef.current?.focus({ preventScroll: true })
    else topicRef.current?.focus({ preventScroll: true })
    dialogRef.current?.scrollTo({ top: 0 })
  }, [isOpen, prepared])

  const subject = `[Vua Thợ] ${topicLabels[topic]}`
  const body = `Chào đội ngũ Vua Thợ,\n\n${name.trim() ? `Tôi là ${name.trim()}.\n` : ''}Tôi muốn trao đổi về: ${topicLabels[topic].toLowerCase()}.\n\n${message.trim()}\n\nMong được kết nối với Vua Thợ. Xin cảm ơn!`
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const close = () => dialogRef.current?.close()
  const prepare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!message.trim()) {
      setError('Bạn chia sẻ thêm một chút về điều mình muốn trao đổi nhé.')
      messageRef.current?.focus()
      return
    }
    setError('')
    setPrepared(true)
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `Người nhận: ${contact.email}\nTiêu đề: ${subject}\n\n${body}`,
      )
      setCopyStatus('Đã sao chép nội dung email.')
    } catch {
      setCopyStatus(
        'Chưa sao chép được. Bạn có thể chọn và sao chép nội dung bên trên.',
      )
    }
  }

  return (
    <ContactContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="contact-title"
        aria-describedby="contact-description"
        className="contact-dialog"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              close()
          }
        }}
      >
        <div className="dialog-inner">
          <button
            type="button"
            onClick={close}
            className="icon-button dialog-close"
            aria-label="Đóng cửa sổ liên hệ"
          >
            <X size={21} aria-hidden />
          </button>
          <div className="dialog-symbol">
            <MessageCircleHeart size={27} strokeWidth={1.4} aria-hidden />
          </div>
          <p className="eyebrow">MỘT CUỘC TRÒ CHUYỆN, MỘT KHỞI ĐẦU</p>
          <h2 id="contact-title" ref={previewTitleRef} tabIndex={-1}>
            {prepared
              ? 'Lời nhắn của bạn đã sẵn sàng.'
              : topic === 'can-giup'
                ? 'Mình cùng tìm một điểm tựa.'
                : 'Vua Thợ rất vui được kết nối.'}
          </h2>
          <p id="contact-description" className="dialog-description">
            {prepared
              ? 'Bạn xem lại nội dung, rồi mở ứng dụng email để gửi đến đội ngũ Vua Thợ.'
              : 'Chia sẻ đôi điều để chuẩn bị email gửi đến đội ngũ. Bạn cũng có thể gọi điện hoặc nhắn qua Zalo.'}
          </p>
          {prepared ? (
            <div className="email-preview">
              <div className="email-recipient">
                <span>Gửi đến</span>
                <strong>{contact.email}</strong>
              </div>
              <label htmlFor="email-body">Nội dung email</label>
              <textarea
                id="email-body"
                readOnly
                value={`Tiêu đề: ${subject}\n\n${body}`}
                rows={9}
              />
              <a href={mailto} className="button button-blue">
                <Mail size={17} aria-hidden />
                Mở ứng dụng email
                <ArrowUpRight size={17} aria-hidden />
              </a>
              <button
                type="button"
                className="button button-outline"
                onClick={copy}
              >
                {copyStatus.startsWith('Đã') ? (
                  <Check size={16} aria-hidden />
                ) : (
                  <Copy size={16} aria-hidden />
                )}
                Sao chép nội dung
              </button>
              <p className="form-note" role="status">
                {copyStatus ||
                  'Email chưa được gửi. Hãy bấm Gửi trong ứng dụng email của bạn.'}
              </p>
              <button
                type="button"
                className="text-link edit-message"
                onClick={() => {
                  setPrepared(false)
                  setCopyStatus('')
                }}
              >
                <ArrowLeft size={16} aria-hidden />
                Chỉnh sửa lời nhắn
              </button>
            </div>
          ) : (
            <form onSubmit={prepare} className="contact-form">
              <label htmlFor="contact-topic">
                Bạn muốn kết nối về điều gì?
              </label>
              <select
                id="contact-topic"
                ref={topicRef}
                value={topic}
                onChange={(event) =>
                  setTopic(event.target.value as SupportTopic)
                }
              >
                {Object.entries(topicLabels).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <label htmlFor="contact-name">
                Tên của bạn <span>(không bắt buộc)</span>
              </label>
              <input
                id="contact-name"
                autoComplete="name"
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Để mình tiện xưng hô"
              />
              <label htmlFor="contact-message">Điều bạn muốn chia sẻ</label>
              <textarea
                id="contact-message"
                ref={messageRef}
                required
                maxLength={1200}
                rows={4}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value)
                  if (error) setError('')
                }}
                placeholder={
                  topic === 'can-giup'
                    ? 'Bạn đang làm nghề gì, ở đâu và đang cần giúp điều gì?'
                    : 'Bạn muốn hỏi về khoản đóng góp, cách phân bổ hoặc một giao dịch cần kiểm tra…'
                }
                aria-invalid={error ? true : undefined}
                aria-describedby={
                  error ? 'message-error message-privacy' : 'message-privacy'
                }
              />
              {error && (
                <p id="message-error" className="form-error" role="alert">
                  {error}
                </p>
              )}
              <p id="message-privacy" className="form-note">
                Chỉ cần thông tin khái quát. Chưa cần gửi giấy tờ cá nhân hoặc
                hồ sơ sức khỏe.
              </p>
              <button type="submit" className="button button-blue">
                Xem trước lời nhắn
                <ArrowUpRight size={18} aria-hidden />
              </button>
              <p className="form-note">
                Nội dung chỉ được gửi khi bạn gửi email từ ứng dụng của mình.
              </p>
            </form>
          )}
          <div className="dialog-direct">
            <a href={contact.phoneHref}>
              <Phone size={15} aria-hidden />
              {contact.phone}
            </a>
            <a href={contact.zalo} target="_blank" rel="noreferrer">
              Nhắn Zalo
              <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </div>
      </dialog>
    </ContactContext.Provider>
  )
}
