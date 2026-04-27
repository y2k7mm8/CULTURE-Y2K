import { useEffect, useRef, useState } from "react";
import introVideo from "../assets/music/intro.mp4";

interface SplashIntroProps {
  onComplete: () => void;
}

export function SplashIntro({ onComplete }: SplashIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isSkippable, setIsSkippable] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      console.log("⏸️ Waiting for user to click Start");
      return;
    }

    console.log("🎬 SplashIntro starting video");
    const video = videoRef.current;
    if (!video) {
      console.error("❌ Video ref is null");
      onComplete();
      return;
    }

    // Enable skip button after 2 seconds of playing
    const skipTimeout = setTimeout(() => {
      console.log("⏭️ Skip button enabled");
      setIsSkippable(true);
    }, 2000);

    // Handle video end
    const handleVideoEnd = () => {
      console.log("✅ Video ended naturally");
      setFadeOut(true);
      setTimeout(() => {
        console.log("🚀 Transitioning to main app");
        onComplete();
      }, 300);
    };

    // Handle video error
    const handleError = (e: Event) => {
      console.error("❌ Video error:", e);
      setFadeOut(true);
      setTimeout(onComplete, 300);
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleError);

    // Set video source and config
    video.src = introVideo;
    video.muted = false;
    video.volume = 0.8;
    video.crossOrigin = "anonymous";

    console.log("📹 Video source set to:", introVideo);

    // Play video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("▶️ Video playing successfully");
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("❌ Play error:", err);
          setFadeOut(true);
          setTimeout(onComplete, 300);
        });
    }

    return () => {
      clearTimeout(skipTimeout);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleError);
    };
  }, [hasStarted, onComplete]);

  const handleStart = () => {
    console.log("🎮 User clicked Start button");
    setHasStarted(true);
  };

  const handleSkip = () => {
    console.log("⏭️ User skipped intro");
    setFadeOut(true);
    setTimeout(onComplete, 300);
  };

  // Show start screen before user clicks
  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-cyan-300 mb-2">
              CULTURE-Y2K
            </h1>
            <p className="text-cyan-200/60 text-sm uppercase tracking-widest">
              Press Start to begin
            </p>
          </div>
          <button
            onClick={handleStart}
            className="rounded-lg border-2 border-cyan-400 bg-cyan-500/10 px-8 py-3 text-lg uppercase tracking-[0.2em] text-cyan-300 transition hover:bg-cyan-500/20 hover:border-cyan-300 font-bold"
          >
            ▶ Start
          </button>
        </div>
      </div>
    );
  }

  // Show video after user clicks Start
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        playsInline
        className="h-full w-full object-cover block"
      />

      {/* Skip Button - appears after 2 seconds */}
      {isPlaying && isSkippable && !fadeOut && (
        <button
          onClick={handleSkip}
          className="absolute bottom-6 right-6 z-10 rounded-full border border-cyan-300/50 bg-cyan-500/20 px-6 py-2 text-sm uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-500/30 hover:border-cyan-300"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
}
