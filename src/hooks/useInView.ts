import { useEffect, useRef, useState } from 'react'

/**
 * Reports whether the referenced element has entered the viewport.
 *
 * Starts as `true` so server-rendered HTML is fully visible without
 * JavaScript. After hydration, elements already on screen stay visible;
 * elements below the fold are hidden and revealed once they scroll in.
 * Fires once and stays true, so reveal animations never replay.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const rect = element.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
    if (alreadyVisible) return

    setInView(false)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    const onPreferenceChange = () => {
      if (reducedMotion.matches) {
        setInView(true)
        observer.disconnect()
      }
    }
    reducedMotion.addEventListener('change', onPreferenceChange)
    observer.observe(element)
    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', onPreferenceChange)
    }
  }, [threshold])

  return { ref, inView }
}
