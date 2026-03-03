import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, History, RotateCcw, Send, Info, ChevronRight, Share2, Trash2, ExternalLink, Filter, Layers } from "lucide-react";
import { cn } from "./lib/utils";
import { FULL_DECK, CARD_BACK_URL, TarotCard, TarotSuit } from "./constants/tarotDeck";
import { getTarotInterpretation } from "./services/gemini";
import confetti from "canvas-confetti";

// --- Components ---

const Navbar = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Thư Viện Bài", onClick: () => onNavigate("library") },
    { label: "Đặt Lịch Xem 1:1", href: "#", highlight: true },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-cosmic-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate("home")}
        >
          <div className="w-9 h-9 rounded-full bg-gold-accent flex items-center justify-center shadow-[0_0_15px_rgba(242,125,38,0.5)] group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-cosmic-black" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-wider gold-text-glow">TarotVibe</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={item.onClick}
              className={cn(
                "text-sm font-medium transition-all hover:text-gold-accent tracking-wide cursor-pointer",
                item.highlight 
                  ? "px-5 py-2 bg-gold-accent/10 border border-gold-accent/30 rounded-full text-gold-accent hover:bg-gold-accent hover:text-cosmic-black" 
                  : "text-white/70"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="space-y-1.5">
            <div className={cn("w-6 h-0.5 bg-current transition-all", isMobileMenuOpen && "rotate-45 translate-y-2")}></div>
            <div className={cn("w-6 h-0.5 bg-current transition-all", isMobileMenuOpen && "opacity-0")}></div>
            <div className={cn("w-6 h-0.5 bg-current transition-all", isMobileMenuOpen && "-rotate-45 -translate-y-2")}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-cosmic-black/95 border-t border-white/5 mt-4"
          >
            <div className="flex flex-col gap-4 p-6">
              {menuItems.map((item, idx) => (
                <button 
                  key={idx} 
                  className={cn(
                    "text-lg font-serif py-2 border-b border-white/5 text-left",
                    item.highlight ? "text-gold-accent" : "text-white/70"
                  )}
                  onClick={() => {
                    item.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TarotCardComponent = ({ 
  card, 
  isReversed, 
  isFlipped, 
  onClick, 
  className 
}: { 
  card: TarotCard; 
  isReversed: boolean; 
  isFlipped: boolean; 
  onClick?: () => void;
  className?: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const suitIcons: Record<string, string> = {
    major: "✨",
    wands: "🔥",
    cups: "💧",
    swords: "⚔️",
    pentacles: "💰"
  };

  const suitColors: Record<string, string> = {
    major: "border-purple-500/50 shadow-purple-500/20",
    wands: "border-orange-500/50 shadow-orange-500/20",
    cups: "border-blue-500/50 shadow-blue-500/20",
    swords: "border-slate-400/50 shadow-slate-400/20",
    pentacles: "border-emerald-500/50 shadow-emerald-500/20"
  };

  const currentSuit = card.arcana === "major" ? "major" : (card.suit || "");

  return (
    <div 
      className={cn("card-flip-container cursor-pointer group", className)}
      onClick={onClick}
    >
      <div className={cn("card-flip-inner shadow-2xl", isFlipped && "is-flipped")}>
        {/* Back of the card */}
        <div className="card-back bg-[#1a0b2e] p-1">
          <div className="w-full h-full border-4 border-gold-accent/20 rounded-xl overflow-hidden relative">
            <img 
              src={CARD_BACK_URL} 
              alt="Card Back" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-cosmic-purple/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-gold-accent/30 flex items-center justify-center bg-cosmic-black/40 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-gold-accent animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Front of the card */}
        <div className={cn(
          "card-front bg-cosmic-black flex flex-col rounded-2xl border-2 overflow-hidden",
          suitColors[currentSuit]
        )}>
          <div className={cn("relative aspect-[2/3] w-full bg-white/5 overflow-hidden", isReversed && "rotate-180")}>
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-white/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white/20" />
              </div>
            )}
            <img 
              src={card.image} 
              alt={card.name} 
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "w-full h-full object-contain transition-all duration-700 group-hover:scale-105 card-flip",
                !imageLoaded ? "opacity-0" : "opacity-100"
              )}
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex-1 flex flex-col justify-center p-2 bg-cosmic-black/95 backdrop-blur-md border-t border-gold-accent/20 text-center relative z-10">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-xs">{suitIcons[currentSuit]}</span>
              <h3 className="text-sm font-serif font-bold text-gold-accent gold-text-glow truncate">{card.name}</h3>
            </div>
            <p className="text-[8px] text-white/30 uppercase tracking-widest font-medium">{card.english}</p>
            {isReversed && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-red-500 text-white text-[8px] font-bold uppercase rounded-full shadow-lg">
                Ngược
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<"home" | "reading" | "history" | "personal_form" | "library">("home");
  const [spreadType, setSpreadType] = useState<"1-card" | "3-card" | "personal">("1-card");
  const [selectedCards, setSelectedCards] = useState<{ card: TarotCard; isReversed: boolean; position?: string; isFlipped: boolean }[]>([]);
  const [question, setQuestion] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [deckMode, setDeckMode] = useState<"major" | "full">("full");
  const [suitFilter, setSuitFilter] = useState<"All" | TarotSuit | "major">("All");
  const [selectedLibraryCard, setSelectedLibraryCard] = useState<TarotCard | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("tarot_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (data: any) => {
    const newHistory = [data, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem("tarot_history", JSON.stringify(newHistory));
  };

  const handleShare = async () => {
    if (!interpretation) return;
    
    const shareText = `Quẻ bài Tarot của tôi tại TarotVibe:\n\n${selectedCards.map(c => `${c.card.name}${c.isReversed ? ' (Ngược)' : ''}`).join(', ')}\n\nLời giải: ${interpretation.slice(0, 100)}...`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TarotVibe - Kết quả xem bài',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\nXem thêm tại: ${window.location.href}`);
      alert("Đã sao chép kết quả vào bộ nhớ tạm!");
    }
  };

  const clearHistory = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
      setHistory([]);
      localStorage.removeItem("tarot_history");
    }
  };

  const viewHistoryDetail = (item: any) => {
    const cards = (item.cards || [item]).map((c: any) => ({ ...c, isFlipped: true }));
    setSelectedCards(cards);
    setQuestion(item.question || "");
    setInterpretation(item.interpretation || "");
    setSpreadType(item.spreadType || "1-card");
    setView("reading");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getRandomCards = (count: number, positions?: string[]) => {
    let currentDeck = deckMode === "major" 
      ? FULL_DECK.filter(c => c.arcana === "major") 
      : [...FULL_DECK];

    if (suitFilter !== "All") {
      if (suitFilter === "major") {
        currentDeck = currentDeck.filter(c => c.arcana === "major");
      } else {
        currentDeck = currentDeck.filter(c => c.suit === suitFilter);
      }
    }

    const shuffled = [...currentDeck].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((card, idx) => ({
      card,
      isReversed: Math.random() > 0.5,
      position: positions ? positions[idx] : undefined,
      isFlipped: false
    }));
  };

  const handleDrawCard = (type: "1-card" | "3-card" | "personal") => {
    setSpreadType(type);
    let cards: any[] = [];
    
    if (type === "1-card" || type === "personal") {
      cards = getRandomCards(1);
    } else if (type === "3-card") {
      cards = getRandomCards(3, ["Quá khứ", "Hiện tại", "Tương lai"]);
    }

    setSelectedCards(cards);
    setView(type === "personal" ? "personal_form" : "reading");
    setInterpretation("");
    if (type !== "personal") setQuestion("");
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFlip = (index: number) => {
    if (!selectedCards[index].isFlipped) {
      const newCards = [...selectedCards];
      newCards[index].isFlipped = true;
      setSelectedCards(newCards);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#f27d26", "#1a0b2e", "#ffffff"]
      });
    }
  };

  const handleGetInterpretation = async () => {
    if (selectedCards.length === 0) return;
    setIsLoading(true);
    
    const spreadName = spreadType === "1-card" ? "Trải bài 1 lá" : 
                      spreadType === "3-card" ? "Trải bài 3 lá (Quá khứ - Hiện tại - Tương lai)" : 
                      "Hỏi đáp cá nhân hóa";

    const result = await getTarotInterpretation(
      selectedCards,
      question,
      spreadName
    );
    
    setInterpretation(result || "");
    setIsLoading(false);
    
    saveToHistory({
      date: new Date().toISOString(),
      cards: selectedCards,
      spreadType: spreadType,
      question,
      interpretation: result
    });
  };

  const resetReading = () => {
    setView("home");
    setSelectedCards([]);
    setInterpretation("");
    setQuestion("");
  };

  const allFlipped = selectedCards.length > 0 && selectedCards.every(c => c.isFlipped);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setView} />

      <main className="flex-1 pt-24 pb-12 px-6 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.section 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-12 py-12"
            >
              <div className="space-y-6">
                <motion.h1 
                  className="text-5xl md:text-7xl font-serif font-bold leading-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Xem Tarot Online <br />
                  <span className="text-gold-accent gold-text-glow italic">Khám Phá Định Mệnh</span>
                </motion.h1>
                <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Lắng nghe tiếng nói của vũ trụ qua những lá bài huyền bí. 
                  Sử dụng trí tuệ nhân tạo để giải mã thông điệp dành riêng cho bạn.
                </p>
              </div>

              <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => handleDrawCard("1-card")}
                    className="group relative px-8 py-4 bg-gold-accent text-cosmic-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(242,125,38,0.4)]"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      Rút Bài Ngay <Sparkles className="w-5 h-5" />
                    </span>
                  </button>
                  
                  <button 
                    onClick={() => setView("history")}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <History className="w-5 h-5" /> Lịch Sử
                  </button>
                </div>

                {/* Deck Settings */}
                <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                      <Layers className="text-gold-accent w-5 h-5" />
                      <span className="text-sm font-medium">Chế độ bộ bài:</span>
                      <div className="flex bg-cosmic-black p-1 rounded-full border border-white/10">
                        <button 
                          onClick={() => setDeckMode("major")}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                            deckMode === "major" ? "bg-gold-accent text-cosmic-black" : "text-white/40 hover:text-white"
                          )}
                        >
                          Chỉ 22 Lá Chính
                        </button>
                        <button 
                          onClick={() => setDeckMode("full")}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                            deckMode === "full" ? "bg-gold-accent text-cosmic-black" : "text-white/40 hover:text-white"
                          )}
                        >
                          Full 78 Lá
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Filter className="text-gold-accent w-5 h-5" />
                      <span className="text-sm font-medium">Lọc theo bộ:</span>
                      <div className="flex flex-wrap justify-center gap-2">
                        {(["All", "major", "wands", "cups", "swords", "pentacles"] as const).map((s) => (
                          <button 
                            key={s}
                            onClick={() => setSuitFilter(s)}
                            className={cn(
                              "w-8 h-8 flex items-center justify-center rounded-full border transition-all text-sm",
                              suitFilter === s 
                                ? "bg-gold-accent border-gold-accent text-cosmic-black scale-110" 
                                : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30"
                            )}
                            title={s === "All" ? "Tất cả" : s}
                          >
                            {s === "All" ? "All" : s === "major" ? "✨" : s === "wands" ? "🔥" : s === "cups" ? "💧" : s === "swords" ? "⚔️" : "💰"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                {[
                  { title: "1 Lá Bài", desc: "Thông điệp nhanh cho ngày mới hoặc câu hỏi cụ thể.", type: "1-card" },
                  { title: "3 Lá Bài", desc: "Quá khứ - Hiện tại - Tương lai. Cái nhìn sâu sắc về hành trình.", type: "3-card" },
                  { title: "Cá Nhân Hóa", desc: "Đặt câu hỏi trước, rút bài sau. Giải mã chuyên sâu.", type: "personal" },
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleDrawCard(item.type as any)}
                    className="p-6 rounded-2xl border border-white/5 bg-white/5 text-left space-y-2 transition-all hover:border-gold-accent/30 hover:bg-white/10 group"
                  >
                    <h3 className="text-xl font-serif font-bold text-gold-accent group-hover:gold-text-glow">{item.title}</h3>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {view === "personal_form" && (
            <motion.section 
              key="personal_form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto py-12 space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-serif font-bold text-gold-accent">Hỏi Đáp Cá Nhân Hóa</h2>
                <p className="text-white/60">Hãy chia sẻ vấn đề bạn đang gặp phải để vũ trụ đưa ra lời khuyên chính xác nhất.</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gold-accent">Câu hỏi của bạn</label>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ví dụ: Tôi nên làm gì để cải thiện mối quan hệ hiện tại?..."
                    className="w-full p-4 bg-cosmic-black border border-white/10 rounded-xl focus:border-gold-accent/50 outline-none h-32"
                  />
                </div>
                <button 
                  onClick={() => setView("reading")}
                  disabled={!question.trim()}
                  className="w-full py-4 bg-gold-accent text-cosmic-black font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Tiếp Tục Rút Bài <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.section>
          )}

          {view === "reading" && selectedCards.length > 0 && (
            <motion.section 
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-12 py-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-serif font-bold">
                  {!allFlipped ? "Tập trung vào câu hỏi của bạn..." : "Thông điệp từ Vũ Trụ"}
                </h2>
                <p className="text-white/60">
                  {!allFlipped ? "Chạm vào từng lá bài để lật mở bí mật." : "Hãy chiêm nghiệm ý nghĩa của trải bài này."}
                </p>
              </div>

              <div className={cn(
                "flex flex-wrap justify-center gap-8 w-full",
                selectedCards.length === 3 ? "max-w-5xl" : "max-w-md"
              )}>
                {selectedCards.map((c, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4">
                    {c.position && (
                      <span className="px-3 py-1 bg-gold-accent/10 border border-gold-accent/30 text-gold-accent text-xs uppercase tracking-widest rounded-full">
                        {c.position}
                      </span>
                    )}
                    <TarotCardComponent 
                      card={c.card}
                      isReversed={c.isReversed}
                      isFlipped={c.isFlipped}
                      onClick={() => handleFlip(idx)}
                      className={cn("animate-float", selectedCards.length === 3 ? "w-44 h-[300px] md:w-56 md:h-[380px]" : "w-64 h-[440px]")}
                    />
                  </div>
                ))}
              </div>

              {allFlipped && !interpretation && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md space-y-6"
                >
                  {spreadType !== "personal" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gold-accent flex items-center gap-2">
                        <Info className="w-4 h-4" /> Bạn muốn hỏi điều gì? (Tùy chọn)
                      </label>
                      <textarea 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ví dụ: Công việc của tôi trong tháng tới thế nào?..."
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold-accent/50 outline-none resize-none h-24"
                      />
                    </div>
                  )}
                  <button 
                    onClick={handleGetInterpretation}
                    disabled={isLoading}
                    className="w-full py-4 bg-gold-accent text-cosmic-black font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-cosmic-black/30 border-t-cosmic-black rounded-full animate-spin"></div>
                    ) : (
                      <>Giải Mã Thông Điệp <Send className="w-5 h-5" /></>
                    )}
                  </button>
                </motion.div>
              )}

              {interpretation && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 shadow-[0_0_50px_rgba(139,92,246,0.1)]"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <h3 className="text-2xl font-serif font-bold text-gold-accent">Lời Giải Mã</h3>
                    <div className="flex gap-4">
                      <button 
                        onClick={handleShare}
                        className="p-2 text-white/40 hover:text-gold-accent transition-colors flex items-center gap-2 text-sm"
                        title="Chia sẻ kết quả"
                      >
                        <Share2 className="w-5 h-5" /> <span className="hidden sm:inline">Chia sẻ</span>
                      </button>
                      <button onClick={resetReading} className="p-2 text-white/40 hover:text-white transition-colors">
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none prose-p:text-white/80 prose-headings:text-gold-accent prose-strong:text-gold-glow">
                    {interpretation.split('\n').map((line, i) => (
                      <p key={i} className="mb-4 leading-relaxed">
                        {line.startsWith('**') ? (
                          <span className="font-bold text-gold-accent block mt-6 mb-2 text-lg">{line.replace(/\*\*/g, '')}</span>
                        ) : line}
                      </p>
                    ))}
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={resetReading}
                      className="px-8 py-3 bg-gold-accent text-cosmic-black font-bold rounded-full hover:scale-105 transition-all"
                    >
                      Rút Lại Bài Mới
                    </button>
                    <button 
                      onClick={() => setView("history")}
                      className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all"
                    >
                      Xem Lịch Sử
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}

          {view === "history" && (
            <motion.section 
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 py-8"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl font-serif font-bold flex items-center gap-3">
                    <History className="text-gold-accent" /> Lịch Sử Xem Bài
                  </h2>
                  <p className="text-sm text-white/40">Lưu tối đa 20 lần xem bài gần nhất của bạn.</p>
                </div>
                <div className="flex gap-4">
                  {history.length > 0 && (
                    <button 
                      onClick={clearHistory}
                      className="text-sm text-red-400/60 hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Xóa hết
                    </button>
                  )}
                  <button 
                    onClick={() => setView("home")}
                    className="text-sm text-white/60 hover:text-white flex items-center gap-1"
                  >
                    Quay lại <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/40">Bạn chưa có lịch sử xem bài nào.</p>
                  <button 
                    onClick={() => handleDrawCard("1-card")}
                    className="mt-4 px-6 py-2 bg-gold-accent/10 text-gold-accent border border-gold-accent/30 rounded-full hover:bg-gold-accent hover:text-cosmic-black transition-all"
                  >
                    Bắt đầu rút bài ngay
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {history.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => viewHistoryDetail(item)}
                      className="group p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row gap-6 hover:bg-white/10 hover:border-gold-accent/30 transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-5 h-5 text-gold-accent" />
                      </div>
                      
                      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {(item.cards || [item]).map((c: any, cIdx: number) => (
                          <div key={cIdx} className="w-20 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-gold-accent/30 relative shadow-lg bg-white/5">
                            <img 
                              src={c.card.image} 
                              alt={c.card.name} 
                              className={cn("w-full h-full object-contain", c.isReversed && "rotate-180")}
                              referrerPolicy="no-referrer"
                            />
                            {c.position && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gold-accent/90 text-[8px] text-cosmic-black font-bold text-center py-0.5 uppercase">
                                {c.position}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-gold-accent/10 text-gold-accent text-[10px] font-bold uppercase rounded border border-gold-accent/20">
                                {item.spreadType === "3-card" ? "Trải bài 3 lá" : item.spreadType === "personal" ? "Cá nhân hóa" : "1 Lá bài"}
                              </span>
                              <p className="text-xs text-white/40">{new Date(item.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <h4 className="text-xl font-serif font-bold text-white group-hover:text-gold-accent transition-colors mt-1">
                              {item.spreadType === "3-card" 
                                ? `${item.cards[0].card.name} • ${item.cards[1].card.name} • ${item.cards[2].card.name}`
                                : (item.cards?.[0]?.card?.name || item.card?.name)}
                            </h4>
                          </div>
                        </div>
                        {item.question && (
                          <p className="text-sm text-white/70 italic line-clamp-1">" {item.question} "</p>
                        )}
                        <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">{item.interpretation?.replace(/\*\*/g, '').split('\n').filter((l: string) => l.trim()).slice(0, 2).join(' ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
          )}
          {view === "library" && (
            <motion.section 
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 py-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-serif font-bold text-gold-accent">Thư Viện Tarot</h2>
                <p className="text-white/60">Khám phá ý nghĩa của 78 lá bài Rider-Waite chuẩn.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {(["All", "major", "wands", "cups", "swords", "pentacles"] as const).map((s) => (
                  <button 
                    key={s}
                    onClick={() => setSuitFilter(s)}
                    className={cn(
                      "px-4 py-2 rounded-full border transition-all text-sm flex items-center gap-2",
                      suitFilter === s 
                        ? "bg-gold-accent border-gold-accent text-cosmic-black" 
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    )}
                  >
                    {s === "All" ? "Tất cả" : s === "major" ? "Ẩn Chính" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {FULL_DECK.filter(c => {
                  if (suitFilter === "All") return true;
                  if (suitFilter === "major") return c.arcana === "major";
                  return c.suit === suitFilter;
                }).map((card) => (
                  <div 
                    key={card.id}
                    onClick={() => setSelectedLibraryCard(card)}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:border-gold-accent/50 transition-all bg-black/40">
                      <img 
                        src={card.image} 
                        alt={card.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[10px] text-center font-bold text-white/60 group-hover:text-gold-accent truncate">{card.name}</p>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {selectedLibraryCard && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-cosmic-black/90 backdrop-blur-md"
                    onClick={() => setSelectedLibraryCard(null)}
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-cosmic-purple/40 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 flex flex-col md:flex-row gap-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="aspect-[2/3] rounded-2xl overflow-hidden border-2 border-gold-accent/30 shadow-[0_0_30px_rgba(242,125,38,0.2)] bg-black/40">
                          <img 
                            src={selectedLibraryCard.image} 
                            alt={selectedLibraryCard.name} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="flex-1 space-y-6">
                        <div className="border-b border-white/10 pb-4">
                          <h3 className="text-3xl font-serif font-bold text-gold-accent">{selectedLibraryCard.name}</h3>
                          <p className="text-white/40 italic">{selectedLibraryCard.english}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <p className="text-[10px] uppercase tracking-widest text-gold-accent/60 mb-1">Bộ (Suit)</p>
                            <p className="text-sm font-bold capitalize">{selectedLibraryCard.suit || "Major Arcana"}</p>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <p className="text-[10px] uppercase tracking-widest text-gold-accent/60 mb-1">Nguyên tố</p>
                            <p className="text-sm font-bold">{selectedLibraryCard.element || "N/A"}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-bold text-gold-accent flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4" /> Ý nghĩa xuôi (Upright)
                            </h4>
                            <p className="text-sm text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                              {selectedLibraryCard.upright}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-2">
                              <RotateCcw className="w-4 h-4" /> Ý nghĩa ngược (Reversed)
                            </h4>
                            <p className="text-sm text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                              {selectedLibraryCard.reversed}
                            </p>
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedLibraryCard(null)}
                          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-bold"
                        >
                          Đóng
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-8 px-6 border-t border-white/5 text-center text-white/30 text-xs">
        <p>© 2026 TarotVibe • Kết nối tâm hồn và vũ trụ • [V2.1]</p>
      </footer>
    </div>
  );
}
