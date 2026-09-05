import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '#/components/ui/Reveal'

const pillars = [
  {
    number: '01',
    title: 'San sẻ lúc đau ốm',
    text: 'Hỗ trợ người thợ gặp khó khăn khi bệnh tật, tai nạn làm gián đoạn cuộc sống.',
  },
  {
    number: '02',
    title: 'Có nhau lúc khó',
    text: 'Lắng nghe và cùng tìm một điểm tựa khi sức khỏe hay kế sinh nhai gặp trở ngại.',
  },
  {
    number: '03',
    title: 'Gieo điều tốt cho mai sau',
    text: 'Để khoản hỗ trợ hôm nay đỡ đần một mái nhà và tiếp thêm niềm tin cho ngày mai.',
  },
]
export function Mission() {
  return (
    <section
      id="su-menh"
      className="mission section-space"
      aria-labelledby="mission-title"
    >
      <div className="page-width">
        <Reveal>
          <div className="section-intro mission-intro">
            <div>
              <p className="eyebrow">
                <span className="section-number" aria-hidden>
                  01
                </span>
                TẤM LÒNG VUA THỢ
              </p>
              <h2 id="mission-title">
                Họ dựng xây bao mái nhà.
                <br />
                <em>Chúng ta cùng vun vén mái nhà của họ.</em>
              </h2>
            </div>
            <p>
              Mỗi đôi tay chai sần đều có một câu chuyện. Về lòng tự trọng với
              nghề,
              <br className="desktop-break" /> về bữa cơm gia đình, và mong muốn
              sống tốt bằng chính sức mình.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="mission-feature">
            <figure>
              <img
                src="/images/tools-for-tomorrow.jpg"
                srcSet="/images/tools-for-tomorrow-768.jpg 768w, /images/tools-for-tomorrow.jpg 1536w"
                sizes="(max-width: 640px) calc(100vw - 52px), (max-width: 1320px) 47vw, 600px"
                alt="Tranh minh họa túi đồ nghề, đôi găng tay và chiếc áo lao động trên bàn gỗ dưới nắng sớm."
                width={1536}
                height={1024}
                loading="lazy"
              />
              <figcaption>
                Đồ nghề giữ kế sinh nhai. Tình người giữ niềm hy vọng.
              </figcaption>
            </figure>
            <div className="mission-story">
              <span className="story-rule" aria-hidden />
              <span className="eyebrow">ĐIỂM TỰA ĐỂ BƯỚC TIẾP</span>
              <h3>
                Đằng sau một bộ đồ nghề
                <br />
                là cả một <em>mái nhà.</em>
              </h3>
              <p>
                Với người thợ, chiếc kìm, mũi khoan hay túi dụng cụ là cách họ
                tạo nên giá trị mỗi ngày. Cũng là cách họ lo bữa cơm, tiền học
                và những dự định nhỏ của gia đình.
              </p>
              <p>
                Khi công việc phải tạm dừng, những lo toan ấy vẫn còn nguyên.
                Vua Thợ đón nhận các khoản góp tự nguyện, xem xét hoàn cảnh và
                dành sự hỗ trợ cho những người thợ, gia đình đang cần một điểm
                tựa.
              </p>
              <a href="#dong-hanh" className="text-link">
                Gửi góp cùng Vua Thợ <ArrowUpRight size={18} aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>
        <div className="mission-pillars">
          {pillars.map(({ number, title, text }) => (
            <Reveal key={title}>
              <article className="mission-pillar">
                <div className="pillar-top" aria-hidden="true">
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
