import { ArrowUpRight, Plus } from 'lucide-react'
import { faqs, contact } from '#/data/content'

export function Faq() {
  return (
    <section
      id="hoi-dap"
      className="faq-section section-space"
      aria-labelledby="faq-title"
    >
      <div className="page-width faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">
            <span className="section-number" aria-hidden>
              05
            </span>
            MÌNH CÙNG HIỂU RÕ HƠN
          </p>
          <h2 id="faq-title">
            Có thể bạn
            <br />
            <em>đang băn khoăn.</em>
          </h2>
          <p>
            Mỗi câu hỏi đều xứng đáng
            <br />
            được lắng nghe.
          </p>
          <div className="faq-contact-card">
            <span>VẪN CÒN ĐIỀU MUỐN HỎI?</span>
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <p>Đội ngũ Vua Thợ sẵn lòng lắng nghe.</p>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details
              key={item.question}
              name="community-faq"
              open={index === 0}
            >
              <summary>
                <span className="faq-question-number" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="faq-question-text">{item.question}</span>
                <span className="accordion-toggle" aria-hidden>
                  <Plus size={18} />
                </span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
