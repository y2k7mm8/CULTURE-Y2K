import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const palettes = {
  chrome: ["#7DF9FF", "#9EAFFF", "#FF7BEA"],
  candy: ["#FFD6F7", "#FF9FE5", "#B594FF"],
  cyber: ["#D6FF60", "#7DF9FF", "#6B7EFF"],
};

interface FashionItem {
  id: string;
  title: string;
  type: keyof typeof palettes;
  description: string;
  emoji: string;
  year: number;
  popularity: number;
}

const fashionItems: FashionItem[] = [
  {
    id: "p1",
    title: "Metallic Tops",
    type: "chrome",
    description: "Металлические топы с блестками и пайетками - символ эпохи",
    emoji: "👕",
    year: 2002,
    popularity: 95,
  },
  {
    id: "p2",
    title: "Chanel Sunglasses",
    type: "chrome",
    description: "Крупные солнцезащитные очки от Chanel - тренд 2000-х",
    emoji: "🕶️",
    year: 2001,
    popularity: 90,
  },
  {
    id: "p3",
    title: "Mini Handbags",
    type: "candy",
    description: "Крошечные сумки с логотипами и стразами - must-have",
    emoji: "👜",
    year: 2003,
    popularity: 88,
  },
  {
    id: "p4",
    title: "Velour Tracksuits",
    type: "cyber",
    description: "Бархатные спортивные костюмы от Juicy Couture",
    emoji: "🧥",
    year: 2004,
    popularity: 92,
  },
  {
    id: "p5",
    title: "Low-Rise Jeans",
    type: "candy",
    description: "Джинсы с заниженной талией - база Y2K стиля",
    emoji: "👖",
    year: 2001,
    popularity: 98,
  },
  {
    id: "p6",
    title: "Platform Sneakers",
    type: "cyber",
    description: "Платформенные кроссовки добавляют высоту и стиль",
    emoji: "👟",
    year: 2002,
    popularity: 85,
  },
  {
    id: "p7",
    title: "Neon Bracelets",
    type: "cyber",
    description: "Светящиеся браслеты для клубов и вечеринок",
    emoji: "⌚",
    year: 2003,
    popularity: 80,
  },
  {
    id: "p8",
    title: "Crystal Clips",
    type: "chrome",
    description: "Заколки для волос с кристаллами Swarovski",
    emoji: "✨",
    year: 2002,
    popularity: 87,
  },
  {
    id: "p9",
    title: "Baby Tees",
    type: "candy",
    description: "Облегающие футболки с надписями и принтами",
    emoji: "👚",
    year: 2000,
    popularity: 94,
  },
  {
    id: "p10",
    title: "Butterfly Clips",
    type: "chrome",
    description: "Заколки-бабочки для причесок из 2000-х",
    emoji: "🦋",
    year: 2001,
    popularity: 89,
  },
];

const fashionTips = [
  "Сочетайте металлические топы с прозрачными юбками",
  "Кисти для волос с кристаллами — тренд 2000-х",
  "Platform sneakers добавляют высоту и стиль",
  "Наборы маникюра с глиттером — must-have эпохи",
  "Ремешки с логотипами — символ статуса",
  "Поясные сумки с стразами и цепями",
  "Облегающие футболки с принтами - основа гардероба",
  "Крупные солнцезащитные очки - обязательно",
  "Бархатные спортивные костюмы - для отдыха",
  "Низкие джинсы - классика Y2K",
];

const icons = [
  { emoji: "💅", title: "Glitter Nails", desc: "Маникюр с блестками" },
  { emoji: "💍", title: "Rings", desc: "Несколько колец на пальцах" },
  { emoji: "👑", title: "Hair Accessories", desc: "Заколки и ободки" },
  { emoji: "🌟", title: "Body Glitter", desc: "Блеск для тела" },
];

export default function Fashion() {
  const { t } = useTranslation();

  const [palette, setPalette] = useState<keyof typeof palettes>("chrome");
  const [showOnlyCurrent, setShowOnlyCurrent] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<FashionItem | null>(null);
  const [filterType, setFilterType] = useState<"all" | "chrome" | "candy" | "cyber">("all");

  const visibleItems = useMemo(() => {
    let filtered = fashionItems;
    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }
    if (showOnlyCurrent) {
      filtered = filtered.filter((item) => item.type === palette);
    }
    return filtered;
  }, [filterType, palette, showOnlyCurrent]);

  const toggleLike = (itemId: string) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(itemId)) {
      newLiked.delete(itemId);
    } else {
      newLiked.add(itemId);
    }
    setLikedItems(newLiked);
  };

  const avgPopularity = fashionItems.reduce((sum, item) => sum + item.popularity, 0) / fashionItems.length;
  const topItems = fashionItems.filter(item => item.popularity >= 90);

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="chrome-panel rounded-[28px] p-6">
            <p className="micro-label mb-3">{t("fashion.label")}</p>
            <h1 className="window-title text-4xl text-white md:text-5xl">
              {t("fashion.title")}{" "}
              <span className="chroma-text">{t("fashion.titleHighlight")}</span>{" "}
              {t("fashion.titleEnd")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              {t("fashion.description")}
            </p>

            {/* Palette Filters */}
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`y2k-button rounded-full px-3 py-2 text-[11px] uppercase ${
                  filterType === "all" ? "border-cyan-300/50 bg-cyan-300/20" : "text-white/70"
                }`}
              >
                All Types
              </button>
              {(Object.keys(palettes) as Array<keyof typeof palettes>).map((key) => (
                <button
                  key={key}
                  onClick={() => setFilterType(key)}
                  className={`y2k-button rounded-full px-3 py-2 text-[11px] uppercase ${
                    filterType === key
                      ? "border-cyan-300/50 bg-cyan-300/20"
                      : "text-white/70"
                  }`}
                >
                  {key}
                </button>
              ))}
              <button
                onClick={() => setShowOnlyCurrent((prev) => !prev)}
                className={`y2k-button rounded-full px-3 py-2 text-[11px] uppercase ${
                  showOnlyCurrent ? "border-pink-300/50 bg-pink-300/20" : "text-white/70"
                }`}
              >
                {showOnlyCurrent ? "Selected Only" : "Show All"}
              </button>
            </div>

            {/* Color Palette */}
            <div className="mt-6 flex flex-wrap gap-3">
              <p className="micro-label mr-2">Palette:</p>
              {palettes[palette].map((color) => (
                <div
                  key={color}
                  className="chrome-chip flex items-center gap-2 rounded-full px-3 py-2 text-xs uppercase"
                  onClick={() => setPalette(palette)}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-white/30 animate-pulse cursor-pointer"
                    style={{ background: color }}
                  />
                  {color}
                </div>
              ))}
            </div>
          </div>

          {/* Fashion Tip Card */}
          <div className="chrome-panel rounded-[28px] p-6 bg-gradient-to-br from-pink-500/20 to-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div className="flex-1">
                <p className="micro-label mb-2">Совет стилиста</p>
                <p className="text-lg text-white/90 leading-relaxed">
                  {fashionTips[currentTip]}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setCurrentTip((prev) => (prev - 1 + fashionTips.length) % fashionTips.length)}
                className="px-3 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition"
              >
                ←
              </button>
              <div className="flex gap-1 items-center">
                {fashionTips.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTip(idx)}
                    className={`w-2 h-2 rounded-full transition ${idx === currentTip ? "bg-white" : "bg-white/30"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentTip((prev) => (prev + 1) % fashionTips.length)}
                className="px-3 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-3 md:grid-cols-3">
        <div className="chrome-panel rounded-[22px] p-4 text-center">
          <div className="text-3xl font-bold text-cyan-300">{fashionItems.length}</div>
          <div className="text-xs text-white/60 mt-1">Fashion Items</div>
        </div>
        <div className="chrome-panel rounded-[22px] p-4 text-center">
          <div className="text-3xl font-bold text-pink-300">{Math.round(avgPopularity)}%</div>
          <div className="text-xs text-white/60 mt-1">Avg Popularity</div>
        </div>
        <div className="chrome-panel rounded-[22px] p-4 text-center">
          <div className="text-3xl font-bold text-purple-300">{topItems.length}</div>
          <div className="text-xs text-white/60 mt-1">Top Items (90%+)</div>
        </div>
      </section>

      {/* Accessories Icons */}
      <section className="chrome-panel rounded-[24px] p-5">
        <p className="micro-label mb-4">Аксессуары Y2K</p>
        <div className="grid gap-3 grid-cols-4">
          {icons.map((icon, idx) => (
            <div key={idx} className="text-center p-3 rounded-xl hover:bg-white/10 transition cursor-default">
              <div className="text-3xl mb-2">{icon.emoji}</div>
              <div className="text-xs font-bold text-white/80">{icon.title}</div>
              <div className="text-[10px] text-white/50 mt-1">{icon.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fashion Items Grid */}
      <section className="y2k-shell rounded-[30px] p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="micro-label">Style Database</p>
          <p className="text-sm text-white/60">
            {visibleItems.length} items
            {likedItems.size > 0 && ` • ${likedItems.size} ❤️`}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              className={`chrome-panel rounded-3xl p-5 text-left transition hover:scale-[1.02] ${
                likedItems.has(item.id) ? "border-pink-400/50 bg-pink-500/10" : ""
              } ${selectedItem?.id === item.id ? "border-cyan-300/50 bg-cyan-500/10" : ""}`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-xs text-white/50">{item.year}</span>
                  </div>
                  <h3 className="window-title text-xl text-white">
                    {item.title}
                  </h3>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className={`text-2xl hover:scale-110 transition ${
                    likedItems.has(item.id) ? "animate-bounce" : ""
                  }`}
                >
                  {likedItems.has(item.id) ? "❤️" : "🤍"}
                </button>
              </div>
              <span className="chrome-chip rounded-full px-3 py-1 text-[10px] uppercase inline-block mb-3">
                {item.type}
              </span>
              <p className="text-sm leading-6 text-white/70">
                {item.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                    style={{ width: `${item.popularity}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/60">{item.popularity}%</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Selected Item Details */}
      {selectedItem && (
        <section className="chrome-panel rounded-[30px] p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{selectedItem.emoji}</div>
              <div>
                <p className="micro-label mb-2">Selected Item</p>
                <h2 className="window-title text-3xl text-white">
                  {selectedItem.title}
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  {selectedItem.year} • {selectedItem.type}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-sm hover:bg-white/20 transition"
            >
              ✕ Close
            </button>
          </div>
          <p className="text-base leading-7 text-white/90">
            {selectedItem.description}
          </p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-300">{selectedItem.popularity}%</div>
              <div className="text-xs text-white/60">Popularity</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-cyan-300">{selectedItem.year}</div>
              <div className="text-xs text-white/60">Year</div>
            </div>
          </div>
        </section>
      )}

      {/* Favorites */}
      {likedItems.size > 0 && (
        <section className="chrome-panel rounded-[28px] p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="micro-label">❤️ Избранное</p>
            <button
              onClick={() => setLikedItems(new Set())}
              className="text-xs text-white/60 hover:text-white/90"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(likedItems).map((favId) => {
              const item = fashionItems.find((p) => p.id === favId);
              return item ? (
                <button
                  key={favId}
                  onClick={() => toggleLike(favId)}
                  className="flex items-center gap-2 px-3 py-2 bg-pink-500/20 rounded-full text-sm text-pink-200 hover:bg-pink-500/30 transition"
                >
                  {item.emoji} {item.title}
                </button>
              ) : null;
            })}
          </div>
        </section>
      )}
    </div>
  );
}