import React, { useState, useEffect, useRef, useCallback } from "react";
import { Window } from "../../ui/Window";
import { useTranslation } from "react-i18next";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  src: string;
}

const PLAYLIST: Track[] = [
  {
    id: "1",
    title: "Baby One More Time",
    artist: "Britney Spears",
    album: "...Baby One More Time",
    duration: 238,
    src: "/src/assets/music/Britney Spears - Baby One More Time (Remastered).mp3",
  },
  {
    id: "2",
    title: "Chroma Dreams",
    artist: "Digital Archive",
    album: "Y2K Nostalgia",
    duration: 195,
    src: "",
  },
  {
    id: "3",
    title: "Digital Sunset",
    artist: "Retro Wave",
    album: "Internet Memories",
    duration: 210,
    src: "",
  },
];

export const WinampPlayer: React.FC = () => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("y2k-volume");
    return saved ? Number(saved) : 80;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [visualization, setVisualization] = useState(Array(32).fill(0));
  const [showPlaylist, setShowPlaylist] = useState(false);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Save volume to localStorage
  useEffect(() => {
    localStorage.setItem("y2k-volume", volume.toString());
  }, [volume]);

  // Initialize audio element
  useEffect(() => {
    if (typeof window === "undefined") return;

    audioRef.current = new Audio();

    const audio = audioRef.current;
    audio.volume = volume / 100;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleLoadStart = () => {
      console.log("Audio loading...");
    };

    const handleCanPlay = () => {
      console.log("Audio ready to play");
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Load track
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (currentTrack.src && currentTrack.src.trim() !== "") {
      audio.src = currentTrack.src;
      audio.load();

      if (isPlaying) {
        audio.play().catch((err) => {
          console.error("Playback error:", err);
          setIsPlaying(false);
        });
      }
    } else {
      // Demo mode - no actual audio
      console.log(`Demo mode: ${currentTrack.title}`);
      if (isPlaying) {
        setCurrentTime((prev) => (prev + 1) % currentTrack.duration);
      }
    }
  }, [currentTrackIndex, isPlaying]);

  // Visualization effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVisualization((prev) =>
        prev.map(() => {
          // Create a more realistic visualization pattern
          const base = Math.random() * 60 + 20;
          const peak = Math.random() * 30;
          return Math.min(100, base + peak);
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (currentTrack.src && currentTrack.src.trim() !== "") {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Playback error:", err);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      // Demo mode
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, currentTrack.src]);

  const handlePrevious = useCallback(() => {
    setCurrentTrackIndex(
      (prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length,
    );
    setCurrentTime(0);
  }, []);

  const handleNext = useCallback(() => {
    if (isRepeat) {
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    if (isShuffle) {
      const newIndex = Math.floor(Math.random() * PLAYLIST.length);
      setCurrentTrackIndex(newIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    }
    setCurrentTime(0);
  }, [isShuffle, isRepeat]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }, []);

  const handleMuteToggle = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [volume, isMuted]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current && currentTrack.src) {
      audioRef.current.currentTime = seekTime;
    }
  }, [currentTrack.src]);

  return (
    <>
      <Window
        id="player-winamp"
        title="Winamp Media Player 2.91"
        icon="🎵"
        initialSize={{ width: 380, height: 280 }}
      >
        <div className="w-full bg-gradient-to-b from-gray-700 to-gray-600 p-4 font-terminator">
          <div className="text-center text-white text-xs font-bold mb-3 flex items-center justify-between">
            <span>Winamp Media Player</span>
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="text-[10px] px-2 py-1 bg-gray-600 rounded hover:bg-gray-500"
            >
              {t("common.playlist")}
            </button>
          </div>

          {/* Visualization */}
          <div className="bg-black mb-3 p-2 flex items-end justify-center gap-1 h-16 rounded border border-gray-500">
            {visualization.map((height, i) => (
              <div
                key={i}
                className="transition-all duration-100"
                style={{
                  width: "8px",
                  height: `${height}%`,
                  background: `linear-gradient(to top, #00ff00, #ffff00, #ff00ff)`,
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>

          {/* Time display */}
          <div className="bg-black text-lime-500 text-center text-sm p-2 mb-3 rounded font-mono font-bold border border-gray-500">
            {formatTime(currentTime)} / {formatTime(currentTrack.duration)}
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={currentTrack.duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Playback controls */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`w-8 h-8 bg-gradient-to-b border-2 text-[10px] font-bold ${
                isShuffle
                  ? "from-cyan-500 to-cyan-700 border-cyan-300 text-white"
                  : "from-gray-500 to-gray-700 border-gray-400 text-black hover:from-gray-400 hover:to-gray-600"
              }`}
              title="Shuffle"
            >
              🔀
            </button>
            <button
              onClick={handlePrevious}
              className="w-8 h-8 bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-400 text-black text-xs font-bold hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-500"
              title={t("common.previous")}
            >
              ⏮
            </button>
            <button
              onClick={handlePlayPause}
              className="w-10 h-10 bg-gradient-to-b from-green-500 to-green-700 border-2 border-green-400 text-black text-sm font-bold hover:from-green-400 hover:to-green-600 active:from-green-600 active:to-green-500"
              title={isPlaying ? t("common.pause") : t("common.play")}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-400 text-black text-xs font-bold hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-500"
              title={t("common.next")}
            >
              ⏭
            </button>
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`w-8 h-8 bg-gradient-to-b border-2 text-[10px] font-bold ${
                isRepeat
                  ? "from-purple-500 to-purple-700 border-purple-300 text-white"
                  : "from-gray-500 to-gray-700 border-gray-400 text-black hover:from-gray-400 hover:to-gray-600"
              }`}
              title="Repeat"
            >
              🔁
            </button>
          </div>

          {/* Volume control */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={handleMuteToggle}
              className="text-white text-xs"
              title={isMuted ? t("common.unmuted") : t("common.muted")}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white text-xs w-10 text-right">
              {isMuted ? "MUT" : `${volume}%`}
            </span>
          </div>

          {/* Now playing info */}
          <div className="text-xs p-2 bg-black/50 rounded border border-gray-500">
            <div className="font-bold mb-1 text-cyan-400">
              {t("common.nowPlaying")}:
            </div>
            <div className="text-lime-500 font-bold">{currentTrack.title}</div>
            <div className="text-white text-[10px]">
              {currentTrack.artist}
            </div>
            <div className="text-gray-400 text-[10px]">{currentTrack.album}</div>
          </div>
        </div>
      </Window>

      {/* Playlist Window */}
      {showPlaylist && (
        <Window
          id="player-playlist"
          title="Playlist"
          icon="📋"
          initialPosition={{ x: 400, y: 100 }}
          initialSize={{ width: 300, height: 250 }}
        >
          <div className="w-full bg-gradient-to-b from-gray-700 to-gray-600 p-4 font-terminator">
            <div className="text-white text-xs mb-2 font-bold">
              {PLAYLIST.length} tracks
            </div>
            <div className="max-h-48 overflow-y-auto">
              {PLAYLIST.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-2 mb-1 rounded text-[10px] ${
                    index === currentTrackIndex
                      ? "bg-cyan-500/30 border border-cyan-400"
                      : "bg-black/30 hover:bg-black/50"
                  }`}
                >
                  <div
                    className={`font-bold ${
                      index === currentTrackIndex
                        ? "text-cyan-400"
                        : "text-white"
                    }`}
                  >
                    {index + 1}. {track.title}
                  </div>
                  <div className="text-gray-400">
                    {track.artist} · {formatTime(track.duration)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Window>
      )}
    </>
  );
};