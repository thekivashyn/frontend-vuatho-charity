import { useEffect, useState } from 'react'
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
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])
  return (
    <>
      <a href="#noi-dung" className="skip-link">
        Đến nội dung chính
      </a>
      <div className="top-note">
        Từ đôi bàn tay lành nghề, đến những điều tử tế.
      </div>
      <header className="site-header">
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
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="button button-small button-blue"
              onClick={() => open('can-giup')}
            >
              Tôi cần giúp đỡ <ArrowUpRight size={16} aria-hidden />
            </button>
            <button
              id="menu-toggle"
              className="icon-button menu-toggle"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
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
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                activeSection === link.href ? 'location' : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={16} aria-hidden />
            </a>
          ))}
        </nav>
      </header>
    </>
  )
}
