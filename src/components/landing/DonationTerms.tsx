import { ArrowUpRight, Plus } from 'lucide-react'
import { donationTerms, donationTermsVersion } from '#/data/donation'
import { useContact } from '#/components/landing/ContactDialog'

export function DonationTerms() {
  const { open } = useContact()
  return (
    <section
      id="dieu-kien"
      className="donation-terms section-space"
      aria-labelledby="terms-title"
    >
      <div className="page-width">
        <div className="terms-heading">
          <div>
            <p className="eyebrow">
              <span className="section-number" aria-hidden>
                06
              </span>
              CÙNG HIỂU RÕ TRƯỚC KHI SẺ CHIA
            </p>
            <h2 id="terms-title">
              Tự nguyện trao đi.
              <br />
              <em>Rõ ràng để an tâm.</em>
            </h2>
          </div>
          <div>
            <p>
              Điều kiện đóng góp, nguyên tắc phân bổ
              <br />
              và giới hạn trách nhiệm.
            </p>
            <small>Phiên bản {donationTermsVersion} · Điều kiện đóng góp</small>
          </div>
        </div>
        <p className="terms-summary">
          Vua Thợ tiếp nhận khoản góp chung và chủ động xem xét, phân bổ trong
          phạm vi mục đích hỗ trợ đã công bố. Bạn không cần chọn hoàn cảnh;
          chúng tôi có trách nhiệm với việc tiếp nhận và sử dụng khoản góp.
        </p>
        <div className="terms-list">
          {donationTerms.map((term, index) => (
            <details key={term.id} id={`dieu-kien-${term.id}`}>
              <summary>
                <span className="term-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="term-title">{term.title}</span>
                <span className="accordion-toggle" aria-hidden>
                  <Plus size={18} />
                </span>
              </summary>
              <p>{term.text}</p>
            </details>
          ))}
        </div>
        <div className="terms-bottom">
          <p>
            Bạn có quyền hỏi, yêu cầu đối soát và phản ánh về khoản góp của
            mình.
          </p>
          <button className="text-link" onClick={() => open('tim-hieu')}>
            Trao đổi về điều kiện
            <ArrowUpRight size={17} aria-hidden />
          </button>
          <a href="#dong-hanh" className="text-link">
            Trở lại phần đóng góp
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
