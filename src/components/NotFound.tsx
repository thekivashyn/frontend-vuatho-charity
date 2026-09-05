import { ArrowLeft } from 'lucide-react'

import { buttonClass } from '#/components/ui/Button'

export function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink-50 px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-brand-600">Lỗi 404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Trang này không tồn tại
        </h1>
        <p className="mt-3 text-ink-600">
          Đường dẫn có thể đã thay đổi. Mời bạn trở về trang chủ Vua Thợ.
        </p>
        <a href="/" className={buttonClass('dark', 'md', 'mt-8')}>
          <ArrowLeft className="size-4" aria-hidden />
          Về trang chủ
        </a>
      </div>
    </main>
  )
}
