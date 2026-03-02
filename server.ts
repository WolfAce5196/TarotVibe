import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route để giải mã quẻ bài Tarot
  app.post("/api/interpret", async (req, res) => {
    const { cards, question, spreadType } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "undefined" || apiKey === "" || apiKey === "MY_GEMINI_API_KEY") {
      return res.status(500).json({ error: "Hệ thống chưa được cấu hình khóa AI (GEMINI_API_KEY). Vui lòng kiểm tra Secrets trong AI Studio." });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const cardsInfo = cards.map((c: any) => 
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

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Server Error:", error);
      res.status(500).json({ error: error?.message || "Lỗi kết nối AI từ phía máy chủ." });
    }
  });

  // Tích hợp Vite middleware cho môi trường phát triển
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Phục vụ các file tĩnh trong môi trường production
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
