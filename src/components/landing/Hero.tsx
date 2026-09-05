import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { StoryImage } from '#/components/ui/StoryImage'

export function Hero() {
  return (
    <section
      id="bat-dau"
      className="homecoming-hero"
      aria-labelledby="hero-title"
    >
      <div className="homecoming-stage">
        <figure className="homecoming-art">
          <StoryImage
            name="homecoming"
            priority
            sizes="(max-width: 760px) 100vw, 75vw"
            alt="Tranh minh họa người thợ trở về nhà, ôm con gái bên hiên cửa trong nắng chiều."
          />
          <figcaption>Sau mỗi đôi tay, là một mái nhà.</figcaption>
        </figure>
        <div className="page-width homecoming-content">
          <div className="homecoming-copy">
            <p className="eyebrow">
              <span aria-hidden /> VÌ NGƯỜI THỢ. VÌ NHỮNG MÁI NHÀ.
            </p>
            <h1 id="hero-title">
              Đôi tay
              <br />
              dựng xây.
              <em>
                Xứng đáng
                <br />
                được chở che.
              </em>
            </h1>
            <p className="homecoming-description">
              Họ dành đôi tay để dựng xây cuộc sống.
              <br />
              Cùng Vua Thợ san sẻ những ngày khó của người thợ và gia đình.
            </p>
            <div className="homecoming-actions">
              <a href="#dong-hanh" className="button button-blue">
                Gửi một tấm lòng <ArrowUpRight size={19} aria-hidden />
              </a>
              <a href="#su-menh" className="text-link">
                Hiểu tấm lòng Vua Thợ <ArrowDown size={17} aria-hidden />
              </a>
            </div>
            <p className="homecoming-footnote">
              Tùy tâm gửi góp. Trọn lòng trân trọng.
            </p>
          </div>
        </div>
      </div>
      <div className="page-width homecoming-afterword">
        <span>MỘT CỘNG ĐỒNG. CHUNG MỘT TẤM LÒNG.</span>
        <p>
          Để người thợ có thêm điểm tựa.
          <br />
          <em>Để những mái nhà thêm ấm.</em>
        </p>
        <a href="#su-menh" aria-label="Khám phá sứ mệnh Vua Thợ">
          <ArrowDown size={22} aria-hidden />
        </a>
      </div>
    </section>
  )
}
