export type CaseCategory = 'tai-nan' | 'benh-tat' | 'mat-viec' | 'gia-dinh'

export type SupportCase = {
  id: string
  /** Short display name, e.g. "Anh Hùng". */
  name: string
  age: number
  trade: string
  location: string
  category: CaseCategory
  /** One-line headline for the situation. */
  title: string
  story: string
  /** What the money is for. */
  need: string
  raised: number
  goal: number
  supporters: number
  daysLeft: number
  verifiedBy: string
  image: string
  imageAlt: string
}

export const categories: Array<{ id: CaseCategory | 'all'; label: string }> = [
  { id: 'all', label: 'Tất cả' },
  { id: 'tai-nan', label: 'Tai nạn lao động' },
  { id: 'benh-tat', label: 'Bệnh hiểm nghèo' },
  { id: 'mat-viec', label: 'Mất kế sinh nhai' },
  { id: 'gia-dinh', label: 'Gia đình thợ' },
]

export const categoryLabel: Record<CaseCategory, string> = {
  'tai-nan': 'Tai nạn lao động',
  'benh-tat': 'Bệnh hiểm nghèo',
  'mat-viec': 'Mất kế sinh nhai',
  'gia-dinh': 'Gia đình thợ',
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`

export const cases: Array<SupportCase> = [
  {
    id: 'anh-hung-tho-dien',
    name: 'Anh Hùng',
    age: 34,
    trade: 'Thợ điện',
    location: 'Quảng Nam',
    category: 'tai-nan',
    title: 'Ngã giàn giáo, gãy hai chân, là trụ cột của gia đình 4 người',
    story:
      'Anh Hùng ngã từ tầng 3 công trình khi đang kéo dây điện. Hai chân gãy, cần ít nhất 6 tháng mới đi lại được. Vợ anh bán rau, hai con 5 và 8 tuổi.',
    need: 'Viện phí phẫu thuật và sinh hoạt phí 6 tháng hồi phục',
    raised: 78_500_000,
    goal: 120_000_000,
    supporters: 1_842,
    daysLeft: 14,
    verifiedBy: 'Đội thợ Tam Kỳ xác minh tại bệnh viện',
    image: unsplash('photo-1504307651254-35680f356dfd'),
    imageAlt: 'Công trường nơi anh Hùng làm việc',
  },
  {
    id: 'chu-bay-tho-ho',
    name: 'Chú Bảy',
    age: 52,
    trade: 'Thợ hồ',
    location: 'Cần Thơ',
    category: 'benh-tat',
    title: 'Suy thận giai đoạn cuối sau 30 năm phụ hồ',
    story:
      'Chú Bảy chạy thận 3 lần mỗi tuần, không còn sức làm việc. Vợ chú đi rửa chén thuê. Hai vợ chồng đang ở trọ, nợ tiền thuốc 4 tháng.',
    need: 'Chi phí chạy thận 12 tháng và tiền thuê trọ',
    raised: 41_200_000,
    goal: 90_000_000,
    supporters: 1_105,
    daysLeft: 30,
    verifiedBy: 'Đội thợ Ninh Kiều xác minh tại nhà trọ',
    image: unsplash('photo-1538108149393-fbbd81895907'),
    imageAlt: 'Hành lang bệnh viện nơi chú Bảy điều trị',
  },
  {
    id: 'chi-mai-tho-son',
    name: 'Chị Mai',
    age: 29,
    trade: 'Thợ sơn',
    location: 'Bình Dương',
    category: 'tai-nan',
    title: 'Bỏng 40% cơ thể do cháy xưởng, đang nuôi mẹ già',
    story:
      'Xưởng sơn chị Mai làm bốc cháy do chập điện. Chị bị bỏng nặng hai tay và lưng, cần nhiều đợt ghép da. Chị là người duy nhất đi làm trong nhà.',
    need: 'Chi phí ghép da 3 đợt và phục hồi chức năng',
    raised: 132_000_000,
    goal: 150_000_000,
    supporters: 3_260,
    daysLeft: 7,
    verifiedBy: 'Đội thợ Thuận An xác minh tại bệnh viện Chợ Rẫy',
    image: unsplash('photo-1581092160562-40aa08e78837'),
    imageAlt: 'Khu điều trị bỏng',
  },
  {
    id: 'anh-long-tho-co-khi',
    name: 'Anh Long',
    age: 41,
    trade: 'Thợ cơ khí',
    location: 'Hải Phòng',
    category: 'mat-viec',
    title: 'Mất bàn tay phải vì máy dập, cần học lại nghề mới',
    story:
      'Sau tai nạn, anh Long không thể làm cơ khí nữa. Anh muốn học sửa điện thoại để tiếp tục nuôi hai con ăn học. Cần tay giả cơ bản và khóa học 4 tháng.',
    need: 'Tay giả và học phí nghề mới',
    raised: 22_400_000,
    goal: 85_000_000,
    supporters: 612,
    daysLeft: 45,
    verifiedBy: 'Đội thợ Lê Chân xác minh tại nhà',
    image: unsplash('photo-1504328735775-9ad4d5b5c6f6'),
    imageAlt: 'Xưởng cơ khí nơi anh Long từng làm việc',
  },
  {
    id: 'gia-dinh-anh-y-blen',
    name: 'Ba con anh Y Blen',
    age: 38,
    trade: 'Thợ mộc',
    location: 'Đắk Lắk',
    category: 'gia-dinh',
    title: 'Cha mất vì tai nạn, ba con nhỏ có nguy cơ bỏ học',
    story:
      'Anh Y Blen mất trong tai nạn xe chở gỗ. Vợ anh làm rẫy thuê, ba con 6, 9 và 12 tuổi. Cộng đồng thợ mộc Buôn Ma Thuột đề xuất hỗ trợ học phí cho các cháu.',
    need: 'Học phí và sách vở 2 năm học cho ba cháu',
    raised: 58_000_000,
    goal: 60_000_000,
    supporters: 2_014,
    daysLeft: 5,
    verifiedBy: 'Đội thợ mộc Buôn Ma Thuột xác minh tại nhà',
    image: unsplash('photo-1503387762-592deb58ef4e'),
    imageAlt: 'Ngôi nhà của gia đình anh Y Blen',
  },
  {
    id: 'anh-tuan-tho-dien-lanh',
    name: 'Anh Tuấn',
    age: 27,
    trade: 'Thợ điện lạnh',
    location: 'Hà Nội',
    category: 'mat-viec',
    title: 'Mất hết đồ nghề sau vụ trộm, 3 tháng không có việc',
    story:
      'Bộ đồ nghề tích cóp 5 năm của anh Tuấn bị trộm sạch cùng chiếc xe máy. Không đồ nghề, không xe, anh không thể nhận việc. Anh chỉ cần đủ dụng cụ để đi làm lại.',
    need: 'Bộ dụng cụ điện lạnh cơ bản và xe máy cũ',
    raised: 9_300_000,
    goal: 25_000_000,
    supporters: 288,
    daysLeft: 21,
    verifiedBy: 'Đội thợ Hoàng Mai xác minh và bảo lãnh',
    image: unsplash('photo-1581091226825-a6a2a5aee158'),
    imageAlt: 'Dụng cụ nghề điện lạnh',
  },
]

export type Impact = {
  amount: number
  label: string
  icon: 'meal' | 'medicine' | 'hospital' | 'milk' | 'school' | 'tools' | 'home'
}

/** What a given amount typically covers. Sorted ascending. */
export const impacts: Array<Impact> = [
  {
    amount: 20_000,
    label: 'một bữa cơm cho người nhà đang chăm bệnh',
    icon: 'meal',
  },
  { amount: 50_000, label: 'một ngày thuốc men cơ bản', icon: 'medicine' },
  {
    amount: 100_000,
    label: 'một ngày viện phí giường thường',
    icon: 'hospital',
  },
  { amount: 200_000, label: 'một tuần tiền sữa cho con của thợ', icon: 'milk' },
  {
    amount: 500_000,
    label: 'một tháng học phí cho con của thợ',
    icon: 'school',
  },
  {
    amount: 1_000_000,
    label: 'một bộ dụng cụ để quay lại làm nghề',
    icon: 'tools',
  },
  {
    amount: 2_000_000,
    label: 'một tháng sinh hoạt cho cả gia đình lúc hồi phục',
    icon: 'home',
  },
]

export type Stat = {
  label: string
  value: number
  decimals?: number
  suffix?: string
}

export const stats: Array<Stat> = [
  { label: 'Anh em thợ đã được hỗ trợ', value: 2_140 },
  { label: 'Lượt đóng góp', value: 38_400, suffix: '+' },
  { label: 'Mức góp phổ biến nhất', value: 50, suffix: '.000đ' },
  { label: 'Tổng hỗ trợ đã trao', value: 48.2, decimals: 1, suffix: ' tỷ' },
]

export const steps = [
  {
    title: 'Gửi hoàn cảnh',
    description:
      'Thợ, người thân, hoặc đội trưởng ở địa phương gửi thông tin. Không cần giấy tờ phức tạp, chỉ cần kể đúng câu chuyện.',
  },
  {
    title: 'Anh em thợ xác minh tại chỗ',
    description:
      'Trong 72 giờ, thợ tình nguyện ở cùng khu vực đến tận nơi, xác nhận hồ sơ y tế hoặc biên bản tai nạn, rồi bảo lãnh cho hoàn cảnh.',
  },
  {
    title: 'Hỗ trợ chuyển thẳng, công khai từng khoản',
    description:
      'Tiền chuyển trực tiếp đến gia đình hoặc bệnh viện. Mỗi khoản chi được đăng kèm chứng từ, người góp nhận thông báo theo từng mốc.',
  },
] as const

export const allocation = [
  { label: 'Chuyển thẳng đến gia đình thợ', value: 95 },
  { label: 'Xác minh và đi lại tại địa phương', value: 3 },
  { label: 'Vận hành nền tảng', value: 2 },
] as const

export const testimonials = [
  {
    quote:
      'Nằm viện hai tháng, tôi tưởng mất hết. Anh em thợ khắp nơi, người vài chục nghìn, người một trăm, cộng lại đủ viện phí và tiền sữa cho con. Tôi chưa từng gặp họ.',
    name: 'Nguyễn Văn Hùng',
    role: 'Thợ điện, Quảng Nam. Người được hỗ trợ',
    initials: 'NH',
  },
  {
    quote:
      'Tôi góp 20.000đ mỗi tuần, bằng một ly cà phê. Nhìn thấy tên mình trong danh sách 1.105 người đã giúp chú Bảy, tôi thấy mình là một phần của điều gì đó.',
    name: 'Lê Hoàng Nam',
    role: 'Thợ điện lạnh, TP. Hồ Chí Minh. Người đóng góp',
    initials: 'LN',
  },
  {
    quote:
      'Công ty tôi có 300 thợ. Mỗi công trình chúng tôi trích một phần nhỏ vào quỹ, coi như bảo hiểm tình nghĩa cho chính anh em mình. Khi có việc, quỹ lo trước.',
    name: 'Trần Quốc Bảo',
    role: 'Giám đốc công ty cơ điện, Đồng Nai. Doanh nghiệp đồng hành',
    initials: 'TB',
  },
] as const

export const faqs = [
  {
    question: 'Ai được nhận hỗ trợ từ Vua Thợ Charity?',
    answer:
      'Thợ và gia đình thợ ở mọi ngành nghề gặp tai nạn lao động, bệnh hiểm nghèo, mất khả năng lao động hoặc mất kế sinh nhai đột ngột. Ưu tiên những người là lao động chính trong gia đình.',
  },
  {
    question: 'Góp ít có được không?',
    answer:
      'Được, và đó chính là cách quỹ hoạt động. Không có mức tối thiểu. Mức góp phổ biến nhất là 50.000đ, và phần lớn các hoàn cảnh được giúp đủ nhờ hàng nghìn khoản góp nhỏ.',
  },
  {
    question: 'Làm sao biết hoàn cảnh là thật?',
    answer:
      'Mỗi hoàn cảnh đều được thợ tình nguyện ở cùng địa phương đến tận nơi xác minh trong 72 giờ và đứng tên bảo lãnh. Hồ sơ y tế hoặc biên bản tai nạn được lưu và có thể xem theo yêu cầu.',
  },
  {
    question: 'Tôi là thợ, tôi đang cần giúp thì làm gì?',
    answer:
      'Gửi hoàn cảnh qua nút "Gửi hoàn cảnh" hoặc gọi hotline. Bạn chỉ cần kể đúng câu chuyện của mình, đội ngũ sẽ hướng dẫn phần còn lại và cử thợ ở gần đến gặp bạn.',
  },
  {
    question: 'Doanh nghiệp muốn đồng hành thì thế nào?',
    answer:
      'Doanh nghiệp có thể tài trợ theo hoàn cảnh, lập quỹ tương trợ riêng cho đội thợ của mình trên nền tảng, hoặc trích phần trăm theo công trình. Quỹ cung cấp đầy đủ chứng từ tài trợ.',
  },
] as const

export const partners = [
  'Vua Thợ',
  'Cơ điện Bảo An',
  'Điện máy Việt',
  'Ngân hàng Tín Phát',
  'Vật liệu Hòa Bình',
  'Sơn Đông Á',
] as const
