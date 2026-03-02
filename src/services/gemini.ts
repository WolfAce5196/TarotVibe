import { GoogleGenAI } from "@google/genai";
import { TarotCard } from "../constants/tarotDeck";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getTarotInterpretation(
  cards: { card: TarotCard; isReversed: boolean; position?: string }[],
  question: string,
  spreadType: string
) {
  const cardsInfo = cards.map(c => 
    `- ${c.position ? `${c.position}: ` : ""}${c.card.name} (${c.card.english}) - ${c.isReversed ? "Ngược" : "Xuôi"}. 
      Bộ: ${c.card.suit || "Ẩn Chính"}, Nguyên tố: ${c.card.element || "Không có"}. 
      Ý nghĩa cơ bản: ${c.isReversed ? c.card.reversed : c.card.upright}`
  ).join("\n");

  const prompt = `
    Bạn là một chuyên gia giải bài Tarot chuyên nghiệp, sâu sắc và thấu cảm, am hiểu sâu về bộ bài Rider-Waite-Smith.
    Hãy giải nghĩa trải bài sau đây cho người xem:
    
    Kiểu trải bài: ${spreadType}
    Câu hỏi của người xem: "${question || "Không có câu hỏi cụ thể, xin một lời khuyên tổng quan"}"
    
    Các lá bài đã rút:
    ${cardsInfo}
    
    Yêu cầu phản hồi bằng tiếng Việt, định dạng Markdown, cấu trúc như sau:
    1. **Tổng quan trải bài**: Cảm nhận chung về năng lượng của các lá bài. Đề cập đến sự cân bằng của các nguyên tố (Lửa, Nước, Khí, Đất) nếu có nhiều lá bài.
    2. **Chi tiết từng lá bài**: Giải thích sâu hơn về từng lá bài trong vị trí của nó và trạng thái (xuôi/ngược). Phân tích hình ảnh và biểu tượng đặc trưng của bộ Rider-Waite.
    3. **Liên hệ câu hỏi & Kết nối**: Kết nối các lá bài lại với nhau để trả lời câu hỏi của người xem một cách logic và thấu đáo.
    4. **Lời khuyên thực tế**: Đưa ra hành động hoặc thái độ cụ thể mà người xem nên có để cải thiện tình hình.
    
    Hãy dùng văn phong huyền bí nhưng gần gũi, truyền cảm hứng. Tránh dùng từ ngữ quá tiêu cực, hãy tập trung vào sự phát triển và chuyển hóa.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, vũ trụ đang bận rộn một chút. Hãy thử lại sau nhé!";
  }
}
