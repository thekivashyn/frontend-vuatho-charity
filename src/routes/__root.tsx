import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import sectionsCss from '../styles/sections.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#183d62' },
      { title: 'Vua Thợ — Vững một tay nghề. Ấm một mái nhà.' },
      {
        name: 'description',
        content:
          'Gửi góp tự nguyện cùng Vua Thợ. Công ty tiếp nhận và xem xét phân bổ hỗ trợ cho người thợ, gia đình gặp khó khăn.',
      },
      {
        property: 'og:title',
        content: 'Vua Thợ — Vững một tay nghề. Ấm một mái nhà.',
      },
      {
        property: 'og:description',
        content:
          'Mỗi khoản góp là một tấm lòng. Cùng Vua Thợ đỡ đần người thợ và gia đình qua những ngày khó.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'vi_VN' },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: sectionsCss },
    ],
  }),
  shellComponent: RootDocument,
})
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
