import { useLayoutEffect, useRef, useState } from 'react'

import { CategoryIcon } from '#/components/ui/CategoryIcon'
import type { CaseCategory } from '#/data/content'

type CaseImageProps = {
  src: string
  alt: string
  category: CaseCategory
  className?: string
  eager?: boolean
}

function isDecoded(img: HTMLImageElement) {
  return img.complete && img.naturalWidth > 0
}

/**
 * Photo with a soft, icon-based placeholder. Cached images are marked
 * loaded on mount — `onLoad` does not always fire for cache hits, which
 * used to leave the photo invisible until the card remounted.
 */
export function CaseImage({
  src,
  alt,
  category,
  className = '',
  eager = false,
}: CaseImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const pending = !loaded && !failed

  useLayoutEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true)
      setLoaded(false)
      return
    }
    setFailed(false)
    setLoaded(Boolean(img && isDecoded(img)))
  }, [src])

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
          ref={imgRef}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out-expo group-hover:scale-[1.04] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
