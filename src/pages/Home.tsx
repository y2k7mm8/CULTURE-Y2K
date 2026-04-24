import { useMemo, useState } from "react";
import tvImg from "../assets/img/tv.png";
import webImg from "../assets/img/web.png";
import y2kImg from "../assets/img/y2k.png";
import techImg from "../assets/img/tech.png";
import phoneImg from "../assets/img/phone.png";
import toysImg from "../assets/img/toys.png";

type Sector = {
  id: string;
  title: string;
  year: string;
  image: string;
  note: string;
  stats: string[];
};

const sectors: Sector[] = [
  {
    id: "music",
    title: "Music + players",
    year: "2000—2008",
    image: tvImg,
    note: "CD cases, glossy videos, MP3 players and loud visual identities.",
    stats: ["cd-r era", "visual stars", "club energy"],
  },
  {
    id: "internet",
    title: "Internet scenes",
    year: "1999—2009",
    image: webImg,
    note: "Guestbooks, tiny buttons, fan shrines, portal chaos and browser toys.",
    stats: ["webrings", "flash portals", "status badges"],
  },
  {
    id: "fashion",
    title: "Chroma fashion",
    year: "2001—2007",
    image: y2kImg,
    note: "Metallic pink, sporty shades, translucent plastic and futuristic styling.",
    stats: ["chrome shine", "baby tees", "tech glamour"],
  },
  {
    id: "games",
    title: "Games + toys",
    year: "1998—2009",
    image: toysImg,
    note: "Pocket pets, preloaders, browser loops and collectible digital moods.",
    stats: ["micro fun", "high scores", "pixel memories"],
  },
];

const highlights = [
  "chrome gradients",
  "interactive panels",
  "archive moodboard",
  "custom sector filters",
  "futuristic y2k navigation",
  "glow-based ui system",
];

export default function Home() {
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
              <p className="micro-label mb-3">
                home sector / upgraded structure
              </p>
              <h1 className="window-title max-w-3xl text-4xl leading-tight text-white md:text-6xl">
                a <span className="chroma-text">Y2K chroma</span> archive with
                more energy, more depth and more interaction
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                I reworked the site direction toward a stronger chrome-glass
                look: clearer sectors, futuristic controls, modular cards and a
                more consistent archive mood.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setPowerMode((prev) => !prev)}
                  className="y2k-button rounded-full px-5 py-3 text-xs uppercase tracking-[0.26em] text-white"
                >
                  glow mode: {powerMode ? "high" : "soft"}
                </button>
                <button
                  onClick={() => setShowFacts((prev) => !prev)}
                  className="y2k-button rounded-full px-5 py-3 text-xs uppercase tracking-[0.26em] text-white"
                >
                  info cards: {showFacts ? "visible" : "hidden"}
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                [
                  "06",
                  "sectors",
                  "home / music / fashion / games / internet / about",
                ],
                [
                  "12+",
                  "interactions",
                  "toggles, randomizer, filters, quiz, player, search",
                ],
                [
                  "24/7",
                  "visual mood",
                  "chrome gradients, scanlines and neon accents",
                ],
              ].map(([value, label, text]) => (
                <div key={label} className="chrome-panel rounded-[24px] p-4">
                  <div className="window-title text-3xl text-white">
                    {value}
                  </div>
                  <div className="micro-label mt-2">{label}</div>
                  <p className="mt-3 text-sm leading-6 text-white/68">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="chrome-panel rounded-[30px] p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="micro-label mb-2">live preview</p>
                <h2 className="window-title text-2xl text-white">
                  selected sector
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
                alt={selected.title}
                className="h-72 w-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-3">
              <div className="text-sm uppercase tracking-[0.28em] text-cyan-200">
                {selected.year}
              </div>
              <div className="window-title text-2xl text-white">
                {selected.title}
              </div>
              <p className="text-sm leading-6 text-white/70">{selected.note}</p>
              <div className="flex flex-wrap gap-2">
                {selected.stats.map((item) => (
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
                {sector.title}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {sectors.map((sector) => (
              <article
                key={sector.id}
                className={`chrome-panel rounded-[24px] p-4 transition ${
                  activeSector === sector.id ? "border-cyan-300/45" : ""
                }`}
              >
                <img
                  loading="lazy"
                  src={sector.image}
                  alt={sector.title}
                  className="h-42 w-full rounded-[20px] object-cover"
                />
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="micro-label mb-1">{sector.year}</p>
                    <h3 className="window-title text-xl text-white">
                      {sector.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveSector(sector.id)}
                    className="y2k-button rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/90"
                  >
                    open
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  {sector.note}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="y2k-shell rounded-[30px] p-5">
          <p className="micro-label mb-3">new functionality map</p>
          <h2 className="window-title text-3xl text-white">what changed</h2>
          <div className="mt-5 grid gap-3">
            {highlights.map((item, index) => (
              <div
                key={item}
                className="chrome-panel flex items-center gap-4 rounded-[22px] p-4"
              >
                <div className="window-title text-2xl text-cyan-200">
                  0{index + 1}
                </div>
                <div className="text-sm uppercase tracking-[0.2em] text-white/82">
                  {item}
                </div>
              </div>
            ))}
          </div>

          {showFacts && (
            <div className="chrome-panel mt-5 rounded-[24px] p-5">
              <p className="micro-label mb-2">extra notes</p>
              <div className="grid gap-3 md:grid-cols-2">
                {[techImg, phoneImg].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Y2K detail"
                    className="h-40 w-full rounded-[18px] object-cover"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-white/70">
                The structure is now more modular, so each section can keep its
                own special UI while still feeling like one project.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
