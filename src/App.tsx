import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import Layout from "./layout/Layout";
import { GlitchEffect } from "./components/features/Effects/GlitchEffect";
import { CRTEffect } from "./components/features/Effects/CRTEffect";
import { FriendsList } from "./components/features/Chat/FriendsList";
import { SnakeGame } from "./components/features/Games/Snake";
import { WinampPlayer } from "./components/features/Player/WinampPlayer";
import { SplashIntro } from "./components/SplashIntro";
import { useKonamiCode } from "./hooks/useKonamiCode";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Music = lazy(() => import("./pages/Music"));
const Fashion = lazy(() => import("./pages/Fashion"));
const Games = lazy(() => import("./pages/Games"));
const Internet = lazy(() => import("./pages/Internet"));

const LoadingFallback = () => <div className="p-4 text-center">Loading...</div>;

export default function App() {
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [secretModeActive, setSecretModeActive] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Reset sessionStorage to always show intro on page refresh
    sessionStorage.removeItem("introShown");
  }, []);

  const activateSecretMode = useCallback(() => {
    setSecretModeActive(true);
    // Применяем стили напрямую на все элементы
    document.body.style.filter =
      "saturate(2.5) contrast(1.5) brightness(1.15) hue-rotate(5deg)";
    document.body.style.imageRendering = "pixelated";
    document.documentElement.classList.add("mode-8bit");
    alert(
      "🎮 SECRET MODE ACTIVATED! 🎮\n\nПиксельный режим включен на 8 секунд!",
    );
    setTimeout(() => {
      setSecretModeActive(false);
      document.body.style.filter = "";
      document.body.style.imageRendering = "";
      document.documentElement.classList.remove("mode-8bit");
    }, 8000);
  }, []);

  useKonamiCode(activateSecretMode);

  console.log("App render - introComplete:", introComplete);

  // Show intro on first load
  if (!introComplete) {
    console.log("Rendering SplashIntro");
    return (
      <SplashIntro
        onComplete={() => {
          console.log("Intro completed, setting introComplete to true");
          setIntroComplete(true);
        }}
      />
    );
  }

  console.log("Rendering main app");
  return (
    <GlitchEffect>
      <CRTEffect enabled={crtEnabled} />
      <div className={`${secretModeActive ? "mode-8bit" : ""}`}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/music"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Music />
                </Suspense>
              }
            />
            <Route
              path="/fashion"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Fashion />
                </Suspense>
              }
            />
            <Route
              path="/games"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Games />
                </Suspense>
              }
            />
            <Route
              path="/internet"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Internet />
                </Suspense>
              }
            />
          </Route>
        </Routes>

        {/* Y2K Features Overlay */}
        {showChat && <FriendsList />}
        {showGame && <SnakeGame />}
        {showPlayer && <WinampPlayer />}

        {/* Bottom Controls */}
        <div className="fixed bottom-0 right-0 z-40 flex gap-2 p-4 bg-black/20 rounded-tl-lg">
          <button
            onClick={() => setShowChat(!showChat)}
            className="px-3 py-2 bg-cyan-500/30 text-cyan-200 border border-cyan-300/50 rounded hover:bg-cyan-500/50 text-xs"
            title="Open AIM (Friends List)"
          >
            💬 Chat
          </button>
          <button
            onClick={() => setShowGame(!showGame)}
            className="px-3 py-2 bg-purple-500/30 text-purple-200 border border-purple-300/50 rounded hover:bg-purple-500/50 text-xs"
            title="Open Snake Game"
          >
            🎮 Game
          </button>
          <button
            onClick={() => setShowPlayer(!showPlayer)}
            className="px-3 py-2 bg-pink-500/30 text-pink-200 border border-pink-300/50 rounded hover:bg-pink-500/50 text-xs"
            title="Open Winamp Player"
          >
            🎵 Music
          </button>
          <button
            onClick={() => setCrtEnabled(!crtEnabled)}
            className="px-3 py-2 bg-lime-500/30 text-lime-200 border border-lime-300/50 rounded hover:bg-lime-500/50 text-xs"
            title="Toggle CRT Effect (Keyboard: C)"
          >
            📺 CRT
          </button>
        </div>

        {/* Help Text */}
        <div className="fixed bottom-0 left-0 z-40 text-xs text-white/50 p-4">
          <div>Press G = Glitch Effect</div>
          <div>Press ↑↑↓↓←→←→BA = Secret Mode</div>
          <div>Press C = CRT Effect</div>
        </div>
      </div>
    </GlitchEffect>
  );
}
