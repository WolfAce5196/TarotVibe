export type TarotSuit = "wands" | "cups" | "swords" | "pentacles";
export type TarotArcana = "major" | "minor";

export interface TarotCard {
  id: number;
  name: string;
  english: string;
  arcana: TarotArcana;
  suit: TarotSuit | null;
  rank: string | number;
  image: string;
  // Keep these for AI interpretation
  upright: string;
  reversed: string;
  element: string | null;
}

const IMAGE_BASE = 'https://raw.githubusercontent.com/alnero/Zipline-data/master/Taro/img/';

export const CARD_BACK_URL = "https://raw.githubusercontent.com/efvince/tarot-images/master/back.jpg";

export const FULL_DECK: TarotCard[] = [
  // MAJOR ARCANA
  { id: 0, name: "Chàng Khờ", english: "THE FOOL", arcana: "major", suit: null, rank: 0, upright: "Khởi đầu mới, tự do.", reversed: "Liều lĩnh, cẩu thả.", element: "Air", image: `${IMAGE_BASE}0.jpg` },
  { id: 1, name: "Nhà Ảo Thuật", english: "THE MAGICIAN", arcana: "major", suit: null, rank: 1, upright: "Sức mạnh ý chí.", reversed: "Thao túng.", element: "Fire", image: `${IMAGE_BASE}1.jpg` },
  { id: 2, name: "Nữ Đại Tư Tế", english: "THE HIGH PRIESTESS", arcana: "major", suit: null, rank: 2, upright: "Trực giác.", reversed: "Bí mật bị lộ.", element: "Water", image: `${IMAGE_BASE}2.jpg` },
  { id: 3, name: "Nữ Hoàng", english: "THE EMPRESS", arcana: "major", suit: null, rank: 3, upright: "Sự dồi dào.", reversed: "Sự ngột ngạt.", element: "Earth", image: `${IMAGE_BASE}3.jpg` },
  { id: 4, name: "Hoàng Đế", english: "THE EMPEROR", arcana: "major", suit: null, rank: 4, upright: "Quyền lực.", reversed: "Độc đoán.", element: "Fire", image: `${IMAGE_BASE}4.jpg` },
  { id: 5, name: "Đại Tư Tế", english: "THE HIEROPHANT", arcana: "major", suit: null, rank: 5, upright: "Truyền thống.", reversed: "Nổi loạn.", element: "Earth", image: `${IMAGE_BASE}5.jpg` },
  { id: 6, name: "Những Người Yêu Nhau", english: "THE LOVERS", arcana: "major", suit: null, rank: 6, upright: "Tình yêu.", reversed: "Mất cân bằng.", element: "Air", image: `${IMAGE_BASE}6.jpg` },
  { id: 7, name: "Cỗ Xe Chiến Thắng", english: "THE CHARIOT", arcana: "major", suit: null, rank: 7, upright: "Quyết tâm.", reversed: "Mất kiểm soát.", element: "Water", image: `${IMAGE_BASE}7.jpg` },
  { id: 8, name: "Sức Mạnh", english: "STRENGTH", arcana: "major", suit: null, rank: 8, upright: "Can đảm.", reversed: "Tự ti.", element: "Fire", image: `${IMAGE_BASE}8.jpg` },
  { id: 9, name: "Ẩn Sĩ", english: "THE HERMIT", arcana: "major", suit: null, rank: 9, upright: "Chiêm nghiệm.", reversed: "Cô lập.", element: "Earth", image: `${IMAGE_BASE}9.jpg` },
  { id: 10, name: "Vòng Quay Định Mệnh", english: "WHEEL OF FORTUNE", arcana: "major", suit: null, rank: 10, upright: "Vận may.", reversed: "Vận rủi.", element: "Fire", image: `${IMAGE_BASE}10.jpg` },
  { id: 11, name: "Công Lý", english: "JUSTICE", arcana: "major", suit: null, rank: 11, upright: "Công bằng.", reversed: "Bất công.", element: "Air", image: `${IMAGE_BASE}11.jpg` },
  { id: 12, name: "Người Treo", english: "THE HANGED MAN", arcana: "major", suit: null, rank: 12, upright: "Tạm dừng.", reversed: "Bế tắc.", element: "Water", image: `${IMAGE_BASE}12.jpg` },
  { id: 13, name: "Cái Chết", english: "DEATH", arcana: "major", suit: null, rank: 13, upright: "Sự chuyển hóa.", reversed: "Kháng cự thay đổi.", element: "Water", image: `${IMAGE_BASE}13.jpg` },
  { id: 14, name: "Sự Tiết Chế", english: "TEMPERANCE", arcana: "major", suit: null, rank: 14, upright: "Cân bằng.", reversed: "Mất cân bằng.", element: "Fire", image: `${IMAGE_BASE}14.jpg` },
  { id: 15, name: "Ác Quỷ", english: "THE DEVIL", arcana: "major", suit: null, rank: 15, upright: "Ràng buộc.", reversed: "Giải thoát.", element: "Earth", image: `${IMAGE_BASE}15.jpg` },
  { id: 16, name: "Tòa Tháp", english: "THE TOWER", arcana: "major", suit: null, rank: 16, upright: "Biến động.", reversed: "Trì hoãn thảm họa.", element: "Fire", image: `${IMAGE_BASE}16.jpg` },
  { id: 17, name: "Ngôi Sao", english: "THE STAR", arcana: "major", suit: null, rank: 17, upright: "Hy vọng.", reversed: "Tuyệt vọng.", element: "Air", image: `${IMAGE_BASE}17.jpg` },
  { id: 18, name: "Mặt Trăng", english: "THE MOON", arcana: "major", suit: null, rank: 18, upright: "Ảo tưởng.", reversed: "Giải tỏa nỗi sợ.", element: "Water", image: `${IMAGE_BASE}18.jpg` },
  { id: 19, name: "Mặt Trời", english: "THE SUN", arcana: "major", suit: null, rank: 19, upright: "Tích cực.", reversed: "U ám tạm thời.", element: "Fire", image: `${IMAGE_BASE}19.jpg` },
  { id: 20, name: "Phán Xét", english: "JUDGEMENT", arcana: "major", suit: null, rank: 20, upright: "Tái sinh.", reversed: "Nghi ngờ.", element: "Fire", image: `${IMAGE_BASE}20.jpg` },
  { id: 21, name: "Thế Giới", english: "THE WORLD", arcana: "major", suit: null, rank: 21, upright: "Hoàn tất.", reversed: "Trì trệ.", element: "Earth", image: `${IMAGE_BASE}21.jpg` },

  // MINOR ARCANA - WANDS
  { id: 22, name: "Át Gậy", english: "ACE OF WANDS", arcana: "minor", suit: "wands", rank: "Ace", upright: "Cảm hứng, khởi đầu mới.", reversed: "Trì hoãn, thiếu lửa.", element: "Fire", image: `${IMAGE_BASE}22.jpg` },
  { id: 23, name: "Hai Gậy", english: "TWO OF WANDS", arcana: "minor", suit: "wands", rank: 2, upright: "Lập kế hoạch, khám phá.", reversed: "Thiếu chuẩn bị, do dự.", element: "Fire", image: `${IMAGE_BASE}23.jpg` },
  { id: 24, name: "Ba Gậy", english: "THREE OF WANDS", arcana: "minor", suit: "wands", rank: 3, upright: "Mở rộng, tầm nhìn.", reversed: "Trở ngại, thất vọng.", element: "Fire", image: `${IMAGE_BASE}24.jpg` },
  { id: 25, name: "Bốn Gậy", english: "FOUR OF WANDS", arcana: "minor", suit: "wands", rank: 4, upright: "Ăn mừng, ổn định.", reversed: "Mất hòa hợp, trì hoãn.", element: "Fire", image: `${IMAGE_BASE}25.jpg` },
  { id: 26, name: "Năm Gậy", english: "FIVE OF WANDS", arcana: "minor", suit: "wands", rank: 5, upright: "Cạnh tranh, xung đột.", reversed: "Tránh né, hòa giải.", element: "Fire", image: `${IMAGE_BASE}26.jpg` },
  { id: 27, name: "Sáu Gậy", english: "SIX OF WANDS", arcana: "minor", suit: "wands", rank: 6, upright: "Chiến thắng, công nhận.", reversed: "Thất bại, tự ti.", element: "Fire", image: `${IMAGE_BASE}27.jpg` },
  { id: 28, name: "Bảy Gậy", english: "SEVEN OF WANDS", arcana: "minor", suit: "wands", rank: 7, upright: "Kiên định, bảo vệ.", reversed: "Bị áp đảo, bỏ cuộc.", element: "Fire", image: `${IMAGE_BASE}28.jpg` },
  { id: 29, name: "Tám Gậy", english: "EIGHT OF WANDS", arcana: "minor", suit: "wands", rank: 8, upright: "Tốc độ, tiến triển.", reversed: "Trì trệ, vội vàng.", element: "Fire", image: `${IMAGE_BASE}29.jpg` },
  { id: 30, name: "Chín Gậy", english: "NINE OF WANDS", arcana: "minor", suit: "wands", rank: 9, upright: "Bền bỉ, phòng thủ.", reversed: "Kiệt sức, buông xuôi.", element: "Fire", image: `${IMAGE_BASE}30.jpg` },
  { id: 31, name: "Mười Gậy", english: "TEN OF WANDS", arcana: "minor", suit: "wands", rank: 10, upright: "Gánh nặng, trách nhiệm.", reversed: "Buông bỏ, kiệt sức.", element: "Fire", image: `${IMAGE_BASE}31.jpg` },
  { id: 32, name: "Thị Đồng Gậy", english: "PAGE OF WANDS", arcana: "minor", suit: "wands", rank: "Page", upright: "Tin tức, nhiệt huyết.", reversed: "Thiếu tập trung, tin xấu.", element: "Fire", image: `${IMAGE_BASE}32.jpg` },
  { id: 33, name: "Hiệp Sĩ Gậy", english: "KNIGHT OF WANDS", arcana: "minor", suit: "wands", rank: "Knight", upright: "Hành động, đam mê.", reversed: "Nóng nảy, bốc đồng.", element: "Fire", image: `${IMAGE_BASE}33.jpg` },
  { id: 34, name: "Nữ Hoàng Gậy", english: "QUEEN OF WANDS", arcana: "minor", suit: "wands", rank: "Queen", upright: "Tự tin, quyến rũ.", reversed: "Ghen tuông, ích kỷ.", element: "Fire", image: `${IMAGE_BASE}34.jpg` },
  { id: 35, name: "Vua Gậy", english: "KING OF WANDS", arcana: "minor", suit: "wands", rank: "King", upright: "Lãnh đạo, sáng tạo.", reversed: "Độc đoán, kiêu ngạo.", element: "Fire", image: `${IMAGE_BASE}35.jpg` },

  // MINOR ARCANA - CUPS
  { id: 36, name: "Át Cốc", english: "ACE OF CUPS", arcana: "minor", suit: "cups", rank: "Ace", upright: "Tình yêu, hạnh phúc.", reversed: "Trống rỗng, thất vọng.", element: "Water", image: `${IMAGE_BASE}36.jpg` },
  { id: 37, name: "Hai Cốc", english: "TWO OF CUPS", arcana: "minor", suit: "cups", rank: 2, upright: "Kết nối, hòa hợp.", reversed: "Rạn nứt, mâu thuẫn.", element: "Water", image: `${IMAGE_BASE}37.jpg` },
  { id: 38, name: "Ba Cốc", english: "THREE OF CUPS", arcana: "minor", suit: "cups", rank: 3, upright: "Ăn mừng, bạn bè.", reversed: "Cô lập, mâu thuẫn nhóm.", element: "Water", image: `${IMAGE_BASE}38.jpg` },
  { id: 39, name: "Bốn Cốc", english: "FOUR OF CUPS", arcana: "minor", suit: "cups", rank: 4, upright: "Thờ ơ, chán nản.", reversed: "Thức tỉnh, chấp nhận.", element: "Water", image: `${IMAGE_BASE}39.jpg` },
  { id: 40, name: "Năm Cốc", english: "FIVE OF CUPS", arcana: "minor", suit: "cups", rank: 5, upright: "Mất mát, hối tiếc.", reversed: "Chữa lành, tiến lên.", element: "Water", image: `${IMAGE_BASE}40.jpg` },
  { id: 41, name: "Sáu Cốc", english: "SIX OF CUPS", arcana: "minor", suit: "cups", rank: 6, upright: "Hoài niệm, tử tế.", reversed: "Bám víu quá khứ.", element: "Water", image: `${IMAGE_BASE}41.jpg` },
  { id: 42, name: "Bảy Cốc", english: "SEVEN OF CUPS", arcana: "minor", suit: "cups", rank: 7, upright: "Lựa chọn, ảo tưởng.", reversed: "Tỉnh ngộ, quyết định.", element: "Water", image: `${IMAGE_BASE}42.jpg` },
  { id: 43, name: "Tám Cốc", english: "EIGHT OF CUPS", arcana: "minor", suit: "cups", rank: 8, upright: "Ra đi, tìm kiếm.", reversed: "Sợ thay đổi, bám víu.", element: "Water", image: `${IMAGE_BASE}43.jpg` },
  { id: 44, name: "Chín Cốc", english: "NINE OF CUPS", arcana: "minor", suit: "cups", rank: 9, upright: "Mãn nguyện, ước nguyện.", reversed: "Thiếu hài lòng, tự mãn.", element: "Water", image: `${IMAGE_BASE}44.jpg` },
  { id: 45, name: "Mười Cốc", english: "TEN OF CUPS", arcana: "minor", suit: "cups", rank: 10, upright: "Viên mãn gia đình.", reversed: "Rạn nứt, mâu thuẫn.", element: "Water", image: `${IMAGE_BASE}45.jpg` },
  { id: 46, name: "Thị Đồng Cốc", english: "PAGE OF CUPS", arcana: "minor", suit: "cups", rank: "Page", upright: "Tin vui, sáng tạo.", reversed: "Bất ổn, thiếu chín chắn.", element: "Water", image: `${IMAGE_BASE}46.jpg` },
  { id: 47, name: "Hiệp Sĩ Cốc", english: "KNIGHT OF CUPS", arcana: "minor", suit: "cups", rank: "Knight", upright: "Lãng mạn, theo đuổi.", reversed: "Mơ mộng, thất thường.", element: "Water", image: `${IMAGE_BASE}47.jpg` },
  { id: 48, name: "Nữ Hoàng Cốc", english: "QUEEN OF CUPS", arcana: "minor", suit: "cups", rank: "Queen", upright: "Thấu cảm, trực giác.", reversed: "Nhạy cảm quá mức.", element: "Water", image: `${IMAGE_BASE}48.jpg` },
  { id: 49, name: "Vua Cốc", english: "KING OF CUPS", arcana: "minor", suit: "cups", rank: "King", upright: "Điềm tĩnh, trắc ẩn.", reversed: "Thao túng, lạnh lùng.", element: "Water", image: `${IMAGE_BASE}49.jpg` },

  // MINOR ARCANA - SWORDS
  { id: 50, name: "Át Kiếm", english: "ACE OF SWORDS", arcana: "minor", suit: "swords", rank: "Ace", upright: "Đột phá, trí tuệ.", reversed: "Nhầm lẫn, sai lầm.", element: "Air", image: `${IMAGE_BASE}50.jpg` },
  { id: 51, name: "Hai Kiếm", english: "TWO OF SWORDS", arcana: "minor", suit: "swords", rank: 2, upright: "Bế tắc, do dự.", reversed: "Tỉnh ngộ, lựa chọn.", element: "Air", image: `${IMAGE_BASE}51.jpg` },
  { id: 52, name: "Ba Kiếm", english: "THREE OF SWORDS", arcana: "minor", suit: "swords", rank: 3, upright: "Đau lòng, mất mát.", reversed: "Chữa lành, tha thứ.", element: "Air", image: `${IMAGE_BASE}52.jpg` },
  { id: 53, name: "Bốn Kiếm", english: "FOUR OF SWORDS", arcana: "minor", suit: "swords", rank: 4, upright: "Nghỉ ngơi, hồi phục.", reversed: "Kiệt sức, bồn chồn.", element: "Air", image: `${IMAGE_BASE}53.jpg` },
  { id: 54, name: "Năm Kiếm", english: "FIVE OF SWORDS", arcana: "minor", suit: "swords", rank: 5, upright: "Xung đột, thất bại.", reversed: "Hòa giải, hối hận.", element: "Air", image: `${IMAGE_BASE}54.jpg` },
  { id: 55, name: "Sáu Kiếm", english: "SIX OF SWORDS", arcana: "minor", suit: "swords", rank: 6, upright: "Di chuyển, bình yên.", reversed: "Trì trệ, rắc rối.", element: "Air", image: `${IMAGE_BASE}55.jpg` },
  { id: 56, name: "Bảy Kiếm", english: "SEVEN OF SWORDS", arcana: "minor", suit: "swords", rank: 7, upright: "Lừa dối, tránh né.", reversed: "Thú nhận, bị lộ.", element: "Air", image: `${IMAGE_BASE}56.jpg` },
  { id: 57, name: "Tám Kiếm", english: "EIGHT OF SWORDS", arcana: "minor", suit: "swords", rank: 8, upright: "Tự giới hạn, mắc kẹt.", reversed: "Giải thoát, tự do.", element: "Air", image: `${IMAGE_BASE}57.jpg` },
  { id: 58, name: "Chín Kiếm", english: "NINE OF SWORDS", arcana: "minor", suit: "swords", rank: 9, upright: "Lo âu, ác mộng.", reversed: "Giải tỏa, thực tế.", element: "Air", image: `${IMAGE_BASE}58.jpg` },
  { id: 59, name: "Mười Kiếm", english: "TEN OF SWORDS", arcana: "minor", suit: "swords", rank: 10, upright: "Kết thúc, thất bại.", reversed: "Hồi phục, tránh họa.", element: "Air", image: `${IMAGE_BASE}59.jpg` },
  { id: 60, name: "Thị Đồng Kiếm", english: "PAGE OF SWORDS", arcana: "minor", suit: "swords", rank: "Page", upright: "Tò mò, trí tuệ.", reversed: "Nói suông, tin nhiễu.", element: "Air", image: `${IMAGE_BASE}60.jpg` },
  { id: 61, name: "Hiệp Sĩ Kiếm", english: "KNIGHT OF SWORDS", arcana: "minor", suit: "swords", rank: "Knight", upright: "Hành động, quyết đoán.", reversed: "Hung hăng, rắc rối.", element: "Air", image: `${IMAGE_BASE}61.jpg` },
  { id: 62, name: "Nữ Hoàng Kiếm", english: "QUEEN OF SWORDS", arcana: "minor", suit: "swords", rank: "Queen", upright: "Độc lập, minh mẫn.", reversed: "Lạnh lùng, cay nghiệt.", element: "Air", image: `${IMAGE_BASE}62.jpg` },
  { id: 63, name: "Vua Kiếm", english: "KING OF SWORDS", arcana: "minor", suit: "swords", rank: "King", upright: "Lãnh đạo, công bằng.", reversed: "Chuyên quyền, thao túng.", element: "Air", image: `${IMAGE_BASE}63.jpg` },

  // MINOR ARCANA - PENTACLES
  { id: 64, name: "Át Tiền", english: "ACE OF PENTACLES", arcana: "minor", suit: "pentacles", rank: "Ace", upright: "Cơ hội tài chính.", reversed: "Bỏ lỡ, thất thoát.", element: "Earth", image: `${IMAGE_BASE}64.jpg` },
  { id: 65, name: "Hai Tiền", english: "TWO OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 2, upright: "Cân bằng, linh hoạt.", reversed: "Mất cân bằng, quá tải.", element: "Earth", image: `${IMAGE_BASE}65.jpg` },
  { id: 66, name: "Ba Tiền", english: "THREE OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 3, upright: "Hợp tác, kỹ năng.", reversed: "Thiếu hợp tác, kém.", element: "Earth", image: `${IMAGE_BASE}66.jpg` },
  { id: 67, name: "Bốn Tiền", english: "FOUR OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 4, upright: "Ổn định, tiết kiệm.", reversed: "Keo kiệt, bám víu.", element: "Earth", image: `${IMAGE_BASE}67.jpg` },
  { id: 68, name: "Năm Tiền", english: "FIVE OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 5, upright: "Khó khăn, thiếu hụt.", reversed: "Hồi phục, giúp đỡ.", element: "Earth", image: `${IMAGE_BASE}68.jpg` },
  { id: 69, name: "Sáu Tiền", english: "SIX OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 6, upright: "Hào phóng, cho nhận.", reversed: "Bất bình đẳng, nợ.", element: "Earth", image: `${IMAGE_BASE}69.jpg` },
  { id: 70, name: "Bảy Tiền", english: "SEVEN OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 7, upright: "Kiên nhẫn, đầu tư.", reversed: "Thiếu kiên nhẫn, tệ.", element: "Earth", image: `${IMAGE_BASE}70.jpg` },
  { id: 71, name: "Tám Tiền", english: "EIGHT OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 8, upright: "Chăm chỉ, rèn luyện.", reversed: "Lười biếng, hời hợt.", element: "Earth", image: `${IMAGE_BASE}71.jpg` },
  { id: 72, name: "Chín Tiền", english: "NINE OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 9, upright: "Độc lập, thịnh vượng.", reversed: "Phụ thuộc, hoang phí.", element: "Earth", image: `${IMAGE_BASE}72.jpg` },
  { id: 73, name: "Mười Tiền", english: "TEN OF PENTACLES", arcana: "minor", suit: "pentacles", rank: 10, upright: "Thịnh vượng, di sản.", reversed: "Mất mát, mâu thuẫn.", element: "Earth", image: `${IMAGE_BASE}73.jpg` },
  { id: 74, name: "Thị Đồng Tiền", english: "PAGE OF PENTACLES", arcana: "minor", suit: "pentacles", rank: "Page", upright: "Học tập, thực tế.", reversed: "Thiếu thực tế, lười.", element: "Earth", image: `${IMAGE_BASE}74.jpg` },
  { id: 75, name: "Hiệp Sĩ Tiền", english: "KNIGHT OF PENTACLES", arcana: "minor", suit: "pentacles", rank: "Knight", upright: "Tận tụy, trách nhiệm.", reversed: "Trì trệ, bảo thủ.", element: "Earth", image: `${IMAGE_BASE}75.jpg` },
  { id: 76, name: "Nữ Hoàng Tiền", english: "QUEEN OF PENTACLES", arcana: "minor", suit: "pentacles", rank: "Queen", upright: "Nuôi dưỡng, thực tế.", reversed: "Mất cân bằng, ích kỷ.", element: "Earth", image: `${IMAGE_BASE}76.jpg` },
  { id: 77, name: "Vua Tiền", english: "KING OF PENTACLES", arcana: "minor", suit: "pentacles", rank: "King", upright: "Thịnh vượng, thành công.", reversed: "Tham lam, độc đoán.", element: "Earth", image: `${IMAGE_BASE}77.jpg` },
];
