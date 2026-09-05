import { ArrowUpRight } from 'lucide-react'
import { useContact } from '#/components/landing/ContactDialog'

export function CallToAction() {
  const { open } = useContact()
  return (
    <section
      id="tham-gia"
      className="join-section section-space"
      aria-labelledby="join-title"
    >
      <div className="page-width join-grid">
        <div className="join-main">
          <span className="kindness-flower" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
          <p className="eyebrow">CHUNG MỘT TẤM LÒNG</p>
          <h2 id="join-title">
            Thêm một người chung tay.
            <br />
            <em>Thêm một điều tốt ở lại.</em>
          </h2>
          <p>
            Một khoản góp trong khả năng của bạn, khi được góp cùng nhiều tấm
            lòng, có thể đỡ đần những ngày khó của người thợ. Vua Thợ trân trọng
            từng sự gửi gắm ấy.
          </p>
          <a href="#dong-hanh" className="button button-gold">
            Gửi một tấm lòng <ArrowUpRight size={19} aria-hidden />
          </a>
        </div>
        <div className="need-help">
          <span className="help-eyebrow">VUA THỢ LẮNG NGHE</span>
          <h3>
            Còn nếu bạn
            <br />
            đang cần giúp đỡ…
          </h3>
          <p>
            Đừng ngại bắt đầu câu chuyện.
            <br />
            Hãy chia sẻ để đội ngũ Vua Thợ có thể tìm hiểu và xem xét hoàn cảnh
            của bạn.
          </p>
          <button
            className="button button-white"
            onClick={() => open('can-giup')}
          >
            Chia sẻ với Vua Thợ <ArrowUpRight size={18} aria-hidden />
          </button>
          <small>
            Tiếp nhận thông tin chưa đồng nghĩa với việc được duyệt hỗ trợ. Bạn
            cũng có thể gửi hoàn cảnh của người thân.
          </small>
        </div>
      </div>
    </section>
  )
}
