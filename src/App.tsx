import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "./layout/Layout";
import { GlitchEffect } from "./components/features/Effects/GlitchEffect";
import { CRTEffect } from "./components/features/Effects/CRTEffect";
import { FriendsList } from "./components/features/Chat/FriendsList";
import { SnakeGame } from "./components/features/Games/Snake";
import { MemoryGame } from "./components/features/Games/MemoryGame";
import { WinampPlayer } from "./components/features/Player/WinampPlayer";
import { SplashIntro } from "./components/SplashIntro";
import { useKonamiCode } from "./hooks/useKonamiCode";
import { useEasterEggs } from "./hooks/useEasterEggs";
import { MatrixRain, BSOD, DialUpSound, YouveGotMail } from "./components/features/EasterEggs";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Music = lazy(() => import("./pages/Music"));
const Fashion = lazy(() => import("./pages/Fashion"));
const Games = lazy(() => import("./pages/Games"));
const Internet = lazy(() => import("./pages/Internet"));

const LoadingFallback = () => {
  const { t } = useTranslation();
  return <div className="p-4 text-center">{t("common.loading")}</div>;
};

export default function App() {
  const { t } = useTranslation();
  const [crtEnabled, setCrtEnabled] = useState(() => {
    return localStorage.getItem("y2k-crt") === "true";
  });
  const [secretModeActive, setSecretModeActive] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [introComplete, setIntroComplete] = useState(() => {
    // Check if intro was already shown in this session
    return sessionStorage.getItem("introShown") === "true";
  });

  const {
    activeEggs,
    dialupComplete,
    closeMatrix,
    closeBSOD,
    closeMail,
    completeDialup,
  } = useEasterEggs();

  // Save CRT setting to localStorage
  useEffect(() => {
    localStorage.setItem("y2k-crt", crtEnabled.toString());
  }, [crtEnabled]);

  const handleIntroComplete = useCallback(() => {
    console.log("✅ Intro complete - marking as shown");
    sessionStorage.setItem("introShown", "true");
    setIntroComplete(true);
  }, []);

  const activateSecretMode = useCallback(() => {
    setSecretModeActive(true);
    // Применяем стили напрямую на все элементы
    document.body.style.filter =
      "saturate(2.5) contrast(1.5) brightness(1.15) hue-rotate(5deg)";
    document.body.style.imageRendering = "pixelated";
    document.documentElement.classList.add("mode-8bit");
    alert(
      `🎮 ${t("common.secretMode")} 🎮\n\n${t("common.secretModeDesc")}`,
    );
    setTimeout(() => {
      setSecretModeActive(false);
      document.body.style.filter = "";
      document.body.style.imageRendering = "";
      document.documentElement.classList.remove("mode-8bit");
    }, 8000);
  }, [t]);

  useKonamiCode(activateSecretMode);

  // Show intro on first load only
  if (!introComplete) {
    console.log("🎬 Showing intro for first time");
    return <SplashIntro onComplete={handleIntroComplete} />;
  }

  console.log("📱 Rendering main app (intro already shown)");
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
        {showMemory && <MemoryGame />}
        {showPlayer && <WinampPlayer />}

        {/* Easter Eggs */}
        <MatrixRain isActive={activeEggs.matrixRain} onClose={closeMatrix} />
        <BSOD isActive={activeEggs.bsod} onClose={closeBSOD} />
        <DialUpSound isActive={activeEggs.dialup} onComplete={completeDialup} />
        <YouveGotMail isActive={activeEggs.youveGotMail} onClose={closeMail} />

        {/* Dialup complete notification */}
        {dialupComplete && (
          <div className="fixed top-4 right-4 z-50 bg-green-500/90 text-black px-4 py-2 rounded font-bold animate-pulse">
            🌐 {t("common.connected")}
          </div>
        )}

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
            🎮 Snake
          </button>
          <button
            onClick={() => setShowMemory(!showMemory)}
            className="px-3 py-2 bg-orange-500/30 text-orange-200 border border-orange-300/50 rounded hover:bg-orange-500/50 text-xs"
            title="Open Memory Game"
          >
            🧠 Memory
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
          <div>G = {t("common.glitchOn").replace(" enabled", "")}</div>
          <div>↑↑↓↓←→←→BA = Secret Mode</div>
          <div>C = {t("common.crtOn").replace(" enabled", "")}</div>
          <div className="mt-1 text-white/30">
            type "matrix" = Matrix Rain | "bsod" = Blue Screen | "mail" = You've Got Mail | "dial" = Dial-up
          </div>
        </div>
      </div>
    </GlitchEffect>
  );
}
