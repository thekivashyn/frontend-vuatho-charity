# Vua Thợ — định hướng trải nghiệm

Thông điệp chủ đạo: **Vững một tay nghề. Ấm một mái nhà.**

## Nội dung và trải nghiệm

- Trân trọng sự chủ động, tay nghề và phẩm giá của người thợ; không lấy bi kịch làm điểm thu hút.
- Mạch trang: lời mở đầu → giá trị cộng đồng → câu chuyện về nghề → cách chung tay → cách kết nối → nguyên tắc tạo niềm tin → lời mời tham gia → hỏi đáp.
- Một luồng đóng góp: chọn khoản tùy tâm → xác nhận nguyên tắc tiếp nhận chung → xem thông tin tài khoản công ty / QR. Vua Thợ nội bộ xét duyệt và phân bổ.
- Không dùng đồng hồ đếm ngược, mục tiêu tiền, số liệu chưa có nguồn, người hưởng lợi giả, lời chứng thực giả hoặc lời hứa về quyền lợi đối ứng.
- Nội dung là định hướng biên tập cho trang cộng đồng, chưa phải tuyên bố về các chương trình đã triển khai.

## Luồng liên hệ

Các CTA mở cửa sổ với đúng chủ đề. Người dùng nhập lời nhắn → xem trước → tự mở ứng dụng email và gửi, hoặc sao chép nội dung. Đóng cửa sổ rồi mở lại sẽ bắt đầu lời nhắn mới. Không có API gửi thư, lưu dữ liệu, đăng ký thành viên hoặc thanh toán.

Email, điện thoại, Zalo và địa chỉ được giữ từ footer của dự án trước khi sửa. Cần xác nhận lại kênh tiếp nhận trước khi vận hành công khai. Không phát sinh gửi thư thật trong quá trình kiểm tra.

## Thiết kế

Xanh chàm, nền giấy ấm, vàng đất và xanh lá dịu. Be Vietnam Pro cho nội dung; Lora nghiêng cho các điểm nhấn. Tranh mang tính minh họa, không trình bày như ảnh của một hoàn cảnh có thật. Đã bỏ nhãn AI ở hero theo yêu cầu.

Chuyển động nhẹ, tôn trọng prefers-reduced-motion. Mức đóng góp có trạng thái chọn và ô số tiền tùy tâm. Dialog dùng phần tử native, khóa cuộn nền, có Escape và trả focus. Form có nhãn, kiểm tra nội dung trắng, trạng thái sao chép và phương án sao chép thủ công nếu clipboard không khả dụng.

## Hình ảnh

Tạo bằng công cụ **image_gen tích hợp**, không dùng API/CLI bên ngoài. Bản JPEG được chuyển định dạng từ ảnh gốc để phục vụ website; không thay đổi bố cục.

- `public/images/community-workshop.jpg` — tranh cộng đồng thợ ở xưởng.
- `public/images/tools-for-tomorrow.jpg` — tranh tĩnh vật đồ nghề.

### Prompt — community-workshop

Use case: illustration-story. Asset type: large landscape editorial hero illustration for Vua Thợ, a Vietnamese community that supports skilled tradespeople. Create a beautiful sophisticated hand-painted gouache and colored-pencil illustration, landscape 3:2. Scene: a small warm Vietnamese neighborhood workshop, three Vietnamese adult tradespeople (two men of different ages, one woman), wearing practical navy blue and ochre workwear, collaborating at a wooden workbench repairing a household fan and making something with timber. One older craftsman patiently guides a younger colleague, the woman smiles with natural quiet confidence. They are skilled, dignified and independent; solidarity through working together. View a little wide to show their upper bodies, tools, wooden table, plants, open workshop doorway, sunlit yellow plaster wall and a glimpse of green tropical foliage. A navy work jacket draped on chair, tool bag at side. Palette: rich deep indigo blue, golden ochre, warm cream paper, muted terracotta, olive. Tactile paper grain, exquisite organic shapes, expressive yet anatomically sensible hands, friendly editorial aesthetic, airy and calm, painterly edges. Composition balanced with people centered, dark navy and ochre contrast, no text anywhere, no logos, no watermarks, no money, no pity, no medical distress, no photorealism, no 3D. Full bleed image with generous scene context; suitable for cropping to 5:4 on a website.

### Prompt — tools-for-tomorrow

Use case: illustration-story. Asset type: editorial website feature image for Vietnamese skilled trades community Vua Thợ. Landscape 3:2, sophisticated hand-painted gouache and colored pencil with tactile paper grain. Close intimate still life on a well-used wooden workshop bench: open dark indigo canvas tool bag with screwdriver, pliers, small wrench; tape measure, carpenter pencil, beautifully worn working gloves and neatly folded navy work shirt. Sunlit warm cream plaster Vietnamese workshop wall, partial green potted plant and wooden window. Morning diagonal sunlight, warm pale golden ochre highlights, soft deep blue shadows, muted olive accents. Dignified honest craftsmanship, quiet hope, everyday tools as the means to care for a family. Painterly editorial illustration, detailed but airy, balanced composition with tools in center and lower half. No people, no text, no numbers, no logos, no money, no photorealism, no gradients or 3D. Full bleed image.

## Kiểm tra bản triển khai

- `pnpm typecheck`, `pnpm lint`, build client/SSR và kiểm tra định dạng các file sửa: đạt.
- Kiểm tra trình duyệt ở 320, 390, 768 và 1440 px: không tràn ngang; ảnh tải được, các neo điều hướng đều có đích.
- Luồng đóng góp mockup kiểm tra xác nhận nguyên tắc, số tiền và trạng thái chưa mở tiếp nhận.
- Menu di động tự đóng sau chọn mục. FAQ mở câu mới và đóng câu trước.
- Form chặn nội dung chỉ có khoảng trắng; xem trước giữ đúng chủ đề và nội dung; liên kết mailto mã hóa tiếng Việt.
- Sao chép email, trở lại chỉnh sửa giữ lời nhắn, Escape đóng dialog và trả focus về nút gọi, cuộn nền được khôi phục.
- Bản production được mở độc lập ở cổng 4173: render và luồng xem trước hoạt động, không có console warning/error trong lần kiểm tra mới.
- Chưa gửi email thật, chưa gọi điện, chưa nhắn Zalo và chưa triển khai công khai.

Ảnh có thêm biến thể `community-workshop-768.jpg` và `tools-for-tomorrow-768.jpg`, dùng qua srcset để giảm dung lượng trên điện thoại. Ảnh câu chuyện tải lazy; ảnh đầu trang có fetchPriority cao.

## Donation mockup

Company account and bank QR are placeholders. No transfer is enabled. See `docs/donation-operation.md` for configuration, operational scope and draft terms review before launch. Run `pnpm exec node --test tests/donation.test.ts` for amount and account readiness checks.

## Tinh chỉnh từng section

Bản cập nhật ngày 05/09/2026 dùng `src/styles/sections.css` (nạp sau CSS nền) để tổ chức bố cục theo từng phần. Hero có khung tranh và lời nhắn; sứ mệnh dùng bố cục biên tập; đóng góp có lối vào nhanh trên mobile; quy trình chuyển thành trục dọc trên điện thoại; phần trách nhiệm dùng nền xanh đậm; lời mời, FAQ, điều kiện và footer có bố cục riêng.

Menu đánh dấu phần đang đọc bằng IntersectionObserver và tính lại vùng đọc khi đổi kích thước. Khung đóng góp, điều kiện và tiêu đề bước có khoảng cách neo phù hợp với header. Giữ nguyên cơ chế tiếp nhận dự kiến, nội dung điều kiện, tài khoản mockup và luồng tự mở email.

Kiểm tra trình duyệt ở 320, 390, 768 và 1440 px; điều hướng, lối vào nhanh phần góp, số tiền tùy tâm, QR mockup, FAQ, Escape và trả focus của dialog đã được kiểm tra. Typecheck, lint, 4 kiểm tra đóng góp và build client/SSR đạt.

## Tài khoản và VietQR đã cập nhật

Các ghi chú mockup phía trên là lịch sử bản thiết kế trước. Theo thông tin mới từ chủ dự án, tài khoản MB Bank 318888688 đã được cập nhật cùng VietQR tạo theo số tiền; xem `docs/donation-operation.md` cho trạng thái vận hành hiện tại.
