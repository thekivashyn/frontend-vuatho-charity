export type DonationAccount = {
  mode: 'preview' | 'live'
  recipient: string
  bankName: string
  bankBin: string
  accountNumber: string
  accountHolder: string
}

// Account details supplied by the company owner. Not an independent bank verification.
export const donationAccount: DonationAccount = {
  mode: 'live',
  recipient: 'Cong ty TNHH Cong nghe Vua Tho',
  bankName: 'MB Bank',
  bankBin: '970422',
  accountNumber: '318888688',
  accountHolder: 'CONG TY TNHH CONG NGHE VUA THO',
}

export const donationReference = 'VUATHO DONG HANH'
export const donationPresets = [50_000, 100_000, 200_000, 500_000] as const
export const donationTermsVersion = '2026-09-05'

export function isDonationAccountReady(account: DonationAccount): boolean {
  return (
    account.mode === 'live' &&
    account.recipient.trim().length > 0 &&
    account.bankName === 'MB Bank' &&
    account.bankBin === '970422' &&
    /^\d{6,19}$/.test(account.accountNumber) &&
    account.accountHolder.trim().length > 0
  )
}

export function parseDonationAmount(input: string): number | null {
  const digits = input.trim()
  if (!/^\d{1,12}$/.test(digits)) return null
  const amount = Number(digits)
  return Number.isSafeInteger(amount) && amount > 0 ? amount : null
}

export const donationTerms = [
  {
    id: 'tu-nguyen',
    title: 'Tự nguyện và không có lợi ích tài chính đối ứng',
    text: 'Khoản đóng góp nhằm hỗ trợ người thợ và gia đình gặp khó khăn. Đây không phải khoản đầu tư, tiền gửi, hợp đồng bảo hiểm hoặc phí mua quyền được hỗ trợ. Không phát sinh lãi, lợi nhuận hay quyền ưu tiên cho người đã đóng góp. Chỉ góp trong khả năng của bạn; không có nghĩa vụ góp định kỳ.',
  },
  {
    id: 'phan-bo',
    title: 'Tiếp nhận chung, Vua Thợ xem xét và phân bổ',
    text: 'Vua Thợ tiếp nhận vào tài khoản công ty được công bố và tổng hợp thành nguồn hỗ trợ chung. Đội ngũ nội bộ xem xét thông tin, nhu cầu, mức độ cấp thiết và nguồn lực để lựa chọn hoàn cảnh, mức, hình thức và thời điểm hỗ trợ trong phạm vi mục đích đã công bố. Khoản góp thông thường không được gắn với một người nhận cụ thể. Nếu muốn đóng góp có điều kiện hoặc chỉ định người nhận, bạn cần có thỏa thuận riêng được Vua Thợ chấp nhận trước khi chuyển tiền.',
  },
  {
    id: 'su-dung',
    title: 'Mục đích sử dụng, chi phí và phần chưa phân bổ',
    text: 'Nguồn đóng góp được dành cho việc hỗ trợ những nhu cầu thiết yếu của người thợ và gia đình gặp khó khăn, theo nội dung hoạt động đã công bố. Không mặc định khấu trừ một tỷ lệ phí vận hành. Khoản chi tổ chức, quản lý từ nguồn góp, nếu có, phải được công bố rõ và đáp ứng điều kiện áp dụng trước khi thực hiện. Phần chưa phân bổ tiếp tục được theo dõi; việc xử lý khi kết thúc hoạt động phải theo nội dung công bố, thỏa thuận liên quan và quy định pháp luật, không tự ý đổi sang mục đích kinh doanh.',
  },
  {
    id: 'doi-soat',
    title: 'Chuyển khoản, phí ngân hàng và ghi nhận',
    text: 'Hãy kiểm tra đúng ngân hàng, số tài khoản, tên chủ tài khoản và số tiền trên ứng dụng ngân hàng trước khi xác nhận. Mã QR chỉ hỗ trợ nhập thông tin; giao dịch được thực hiện tại ngân hàng. Trang không tự xác nhận đã nhận tiền. Việc ghi nhận dựa trên số tiền thực tế vào tài khoản và kết quả đối soát. Phí, thời gian xử lý hay giao dịch treo phụ thuộc đơn vị cung cấp dịch vụ; hãy giữ chứng từ để tra soát khi cần.',
  },
  {
    id: 'hoan-tra',
    title: 'Chuyển nhầm, chuyển trùng và yêu cầu hoàn trả',
    text: 'Nếu chuyển nhầm, chuyển trùng hoặc có tranh chấp, hãy liên hệ Vua Thợ và ngân hàng sớm, cung cấp mã giao dịch, ngày chuyển và số tiền qua kênh riêng. Không gửi mật khẩu, mã OTP hoặc thông tin đăng nhập. Mỗi yêu cầu được xem xét theo kết quả đối soát, tình trạng phân bổ, thỏa thuận liên quan và quy định pháp luật. Việc gửi yêu cầu không đồng nghĩa đã được chấp thuận hoàn tiền; quyền yêu cầu xử lý và quyền hợp pháp của bạn vẫn được bảo lưu.',
  },
  {
    id: 'ho-tro',
    title: 'Xét duyệt hoàn cảnh và giới hạn cam kết',
    text: 'Gửi hoàn cảnh không đồng nghĩa sẽ được duyệt, được hỗ trợ toàn bộ nhu cầu hoặc được xử lý trong một thời hạn cố định. Việc xét duyệt phụ thuộc thông tin có thể kiểm chứng và nguồn hỗ trợ hiện có. Thông tin, hình ảnh và ví dụ trên trang không phải cam kết về một kết quả cụ thể. Vua Thợ không bảo đảm kết quả điều trị, thu nhập hoặc sự phục hồi của từng người nhận.',
  },
  {
    id: 'rieng-tu',
    title: 'Thông tin cá nhân, công khai và chứng từ',
    text: 'Thông tin giao dịch được sử dụng cho ghi nhận, đối soát, xử lý yêu cầu và nghĩa vụ liên quan. Nội dung công khai cần bảo vệ dữ liệu cá nhân, thông tin ngân hàng và hồ sơ sức khỏe. Không đăng công khai danh tính người góp hoặc hình ảnh hoàn cảnh khi chưa có căn cứ phù hợp. Nội dung chuyển khoản không nên chứa thông tin nhạy cảm. Trang chưa phát hành biên nhận điện tử, hóa đơn hoặc xác nhận khấu trừ thuế tự động.',
  },
  {
    id: 'gioi-han',
    title: 'Sự cố, giới hạn trách nhiệm và quyền của bạn',
    text: 'Có thể phát sinh gián đoạn website, lỗi kết nối, chậm xử lý của ngân hàng hoặc yếu tố ngoài khả năng kiểm soát hợp lý. Người dùng cần đối chiếu thông tin giao dịch và phối hợp tra soát; Vua Thợ xử lý các vấn đề thuộc trách nhiệm của mình theo quy định áp dụng. Các điều kiện này không loại trừ trách nhiệm đối với hành vi vi phạm pháp luật, sử dụng tiền sai mục đích hoặc những nghĩa vụ không được phép miễn trừ. Việc cập nhật điều kiện không tự động làm thay đổi cam kết đã áp dụng cho khoản góp trước đó.',
  },
] as const
