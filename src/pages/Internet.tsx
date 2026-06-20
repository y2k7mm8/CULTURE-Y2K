import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Website {
  id: string;
  titleKey: string;
  url: string;
  status: "online" | "broken" | "slow";
  type: string;
  category: string;
  hits: number;
  year: number;
  description: string;
  popular?: boolean;
}

const websites: Website[] = [
  {
    id: "w1",
    titleKey: "internet.nodes.n1",
    url: "geocities.com/y2k-zone",
    status: "online",
    type: "Fan Site",
    category: "entertainment",
    hits: 15000,
    year: 1999,
    description:
      "Y2K fan website featuring graphics, GIFs, and web design resources",
    popular: true,
  },
  {
    id: "w2",
    titleKey: "internet.nodes.n2",
    url: "msn.com",
    status: "online",
    type: "Social",
    category: "social",
    hits: 500000,
    year: 2000,
    description: "MSN Messenger — the leading chat platform of the era",
    popular: true,
  },
  {
    id: "w3",
    titleKey: "internet.nodes.n3",
    url: "napster.com",
    status: "broken",
    type: "Music",
    category: "entertainment",
    hits: 800000,
    year: 1999,
    description:
      "The P2P music-sharing service that transformed the music industry",
    popular: true,
  },
  {
    id: "w4",
    titleKey: "internet.nodes.n4",
    url: "flashkit.com",
    status: "online",
    type: "Resources",
    category: "tech",
    hits: 25000,
    year: 2000,
    description: "A library of Flash animations, sounds, and effects",
  },
  {
    id: "w5",
    titleKey: "internet.nodes.n5",
    url: "aol.com",
    status: "online",
    type: "ISP",
    category: "tech",
    hits: 1000000,
    year: 2000,
    description:
      "AOL — one of the largest internet service providers of the era",
    popular: true,
  },
  {
    id: "w6",
    titleKey: "internet.nodes.n6",
    url: "deviantart.com",
    status: "online",
    type: "Art",
    category: "entertainment",
    hits: 10000,
    year: 2000,
    description:
      "An online gallery for digital artists and creative communities",
  },
  {
    id: "w7",
    url: "myspace.com",
    status: "online",
    type: "Social",
    category: "social",
    hits: 200000,
    year: 2003,
    description: "MySpace — one of the first major social networking platforms",
    popular: true,
    titleKey: "MySpace",
  },

  {
    id: "w9",
    url: "winamp.com",
    status: "online",
    type: "Music",
    category: "entertainment",
    hits: 50000,
    year: 1997,
    description: "Winamp — the legendary MP3 player of the early internet era",
    popular: true,
    titleKey: "Winamp",
  },
];

const internetFacts = [
  "56K dial-up connections were the standard way to access the internet in 2000",
  "‘Click here for free’ banner ads were everywhere during the Y2K era",
  "Web 1.0 design relied heavily on tables, frames, and animated GIFs",
  "Many internet users had their own GeoCities homepage with custom graphics",
  "Animated GIFs were considered cutting-edge web design",
  "MSN Messenger statuses like 'Away' and 'Busy' became part of online culture",
  "‘Add to Favorites’ buttons appeared on countless websites",
  "Website navigation often featured colorful sidebars, icons, and glitter effects",
];

export default function Internet() {
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "online" | "broken" | "slow"
  >("all");
  const [filterCategory, setFilterCategory] = useState<
    "all" | "entertainment" | "social" | "tech"
  >("all");
  const [selectedSite, setSelectedSite] = useState<Website | null>(null);
  const [currentFact, setCurrentFact] = useState(0);
  const [connectionSpeed, setConnectionSpeed] = useState(56);
  const [isConnecting, setIsConnecting] = useState(false);

  // Simulate connection speed changes
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionSpeed((prev) => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(28, Math.min(56, Math.round(prev + change)));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate internet facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % internetFacts.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const visible = useMemo(() => {
    let filtered = websites;

    if (filterStatus !== "all") {
      filtered = filtered.filter((site) => site.status === filterStatus);
    }
    if (filterCategory !== "all") {
      filtered = filtered.filter((site) => site.category === filterCategory);
    }
    if (query.trim()) {
      filtered = filtered.filter((site) =>
        `${site.titleKey} ${site.url} ${site.type} ${site.description}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      );
    }

    return filtered.sort((a, b) => b.hits - a.hits);
  }, [query, filterStatus, filterCategory]);

  const totalHits = websites.reduce((sum, site) => sum + site.hits, 0);
  const onlineSites = websites.filter((s) => s.status === "online").length;

  const simulateConnect = () => {
    setIsConnecting(true);
    setTimeout(() => setIsConnecting(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="chrome-panel rounded-[28px] p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <p className="micro-label mb-3">{t("internet.label")}</p>
              <h1 className="window-title text-4xl text-white md:text-5xl">
                {t("internet.title")}{" "}
                <span className="chroma-text">
                  {t("internet.titleHighlight")}
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
                {t("internet.description")}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-cyan-300 animate-pulse">
                {connectionSpeed}K
              </div>
              <div className="text-xs text-white/60 mt-1">CONNECTION SPEED</div>
              {isConnecting && (
                <div className="text-xs text-yellow-300 animate-bounce mt-1">
                  Connecting...
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-3 md:grid-cols-3 mb-5">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-cyan-300">
                {onlineSites}
              </div>
              <div className="text-xs text-white/60">Online Sites</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-pink-300">
                {(totalHits / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-white/60">Total Hits</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-300">
                {websites.filter((w) => w.popular).length}
              </div>
              <div className="text-xs text-white/60">Popular Sites</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("internet.searchPlaceholder")}
              className="chrome-panel min-w-[220px] flex-1 rounded-full px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="chrome-panel rounded-full px-4 py-3 text-sm text-white outline-none bg-white/10"
            >
              <option value="all">{t("internet.statusAll")}</option>
              <option value="online">{t("internet.statusOnline")}</option>
              <option value="broken">{t("internet.statusBroken")}</option>
              <option value="slow">{t("internet.statusSlow")}</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="chrome-panel rounded-full px-4 py-3 text-sm text-white outline-none bg-white/10"
            >
              <option value="all">{t("internet.categoryAll")}</option>
              <option value="entertainment">
                {t("internet.categoryEntertainment")}
              </option>
              <option value="social">{t("internet.categorySocial")}</option>
              <option value="tech">{t("internet.categoryTech")}</option>
            </select>
            <button
              onClick={simulateConnect}
              disabled={isConnecting}
              className={`y2k-button rounded-full px-4 py-3 text-[11px] uppercase tracking-[0.22em] ${
                isConnecting ? "animate-pulse" : ""
              }`}
            >
              🔄{" "}
              {isConnecting
                ? t("internet.connecting")
                : t("internet.reconnect")}
            </button>
          </div>
        </div>
      </section>

      {/* Internet Fact */}
      <section className="chrome-panel rounded-[24px] p-5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🌐</div>
          <div className="flex-1">
            <p className="micro-label mb-2 text-cyan-200">
              {t("internet.epochFact")}
            </p>
            <p className="text-base leading-7 text-white/90">
              {internetFacts[currentFact]}
            </p>
          </div>
          <button
            onClick={() =>
              setCurrentFact((prev) => (prev + 1) % internetFacts.length)
            }
            className="text-xs text-white/60 hover:text-white/90 transition px-3 py-1 bg-white/10 rounded-full"
          >
            {t("internet.nextFact")}
          </button>
        </div>
      </section>

      {/* Websites Grid */}
      <section className="y2k-shell rounded-[30px] p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="micro-label">{t("internet.webDatabase")}</p>
          <p className="text-sm text-white/60">
            {visible.length} {t("internet.sitesFound")}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`chrome-panel rounded-[22px] p-4 text-left transition ${
                selectedSite?.id === site.id
                  ? "border-cyan-300/50 bg-cyan-500/10 scale-105"
                  : "hover:scale-105"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="window-title text-lg text-white">
                    {site.titleKey}
                  </h3>
                  <p className="text-xs text-white/50 mt-1">{site.url}</p>
                </div>
                <span
                  className={`chrome-chip rounded-full px-2 py-0.5 text-[10px] uppercase ${
                    site.status === "online"
                      ? "text-cyan-200 bg-cyan-500/20"
                      : site.status === "slow"
                        ? "text-yellow-200 bg-yellow-500/20"
                        : "text-pink-200 bg-pink-500/20"
                  }`}
                >
                  {site.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="chrome-chip rounded-full px-2 py-0.5 text-[10px] uppercase">
                  {site.type}
                </span>
                <span className="text-xs text-white/60">• {site.year}</span>
              </div>
              {site.popular && (
                <div className="mt-2 text-yellow-300 text-xs">⭐ Popular</div>
              )}
              <div className="mt-2 text-xs text-white/50">
                {site.hits.toLocaleString()} hits
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Selected Site Details */}
      {selectedSite && (
        <section className="chrome-panel rounded-[30px] p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="micro-label mb-2">Selected Website</p>
              <h2 className="window-title text-3xl text-white">
                {selectedSite.titleKey}
              </h2>
              <p className="mt-2 text-sm text-cyan-200 font-mono">
                {selectedSite.url}
              </p>
            </div>
            <button
              onClick={() => setSelectedSite(null)}
              className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-sm hover:bg-white/20 transition"
            >
              ✕ Close
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="chrome-chip rounded-full px-3 py-1 text-xs">
              {selectedSite.type}
            </span>
            <span className="chrome-chip rounded-full px-3 py-1 text-xs">
              {selectedSite.year}
            </span>
            <span
              className={`chrome-chip rounded-full px-3 py-1 text-xs ${
                selectedSite.status === "online"
                  ? "text-cyan-200 bg-cyan-500/20"
                  : selectedSite.status === "slow"
                    ? "text-yellow-200 bg-yellow-500/20"
                    : "text-pink-200 bg-pink-500/20"
              }`}
            >
              {selectedSite.status}
            </span>
            {selectedSite.popular && (
              <span className="chrome-chip rounded-full px-3 py-1 text-xs text-yellow-200 bg-yellow-500/20">
                ⭐ Popular
              </span>
            )}
          </div>
          <p className="text-base leading-7 text-white/90">
            {selectedSite.description}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-cyan-300">
                {selectedSite.hits.toLocaleString()}
              </div>
              <div className="text-xs text-white/60">Total Hits</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-300">
                {selectedSite.year}
              </div>
              <div className="text-xs text-white/60">Year Launched</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
