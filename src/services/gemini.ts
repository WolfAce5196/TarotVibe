import { TarotCard } from "../constants/tarotDeck";

export async function getTarotInterpretation(
  cards: { card: TarotCard; isReversed: boolean; position?: string }[],
  question: string,
  spreadType: string
) {
  try {
    const response = await fetch("/api/interpret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cards,
        question,
        spreadType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Lỗi máy chủ khi giải bài.");
    }

    const data = await response.json();
    return data.text;
  } catch (error: any) {
    console.error("Interpretation Error:", error);
    const errorMsg = error?.message || "Lỗi kết nối AI";
    return `Xin lỗi, vũ trụ đang bận rộn một chút (${errorMsg}). Bạn vui lòng thử lại sau vài giây nhé!`;
  }
}
