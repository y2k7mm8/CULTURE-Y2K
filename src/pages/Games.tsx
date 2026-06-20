import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SnakeGame } from "../components/features/Games/Snake";
import { MemoryGame } from "../components/features/Games/MemoryGame";

interface GameCard {
  id: number;
  title: string;
  description: string;
  year: number;
  genre: string;
  popularity: number;
  emoji: string;
  featured?: boolean;
}
const games: GameCard[] = [
  {
    id: 1,
    title: "Snake",
    description:
      "The legendary Nokia 3310 game — collect apples and avoid crashing into yourself!",
    year: 1997,
    genre: "Arcade",
    popularity: 100,
    emoji: "🐍",
    featured: true,
  },
  {
    id: 2,
    title: "Memory Game",
    description:
      "Test your memory! Match all card pairs in the shortest time possible.",
    year: 2000,
    genre: "Puzzle",
    popularity: 95,
    emoji: "🧠",
    featured: true,
  },
  {
    id: 3,
    title: "The Sims",
    description:
      "Life simulation game — create your character and control their destiny.",
    year: 2000,
    genre: "Simulation",
    popularity: 98,
    emoji: "🏠",
  },
  {
    id: 4,
    title: "Tony Hawk's Pro Skater 2",
    description:
      "One of the greatest skateboarding games ever — tricks, parks, and iconic soundtracks.",
    year: 2000,
    genre: "Sports",
    popularity: 92,
    emoji: "🛹",
  },
  {
    id: 5,
    title: "Grand Theft Auto III",
    description:
      "A revolutionary open-world 3D game that changed the industry forever.",
    year: 2001,
    genre: "Action",
    popularity: 99,
    emoji: "🚗",
  },
  {
    id: 6,
    title: "Halo: Combat Evolved",
    description: "The FPS that helped define Xbox and became a genre icon.",
    year: 2001,
    genre: "Shooter",
    popularity: 97,
    emoji: "🎯",
  },
  {
    id: 7,
    title: "World of Warcraft",
    description:
      "An MMORPG that became a cultural phenomenon and attracted millions of players.",
    year: 2004,
    genre: "MMORPG",
    popularity: 96,
    emoji: "⚔️",
  },
  {
    id: 8,
    title: "Half-Life 2",
    description:
      "A technological breakthrough featuring the Gravity Gun and realistic physics.",
    year: 2004,
    genre: "Shooter",
    popularity: 94,
    emoji: "🔫",
  },
];

const gamingFacts = [
  "The PlayStation 2 became the best-selling console of all time with over 155 million units sold",
  "The first Winning Eleven (PES) was released in 2001",
  "Tamagotchi was extremely popular among children and teenagers",
  "The Game Boy Advance was the iconic handheld console of the era",
  "Doom 3 was a groundbreaking and terrifying technological showcase in 2004",
  "Games like Resident Evil 4 transformed the survival horror genre",
  "LAN parties and local multiplayer gaming were a major part of gaming culture",
  "Counter-Strike 1.6 was the most popular competitive FPS of its time",
];

export default function Games() {
  const { t } = useTranslation();

  const [selectedGame, setSelectedGame] = useState<GameCard | null>(null);
  const [filter, setFilter] = useState<
    "all" | "arcade" | "shooter" | "rpg" | "sports"
  >("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [likeFact, setLikeFact] = useState(false);
  const [playSnake, setPlaySnake] = useState(false);
  const [playMemory, setPlayMemory] = useState(false);
  const [highScoreSnake, setHighScoreSnake] = useState(0);
  const [highScoreMemory, setHighScoreMemory] = useState(0);

  // Load high scores from localStorage
  useEffect(() => {
    const snakeScore = localStorage.getItem("y2k-snake-highscore");
    const memoryScore = localStorage.getItem("y2k-memory-highscore");
    if (snakeScore) setHighScoreSnake(parseInt(snakeScore));
    if (memoryScore) setHighScoreMemory(parseInt(memoryScore));
  }, []);

  // Rotate gaming facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % gamingFacts.length);
      setLikeFact(false);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredGames = useMemo(() => {
    let filtered = games;
    if (showFeaturedOnly) {
      filtered = filtered.filter((g) => g.featured);
    }
    if (filter !== "all") {
      filtered = filtered.filter((g) => {
        const genre = g.genre.toLowerCase();
        return genre.includes(filter) || filter === "all";
      });
    }
    return filtered;
  }, [filter, showFeaturedOnly]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="chrome-panel rounded-[28px] p-6">
          <p className="micro-label mb-3">{t("games.label")}</p>
          <h1 className="window-title text-4xl text-white md:text-5xl">
            {t("games.title")}{" "}
            <span className="chroma-text">{t("games.titleHighlight")}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
            {t("games.description")}
          </p>

          {/* Playable Games Section */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <button
              onClick={() => setPlaySnake(!playSnake)}
              className={`chrome-panel p-5 rounded-2xl transition ${
                playSnake
                  ? "border-cyan-400/50 bg-cyan-500/20"
                  : "hover:scale-105"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-4xl mb-2">🐍</div>
                  <h3 className="window-title text-2xl text-white">Snake</h3>
                  <p className="text-sm text-white/70 mt-1">
                    Легендарная игра Nokia
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/60 mb-1">HIGH SCORE</div>
                  <div className="text-2xl font-bold text-cyan-300">
                    {highScoreSnake}
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPlayMemory(!playMemory)}
              className={`chrome-panel p-5 rounded-2xl transition ${
                playMemory
                  ? "border-purple-400/50 bg-purple-500/20"
                  : "hover:scale-105"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-4xl mb-2">🧠</div>
                  <h3 className="window-title text-2xl text-white">Memory</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/60 mb-1">BEST TIME</div>
                  <div className="text-2xl font-bold text-purple-300">
                    {highScoreMemory}s
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["all", "arcade", "shooter", "rpg", "sports"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] ${
                  filter === f
                    ? "border-cyan-300/50 bg-cyan-300/20 text-cyan-100"
                    : "text-white/70"
                }`}
              >
                {f}
              </button>
            ))}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] ${
                showFeaturedOnly
                  ? "border-pink-300/50 bg-pink-300/20 text-pink-100"
                  : "text-white/70"
              }`}
            >
              {showFeaturedOnly ? "★ Featured Only" : "All Games"}
            </button>
          </div>
        </div>
      </section>

      {/* Playable Games Overlay */}
      {playSnake && (
        <section className="y2k-shell rounded-[28px] p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="window-title text-xl text-white">🐍 Snake Game</h3>
            <button
              onClick={() => setPlaySnake(false)}
              className="px-3 py-1 bg-red-500/30 text-red-200 rounded-full text-sm hover:bg-red-500/50 transition"
            >
              ✕ Close
            </button>
          </div>
          <div className="overflow-x-auto">
            <SnakeGame />
          </div>
        </section>
      )}

      {playMemory && (
        <section className="y2k-shell rounded-[28px] p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="window-title text-xl text-white">🧠 Memory Game</h3>
            <button
              onClick={() => setPlayMemory(false)}
              className="px-3 py-1 bg-red-500/30 text-red-200 rounded-full text-sm hover:bg-red-500/50 transition"
            >
              ✕ Close
            </button>
          </div>
          <div className="overflow-x-auto">
            <MemoryGame />
          </div>
        </section>
      )}

      {/* Gaming Fact */}
      <section className="chrome-panel rounded-[24px] p-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="micro-label mb-2 text-purple-200">🎮 </p>
            <p className="text-base leading-7 text-white/90">
              {gamingFacts[currentFact]}
            </p>
          </div>
          <button
            onClick={() => setLikeFact(!likeFact)}
            className={`text-2xl transition ${likeFact ? "animate-bounce" : ""}`}
          >
            {likeFact ? "❤️" : "🤍"}
          </button>
        </div>
        <button
          onClick={() =>
            setCurrentFact((prev) => (prev + 1) % gamingFacts.length)
          }
          className="mt-3 text-xs text-white/60 hover:text-white/90 transition"
        >
          Next info →
        </button>
      </section>

      {/* Games Grid */}
      <section className="y2k-shell rounded-[30px] p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="micro-label">Games Database</p>
          <p className="text-sm text-white/60">{filteredGames.length} games</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`chrome-panel rounded-[22px] p-4 text-left transition ${
                selectedGame?.id === game.id
                  ? "border-cyan-300/50 bg-cyan-500/10 scale-105"
                  : "hover:scale-105"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-3xl">{game.emoji}</span>
                {game.featured && (
                  <span className="text-yellow-300 text-lg">★</span>
                )}
              </div>
              <h3 className="window-title text-lg text-white mb-1">
                {game.title}
              </h3>
              <p className="text-xs text-white/60 mb-2">
                {game.year} • {game.genre}
              </p>
              <div className="flex items-center gap-1">
                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-500"
                    style={{ width: `${game.popularity}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/60">
                  {game.popularity}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Selected Game Details */}
      {selectedGame && (
        <section className="chrome-panel rounded-[30px] p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="micro-label mb-2">Selected Game</p>
              <h2 className="window-title text-3xl text-white flex items-center gap-3">
                {selectedGame.emoji} {selectedGame.title}
              </h2>
              <p className="mt-2 text-sm text-white/70">
                {selectedGame.year} • {selectedGame.genre} •{" "}
                {selectedGame.popularity}% Popular
              </p>
            </div>
            <button
              onClick={() => setSelectedGame(null)}
              className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-sm hover:bg-white/20 transition"
            >
              ✕ Close
            </button>
          </div>
          <p className="text-base leading-7 text-white/90">
            {selectedGame.description}
          </p>
          {selectedGame.featured && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-full">
              <span className="text-yellow-300">★</span>
              <span className="text-xs text-yellow-200">
                Featured Game - Available to Play!
              </span>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
