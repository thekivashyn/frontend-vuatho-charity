type BrandLogoProps = { size?: 'header' | 'footer' }
export function BrandLogo({ size = 'header' }: BrandLogoProps) {
  return (
    <span className={`brand brand-${size}`}>
      <img src="/logo/mark.png" alt="" width={48} height={41} />
      <span>
        <strong>
          VUA THỢ<span className="brand-dot">.</span>
        </strong>
        <small>CÙNG NHAU LÀM ĐIỀU TỬ TẾ</small>
      </span>
    </span>
  )
}
