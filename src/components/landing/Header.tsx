import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { BrandLogo } from '#/components/ui/BrandLogo'
import { useContact } from '#/components/landing/ContactDialog'

const links = [
  { href: '#su-menh', label: 'Tấm lòng Vua Thợ' },
  { href: '#dong-hanh', label: 'Cùng chung tay' },
  { href: '#minh-bach', label: 'Điều làm nên niềm tin' },
  { href: '#hoi-dap', label: 'Hỏi đáp' },
]
export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    let observer: IntersectionObserver | undefined
    const observeSections = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          const current = entries.find((entry) => entry.isIntersecting)
          if (current)
            setActiveSection(
              current.target.id === 'bat-dau' ? '' : '#' + current.target.id,
            )
        },
        // Pixel margins keep the reading band proportional to viewport height.
        {
          rootMargin: `-100px 0px -${Math.round(window.innerHeight * 0.6)}px 0px`,
          threshold: 0,
        },
      )
      for (const id of [
        'bat-dau',
        ...links.map((link) => link.href.slice(1)),
      ]) {
        const section = document.getElementById(id)
        if (section) observer.observe(section)
      }
    }
    observeSections()
    window.addEventListener('resize', observeSections)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', observeSections)
    }
  }, [])
  const { open } = useContact()
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    const onOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1001px)')
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onOutside)
    desktop.addEventListener('change', onDesktop)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])
  return (
    <>
      <a href="#noi-dung" className="skip-link">
        Đến nội dung chính
      </a>
      <div className="top-note atelier-note">
        <span aria-hidden className="nav-spark">
          ✦
        </span>
        Cùng nhau làm điều tử tế.
        <span className="nav-note-end">Vì người thợ. Vì những mái nhà.</span>
      </div>
      <header
        className="site-header atelier-header"
        ref={headerRef}
        onBlur={(event) => {
          if (
            event.relatedTarget &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            setMenuOpen(false)
        }}
      >
        <div className="page-width header-inner">
          <a
            href="/"
            aria-label="Vua Thợ — về trang chủ"
            className="brand-link"
          >
            <BrandLogo />
          </a>
          <nav className="desktop-nav" aria-label="Điều hướng chính">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={
                  activeSection === link.href ? 'location' : undefined
                }
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="nav-help-link" onClick={() => open('can-giup')}>
              Tôi cần giúp đỡ
            </button>
            <a
              href="#dong-hanh"
              className="nav-give-button"
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-give-desktop">Gửi một tấm lòng</span>
              <span className="nav-give-mobile">Gửi góp</span>
              <span className="nav-give-arrow" aria-hidden>
                <ArrowUpRight size={16} />
              </span>
            </a>
            <button
              id="menu-toggle"
              className="icon-button menu-toggle"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((previous) => !previous)}
            >
              {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav page-width"
          aria-label="Điều hướng di động"
          hidden={!menuOpen}
        >
          <div className="nav-menu-intro">
            <span>CÙNG VUA THỢ</span>
            <p>
              Một cộng đồng.
              <br />
              <em>Chung một tấm lòng.</em>
            </p>
          </div>
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                activeSection === link.href ? 'location' : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-menu-number" aria-hidden>
                0{index + 1}
              </span>
              <span>{link.label}</span>
              <ArrowUpRight size={16} aria-hidden />
            </a>
          ))}
          <div className="nav-menu-footer">
            <p>
              Khi cần một điểm tựa,
              <br />
              Vua Thợ sẵn lòng lắng nghe.
            </p>
            <button
              onClick={() => {
                setMenuOpen(false)
                document
                  .getElementById('menu-toggle')
                  ?.focus({ preventScroll: true })
                open('can-giup')
              }}
            >
              Tôi cần giúp đỡ <ArrowUpRight size={15} aria-hidden />
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}
