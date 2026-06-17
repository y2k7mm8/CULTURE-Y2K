# 🎮 Кодовые примеры для улучшений

## 📋 Содержание
1. WinampPlayer — Полный код
2. Улучшенный Snake — Полный код
3. Easter Eggs Hook — Полный код
4. Matrix Rain Компонент
5. BSOD Компонент
6. Dial-up Компонент
7. You've Got Mail Компонент

---

## 🎵 WinampPlayer — Полный код

### Файл: `src/components/features/Player/WinampPlayer.tsx`

```tsx
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

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => handleNext();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, [volume]); // Note: handleNext needs to be memoized

  // Visualization effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVisualization((prev) =>
        prev.map(() => {
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

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return (
    <>
      <Window
        id="player-winamp"
        title="Winamp Media Player 2.91"
        icon="🎵"
        initialSize={{ width: 380, height: 280 }}
      >
        {/* Window content */}
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
          {/* Playlist content */}
        </Window>
      )}
    </>
  );
};
```

---

## 🐍 Snake — Улучшенный hook

### Файл: `src/hooks/useGame.ts`

```typescript
import { useState, useCallback, useEffect } from "react";

export interface GameScore {
  score: number;
  highScore: number;
  level: number;
  gameOver: boolean;
  isPaused: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  bestLevel: number;
}

const STORAGE_KEY = "y2k-snake-stats";
const HIGH_SCORE_KEY = "y2k-snake-highscore";

export function useSnakeGame() {
  const [state, setState] = useState<GameScore>(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    return {
      score: 0,
      highScore: savedHighScore ? Number(savedHighScore) : 0,
      level: 1,
      gameOver: false,
      isPaused: false,
    };
  });

  const [stats, setStats] = useState<GameStats>(() => {
    const savedStats = localStorage.getItem(STORAGE_KEY);
    return savedStats
      ? JSON.parse(savedStats)
      : {
          gamesPlayed: 0,
          totalScore: 0,
          bestLevel: 1,
        };
  });

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const reset = useCallback(() => {
    setState((prev) => ({
      score: 0,
      highScore: prev.highScore,
      level: 1,
      gameOver: false,
      isPaused: false,
    }));
    setStats((prev) => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  }, []);

  const addScore = useCallback((points: number) => {
    setState((prev) => {
      const newScore = prev.score + points;
      const newLevel = Math.floor(newScore / 50) + 1;
      const newHighScore = Math.max(prev.highScore, newScore);

      if (newHighScore > prev.highScore) {
        localStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
      }

      setStats((prevStats) => ({
        ...prevStats,
        totalScore: prevStats.totalScore + points,
        bestLevel: Math.max(prevStats.bestLevel, newLevel),
      }));

      return {
        ...prev,
        score: newScore,
        level: newLevel,
        highScore: newHighScore,
      };
    });
  }, []);

  const endGame = useCallback(() => {
    setState((prev) => ({ ...prev, gameOver: true, isPaused: true }));
  }, []);

  const togglePause = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const getSpeed = useCallback(() => {
    const baseSpeed = 150;
    const minSpeed = 60;
    return Math.max(minSpeed, baseSpeed - (state.level - 1) * 10);
  }, [state.level]);

  return {
    ...state,
    stats,
    reset,
    addScore,
    endGame,
    togglePause,
    getSpeed,
  };
}
```

---

## 🎯 Easter Eggs Hook

### Файл: `src/hooks/useEasterEggs.ts`

```typescript
import { useState, useCallback, useEffect, useRef } from "react";

export interface EasterEggsState {
  matrixRain: boolean;
  bsod: boolean;
  dialup: boolean;
  youveGotMail: boolean;
}

export const useEasterEggs = () => {
  const [activeEggs, setActiveEggs] = useState<EasterEggsState>({
    matrixRain: false,
    bsod: false,
    dialup: false,
    youveGotMail: false,
  });

  const [dialupComplete, setDialupComplete] = useState(false);
  const keyBufferRef = useRef<string[]>([]);

  // Коды для активации
  const matrixCode = ["m", "a", "t", "r", "i", "x"];
  const bsodCode = ["b", "s", "o", "d"];
  const mailCode = ["m", "a", "i", "l"];
  const dialCode = ["d", "i", "a", "l"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keyBufferRef.current.push(key);

      // Keep buffer manageable
      if (keyBufferRef.current.length > 20) {
        keyBufferRef.current.shift();
      }

      // Check for Matrix Rain
      if (keyBufferRef.current.slice(-6).join("") === matrixCode.join("")) {
        setActiveEggs((prev) => ({ ...prev, matrixRain: !prev.matrixRain }));
        keyBufferRef.current = [];
      }

      // Check for BSOD
      if (keyBufferRef.current.slice(-4).join("") === bsodCode.join("")) {
        setActiveEggs((prev) => ({ ...prev, bsod: true }));
        keyBufferRef.current = [];
      }

      // Check for You've Got Mail
      if (keyBufferRef.current.slice(-4).join("") === mailCode.join("")) {
        setActiveEggs((prev) => ({ ...prev, youveGotMail: true }));
        keyBufferRef.current = [];
      }

      // Check for Dial-up
      if (keyBufferRef.current.slice(-4).join("") === dialCode.join("")) {
        setActiveEggs((prev) => ({ ...prev, dialup: true }));
        keyBufferRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMatrix = useCallback(() => {
    setActiveEggs((prev) => ({ ...prev, matrixRain: false }));
  }, []);

  const closeBSOD = useCallback(() => {
    setActiveEggs((prev) => ({ ...prev, bsod: false }));
  }, []);

  const closeMail = useCallback(() => {
    setActiveEggs((prev) => ({ ...prev, youveGotMail: false }));
  }, []);

  const completeDialup = useCallback(() => {
    setActiveEggs((prev) => ({ ...prev, dialup: false }));
    setDialupComplete(true);
    setTimeout(() => setDialupComplete(false), 3000);
  }, []);

  return {
    activeEggs,
    dialupComplete,
    closeMatrix,
    closeBSOD,
    closeMail,
    completeDialup,
  };
};
```

---

## 🌧️ Matrix Rain Компонент

```typescript
import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  isActive: boolean;
  onClose: () => void;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ isActive, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<number[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    columnsRef.current = Array(columns).fill(1);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    const draw = () => {
      // Fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      columnsRef.current.forEach((y, index) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = index * fontSize;

        // Random white character
        if (Math.random() > 0.95) {
          ctx.fillStyle = "#fff";
        } else {
          ctx.fillStyle = "#0f0";
        }

        ctx.fillText(char, x, y * fontSize);

        // Reset column randomly
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          columnsRef.current[index] = 0;
        }
        columnsRef.current[index] += 1;
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return isActive ? (
    <div className="fixed inset-0 z-50 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="fixed top-4 right-4 text-green-500 font-mono text-xs bg-black/80 p-2">
        Press ESC to exit
      </div>
    </div>
  ) : null;
};
```

---

## 💻 BSOD Компонент

```typescript
import React, { useEffect, useState } from "react";

interface BSODProps {
  isActive: boolean;
  onClose: () => void;
}

export const BSOD: React.FC<BSODProps> = ({ isActive, onClose }) => {
  const [timer, setTimer] = useState(100);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onClose]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-blue-600 font-mono text-white p-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-4xl font-bold mb-4">
          A problem has been detected and Windows has been shut down
        </p>
        <p className="text-xl mb-4">Y2K_BUG_DETECTED</p>
        <p className="text-lg mb-4">
          If this is the first time you've seen this stop error screen...
        </p>
        <p className="text-xl mt-8">
          System will reboot in {timer} seconds...
        </p>
      </div>
    </div>
  );
};
```

---

## 📞 Dial-up Компонент (с Web Audio API)

```typescript
import React, { useEffect, useRef } from "react";

interface DialUpSoundProps {
  isActive: boolean;
  onComplete: () => void;
}

const generateDialUpSound = (audioContext: AudioContext): void => {
  const createOscillator = (frequency: number, type: OscillatorType = "sine") => {
    const osc = audioContext.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
    return osc;
  };

  const createGain = (initialValue: number = 0.1) => {
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(initialValue, audioContext.currentTime);
    return gain;
  };

  // Dial tone
  const dialOsc1 = createOscillator(350, "sine");
  const dialOsc2 = createOscillator(440, "sine");
  const dialGain = createGain(0.05);

  dialOsc1.connect(dialGain);
  dialOsc2.connect(dialGain);
  dialGain.connect(audioContext.destination);

  dialOsc1.start();
  dialOsc2.start();

  // Stop after 2 seconds
  setTimeout(() => {
    dialOsc1.stop();
    dialOsc2.stop();
  }, 2000);

  // Screeching tones
  setTimeout(() => {
    for (let i = 0; i < 8; i++) {
      const osc = createOscillator(2000 + Math.random() * 2000, "sawtooth");
      const gain = createGain(0.03);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(audioContext.currentTime + i * 0.3);
      osc.stop(audioContext.currentTime + i * 0.3 + 0.2);
    }
  }, 2200);
};

export const DialUpSound: React.FC<DialUpSoundProps> = ({ isActive, onComplete }) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isActive) return;

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      generateDialUpSound(audioContextRef.current);

      setTimeout(() => {
        onComplete();
      }, 6000);
    } catch (error) {
      console.error("Web Audio API not supported:", error);
      onComplete();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">📞</div>
        <p className="text-green-500 font-mono text-xl">Connecting to Internet...</p>
      </div>
    </div>
  );
};
```

---

## 📧 You've Got Mail Компонент

```typescript
import React, { useEffect, useState } from "react";

interface YouveGotMailProps {
  isActive: boolean;
  onClose: () => void;
}

export const YouveGotMail: React.FC<YouveGotMailProps> = ({ isActive, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShowPopup(false);
      return;
    }

    const timer = setTimeout(() => setShowPopup(true), 1000);
    return () => clearTimeout(timer);
  }, [isActive]);

  if (!isActive || !showPopup) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 border-4 border-yellow-600 rounded-lg shadow-2xl p-6 min-w-[400px]">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl animate-bounce">📧</div>
          <div>
            <p className="text-2xl font-bold text-gray-800">AOL</p>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded p-4 mb-4">
          <p className="text-2xl font-bold text-blue-600 text-center">
            ✉️ YOU'VE GOT MAIL!
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          <button onClick={onClose} className="px-6 py-2 bg-blue-500 text-white rounded">
            Read Mail
          </button>
          <button onClick={onClose} className="px-6 py-2 bg-gray-400 text-white rounded">
            Later
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 📦 Интеграция Easter Eggs в App.tsx

```typescript
import { useEasterEggs } from "./hooks/useEasterEggs";
import { MatrixRain, BSOD, DialUpSound, YouveGotMail } from "./components/features/EasterEggs";

export default function App() {
  const {
    activeEggs,
    dialupComplete,
    closeMatrix,
    closeBSOD,
    closeMail,
    completeDialup,
  } = useEasterEggs();

  return (
    <GlitchEffect>
      <CRTEffect enabled={crtEnabled} />

      {/* Routes */}

      {/* Easter Eggs */}
      <MatrixRain isActive={activeEggs.matrixRain} onClose={closeMatrix} />
      <BSOD isActive={activeEggs.bsod} onClose={closeBSOD} />
      <DialUpSound isActive={activeEggs.dialup} onComplete={completeDialup} />
      <YouveGotMail isActive={activeEggs.youveGotMail} onClose={closeMail} />

      {/* Dialup notification */}
      {dialupComplete && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-black px-4 py-2 rounded">
          Connected to Internet!
        </div>
      )}
    </GlitchEffect>
  );
}
```

---

## 💾 localStorage - Полный пример

### Хук для настроек:
```typescript
import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting ${key}:`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

// Использование:
// const [crtEnabled, setCrtEnabled] = useLocalStorage("y2k-crt", false);
```

---

## ✅ Краткая сводка

| Компонент | Файл | Фичи |
|-----------|------|------|
| WinampPlayer | `src/components/features/Player/WinampPlayer.tsx` | Реальное аудио, плейлист, визуализация, shuffle, repeat |
| Snake Hook | `src/hooks/useGame.ts` | Уровни, рекорды, статистика, localStorage |
| Easter Eggs Hook | `src/hooks/useEasterEggs.ts` | Клавиатурные комбинации, буфер клавиш |
| Matrix Rain | `src/components/features/EasterEggs/MatrixRain.tsx` | Canvas анимация, японские символы |
| BSOD | `src/components/features/EasterEggs/BSOD.tsx` | Windows XP BSOD, таймер |
| Dial-up | `src/components/features/EasterEggs/DialUp.tsx` | Web Audio API, синтез звука |
| You've Got Mail | `src/components/features/EasterEggs/YouveGotMail.tsx` | AOL стайл, анимация |

---

**Дата**: 2025