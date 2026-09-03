import { ArrowUpRight, HeartHandshake, Mail, MapPin, Phone } from 'lucide-react'

const columns = [
  {
    title: 'Quỹ',
    links: [
      'Về chúng tôi',
      'Đội ngũ điều hành',
      'Báo cáo tài chính',
      'Đối tác',
    ],
  },
  {
    title: 'Tham gia',
    links: [
      'Góp cho hoàn cảnh',
      'Gia nhập mạng lưới',
      'Doanh nghiệp đồng hành',
      'Gửi hoàn cảnh',
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      'Câu hỏi thường gặp',
      'Chính sách hoàn tiền',
      'Điều khoản sử dụng',
      'Chính sách bảo mật',
    ],
  },
]

const socials = [
  { label: 'Facebook', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Zalo', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-8">
        <div>
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-brand-500 text-white">
              <HeartHandshake className="size-5" aria-hidden />
            </span>
            <span className="text-base font-semibold tracking-tight text-ink-900">
              Vua Thợ Charity
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
            Quỹ tương trợ của cộng đồng thợ Việt Nam. Thợ giúp thợ, người thương
            thợ giúp thợ. Có nhiêu góp nhiêu.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-ink-700">
            <li className="flex items-start gap-2.5">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-ink-400"
                aria-hidden
              />
              Tầng 8, 123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
            </li>
            <li>
              <a
                href="tel:19006868"
                className="inline-flex items-center gap-2.5 hover:text-brand-600"
              >
                <Phone className="size-4 text-ink-400" aria-hidden />
                1900 6868 (8h đến 22h)
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@vuatho.charity"
                className="inline-flex items-center gap-2.5 hover:text-brand-600"
              >
                <Mail className="size-4 text-ink-400" aria-hidden />
                hello@vuatho.charity
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="inline-flex h-9 items-center gap-1 rounded-full bg-ink-100 px-3.5 text-xs font-medium text-ink-700 transition hover:bg-ink-200 hover:text-ink-900"
              >
                {social.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-sm font-semibold text-ink-900">{column.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-600">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="transition hover:text-brand-600">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 pb-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Quỹ Vua Thợ Charity.</p>
        <p>Giấy phép thành lập quỹ số 123/GP-BNV do Bộ Nội vụ cấp.</p>
      </div>
    </footer>
  )
}
