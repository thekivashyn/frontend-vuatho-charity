import { ArrowDown, ArrowUpRight, Heart } from 'lucide-react'

export function Hero() {
  return (
    <section id="bat-dau" className="hero" aria-labelledby="hero-title">
      <div className="page-width hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="hero-kicker-dot" aria-hidden />
            VÌ NGƯỜI THỢ. VÌ NHỮNG MÁI NHÀ.
          </p>
          <h1 id="hero-title">
            Vững một
            <br />
            tay nghề.
            <br />
            <em>
              Ấm một
              <br className="mobile-break" /> mái nhà.
            </em>
          </h1>
          <p className="hero-description">
            Người thợ chăm chút cho từng công trình.
            <br className="desktop-break" /> Vua Thợ mong cùng cộng đồng chăm lo
            cho người thợ — đón nhận từng tấm lòng, đỡ đần những hoàn cảnh khó
            khăn.
          </p>
          <div className="hero-actions">
            <a href="#dong-hanh" className="button button-blue">
              Gửi một tấm lòng <ArrowUpRight size={19} aria-hidden />
            </a>
            <a href="#su-menh" className="text-link">
              Hiểu điều chúng tôi tin <ArrowDown size={17} aria-hidden />
            </a>
          </div>
          <div className="hero-footnote">
            <Heart size={16} aria-hidden />
            <span>Một khoản góp tùy tâm. Thêm một điểm tựa cho người thợ.</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src="/images/community-workshop.jpg"
              srcSet="/images/community-workshop-768.jpg 768w, /images/community-workshop.jpg 1536w"
              sizes="(max-width: 640px) calc(100vw - 52px), (max-width: 1320px) 47vw, 600px"
              alt="Tranh minh họa những người thợ Việt cùng sửa chữa và chia sẻ tay nghề trong một xưởng nhỏ."
              width={1536}
              height={1024}
              fetchPriority="high"
              className="hero-image"
            />
            <div className="image-label">
              <span aria-hidden /> TAY NGHỀ KẾT NỐI. TÌNH NGƯỜI LAN XA.
            </div>
          </div>
          <div className="hero-note">
            <span className="note-heart">
              <Heart size={24} strokeWidth={1.5} aria-hidden />
            </span>
            <div>
              <strong>
                Một bàn tay góp sức.
                <br />
                Nhiều cuộc đời thêm ấm.
              </strong>
              <span>Tinh thần cộng đồng Vua Thợ</span>
            </div>
          </div>
          <div className="hero-seal" aria-hidden>
            <span>THỢ GIÚP THỢ</span>
            <Heart size={26} strokeWidth={1.4} />
            <span>NGƯỜI THƯƠNG THỢ</span>
          </div>
        </div>
      </div>
      <div className="page-width hero-closing" aria-hidden="true">
        <span>Từ người thợ, vì người thợ.</span>
        <span>Một tấm lòng, thêm một điểm tựa.</span>
      </div>
    </section>
  )
}
