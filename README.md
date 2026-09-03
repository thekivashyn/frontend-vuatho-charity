# Vua Thợ Charity

Landing page cho quỹ tương trợ của cộng đồng thợ Việt Nam. Thợ giúp thợ, có nhiêu góp nhiêu.

## Stack

- TanStack Start (SSR) + TanStack Router, file-based routing trong `src/routes/`
- Vite 8, React 19, Tailwind CSS 4, lucide-react
- TypeScript 7 (compiler native) cho `tsc`, TypeScript 6 song song cho tooling

## Lệnh

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck    # tsc --noEmit bằng TypeScript 7
pnpm lint
pnpm format
pnpm build
pnpm preview
```

## Cấu trúc

```
src/
  routes/            __root.tsx (head, font, favicon), index.tsx (ghép các section)
  components/
    landing/         Header, Hero, Stats, Cases, GiveAnyAmount, HowItWorks,
                     Transparency, Testimonials, CallToAction, Faq, Footer,
                     DonateDialog (context + <dialog>), BackToTop
    ui/              Button (buttonClass), Reveal, SectionHeading, CaseImage, CategoryIcon
  data/content.ts    Toàn bộ nội dung: hoàn cảnh, bảng quy đổi, số liệu, FAQ
  hooks/             useInView (reveal khi cuộn), useCountUp (số chạy)
  lib/format.ts      formatVnd, formatCompactVnd, percent
  styles.css         Token màu, easing, shadow; transition cho dialog và details
```

## Ghi chú kỹ thuật

- **TypeScript 7 và tooling.** `typescript-eslint` chưa hỗ trợ TS 7.0, nên `package.json` alias `typescript` sang `@typescript/typescript6` cho ESLint, còn `@typescript/native` alias sang `typescript@7`. Lệnh `tsc` là compiler Go, `tsc6` là bản 6.
- **pnpm 11** không đọc `pnpm.onlyBuiltDependencies` trong `package.json`. Danh sách package được chạy build script nằm ở `pnpm-workspace.yaml` (`allowBuilds`).
- **Motion.** `--default-transition-duration` và `--default-transition-timing-function` trong `styles.css` áp cho mọi utility `transition`. Dialog dùng `@starting-style` để có cả hiệu ứng mở và đóng. FAQ dùng `::details-content` để mở/đóng mượt ở trình duyệt hỗ trợ. Progress bar animate bằng `transform: scaleX()` thay vì `width`.
- **Không có JS vẫn đọc được.** `Reveal` và `useCountUp` render trạng thái cuối trên server, chỉ ẩn/đặt về 0 sau khi hydrate cho phần nằm dưới fold.
- **Ảnh** hiện lấy từ Unsplash để làm mẫu, có placeholder icon khi lỗi. Thay bằng ảnh thật của từng hoàn cảnh trong `src/data/content.ts`.
