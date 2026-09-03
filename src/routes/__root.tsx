import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#f45f22' },
      { title: 'Vua Thợ Charity - Thợ giúp thợ, có nhiêu góp nhiêu' },
      {
        name: 'description',
        content:
          'Quỹ tương trợ của cộng đồng thợ Việt Nam. Hỗ trợ anh em thợ gặp tai nạn lao động, bệnh hiểm nghèo, mất kế sinh nhai. Không có mức góp tối thiểu.',
      },
      { property: 'og:title', content: 'Vua Thợ Charity' },
      {
        property: 'og:description',
        content: 'Khi một người thợ gục ngã, cả cộng đồng thợ đỡ lấy.',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23f45f22'/%3E%3Ctext x='32' y='41' font-family='Arial, sans-serif' font-size='26' font-weight='700' fill='white' text-anchor='middle'%3EVT%3C/text%3E%3C/svg%3E",
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
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
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
