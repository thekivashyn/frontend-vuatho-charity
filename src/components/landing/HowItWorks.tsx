import { steps } from '#/data/content'
import { Reveal } from '#/components/ui/Reveal'

export function HowItWorks() {
  return (
    <section
      id="cach-hoat-dong"
      className="process-section section-space"
      aria-labelledby="process-title"
    >
      <div className="page-width">
        <Reveal>
          <div className="section-intro">
            <p className="eyebrow">
              <span className="section-number" aria-hidden>
                03
              </span>
              TỪ TẤM LÒNG ĐẾN HÀNH ĐỘNG
            </p>
            <h2 id="process-title">
              Từ tấm lòng của bạn,
              <br />
              <em>đến những ngày bớt khó.</em>
            </h2>
            <p>Bạn gửi góp. Vua Thợ tiếp nhận, xem xét và trực tiếp phân bổ.</p>
          </div>
        </Reveal>
        <ol className="process-grid">
          {steps.map((step, index) => {
            return (
              <li key={step.title}>
                <div className="process-symbol" aria-hidden="true">
                  <span>0{index + 1}</span>
                  <i />
                </div>
                <div className="process-copy">
                  <span className="process-caption">
                    {['GỬI GẮM', 'XEM XÉT', 'TRAO ĐI'][index]}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
