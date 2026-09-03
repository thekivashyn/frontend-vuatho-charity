import { useEffect, useState } from 'react'
import { HeartHandshake, Menu, X } from 'lucide-react'

import { useDonate } from '#/components/landing/DonateDialog'
import { buttonClass } from '#/components/ui/Button'

const navItems = [
  { href: '#hoan-canh', label: 'Hoàn cảnh' },
  { href: '#gop', label: 'Góp bao nhiêu cũng quý' },
  { href: '#cach-hoat-dong', label: 'Cách hoạt động' },
  { href: '#minh-bach', label: 'Minh bạch' },
  { href: '#hoi-dap', label: 'Hỏi đáp' },
]

/**
 * Highlights the nav item whose section sits under a line 40% down the
 * viewport. Reads at most one layout per frame while scrolling.
 */
function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section[id]'),
    )
    if (sections.length === 0) return

    const linked = new Set(navItems.map((item) => item.href))
    let frame = 0

    const update = () => {
      frame = 0
      if (window.scrollY < 200) {
        setActive(null)
        return
      }
      const line = window.innerHeight * 0.4
      const hit = sections.find((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= line && rect.bottom > line
      })
      const href = hit ? `#${hit.id}` : null
      setActive(href !== null && linked.has(href) ? href : null)
    }

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return active
}

export function Header() {
  const { open } = useDonate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const linkClass = (href: string, mobile = false) => {
    const current = active === href
    const shape = mobile
      ? 'rounded-xl px-3 py-3 text-sm'
      : 'rounded-full px-3.5 py-2'
    return `${shape} font-medium transition-[background-color,color] ${
      current
        ? 'bg-ink-100 text-ink-900'
        : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
    }`
  }

  return (
    <>
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Bỏ qua tới nội dung
      </a>

      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || menuOpen
            ? 'bg-white/90 shadow-soft backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px]">
          <a
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Vua Thợ Charity, về trang chủ"
          >
            <span className="grid size-9 place-items-center rounded-full bg-brand-500 text-white">
              <HeartHandshake className="size-5" aria-hidden />
            </span>
            <span className="whitespace-nowrap text-base font-semibold tracking-tight text-ink-900">
              Vua Thợ Charity
            </span>
          </a>

          <nav
            aria-label="Chính"
            className="hidden items-center gap-1 text-sm lg:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? 'true' : undefined}
                className={linkClass(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#tham-gia"
              className={buttonClass('ghost', 'sm', 'max-md:hidden')}
            >
              Tôi cần giúp
            </a>
            <button
              type="button"
              onClick={() => open()}
              className={buttonClass('primary', 'sm')}
            >
              Góp ngay
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              className="grid size-10 place-items-center rounded-full text-ink-700 transition-[background-color] hover:bg-ink-100 lg:hidden"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          hidden={!menuOpen}
          className="animate-fade-in lg:hidden"
        >
          <nav aria-label="Di động" className="flex flex-col px-4 pb-4 pt-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? 'true' : undefined}
                onClick={() => setMenuOpen(false)}
                className={linkClass(item.href, true)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#tham-gia"
              onClick={() => setMenuOpen(false)}
              className={buttonClass('secondary', 'md', 'mt-2 md:hidden')}
            >
              Tôi cần giúp
            </a>
          </nav>
        </div>
      </header>
    </>
  )
}
