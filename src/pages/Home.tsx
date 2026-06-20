import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import tvImg from "../assets/img/tv.png";
import webImg from "../assets/img/web.png";
import y2kImg from "../assets/img/y2k.png";
import toysImg from "../assets/img/toys.png";
import "../styles/frutiger-aero.css";

type Sector = {
  id: string;
  titleKey: string;
  year: string;
  image: string;
  noteKey: string;
  statsKeys: string[];
};

type Era = {
  year: string;
  title: string;
  description: string;
  image: string;
  color: string;
};

const eras: Era[] = [
  {
    year: "1999",
    title: "Pre-Y2K Panic",
    description:
      "The millennium is approaching, and the world awaits a computer apocalypse.",
    image: tvImg,
    color: "from-red-500 to-orange-500",
  },
  {
    year: "2002",
    title: "Chrome Era",
    description: "Metallic shades, glossy surfaces and futurism",
    image: y2kImg,
    color: "from-cyan-500 to-blue-500",
  },
  {
    year: "2005",
    title: "Digital Explosion",
    description: "Musical revolutions and web culture at their peak",
    image: webImg,
    color: "from-pink-500 to-purple-500",
  },
  {
    year: "2008",
    title: "Pre-Smartphone Era",
    description: "The last years of the analog-digital hybrid",
    image: toysImg,
    color: "from-green-500 to-teal-500",
  },
];

const funFacts = [
  "DVD outsold VHS by 2000",
  "Napster was shut down in 2001, but it changed the music industry",
  "Britney Spears sold over 100 million records",
  "Windows XP was the most popular OS of the era",
  "Tamagotchi sold over 80 million units",
  "Dial-up internet was used in most households in 2000",
  "Floppy disks were essential for transferring files",
  "MSN Messenger was the dominant chat app of the era",
  "The Nokia 3310 became legendary for its durability",
  "AOL was the largest internet provider",
  "CD players became the home standard",
  "Britney Spears and Christina Aguilera dominated the charts",
  "TLC, Destiny's Child, and the Spice Girls ruled pop music",
  "Nu metal was one of the most popular genres among teenagers",
  "The first iPhone appeared only in 2007",
];

const statsData = [
  { value: "1999-2008", label: "Era", desc: "Decade of Y2K culture" },
  { value: "80%+", label: "Dial-up", desc: "Households connected in 2000" },
  { value: "100M+", label: "Albums", desc: "Sold by Britney Spears" },
  { value: "80M+", label: "Tamagotchi", desc: "Sold worldwide" },
  { value: "56K", label: "Modem", desc: "Maximum internet speed" },
  { value: "24/7", label: "MSN Messenger", desc: "Online communication" },
];

const techTrends = [
  { emoji: "📼", title: "VHS к DVD", year: "2000" },
  { emoji: "💾", title: "Флоппи-диски", year: "1999" },
  { emoji: "💿", title: "CD-R Burner", year: "2001" },
  { emoji: "📱", title: "Nokia 3310", year: "2000" },
  { emoji: "🎮", title: "PS2 Launch", year: "2000" },
  { emoji: "💬", title: "MSN Messenger", year: "1999" },
  { emoji: "🌐", title: "AOL Access", year: "2000" },
  { emoji: "🎵", title: "Napster", year: "1999" },
];

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

  const [activeSector, setActiveSector] = useState<string>(sectors[0].id);
  const [showFacts, setShowFacts] = useState(true);
  const [currentEra, setCurrentEra] = useState(0);
  const [randomFact, setRandomFact] = useState(funFacts[0]);
  const [likedFact, setLikedFact] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  // Auto-rotate era slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEra((prev) => (prev + 1) % eras.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Random fact rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
      setLikedFact(false);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Visitor counter (simulated)
  useEffect(() => {
    const savedCount = localStorage.getItem("y2k-visitor-count");
    const count = savedCount
      ? parseInt(savedCount)
      : Math.floor(Math.random() * 10000) + 5000;
    setVisitorCount(count);
    localStorage.setItem("y2k-visitor-count", (count + 1).toString());

    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const nextEra = () => setCurrentEra((prev) => (prev + 1) % eras.length);
  const prevEra = () =>
    setCurrentEra((prev) => (prev - 1 + eras.length) % eras.length);

  return (
    <div className="space-y-5">
      {/* Era Slider */}

      <section className="y2k-shell rounded-[32px] p-5 md:p-7">
        <div className="chrome-panel rounded-[28px] p-5 md:p-7">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <p className="micro-label mb-3">Welcome to</p>
              <h1 className="window-title max-w-3xl text-4xl leading-tight text-white md:text-6xl">
                {t("home.title")}{" "}
                <span className="chroma-text">{t("home.titleHighlight")}</span>{" "}
                {t("home.titleEnd")}
              </h1>
            </div>
          </div>
          <p className="mt-2 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            {t("home.description")}
          </p>
          <div className="mt-4 flex flex-wrap gap-3"></div>
        </div>
        <div className="grid gap-3 md:grid-cols-3 mt-4">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="chrome-panel rounded-[22px] p-4 hover:scale-105 transition cursor-default"
            >
              <div className="window-title text-2xl md:text-3xl text-white">
                {stat.value}
              </div>
              <div className="micro-label mt-1 text-cyan-200">{stat.label}</div>
              <p className="mt-2 text-xs leading-5 text-white/60">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Fun Fact Section */}
        {showFacts && (
          <div className="chrome-panel rounded-[24px] p-5 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 mt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="micro-label mb-2 text-cyan-200">
                  🎵 {t("home.epochFact")}
                </p>
                <p className="text-base leading-7 text-white/90">
                  {randomFact}
                </p>
              </div>
              <button
                onClick={() => setLikedFact(!likedFact)}
                className={`text-2xl transition ${likedFact ? "animate-bounce" : ""}`}
              >
                {likedFact ? "❤️" : "🤍"}
              </button>
            </div>
            <button
              onClick={() =>
                setRandomFact(
                  funFacts[Math.floor(Math.random() * funFacts.length)],
                )
              }
              className="mt-3 text-xs text-white/60 hover:text-white/90 transition"
            >
              {t("home.nextFact")}
            </button>
          </div>
        )}

        {/* Tech Trends */}
        <div className="chrome-panel rounded-[24px] p-5 mt-4">
          <p className="micro-label mb-3">🚀 {t("home.techTrends")}</p>
          <div className="grid gap-2 grid-cols-4">
            {techTrends.map((trend, idx) => (
              <div
                key={idx}
                className="text-center p-2 rounded-lg hover:bg-white/10 transition cursor-default"
              >
                <div className="text-2xl">{trend.emoji}</div>
                <div className="text-xs text-white/80 mt-1">{trend.title}</div>
                <div className="text-[10px] text-white/50">{trend.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="y2k-shell rounded-[34px] p-5 md:p-7 overflow-hidden">
        <div className="relative">
          <div
            className={`bg-gradient-to-r ${eras[currentEra].color} rounded-[24px] p-6 md:p-8 transition-all duration-500`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={eras[currentEra].image}
                alt={eras[currentEra].title}
                className="w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover shadow-2xl"
              />
              <div className="flex-1 text-center md:text-left">
                <p className="text-4xl font-bold text-white mb-2">
                  {eras[currentEra].year}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-3">
                  {eras[currentEra].title}
                </h2>
                <p className="text-white/80 text-base">
                  {eras[currentEra].description}
                </p>
              </div>
            </div>

            {/* Slider controls */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={prevEra}
                className="px-6 py-3 bg-white/20 rounded-full text-white font-bold hover:bg-white/30 transition"
              >
                ←
              </button>
              <div className="flex gap-2 items-center">
                {eras.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentEra(idx)}
                    className={`w-3 h-3 rounded-full transition ${
                      idx === currentEra ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextEra}
                className="px-6 py-3 bg-white/20 rounded-full text-white font-bold hover:bg-white/30 transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Sector Navigation */}
      <section className="y2k-shell rounded-[30px] p-5">
        <div className="mb-4">
          <p className="micro-label mb-3">Explore Y2K Culture</p>
          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id)}
                className={`y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                  activeSector === sector.id
                    ? "border-cyan-300/50 bg-cyan-300/20 text-cyan-100 scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {t(sector.titleKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sectors.map((sector) => (
            <article
              key={sector.id}
              className={`chrome-panel rounded-[24px] p-5 transition-all duration-300 cursor-pointer ${
                activeSector === sector.id
                  ? "border-cyan-300/50 bg-cyan-500/10 scale-[1.02] shadow-lg shadow-cyan-500/20"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
              onClick={() => setActiveSector(sector.id)}
            >
              <img
                loading="lazy"
                src={sector.image}
                alt={t(sector.titleKey)}
                className="h-36 w-full rounded-[20px] object-cover"
              />
              <div className="mt-4">
                <p className="micro-label mb-1">{sector.year}</p>
                <h3 className="window-title text-xl text-white">
                  {t(sector.titleKey)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {t(sector.noteKey)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Actions - Frutiger Aero Style */}
    </div>
  );
}
