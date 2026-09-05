import { steps } from '#/data/content'
import { Reveal } from '#/components/ui/Reveal'
import { StoryImage } from '#/components/ui/StoryImage'

const stepImages = ['kindness', 'careful-records', 'new-morning'] as const

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
        <Reveal>
          <ol className="process-grid">
            {steps.map((step, index) => {
              return (
                <li key={step.title}>
                  <div className="process-painting">
                    <StoryImage
                      name={stepImages[index]}
                      alt=""
                      sizes="(max-width: 640px) calc(100vw - 110px), 33vw"
                    />
                  </div>
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
        </Reveal>
      </div>
    </section>
  )
}
