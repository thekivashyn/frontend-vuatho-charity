export type CaseCategory = 'tai-nan' | 'benh-tat' | 'mat-viec' | 'gia-dinh'

export const contact = {
  email: 'cs@vuatho.com',
  phone: '0912 426 404',
  phoneHref: 'tel:0912426404',
  zalo: 'https://zalo.me/622166130485793859',
} as const

export type SupportTopic =
  'tuy-tam' | 'can-giup' | 'doanh-nghiep' | 'tim-hieu' | 'doi-soat' | 'hoan-tra'
export const topicLabels: Record<SupportTopic, string> = {
  'tuy-tam': 'Tìm hiểu về đóng góp tự nguyện',
  'can-giup': 'Gửi hoàn cảnh cần xem xét hỗ trợ',
  'doanh-nghiep': 'Doanh nghiệp muốn đóng góp',
  'tim-hieu': 'Hỏi về tiếp nhận và sử dụng khoản góp',
  'doi-soat': 'Đối soát khoản đã chuyển',
  'hoan-tra': 'Chuyển nhầm, chuyển trùng hoặc yêu cầu hoàn trả',
}

export const steps = [
  {
    title: 'Bạn gửi một tấm lòng',
    description:
      'Đóng góp tự nguyện qua tài khoản công ty được công bố. Khoản tiền được tiếp nhận vào nguồn hỗ trợ chung của Vua Thợ.',
  },
  {
    title: 'Vua Thợ xem xét hoàn cảnh',
    description:
      'Đội ngũ nội bộ tìm hiểu thông tin, đánh giá nhu cầu và mức độ cấp thiết để lựa chọn hoàn cảnh phù hợp với nguồn lực hiện có.',
  },
  {
    title: 'Phân bổ và ghi nhận',
    description:
      'Vua Thợ quyết định mức hỗ trợ trong phạm vi mục đích đã công bố, theo dõi khoản chi và cập nhật thông tin tiếp nhận, sử dụng.',
  },
] as const

export const faqs = [
  {
    question: 'Tiền đóng góp được chuyển đến ai?',
    answer:
      'Tiền được chuyển vào tài khoản MB Bank 318888688 của CONG TY TNHH CONG NGHE VUA THO, được công bố tại phần đóng góp. Vua Thợ tiếp nhận chung và nội bộ xem xét, phân bổ cho những hoàn cảnh cần thiết. Đây không phải hình thức người góp chuyển trực tiếp cho từng hoàn cảnh.',
  },
  {
    question: 'Tôi có cần góp một mức cố định không?',
    answer:
      'Không. Các mức trên trang chỉ là gợi ý; bạn có thể nhập số tiền phù hợp với khả năng của mình. Không có nghĩa vụ góp định kỳ và không có quyền lợi tài chính đối ứng.',
  },
  {
    question: 'Tôi có thể chọn người nhận khoản góp không?',
    answer:
      'Khoản góp thông thường được đưa vào nguồn hỗ trợ chung. Vua Thợ lựa chọn hoàn cảnh và mức hỗ trợ theo nhu cầu, mức độ cấp thiết và nguồn lực. Nếu muốn chỉ định người nhận hoặc kèm điều kiện, hãy trao đổi để có thỏa thuận riêng trước khi chuyển tiền.',
  },
  {
    question: 'Làm sao biết khoản góp đã được ghi nhận?',
    answer:
      'Việc ghi nhận dựa trên tiền thực tế vào tài khoản và đối soát của đội ngũ, không dựa vào thao tác bấm trên website. Hãy giữ chứng từ ngân hàng và liên hệ qua email hoặc điện thoại khi cần kiểm tra. Trang hiện chưa có xác nhận giao dịch tự động.',
  },
  {
    question: 'Nếu tôi chuyển nhầm hoặc muốn yêu cầu hoàn trả?',
    answer:
      'Liên hệ Vua Thợ và ngân hàng sớm với ngày chuyển, số tiền, mã giao dịch. Đội ngũ cần đối soát và xem xét tình trạng phân bổ cùng quy định áp dụng. Không tự động hoàn tiền chỉ từ một thao tác trên trang. Chi tiết nằm trong Điều kiện đóng góp.',
  },
  {
    question: 'Tôi là thợ đang gặp khó khăn, gửi hoàn cảnh thế nào?',
    answer:
      'Chọn “Tôi cần giúp đỡ”, hoặc liên hệ email, điện thoại, Zalo để chia sẻ khái quát hoàn cảnh. Việc tiếp nhận thông tin không phải xác nhận đã được duyệt hỗ trợ. Bạn không cần từng đóng góp để được gửi đề nghị xem xét.',
  },
] as const
