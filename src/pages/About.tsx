import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Многоязычность",
    desc: "Полная поддержка английского, испанского и русского языков с мгновенным переключением",
    icon: "🌍",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Интерактивные игры",
    desc: "Snake и Memory игры с сохранением рекордов в localStorage",
    icon: "🎮",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Музыкальный плеер",
    desc: "Полнофункциональный Winamp-стиль плеер с визуализацией и плейлистом",
    icon: "🎵",
    color: "from-pink-500 to-red-500",
  },
  {
    title: "AIM-чат",
    desc: "Стилизованный под AOL Instant Messenger чат с друзьями",
    icon: "💬",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "CRT Эффект",
    description: "Настоящий эффект старого ЭЛТ монитора с линиями и мерцанием",
    icon: "📺",
    color: "from-lime-500 to-green-500",
  },
  {
    title: "Easter Eggs",
    desc: "Секретные фишки: Matrix Rain, BSOD, Dial-up звуки и You've Got Mail",
    icon: "🥚",
    color: "from-indigo-500 to-purple-500",
  },
];

const y2kFacts = [
  "Y2K эстетика - это неон, металлик, стекло и футуризм",
  "Бритни Spears, Кристина Агилера и Spice Girls - поп-иконы эпохи",
  "Nu Metal (Linkin Park, Limp Bizkit) был очень популярен",
  "Флоппи-диски 3.5\" были основным носителем информации",
  "Dial-up модемы 56K были стандартом интернет-соединения",
  "MSN Messenger и AIM были главными мессенджерами",
  "GeoCities и Angelfire были популярными хостингами",
  "Flash анимации были повсюду на веб-сайтах",
  "CD-R диски позволяли записывать музыку и данные",
  "Tamagotchi, Furby и Nintendo GameBoy - культовые игрушки",
];

const timeline = [
  { year: 1999, event: "Pre-Y2K Panic - страх перед компьютерным апокалипсисом", icon: "😱" },
  { year: 2000, event: "Десятилетие Y2K культуры официально начинается", icon: "🎉" },
  { year: 2001, event: "iTunes запущен, меняет музыкальную индустрию", icon: "🎵" },
  { year: 2002, event: "Chrome Era - металлик и глянец в моде", icon: "✨" },
  { year: 2003, event: "MySpace становится первой социальной сетью", icon: "🌐" },
  { year: 2004, event: "Facebook запускается в университетах", icon: "📘" },
  { year: 2005, event: "YouTube создан - революция в видео", icon: "📹" },
  { year: 2007, event: "Первый iPhone - начало эпохи смартфонов", icon: "📱" },
  { year: 2008, event: "Конец классической Y2K эпохи", icon: "👋" },
];

export default function About() {
  const { t } = useTranslation();

  const [currentFact, setCurrentFact] = useState(0);
  const [likedFacts, setLikedFacts] = useState<Set<number>>(new Set());
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [projectStarted, setProjectStarted] = useState("");

  useEffect(() => {
    const savedDate = localStorage.getItem('y2k-project-started');
    if (!savedDate) {
      const now = new Date().toLocaleDateString('ru-RU');
      localStorage.setItem('y2k-project-started', now);
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

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full border border-white/10">
            <span className="text-xs text-white/60">Проект начат: </span>
            <span className="text-sm font-bold text-cyan-200">{projectStarted}</span>
          </div>
          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-xs text-white/60">Технологии: </span>
            <span className="text-sm font-bold text-white">React 19 • TypeScript • Vite</span>
          </div>
        </div>
      </section>

      {/* Y2K Fact */}
      <section className="chrome-panel rounded-[24px] p-5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="micro-label mb-2 text-cyan-200">🎨 Факт эпохи</p>
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
              onClick={() => setCurrentFact((prev) => (prev + 1) % y2kFacts.length)}
              className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 hover:bg-white/20 transition"
            >
              Next →
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
      <section className="y2k-shell rounded-[30px] p-5">
        <p className="micro-label mb-4">Features & Capabilities</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
              className={`chrome-panel rounded-[24px] p-5 text-left transition ${
                selectedFeature === index ? "border-cyan-300/50 bg-cyan-500/10 scale-105" : "hover:scale-105"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-4xl ${selectedFeature === index ? "animate-bounce" : ""}`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="window-title text-xl text-white mb-2">{feature.title}</h3>
                  <p className="text-sm leading-6 text-white/70">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="y2k-shell rounded-[30px] p-5">
        <p className="micro-label mb-4">Y2K Timeline</p>
        <div className="space-y-3">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition cursor-default"
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="window-title text-lg text-white">{item.year}</span>
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
          { value: "6+", label: "Секретных фишек", desc: "Easter Eggs для поиска" },
          { value: "3", label: "Игры", desc: "Snake, Memory и будущее" },
          { value: "3", label: "Языка", desc: "English, Español, Русский" },
          { value: "∞", label: "Ностальгия", desc: "Y2K aesthetic forever" },
        ].map((stat, idx) => (
          <article key={idx} className="chrome-panel rounded-[24px] p-5 text-center hover:scale-105 transition">
            <div className="window-title text-3xl text-cyan-300">{stat.value}</div>
            <div className="micro-label mt-2">{stat.label}</div>
            <p className="mt-2 text-xs text-white/60">{stat.desc}</p>
          </article>
        ))}
      </section>

      {/* Credits */}
      <section className="chrome-panel rounded-[28px] p-6">
        <p className="micro-label mb-3">📝 Credits</p>
        <div className="text-white/80 space-y-2">
          <p><span className="font-bold text-cyan-200">Frontend:</span> React 19 + TypeScript + Vite + Tailwind CSS</p>
          <p><span className="font-bold text-pink-200">Styling:</span> Tailwind CSS 4 + Custom Y2K Classes</p>
          <p><span className="font-bold text-purple-200">i18n:</span> react-i18next for multi-language support</p>
          <p><span className="font-bold text-yellow-200">Storage:</span> localStorage for persistent data</p>
          <p><span className="font-bold text-lime-200">Animations:</span> CSS animations + Framer Motion effects</p>
        </div>
      </section>
    </div>
  );
}