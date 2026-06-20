import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import AestheticGallery from "../components/ui/AestheticGallery";

const features = [
  {
    title: "featureMultilingual",
    desc: "featureMultilingualDesc",
    icon: "🌍",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "featureGames",
    desc: "featureGamesDesc",
    icon: "🎮",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "featurePlayer",
    desc: "featurePlayerDesc",
    icon: "🎵",
    color: "from-pink-500 to-red-500",
  },
  {
    title: "featureChat",
    desc: "featureChatDesc",
    icon: "💬",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "featureCRT",
    description: "featureCRTDesc",
    icon: "📺",
    color: "from-lime-500 to-green-500",
  },
  {
    title: "featureEasterEggs",
    desc: "featureEasterEggsDesc",
    icon: "🥚",
    color: "from-indigo-500 to-purple-500",
  },
];
const y2kFacts = [
  "Y2K aesthetics are defined by neon colors, metallic textures, glass effects, and futuristic design",
  "Britney Spears, Christina Aguilera, and the Spice Girls were the pop icons of the era",
  "Nu Metal (Linkin Park, Limp Bizkit) was extremely popular in the early 2000s",
  '3.5" floppy disks were a primary data storage medium',
  "56K dial-up modems were the standard internet connection method",
  "MSN Messenger and AIM were the main instant messaging platforms",
  "GeoCities and Angelfire were popular web hosting services",
  "Flash animations were everywhere across websites",
  "CD-R discs allowed users to burn music and data at home",
  "Tamagotchi, Furby, and Nintendo Game Boy were iconic toys of the era",
];
const timeline = [
  {
    year: 1999,
    event: "Pre-Y2K panic — fear of a global computer crash",
    icon: "😱",
  },
  {
    year: 2000,
    event: "The Y2K culture decade officially begins",
    icon: "🎉",
  },
  {
    year: 2001,
    event: "iTunes launches, transforming the music industry",
    icon: "🎵",
  },
  {
    year: 2002,
    event: "Chrome-era aesthetics — metallic and glossy design trends dominate",
    icon: "✨",
  },
  {
    year: 2003,
    event: "MySpace becomes one of the first major social networks",
    icon: "🌐",
  },
  {
    year: 2004,
    event: "Facebook launches in universities",
    icon: "📘",
  },
  {
    year: 2005,
    event: "YouTube is created — a video revolution begins",
    icon: "📹",
  },
  {
    year: 2007,
    event: "The first iPhone launches — the smartphone era begins",
    icon: "📱",
  },
  {
    year: 2008,
    event: "The end of the classic Y2K era",
    icon: "👋",
  },
];

export default function About() {
  const { t } = useTranslation();

  const [currentFact, setCurrentFact] = useState(0);
  const [likedFacts, setLikedFacts] = useState<Set<number>>(new Set());
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [projectStarted, setProjectStarted] = useState("");

  useEffect(() => {
    const savedDate = localStorage.getItem("y2k-project-started");
    if (!savedDate) {
      const now = new Date().toLocaleDateString("ru-RU");
      localStorage.setItem("y2k-project-started", now);
      setProjectStarted(now);
    } else {
      setProjectStarted(savedDate);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % y2kFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (index: number) => {
    const newLiked = new Set(likedFacts);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedFacts(newLiked);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="y2k-shell rounded-[32px] p-6">
        <p className="micro-label mb-3">{t("about.label")}</p>
        <h1 className="window-title text-4xl text-white md:text-5xl">
          {t("about.title")}{" "}
          <span className="chroma-text">{t("about.titleHighlight")}</span>
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/72">
          {t("about.description")}
        </p>
      </section>

      {/* Y2K Fact */}
      <section className="chrome-panel rounded-[24px] p-5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="micro-label mb-2 text-cyan-200">
              🎨 {t("about.epochFact")}
            </p>
            <p className="text-base leading-7 text-white/90">
              {y2kFacts[currentFact]}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleLike(currentFact)}
              className={`text-2xl transition ${likedFacts.has(currentFact) ? "animate-bounce" : ""}`}
            >
              {likedFacts.has(currentFact) ? "❤️" : "🤍"}
            </button>
            <button
              onClick={() =>
                setCurrentFact((prev) => (prev + 1) % y2kFacts.length)
              }
              className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 hover:bg-white/20 transition"
            >
              {t("about.nextFact")}
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-1">
          {y2kFacts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentFact(idx)}
              className={`h-1 rounded-full transition ${
                idx === currentFact ? "w-6 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      {/* <section className="y2k-shell rounded-[30px] p-5">
        <p className="micro-label mb-4">Features & Capabilities</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedFeature(selectedFeature === index ? null : index)
              }
              className={`chrome-panel rounded-[24px] p-5 text-left transition ${
                selectedFeature === index
                  ? "border-cyan-300/50 bg-cyan-500/10 scale-105"
                  : "hover:scale-105"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`text-4xl ${selectedFeature === index ? "animate-bounce" : ""}`}
                >
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="window-title text-xl text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-6 text-white/70">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section> */}

      {/* Timeline */}
      <section className="y2k-shell rounded-[30px] p-5">
        <p className="micro-label mb-4">{t("about.timeline")}</p>
        <div className="space-y-3">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition cursor-default"
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="window-title text-lg text-white">
                    {item.year}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/70">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fun Stats */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            value: t("about.stats.s1"),
            label: t("about.stats.s1label"),
            desc: t("about.stats.s1desc"),
          },
          {
            value: t("about.stats.s2"),
            label: t("about.stats.s2label"),
            desc: t("about.stats.s2desc"),
          },
          {
            value: t("about.stats.s3"),
            label: t("about.stats.s3label"),
            desc: t("about.stats.s3desc"),
          },
          {
            value: t("about.stats.s4"),
            label: t("about.stats.s4label"),
            desc: t("about.stats.s4desc"),
          },
        ].map((stat, idx) => (
          <article
            key={idx}
            className="chrome-panel rounded-[24px] p-5 text-center hover:scale-105 transition"
          >
            <div className="window-title text-3xl text-cyan-300">
              {stat.value}
            </div>
            <div className="micro-label mt-2">{stat.label}</div>
            <p className="mt-2 text-xs text-white/60">{stat.desc}</p>
          </article>
        ))}
      </section>

      {/* Aesthetic Gallery */}
      <section className="y2k-shell rounded-[30px] p-5">
        <p className="micro-label mb-4">✨ Y2K Aesthetic Collection</p>
        <AestheticGallery />
      </section>

      {/* Credits */}
      {/* <section className="chrome-panel rounded-[28px] p-6">
        <p className="micro-label mb-3">📝 {t("about.credits")}</p>
        <div className="text-white/80 space-y-2">
          <p>
            <span className="font-bold text-cyan-200">Frontend:</span> React 19
            + TypeScript + Vite + Tailwind CSS
          </p>
          <p>
            <span className="font-bold text-pink-200">Styling:</span> Tailwind
            CSS 4 + Custom Y2K Classes
          </p>
          <p>
            <span className="font-bold text-purple-200">i18n:</span>{" "}
            react-i18next for multi-language support
          </p>
          <p>
            <span className="font-bold text-yellow-200">Storage:</span>{" "}
            localStorage for persistent data
          </p>
          <p>
            <span className="font-bold text-lime-200">Animations:</span> CSS
            animations + Framer Motion effects
          </p>
        </div>
      </section> */}
    </div>
  );
}
