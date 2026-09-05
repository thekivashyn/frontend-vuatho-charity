# Vua Thợ — Cùng nhau làm điều tử tế

Landing page cộng đồng với thông điệp “Vững một tay nghề. Ấm một mái nhà.” Vua Thợ tiếp nhận đóng góp tự nguyện vào tài khoản công ty, nội bộ xem xét và phân bổ cho những hoàn cảnh cần thiết.

## Chạy dự án

TanStack Start / Router, React 19, TypeScript, Vite, Tailwind CSS 4. Dùng pnpm.

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

Dev server mặc định: http://localhost:3000.

## Deploy Vercel

Push `main` để kích hoạt Git integration đang có. Không cần deploy thủ công.

- Node.js 22 và pnpm 10.34.5 được khóa trong `package.json`.
- `vercel.json` chọn framework `tanstack-start`, cài bằng Corepack và lockfile.
- `pnpm build:vercel` dùng Nitro preset `vercel`, tạo `.vercel/output` gồm static assets và SSR Function.
- Build tự kiểm tra SSR trả 200 ở trang chủ, 404 ở URL sai và có đầy đủ ảnh/CSS/JS trước khi deploy.
- Không đặt output thành `dist/client` hoặc rewrite mọi URL về `/index.html`: trang này dùng SSR, không phải Vite SPA.
- URL không tồn tại vẫn trả HTTP 404 với giao diện Vua Thợ và liên kết về trang chủ.

Kiểm tra trước khi push:

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
pnpm build:vercel
```

`pnpm build` và `pnpm preview` vẫn dùng để kiểm tra bản Node cục bộ. Output `.vercel/` được sinh lại khi build và không đưa lên Git.

## Cấu trúc

- `src/routes/index.tsx`: thứ tự nội dung.
- `src/routes/__root.tsx`: metadata, phông chữ, tài nguyên.
- `src/components/landing/`: các section và ContactDialog.
- `src/data/content.ts`: cách đồng hành, FAQ, chủ đề và thông tin liên hệ.
- `src/styles.css`: hệ thống giao diện, responsive và reduced motion.
- `public/images/`: tranh AI riêng cho trang, lưu trong dự án.
- `docs/design-direction.md`: nguyên tắc nội dung, phạm vi chức năng, nguồn và prompt hình ảnh.

## Phạm vi hoạt động

Cửa sổ liên hệ chuẩn bị bản nháp email, có xem trước và sao chép. Người dùng chủ động gửi bằng ứng dụng email của mình. Điện thoại và Zalo là các kênh liên hệ bổ sung. Trang tạo VietQR chuyển khoản vào tài khoản công ty MB Bank do chủ dự án cung cấp. Người dùng kiểm tra và xác nhận trong ứng dụng ngân hàng. Website không tự chuyển tiền, lưu đăng ký, xác nhận gửi thư hay ghi nhận thanh toán thành công.

Không có dữ liệu hoàn cảnh, lời chứng thực hoặc số liệu gây quỹ giả trên giao diện. Thông tin liên hệ được kế thừa từ dự án và cần xác nhận trước khi đưa vào vận hành.

## Tài khoản và QR chuyển khoản

MB Bank · 318888688 · CONG TY TNHH CONG NGHE VUA THO. QR tạo tại trình duyệt theo số tiền, có tải ảnh PNG; không gọi dịch vụ QR bên ngoài. Xem `docs/donation-operation.md` về cấu hình và phạm vi. Chạy `pnpm exec node --test tests/donation.test.ts tests/vietqr.test.ts` để kiểm tra dữ liệu và giải mã ảnh.
