import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 800)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <button
      type="button"
      aria-label="Lên đầu trang"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'instant'
            : 'smooth',
        })
      }
      tabIndex={visible ? 0 : -1}
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
    >
      <ArrowUp size={19} aria-hidden />
    </button>
  )
}
