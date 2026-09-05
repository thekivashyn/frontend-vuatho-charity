import { useInView } from '#/hooks/useInView'

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Delay in milliseconds, useful for staggering siblings. */
  delay?: number
}

/**
 * Fades and slides content in the first time it scrolls into view.
 * Only opacity and transform animate, so the browser can composite it
 * without re-laying out the page.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-reveal-visible={inView}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-700 ease-out-expo motion-reduce:transition-none ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
