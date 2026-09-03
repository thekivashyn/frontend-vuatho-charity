import { useState } from 'react'

import { CategoryIcon } from '#/components/ui/CategoryIcon'
import type { CaseCategory } from '#/data/content'

type CaseImageProps = {
  src: string
  alt: string
  category: CaseCategory
  className?: string
  eager?: boolean
}

/**
 * Photo with a soft, icon-based placeholder. The placeholder pulses while
 * loading and stays if the network or CDN fails, so nothing looks broken.
 */
export function CaseImage({
  src,
  alt,
  category,
  className = '',
  eager = false,
}: CaseImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const pending = !loaded && !failed

  return (
    <div className={`relative overflow-hidden bg-ink-100 ${className}`}>
      <div
        aria-hidden
        className={`absolute inset-0 grid place-items-center text-ink-300 ${
          pending ? 'animate-pulse' : ''
        }`}
      >
        <CategoryIcon category={category} className="size-10" />
      </div>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-500 ease-out-quart group-hover:scale-[1.03] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
