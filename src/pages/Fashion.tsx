import { useMemo, useState } from "react";
import y2kImg from "../assets/img/y2k.png";
import phoneImg from "../assets/img/phone.png";
import techImg from "../assets/img/tech.png";

const palettes = {
  chrome: ["#7DF9FF", "#9EAFFF", "#FF7BEA"],
  candy: ["#FFD6F7", "#FF9FE5", "#B594FF"],
  cyber: ["#D6FF60", "#7DF9FF", "#6B7EFF"],
};

const pieces = [
  {
    title: "Metallic top",
    type: "chrome",
    note: "Reflective, bright, almost plastic.",
  },
  {
    title: "Tinted glasses",
    type: "chrome",
    note: "A must-have for the futuristic silhouette.",
  },
  {
    title: "Mini shoulder bag",
    type: "candy",
    note: "Compact, cute and color-heavy.",
  },
  {
    title: "Sport mesh jacket",
    type: "cyber",
    note: "Techwear energy before full techwear.",
  },
  {
    title: "Low-rise denim",
    type: "candy",
    note: "One of the clearest era signifiers.",
  },
  {
    title: "Silver sneakers",
    type: "cyber",
    note: "Athletic shine mixed with sci-fi styling.",
  },
];

export default function Fashion() {
  const [palette, setPalette] = useState<keyof typeof palettes>("chrome");
  const [showOnlyCurrent, setShowOnlyCurrent] = useState(false);

  const visiblePieces = useMemo(() => {
    if (!showOnlyCurrent) return pieces;
    return pieces.filter((item) => item.type === palette);
  }, [palette, showOnlyCurrent]);

  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <div className="chrome-panel rounded-[28px] p-6">
            <p className="micro-label mb-3">fashion sector / chroma scanner</p>
            <h1 className="window-title text-4xl text-white md:text-5xl">
              chrome, candy and <span className="chroma-text">future-girl</span>{" "}
              styling
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              This section now has a clearer design tool feel: palette
              switching, styling cards and a stronger connection between fashion
              and technology.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {(Object.keys(palettes) as Array<keyof typeof palettes>).map(
                (key) => (
                  <button
                    key={key}
                    onClick={() => setPalette(key)}
                    className={`y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] ${
                      palette === key
                        ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                        : "text-white/80"
                    }`}
                  >
                    {key}
                  </button>
                ),
              )}
              <button
                onClick={() => setShowOnlyCurrent((prev) => !prev)}
                className="y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/80"
              >
                current only: {showOnlyCurrent ? "on" : "off"}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {palettes[palette].map((color) => (
                <div
                  key={color}
                  className="chrome-chip flex items-center gap-3 rounded-full px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/82"
                >
                  <span
                    className="h-5 w-5 rounded-full border border-white/30"
                    style={{ background: color }}
                  />
                  {color}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[y2kImg, phoneImg, techImg].map((img, idx) => (
              <img
                loading="lazy"
                key={`${img}-${idx}`}
                src={img}
                alt="fashion archive"
                className={`rounded-[24px] object-cover ${idx === 0 ? "md:col-span-2 h-60" : "h-44"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="y2k-shell rounded-[30px] p-5">
        <p className="micro-label mb-3">style database</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visiblePieces.map((piece) => (
            <article
              key={piece.title}
              className="chrome-panel rounded-[24px] p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="window-title text-2xl text-white">
                  {piece.title}
                </h3>
                <span className="chrome-chip rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/78">
                  {piece.type}
                </span>
              </div>
              <p className="text-sm leading-6 text-white/70">{piece.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
