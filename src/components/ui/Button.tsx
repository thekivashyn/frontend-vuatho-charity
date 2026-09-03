const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
} as const

const variants = {
  primary: 'bg-brand-500 text-white shadow-soft hover:bg-brand-600',
  secondary: 'bg-ink-100 text-ink-900 hover:bg-ink-200',
  dark: 'bg-ink-900 text-white hover:bg-ink-800',
  ghost: 'text-ink-700 hover:bg-ink-100',
  white: 'bg-white text-ink-900 shadow-soft hover:bg-ink-50',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

/** Shared button classes so links and buttons look identical. */
export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  extra = '',
): string {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`.trim()
}
