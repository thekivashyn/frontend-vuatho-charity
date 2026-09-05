import { HandHeart, House, Wrench } from 'lucide-react'

const values = [
  {
    icon: Wrench,
    title: 'Trân trọng tay nghề',
    text: 'Để mỗi người thợ vững vàng với nghề.',
  },
  {
    icon: HandHeart,
    title: 'Sẻ chia đúng lúc',
    text: 'Thêm một điểm tựa khi cuộc sống khó khăn.',
  },
  {
    icon: House,
    title: 'Cùng chăm lo mái nhà',
    text: 'Vì phía sau người thợ là những người thương.',
  },
]
export function CommunityValues() {
  return (
    <div className="values-strip">
      <div className="page-width values-grid">
        {values.map(({ icon: Icon, title, text }) => (
          <div className="value-item" key={title}>
            <span className="value-emblem" aria-hidden>
              <Icon size={25} strokeWidth={1.5} />
            </span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
