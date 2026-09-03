import { HardHat, HeartPulse, Users, Wrench } from 'lucide-react'

import type { CaseCategory } from '#/data/content'

const icons = {
  'tai-nan': HardHat,
  'benh-tat': HeartPulse,
  'mat-viec': Wrench,
  'gia-dinh': Users,
} as const

type CategoryIconProps = {
  category: CaseCategory
  className?: string
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  const Icon = icons[category]
  return <Icon className={className} aria-hidden />
}
