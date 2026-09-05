# Tiếp nhận đóng góp — tài khoản MB Bank và VietQR

## Thông tin công ty cung cấp

- Ngân hàng: **MB Bank**, BIN **970422**.
- Tài khoản: **318888688**.
- Chủ tài khoản: **CONG TY TNHH CONG NGHE VUA THO**.

Cấu hình trong `src/data/donation.ts` đã chuyển sang `mode: 'live'` theo yêu cầu cập nhật tài khoản của chủ dự án. Đây là xác nhận từ chủ dự án, không phải kết quả tra cứu tên chủ tài khoản tại ngân hàng hay chứng nhận tuân thủ pháp luật.

## Tạo QR

`src/lib/vietqr.ts` tạo chuỗi VietQR/NAPAS chuyển đến tài khoản (QRIBFTTA): ngân hàng, số tài khoản, VND, số tiền người dùng chọn, nội dung `VUATHO DONG HANH` và CRC-16/CCITT-FALSE. Mã dùng phương thức 11 (có thể sử dụng lại), không phải phiên thanh toán một lần hoặc mã có thời hạn. QR cập nhật khi đổi số tiền.

Tên chủ tài khoản hiển thị trên trang và ảnh tải xuống để đối chiếu; ngân hàng tra cứu người nhận từ BIN và số tài khoản. Không nhét hoặc cắt ngắn tên công ty vào trường mã không phù hợp.

`BankQr.tsx` chỉ tải thư viện QR khi cần, tạo ảnh ngay trong trình duyệt. Không gửi tài khoản, số tiền, lời nhắn đến API tạo QR bên ngoài. QR có vùng trắng bốn module, màu đậm trên trắng; bố cục trang trí nằm ngoài vùng quét. Người dùng tải thẻ PNG có tài khoản và số tiền để dùng trên cùng điện thoại. Không áp logo lên mã.

Ảnh trên trang và ảnh tải xuống được tạo cùng một payload. Chuyển lại bước chỉnh số tiền sẽ tạo mới cả hai, không giữ QR của mức cũ. Lỗi tạo ảnh có hướng dẫn nhập tài khoản thủ công và nút thử lại.

## Luồng sử dụng

1. Chọn khoản góp hoặc nhập số nguyên dương VND (tối đa 12 chữ số).
2. Đọc điều kiện, xác nhận đã hiểu nguyên tắc đóng góp chung.
3. Tạo QR, quét bằng ứng dụng ngân hàng hỗ trợ VietQR; trên cùng điện thoại có thể tải ảnh rồi chọn ảnh trong chức năng quét.
4. Kiểm tra tên chủ tài khoản, ngân hàng, số tiền và nội dung; xác nhận tại ngân hàng.
5. Giữ chứng từ để đối soát khi cần.

Trang không tự chuyển tiền, không theo dõi kết quả từ ngân hàng, không có webhook hoặc nút xác nhận thành công giả. Không tự mở một app ngân hàng theo nhận diện thiết bị; việc hỗ trợ quét và chọn ảnh phụ thuộc từng app. Sao chép số tài khoản và nội dung có trạng thái thành công/lỗi.

## Kiểm tra

`pnpm exec node --test tests/donation.test.ts tests/vietqr.test.ts`

Kiểm tra cấu hình khớp dữ liệu chủ dự án cung cấp; dữ liệu không hợp lệ không tạo mã; cấu trúc TLV lồng nhau; CRC với vector chuẩn; thay đổi số tiền thay đổi mã; giải mã PNG bằng thư viện độc lập jsQR ở kích thước mobile và bản xuất. Không thay thế kiểm thử bằng ứng dụng ngân hàng hoặc xác minh sở hữu tài khoản. Không chuyển tiền thật trong quá trình kiểm tra.

## Phạm vi vận hành

Vua Thợ tiếp nhận đóng góp chung, nội bộ xem xét và phân bổ trong mục đích đã công bố. Không gọi hoạt động là quỹ có tư cách pháp lý khi chưa có căn cứ. Ô xác nhận chỉ nằm trong bộ nhớ giao diện; không lưu hồ sơ đồng ý hoặc thông tin người góp trên backend. Báo cáo thu–chi, tra soát và yêu cầu hoàn trả dùng quy trình/kênh hiện có.

Điều kiện trên trang vẫn là bản thảo UX cần đơn vị tiếp nhận rà soát theo hoạt động thực tế với người phụ trách pháp lý và kế toán. Miễn trừ không phải quyền sử dụng tiền tùy ý hoặc loại bỏ các nghĩa vụ theo luật.

## Nguồn đối chiếu

- [NAPAS: ra mắt VietQR và chuyển tiền nhanh NAPAS247](https://napas.com.vn/napas-va-cac-ngan-hang-chinh-thuc-ra-mat-thuong-hieu-vietqr-va-dich-vu-chuyen-tien-nhanh-napas247-bang-ma-qr-182755.htm).
- [Tài liệu định dạng VietQR 1.0 do NAPAS ban hành, bản lưu](https://kiemtrabank.com/documents/QR_Format_T%26C_v1.0_VN_092021.pdf): TLV, QRIBFTTA, VND, CRC.
- [API danh sách ngân hàng của VietQR.io/Casso](https://api.vietqr.io/v2/banks): MB / 970422. Chỉ đối chiếu danh mục, không gọi API bằng thông tin tài khoản.
- [Tài liệu thư viện qrcode](https://github.com/soldair/node-qrcode).
- [Nghị định 93/2021/NĐ-CP](https://vanban.chinhphu.vn/default.aspx?docid=204354&pageid=27160): phạm vi riêng về vận động, tiếp nhận, phân phối đóng góp tự nguyện; không suy rộng thành căn cứ cho mọi hoạt động hỗ trợ thường xuyên.
