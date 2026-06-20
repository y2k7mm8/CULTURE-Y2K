import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AestheticGallery from "../components/ui/AestheticGallery";

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
    description:
      "Shimmering metallic tops with sequins and glitter — a signature Y2K fashion statement",
    emoji: "👕",
    year: 2002,
    popularity: 95,
  },
  {
    id: "p2",
    title: "Chanel Sunglasses",
    type: "chrome",
    description:
      "Oversized Chanel sunglasses — one of the defining accessories of the 2000s",
    emoji: "🕶️",
    year: 2001,
    popularity: 90,
  },
  {
    id: "p3",
    title: "Mini Handbags",
    type: "candy",
    description:
      "Tiny handbags decorated with logos and rhinestones — a must-have accessory",
    emoji: "👜",
    year: 2003,
    popularity: 88,
  },
  {
    id: "p4",
    title: "Velour Tracksuits",
    type: "cyber",
    description: "Velour tracksuits inspired by Juicy Couture's iconic designs",
    emoji: "🧥",
    year: 2004,
    popularity: 92,
  },
  {
    id: "p5",
    title: "Low-Rise Jeans",
    type: "candy",
    description: "Low-rise jeans — a defining staple of Y2K fashion",
    emoji: "👖",
    year: 2001,
    popularity: 98,
  },
  {
    id: "p6",
    title: "Platform Sneakers",
    type: "cyber",
    description: "Platform sneakers that added both height and style",
    emoji: "👟",
    year: 2002,
    popularity: 85,
  },
  {
    id: "p7",
    title: "Neon Bracelets",
    type: "cyber",
    description: "Glow-in-the-dark bracelets popular at clubs and parties",
    emoji: "⌚",
    year: 2003,
    popularity: 80,
  },
  {
    id: "p8",
    title: "Crystal Clips",
    type: "chrome",
    description: "Hair clips decorated with sparkling Swarovski crystals",
    emoji: "✨",
    year: 2002,
    popularity: 87,
  },
  {
    id: "p9",
    title: "Baby Tees",
    type: "candy",
    description:
      "Fitted T-shirts featuring slogans, logos, and colorful prints",
    emoji: "👚",
    year: 2000,
    popularity: 94,
  },
  {
    id: "p10",
    title: "Butterfly Clips",
    type: "chrome",
    description:
      "Butterfly-shaped hair clips that became an iconic Y2K accessory",
    emoji: "🦋",
    year: 2001,
    popularity: 89,
  },
];

const fashionTips = [
  "Pair metallic tops with sheer skirts for an authentic Y2K look",
  "Crystal-studded hairbrushes were a popular 2000s accessory",
  "Platform sneakers add both height and style",
  "Glitter manicure kits were a must-have of the era",
  "Logo belts were considered a symbol of status",
  "Belt bags decorated with rhinestones and chains were trendy",
  "Fitted graphic T-shirts were a wardrobe essential",
  "Oversized sunglasses were a fashion staple",
  "Velour tracksuits were perfect for casual wear",
  "Low-rise jeans were a defining Y2K classic",
];
const icons = [
  { emoji: "💅", title: "Glitter Nails", desc: "Sparkly glitter manicure" },
  { emoji: "💍", title: "Rings", desc: "Multiple rings worn on the fingers" },
  {
    emoji: "👑",
    title: "Hair Accessories",
    desc: "Hair clips, headbands, and decorative accessories",
  },
  {
    emoji: "🌟",
    title: "Body Glitter",
    desc: "Shimmering glitter for the body",
  },
];

export default function Fashion() {
  const { t } = useTranslation();

  const [palette, setPalette] = useState<keyof typeof palettes>("chrome");
  const [showOnlyCurrent, setShowOnlyCurrent] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<FashionItem | null>(null);
  const [filterType, setFilterType] = useState<
    "all" | "chrome" | "candy" | "cyber"
  >("all");

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

  const avgPopularity =
    fashionItems.reduce((sum, item) => sum + item.popularity, 0) /
    fashionItems.length;
  const topItems = fashionItems.filter((item) => item.popularity >= 90);

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="grid gap-5">
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
                  filterType === "all"
                    ? "border-cyan-300/50 bg-cyan-300/20"
                    : "text-white/70"
                }`}
              >
                All Types
              </button>
              {(Object.keys(palettes) as Array<keyof typeof palettes>).map(
                (key) => (
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
                ),
              )}
              <button
                onClick={() => setShowOnlyCurrent((prev) => !prev)}
                className={`y2k-button rounded-full px-3 py-2 text-[11px] uppercase ${
                  showOnlyCurrent
                    ? "border-pink-300/50 bg-pink-300/20"
                    : "text-white/70"
                }`}
              >
                {showOnlyCurrent
                  ? t("fashion.selectedOnly")
                  : t("fashion.showAll")}
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
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-3 md:grid-cols-3">
        <div className="chrome-panel rounded-[22px] p-4 text-center">
          <div className="text-3xl font-bold text-cyan-300">
            {fashionItems.length}
          </div>
          <div className="text-xs text-white/60 mt-1">Fashion Items</div>
        </div>
        <div className="chrome-panel rounded-[22px] p-4 text-center">
          <div className="text-3xl font-bold text-pink-300">
            {Math.round(avgPopularity)}%
          </div>
          <div className="text-xs text-white/60 mt-1">Avg Popularity</div>
        </div>
        <div className="chrome-panel rounded-[22px] p-4 text-center">
          <div className="text-3xl font-bold text-purple-300">
            {topItems.length}
          </div>
          <div className="text-xs text-white/60 mt-1">Top Items (90%+)</div>
        </div>
      </section>

      {/* Accessories Icons */}
      <section className="chrome-panel rounded-[24px] p-5">
        <p className="micro-label mb-4">{t("fashion.accessories")}</p>
        <div className="grid gap-3 grid-cols-4">
          {icons.map((icon, idx) => (
            <div
              key={idx}
              className="text-center p-3 rounded-xl hover:bg-white/10 transition cursor-default"
            >
              <div className="text-3xl mb-2">{icon.emoji}</div>
              <div className="text-xs font-bold text-white/80">
                {icon.title}
              </div>
              <div className="text-[10px] text-white/50 mt-1">{icon.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fashion Items Grid */}
      <section className="y2k-shell rounded-[30px] p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="micro-label">{t("fashion.styleDatabase")}</p>
          <p className="text-sm text-white/60">
            {visibleItems.length} items
            {likedItems.size > 0 && ` • ${likedItems.size} ❤️`}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setSelectedItem(selectedItem?.id === item.id ? null : item)
              }
              className={`chrome-panel rounded-3xl p-5 text-left transition hover:scale-[1.02] ${
                likedItems.has(item.id)
                  ? "border-pink-400/50 bg-pink-500/10"
                  : ""
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
                <span className="text-[10px] text-white/60">
                  {item.popularity}%
                </span>
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
                <p className="micro-label mb-2">{t("about.selectedItem")}</p>
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
              <div className="text-2xl font-bold text-pink-300">
                {selectedItem.popularity}%
              </div>
              <div className="text-xs text-white/60">Popularity</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-cyan-300">
                {selectedItem.year}
              </div>
              <div className="text-xs text-white/60">Year</div>
            </div>
          </div>
        </section>
      )}

      {/* Favorites */}
      {likedItems.size > 0 && (
        <section className="chrome-panel rounded-[28px] p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="micro-label">❤️ Better</p>
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

      {/* Aesthetic Gallery Section */}
      <section className="y2k-shell rounded-[30px] p-5">
        <p className="micro-label mb-4">
          ✨ {t("fashion.aesthetic") || "Y2K Aesthetic"}
        </p>
        <AestheticGallery />
      </section>
    </div>
  );
}
