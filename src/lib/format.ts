/** "50.000đ", the way Vietnamese readers expect it. */
export function formatVnd(amount: number): string {
  return `${Math.round(amount).toLocaleString('vi-VN')}đ`
}

/** "78 triệu", "1,2 tỷ", or the full amount below one million. */
export function formatCompactVnd(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1).replace('.', ',')} tỷ`
  }
  if (amount >= 1_000_000) {
    return `${Math.round(amount / 1_000_000)} triệu`
  }
  return formatVnd(amount)
}

export function percent(raised: number, goal: number): number {
  if (goal <= 0) return 0
  return Math.min(100, Math.round((raised / goal) * 100))
}
