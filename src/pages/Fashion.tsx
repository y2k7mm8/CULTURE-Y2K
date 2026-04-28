import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import y2kImg from "../assets/img/y2k.png";
import phoneImg from "../assets/img/phone.png";
import techImg from "../assets/img/tech.png";

const palettes = {
  chrome: ["#7DF9FF", "#9EAFFF", "#FF7BEA"],
  candy: ["#FFD6F7", "#FF9FE5", "#B594FF"],
  cyber: ["#D6FF60", "#7DF9FF", "#6B7EFF"],
};

interface Piece {
  id: string;
  titleKey: string;
  type: keyof typeof palettes;
  noteKey: string;
}

export default function Fashion() {
  const { t } = useTranslation();

  const pieces: Piece[] = [
    {
      id: "p1",
      titleKey: "fashion.pieces.p1",
      type: "chrome",
      noteKey: "fashion.pieces.p1note",
    },
    {
      id: "p2",
      titleKey: "fashion.pieces.p2",
      type: "chrome",
      noteKey: "fashion.pieces.p2note",
    },
    {
      id: "p3",
      titleKey: "fashion.pieces.p3",
      type: "candy",
      noteKey: "fashion.pieces.p3note",
    },
    {
      id: "p4",
      titleKey: "fashion.pieces.p4",
      type: "cyber",
      noteKey: "fashion.pieces.p4note",
    },
    {
      id: "p5",
      titleKey: "fashion.pieces.p5",
      type: "candy",
      noteKey: "fashion.pieces.p5note",
    },
    {
      id: "p6",
      titleKey: "fashion.pieces.p6",
      type: "cyber",
      noteKey: "fashion.pieces.p6note",
    },
  ];

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
            <p className="micro-label mb-3">{t("fashion.label")}</p>
            <h1 className="window-title text-4xl text-white md:text-5xl">
              {t("fashion.title")}{" "}
              <span className="chroma-text">{t("fashion.titleHighlight")}</span>{" "}
              {t("fashion.titleEnd")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              {t("fashion.description")}
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
                    {t(`fashion.palettes.${key}`)}
                  </button>
                ),
              )}
              <button
                onClick={() => setShowOnlyCurrent((prev) => !prev)}
                className="y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/80"
              >
                current only: {showOnlyCurrent ? t("games.on") : t("games.off")}
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
            <article key={piece.id} className="chrome-panel rounded-[24px] p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="window-title text-2xl text-white">
                  {t(piece.titleKey)}
                </h3>
                <span className="chrome-chip rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/78">
                  {t(`fashion.palettes.${piece.type}`)}
                </span>
              </div>
              <p className="text-sm leading-6 text-white/70">
                {t(piece.noteKey)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
