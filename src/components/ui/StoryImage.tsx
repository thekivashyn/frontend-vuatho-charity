type StoryImageProps = {
  name:
    | 'homecoming'
    | 'home-stilllife'
    | 'kindness'
    | 'careful-records'
    | 'new-morning'
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export function StoryImage({
  name,
  alt,
  className,
  sizes = '(max-width: 700px) 100vw, 50vw',
  priority = false,
}: StoryImageProps) {
  return (
    <img
      className={className}
      src={`/images/${name}.jpg`}
      srcSet={`/images/${name}-768.jpg 768w, /images/${name}.jpg 1536w`}
      sizes={sizes}
      alt={alt}
      width={1536}
      height={1024}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'auto' : 'async'}
    />
  )
}
