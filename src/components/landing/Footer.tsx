import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { BrandLogo } from '#/components/ui/BrandLogo'
import { contact } from '#/data/content'
import { useContact } from '#/components/landing/ContactDialog'

export function Footer() {
  const { open } = useContact()
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-signoff">
          <p>
            Làm nghề bằng đôi tay.
            <br />
            <em>Gắn kết bằng tấm lòng.</em>
          </p>
          <a className="footer-return" href="#bat-dau">
            Về đầu trang <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="Vua Thợ — về trang chủ">
              <BrandLogo size="footer" />
            </a>
            <p>
              Trân trọng người thợ.
              <br />
              Kết nối những tấm lòng.
              <br />
              Cùng vun đắp một cộng đồng tử tế.
            </p>
          </div>
          <nav aria-label="Khám phá">
            <h2>VỀ CỘNG ĐỒNG</h2>
            <a href="#su-menh">Tấm lòng Vua Thợ</a>
            <a href="#dong-hanh">Gửi góp cùng Vua Thợ</a>
            <a href="#minh-bach">Điều làm nên niềm tin</a>
            <a href="#hoi-dap">Câu hỏi thường gặp</a>
            <a href="#dieu-kien">Điều kiện & giới hạn trách nhiệm</a>
          </nav>
          <nav aria-label="Kết nối">
            <h2>CÙNG VUA THỢ</h2>
            <button onClick={() => open('can-giup')}>
              Chia sẻ điều bạn cần
            </button>
            <button onClick={() => open('doanh-nghiep')}>
              Doanh nghiệp đồng hành
            </button>
            <a
              href="https://www.facebook.com/vuathovietnam"
              target="_blank"
              rel="noreferrer"
            >
              Facebook <ArrowUpRight size={14} aria-hidden />
            </a>
            <a href={contact.zalo} target="_blank" rel="noreferrer">
              Zalo Vua Thợ <ArrowUpRight size={14} aria-hidden />
            </a>
          </nav>
          <div className="footer-contact">
            <h2>LUÔN SẴN MỘT KẾT NỐI</h2>
            <a href={contact.phoneHref}>
              <Phone size={16} aria-hidden />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>
              <Mail size={16} aria-hidden />
              {contact.email}
            </a>
            <p>
              Số 32/28, đường 35, phường An Khánh,
              <br />
              Thành phố Hồ Chí Minh, Việt Nam.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Công ty TNHH Công nghệ Vua Thợ.{' '}
            <span>MST: 0318063280</span>
          </p>
          <p>Cùng nhau làm điều tử tế.</p>
        </div>
      </div>
    </footer>
  )
}
