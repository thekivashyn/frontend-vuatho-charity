import {
  ArrowUpRight,
  ClipboardCheck,
  FileText,
  Fingerprint,
} from 'lucide-react'
import { useContact } from '#/components/landing/ContactDialog'
import { Reveal } from '#/components/ui/Reveal'

const principles = [
  {
    icon: ClipboardCheck,
    title: 'Nội bộ xét duyệt, đúng mục đích hỗ trợ',
    description:
      'Vua Thợ lựa chọn hoàn cảnh, mức và thời điểm hỗ trợ dựa trên nhu cầu, mức độ cấp thiết và nguồn lực. Khoản góp thông thường được phân bổ chung, không chỉ định một người nhận.',
  },
  {
    icon: FileText,
    title: 'Theo dõi khoản nhận, khoản chi',
    description:
      'Ghi nhận theo số tiền thực nhận, đối soát và theo dõi việc sử dụng. Phần chưa phân bổ tiếp tục được quản lý trong phạm vi mục đích đã công bố.',
  },
  {
    icon: Fingerprint,
    title: 'Rõ ràng với người góp, tôn trọng người nhận',
    description:
      'Thông tin tiếp nhận, phân bổ cần được công khai phù hợp với quy định. Đồng thời bảo vệ thông tin ngân hàng, danh tính và đời tư của người trong cuộc.',
  },
]
export function Transparency() {
  const { open } = useContact()
  return (
    <section
      id="minh-bach"
      className="trust-section section-space"
      aria-labelledby="trust-title"
    >
      <div className="page-width trust-grid">
        <Reveal>
          <div className="trust-copy">
            <p className="eyebrow">
              <span className="section-number" aria-hidden>
                04
              </span>
              TRÁCH NHIỆM VỚI TỪNG SỰ GỬI GẮM
            </p>
            <h2 id="trust-title">
              Tấm lòng cần
              <br />
              được đặt vào
              <br />
              <em>đúng chỗ.</em>
            </h2>
            <p>
              Bạn tin tưởng gửi góp. Vua Thợ chịu trách nhiệm xem xét và sử dụng
              nguồn hỗ trợ trong phạm vi đã công bố.
            </p>
            <a href="#dieu-kien" className="text-link">
              Đọc nguyên tắc phân bổ
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
        </Reveal>
        <div className="trust-principles">
          {principles.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 60}>
              <article>
                <span className="trust-icon">
                  <Icon size={25} strokeWidth={1.4} aria-hidden />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="donation-report-note">
            <p>
              Trang chưa hiển thị báo cáo thu–chi. Khi cần làm rõ một khoản góp,
              bạn có thể yêu cầu đội ngũ đối soát qua kênh liên hệ riêng.
            </p>
            <button className="text-link" onClick={() => open('doi-soat')}>
              Hỏi về đối soát & sử dụng khoản góp
              <ArrowUpRight size={16} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
