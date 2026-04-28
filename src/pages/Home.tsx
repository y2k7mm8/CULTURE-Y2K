import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import tvImg from "../assets/img/tv.png";
import webImg from "../assets/img/web.png";
import y2kImg from "../assets/img/y2k.png";
import toysImg from "../assets/img/toys.png";

type Sector = {
  id: string;
  titleKey: string;
  year: string;
  image: string;
  noteKey: string;
  statsKeys: string[];
};

export default function Home() {
  const { t } = useTranslation();

  const sectors: Sector[] = [
    {
      id: "music",
      titleKey: "home.sectors.music.title",
      year: t("home.sectors.music.year"),
      image: tvImg,
      noteKey: "home.sectors.music.note",
      statsKeys: ["cd-r era", "visual stars", "club energy"],
    },
    {
      id: "internet",
      titleKey: "home.sectors.internet.title",
      year: t("home.sectors.internet.year"),
      image: webImg,
      noteKey: "home.sectors.internet.note",
      statsKeys: ["webrings", "flash portals", "status badges"],
    },
    {
      id: "fashion",
      titleKey: "home.sectors.fashion.title",
      year: t("home.sectors.fashion.year"),
      image: y2kImg,
      noteKey: "home.sectors.fashion.note",
      statsKeys: ["chrome shine", "baby tees", "tech glamour"],
    },
    {
      id: "games",
      titleKey: "home.sectors.games.title",
      year: t("home.sectors.games.year"),
      image: toysImg,
      noteKey: "home.sectors.games.note",
      statsKeys: ["micro fun", "high scores", "pixel memories"],
    },
  ];

  const highlights = [
    t("home.highlights.h1"),
    t("home.highlights.h2"),
    t("home.highlights.h3"),
    t("home.highlights.h4"),
    t("home.highlights.h5"),
    t("home.highlights.h6"),
  ];

  const [activeSector, setActiveSector] = useState<string>(sectors[0].id);
  const [powerMode, setPowerMode] = useState(true);
  const [showFacts, setShowFacts] = useState(true);

  const selected = useMemo(
    () => sectors.find((sector) => sector.id === activeSector) ?? sectors[0],
    [activeSector],
  );

  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[34px] p-5 md:p-7">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="chrome-panel rounded-[28px] p-5 md:p-7">
              <p className="micro-label mb-3">{t("home.label")}</p>
              <h1 className="window-title max-w-3xl text-4xl leading-tight text-white md:text-6xl">
                {t("home.title")}{" "}
                <span className="chroma-text">{t("home.titleHighlight")}</span>{" "}
                {t("home.titleEnd")}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                {t("home.description")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setPowerMode((prev) => !prev)}
                  className="y2k-button rounded-full px-5 py-3 text-xs uppercase tracking-[0.26em] text-white"
                >
                  {t("home.glowMode", {
                    mode: powerMode
                      ? t("home.glowModeHigh")
                      : t("home.glowModeSoft"),
                  })}
                </button>
                <button
                  onClick={() => setShowFacts((prev) => !prev)}
                  className="y2k-button rounded-full px-5 py-3 text-xs uppercase tracking-[0.26em] text-white"
                >
                  {t("home.infoCards", {
                    visibility: showFacts
                      ? t("home.infoCardsVisible")
                      : t("home.infoCardsHidden"),
                  })}
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["06", "title1", "desc1"],
                ["12+", "title2", "desc2"],
                ["24/7", "title3", "desc3"],
              ].map(([value, titleKey, descKey]) => (
                <div key={titleKey} className="chrome-panel rounded-[24px] p-5">
                  <div className="window-title text-3xl text-white">
                    {value}
                  </div>
                  <div className="micro-label mt-2">
                    {t(`home.stats.${titleKey}`)}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/68">
                    {t(`home.stats.${descKey}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="chrome-panel rounded-[30px] p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="micro-label mb-2">{t("home.livePreview")}</p>
                <h2 className="window-title text-2xl text-white">
                  {t("home.selectedSector")}
                </h2>
              </div>
              <div className="flex gap-2">
                <span className="glow-dot h-3 w-3 rounded-full bg-cyan-300 text-cyan-300" />
                <span className="glow-dot h-3 w-3 rounded-full bg-pink-300 text-pink-300" />
                <span className="glow-dot h-3 w-3 rounded-full bg-lime-200 text-lime-200" />
              </div>
            </div>

            <div
              className={`overflow-hidden rounded-[24px] ${powerMode ? "soft-pulse" : ""}`}
            >
              <img
                loading="lazy"
                src={selected.image}
                alt={t(selected.titleKey)}
                className="h-72 w-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-3">
              <div className="text-sm uppercase tracking-[0.28em] text-cyan-200">
                {selected.year}
              </div>
              <div className="window-title text-2xl text-white">
                {t(selected.titleKey)}
              </div>
              <p className="text-sm leading-6 text-white/70">
                {t(selected.noteKey)}
              </p>
              <div className="flex flex-wrap gap-2">
                {selected.statsKeys.map((item) => (
                  <span
                    key={item}
                    className="chrome-chip rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <div className="y2k-shell rounded-[30px] p-5">
          <div className="mb-4 flex flex-wrap gap-3">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id)}
                className={`y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] ${
                  activeSector === sector.id
                    ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                    : "text-white/78"
                }`}
              >
                {t(sector.titleKey)}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {sectors.map((sector) => (
              <article
                key={sector.id}
                className={`chrome-panel rounded-[24px] p-5 transition ${
                  activeSector === sector.id ? "border-cyan-300/45" : ""
                }`}
              >
                <img
                  loading="lazy"
                  src={sector.image}
                  alt={t(sector.titleKey)}
                  className="h-42 w-full rounded-[20px] object-cover"
                />
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="micro-label mb-1">{sector.year}</p>
                    <h3 className="window-title text-xl text-white">
                      {t(sector.titleKey)}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveSector(sector.id)}
                    className="y2k-button rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/90"
                  >
                    {t("common.open")}
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  {t(sector.noteKey)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="y2k-shell rounded-[30px] p-5">
          <p className="micro-label mb-3">{t("home.newFunctionality")}</p>
          <h2 className="window-title text-3xl text-white">
            {t("home.whatChanged")}
          </h2>
          <div className="mt-5 grid gap-3">
            {highlights.map((item, index) => (
              <div
                key={item}
                className="chrome-panel flex items-center gap-4 rounded-[22px] p-5"
              >
                <div className="window-title text-2xl text-cyan-200">
                  0{index + 1}
                </div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/82">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
