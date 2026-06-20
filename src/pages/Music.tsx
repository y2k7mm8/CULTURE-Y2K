import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { WinampPlayer } from "../components/features/Player/WinampPlayer";

interface Track {
  id: string;
  artist: string;
  title: string;
  mood: string;
  year: number;
  duration: string;
  bpm: number;
  popularity: number;
}

const trackData: Track[] = [
  {
    id: "1",
    artist: "Britney Spears",
    title: "Baby One More Time",
    mood: "pop",
    year: 1999,
    duration: "3:31",
    bpm: 93,
    popularity: 100,
  },
  {
    id: "2",
    artist: "NSYNC",
    title: "Bye Bye Bye",
    mood: "pop",
    year: 2000,
    duration: "3:19",
    bpm: 106,
    popularity: 95,
  },
  {
    id: "3",
    artist: "Daft Punk",
    title: "One More Time",
    mood: "dance",
    year: 2000,
    duration: "5:20",
    bpm: 122,
    popularity: 98,
  },
  {
    id: "4",
    artist: "Eminem",
    title: "Without Me",
    mood: "hip-hop",
    year: 2002,
    duration: "4:50",
    bpm: 117,
    popularity: 96,
  },
  {
    id: "5",
    artist: "Avril Lavigne",
    title: "Complicated",
    mood: "pop",
    year: 2002,
    duration: "4:05",
    bpm: 80,
    popularity: 94,
  },
  {
    id: "6",
    artist: "Beyoncé",
    title: "Crazy In Love",
    mood: "rnb",
    year: 2003,
    duration: "3:56",
    bpm: 110,
    popularity: 97,
  },
  {
    id: "7",
    artist: "My Chemical Romance",
    title: "Welcome To The Black Parade",
    mood: "emo",
    year: 2006,
    duration: "5:11",
    bpm: 84,
    popularity: 92,
  },
  {
    id: "8",
    artist: "Fall Out Boy",
    title: "Sugar, We're Goin Down",
    mood: "emo",
    year: 2005,
    duration: "3:50",
    bpm: 180,
    popularity: 93,
  },
  {
    id: "9",
    artist: "The Killers",
    title: "Mr. Brightside",
    mood: "dance",
    year: 2004,
    duration: "3:42",
    bpm: 148,
    popularity: 99,
  },
  {
    id: "10",
    artist: "OutKast",
    title: "Hey Ya!",
    mood: "dance",
    year: 2003,
    duration: "3:55",
    bpm: 160,
    popularity: 98,
  },
  {
    id: "11",
    artist: "Usher",
    title: "Yeah!",
    mood: "rnb",
    year: 2004,
    duration: "4:09",
    bpm: 106,
    popularity: 96,
  },
  {
    id: "12",
    artist: "Linkin Park",
    title: "In The End",
    mood: "emo",
    year: 2000,
    duration: "3:36",
    bpm: 110,
    popularity: 100,
  },
];

const musicFacts = [
  "Britney Spears sold over 100 million records worldwide",
  "NSYNC holds the record for first-week album sales with 2.4 million copies",
  "TLC, Destiny's Child, and the Spice Girls dominated pop and R&B music",
  "Nu Metal was one of the most popular genres among teenagers",
  "CD-R drives allowed people to burn music at home",
  "Napster revolutionized music sharing on the internet",
  "MTV was the primary source of music content for young audiences",
  "TRL (Total Request Live) was one of the most popular music shows",
];

const genres = [
  { id: "all", name: "All", color: "from-cyan-400 to-pink-400" },
  { id: "pop", name: "Pop", color: "from-pink-400 to-red-400" },
  { id: "dance", name: "Dance", color: "from-purple-400 to-pink-400" },
  { id: "emo", name: "Emo/Alt", color: "from-gray-600 to-gray-800" },
  { id: "rnb", name: "R&B", color: "from-yellow-400 to-orange-400" },
  { id: "hip-hop", name: "Hip-Hop", color: "from-green-400 to-teal-400" },
];

export default function Music() {
  const { t } = useTranslation();

  const [mood, setMood] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentFact, setCurrentFact] = useState(0);
  const [likedFact, setLikedFact] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const filtered = useMemo(() => {
    if (mood === "all") return trackData;
    return trackData.filter((track) => track.mood === mood);
  }, [mood]);

  const validIndex = Math.max(0, Math.min(selectedIndex, filtered.length - 1));
  const selectedTrack = filtered[validIndex] ?? trackData[0];

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("y2k-music-favorites");
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem(
      "y2k-music-favorites",
      JSON.stringify(Array.from(favorites)),
    );
  }, [favorites]);

  // Rotate music facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % musicFacts.length);
      setLikedFact(false);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (trackId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(trackId)) {
      newFavorites.delete(trackId);
    } else {
      newFavorites.add(trackId);
    }
    setFavorites(newFavorites);
  };

  const randomTrack = () => {
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setSelectedIndex(randomIndex);
  };

  const totalDuration = trackData.reduce((sum, track) => {
    const [min, sec] = track.duration.split(":").map(Number);
    return sum + min * 60 + sec;
  }, 0);

  const avgBPM = Math.round(
    trackData.reduce((sum, t) => sum + t.bpm, 0) / trackData.length,
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="chrome-panel rounded-[28px] p-6">
              <p className="micro-label mb-3">{t("music.label")}</p>
              <h1 className="window-title text-4xl text-white md:text-5xl">
                {t("music.title")}{" "}
                <span className="chroma-text">{t("music.titleHighlight")}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">
                {t("music.description")}
              </p>

              {/* Genre Filters */}
              <div className="mt-5 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => setMood(genre.id)}
                    className={`y2k-button rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.22em] ${
                      mood === genre.id
                        ? "border-white/50 bg-white/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
                <button
                  onClick={randomTrack}
                  className="y2k-button rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-cyan-200"
                >
                  🎲 Random
                </button>
              </div>

              <div className="mt-4 text-sm text-white/60">
                {filtered.length} {t("music.tracks")}
              </div>
            </div>

            {/* Music Fact */}
            <div className="chrome-panel rounded-[24px] p-5 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="micro-label mb-2 text-pink-200">
                    🎵 {t("music.musicFact")}
                  </p>
                  <p className="text-base leading-7 text-white/90">
                    {musicFacts[currentFact]}
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
                  setCurrentFact((prev) => (prev + 1) % musicFacts.length)
                }
                className="mt-3 text-xs text-white/60 hover:text-white/90 transition"
              >
                {t("music.nextFact")}
              </button>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="chrome-panel rounded-[28px] p-5">
            <p className="micro-label mb-4">{t("music.statistics")}</p>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-cyan-300">
                  {trackData.length}
                </div>
                <div className="text-xs text-white/60">
                  {t("music.totalTracks")}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-pink-300">
                  {Math.floor(totalDuration / 60)}:
                  {(totalDuration % 60).toString().padStart(2, "0")}
                </div>
                <div className="text-xs text-white/60">
                  {t("music.totalDuration")}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-300">
                  {avgBPM}
                </div>
                <div className="text-xs text-white/60">Average BPM</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-lime-300">
                  {favorites.size}
                </div>
                <div className="text-xs text-white/60">Favorites</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winamp Player */}
      <section className="chrome-panel rounded-[28px] p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="window-title text-xl text-white flex items-center gap-2">
            🎵 Winamp Player
          </h3>
          <button
            onClick={() => setShowPlayer(!showPlayer)}
            className="px-3 py-1 bg-pink-500/30 text-pink-200 rounded-full text-sm hover:bg-pink-500/50 transition"
          >
            {showPlayer ? "Hide" : "Show"}
          </button>
        </div>
        {showPlayer && <WinampPlayer />}
      </section>

      {/* Tracks Grid */}
      <section className="y2k-shell rounded-[30px] p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="micro-label">Track Library</p>
          <p className="text-sm text-white/60">
            {filtered.length} tracks
            {favorites.size > 0 && ` • ${favorites.size} ❤️`}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 max-h-[600px] overflow-y-auto custom-scrollbar">
          {filtered.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => setSelectedIndex(idx)}
              className={`chrome-panel rounded-[24px] p-5 text-left transition hover:-translate-y-0.5 relative ${
                selectedTrack.id === track.id
                  ? "border-cyan-300/50 bg-cyan-500/10"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="micro-label">{track.year}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] uppercase ${
                        track.popularity >= 98
                          ? "bg-yellow-500/20 text-yellow-200"
                          : track.popularity >= 90
                            ? "bg-cyan-500/20 text-cyan-200"
                            : "bg-white/10 text-white/60"
                      }`}
                    >
                      {track.popularity}%
                    </span>
                  </div>
                  <h3 className="window-title text-xl text-white">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-cyan-200">
                    {track.artist}
                  </p>
                  <div className="mt-3 flex gap-4 text-xs text-white/60">
                    <span>⏱ {track.duration}</span>
                    <span>🎹 {track.bpm} BPM</span>
                    <span>🎶 {track.mood}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(track.id);
                  }}
                  className="text-2xl hover:scale-110 transition"
                >
                  {favorites.has(track.id) ? "❤️" : "🤍"}
                </button>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Selected Track Details */}
      <section className="chrome-panel rounded-[28px] p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="micro-label mb-2">{t("music.selectedNote")}</p>
            <h3 className="window-title text-3xl text-white">
              {selectedTrack.title}
            </h3>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-pink-200">
              {selectedTrack.artist}
            </p>
          </div>
          <button
            onClick={() => randomTrack()}
            className="px-3 py-2 bg-white/10 text-white/70 rounded-full text-sm hover:bg-white/20 transition"
          >
            🎲 Random Track
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-cyan-300">
              {selectedTrack.year}
            </p>
            <p className="text-xs text-white/60 mt-1">Year</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-pink-300">
              {selectedTrack.bpm}
            </p>
            <p className="text-xs text-white/60 mt-1">BPM</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-purple-300">
              {selectedTrack.duration}
            </p>
            <p className="text-xs text-white/60 mt-1">Duration</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-lime-300">
              {selectedTrack.popularity}%
            </p>
            <p className="text-xs text-white/60 mt-1">Popularity</p>
          </div>
        </div>

        <div className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-lg">
          <p className="text-sm text-white/80">
            <span className="font-bold text-pink-200">
              {selectedTrack.mood.toUpperCase()}
            </span>{" "}
            • {t("music.curated")}
          </p>
        </div>
      </section>

      {/* Favorites */}
      {favorites.size > 0 && (
        <section className="chrome-panel rounded-[28px] p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="micro-label">
              ❤️ {t("music.favorites")} ({favorites.size})
            </p>
            <button
              onClick={() => setFavorites(new Set())}
              className="text-xs text-white/60 hover:text-white/90"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(favorites).map((favId) => {
              const track = trackData.find((t) => t.id === favId);
              return track ? (
                <button
                  key={favId}
                  onClick={() => {
                    const idx = filtered.findIndex((t) => t.id === favId);
                    if (idx !== -1) setSelectedIndex(idx);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-pink-500/20 rounded-full text-sm text-pink-200 hover:bg-pink-500/30 transition"
                >
                  {track.title} - {track.artist}
                </button>
              ) : null;
            })}
          </div>
        </section>
      )}
    </div>
  );
}
